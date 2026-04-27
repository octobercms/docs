---
subtitle: Создавайте собственные команды, работающие в консоли.
---
# Создание консольных команд

Для создания собственных команд для работы с вашим приложением размещайте их в директории **console** плагина. Вы можете сгенерировать файл класса с помощью инструмента скаффолдинга командной строки. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя команды.

```bash
php artisan create:command Acme.Blog MyCommand
```

## Создание команды

Если вы хотите создать консольную команду `acme:mycommand`, вы можете создать соответствующий класс в файле **plugins/acme/blog/console/MyCommand.php** и вставить следующее содержимое для начала:

```php
namespace Acme\Blog\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class MyCommand extends Command
{
    /**
     * @var string signature for the console command.
     */
    protected $signature = 'acme:mycommand {user}';

    /**
     * @var string description for the console command.
     */
    protected $description = 'Does something cool.';

    /**
     * handle executes the console command.
     */
    public function handle()
    {
        $username = $this->argument('user');

        $this->output->writeln("Hello {$username}!");
    }
}
```

После создания класса необходимо заполнить свойства `signature` и `description`, которые будут использоваться при отображении вашей команды на экране `list`.

Метод `handle` будет вызван при выполнении вашей команды. Вы можете поместить любую логику команды в этот метод.

### Определение аргументов

Все предоставленные пользователем аргументы и опции заключаются в фигурные скобки в сигнатуре. В следующем примере команда определяет один обязательный аргумент: user:

Аргументы определяются в сигнатуре как обёрнутые фигурные скобки, где вы можете определить любые аргументы, принимаемые вашей командой. Например:

```php
protected $signature = 'mail:send {user}';
```

Вы также можете сделать аргументы необязательными, поставив знак вопроса (`?`) после имени аргумента.

```php
protected $signature = 'mail:send {user?}';
```

Альтернативно можно задать значение по умолчанию знаком равенства (`=`), за которым следует значение по умолчанию.

```php
protected $signature = 'mail:send {user=foo}';
```

### Определение опций

Опции, как и аргументы, являются ещё одной формой пользовательского ввода и определяются двумя дефисами (`--`) в сигнатуре. Опции могут опционально принимать значение; без значения они служат логическим переключателем. Например, переключатель с именем **queue**.

```php
protected $signature = 'mail:send {user} {--queue}';
```

В этом примере переключатель `--queue` может быть указан при вызове команды. Если переключатель `--queue` передан, значение опции будет `true`. В противном случае значение будет `false`.

```bash
php artisan mail:send 1 --queue
```

Когда опция ожидает значение, следует добавить знак равенства (`=`) после имени ввода.

```php
protected $signature = 'mail:send {user} {--queue=}';
```

В этом случае опция может принимать значение, иначе значение будет `null`.

```bash
php artisan mail:send 1 --queue=default
```

Вы также можете указать значение по умолчанию знаком равенства (`=`), за которым следует значение по умолчанию.

```php
protected $signature = 'mail:send {user} {--queue=default}';
```

Сокращения — это более короткий синтаксис для вызова опции.

```php
protected $signature = 'mail:send {user} {--Q|queue}';
```

Существует важное различие при вызове сокращения. Оно должно начинаться с одного дефиса (`-`), и знак равенства не используется для передачи значения.

```bash
php artisan mail:send 1 -Qdefault
```

### Получение ввода

Во время выполнения команды вам очевидно потребуется доступ к значениям аргументов и опций, принимаемых вашим приложением. Для этого используйте методы `argument` и `option`.

Передайте имя методу `argument` для получения значения аргумента команды.

```php
$value = $this->argument('name');
```

Без имени будут получены все аргументы.

```php
$arguments = $this->argument();
```

Передача имени методу `option` получит значение опции команды.

```php
$value = $this->option('name');
```

Без имени будут получены все опции.

```php
$options = $this->option();
```

### Запись вывода

Для отправки вывода в консоль используйте методы `info`, `comment`, `question` и `error`. Каждый из этих методов будет использовать соответствующие цвета ANSI для своего назначения.

Метод `info` отправляет информацию пользователю.

```php
$this->info('Display this on the screen');
```

Метод `error` используется для отправки сообщения об ошибке.

```php
$this->error('Something went wrong!');
```

Вы также можете использовать методы `ask` и `confirm` для запроса ввода от пользователя.

```php
$name = $this->ask('What is your name?');
```

Метод `secret` используется для запроса секретного ввода от пользователя.

```php
$password = $this->secret('What is the password?');
```

Метод `confirm` запрашивает у пользователя подтверждение и возвращает `true`, если пользователь соглашается.

```php
if ($this->confirm('Do you wish to continue? [yes|no]')) {
    //
}
```

Вы также можете указать значение по умолчанию для метода `confirm`, которое должно быть `true` или `false`.

```php
$this->confirm($question, true);
```

## Регистрация команд

#### Регистрация консольной команды

После создания класса команды необходимо зарегистрировать его, чтобы он стал доступным для использования. Обычно это делается в методе `register` [файла регистрации плагина](./extending.md) с помощью вспомогательного метода `registerConsoleCommand`.

```php
class Blog extends PluginBase
{
    public function pluginDetails()
    {
        // ...
    }

    public function register()
    {
        $this->registerConsoleCommand('acme.mycommand', \Acme\Blog\Console\MyConsoleCommand::class);
    }
}
```

Альтернативно плагины могут предоставлять файл **init.php** в директории плагина, который вы можете использовать для размещения логики регистрации команд. Внутри этого файла вы можете использовать метод `Artisan::add` для регистрации команды.

```php
Artisan::add(new Acme\Blog\Console\MyCommand);
```

#### Регистрация команды в контейнере приложения

Если ваша команда зарегистрирована в [контейнере приложения](./services/application.md), вы можете использовать метод `Artisan::resolve`, чтобы сделать её доступной для Artisan.

```php
Artisan::resolve('binding.name');
```

## Вызов других команд

Иногда вам может потребоваться вызвать другие команды из вашей команды. Это можно сделать с помощью метода `call`.

```php
$this->call('october:migrate');
```

Вы также можете передавать аргументы как массив.

```php
$this->call('plugin:refresh', ['name' => 'October.Demo']);
```

А также опции.

```php
$this->call('october:update', ['--force' => true]);
```

#### См. также

::: also
* [Документация Laravel Artisan Console](https://laravel.com/docs/10.x/artisan)
:::
