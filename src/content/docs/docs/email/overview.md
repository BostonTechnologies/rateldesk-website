---
title: Set up email support
description: Choose a shared or dedicated mailbox, connect incoming and outgoing mail, and verify a complete support conversation.
---

Connect a support mailbox to turn incoming messages into incidents and continue the conversation from RatelDesk. An instance administrator manages mailboxes at `/admin/email-settings`.

## Choose the mailbox arrangement

| Arrangement | Use it when |
| --- | --- |
| **Global mailbox** | Several organizations share one support address. RatelDesk resolves the organization from the requester and conversation. |
| **Tenant override** | An organization needs its own incoming address and sender identity. Select its existing RatelDesk organization. |

There is one global assignment and at most one dedicated assignment per organization. A dedicated mailbox remains assigned when paused or disabled. Mail arriving at the global address for that organization is held for review; a failed dedicated connection doesn't switch to global automatically.

Plan the address change with your mail administrator. RatelDesk doesn't configure MX records or forwarding. Replies to older conversations may still arrive at the previous address.

## Connect both directions

1. Open **Email Settings / Mailbox Configuration** and choose **Add → Global mailbox** or **Add → Tenant override**.
2. Choose an incoming provider: [Microsoft 365 — Microsoft Graph](/docs/email/microsoft-365/), [IMAP or POP3](/docs/email/imap-and-pop3/). Enter the actual mailbox address and connection details.
3. Use **Test → Incoming connection** to verify authentication and source access. Review **Processing → Initial import** before saving. **New messages only** avoids importing the existing mailbox backlog.
4. Save the mailbox, then configure its [Outgoing](/docs/email/outbound-mail/) tab. Incoming and outgoing credentials and enablement are separate.
5. Under **Processing**, enable **Mailbox enabled** and **Background ingestion enabled**, then save. Select **Start worker** when you're ready to process mail. A fresh installation starts with the worker paused unless deployment configuration explicitly enables it.

The worker also respects the deployment setting `EmailIngestion:Enabled`. A deployment stop cannot be overridden from the browser. **Sync now** uses the saved mailbox and requires the worker and incoming switches to permit processing.

## Verify a conversation

Send a new message from a test requester to the support address. Open the mailbox's **Activity** tab, inspect the incoming receipt and follow **Open ticket**. Confirm the organization, requester and attachments.

Send a reply from the ticket, check its delivery in **Pending Emails**, then reply from the requester's mailbox. Confirm that the reply joins the same incident. This checks [routing and threading](/docs/email/routing-and-rules/) as well as transport connectivity.

[Mailbox administration source](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md) · [Email Settings interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Email/EmailSettings.razor)
