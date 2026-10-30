---
title: Organization sign-in with OIDC
description: Configure the Authentik browser flow, callback URLs, API audience and external account access.
---

Connect RatelDesk's browser sign-in to Authentik using authorization code with PKCE. Start with a working [HTTPS instance](/docs/deployment/public-https/) and a completed local administrator setup.

## 1. Prepare the provider

Create an Authentik OAuth2/OpenID provider and application for RatelDesk. Configure a confidential client, a signing key and exact public callback URLs:

| Setting | Example |
| --- | --- |
| Authority / issuer | `https://id.example.com/application/o/rateldesk/` |
| Sign-in callback | `https://desk.example.com/signin-authentik` |
| Sign-out callback | `https://desk.example.com/signout-authentik` |
| Standard requested scopes | `openid email profile offline_access` |
| Additional API scope | Your configured scope, for example `rateldesk-api` |

Use your actual issuer and hostnames. Provide the email and subject claims needed for identity provisioning. The API's configured audience must match the access token's `aud` value; a scope name and audience are separate settings.

## 2. Configure both services

Save this as `docker-compose.identity.yml` beside the release files. Replace the example issuer, client ID, scope and audience. Begin with `Hybrid` so the local administrator can verify external access:

```yaml
services:
  api:
    environment:
      Authentication__Mode: Hybrid
      Authentication__Authentik__Authority: https://id.example.com/application/o/rateldesk/
      Authentication__Authentik__Audience: your-access-token-audience
  web:
    environment:
      Authentication__Mode: Hybrid
      Authentication__Authentik__Authority: https://id.example.com/application/o/rateldesk/
      Authentication__Authentik__ClientId: your-client-id
      Authentication__Authentik__ApiScope: rateldesk-api
      Authentication__Authentik__CallbackPath: /signin-authentik
      Authentication__Authentik__SignedOutCallbackPath: /signout-authentik
      AUTHENTIK_CLIENT_SECRET: ${AUTHENTIK_CLIENT_SECRET:?Set the OIDC client secret}
```

Supply `AUTHENTIK_CLIENT_SECRET` through your protected deployment environment or private `.env`. Keep the HTTPS and proxy-trust settings from your public deployment.

Apply the overlay with the rest of your files:

```bash
docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.public.yml -f docker-compose.identity.yml \
  up -d --force-recreate api web
```

Adjust the public-overlay filename if your deployment uses another one.

## 3. Establish access and verify

External users need a verified identity link and organization access. Email matching alone does not link an account. The customer login/invitation workflow establishes ordinary user links; explicitly authorized external instance administrators can sign in without a customer-contact link.

The shipped API role mapping recognizes `rateldesk:role:admin` as `HelpdeskAdmin` and `rateldesk:role:technician` as `Technician`. Configure provider claims deliberately and use [organization roles](/docs/identity/users-and-roles/) for the required scope.

In a fresh browser session, choose **Sign in with Authentik**. Confirm the expected organization, role access and a permitted ticket read. Check sign-out and a second sign-in.

For SSO-only access, change `Authentication__Mode` to `Oidc` in both overlay services and recreate them again. Hybrid keeps both methods visible.

## Common problems

| Symptom | Check |
| --- | --- |
| Web fails at startup | Required issuer, client ID, API scope and secret |
| Callback rejected | Exact URL, public HTTPS scheme and forwarded-header trust |
| Provider succeeds but application denies access | API audience, external identity link and organization permissions |

The beta.17 Web flow uses this Authentik namespace. API `AzureAd` bearer settings alone do not configure direct Entra browser sign-in. For Entra users, use [Authentik federation](https://docs.goauthentik.io/users-sources/sources/social-logins/entra-id/oauth/).

## Release sources

- [Browser OIDC options](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Models/AuthentikOidcOptions.cs)
- [External identity provisioning](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/Helpdesk.API/Endpoints/Users/UserEndpoints.cs)
- [Authentik provider setup](https://docs.goauthentik.io/add-secure-apps/providers/oauth2/)
