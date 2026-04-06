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
* [Authenticating with Solace Cloud](#authenticating-with-solace-cloud)
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

> [!TIP]
> For more information see the Solace Cloud CLI [Documentation](https://dishantlangayan.github.io/sc-cli/)

<!-- overviewstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @dishantlangayan/solace-cloud-cli
$ sc COMMAND
running command...
$ sc (--version)
@dishantlangayan/solace-cloud-cli/0.5.2 darwin-arm64 node-v24.1.0
$ sc --help [COMMAND]
USAGE
  $ sc COMMAND
...
```
<!-- usagestop -->
# Authenticating with Solace Cloud
<!-- configuration -->
To use any commands you will need to configure an Access Token in Solace Cloud Console with the appropriate permissions first. You can then authorize the CLI to use your Solace Cloud by setting the access token using the `account:login` command:

```bash
sc account login --org <Your Org Name>
```

Refer to the [Solace Cloud CLI documention](https://dishantlangayan.github.io/sc-cli/docs/getting-started/sc-authentication) for more information.

<!-- configurationstop -->
# Resources
<!-- resources -->
This is not an officially supported Solace product.

For more information try these resources:
- Solace Cloud CLI [Documentation](https://dishantlangayan.github.io/sc-cli/docs/intro)
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
* [`sc broker acl-profile client-connect-exceptions create`](#sc-broker-acl-profile-client-connect-exceptions-create)
* [`sc broker acl-profile client-connect-exceptions delete`](#sc-broker-acl-profile-client-connect-exceptions-delete)
* [`sc broker acl-profile client-connect-exceptions list`](#sc-broker-acl-profile-client-connect-exceptions-list)
* [`sc broker acl-profile create`](#sc-broker-acl-profile-create)
* [`sc broker acl-profile delete`](#sc-broker-acl-profile-delete)
* [`sc broker acl-profile display`](#sc-broker-acl-profile-display)
* [`sc broker acl-profile list`](#sc-broker-acl-profile-list)
* [`sc broker acl-profile publish-topic-exceptions create`](#sc-broker-acl-profile-publish-topic-exceptions-create)
* [`sc broker acl-profile publish-topic-exceptions delete`](#sc-broker-acl-profile-publish-topic-exceptions-delete)
* [`sc broker acl-profile publish-topic-exceptions list`](#sc-broker-acl-profile-publish-topic-exceptions-list)
* [`sc broker acl-profile subscribe-share-name-exceptions create`](#sc-broker-acl-profile-subscribe-share-name-exceptions-create)
* [`sc broker acl-profile subscribe-share-name-exceptions delete`](#sc-broker-acl-profile-subscribe-share-name-exceptions-delete)
* [`sc broker acl-profile subscribe-share-name-exceptions list`](#sc-broker-acl-profile-subscribe-share-name-exceptions-list)
* [`sc broker acl-profile subscribe-topic-exceptions create`](#sc-broker-acl-profile-subscribe-topic-exceptions-create)
* [`sc broker acl-profile subscribe-topic-exceptions delete`](#sc-broker-acl-profile-subscribe-topic-exceptions-delete)
* [`sc broker acl-profile subscribe-topic-exceptions list`](#sc-broker-acl-profile-subscribe-topic-exceptions-list)
* [`sc broker acl-profile update`](#sc-broker-acl-profile-update)
* [`sc broker client-profile create`](#sc-broker-client-profile-create)
* [`sc broker client-profile delete`](#sc-broker-client-profile-delete)
* [`sc broker client-profile display`](#sc-broker-client-profile-display)
* [`sc broker client-profile list`](#sc-broker-client-profile-list)
* [`sc broker client-profile update`](#sc-broker-client-profile-update)
* [`sc broker login basic`](#sc-broker-login-basic)
* [`sc broker login cloud`](#sc-broker-login-cloud)
* [`sc broker login list`](#sc-broker-login-list)
* [`sc broker logout`](#sc-broker-logout)
* [`sc broker queue create`](#sc-broker-queue-create)
* [`sc broker queue delete`](#sc-broker-queue-delete)
* [`sc broker queue display`](#sc-broker-queue-display)
* [`sc broker queue list`](#sc-broker-queue-list)
* [`sc broker queue subscriptions create`](#sc-broker-queue-subscriptions-create)
* [`sc broker queue subscriptions delete`](#sc-broker-queue-subscriptions-delete)
* [`sc broker queue update`](#sc-broker-queue-update)
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

_See code: [src/commands/account/list.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/account/list.ts)_

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

_See code: [src/commands/account/login.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/account/login.ts)_

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

_See code: [src/commands/account/logout.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/account/logout.ts)_

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

## `sc broker acl-profile client-connect-exceptions create`

Create a client connect exception for an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile client-connect-exceptions create -a <value> -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n
    <value>] [-v <value>]

FLAGS
  -a, --acl-profile-name=<value>                  (required) The name of the ACL Profile.
  -b, --broker-id=<value>                         Stored broker identifier. If not provided, uses the default broker.
  -c, --client-connect-exception-address=<value>  (required) The IP address/netmask of the client connect exception in
                                                  CIDR form (e.g., 192.168.1.0/24).
  -n, --broker-name=<value>                       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>                      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a client connect exception for an ACL Profile on a Solace Event Broker.

  Adds an exception to the ACL Profile that allows or disallows clients connecting from specific IP addresses. The
  exception is expressed as an IP address/netmask in CIDR form. The creation is synchronized to HA mates and replication
  sites via config-sync.

EXAMPLES
  $ sc broker acl-profile client-connect-exceptions create --acl-profile-name=myProfile --client-connect-exception-address=192.168.1.0/24

  $ sc broker acl-profile client-connect-exceptions create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --client-connect-exception-address=10.0.0.0/8
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/client-connect-exceptions/create.ts)_

## `sc broker acl-profile client-connect-exceptions delete`

Delete a client connect exception from an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile client-connect-exceptions delete -a <value> -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n
    <value>] [-v <value>] [--no-prompt]

FLAGS
  -a, --acl-profile-name=<value>                  (required) The name of the ACL Profile.
  -b, --broker-id=<value>                         Stored broker identifier. If not provided, uses the default broker.
  -c, --client-connect-exception-address=<value>  (required) The IP address/netmask of the client connect exception to
                                                  delete in CIDR form.
  -n, --broker-name=<value>                       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>                      The name of the Message VPN.
      --no-prompt                                 Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a client connect exception from an ACL Profile on a Solace Event Broker.

  Removes the specified client connect exception from the ACL Profile. This is a destructive operation. The deletion is
  synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker acl-profile client-connect-exceptions delete --acl-profile-name=myProfile --client-connect-exception-address=192.168.1.0/24

  $ sc broker acl-profile client-connect-exceptions delete --acl-profile-name=myProfile --client-connect-exception-address=10.0.0.0/8 --no-prompt

  $ sc broker acl-profile client-connect-exceptions delete --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --client-connect-exception-address=172.16.0.0/12 --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/client-connect-exceptions/delete.ts)_

## `sc broker acl-profile client-connect-exceptions list`

List client connect exceptions for an ACL Profile from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile client-connect-exceptions list -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List client connect exceptions for an ACL Profile from a Solace Event Broker.

  Retrieves and displays all client connect exceptions configured for the specified ACL Profile using the SEMP Monitor
  API.

EXAMPLES
  $ sc broker acl-profile client-connect-exceptions list --acl-profile-name=myProfile

  $ sc broker acl-profile client-connect-exceptions list --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/client-connect-exceptions/list.ts)_

## `sc broker acl-profile create`

Create an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile create -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--client-connect-default-action allow|disallow] [--publish-topic-default-action allow|disallow]
    [--subscribe-share-name-default-action allow|disallow] [--subscribe-topic-default-action allow|disallow]

FLAGS
  -a, --acl-profile-name=<value>                      (required) The name of the ACL Profile to create.
  -b, --broker-id=<value>                             Stored broker identifier. If not provided, uses the default
                                                      broker.
  -n, --broker-name=<value>                           Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>                          The name of the Message VPN.
      --client-connect-default-action=<option>        The default action to take when a client using the ACL Profile
                                                      connects.
                                                      <options: allow|disallow>
      --publish-topic-default-action=<option>         The default action to take when a client using the ACL Profile
                                                      publishes to a topic.
                                                      <options: allow|disallow>
      --subscribe-share-name-default-action=<option>  The default action to take when a client using the ACL Profile
                                                      subscribes to a share-name subscription.
                                                      <options: allow|disallow>
      --subscribe-topic-default-action=<option>       The default action to take when a client using the ACL Profile
                                                      subscribes to a topic.
                                                      <options: allow|disallow>

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create an ACL Profile on a Solace Event Broker.

  Any attribute missing from the request will be set to its default value. The creation of instances of this object are
  synchronized to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker acl-profile create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default

  $ sc broker acl-profile create --broker-id=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --client-connect-default-action=allow

  $ sc broker acl-profile create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --publish-topic-default-action=allow --subscribe-topic-default-action=allow

  $ sc broker acl-profile create --acl-profile-name=myProfile
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/create.ts)_

## `sc broker acl-profile delete`

Delete an ACL Profile from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile delete -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--no-prompt]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile to delete.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.
      --no-prompt                 Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete an ACL Profile from a Solace Event Broker.

  Deletes the specified ACL Profile from the Message VPN. This is a destructive operation that removes the ACL Profile.
  Any clients or client usernames using this profile should be updated to use a different profile before deletion.

  The deletion is synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker acl-profile delete --acl-profile-name=myProfile --msg-vpn-name=default

  $ sc broker acl-profile delete --broker-name=dev-broker --acl-profile-name=myProfile

  $ sc broker acl-profile delete --acl-profile-name=myProfile --no-prompt

  $ sc broker acl-profile delete --broker-id=prod --acl-profile-name=tempProfile --msg-vpn-name=production --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/delete.ts)_

## `sc broker acl-profile display`

Display ACL Profile information from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile display -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile to display.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Display ACL Profile information from a Solace Event Broker.

  Retrieves and displays detailed information about an ACL Profile using the SEMP Monitor API, including configuration
  and default actions.

EXAMPLES
  $ sc broker acl-profile display --acl-profile-name=myProfile --msg-vpn-name=default

  $ sc broker acl-profile display --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default

  $ sc broker acl-profile display --acl-profile-name=myProfile
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/display.ts)_

## `sc broker acl-profile list`

List ACL Profiles from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile list [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v <value>]
    [--acl-profile-name <value>] [-a] [-c <value>] [-s <value>]

FLAGS
  -a, --all                       Display all ACL profiles (auto-pagination).
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -c, --count=<value>             [default: 10] Number of ACL profiles to display per page.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -s, --select=<value>            Comma-separated list of attributes to display (max 10).
  -v, --msg-vpn-name=<value>      The name of the Message VPN.
      --acl-profile-name=<value>  Filter ACL profiles by name. Supports * wildcard.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List ACL Profiles from a Solace Event Broker.

  Retrieves and displays ACL Profiles from the specified Message VPN using the SEMP Monitor API.
  Supports filtering by name (with wildcards), custom attribute selection, and pagination.

EXAMPLES
  $ sc broker acl-profile list

  $ sc broker acl-profile list --count=20

  $ sc broker acl-profile list --acl-profile-name="client*"

  $ sc broker acl-profile list --select=aclProfileName,clientConnectDefaultAction,publishTopicDefaultAction

  $ sc broker acl-profile list --all

  $ sc broker acl-profile list --acl-profile-name="*custom*" --count=5 --all
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/list.ts)_

## `sc broker acl-profile publish-topic-exceptions create`

Create a publish topic exception for an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile publish-topic-exceptions create -a <value> -p <value> -s smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>]

FLAGS
  -a, --acl-profile-name=<value>         (required) The name of the ACL Profile.
  -b, --broker-id=<value>                Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>              Stored broker name. If not provided, uses the default broker.
  -p, --publish-topic-exception=<value>  (required) The topic for the exception. May include wildcards.
  -s, --syntax=<option>                  (required) The syntax of the topic.
                                         <options: smf|mqtt>
  -v, --msg-vpn-name=<value>             The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a publish topic exception for an ACL Profile on a Solace Event Broker.

  Adds an exception to the ACL Profile for clients publishing to specific topics. The exception is expressed as a topic
  with optional wildcards and must specify the syntax type (smf or mqtt). The creation is synchronized to HA mates and
  replication sites via config-sync.

EXAMPLES
  $ sc broker acl-profile publish-topic-exceptions create --acl-profile-name=myProfile --publish-topic-exception="orders/*/created" --syntax=smf

  $ sc broker acl-profile publish-topic-exceptions create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --publish-topic-exception="devices/+/telemetry" --syntax=mqtt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/publish-topic-exceptions/create.ts)_

## `sc broker acl-profile publish-topic-exceptions delete`

Delete a publish topic exception from an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile publish-topic-exceptions delete -a <value> -p <value> -s smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>] [--no-prompt]

FLAGS
  -a, --acl-profile-name=<value>         (required) The name of the ACL Profile.
  -b, --broker-id=<value>                Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>              Stored broker name. If not provided, uses the default broker.
  -p, --publish-topic-exception=<value>  (required) The topic of the exception to delete.
  -s, --syntax=<option>                  (required) The syntax of the topic.
                                         <options: smf|mqtt>
  -v, --msg-vpn-name=<value>             The name of the Message VPN.
      --no-prompt                        Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a publish topic exception from an ACL Profile on a Solace Event Broker.

  Removes the specified publish topic exception from the ACL Profile. This is a destructive operation. The deletion is
  synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker acl-profile publish-topic-exceptions delete --acl-profile-name=myProfile --publish-topic-exception="orders/*/created" --syntax=smf

  $ sc broker acl-profile publish-topic-exceptions delete --acl-profile-name=myProfile --publish-topic-exception="devices/+/telemetry" --syntax=mqtt --no-prompt

  $ sc broker acl-profile publish-topic-exceptions delete --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --publish-topic-exception="test/topic" --syntax=smf --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/publish-topic-exceptions/delete.ts)_

## `sc broker acl-profile publish-topic-exceptions list`

List publish topic exceptions for an ACL Profile from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile publish-topic-exceptions list -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List publish topic exceptions for an ACL Profile from a Solace Event Broker.

  Retrieves and displays all publish topic exceptions configured for the specified ACL Profile using the SEMP Monitor
  API.

EXAMPLES
  $ sc broker acl-profile publish-topic-exceptions list --acl-profile-name=myProfile

  $ sc broker acl-profile publish-topic-exceptions list --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/publish-topic-exceptions/list.ts)_

## `sc broker acl-profile subscribe-share-name-exceptions create`

Create a subscribe share name exception for an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-share-name-exceptions create -a <value> -s <value> -x smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>]

FLAGS
  -a, --acl-profile-name=<value>                (required) The name of the ACL Profile.
  -b, --broker-id=<value>                       Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>                     Stored broker name. If not provided, uses the default broker.
  -s, --subscribe-share-name-exception=<value>  (required) The share name for the exception. May include wildcards.
  -v, --msg-vpn-name=<value>                    The name of the Message VPN.
  -x, --syntax=<option>                         (required) The syntax of the share name.
                                                <options: smf|mqtt>

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a subscribe share name exception for an ACL Profile on a Solace Event Broker.

  Adds an exception to the ACL Profile for clients subscribing to specific shared subscriptions. The exception is
  expressed as a share name with optional wildcards and must specify the syntax type (smf or mqtt). The creation is
  synchronized to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker acl-profile subscribe-share-name-exceptions create --acl-profile-name=myProfile --subscribe-share-name-exception="orders/*" --syntax=smf

  $ sc broker acl-profile subscribe-share-name-exceptions create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --subscribe-share-name-exception="devices/+" --syntax=mqtt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-share-name-exceptions/create.ts)_

## `sc broker acl-profile subscribe-share-name-exceptions delete`

Delete a subscribe share name exception from an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-share-name-exceptions delete -a <value> -s <value> -x smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>] [--no-prompt]

FLAGS
  -a, --acl-profile-name=<value>                (required) The name of the ACL Profile.
  -b, --broker-id=<value>                       Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>                     Stored broker name. If not provided, uses the default broker.
  -s, --subscribe-share-name-exception=<value>  (required) The share name of the exception to delete.
  -v, --msg-vpn-name=<value>                    The name of the Message VPN.
  -x, --syntax=<option>                         (required) The syntax of the share name.
                                                <options: smf|mqtt>
      --no-prompt                               Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a subscribe share name exception from an ACL Profile on a Solace Event Broker.

  Removes the specified subscribe share name exception from the ACL Profile. This is a destructive operation. The
  deletion is synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker acl-profile subscribe-share-name-exceptions delete --acl-profile-name=myProfile --subscribe-share-name-exception="orders/*" --syntax=smf

  $ sc broker acl-profile subscribe-share-name-exceptions delete --acl-profile-name=myProfile --subscribe-share-name-exception="devices/+" --syntax=mqtt --no-prompt

  $ sc broker acl-profile subscribe-share-name-exceptions delete --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --subscribe-share-name-exception="test/share" --syntax=smf --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-share-name-exceptions/delete.ts)_

## `sc broker acl-profile subscribe-share-name-exceptions list`

List subscribe share name exceptions for an ACL Profile from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-share-name-exceptions list -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List subscribe share name exceptions for an ACL Profile from a Solace Event Broker.

  Retrieves and displays all subscribe share name exceptions configured for the specified ACL Profile using the SEMP
  Monitor API.

EXAMPLES
  $ sc broker acl-profile subscribe-share-name-exceptions list --acl-profile-name=myProfile

  $ sc broker acl-profile subscribe-share-name-exceptions list --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-share-name-exceptions/list.ts)_

## `sc broker acl-profile subscribe-topic-exceptions create`

Create a subscribe topic exception for an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-topic-exceptions create -a <value> -s <value> -x smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>]

FLAGS
  -a, --acl-profile-name=<value>           (required) The name of the ACL Profile.
  -b, --broker-id=<value>                  Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>                Stored broker name. If not provided, uses the default broker.
  -s, --subscribe-topic-exception=<value>  (required) The topic for the exception. May include wildcards.
  -v, --msg-vpn-name=<value>               The name of the Message VPN.
  -x, --syntax=<option>                    (required) The syntax of the topic.
                                           <options: smf|mqtt>

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a subscribe topic exception for an ACL Profile on a Solace Event Broker.

  Adds an exception to the ACL Profile for clients subscribing to specific topics. The exception is expressed as a topic
  with optional wildcards and must specify the syntax type (smf or mqtt). The creation is synchronized to HA mates and
  replication sites via config-sync.

EXAMPLES
  $ sc broker acl-profile subscribe-topic-exceptions create --acl-profile-name=myProfile --subscribe-topic-exception="orders/*/created" --syntax=smf

  $ sc broker acl-profile subscribe-topic-exceptions create --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --subscribe-topic-exception="devices/+/telemetry" --syntax=mqtt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-topic-exceptions/create.ts)_

## `sc broker acl-profile subscribe-topic-exceptions delete`

Delete a subscribe topic exception from an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-topic-exceptions delete -a <value> -s <value> -x smf|mqtt [--json] [--log-level debug|warn|error|info|trace] [-b
    <value> | -n <value>] [-v <value>] [--no-prompt]

FLAGS
  -a, --acl-profile-name=<value>           (required) The name of the ACL Profile.
  -b, --broker-id=<value>                  Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>                Stored broker name. If not provided, uses the default broker.
  -s, --subscribe-topic-exception=<value>  (required) The topic of the exception to delete.
  -v, --msg-vpn-name=<value>               The name of the Message VPN.
  -x, --syntax=<option>                    (required) The syntax of the topic.
                                           <options: smf|mqtt>
      --no-prompt                          Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a subscribe topic exception from an ACL Profile on a Solace Event Broker.

  Removes the specified subscribe topic exception from the ACL Profile. This is a destructive operation. The deletion is
  synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker acl-profile subscribe-topic-exceptions delete --acl-profile-name=myProfile --subscribe-topic-exception="orders/*/created" --syntax=smf

  $ sc broker acl-profile subscribe-topic-exceptions delete --acl-profile-name=myProfile --subscribe-topic-exception="devices/+/telemetry" --syntax=mqtt --no-prompt

  $ sc broker acl-profile subscribe-topic-exceptions delete --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --subscribe-topic-exception="test/topic" --syntax=smf --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-topic-exceptions/delete.ts)_

## `sc broker acl-profile subscribe-topic-exceptions list`

List subscribe topic exceptions for an ACL Profile from a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile subscribe-topic-exceptions list -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -a, --acl-profile-name=<value>  (required) The name of the ACL Profile.
  -b, --broker-id=<value>         Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>       Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>      The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List subscribe topic exceptions for an ACL Profile from a Solace Event Broker.

  Retrieves and displays all subscribe topic exceptions configured for the specified ACL Profile using the SEMP Monitor
  API.

EXAMPLES
  $ sc broker acl-profile subscribe-topic-exceptions list --acl-profile-name=myProfile

  $ sc broker acl-profile subscribe-topic-exceptions list --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/subscribe-topic-exceptions/list.ts)_

## `sc broker acl-profile update`

Update an ACL Profile on a Solace Event Broker.

```
USAGE
  $ sc broker acl-profile update -a <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--client-connect-default-action allow|disallow] [--publish-topic-default-action allow|disallow]
    [--subscribe-share-name-default-action allow|disallow] [--subscribe-topic-default-action allow|disallow]

FLAGS
  -a, --acl-profile-name=<value>                      (required) The name of the ACL Profile to update.
  -b, --broker-id=<value>                             Stored broker identifier. If not provided, uses the default
                                                      broker.
  -n, --broker-name=<value>                           Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>                          The name of the Message VPN.
      --client-connect-default-action=<option>        The default action to take when a client using the ACL Profile
                                                      connects.
                                                      <options: allow|disallow>
      --publish-topic-default-action=<option>         The default action to take when a client using the ACL Profile
                                                      publishes to a topic.
                                                      <options: allow|disallow>
      --subscribe-share-name-default-action=<option>  The default action to take when a client using the ACL Profile
                                                      subscribes to a share-name subscription.
                                                      <options: allow|disallow>
      --subscribe-topic-default-action=<option>       The default action to take when a client using the ACL Profile
                                                      subscribes to a topic.
                                                      <options: allow|disallow>

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Update an ACL Profile on a Solace Event Broker.

  Any attribute missing from the request will be left unchanged. The update of instances of this object are synchronized
  to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker acl-profile update --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --client-connect-default-action=allow

  $ sc broker acl-profile update --broker-id=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --publish-topic-default-action=allow

  $ sc broker acl-profile update --broker-name=dev-broker --acl-profile-name=myProfile --msg-vpn-name=default --subscribe-topic-default-action=allow --subscribe-share-name-default-action=disallow

  $ sc broker acl-profile update --acl-profile-name=myProfile --publish-topic-default-action=disallow
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/acl-profile/update.ts)_

