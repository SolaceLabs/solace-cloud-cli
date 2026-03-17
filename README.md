@dishantlangayan/solace-cloud-cli
=================

The Solace Cloud CLI


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dishantlangayan/solace-cloud-cli.svg)](https://npmjs.org/package/@dishantlangayan/solace-cloud-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@dishantlangayan/solace-cloud-cli.svg)](https://npmjs.org/package/@dishantlangayan/solace-cloud-cli)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/license/apache-2-0)


<!-- toc -->
* [Overview](#overview)
* [Usage](#usage)
* [Configuration](#configuration)
* [Resources](#resources)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)
* [Commands](#commands)
<!-- tocstop -->
# Overview
<!-- overview -->
The Solace Cloud CLI is a command line interface that simplifies deployment, configuration, and automation when working with your Solace Cloud org and services.

Use it to:

* Create and manage Environments
* Create and manage Mission Control and Event Broker Services
* Script deployment of Solace Cloud resources in your org

The CLI is built using the [oclif framework](https://oclif.io) that allows for plugin based development where users can add and extend the functionality of this CLI. For example, a new command can be added that can create and manage VPN Bridges, which uses the SEMP API to provision the bridges across two Message VPN on the same broker or across two brokers.

<!-- overviewstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @dishantlangayan/solace-cloud-cli
$ sc COMMAND
running command...
$ sc (--version)
@dishantlangayan/solace-cloud-cli/0.4.0 linux-x64 node-v22.22.1
$ sc --help [COMMAND]
USAGE
  $ sc COMMAND
...
```
<!-- usagestop -->
# Configuration
<!-- configuration -->
To use any commands you will need to configure an Access Token in Solace Cloud Console with the appropriate permissions first. The access token can be set using the follow Environment Variable:

```
SC_ACCESS_TOKEN=<Your access token>
```

The following Environment variables are optional:

* SC_API_VERSION  - The API version of the Solace Cloud REST API. Default is `v2`.
* SC_BASE_URL     - The location of your Solace Home Cloud account determines the base URL you use. Default is `https://api.solace.cloud/`

<!-- configurationstop -->
# Resources
<!-- resources -->
This is not an officially supported Solace product.

For more information try these resources:
- Ask the [Solace Community](https://solace.community)
- The Solace Developer Portal website at: https://solace.dev

<!-- resourcesstop -->
# Contributing
<!-- contributing -->
Contributions are encouraged! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

<!-- contributingstop -->
# Authors
<!-- authors -->
See the list of [contributors](https://github.com/solacelabs/solace-cloud-cli/graphs/contributors) who participated in this project.

<!-- authorsstop -->
# License
<!-- license -->
See the [LICENSE](LICENSE) file for details.

<!-- licensestop -->
# Commands
<!-- commands -->
* [`sc account list`](#sc-account-list)
* [`sc account login`](#sc-account-login)
* [`sc account logout`](#sc-account-logout)
* [`sc autocomplete [SHELL]`](#sc-autocomplete-shell)
* [`sc commands`](#sc-commands)
* [`sc help [COMMAND]`](#sc-help-command)
* [`sc missionctrl broker create`](#sc-missionctrl-broker-create)
* [`sc missionctrl broker delete`](#sc-missionctrl-broker-delete)
* [`sc missionctrl broker display`](#sc-missionctrl-broker-display)
* [`sc missionctrl broker list`](#sc-missionctrl-broker-list)
* [`sc missionctrl broker opstatus`](#sc-missionctrl-broker-opstatus)
* [`sc missionctrl broker state`](#sc-missionctrl-broker-state)
* [`sc missionctrl broker update`](#sc-missionctrl-broker-update)
* [`sc platform env create`](#sc-platform-env-create)
* [`sc platform env delete`](#sc-platform-env-delete)
* [`sc platform env display`](#sc-platform-env-display)
* [`sc platform env list`](#sc-platform-env-list)
* [`sc platform env update`](#sc-platform-env-update)
* [`sc plugins`](#sc-plugins)
* [`sc plugins add PLUGIN`](#sc-plugins-add-plugin)
* [`sc plugins:inspect PLUGIN...`](#sc-pluginsinspect-plugin)
* [`sc plugins install PLUGIN`](#sc-plugins-install-plugin)
* [`sc plugins link PATH`](#sc-plugins-link-path)
* [`sc plugins remove [PLUGIN]`](#sc-plugins-remove-plugin)
* [`sc plugins reset`](#sc-plugins-reset)
* [`sc plugins uninstall [PLUGIN]`](#sc-plugins-uninstall-plugin)
* [`sc plugins unlink [PLUGIN]`](#sc-plugins-unlink-plugin)
* [`sc plugins update`](#sc-plugins-update)
* [`sc search`](#sc-search)
* [`sc update [CHANNEL]`](#sc-update-channel)
* [`sc version`](#sc-version)
* [`sc which`](#sc-which)

## `sc account list`

List all authenticated organizations.

```
USAGE
  $ sc account list [--json] [--log-level debug|warn|error|info|trace]

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List all authenticated organizations.

  Displays organizations you have logged into, including their aliases and which one is set as default.

EXAMPLES
  $ sc account list
```

_See code: [src/commands/account/list.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/account/list.ts)_

## `sc account login`

Login to a Solace Cloud organization.

```
USAGE
  $ sc account login -o <value> [--json] [--log-level debug|warn|error|info|trace] [-a <value>] [--api-version
    <value>] [--base-url <value>] [--no-prompt] [-d]

FLAGS
  -a, --alias=<value>        Alias name for this organization (allows storing multiple tokens for the same org with
                             different aliases)
  -d, --set-default          Set this organization as the default
  -o, --org=<value>          (required) Organization ID to login to
      --api-version=<value>  API version to use (optional)
      --base-url=<value>     Custom base URL for Solace Cloud API (optional)
      --no-prompt            Read access token from SC_ACCESS_TOKEN environment variable instead of prompting

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Login to a Solace Cloud organization.

  Stores organization credentials securely using OS keychain.
  The access token is encrypted and stored locally.

  You can store multiple access tokens for the same organization by using unique aliases.
  Without an alias, only one token per organization ID is allowed.

  Required token permissions: Varies by operations you intend to perform

EXAMPLES
  $ sc account login --org=my-org-id

  $ sc account login --org=my-org-id --alias=production

  $ sc account login --org=my-org-id --alias=staging

  $ sc account login --org=my-org-id --set-default

  $ sc account login --org=my-org-id --no-prompt

  $ sc account login --org=my-org-id --base-url=https://api.custom.solace.cloud
```

_See code: [src/commands/account/login.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/account/login.ts)_

## `sc account logout`

Logout from authenticated organizations.

```
USAGE
  $ sc account logout [--json] [--log-level debug|warn|error|info|trace] [-a] [--no-prompt] [-o <value>]

FLAGS
  -a, --all          Logout of all organizations
  -o, --org=<value>  Organization ID or alias to logout from
      --no-prompt    Skip confirmation prompt and assume Yes

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Logout from authenticated organizations.

  Removes locally stored organization credentials and access tokens.
  Interactive mode allows selection with arrow keys and spacebar.

EXAMPLES
  $ sc account logout

  $ sc account logout --org=my-org-id

  $ sc account logout --org=production

  $ sc account logout --all

  $ sc account logout --org=my-org-id --no-prompt
```

_See code: [src/commands/account/logout.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/account/logout.ts)_

## `sc autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ sc autocomplete [SHELL] [-r]

ARGUMENTS
  [SHELL]  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ sc autocomplete

  $ sc autocomplete bash

  $ sc autocomplete zsh

  $ sc autocomplete powershell

  $ sc autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.40/src/commands/autocomplete/index.ts)_

## `sc commands`

List all sc commands.

```
USAGE
  $ sc commands [--json] [-c id|plugin|summary|type... | --tree] [--deprecated] [-x | ] [--hidden]
    [--no-truncate | ] [--sort id|plugin|summary|type | ]

FLAGS
  -c, --columns=<option>...  Only show provided columns (comma-separated).
                             <options: id|plugin|summary|type>
  -x, --extended             Show extra columns.
      --deprecated           Show deprecated commands.
      --hidden               Show hidden commands.
      --no-truncate          Do not truncate output.
      --sort=<option>        [default: id] Property to sort by.
                             <options: id|plugin|summary|type>
      --tree                 Show tree of commands.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all sc commands.
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v4.1.40/src/commands/commands.ts)_

## `sc help [COMMAND]`

Display help for sc.

```
USAGE
  $ sc help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sc.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `sc missionctrl broker create`

Create an event broker service. You must provide a unique name and select a service class and datacenter. You can optionally define other properties for the event broker service.

```
USAGE
  $ sc missionctrl broker create -d <value> -n <value> -c <value> [--json] [--log-level debug|warn|error|info|trace] [-a
    <value> | -o <value>] [-e <value>] [-l] [-s <value>] [-m <value>] [-r] [-v <value>]

FLAGS
  -a, --alias=<value>
      Organization alias to use. If not specified, uses the default organization.

  -c, --service-class-id=<value>
      (required) Supported service classes.

  -d, --datacenter-id=<value>
      (required) The identifier of the datacenter.

  -e, --env-name=<value>
      The name of the environment environment where you want to create the service.
      You can only specify an environment identifier when creating services in a Public Region.
      You cannot specify an environment identifier when creating a service in a Dedicated Region.
      If no name is provided, the service will be created in the default environment.

  -l, --locked
      Indicates if you can delete the event broker service after creating it. The default value is false.

  -m, --msg-vpn-name=<value>
      The message VPN name. A default message VPN name is provided when this is not specified.

  -n, --name=<value>
      (required) Name of the event broker service to create.

  -o, --org=<value>
      Organization ID to use. If not specified, uses the default organization or alias if specified.

  -r, --redundancy-group-ssl-enabled
      Enable or disable SSL for the redundancy group (for mate-link encryption). The default value is false (disabled)

  -s, --max-spool-usage=<value>
      The message spool size, in gigabytes (GB). A default message spool size is provided if this is not specified.

  -v, --version=<value>
      The event broker version. A default version is provided when this is not specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create an event broker service. You must provide a unique name and select a service class and datacenter. You can
  optionally define other properties for the event broker service.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ `services:post` ]

EXAMPLES
  $ sc missionctrl broker create --name=MyBrokerName --datacenter-id=eks-ca-central-1a --service-class-id=DEVELOPER

  $ sc missionctrl broker create --org=my-org --name=MyBrokerName --datacenter-id=eks-ca-central-1a --service-class-id=DEVELOPER

  $ sc missionctrl broker create --alias=my-alias --name=MyBrokerName --datacenter-id=eks-ca-central-1a --service-class-id=DEVELOPER
```

_See code: [src/commands/missionctrl/broker/create.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/create.ts)_

## `sc missionctrl broker delete`

Delete a service using its unique identifier.

```
USAGE
  $ sc missionctrl broker delete [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-n
    <value>]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a service using its unique identifier.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ `services:delete` **or** `services:delete:self` **or** `mission_control:access` ]

EXAMPLES
  $ sc missionctrl broker delete --broker-id=MyBrokerId

  $ sc missionctrl broker delete --name=MyBrokerName

  $ sc missionctrl broker delete --org=my-org --broker-id=MyBrokerId

  $ sc missionctrl broker delete --alias=my-alias --name=MyBrokerName
```

_See code: [src/commands/missionctrl/broker/delete.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/delete.ts)_

## `sc missionctrl broker display`

Get the details of an event broker service using its identifier or name.

```
USAGE
  $ sc missionctrl broker display [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-n
    <value>]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get the details of an event broker service using its identifier or name.

  Use either the Event Broker's ID (--broker-id) or name of the Event Broker (--name).

  Token Permissions: [ `mission_control:access` **or** `services:get` **or** `services:get:self` **or** `services:view`
  **or** `services:view:self` ]

EXAMPLES
  $ sc missionctrl broker display --broker-id=MyBrokerId

  $ sc missionctrl broker display --org=my-org --name=MyBrokerName

  $ sc missionctrl broker display --alias=my-alias --name=MyBrokerName
```

_See code: [src/commands/missionctrl/broker/display.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/display.ts)_

## `sc missionctrl broker list`

Get a listing of event broker services.

```
USAGE
  $ sc missionctrl broker list [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-n <value>]
    [--pageNumber <value>] [--pageSize <value>] [--sort <value>]

FLAGS
  -a, --alias=<value>
      Organization alias to use. If not specified, uses the default organization.

  -n, --name=<value>
      Name of the event broker service to match on.

  -o, --org=<value>
      Organization ID to use. If not specified, uses the default organization or alias if specified.

  --pageNumber=<value>
      The page number to get. Defaults to 1

  --pageSize=<value>
      The number of event broker services to return per page. Defaults to 10

  --sort=<value>
      Sort the returned event broker services by attribute.

      You can use the following value formats for the sort order:

      * attributes-names
      * attributes-names:sort-order

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get a listing of event broker services.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ `mission_control:access` **or** `services:get` **or** `services:get:self` **or** `services:view`
  **or** `services:view:self` ]

EXAMPLES
  $ sc missionctrl broker list

  $ sc missionctrl broker list --org=my-org

  $ sc missionctrl broker list --alias=my-alias --name=MyBrokerName --pageNumber=1 --pageSize=10 --sort=name:asc
```

_See code: [src/commands/missionctrl/broker/list.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/list.ts)_

## `sc missionctrl broker opstatus`

Get the status of all operations being performed on an event broker service. 

```
USAGE
  $ sc missionctrl broker opstatus [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-n
    <value>] [-p] [-w <value>]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.
  -p, --show-progress      Displays a status bar of the in-progress operations. The command will wait for completion of
                           each step of the operation.
  -w, --wait-ms=<value>    The milliseconds to wait between API calls for checking progress of the operation. Default is
                           5000 ms.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get the status of all operations being performed on an event broker service.
  To get the operation status, you must provide the identifier or name of the event broker service.

  Token Permissions: [ mission_control:access or services:get or services:get:self or services:view or
  services:view:self ]

EXAMPLES
  $ sc missionctrl broker opstatus -b <broker-id>

  $ sc missionctrl broker opstatus -n <broker-name>

  $ sc missionctrl broker opstatus --org=my-org -b <broker-id>

  $ sc missionctrl broker opstatus --alias=my-alias -b <broker-id>
```

_See code: [src/commands/missionctrl/broker/opstatus.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/opstatus.ts)_

## `sc missionctrl broker state`

Get the availability state of an event broker service and the name of the active messaging node using the service's unique identifier.

```
USAGE
  $ sc missionctrl broker state [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-n
    <value>]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get the availability state of an event broker service and the name of the active messaging node using the service's
  unique identifier.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ mission_control:access or services:get or services:get:self or services:view or
  services:view:self ]

EXAMPLES
  $ sc missionctrl broker state --broker-id=MyBrokerServiceId

  $ sc missionctrl broker state --name=MyBrokerName

  $ sc missionctrl broker state --org=my-org --broker-id=MyBrokerServiceId

  $ sc missionctrl broker state --alias=my-alias --name=MyBrokerName
```

_See code: [src/commands/missionctrl/broker/state.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/state.ts)_

## `sc missionctrl broker update`

Update the configuration of an existing event broker service. 

```
USAGE
  $ sc missionctrl broker update [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-l
    <value>] [-n <value>] [--new-name <value>]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -l, --locked=<value>     Indicates whether the event broker service has deletion protection enabled. The valid values
                           are 'true' (enabled) or 'false' (disabled).
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.
      --new-name=<value>   New name of the event broker service. The new service name must be unique within an
                           organization.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Update the configuration of an existing event broker service.
  You can provide any combination of supported flags. If a flag is not provided, then it will not be updated.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ mission_control:access or services:put ]

EXAMPLES
  $ sc missionctrl broker update

  $ sc missionctrl broker update --broker-id <broker-id> --new-name <new-name>

  $ sc missionctrl broker update --org=my-org --name <name> --new-name <new-name>

  $ sc missionctrl broker update --alias=my-alias --name <name> --new-name <new-name>
```

_See code: [src/commands/missionctrl/broker/update.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/missionctrl/broker/update.ts)_

## `sc platform env create`

Create a new environment.

```
USAGE
  $ sc platform env create -n <value> [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-d
    <value>] [--isDefault] [--isProduction]

FLAGS
  -a, --alias=<value>        Organization alias to use. If not specified, uses the default organization.
  -d, --description=<value>  Description of the environment to create.
  -n, --name=<value>         (required) Name of the environment to create.
  -o, --org=<value>          Organization ID to use. If not specified, uses the default organization or alias if
                             specified.
      --isDefault            Indicates this is the organization's default environment.
      --isProduction         Indicates this is an organization's production environment.
                             This is an immutable field. If an environment needs to be migrated,
                             architecture can be migrated to a new environment with the desired
                             environment type instead.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a new environment.

  Token Permissions: [ environments:edit ]

EXAMPLES
  $ sc platform env create --name=MyEnvironment

  $ sc platform env create --org=my-org --name=MyEnvironment --description="My environment description" --isDefault --isProduction

  $ sc platform env create --alias=my-alias --name=MyEnvironment --isDefault
```

_See code: [src/commands/platform/env/create.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/platform/env/create.ts)_

## `sc platform env delete`

Delete an environment using either its name or unique identifier. The default environment cannot be deleted.

```
USAGE
  $ sc platform env delete [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-e <value>] [-n
    <value>]

FLAGS
  -a, --alias=<value>   Organization alias to use. If not specified, uses the default organization.
  -e, --env-id=<value>  Id of the environment.
  -n, --name=<value>    Name of the environment.
  -o, --org=<value>     Organization ID to use. If not specified, uses the default organization or alias if specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete an environment using either its name or unique identifier. The default environment cannot be deleted.

  Token Permissions: [ environments:edit ]

EXAMPLES
  $ sc platform env delete --name=MyEnvName

  $ sc platform env delete --env-id=MyEnvId

  $ sc platform env delete --org=my-org --name=MyEnvName

  $ sc platform env delete --alias=my-alias --name=MyEnvName
```

_See code: [src/commands/platform/env/delete.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/platform/env/delete.ts)_

## `sc platform env display`

Display information about an Environment.

```
USAGE
  $ sc platform env display [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-e <value>] [-n
    <value>]

FLAGS
  -a, --alias=<value>   Organization alias to use. If not specified, uses the default organization.
  -e, --env-id=<value>  Id of the environment.
  -n, --name=<value>    Name of the environment.
  -o, --org=<value>     Organization ID to use. If not specified, uses the default organization or alias if specified.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Display information about an Environment.

  Use either the Environment's ID (--env-id) or name of the Environment (--name).

  Required token permissions: [ environments:view ]

EXAMPLES
  $ sc platform env display --name=MyEnvName

  $ sc platform env display --env-id=MyEnvId

  $ sc platform env display --org=my-org --env-id=MyEnvId

  $ sc platform env display --alias=my-alias --name=MyEnvName
```

_See code: [src/commands/platform/env/display.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/platform/env/display.ts)_

## `sc platform env list`

Get a list of all Environments. 

```
USAGE
  $ sc platform env list [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-n <value>] [-p
    <value>] [-s <value>] [--sort <value>]

FLAGS
  -a, --alias=<value>       Organization alias to use. If not specified, uses the default organization.
  -n, --name=<value>        Name of the environment to match on.
  -o, --org=<value>         Organization ID to use. If not specified, uses the default organization or alias if
                            specified.
  -p, --pageNumber=<value>  The page number to get. Defaults to 10
  -s, --pageSize=<value>    The number of environments to get per page. Defaults to 1
      --sort=<value>        The query (fieldName:<ASC/DESC>) used to sort the environment list in the response.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get a list of all Environments.

  Required token permissions: [ environments:view ]

EXAMPLES
  $ sc platform env list

  $ sc platform env list --org=my-org

  $ sc platform env list --alias=my-alias --name=Default --pageNumber=1 --pageSize=10 --sort=name:ASC
```

_See code: [src/commands/platform/env/list.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/platform/env/list.ts)_

## `sc platform env update`

Modify an environment's attributes

```
USAGE
  $ sc platform env update [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-d <value>] [-e
    <value>] [--isDefault] [-n <value>] [--new-name <value>]

FLAGS
  -a, --alias=<value>        Organization alias to use. If not specified, uses the default organization.
  -d, --description=<value>  Description of the environment to update.
  -e, --env-id=<value>       Id of the environment.
  -n, --name=<value>         Current name of the environment.
  -o, --org=<value>          Organization ID to use. If not specified, uses the default organization or alias if
                             specified.
      --isDefault            Indicates this is the organization's default environment. The default value is false.
      --new-name=<value>     New name of the environment.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Modify an environment's attributes

  Use either the Environment's ID (--env-id) or name of the Environment (--name).

  Token Permissions: [ environments:edit ]


EXAMPLES
  $ sc platform env update --name=MyEnvName --new-name=MyNewEnvName

  $ sc platform env update --env-id=MyEnvId --new-name=MyNewEnvName --description="My description to update" --isDefault

  $ sc platform env update --org=my-org --name=MyEnvName --isDefault

  $ sc platform env update --alias=my-alias --name=MyEnvName --new-name=MyNewEnvName
```

_See code: [src/commands/platform/env/update.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.4.0/src/commands/platform/env/update.ts)_

## `sc plugins`

List installed plugins.

```
USAGE
  $ sc plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/index.ts)_

## `sc plugins add PLUGIN`

Installs a plugin into sc.

```
USAGE
  $ sc plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sc.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SC_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SC_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sc plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sc plugins add myplugin

  Install a plugin from a github url.

    $ sc plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sc plugins add someuser/someplugin
```

## `sc plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sc plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sc plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/inspect.ts)_

## `sc plugins install PLUGIN`

Installs a plugin into sc.

```
USAGE
  $ sc plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sc.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SC_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SC_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sc plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sc plugins install myplugin

  Install a plugin from a github url.

    $ sc plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sc plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/install.ts)_

## `sc plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ sc plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ sc plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/link.ts)_

## `sc plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sc plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sc plugins unlink
  $ sc plugins remove

EXAMPLES
  $ sc plugins remove myplugin
```

## `sc plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ sc plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/reset.ts)_

## `sc plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sc plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sc plugins unlink
  $ sc plugins remove

EXAMPLES
  $ sc plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/uninstall.ts)_

## `sc plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sc plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sc plugins unlink
  $ sc plugins remove

EXAMPLES
  $ sc plugins unlink myplugin
```

## `sc plugins update`

Update installed plugins.

```
USAGE
  $ sc plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/update.ts)_

## `sc search`

Search for a command.

```
USAGE
  $ sc search

DESCRIPTION
  Search for a command.

  Once you select a command, hit enter and it will show the help for that command.
```

_See code: [@oclif/plugin-search](https://github.com/oclif/plugin-search/blob/v1.2.38/src/commands/search.ts)_

## `sc update [CHANNEL]`

update the sc CLI

```
USAGE
  $ sc update [CHANNEL] [--force |  | [-a | -v <value> | -i]] [-b ]

FLAGS
  -a, --available        See available versions.
  -b, --verbose          Show more details about the available versions.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the sc CLI

EXAMPLES
  Update to the stable channel:

    $ sc update stable

  Update to a specific version:

    $ sc update --version 1.0.0

  Interactively select version:

    $ sc update --interactive

  See available versions:

    $ sc update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v4.7.19/src/commands/update.ts)_

## `sc version`

```
USAGE
  $ sc version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.36/src/commands/version.ts)_

## `sc which`

Show which plugin a command is in.

```
USAGE
  $ sc which [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Show which plugin a command is in.

EXAMPLES
  See which plugin the `help` command is in:

    $ sc which help

  Use colon separators.

    $ sc which foo:bar:baz

  Use spaces as separators.

    $ sc which foo bar baz

  Wrap command in quotes to use spaces as separators.

    $ sc which "foo bar baz"
```

_See code: [@oclif/plugin-which](https://github.com/oclif/plugin-which/blob/v3.2.43/src/commands/which.ts)_
<!-- commandsstop -->
