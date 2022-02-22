# 简介

October CMS 包含一个框架，该框架带来了一整套AJAX功能，允许您从服务器加载数据而无需刷新浏览器页面。相同的库可用于[CMS 主题](../cms/themes.md) 和 [后端管理区域](../backend/controllers-ajax#oc-using-ajax-handlers)的任何地方.

AJAX 框架有两种风格，你可以使用 [JavaScript API](../ajax/javascript-api.md) 或 [数据属性 API](../ajax/attributes-api.md)。数据属性 API 不需要任何 JavaScript 知识即可在 October使用 AJAX。

<a id="oc-including-the-framework"></a>
## 包含框架

AJAX 框架在您的 [CMS 主题](../cms/themes.md)，要使用该库，您应该通过将"{% framework %}"标记放在 [页面](../cms/pages.md) 或 [布局](../cms/layouts.md)。这添加了对 October前端 JavaScript 库的引用。该库需要jQuery，因此应首先加载它，例如：

```twig
<script src="{{ 'assets/javascript/jquery.js'|theme }}"></script>

{% framework %}
```

`{% framework %}` 标签支持可选的 **extras** 参数。 如果指定了此参数，该标签会为 [额外功能](../ajax/extras.md) 添加样式表和 JavaScript 文件，包括表单验证和加载指示符。

```twig
{% framework extras %}
```

## AJAX 请求如何工作

页面可以通过数据属性提示或使用 JavaScript 发出 AJAX 请求。每个请求都会调用服务器上的 **事件处理程序** —— 也称为 [AJAX 处理程序](../ajax/handlers.md) —— 并且可以使用部件更新页面元素。 AJAX 请求最适合表单，因为表单数据会自动发送到服务器。这是请求工作流程：

1. 客户端浏览器通过提供处理程序名称和其他可选参数发出 AJAX 请求。
2. 服务器找到[AJAX handler](../ajax/handlers.md)并执行。
3. 处理程序执行所需的业务逻辑并通过注入页面变量更新环境。
4. 客户端使用`update`选项请求服务器的[呈现部分](../ajax/update-partials.md)。
5. 服务器发送响应，其中包含呈现部件标记。
6. 客户端框架使用从服务器接收部件数据更新页面元素。

> **注意**：根据页面上下文，将呈现 [CMS 部件](../cms/partials.md) 或 [后端部件](../backend/views-partials.md) 视图。

## 用法示例

下面是一个简单的例子，它使用数据属性 API 来定义一个支持 AJAX 的表单。该表单将向 **onTest** 处理程序发出 AJAX 请求，并请求使用 **mypartial** 部件标记更新结果容器。

```html
<!-- AJAX enabled form -->
<form data-request="onTest" data-request-update="mypartial: '#myDiv'">

    <!-- 输入两个值 -->
    <input name="value1"> + <input name="value2">

    <!-- Action button -->
    <button type="submit">计算</button>

</form>

<!-- 结果容器 -->
<div id="myDiv"></div>
```
> **注意**：`value1` 和 `value2` 的表单数据会随 AJAX 请求自动发送。

**mypartial** 部件包含读取 `result` 变量的标记。

```twig
结果是 {{ result }}
```

**onTest** 处理程序方法使用 `input` [助手方法](../services/helper.md#oc-method-input) 访问表单数据，并将结果传递给 `result` 页面变量。

```php
函数 onTest()
{
     $this->page['result'] = input('value1') + input('value2');
}
```

该示例可以这样读：“提交表单时，向 **onTest** 处理程序发出 AJAX 请求。处理程序完成后，呈现 **mypartial** 部件并将其内容注入 **#myDiv** 元素。”