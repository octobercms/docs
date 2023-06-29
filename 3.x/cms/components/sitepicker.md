---
subtitle: Tools for working with multiple site definitions
---
# Site Picker

The `sitePicker` component provides tools for working with [Multisite configuration](../resources/multisite.md) for your website. The best place to include this is in your page or layout template.

## Basic Usage

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

The following is an example of displaying a dropdown that switches between sites. It is used in conjunction with the `this.site` [Twig property](../../markup/property/this-site.md).

```twig
<select class="form-control" onchange="window.location.assign(this.value)">
    {% for site in sitePicker.sites %}
        <option value="{{ site.url }}" {{ this.site.code == site.code ? 'selected' }}>
            {{ site.name }}
        </option>
    {% endfor %}
</select>
```

Another example is generating alternative page links using meta tags

```twig
{% for site in sitePicker.sites %}
    <link rel="alternate" hreflang="{{ site.locale }}" href="{{ site.url }}" />
{% endfor %}
```

## Loading Sites for a Different Page

By default, the `sites` property will return sites configured for the current page and the `url` will resolve to the current page. The `pageSites()` function can be used to locate sites for a different page, where the first argument is the CMS page name.

In the example below, each site will have a `url` set to the CMS page found in **pages/blog/index.htm**. If the page is not found, then the result will be an empty array.

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set otherSites = sitePicker.pageSites('blog/index') %}
```
:::

#### See Also

::: also
* [Theme Localization](../resources/multisite.md)
:::