## `sc broker client-profile create`

Create a Client Profile on a Solace Event Broker.

```
USAGE
  $ sc broker client-profile create -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--allow-bridge-connections-enabled] [--allow-guaranteed-endpoint-create-durability
    all|durable|non-durable] [--allow-guaranteed-endpoint-create-enabled] [--allow-guaranteed-msg-receive-enabled]
    [--allow-guaranteed-msg-send-enabled] [--allow-shared-subscriptions-enabled] [--allow-transacted-sessions-enabled]
    [--api-queue-management-copy-from-on-create-name <value>] [--api-queue-management-copy-from-on-create-template-name
    <value>] [--compression-enabled] [--eliding-delay <value>] [--eliding-enabled]
    [--tls-allow-downgrade-to-plain-text-enabled]

FLAGS
  -b, --broker-id=<value>                                               Stored broker identifier. If not provided, uses
                                                                        the default broker.
  -c, --client-profile-name=<value>                                     (required) The name of the client profile to
                                                                        create.
  -n, --broker-name=<value>                                             Stored broker name. If not provided, uses the
                                                                        default broker.
  -v, --msg-vpn-name=<value>                                            The name of the Message VPN.
      --[no-]allow-bridge-connections-enabled                           Enable or disable allowing Bridge clients using
                                                                        the Client Profile to connect.
      --allow-guaranteed-endpoint-create-durability=<option>            The types of Queues and Topic Endpoints that
                                                                        clients can create.
                                                                        <options: all|durable|non-durable>
      --[no-]allow-guaranteed-endpoint-create-enabled                   Enable or disable allowing clients to create
                                                                        topic endpoints or queues.
      --[no-]allow-guaranteed-msg-receive-enabled                       Enable or disable allowing clients to receive
                                                                        guaranteed messages.
      --[no-]allow-guaranteed-msg-send-enabled                          Enable or disable allowing clients to send
                                                                        guaranteed messages.
      --[no-]allow-shared-subscriptions-enabled                         Enable or disable allowing shared subscriptions.
      --[no-]allow-transacted-sessions-enabled                          Enable or disable allowing clients to establish
                                                                        transacted sessions.
      --api-queue-management-copy-from-on-create-name=<value>           The name of a queue to copy settings from when a
                                                                        new queue is created by a client.
      --api-queue-management-copy-from-on-create-template-name=<value>  The name of a queue template to copy settings
                                                                        from when a new queue is created by a client.
      --[no-]compression-enabled                                        Enable or disable allowing clients to use
                                                                        compression.
      --eliding-delay=<value>                                           The amount of time to delay the delivery of
                                                                        messages to clients, in milliseconds.
      --[no-]eliding-enabled                                            Enable or disable message eliding.
      --[no-]tls-allow-downgrade-to-plain-text-enabled                  Enable or disable allowing a client to downgrade
                                                                        an encrypted connection to plain text.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a Client Profile on a Solace Event Broker.

  Any attribute missing from the request will be set to its default value. The creation of instances of this object are
  synchronized to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker client-profile create --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default

  $ sc broker client-profile create --broker-id=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --allow-guaranteed-msg-receive-enabled

  $ sc broker client-profile create --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --compression-enabled --eliding-enabled

  $ sc broker client-profile create --client-profile-name=myProfile
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/client-profile/create.ts)_

## `sc broker client-profile delete`

Delete a Client Profile from a Solace Event Broker.

```
USAGE
  $ sc broker client-profile delete -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--no-prompt]

