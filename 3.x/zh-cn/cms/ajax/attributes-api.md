---
subtitle: 使用 HTML 属性与处理程序交互。
---
# 数据属性 API

数据属性 API 允许您在不使用任何 JavaScript 的情况下发起 AJAX 请求。在许多情况下，数据属性 API 比 JavaScript API 更简洁——您可以用更少的代码获得相同的结果。支持的 AJAX 数据属性如下：

data-request 属性 | 描述
------------- | -------------
**data-request** | 指定 AJAX 处理程序名称。
**data-request-confirm** | 指定确认消息。在发送请求之前会显示一个确认对话框。如果用户点击取消按钮，则不会发送请求。
**data-request-redirect** | 指定在 AJAX 请求成功后浏览器要重定向到的 URL。
**data-request-url** | 指定请求发送到的 URL。默认值：`window.location.href`
**data-request-update** | 指定要更新的部件和页面元素（CSS 选择器）列表。格式如下：`partial: selector, partial: selector`。在某些情况下需要使用引号，例如：`'my-partial': '#myelement'`。选择器字符串应以 `#` 或 `.` 字符开头，此外您还可以在前面加上 `@` 来追加内容到元素，`^` 来前置内容，`!` 来替换，`=` 来使用任何 CSS 选择器。
**data-request-data** | 指定要发送到服务器的额外 POST 参数。格式如下：`var: value, var: value`。如果需要可以使用引号：`var: 'some string'`。该属性可以用在触发元素上（例如同时具有 `data-request` 属性的按钮上）、触发元素的最近元素上以及父表单元素上。框架会合并 `data-request-data` 属性的值。如果不同元素上的属性定义了同名参数，框架使用以下优先级：触发元素的 `data-request-data`、更近的父元素的 `data-request-data`、表单输入数据。
**data-request-query** | 指定要发送到服务器并添加到当前 URL 查询字符串的额外 GET 参数。
**data-request-before-update** | 指定在页面内容更新之前直接执行的 JavaScript 代码。
**data-request-success** | 指定在请求成功完成后执行的 JavaScript 代码。`data` 变量在此函数中可用，包含响应数据。
**data-request-error** | 指定在请求遇到错误时执行的 JavaScript 代码。`data` 变量在此函数中可用，包含响应数据。
**data-request-complete** | 指定在请求成功完成或遇到错误时执行的 JavaScript 代码。`data` 变量在此函数中可用，包含响应数据。
**data-request-cancel** | 指定在用户中止请求或通过确认对话框取消请求时执行的 JavaScript 代码。
**data-request-message** | 显示带有指定文本的进度消息，在请求运行时显示。此选项由[闪存消息功能](../features/flash-messages.md)使用。
**data-request-loading** | 指定在请求运行时显示的元素的 CSS 选择器。您可以使用此选项来显示 AJAX 加载指示器。该功能使用 CSS 的 `block` 和 `none` display 属性来管理元素可见性。
**data-request-progress-bar** | 在 AJAX 请求发生时启用[进度条](../features/loaders.md)。
**data-request-form** | 明确指定用于获取随请求发送的表单数据的表单元素。如果未指定，则使用距触发元素最近的表单，包括当元素本身就是表单的情况。
**data-request-flash** | 当包含时，指示服务器清除并随响应发送任何闪存消息。此选项由[闪存消息功能](../features/flash-messages.md)使用。
**data-request-files** | 指定后，请求将使用 `FormData` 接口接受文件上传。
**data-request-download** | 指定后，接受带有 `Content-Disposition` 响应的文件下载。此属性可以匿名添加或设置为下载的文件名。
**data-request-bulk** | 指定后，请求将以 JSON 格式发送，用于批量数据事务。
**data-browser-target** | 与 `data-request-download` 一起使用时，输出将定向到此窗口，例如 `_blank`。
**data-browser-validate** | 指定后，在请求提交之前将运行基于浏览器的客户端验证。
**data-browser-redirect-back** | 当发生重定向时，如果浏览器的上一个 URL 可用，则使用该 URL 代替提供的重定向 URL。
**data-auto-submit** | 自动在同时具有 `data-request` 属性的元素上触发 AJAX 请求。当浏览器窗口处于活动状态时，使用 [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 提交请求。可选的属性值可以定义框架在发送请求之前等待的时间间隔（以毫秒为单位）。
**data-track-input** | 可应用于同时具有 `data-request` 属性的文本、数字或密码输入字段。定义后，当用户在字段中输入内容时，输入字段将自动发送 AJAX 请求。可选的属性值可以定义框架在发送请求之前等待的时间间隔（以毫秒为单位）。

当为元素指定 `data-request` 属性时，该元素在用户与其交互时会触发 AJAX 请求。根据元素类型的不同，请求会在以下事件中触发：

元素 | 事件
------------- | -------------
**表单** | 当表单提交时。
**链接、按钮** | 当元素被点击时。
**文本、数字和密码字段** | 当文本更改时，仅在 `data-track-input` 属性存在时有效。
**下拉菜单、复选框、单选按钮** | 当元素被选中时。

## 使用示例

当表单提交时触发 `onCalculate` 处理程序。使用 **calcresult** 部件更新标识符为 "result" 的元素。

```html
<form data-request="onCalculate" data-request-update="{ calcresult: '#result' }">
```

在点击删除按钮后，在发送请求之前请求确认。

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

在请求成功后重定向到另一个页面。

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

在请求成功后显示弹出窗口。

```html
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

发送一个值为 `update` 的 POST 参数 `mode`。

```html
<form data-request="onUpdate" data-request-data="{ mode: 'update' }">
```

跨多个元素发送一个值为 `7` 的 POST 参数 `id`。

```html
<div data-request-data="{ id: 7 }">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

在当前请求中发送一个值为 `6` 的 GET 参数 `page`。

```html
<button data-request="onSetPage" data-request-query="{ page: 6 }">
    Page 6
</button>
```

在请求加载时显示[闪存消息](../features/flash-messages.md)。

```html
<button data-request="onUpdate" data-request-message="Loading...">
    Save Changes
</button>
```

在请求中包含[文件上传](../../extend/services/request-input.md)。

```html
<form data-request="onSubmit" data-request-files>
    <input type="file" name="photo" accept="image/*" />
    <button type="submit">Submit</button>
</form>
```

在响应中包含[文件下载](../../extend/services/response-view.md)。

```html
<button data-request="onDownloadFile" data-request-download>
    Download
</button>
```

指定自定义文件名并在新窗口中打开下载，例如预览 PDF。

```html
<button
    data-request="onDownloadFile"
    data-request-download="sample.pdf"
    data-browser-target="_blank">
    Download
</button>
```
