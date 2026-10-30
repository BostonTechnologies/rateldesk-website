---
title: Publish through HTTPS
description: Configure RatelDesk's public origin and place your TLS reverse proxy in front of Web.
---

Put your HTTPS reverse proxy in front of the Web service. Keep API private and use the same public origin for the console, supported API routes and integration approval pages.

Have a hostname pointing to your ingress, a trusted certificate and a working [Compose installation](/docs/getting-started/quickstart/).

## 1. Configure the application

Create `docker-compose.public.yml` beside the release template. Replace the hostname and proxy IP with your own:

```yaml
services:
  api:
    environment:
      Authentication__AllowInsecureLocalhost: "false"
      Branding__ApplicationUrl: https://desk.example.com
      IntegrationCredentials__Pairing__PublicOrigin: https://desk.example.com
  web:
    environment:
      Authentication__AllowInsecureLocalhost: "false"
      WebGateway__PublicOrigin: https://desk.example.com
      WebGateway__TrustedProxies__0: 192.0.2.10
```

`192.0.2.10` is an example. Use the source IP the Web container actually receives from your proxy. If you intentionally trust a network, configure `WebGateway__TrustedNetworks__0` with its CIDR instead.

Keep the shared persistent Data Protection volume from the base template. Setting the public origin does not create a listener or configure TLS by itself.

## 2. Route the public host to Web

For host-installed Nginx on the Docker host, the upstream is the loopback Web mapping. The following is a configuration example to merge into your existing Nginx deployment:

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    listen 443 ssl;
    server_name desk.example.com;
    ssl_certificate /etc/ssl/rateldesk/fullchain.pem;
    ssl_certificate_key /etc/ssl/rateldesk/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8111;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_buffering off;
        proxy_read_timeout 3600s;
    }
}
```

Place the certificate files at your chosen paths, validate Nginx configuration with `nginx -t`, then reload it through your service manager. This example assumes Nginx is already installed and manages only this virtual host.

A proxy running in another container needs a shared Docker network and `http://web:8111/` as its upstream. A remote proxy needs a deliberately reachable private Web address; host loopback cannot be reached from another machine.

## 3. Apply and verify

```bash
docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.public.yml config --quiet

docker compose --env-file .env -f docker-compose.release.yml \
  -f docker-compose.public.yml up -d --force-recreate api web
```

Include your other deployment overlays too. Open the public HTTPS URL and sign in. Check a ticket page and `/api/docs/`. The browser should keep the public hostname and HTTPS scheme through redirects.

For a new instance, enter this HTTPS URL during setup. For an existing one, the deployment-owned branding URL takes precedence over the stored application URL.

## Related pages

- [Reverse proxies and split hosts](/docs/deployment/reverse-proxy/)
- [OIDC sign-in](/docs/identity/oidc/)

## Release sources

- [Public origin and proxy trust](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docs/deployment/web-gateway.md)
- [Web forwarded-header handling](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Program.cs)
