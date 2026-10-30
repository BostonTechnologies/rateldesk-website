---
title: Reverse proxies and split hosts
description: Route Web, REST and optional HTTP MCP through one public origin or explicit private destinations.
---

Send public traffic to Web and let its built-in gateway forward the supported API routes. Configure private destinations explicitly when Web, API or MCP run on separate hosts.

## Addresses have different jobs

| Setting | Process | Purpose |
| --- | --- | --- |
| `ApiBaseUrl` | Web | Private API destination, normally `http://api:8222/` |
| `WebGateway__PublicOrigin` | Web | Public HTTPS instance origin |
| `IntegrationCredentials__Pairing__PublicOrigin` | API | The same trusted origin for integration approvals |
| `WebGateway__TrustedProxies__0` | Web | An ingress IP allowed to supply forwarded headers |
| `WebGateway__TrustedNetworks__0` | Web | An explicitly trusted proxy network in CIDR form |

For a split-host deployment, change `ApiBaseUrl` to the exact private HTTP(S) endpoint reachable from Web. A Docker service name works only on a network shared with that service. `localhost` inside a container refers to that container.

The gateway does not discover another backend or switch targets when the selected service is unavailable.

## Preserve the routes

Web serves setup, login, browser approval and `/api/docs`. It forwards selected API V1, OpenAPI and asset paths to API. Keep the generated route allowlist instead of adding a broad `/api` catch-all.

The outer proxy should preserve the public host and HTTPS scheme, explicit authorization headers, WebSocket upgrades and streaming responses. [Public HTTPS](/docs/deployment/public-https/) includes a Nginx example.

API and Web also need the same durable Data Protection keys. Moving them to separate hosts requires deliberately sharing or synchronizing that key ring through your deployment's storage and secret-management process.

## Optional HTTP MCP

The HTTP MCP host is a separate service. When it is configured, Web receives these settings:

```dotenv
WebGateway__Mcp__Enabled=true
WebGateway__Mcp__Destination=http://mcp-http:8223/
WebGateway__Mcp__AuthenticationMode=gateway
WebGateway__Mcp__ActivityTimeout=00:05:00
```

Set the trusted public origin too. A split public resource can use `WebGateway__Mcp__PublicResourceUri` with its exact HTTPS `/mcp` URL. It must agree with the HTTP host's configured resource.

Use the supported HTTP MCP setup workflow to configure both Web and the host. Selecting a Docker profile alone does not update another container's environment. Preserve `/mcp` on the upstream request; the route is not a prefix to strip.

Gateway mode does not advertise OAuth protected-resource metadata. The separate Authentik mode adds `/.well-known/oauth-protected-resource/mcp`.

## Check the result

Open the console and `/api/docs`, then sign in and read an existing ticket. For MCP, verify transport initialization and a permitted read through the public endpoint.

| Symptom | Check |
| --- | --- |
| Redirect uses HTTP or an internal host | Forwarded headers and explicit proxy trust |
| API requests return 502/503 | Web's chosen backend address and network reachability |
| MCP returns HTML | Route selection and outer proxy path handling |
| A stream arrives only at the end | Response buffering and timeout settings |

Recreate containers after changing their environment. Keep all deployment overlays in the apply command.

## Release source

[Gateway configuration and behavior](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/web-gateway.md)
