---
subtitle: 设计您的 API 并动态更新页面。
---
# 事件处理程序

AJAX 事件处理程序是 AJAX 框架与服务器通信的 API 端点。它们可以响应原始数据、重定向浏览器或动态更新页面上的部件。

## AJAX 处理程序

要创建 AJAX 处理程序，请在页面、部件或布局的 PHP 代码部分，或[在 CMS 组件内部](../themes/components.md)将其定义为 PHP 函数。处理程序名称应使用 `onSomething` 模式，例如 `onName`。所有处理程序都支持在 AJAX 请求中[更新部件](./update-partials.md)。

```php
function onSubmitContactForm()
{
    // ...
}
```

::: tip
如果在页面和布局中同时定义了两个同名的处理程序，页面处理程序将优先执行。在组件中定义的处理程序优先级最低。
:::

### 调用处理程序

每个 AJAX 请求都应指定一个处理程序名称，可以使用[数据属性 API](../ajax/attributes-api.md) 或 [JavaScript API](../ajax/javascript-api.md)。当发起请求时，服务器将搜索所有已注册的处理程序并找到第一个匹配的处理程序。

```html
<!-- Attributes API -->
<button data-request="onSubmitContactForm">Go</button>

<!-- JavaScript API -->
<script> oc.ajax('onSubmitContactForm') </script>
```

由页面、布局和组件定义的处理程序都会自动注册。如果您从部件内部调用处理程序，请使用 [`{% ajaxPartial %}` Twig 标签](../../markup/tag/ajax-partial.md)，它会调整页面周期以注册其处理程序。

### 表单序列化

当 AJAX 请求发生在 HTML 表单标签内部时，表单的所有输入值都可供处理程序使用。在下面的示例中，`first_name` 值将随请求一起发送。

```html
<form id="myForm">
    <input name="first_name" />
    <button data-request="onSubmitContactForm">Go</button>
</form>
```

JavaScript API 通过 `oc.request` 函数支持此逻辑。

```html
<script> oc.request('#myForm', 'onSubmitContactForm') </script>
```

您可以使用 `input()` PHP 函数来访问该变量。

```php
function onSubmitContactForm()
{
    $firstName = input('first_name');
}
```

### 通用处理程序

有时您可能需要发起 AJAX 请求仅用于更新页面内容，而不需要执行任何代码。您可以使用 `onAjax` 处理程序来实现此目的。此处理程序在任何地方都可用，无需编写任何代码。

```html
<button data-request="onAjax">Do nothing</button>
```

### 组件处理程序

如果两个组件注册了相同的处理程序名称，建议在处理程序名称前加上[组件简称或别名](../../cms/themes/components.md)作为前缀。如果组件使用别名 **mycomponent**，则可以通过 `mycomponent::onName` 来定位处理程序。

```html
<button data-request="mycomponent::onSubmitContactForm">Go</button>
```

请参阅[组件开发文章](../../extend/cms-components.md)了解更多信息。

## AJAX 处理程序中的重定向

如果需要将浏览器重定向到另一个位置，请从 AJAX 处理程序返回 `Redirect` 响应对象。框架会在从服务器返回响应后立即重定向浏览器。以下是包含重定向的 AJAX 处理程序示例。

```php
function onRedirectMe()
{
    return Redirect::to('http://google.com');
}
```

## 从 AJAX 处理程序返回数据

AJAX 处理程序的响应可以作为可消费的 API，通过返回结构化数据来实现。如果 AJAX 处理程序返回一个数组，您可以在 `success` 事件处理程序中访问其元素。以下是返回数据对象的 AJAX 处理程序示例。

```php
function onFetchDataFromServer()
{
    // Some server-side code

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

数据可以通过数据属性 API 获取。

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

同样可以使用 JavaScript API。

```html
<form onsubmit="oc.request(this, 'onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false"
>
```

## 在处理程序之前运行代码

有时您可能希望在处理程序执行之前运行一些代码。在[布局执行生命周期](../../cms/themes/layouts.md)中定义 `onInit` 函数可以让代码在每个 AJAX 处理程序之前运行。

```php
function onInit()
{
    // From a page or layout PHP code section
}
```

您也可以在 [CMS 组件类](../../extend/cms-components.md)中定义 `init` 方法。

```php
function init()
{
    // From a component or widget class
}
```

## 抛出 AJAX 异常

您可以使用 `AjaxException` 类抛出 [AJAX 异常](../../extend/system/exceptions.md)，将响应视为错误的同时保留正常发送响应内容的能力。只需将响应内容作为异常的第一个参数传递即可。

```php
throw new AjaxException([
    'error' => 'Not enough questions',
    'questionsNeeded' => 2
]);
```

这些错误由 AJAX 框架处理。

```html
<form data-request="onHandleForm" data-request-error="console.log(data)">
```

同样可以使用 JavaScript API。

```html
<form onsubmit="oc.request(this, 'onHandleForm', {
        error: function(data) {
            console.log(data);
        }
    }); return false"
>
```

::: tip
当抛出此异常类型时，[部件将照常更新](./update-partials.md)。
:::

## 分发浏览器事件

::: aside
分发的事件在 AJAX 响应中于请求完成后、部件更新前触发。
:::

您可以使用 `dispatchBrowserEvent` 方法从 AJAX 处理程序分发 JavaScript 事件。此方法接受任意事件名称（第一个参数）和要传递给事件的详细变量（第二个参数），变量必须与 JSON 序列化兼容。

```php
function onPerformAction()
{
    $this->dispatchBrowserEvent('app:update-profile');

    $this->dispatchBrowserEvent('app:update-profile', ['name' => 'Jeff']);
}
```

在浏览器中，当 AJAX 请求完成时，使用 `addEventListener` 监听分发的事件。事件变量可通过 `event.detail` 对象获取。

```js
addEventListener('app:update-profile', function (event) {
    alert('Profile updated with name: ' + event.detail.name);
});
```

例如，如果您想在文档已被其他用户更新时显示提示，可以向浏览器分发一个事件并抛出 `AjaxException` 来中止流程。

::: tip
`AjaxException` 和 `ValidationException` 是支持分发事件的中止性异常。
```php
public function onUpdate()
{
    $this->dispatchBrowserEvent('app:stale-document');

    throw new AjaxException;
}
```
:::

您可以在浏览器中使用通用监听器来监听此事件。此示例在重新提交带有 `force` 标志的请求之前提示用户确认。

```js
addEventListener('app:stale-document', function (event) {
    if (confirm('Another user has updated this document, proceed?')) {
        oc.request(event.target, 'onUpdate', { data: {
            force: true
        }});
    }
});
```

要阻止部件作为响应的一部分进行更新，请在事件对象上调用 `preventDefault()`。

```js
addEventListener('app:stale-document', function (event) {
    event.preventDefault();
});
```
