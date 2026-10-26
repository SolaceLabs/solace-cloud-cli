# Working from the Solace Cloud OpenAPI specs

Index page: https://api.solace.dev/cloud/page/openapi-specifications

| API family | Spec URL | CLI topic |
|---|---|---|
| Platform | https://api.solace.dev/cloud/openapi/platform.json | `platform/` |
| Mission Control | https://api.solace.dev/cloud/openapi/mission-control.json | `missionctrl/` |
| Event Portal – Designer | https://api.solace.dev/cloud/openapi/event-portal-designer.json | (new topic) |
| Event Portal – Runtime | https://api.solace.dev/cloud/openapi/event-portal-runtime.json | (new topic) |
| Billing | https://api.solace.dev/cloud/openapi/billing.json | (new topic) |
| Micro-Integration (beta) | https://api.solace.dev/cloud/openapi/micro-integrations.json | (new topic) |

All are OpenAPI v2.0-era JSON (no YAML). Mission Control is ~440 KB — never read it whole.

## Extracting one operation

Download and query with node rather than fetching the whole document into context:

```bash
curl -s -o /tmp/platform.json https://api.solace.dev/cloud/openapi/platform.json

# find the path
node -e "console.log(Object.keys(require('/tmp/platform.json').paths).filter(p=>/environments/.test(p)))"

# read one operation: parameters, body schema, response schema
node -e "
const s = require('/tmp/platform.json')
const op = s.paths['/api/v2/platform/environments'].post
console.log(JSON.stringify({params: op.parameters, body: op.requestBody, responses: Object.keys(op.responses)}, null, 1))
"

# resolve a \$ref
node -e "console.log(JSON.stringify(require('/tmp/platform.json').components.schemas.Environment, null, 1))"
```

## Mapping a spec operation to a command

- **Path → URL.** Strip the `/api/v2` prefix; `ScConnection` adds it (it builds
  `baseURL + /api/v2` at construction). Spec `/api/v2/platform/environments/{id}` →
  command URL `` `/platform/environments/${id}` ``.
- **Servers.** The spec lists four regional hosts (`api.solace.cloud`,
  `api.solacecloud.com.au`, `.eu`, `.sg`). Commands never hardcode a host —
  `OrgManager.createConnection()` supplies it from the stored org config.
- **Method → verb.** `POST` → `create`, `GET` collection → `list`, `GET` by id →
  `display`, `PUT`/`PATCH` → `update`, `DELETE` → `delete`.
- **Query parameters → flags**, kebab-cased (`pageSize` → `--page-size`). Standard
  `pageSize`/`pageNumber` parameters are already covered by `paginationFlags()` — don't
  redefine them.
- **Request body properties → flags**, kebab-cased, with the spec's `required` list
  driving `required: true` and the spec's `default` mentioned in the flag description.
- **Enum parameters**: pass the allowed values through `Flags.string({options: [...]})`
  so oclif validates, and list them in the description. (`--sort` on existing list
  commands predates this and is a plain string; new enum flags should use `options`.)
- **Response schema → `src/types/<resource>.ts`.** Model the resource interface on the
  component schema, then wrap: `{data: T}` for single, `{data: T[]; meta: {pagination}}`
  for collections.
- **Token permissions.** Each operation documents required permissions (e.g.
  `environments:edit`, `services:post`). Put them in the command description as
  `Token Permissions: [ environments:edit ]` — existing commands all do, and users rely
  on it to diagnose 403s.

## Deviating from the spec

The CLI is deliberately friendlier than the raw API in two places; follow suit:

1. **Names instead of ids.** Where the API only accepts an id, the command also accepts
   `--name` and resolves it with a `GET ?name=<name>` first (see `platform env update`,
   `platform env delete`, and `--env-name` on `missionctrl broker create`). Error when
   the name matches more than one resource.
2. **Pagination.** `--all` follows every page client-side; the API has no such parameter.
