---
title: Route and thread incoming mail
description: Understand how mail finds its organization and ticket, and manage the supported forwarded-support rule.
---

RatelDesk checks the mailbox assignment, requester and conversation before creating or updating a ticket. Use incoming receipts to resolve conflicting information rather than repeatedly submitting the same message.

## Match the organization

A dedicated mailbox belongs to its selected organization. On a global mailbox, an existing customer contact and the sender's domain help resolve the organization. Ticket references also contribute context.

When an ordinary new message has no matching organization or contact, intake can create an organization from the sender's domain and a customer contact. Existing customers keep their organization. Conflicting ownership, blocked requesters and references to another organization's ticket are held for review.

Keep **DNS Name** and customer email addresses accurate in [organization and contact management](/docs/guides/organizations-and-access/). An organization with a dedicated assignment must receive mail through that source. Global intake holds it with `TenantUsesDedicatedMailbox`, even if the dedicated mailbox is paused.

## Keep replies on the same ticket

RatelDesk recognizes incident/request tracking references and supported `In-Reply-To` and `References` message headers. Ask requesters to reply to the existing conversation and keep its tracking reference.

A reference alone doesn't authorize a reply. RatelDesk checks the requester, recorded CC recipients or an authorized support sender. Multiple ticket matches or conflicting organizations require review.

To test threading, send a new message, wait for the incident, send a ticket reply, then reply from the requester's mailbox. Confirm that the latest reply appears in the original ticket and the incoming receipt points to it.

## Enable forwarded-support handling

The supplied forwarded-support rule can create an incident for the original requester when an authorized support user forwards a customer email. It starts disabled.

1. Open **Email Rules** at `/admin/email-rules` as an instance administrator.
2. Use **View details** to review the supplied rule's conditions and action. If it should apply to one organization, **Clone rule** and save a disabled copy for that organization.
3. Select **Source mailbox** or **All eligible mailboxes**, then enable the intended rule.
4. Forward a controlled test message from an authorized support account. Check the **Audit** tab and resulting incident's requester and organization.

Tenant-specific rules run before global fallback rules. Within a tier, priority determines processing order. Parsing a forwarded sender doesn't automatically authorize substitution: ambiguous parsing, an unauthorized forwarder or the wrong mailbox remains a review case.

After correcting a routing problem, open **Incoming receipts** for that mailbox and use **Retry** on an eligible held receipt. Current routing and authorization checks run again.

[Routing implementation](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/Helpdesk.Infrastructure/Email/InboundTenantRouter.cs) · [Rule scope and source binding](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/docs/integrations/mailbox-ingestion.md#rule-scope-and-source-binding)
