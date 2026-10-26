# Test patterns — Mocha + Chai + Sinon

Tests live at `test/commands/<topic>/<subtopic>/<verb>.test.ts`, mirroring `src/`. The
file is created for you by `oclif generate command` alongside the command — replace its
contents wholesale. The generated version extends nothing, stubs nothing, and asserts on
`'hello world'`; none of it survives.

Run the tests with:

```
npm test                                                             # everything + lint (~1s)
./node_modules/.bin/mocha --forbid-only "test/commands/platform/env/create.test.ts"   # one file, no lint
```

Note that `npm test -- <path>` does **not** scope the run — the argument is appended to
the script's existing `"test/**/*.test.ts"` glob, so the full suite runs anyway. Use the
direct mocha invocation to iterate on one file, and `npm test` to finish.

## Keep the suite small

**Write a limited set of tests that validate core functionality — not a comprehensive
suite.** For a new command, 3–5 `it()` blocks is the target:

1. The bare command runs (smoke test — `it('runs platform:env:create', ...)` asserting
   `expect(stdout).to.contain('')`). This catches flag-definition and import errors.
2. The happy path with required flags: assert the URL, the request body, and that the
   rendered table appears in stdout.
3. One meaningful variation — an optional flag that changes the body, or the
   name→id resolution path.
4. `--alias=test-alias` (or `--org`) to prove org resolution is wired up.

Skip: every flag permutation, every error branch, output formatting minutiae. The
`platform env list` test file is larger than this because pagination has genuinely
distinct behaviours (`--all` multi-page fetch, `--all --json` aggregation, rejection of
the legacy `--pageSize`); a list command may justify 2–3 extra cases, nothing else does.

## The standard harness

Every test file uses the same `beforeEach`. Copy it from
`templates/test.ts.template` or an existing file and change only the imported command class.

```ts
import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvCreate from '../../../../src/commands/platform/env/create.js'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:create', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  beforeEach(() => {
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvCreate.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)

    orgManagerStub.getDefaultOrg.resolves({accessToken: 'test-token', orgId: 'default-org'})

    orgManagerStub.getOrg.callsFake(async (identifier: string) => {
      if (identifier === 'test-org' || identifier === 'test-alias') {
        return {
          accessToken: 'test-token',
          alias: identifier === 'test-alias' ? 'test-alias' : undefined,
          orgId: 'test-org-id',
        }
      }
      return null
    })

    const mockConnection = new ScConnection('https://api.solace.cloud', 'test-token')
    orgManagerStub.createConnection.resolves(mockConnection)

    scConnStub = sinon.stub(ScConnection.prototype, 'post')   // match the verb under test
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
  })
})
```

Why it looks like this:

- **Stub the command's `getOrgManager` on the prototype**, not `resolveOrgConnection`.
  `getOrgManager` is `protected`, hence the `as unknown as Record<string, unknown>` cast.
  The stub must target the exact command class under test.
- **Stub `ScConnection.prototype.<verb>`**, one stub per HTTP verb the command uses. A
  command that resolves a name to an id needs two (`scConnGetStub` for the lookup,
  `scConnDeleteStub`/`scConnUpdateStub` for the action) — name them after the verb.
- **`createConnection` resolves a real `ScConnection`** whose methods are stubbed; the
  constructor rejects empty `baseURL`/`accessToken`, so pass the literals above.
- **Restore every stub in `afterEach`.** Leaked prototype stubs break unrelated files.

## Driving the command

`runCommand` from `@oclif/test` returns `{stdout, stderr, error, result}`:

```ts
const {stdout} = await runCommand(`platform:env:create --name=${envName}`)
const result = await runCommand('platform:env:list --pageSize=5')   // when expecting failure
expect(result.error).to.exist
```

Use the colon form of the command id (`platform:env:create`), not spaces.

## Assertions

Follow the Arrange / Act / Assert comment structure used throughout the suite.

```ts
// request URL + body
expect(scConnStub.getCall(0).calledWith('/platform/environments', expectBody)).to.be.true
// URL only (query strings)
expect(scConnGetStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
// org resolution
expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
// single-resource output
expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
// table output — rebuild the expected rows and render them the same way the command does
expect(stdout).to.contain(renderTable(envArray, {4: {width: 50, wrapWord: true}}))
// JSON output
const json = JSON.parse(stdout)
expect(json.data.map((e: Environment) => e.name)).to.deep.equal(['Default', 'Prod'])
```

`expectBody` must be the exact object the command builds — including which optional keys
are omitted. This is the assertion that catches a kebab→camel mapping mistake.

## Fixtures

Add a factory to `test/util/test-utils.ts` for each new resource, following `anEnv`:

```ts
export function aThing(name: string) {
  return {createdTime: '2024-09-05T19:54:42.766', id: `id${name}`, name, /* ... */}
}
```

Deriving the id as `` `id${name}` `` is the established trick — it lets a test assert
`/platform/things/idMyThing` without threading a separate constant through.

List tests also need a pagination meta helper; declare it at the top of the test file:

```ts
const aPagination = (pageNumber: number, pageSize: number, count: number, totalPages: number) => ({
  pagination: {count, nextPage: null, pageNumber, pageSize, totalPages},
})
```

## Testing list output

Table rendering depends on whether stdout is a TTY, which varies by environment. Pin it:

```ts
import {restoreStdoutIsTTY, setStdoutIsTTY} from '../../../util/test-utils'

let stdoutIsTTY: PropertyDescriptor | undefined

beforeEach(() => {
  stdoutIsTTY = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
  setStdoutIsTTY(false)   // non-TTY → buffered single table, deterministic
  // ...rest of harness
})

afterEach(() => {
  restoreStdoutIsTTY(stdoutIsTTY)
  // ...restores
})
```

Multi-page fetches are staged per call: `scConnStub.onCall(0).resolves({data: page1, meta: aPagination(1, 2, 2, 2)})`.

## Testing commands that prompt

Pass `--no-prompt` so `confirm()` is never reached. Do not stub `@inquirer/prompts`.
