---
title: Upgrade RatelDesk
description: Apply a matching API and Web release while preserving the database, scheduler, keys and attachments.
---

Upgrade API and Web together using an exact published version. RatelDesk applies the selected database provider's migrations when API starts.

## 1. Review and back up

Read the target release notes and download its deployment archive and matching checksums. Extract the new bundle separately to compare templates with your current deployment.

Take a [complete backup](/docs/deployment/backup-and-restore/) of the database, bootstrap state, Data Protection keys and attachments. SQLite backups also include `rateldesk.hangfire.db`, which stores scheduler state.

Keep your existing Compose project name, persistent volumes, public origins, authentication configuration and selected overlays. Merge template changes into the deployment instead of replacing its private `.env` with an example.

## 2. Select the exact version

For the release documented here:

```dotenv
RATELDESK_VERSION=0.1.2-beta.17
```

This is a beta. The `latest` image tag selects stable releases and does not move when a beta is published. Published release manifests also provide image digest information when your deployment pins images by digest.

## 3. Apply the update

Run from the existing deployment directory after preparing the new files. The commands below show the base stack. Add the same PostgreSQL, public ingress, identity and MCP overlays used by your running instance.

```bash
docker compose --env-file .env -f docker-compose.release.yml config --quiet
docker compose --env-file .env -f docker-compose.release.yml pull
docker compose --env-file .env -f docker-compose.release.yml stop api web
docker compose --env-file .env -f docker-compose.release.yml up -d
docker compose --env-file .env -f docker-compose.release.yml ps
docker compose --env-file .env -f docker-compose.release.yml logs --tail=100 api web
```

There is no separate migrations command or image to run. Wait for API health and Web startup before checking the browser.

If you run HTTP MCP, update its matching release image through the same deployment's established files and configuration. Preserve its profiles and persistent setup state.

## 4. Verify existing work

Sign in with an existing account. Check an existing ticket, its conversation and an attachment. Confirm the expected organization and role access. Check background-job and email status before resuming normal work.

An upgraded installation should keep its owner and data. If setup appears unexpectedly, inspect `--setup-status`, the mounted volumes and the configured database. Do not complete a new wizard over an instance you intended to preserve.

## Recovery and provider changes

If migration fails, stop the new application containers and restore the matching backup set before retrying. Reverting image tags alone does not reverse a database migration.

Switching between SQLite and PostgreSQL is a separate migration project. Provision the target and plan explicit data transfer; changing the provider setting does not convert the existing database.

## Related pages

- [Backup and restore](/docs/deployment/backup-and-restore/)
- [Docker Compose](/docs/deployment/docker-compose/)

## Release sources

- [Upgrade and recovery behavior](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md)
- [Published beta.17 release](https://github.com/BostonTechnologies/rateldesk/releases/tag/v0.1.2-beta.17)
