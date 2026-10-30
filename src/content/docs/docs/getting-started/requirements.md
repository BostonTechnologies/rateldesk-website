---
title: Requirements
description: Choose a server platform, database and sign-in method for RatelDesk v0.1.2-beta.17.
---

Run RatelDesk with Docker Engine and Compose v2 on a Linux x64 or arm64 host. The published images include their .NET runtime. A browser is enough for day-to-day use.

These guides describe **v0.1.2-beta.17**, a prerelease. Select that exact release when following its examples.

## Server requirements

| Requirement | Purpose |
| --- | --- |
| Linux `amd64` or `arm64` | Published Web, API and optional HTTP MCP images |
| Docker Engine and Compose v2 | Run the release deployment files |
| `curl`, `tar` and `sha256sum` | Download, extract and verify the deployment archive |
| Persistent storage | Database, scheduler, bootstrap state, encryption keys and attachments |
| HTTPS hostname and certificate | Public browser access and integration onboarding |

The basic stack runs Web on port `8111` and API on `8222`, both bound to host loopback. Public users reach Web through your HTTPS reverse proxy. The optional HTTP MCP service listens on `8223` internally.

There is no release-specific minimum CPU or RAM sizing profile. Size the host for your ticket volume, attachments, mail processing and enabled integrations, then monitor usage as the instance grows.

## Choose storage before setup

| Database | Use it when |
| --- | --- |
| SQLite | You want the simplest single-host installation |
| Bundled PostgreSQL 16 | You want PostgreSQL on the same Docker host |
| External PostgreSQL | You already operate a database service and its backup process |

Both SQLite and PostgreSQL support the service desk. Native ticket AI Assistant chat requires PostgreSQL. SQLite supports webhook AI assistance and its history. Changing database providers later needs a deliberate data migration, so make this choice before completing the wizard.

## Sign-in and optional tools

The first installation uses local accounts. It needs no identity provider or SMTP server. [Hybrid](/docs/identity/hybrid/) and [OIDC](/docs/identity/oidc/) add organization sign-in through the configured provider.

Published CLI and stdio MCP archives are self-contained for Linux x64, Linux arm64 and Windows x64. Linux archives require a glibc distribution. They do not need a separately installed .NET runtime.

## Next step

[Start the quickstart](/docs/getting-started/quickstart/) or [compare deployment scenarios](/docs/deployment/overview/).

## Release sources

- [v0.1.2-beta.17 artifacts](https://github.com/BostonTechnologies/rateldesk/releases/tag/v0.1.2-beta.17)
- [Deployment templates](https://github.com/BostonTechnologies/rateldesk/tree/v0.1.2-beta.17/docker)
- [Self-hosting behavior](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md)
