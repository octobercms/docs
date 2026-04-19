# 日志

默认情况下，October 被配置为为你的应用程序创建一个单独的日志文件，存储在 `storage/logs` 目录中。你可以使用 `Log` 门面将信息写入日志。

```php
$user = User::find(1);
Log::info('Showing user profile for user: '.$user->name);
```

日志记录器提供了 [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424) 中定义的八个日志级别：**emergency**、**alert**、**critical**、**error**、**warning**、**notice**、**info** 和 **debug**。

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

还可以将上下文数据数组传递给日志方法。此上下文数据将与日志消息一起格式化和显示：

```php
Log::info('User failed to login.', ['id' => $user->id]);
```

### 助手函数

有一些全局助手方法可使日志记录更加简便。`trace_log` 函数是 `Log::info` 的别名，支持使用数组和异常作为消息。

```php
// 写入字符串值
$val = 'Hello world';
trace_log('The value is '.$val);

// 转储数组值
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

`trace_sql` 函数启用数据库日志记录，调用后将记录发送到数据库的每个命令。这些记录仅出现在 `system.log` 文件中，不会出现在后台面板日志中，因为后台面板日志存储在数据库中，这会导致反馈循环。

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```
