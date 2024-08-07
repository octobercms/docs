---
subtitle: Form Widget
shortname: Boxes
---
# Boxes Field

`boxes` - renders a box editor for building visual pages and works like a frontend page builder.

This feature is introduced by installing the premium [Boxes](https://octobercms.com/plugin/offline-boxes) plugin. Once licensed, you may install it with the following command.

```bash
php artisan plugin:install OFFLINE.Boxes
```

::: tip
Learn more about the Boxes plugin at [the product page](https://boxes.offline.ch/).
:::

To display the Editor in a Tailor backend form, define a form field like this:

```yaml
fields:
    boxes_content:
        label: Boxes Content
        span: adaptive  # This makes sure the Boxes Editor looks good in Tailor.
        type: boxes     # This loads the Boxes Editor.
```

In your frontend, you can then use the render method on your field to get the rendered HTML content:

::: cmstemplate
```ini
[section yourSectionVar]
handle = "Your\Handle"
entrySlug = "{{ :slug }}"
```
```twig
{{ yourSectionVar.boxes_content.render|raw }}
```
:::

#### See Also

::: also
* [Boxes Plugin Documentation](https://docs.boxes.offline.ch/use-cases/usage-in-plugins.html)
:::