FLAGS
  -b, --broker-id=<value>            Stored broker identifier. If not provided, uses the default broker.
  -c, --client-profile-name=<value>  (required) The name of the client profile to delete.
  -n, --broker-name=<value>          Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>         The name of the Message VPN.
      --no-prompt                    Skip confirmation prompt.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a Client Profile from a Solace Event Broker.

  Deletes the specified Client Profile from the Message VPN. This action cannot be undone. A confirmation prompt will be
  displayed unless --no-prompt is specified.

EXAMPLES
  $ sc broker client-profile delete --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default

  $ sc broker client-profile delete --broker-id=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --no-prompt

  $ sc broker client-profile delete --client-profile-name=myProfile

  $ sc broker client-profile delete --client-profile-name=myProfile --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/client-profile/delete.ts)_

## `sc broker client-profile display`

Display a Client Profile from a Solace Event Broker.

```
USAGE
  $ sc broker client-profile display -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>]

FLAGS
  -b, --broker-id=<value>            Stored broker identifier. If not provided, uses the default broker.
  -c, --client-profile-name=<value>  (required) The name of the client profile to display.
  -n, --broker-name=<value>          Stored broker name. If not provided, uses the default broker.
  -v, --msg-vpn-name=<value>         The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Display a Client Profile from a Solace Event Broker.

  Retrieves and displays detailed information about a specific Client Profile using the SEMP Monitor API.

EXAMPLES
  $ sc broker client-profile display --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default

  $ sc broker client-profile display --broker-id=dev-broker --client-profile-name=myProfile --msg-vpn-name=default

  $ sc broker client-profile display --client-profile-name=myProfile
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/client-profile/display.ts)_

## `sc broker client-profile list`

List Client Profiles from a Solace Event Broker.

```
USAGE
  $ sc broker client-profile list [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v <value>] [-a]
    [-c <value>] [--count <value>] [-s <value>]

