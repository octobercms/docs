---
subtitle: 使用 AJAX 框架验证表单提交。
---
# 验证

表单验证根据一组预定义规则检查用户输入。使用 [AJAX 框架](../ajax/introduction.md) 时，表单验证无需任何特殊配置即可工作，无效字段将被聚焦并显示错误消息（通常以弹窗形式显示）。

## 闪存验证

对于基本验证，在 HTML 表单标签上包含 [`data-request-flash` 属性](./flash-messages.md) 可提供简洁的界面来显示验证消息，通常足以满足大多数场景的需求。

```html
<form data-request="onSubmit" data-request-flash>
    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

在你的 [AJAX 处理程序](../ajax/handlers.md) 中，你可以使用 `ValidationException` 类抛出一个[验证异常](../../extend/system/exceptions.md)来使字段无效。提供的数组（第一个参数）应使用字段名称作为键，错误消息作为值。

```php
function onSubmit()
{
    if (!post('name')) {
        throw new ValidationException(['name' => 'You must give a name!']);
    }
}
```

当 AJAX 框架遇到 `ValidationException` 时，它会自动聚焦第一个无效字段并显示错误消息（如果已配置）。

## 内联验证

为了获得更全面的验证体验，可以通过在 HTML 表单标签上包含 `data-request-validate` 属性来启用内联验证。以下是使用此方法进行表单验证的最小示例，错误消息显示在表单内。

```html
<form data-request="onSubmit" data-request-validate>
    <div class="alert alert-danger" data-validate-error>
        <!-- Validation Message -->
    </div>

    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

### 验证单个字段

在某些情况下，你可能希望在值更改时验证单个字段。通过将 `data-track-input` 属性与 `data-request` 属性一起使用，AJAX 框架将在用户输入内容时提交请求。

```html
<form data-request-validate>
    <div>
        <label>Username</label>
        <input name="username" data-request="onCheckUsername" data-track-input />
    </div>
</form>
```

可以使用专用的 AJAX 处理程序来验证该字段。如果没有抛出异常，则可以认为该字段是有效的。

```php
function onCheckUsername()
{
    if (true) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

## 使用验证服务

::: aside
查看[验证文章](../../extend/services/validation.md)了解此处可用的不同规则。
:::

对于更复杂的验证，你可以使用 `Request` 门面批量对用户输入应用规则。`validate` 方法使用指定的规则（第一个参数）执行验证，并以数组形式返回已验证的属性和值。如果验证失败，它还会抛出 `ValidationException`。

```php
function onSubmit()
{
    $data = Request::validate([
        'name' => 'required',
        'email' => 'required|email',
    ]);

    // The code will not reach here if validation fails

    Flash::success('Jobs done!');
}
```

### 自定义错误消息和属性

要更改默认验证消息，你可以将自定义消息传递给 `validate` 方法。消息数组中的键（第三个参数）遵循 `attribute.rule` 格式。

```php
$messages = [
    'email.required' => 'Please type something for the email...',
    'email.email' => 'That email is not an email...!'
];

$data = Request::validate($rules, $messages);
```

如果你想保留默认验证消息，只更改使用的 `:attribute` 名称，请将自定义属性作为数组（第四个参数）传递。

```php
$attributeNames = [
    'email' => 'e-mail address'
];

$data = Request::validate($rules, [], $attributeNames);
```

## 显示错误消息

在表单内部，你可以通过在容器元素上使用 `data-validate-error` 属性来显示第一条错误消息。容器内的内容将被设置为错误消息，并且该元素将变为可见。

```html
<div data-validate-error></div>
```

要显示多条错误消息，请包含一个带有 `data-message` 属性的元素。在此示例中，段落标签将被复制，并为每条存在的消息设置内容。

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

### 在字段旁显示错误

如果你更喜欢为各个字段显示验证消息，请定义一个使用 `data-validate-for` 属性的元素，并将字段名称作为值传递。

```html
<!-- Input field -->
<input name="phone" />

<!-- Validation message for the field -->
<div data-validate-for="phone"></div>
```

如果该元素留空，它将填充来自服务器的验证文本。否则，你可以指定任何你喜欢的文本，它将被显示出来。

```html
<div data-validate-for="phone">
    Oops.. phone number is invalid!
</div>
```

### 使用闪存消息显示错误

当 `data-request-validate` 属性与 [`data-request-flash` 属性](./flash-messages.md) 结合使用时，验证错误会优先显示并抑制闪存消息。要同时显示两者，请将属性设置为通配符（`*`）以显示所有闪存消息类型，包括验证。

```html
<form
    data-request-validate
    data-request-flash="*">
```

## 使用 JavaScript

要为错误消息实现自定义功能，请挂接到 `ajax:invalid-field` 事件以显示字段，并挂接 `ajax:promise` 以在新提交时重置表单。所使用的 JavaScript 事件可在 [AJAX JavaScript API](../ajax/javascript-api.md) 中找到。

```js
addEventListener('ajax:invalid-field', function(event) {
    const { element, fieldName, errorMsg, isFirst } = event.detail;
    element.classList.add('has-error');
});

addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('.has-error').forEach(function(el) {
        el.classList.remove('has-error');
    });
});
```

## 完整使用示例

下面是表单验证的完整示例。它调用 `onSubmitForm` 事件处理程序，触发加载提交按钮，对表单字段执行验证，然后显示成功的闪存消息。

`data-request-flash` 属性用于为成功消息[启用闪存消息](./flash-messages.md)并显示验证消息。`data-attach-loading` 属性用于显示[加载指示器](./loaders.md)并防止误点击导致的重复提交。

```html
<form
    data-request="onSubmitForm"
    data-request-validate
    data-request-flash>
    <div>
        <label>Username</label>
        <input name="username"
            data-request="onCheckUsername"
            data-track-input
            data-attach-loading />
        <span data-validate-for="username"></span>
    </div>

    <div>
        <label>Email</label>
        <input name="email" />
        <span data-validate-for="email"></span>
    </div>

    <button data-attach-loading>
        Submit
    </button>

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>
</form>
```

`onSubmitForm` AJAX 事件处理程序查看客户端发送的 POST 数据，并向验证器应用一些规则。如果验证失败，将抛出 `ValidationException`，否则返回 `Flash::success` 消息。

`onCheckUsername` 检查用户名是否可用，目前硬编码为阻止输入 **admin** 和 **jeff** 这两个名称。它被检查两次，一次是用户输入内容时，另一次是用户提交表单时。

```php
function onSubmitForm()
{
    $data = Request::validate([
        'username' => 'required',
        'email' => 'required|email',
    ]);

    $this->onCheckUsername();

    Flash::success('Jobs done!');
}

function onCheckUsername()
{
    $username = strtolower(trim(post('username')));
    $isTaken = in_array($username, ['admin', 'jeff']);

    if ($isTaken) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

#### 参见

::: also
* [验证服务](../../extend/services/validation.md)
* [验证 trait](../../extend/database/traits.md)
:::
