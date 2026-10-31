---
previousPath: cms/features/polling.md
subtitle: Load content after the page renders, or refresh it automatically on a timer.
---
# Polling

The `data-auto-submit` attribute sends an AJAX request automatically, either as soon as the page loads or after a delay. Use it to defer an expensive lookup until the page has loaded, or to refresh content on a timer. Use it sparingly, since automatic requests add to server load at scale.

The following handler defined on a page loads some results. Assume it is an expensive lookup that should run after the page has finished loading.

```php
public function onFetchResults()
{
    $this['results'] = [1, 2, 3];
}
```

Include an AJAX partial called **posts.htm** somewhere on the page with the [AJAX Partial Twig Tag](../../handbook/twig-tags/ajax-partial.md), which lets the partial update itself.

```twig
{% ajaxPartial 'posts' %}
```

The partial dumps the `results` variable when it exists. Otherwise, it displays a loading message with a `data-auto-submit` element that loads the results in a second request.

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

## Refreshing Content on a Timer

To repeat a request, set `data-auto-submit` to a delay in milliseconds. For example, a partial rendered with `{% ajaxPartial %}` that contains the following markup.

```twig
<div>
    {% set remaining = carbon('now').diff(carbon('2030-01-01')) %}

    <h2>
        Launch in...
        {{ remaining.days }} days,
        {{ remaining.h }} hours,
        {{ remaining.i }} minutes,
        {{ remaining.s }} seconds
    </h2>
</div>

<div
    data-request="onAjax"
    data-request-update="{ _self: true }"
    data-auto-submit="2000"></div>
```

The partial displays a countdown timer and includes a `div` element that updates the partial. Each update contains the element again, so the request repeats every 2 seconds.

### Stopping the Timer

To stop polling, leave the element out of the next update. The following stops polling once the `launchDone` variable is true.

```twig
{% if not launchDone %}
    <div
        data-request="onAjax"
        data-request-update="{ _self: true }"
        data-auto-submit="2000"></div>
{% endif %}
```

## Polling at a Fixed Interval

The [`data-request-poll` attribute](./attributes-api.md) sends a request at a fixed interval, set in milliseconds or with a unit such as `5s`. It only sends requests while the browser window is active, using the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API). The first request is sent after the first interval, not when the page loads.

```twig
<div
    data-request="onAjax"
    data-request-update="{ _self: true }"
    data-request-poll="5s"></div>
```

## Lazy Loading Partials

The `{% ajaxPartial lazy %}` Twig tag uses `data-auto-submit` to lazy load partials. When the page first renders, the tag includes the markup that loads the partial contents with a second request.

```twig
{% ajaxPartial 'posts' lazy %}
```

View the [AJAX Partial Twig Tag](../../handbook/twig-tags/ajax-partial.md) to learn more.

#### See Also

::: also
* [AJAX Partial Twig Tag](../../handbook/twig-tags/ajax-partial.md)
* [Updating Partials](./update-partials.md)
:::