FLAGS
  -a, --all                          Display all client profiles (auto-pagination).
  -b, --broker-id=<value>            Stored broker identifier. If not provided, uses the default broker.
  -c, --client-profile-name=<value>  Filter client profiles by name. Supports * wildcard.
  -n, --broker-name=<value>          Stored broker name. If not provided, uses the default broker.
  -s, --select=<value>               Comma-separated list of attributes to display (max 10).
  -v, --msg-vpn-name=<value>         The name of the Message VPN.
      --count=<value>                [default: 10] Number of client profiles to display per page.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List Client Profiles from a Solace Event Broker.

  Retrieves and displays Client Profiles from the specified Message VPN using the SEMP Monitor API.
  Supports filtering by name (with wildcards), custom attribute selection, and pagination.

EXAMPLES
  $ sc broker client-profile list

  $ sc broker client-profile list --count=20

  $ sc broker client-profile list --client-profile-name="test*"

  $ sc broker client-profile list --select=clientProfileName,compressionEnabled,elidingEnabled

  $ sc broker client-profile list --all

  $ sc broker client-profile list --client-profile-name="*prod*" --count=5 --all
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/client-profile/list.ts)_

## `sc broker client-profile update`

Update a Client Profile on a Solace Event Broker.

```
USAGE
  $ sc broker client-profile update -c <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--allow-bridge-connections-enabled] [--allow-guaranteed-endpoint-create-durability
    all|durable|non-durable] [--allow-guaranteed-endpoint-create-enabled] [--allow-guaranteed-msg-receive-enabled]
    [--allow-guaranteed-msg-send-enabled] [--allow-shared-subscriptions-enabled] [--allow-transacted-sessions-enabled]
    [--api-queue-management-copy-from-on-create-name <value>] [--api-queue-management-copy-from-on-create-template-name
    <value>] [--compression-enabled] [--eliding-delay <value>] [--eliding-enabled]
    [--tls-allow-downgrade-to-plain-text-enabled]

FLAGS
  -b, --broker-id=<value>                                               Stored broker identifier. If not provided, uses
                                                                        the default broker.
  -c, --client-profile-name=<value>                                     (required) The name of the client profile to
                                                                        update.
  -n, --broker-name=<value>                                             Stored broker name. If not provided, uses the
                                                                        default broker.
  -v, --msg-vpn-name=<value>                                            The name of the Message VPN.
      --[no-]allow-bridge-connections-enabled                           Enable or disable allowing Bridge clients using
                                                                        the Client Profile to connect.
      --allow-guaranteed-endpoint-create-durability=<option>            The types of Queues and Topic Endpoints that
                                                                        clients can create.
                                                                        <options: all|durable|non-durable>
      --[no-]allow-guaranteed-endpoint-create-enabled                   Enable or disable allowing clients to create
                                                                        topic endpoints or queues.
      --[no-]allow-guaranteed-msg-receive-enabled                       Enable or disable allowing clients to receive
                                                                        guaranteed messages.
      --[no-]allow-guaranteed-msg-send-enabled                          Enable or disable allowing clients to send
                                                                        guaranteed messages.
      --[no-]allow-shared-subscriptions-enabled                         Enable or disable allowing shared subscriptions.
      --[no-]allow-transacted-sessions-enabled                          Enable or disable allowing clients to establish
                                                                        transacted sessions.
      --api-queue-management-copy-from-on-create-name=<value>           The name of a queue to copy settings from when a
                                                                        new queue is created by a client.
      --api-queue-management-copy-from-on-create-template-name=<value>  The name of a queue template to copy settings
                                                                        from when a new queue is created by a client.
      --[no-]compression-enabled                                        Enable or disable allowing clients to use
                                                                        compression.
      --eliding-delay=<value>                                           The amount of time to delay the delivery of
                                                                        messages to clients, in milliseconds.
      --[no-]eliding-enabled                                            Enable or disable message eliding.
      --[no-]tls-allow-downgrade-to-plain-text-enabled                  Enable or disable allowing a client to downgrade
                                                                        an encrypted connection to plain text.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Update a Client Profile on a Solace Event Broker.

  Updates the configuration of an existing Client Profile. Only provided attributes will be updated (PATCH semantics).
  The updates are synchronized to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker client-profile update --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --compression-enabled

  $ sc broker client-profile update --broker-id=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --no-eliding-enabled

  $ sc broker client-profile update --broker-name=dev-broker --client-profile-name=myProfile --msg-vpn-name=default --allow-guaranteed-msg-send-enabled --allow-guaranteed-msg-receive-enabled

  $ sc broker client-profile update --client-profile-name=myProfile --eliding-delay=100
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/client-profile/update.ts)_

## `sc broker login basic`

Authorize the SC CLI to make SEMP API calls to a Solace Event Broker using Basic authentication.

```
USAGE
  $ sc broker login basic -b <value> -p <value> -u <value> [--json] [--log-level debug|warn|error|info|trace]
    [--no-prompt] [-d]

