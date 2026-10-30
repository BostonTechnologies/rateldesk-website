---
title: Deploy your first instance
description: Start the published RatelDesk beta.17 images and create your first local administrator.
---

Start with the published deployment archive, SQLite and local accounts. Run these commands in a **terminal on your Docker host** with Docker Compose v2, `curl`, `tar` and `sha256sum` installed.

If you plan to use native ticket AI Assistant chat, [choose PostgreSQL](/docs/deployment/external-postgresql/) before completing storage setup.

## 1. Download and check the release

```bash
mkdir rateldesk-downloads
cd rateldesk-downloads
curl -fLO https://github.com/BostonTechnologies/rateldesk/releases/download/v0.1.2-beta.17/rateldesk-deployment-0.1.2-beta.17.tar.gz
curl -fLO https://github.com/BostonTechnologies/rateldesk/releases/download/v0.1.2-beta.17/SHA256SUMS
sha256sum -c --ignore-missing SHA256SUMS
```

The deployment archive must report `OK`. Extract it and enter its directory:

```bash
tar -xzf rateldesk-deployment-0.1.2-beta.17.tar.gz
cd rateldesk-deployment-0.1.2-beta.17
umask 077
cat > .env <<'EOF'
RATELDESK_VERSION=0.1.2-beta.17
EOF
```

The archive includes its own top-level directory. Its Compose files are directly inside that directory, without a `docker/` prefix.

## 2. Start Web and API

```bash
docker compose --env-file .env -f docker-compose.release.yml config --quiet
docker compose --env-file .env -f docker-compose.release.yml pull
docker compose --env-file .env -f docker-compose.release.yml up -d
docker compose --env-file .env -f docker-compose.release.yml ps
```

The API becomes healthy before Web starts. Inspect logs if it does not:

```bash
docker compose --env-file .env -f docker-compose.release.yml logs --tail=100 api web
```

## 3. Unlock setup

Open **http://localhost:8111/** on the Docker host. For a remote host, run this from your own computer and keep the tunnel open:

```bash
ssh -L 8111:127.0.0.1:8111 admin@your-server
```

Then open the same local URL. In the Docker-host terminal, retrieve the one-time code:

```bash
docker compose --env-file .env -f docker-compose.release.yml exec api \
  dotnet /app/Helpdesk.API.dll --show-setup-code
```

Paste it into **Unlock setup**. The code unlocks the wizard; it is not your account password.

## 4. Complete the wizard

| Stage | What to enter |
| --- | --- |
| Storage | SQLite for this quickstart |
| Instance | Organization, application name, `http://localhost:8111/` and your IANA time zone |
| First administrator | Display name, email and a passphrase of at least 15 characters |
| Branding | Optional visual choices |
| Review | Check the values and complete setup |
| Ready | Wait for the operational API, then sign in |

The API restarts after setup. Sign in with the administrator email and passphrase you created. Initial local sign-in does not ask for an authenticator code.

If setup cannot retrieve its state, run:

```bash
docker compose --env-file .env -f docker-compose.release.yml exec api \
  dotnet /app/Helpdesk.API.dll --setup-status
```

`Ready` means setup is complete. A missing descriptor or `RecoveryRequired` needs [state recovery](/docs/deployment/backup-and-restore/), not a new administrator.

## Next steps

[Configure public HTTPS](/docs/deployment/public-https/), [invite your team](/docs/identity/users-and-roles/) and [choose your sign-in method](/docs/identity/overview/).

## Release sources

- [Release Compose template](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/docker/docker-compose.release.yml)
- [First-run wizard](https://github.com/BostonTechnologies/rateldesk/blob/v0.1.2-beta.17/src/HelpDesk.NewWeb/Components/Pages/Setup.razor)
