---
title: Plan and complete a change
description: Record a change plan, obtain the required review and track implementation through its supported lifecycle.
---

Use **Changes** at `/changes` to record planned work, its implementation window and approval progress. Change writing and change approval are separate permissions in the selected organization.

## Describe the work

1. Select **Create**. Enter **Title**, **Description**, **Priority** and **Organization**.
2. Choose **Change Type**: **Standard**, **Normal** or **Emergency**.
3. Select **Requested for**, the **Implementor** and any designated **Approvers**. These choices follow the relevant organization and support context.
4. Set the **Implementation Window** and complete the change template.
5. Create the change and inspect the lifecycle status returned by RatelDesk.

The template asks for the scope, affected systems or services, implementation and validation steps, and rollback information. Additional fields depend on change type. For a standard change, record the standing approval and SOP/runbook reference where applicable. For a normal change, explain business justification, impact and risk.

Use concrete checks: “Confirm the service starts and a test user can sign in” is more useful than “Validate success.” Include a rollback action that the implementor can follow during the window.

## Move through the lifecycle

Incomplete plans remain **Draft**. A complete plan can enter **Pending Approval** or **Approved For Implementation**, depending on selected approvers and the creator's approval authority. Check the actual status instead of assuming every new record starts in Draft.

In the change list, open the status chip to see the actions available to you:

| Current stage | Available progression |
| --- | --- |
| Draft | **Submit** after completing the plan. |
| Pending Approval | An authorized approval, or a return to **Draft** for revision. |
| Approved For Implementation | **Implementation In Progress**, or a recorded implementation outcome. |
| Implementation In Progress | **Implemented - Success** or **Implemented - Backed Out**. |

The change detail page shows designated approval records as **Pending** or **Reviewed**. Signed approval links belong to their designated recipient. Tenant-wide Change Approver permission separately authorizes the authenticated approval action.

## Record the result

Read the approved plan before implementation. Add worklogs and evidence to the ticket timeline, record the outcome through the lifecycle action and confirm the final status.

The ordinary ticket state and plan fields are locked outside Draft. Use the lifecycle controls to progress implementation. If a pending plan needs editing, return it to Draft through the offered action first.

If an action is absent, check the current lifecycle and your [organization-scoped role](/docs/identity/users-and-roles/). Save or revert outstanding detail edits before attempting approval.

[Change editor](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Changes/CreateChangeDialog.razor) · [Lifecycle controls](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Shared/ChangeLifecycleStatePicker.razor) · [Lifecycle rules](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.API/Endpoints/Changes/ChangeEndpoints.cs)
