---
title: Work with incidents
description: Submit, triage, assign and resolve an incident while keeping the requester conversation and related work together.
---

Use an incident to track a support problem from first contact to resolution. Requesters can use the public ticket form or a configured support mailbox; operators work from **Incidents** at `/incidents`.

## Submit a support problem

On the instance home page, select **Submit a New Ticket**, or open `/submit-ticket`. Complete **Contact Info**, **Ticket Details**, optional attachments and **Review & Submit**. Enter the displayed CAPTCHA and choose **Submit Ticket**. Keep the ticket reference from the result.

To view a ticket through the public portal, open the secure link in its email. The link carries the access token; a tracking ID and email address alone aren't sufficient. Continue an email conversation by replying to the existing thread and keeping its reference.

## Triage the queue

1. Open `/incidents`. Search by ticket text or use filters for customer, requester (**For**), assignee, state and priority.
2. Select **Unassigned** to find work without an owner. **Active** excludes completed tickets; use **Historic** or **All** to find resolved work.
3. Open the incident and read **Messages** and **Timeline**. Check the requester, organization, existing replies and attachments before assigning it.
4. Set **Status**, **Priority**, technician and categories as needed, then select **Save Changes**. **Revert** discards unsaved detail edits.

When creating an incident on someone's behalf, choose **Create** from the list. Supply a clear title and description, select the organization and customer, and optionally assign a technician. Available choices follow your access in that organization.

## Keep the conversation useful

Use **Timeline → Add Note** to record an update or time spent. Select **Internal note** for staff-only context. A customer-facing worklog can queue an email; check its recorded delivery result instead of assuming the note's successful save means the email arrived.

Use **Attachments** for relevant files and **Listeners** to review the people attached to the conversation. Detailed note and task handling is covered in [tasks and worklogs](/docs/guides/tasks-and-worklogs/).

## Resolve or link the incident

Record the outcome and select **Resolved** when the work is finished. Verify it under the historic view if it disappears from the active queue.

For duplicate or related incidents, choose **Close / Link**. Select **Duplicate of** or **Related to**, find the target incident and add a useful note. A duplicate link closes the source incident; for a related link, review **Close source incident** before choosing **Link**. The **Relations** tab keeps those links accessible.

If a field or action is unavailable, check your [role and organization access](/docs/identity/users-and-roles/). If an email reply is missing, start with [email diagnostics](/docs/email/troubleshooting/).

[Incident interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Incidents/IncidentDetail.razor) · [Public submission](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/SubmitTicket.razor) · [Secure ticket viewing](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/ViewTicket.razor)
