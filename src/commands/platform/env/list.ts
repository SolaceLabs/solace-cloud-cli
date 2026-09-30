import {ScCommand} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'

import {resolveOrgConnection} from '../../../lib/org-utils.js'
import {
  createTableWriter,
  DEFAULT_PAGE_SIZE,
  fetchPages,
  MAX_PAGE_SIZE,
  paginationFlags,
} from '../../../lib/pagination.js'
import {Environment, EnvironmentListApiResponse} from '../../../types/environment.js'

export default class PlatformEnvList extends ScCommand<typeof PlatformEnvList> {
  static override args = {}
  static override description = `Get a list of all Environments. 
  
  Required token permissions: [ environments:view ]`
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --org=my-org',
    '<%= config.bin %> <%= command.id %> --alias=my-alias --name=Default --page-number=1 --page-size=10 --sort=name:ASC',
    '<%= config.bin %> <%= command.id %> --all',
  ]
  static override flags = {
    alias: Flags.string({
      char: 'a',
      description: 'Organization alias to use. If not specified, uses the default organization.',
      exclusive: ['org'],
    }),
    name: Flags.string({
      char: 'n',
      description: 'Name of the environment to match on.',
    }),
    org: Flags.string({
      char: 'o',
      description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
      exclusive: ['alias'],
    }),
    ...paginationFlags('environments', {pageNumber: 'p', pageSize: 's'}),
    sort: Flags.string({
      description: 'The query (fieldName:<ASC/DESC>) used to sort the environment list in the response.',
    }),
  }

  public async run(): Promise<EnvironmentListApiResponse> {
    const {flags} = await this.parse(PlatformEnvList)

    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)

    const pageSize = flags['page-size'] ?? (flags.all ? MAX_PAGE_SIZE : DEFAULT_PAGE_SIZE)
    const pageNumber = flags['page-number'] ?? 1

    // API url
    const buildUrl = (page: number, size: number): string => {
      let apiUrl: string = `/platform/environments?pageSize=${size}&pageNumber=${page}`
      if (flags.sort) {
        apiUrl += `&sort=${flags.sort}`
      }

      return apiUrl
    }

    // Output as table, streaming rows as each page is received when fetching all pages
    const table = createTableWriter(['Name', 'Id', 'Is Default', 'Is Production', 'Description'], {
      columnConfig: {4: {width: 50, wrapWord: true}},
      log: (msg) => this.log(msg),
      stream: flags.all && !this.jsonEnabled(),
      streamColumnConfig: {
        0: {width: 20, wrapWord: true},
        1: {width: 26},
        2: {width: 10},
        3: {width: 13},
        4: {width: 50, wrapWord: true},
      },
    })

    // API calls
    let resp: EnvironmentListApiResponse | undefined
    const allData: Environment[] = []
    for await (const page of fetchPages<Environment, EnvironmentListApiResponse>(conn, buildUrl, {
      all: flags.all,
      pageNumber,
      pageSize,
    })) {
      resp = page
      allData.push(...page.data)
      table.write(
        page.data.map((item: Environment) => [
          item.name,
          item.id,
          item.isDefault,
          item.isProduction,
          item.description,
        ]),
      )
    }

    table.end()

    // Return raw json if --json flag is set
    return {...(resp as EnvironmentListApiResponse), data: allData}
  }
}
