---
title: Notifications and support routing
description: Investigate recorded notifications and configure who receives email for new unassigned tickets.
---

Use **Notifications** to follow application and workflow events. Use **Support Routing** to configure the support recipients for ticket email. They answer different daily questions: what happened, and who should be told.

## Find a recorded event

Open `/notifications` or follow a notification link.

1. Search for the ticket reference, correlation ID or relevant text.
2. Narrow **Severity**, **Source**, **Category** and **Created** time as needed. For a NetRatel task, **Orchestration** is the useful source.
3. Open the relevant row and inspect its details and linked work.
4. Mark reviewed items with **Mark Selected Read**.

The **LIVE** or **DISCONNECTED** indicator describes the live update stream. If disconnected, reload the page to inspect persisted records while checking the connection. Marking an event read doesn't resolve the ticket or complete its task.

## Route new-ticket email

An instance administrator opens **Support Routing** at `/admin/support-routing` and selects the **Organization**.

1. Under **Support groups**, create or choose the group and review its members. Use **Add Group** when a new group is required.
2. Under **Routing**, select **Support coverage** and review the organization's provider/group routes. Use **Add Route** for the intended coverage.
3. Change **Routing concern** to **Notification rules** and choose **Add Rule**.
4. Select **New unassigned ticket**, choose a **Support group** or **User** recipient, leave the **Email** channel selected and review **Enabled** before saving.
5. Open **Diagnostics**, select the preview event and check the resolved recipient list.

The recipient preview is the useful check before testing a real event. A group name or saved rule doesn't prove that the intended people resolve as recipients.

**Bootstrap Defaults** can create missing groups, coverage and new-ticket subscriptions for enabled organizations. It requires confirmation; review the proposed purpose and existing configuration before applying it.

## Verify delivery

Ensure the organization's [outgoing sender](/docs/email/outbound-mail/) is configured. Create a controlled unassigned test ticket and verify the expected recipients. If no email arrives, compare the routing preview with **Pending Emails** and its recorded delivery reason.

Customer updates, approval links and support routing have their own recipient context. When troubleshooting, identify the exact message type and original ticket instead of broadening recipients to see what happens.

[Notifications interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Notifications.razor) · [Support Routing](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/SupportNotifications/SupportRoutingManagement.razor) · [Notification rule options](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/SupportNotifications/SupportNotificationSubscriptionDialog.razor)
