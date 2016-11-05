# Console development

- [Introduction](#introduction)
- [Building a command](#building-a-command)
    - [Defining arguments](#defining-arguments)
    - [Defining options](#defining-options)
    - [Writing output](#writing-output)
    - [Retrieving input](#retrieving-input)
- [Registering commands](#registering-commands)
- [Calling other commands](#calling-other-commands)

<a name="introduction"></a>
## Introduction

In addition to the provided console commands, you may also build your own custom commands for working with your application. You may store your custom commands within the plugin **console** directory. You can generate the class file using the [command line scaffolding tool](../console/scaffolding#scaffold-create-command).

<a name="building-a-command"></a>
## Building a command

If you wanted to create a console command called `acme:mycommand`, you might create the associated class for that command in a file called **plugins/acme/blog/console/MyCommand.php** and paste the following contents to get started:

    <?php namespace Acme\Blog\Console;

    use Illuminate\Console\Command;
    use Symfony\Component\Console\Input\InputOption;
    use Symfony\Component\Console\Input\InputArgument;

    class MyCommand extends Command
    {
        /**
         * @var string The console command name.
         */
        protected $name = 'acme:mycommand';

        /**
         * @var string The console command description.
         */
        protected $description = 'Does something cool.';

        /**
         * Execute the console command.
         * @return void
         */
        public function fire()
        {
            $this->output->writeln('Hello world!');
        }

        /**
         * Get the console command arguments.
         * @return array
         */
        protected function getArguments()
        {
            return [];
        }

        /**
         * Get the console command options.
         * @return array
         */
        protected function getOptions()
        {
            return [];
        }

    }

Once your class is created you should fill out the `name` and `description` properties of the class, which will be used when displaying your command on the command `list` screen.

The `fire()` method will be called when your command is executed. You may place any command logic in this method.

<a name="defining-arguments"></a>
### Defining arguments

Arguments are defined by returning an array value from the `getArguments()` method are where you may define any arguments your command receives. For example:

        /**
         * Get the console command arguments.
         * @return array
         */
        protected function getArguments()
        {
            return [
                ['example', InputArgument::REQUIRED, 'An example argument.'],
            ];
        }

When defining `arguments`, the array definition values represent the following:

    array($name, $mode, $description, $defaultValue)

The argument `mode` may be any of the following: `InputArgument::REQUIRED` or `InputArgument::OPTIONAL`. 

<a name="defining-options"></a>
### Defining options

Options are defined by returning an array value from the `getOptions()` method. Like arguments this method should return an array of commands, which are described by a list of array options. For example:

        /**
         * Get the console command options.
         * @return array
         */
        protected function getOptions()
        {
            return [
                ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
            ];
        }

When defining `options`, the array definition values represent the following:

    array($name, $shortcut, $mode, $description, $defaultValue)

For options, the argument `mode` may be: `InputOption::VALUE_REQUIRED`, `InputOption::VALUE_OPTIONAL`, `InputOption::VALUE_IS_ARRAY`, `InputOption::VALUE_NONE`.

The `VALUE_IS_ARRAY` mode indicates that the switch may be used multiple times when calling the command:

    php artisan foo --option=bar --option=baz

The `VALUE_NONE` option indicates that the option is simply used as a "switch":

    php artisan foo --option

<a name="retrieving-input"></a>
### Retrieving input

While your command is executing, you will obviously need to access the values for the arguments and options accepted by your application. To do so, you may use the `argument` and `option` methods:

#### Retrieving the value of a command argument

    $value = $this->argument('name');

#### Retrieving all arguments

    $arguments = $this->argument();

#### Retrieving the value of a command option

    $value = $this->option('name');

#### Retrieving all options

    $options = $this->option();

<a name="writing-output"></a>
### Writing output

To send output to the console, you may use the `info`, `comment`, `question` and `error` methods. Each of these methods will use the appropriate ANSI colors for their purpose.

#### Sending information

    $this->info('Display this on the screen');

#### Sending an error message

    $this->error('Something went wrong!');

#### Asking the user for input

You may also use the `ask` and `confirm` methods to prompt the user for input:

    $name = $this->ask('What is your name?');

#### Asking the user for secret input

    $password = $this->secret('What is the password?');

#### Asking the user for confirmation

    if ($this->confirm('Do you wish to continue? [yes|no]'))
    {
        //
    }

You may also specify a default value to the `confirm` method, which should be `true` or `false`:

    $this->confirm($question, true);

<a name="registering-commands"></a>
## Registering commands

#### Registering a console command

Once your command class is finished, you need to register it so it will be available for use. This is typically done in the `register()` method of a [Plugin registration file](../plugin/registration#registration-methods) using  the `registerConsoleCommand()` helper method.

    class Blog extends PluginBase
    {
        public function pluginDetails()
        {
            [...]
        }

        public function register()
        {
            $this->registerConsoleCommand('acme.mycommand', 'Acme\Blog\Console\MyConsoleCommand');
        }
    }

Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place command registration logic. Within this file, you may use the `Artisan::add` method to register the command:

    Artisan::add(new Acme\Blog\Console\MyCommand);

#### Registering a command in the application container

If your command is registered in the [application container](../services/application#app-container), you may use the `Artisan::resolve` method to make it available to Artisan:

    Artisan::resolve('binding.name');

#### Registering commands in a service provider

If you need to register commands from within a [service provider](application#service-providers), you should call the `commands` method from the provider's `boot` method, passing the [container](application#app-container) binding for the command:

    public function boot()
    {
        $this->app->singleton('acme.mycommand', function() {
            return new \Acme\Blog\Console\MyConsoleCommand;
        });

        $this->commands('acme.mycommand');
    }

<a name="calling-other-commands"></a>
## Calling other commands

Sometimes you may wish to call other commands from your command. You may do so using the `call` method:

    $this->call('october:up');

You can also pass arguments as an array:

    $this->call('plugin:refresh', ['name' => 'October.Demo']);

As well as options:

    $this->call('october:update', ['--force' => true]);

