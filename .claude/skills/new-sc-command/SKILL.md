---
name: new-sc-command
description: Scaffold a new Oclif command (and its tests) for the Solace Cloud CLI, following the conventions established by `sc platform env create|delete|update|list|display`. Use when adding, modifying, or reviewing any command under src/commands/, wiring a new Solace Cloud API endpoint into the CLI, adding flags to an existing command, or writing tests for a command. Triggers on "new command", "add a command", "add a topic", "wire up <API> endpoint", "add flag to", or naming any Solace Cloud API (Platform, Mission Control, Event Portal, Billing, Micro-Integration).
---

# Adding a command to the Solace Cloud CLI

Commands are thin, declarative wrappers over one Solace Cloud REST endpoint. The job is
almost always: parse flags → resolve an org connection → build a URL and body → call the
API → print a table → return the raw response for `--json`.

Read the five reference commands before writing anything. They are the spec:

| Shape | Command | Test |
|---|---|---|
| create (POST) | `src/commands/platform/env/create.ts` | `test/commands/platform/env/create.test.ts` |
| display (GET one) | `src/commands/platform/env/display.ts` | `.../display.test.ts` |
| list (GET paginated) | `src/commands/platform/env/list.ts` | `.../list.test.ts` |
| update (PUT) | `src/commands/platform/env/update.ts` | `.../update.test.ts` |
| delete (DELETE) | `src/commands/platform/env/delete.ts` | `.../delete.test.ts` |

Scaffold the files with `oclif generate command` (step 3 below), then replace their
contents with the matching template from `templates/` — `create.ts.template`,
`display.ts.template`, `list.ts.template`, `update.ts.template`, `delete.ts.template`,
`test.ts.template`. They are written against a fictional `platform thing` resource and
have been verified to lint, typecheck, and pass; rename `Thing`/`thing`/`things`
throughout. Deeper rules live in `references/`:

- `references/flags.md` — flag naming, kebab→camel mapping, shared flags, `char` registry
- `references/testing.md` — the Mocha/Chai/Sinon harness and what to assert
- `references/linting.md` — how to verify, and the rules that fail most often
- `references/openapi.md` — spec URLs and how to map an operation to a command

## Workflow

1. **Find the endpoint in the OpenAPI spec.** Fetch the relevant spec and read the
   operation's parameters, request body, and response schema. Do not guess field names.
   See `references/openapi.md` for spec URLs and how to extract an operation.
2. **Pick the command id.** `src/commands/<topic>/<subtopic>/<verb>.ts` maps to
   `sc <topic> <subtopic> <verb>` (`topicSeparator` is a space). Topic mirrors the API
   family: `platform/`, `missionctrl/`, `account/`. Verbs are `create`, `delete`,
   `update`, `list`, `display` — use `display` (not `get`/`show`) for single-resource
   reads. Class name is PascalCase of the path: `PlatformEnvCreate`.
3. **Generate the scaffolding with oclif.** Always start here rather than hand-creating
   files — it creates both the command and its test file in the right places with the
   correct class name:
   ```
   ./node_modules/.bin/oclif generate command <topic>:<subtopic>:<verb>
   ```
   e.g. `oclif generate command platform:users:list` creates
   `src/commands/platform/users/list.ts` and `test/commands/platform/users/list.test.ts`.
   See "Generating the scaffolding" below for what it emits and what to strip.
4. **Add/extend the response types** in `src/types/<resource>.ts`: a resource interface,
   `<Resource>ApiResponse` (`{data: T}`), and `<Resource>ListApiResponse`
   (`{data: T[]; meta: {pagination: {...}}}`). Mirror the spec's schema; mark everything
   optional except the fields the API always returns.
5. **Replace the generated command body** with the matching template from `templates/`.
   Flag naming rules are non-negotiable — see `references/flags.md`.
6. **Replace the generated test** with a small test file — see `references/testing.md`.
   Cover core functionality only: the happy path, one meaningful flag variation, and
   `--alias`/`--org` resolution. Do not write exhaustive tests.
7. **Run the tests, which also lint:**
   ```
   npm test
   ```
   `posttest` runs `npm run lint` (eslint over the whole repo), so a green run means no
   lint errors. The whole suite takes about a second — just run all of it. Both must be
   clean before you report done.

   Most lint failures here are mechanical ordering rules, so run
   `./node_modules/.bin/eslint --fix src/commands/<path> test/commands/<path>` on your new
   files first and let it sort things out. The two that bite are
   `perfectionist/sort-objects` and `perfectionist/sort-union-types` (the latter fires or
   not depending on your resource name) — see `references/linting.md`.
8. **Regenerate README docs** with `./node_modules/.bin/oclif readme` only if the user
   asks; otherwise note that `npm run prepack` / `npm version` does it on release.

   Check the diff before keeping it. `oclif readme` rewrites the whole command reference
   from the *currently installed* plugins and the *current machine*, so it routinely
   sweeps in changes unrelated to your command:
   - the usage line embeds platform and node version
     (`…/0.7.0 linux-x64 node-v24.21.0` → `darwin-arm64 node-v24.1.0`)
   - `@dishantlangayan/sc-plugin-broker` command docs and their `See code:` version links
     are re-emitted at the installed version, which may be ahead of what the committed
     README was generated from

   If `git diff --stat README.md` is hundreds of lines for one new command, that is
   pre-existing drift, not your change. Either revert it (`git checkout README.md`) and
   leave the README to the release flow, or tell the user what else moved so they can
   decide — don't quietly commit unrelated churn.

