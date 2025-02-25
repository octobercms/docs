---
subtitle: Create your own commands that run in the console.
---
# Building Console Commands

To build your own custom commands for working with your application, store them within the plugin **console** directory. You may generate the class file using the command line scaffolding tool. The first argument specifies the author and plugin name. The second argument specifies the command name.

```bash
php artisan create:command Acme.Blog MyCommand
```

## Building a Command

If you wanted to create a console command called `acme:mycommand`, you might create the associated class for that command in a file called **plugins/acme/blog/console/MyCommand.php** and paste the following contents to get started:

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

Once your class is created you should fill out the `signature` and `description` properties of the class, which will be used when displaying your command on the command `list` screen.

The `handle` method will be called when your command is executed. You may place any command logic in this method.

### Defining Arguments

All user supplied arguments and options are wrapped in curly braces in the signature. In the following example, the command defines one required argument: user:

Arguments are defined in the signature as wrapped curly braces, where you may define any arguments your command receives. For example:

```php
protected $signature = 'mail:send {user}';
```

You may also make arguments optional by placing a question mark (`?`) after the argument name.

```php
protected $signature = 'mail:send {user?}';
```

Alternatively, supply a default value with an equal sign (`=`) followed by the default value.

```php
protected $signature = 'mail:send {user=foo}';
```

### Defining Options

Options, like arguments, are another form of user input and are defined by two hyphens (`--`) in the signature. Options can can optionally receive a value, without a value, they serve as a boolean switch value. For example, a switch value named **queue**.

```php
protected $signature = 'mail:send {user} {--queue}';
```

In this example, the `--queue` switch may be specified when calling the command. If the `--queue` switch is passed, the value of the option will be `true`. Otherwise, the value will be `false`.

```bash
php artisan mail:send 1 --queue
```

When an option expects a value, you should suffix the input name with an equal sign (`=`).

```php
protected $signature = 'mail:send {user} {--queue=}';
```

In this case, the option can accept a value, otherwise the value will be `null`.

```bash
php artisan mail:send 1 --queue=default
```

You may also specify a default value with an equal sign (`=`) followed by the default value.

```php
protected $signature = 'mail:send {user} {--queue=default}';
```

Shortcuts are a shorter syntax when triggering an option.

```php
protected $signature = 'mail:send {user} {--Q|queue}';
```

There is an important difference when calling a shortcut. It should be prefixed with a single hyphen (`-`) and no equal sign is used to supply a value.

```bash
php artisan mail:send 1 -Qdefault
```

### Retrieving Input

While your command is executing, you will obviously need to access the values for the arguments and options accepted by your application. To do so, you may use the `argument` and `option` methods.

Supply a name to the `argument` method to retrieve the value of a command argument.

```php
$value = $this->argument('name');
```

Without a name, it will retrieve all arguments.

```php
$arguments = $this->argument();
```

Passing a name to the `option` method will retrieve the value of a command option.

```php
$value = $this->option('name');
```

Without a name, it will retrieve all options.

```php
$options = $this->option();
```

### Writing Output

To send output to the console, you may use the `info`, `comment`, `question` and `error` methods. Each of these methods will use the appropriate ANSI colors for their purpose.

The `info` method sends information back to the user.

```php
$this->info('Display this on the screen');
```

The `error` method is used for sending an error message.

```php
$this->error('Something went wrong!');
```

You may also use the `ask` and `confirm` methods to prompt the user for input.

```php
$name = $this->ask('What is your name?');
```

The `secret` method is used for asking the user for secret input.

```php
$password = $this->secret('What is the password?');
```

The `confirm` method asks the user for confirmation and returns `true` if the user accepts.

```php
if ($this->confirm('Do you wish to continue? [yes|no]')) {
    //
}
```

You may also specify a default value to the `confirm` method, which should be `true` or `false`.

```php
$this->confirm($question, true);
```

## Registering Commands

#### Registering a Console Command

Once your command class is finished, you need to register it so it will be available for use. This is typically done in the `register` method of a [plugin registration file](./extending.md) using the `registerConsoleCommand` helper method.

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

Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place command registration logic. Within this file, you may use the `Artisan::add` method to register the command.

```php
Artisan::add(new Acme\Blog\Console\MyCommand);
```

#### Registering a Command in the Application Container

If your command is registered in the [application container](./services/application.md), you may use the `Artisan::resolve` method to make it available to Artisan.

```php
Artisan::resolve('binding.name');
```

## Calling Other Commands

Sometimes you may wish to call other commands from your command. You may do so using the `call` method.

```php
$this->call('october:migrate');
```

You can also pass arguments as an array.

```php
$this->call('plugin:refresh', ['name' => 'October.Demo']);
```

As well as options.

```php
$this->call('october:update', ['--force' => true]);
```

#### See Also

::: also
* [Laravel Artisan Console Documentation](https://laravel.com/docs/10.x/artisan)
:::
