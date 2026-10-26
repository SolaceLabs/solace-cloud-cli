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
import {User, UserListApiResponse} from '../../../types/user.js'

export default class PlatformUsersList extends ScCommand<typeof PlatformUsersList> {
  static override args = {}
  static override description = `(Beta) Get a list of users in your account.

  You can retrieve a list of users matching on email, name, identifiers, roles, or groups.
  The --name and --email filters match on partial strings.

  Required token permissions: [ iam_users:get ]`
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --org=my-org',
    '<%= config.bin %> <%= command.id %> --alias=my-alias --name=Jane --page-number=1 --page-size=10',
    '<%= config.bin %> <%= command.id %> --email=jane@example.com',
    '<%= config.bin %> <%= command.id %> --role=role-id-1 --role=role-id-2',
    '<%= config.bin %> <%= command.id %> --all',
  ]
  static override flags = {
    alias: Flags.string({
      char: 'a',
      description: 'Organization alias to use. If not specified, uses the default organization.',
      exclusive: ['org'],
    }),
    email: Flags.string({
      description:
        'The email address of the user. You can enter a partial string into the field to match multiple users.',
    }),
    group: Flags.string({
      description:
        'The unique identifier of a group that is assigned to the user. Repeat the flag to match on multiple groups.',
      multiple: true,
    }),
    id: Flags.string({
      description: 'The unique identifier of a user. Repeat the flag to match on multiple users.',
      multiple: true,
    }),
    name: Flags.string({
      char: 'n',
      description: 'The name of the user. You can enter a partial string into the field to match multiple users.',
    }),
    org: Flags.string({
      char: 'o',
      description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
      exclusive: ['alias'],
    }),
    ...paginationFlags('users', {pageNumber: 'p', pageSize: 's'}),
    role: Flags.string({
      description:
        'The unique identifier of a role that is assigned to the user. Repeat the flag to match on multiple roles.',
      multiple: true,
    }),
  }

  public async run(): Promise<UserListApiResponse> {
    const {flags} = await this.parse(PlatformUsersList)

    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)

    const pageSize = flags['page-size'] ?? (flags.all ? MAX_PAGE_SIZE : DEFAULT_PAGE_SIZE)
    const pageNumber = flags['page-number'] ?? 1

    // API url
    // The ids, roles, and groups query parameters are arrays, so each value is repeated
    const buildUrl = (page: number, size: number): string => {
      const params = new URLSearchParams()
      params.append('pageSize', String(size))
      params.append('pageNumber', String(page))
      if (flags.name) params.append('name', flags.name)
      if (flags.email) params.append('email', flags.email)
      for (const id of flags.id ?? []) params.append('ids', id)
      for (const role of flags.role ?? []) params.append('roles', role)
      for (const group of flags.group ?? []) params.append('groups', group)

      return `/platform/users?${params.toString()}`
    }

    // Output as table, streaming rows as each page is received when fetching all pages
    const table = createTableWriter(['Email', 'First Name', 'Last Name', 'Id', 'State'], {
      columnConfig: {0: {width: 30, wrapWord: true}},
      log: (msg) => this.log(msg),
      stream: flags.all && !this.jsonEnabled(),
      streamColumnConfig: {
        0: {width: 30, wrapWord: true},
        1: {width: 15, wrapWord: true},
        2: {width: 15, wrapWord: true},
        3: {width: 26},
        4: {width: 16},
      },
    })

    // API calls
    let resp: undefined | UserListApiResponse
    const allData: User[] = []
    for await (const page of fetchPages<User, UserListApiResponse>(conn, buildUrl, {
      all: flags.all,
      pageNumber,
      pageSize,
    })) {
      resp = page
      allData.push(...page.data)
      table.write(
        page.data.map((item: User) => [item.email, item.firstName, item.lastName, item.id, item.state]),
      )
    }

    table.end()

    // Return raw json if --json flag is set
    return {...(resp as UserListApiResponse), data: allData}
  }
}
