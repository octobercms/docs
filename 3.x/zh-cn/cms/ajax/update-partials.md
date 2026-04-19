---
subtitle: 了解更多关于动态更新内容的信息。
---
# 更新部件

当处理程序执行时，它可以准备在页面上更新的部件，通过推送或拉取方式，并且可以使用提供的变量进行渲染。

## 拉取部件更新

客户端浏览器在执行 AJAX 请求时可以请求从服务器更新部件，这被视为*拉取内容更新*。

使用 [`{% partial %}` 标签](../../markup/tag/partial.md)，以下代码在调用 `onRefreshTime` [事件处理程序](./handlers.md)时，在页面上的 `#myDiv` 元素内渲染 **mytime** 部件。

```twig
<div id="myDiv">
    {% partial 'mytime' %}
</div>
```

[数据属性 API](./attributes-api.md) 使用 `data-request-update` 属性。

```html
<!-- Attributes API -->
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: '#myDiv' }">
    Go
</button>
```

[JavaScript API](./javascript-api.md) 使用 `update` 配置选项：

```js
// JavaScript API
oc.request('#mybutton', 'onRefreshTime', {
    update: { mytime: '#myDiv' }
});
```

### 自更新部件

[`{% ajaxPartial %}` 标签](../../markup/tag/ajax-partial.md)专门用于渲染 AJAX 部件。

```twig
{% ajaxPartial 'mytime' %}
```

使用此标签时，内容会自动包装在容器中，因此您只需通过部件名称即可更新它。只需传递 `true` 值而非容器选择器即可。

```html
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: true }">
    Go
</button>
```

您也可以使用部件名称 `_self` 从部件自身内部更新自己。

```js
{ _self: true }
```

::: tip
请参阅 [AJAX 部件 Twig 标签文章](../../markup/tag/ajax-partial.md)了解更多关于 `{% ajaxPartial %}` 标签的信息。
:::

### 全局部件更新

在某些情况下，例如[闪存消息](../../cms/features/flash-messages.md)，您可能希望在每个响应中包含特定的部件更新。要将更新定义与每个 AJAX 请求合并，请在页面的 head 部分添加 `ajax-request-update` meta 标签，并将 content 属性设置为更新定义。

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
```

## 更新定义

应更新内容的定义以类似 JSON 的对象格式指定，其中：

- 左侧（键）是**部件名称**
- 右侧（值）是要更新的**目标元素**

以下内容将请求使用 **mypartial** 的内容更新 `#myDiv` 元素。

```js
{ mypartial: '#myDiv' }
```

::: tip
选择器必须以 `#` 或 `.` 字符开头才有效。
:::

多个部件用逗号分隔。

```js
{ firstpartial: '#myDiv', secondpartial: '#otherDiv' }
```

如果部件名称包含斜杠或连字符，则需要用引号将左侧括起来。

```js
{ 'folder/mypartial': '#myDiv', 'my-partial': '#myDiv' }
```

目标元素始终在右侧，因为在 JavaScript 中它也可以是 HTML 元素。

```js
{ 'folder/mypartial': document.getElementById('myDiv') }
```

### 追加和前置内容

如果选择器字符串前面加上 `@` 符号，从服务器接收到的内容将被追加到元素中，而不是替换现有内容。

如果选择器字符串前面加上 `^` 符号，内容将被前置。

```js
{ 'folder/append-partial': '@#myDiv' }

{ 'folder/prepend-partial': '^#myDiv' }
```

或者，您可以在目标元素上添加 `data-ajax-update-mode` 属性。

```html
<div id="myDiv" data-ajax-update-mode="append"></div>

<div id="myDiv" data-ajax-update-mode="prepend"></div>
```

### 使用自定义 HTML 选择器

如果选择器字符串以 `=` 符号开头，则可以使用任何自定义 HTML 选择器来定位元素。

```js
{ 'folder/append': '=[data-field-name="address"]' }
```

## 推送部件更新

相比之下，[AJAX 处理程序](./handlers.md)可以从服务器端向客户端浏览器推送内容更新。要推送更新，处理程序返回一个数组，其中键是要更新的 HTML 元素（使用简单的 CSS 选择器），值是要更新的内容。

::: aside
键名必须以标识符 `#` 或类 `.` 字符开头才能触发内容更新。
:::

以下示例将使用 **mypartial** 部件中的内容更新页面上 id 为 **myDiv** 的元素。`onRefreshTime` 处理程序调用 `renderPartial` 方法在 PHP 中渲染部件内容。

```php
function onRefreshTime()
{
    return [
        '#myDiv' => $this->renderPartial('mypartial')
    ];
}
```

## 向部件传递变量

根据执行上下文的不同，[AJAX 事件处理程序](./handlers.md)以不同的方式向部件提供变量。

- 在页面或布局的 [PHP 代码部分](../themes/themes.md)中使用 `$this[]`。
- 在[组件类](../themes/components.md)中使用 `$this->page[]`。
- 在[后端区域](../../extend/system/controllers.md)中使用 `$this->vars[]`。

以下示例将为每个上下文向部件提供 **result** 变量：

```php
// From page or layout PHP code section
$this['result'] = 'Hello world!';

// From a component class
$this->page['result'] = 'Hello world!';

// From a backend controller or widget
$this->vars['result'] = 'Hello world!';
```

然后可以在部件中使用 Twig 访问此值：

```twig
<!-- Hello world! -->
{{ result }}
```
