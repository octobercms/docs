# Command Line Interface

- [Console installation](#console-install)
- [Plugin development](#utility)
- [Scaffolding](#scaffolding)
- [Console development](#development)
- [Further reading](#further-reading)


<a name="console-install"></a>
## Console installation

### Please note: October is still under development and cannot be installed just yet

The command-line interface (CLI) method of installation requires [Composer](http://getcomposer.org/) to manage its dependencies.

Download the application source code by using the `create-project` in your terminal:

    composer create-project october/october --prefer-dist

Open the file **app/config/app.php** and set the following array values:

    'url' => 'http://yourwebsite.com', // Your website address

    'key' => 'UNIQUE_ENCRYPTION_KEY',  // Pick a unique encryption key

Open the file **app/config/cms.php** and set the following array values:

    'activeTheme' => 'demo',           // Enter the active theme to use

    'backendUri' => '/backend',        // Optional, customise your backend URL

Open the file **app/config/database.php** and set the database configuration values.

Next, run the CLI update process, this will build the database tables:

    php artisan october:up



<a name="console-install"></a>
## Console updating

#### Updating October via Composer

This will connect to the repository and pull updates for the core and any other composer installed packages.

    composer update

#### Updating October via the Update Gateway


This will connect to the October gateway and update the core and all installed plugins.

    php artisan october:update



<a name="utility"></a>
## Plugin development

#### Updating all plugins

This will update all installed plugins.

    php artisan october:up

#### Installing a plugin

This will download and install the plugin called `AuthorName.PluginName`.

    php artisan plugin:install AuthorName.PluginName

#### Removing a plugin

This will destroy the plugin's database entries and delete the plugin files from the filesystem.

    php artisan plugin:uninstall AuthorName.PluginName

#### Update a single plugin

Useful for development, this will update a single plugin.

    php artisan plugin:update AuthorName.PluginName



<a name="scaffolding"></a>
## Scaffolding commands

#### Create a new plugin

This will generate a plugin folder and basic files for a plugin named `Foo.Bar`

    php artisan create:plugin Foo.Bar

#### Create a new component

This will generate a component class and default view for a component named `Post`

    php artisan create:component Foo.Bar Post

#### Create a new model

This will generate the files needed for a new model named `Post` in the plugin `RainLab.Blog`

    php artisan create:model RainLab.Blog Post

#### Create a new back-end controller

This will generate the controller, configuration and view files for `Posts` in the plugin `RainLab.Blog`

    php artisan create:controller RainLab.Blog Posts




<a name="development"></a> 
## Console development

Plugins can register custom command-line interface (CLI) commands from the Plugin registration file.

It is best to place the console registration inside the **register()** method and to use the helper method **registerConsoleCommand**.
For example:

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

The first parameter is the command name, the second parameter is the console class name.

You can then define the console class:

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



<a name="further-reading"></a>
#### Further reading on Console Commands

* [Artisan Overview - Laravel documentation](http://laravel.com/docs/artisan)
* [Artisan Development - Laravel documentation](http://laravel.com/docs/commands)
