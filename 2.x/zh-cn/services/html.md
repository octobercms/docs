# 表单和 HTML

## 介绍

October CMS 通过 `Html` 助手提供了各种有用的功能，可用于处理 HTML 和表单。 虽然大多数示例将使用 PHP 语言，但所有这些功能通过简单的转换直接转换为 [Twig 标记](../markup.md)。

```
// PHP
<?= Form::open(..) ?>

// Twig
{{ form_open(...) }}
```

正如您在上面看到的，在 Twig 中，所有以 `form_` 为前缀的函数都将直接绑定到 `Form` 助手，并使用 *蛇形命名法* 提供对方法的访问。 有关在前端使用表单助手的信息，请参阅 [标记指南](../markup/function-form.md)。

## 打开表单

可以使用 `Form::open` 方法打开表单，该方法将属性数组作为第一个参数传递：

```php
<?= Form::open(['url' => 'foo/bar']) ?>
    //
<?= Form::close() ?>
```

默认情况下，将假定一个 `POST` 方法，但是，您可以自由指定其他方法：

```php
Form::open(['url' => 'foo/bar', 'method' => 'put'])
```

> **注意**：由于 HTML 表单仅支持 `POST` 和 `GET`，`PUT` 和 `DELETE` 方法将被自动添加一个 `_method` 隐藏字段到您的表单中。

你也可以传入常规的 HTML 属性：

```php
Form::open(['url' => 'foo/bar', 'class' => 'pretty-form'])
```

如果您的表单将接受文件上传，请在您的数组中添加一个 `files` 选项：

```php
Form::open(['url' => 'foo/bar', 'files' => true])
```

您还可以打开指向页面或组件中的处理程序方法的表单：

```php
Form::open(['request' => 'onSave'])
```

#### 启用 AJAX 的表单

同样，可以使用 `Form::ajax` 方法打开启用 AJAX 的表单，其中第一个参数是处理程序方法名称：

```php
Form::ajax('onSave')
```

`Form::ajax` 的第二个参数应该包含以下属性：

```php
Form::ajax('onSave', ['confirm' => '你确定吗?'])
```

您还可以将部件传递给update作为另一个数组：

```php
Form::ajax('onSave', ['update' => [
        'control-panel' => '#controlPanel',
        'layout/sidebar' => '#layoutSidebar'
    ]
])
```

> **注意**：大多数[来自 AJAX 框架的数据属性](../ajax/attributes-api.md) 都可以通过删除 `data-request-` 前缀在此处使用。

## 表单标记

#### CSRF 保护

如果您启用了 [CSRF保护](../setup/configuration.md#csrf-protection)，使用 `Form::open` 方法和 `POST`、`PUT` 或 `DELETE` 将自动添加一个 CSRF 令牌到 您的表单作为隐藏字段。 或者，如果您希望为隐藏的 CSRF 字段生成 HTML，您可以使用 `token` 方法：

```php
<?= Form::token() ?>
```

#### 延迟绑定会话密钥

用于 [延迟绑定](../database/relations.md#deferred-binding) 的会话密钥将作为隐藏字段添加到每个表单中。 如果你想手动生成这个字段，你可以使用 `sessionKey` 方法：

```php
<?= Form::sessionKey() ?>
```

## 表单模型绑定

#### 打开模型表单

您可能希望根据模型的内容填充表单。 为此，请使用 `Form::model` 方法：

```php
<?= Form::model($user, ['id' => 'userForm']) ?>
```

现在，当您生成表单元素时，例如文本输入，与字段名称匹配的模型值将自动设置为字段值。 例如，对于名为 `email` 的文本输入，用户模型的 `email` 属性将被设置为值。 如果Session闪存数据中有与输入名称匹配的项目，则该项目将优先于模型的值。 优先级如下所示：

1. Session闪存数据 (旧输入)
2. 显式传递值
3. 模型属性数据
4. 现有回发值

这使您可以快速构建不仅绑定到模型值的表单，而且如果服务器上出现验证错误，还可以轻松地重新填充。 您可以使用 `Form::value` 手动访问这些值：

```php
<input type="text" name="name" value="<?= Form::value('name') ?>" />
```

您可以传递一个默认值作为第二个参数：

```php
<?= Form::value('name', '武志伟') ?>
```

> **注意**：使用 `Form::model` 时，请务必使用 `Form::close` 关闭表单！

## 标签

#### 生成标签元素

```php
<?= Form::label('email', '电子邮件地址') ?>
```

#### 指定额外的 HTML 属性

```php
<?= Form::label('email', '电子邮件地址', ['class' => 'awesome']) ?>
```

> **注意**：创建标签后，您创建的任何名称与标签名称匹配的表单元素都将自动接收与标签名称匹配的 ID。

## 文本字段

#### 生成文本输入

```php
<?= Form::text('username') ?>
```

#### 指定默认值

```php
<?= Form::text('email', 'emailaddress@example.com') ?>
```

> **注意**：*hidden* 和 *textarea* 方法与 *text* 方法具有相同的特征。

#### 生成密码输入

```php
<?= Form::password('password') ?>
```

#### 生成其他输入

```php
<?= Form::email($name, $value = null, $attributes = []) ?>
<?= Form::file($name, $attributes = []) ?>
```

## 复选框和单选按钮

#### 生成复选框或单选输入

```php
<?= Form::checkbox('name', 'value') ?>

<?= Form::radio('name', 'value') ?>
```

#### 生成选中的复选框或单选输入

```php
<?= Form::checkbox('name', 'value', true) ?>

<?= Form::radio('name', 'value', true) ?>
```

## 数字

#### 生成数字输入

```php
<?= Form::number('name', 'value') ?>
```

## 文件输入

#### 生成文件输入

```php
<?= Form::file('image') ?>
```

> **注意**：必须在将 `files` 选项设置为 `true` 的情况下打开表单。

## 下拉列表

#### 生成下拉列表

```php
<?= Form::select('size', ['L' => '大的', 'S' => '小的']) ?>
```

#### 生成带有选定默认值的下拉列表

```php
<?= Form::select('size', ['L' => '大的', 'S' => '小的'], 'S') ?>
```

#### 生成分组列表

```php
<?= Form::select('animal', [
    'Cats' => ['leopard' => '豹子'],
    'Dogs' => ['spaniel' => '猎犬'],
]) ?>
```

#### 生成带有范围的下拉列表

```php
<?= Form::selectRange('number', 10, 20) ?>
```

#### 生成包含范围、选定值和空白选项的下拉列表

```php
<?= Form::selectRange('number', 10, 20, 2, ['emptyOption' => '选择...']) ?>
```

#### 生成带有月份名称的列表

```php
<?= Form::selectMonth('month') ?>
```

#### 生成包含月份名称、选定值和空白选项的列表

```php
<?= Form::selectMonth('month', 2, ['emptyOption' => '选择月份...']) ?>
```

## 按钮

#### 生成提交按钮

```php
<?= Form::submit('Click Me!') ?>
```

> **注意**：需要创建按钮元素吗？ 试试 *button* 方法。 它与 *submit* 具有相同的特征。

## 自定义宏

#### 注册一个表单宏

定义您自己的称为"宏"的自定义表单类助手很容易。 这是它的工作原理。 首先，只需使用给定名称和闭包注册宏：

```php
Form::macro('myField', function() {
    return '<input type="awesome">';
})
```

现在你可以使用它的名字来调用你的宏：

#### 调用自定义表单宏

```php
<?= Form::myField() ?>
```
