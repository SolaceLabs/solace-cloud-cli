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
import {EventBrokerListApiResponse, EventBrokerServiceDetail} from '../../../types/broker.js'

export default class MissionctrlBrokerList extends ScCommand<typeof MissionctrlBrokerList> {
  static override args = {}
  static override description = `Get a listing of event broker services.

Your token must have one of the permissions listed in the Token Permissions.

Token Permissions: [ \`mission_control:access\` **or** \`services:get\` **or** \`services:get:self\` **or** \`services:view\` **or** \`services:view:self\` ]`
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --org=my-org',
    '<%= config.bin %> <%= command.id %> --alias=my-alias --name=MyBrokerName --page-number=1 --page-size=10 --sort=name:asc',
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
      description: 'Name of the event broker service to match on.',
    }),
    org: Flags.string({
      char: 'o',
      description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
      exclusive: ['alias'],
    }),
    ...paginationFlags('event broker services'),
    sort: Flags.string({
      description: `Sort the returned event broker services by attribute.

      You can use the following value formats for the sort order:

      * attributes-names 
      * attributes-names:sort-order`,
    }),
  }

  public async run(): Promise<EventBrokerListApiResponse> {
    const {flags} = await this.parse(MissionctrlBrokerList)

    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)

    const pageSize = flags['page-size'] ?? (flags.all ? MAX_PAGE_SIZE : DEFAULT_PAGE_SIZE)
    const pageNumber = flags['page-number'] ?? 1

    // API url
    const buildUrl = (page: number, size: number): string => {
      let apiUrl: string = `/missionControl/eventBrokerServices?pageSize=${size}&pageNumber=${page}`
      if (flags.sort) {
        apiUrl += `&sort=${flags.sort}`
      }

      if (flags.name) {
        apiUrl += `&customAttributes=name=="${flags.name}"`
      }

      return apiUrl
    }

    // Output as table, streaming rows as each page is received when fetching all pages
    const table = createTableWriter(
      ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id'],
      {
        log: (msg) => this.log(msg),
        stream: flags.all && !this.jsonEnabled(),
        streamColumnConfig: {
          0: {width: 20, wrapWord: true},
          1: {width: 26},
          2: {width: 8},
          3: {width: 14},
          4: {width: 14},
          5: {width: 20},
          6: {width: 18},
        },
      },
    )

    // API calls
    let resp: EventBrokerListApiResponse | undefined
    const allData: EventBrokerServiceDetail[] = []
    for await (const page of fetchPages<EventBrokerServiceDetail, EventBrokerListApiResponse>(conn, buildUrl, {
      all: flags.all,
      pageNumber,
      pageSize,
    })) {
      resp = page
      allData.push(...page.data)
      table.write(
        page.data.map((item: EventBrokerServiceDetail) => [
          item.name,
          item.id,
          item.type,
          item.eventBrokerServiceVersion,
          item.ownedBy,
          item.datacenterId,
          item.serviceClassId,
        ]),
      )
    }

    table.end()

    // Return raw json if --json flag is set
    return {...resp, data: allData}
  }
}
