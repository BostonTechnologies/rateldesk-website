---
title: Authentik OIDC setup
description: Register RatelDesk, emit a dedicated administrator group and verify API access.
---

Use an Authentik administrator account to configure the provider. A RatelDesk instance administrator does not need Authentik superuser membership. Start with the [environment and role plan](/docs/identity/oidc/providers/).

## Register each installation

1. In **Applications → Providers**, create a confidential OAuth2/OpenID provider with a signing key. Prefer a per-provider issuer.
2. Register the installation’s exact `https://desk.example.com/signin-authentik` callback and `https://desk.example.com/signout-authentik` sign-out callback. Use separate URLs and clients for test and production.
3. Associate the provider with its application in **Applications → Applications**.
4. In **Directory → Groups**, create `rateldesk-test-access` and `rateldesk-test-instance-admins`. Add only the intended test administrators to the latter; include them in the access group too.
5. Bind the access group in the application’s **Policy / Group / User Bindings**. Review existing bindings and policy mode so another binding does not unintentionally admit users.
6. Keep `openid`, `email`, `profile` and `offline_access` scope mappings, plus the API scope the Web client requests, such as `rateldesk-api`.

Read the application’s discovery document, for example `https://id.example.com/application/o/rateldesk-test/.well-known/openid-configuration`. Copy its actual issuer. Configure the API audience to match the access token’s `aud`; an API scope name is not necessarily an audience.

## Emit the administrator group

Under **Customization → Property Mappings**, create an OAuth2/OIDC scope mapping with the requested API scope name, for example `rateldesk-api`. This illustrative expression emits only this installation’s administrator-group membership:

```python
admin_group = "rateldesk-test-instance-admins"
return {
    "groups": [group.name for group in request.user.groups.all()
               if group.name == admin_group]
}
```

Select the mapping on the test provider and enable **Include claims in id_token**. Inspect the API access token too: RatelDesk’s API must receive the group. Test the expression with an intended administrator and an ordinary member.

Mappings for the same scope can contribute claims together. An allowlist here does not remove groups emitted by the default profile mapping or another selected mapping. Review all selected mappings if you need to limit disclosed memberships. See [Authentik scope mappings](https://docs.goauthentik.io/add-secure-apps/providers/oauth2/scope-mappings/).

## Map it in RatelDesk

Add this environment entry to the **API** service alongside the shared [OIDC settings](/docs/identity/oidc/#2-configure-both-services):

```yaml
Authentication__Authentik__RoleMappings__rateldesk-test-instance-admins: HelpdeskAdmin
```

Use the exact emitted name. Map a separate production group in the production API. `HelpdeskAdmin` grants **Instance Administrator**; `InstanceAdministrator` is the application’s catalog-role key, not the compatibility permission used by this mapping.

Use a group name without `:` for `RoleMappings` in this documented release: dictionary binding treats those separators as configuration nesting and drops the complete group key. This also affects the shipped `rateldesk:role:admin` entry; use the dashed example above.

The compatibility group `helpdesk:role:helpdesk-admin` is recognized directly by the application, independently of that dictionary binding. A shared compatibility group can therefore grant administration in multiple installations. Audit existing mappings and memberships before treating a new environment-specific group as the only source of authority.

Ordinary roles need [saved organization assignments](/docs/identity/oidc/providers/#plan-groups-and-roles). Do not translate all staff or all application users to `HelpdeskAdmin` to make a page load.

## Verify the result

Apply the API/Web configuration and sign out and in again. Confirm the API’s effective access shows **HelpdeskAdmin**, then open **Administration → Integration** and verify that credentials and system connections load. Repeat with a scoped user and confirm instance administration is denied.

An OIDC administrator can authenticate without a customer-contact link. Credential ownership additionally requires an enabled persisted application account bound to that verified issuer and subject. If the role is correct but Integration returns 403, follow the [ownership diagnosis](/docs/identity/oidc/#common-problems); a new group alone does not create that account association.

Browser scopes and groups do not configure a separate MCP OAuth consumer. Follow the [HTTP MCP guide](/docs/integrations/http-mcp/) for that path, and [pairing guide](/docs/automation/netratel-pairing/) for system-to-system access.
