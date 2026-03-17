import {printObjectAsKeyValueTable, ScCommand} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'

import {resolveOrgConnection} from '../../../lib/org-utils.js'
import {EnvironmentApiResponse, EnvironmentListApiResponse} from '../../../types/environment.js'

export default class PlatformEnvDisplay extends ScCommand<typeof PlatformEnvDisplay> {
  static override args = {}
  static override description = `Display information about an Environment.
  
  Use either the Environment's ID (--env-id) or name of the Environment (--name).
  
  Required token permissions: [ environments:view ]`
  static override examples = [
    '<%= config.bin %> <%= command.id %> --name=MyEnvName',
    '<%= config.bin %> <%= command.id %> --env-id=MyEnvId',
    '<%= config.bin %> <%= command.id %> --org=my-org --env-id=MyEnvId',
    '<%= config.bin %> <%= command.id %> --alias=my-alias --name=MyEnvName',
  ]
  static override flags = {
    alias: Flags.string({
      char: 'a',
      description: 'Organization alias to use. If not specified, uses the default organization.',
      exclusive: ['org'],
    }),
    'env-id': Flags.string({
      char: 'e',
      description: 'Id of the environment.',
      exactlyOne: ['env-id', 'name'],
    }),
    name: Flags.string({
      char: 'n',
      description: 'Name of the environment.',
      exactlyOne: ['env-id', 'name'],
    }),
    org: Flags.string({
      char: 'o',
      description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
      exclusive: ['alias'],
    }),
  }

  public async run(): Promise<EnvironmentApiResponse | EnvironmentListApiResponse> {
    const {flags} = await this.parse(PlatformEnvDisplay)

    const name = flags.name ?? ''
    const envId = flags['env-id'] ?? ''

    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)

    // API url
    // If env name provided, get all environments matching provided name
    // If env id provided, get environment with that id
    let apiUrl: string = `/platform/environments`
    let resp: EnvironmentApiResponse | EnvironmentListApiResponse
    if (envId) {
      // API call to get environment by id
      apiUrl += `/${envId}`
      resp = await conn.get<EnvironmentApiResponse>(apiUrl)
      this.log(printObjectAsKeyValueTable(resp.data as unknown as Record<string, unknown>))
    } else {
      // API call to get environment by name
      apiUrl += `?name=${name}`
      resp = await conn.get<EnvironmentListApiResponse>(apiUrl)
      for (const env of resp.data) {
        this.log(printObjectAsKeyValueTable(env as unknown as Record<string, unknown>))
      }
    }

    // Return raw json if --json flag is set
    return resp
  }
}
