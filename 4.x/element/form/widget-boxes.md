---
subtitle: Form Widget
shortname: Boxes
---
# Boxes Field

`boxes` - renders a box editor for building visual pages and works like a frontend page builder.

::: tip
This field is introduced after installing the [Boxes plugin](https://octobercms.com/plugin/offline-boxes) on the October CMS marketplace. Once licensed, you may install it with the following command.

```bash
php artisan plugin:install OFFLINE.Boxes
```
:::

To display the Boxes Editor in a Tailor backend form, define a form field like this:

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
```
```twig
{{ yourSectionVar.boxes_content.render|raw }}
```
:::

#### See Also

::: also
* [Boxes Plugin Page](https://octobercms.com/plugin/offline-boxes)
:::
