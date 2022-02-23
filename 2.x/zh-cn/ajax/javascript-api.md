# JavaScript API

JavaScript API 比数据属性 API 更强大。 `request` 方法可用于表单内或表单元素上的任何元素。 当该方法与表单中的元素一起使用时，它会被转发到表单。

`request` 方法有一个必需的参数 - AJAX 处理程序名称。 例子：

```html
<form onsubmit="$(this).request('onProcess'); return false;">
    ...
```

`request` 方法的第二个参数是选项对象。 您可以使用与 [jQuery AJAX 函数](http://api.jquery.com/jQuery.ajax/) 兼容的任何选项和方法。 以下选项特定于October框架：

选项 | 描述
------------- | -------------
**update** | 一个对象，指定要更新的列表部件和页面元素(作为 CSS 选择器)：{'partial': '#select'}。如果选择器字符串前面带有 `@` 符号，则从服务器接收到的内容将附加到元素中，而不是替换现有内容。
**confirm** | 确认字符串。如果设置，则在发送请求之前显示确认。如果用户单击取消按钮，请求将取消。
**data** | 一个可选对象，指定要与表单数据一起发送到服务器的数据：{var: 'value'}。当 `files` 为 true 时，您还可以使用 [`Blob` 对象](https://developer.mozilla.org/en-US/docs/Web/API/Blob) 在此对象中包含要上传的文件。要指定任何`Blob` 对象的文件名，只需在`Blob` 对象上设置`filename` 属性。 (例如，`var blob = new Blob(variable); blob.filename = 'test.txt'; var data = {'uploaded_file': blob};`)
**redirect** | 字符串，指定请求成功后将浏览器重定向到的 URL。
**beforeUpdate** | 在页面元素更新之前执行的回调函数。该函数获取3个参数：从服务器接收的数据对象、文本状态字符串和 jqXHR 对象。函数内的`this`变量解析为请求内容——一个包含 2 个属性的对象：`handler`和`options`代表原始 request() 参数。
**success** | 请求成功时执行的回调函数。如果提供此选项，它会覆盖默认框架的功能：元素不会更新，不会触发 `beforeUpdate` 事件，不会触发 `ajaxUpdate` 和 `ajaxUpdateComplete` 事件。事件处理程序获得3个参数：从服务器接收的数据对象、文本状态字符串和 jqXHR 对象。但是，您仍然可以调用默认框架功能，在您的函数中调用 `this.success(...)`。
**error** | 发生错误时执行回调函数。默认情况下会显示警报消息。如果覆盖此选项，则不会显示警报消息。处理程序获取 3 个参数：jqXHR 对象、文本状态字符串和错误对象 - 参见 [jQuery AJAX 函数](http://api.jquery.com/jQuery.ajax/)。
**complete** | 回调函数在成功或错误的情况下执行。
**form** | 用于获取随请求发送的表单数据的表单元素，作为选择器字符串或表单元素传递。
**flash** | 当为true时，指示服务器清除并发送任何带有响应的闪现消息。默认值：false
**files** | 当为 true 时，请求将接受文件上传，这需要浏览器支持 `FormData` 接口。默认值：false
**browserValidate** | 当为 true 时，将在提交之前对请求执行基于浏览器的客户端验证。这仅适用于在 `<form>` 元素的上下文中触发的请求。 **注意：** 这种形式的验证不适用于复杂的表单，其中验证的字段可能在 100% 的时间对用户不可见。建议您避免在最简单的表单之外的任何地方使用它。
**loading** | 请求运行时显示的可选字符串或对象。字符串应该是元素的 CSS 选择器，对象应该支持 `show()` 和 `hide()` 函数来管理可见性。使用 [额外功能](../ajax/extras.md) 时，您可以传递全局对象 `$.oc.stripeLoadIndicator`。

您还可以通过将新函数作为选项传递来覆盖某些请求逻辑。 这些逻辑处理程序可用。

处理程序 | 描述
------------- | -------------
**handleConfirmMessage(message)** | 在请求用户确认时调用。
**handleErrorMessage(message)** | 在应显示错误消息时调用。
**handleValidationMessage(message, fields)** | 使用验证时聚焦第一个无效字段。
**handleFlashMessage(message, type)** | 当使用 **flash** 选项提供闪现消息时调用（见上文）。
**handleRedirectResponse(url)** | 当浏览器应该重定向到另一个位置时调用。

## 用法示例

在发送 onDelete 请求之前请求确认：

```js
$('form').request('onDelete', {
    confirm: '你确定吗?',
    redirect: '/dashboard'
})
```

运行 `onCalculate` 处理程序并将渲染的 **calcresult** 部件注入具有 **result** CSS 类的页面元素：

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'}
})
```

使用一些额外的数据运行 `onCalculate` 处理程序：

```js
$('form').request('onCalculate', {data: {value: 55}})
```

运行 onCalculate 处理程序并在页面元素更新之前运行一些自定义代码：

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'},
    beforeUpdate: function() { /* 一些处理程序 */ }
})
```

运行 `onCalculate` 处理程序，如果成功，运行一些自定义代码和默认的 `success` 函数：

```js
$('form').request('onCalculate', {success: function(data) {
    //... 一些处理程序 ...
    this.success(data);
}})
```

执行没有 表单 元素的请求：

```js
$.request('onCalculate', {
    success: function() {
        console.log('完成!');
    }
})
```

运行 `onCalculate` 处理程序，如果成功，则在默认的 `success` 函数完成后运行一些自定义代码：

```js
$('form').request('onCalculate', {success: function(data) {
    this.success(data).done(function() {
        //... 在父级 success() 完成后做一些事情 ...
    });
}})
```

<a id="oc-global-ajax-events"></a>
## 全局 AJAX 事件

AJAX 框架在更新的元素、触发元素、表单和窗口对象上触发多个事件。 无论使用哪个 API——数据属性 API 或 JavaScript API，都会触发事件。

事件 | 描述
------------- | -------------
**ajaxBeforeSend** | 在发送请求之前在 window 对象上触发。
**ajaxBeforeUpdate** | 在请求完成后但在页面更新之前直接在表单对象上触发。处理程序获取 5 个参数：事件对象、上下文对象、从服务器接收的数据对象、状态文本字符串和 jqXHR 对象。
**ajaxUpdate** | 在使用框架更新页面元素后在页面元素上触发。处理程序获取 5 个参数：事件对象、上下文对象、从服务器接收的数据对象、状态文本字符串和 jqXHR 对象。
**ajaxUpdateComplete** | 在框架更新所有元素后在 window 对象上触发。处理程序获取 5 个参数：事件对象、上下文对象、从服务器接收的数据对象、状态文本字符串和 jqXHR 对象。
**ajaxSuccess** | 请求成功完成后在表单对象上触发。处理程序获取 5 个参数：事件对象、上下文对象、从服务器接收的数据对象、状态文本字符串和 jqXHR 对象。
**ajaxError** | 如果请求遇到错误，则在表单对象上触发。处理程序获取 5 个参数：事件对象、上下文对象、错误消息、状态文本字符串和 jqXHR 对象。
**ajaxErrorMessage** | 如果请求遇到错误，则在 window 对象上触发。处理程序获取 2 个参数：事件对象和从服务器返回的错误消息。
**ajaxConfirmMessage** | 当给出 `confirm` 选项时在 window 对象上触发。 处理程序获得 2 个参数：作为`confirm` 选项的一部分分配给处理程序的事件对象和文本消息。 这对于实现自定义确认逻辑/界面而不是原生 javascript 确认框很有用。

这些事件在触发元素上触发：

事件 | 描述
------------- | -------------
**ajaxSetup** | 在请求形成之前触发，允许通过 `context.options` 对象修改选项。
**ajaxPromise** | 在发送 AJAX 请求之前直接触发。
**ajaxFail** | 如果 AJAX 请求失败，则最终触发。
**ajaxDone** | 如果 AJAX 请求成功，则最终触发。
**ajaxAlways** | 无论 AJAX 请求失败还是成功都会触发。

## 用法示例

当在元素上触发 `ajaxUpdate` 事件时执行 JavaScript 代码。

```js
$('.calcresult').on('ajaxUpdate', function() {
    console.log('更新完成!');
})
```

使用逻辑处理程序执行显示闪现消息的单个请求。

```js
$.request('onDoSomething', {
    flash: 1,
    handleFlashMessage: function(message, type) {
        $.oc.flashMsg({ text: message, class: type })
    }
})
```

将配置应用于全局所有 AJAX 请求。

```js
$(document).on('ajaxSetup', function(event, context) {
    // 对所有 AJAX 请求启用闪现消息的 AJAX 处理
    context.options.flash = true

    // 在所有 AJAX 请求上启用 StripeLoadIndicator
    context.options.loading = $.oc.stripeLoadIndicator

    // 通过触发类型错误的 flashMsg 处理错误消息
    context.options.handleErrorMessage = function(message) {
        $.oc.flashMsg({ text: message, class: 'error' })
    }

    // 通过触发消息类型的 flashMsg 来处理闪现消息
    context.options.handleFlashMessage = function(message, type) {
        $.oc.flashMsg({ text: message, class: type })
    }
})
```