FLAGS
  -b, --broker-name=<value>  (required) Name/identifier for the broker
  -d, --set-default          Set this broker as the default
  -p, --semp-port=<value>    (required) SEMP port number (1-65535)
  -u, --semp-url=<value>     (required) SEMP endpoint URL (must start with http:// or https://)
      --no-prompt            Read credentials from SC_SEMP_USERNAME and SC_SEMP_PASSWORD environment variables

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Authorize the SC CLI to make SEMP API calls to a Solace Event Broker using Basic authentication.

  Stores broker credentials securely using encrypted local storage.
  Credentials are base64-encoded and encrypted before storage.

  If a broker with the same name already exists, you'll be prompted to overwrite.

EXAMPLES
  $ sc broker login basic --broker-name=dev-broker --semp-url=https://localhost --semp-port=8080

  $ sc broker login basic --broker-name=ci-broker --semp-url=http://192.168.1.100 --semp-port=8080 --no-prompt

  $ sc broker login basic --broker-name=default-broker --semp-url=https://broker.example.com --semp-port=943 --set-default
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/login/basic.ts)_

## `sc broker login cloud`

Authorize the SC CLI to make SEMP API calls to a Solace Cloud Event Broker using Basic Authentication.

```
USAGE
  $ sc broker login cloud -b <value> [--json] [--log-level debug|warn|error|info|trace] [--no-prompt] [-o <value>] [-d]

FLAGS
  -b, --broker-name=<value>  (required) Name of the broker in Solace Cloud
  -d, --set-default          Set this broker as the default
  -o, --org-name=<value>     Solace Cloud organization name (uses default org if not specified)
      --no-prompt            Skip confirmation prompts for overwriting existing broker

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Authorize the SC CLI to make SEMP API calls to a Solace Cloud Event Broker using Basic Authentication.

  Retrieves SEMP credentials automatically from Event Broker Service using Solace Cloud REST API.
  Requires prior authentication to Solace Cloud (sc:account:login).

  The command will:
  1. Look up the broker by name in your Solace Cloud organization
  2. Retrieve SEMP endpoint details and credentials from Cloud API
  3. Store encrypted broker credentials locally for future use

  Required Cloud API permissions: Read access to Event Broker Services

EXAMPLES
  $ sc broker login cloud --broker-name=production-broker

  $ sc broker login cloud --broker-name=dev-broker --set-default

  $ sc broker login cloud --broker-name=staging-broker --org-name=my-org

  $ sc broker login cloud --broker-name=prod --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/login/cloud.ts)_

## `sc broker login list`

List all authenticated brokers.

```
USAGE
  $ sc broker login list [--json] [--log-level debug|warn|error|info|trace]

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List all authenticated brokers.

  Displays brokers you have logged into, including their authentication type, SEMP endpoints, and which one is set as
  default.

