---
subtitle: 使用 JavaScript 代码与处理程序交互。
---
# JavaScript API

JavaScript API 比数据属性 API 更强大。`oc.request` 方法可以与表单内的任何元素一起使用，也可以直接在表单元素上使用。当该方法与表单内的元素一起使用时，它会转发到表单。

`oc.request` 将目标元素和 AJAX 处理程序名称作为第一个和第二个参数。目标元素可以是选择器字符串或 HTML 元素。例如：

```html
<form onsubmit="oc.request(this, 'onProcess'); return false;">
    ...
```

`oc.request` 方法的第三个参数是选项对象。以下选项是 October CMS 框架特有的。

选项 | 描述
------------- | -------------
**update** | 一个对象，指定要更新的部件和页面元素（CSS 选择器）列表：`{'partial': '#select'}`。选择器字符串应以 `#` 或 `.` 字符开头，此外您还可以在前面加上 `@` 来追加内容到元素，`^` 来前置内容，`!` 来替换，`=` 来使用任何 CSS 选择器。
**confirm** | 确认字符串。如果设置，在发送请求之前会显示确认对话框。如果用户点击取消按钮，请求将被取消。
**data** | 一个可选对象，指定要与表单数据一起发送到服务器的数据：`{var: 'value'}`。您还可以在此对象中使用 [`Blob` 对象](https://developer.mozilla.org/en-US/docs/Web/API/Blob)来包含要上传的文件。要指定任何 `Blob` 对象的文件名，只需在 `Blob` 对象上设置 `filename` 属性即可。（例如 `var blob = new Blob(variable); blob.filename = 'test.txt'; var data = {uploaded_file: blob};`）
**query** | 一个可选对象，指定要添加到当前 URL 查询字符串的数据。
**headers** | 一个可选对象，指定要随请求发送到服务器的头部值。
**redirect** | 字符串，指定在请求成功后浏览器要重定向到的 URL。
**beforeUpdate** | 在页面元素更新之前执行的回调函数。函数内部的 `this` 变量解析为请求内容——一个包含 2 个属性的对象：`handler` 和 `options`，表示原始 request() 的参数。
**afterUpdate** | 与 `beforeUpdate` 相同的回调函数，不同之处在于它在页面元素更新之后执行。
**success** | 在请求成功时执行的回调函数。如果提供了此选项，它将覆盖默认的框架功能：元素不会被更新，`beforeUpdate` 和 `afterUpdate` 回调不会被触发，`ajax:update` 和 `ajax:update-complete` 事件不会被触发。要调用默认的框架功能，请在函数内部使用 `this.success(...)`。
**error** | 在请求发生错误时执行的回调函数。默认情况下会显示警告消息。如果覆盖了此选项，将不会显示警告消息。
**complete** | 在请求成功或发生错误时执行的回调函数。
**cancel** | 在用户中止请求或通过确认对话框取消请求时执行的回调函数。
**form** | 用于获取随请求发送的表单数据的表单元素，可以作为选择器字符串或表单元素传递。
**flash** | 当为 true 时，指示服务器清除并随响应发送任何闪存消息。默认值：`false`
**files** | 当为 true 时，请求将使用 `FormData` 接口接受文件上传。默认值：`false`
**download** | 当为 true 时，接受带有 `Content-Disposition` 响应的文件下载。当为字符串时，可以指定下载的文件名。默认值：`false`
**bulk** | 当为 true 时，请求将以 JSON 格式发送，用于批量数据事务。默认值：`false`
**browserValidate** | 当为 true 时，在提交请求之前将执行基于浏览器的客户端验证。仅适用于在 `<form>` 元素上下文中触发的请求。
**browserRedirectBack** | 当为 true 且发生重定向时，如果浏览器的上一个 URL 可用，则使用该 URL 代替提供的重定向 URL。默认值：`false`。
**message** | 显示带有指定文本的进度消息，在请求运行时显示。此选项由[闪存消息功能](../features/flash-messages.md)使用。
**loading** | 一个可选的字符串或对象，在请求运行时显示。字符串应为元素的 CSS 选择器，或者对象应支持 `show()` 和 `hide()` 函数来管理可见性。
**progressBar** | 在 AJAX 请求发生时启用[进度条](../features/loaders.md)。

**beforeUpdate**、**afterUpdate**、**success**、**error** 和 **complete** 选项都接受带有三个参数的函数：从服务器接收的数据对象、HTTP 状态码和 XHR 对象。

```js
success: function(data, responseCode, xhr) { }
```

您还可以通过将新函数作为选项传递来覆盖一些请求逻辑。以下逻辑处理程序可用。

处理程序 | 描述
------------- | -------------
**handleConfirmMessage(message, promise)** | 在请求用户确认时调用。
**handleErrorMessage(message)** | 在需要显示错误消息时调用。
**handleValidationMessage(message, fields)** | 当使用验证时聚焦到第一个无效字段。
**handleFlashMessage(message, type)** | 当使用 **flash** 选项提供闪存消息时调用（见上文）。
**handleRedirectResponse(url)** | 当浏览器需要重定向到另一个位置时调用。

## 使用示例

在发送 `onDelete` 请求之前请求确认。

```js
oc.request('#myform', 'onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
});
```

运行 `onCalculate` 处理程序并将渲染的 **calcresult** 部件注入到具有 **result** CSS 类的页面元素中。

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' }
})
```

运行 `onCalculate` 处理程序并附带一些额外数据。

```js
oc.request('#myform', 'onCalculate', { data: { value: 55 } })
```

运行 `onCalculate` 处理程序并在页面元素更新之前运行一些自定义代码。

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' },
    beforeUpdate: function() { /* do something */ }
})
```

