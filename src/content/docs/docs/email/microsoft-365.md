---
title: Connect Microsoft 365
description: Read a Microsoft 365 support mailbox with Microsoft Graph and configure its outgoing sender.
---

Choose **Microsoft 365 — Microsoft Graph** to read a support mailbox through a Microsoft application. This connection uses application credentials and runs without an interactive mailbox sign-in.

You need an instance administrator in RatelDesk and a Microsoft administrator who can authorize the application for the intended mailbox.

## Prepare the Microsoft application

Have your Microsoft administrator provide the directory ID, application client ID and client-secret value. Authorize application `Mail.ReadWrite` access for intake and message disposition. Add `Mail.Send` if RatelDesk will send through Graph.

Limit application access to the support mailboxes using Microsoft's supported mailbox-scoping mechanism. The [Microsoft permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference#mailreadwrite) and [Exchange application RBAC guidance](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac) cover authorization and scope. Reading permission does not include sending permission.

## Add the mailbox

1. Open `/admin/email-settings`. Choose **Add → Global mailbox** or **Add → Tenant override**. For a dedicated assignment, select the **RatelDesk organization**.
2. Set **Inbound provider** to **Microsoft 365 — Microsoft Graph**. Enter a recognizable **Mailbox display name**, the **Mailbox address** and **Mailbox folder**. Use `inbox` for the Inbox.
3. Under **Provider credentials**, enter **Microsoft directory / provider tenant ID**, **Client ID** and **Client secret**. The Microsoft directory ID is separate from the RatelDesk organization.
4. Select **Test → Incoming connection**. It checks authentication and folder access without creating tickets. A successful read test doesn't prove permission to move messages.
5. Open **Processing**. Review **Initial import**, **Mark read after success** and the optional **Processed folder**. For Graph, a processed folder is its Graph folder ID. Leave it empty to keep messages in the source folder.
6. Enable incoming processing, save, and start the instance worker when ready. Follow the [email setup verification](/docs/email/overview/#verify-a-conversation).

## Configure sending

After saving the mailbox, open **Outgoing**, choose **Microsoft Graph**, enable outgoing mail and select **Save outgoing**. Graph sends from the configured mailbox using its Microsoft application credentials.

Use **Send sample email** with an address you control. This checks the sending permission that an incoming connection test cannot establish. Continue with [outgoing delivery checks](/docs/email/outbound-mail/).

## Rotate a secret

Replace the client secret on the same saved mailbox and test it again. Leaving the field blank retains the existing secret. Changing the source mailbox or folder requires a new source configuration; credential rotation on an unchanged source preserves ingestion progress.

[Mailbox provider contract](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md) · [Graph adapter](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Infrastructure/Email/GraphMailboxAdapter.cs)
