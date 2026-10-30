---
title: Choose a deployment
description: Choose SQLite or PostgreSQL, public ingress and optional MCP hosting.
---

Use the published Docker images for Web and API. Start with one server, choose storage during setup, and add integrations when the service desk is working.

## Pick your path

| Scenario | Deployment choice |
| --- | --- |
| Evaluate on one host | [Quickstart](/docs/getting-started/quickstart/) with SQLite and local accounts |
| Run a public service desk | Base release Compose plus [HTTPS ingress](/docs/deployment/public-https/) |
| Keep PostgreSQL on the same host | Add `docker-compose.postgres.yml` and select PostgreSQL in setup |
| Use a managed database | [External PostgreSQL](/docs/deployment/external-postgresql/) |
| Use existing proxy infrastructure | [Reverse proxy configuration](/docs/deployment/reverse-proxy/) |
| Add organization sign-in | [Hybrid](/docs/identity/hybrid/) or [OIDC](/docs/identity/oidc/) |

SQLite and PostgreSQL both support the core service desk. Native ticket AI Assistant chat requires PostgreSQL; webhook AI assistance remains available with SQLite.

## The services

| Component | Responsibility | Private port |
| --- | --- | --- |
| Web | Browser console, login and selected API proxy routes | `8111` |
| API | Tickets, accounts, permissions, storage and background work | `8222` |
| Optional HTTP MCP | Tool access for approved integrations | `8223` |
| Optional PostgreSQL | Application data | `5432` |

Public browser and API traffic enters through Web. Web resolves its API destination from `ApiBaseUrl`, normally `http://api:8222/` in Compose. The base release stack binds the host's Web and API ports to loopback.

## Keep the state together

The standard deployment has four persistent volumes: SQLite data, bootstrap state, Data Protection keys and attachment storage. PostgreSQL adds its own database storage while the other application volumes remain necessary.

The API applies the selected database's migrations at startup. There is no separate migration container in this release. Keep API and Web on the same product version, and preserve the Compose project name and volumes during updates.

## Release selection

The documentation targets **v0.1.2-beta.17**. Set `RATELDESK_VERSION=0.1.2-beta.17` for its release template. The `latest` image tag tracks stable releases and does not select this beta.

Follow [Docker Compose](/docs/deployment/docker-compose/) for everyday commands and [Backup and restore](/docs/deployment/backup-and-restore/) before changing a running installation.

## Release sources

- [Release templates](https://github.com/BostonTechnologies/rateldesk/tree/v0.1.2-beta.17/docker)
- [Storage and startup](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md)