EXAMPLES
  $ sc broker login list
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/login/list.ts)_

## `sc broker logout`

Logout from authenticated brokers.

```
USAGE
  $ sc broker logout [--json] [--log-level debug|warn|error|info|trace] [-a | -b <value>] [--no-prompt]

FLAGS
  -a, --all                  Logout from all brokers
  -b, --broker-name=<value>  Broker name to logout from
      --no-prompt            Skip confirmation prompt and assume Yes

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Logout from authenticated brokers.

  Removes locally stored broker credentials.
  Interactive mode allows selection with arrow keys and spacebar.

EXAMPLES
  $ sc broker logout

  $ sc broker logout --broker-name=dev-broker

  $ sc broker logout --all

  $ sc broker logout --broker-name=prod --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/logout.ts)_

## `sc broker queue create`

Create a Queue on a Solace Event Broker.

```
USAGE
  $ sc broker queue create -q <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [-a exclusive|non-exclusive] [--dead-msg-queue <value>] [--egress-enabled] [--ingress-enabled] [-s <value>]
    [--max-redelivery-count <value>] [--max-ttl <value>] [-o <value>] [-p
    consume|delete|modify-topic|no-access|read-only] [--respect-ttl-enabled]

FLAGS
  -a, --access-type=<option>          The access type for the queue.
                                      <options: exclusive|non-exclusive>
  -b, --broker-id=<value>             Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>           Stored broker name. If not provided, uses the default broker.
  -o, --owner=<value>                 The client username that owns the queue and has permission equivalent to delete.
  -p, --permission=<option>           [default: consume] The permission level for all consumers of the queue, excluding
                                      the owner.
                                      <options: consume|delete|modify-topic|no-access|read-only>
  -q, --queue-name=<value>            (required) The name of the queue to create.
  -s, --max-msg-spool-usage=<value>   The maximum message spool usage allowed by the queue, in megabytes (MB).
  -v, --msg-vpn-name=<value>          The name of the Message VPN.
      --dead-msg-queue=<value>        The name of the Dead Message Queue.
      --[no-]egress-enabled           Enable or disable egress (message consumption) from the queue.
      --[no-]ingress-enabled          Enable or disable ingress (message reception) to the queue.
      --max-redelivery-count=<value>  The maximum number of times a message will be redelivered before it is discarded
                                      or moved to the DMQ.
      --max-ttl=<value>               The maximum time in seconds a message can stay in the queue when
                                      respect-ttl-enabled is true.
      --[no-]respect-ttl-enabled      Enable or disable the respecting of the time-to-live (TTL) for messages.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a Queue on a Solace Event Broker.

  Any attribute missing from the request will be set to its default value. The creation of instances of this object are
  synchronized to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker queue create --broker-name=dev-broker --queue-name=myQueue --msg-vpn-name=default

  $ sc broker queue create --broker-id=dev-broker --queue-name=myQueue --msg-vpn-name=default --access-type=non-exclusive

  $ sc broker queue create --broker-name=dev-broker --queue-name=myQueue --msg-vpn-name=default --max-msg-spool-usage=1024 --egress-enabled --ingress-enabled

  $ sc broker queue create --queue-name=myQueue
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/create.ts)_

