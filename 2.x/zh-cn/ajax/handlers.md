# 事件处理程序

## AJAX 处理程序

AJAX 事件处理程序是 PHP 函数，可以在页面或布局 [PHP 部分](../cms/themes.md#oc-php-section) 或 [组件](../cms/components.md) 内部定义。 处理程序名称应具有以下模式：`onName`。 所有处理程序都支持使用 [更新部分](../ajax/update-partials.md) 作为 AJAX 请求的一部分。

```php
function onSubmitContactForm()
{
    // ...
}
```

如果在一个页面和布局中一起定义了两个同名的处理程序，则页面处理程序将被执行。 [components](../cms/components.md) 中定义的处理程序具有最低优先级。

<a id="oc-calling-a-handler"></a>
###调用处理程序

每个 AJAX 请求都应使用 [数据属性 API](../ajax/attributes-api.md) 或 [JavaScript API](../ajax/javascript-api.md) 指定处理程序名称。 发出请求后，服务器将搜索所有已注册的处理程序并定位它找到的第一个处理程序。

```html
<!-- 数据属性 API -->
<button data-request="onSubmitContactForm">Go</button>

<!-- JavaScript API -->
<script> $.request('onSubmitContactForm') </script>
```

如果两个组件注册了相同的处理程序名称，建议使用 [组件短名称或别名](../cms/components.md#oc-components-aliases) 作为处理程序的前缀。如果组件使用 **mycomponent** 的别名，则可以使用 `mycomponent::onName` 来定位处理程序。

```html
<button data-request="mycomponent::onSubmitContactForm">Go</button>
```

您可能希望使用 [`__SELF__`](https://octobercms.com/docs/plugin/components#referencing-self) 引用变量而不是写死别名，以防用户更改页面上使用的组件别名.

```html
<form data-request="{{ __SELF__ }}::onCalculate" data-request-update="'{{ __SELF__ }}::calcresult': '#result'">
```

#### 通用处理程序

有时您可能需要仅出于更新页面内容的目的而发出 AJAX 请求，而不需要执行任何代码。为此，您可以使用 `onAjax` 处理程序。此处理程序随处可用，无需编写任何代码。

```html
<button data-request="onAjax">啥都不做</button>
```

## AJAX 处理程序中的重定向

如果您需要将浏览器重定向到另一个位置，请从 AJAX 处理程序返回 `Redirect` 对象。一旦从服务器返回响应，框架将重定向浏览器。示例 AJAX 处理程序：

```php
function onRedirectMe()
{
    return Redirect::to('http://www.huawei.com');
}
```

## 从 AJAX 处理程序返回数据

在高级情况下，您可能希望从 AJAX 处理程序返回结构化数据。如果 AJAX 处理程序返回一个数组，您可以在 `success` 事件处理程序中访问它的元素。示例 AJAX 处理程序：

```php
function onFetchDataFromServer()
{
    /* 一些服务器端代码 */

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

可以使用数据属性 API 获取数据：

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

与 JavaScript API 相同：

```html
<form
    onsubmit="$(this).request('onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false;">
```

## 抛出 AJAX 异常

您可以使用 `AjaxException` 类抛出 [AJAX 异常](../services/error-log.md#oc-ajax-exception) 将响应视为错误，同时保留正常发送响应内容的能力。只需将响应内容作为异常的第一个参数传递。

```php
throw new AjaxException([
    'error' => '错误提示',
    'questionsNeeded' => 2
]);
```

> **注意**：当抛出这个异常类型时 [部件将被更新](../ajax/update-partials.md) 正常。

## 在处理程序之前运行代码

有时您可能希望在处理程序执行之前执行代码。将 `onInit` 函数定义为 [页面执行生命周期](../cms/layouts.md#oc-dynamic-layouts) 的一部分，允许代码在每个 AJAX 处理程序之前运行。

```php
function onInit()
{
    // 页面或布局 PHP 代码部分
}
```

您可以在 [组件类](../plugin/components.md#oc-component-initialization) 或 [后端小部件类](../backend/widgets.md) 中定义一个 `init` 方法。

```php
function init()
{
    // 组件或小部件类
}
```
