---
title: Backup and restore
description: Back up the database, bootstrap descriptor, key ring and attachments as one recoverable installation.
---

Back up RatelDesk's database and application state together. A database backup alone does not include the keys needed to read protected settings or keep signed links working.

## What belongs in the backup

| Data | Standard Compose location |
| --- | --- |
| SQLite application and scheduler databases | API `/var/lib/rateldesk/data` |
| PostgreSQL database, when selected | Your PostgreSQL service |
| Bootstrap descriptor and protected runtime settings | API `/var/lib/rateldesk/bootstrap` |
| Shared Data Protection key ring | API `/var/lib/rateldesk/keys` |
| Attachments and other stored files | API `/app/storage` |
| Deployment files and secret references | Your deployment configuration |

SQLite's data directory includes `rateldesk.db` and `rateldesk.hangfire.db`. Keep the whole directory. The latter preserves background scheduler state.

## A stopped SQLite backup

For a small instance, a maintenance window gives you a straightforward consistent backup. Run from the extracted release directory on the Docker host. Add your actual overlays to the `dc` function first:

```bash
dc() {
  docker compose --env-file .env -f docker-compose.release.yml "$@"
}
umask 077
backup_dir="backups/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$backup_dir"

dc stop api web
dc cp api:/var/lib/rateldesk/data "$backup_dir/data"
dc cp api:/var/lib/rateldesk/bootstrap "$backup_dir/bootstrap"
dc cp api:/var/lib/rateldesk/keys "$backup_dir/keys"
dc cp api:/app/storage "$backup_dir/storage"
cp .env docker-compose.release.yml "$backup_dir/"
dc up -d
```

Check every copy succeeded before relying on the backup. Include custom overlays and separately managed secret files in your protected backup process. Store the completed backup away from the application host.

## PostgreSQL backups

Use a consistent database backup from your PostgreSQL tooling or provider, alongside the application directories above. Stop API writes for a coordinated maintenance backup, or use a database-aware backup process with a documented recovery point.

Include database roles and permissions through your provider's recovery procedure. The bootstrap descriptor must continue to refer to the matching database instance and initialization marker.

## Restore one installation

1. Stop the application containers and select the compatible release and original deployment settings.
2. Restore the database, bootstrap directory, key ring and storage from the same backup set.
3. Preserve their mount locations, ownership and permissions.
4. Start API and Web, inspect logs and sign in with an existing account.
5. Check an existing ticket, an attachment and the expected organization access before enabling normal background work.

Practice restoration into an isolated deployment. Keep outbound email and operational integrations disabled there so the restored copy does not process live work.

`RecoveryRequired` means startup found missing or mismatched installation evidence. Restore the matching state instead of deleting a descriptor or supplying a new empty database. Administrator password recovery is a separate [local-account operation](/docs/identity/local/#recover-an-administrator).

## Release source

[Persistent state and recovery](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md#initialization-and-storage-recovery)