## `sc broker queue delete`

Delete a Queue from a Solace Event Broker.

```
USAGE
  $ sc broker queue delete -q <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [--no-prompt]

FLAGS
  -b, --broker-id=<value>     Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>   Stored broker name. If not provided, uses the default broker.
  -q, --queue-name=<value>    (required) The name of the queue to delete.
  -v, --msg-vpn-name=<value>  The name of the Message VPN.
      --no-prompt             Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a Queue from a Solace Event Broker.

  Deletes the specified queue from the Message VPN. This is a destructive operation that removes the queue and all its
  messages. Any messages persisted on the queue will also be deleted.

  The deletion is synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker queue delete --queue-name=myQueue --msg-vpn-name=default

  $ sc broker queue delete --broker-name=dev-broker --queue-name=myQueue

  $ sc broker queue delete --queue-name=myQueue --no-prompt

  $ sc broker queue delete --broker-id=prod --queue-name=tempQueue --msg-vpn-name=production --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/delete.ts)_

## `sc broker queue display`

Display queue information from a Solace Event Broker.

```
USAGE
  $ sc broker queue display -q <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [-s]

FLAGS
  -b, --broker-id=<value>     Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>   Stored broker name. If not provided, uses the default broker.
  -q, --queue-name=<value>    (required) The name of the queue to display.
  -s, --show-subscriptions    Display only queue subscriptions without queue details.
  -v, --msg-vpn-name=<value>  The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Display queue information from a Solace Event Broker.

  Retrieves and displays detailed information about a queue using the SEMP Monitor API, including operational state,
  statistics, and configuration.

EXAMPLES
  $ sc broker queue display --queue-name=myQueue --msg-vpn-name=default

  $ sc broker queue display --broker-name=dev-broker --queue-name=myQueue --msg-vpn-name=default

  $ sc broker queue display --queue-name=myQueue --show-subscriptions

  $ sc broker queue display --queue-name=myQueue
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/display.ts)_

## `sc broker queue list`

List queues from a Solace Event Broker.

```
USAGE
  $ sc broker queue list [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v <value>] [-a]
    [-c <value>] [-q <value>] [-s <value>]

FLAGS
  -a, --all                   Display all queues (auto-pagination).
  -b, --broker-id=<value>     Stored broker identifier. If not provided, uses the default broker.
  -c, --count=<value>         [default: 10] Number of queues to display per page.
  -n, --broker-name=<value>   Stored broker name. If not provided, uses the default broker.
  -q, --queue-name=<value>    Filter queues by name. Supports * wildcard.
  -s, --select=<value>        Comma-separated list of attributes to display (max 10).
  -v, --msg-vpn-name=<value>  The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  List queues from a Solace Event Broker.

  Retrieves and displays queues from the specified Message VPN using the SEMP Monitor API.
  Supports filtering by name (with wildcards), custom attribute selection, and pagination.

EXAMPLES
  $ sc broker queue list

  $ sc broker queue list --count=20

  $ sc broker queue list --queue-name="order*"

  $ sc broker queue list --select=queueName,owner,maxMsgSpoolUsage

  $ sc broker queue list --all

  $ sc broker queue list --queue-name="*test*" --count=5 --all
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/list.ts)_

## `sc broker queue subscriptions create`

Create a subscription on a Queue in a Solace Event Broker.

```
USAGE
  $ sc broker queue subscriptions create -q <value> -t <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n
    <value>] [-v <value>]

FLAGS
  -b, --broker-id=<value>           Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>         Stored broker name. If not provided, uses the default broker.
  -q, --queue-name=<value>          (required) The name of the queue to add the subscription to.
  -t, --subscription-topic=<value>  (required) The subscription topic to add to the queue.
  -v, --msg-vpn-name=<value>        The name of the Message VPN.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Create a subscription on a Queue in a Solace Event Broker.

  Adds a topic subscription to the specified queue. Guaranteed messages published to topics matching the subscription
  will be delivered to the queue.

  The creation of subscriptions is synchronized to HA mates and replication sites via config-sync.

  Subscriptions use topic pattern matching which can include wildcards:
  - '*' matches exactly one level in the topic hierarchy
  - '>' matches one or more levels at the end of the topic

  Multiple subscriptions can be added to a single queue.

