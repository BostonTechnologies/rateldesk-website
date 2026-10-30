---
title: Configuration reference
description: Find the settings that own public URLs, persistence, authentication, MCP, and Netclaw connections.
---

Apply settings to the process that owns them. The table below lists runtime environment keys; Compose interpolation variables such as `RATELDESK_VERSION` serve a different purpose.

## Application settings

| Environment key | Service | Purpose |
| --- | --- | --- |
| `ApiBaseUrl` | Web | API destination, such as `http://api:8222/` |
| `Authentication__Mode` | Web and API | Explicit `Local`, `Oidc`, or `Hybrid` account authentication |
| `Authentication__AllowInsecureLocalhost` | Web and API | Localhost HTTP exception; remove for public HTTPS |
| `DataProtection__KeyRingPath` | Web and API | Durable key-ring location |
| `Bootstrap__StateDirectory` | API | Durable installation descriptor and setup state |
| `Bootstrap__DataDirectory` | API | Bootstrap-managed data directory |
| `StorageOptions__RootPath` | API | Durable attachment and image storage outside `wwwroot` |
| `Database__Provider` | API | `Sqlite` or `PostgreSql` for explicitly deployment-managed storage |
| `ConnectionStrings__HelpdeskDb` | API | Deployment-managed PostgreSQL connection string |
| `WebGateway__PublicOrigin` | Web | Trusted public HTTPS origin without a path |
| `IntegrationCredentials__Pairing__PublicOrigin` | API | Trusted HTTPS origin used for browser credential approval |

The first-run wizard can manage database initialization without a normal runtime connection-string environment variable. Established installations retain their saved storage identity. Do not point an initialized descriptor at a different database to recover it.

For browser-approved clients, set both public-origin keys to the intended instance origin, for example `https://helpdesk.example.com`. A private container address is not a public approval URL.

## HTTP MCP settings

Enable Web's route and configure the MCP service together. Selecting a Compose profile alone cannot alter Web's environment.

| Environment key | Service | Gateway example |
| --- | --- | --- |
| `WebGateway__Mcp__Enabled` | Web | `true` |
| `WebGateway__Mcp__Destination` | Web | `http://mcp-http:8223/` |
| `WebGateway__Mcp__PublicResourceUri` | Web | `https://helpdesk.example.com/mcp` |
| `WebGateway__Mcp__AuthenticationMode` | Web | `gateway` |
| `Helpdesk__Mcp__Instance` | MCP | `production` |
| `Helpdesk__Mcp__ExpectedApiBaseUrl` | MCP | `http://api:8222/` |
| `Helpdesk__Mcp__PublicResourceUri` | MCP | The same canonical HTTPS `/mcp` resource |
| `Helpdesk__Mcp__AllowedOrigins__0` | MCP | `https://helpdesk.example.com` |
| `Helpdesk__Mcp__AuthenticationMode` | MCP | `gateway` |
| `Helpdesk__Mcp__Outbound__ApiBaseUrl` | MCP | `http://api:8222/` |
| `Helpdesk__Mcp__Outbound__CredentialMode` | MCP | `gateway` |

Gateway mode has no downstream credential to supply. The expected and configured API targets must match. Browser origins contain no path; a mismatching Origin is rejected. Non-browser MCP clients may omit that header.

Use [HTTP MCP setup](/docs/integrations/http-mcp/) to review and verify an existing deployment. Advanced external Authentik mode has different ingress and downstream identities; use the [complete mode and field reference](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/configuration.md).

## Clients and Netclaw

`RATELDESK_CONFIG` selects a CLI file. `RATELDESK_MCP_CONFIG` selects an isolated MCP file. API-purpose clients can use the supported `INTEGRATION_CREDENTIAL_FILE` setting under their respective `RATELDESK_` or `RATELDESK_MCP_` prefix. Arbitrary `_FILE` settings are not automatically supported.

Native chat can be configured through the Integration hub or through the **API service**:

```text
Netclaw__Enabled=true
Netclaw__Instance=production
Netclaw__Endpoint=https://netclaw.example.com/hub/session
Netclaw__DeviceToken=<INJECTED_PAIRED_DEVICE_TOKEN>
Netclaw__AllowPrivateHttp=false
```

Inject the device token through protected deployment configuration. Deployment-managed profiles are read-only in the UI. Native chat still requires PostgreSQL.

## Apply a change

Compose `.env` supplies interpolation values; it does not inject every entry into every container. A service's `environment` supplies the actual runtime keys and overrides matching `env_file` entries. Review the rendered deployment and recreate affected services. Editing an environment file does not change a running process.

Sources: [Gateway configuration](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/deployment/web-gateway.md), [self-hosting](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/deployment/self-hosting.md), and [Netclaw settings](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netclaw.md).
