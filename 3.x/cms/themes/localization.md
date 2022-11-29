---
subtitle: Learn how to translate messages inside CMS themes.
---
# Localization

::: aside
View the [Multisite article](../resources/multisite.md) to learn how to set the active language for your website.
:::

Themes can provide localization keys through files placed in the **lang** subdirectory of the theme's directory. These localization keys are registered automatically and can be used inside the theme contents or as backend form labels similar to [plugin localization](../../extend/system/localization.md).

### Localization File Structure

Below is an example of the theme's **lang** directory.

::: dir
├── themes
|   └── website
|       └── `lang`  _← Localization Directory_
|           ├── en.json  _← Localization File_
|           └── fr.json  _← Localization File_
:::

The localization file is a JSON file where strings use the "default" translation of the string as the key. For example, if your application has a French translation, you should create a `lang/fr.json` file.

```json
{
    "I love programming.": "j'adore programmer"
}
```

You are also able to define code-based keys by using the complete language key in the JSON file, for example, `theme.options.website_name` for the **acme** theme can be used.

```json
{
    "theme.options.website_name": "October CMS"
}
```

Language strings can be accessed in your theme files using the `trans` Twig filter.

::: tip
View [the markup guide](../../markup/filter/trans.md) to learn more about translation in Twig.
```twig
<!-- j'adore programmer -->
{{ 'I love programming.'|trans }}

<!-- October CMS -->
{{ 'theme.options.website_name'|trans }}
```
:::

#### See Also

::: also
* [Multisite](../resources/multisite.md)
* [Plugin Localization](../../extend/system/localization.md)
:::
