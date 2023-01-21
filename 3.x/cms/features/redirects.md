---
subtitle: Learn how to redirect to another page or URL.
---
# Redirects

In some cases you may wish to redirect the user to a new page after submitting a form, or any AJAX request.

```html
<form data-request="onSignup">
    <div>
        <label>Email</label>
        <input name="email" />
    </div>

    <button data-attach-loading>
        Sign Up
    </button>
</form>
```

Inside your [AJAX handler](../ajax/handlers.md), you may return a `Redirect` [response type](../../extend/services/response-view.md) where the `to` method accepts a relative or absolute URL (first argument).

```php
function onSignup()
{
    return Redirect::to('/signup-complete');
}
```

You may use the `refresh` method to refresh the current page. The use of [flash messages](./flash-messages.md) is also supported.

```php
function onSignup()
{
    Flash::success('Signup complete!');

    return Redirect::refresh();
}
```

## Redirecting to a CMS Page

The `Cms` facade and `redirect` method can be used to redirect to specific CMS page (first argument) and any optional route parameters (second argument).

```php
function onRedirect()
{
    return Cms::redirect('blog/post', ['slug' => 'foobar']);
}
```

You may use the `pageUrl` method to return the URL as a string instead.

```php
$postPage = Cms::pageUrl('blog/post', ['slug' => 'foobar']);
```

## Redirects in Twig

The [`redirect()` Twig function](../../markup/function/redirect.md) can be used to redirect the user from within the page markup.

```php
function onSignup()
{
    $this['success'] = true;
}
```

This function accepts a URL or a CMS page name.

```twig
{% if success %}
    {% do redirect('/signup-complete') %}
{% endif %}
```

## Redirects in AJAX

The [AJAX framework](../ajax/introduction.md) supports redirects with the `data-request-redirect` attribute. The attribute value should specify a URL location to redirect after a successful AJAX request completes.

```html
<button
    data-request="onAjax"
    data-request-redirect="/signup-complete">
    Save and Redirect
</button>
```

The [turbo router](../ajax/turbo-router.md) supports historical redirects with the `data-browser-redirect-back` attribute. The attribute can be attached to any hyperlink or AJAX request element, and only triggers when there is a previous browser history state.

```html
<button
    data-request="onRedirect"
    data-browser-redirect-back>
    Save and Back
</button>
```

The attribute value can also be used on hyperlinks.

```html
<a
    href="/home"
    data-browser-redirect-back>
    Go Back
</a>
```

::: warning
The `data-browser-redirect-back` attribute should be used in combination with a traditional redirect as fallback location.
:::

#### See Also

::: also
* [Redirect Twig function](../../markup/function/redirect.md)
* [Responses and Views](../../extend/services/response-view.md)
:::
