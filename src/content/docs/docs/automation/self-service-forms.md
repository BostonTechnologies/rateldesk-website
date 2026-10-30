---
title: Build a self-service request
description: Design an organization-scoped form with manual, approval and automation tasks, then test it before release.
---

Give requesters a short form that starts a repeatable workflow. A request can combine manual work, designated approvals and NetRatel automation. Instance administrators build it in **Service Explorer** at `/admin/requests/services`.

Start with one clear outcome, such as requesting software access. Decide which information the requester must provide and which person or job completes each step.

## Create the service and form

1. Choose **New Service**, name the service folder and open it. **New Request** becomes available inside a service.
2. Create a request form with a specific **Form Title** and a short **Description** explaining its outcome.
3. Keep **Self-Service Release Status** at **In Testing** while building it. Select its **Primary Organization**; automation uses that organization's saved system connection.
4. Use **Add Field** for each required input. Set a readable label, type and **Required** switch. Available types include **Text**, **Text Area**, **Number**, **Yes/No**, **Predefined** and **HelpdeskData**.

Use **Predefined** for a controlled list and edit its options. **HelpdeskData** uses an available dataset and presents a searchable selection to the requester. Keep descriptions and labels specific enough that requesters can answer without knowing your internal job parameter names.

## Add the work

Use **Add Task** in **Task Editor**, give each task a meaningful name and select its **Task Type**:

| Type | Configure |
| --- | --- |
| **Manual** | The work instructions and an optional **Default Assignee**. |
| **Get Approval** | Designated approvers through **Browse** and the **Approval time allowed**. |
| **Automation** | A saved connection, NetRatel target and [field mappings](/docs/automation/job-bindings/). |

Set **Auto Start** for steps that should begin when their workflow conditions permit. Under **Advanced Workflow Settings**, use **Depends On** when a step must wait for another. For example, make the automation task depend on the approval task. A visual task order is not a substitute for an explicit dependency.

## Test and release

Save the form and check for binding or input-sync errors. In Service Explorer, use **Manage org access** on the relevant service and request cards to review their audience. The primary organization and allowed-organization settings both constrain ordinary access.

Administrators and users marked **Allow access to in-testing self-service requests** can see testing forms within their permitted context. Configure test users in **Team** at `/admin/users`.

Open `/self-service` as a test requester, submit realistic values and follow [the request and its tasks](/docs/guides/service-requests/). Verify approval delivery, parameters, execution and completion. When the workflow behaves as intended, change the form's release status to **Production** and save. Recheck the catalog as an ordinary requester.

[Form builder](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Requests/RequestFormBuilder.razor) · [Audience rules](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.API/Services/SelfServiceAudienceService.cs)
