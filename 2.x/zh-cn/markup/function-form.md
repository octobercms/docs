# form()

以 `form_` 为前缀的函数执行处理表单时。 助手程序直接映射到`Form` PHP 类及其方法。 例如：

```twig
{{ form_close() }}
```

下面写法相等于上面：

```php
<?= Form::close() ?>
```

> **注意**: *驼峰命名* 中的方法应转换为 *蛇形命名*.

## form_open()

输出一个标准的 `<form>` 标签以及用于 CSRF 保护的 `_session_key` 和 `_token` 隐藏字段。如果您使用 [AJAX 框架](../ajax/introduction.md), 建议您改用 [`form_ajax()`](#oc-form-ajax) .

```twig
{{ form_open() }}
```

属性可以在第一个参数中传递。

```twig
{{ form_open({ class: 'form-horizontal' }) }}
```

上面的示例将输出如下:

```html
<form class="form-horizontal">
```

有一些特殊选项也可以与属性一起使用。

```twig
{{ form_open({ request: 'onUpdate' }) }}
```

该函数支持以下选项：

选项 | 描述
------------- | -------------
**method** | 请求方法。 对应 **method** FORM 标签属性。 例如: POST, GET, PUT, DELETE
**request** | 发布表单时在服务器上执行的处理程序名称。 有关事件处理程序的详细信息，请参阅 [处理表单](../cms/pages.md#oc-handling-forms)
**url** | 指定将表单发布到的 URL。 对应 **action** FORM 标签属性。
**files** | 确定表单是否将提交文件。 接受的值：**true** 和 **false**。
**model** |  表单模型绑定的模型对象

<a id="oc-form-ajax"></a>
## form_ajax()

输出一个启用 AJAX 的 FORM 开始标签。 `form_ajax()` 函数的第一个参数是 AJAX 处理程序名称。处理程序可以在布局或页面 [PHP部分](../cms/themes.md#oc-php-section) 代码中定义，也可以在组件中定义。Y您可以在[AJAX框架](../ajax/introduction.md) 文章中找到有关 AJAX 的更多信息。

```twig
{{ form_ajax('onUpdate') }}
```

属性可以在第二个参数中传递。

```twig
{{ form_ajax('onSave', { class: 'form-horizontal'}) }}
```

上面的示例将输出如下：

```html
<form data-request="onSave" class="form-horizontal">
```

有一些特殊选项也可以与属性一起使用。

```twig
{{ form_ajax('onDelete', { data: { id: 2 }, confirm: '真的要删除这条记录吗？' }) }}

{{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}
```

> **注意**: 当尝试使用 `__SELF__` 作为 `form_ajax()` 的参数来引用组件的别名时，您必须首先在调用本身之外构建您希望使用的字符串。 例子：

```twig
{% set targetPartial = "'" ~ __SELF__ ~ "::statistics': '#statsPanel'" %}
{{ form_ajax('onUpdate', { update: targetPartial }) }}
```

该函数支持以下选项：

选项 | 描述
------------- | -------------
**success** | 要在成功结果上执行的 JavaScript 字符串。
**error** | 对失败结果执行的 JavaScript 字符串
**confirm** |  在发送请求之前显示的确认消息。
**redirect** | 成功后，重定向到 URL。
**update** | 要在成功时更新的部件数组，格式如下：{ 'partial': '#element' }。
**data** | 要包含在请求中的额外数据，格式如下：{ 'myvar': 'myvalue' }。

## form_close()

输出一个标准的 FORM 结束标签。 此标签通常可用于提供一致性的使用。

```twig
{{ form_close() }}
```

上面的示例将输出如下：

```html
</form>
```

## 将属性传递给生成的元素

您可以通过传递要在最终生成的 `<form>` 元素上呈现的属性名称和值的数组来将其他属性传递给 `Form::open()` 方法。

```php
<?= Form::open(array('id' => 'example', 'class' => 'something')) ?>
    // ..
<?= Form::close() ?>
```
上面的示例将输出以下内容：

```html
<form method="POST" action="" accept-charset="UTF-8" id="example" class="something">

</form>
```
