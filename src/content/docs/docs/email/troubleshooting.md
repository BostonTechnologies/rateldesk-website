---
title: Troubleshoot email delivery
description: Trace incoming receipts and outgoing deliveries, recover held messages, and import selected historical mail.
---

Start by identifying the direction. Incoming receipts explain whether a message became a ticket; **Pending Emails** explains what happened to an outgoing reply or notification.

## Incoming mail doesn't appear

Open `/admin/email-settings`, select the mailbox and check its status and **Activity** tab.

| Observation | Next check |
| --- | --- |
| Worker paused | Review the configured sources, then select **Start worker**. |
| Deployment blocked | Ask the deployment owner to check `EmailIngestion:Enabled`; the UI can't override a deployment stop. |
| Mailbox or ingestion disabled | Enable both switches under **Processing** and save. |
| Worker unavailable | Check the API worker's availability and shared heartbeat. |
| Authentication or source error | Run **Test → Incoming connection** and check credentials, folder, TLS and network access. |
| Captured but held | Open **Incoming receipts**, read the reason and correct [routing](/docs/email/routing-and-rules/). |
| Old message skipped | Check whether the mailbox began with **New messages only**. Use reviewed import when needed. |

**Sync now** queues a saved source through the normal worker. It doesn't override a pause or deployment block. An eligible held or failed receipt offers **Retry** after you fix its cause.

## Import selected older mail

In **Incoming receipts**, select **Import existing mail…**, then **Preview**. The preview shows eligible baseline-skipped messages from their original source. Select up to 25, review the senders and subjects, acknowledge that processing may create incidents and notifications, and choose **Import selected**.

This queues the selected messages; check their receipt outcomes after processing. It doesn't reset the mailbox cursor or replay the whole mailbox. POP3 previews use counts because POP3 doesn't provide a trusted receive date.

## An outgoing reply hasn't arrived

Open `/admin/pending-emails`. Search by tracking reference, subject or recipient, then filter by organization, mailbox sender or error code. Inspect the delivery result before retrying.

- **Ordinary failed delivery:** repair the reported transport or credential problem and use the offered retry action.
- **Sender configuration changed:** use **Review sender and retry**. Check the original recipients and the current mailbox/transport before adopting the repaired route.
- **Unknown outcome or partial acceptance:** check the provider's message trace and every listed recipient. The provider may already have accepted mail. Use the individual review action and record the required non-delivery evidence when a retry is appropriate.

Queue acceptance and provider acceptance are different stages. Keep the original delivery record while investigating so you can compare recipient outcomes.

**Cancel delivery** stops eligible work before submission. **Remove queue entry** prevents future dispatch of that queue record; it doesn't recall mail already accepted or erase the ticket conversation. Review the selected records and reason in the confirmation dialog.

[Mailbox and delivery recovery](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md) · [Incoming diagnostics interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Email/MailboxIngestion.razor)