## Generating the scaffolding

`oclif generate command <topic>:<subtopic>:<verb>` is the required first step. It is
purely additive — it creates two files and does not touch `package.json`, the README, or
the oclif manifest (commands are discovered from `./dist/commands`, so no registration is
needed).

```
./node_modules/.bin/oclif generate command platform:users:list
# Adding platform users list to @dishantlangayan/solace-cloud-cli!
# Creating src/commands/platform/users/list.ts
# Creating test/commands/platform/users/list.test.ts
```

Useful flags: `--force` overwrites existing files (needed when regenerating over a
command you have already started), `--commands-dir` changes the target directory (leave
it at the default `src/commands`).

What it emits is generic oclif boilerplate — a `hello world` command extending `Command`,
with placeholder `force`/`name` flags, a `file` arg, and a two-case test asserting
`'hello world'`. **Keep only the file paths and the class name**; everything inside both
files gets replaced. Specifically, you must:

- change `extends Command` to `extends ScCommand<typeof PlatformUsersList>` and swap the
  import from `@oclif/core` to `{ScCommand}` from `@dishantlangayan/sc-cli-core` (keep
  `{Flags}` from `@oclif/core`)
- delete the `Args` import and the `file` arg, leaving `static override args = {}` —
  commands in this CLI take flags, not positional args
- delete the placeholder `force`/`name` flags and the `hello ${name}` log, which contains
  an absolute path from the generating machine
- change the `run()` return type from `Promise<void>` to the response type

The generated class name is PascalCase of the command id (`platform:users:list` →
`PlatformUsersList`), which already matches the convention — don't rename it. Note the
generated code passes eslint as-is, so a clean lint run is not evidence you finished the
replacement.

## The anatomy every command shares

```ts
import {printObjectAsKeyValueTable, ScCommand} from '@dishantlangayan/sc-cli-core'
import {Flags} from '@oclif/core'

import {resolveOrgConnection} from '../../../lib/org-utils.js'   // .js extension required
import {ThingApiResponse} from '../../../types/thing.js'

export default class PlatformThingCreate extends ScCommand<typeof PlatformThingCreate> {
  static override args = {}
  static override description = `One-line summary.

  Token Permissions: [ things:edit ]`
  static override examples = [/* '<%= config.bin %> <%= command.id %> --name=X' */]
  static override flags = {/* alphabetically sorted */}

  public async run(): Promise<ThingApiResponse> {
    const {flags} = await this.parse(PlatformThingCreate)
    const conn = await resolveOrgConnection(this, flags.org ?? flags.alias)
    const resp = await conn.post<ThingApiResponse>('/platform/things', body)
    this.log(printObjectAsKeyValueTable(resp.data as unknown as Record<string, unknown>))
    return resp // oclif prints this as JSON when --json is set
  }
}
```

Non-obvious invariants:

- **Extend `ScCommand`, never `Command`.** It supplies `--json`, `--log-level`, and
  `getOrgManager()`.
- **Always resolve the connection with `resolveOrgConnection(this, flags.org ?? flags.alias)`.**
  Never construct `ScConnection` directly in a command; the helper owns all the
  "no default org" / "org not found" error messages.
- **API URLs omit `/api/v2`.** `ScConnection` prepends it. A spec path of
  `/api/v2/platform/environments` becomes `/platform/environments`.
- **`run()` returns the response object** and separately logs a human table. The return
  value is what `--json` emits — never `JSON.stringify` to stdout yourself.
- **Build request bodies with conditional spreads** so unset optional flags are omitted
  rather than sent as `""`/`false`:
  `{...(desc && {description: desc}), isDefault, name}`.
- **Resolve name → id when the API only accepts an id.** `update`/`delete` take
  `--name` or `--<resource>-id` via `exactlyOne`, and when given a name they GET
  `?name=<name>` first. If more than one matches, `this.error(...)` for update and
  `this.warn(...)` + exit for delete (see the two reference files — the handling
  deliberately differs).
- **Destructive commands get `--no-prompt`** and an `@inquirer/prompts` `confirm()`
  guarded by try/catch (Ctrl+C must exit 0 with "cancelled", not a stack trace).
- **List commands never hand-roll pagination.** Spread `paginationFlags()` and iterate
  `fetchPages()` from `src/lib/pagination.ts`, writing rows through `createTableWriter()`
  so `--all` streams. See `templates/list.ts.template`.

## Output helpers

From `@dishantlangayan/sc-cli-core`:

- `printObjectAsKeyValueTable(obj)` — single resource (create/update/display).
- `createTableWriter(header, {...})` from `src/lib/pagination.ts` — list output.
- `renderTable(rows, columnConfig)` — the underlying renderer; tests use it to build
  expected output.