运行 `onCalculate` 处理程序，如果成功，在页面元素更新后运行一些自定义代码。

```js
oc.request('#myform', 'onCalculate', {
    afterUpdate: function() { /* do something */ }
})
```

使用 `oc.ajax` 方法在没有 FORM 元素的情况下执行请求。

```js
oc.ajax('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

运行 `onCalculate` 处理程序，如果成功，在默认的 `success` 函数完成后运行一些自定义代码。

```js
oc.request('#myform', 'onCalculate', {
    success: function(data) {
        this.success(data).done(function() {
            // ... do something after parent success() is finished ...
        });
    }
})
```

## 全局 AJAX 事件

AJAX 框架在更新的元素、触发元素、表单和 window 对象上触发事件。无论使用哪种 API（数据属性 API 或 JavaScript API），这些事件都会被触发。

额外的详细信息可通过事件处理程序的 `event.detail` 属性获取。除非另有说明，处理程序的详细信息包括 `context` 对象、从服务器接收的 `data` 对象、`responseCode` 和 `xhr` 对象。

事件 | 描述
------------- | -------------
**ajax:before-send** | 在发送请求之前在 window 对象上触发。处理程序详细信息提供 `context` 对象。
**ajax:before-update** | 在请求完成后、页面更新之前直接在表单对象上触发。
**ajax:update** | 在页面元素被框架更新后触发。
**ajax:update-complete** | 在所有元素被框架更新后在 window 对象上触发。
**ajax:request-success** | 在请求成功完成后在表单对象上触发。处理程序获得 5 个参数：事件对象、上下文对象、从服务器接收的数据对象、状态文本字符串和 XHR 对象。
**ajax:request-error** | 如果请求遇到错误，在表单对象上触发。
**ajax:error-message** | 如果请求遇到错误，在 window 对象上触发。处理程序有一个 `message` 详细信息，包含从服务器返回的错误消息。
**ajax:confirm-message** | 当给出 `confirm` 选项时在 window 对象上触发。处理程序有一个 `message` 详细信息，包含作为 `confirm` 选项一部分分配给处理程序的文本消息。还提供了一个 `promise` 详细信息用于延迟或取消结果，这对于实现自定义确认逻辑/界面而非原生 JavaScript 确认框很有用。

以下事件在触发元素上触发：

事件 | 描述
------------- | -------------
**ajax:setup** | 在请求形成之前触发。处理程序详细信息提供 `context` 对象，允许通过 `context.options` 属性修改选项。
**ajax:promise** | 在 AJAX 请求发送之前直接触发。处理程序详细信息提供 `context` 对象。
**ajax:fail** | 如果 AJAX 请求失败，最终触发。
**ajax:done** | 如果 AJAX 请求成功，最终触发。
**ajax:always** | 无论 AJAX 请求失败还是成功，都会触发。

## 使用示例

当 `ajax:update` 事件在元素上触发时执行 JavaScript 代码。

```js
document.querySelector('#result').addEventListener('ajax:update', function() {
    console.log('Updated!');
});
```

执行一个使用逻辑处理程序显示闪存消息的单次请求。

```js
oc.ajax('onDoSomething', {
    flash: true,
    handleFlashMessage: function(message, type) {
        oc.flashMsg({ message: message, type: type });
    }
});
```

将配置全局应用于所有 AJAX 请求。

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;

    // Enable AJAX handling of Flash messages on all AJAX requests
    options.flash = true;

    // Disable the progress bar for all AJAX requests
    options.progressBar = false;

    // Handle Error Messages by triggering a flashMsg of type error
    options.handleErrorMessage = function(message) {
        oc.flashMsg({ message: message, type: 'error' });
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    options.handleFlashMessage = function(message, type) {
        oc.flashMsg({ message: message, type: type });
    }
});
```

使用事件详细信息中提供的 `promise`。

```js
addEventListener('ajax:confirm-message', function(event) {
    const { message, promise } = event.detail;

    // Prevent default behavior
    event.preventDefault();

    // Handle promise
    if (confirm(message)) {
        promise.resolve();
    }
    else {
        promise.reject();
    }
});
```

在特定 AJAX 处理程序完成更新后为元素添加动画。

```js
addEventListener('ajax:update-complete', function(event) {
    const { handler } = event.detail.context;

    // If the handler is either of the following
    if (['onRemoveFromCart', 'onAddToCart'].includes(handler)) {

        // Run an animation for 2 seconds
        var el = document.querySelector('#miniCart');
        el.classList.add('animate-shockwave');
        setTimeout(function() { el.classList.remove('animate-shockwave'); }, 2000);
    }
});
```
