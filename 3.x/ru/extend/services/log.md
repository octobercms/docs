# Логирование

По умолчанию October настроен на создание одного лог-файла для вашего приложения, который хранится в директории `storage/logs`. Вы можете записывать информацию в логи с помощью фасада `Log`.

```php
$user = User::find(1);
Log::info('Showing user profile for user: '.$user->name);
```

Логгер предоставляет восемь уровней логирования, определённых в [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424): **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** и **debug**.

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

#### Контекстная информация

Массив контекстных данных также может быть передан в методы логирования. Эти контекстные данные будут отформатированы и отображены вместе с сообщением лога:

```php
Log::info('User failed to login.', ['id' => $user->id]);
```

### Вспомогательные функции

Существуют некоторые глобальные вспомогательные методы, упрощающие логирование. Функция `trace_log` является псевдонимом для `Log::info` с поддержкой использования массивов и исключений в качестве сообщения.

```php
// Write a string value
$val = 'Hello world';
trace_log('The value is '.$val);

// Dump an array value
$val = ['Some', 'array', 'data'];
trace_log($val);

// Trace an exception
try {
    //
}
catch (Exception $ex) {
    trace_log($ex);
}
```

Функция `trace_sql` включает логирование базы данных; при вызове она будет записывать каждую команду, отправленную в базу данных. Эти записи отображаются только в файле `system.log` и не будут отображаться в журнале панели управления, так как он хранится в базе данных, что привело бы к циклу обратной связи.

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```
