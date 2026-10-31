---
previousPath: cms/multisite/localization.md
subtitle: Translate the text in your theme templates using JSON language files.
---
# Theme Localization

Themes translate their text with JSON language files in the theme's **lang** directory. The keys are registered automatically, and you can use them in theme templates or as backend form labels, similar to [plugin localization](../../backend/localization/backend.md).

```json
{
    "I love programming.": "j'adore programmer"
}
```

```twig
<!-- j'adore programmer -->
{{ __('I love programming.') }}
```

::: aside
The active language comes from the active site's locale. See [Setting Up Multisite](./multisite.md) to configure sites and languages.
:::

## Creating Language Files

Place one JSON file per language in the theme's **lang** directory.

::: dir
├── themes
|   └── website
|       └── `lang`  _← Localization Directory_
|           ├── en.json  _← Localization File_
|           └── fr.json  _← Localization File_
:::

Each file uses the default translation of a string as the key. For example, to translate your theme into French, create a **lang/fr.json** file.

```json
{
    "I love programming.": "j'adore programmer"
}
```

You can also use code-based keys, by writing the complete language key in the JSON file, for example `theme.options.website_name`.

```json
{
    "theme.options.website_name": "October CMS"
}
```

## Translating Strings in Templates

Use the `__()` Twig function to output a translated string.

```twig
<!-- j'adore programmer -->
{{ __('I love programming.') }}

<!-- October CMS -->
{{ __('theme.options.website_name') }}
```

The filter syntax is available as an alternative.

```twig
{{ 'I love programming.'|_ }}
```

See the [`trans()` function](../../handbook/twig-functions/trans.md) for parameters, pluralization and the other filters.

## Scanning for Messages

Instead of adding every key by hand, you can scan the theme templates for translatable strings. The scanner inspects the markup of every layout, page and partial in the theme, and collects the string literals passed to the translation functions (`__()`, `trans()`, `trans_choice()`) and filters (`|trans`, `|_`, `|__`, `|trans_choice`).

Manage language files in the CMS Editor area of the admin panel, in the **Languages** section of the navigator. When editing a language file, click the **Scan for Messages** button in the toolbar. Newly found messages are added to the file as keys with empty translations, and existing values are left untouched.

The `theme:scan` artisan command does the same, writing new keys to the language file of the primary site locale.

```bash
php artisan theme:scan mytheme
```

Use the `--locale` option to target a different language file, or the `--dry-run` option to list the found messages without writing anything.

```bash
php artisan theme:scan mytheme --locale=fr --dry-run
```

#### See Also

::: also
* [Setting Up Multisite](./multisite.md)
* [Tailor Localization](./tailor.md)
* [Translating Content Blocks](../content.md#translating-content-blocks)
* [Translating Theme Settings](../customization.md#translating-theme-settings)
* [trans() Twig Function](../../handbook/twig-functions/trans.md)
* [Backend Localization](../../backend/localization/backend.md)
:::
