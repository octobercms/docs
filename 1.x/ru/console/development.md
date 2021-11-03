# Разработка команды для консоли

<a name="introduction" class="anchor"></a>
## Введение

В дополнение к предоставленным консольным командам, вы можете создавать свои собственные, которые должны находится в папке с плагином в подпапке **console**. Используйте инструмент командной строки - [scaffolding](../console/scaffolding#scaffold-create-command) для генерации файла.

<a name="building-a-command" class="anchor"></a>
## Создание команды

Если Вы хотите создать консольную команду `acme:mycommand`, Вы должны создать файл **plugins/acme/blog/console/MyCommand.php** со следующим кодом:

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

После того, как ваш класс будет создан, Вы должны указать свойства `name` и `description`.

Метод `fire()` вызывается в момент выполнения вашей команды.

<a name="defining-arguments" class="anchor"></a>
### Определение аргументов

В методе `getArguments()` Вы можете указать любые аргументы, которые необходимы для работы вашей команды. Например:

        /**
         * Get the console command arguments.
         * @return array
         */
        protected function getArguments()
        {
            return [
                // array($name, $mode, $description, $defaultValue)
                ['example', InputArgument::REQUIRED, 'An example argument.', 'defaultValue'],
            ];
        }

Переменная `$mode` может принимать только следующие значения: `InputArgument::REQUIRED` или `InputArgument::OPTIONAL`.

<a name="defining-options" class="anchor"></a>
### Определение параметров

Параметры определяются в методе `getOptions()`. Например:

        /**
         * Get the console command options.
         * @return array
         */
        protected function getOptions()
        {
            return [
                // array($name, $shortcut, $mode, $description, $defaultValue)
                ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
            ];
        }

Переменная `$mode` может принимать только следующие значения: `InputOption::VALUE_REQUIRED`, `InputOption::VALUE_OPTIONAL`, `InputOption::VALUE_IS_ARRAY`, `InputOption::VALUE_NONE`.

Значение `VALUE_IS_ARRAY` означает, что параметр может быть использован несколько раз:

    php artisan foo --option=bar --option=baz

Значение `VALUE_NONE` означает, что параметр используется просто как "ключ":

    php artisan foo --option

<a name="retrieving-input" class="anchor"></a>
### Получение входных данных

Во время выполнения вашей команды, Вы можете получить доступ к значениям аргументов и параметров при помощи методов `$this->argument()` и `$this->option()`:

#### Получить значение аргумента

    $value = $this->argument('name');

#### Получить значения всех аргументов

    $arguments = $this->argument();

#### Получить значение параметра

    $value = $this->option('name');

#### Получить значения всех параметров

    $options = $this->option();

<a name="writing-output" class="anchor"></a>
### Вывод текста в консоль

Вы можете использовать методы: `info`, `comment`, `question` и `error`, для вывода текста в консоль.

#### Простое сообщение

    $this->info('Display this on the screen');

#### Сообщение об ошибке

    $this->error('Something went wrong!');

#### Задать вопрос

    $name = $this->ask('What is your name?');

    $password = $this->secret('What is the password?');

    if ($this->confirm('Do you wish to continue? [yes|no]'))
    {
        //
    }

    $this->confirm($question, true); // Указываем значение по умолчанию `true` или `false`

<a name="registering-commands" class="anchor"></a>
## Регистрация команд

#### Регистрация консольной команды

После того, как Вы закончили с классом команды, не забудьте [зарегистрировать его в файле **Plugin.php**](../plugin/registration#registration-methods), используя метод `registerConsoleCommand()`:

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

Вы также можете создать файл **init.php** в папке с плагином и зарегистрировать команду в нем, используя метод `Artisan::add`:

    Artisan::add(new Acme\Blog\Console\MyCommand);

#### Регистрация команды в контейнере приложения

Если ваша команда зарегистрирована в [контейнере приложения](./application#app-container), Вы можете использовать метод `Artisan::resolve`, чтобы сделать его доступным для Artisan:

    Artisan::resolve('binding.name');

#### Регистрация команды в методе `boot()`

    public function boot()
    {
        $this->app->singleton('acme.mycommand', function() {
            return new \Acme\Blog\Console\MyConsoleCommand;
        });

        $this->commands('acme.mycommand');
    }

<a name="calling-other-commands" class="anchor"></a>
## Вызов других команд

Вы можете использовать метод `call` для вызова других команд:

    $this->call('october:up');

Используйте массив для передачи параметров и аргументов:

    $this->call('october:update', ['--force' => true]);

    $this->call('plugin:refresh', ['name' => 'October.Demo']);
