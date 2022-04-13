# Globals

Globals are used to define globally available content for your website. The field values are often used in [CMS layouts](../cms/layouts) and contain settings, such as social networking links. The blueprints are located in the **globals** directory.

::: dir
├── app
|   └── blueprints
|       └── `globals`
|           └── theme-settings.yaml
:::

The following defines a **Footer Config** global with a Facebook Link (`facebook_link`) text field.

```yaml
name: Footer Config
handle: footerConfig
fields:
    facebook_link:
        label: Facebook Link
        type: text
```
