---
title: Connect NetRatel
description: Pair RatelDesk with NetRatel, select the organization and tenant, and enable the automation direction explicitly.
---

Connect RatelDesk to NetRatel so a self-service request can run a reviewed job on a managed system. The same pair can also let NetRatel create helpdesk incidents. Enable each direction for the specific organization and tenant you intend to connect.

Use compatible releases of both products. Sign in with permission to configure the selected resources, and make sure each product server can reach the other's address.

## Pair the installations

1. Open **Account → Integration credentials → System connections** at `/account/integration-credentials` in either product.
2. Choose **Generate a Pairing Code**. Copy it to the other product. It expires after five minutes, is single use and is replaced by a newly generated code.
3. In the other product, choose **Create Connection**. Enter the peer's **Address** and **Pairing code**, then select **Pair & connect**.
4. After **Systems paired**, select the actual **NetRatel tenant** and **RatelDesk organization**. Give the connection a name that identifies its purpose.
5. Select **Run automation** for RatelDesk-to-NetRatel execution. Select **Create incidents** only if you also want NetRatel-to-RatelDesk incident creation; that direction also needs a customer from the chosen organization.
6. Select **Save**. Confirm the saved resources and directions in the connection list.

Pairing creates the setup relationship. Saving activates the selected business capabilities. It doesn't create organizations, tenants or customers, and enabling incident creation doesn't implicitly authorize automation.

## Verify the connection

Select **Test connection** to check authenticated access, the saved mapping and its selected capabilities. This is a read-only check: it doesn't run a job or create an incident.

Next, open a request form for the mapped organization and confirm that the connection appears under **Automation system connection**. Continue with [job selection and input mapping](/docs/automation/job-bindings/), then test an actual request.

## Recover or change a connection

If saving fails, correct the inline error and retry the same setup. A retained incomplete pairing appears as **Needs attention** with **Continue setup**; resume it instead of creating another pair.

For reachability failures, check DNS, TLS and proxy routing from the product server's network. The entered address is resolved by the server, not just your browser.

**Delete connection** revokes the selected mapping locally and leaves business history intact. Other mappings between the installations continue to work. Upgrade both products and pair again when migrating from the retired manual connection setup.

For the NetRatel side, see [NetRatel's public documentation](https://netratel.hello43031.chatgpt.site/docs/).

[System connection pairing](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netratel-pairing.md) · [Automation integration](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netratel-orchestrator.md)
