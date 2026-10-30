---
title: CLI reference
description: Set up rateldesk, inspect its commands, and query tickets with predictable output and explicit profiles.
---

Use `rateldesk` for operator work and scripts that call the RatelDesk API. The v0.1.2-beta.17 release provides self-contained Linux x64, Linux arm64, and Windows x64 archives. Linux requires glibc.

## Set up and verify

Extract the complete matching `rateldesk-cli` archive from the [release](https://github.com/BostonTechnologies/rateldesk/releases/tag/v0.1.2-beta.17), verify its checksum, and run from that directory:

```sh
./rateldesk setup --profile support
./rateldesk --profile support status
./rateldesk --profile support config validate
./rateldesk --profile support doctor --network --authenticate
./rateldesk --profile support auth status
```

Setup asks for the Web URL and browser approval. Approve one organization, the required permissions, and expiry. The CLI uses an API-purpose credential; an HTTP MCP-purpose credential will not work here.

`status` and `config validate` inspect local configuration. `doctor` is local-only by default; the flags above explicitly enable network and authentication checks. `auth status` calls the API with the saved identity.

The following examples assume `rateldesk` is on `PATH`. Use `./rateldesk` from the extracted directory otherwise.

## Find the right command

```sh
rateldesk --help
rateldesk incidents --help
rateldesk schema incidents list --json
rateldesk enums
rateldesk examples triage
```

| Command group | Purpose |
| --- | --- |
| `incidents`, `requests`, `changes` | List, inspect, and manage tickets |
| `request-tasks` | Work with request tasks |
| `tickets` | Shared ticket lookups and operations |
| `organizations`, `customers`, `users` | Resolve actual record identifiers |
| `roles`, `categories`, `services`, `request-forms` | Inspect or manage supporting records |
| `self-service`, `notifications`, `search` | Self-service and discovery |
| `connectivity`, `system`, `health` | Operational checks; some require elevated identity |
| `capabilities`, `schema`, `enums`, `examples` | Discover the installed client's contract |

Read command help before a write. CLI mutation commands do not inherit MCP's `confirm:false` preview protocol. Incident `create` and `bulk-create` explicitly support `--dry-run`; do not assume that flag exists elsewhere. `request-forms list` requires `--service-id` to select a service.

## Read tickets

```sh
rateldesk --profile support incidents list --page 1 --page-size 20 --json
rateldesk --profile support incidents get ACTUAL_INCIDENT_ID --json
rateldesk --profile support incidents timeline ACTUAL_INCIDENT_ID --json
rateldesk --profile support changes timeline ACTUAL_CHANGE_ID --json
rateldesk --profile support requests ticket-timeline ACTUAL_REQUEST_ID --json
```

Replace each identifier with one returned by the relevant list. `requests timeline` returns workflow notification history; use `requests ticket-timeline` for ticket activity. Incident worklog listing uses `incidents timeline`; `incidents worklogs` is unsupported.

`--json` returns raw JSON unless you select another `--view`. Other views are `summary`, `detail`, and `aggregate`. Use `--pretty` for formatted JSON. Text projections can truncate long bodies; select the output deliberately for scripts.

## Profiles and exit codes

Use either `--profile NAME` or `--config /absolute/path/config.json`, never both. Named profiles use the user's application configuration directory, typically `~/.config/rateldesk/profiles/cli/` on Linux and `%APPDATA%\rateldesk\profiles\cli\` on Windows. An existing legacy `~/.config/rateldesk/profiles/` location is retained. CLI and stdio profiles are isolated. Use the actual path reported by setup; `RATELDESK_CONFIG` selects an explicit file for an environment-managed client.

```sh
rateldesk profile list
rateldesk profile show support
```

For API commands, exit codes are `0` for success, `1` for validation failure, `2` for authentication/authorization failure, and `3` for remote failure. Diagnostic commands report failed checks in their output; inspect that report as well as the exit code. Interactive setup and stdio startup have additional configuration exit behavior; see [stdio MCP](/docs/integrations/stdio/).

`auth logout` and profile removal affect local files. Revoke the [server credential](/docs/integrations/credentials/) to stop future access.

Sources: [CLI setup](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/cli-stdio.md) and [command implementation](https://github.com/BostonTechnologies/rateldesk/tree/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Cli).
