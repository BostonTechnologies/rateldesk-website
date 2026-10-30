---
title: Configure outgoing mail
description: Send ticket replies through SMTP or Microsoft Graph and verify the selected organization sender.
---

Configure outgoing mail on each mailbox that should send ticket replies or notifications. Sending has its own settings and can stay enabled while incoming polling is paused.

Save the incoming mailbox record first, even if you're configuring its outgoing side next. Then open its **Outgoing** tab at `/admin/email-settings`.

## Set up SMTP

1. Select **SMTP submission** under **Send transport**.
2. Enter **SMTP submission host**, **SMTP port** and **Required SMTP TLS**. Choose **Mandatory STARTTLS** or **TLS on connect** to match your provider's submission endpoint.
3. Enter **SMTP username** and **SMTP password**, plus the desired **Sender display name**. These are separate from incoming IMAP or POP3 credentials.
4. Enable **Enable outgoing mail** and choose **Save outgoing**.
5. Select **Test outgoing connection**. Then choose **Send sample email**, enter an address you control and confirm **Send sample**.

The configured mailbox address is the From and Reply-To identity. Confirm that the SMTP account is authorized by your provider to use that address.

Leaving the password blank retains it for the same endpoint. Changing the SMTP host, port or username requires a new password.

## Send through Microsoft Graph

For a mailbox using **Microsoft OAuth application** credentials, **Microsoft Graph** is also available as a sending transport. The application needs `Mail.Send` authorization for the selected mailbox.

Select Graph, enable outgoing mail, save and use **Send sample email**. The SMTP connection-test button doesn't apply to Graph; a confirmed sample send checks its sending path.

## Understand which sender is used

Ticket mail uses the ticket's organization. Its dedicated mailbox wins; otherwise the global assignment supplies the sender. A disabled or incomplete dedicated sender holds delivery for review. It doesn't silently send through the global address.

Messages without ticket or organization context need the global sender. Review organization branding Reply-To values when changing mailbox assignments so they agree with the chosen support address.

## Confirm delivery

Open **Pending Emails** at `/admin/pending-emails` and search for the ticket reference, subject or recipient. A queued message is still waiting for dispatch. Provider acceptance records submission; use the recipient mailbox or provider records to confirm arrival.

If you repair outgoing settings while messages are already queued, use **Review sender and retry** where offered. Review the original recipients and proposed sender before confirming. See [email troubleshooting](/docs/email/troubleshooting/) for unknown outcomes, partial acceptance and other held deliveries.

[Outgoing editor](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Email/MailboxOutgoingEditor.razor) · [Sender and delivery behavior](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md)
