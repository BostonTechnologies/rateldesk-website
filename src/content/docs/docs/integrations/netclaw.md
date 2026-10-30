---
title: Netclaw AI
description: Connect Netclaw to helpdesk tools or enable a persistent AI conversation inside a RatelDesk ticket.
---

RatelDesk supports two independent Netclaw connections. Configure the direction your workflow needs; using both requires both identities.

| Connection | Purpose | Credential |
| --- | --- | --- |
| Netclaw → RatelDesk HTTP MCP | Let an agent read or act on helpdesk records | RatelDesk MCP-purpose credential |
| RatelDesk API → Netclaw `/hub/session` | Native **AI Assistant** conversations in RatelDesk | Netclaw paired-device token |

## Give Netclaw helpdesk tools

First complete [HTTP MCP setup](/docs/integrations/http-mcp/). Create a credential for the intended Netclaw role and organization. Start with a read-only scope and policy; use separate credentials and Netclaw entries for different organizations.

On the Netclaw host, register the non-secret connection:

```sh
netclaw mcp add --transport http rateldesk https://helpdesk.example.com/mcp
```

Supply the entry's `Headers.Authorization` through Netclaw's protected secret configuration or the daemon's deployment secret mechanism. For a deployment-managed environment, the exact setting is:

```text
NETCLAW_McpServers__rateldesk__Headers__Authorization=Bearer <RATELDESK_MCP_CREDENTIAL>
```

Inject the actual value from your private deployment configuration. Do not add it to the repository. There is no RatelDesk-specific header-file option to invent. A configured Authorization header uses bearer authentication rather than Netclaw's OAuth sign-in flow.

Restart the daemon through its existing service manager after changing secrets or environment, then inspect it:

```sh
netclaw mcp list
netclaw mcp permissions
```

Review every audience. Current Netclaw defaults allow every MCP tool automatically for **Personal**; **Team** and **Public** start without grants for a newly added server. Select the tools and approval modes deliberately.

A RatelDesk tool can contain several operations, including writes. Keep the RatelDesk credential and [policy](/docs/integrations/operator-policies/) read-only when the agent should only read; granting a tool in Netclaw is not an operation-level read restriction.

Ask the connected agent to call `helpdesk_auth` operation `access`, then read one known authorized ticket. Check its reported organization and authority before enabling writes. The MCP credential identifies the RatelDesk owner, not the person speaking in a chat channel.

## Enable AI Assistant inside RatelDesk

Native chat needs **PostgreSQL** and is disabled by default. SQLite supports webhook AI assistance and investigation history, but not this persistent SignalR chat capability.

1. On the Netclaw daemon host, generate a one-time pairing code:

   ```sh
   netclaw daemon pair
   ```

2. In RatelDesk, open **Admin → Automation → Integration hub → Netclaw AI harness** at `/admin/automation/integration/netclaw`.
3. Enter the daemon's HTTPS base address or canonical `/hub/session` URL and the code. Choose **Pair & connect**.
4. Run **Test connection**. Open an authorized incident, request, or change, select **AI Assistant**, and send a harmless test question. Refresh the browser and confirm the conversation recovers.

RatelDesk protects the device token on the server. A reverse proxy must support SignalR/WebSocket upgrades and long-lived connections. Deployment-managed profiles use the API service's `Netclaw__...` settings and appear read-only in the hub; see [Configuration](/docs/reference/configuration/).

If a turn's outcome is uncertain, use the UI's recovery controls before resending. Stopping local waiting does not prove remote work was cancelled.

For helpdesk conversations originating in Teams, follow [Microsoft Teams](/docs/integrations/microsoft-teams/). That route uses the first connection above and does not require native in-ticket chat.

Sources: [RatelDesk Netclaw integration](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netclaw.md) and [Netclaw MCP configuration](https://github.com/netclaw-dev/netclaw-website/blob/a4441496da55e35bab33b9716410c3f76c8b21c3/src/content/docs/configuration/mcp-servers.md).
