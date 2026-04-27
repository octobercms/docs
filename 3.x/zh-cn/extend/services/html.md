# 表单与 HTML

## 介绍

October CMS 通过 `Html` 门面提供了各种有用的函数，适用于处理 HTML 和表单。虽然大多数示例使用 PHP 语言，但所有这些功能都可以通过简单的转换直接应用到 [Twig 标记](../../markup/templating.md)中。

```
// PHP
<?= Form::open(..) ?>

// Twig
{{ form_open(...) }}
```

如上所示，在 Twig 中，所有以 `form_` 为前缀的函数将直接绑定到 `Form` 门面，并使用 *snake_case* 访问方法。有关在前端使用表单助手的更多信息，请参阅[标记指南](../../markup/function/form.md)。

## 打开表单

表单可以使用 `Form::open` 方法打开，该方法接受一个属性数组作为第一个参数：

```php
<?= Form::open(['url' => 'foo/bar']) ?>
    //
<?= Form::close() ?>
```

默认情况下，将假定使用 `POST` 方法，但是你可以自由指定其他方法：

```php
Form::open(['url' => 'foo/bar', 'method' => 'put'])
```

::: tip
由于 HTML 表单仅支持 `POST` 和 `GET`，`PUT` 和 `DELETE` 方法将通过自动向表单添加 `_method` 隐藏字段来模拟。
:::

你也可以传入常规的 HTML 属性：

```php
Form::open(['url' => 'foo/bar', 'class' => 'pretty-form'])
```

如果你的表单要接受文件上传，请在数组中添加 `files` 选项：

```php
Form::open(['url' => 'foo/bar', 'files' => true])
```

你也可以打开指向页面或组件中处理方法的表单：

```php
Form::open(['request' => 'onSave'])
```

#### 启用 AJAX 的表单

同样，可以使用 `Form::ajax` 方法打开启用 AJAX 的表单，其中第一个参数是处理方法名称：

```php
Form::ajax('onSave')
```

`Form::ajax` 的第二个参数应包含属性：

```php
Form::ajax('onSave', ['confirm' => 'Are you sure?'])
```

你还可以将要更新的局部视图作为另一个数组传递：

```php
Form::ajax('onSave', ['update' => [
        'control-panel' => '#controlPanel',
        'layout/sidebar' => '#layoutSidebar'
    ]
])
```

::: tip
[AJAX 框架](../../cms/ajax/attributes-api.md)中的大多数 data 属性在此处都可用，只需去掉 `data-request-` 前缀。
:::

## 表单令牌

#### CSRF 保护

如果你已[启用保护](../../setup/configuration.md)，使用 `Form::open` 的 `POST`、`PUT` 或 `DELETE` 方法将自动向表单添加 CSRF 令牌作为隐藏字段。或者，如果你希望生成 CSRF 隐藏字段的 HTML，可以使用 `token` 方法：

```php
<?= Form::token() ?>
```

#### 延迟绑定会话密钥

用于[延迟绑定](../database/relations.md)的会话密钥将作为隐藏字段添加到每个表单中。如果你想手动生成此字段，可以使用 `sessionKey` 方法：

```php
<?= Form::sessionKey() ?>
```

## 表单模型绑定

#### 打开模型表单

你可能希望根据模型的内容填充表单。为此，请使用 `Form::model` 方法：

```php
<?= Form::model($user, ['id' => 'userForm']) ?>
```

现在，当你生成表单元素（如文本输入框）时，模型中与字段名称匹配的值将自动设置为字段值。例如，对于名为 `email` 的文本输入框，用户模型的 `email` 属性将被设置为值。如果 Session 闪存数据中有与输入名称匹配的项目，则该项目将优先于模型的值。优先级如下：

1. Session 闪存数据（旧输入）
2. 显式传递的值
3. 模型属性数据
4. 现有回发值

这允许你快速构建不仅绑定到模型值的表单，而且在服务器上出现验证错误时可以轻松重新填充。你可以使用 `Form::value` 手动访问这些值：

```php
<input type="text" name="name" value="<?= Form::value('name') ?>" />
```

你可以将默认值作为第二个参数传递：

```php
<?= Form::value('name', 'John Travolta') ?>
```

::: warning
使用 `Form::model` 时，请确保使用 `Form::close` 关闭表单！
:::

## 标签

#### 生成标签元素

```php
<?= Form::label('email', 'E-Mail Address') ?>
```

#### 指定额外的 HTML 属性

```php
<?= Form::label('email', 'E-Mail Address', ['class' => 'awesome']) ?>
```

::: tip
创建标签后，你创建的任何与标签名称匹配的表单元素将自动获得与标签名称匹配的 ID。
:::

## 文本字段

#### 生成文本输入框

```php
<?= Form::text('username') ?>
```

#### 指定默认值

```php
<?= Form::text('email', 'emailaddress@example.tld') ?>
```

::: tip
**hidden** 和 **textarea** 方法与 **text** 方法具有相同的签名。
:::

#### 生成密码输入框

```php
<?= Form::password('password') ?>
```

#### 生成其他输入框

```php
<?= Form::email($name, $value = null, $attributes = []) ?>
<?= Form::file($name, $attributes = []) ?>
```

## 复选框和单选按钮

#### 生成复选框或单选按钮输入

```php
<?= Form::checkbox('name', 'value') ?>

<?= Form::radio('name', 'value') ?>
```

#### 生成已选中的复选框或单选按钮输入

```php
<?= Form::checkbox('name', 'value', true) ?>

<?= Form::radio('name', 'value', true) ?>
```

## 数字

#### 生成数字输入框

```php
<?= Form::number('name', 'value') ?>
```

## 文件输入

#### 生成文件输入框

```php
<?= Form::file('image') ?>
```

> **注意**：表单必须使用 `files` 选项设置为 `true` 来打开。

## 下拉列表

#### 生成下拉列表

```php
<?= Form::select('size', ['L' => 'Large', 'S' => 'Small']) ?>
```

#### 生成带有选中默认值的下拉列表

```php
<?= Form::select('size', ['L' => 'Large', 'S' => 'Small'], 'S') ?>
```

#### 生成分组列表

```php
<?= Form::select('animal', [
    'Cats' => ['leopard' => 'Leopard'],
    'Dogs' => ['spaniel' => 'Spaniel'],
]) ?>
```

#### 生成带范围的下拉列表

```php
<?= Form::selectRange('number', 10, 20) ?>
```

#### 生成带范围、选中值和空白选项的下拉列表

```php
<?= Form::selectRange('number', 10, 20, 2, ['emptyOption' => 'Choose...']) ?>
```

#### 生成月份名称列表

```php
<?= Form::selectMonth('month') ?>
```

#### 生成带有选中值和空白选项的月份名称列表

```php
<?= Form::selectMonth('month', 2, ['emptyOption' => 'Choose month...']) ?>
```

## 按钮

#### 生成提交按钮

```php
<?= Form::submit('Click Me!') ?>
```

::: tip
需要创建按钮元素？试试 **button** 方法。它与 **submit** 具有相同的签名。
:::

## 自定义宏

#### 注册表单宏

很容易定义自己的自定义 Form 类助手，称为"宏"。以下是它的工作方式。首先，只需使用给定的名称和闭包注册宏：

```php
Form::macro('myField', function() {
    return '<input type="awesome">';
})
```

现在你可以使用其名称调用你的宏：

#### 调用自定义表单宏

```php
<?= Form::myField() ?>
```
