import {OrgConfig, OrgManager, ScCommand} from '@dishantlangayan/sc-cli-core'
import {checkbox, confirm} from '@inquirer/prompts'
import {Flags} from '@oclif/core'

export default class AccountLogout extends ScCommand<typeof AccountLogout> {
  static override args = {}
  static override description = `Logout from authenticated organizations.

Removes locally stored organization credentials and access tokens.
Interactive mode allows selection with arrow keys and spacebar.`
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --org=my-org-id',
    '<%= config.bin %> <%= command.id %> --org=production',
    '<%= config.bin %> <%= command.id %> --all',
    '<%= config.bin %> <%= command.id %> --org=my-org-id --no-prompt',
  ]
  static override flags = {
    'all': Flags.boolean({
      char: 'a',
      default: false,
      description: 'Logout of all organizations',
    }),
    'no-prompt': Flags.boolean({
      default: false,
      description: 'Skip confirmation prompt and assume Yes',
    }),
    'org': Flags.string({
      char: 'o',
      description: 'Organization ID or alias to logout from',
    }),
  }

  public async run(): Promise<{count: number; loggedOut: string[]}> {
    const {flags} = await this.parse(AccountLogout)

    // Validate conflicting flags
    if (flags.all && flags.org) {
      this.error('Cannot specify both --all and --org flags', {exit: 2})
    }

    // Get OrgManager instance
    const orgManager: OrgManager = await this.getOrgManager()

    // Get all authenticated organizations
    const allOrgs = await orgManager.getAllOrgs()

    // Handle case when no organizations exist
    if (allOrgs.length === 0) {
      this.log("No organizations found. Nothing to logout from.")
      return {count: 0, loggedOut: []}
    }

    // Determine which organizations to logout
    let orgIdsToLogout: string[] = []

    if (flags.all) {
      // Logout from all organizations
      orgIdsToLogout = allOrgs.map((org: OrgConfig) => org.orgId)
    } else if (flags.org) {
      // Logout from specific organization
      const org = allOrgs.find(
        (o: OrgConfig) => o.orgId === flags.org || o.alias === flags.org,
      )

      if (!org) {
        this.error(
          `Organization '${flags.org}' not found. Run 'sc account:list' to see available organizations.`,
          {exit: 2},
        )
      }

      orgIdsToLogout = [org.orgId]
    } else {
      // Interactive mode: let user select organizations
      try {
        orgIdsToLogout = await checkbox({
          choices: allOrgs.map((org: OrgConfig) => ({
            name: org.alias ? `${org.orgId} (${org.alias})` : org.orgId,
            value: org.orgId,
          })),
          message: 'Select organizations to logout from:',
          required: true,
        })
      } catch {
        // User cancelled the selection (Ctrl+C)
        this.log('Logout cancelled.')
        return {count: 0, loggedOut: []}
      }
    }

    // Confirm logout unless --no-prompt flag is set
    if (!flags['no-prompt']) {
      const count = orgIdsToLogout.length
      const orgWord = count === 1 ? 'organization' : 'organizations'

      try {
        const shouldProceed = await confirm({
          default: true,
          message: `Are you sure you want to logout from ${count} ${orgWord}?`,
        })

        if (!shouldProceed) {
          this.log('Logout cancelled.')
          return {count: 0, loggedOut: []}
        }
      } catch {
        // User cancelled the confirmation (Ctrl+C)
        this.log('Logout cancelled.')
        return {count: 0, loggedOut: []}
      }
    }

    // Logout from selected organizations (remove all in parallel)
    await Promise.all(orgIdsToLogout.map((orgId) => orgManager.removeOrg(orgId)))

    // Display success messages
    for (const orgId of orgIdsToLogout) {
      const org = allOrgs.find((o: OrgConfig) => o.orgId === orgId)
      const displayName = org?.alias ? `${orgId} (${org.alias})` : orgId
      this.log(`Successfully logged out from: ${displayName}`)
    }

    // Return result for --json support
    return {
      count: orgIdsToLogout.length,
      loggedOut: orgIdsToLogout,
    }
  }
}
