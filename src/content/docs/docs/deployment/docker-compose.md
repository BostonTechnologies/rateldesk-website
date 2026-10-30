---
title: Run with Docker Compose
description: Manage the release stack, apply configuration changes and preserve persistent storage.
---

Use `docker-compose.release.yml` from the verified deployment archive. The [quickstart](/docs/getting-started/quickstart/) covers downloading it and creating the first administrator.

Run commands from the extracted `rateldesk-deployment-0.1.2-beta.17` directory.

## Select the release

Create a private `.env` containing:

```dotenv
RATELDESK_VERSION=0.1.2-beta.17
```

The supplied template uses that exact version for API and Web. Optional host-port inputs are `RATELDESK_WEB_PORT` and `RATELDESK_API_PORT`, defaulting to `8111` and `8222`.

The template explicitly sets Local authentication. Adding an arbitrary authentication variable to `.env` will not change a container unless a Compose environment entry maps it. Use the overlays in the [identity guides](/docs/identity/overview/) for that change.

## Everyday commands

```bash
# Validate without printing rendered secrets.
docker compose --env-file .env -f docker-compose.release.yml config --quiet

# Start or reconcile services.
docker compose --env-file .env -f docker-compose.release.yml up -d

# Inspect running state and recent logs.
docker compose --env-file .env -f docker-compose.release.yml ps
docker compose --env-file .env -f docker-compose.release.yml logs --tail=100 api web
```

API health gates Web startup. The API starts in a restricted setup host on a fresh installation, then restarts into the operational application after initialization.

After editing environment values, recreate the affected containers:

```bash
docker compose --env-file .env -f docker-compose.release.yml up -d --force-recreate api web
```

`restart` restarts existing containers with their old environment. Include every PostgreSQL, HTTPS, identity or MCP overlay used by your deployment in subsequent commands.

## Persistent volumes

| Volume | Container location | Contents |
| --- | --- | --- |
| `rateldesk-data` | `/var/lib/rateldesk/data` | SQLite application and scheduler databases |
| `rateldesk-bootstrap` | `/var/lib/rateldesk/bootstrap` | Initialization descriptor and protected runtime settings |
| `rateldesk-data-protection` | `/var/lib/rateldesk/keys` | Shared encryption key ring |
| `rateldesk-storage` | `/app/storage` | Attachments and other stored files |

Compose prefixes volume names with its project name. The template sets that name to `rateldesk`. Keep the existing project identity when upgrading so the containers continue using their original state.

## Useful setup commands

Run inside the API container, or prefix with `docker compose … exec api`:

```bash
dotnet /app/Helpdesk.API.dll --setup-status
dotnet /app/Helpdesk.API.dll --show-setup-code
```

Use `sh` if opening a shell in the API image. Bash is not required for these commands.

## Related pages

- [Public HTTPS](/docs/deployment/public-https/)
- [External PostgreSQL](/docs/deployment/external-postgresql/)
- [Upgrade RatelDesk](/docs/deployment/upgrades/)

## Release source

[Release Compose template](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docker/docker-compose.release.yml)
