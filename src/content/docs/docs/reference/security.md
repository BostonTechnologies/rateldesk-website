---
title: Security and trust boundaries
description: Understand account, organization, credential, policy, and AI execution boundaries in RatelDesk.
---

RatelDesk's API decides access from the current application principal, durable role assignments, and the target organization. Browser navigation, a client-supplied organization ID, or an advertised MCP operation does not grant access.

## Account and organization access

Local and linked OIDC accounts use the same permission model. An external identity is linked using verified provider identity; matching an email address alone is not an authorization link.

Tenant administrators operate within assigned tenants. Instance administrators have broader account and instance authority. Read, write, delete, execution, and designated approval are distinct permissions or record-specific checks. A read-only staff role may include staff conversation history, so choose it with the information the client needs in mind.

An ordinary [integration credential](/docs/integrations/credentials/) intersects the owner's current authority with one organization and its selected permissions. Disabled accounts or organizations, removed grants, expiry, and revocation affect later requests.

## Agent authority

The CLI and stdio bridge use API-purpose credentials. HTTP MCP gateway credentials are bound to the exact public HTTPS `/mcp` resource and exchange for API-issued execution tokens. The gateway neither stores a downstream service credential nor shares the application's database or key ring.

An explicitly consented **Owner administration** HTTP MCP grant can administer the instance and enabled organizations. It still cannot decide an approval as another designated person or create another account integration credential through delegated execution.

[MCP policies](/docs/integrations/operator-policies/) can narrow operations. For confirmation-controlled MCP writes, review the preview before `confirm:true`. Treat one-time activation tokens and other sensitive operation results as secrets; route them only through the intended private handoff.

## AI and chat channels

Netclaw's device pairing and RatelDesk's MCP credential are separate identities. In a [Teams integration](/docs/integrations/microsoft-teams/), Teams access rules decide who can reach the agent, while RatelDesk sees the MCP credential owner. A Teams sender is not automatically a corresponding RatelDesk user.

Keep a separate account, organization-scoped credential, and agent deployment where tenants or trust boundaries differ. Review the agent's own audiences, tool grants, and approval behavior alongside RatelDesk permissions. Prompt text is guidance, not an authorization boundary.

## Protect the deployment

Serve public traffic over HTTPS, configure trusted proxy addresses, and retain private API and MCP backend access. Keep credentials out of URLs, command arguments, repository files, screenshots, and support tickets.

Preserve the database, bootstrap state, shared Data Protection keys, and attachments as one recovery set. Losing key material can make protected settings unusable. After an uncertain external action, reconcile the saved result before resubmitting; local cancellation does not prove a remote action stopped.

## Report a vulnerability

Follow the repository's [security policy](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/SECURITY.md) and use its private reporting channel when available. Include the affected version, reproduction steps, and impact without credentials or customer data.

Sources: [Roles and scoped authorization](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/security/rbac.md) and [MCP authentication](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/configuration.md).
