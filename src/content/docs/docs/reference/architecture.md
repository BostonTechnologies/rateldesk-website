---
title: Architecture
description: Understand the Web, API, storage, and optional integration services before choosing a deployment.
---

RatelDesk separates the browser interface from the API that owns data and authorization. A default installation runs two application services with SQLite. PostgreSQL, HTTP MCP, Netclaw, and NetRatel are optional additions.

## Runtime components

| Component | Responsibility | Shipped container port |
| --- | --- | --- |
| Web | Blazor interface, browser sessions, setup and account pages, API proxy | `8111` |
| API | Business rules, account and organization authorization, persistence, background work, integrations | `8222` |
| HTTP MCP, optional | MCP protocol and explicit ingress authentication; calls the selected API | `8223` |
| Database | Application data and durable work | SQLite by default; PostgreSQL optional |

Place public HTTPS ingress in front of Web. Web routes the supported API paths to API and, when enabled, `/mcp` to the MCP service. The private destinations are explicit; an outage does not make the gateway discover another backend.

The standard container network uses `http://api:8222/` and `http://mcp-http:8223/`. These private addresses differ from the public Web origin and canonical HTTPS MCP resource. Keep those identities aligned in [configuration](/docs/reference/configuration/).

## Persistent state

Preserve four concerns together: the selected database, bootstrap initialization state, the Data Protection key ring, and attachment storage. SQLite installations include both `rateldesk.db` and the scheduler's `rateldesk.hangfire.db`.

The API checks that its initialization descriptor and database belong together before normal startup. A missing initialized database is a recovery condition; it does not silently create a replacement instance.

Web and API use durable Data Protection keys. HTTP MCP does not need the application database or that key ring. Restore and upgrade plans must preserve the matching database, initialization state, keys, and files.

## SQLite or PostgreSQL

SQLite supports the main helpdesk workflows, webhook AI assistance, and investigation history. PostgreSQL additionally enables native persistent Netclaw chat, whose durable session coordination uses PostgreSQL advisory locks.

Choose the database before first setup where possible. Switching an initialized installation between SQLite and PostgreSQL requires an explicit data migration plan; changing a setting is not a migration. These deployment templates do not constitute an automatic high-availability design.

## Integration boundaries

The [CLI](/docs/reference/cli/) and [stdio bridge](/docs/integrations/stdio/) call the API using isolated API-purpose credentials. In [HTTP MCP gateway mode](/docs/integrations/http-mcp/), the API exchanges an MCP-purpose credential for a short-lived execution token and rechecks the owner's authority on subsequent requests. The gateway stores no persistent downstream service identity.

[Netclaw](/docs/integrations/netclaw/) can independently consume HTTP MCP tools or receive paired native chat connections from the API. A [Teams-enabled Netclaw deployment](/docs/integrations/microsoft-teams/) is another conversation entry point to the same MCP authorization boundary.

[NetRatel system connections](/docs/integrations/netratel/) explicitly map a NetRatel tenant to a RatelDesk organization and enable incident creation, automation, or both.

Sources: [Self-hosting architecture](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/deployment/self-hosting.md) and [Web gateway](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/deployment/web-gateway.md).
