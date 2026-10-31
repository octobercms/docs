---
previousPath: extend/console-commands.md
subtitle: Create your own Artisan commands in a plugin and register them so they run from the console.
---
# Building Console Commands

Console commands let you run plugin tasks from the command line with `php artisan`, such as imports, cleanups or scheduled jobs. Store them in the plugin's **console** directory and generate a new one with the `create:command` command.

```bash
php artisan create:command Acme.Blog MyCommand
```

The first argument is the plugin code, and the second argument is the command name.

## Writing a Command

To create a console command called `acme:mycommand`, create a class in the **plugins/acme/blog/console/MyCommand.php** file with the following contents.

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

Fill out the `signature` and `description` properties of the class. They are shown when your command appears on the command `list` screen.

The `handle` method is called when your command runs. Place your command logic in this method.

## Registering Commands

Commands must be registered before Artisan can run them. The simplest way is to let the plugin discover them from its **console** directory.

### Discovering Commands Automatically

Call the `discoverConsoleCommands` method in the `register` method of your [plugin registration file](../plugins/extending.md).

```php
class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        // ...
    }

    public function register()
    {
        $this->discoverConsoleCommands();
    }
}
```

The method scans the **console** directory for PHP classes that extend `Illuminate\Console\Command` and registers them. Traits, abstract classes and other non-command files are ignored. For example, a command class at **plugins/acme/blog/console/MyCommand.php** with the namespace `Acme\Blog\Console` is available immediately.

### Registering a Command Explicitly

You can also register commands with the `registerConsoleCommand` helper method. This is useful when commands are stored in a non-standard location.

```php
public function register()
{
    $this->registerConsoleCommand('acme.mycommand', \Acme\Blog\Console\MyConsoleCommand::class);
}
```

Plugins can also supply a file named **init.php** in the plugin directory for command registration logic. In this file, use the `Artisan::add` method to register the command.

```php
Artisan::add(new Acme\Blog\Console\MyCommand);
```

### Registering a Command from the Application Container

If your command is registered in the [application container](../services/application.md), use the `Artisan::resolve` method to make it available to Artisan.

```php
Artisan::resolve('binding.name');
```

## Defining Arguments

All user supplied arguments and options are wrapped in curly braces in the signature. This example defines one required argument, `user`.

```php
protected $signature = 'mail:send {user}';
```

To make an argument optional, place a question mark (`?`) after the argument name.

```php
protected $signature = 'mail:send {user?}';
```

To supply a default value, add an equal sign (`=`) followed by the default value.

```php
protected $signature = 'mail:send {user=foo}';
```

## Defining Options

Options are another form of user input, defined with two hyphens (`--`) in the signature. An option can receive a value. Without a value, it acts as a boolean switch. This example defines a switch named **queue**.

```php
protected $signature = 'mail:send {user} {--queue}';
```

You can pass the `--queue` switch when calling the command. If it is passed, the option value is `true`. Otherwise, it is `false`.

```bash
php artisan mail:send 1 --queue
```

When an option expects a value, add an equal sign (`=`) after its name.

```php
protected $signature = 'mail:send {user} {--queue=}';
```

The option then accepts a value. If no value is passed, the value is `null`.

```bash
php artisan mail:send 1 --queue=default
```

To set a default value, add it after the equal sign (`=`).

```php
protected $signature = 'mail:send {user} {--queue=default}';
```

### Adding Option Shortcuts

A shortcut is a shorter way to pass an option.

```php
protected $signature = 'mail:send {user} {--Q|queue}';
```

When calling a shortcut, prefix it with a single hyphen (`-`) and do not use an equal sign to supply a value.

```bash
php artisan mail:send 1 -Qdefault
```

## Reading Input

While your command runs, read the values of its arguments and options with the `argument` and `option` methods.

Pass a name to the `argument` method to get the value of a command argument.

```php
$value = $this->argument('name');
```

Without a name, it returns all arguments.

```php
$arguments = $this->argument();
```

Pass a name to the `option` method to get the value of a command option.

```php
$value = $this->option('name');
```

Without a name, it returns all options.

```php
$options = $this->option();
```

## Writing Output

To send output to the console, use the `info`, `comment`, `question` and `error` methods. Each method uses the matching ANSI colors for its purpose.

The `info` method sends information to the user.

```php
$this->info('Display this on the screen');
```

The `error` method sends an error message.

```php
$this->error('Something went wrong!');
```

### Asking for Input

The `ask` method prompts the user for input.

```php
$name = $this->ask('What is your name?');
```

The `secret` method asks the user for secret input.

```php
$password = $this->secret('What is the password?');
```

The `confirm` method asks the user for confirmation and returns `true` if the user accepts.

```php
if ($this->confirm('Do you wish to continue? [yes|no]')) {
    //
}
```

You can pass a default value of `true` or `false` as the second argument of the `confirm` method.

```php
$this->confirm($question, true);
```

## Calling Other Commands

To call another command from your command, use the `call` method.

```php
$this->call('october:migrate');
```

You can pass arguments as an array.

```php
$this->call('plugin:refresh', ['namespace' => 'October.Demo']);
```

You can pass options the same way.

```php
$this->call('october:update', ['--force' => true]);
```

#### See Also

::: also
* [Available Console Commands](../../setup/console-commands.md)
* [Task Scheduling](../services/scheduling.md)
* [Laravel Artisan Console Documentation](https://laravel.com/docs/12.x/artisan)
:::
