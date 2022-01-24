# 发展

除了提供的控制台命令之外，您还可以构建自己的自定义命令来处理您的应用程序。 您可以将自定义命令存储在插件 **console** 目录中。 您可以使用 [命令行脚手架工具](../console/scaffolding.md#create-a-console-command) 生成类文件。

## 创建命令

如果你想创建一个名为 `acme:mycommand` 的控制台命令，你可以在一个名为 **plugins/acme/blog/console/MyCommand.php** 的文件中为该命令创建关联的类，然后粘贴以下内容以获取 开始

```php
<?php namespace Acme\Blog\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class MyCommand extends Command
{
    /**
     * @var string 控制台命令名称。
     */
    protected $name = 'acme:mycommand';

    /**
     * @var string 控制台命令说明。
     */
    protected $description = '做一些很酷的事情.';

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $this->output->writeln('Hello world!');
    }

    /**
     * 获取控制台命令参数。
     * @return array
     */
    protected function getArguments()
    {
        return [];
    }

    /**
     * 获取控制台命令选项。
     * @return array
     */
    protected function getOptions()
    {
        return [];
    }

}
```

创建类后，您应该填写类的 `name` 和 `description` 属性，这将在命令 `list` 屏幕上显示您的命令时使用。

执行命令时将调用 `handle` 方法。 您可以在此方法中放置任何命令逻辑。

### 定义参数

参数是通过从 `getArguments` 方法返回一个数组值来定义的，您可以在其中定义命令接收的任何参数。 例如：

```php
/**
 * 获取控制台命令参数。
 * @return array
 */
protected function getArguments()
{
    return [
        ['example', InputArgument::REQUIRED, 'An example argument.'],
    ];
}
```

定义 `arguments` 时，数组定义值表示如下：

```php
array($name, $mode, $description, $defaultValue)
```

参数 `mode` 可以是以下任何一种：`InputArgument::REQUIRED` 或 `InputArgument::OPTIONAL`。

### 定义选项

选项是通过从 `getOptions` 方法返回一个数组值来定义的。 与参数一样，此方法应返回一个命令数组，这些命令由数组选项列表描述。 例如：

```php
/**
 * 控制台命令的 getOptions
 * @return array
 */
protected function getOptions()
{
    return [
        ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
    ];
}
```

定义 `options` 时，数组定义值表示如下：

```php
array($name, $shortcut, $mode, $description, $defaultValue)
```

对于选项，参数 `mode` 可以是：`InputOption::VALUE_REQUIRED`、`InputOption::VALUE_OPTIONAL`、`InputOption::VALUE_IS_ARRAY`、`InputOption::VALUE_NONE`。

`VALUE_IS_ARRAY`模式表示调用命令时可以多次使用该开关：

    php artisan foo --option=bar --option=baz

`VALUE_NONE` 选项表示该选项仅用作"开关"：

    php artisan foo --option

### 检索输入

当您的命令正在执行时，您显然需要访问应用程序接受的参数和选项的值。 为此，您可以使用 `argument` 和 `option` 方法：

#### 检索命令参数的值

```php
$value = $this->argument('name');
```

#### 检索所有参数

```php
$arguments = $this->argument();
```

#### 检索命令选项的值

```php
$value = $this->option('name');
```

#### 检索所有选项

```php
$options = $this->option();
```

### 编写输出

要将输出发送到控制台，您可以使用 `info`、`comment`、`question` 和 `error` 方法。 这些方法中的每一个都将使用适当的 ANSI 颜色来实现其目的。

#### 发送信息

```php
$this->info('Display this on the screen');
```

#### 发送错误消息

```php
$this->error('Something went wrong!');
```

#### 询问用户输入

您还可以使用 `ask` 和 `confirm` 方法提示用户输入：

```php
$name = $this->ask('What is your name?');
```

#### 要求用户输入密码

```php
$password = $this->secret('What is the password?');
```

#### 要求用户确认

```php
if ($this->confirm('Do you wish to continue? [yes|no]')) {
    //
}
```

您还可以为 `confirm` 方法指定一个默认值，它应该是 `true` 或 `false`：

```php
$this->confirm($question, true);
```
> **注意**：对于中国开发者，我们仍建议提示信息文本采用英文，以防止服务器命令窗口无法解析文本

#### 进度条

对于长时间运行的任务，显示进度指示器可能会有所帮助。 使用输出对象，我们可以启动、前进和停止进度条。 首先，定义流程将迭代的步骤总数。 然后，在处理完每个项目后推进进度条：

```php
$users = App\User::all();

$bar = $this->output->createProgressBar(count($users));

foreach ($users as $user) {
    $this->performTask($user);

    $bar->advance();
}

$bar->finish();
```

有关更多高级选项，请查看 [Symfony 进度条组件文档](https://symfony.com/doc/2.7/components/console/helpers/progressbar.html)。

## 注册命令

#### 注册控制台命令

一旦你的命令类完成，你需要注册它以便它可以使用。 这通常使用 `registerConsoleCommand` 辅助方法在 [插件注册文件](../plugin/registration.md#registration-methods) 的 `register` 方法中完成。

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

或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来放置命令注册逻辑。 在此文件中，您可以使用 `Artisan::add` 方法来注册命令：

```php
Artisan::add(new Acme\Blog\Console\MyCommand);
```

#### 在应用程序容器中注册命令

如果您的命令已在 [应用程序容器](../services/application.md#application-container) 中注册，您可以使用 `Artisan::resolve` 方法使其对 Artisan 可用：

```php
Artisan::resolve('binding.name');
```

#### 在服务提供者中注册命令

如果你需要在 [服务提供商](application.md#service-providers) 中注册命令，你应该从提供者的 `boot` 方法调用 `commands` 方法，传递 [容器](application.md#application -container) 绑定命令：

```php
public function boot()
{
    $this->app->singleton('acme.mycommand', function() {
        return new \Acme\Blog\Console\MyConsoleCommand;
    });

    $this->commands('acme.mycommand');
}
```

## 调用其他命令

有时您可能希望从您的命令中调用其他命令。 您可以使用 `call` 方法这样做：

```php
$this->call('october:migrate');
```

您还可以将参数作为数组传递：

```php
$this->call('plugin:refresh', ['name' => 'October.Demo']);
```

以及选项：

```php
$this->call('october:update', ['--force' => true]);
```
