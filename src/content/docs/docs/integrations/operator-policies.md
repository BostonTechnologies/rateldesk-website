---
title: Operator policies
description: Limit the operations an HTTP MCP integration can perform and review broader administrator access explicitly.
---

Use an MCP policy to limit what an HTTP MCP integration may do within its approved access. RatelDesk checks the owner's current authority, the credential's grants, and the policy together. A policy cannot add an organization or grant a role.

## Start with a base policy

The browser's HTTP MCP creation wizard includes **Policies** before **Review & create**. Select **Read only** for a reader or **All access** within the reviewed grants, then narrow the selected operations if necessary.

An ordinary credential has an organization-scoped base. New policies do not silently broaden older credentials; existing credentials without a policy retain their established account and credential checks.

To manage saved policies, sign in as an interactive Helpdesk administrator and open **Administration → MCP Policies** at `/admin/operator-policies`.

1. Select the integration and inspect its base policy, scope, operations, and expiry.
2. Choose **Edit** to review the limits. **Resume draft** restores an unfinished edit; **Discard draft** clears it.
3. Add a nested **Deny** exception when only particular operations should be blocked. Setting the base itself to **Deny** stops all access in that scope.
4. Apply the reviewed change, then refresh the credential's **Current admission** and verify an allowed read through the actual client.

Deny takes precedence. A child cannot exceed its parent, and alternative tool names for the same API action cannot bypass an operation deny.

## Owner administration

An enabled instance administrator can explicitly approve **Owner administration** under **Server access** when creating an HTTP MCP credential. Its **Tenant access** step selects a default context; the grant covers the instance and enabled organizations, including ones created later. Its base policy uses **Server / instance** scope.

Use this only when the agent needs instance administration. Selecting all ordinary tenant permissions does not create an owner grant. After connecting, call `helpdesk_auth` operation `access` and check that `grantKind` is `owner-administration` and `isHelpdeskAdmin` is `true`.

Removing the owner's administrator authority, disabling the account, expiry, or credential revocation stops subsequent access. Even an owner agent cannot approve as another designated ticket approver or issue itself another integration credential. Credential consent and policy management remain interactive account actions.

## Confirmation and lifecycle

For an MCP operation that requires confirmation, omitted or false `confirm` produces a preview without performing the mutation. Review that preview and submit `confirm:true` only for an authorized action. Inspect the operation schema: confirmation behavior is not identical for every operation.

An agent's own approval prompt adds another control. Clicking it cannot override RatelDesk permissions or policy.

**Disable** can be reversed through a fresh review. **Revoke** and **Delete** are terminal. Retiring or expiring a base policy also stops its children; deleting a policy does not restore unrestricted access. Read the resulting record after an uncertain write before deciding whether to retry.

Sources: [Policy management](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/setup.md#manage-policies-and-exceptions) and [operation contracts](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/contracts/mcp-operation-contracts.md).
