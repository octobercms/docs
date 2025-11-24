---
subtitle: Used for lazy loading and repeating updates.
---
# Polling

Polling is a technique used to defer or repeat an AJAX update by including the `data-auto-submit` attribute on a request element. This feature should be used sparingly since it can increase server load at scale, and to mitigate this, the attribute only triggers when the user's browser window is active.

## Lazy Loading Requests

Polling requests are commonly used in conjunction with the [AJAX Partial Twig Tag](../../markup/tag/ajax-partial.md) since it allows you to self-update partial contents. Take the following AJAX handler defined on a page that loads some results. Assuming it is an expensive lookup, we may want to request it after the page has finished loading.

```php
public function onFetchResults()
{
    $this['results'] = [1, 2, 3];
}
```

The next step is to include an AJAX-enabled partial called **posts.htm** somewhere on the page.

```twig
{% ajaxPartial 'posts' %}
```

Inside the partial, the contents will dump the output if the `results` variable exists. Otherwise, it displays a loading message with a `data-auto-submit` request to load the results as a secondary request.

```twig
{% if results %}
    <h3>Found results</h3>
    {{ d(results) }}
{% else %}
    <h3>Loading the results...</h3>
    <div
        data-request="onFetchResults"
        data-request-update="{ _self: true }"
        data-auto-submit>
    </div>
{% endif %}
```

## Polling Requests

For repeated requests to update content, you can set the `data-auto-submit` to a value (in milliseconds) to perform an automatic request after a delay. For example, a partial rendered with `{% ajaxPartial %}` and contains the following markup.

```twig
<div>
    {% set launchDate = carbon('2025-01-01') %}
    {% set days = launchDate.diffInDays %}
    {% set hours = launchDate.subDays(days).diffInHours %}
    {% set minutes = launchDate.subHours(hours).diffInMinutes %}
    {% set seconds = launchDate.subMinutes(minutes).diffInSeconds %}

    <h2>
        Launch in...
        {{ days }} days,
        {{ hours }} hours,
        {{ minutes }} minutes,
        {{ seconds }} seconds
    </h2>
</div>

<div
    data-request="onAjax"
    data-request-update="{ _self: true }"
    data-auto-submit="2000"></div>
```

This partial displays a countdown timer and includes a "div" element to automatically update itself. The resulting update also contains the element, so the request is repeated continuously every 2 seconds.

The polling can be stopped by not including the element in subsequent requests, for example the following would stop polling if the `launchDone` variable is set to true.

```twig
{% if not launchDone %}
    <div
        data-request="onAjax"
        data-request-update="{ _self: true }"
        data-auto-submit="2000"></div>
{% endif %}
```

## Lazy Loading Partials

The `data-auto-submit` tag is used by the `{% ajaxPartial lazy %}` Twig tag to lazy load partials. The markup is included automatically when the page first renders to dynamically load the partial contents.

```twig
{% ajaxPartial 'posts' lazy %}
```

View the [AJAX Partial Twig Tag](../../markup/tag/ajax-partial.md) to learn more.

#### See Also

::: also
* [AJAX Partial Twig Tag](../../markup/tag/ajax-partial.md)
:::
