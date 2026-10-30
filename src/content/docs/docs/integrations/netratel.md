---
title: NetRatel
description: Pair NetRatel and RatelDesk for incident creation and explicitly selected network automation.
---

Connect NetRatel monitoring to a RatelDesk organization, or let RatelDesk invoke NetRatel automation. Each saved mapping names the tenant, organization, and capabilities it may use.

## Pair and choose capabilities

Use compatible current releases of both products. You need administrator access to the intended resources on each side, an existing NetRatel tenant, and an existing RatelDesk organization. Incident creation also needs that organization's customer.

1. In either product, open **Account → Integration credentials → System connections** at `/account/integration-credentials`.
2. Choose **Generate a Pairing Code**. Copy the code to the other product. It is single use and expires after five minutes; generating a replacement invalidates the old code.
3. In the other product, choose **Create Connection**, enter the peer's **Address** and **Pairing code**, then select **Pair & connect**.
4. After **Systems paired**, select the actual NetRatel tenant and RatelDesk organization. Select the organization's customer if enabling incident creation, and name the connection.
5. Select **Create incidents**, **Run automation**, or both. Choose **Save**.

Pairing allows setup; the saved mapping authorizes its selected business capabilities. Automation is never enabled implicitly. Pairing does not create a tenant, organization, or customer.

If Save fails, correct the inline error and continue the same setup. A saved but unfinished pairing appears as **Needs attention → Continue setup**; it does not require a duplicate connection.

## Verify the connection

**Configured** means the mapping is saved and authorized. **Test connection** performs a read-only check of authenticated access, the mapping, and selected capabilities; it creates no incident or task. The list shows the last test result and time.

Then verify each business direction you intend to use with a controlled real workflow. An authenticated probe alone does not demonstrate a completed automation run. If a dispatch times out, inspect its original execution and correlation history before submitting another task.

## Maintain or remove it

**View** shows the saved mapping. **Delete connection** removes that mapping and revokes its local authority even if the peer is offline. Other mappings between the same installations stay usable. Existing incidents, Flow runs, receipts, and task history remain.

Use HTTPS for normal deployments. The pairing form also accepts deliberately entered private HTTP hostnames or addresses; the server validates destinations and does not follow redirects. Keep pairing codes and server credentials out of tickets and logs.

When upgrading from the previous connection protocol, upgrade both products and pair afresh. Old mappings and credentials are retired; the new **System connections** workflow replaces the earlier manual profiles.

Source: [NetRatel system pairing](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netratel-pairing.md).
