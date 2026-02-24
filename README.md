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
@dishantlangayan/solace-cloud-cli/0.2.1 linux-x64 node-v22.22.0
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
* [`sc autocomplete [SHELL]`](#sc-autocomplete-shell)
* [`sc broker queue create`](#sc-broker-queue-create)
* [`sc broker queue list`](#sc-broker-queue-list)
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

## `sc broker queue create`

Create a Queue on a Solace Cloud Broker.

```
USAGE
  $ sc broker queue create -q <value> [--json] [--log-level debug|warn|error|info|trace] [-a exclusive|non-exclusive] [-b
    <value>] [-n <value>] [--consumer-ack-propagation-enabled] [--dead-msg-queue <value>] [--delivery-count-enabled]
    [--delivery-delay <value>] [--egress-enabled] [--ingress-enabled] [--max-bind-count <value>]
    [--max-delivered-unacked-msgs-per-flow <value>] [--max-msg-size <value>] [-s <value>] [--max-redelivery-count
    <value>] [--max-ttl <value>] [-o <value>] [-p consume|delete|modify-topic|no-access|read-only]
    [--redelivery-delay-enabled] [--redelivery-delay-initial-interval <value>] [--redelivery-delay-max-interval <value>]
    [--redelivery-delay-multiplier <value>] [--redelivery-enabled] [--reject-low-priority-msg-enabled]
    [--reject-low-priority-msg-limit <value>] [--reject-msg-to-sender-on-discard-behavior
    always|never|when-queue-enabled] [--respect-msg-priority-enabled] [--respect-ttl-enabled]

FLAGS
  -a, --access-type=<option>                               [default: exclusive] The access type for the queue.
                                                           <options: exclusive|non-exclusive>
  -b, --broker-id=<value>                                  Id of the event broker service.
  -n, --broker-name=<value>                                Name of the event broker service.
  -o, --owner=<value>                                      The client username that owns the queue and has permission
                                                           equivalent to delete.
  -p, --permission=<option>                                [default: no-access] The permission level for all consumers
                                                           of the queue, excluding the owner.
                                                           <options: consume|delete|modify-topic|no-access|read-only>
  -q, --queue-name=<value>                                 (required) The name of the queue to create.
  -s, --max-msg-spool-usage=<value>                        The maximum message spool usage allowed by the queue, in
                                                           megabytes (MB).
      --[no-]consumer-ack-propagation-enabled              Enable or disable the propagation of consumer
                                                           acknowledgments.
      --dead-msg-queue=<value>                             The name of the Dead Message Queue.
      --[no-]delivery-count-enabled                        Enable or disable delivery count on the messages.
      --delivery-delay=<value>                             The delay, in seconds, to apply to messages arriving on the
                                                           queue before the messages are eligible for delivery.
      --[no-]egress-enabled                                Enable or disable egress (message consumption) from the
                                                           queue.
      --[no-]ingress-enabled                               Enable or disable ingress (message reception) to the queue.
      --max-bind-count=<value>                             The maximum number of consumer flows that can bind to the
                                                           queue.
      --max-delivered-unacked-msgs-per-flow=<value>        The maximum number of messages delivered but not acknowledged
                                                           per flow.
      --max-msg-size=<value>                               The maximum message size allowed in the queue, in bytes.
      --max-redelivery-count=<value>                       The maximum number of times a message will be redelivered
                                                           before it is discarded or moved to the DMQ.
      --max-ttl=<value>                                    The maximum time in seconds a message can stay in the queue
                                                           when respect-ttl-enabled is true.
      --[no-]redelivery-delay-enabled                      Enable or disable a message redelivery delay.
      --redelivery-delay-initial-interval=<value>          The delay to be used between the first 2 redelivery attempts,
                                                           in milliseconds.
      --redelivery-delay-max-interval=<value>              The maximum delay to be used between any 2 redelivery
                                                           attempts, in milliseconds.
      --redelivery-delay-multiplier=<value>                The amount each delay interval is multiplied by after each
                                                           failed delivery attempt.
      --[no-]redelivery-enabled                            Enable or disable message redelivery.
      --[no-]reject-low-priority-msg-enabled               Enable or disable the checking of low priority messages
                                                           against the reject-low-priority-msg-limit.
      --reject-low-priority-msg-limit=<value>              The number of messages of any priority above which low
                                                           priority messages are not admitted.
      --reject-msg-to-sender-on-discard-behavior=<option>  Determines when to return negative acknowledgments (NACKs) to
                                                           sending clients on message discards.
                                                           <options: always|never|when-queue-enabled>
      --[no-]respect-msg-priority-enabled                  Enable or disable the respecting of message priority.
      --[no-]respect-ttl-enabled                           Enable or disable the respecting of the time-to-live (TTL)
                                                           for messages.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a Queue on a Solace Cloud Broker.

  Your token must have one of the permissions listed in the Token Permissions.

  Token Permissions: [ mission_control:access or services:get or services:get:self or services:view or
  services:view:self ]

EXAMPLES
  $ sc broker queue create --broker-id=MyBrokerId --queue-name=myQueue

  $ sc broker queue create --broker-name=MyBrokerName --queue-name=myQueue --access-type=exclusive

  $ sc broker queue create --broker-name=MyBrokerName --queue-name=myQueue --owner=user1 --permission=consume

  $ sc broker queue create --broker-id=MyBrokerId --queue-name=myQueue --max-spool-usage=100 --ingress-enabled --egress-enabled
```

_See code: [@dishantlangayan/sc-plugin-queue](https://github.com/dishantlangayan/sc-plugin-queue/blob/v0.1.1/src/commands/broker/queue/create.ts)_

## `sc broker queue list`

Get a list of Queue objects from the Solace Cloud Broker.

```
USAGE
  $ sc broker queue list [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-n <value>] [-c <value>] [-q
    <value>]

FLAGS
  -b, --broker-id=<value>    Id of the event broker service.
  -c, --count=<value>        [default: 10] Limit the number of queues returned
  -n, --broker-name=<value>  Name of the event broker service.
  -q, --queue-name=<value>   Name of the queue(s) to filter.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Get a list of Queue objects from the Solace Cloud Broker.

  Token Permissions: [ mission_control:access or services:get or services:get:self or services:view or
  services:view:self ]

EXAMPLES
  $ sc broker queue list --broker-id=MyBrokerId

  $ sc broker queue list --broker-name=MyBrokerName

  $ sc broker queue list --broker-name=MyBrokerName --count=10

  $ sc broker queue list --broker-name=MyBrokerName --queue-name=test*"
```

_See code: [@dishantlangayan/sc-plugin-queue](https://github.com/dishantlangayan/sc-plugin-queue/blob/v0.1.1/src/commands/broker/queue/list.ts)_

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
  $ sc missionctrl broker create -d <value> -n <value> -c <value> [--json] [--log-level debug|warn|error|info|trace] [-e
    <value>] [-l] [-s <value>] [-m <value>] [-r] [-v <value>]

FLAGS
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
```

_See code: [src/commands/missionctrl/broker/create.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/create.ts)_

## `sc missionctrl broker delete`

Delete a service using its unique identifier.

```
USAGE
  $ sc missionctrl broker delete [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-n <value>]

FLAGS
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.

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
```

_See code: [src/commands/missionctrl/broker/delete.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/delete.ts)_

## `sc missionctrl broker display`

Get the details of an event broker service using its identifier or name.

```
USAGE
  $ sc missionctrl broker display [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-n <value>]

FLAGS
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.

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
  $ sc missionctrl broker display
```

_See code: [src/commands/missionctrl/broker/display.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/display.ts)_

## `sc missionctrl broker list`

Get a listing of event broker services.

```
USAGE
  $ sc missionctrl broker list [--json] [--log-level debug|warn|error|info|trace] [-n <value>] [--pageNumber <value>]
    [--pageSize <value>] [--sort <value>]

FLAGS
  -n, --name=<value>
      Name of the event broker service to match on.

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

  $ sc missionctrl broker list --name=MyBrokerName --pageNumber=1 --pageSize=10 --sort=name:asc
```

_See code: [src/commands/missionctrl/broker/list.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/list.ts)_

## `sc missionctrl broker opstatus`

Get the status of all operations being performed on an event broker service. 

```
USAGE
  $ sc missionctrl broker opstatus [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-n <value>] [-p] [-w
  <value>]

FLAGS
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
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
```

_See code: [src/commands/missionctrl/broker/opstatus.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/opstatus.ts)_

## `sc missionctrl broker state`

Get the availability state of an event broker service and the name of the active messaging node using the service's unique identifier.

```
USAGE
  $ sc missionctrl broker state [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-n <value>]

FLAGS
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.

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
```

_See code: [src/commands/missionctrl/broker/state.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/state.ts)_

## `sc missionctrl broker update`

Update the configuration of an existing event broker service. 

```
USAGE
  $ sc missionctrl broker update [--json] [--log-level debug|warn|error|info|trace] [-b <value>] [-l <value>] [-n <value>]
    [--new-name <value>]

FLAGS
  -b, --broker-id=<value>  Id of the event broker service.
  -l, --locked=<value>     Indicates whether the event broker service has deletion protection enabled. The valid values
                           are 'true' (enabled) or 'false' (disabled).
  -n, --name=<value>       Name of the event broker service.
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

  $ sc missionctrl broker update --name <name> --new-name <new-name>
```

_See code: [src/commands/missionctrl/broker/update.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/missionctrl/broker/update.ts)_

## `sc platform env create`

Create a new environment.

```
USAGE
  $ sc platform env create -n <value> [--json] [--log-level debug|warn|error|info|trace] [-d <value>] [--isDefault]
    [--isProduction]

FLAGS
  -d, --description=<value>  Description of the environment to create.
  -n, --name=<value>         (required) Name of the environment to create.
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
  $ sc platform env create --name=MyEnvironment --description="My environment description" --isDefault --isProduction
```

_See code: [src/commands/platform/env/create.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/platform/env/create.ts)_

## `sc platform env delete`

Delete an environment using either its name or unique identifier. The default environment cannot be deleted.

```
USAGE
  $ sc platform env delete [--json] [--log-level debug|warn|error|info|trace] [-e <value>] [-n <value>]

FLAGS
  -e, --env-id=<value>  Id of the environment.
  -n, --name=<value>    Name of the environment.

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
```

_See code: [src/commands/platform/env/delete.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/platform/env/delete.ts)_

## `sc platform env display`

Display information about an Environment.

```
USAGE
  $ sc platform env display [--json] [--log-level debug|warn|error|info|trace] [-e <value>] [-n <value>]

FLAGS
  -e, --env-id=<value>  Id of the environment.
  -n, --name=<value>    Name of the environment.

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
```

_See code: [src/commands/platform/env/display.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/platform/env/display.ts)_

## `sc platform env list`

Get a list of all Environments. 

```
USAGE
  $ sc platform env list [--json] [--log-level debug|warn|error|info|trace] [-n <value>] [-p <value>] [-s <value>]
    [--sort <value>]

FLAGS
  -n, --name=<value>        Name of the environment to match on.
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

  $ sc platform env list --name=Default --pageNumber=1 --pageSize=10 --sort=name:ASC
```

_See code: [src/commands/platform/env/list.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/platform/env/list.ts)_

## `sc platform env update`

Modify an environment's attributes

```
USAGE
  $ sc platform env update [--json] [--log-level debug|warn|error|info|trace] [-d <value>] [-e <value>] [--isDefault] [-n
    <value>] [--new-name <value>]

FLAGS
  -d, --description=<value>  Description of the environment to update.
  -e, --env-id=<value>       Id of the environment.
  -n, --name=<value>         Current name of the environment.
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
  $ sc platform env update --name=MyEnvName --new-name=MyNewEnvName --description="My description to update" --isDefault

  $ sc platform env update --env-id=MyEnvId --new-name=MyNewEnvName --description="My description to update" --isDefault
```

_See code: [src/commands/platform/env/update.ts](https://github.com/dishantlangayan/solace-cloud-cli/blob/v0.2.1/src/commands/platform/env/update.ts)_

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
