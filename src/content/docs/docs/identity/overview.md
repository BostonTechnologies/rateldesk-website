---
title: Choose a sign-in method
description: Choose local accounts, organization single sign-on or both, and keep authentication separate from role access.
---

Set the same authentication mode on API and Web. Local accounts are the release template's default; Hybrid adds organization sign-in without removing the password form.

## Choose the experience

| Mode | Login page | Use it when |
| --- | --- | --- |
| `Local` | Email and password | You want an independent account store |
| `Oidc` | Organization sign-in | All interactive users should use the identity provider |
| `Hybrid` | Email/password and organization sign-in | You need both account types or are introducing SSO |

The application setting is `Authentication__Mode`. Values are explicit and case-insensitive. There is no `Auto` mode in this release.

The supplied Compose file hard-codes `Local`. Add an environment override to both services when changing it. A setting in `.env` has an effect only when your Compose file passes it into the container.

## Start with local setup

The [first-run wizard](/docs/getting-started/quickstart/) creates the initial local administrator. It needs no SMTP or identity provider. That account signs in with the email and passphrase chosen during setup.

Configure [Hybrid](/docs/identity/hybrid/) while establishing your external users and role assignments. Verify the organization-sign-in path before choosing OIDC-only access.

## Provider support in beta.17

The browser OIDC path uses the Authentik configuration namespace and callbacks. Follow the [OIDC guide](/docs/identity/oidc/) for its required settings.

The API also retains Microsoft Entra bearer-token validation. That is separate from the browser provider flow; setting `AzureAd` values alone does not configure the Web login button. An existing Entra identity system can be federated into Authentik using its supported source integration.

## Authentication and permissions

Signing in establishes the user's identity. [Roles and organization assignments](/docs/identity/users-and-roles/) determine which records and actions they can use.

Local accounts and verified external identities share that access model. Matching email addresses do not merge accounts or grant access. Customer contacts, login identities and role assignments serve different purposes.

CLI and MCP connections use separately issued integration credentials. A browser session or password is not an API bearer token.

## Related pages

- [Local accounts](/docs/identity/local/)
- [OIDC sign-in](/docs/identity/oidc/)
- [Hybrid sign-in](/docs/identity/hybrid/)
- [Users and roles](/docs/identity/users-and-roles/)

## Release sources

- [Web mode resolution](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Models/WebAuthenticationMode.cs)
- [Browser provider resolution](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Models/HumanOidcRuntimeOptions.cs)
- [Authentik's Entra federation guide](https://docs.goauthentik.io/users-sources/sources/social-logins/entra-id/oauth/)
