import {OrgError, OrgErrorCode, OrgManager, ScCommand, ScConnection} from '@dishantlangayan/sc-cli-core'
import {Command} from '@oclif/core'

/**
 * Resolves organization and creates authenticated ScConnection
 *
 * This utility function handles the common pattern of resolving which organization
 * to use for API calls. It supports both explicit org specification via the --org flag
 * and automatic default org resolution.
 *
 * @param command - The ScCommand instance (for error handling and OrgManager access)
 * @param orgIdentifier - Optional org ID or alias from --org flag
 * @param timeout - Optional timeout override in milliseconds (default: 10000ms)
 * @returns Configured ScConnection instance ready for API calls
 * @throws Will call command.error() with user-friendly messages for various error scenarios
 *
 * @example
 * ```typescript
 * // In a command's run() method:
 * const {flags} = await this.parse(MyCommand)
 * const conn = await resolveOrgConnection(this, flags.org)
 * const resp = await conn.get('/api/endpoint')
 * ```
 */
export async function resolveOrgConnection(
  command: ScCommand<typeof Command>,
  orgIdentifier?: string,
  timeout?: number,
): Promise<ScConnection> {
  try {
    // Use type assertion to access protected method
    const orgManager: OrgManager = await (command as unknown as {getOrgManager(): Promise<OrgManager>}).getOrgManager()

    // If org identifier provided, validate and use it
    if (orgIdentifier) {
      const org = await orgManager.getOrg(orgIdentifier)
      if (!org) {
        command.error(
          `Organization '${orgIdentifier}' not found. Run 'sc account:list' to see available organizations.`,
          {exit: 2},
        )
      }

      return await orgManager.createConnection(orgIdentifier, timeout)
    }

    // No org specified, try default
    const defaultOrg = await orgManager.getDefaultOrg()
    if (!defaultOrg) {
      const allOrgs = await orgManager.getAllOrgs()
      if (allOrgs.length === 0) {
        command.error(
          "No organizations found. Please run 'sc account:login' to authenticate.",
          {exit: 2},
        )
      } else {
        command.error(
          "No default organization set. Please specify --org flag or set a default with 'sc account:login --set-default'.",
          {exit: 2},
        )
      }
    }

    return await orgManager.createConnection(defaultOrg.orgId, timeout)
  } catch (error) {
    // Handle OrgManager-specific errors
    if (error instanceof OrgError) {
      switch (error.code) {
        case OrgErrorCode.INVALID_ACCESS_TOKEN: {
          command.error(
            "Invalid access token. Please re-authenticate with 'sc account:login'.",
            {exit: 2},
          )
          break
        }

        case OrgErrorCode.NOT_INITIALIZED: {
          command.error(
            "Organization manager not initialized. Please run 'sc account:login' to authenticate.",
            {exit: 2},
          )
          break
        }

        case OrgErrorCode.ORG_NOT_FOUND: {
          command.error(
            "Organization not found. Run 'sc account:list' to see available organizations.",
            {exit: 2},
          )
          break
        }

        default: {
          command.error(`Organization error: ${error.message}`, {exit: 2})
          break
        }
      }
    }

    // Re-throw unexpected errors
    throw error
  }
}
