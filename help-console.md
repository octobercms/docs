# Command Line Interface

- [Console installation](#console-install)
- [Console updating](#console-updating)
- [Utility commands](#utility-commands)
- [Scaffolding commands](#scaffolding-commands)
- [Console development](#console-development)

October includes several CLI commands and utilities that allow to install October, update it, as well as speed up the development process. The console commands are based on Artisan. Please see Laravel documentation for more details.

1. [Artisan Overview](http://laravel.com/docs/artisan)
1. [Artisan Development](http://laravel.com/docs/commands)

<a name="console-install" class="anchor" href="#console-install"></a>
## Console installation

The command-line interface (CLI) method of installation requires [Composer](http://getcomposer.org/) to manage its dependencies.

Download the application source code by using the `create-project` in your terminal. This will install to a directory named **/october**:

    composer create-project october/october october dev-master

Open the file **app/config/app.php** and set the following array values:

    'url' => 'http://yourwebsite.com', // Your website address

    'key' => 'UNIQUE_ENCRYPTION_KEY',  // Pick a unique encryption key

Open the file **app/config/cms.php** and set the following array values:

    'activeTheme' => 'demo',           // Enter the active theme to use

    'backendUri' => '/backend',        // Optional, customize your backend URL

Open the file **app/config/database.php** and set the database configuration values.

Next, run the CLI update process, this will build the database tables:

    php artisan october:up

You can sign in to the back-end area using the default username **admin** and password **admin**.


<a name="console-updating" class="anchor" href="#console-updating"></a>
## Console updating

There are two ways to update October - via Composer and via the Update Gateway. Updating October via Composer will connect to the repository and pull updates for the core and any other composer installed packages.

    composer update

Updating October via the Update Gateway will connect to the October gateway and update the core and all installed plugins.

    php artisan october:update

<a name="utility-commands" class="anchor" href="#utility-commands"></a>
## Utility commands

October includes a number of Artisan utility commands.

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

`october:up` - updates all installed plugins.

    php artisan october:up

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**. Note that your installation should be bound to a project in order to use this command. You can create projects on October website, in the [Account / Projects](https://octobercms.com/account/project/dashboard) section.

    php artisan plugin:install AuthorName.PluginName

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

    php artisan plugin:remove AuthorName.PluginName

`plugin:refresh` - destroys the plugin's database tables and reinstalls them. This command is useful for development.

    php artisan plugin:refresh AuthorName.PluginName

<a name="scaffolding-commands" class="anchor" href="#scaffolding-commands"></a>
## Scaffolding commands

Use the scaffolding commands to speed up the development process.

`create:plugin` - generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Foo.Bar

`create:component` - creates a new component class and the default component view. The first parameter specifies the author and plugin name. The second parameter specifies the component class name.

    php artisan create:component Foo.Bar Post

`create:model` - generates files needed for a new model. The first parameter specifies the author and plugin name. The second parameter specifies the model class name.

    php artisan create:model RainLab.Blog Post

`create:controller` - generates a controller, configuration and view files. The first parameter specifies the author and plugin name. The second parameter specifies the controller class name.

    php artisan create:controller RainLab.Blog Posts

<a name="console-development" class="anchor" href="#console-development"></a>
## Console development

Plugins can register custom command-line interface (CLI) commands from the Plugin registration file. It is best to place the console registration inside the `register()` method and to use the helper method `registerConsoleCommand()`. Example:

    class MyPlugin extends PluginBase
    {
        public function pluginDetails()
        {
            [...]
        }

        public function register()
        {
            $this->registerConsoleCommand('myplugin.mycommand', 'MyPlugin\Console\MyConsoleCommand');
        }
    }

The first parameter is the command name, the second parameter is the console class name. You can then define the console class:

    namespace Acme\MyPlugin\Console;

    use Illuminate\Console\Command;
    use Symfony\Component\Console\Input\InputOption;
    use Symfony\Component\Console\Input\InputArgument;

    class MyConsoleCommand extends Command
    {
        /**
         * @var string The console command name.
         */
        protected $name = 'myplugin:mycommand';

        /**
         * @var string The console command description.
         */
        protected $description = 'Does something cool.';

        /**
         * Create a new command instance.
         * @return void
         */
        public function __construct()
        {
            parent::__construct();
        }

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
            return [
                ['example', InputArgument::REQUIRED, 'An example argument.'],
            ];
        }

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

    }
