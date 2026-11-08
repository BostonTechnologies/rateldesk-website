---
title: Microsoft Entra ID with Authentik
description: Federate Entra users into the supported RatelDesk Authentik browser flow.
---

For Entra ID / Azure users, configure an [Authentik Entra OAuth source](https://docs.goauthentik.io/users-sources/sources/social-logins/entra-id/oauth/), then use the [Authentik provider guide](/docs/identity/oidc/providers/authentik/) between Authentik and RatelDesk.

The documented Web release uses `Authentication__Authentik__*` for its browser flow. API `AzureAd` bearer-validation settings do not configure a direct Entra browser client. Keep RatelDesk’s callback URLs on the Authentik application; use the source’s own callback when registering Entra federation.

After federation, deliberately assign the resulting Authentik user to the installation’s login and administrator groups. Upstream Entra membership alone does not create a RatelDesk organization-role assignment. Verify the final API token issuer, audience and emitted groups, then run the [administrator and scoped-user checks](/docs/identity/oidc/providers/#verify-both-kinds-of-access).
