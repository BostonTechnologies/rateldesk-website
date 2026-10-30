---
title: Credentials
description: Create, change, and revoke account-bound API and MCP access without replacing a working connection unnecessarily.
---

Create a separate credential for each client and purpose. Ordinary credentials belong to one account and one organization, have selected permissions, and expire after 1–90 days.

## Choose the purpose

| Consumer | Credential |
| --- | --- |
| `rateldesk` CLI, direct API client, or local `rateldesk-mcp` | API-purpose credential |
| Remote client calling the HTTP MCP gateway | MCP-purpose credential bound to its exact public HTTPS `/mcp` URL |
| RatelDesk's native Netclaw chat | A Netclaw paired-device token; configured separately |

Local and linked OIDC application accounts can own gateway credentials. Browser authentication and integration authorization are separate steps.

## Create a credential

Sign in as its intended owner and open **Integration → API & MCP credentials**. The direct account route is `/account/integration-credentials`.

1. Choose **Create credential**. Enter a useful client name, purpose, and expiry. For HTTP MCP, enter the exact canonical resource, such as `https://helpdesk.example.com/mcp`.
2. Keep **Tenant access only**, then choose one enabled organization and the required permissions. Selecting a permission cannot give the credential more authority than its owner has.
3. For HTTP MCP, review **Policies**. Start with **Read only** for a reader and narrow the selected operations where needed. API/CLI/stdio creation omits this step.
4. Check **Review & create**, explicitly approve the scope, and save the delivered secret in the client's protected store.

The HTTP MCP browser workflow provides a five-minute protected handoff. Choose **I have saved it** after storing the secret. If delivery is interrupted, keep the same page and approved draft and use **Resume setup** or **Retry delivery**. Details cannot reveal an acknowledged secret again.

The [CLI](/docs/reference/cli/) and [stdio](/docs/integrations/stdio/) setup wizards offer browser approval instead. Open their displayed URL, enter the code, and review the client. Signing in or opening the link alone grants nothing.

## Change a working client's permissions

Open **Details → Configured access → Edit access**. Review the additions, removals, and resulting grants, then choose **Review changes → Apply access changes**.

This keeps the same secret, owner, organization, purpose, resource, and expiry. The client does not need to be registered again. Check **Current admission** and use **Refresh admission** after a related role or policy change. A saved permission may still be blocked by the owner's current access or an MCP policy.

A different organization or renewed expiry needs a new reviewed credential. [Owner administration](/docs/integrations/operator-policies/#owner-administration) is a separate explicit grant.

## Stop access

**Revoke** stops later authorization and retains the record. **Revoke & delete** also removes the credential record. Deleting a local profile or running `auth logout` only removes local references; revoke the server credential when retiring a client.

Source: [Browser-approved credentials](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/browser-pairing.md).
