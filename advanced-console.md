## Console Installation

The command-line interface (CLI) method of installation requires [Composer](http://getcomposer.org/) to manage its dependencies.

Download the application source code by using the `create-project` in your terminal:

```
composer create-project october/october --prefer-dist
```

Next, run the CLI installation wizard and follow the prompts:

```
php artisan october:install
```


---



## Utility Commands


##### Updating October

This will update October's core and any installed plugins.

```
php artisan october:update
```

##### Installing a plugin

This will download and install the plugin called `AuthorName.PluginName`

```
php artisan plugin:add AuthorName.PluginName
```

##### Removing a plugin

This will destroy the plugin's database entries and delete the plugin files from the filesystem.

```
php artisan plugin:remove AuthorName.PluginName
```


##### Recreating a plugin

Useful for development, this will pack down the Plugin database and rebuild it

```
php artisan plugin:rebuild AuthorName.PluginName
```


---


## Scaffolding Commands


##### Create a new plugin

This will a plugin folder and basic files for a plugin named `Foo.Bar`

```
php artisan create:plugin Foo.Bar
```

##### Create a new model

This will generate the files needed for a new model named `Post` in the plugin `RainLab.Blog`

```
php artisan create:model RainLab.Blog Post
```

##### Create a new back-end controller

This will generate the controller, configuration and view files for `Posts` in the plugin `RainLab.Blog`

```
php artisan create:controller RainLab.Blog Posts
```


---



## Console Development

Plugins can register custom command-line interface (CLI) commands from the Plugin information file.

It is best to place the console registration inside the **register()** method and to use the helper method **registerConsoleCommand**. For example:

```php
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
```

The first parameter is the command name, the second parameter is the console class name.

You can then define the console class:

```php
<?php namespace MyPlugin\Console;

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
```

##### Further reading on Console Commands

* [Artisan Overview - Laravel documentation](http://laravel.com/docs/artisan)
* [Artisan Development - Laravel documentation](http://laravel.com/docs/commands)
