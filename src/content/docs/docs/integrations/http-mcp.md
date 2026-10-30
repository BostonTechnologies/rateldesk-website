---
title: HTTP MCP
description: Verify a gateway and connect a remote MCP client with its own organization-scoped credential.
---

Use HTTP MCP when an agent or workstation should reach RatelDesk over HTTPS without launching a local bridge. The optional MCP service exposes the canonical `/mcp` resource and calls the API on behalf of the approved client.

This guide uses **gateway** authentication for Local or linked OIDC accounts. Gateway hosting has no stored downstream service credential or shared signing key: the API exchanges each client credential for a short-lived execution token.

## Verify the host

You need Docker access to the deployment host, Python 3, a RatelDesk administrator account, a working public HTTPS Web URL, and the verified deployment tools plus matching native CLI from [v0.1.2-beta.17](https://github.com/BostonTechnologies/rateldesk/releases/tag/v0.1.2-beta.17). The launcher checks Compose capabilities; upstream Compose 2.35.0 is its supported minimum. Follow its isolated-tool option if the installed Compose lacks required features.

Run this from the **extracted deployment tools directory on the Docker host**. Replace the path with the actual extracted native executable:

```sh
NATIVE_SETUP=/absolute/path/to/rateldesk
./setup-http-mcp.sh --native-executable "$NATIVE_SETUP"
```

1. Select the intended deployment if discovery finds more than one. Enter its Web URL, such as `https://helpdesk.example.com`.
2. Keep **Verify existing deployment** for an existing working configuration. Use **Prepare configuration changes** to enable MCP for the first time or deliberately change it. The release bundle supplies the matching fresh-deployment defaults.
3. Review the source and service summary. Open the displayed approval URL, sign in, choose **Review host**, and approve that exact proposal.
4. Save the reviewed baseline or candidate. Apply any prepared changes through the deployment's existing manager using the displayed instructions.
5. Run the fresh verification command printed by setup. Its basic shape is:

   ```sh
   ./setup-http-mcp.sh --native-executable "$NATIVE_SETUP" --verify
   ```

   Keep any additional source and Docker-selection arguments it prints. Approve the separate **Temporary verification client**. It can check authenticated status, has a five-minute maximum lifetime, and is cleaned up afterward.

A successful host check includes MCP initialization and API-backed `helpdesk_auth` operation `status`. It does not issue an ordinary client credential.

## Connect a client

From the extracted **native CLI directory**, choose a private client-store directory:

```sh
PRIVATE_CLIENT_DIRECTORY="$HOME/.config/rateldesk/http-clients"
RATELDESK_MCP_CLIENT_DIRECTORY="$PRIVATE_CLIENT_DIRECTORY" \
  ./rateldesk setup --target http-client \
  --url https://helpdesk.example.com/mcp --profile support-reader
```

Open the approval URL and choose **Review client**. Select one organization, required permissions such as `Incident.Read`, and expiry. Save the profile, then use the protected connection details in your MCP client.

Verify the exact profile path printed by setup:

```sh
CLIENT_PROFILE=/absolute/path/printed/by/setup.json
./rateldesk --config "$CLIENT_PROFILE" doctor --network --authenticate
```

The consumer sends `Authorization: Bearer …` using its protected credential mechanism. This credential is for the public MCP resource; it cannot be used as a direct API credential.

## Check identity and a read

In the connected client, call `helpdesk_auth` with `{"operation":"access"}` to inspect current execution authority. Then make an allowed read against a known ticket. A `401` suggests credential, expiry, purpose, or resource mismatch; a `403` can indicate an origin or authorization restriction. See [Troubleshooting](/docs/reference/troubleshooting/).

External Authentik ingress uses a separate downstream execution identity. It requires an explicit deployment and does not turn each OAuth caller into their own RatelDesk principal. See the [complete authentication reference](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/configuration.md).

Source: [HTTP MCP setup](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/mcp-http/setup.md).
