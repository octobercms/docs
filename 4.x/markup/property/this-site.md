---
subtitle: Twig Property
---
# this.site

You can access the active site via `this.site` and it returns the object `System\Models\SiteDefinition` [current site definition](../../cms/resources/multisite.md).

## Retrieving Data From the Site

```twig
{{ this.site.id }}
{{ this.site.name }}
{{ this.site.code }}
{{ this.site.locale }}
{{ this.site.timezone }}
{{ this.site.theme }}
```

## Checking the Active Site

```twig
{% if this.site.code === 'english' %}
    <h1>Only display for English</h1>
{% endif %}
```

## Getting the Current Selected Locale

The `locale` attribute will return the current locale if it is specified, or return an empty value when none is specified.

```twig
<html lang="{{ this.site.locale }}">
```

Use the `hard_locale` attribute to always return a locale value, which uses the default locale when none is specified.

```twig
<html lang="{{ this.site.hard_locale }}">
```
