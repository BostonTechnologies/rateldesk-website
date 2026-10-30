---
title: Organizations and contacts
description: Keep requester ownership, organization context and account access aligned across tickets, email and self-service.
---

Select the correct organization before creating a ticket, request form or system connection. That choice controls which customers, operators, mailboxes and automation targets belong to the work.

Three records serve different purposes:

| Record | Purpose |
| --- | --- |
| Organization | The tenant that owns tickets and related configuration. |
| Customer/contact | The person's name, email and organization used for requester and conversation context. |
| Application account | The identity that signs in and receives roles for specific organizations. |

A customer record can exist before the person has a login. Creating a contact doesn't by itself grant an application role.

## Create an organization

An instance administrator opens **Organization Management** at `/admin/organizations` and selects **Create**. In **General**, enter **Name**, **DNS Name** and useful **Contact Info**, then review **Enable organization** and create it.

Use the organization's actual email domain for **DNS Name**, such as `example.com`. Global mailbox intake uses domain information when resolving a new requester. Review duplicate or conflicting organization records before bringing a shared support mailbox online.

Configure NetRatel automation through [System connections](/docs/automation/netratel-pairing/), selecting this organization and the real NetRatel tenant. The saved pairing is the current connection workflow.

## Maintain contacts

Open **Customer Management** at `/admin/customers` with the required administration access. Search by name or email before creating another record. Choose **Create**, enter **Name**, **Email** and **Organization**, and review **Enabled**.

On an existing customer, **Details** holds the contact information; **Access & roles** shows whether a login is linked. A linked login keeps its current organization relationship, so the ordinary organization selector is disabled. Use the explicit account/access workflow when access needs to change.

For local accounts, activation and lifecycle actions are managed through the organization member editor. Follow [users and roles](/docs/identity/users-and-roles/) for invitations and scoped assignments.

## Verify a person's context

Create or open a test ticket and confirm its organization and customer. Then check the user's permitted view separately. Tenant-wide reader/writer roles and access to one's own records have different scopes.

If a person is missing from a requester or assignee picker, check the selected organization, the person's enabled state and the relevant role. For a held incoming email, compare the sender's existing contact ownership with the receiving mailbox. Intake doesn't move an existing customer into a different organization to satisfy a message.

[Organization interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Organization/OrganizationManagement.razor) · [Contact access interface](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Admin/Customer/EditCustomerDialog.razor) · [Scoped access](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/security/rbac.md)
