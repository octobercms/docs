---
subtitle: Twig 函数
---
# form()

以 `form_` 为前缀的函数执行处理表单时有用的任务。该辅助函数直接映射到 `Form` PHP 类及其方法。例如：

```twig
{{ form_close() }}
```

上述代码等同于以下 PHP 代码：

```php
<?= Form::close() ?>
```

> **注意**：*camelCase* 格式的方法名应转换为 *snake_case*。

## form_open()

输出标准的 `<form>` 开始标签以及用于 CSRF 保护的 `_session_key` 和 `_token` 隐藏字段。如果您使用 [AJAX 框架](../../cms/ajax/introduction.md)，建议改用 `form_ajax()`。

```twig
{{ form_open() }}
```

属性可以在第一个参数中传递。

```twig
{{ form_open({ class: 'form-horizontal' }) }}
```

上述示例将输出如下内容：

```html
<form class="form-horizontal">
```

还有一些特殊选项可以与属性一起使用。

```twig
{{ form_open({ request: 'onUpdate' }) }}
```

该函数支持以下选项：

选项 | 描述
------------- | -------------
**method** | 请求方法。对应 FORM 标签的 **method** 属性。例如：POST、GET、PUT、DELETE
**request** | 表单提交时在服务器上执行的处理程序名称。有关事件处理程序的详细信息，请参阅 [AJAX 处理程序](../../cms/ajax/handlers.md)文章。
**url** | 指定表单提交的 URL。对应 FORM 标签的 **action** 属性。
**files** | 确定表单是否将提交文件。接受的值：**true** 和 **false**。
**model** | 用于表单模型绑定的模型对象。

## form_ajax()

输出支持 AJAX 的 FORM 开始标签。`form_ajax()` 函数的第一个参数是 AJAX 处理程序名称。处理程序可以在布局或页面的 PHP 代码部分中定义，也可以在组件中定义。您可以在 [AJAX 框架](../ajax/introduction.md)文章中找到有关 AJAX 的更多信息。

```twig
{{ form_ajax('onUpdate') }}
```

属性可以在第二个参数中传递。

```twig
{{ form_ajax('onSave', { class: 'form-horizontal'}) }}
```

上述示例将输出如下内容：

```html
<form data-request="onSave" class="form-horizontal">
```

还有一些特殊选项可以与属性一起使用。

```twig
{{ form_ajax('onDelete', { data: { id: 2 }, confirm: 'Really delete this record?' }) }}

{{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}
```

> **注意**：当尝试使用 `__SELF__` 作为 `form_ajax()` 的参数来引用组件别名时，必须先在调用之外构建要使用的字符串。示例：

```twig
{% set targetPartial = "'" ~ __SELF__ ~ "::statistics': '#statsPanel'" %}
{{ form_ajax('onUpdate', { update: targetPartial }) }}
```

该函数支持以下选项：

选项 | 描述
------------- | -------------
**success** | 成功结果时执行的 JavaScript 字符串。
**error** | 失败结果时执行的 JavaScript 字符串。
**confirm** | 发送请求前显示的确认消息。
**redirect** | 成功结果时，重定向到一个 URL。
**update** | 成功时要更新的局部模板数组，格式如下：{ 'partial': '#element' }。
**data** | 请求中包含的额外数据，格式如下：{ 'myvar': 'myvalue' }。

## form_close()

输出标准的 FORM 关闭标签。此标签通常用于保持使用的一致性。

```twig
{{ form_close() }}
```

上述示例将输出如下内容：

```html
</form>
```

## 向生成的元素传递属性

您可以通过传递属性名称和值的数组，向 `Form::open()` 方法传递附加属性，这些属性将渲染在最终生成的 `<form>` 元素上。

```php
<?= Form::open(array('id' => 'example', 'class' => 'something')) ?>
    // ..
<?= Form::close() ?>
```

上述示例将输出如下内容：

```html
<form method="POST" action="" accept-charset="UTF-8" id="example" class="something">

</form>
```
