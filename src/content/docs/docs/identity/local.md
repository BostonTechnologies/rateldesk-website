---
title: Local accounts
description: Create local users, enable an authenticator and recover administrator access without SMTP.
---

Local accounts let people sign in with an email address and passphrase stored by your RatelDesk instance. The first-run wizard creates the initial administrator; further accounts are created through **Team**.

## Enable local sign-in

The release Compose template already selects Local mode. For an existing custom deployment, set this on both API and Web:

```yaml
services:
  api:
    environment:
      Authentication__Mode: Local
  web:
    environment:
      Authentication__Mode: Local
```

Save it as an overlay and apply it with your normal deployment files. Use [Hybrid](/docs/identity/hybrid/) if organization sign-in should remain available too.

Recreate the containers after changing environment settings. A restart retains their existing values.

## Create and activate a user

An instance administrator opens **Administration → Accounts & Orgs → Team**, then **Create**. Choose the person's organization and access bundle, and complete the local-account flow.

The activation step uses a one-time token. Deliver it privately and direct the user to `/activate` to set a passphrase. This supports account setup without SMTP. The initial administrator created by the installation wizard already has a passphrase and does not need this activation step.

Local passphrases need at least 15 characters. The default policy does not require a particular mixture of digits, uppercase characters or symbols. Five failed sign-in attempts trigger a 15-minute account lockout.

## Enable an authenticator

The signed-in user opens `/account/authenticator`, confirms the current passphrase and adds the displayed key to a TOTP authenticator. Enter its current six-digit code to finish setup.

RatelDesk displays ten recovery codes once. Save them separately from the authenticator device. Later sign-ins ask for the password first, then an authenticator code or an unused recovery code.

Change a passphrase at `/account/change-password`.

## Manage an existing account

Use **Team → Manage local account** for reset, activation and disable actions. Disable a local account when removing login access; deleting an application profile is not the credential-management workflow.

Organization roles are managed separately. [Users and roles](/docs/identity/users-and-roles/) explains the scope of each assignment and the narrower tenant-administrator workflow.

## Recover an administrator

An operator with access to the Docker host can issue a one-time recovery token for an existing instance administrator:

```bash
docker compose --env-file .env -f docker-compose.release.yml exec api \
  dotnet /app/Helpdesk.API.dll --recover-local-admin admin@example.com
```

Use the actual account email and your complete Compose file set. The command enables the existing administrator, invalidates old sessions and prints a recovery token to that operator terminal. Use `/activate` with that token to set the new passphrase.

This does not recreate the installation or create another owner. Database and bootstrap recovery use the separate [restore procedure](/docs/deployment/backup-and-restore/).

## Release sources

- [Local identity policy](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/Helpdesk.Infrastructure/Identity/LocalIdentityServiceCollectionExtensions.cs)
- [Local account operations](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/self-hosting.md#local-administrator-recovery)
