---
previousPath: cms/features/redirects.md
subtitle: Send the visitor to another page after a form submission or AJAX request.
---
# Redirects

To send the visitor to a new page after a form submission or any AJAX request, return a redirect from the handler.

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

Inside your [AJAX handler](./handlers.md), return a `Redirect` [response type](../../backend/services/response-view.md). The `to` method accepts a relative or absolute URL (first argument).

```php
function onSignup()
{
    return Redirect::to('/signup-complete');
}
```

## Refreshing the Current Page

Use the `refresh` method to reload the current page. [Flash messages](./flash-messages.md) are supported.

```php
function onSignup()
{
    Flash::success('Signup complete!');

    return Redirect::refresh();
}
```

## Redirecting to a CMS Page

The `redirect` method of the `Cms` facade redirects to a CMS page (first argument) with optional route parameters (second argument).

```php
function onRedirect()
{
    return Cms::redirect('blog/post', ['slug' => 'foobar']);
}
```

Use the `pageUrl` method to get the URL as a string instead.

```php
$postPage = Cms::pageUrl('blog/post', ['slug' => 'foobar']);
```

## Redirecting from Twig

The [`redirect()` Twig function](../../handbook/twig-functions/redirect.md) redirects the user from within the page markup. For example, the handler sets a variable.

```php
function onSignup()
{
    $this['success'] = true;
}
```

The markup then redirects when the variable is set. The function accepts a URL or a CMS page name.

```twig
{% if success %}
    {% do redirect('/signup-complete') %}
{% endif %}
```

## Redirecting with Data Attributes

The `data-request-redirect` attribute redirects after a successful AJAX request, without any handler code. Set its value to the URL to redirect to.

```html
<button
    data-request="onAjax"
    data-request-redirect="/signup-complete">
    Save and Redirect
</button>
```

### Going Back to the Previous Page

A handler that redirects to a page only knows its URL, not the query parameters the visitor had applied to it, such as filters or a page number. The `data-browser-redirect-back` attribute restores them by using the previous URL from the browser history in place of the redirect. For example, when a handler redirects to `/posts`, a visitor who came from `/posts?category=news&page=2` is returned to that URL.

```html
<button
    data-request="onRedirect"
    data-browser-redirect-back>
    Save and Back
</button>
```

The previous URL is only used when it is the same page as the redirect. Otherwise the redirect is followed as given, as is any redirect with its own query string.

The attribute also works on hyperlinks when the layout includes the `{% framework extras %}` tag. A hyperlink goes to the previous page, whichever page it was, and follows its `href` when there is no previous page.

```html
<a
    href="/home"
    data-browser-redirect-back>
    Go Back
</a>
```

::: warning
Always pair the `data-browser-redirect-back` attribute with a regular redirect as the fallback location.
:::

#### See Also

::: also
* [Redirect Twig function](../../handbook/twig-functions/redirect.md)
* [Responses and Views](../../backend/services/response-view.md)
* [Turbo Router](./turbo-router.md)
:::
