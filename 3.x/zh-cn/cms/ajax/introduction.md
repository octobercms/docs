---
subtitle: October CMS 附带了一个简单而精简的 AJAX 框架。
---
# 介绍

October CMS 包含一个 AJAX 框架，提供了一整套功能，允许您在不刷新浏览器的情况下从服务器加载数据。同样的库可以在 CMS 主题和管理面板的任何地方使用。

AJAX 框架有两种使用方式，您可以使用 [JavaScript API](./javascript-api.md) 或[数据属性 API](./attributes-api.md)。数据属性 API 不需要任何 JavaScript 知识即可在 October CMS 中使用 AJAX。

## 引入框架

::: aside
AJAX 框架在您的 CMS 主题中是可选的，您始终可以引入您偏好的框架来替代它。
:::

在处理您的 [CMS 主题](../../cms/themes/themes.md)时，使用该库就像用 Twig 标签引入它一样简单。将 `{% framework %}` 标签放置在页面或布局中的任意位置。这将添加一个对 October CMS 前端 JavaScript 库的引用，例如：

```twig
{% framework %}
```

### 额外功能

`{% framework %}` 标签支持一个可选的 **extras** 参数，该参数包含额外的样式表和 JavaScript 文件，用于实现额外功能，包括[表单验证](../features/validation.md)、[加载指示器](../features/loaders.md)和[闪存消息](../features/flash-messages.md)。

```twig
{% framework extras %}
```

您还可以添加 **turbo** 参数以在每个页面上启用 [Turbo 路由](./turbo-router.md)。

```twig
{% framework extras turbo %}
```

## AJAX 请求的工作原理

页面可以通过数据属性或使用 JavaScript 发起 AJAX 请求。每个请求都会调用服务器上的**事件处理程序**（也称为 [AJAX 处理程序](./handlers.md)），并且可以使用部件更新页面元素。AJAX 请求与表单配合使用效果最佳，因为表单数据会自动发送到服务器。以下是请求的工作流程：

1. 客户端浏览器通过提供处理程序名称和其他可选参数发起 AJAX 请求。
2. 服务器找到 [AJAX 处理程序](./handlers.md)并执行它。
3. 处理程序执行所需的业务逻辑，并通过注入页面变量来更新环境。
4. 服务器通过 `update` 选项[渲染客户端请求的部件](./update-partials.md)。
5. 服务器发送包含已渲染部件标记的响应。
6. 客户端框架使用从服务器接收到的部件数据更新页面元素。

## 使用示例

下面是一个简单的示例，使用数据属性 API 定义一个启用 AJAX 的表单。该表单将向 **onTest** 处理程序发起 AJAX 请求，并请求使用 **mypartial** 部件的标记更新结果容器。

::: tip
`value1` 和 `value2` 的表单数据会随 AJAX 请求自动发送。

```html
<!-- AJAX enabled form -->
<form data-request="onTest" data-request-update="{ mypartial: '#myDiv' }">

    <!-- Input two values -->
    <input name="value1"> + <input name="value2">

    <!-- Action button -->
    <button type="submit">Calculate</button>

</form>

<!-- Result container -->
<div id="myDiv"></div>
```
:::

**mypartial** 部件包含读取 `result` 变量的标记。

```twig
<p>The answer is {{ result }}</p>
```

**onTest** 处理程序方法使用 `input` [辅助方法](../../extend/services/helpers.md)访问表单数据，并将结果传递给 `result` 页面变量。

```php
function onTest()
{
    $this['result'] = input('value1') + input('value2');
}
```

该示例可以这样理解："当表单提交时，向 **onTest** 处理程序发起 AJAX 请求。当处理程序完成后，渲染 **mypartial** 部件并将其内容注入到 **#myDiv** 元素中。"

#### 另请参阅

::: also
* [JavaScript API](./javascript-api.md)
* [数据属性 API](./attributes-api.md)
:::
