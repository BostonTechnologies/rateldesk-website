---
title: Submit and follow a service request
description: Find a self-service form, submit the required information, and follow approvals and tasks through completion.
---

Use **Self Service** to request an available service with the information its workflow needs. Each form can start manual work, approvals or NetRatel automation, while **My Requests** keeps the progress visible to the requester.

You need a signed-in account with self-service access in the relevant organization. The catalog shows forms permitted for your organization and release audience.

## Submit a request

1. Open `/self-service`. Search **Search services and requests**, or open a service folder to find the right request card.
2. Select the request and read its description. Complete its required fields. A searchable field may require a selection from the supplied dataset rather than arbitrary text.
3. Add an **Additional note (optional)** when the standard fields need context.
4. If submitting for someone else, use **Submit on behalf of → Select** and choose an available person. Leave it unchanged to submit as yourself.
5. Choose **Submit**. When **Request submitted** appears, keep the **Tracking ID**.

The submitted values are validated against the form and its automation mappings. If validation fails, correct the reported field instead of opening a second copy of the request.

## Follow progress

Open **My Requests** at `/self-service/my-requests` and search by tracking ID or title. Open the record to see **Submitted Info**, request status, task status and any pending approvals.

A submitted request may wait for a person or a dependency before work begins. An approval task names its designated approver and due time. Approvers use their approval link to approve or reject; ordinary request editing doesn't substitute for the designated decision.

Forms labelled **In Testing** are available to administrators and permitted test users. Most requesters see production forms. If an expected form is missing, ask the service owner to check its organization audience and release status.

## Work the request as an operator

Open `/requests` to find the request. Its **Activity** area holds the conversation; **Tasks** shows the actual work, and **Workflow** shows related events. Use the separate `/tasks` view to work across requests.

Start and complete manual tasks through the available controls, recording useful completion notes. Automation execution requires Request Executor access in the organization. Follow [automation run diagnostics](/docs/automation/run-and-troubleshoot/) for a blocked or failed job.

Operators can also use **Create** in the request list for a manually entered request. A configured self-service form is the path for collecting its predefined inputs and generating its workflow.

Administrators can [build and release a form](/docs/automation/self-service-forms/) when a recurring request needs a repeatable process.

[Requester form](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/SelfService/SelfServiceRequestForm.razor) · [My Requests](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/SelfService/MyRequestDetail.razor) · [Submission validation](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.API/Endpoints/Requests/SelfServiceRequestEndpoints.cs)
