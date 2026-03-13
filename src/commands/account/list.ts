import {OrgConfig, OrgManager, renderTable, ScCommand} from '@dishantlangayan/sc-cli-core'

export default class AccountList extends ScCommand<typeof AccountList> {
  static override args = {}
  static override description = `List all authenticated organizations.

Displays organizations you have logged into, including their aliases and which one is set as default.`
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {}

  public async run(): Promise<{data: OrgConfig[]}> {
    const orgManager: OrgManager = await this.getOrgManager()

    // Get all authenticated organizations
    const allOrgs = await orgManager.getAllOrgs()

    // Handle case when no organizations exist
    if (allOrgs.length === 0) {
      this.log("No organizations found. Run 'sc account:login' to authenticate.")
      return {data: []}
    }

    // Get the default organization
    const defaultOrg = await orgManager.getDefaultOrg()
    const defaultOrgId = defaultOrg?.orgId

    // Helper function to determine if org is default
    const isDefault = (orgId: string) => orgId === defaultOrgId ? 'Yes' : 'No'

    // Create table array (first row is headers, rest are data rows)
    const orgArray = [
      ['Org ID', 'Alias', 'Base URL', 'API Version', 'Is Default'],
      ...allOrgs.map((org: OrgConfig) => [
        org.orgId,
        org.alias ?? '',
        org.baseUrl,
        org.apiVersion ?? '',
        isDefault(org.orgId),
      ]),
    ]

    // Display results as a table
    this.log(renderTable(orgArray))

    // Return raw data for --json flag support
    return {data: allOrgs}
  }
}
