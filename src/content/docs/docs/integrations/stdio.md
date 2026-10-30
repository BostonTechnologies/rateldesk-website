---
title: stdio MCP
description: Launch the local RatelDesk MCP bridge from a desktop or command-line AI client.
---

Use stdio MCP when your AI client can launch a local process. The client speaks MCP over that process's standard input and output; `rateldesk-mcp` calls the RatelDesk API using its own saved identity.

You do not need the hosted HTTP MCP service for this connection.

## Install the bridge

Download the `rateldesk-mcp-stdio` archive for your platform from [v0.1.2-beta.17](https://github.com/BostonTechnologies/rateldesk/releases/tag/v0.1.2-beta.17) and check it against the release's `SHA256SUMS`. The release includes Linux x64, Linux arm64, and Windows x64 builds.

These are self-contained executables. Linux builds require glibc; use a compatible distribution rather than an Alpine/musl container. Extract the whole archive into a durable tools directory.

## Pair a profile

In an interactive terminal, run the extracted executable:

```sh
./rateldesk-mcp setup --profile support
```

On Windows, use `rateldesk-mcp.exe`. Enter the RatelDesk Web URL. Open the displayed approval URL, sign in, choose **Review client**, and approve one organization, selected permissions, and expiry.

The stdio profile receives an **API-purpose** credential. It is separate from a CLI profile with the same name and from an HTTP MCP client credential. The wizard saves the secret through a protected file reference and checks the connection.

## Configure the MCP client

Set its process command to the absolute path of `rateldesk-mcp`. This Linux launch example shows the required environment variables; replace the profile path and Web origin with the actual saved values:

```sh
RATELDESK_MCP_CONFIG="$HOME/.config/rateldesk/profiles/mcp/support.json" \
RATELDESK_MCP_INSTANCE=support \
RATELDESK_MCP_EXPECTED_API_BASE_URL=https://helpdesk.example.com/ \
rateldesk-mcp
```

This launch example assumes the executable is on `PATH`. A client's environment configuration usually needs an expanded absolute path; it may not expand `$HOME` itself. The expected API base URL must match the profile's target.

Let the client launch the process through pipes without a TTY. Normal startup emits only JSON-RPC on stdout. Diagnostics go to stderr; setup is a separate interactive command.

## Verify in the client

Connect, complete MCP initialization, and call `helpdesk_auth` with `{"operation":"status"}`. Then perform a permitted read against a known ticket. The discovered schema describes the required request fields for each operation.

If startup exits with code `78`, inspect stderr for a configuration or target-pinning error. Running `setup` without a TTY also exits `78`; open an interactive terminal to authorize the profile first. A process that starts successfully still needs a valid API credential and permission for the requested record.

When the credential expires, rerun explicit setup for that profile. Removing its local files does not revoke access on the server; use [credential management](/docs/integrations/credentials/) when retiring the integration.

Source: [CLI and stdio setup](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/cli-stdio.md).
