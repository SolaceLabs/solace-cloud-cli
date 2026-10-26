# Linting — verify by running the tests

There is no separate "check" step to remember: `npm test` runs mocha and then `posttest`
runs `npm run lint` (`eslint` over the repo, `eslint-config-oclif` + prettier). So:

```
npm test     # tests + lint over everything, ~1s
```

A clean `npm test` is the definition of done. If you ran only a direct mocha invocation
(`./node_modules/.bin/mocha "test/..."`), lint did **not** run — finish with
`npm run lint` or a full `npm test`. (`npm test -- <path>` does not scope the run; the
path is appended to the script's own glob.)

Lint a single file while iterating (use the local binary; `npx eslint` may fetch a
different major version):

```
./node_modules/.bin/eslint src/commands/platform/thing/create.ts
./node_modules/.bin/eslint --fix src/commands/platform/thing/create.ts
```

## The rules that actually bite

### `perfectionist/sort-objects` — alphabetical keys, everywhere

This is an **error**, and it applies to every object literal: `flags`, request bodies,
`columnConfig`, test fixtures, stub return values.

```ts
// error: Expected "isDefault" to come before "name"
const body = {name, isDefault, isProduction}
// ok
const body = {isDefault, isProduction, name}
```

With conditional spreads, the sort is judged on the keys as written, so keep the spreads
in alphabetical order of their inner key:

```ts
const body = {
  ...(datacenterId && {datacenterId}),
  ...(envId && {environmentId: envId}),
  ...(eventBrokerVersion && {eventBrokerVersion}),
  locked,
  ...(maxSpoolUsage && {maxSpoolUsage}),
  ...(msgVpnName && {msgVpnName}),
  name,
  redundancyGroupSslEnabled,
  serviceClassId,
}
```

Quoted kebab keys sort by their literal text: `'env-id'` < `isDefault` < `name` <
`'new-name'` < `org`. `--fix` resolves most of these automatically.

### `perfectionist/sort-union-types` — alphabetical union members

Also an **error**, and easy to miss because whether it fires depends on your resource
name. Union members sort **case-insensitively**, so `undefined` lands between `T…` and
`V…`:

```ts
let resp: EnvironmentListApiResponse | undefined   // ok    — e < u
let resp: ThingListApiResponse | undefined         // ok    — t < u
let resp: UserListApiResponse | undefined          // ERROR — "undefined" must come first
let resp: undefined | UserListApiResponse          // ok
let resp: undefined | ThingListApiResponse         // ERROR — "Thing…" must come first
```

There is **no order that is safe for every resource name** — the rule enforces exact
alphabetical position in both directions. So don't try to memorise one: after renaming
`Thing` to your resource in `templates/list.ts.template`, run

```
./node_modules/.bin/eslint --fix src/commands/<topic>/<subtopic>/list.ts
```

and let it place `undefined` correctly. The template ships with
`ThingListApiResponse | undefined`, which is correct for `Thing` and wrong for anything
sorting after `undefined`.

The same rule covers `Promise<ThingApiResponse | ThingListApiResponse>` in display
commands (two type names — alphabetical) and `string | undefined` in update/delete
(`s` < `u`, fine as written).

### `no-await-in-loop`

Sequential paging needs an inline disable, as in `src/lib/pagination.ts`:

```ts
// eslint-disable-next-line no-await-in-loop
const resp = await conn.get<R>(buildUrl(pageNumber, options.pageSize))
```

Prefer using `fetchPages()` so you never write the loop yourself.

### ESM import extensions

Runtime imports inside `src/` must use the `.js` extension even though the source is
TypeScript (`module: NodeNext`):

```ts
import {resolveOrgConnection} from '../../../lib/org-utils.js'
import {EnvironmentApiResponse} from '../../../types/environment.js'
```

Missing extensions compile under `tsc` in some configs but fail at runtime. Test files
import the command with `.js` too (`../../../../src/commands/platform/env/create.js`).

### Import ordering

`eslint-config-oclif` sorts imports: external packages first (alphabetical), blank line,
then relative imports (alphabetical). `--fix` handles it.

### Formatting

Prettier via `@oclif/prettier-config`: no semicolons, single quotes, 2-space indent, no
bracket spacing (`{flags}` not `{ flags }`), trailing commas in multiline literals.
Match the surrounding files and `--fix` will leave you alone.

## Type-level gotchas that surface as errors

- `printObjectAsKeyValueTable` needs `Record<string, unknown>`; the established cast is
  `resp.data as unknown as Record<string, unknown>`.
- `static override` is required on `args`, `description`, `examples`, `flags` — they
  override `ScCommand` members and `strict` mode rejects the plain form.
- `this.error()` returns `never`, so TypeScript narrows correctly after it; `this.warn()`
  does not — code after a `warn` still runs (this is why `platform env delete` uses a
  `foundMultiple` flag rather than falling through).
