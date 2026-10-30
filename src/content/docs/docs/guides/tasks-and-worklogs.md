---
title: Tasks, worklogs and notes
description: Complete request tasks, record time and distinguish customer updates from internal notes.
---

Use tasks to move a request through its workflow. Use worklogs and notes to explain what happened and record time spent. A worklog can document a task, but it doesn't replace the task's completion action.

## Work your task queue

1. Open **Tasks** at `/tasks`. **Assigned to me** is enabled initially; turn it off when you need a wider permitted view.
2. Filter by **Status**, **Type**, **Request ID** or **Service ID**. Use **Historic** to inspect completed work.
3. Open the linked request to read its submitted values and dependencies before acting.
4. Select **Start** on an eligible pending manual task. After completing the work, select **Complete** and add **Completion notes (optional)**.
5. Refresh and confirm the recorded status. Check whether a dependent task has become ready.

Manual work requires request management access in the organization. Automation requires execution access. A running automation task shows **Running**; its result comes back through the integration. Approval tasks are decided by their designated recipients.

Bulk start, complete and retry controls apply to explicitly selected tasks. Review the selection and each task's state before using them. For automation failures, follow [the run investigation guide](/docs/automation/run-and-troubleshoot/).

## Add an update or record time

On an incident, request or change, open **Timeline** and choose **Add Note**.

1. Enter **Hours** when recording effort. Leave it at zero for an informational note.
2. Write the observation, action or outcome someone picking up the ticket will need.
3. Choose **Internal note** for staff-only information. Leave it unselected for a customer-facing update.
4. Select **Submit Note** and confirm the new timeline entry.

Internal notes are excluded from the public ticket timeline and don't send a customer email. Customer-facing worklogs may queue email to the ticket's recipients. The saved note and the delivery result are recorded separately; a pending or failed delivery doesn't mean the note was lost.

## Check a handover

Before leaving a ticket, confirm its assignee and status, the next task, any waiting approval, and the latest customer-facing update. Record enough detail to continue the work without repeating investigation.

If a note was saved but its email is delayed, inspect the timeline's delivery status and ask an administrator to check **Pending Emails**. See [email troubleshooting](/docs/email/troubleshooting/) before sending the same content again.

[Task dashboard](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Tasks/TaskDashboard.razor) · [Worklog dialog](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Shared/AddWorklogDialog.razor) · [Worklog delivery](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Application/WorkLogs/CreateWorkLogCommand.cs)
