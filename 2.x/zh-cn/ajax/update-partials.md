# 更新部件

当处理程序执行时，它可以准备在页面上更新的部件，通过推送拉取，可以用一些提供的变量呈现。

## 拉取部件更新

客户端浏览器在执行 AJAX 请求时可能会请求从服务器更新部件内容，这被认为是*拉取内容更新*。 以下代码在调用 `onRefreshTime` [事件处理程序](../ajax/handlers.md) 后呈现页面上 `#myDiv` 元素内的 **mytime** 部分。

```twig
<div id="myDiv">{% partial 'mytime' %}</div>
```

[数据属性 API](../ajax/attributes-api.md) 使用 `data-request-update` 属性。

```html
<!-- Attributes API -->
<button
    data-request="onRefreshTime"
    data-request-update="mytime: '#myDiv'">
    Go
</button>
```

[JavaScript API](../ajax/javascript-api.md) 使用 `update` 配置选项：

```js
// JavaScript API
$.request('onRefreshTime', {
    update: { mytime: '#myDiv' }
});
```

### 更新定义

应更新内容的定义被指定为类似 JSON 的对象，其中：

- 左侧（键）是**部件名称**
- 右侧（值）是要更新的**目标元素**

以下将请求使用 **mypartial** 内容更新 `#myDiv` 元素。
```
mypartial: '#myDiv'
```

多个部件用逗号分隔。

```
firstpartial: '#myDiv', secondpartial: '#otherDiv'
```

如果部件名称包含斜杠或破折号，则“引用”左侧很重要。

```
'folder/mypartial': '#myDiv', 'my-partial': '#myDiv'
```

目标元素将始终位于右侧，因为它也可以是 JavaScript 中的 HTML 元素。

```
mypartial: document.getElementById('myDiv')
```

### 附加和前置内容

如果选择器字符串前面带有 `@` 符号，则从服务器接收到的内容将附加到元素中，而不是替换现有内容。

```
'folder/append': '@#myDiv'
```

如果选择器字符串前面带有`^` 符号，则内容将被添加到前面。

```
'folder/append': '^#myDiv'
```

## 推送部件更新

相比之下，[AJAX 处理程序](../ajax/handlers.md) 可以*将内容更新*从服务器端推送到客户端浏览器。 要推送更新，处理程序返回一个数组，其中键是要更新的 HTML 元素（使用简单的 CSS 选择器），值是要更新的内容。

下面的示例将使用在部件 **mypartial** 中找到的内容更新页面上具有 id **myDiv** 的元素。 `onRefreshTime` 处理程序调用 `renderPartial` 方法来渲染 PHP 中的部分内容。

```php
function onRefreshTime()
{
    return [
        '#myDiv' => $this->renderPartial('mypartial')
    ];
}
```

> **注意**：键名必须以标识符`#` 或类`.` 字符开头才能触发内容更新。

## 将变量传递给 部件

根据执行上下文，[AJAX 事件处理程序](../ajax/handlers.md) 使变量可用于不同部件。

- 在页面或布局 [PHP 部分](../cms/themes.md#php-section) 中使用 `$this[]`。
- 在 [组件类](../plugin/components.md#ajax-handlers) 中使用 `$this->page[]`。
- 在[后端区域](../backend/controllers-ajax#using-ajax-handlers)中使用`$this->vars[]`。

这些示例将为每个上下文的部分提供 **result** 变量：

```php
// 从页面或布局 PHP 代码部分
$this['result'] = 'Hello world!';

// 从组件类
$this->page['result'] = 'Hello world!';

// 从后端控制器或小部件
$this->vars['result'] = 'Hello world!';
```

然后可以在部分中使用 Twig 访问此值：

```twig
<!-- Hello world! -->
{{ result }}
```
