# 错误和日志

当您第一次开始使用October CMS时，已经为您配置了错误和异常处理。 可以通过两种方式访问事件日志：

1.打开文件`storage/logs/system.log`可以在文件系统中查看事件日志。
1. 或者，可以通过管理区域导航到 *System[设置] > Logs[日志] > Event Log[事件日志]* 来查看它。

当显示错误页面和某些 [异常类型](#exception-types) 时，始终会创建日志条目。

## 配置

#### 错误详情

您的应用程序通过浏览器显示的错误详细信息的数量由 `config/app.php` 配置文件中的 `debug` 配置选项控制。 默认情况下，详细的错误报告是*打开*的，因此查看详细的错误信息对调试和解决问题很有帮助。 关闭此功能后，当页面出现问题时，将显示一般错误消息。

对于本地开发，您应该将 `debug` 值设置为 `true`。 在您的生产环境中，此值应始终为 `false`。

```php
/*
|--------------------------------------------------------------------------
| Application Debug Mode[应用程序调试模式]
|--------------------------------------------------------------------------
|
| When your application is in debug mode, detailed error messages with
| stack traces will be shown on every error that occurs within your
| application. If disabled, a simple generic error page is shown.
|
*/

'debug' => false,
```

#### 日志文件模式

October 支持 `single`、`daily`、`syslog` 和 `errorlog` 日志记录模式。 例如，如果您希望使用每日日志文件而不是单个文件，您只需在 `config/app.php` 配置文件中设置 `log` 值：

```php
'log' => 'daily'
```

## 可用的异常

October CMS 提供了几种预置好的基本异常类型。

### 应用程序异常

`October\Rain\Exception\ApplicationException` 类，别名为 `ApplicationException`，是在简单应用条件失败时使用的最常见异常类型。

```php
throw new ApplicationException('你必须先登录才能做到这一点！');
```

错误消息将被简化，并且永远不会包含任何敏感信息，如 php 文件和行号。

### 系统异常

`October\Rain\Exception\SystemException` 类，别名为 `SystemException`，用于对系统运行至关重要的错误并始终记录在案。

```php
throw new SystemException('无法联系邮件服务器 API');
```

抛出此异常时，会显示详细的错误消息，其中包含发生该异常的文件和行号。

### 验证异常

`October\Rain\Exception\ValidationException` 类，别名为 `ValidationException`，用于与表单提交和无效字段直接相关的错误。 该消息应包含一个包含字段和错误消息的数组。

```php
throw new ValidationException(['username' => '对不起，该用户名已被使用！']);
```

您还可以传递 [验证服务](validation.md) 的实例。

```php
$validation = Validator::make(...);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

当抛出此异常时，[AJAX 框架](../ajax/introduction.md) 将以可用格式提供此信息并聚焦第一个无效字段。

### AJAX 异常

`October\Rain\Exception\AjaxException` 类，别名为 `AjaxException`，被认为是"智能错误"，将返回 HTTP 代码 406。这允许它们像成功响应一样传递响应内容。

```php
throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);
```

当抛出此异常时，[AJAX 框架](../ajax/introduction.md) 将遵循标准错误工作流程，但也会刷新指定的部件。

## 异常处理

所有异常都由 `October\Rain\Foundation\Exception\Handler` 类处理。 此类包含两个方法：`report` 和 `render`，它们指示是否应记录错误以及如何响应错误。

但是，如果需要，您可以使用 `App::error` 方法指定自定义处理程序。 处理程序是根据它们处理的异常的类型提示来调用的。 例如，您可以创建一个只处理 `RuntimeException` 实例的处理程序：

```php
App::error(function(RuntimeException $exception) {
    // 处理异常...
});
```

如果异常处理程序返回响应，则该响应将被发送到浏览器，并且不会调用其他错误处理程序：

```php
App::error(function(InvalidUserException $exception) {
    return '对不起！ 此帐户有问题！';
});
```

要侦听 PHP 致命错误，您可以使用 `App::fatal` 方法：

```php
App::fatal(function($exception) {
    //
});
```

如果您有多个异常处理程序，则应按从最通用到最具体的顺序定义它们。因此，例如，处理`Exception`类型的所有异常处理程序应该在自定义异常类型（如`SystemException`）之前定义。

### 错误处理程序的放置位置

错误处理程序注册，如 [事件处理程序](events.md)，通常属于`引导代码`类别。换句话说，它们让你的应用程序准备好实际处理请求，并且通常需要在实际调用路由或控制器之前执行。最常见的地方是[插件注册文件](../plugin/registration.md#oc-registration-methods)的`boot`方法。或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来注册错误处理程序。

## HTTP 异常

一些例外情况描述了来自服务器的 HTTP 错误代码。例如，这可能是`找不到页面错误(404)`、`未经授权的错误(401)` 甚至是开发人员生成的 500 错误。为了从应用程序中的任何位置生成这样的响应，请使用以下命令：

```php
App::abort(404);
```

`abort` 方法将立即引发一个异常，该异常将由异常处理程序呈现。 或者，您可以提供响应文本：

```php
App::abort(403, '未经授权的行为。');
```

该方法可以在请求生命周期的任何时候使用。

### 自定义错误页面

默认情况下，任何错误都会显示一个详细的错误页面，其中包含发生错误的文件内容、行号和堆栈跟踪。 您可以通过在 `config/app.php` 脚本中将配置值 `debug` 设置为 **false** 并使用 URL `/error` 创建一个页面来显示自定义错误页面。

## 日志记录

默认情况下，October 配置为为您的应用程序创建一个日志文件，该文件存储在 `storage/logs` 目录中。 您可以使用 `Log` 门面将信息写入日志：

```php
$user = User::find(1);
Log::info('显示用户的用户资料: '.$user->name);
```

记录器提供 [RFC 5424](http://tools.ietf.org/html/rfc5424) 中定义的八个记录级别： **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** 和 **debug**。

```php
Log::emergency($error);
Log::alert($error);
Log::critical($error);
Log::error($error);
Log::warning($error);
Log::notice($error);
Log::info($error);
Log::debug($error);
```

#### 上下文信息

一组上下文数据也可以传递给日志方法。 此上下文数据将被格式化并与日志消息一起显示：

```php
Log::info('用户登录失败。', ['id' => $user->id]);
```

### 助手函数

有一些全局助手方法可用于简化日志记录。 `trace_log` 函数是 `Log::info` 的别名，支持使用数组和异常作为消息。

```php
// 写入字符串值
$val = 'Hello world';
trace_log('值为 '.$val);

// 转储一个数组值
$val = ['Some', 'array', 'data'];
trace_log($val);

// 跟踪异常
try {
    //
}
catch (Exception $ex) {
    trace_log($ex);
}
```

`trace_sql` 函数启用数据库日志记录，调用时它将记录发送到数据库的每个命令。 这些记录仅出现在 `system.log` 文件中，不会出现在管理区域日志中，因为它存储在数据库中，会导致反馈循环。

```php
trace_sql();

Db::table('users')->count();

// 从用户中选择 count(*) 作为聚合
```
