---
title: Follow an automation run
description: Verify a self-service request end to end and diagnose binding, execution and uncertain-submission problems.
---

Verify automation through an actual test request. A successful connection test proves access; a completed request proves that the form, job parameters, client and result path work together.

Keep the form **In Testing** until this check succeeds. Use a job and target suitable for the test.

## Submit and follow the work

1. Sign in as an authorized test requester and open `/self-service`. Select the request, complete its fields and choose **Submit**.
2. Record the displayed **Tracking ID**. The requester can follow submitted information and task status under **My Requests** at `/self-service/my-requests`.
3. As an operator, open the request at `/requests` and select **Tasks**. Check dependencies or approvals before starting an eligible task. An **Auto Start** task begins when the workflow permits it.
4. For a manually started automation task, select **Start**. The operator needs execution access in the request's organization; Request Writer alone doesn't grant it.
5. Watch the task's status and **External orchestration** status. Follow the correlated request/job run in NetRatel and check its inputs and output.
6. Confirm that the result returns to RatelDesk and the requester's task status updates. Check the final request state and any follow-on tasks.

The `/tasks` dashboard provides another view across requests. Filter by assignee, status, type or request ID, then open the request for its full context.

## A task won't start

| What you see | What to inspect |
| --- | --- |
| A dependency or approval is pending | Complete the preceding work or obtain the designated approval. |
| Binding disabled or **Broken** | Check the saved system connection, organization, target and latest synchronization error. |
| **Drifted** or **ImportPending** | Review the input differences in the form builder and finish the intended synchronization/import. |
| Missing or invalid inputs | Compare submitted fields, required values and explicit parameter mappings. |
| Start or retry unavailable | Check the task state and the operator's Request Executor permission. |

## Investigate a failed run

Open the request's **Workflow** tab. Filter **Event Group** to **Orchestrator** or **Tasks**, set the time range and search the correlation ID. The task's **Recovery** link opens related orchestration notifications when recovery context is available.

For an ordinary failed automation task, repair the cause and use **Retry** when offered. Review the existing NetRatel run first, especially when the job changes external systems.

`SubmitUncertainManualReconcile` means the submission outcome is uncertain. RatelDesk withholds the ordinary retry action. Compare the original request/execution identity with NetRatel and its notifications before deciding the next action. Creating another request can duplicate work that was already accepted.

Connection, approval and schema problems belong in the saved form or mapping. Avoid editing a request's tracking or correlation identifiers to make a failed run appear successful.

[Request task interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Requests/RequestDetail.razor) · [Task dashboard](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Tasks/TaskDashboard.razor) · [Execution contract](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/netratel-orchestrator.md)
