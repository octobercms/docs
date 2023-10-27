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

## Translating URL Parameters

By default, the `sitePicker` component isn't aware of model parameters in the URL, such as page slugs and identifiers. The [`cms.sitePicker.overrideParams` event](../../extend/services/event.md) is used to override the URL parameters to their translated versions. A good place to put this event is inside the `init` or the `onRun` method of a [CMS Component class](../../extend/cms-components.md).

For example, if the model implements the [`Multisite` trait](../../extend/database/traits.md), the `newOtherSiteQuery` method is used to locate the model for the proposed site and modify the URL parameters.

```php
$myModel = MyModel::find(1);
$otherModels = $myModel->newOtherSiteQuery()->get();

Event::listen('cms.sitePicker.overrideParams', function($page, $params, $currentSite, $proposedSite) use ($otherModels) {
    $otherModel = $otherModels->where('site_id', $proposedSite->id)->first();
    if ($otherModel) {
        $params['id'] = $otherModel->id;
        $params['slug'] = $otherModel->slug;
        $params['fullslug'] = $otherModel->fullslug;
    }
    return $params;
});
```

#### See Also

::: also
* [Multisite](../resources/multisite.md)
:::
