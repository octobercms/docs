---
previousPath: cms/tailor/blueprints.md#global
subtitle: Blueprint Type
shortname: Global
---
# Global Blueprint

Globals are used to define globally available content for your website. The field values are often used in [CMS layouts](../../themes/layouts.md) and contain settings, such as social networking links.

The following defines a **Footer Config** global with a Facebook Link (`facebook_link`) text field.

```yaml
handle: Site\Footer
type: global
name: Footer Config

fields:
    facebook_link:
        label: Facebook Link
        type: text
```

The following properties are supported by the global blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../form-fields.md).
**multisite** | enables multisite for this entry, supported values: `true`, `false`. Default: `false`
**formSize** | the settings form size, supported values: `tiny`, `small`, `medium`, `large`, `huge`, `giant`, `adaptive`. Default: `huge`.
**permissions** | customize the permission `code` and `label` registered for this blueprint (see [Custom Permissions](./entry.md#custom-permissions)).
