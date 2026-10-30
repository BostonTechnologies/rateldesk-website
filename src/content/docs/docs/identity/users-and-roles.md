---
title: Users, organizations and roles
description: Assign access to the right organization, distinguish staff and self-service roles, and delegate tenant administration.
---

Assign roles to a user in the organization where they need access. RatelDesk checks those assignments on the API for each protected operation.

An organization is the tenant boundary for service-desk records. A customer contact identifies a requester; a login account identifies the person signing in. Creating a contact does not by itself grant that person login access.

## Choose a role

| Role | Access |
| --- | --- |
| Instance Administrator | Instance configuration, all organizations, accounts and roles |
| Tenant Administrator | User, role, settings, customer and SLA management for assigned organizations |
| Technician | Read/write incidents, requests and changes, plus change approval and self-service |
| Incident / Request / Change Reader | Read that module across the assigned organization |
| Incident / Request / Change Writer | Read, create and update that module in the assigned organization |
| Request Executor | Read requests and execute their orchestration actions |
| Change Approver | Read changes and approve submitted changes |
| Self-service User | Access to the linked contact's own supported records |

Deletion is separate from ordinary writing. Request Writer does not imply orchestration execution, and Change Writer does not imply change approval. A tenant-wide Reader can see staff conversation history; use Self-service User for a customer who should see only their own work.

## Manage team access

An instance administrator opens **Administration → Accounts & Orgs → Team** at `/admin/users`. Create the user, choose their organization and access bundle, then complete the activation flow for a local account.

For an existing application-managed user, edit the organization-role assignments and choose **Save access**. Review the organization beside each role; the same person can have different access in different organizations.

Use **Manage local account** for credential reset or disablement. Role editing and credential management are separate operations.

## Delegate tenant administration

A tenant administrator sees the Team workflow only for authorized organizations. They can manage permitted membership assignments and invite a new local self-service account within the selected tenant.

That workflow does not grant instance access, reset existing global account credentials or change memberships in another organization. Existing non-delegable assignments are preserved.

After a local membership change, the account's previous session is rejected on its next request and the user signs in again. OIDC Web sessions refresh their effective access from API on subsequent authenticated requests.

## Custom roles

Instance administrators use **Administration → Roles & Permissions** to create tenant-owned custom roles. Tenant administrators use **Tenant roles** within their delegation limits.

Choose from the published assignable permissions. Write, delete and approval permissions must include their corresponding tenant-wide read permission. A custom role belongs to its selected tenant and does not become an instance-wide role.

## External users

External identity links use verified provider identity evidence. Email addresses are profile data, not authorization keys. Keep provider-side grants and application assignments aligned when removing access; removing one does not necessarily remove the other.

## Related pages

- [Local accounts](/docs/identity/local/)
- [OIDC sign-in](/docs/identity/oidc/)
- [Hybrid sign-in](/docs/identity/hybrid/)

## Release sources

- [Role and scope contract](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/security/rbac.md)
- [Team interface](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Components/Pages/Admin/User/UserManagement.razor)
