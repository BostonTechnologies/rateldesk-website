---
title: Choose an OIDC provider guide
description: Plan separate provider applications, administrator groups and organization-scoped RatelDesk roles.
---

Configure the identity service first, then apply the shared [RatelDesk OIDC configuration](/docs/identity/oidc/). These guides describe the documented preview release; they do not report a live test of your provider.

| Identity service | Supported browser setup |
| --- | --- |
| Authentik | [Register a provider and emit administrator groups](/docs/identity/oidc/providers/authentik/) |
| Microsoft Entra ID / Azure | [Federate Entra users through Authentik](/docs/identity/oidc/providers/microsoft-entra-id/) |
| Another provider | Federate it through Authentik using an appropriate [user source](https://docs.goauthentik.io/users-sources/). This release’s browser configuration uses the Authentik namespace; separate API bearer settings do not establish a direct browser flow. |

## Separate environments

Create an application/provider and confidential client per RatelDesk installation. Keep their issuers, API audiences, callback URLs and client secrets separate. For example:

| Installation | Login group | Instance administrator group |
| --- | --- | --- |
| Test | `rateldesk-test-access` | `rateldesk-test-instance-admins` |
| Production | `rateldesk-prod-access` | `rateldesk-prod-instance-admins` |

Names are examples. An application’s login binding permits authentication. It does not grant RatelDesk administration. Include each administrator in the corresponding login group and map only that installation’s admin group.

## Plan groups and roles

| Intended access | Example test group | RatelDesk assignment |
| --- | --- | --- |
| Instance Administrator | `rateldesk-test-instance-admins` | Explicit API `RoleMappings` entry to `HelpdeskAdmin`; instance-wide authority |
| Tenant Administrator | `rateldesk-test-support-admins` | Save **Tenant Administrator** for the chosen organization in RatelDesk |
| Technician | `rateldesk-test-technicians` | Save **Technician** for the chosen organization |
| Incident Reader / Writer | `rateldesk-test-incident-readers` / `rateldesk-test-incident-writers` | Save the matching incident role for the organization |
| Request Reader / Writer / Executor | `rateldesk-test-request-readers` / `rateldesk-test-request-writers` / `rateldesk-test-request-executors` | Save the matching request role for the organization |
| Change Reader / Writer / Approver | `rateldesk-test-change-readers` / `rateldesk-test-change-writers` / `rateldesk-test-change-approvers` | Save the matching change role for the organization |
| Self-service User | `rateldesk-test-users` | Establish the customer login/invitation link and self-service assignment |

Only the explicit administrator mapping above converts a provider group into instance administration. The other group names record intended membership; they do not automatically create, synchronize or revoke saved organization-role assignments. Review those assignments when membership changes. Use the [users and roles guide](/docs/identity/users-and-roles/) for the application procedure.

Identity links use verified issuer and subject evidence, not matching email addresses. Browser login, account-owned integration credentials and [HTTP MCP authentication](/docs/integrations/http-mcp/) have separate prerequisites. Test each path you intend to use.

## Verify both kinds of access

Sign in with a fresh administrator session and check the resolved instance role, administration pages, credential listing and system connections. Then sign in as a scoped user: verify a permitted read in the assigned organization and denial of instance administration and unrelated organizations. Sign out and in again after changing provider groups. Existing access tokens can retain their claims until expiry or refresh.

### Release sources

- [API group mapping](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/Helpdesk.API/Program.cs)
- [Built-in application roles](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/Helpdesk.Shared/Auth/RoleDefinitionCatalog.cs)
- [Effective authorization and identity links](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/Helpdesk.Infrastructure/Auth/Rbac/CurrentUserAccessService.cs)
