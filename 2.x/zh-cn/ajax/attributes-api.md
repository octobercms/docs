# 数据属性 API

数据属性 API 让您无需任何 JavaScript 即可发出 AJAX 请求。 在许多情况下，数据属性 API 不如 JavaScript API 冗长——你编写更少的代码来获得相同的结果。 支持的 AJAX 数据属性有：

属性 |描述
------------- | -------------
**data-request** | 指定 AJAX 处理程序名称。
**data-request-confirm** |  指定确认消息。在发送请求之前会显示确认信息。如果用户单击取消按钮，则不会发送请求。
**data-request-redirect** |  指定在成功的 AJAX 请求后重定向浏览器的 URL。
**data-request-url** |  指定将请求发送到的 URL。默认值：`window.location.href`
**data-request-update** |  指定要更新的部件和页面元素（CSS 选择器）的列表。格式如下：`partial: selector, partial: selector`。在某些情况下需要使用引号，例如：`'my-partial': '#myelement'`。如果选择器字符串前面带有 `@` 符号，则从服务器接收到的内容将附加到元素中，而不是替换现有内容。如果选择器字符串前面带有`^` 符号，则内容将被添加到前面。
**data-request-ajax-global** |  默认为false。设置 true 以启用 jQuery [ajax 事件](http://api.jquery.com/category/ajax/global-ajax-event-handlers/) 全局：`ajaxStart`、`ajaxStop`、`ajaxComplete`、`ajaxError` 、`ajaxSuccess` 和 `ajaxSend`。
**data-request-data** |  指定要发送到服务器的其他 POST 参数。格式如下：`var: value, var: value`。如果需要，请使用引号：`var: 'some string'`。该属性可以在触发元素上使用，例如在也具有 data-request 属性的按钮上，在触发元素的最近元素上以及在父表单元素上。该框架合并了 `data-request-data` 属性的值。如果不同元素上的属性定义了同名参数，则框架使用以下优先级：触发元素`data-request-data`，更接近的父元素`data-request-data`，表单输入数据。
**data-request-before-update** |  指定在页面内容更新之前直接执行的 JavaScript 代码。
**data-request-success** |  指定在请求成功完成后要执行的 JavaScript 代码。
**data-request-error** |  指定在请求遇到错误时要执行的 JavaScript 代码。
**data-request-complete** |  指定在请求成功完成或遇到错误时要执行的 JavaScript 代码。
**data-request-loading** |  为在请求运行时要显示的元素指定 CSS 选择器。您可以使用此选项来显示 AJAX 加载指示器。该功能使用 jQuery 的 `show()` 和 `hide()` 函数来管理元素可见性。
**data-request-form** |  明确指定用于获取表单数据的表单元素。如果未指定，则使用与触发元素最接近的表单，包括元素本身是否为表单。
**data-request-flash** |  指定时，此选项指示服务器清除并发送任何带有响应的快速消息。 [额外功能](../ajax/extras.md#flash-messages) 也使用此选项。
**data-request-files** |  指定请求将接受文件上传时，这需要浏览器支持 `FormData` 接口。
**data-browser-validate** |  指定的基于浏览器的客户端验证，将在请求提交之前运行时。
**data-track-input** |  可以应用于同样具有 `data-request` 属性的文本、数字或密码输入字段。定义后，输入字段会在用户在字段中键入内容时自动发送 AJAX 请求。可选属性值可以定义时间间隔，以毫秒为单位，框架在发送请求之前等待。

当为元素指定了 `data-request` 属性时，该元素会在用户与其交互时触发 AJAX 请求。 根据元素的类型，请求在以下事件上触发：

元素 | 事件
------------- | -------------
**Forms** |提交表单时。
**Links, buttons** |  当元素被点击时。
**Text, number, 和 password 字段** |  当文本更改时，并且仅当显示了 `data-track-input` 属性时。
**Dropdowns, checkboxes, radios** |  当元素被选中时。

## 使用示例

提交表单时触发 `onCalculate` 处理程序。 使用 **calcresult** 部分更新带有标识符 `result`  的元素：

```html
<form data-request="onCalculate" data-request-update="calcresult: '#result'">
```

在发送请求之前单击 `删除` 按钮时请求确认：

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="确定删除么?">删除</button>
```

请求成功后重定向到另一个页面：

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

请求成功后显示一个弹出窗口：

```html
<form data-request="onLogin" data-request-success="alert('操作成功!')">
```

发送带有值 `update` 的 POST 参数 `mode` ：

```html
<form data-request="onUpdate" data-request-data="mode: 'update'">
```

跨多个元素发送值为 `7` 的 POST 参数 `id` ：

```html
<div data-request-data="id: 7">
    <button data-request="onDelete">删除</button>
    <button data-request="onSave">更新</button>
</div>
```

在请求中包含 [文件上传](../services/request-input.md#files)：

```html
<form data-request="onSubmit" data-request-files>
    <input type="file" name="photo" accept="image/*" />
    <button type="submit">提交上传</button>
</form>
```
