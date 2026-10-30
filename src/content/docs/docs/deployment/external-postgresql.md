---
title: Use PostgreSQL
description: Choose a bundled or external PostgreSQL database during first-run setup.
---

Choose PostgreSQL during the first-run wizard when you want a separate database service or native ticket AI Assistant chat. RatelDesk supports both a bundled PostgreSQL 16 service and an external server.

The target database must be empty for a new installation. Choosing another provider does not migrate an existing SQLite instance.

## Bundled PostgreSQL

In the extracted release directory, add a unique password to your protected `.env`:

```dotenv
RATELDESK_VERSION=0.1.2-beta.17
RATELDESK_POSTGRES_PASSWORD=replace-with-a-long-random-password
```

Start both Compose files before completing setup:

```bash
docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.postgres.yml config --quiet

docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.postgres.yml up -d
```

Select **PostgreSQL** in **Storage** and enter:

| Field | Value |
| --- | --- |
| Host | `postgres` |
| Port | `5432` |
| Database | `rateldesk` |
| Username | `rateldesk` |
| Password | The value you set in `.env` |
| Require TLS | Unchecked for this private bundled server |

The sidecar persists its data in `rateldesk-postgres-data`. Keep the overlay in later Compose commands.

## External PostgreSQL

Provision an empty database and a dedicated role that can apply the RatelDesk migrations. The initial migration creates the standard `uuid-ossp` extension; make it available on the server and allow the setup role to create it, or have your database administrator install it first. Setup does not require `pgvector`.

Start the normal release stack, open `/setup` and select **PostgreSQL**. Enter the external host, port, database and credentials. Enable **Require TLS** when the database endpoint is configured for TLS. Check connectivity from the API container's network, rather than only from your workstation.

The wizard checks the target before creating its schema. An unrelated non-empty database or an already-initialized RatelDesk database is not accepted as a new installation.

The completed setup stores its database settings in protected bootstrap state. Keep that state and its Data Protection keys with the database backup.

## Deployment-managed initialization

For an unattended first run, the included `docker-compose.external-postgres.yml` maps these operator inputs:

| Input | Meaning |
| --- | --- |
| `RATELDESK_POSTGRES_CONNECTION_STRING` | PostgreSQL connection string |
| `RATELDESK_BOOTSTRAP_ADMIN_EMAIL` | First administrator email |
| `RATELDESK_BOOTSTRAP_ADMIN_DISPLAY_NAME` | Administrator display name |
| `RATELDESK_BOOTSTRAP_ADMIN_PASSWORD` | Passphrase of at least 15 characters |
| `RATELDESK_BOOTSTRAP_ORGANIZATION_NAME` | Initial organization |
| `RATELDESK_BOOTSTRAP_APPLICATION_URL` | Public HTTPS application URL |
| `RATELDESK_BOOTSTRAP_TIME_ZONE_ID` | Optional IANA time zone; defaults to `UTC` |

Supply the values through protected deployment configuration, start with the base and external overlay, then explicitly invoke:

```bash
docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.external-postgres.yml exec api \
  dotnet /app/Helpdesk.API.dll --initialize-unattended
```

After initialization, remove the unattended inputs and that bootstrap overlay, then recreate the services with the normal deployment files while preserving all volumes. Startup does not automatically run unattended initialization.

## Related pages

- [Backup and restore](/docs/deployment/backup-and-restore/)
- [Upgrade RatelDesk](/docs/deployment/upgrades/)

## Release sources

- [PostgreSQL sidecar](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docker/docker-compose.postgres.yml)
- [External database setup](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md#external-postgresql)
