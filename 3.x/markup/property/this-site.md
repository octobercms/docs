---
subtitle: Twig Property
---
# this.site

You can access the active site via `this.site` and it returns the object `System\Models\SiteDefinition` [current site definition](../../cms/resources/multisite.md).

## Retrieving data from the site

```twig
{{ this.site.id }}
{{ this.site.name }}
{{ this.site.code }}
{{ this.site.locale }}
{{ this.site.timezone }}
{{ this.site.theme }}
```

## Checking the active site

```twig
{% if this.site.code === 'english' %}
    <h1>Only display for English</h1>
{% endif %}
```
