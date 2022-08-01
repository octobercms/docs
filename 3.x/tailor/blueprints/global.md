---
subtitle: Easily define settings and globally available content.
---
# Global

Globals are used to define globally available content for your website. The field values are often used in [CMS layouts](../../cms/themes/layouts.md) and contain settings, such as social networking links.

The following defines a **Footer Config** global with a Facebook Link (`facebook_link`) text field.

```yaml
handle: Site\Footer
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
**fields** | form fields belonging to the group, see [backend form fields](../../element/form-fields.md).
