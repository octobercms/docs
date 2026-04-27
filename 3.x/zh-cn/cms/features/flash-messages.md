---
subtitle: 显示关于请求结果的消息。
---
# 闪存消息

闪存消息是一种方便的方式，用于告知用户请求的结果，无论是成功还是失败。只需使用 `Flash` 门面在请求完成后显示消息。闪存消息通常设置在 [AJAX 处理程序](../ajax/handlers.md) 内、[组件逻辑](../../extend/cms-components.md) 内，或页面或布局的 [PHP 部分](../themes/themes.md) 内。

```php
function onSave()
{
    // Sets a successful message
    Flash::success('Settings successfully saved!');

    // Sets an error message
    Flash::error('Something went wrong...');

    // Sets a warning message
    Flash::warning('Please confirm your email address soon');

    // Sets an informative message
    Flash::info('The export is still processing. Please try again in a minute.');
}
```

闪存消息将在 3 秒间隔后消失。点击闪存消息将阻止其消失。

## 内置闪存消息

AJAX 框架内置了对闪存消息的支持，只需在表单上指定 `data-request-flash` 属性即可在已完成的 AJAX 请求上启用闪存消息。

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

为确保在浏览器重定向时也能显示闪存消息，你应该在页面加载时渲染[内联闪存消息](../../markup/tag/flash.md)，方法是将以下代码放在你的页面或布局中。

```twig
{% flash %}
    <p
        data-control="flash-message"
        data-type="{{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

要仅显示特定类型的闪存消息，你可以将值传递给属性 &mdash; **success**、**error**、**info**、**warning** 或 **validate**。多个值用逗号分隔。

```html
<form data-request-flash="success,warning"></form>
```

当 `data-request-flash` 属性与[验证功能](./validation.md)结合使用时，验证错误会优先显示并抑制闪存消息。要同时显示两者，请在属性中包含 **validate** 类型。

```html
<form
    data-request-validate
    data-request-flash="success,error,validate">
```

### 加载闪存消息

`data-request-message` 属性可用于在请求运行时显示闪存进度消息。这对于长时间运行的过程特别有用。

```html
<button
    data-request="onSubmit"
    data-request-message="Please wait while we process your request...">
    Submit
</button>
```

### 自定义闪存消息样式

要更改闪存消息的外观，请使用 `.oc-flash-message` CSS 类作为目标。

```css
.oc-flash-message.success {
    background: green;
}
.oc-flash-message.error {
    background: red;
}
.oc-flash-message.warning {
    background: orange;
}
.oc-flash-message.info {
    background: aqua;
}
.oc-flash-message.loading {
    background: aqua;
}
```

## 自定义闪存消息

::: aside
查看[闪存 Twig 标签文章](../../markup/tag/flash.md)了解更多关于 `{% flash %}` 标签的信息。
:::

要显示内联闪存消息或完全更改默认闪存消息标记，请在你的主题中创建一个包含自定义内容的新部件。例如，创建一个名为 **flash-messages.htm** 的新部件并粘贴以下内容。

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

接下来，使用 `{% ajaxPartial %}` 标签将该部件作为[自更新部件](../../markup/tag/ajax-partial.md)包含在你的表单中。在 `data-request-update` 中引用部件名称将自动更新此部件并禁用内置的闪存消息。

```twig
<form>
    {% ajaxPartial 'flash-messages' %}

    <label>Title</label>
    <input name="title" />

    <button
        data-request="onSave"
        data-request-update="{ flash-messages: true }">
        Save
    </button>
</form>
```

或者，你可以将部件包含在布局中，并全局更新它，而不是在每个元素上添加 `data-request-flash`。在页面的 head 部分添加 `ajax-request-update` meta 标签，并将 content 属性设置为[全局更新部件](../ajax/update-partials.md)。

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
<body>
    <!-- Updates with every AJAX request -->
    {% ajaxPartial 'flash-messages' %}
</body>
```

## 使用 JavaScript

使用 `oc.flashMsg` 函数通过 JavaScript 显示闪存消息。类型可以指定为 `success`、`error` 或 `warning`。可以指定一个可选的 `interval` 来控制闪存消息显示的时长（以秒为单位）。

```js
oc.flashMsg({
    message: 'Record has been successfully saved. This message will disappear in 1 second.',
    type: 'success',
    interval: 1
});
```

#### 参见

::: also
* [闪存 Twig 标签](../../markup/tag/flash.md)
:::
