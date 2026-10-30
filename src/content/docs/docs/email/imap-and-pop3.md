---
title: Connect IMAP or POP3
description: Configure a TLS-protected mail server connection with password or supported Microsoft application authentication.
---

Use IMAP or POP3 when your support mailbox is exposed through a mail server protocol. Both require verified TLS. Your mail administrator must provide the server address, port and permitted authentication method.

| Provider | Incoming behavior |
| --- | --- |
| IMAP | Reads a configured folder, can mark successful messages seen and can move them when the server supports MOVE. |
| POP3 | Uses stable UIDL identities and leaves messages on the server. It has no folder or unread-state controls. |

## Configure the connection

1. Open `/admin/email-settings` and add a **Global mailbox** or **Tenant override**. Choose **IMAP** or **POP3** as the **Inbound provider**.
2. Enter the **Mailbox address**, **Mail host** and **Port**. Select **TLS on connect** or **Mandatory STARTTLS** to match your server. The interface defaults to port `993` for IMAP and `995` for POP3; use the provider's actual settings.
3. For IMAP, enter the **Mailbox folder**, usually `INBOX`.
4. Select **Authentication**. For **Username and password/app password**, enter **Protocol username** and **Protocol password**. Password authentication must be allowed by the server.
5. Use **Test → Incoming connection**. Open **Processing** and review **Initial import**, then enable and save the mailbox and background ingestion. Start the instance worker when ready.
6. Configure [SMTP submission](/docs/email/outbound-mail/) on the **Outgoing** tab. Receiving credentials don't configure SMTP automatically.

## Microsoft application authentication

The **Microsoft OAuth application** option uses the directory ID, client ID and client secret for Exchange protocol access. IMAP requires `IMAP.AccessAsApp`; POP requires `POP.AccessAsApp`, together with Microsoft administrator consent and mailbox authorization. Graph permissions alone don't authorize these protocols.

Follow Microsoft's [application authentication procedure](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#oauth-20-client-credentials-grant-flow). Use [Microsoft Graph](/docs/email/microsoft-365/) when you want the Graph intake connection instead.

## Check retention and private servers

For IMAP, leave **Processed folder** empty to retain successful messages in the source folder. A configured move destination requires server MOVE support. For POP3, arrange mailbox retention separately and ensure UIDL is supported; RatelDesk doesn't delete source messages.

A deployment using a private mail server must allow its exact hostname through `EmailIngestion:AllowedPrivateHosts`. An unapproved private destination will fail the connection test. TLS certificate and hostname verification still apply.

Send a new test message after the initial baseline completes. Check **Incoming receipts** before changing import settings or attempting to replay old messages.

[Mailbox administration source](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md) · [Protocol adapter](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Infrastructure/Email/ProtocolMailboxAdapter.cs)
