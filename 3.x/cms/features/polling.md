---
subtitle: Used for lazy loading and repeating updates.
---
# Polling

Polling is a technique used to defer or repeat an AJAX update by including the `data-auto-submit` attribute on a request element. This feature should be used sparingly since it can increase server load at scale, and to mitigate this, the attribute only triggers when the user's browser window is active.

## Lazy Loading Requests

Lazy loading defers the display of content until after the page has loaded. This is useful for heavy operations that may slow down the initial page load. Add the `lazy` attribute to the `{% ajaxPartial %}` tag.

In the following example, the **posts** partial will be updated after the page has finished loading.

```twig
{% ajaxPartial 'posts' lazy %}
```

This outputs a partial with initial content that includes a `data-auto-submit` data attribute, which performs the AJAX request to update itself after the page loads. The attribute is not included in subsequent requests.

```html
<div
    data-request="onAjax"
    data-request-update="_self: true"
    data-auto-submit></div>
```

When using the `lazy body` attributes, you can specify the initial content to display while the content is loading. Followed by the `{% endpartial %}` tag.

```twig
{% ajaxPartial 'posts' lazy body %}
    <p>Loading posts...</p>
{% endpartial %}
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
    data-request-update="_self: true"
    data-auto-submit="2000"></div>
```

This partial displays a countdown timer and includes a "div" element to automatically update itself. The resulting update also contains the element, so the request is repeated continuously every 2 seconds.

The polling can be stopped by not including the element in subsequent requests, for example the following would stop polling if the `launchDone` variable is set to true.

```twig
{% if not launchDone %}
    <div
        data-request="onAjax"
        data-request-update="_self: true"
        data-auto-submit="2000"></div>
{% endif %}
```
