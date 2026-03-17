import {printObjectAsKeyValueTable, ScCommand} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'

import {resolveOrgConnection} from '../../../lib/org-utils.js'
import {EnvironmentApiResponse, EnvironmentListApiResponse} from '../../../types/environment.js'

export default class PlatformEnvUpdate extends ScCommand<typeof PlatformEnvUpdate> {
  static override args = {}
  static override description = `Modify an environment's attributes
  
  Use either the Environment's ID (--env-id) or name of the Environment (--name).
  
  Token Permissions: [ environments:edit ]
  `
  static override examples = [
    '<%= config.bin %> <%= command.id %> --name=MyEnvName --new-name=MyNewEnvName',
    '<%= config.bin %> <%= command.id %> --env-id=MyEnvId --new-name=MyNewEnvName --description="My description to update" --isDefault',
    '<%= config.bin %> <%= command.id %> --org=my-org --name=MyEnvName --isDefault',
    '<%= config.bin %> <%= command.id %> --alias=my-alias --name=MyEnvName --new-name=MyNewEnvName',
  ]
  static override flags = {
    alias: Flags.string({
      char: 'a',
      description: 'Organization alias to use. If not specified, uses the default organization.',
      exclusive: ['org'],
    }),
    description: Flags.string({
      char: 'd',
      description: 'Description of the environment to update.',
    }),
    'env-id': Flags.string({
      char: 'e',
      description: 'Id of the environment.',
      exactlyOne: ['env-id', 'name'],
    }),
    isDefault: Flags.boolean({
      description: `Indicates this is the organization's default environment. The default value is false.`,
    }),
    name: Flags.string({
      char: 'n',
      description: 'Current name of the environment.',
      exactlyOne: ['env-id', 'name'],
    }),
    'new-name': Flags.string({
      description: 'New name of the environment.',
    }),
    org: Flags.string({
      char: 'o',
      description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
      exclusive: ['alias'],
    }),
  }

  public async run(): Promise<EnvironmentApiResponse> {
    const {flags} = await this.parse(PlatformEnvUpdate)

    const desc = flags.description ?? ''
    const envId = flags['env-id'] ?? ''
    const name = flags.name ?? ''
    const newName = flags['new-name'] ?? ''

    // API body
    const body = {
      ...(flags.isDefault && {isDefault: flags.isDefault}),
      ...(desc && {description: desc}),
      ...(newName && {name: newName}),
    }

    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)

    // API url
    let apiUrl: string = `/platform/environments`
    let envIdToUpdate: string | undefined = envId

    // If env name provided, get the environment matching provided name and delete. If more than one environment matches, an error will be thrown.
    // If env id provided, delete environment with that id
    if (name) {
      // API call to get environment by name
      const getEnvApiUrl = `${apiUrl}?name=${name}`
      const resp = await conn.get<EnvironmentListApiResponse>(getEnvApiUrl)
      if (resp.data.length > 1) {
        this.error(`Multiple environments found with: ${name}. Exactly one environment must match the provided name.`)
      } else {
        envIdToUpdate = resp.data[0]?.id
      }
    }

    // API call to update environment by id
    apiUrl += `/${envIdToUpdate}`
    const resp = await conn.put<EnvironmentApiResponse>(apiUrl, body)

    this.log(printObjectAsKeyValueTable(resp.data as unknown as Record<string, unknown>))

    return resp
  }
}
