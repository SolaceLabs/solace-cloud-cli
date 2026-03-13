import {OrgConfig, OrgError, OrgErrorCode, OrgManager, ScCommand} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'
import * as process from 'node:process'
import * as readline from 'node:readline'

export default class AccountLogin extends ScCommand<typeof AccountLogin> {
  static override args = {}
  static override description = `Login to a Solace Cloud organization.

Stores organization credentials securely using OS keychain.
The access token is encrypted and stored locally.

Required token permissions: Varies by operations you intend to perform`
  static override examples = [
    '<%= config.bin %> <%= command.id %> --org=my-org-id',
    '<%= config.bin %> <%= command.id %> --org=my-org-id --alias=production',
    '<%= config.bin %> <%= command.id %> --org=my-org-id --set-default',
    '<%= config.bin %> <%= command.id %> --org=my-org-id --no-prompt',
    '<%= config.bin %> <%= command.id %> --org=my-org-id --base-url=https://api.custom.solace.cloud',
  ]
  static override flags = {
    'alias': Flags.string({
      char: 'a',
      description: 'Alias name for this organization (optional)',
    }),
    'api-version': Flags.string({
      description: 'API version to use (optional)',
    }),
    'base-url': Flags.string({
      description: 'Custom base URL for Solace Cloud API (optional)',
    }),
    'no-prompt': Flags.boolean({
      default: false,
      description: 'Read access token from SC_ACCESS_TOKEN environment variable instead of prompting',
    }),
    'org': Flags.string({
      char: 'o',
      description: 'Organization ID to login to',
      required: true,
    }),
    'set-default': Flags.boolean({
      char: 'd',
      default: false,
      description: 'Set this organization as the default',
    }),
  }

  public async run(): Promise<OrgConfig> {
    const {flags} = await this.parse(AccountLogin)

    try {
      // Get OrgManager instance
      const orgManager: OrgManager = await this.getOrgManager()

      // Check if organization already exists
      const orgExists = await orgManager.orgExists(flags.org)
      let isUpdate = false

      if (orgExists) {
        // Prompt for overwrite confirmation
        const shouldOverwrite = await this.promptForConfirmation(
          `Organization '${flags.org}' already exists. Do you want to overwrite the access token?`,
        )

        if (!shouldOverwrite) {
          this.log('Login cancelled.')
          this.exit(0)
        }

        // Remove existing organization to allow overwrite
        await orgManager.removeOrg(flags.org)
        isUpdate = true
      }

      // Obtain access token
      let accessToken: string

      if (flags['no-prompt']) {
        // Read from environment variable
        accessToken = process.env.SC_ACCESS_TOKEN || ''
        if (!accessToken) {
          this.error('SC_ACCESS_TOKEN environment variable is not set. Please set it or remove the --no-prompt flag.')
        }
      } else {
        // Prompt for token
        accessToken = await this.promptForToken()
      }

      // Create OrgConfig object
      const orgConfig: OrgConfig = {
        accessToken,
        alias: flags.alias,
        apiVersion: flags['api-version'],
        baseUrl: flags['base-url'],
        orgId: flags.org,
      }

      // Store organization
      await orgManager.addOrg(orgConfig)

      // Set as default if requested
      if (flags['set-default']) {
        await orgManager.setDefaultOrg(flags.org)
      }

      // Display success message
      const action = isUpdate ? 'updated' : 'logged in to'
      const aliasText = flags.alias ? ` (${flags.alias})` : ''
      this.log(`Successfully ${action} organization '${flags.org}'${aliasText}`)

      if (flags['set-default']) {
        this.log('Set as default organization.')
      }

      // Return for --json support
      return orgConfig
    } catch (error) {
      // Handle OrgManager errors
      if (error instanceof OrgError) {
        switch (error.code) {
          case OrgErrorCode.FILE_WRITE_ERROR: {
            this.error('Failed to save credentials. Please check file permissions.')
            break
          }

          case OrgErrorCode.INVALID_ACCESS_TOKEN: {
            this.error('Invalid access token format. Please check your token and try again.')
            break
          }

          case OrgErrorCode.INVALID_ORG_ID: {
            this.error('Invalid organization ID format. Please check and try again.')
            break
          }

          default: {
            this.error(`Login failed: ${error.message}`)
            break
          }
        }
      }

      // Handle user cancellation
      if (error instanceof Error && error.message === 'Cancelled by user') {
        this.error('Login cancelled.')
      }

      // Re-throw unexpected errors
      throw error
    }
  }

  /**
   * Prompts user for confirmation with Y/n (default Yes)
   */
  private async promptForConfirmation(message: string): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    return new Promise((resolve) => {
      rl.question(`${message} (Y/n): `, (answer) => {
        rl.close()
        const normalized = answer.trim().toLowerCase()
        // Default to yes if empty, accept y/yes as confirmation
        const confirmed = normalized === '' || normalized === 'y' || normalized === 'yes'
        resolve(confirmed)
      })
    })
  }

  /**
   * Prompts user for access token with hidden input
   */
  private async promptForToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      process.stdout.write('Enter access token: ')

      let token = ''
      const {stdin} = process

      // Hide input by setting raw mode
      if (stdin.isTTY) {
        stdin.setRawMode(true)
      }

      const onData = (char: Buffer) => {
        const charStr = char.toString()

        // Enter key
        if (charStr === '\n' || charStr === '\r' || charStr === '\r\n') {
          process.stdout.write('\n')
          if (stdin.isTTY) {
            stdin.setRawMode(false)
          }

          stdin.removeListener('data', onData)
          rl.close()
          resolve(token)
          return
        }

        // Ctrl+C
        if (charStr === '\u0003') {
          process.stdout.write('\n')
          if (stdin.isTTY) {
            stdin.setRawMode(false)
          }

          stdin.removeListener('data', onData)
          rl.close()
          reject(new Error('Cancelled by user'))
          return
        }

        // Backspace/Delete
        if (charStr === '\u007F' || charStr === '\b') {
          if (token.length > 0) {
            token = token.slice(0, -1)
          }

          return
        }

        // Printable characters only
        if (charStr >= ' ') {
          token += charStr
        }
      }

      stdin.on('data', onData)
    })
  }
}
