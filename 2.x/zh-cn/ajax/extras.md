# 额外功能

使用 AJAX 框架时，您可以选择指定 **extras** 后缀，其中包括额外的 StyleSheet 和 JavaScript 文件。 在前端 CMS 页面中处理 AJAX 请求时，这些功能非常有用。

```twig
{% framework extras %}
```

## 加载指示器

您应该注意到的第一个功能是在 AJAX 请求运行时显示在页面顶部的加载指示器。 该指示器挂钩到 AJAX 框架使用的 [全局事件](../ajax/javascript-api.md#oc-global-ajax-events)。

当 AJAX 请求开始时，会触发 `ajaxPromise` 事件，显示指示器并将鼠标光标置于加载状态。 `ajaxFail` 和 `ajaxDone` 事件用于检测请求何时完成，指示器在何处再次隐藏。

## 表单验证

您可以在表单上指定 `data-request-validate` 属性以启用验证功能。

```html
<form
    data-request="onSubmit"
    data-request-validate>
    <!-- ... -->
</form>
```

### 抛出验证错误

在服务器端 AJAX 处理程序中，您可以使用 `ValidationException` 类抛出 [验证异常](../services/error-log.md#oc-validation-exception) 以使字段无效，其中第一个参数是一个数组。 该数组应使用字段名称作为键，并使用错误消息作为值。

```php
function onSubmit()
{
     throw new ValidationException(['name' => '你必须给一个名字！']);
}
```

> **注意**：您还可以将 [验证服务](../services/validation.md) 的实例作为异常的第一个参数传递。

### 显示错误信息

在表单内，您可以通过使用容器元素上的`data-validate-error`属性来显示第一条错误消息。 容器内的内容将设置为错误消息，并且元素将可见。

```html
<div data-validate-error></div>
```

要显示多个错误消息，请包含一个具有 `data-message` 属性的元素。 在此示例中，段落标记将被复制并设置为存在的每条消息的内容。

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

要在 AJAX 失效时添加自定义类，请连接到 `ajaxInvalidField` 和 `ajaxPromise` JS 事件。

```js
$(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).closest('.form-group').addClass('has-error');
});

$(document).on('ajaxPromise', '[data-request]', function() {
    $(this).closest('form').find('.form-group.has-error').removeClass('has-error');
});
```

### 用字段显示错误

或者，您可以通过定义使用 `data-validate-for` 属性的元素，将字段名称作为值传递来显示单个字段的验证消息。

```html
<!-- 输入字段 -->
<input name="phone" />

<!-- 字段的验证消息 -->
<div data-validate-for="phone"></div>
```

如果该元素为空，它将使用来自服务器的验证文本填充。 否则，您可以指定任何您喜欢的文本，它会被显示出来。

```html
<div data-validate-for="phone">
    糟糕.. 电话号码无效！
</div>
```

## 加载按钮

当任何元素包含 `data-attach-loading` 属性时，CSS 类 `oc-loading` 将在 AJAX 请求期间添加到其中。 这个类将使用`:after` CSS 选择器在按钮和锚元素上生成一个*加载旋转*。

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        提交
    </button>
</form>

<a
    href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do something
</a>
```

## 闪现消息(Flash)

在表单上指定 `data-request-flash` 属性，以启用对成功的 AJAX 请求使用闪现消息。

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

结合事件处理程序中`Flash` 门面的使用，请求完成后会出现一条闪现消息。

```php
function onSuccess()
{
    Flash::success('你做到了！');
}
```

为了与基于 AJAX 的闪现消息保持一致，您可以在页面加载时通过将此代码放置在页面或布局中来呈现 [标准闪现消息](../markup/tag-flash.md)。

```twig
{% flash %}
    <p
        data-control="flash-message"
        class="flash-message fade {{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```
## 用法示例

下面是一个完整的表单验证示例。 它调用触发加载提交按钮的`onDoSomething` 事件处理程序，对表单字段执行验证，然后显示成功的闪现消息。

```html
<form
    data-request="onDoSomething"
    data-request-validate
    data-request-flash>

    <div>
        <input name="name" />
        <span data-validate-for="name"></span>
    </div>

    <div>
        <input name="email" />
        <span data-validate-for="email"></span>
    </div>

    <button data-attach-loading>
        提交
    </button>

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

</form>
```

AJAX 事件处理程序查看客户端发送的 POST 数据并将一些规则应用于验证器。 如果验证失败，则抛出 `ValidationException`，否则返回 `Flash::success` 消息。

```php
function onDoSomething()
{
    $data = post();

    $rules = [
        'name' => 'required',
        'email' => 'required|email',
    ];

    $validation = Validator::make($data, $rules);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

    Flash::success('工作完成!');
}
```