EXAMPLES
  $ sc broker queue subscriptions create --queue-name=myQueue --subscription-topic=orders/> --msg-vpn-name=default

  $ sc broker queue subscriptions create --broker-name=dev-broker --queue-name=myQueue --subscription-topic=events/user/*

  $ sc broker queue subscriptions create --broker-id=prod --queue-name=notifications --subscription-topic=alerts/critical --msg-vpn-name=production

  $ sc broker queue subscriptions create --queue-name=myQueue --subscription-topic=data/sensor/temperature
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/subscriptions/create.ts)_

## `sc broker queue subscriptions delete`

Delete a subscription from a Queue in a Solace Event Broker.

```
USAGE
  $ sc broker queue subscriptions delete -q <value> -t <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n
    <value>] [-v <value>] [--no-prompt]

FLAGS
  -b, --broker-id=<value>           Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>         Stored broker name. If not provided, uses the default broker.
  -q, --queue-name=<value>          (required) The name of the queue to remove the subscription from.
  -t, --subscription-topic=<value>  (required) The subscription topic to remove from the queue.
  -v, --msg-vpn-name=<value>        The name of the Message VPN.
      --no-prompt                   Skip confirmation prompt and proceed with deletion.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Delete a subscription from a Queue in a Solace Event Broker.

  Removes a topic subscription from the specified queue. This is a destructive operation that removes the subscription.

  The deletion is synchronized to HA mates and replication sites via config-sync.

  By default, a confirmation prompt is shown before deletion. Use --no-prompt to skip confirmation.

EXAMPLES
  $ sc broker queue subscriptions delete --queue-name=myQueue --subscription-topic=orders/> --msg-vpn-name=default

  $ sc broker queue subscriptions delete --broker-name=dev-broker --queue-name=myQueue --subscription-topic=events/user/*

  $ sc broker queue subscriptions delete --queue-name=myQueue --subscription-topic=orders/> --no-prompt

  $ sc broker queue subscriptions delete --broker-id=prod --queue-name=notifications --subscription-topic=alerts/critical --msg-vpn-name=production --no-prompt
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/subscriptions/delete.ts)_

## `sc broker queue update`

Update a Queue on a Solace Event Broker.

```
USAGE
  $ sc broker queue update -q <value> [--json] [--log-level debug|warn|error|info|trace] [-b <value> | -n <value>] [-v
    <value>] [-a exclusive|non-exclusive] [--dead-msg-queue <value>] [--egress-enabled] [--ingress-enabled] [-s <value>]
    [--max-redelivery-count <value>] [--max-ttl <value>] [-o <value>] [-p
    consume|delete|modify-topic|no-access|read-only] [--respect-ttl-enabled]

FLAGS
  -a, --access-type=<option>          The access type for the queue.
                                      <options: exclusive|non-exclusive>
  -b, --broker-id=<value>             Stored broker identifier. If not provided, uses the default broker.
  -n, --broker-name=<value>           Stored broker name. If not provided, uses the default broker.
  -o, --owner=<value>                 The client username that owns the queue and has permission equivalent to delete.
  -p, --permission=<option>           The permission level for all consumers of the queue, excluding the owner.
                                      <options: consume|delete|modify-topic|no-access|read-only>
  -q, --queue-name=<value>            (required) The name of the queue to update.
  -s, --max-msg-spool-usage=<value>   The maximum message spool usage allowed by the queue, in megabytes (MB).
  -v, --msg-vpn-name=<value>          The name of the Message VPN.
      --dead-msg-queue=<value>        The name of the Dead Message Queue.
      --[no-]egress-enabled           Enable or disable egress (message consumption) from the queue.
      --[no-]ingress-enabled          Enable or disable ingress (message reception) to the queue.
      --max-redelivery-count=<value>  The maximum number of times a message will be redelivered before it is discarded
                                      or moved to the DMQ.
      --max-ttl=<value>               The maximum time in seconds a message can stay in the queue when
                                      respect-ttl-enabled is true.
      --[no-]respect-ttl-enabled      Enable or disable the respecting of the time-to-live (TTL) for messages.

GLOBAL FLAGS
  --json                Format output as json.
  --log-level=<option>  [default: info] Specify level for logging.
                        <options: debug|warn|error|info|trace>

DESCRIPTION
  Update a Queue on a Solace Event Broker.

  Any attribute missing from the request will be left unchanged. The update of instances of this object are synchronized
  to HA mates and replication sites via config-sync.

EXAMPLES
  $ sc broker queue update --broker-name=dev-broker --queue-name=myQueue --msg-vpn-name=default --egress-enabled

  $ sc broker queue update --broker-id=dev-broker --queue-name=myQueue --msg-vpn-name=default --max-msg-spool-usage=2048

  $ sc broker queue update --broker-name=dev-broker --queue-name=myQueue --msg-vpn-name=default --max-msg-spool-usage=1024 --max-ttl=3600

  $ sc broker queue update --queue-name=myQueue --owner=newowner

  $ sc broker queue update --queue-name=myQueue --permission=read-only --no-egress-enabled
```

_See code: [@dishantlangayan/sc-plugin-broker](https://github.com/dishantlangayan/sc-plugin-broker/blob/v0.5.0/src/commands/broker/queue/update.ts)_

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

_See code: [src/commands/missionctrl/broker/create.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/create.ts)_

## `sc missionctrl broker delete`

Delete a service using its unique identifier.

```
USAGE
  $ sc missionctrl broker delete [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-b <value>] [-n
    <value>] [--no-prompt]

FLAGS
  -a, --alias=<value>      Organization alias to use. If not specified, uses the default organization.
  -b, --broker-id=<value>  Id of the event broker service.
  -n, --name=<value>       Name of the event broker service.
  -o, --org=<value>        Organization ID to use. If not specified, uses the default organization or alias if
                           specified.
      --no-prompt          Skip confirmation prompt and assume Yes

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

  $ sc missionctrl broker delete --broker-id=MyBrokerId --no-prompt
```

_See code: [src/commands/missionctrl/broker/delete.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/delete.ts)_

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

_See code: [src/commands/missionctrl/broker/display.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/display.ts)_

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

_See code: [src/commands/missionctrl/broker/list.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/list.ts)_

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

_See code: [src/commands/missionctrl/broker/opstatus.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/opstatus.ts)_

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

_See code: [src/commands/missionctrl/broker/state.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/state.ts)_

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

_See code: [src/commands/missionctrl/broker/update.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/missionctrl/broker/update.ts)_

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

_See code: [src/commands/platform/env/create.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/platform/env/create.ts)_

## `sc platform env delete`

Delete an environment using either its name or unique identifier. The default environment cannot be deleted.

```
USAGE
  $ sc platform env delete [--json] [--log-level debug|warn|error|info|trace] [-a <value> | -o <value>] [-e <value>] [-n
    <value>] [--no-prompt]

FLAGS
  -a, --alias=<value>   Organization alias to use. If not specified, uses the default organization.
  -e, --env-id=<value>  Id of the environment.
  -n, --name=<value>    Name of the environment.
  -o, --org=<value>     Organization ID to use. If not specified, uses the default organization or alias if specified.
      --no-prompt       Skip confirmation prompt and assume Yes

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

  $ sc platform env delete --env-id=MyEnvId --no-prompt
```

_See code: [src/commands/platform/env/delete.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/platform/env/delete.ts)_

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

_See code: [src/commands/platform/env/display.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/platform/env/display.ts)_

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

_See code: [src/commands/platform/env/list.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/platform/env/list.ts)_

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

_See code: [src/commands/platform/env/update.ts](https://github.com/SolaceLabs/solace-cloud-cli/blob/v0.5.2/src/commands/platform/env/update.ts)_

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
