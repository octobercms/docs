---
subtitle: October CMS 开箱即用地提供了几种基本的异常类型。
---
# 可用异常

### 应用异常

`October\Rain\Exception\ApplicationException` 类，别名为 `ApplicationException`，是最常见的异常类型，用于简单的应用条件失败时。

```php
throw new ApplicationException('You must be logged in to do that!');
```

错误消息将被简化，并且永远不会包含任何敏感信息，如 PHP 文件和行号。

### 系统异常

`October\Rain\Exception\SystemException` 类，别名为 `SystemException`，用于对系统运行至关重要的错误，并且始终会被记录。

```php
throw new SystemException('Unable to contact the mail server API');
```

当抛出此异常时，将显示详细的错误消息，包括发生错误的文件和行号。

### 未找到异常

`October\Rain\Exception\NotFoundException` 类，别名为 `NotFoundException`，用于遇到缺少记录时的错误。

```php
throw new NotFoundException('Record not found');
```

当抛出此异常时，标准响应将更改为显示最近的未找到页面，并添加 404 状态码。

### 验证异常

`October\Rain\Exception\ValidationException` 类，别名为 `ValidationException`，用于与表单提交和无效字段直接相关的错误。消息应包含一个包含字段和错误消息的数组。

```php
throw new ValidationException(['username' => 'Sorry that username is already taken!']);
```

你也可以传递一个[验证服务](../services/validation.md)的实例。

```php
$validation = Validator::make(...);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

当抛出此异常时，[AJAX 框架](./ajax.md)将以可用格式提供此信息，并聚焦到第一个无效字段。

### AJAX 异常

`October\Rain\Exception\AjaxException` 类，别名为 `AjaxException`，被视为"智能错误"，将返回 HTTP 代码 406。这使得它们可以像成功响应一样传递响应内容。

```php
throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);
```

当抛出此异常时，[AJAX 框架](./ajax.md)将遵循标准错误工作流程，但也会刷新指定的局部视图。

## 异常处理

所有异常由 `October\Rain\Foundation\Exception\Handler` 类处理。此类包含两个方法：`report` 和 `render`，它们决定错误是否应被记录以及如何响应错误。

但是，如果需要，你可以使用 `App::error` 方法指定自定义处理程序。处理程序根据它们处理的异常的类型提示进行调用。例如，你可以创建一个仅处理 `RuntimeException` 实例的处理程序：

```php
App::error(function(RuntimeException $exception) {
    // Handle the exception...
});
```

如果异常处理程序返回一个响应，该响应将发送到浏览器，不会调用其他错误处理程序。

```php
App::error(function(InvalidUserException $exception) {
    return 'Sorry! Something is wrong with this account!';
});
```

要监听 PHP 致命错误，你可以检查 Error 异常类型：

```php
App::error(function(Error $exception) {
    //
});
```

如果你有多个异常处理程序，应按从最通用到最具体的顺序定义。因此，例如，处理所有 `Exception` 类型异常的处理程序应在自定义异常类型（如 `SystemException`）之前定义。

### 错误处理程序的放置位置

错误处理程序注册通常属于引导代码的范畴。换句话说，它们为你的应用程序准备好实际处理请求，通常需要在路由或控制器被实际调用之前执行。最常见的位置是[插件注册文件](../extending.md)的 `boot` 方法。或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，你可以用它来放置错误处理程序注册。

## HTTP 异常

某些异常描述来自服务器的 HTTP 错误代码。例如，这可能是"页面未找到"错误（404）、"未授权错误"（401）或甚至是开发者生成的 500 错误。为了从应用程序的任何位置生成此类响应，使用以下方法。

```php
App::abort(404);
```

`abort` 方法将立即引发一个异常，该异常将由异常处理程序渲染。你可以选择性地提供响应文本。

```php
App::abort(403, 'Unauthorized action.');
```

此方法可以在请求生命周期的任何时候使用。还有一个配套的[用于中止请求的 Twig 过滤器](../../markup/function/abort.md)。

### 自定义错误页面

默认情况下，任何错误都将显示一个详细的错误页面，包含发生错误的文件内容、行号和堆栈跟踪。你可以通过在 `config/app.php` 脚本中将配置值 `debug` 设置为 **false** 并创建一个 URL 为 `/error` 的页面来显示自定义错误页面。
