# Console development

- [Console development](#console-development)

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

