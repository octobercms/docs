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

Download the application source code by using `create-project` in your terminal. This will install to a directory called **/myoctober**:

    composer create-project october/october myoctober dev-master

Once this task has finished, open the file **config/database.php** and set your database connection:

    'default' => 'mysql', // Default database connection

Configure the `connections` section below it with the database credentials.

Next, run the CLI migration process, this will build the database tables:

    php artisan october:up

You can sign in to the back-end area via the `/backend` route and using the default username **admin** and password **admin**.

You also may wish to inspect **config/app.php** and **config/cms.php** to change any optional configuration.

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

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

    php artisan theme:use rainlab-vanilla

`theme:list` - list installed themes. Use the **-m** option to include popular themes in the Marketplace.

    php artisan theme:list

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

    php artisan theme:install AuthorName.ThemeName

If you wish to install the theme in a custom directory, simply provide the second argument. The following example will download `AuthorName.ThemeName` and install it in `/themes/my-theme`

    php artisan theme:install AuthorName.ThemeName my-theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove rainlab-vanilla

<a name="scaffolding-commands" class="anchor" href="#scaffolding-commands"></a>
## Scaffolding commands

Use the scaffolding commands to speed up the development process.

`october:fresh` - removes the demo theme and plugin that ships with October.

    php artisan october:fresh

`create:plugin` - generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Foo.Bar

`create:component` - creates a new component class and the default component view. The first parameter specifies the author and plugin name. The second parameter specifies the component class name.

    php artisan create:component Foo.Bar Post

`create:model` - generates files needed for a new model. The first parameter specifies the author and plugin name. The second parameter specifies the model class name.

    php artisan create:model RainLab.Blog Post

`create:controller` - generates a controller, configuration and view files. The first parameter specifies the author and plugin name. The second parameter specifies the controller class name.

    php artisan create:controller RainLab.Blog Posts

`create:formwidget` - generates a back-end form widget, view and basic asset files. The first parameter specifies the author and plugin name. The second parameter specifies the form widget class name.

    php artisan create:formwidget RainLab.Blog CategorySelector

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
