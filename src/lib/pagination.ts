import {ColumnConfig, createStreamTable, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'

/**
 * Minimal shape of a paginated Solace Cloud API list response
 */
export interface PaginatedApiResponse<T> {
  data: T[]
  meta?: {
    pagination?: {
      count: number
      nextPage: null | string
      pageNumber: number
      pageSize: number
      totalPages: number
    }
  }
}

export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

/**
 * Builds the standard pagination flags (--page-number, --page-size, --all) for list commands.
 *
 * @param resourceName - Plural name of the listed resource, used in flag descriptions
 * @param chars - Optional short characters for the flags
 * @param chars.pageNumber - Short character for --page-number
 * @param chars.pageSize - Short character for --page-size
 * @returns Pagination flag definitions to spread into a command's flags
 */
export function paginationFlags(resourceName: string, chars: {pageNumber?: 'p'; pageSize?: 's'} = {}) {
  return {
    all: Flags.boolean({
      default: false,
      description: `Fetch all pages of ${resourceName}. Results are streamed to the table as each page is received.`,
      exclusive: ['page-number'],
    }),
    'page-number': Flags.integer({
      char: chars.pageNumber,
      description: 'The page number to get. Defaults to 1',
      min: 1,
    }),
    'page-size': Flags.integer({
      char: chars.pageSize,
      description: `The number of ${resourceName} to return per page. Defaults to ${DEFAULT_PAGE_SIZE}, or ${MAX_PAGE_SIZE} when --all is set`,
      max: MAX_PAGE_SIZE,
      min: 1,
    }),
  }
}

/**
 * Iterates over the pages of a paginated list API, yielding each page as soon as it is received.
 *
 * @param conn - Authenticated connection used to call the API
 * @param buildUrl - Builds the API url for the given page number and page size
 * @param options - Paging options
 * @param options.all - Whether to follow all subsequent pages
 * @param options.pageNumber - Page number to start from
 * @param options.pageSize - Number of items per page
 * @yields Each page's API response
 */
export async function* fetchPages<T, R extends PaginatedApiResponse<T>>(
  conn: ScConnection,
  buildUrl: (pageNumber: number, pageSize: number) => string,
  options: {all: boolean; pageNumber: number; pageSize: number},
): AsyncGenerator<R> {
  let {pageNumber} = options
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await conn.get<R>(buildUrl(pageNumber, options.pageSize))
    yield resp

    const totalPages = resp.meta?.pagination?.totalPages ?? pageNumber
    if (!options.all || pageNumber >= totalPages || resp.data.length === 0) {
      return
    }

    pageNumber++
  }
}

export interface TableWriter {
  end(): void
  write(rows: unknown[][]): void
}

/**
 * Creates a table writer for list output.
 *
 * When streaming is requested and stdout is a TTY, rows are appended to the table as they are written.
 * Otherwise (e.g. output is piped), rows are buffered and rendered as a single table on end(), since the
 * stream table relies on terminal escape sequences to redraw its bottom border.
 *
 * @param header - Table header row
 * @param options - Output options
 * @param options.columnConfig - Column configuration for the rendered (non-streamed) table
 * @param options.log - Logger used to print the rendered table
 * @param options.stream - Whether to stream rows to the table as they are written
 * @param options.streamColumnConfig - Fixed column widths for the stream table
 * @returns A writer that accepts batches of rows
 */
export function createTableWriter(
  header: string[],
  options: {
    columnConfig?: Record<number, ColumnConfig>
    log: (msg: string) => void
    stream: boolean
    streamColumnConfig?: Record<number, ColumnConfig>
  },
): TableWriter {
  if (options.stream && process.stdout.isTTY) {
    const streamTable = createStreamTable(header.length, options.streamColumnConfig)
    streamTable.write(header)
    return {
      end() {
        process.stdout.write('\n')
      },
      write(rows) {
        for (const row of rows) streamTable.write(row.map(String))
      },
    }
  }

  const buffered: unknown[][] = [header]
  return {
    end() {
      options.log(renderTable(buffered, options.columnConfig))
    },
    write(rows) {
      buffered.push(...rows)
    },
  }
}
