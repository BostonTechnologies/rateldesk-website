---
title: Hybrid sign-in
description: Offer local email/password accounts alongside organization OIDC sign-in.
---

Hybrid mode shows both the local password form and organization sign-in on `/login`. Use it when staff and customers have different account types or while introducing single sign-on.

## Configure the mode

Complete the [OIDC provider configuration](/docs/identity/oidc/) first. Hybrid needs the same issuer, client ID, client secret, API scope, audience and callback settings as OIDC-only mode.

Set the mode explicitly on both services:

```yaml
services:
  api:
    environment:
      Authentication__Mode: Hybrid
  web:
    environment:
      Authentication__Mode: Hybrid
```

The complete overlay in the OIDC guide already uses these values. If you maintain a custom stack, merge them into its environment rather than creating conflicting duplicate overlays.

Recreate the affected containers using your existing file set. For the website's release and HTTPS examples:

```bash
docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.public.yml -f docker-compose.identity.yml \
  up -d --force-recreate api web
```

Adding `Authentication__Mode` to `.env` alone does not override the supplied Compose template. It must be passed into each service, as above.

## Verify both paths

Open a fresh browser session and check that `/login` shows **Email**, **Password** and the organization-sign-in link.

Sign in once with an activated local account. Then use a separate session to sign in through the provider. In each session, check the expected organization and permitted ticket access. A successful provider redirect does not establish the account's application permissions.

## What Hybrid does not change

Local accounts keep their own passphrases and optional authenticator enrollment. External users authenticate with their identity provider. Their role assignments still determine their RatelDesk access.

Matching emails do not merge these identities. Creating a local account does not automatically give a provider identity access, and changing the mode does not assign roles.

For account creation, activation and recovery, use [Local accounts](/docs/identity/local/). For external provisioning and roles, use [OIDC](/docs/identity/oidc/) and [Users and roles](/docs/identity/users-and-roles/).

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Only the provider link appears | Confirm Web is running with Hybrid, then recreate it |
| Local form appears but login is rejected | Confirm API also uses Hybrid and the account is enabled and activated |
| Web refuses startup | Complete the required OIDC settings; Hybrid validates them too |
| Sign-in works but a page is unavailable | Review the account's organization roles |

## Release sources

- [Authentication mode resolution](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Models/WebAuthenticationMode.cs)
- [Login interface](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Components/Pages/Login.razor)
