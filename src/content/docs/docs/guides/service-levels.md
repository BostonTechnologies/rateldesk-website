---
title: Configure service levels
description: Set response and resolution targets, working calendars and report subscriptions, then verify them on a ticket.
---

Configure an SLA when a ticket needs response and resolution targets. An instance administrator can manage the selected tenant's policies, calendars and reporting at `/admin/tenant-sla-settings`.

Choose the tenant first. A policy's scope, ticket type, optional service and priority determine which work it matches.

## Create a policy

1. Open **Policies** and select **Create**.
2. Enter **Name** and **Description**, then choose **Applies To** for the ticket type.
3. Add **Service Id (optional)** or **Priority (optional)** only when narrowing the policy intentionally. Set **Response Time (hours)** and **Resolution Time (hours)**.
4. Review **Active** and any escalation rules, then create the policy.

More specific matching policies take precedence; **Match Rank** breaks ties after specificity. Keep overlapping policies understandable so an operator can explain which target should apply.

Escalation rules identify a response or resolution metric, a trigger percentage and recipients. Verify the intended recipients and the [outgoing email configuration](/docs/email/outbound-mail/) before relying on email warnings.

## Set working time

Open **Working calendars**. Create or edit a calendar with its **Time Zone** and weekly start/end rules, and review **Active**.

Under **Calendar association**, enable **Use business hours** when appropriate and optionally select an **Explicit calendar**. Select **Save settings**. A valid explicit calendar wins; otherwise the active tenant calendar is used, then the active system calendar.

The selected timezone and weekly hours affect the meaning of a target. Check the calendar against the team's actual coverage before interpreting a response deadline.

## Verify the result

Create a representative test ticket that matches the policy. On its detail page, inspect **SLA**: response and resolution remaining time, progress and status should agree with the chosen policy and calendar.

Authorized operators can use **Pause SLA** and **Resume SLA** when available. Record the pause reason and check the displayed state after the action. Keep the ticket's work and communication history current while time is paused.

## Schedule a report

Under **Reporting**, choose **Create subscription**. Set **Frequency**, applicable weekly day, **Send Time**, **Timezone**, **Lookback Days** and **Recipients**. Review **Active**, then choose **Save subscription**.

Confirm the saved schedule and recipients. If an expected report or escalation doesn't arrive, check its generation context and email delivery records separately; a saved subscription alone doesn't establish successful delivery.

[Tenant SLA interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/SLA/TenantSlaSettingsAdmin.razor) · [Policy matching](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Application/Sla/SlaPolicyResolver.cs) · [Calendar selection](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Application/Sla/WorkingCalendarResolver.cs)
