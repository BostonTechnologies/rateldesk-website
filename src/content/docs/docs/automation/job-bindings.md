---
title: Map a form to a NetRatel job
description: Select or create a tenant-scoped job target, map form fields to inputs, and review schema synchronization.
---

An automation binding connects one request-form task to a NetRatel job definition. The form collects values; the task mapping chooses which values become job inputs.

First [pair NetRatel](/docs/automation/netratel-pairing/) with **Run automation** enabled. Open the form in **Service Explorer** and select the mapped **Primary Organization**.

## Select the job

1. Add or select a task and set **Task Type** to **Automation**.
2. Choose its **Automation system connection**. Check the displayed peer and NetRatel tenant.
3. Select **Browse Library** and choose the intended target from that connection's catalog. Review its input parameters and expected runtime before using it.

To create a target, choose **Create External orchestration Target**. Enter **Job Name**, **Folder Path**, **Client Identity** and an optional description. Use the identity of a real, active client in the mapped tenant; the dialog's suggested identity is not an enrolled system.

A newly created NetRatel definition has no executable steps or input parameters. Open it in [NetRatel Jobs](https://netratel.hello43031.chatgpt.site/docs/guides/jobs/), configure and review both, then reopen the RatelDesk form to reload the catalog before mapping inputs.

## Map and save

Under **Payload Mapping**, select a **Helpdesk Field** and its destination **Job Param**, then use the add button. Existing parameter rows also let you select the source field directly. Repeat for every input the job needs.

For example, a requester-facing field labelled “Account email” can map to a job parameter named `accountEmail`. Keep the field's type and required status consistent with the job. Unmapped form fields aren't automatically passed to the job; a task without mappings sends an empty input object.

Check **Expected Runtime (minutes)** and **Grace Runtime (minutes)**, keep **Binding Enabled** selected and save. Saving the form also attempts input-schema synchronization for enabled bindings. Read the save result: the form can be saved while synchronization fails.

Form-to-job synchronization derives inputs from the explicit mappings. When it sends a nonempty input definition set, NetRatel replaces the target's parameter definitions. Review other uses of a shared job before changing those inputs.

## Review changes from NetRatel

1. Reopen the binding and select **Refresh**, then **Drift**.
2. Compare the **Helpdesk** and **External orchestration** values for each input.
3. When NetRatel's changes are the ones you want, choose **Mark Import**, then **Import**. Review the resulting form fields and mappings.
4. Confirm that the binding is **InSync**, then [test a request](/docs/automation/run-and-troubleshoot/).

If synchronization fails, repair connectivity or the selected target and save again. If the primary organization or connection changes, reselect and review the target; a target from another tenant cannot be reused implicitly.

[Binding editor](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Requests/RequestFormBuilder.razor) · [Schema synchronization](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Infrastructure/Orchestration/AutomationBindingSchemaSyncService.cs) · [NetRatel target creation](https://github.com/BostonTechnologies/netratel/blob/v0.1.2/src/NetRatel/NetRatel.API/Endpoints/Internal/InternalEndpoints.Authoring.cs)
