---
subtitle: Translate page properties for each site definition.
---
# Translatable

The `translatable` component stores translated page properties for each [site definition](../multisite/multisite.md), including the page URL, title, description and meta fields. Adding the component to a page is how the page opts in to per-site translations.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**locales** | A collection of translated values, keyed by locale.

Each entry in the `locales` collection supports the following fields. Any field left out falls back to the value defined by the page itself.

Field | Description
-------- | -------------
**url** | The page URL used when the matching site is active.
**title** | The translated page title.
**description** | The translated page description.
**meta_title** | The translated meta title.
**meta_description** | The translated meta description.

## Basic Usage

The following example defines a contact page with French and Russian translations. The entries are keyed by the locale of the matching site definition.

```ini
url = "/contact"
title = "Contact"

[translatable]
locales[fr][url] = "/contactez"
locales[fr][title] = "Contactez"
locales[ru][url] = "/контакт"
locales[ru][title] = "Контакт"
```

When editing the page in the backend, the component displays a managed list where each entry contains the translated fields for a single locale. Entries only need to be added for the sites that require translation.

## Matching Sites to Locale Keys

When values are resolved for the active site, the keys in the `locales` collection are checked against the site's locale in the following order, where the first match wins.

1. The exact site locale, for example `en-AU`.
2. The base language of the locale, for example `en`.

This means a regional locale automatically falls back to its base language when no exact entry exists.

## Locale Fallback Logic

Values are resolved for each field independently, so a regional locale can override a single field and inherit the rest from the base language entry. In the following example, two site definitions use the `en-AU` and `en-GB` locales. Both sites use the shared English title, and the Australian site only overrides the URL.

```ini
url = "/contact"
title = "Contact"

[translatable]
locales[en][title] = "Contact Us"
locales[en-AU][url] = "/contact-au"
```

## URL Routing

When a site with a matching locale is active, the translated URL replaces the page URL in the routing table, including any route parameters defined in the pattern.

- `/contactez` displays the page on the French site and `/contact` responds with a redirect to `/contactez`.
- `/contact` displays the page on every other site and `/contactez` is not found.

The redirect status code is set with the `multisite.translate.cms_page_url_redirect` configuration value (default `301`), where `false` disables the redirect and responds with a 404 instead.

Links generated for the page follow the same rules, so the `|page` filter, menus and sitemaps produce the translated URL automatically. The [Site Picker component](./sitepicker.md) and `hreflang` links resolve the translated URL for each alternative site.

::: tip
When using the route cache created by the `theme:cache` command, run the command again after adding site definitions or changing translated URLs so the cached route maps are rebuilt.
:::

## Translated Properties

The remaining fields are applied to the page automatically when it renders, so `{{ this.page.title }}` returns the translated title when the French site is active, along with any other translated value found in the matching locale entry. The backend always displays the original values for editing.

## Accessing Values in Twig

Any custom field can be included in a locale entry and resolved manually with the `siteProperty` method, which matches the active site using the same locale key order.

::: cmstemplate
```ini
[translatable]
locales[fr][banner] = "Bienvenue"
```
```twig
<p>
    {{ translatable.siteProperty('banner')|default('Welcome') }}
</p>
```
:::

The `siteProperties` method returns every translated value for the active site as an array, merged across the matching locale keys.

```twig
{% set translated = translatable.siteProperties %}
```

#### See Also

::: also
* [Multisite](../multisite/multisite.md)
* [Site Picker](./sitepicker.md)
:::
