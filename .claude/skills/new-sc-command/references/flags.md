# Flag naming and definition rules

## kebab-case flags → camelCase API fields

The Solace Cloud API uses camelCase JSON field names. The CLI exposes **kebab-case**
flags. The command does the mapping explicitly — there is no automatic conversion.

| API field (spec) | CLI flag | Local variable |
|---|---|---|
| `datacenterId` | `--datacenter-id` | `const datacenterId = flags['datacenter-id'] ?? ''` |
| `msgVpnName` | `--msg-vpn-name` | `const msgVpnName = flags['msg-vpn-name'] ?? ''` |
| `maxSpoolUsage` | `--max-spool-usage` | `const maxSpoolUsage = flags['max-spool-usage'] ?? ''` |
| `redundancyGroupSslEnabled` | `--redundancy-group-ssl-enabled` | `flags['redundancy-group-ssl-enabled']` |
| `pageSize` | `--page-size` | `flags['page-size']` |

Pattern:

```ts
static override flags = {
  'datacenter-id': Flags.string({char: 'd', description: '...', required: true}),
}

public async run() {
  const {flags} = await this.parse(MyCommand)
  const datacenterId = flags['datacenter-id'] ?? ''        // kebab flag → camel local
  const body = {...(datacenterId && {datacenterId})}       // camel key in the body
}
```

Always read multi-word flags with bracket notation and immediately assign to a camelCase
local; then build the body from the locals so the body literal matches the spec's field
names exactly.

### The grandfathered exceptions

`--isDefault`, `--isProduction`, and `--locked` are already camelCase/single-word in
shipped commands (`platform env create`, `platform env update`). Leave them as-is —
renaming is a breaking change. **Do not use them as precedent.** Any new multi-word flag
is kebab-case. `--page-size`/`--page-number` replaced `--pageSize`/`--pageNumber` in
commit 2d05593 precisely to establish this convention.

## The four flags nearly every command has

```ts
alias: Flags.string({
  char: 'a',
  description: 'Organization alias to use. If not specified, uses the default organization.',
  exclusive: ['org'],
}),
org: Flags.string({
  char: 'o',
  description: 'Organization ID to use. If not specified, uses the default organization or alias if specified.',
  exclusive: ['alias'],
}),
```

Copy these descriptions verbatim — they are identical across all commands and the README
is generated from them.

For commands addressing one existing resource, offer both an id and a name and require
exactly one:

```ts
'env-id': Flags.string({char: 'e', description: 'Id of the environment.', exactlyOne: ['env-id', 'name']}),
name: Flags.string({char: 'n', description: 'Name of the environment.', exactlyOne: ['env-id', 'name']}),
```

Note `exactlyOne` is repeated on **every** member of the group, listing all members.

Destructive commands add:

```ts
'no-prompt': Flags.boolean({default: false, description: 'Skip confirmation prompt and assume Yes'}),
```

`update` commands that rename a resource use `--name` for the *current* name and
`--new-name` for the new one (description: `'Current name of the environment.'` /
`'New name of the environment.'`).

## Short characters (`char`)

Reserved across the CLI, do not reassign:

| char | flag |
|---|---|
| `a` | `--alias` |
| `o` | `--org` |
| `n` | `--name` |
| `d` | `--description` (or `--datacenter-id` on broker create) |
| `e` | `--env-id` / `--env-name` |
| `p` | `--page-number` (list only) |
| `s` | `--page-size` (list only) |

`char` is optional — only add one for flags users type often. `--new-name`, `--sort`,
`--no-prompt`, `--all`, `--isDefault`, `--isProduction` deliberately have none. Never
reuse a char within one command; oclif fails at runtime.

## Ordering and types

- **Flag keys must be alphabetically sorted** inside `static override flags = {...}`;
  `perfectionist/sort-objects` is an eslint error otherwise. Quoted kebab keys sort by
  their text (`'env-id'` before `isDefault` before `name` before `'new-name'` before
  `org`). The `...paginationFlags(...)` spread sorts by position of its first key
  (`all`) — in `platform env list` it sits between `org` and `sort`, which eslint accepts.
- Use `Flags.integer({min, max})` for numeric parameters so oclif validates bounds
  (see `paginationFlags`), not `Flags.string`.
- Use `Flags.boolean({default: false})` for API booleans that have a default; omit
  `default` when "unset" must be distinguishable from `false` (as in `platform env update`,
  where `...(flags.isDefault && {isDefault: flags.isDefault})` only sends the field when
  the user passed it).
- Mark `required: true` only for fields the API itself requires.
- Descriptions are sentences ending in a period. Document defaults in the description
  ("The default value is false."), since users see this in `--help` and the README.

## Description and examples

```ts
static override description = `Create a new environment.

  Token Permissions: [ environments:edit ]`
```

Always include the endpoint's required token permissions, copied from the OpenAPI
operation's security/description. Multi-line descriptions use a template literal with
two-space-indented continuation lines.

Examples use oclif's template tokens and should cover: minimal invocation, `--org`,
`--alias`, and one fully-loaded call:

```ts
static override examples = [
  '<%= config.bin %> <%= command.id %> --name=MyEnvironment',
  '<%= config.bin %> <%= command.id %> --org=my-org --name=MyEnvironment --description="My environment description"',
  '<%= config.bin %> <%= command.id %> --alias=my-alias --name=MyEnvironment',
]
```
