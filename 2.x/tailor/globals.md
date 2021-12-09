# Globals

Globals are used to define globally available content for your website. The field values are often used in [CMS layouts](../cms/layouts) and contain settings, such as social networking links. The blueprints are located in the **globals** directory.

::: dir
├── app
|   └── blueprints
|       └── `globals`
|           └── theme-settings.yaml
:::

Below is an example blueprint of a global:

```yaml
name: Footer Config
handle: footer_config
fields:
    # ...
```
