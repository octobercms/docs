---
subtitle: 创建在控制台中运行的自定义命令。
---
# 构建命令行命令

要构建用于应用程序的自定义命令，请将它们存储在插件的 **console** 目录中。您可以使用命令行脚手架工具生成类文件。第一个参数指定作者和插件名称。第二个参数指定命令名称。

```bash
php artisan create:command Acme.Blog MyCommand
```

## 构建命令

如果您想创建一个名为 `acme:mycommand` 的命令行命令，可以在名为 **plugins/acme/blog/console/MyCommand.php** 的文件中创建关联的类，并粘贴以下内容以开始使用：

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

类创建完成后，您应该填写类的 `signature` 和 `description` 属性，这些属性将在命令 `list` 屏幕上显示您的命令时使用。

`handle` 方法将在执行命令时被调用。您可以在此方法中放置任何命令逻辑。

### 定义参数

所有用户提供的参数和选项都用花括号包裹在签名中。在以下示例中，命令定义了一个必需参数：user：

参数在签名中以花括号包裹的形式定义，您可以在其中定义命令接收的任何参数。例如：

```php
protected $signature = 'mail:send {user}';
```

您也可以通过在参数名称后添加问号（`?`）使参数变为可选。

```php
protected $signature = 'mail:send {user?}';
```

或者，使用等号（`=`）后跟默认值来提供默认值。

```php
protected $signature = 'mail:send {user=foo}';
```

### 定义选项

选项与参数一样，是另一种用户输入形式，在签名中通过两个连字符（`--`）定义。选项可以选择性地接收一个值，如果没有值，它们将作为布尔开关值。例如，一个名为 **queue** 的开关值。

```php
protected $signature = 'mail:send {user} {--queue}';
```

在此示例中，调用命令时可以指定 `--queue` 开关。如果传递了 `--queue` 开关，选项的值将为 `true`。否则，值将为 `false`。

```bash
php artisan mail:send 1 --queue
```

当选项需要一个值时，您应该在输入名称后加上等号（`=`）。

```php
protected $signature = 'mail:send {user} {--queue=}';
```

在这种情况下，选项可以接受一个值，否则值将为 `null`。

```bash
php artisan mail:send 1 --queue=default
```

您也可以使用等号（`=`）后跟默认值来指定默认值。

```php
protected $signature = 'mail:send {user} {--queue=default}';
```

快捷方式是触发选项时的简短语法。

```php
protected $signature = 'mail:send {user} {--Q|queue}';
```

调用快捷方式时有一个重要区别。它应该以单个连字符（`-`）为前缀，并且不使用等号来提供值。

```bash
php artisan mail:send 1 -Qdefault
```

### 获取输入

在命令执行期间，您显然需要访问应用程序接受的参数和选项的值。为此，您可以使用 `argument` 和 `option` 方法。

向 `argument` 方法提供名称以获取命令参数的值。

```php
$value = $this->argument('name');
```

不提供名称时，将获取所有参数。

```php
$arguments = $this->argument();
```

向 `option` 方法传递名称将获取命令选项的值。

```php
$value = $this->option('name');
```

不提供名称时，将获取所有选项。

```php
$options = $this->option();
```

### 输出内容

要向控制台发送输出，您可以使用 `info`、`comment`、`question` 和 `error` 方法。每种方法都将使用适当的 ANSI 颜色来表达其用途。

`info` 方法向用户发送信息。

```php
$this->info('Display this on the screen');
```

`error` 方法用于发送错误消息。

```php
$this->error('Something went wrong!');
```

您还可以使用 `ask` 和 `confirm` 方法提示用户输入。

```php
$name = $this->ask('What is your name?');
```

`secret` 方法用于向用户询问秘密输入。

```php
$password = $this->secret('What is the password?');
```

`confirm` 方法要求用户确认，如果用户接受则返回 `true`。

```php
if ($this->confirm('Do you wish to continue? [yes|no]')) {
    //
}
```

您还可以为 `confirm` 方法指定默认值，该值应为 `true` 或 `false`。

```php
$this->confirm($question, true);
```

## 注册命令

#### 注册命令行命令

命令类完成后，您需要注册它以便可以使用。这通常在[插件注册文件](./extending.md)的 `register` 方法中使用 `registerConsoleCommand` 辅助方法完成。

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

或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来放置命令注册逻辑。在此文件中，您可以使用 `Artisan::add` 方法注册命令。

```php
Artisan::add(new Acme\Blog\Console\MyCommand);
```

#### 在应用容器中注册命令

如果您的命令已注册到[应用容器](./services/application.md)中，您可以使用 `Artisan::resolve` 方法使其对 Artisan 可用。

```php
Artisan::resolve('binding.name');
```

## 调用其他命令

有时您可能希望从命令中调用其他命令。您可以使用 `call` 方法来实现。

```php
$this->call('october:migrate');
```

您也可以以数组形式传递参数。

```php
$this->call('plugin:refresh', ['name' => 'October.Demo']);
```

以及选项。

```php
$this->call('october:update', ['--force' => true]);
```

#### 另请参阅

::: also
* [Laravel Artisan 命令行文档](https://laravel.com/docs/10.x/artisan)
:::
