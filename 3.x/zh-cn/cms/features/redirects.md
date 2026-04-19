---
subtitle: 了解如何重定向到另一个页面或 URL。
---
# 重定向

在某些情况下，你可能希望在提交表单或任何 AJAX 请求后将用户重定向到新页面。

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

在你的 [AJAX 处理程序](../ajax/handlers.md) 中，你可以返回一个 `Redirect` [响应类型](../../extend/services/response-view.md)，其中 `to` 方法接受相对或绝对 URL（第一个参数）。

```php
function onSignup()
{
    return Redirect::to('/signup-complete');
}
```

你可以使用 `refresh` 方法刷新当前页面。同时也支持使用[闪存消息](./flash-messages.md)。

```php
function onSignup()
{
    Flash::success('Signup complete!');

    return Redirect::refresh();
}
```

## 重定向到 CMS 页面

`Cms` 门面和 `redirect` 方法可用于重定向到特定的 CMS 页面（第一个参数）以及任何可选的路由参数（第二个参数）。

```php
function onRedirect()
{
    return Cms::redirect('blog/post', ['slug' => 'foobar']);
}
```

你可以使用 `pageUrl` 方法将 URL 作为字符串返回。

```php
$postPage = Cms::pageUrl('blog/post', ['slug' => 'foobar']);
```

## 在 Twig 中重定向

[`redirect()` Twig 函数](../../markup/function/redirect.md)可用于从页面标记中重定向用户。

```php
function onSignup()
{
    $this['success'] = true;
}
```

此函数接受 URL 或 CMS 页面名称。

```twig
{% if success %}
    {% do redirect('/signup-complete') %}
{% endif %}
```

## 在 AJAX 中重定向

[AJAX 框架](../ajax/introduction.md)通过 `data-request-redirect` 属性支持重定向。属性值应指定在成功的 AJAX 请求完成后要重定向到的 URL 位置。

```html
<button
    data-request="onAjax"
    data-request-redirect="/signup-complete">
    Save and Redirect
</button>
```

[turbo 路由器](../ajax/turbo-router.md)通过 `data-browser-redirect-back` 属性支持历史重定向。该属性可以附加到任何超链接或 AJAX 请求元素上，覆盖重定向响应，并且仅在存在先前的浏览器历史状态时触发。

```html
<button
    data-request="onRedirect"
    data-browser-redirect-back>
    Save and Back
</button>
```

该属性值也可以用于超链接。

```html
<a
    href="/home"
    data-browser-redirect-back>
    Go Back
</a>
```

::: warning
`data-browser-redirect-back` 属性应与传统重定向结合使用，作为备用位置。
:::

#### 参见

::: also
* [重定向 Twig 函数](../../markup/function/redirect.md)
* [响应和视图](../../extend/services/response-view.md)
:::
