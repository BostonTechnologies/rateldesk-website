---
title: Keep an asset register
description: Create and maintain the asset records available to instance administrators.
---

Use the **Assets** page to keep basic identifying details for equipment your support team refers to. In this release, the asset screens are available to instance administrators.

## Create a record

1. Open `/assets` and select **Create**.
2. Enter a recognizable **Name**. Add **Type**, **Manufacturer**, **Model** and **Serial Number** where available.
3. Use **Notes** for information someone handling a support case needs, such as the equipment's location or an external asset-register reference.
4. Select **Create** and confirm that the record appears in the list.

Choose a consistent naming approach. For example, “Reception printer” is easy to recognize, while the serial-number field distinguishes it from a replacement device later.

## Update the record

Select **View** beside the asset, correct the relevant fields and choose **Save Changes**. Reopen it to verify the saved details. **Revert** restores the previously loaded values before saving.

Keep notes focused on the asset and its support context. Store credentials in the appropriate secret system rather than placing them in free-text equipment notes.

## Use the right source for live information

The RatelDesk asset screen provides a maintained record with descriptive fields. For current device inventory, service state or telemetry from managed systems, use [NetRatel inventory](https://netratel.hello43031.chatgpt.site/docs/guides/inventory/) and include the relevant reference in your support work.

If you can't open Assets, check that you're using an instance-administrator account. The page's current access requirement is broader than a tenant technician's ordinary ticket role.

[Asset list](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Assets/AssetList.razor) · [Create fields](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Assets/CreateAssetDialog.razor) · [Asset editor](https://github.com/BostonTechnologies/rateldesk/blob/487052fab83d8d81cb41ae5b073fd75ab61e42ae/src/HelpDesk.NewWeb/Components/Pages/Assets/AssetDetail.razor)
