---
title: Integrations
description: Choose the right connection for operators, AI tools, Microsoft Teams, and NetRatel automation.
---

Connect the tools your team already uses while keeping RatelDesk's account, organization, and ticket permissions in control.

## Choose a connection

| You want to… | Use | Where it runs |
| --- | --- | --- |
| Query tickets or write an operator script | [RatelDesk CLI](/docs/reference/cli/) | Your workstation or automation host |
| Give a desktop AI client helpdesk tools | [stdio MCP](/docs/integrations/stdio/) | A local `rateldesk-mcp` process launched by that client |
| Connect a remote agent to helpdesk tools | [HTTP MCP](/docs/integrations/http-mcp/) | An optional RatelDesk MCP service behind HTTPS |
| Discuss a ticket with an assistant inside RatelDesk | [Netclaw AI](/docs/integrations/netclaw/) | RatelDesk API connects to a paired Netclaw daemon |
| Ask for helpdesk work from Microsoft Teams | [Teams with Netclaw](/docs/integrations/microsoft-teams/) | A Teams-enabled Netclaw deployment calls RatelDesk over MCP |
| Create incidents from monitoring or run network automation | [NetRatel](/docs/integrations/netratel/) | A saved system connection between the two products |

These connections have separate credentials. Browser sign-in does not authenticate an MCP client, and a Netclaw device pairing does not give that daemon access to RatelDesk's API.

## Start with a bounded role

For an ordinary client, choose the account that owns the integration, one organization, and the permissions needed for its job. For example, a triage reader can start with `Incident.Read`. Create another credential and profile for a second organization.

An instance administrator can separately approve an HTTP MCP **Owner administration** grant. That grants much broader authority across organizations; it is a different consent choice from selecting tenant permissions.

After connecting, verify both identity and a permitted read. MCP initialization or a discovered tool list proves connectivity, but it does not prove that a particular ticket is accessible.

## Where controls apply

RatelDesk checks the current account, credential, organization, permissions, and any applicable MCP policy. An AI client such as Netclaw adds its own tool grants and approval rules. A client approval cannot override RatelDesk's authorization.

Use [Credentials](/docs/integrations/credentials/) to create or maintain access, then [Operator policies](/docs/integrations/operator-policies/) to limit HTTP MCP operations. Keep the connected product's version alongside RatelDesk's version when diagnosing an integration.

Source: [RatelDesk integration guides at v0.1.2-beta.17](https://github.com/BostonTechnologies/rateldesk/tree/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations).
