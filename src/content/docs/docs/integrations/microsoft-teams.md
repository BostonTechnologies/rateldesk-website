---
title: Microsoft Teams
description: Connect a Teams-enabled Netclaw deployment to RatelDesk through MCP, with explicit channel access and helpdesk permissions.
---

Use a Teams-enabled Netclaw deployment to receive helpdesk questions in Teams and call RatelDesk through HTTP MCP. Teams handles the conversation, Netclaw runs the agent, and RatelDesk authorizes each helpdesk operation.

## Availability

The verified Teams implementation is in the public [Proxicon/netclaw fork](https://github.com/Proxicon/netclaw/tree/806c1d425b8a53efafa7321f3cffbd368f0267ab), commit `806c1d4`. Its upstream contribution, [Netclaw PR #2184](https://github.com/netclaw-dev/netclaw/pull/2184), was open and unmerged when checked on 30 October 2026. The fork has no published release assets.

This guide therefore uses a source-built Teams channel integration. Upstream Netclaw's normal release does not provide an installable `msteams` plugin, and RatelDesk has no native Teams connector.

## Prepare the components

You need:

- RatelDesk with a verified [HTTP MCP gateway](/docs/integrations/http-mcp/), an integration owner, and one target organization.
- The Teams-enabled Netclaw build, a configured model provider, durable Netclaw storage, and a public HTTPS daemon endpoint.
- Permission to register a single-tenant Microsoft Entra application and create an Azure Bot.
- Permission to upload or approve a custom Teams app, plus your organization's public HTTPS privacy and terms pages.
- Authenticated tenant, Team, channel, and allowed-user IDs.

### Build the verified fork

On a Docker build host, check out the reviewed commit:

```sh
git clone https://github.com/Proxicon/netclaw.git netclaw-teams
cd netclaw-teams
git checkout --detach 806c1d425b8a53efafa7321f3cffbd368f0267ab
docker build -f docker/Dockerfile \
  --build-arg ARTIFACTS_STAGE=source-artifacts \
  --build-arg TARGETARCH=amd64 \
  -t netclaw-teams:806c1d4 .
```

Use `arm64` on an ARM64 builder. The Dockerfile's source stage compiles the CLI and daemon; no host .NET SDK is needed. Deploy this image using the [fork's runtime setup](https://github.com/Proxicon/netclaw/blob/806c1d425b8a53efafa7321f3cffbd368f0267ab/README.md), substituting `netclaw-teams:806c1d4` for the upstream image and preserving `/home/netclaw/.netclaw`. A reverse proxy needs a non-loopback daemon listener and explicit trusted proxies.

Run the following `netclaw` commands inside that container, or through its matching connected CLI. For example, a container named `netclaw-teams` can be initialized with `docker exec -it netclaw-teams netclaw init`.

## Register and configure Teams

1. Register a **single-tenant Entra application** and create its client secret. Create a **single-tenant Azure Bot** using that application's client ID and tenant ID.
2. Enable the **Microsoft Teams** channel on the Azure Bot. Set its messaging endpoint to `https://netclaw.example.com/api/messages` on the Netclaw host.
3. Open `netclaw config → Channels → Microsoft Teams → Configure Teams connection`. Enter the tenant ID and the same application client ID for **Client ID** and **Bot ID**. Enter the secret through the masked field. Do not use the application's object ID or the Teams `28:` identifier.
4. Add the approved Team and standard channel, and an explicit allowed user. Keep `MentionOnly` enabled. Leave direct messages, group chats, and attachments off until you intend to support them.

The corresponding non-secret channel settings belong under `Teams` in Netclaw's configuration:

```json
{
  "Teams": {
    "Enabled": true,
    "TenantId": "<TENANT_ID>",
    "ClientId": "<APPLICATION_CLIENT_ID>",
    "BotId": "<APPLICATION_CLIENT_ID>",
    "AuthenticationMode": "ClientSecret",
    "MentionOnly": true,
    "AllowDirectMessages": false,
    "AllowGroupChats": false,
    "AllowAttachments": false,
    "AllowedTeamIds": ["<TEAM_ID>"],
    "AllowedChannelIds": ["<CHANNEL_ID>"],
    "AllowedUserIds": ["<USER_OBJECT_ID>"],
    "ChannelAudienceOverrides": [
      { "TeamId": "<TEAM_ID>", "ChannelId": "<CHANNEL_ID>", "Audience": "team" }
    ]
  }
}
```

Merge these settings with the existing configuration. Keep the secret in Netclaw's protected store. An empty Team or channel list denies channel traffic; an empty user list can allow any sender in an allowed channel, so retain explicit users or reviewed group rules.

## Package and install the app

From the checked-out fork root, run in PowerShell with your real application ID and policy URLs:

```powershell
$BuildPackage = @{
    AppId = '<APPLICATION_CLIENT_ID>'
    DeveloperName = 'Your organization'
    PrivacyUrl = 'https://example.com/privacy'
    TermsOfUseUrl = 'https://example.com/terms'
    OutputPath = './artifacts/netclaw-teams.zip'
    Version = '1.0.0'
}
./deploy/teams/build-package.ps1 @BuildPackage
```

The [current manifest](https://github.com/Proxicon/netclaw/blob/806c1d425b8a53efafa7321f3cffbd368f0267ab/deploy/teams/manifest.template.json) requests `personal`, `team`, and `groupchat` bot scopes, with app-scoped `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` permissions. Review the generated manifest. Upload the ZIP through **Apps → Manage your apps → Upload an app → Upload a custom app**, or have a Teams administrator publish it. Install it in the approved Team and approve its requested permissions. Increment the package version for an update.

## Connect helpdesk access and test

Complete [Netclaw → RatelDesk MCP setup](/docs/integrations/netclaw/#give-netclaw-helpdesk-tools). Select **Team** tool grants and approval modes, and start with a RatelDesk read-only policy.

Run `netclaw doctor`, `netclaw status`, and `netclaw mcp list`. This fork reports Teams as configured but unvalidated in status; prove the connection with a real exchange. Mention the bot in the approved channel and ask it to read a known in-scope incident. Confirm the reply appears in the same thread. Test a permitted mutation only after enabling its explicit credential grant and policy, approving its preview, and checking the saved result in RatelDesk.

Teams identity controls who may talk to the agent. RatelDesk operations run as the MCP credential's owner and organization; they do not impersonate the Teams sender. Netclaw approval cards authorize an agent action, and RatelDesk still checks its own permissions. A granted card does not prove the action completed.

Group chats additionally need `AllowGroupChats=true`, the canonical chat ID, and a global user or group grant. `Chat.ReadBasic.All` is optional for friendly group-chat discovery; manual IDs remain supported. Group-derived authorization and directory discovery have their own Graph permission requirements in the [fork's complete runbook](https://github.com/Proxicon/netclaw/blob/806c1d425b8a53efafa7321f3cffbd368f0267ab/docs/integrations/microsoft-teams-channel.md).

Native [AI Assistant inside RatelDesk](/docs/integrations/netclaw/#enable-ai-assistant-inside-rateldesk) is a separate connection. This Teams-to-MCP route does not require PostgreSQL native chat or a RatelDesk-held Netclaw device token.
