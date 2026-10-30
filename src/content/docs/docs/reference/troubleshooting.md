---
title: Troubleshooting
description: Separate startup, routing, credential, policy, and AI connection failures before changing a working deployment.
---

Start with the failing step and the installed version. Test local configuration, connectivity, authentication, and an allowed read separately. A healthy container or successful sign-in does not establish all four.

## Startup and browser access

| Symptom | Check next |
| --- | --- |
| Setup appears after initialization | Confirm Web reaches the intended API and both run the same release. Check API setup status before changing storage. |
| Setup reports `RecoveryRequired` | Restore the matching database, bootstrap state, and key ring. Do not initialize an empty replacement database against the existing descriptor. |
| Login or protected settings fail after a restart | Check durable Data Protection keys, permissions, public origin, and proxy forwarding. |
| Attachments fail after a container replacement | Check the persistent `StorageOptions__RootPath` volume and API write access. Private files must remain outside `wwwroot`. |

On the Docker host, inspect the actual API container without changing setup state:

```sh
API_CONTAINER=your-api-container-name
docker exec "$API_CONTAINER" dotnet /app/Helpdesk.API.dll --setup-status
```

For an unconfigured instance that needs its first setup code, the corresponding `--show-setup-code` command reads the current code without rotating it. Keep that code private.

## CLI and stdio

From the directory containing the native CLI:

```sh
./rateldesk --profile support status
./rateldesk --profile support config validate
./rateldesk --profile support doctor --network --authenticate
```

`doctor` without these flags performs local checks only. Inspect stderr when stdio exits `78`: common causes are an unreadable private profile, wrong credential mode, or a mismatch between the configured and expected API target. Explicit setup requires an interactive terminal; normal stdio operation requires protocol pipes.

Never repair a target mismatch by copying a credential into another instance's profile. Authorize a profile for the intended target.

## HTTP MCP

| Symptom | Check next |
| --- | --- |
| `/mcp` returns `404` | Check Web's MCP route selection and hard-disable setting. |
| `/mcp` returns `502` or `503` | Check the selected backend destination, running MCP service, and private network reachability. |
| Client receives HTML | Check that the proxy preserves the MCP path instead of sending it to a browser route. |
| `401` | Check secret, expiry, enabled owner, credential purpose, and exact canonical resource. API-purpose credentials cannot authenticate gateway MCP. |
| `403` | Check the browser Origin allowlist and current organization, permission, and policy admission. |
| Initialization works but a tool fails | Inspect `helpdesk_auth` operation `access`, then the operation schema and record-specific prerequisites. |
| A permission was added but remains denied | Open **Details → Current admission**, refresh it, and inspect the owner's current role and active MCP policy. |
| Browser pairing is unavailable | Align API `IntegrationCredentials__Pairing__PublicOrigin` with the trusted Web origin. An unset pairing origin disables browser pairing. |

A gateway client uses its protected bearer credential. External Authentik ingress additionally needs its exact metadata and downstream identity; switching modes is not a remedy for a rejected credential.

## Netclaw and Teams

Native **AI Assistant** requires PostgreSQL, an applied Netclaw profile, and an authenticated SignalR connection. Check **Test connection**, daemon exposure, and proxy WebSocket forwarding. Use conversation recovery controls after an uncertain send.

For MCP, run `netclaw mcp list` and review `netclaw mcp permissions`. For Teams, confirm you deployed the [Teams-enabled fork](/docs/integrations/microsoft-teams/), installed the matching app package, and selected the correct canonical allowlists. A mention in an unapproved channel cannot prove connectivity.

When asking for help, include versions, the failed step, status code, and redacted error. Exclude credential values, setup sidecars, customer content, and paired-device tokens.

Sources: [MCP troubleshooting](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/troubleshooting.md) and [initialization recovery](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/deployment/self-hosting.md#initialization-and-storage-recovery).
