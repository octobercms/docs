import{_ as c,r as t,o as d,c as l,e as r,a as n,s as i,d as o}from"./chunks/framework.CXcwiNg-.js";const w=JSON.parse('{"title":"Development - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Building a command","slug":"building-a-command","link":"#building-a-command","children":[{"level":3,"title":"Defining arguments","slug":"defining-arguments","link":"#defining-arguments","children":[]},{"level":3,"title":"Defining options","slug":"defining-options","link":"#defining-options","children":[]},{"level":3,"title":"Retrieving input","slug":"retrieving-input","link":"#retrieving-input","children":[{"level":4,"title":"Retrieving the value of a command argument","slug":"retrieving-the-value-of-a-command-argument","link":"#retrieving-the-value-of-a-command-argument","children":[]},{"level":4,"title":"Retrieving all arguments","slug":"retrieving-all-arguments","link":"#retrieving-all-arguments","children":[]},{"level":4,"title":"Retrieving the value of a command option","slug":"retrieving-the-value-of-a-command-option","link":"#retrieving-the-value-of-a-command-option","children":[]},{"level":4,"title":"Retrieving all options","slug":"retrieving-all-options","link":"#retrieving-all-options","children":[]}]},{"level":3,"title":"Writing output","slug":"writing-output","link":"#writing-output","children":[{"level":4,"title":"Sending information","slug":"sending-information","link":"#sending-information","children":[]},{"level":4,"title":"Sending an error message","slug":"sending-an-error-message","link":"#sending-an-error-message","children":[]},{"level":4,"title":"Asking the user for input","slug":"asking-the-user-for-input","link":"#asking-the-user-for-input","children":[]},{"level":4,"title":"Asking the user for secret input","slug":"asking-the-user-for-secret-input","link":"#asking-the-user-for-secret-input","children":[]},{"level":4,"title":"Asking the user for confirmation","slug":"asking-the-user-for-confirmation","link":"#asking-the-user-for-confirmation","children":[]},{"level":4,"title":"Progress Bars","slug":"progress-bars","link":"#progress-bars","children":[]}]}]},{"level":2,"title":"Registering commands","slug":"registering-commands","link":"#registering-commands","children":[{"level":4,"title":"Registering a console command","slug":"registering-a-console-command","link":"#registering-a-console-command","children":[]},{"level":4,"title":"Registering a command in the application container","slug":"registering-a-command-in-the-application-container","link":"#registering-a-command-in-the-application-container","children":[]},{"level":4,"title":"Registering commands in a service provider","slug":"registering-commands-in-a-service-provider","link":"#registering-commands-in-a-service-provider","children":[]}]},{"level":2,"title":"Calling other commands","slug":"calling-other-commands","link":"#calling-other-commands","children":[]}],"relativePath":"1.x/console/development.md","filePath":"1.x/console/development.md"}'),m={name:"1.x/console/development.md"};function p(h,e,g,u,f,v){const a=t("pre-heading"),s=t("post-heading");return d(),l("div",null,[r(a),e[0]||(e[0]=n("h1",null,"Development",-1)),r(s),e[1]||(e[1]=i(`<p>In addition to the provided console commands, you may also build your own custom commands for working with your application. You may store your custom commands within the plugin <strong>console</strong> directory. You can generate the class file using the <a href="./../console/scaffolding.html#create-a-console-command">command line scaffolding tool</a>.</p><h2 id="building-a-command"><a href="#building-a-command" class="header-anchor">#</a> Building a command</h2><p>If you wanted to create a console command called <code>acme:mycommand</code>, you might create the associated class for that command in a file called <strong>plugins/acme/blog/console/MyCommand.php</strong> and paste the following contents to get started:</p><pre><code>&lt;?php namespace Acme\\Blog\\Console;

use Illuminate\\Console\\Command;
use Symfony\\Component\\Console\\Input\\InputOption;
use Symfony\\Component\\Console\\Input\\InputArgument;

class MyCommand extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = &#39;acme:mycommand&#39;;

    /**
     * @var string The console command description.
     */
    protected $description = &#39;Does something cool.&#39;;

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $this-&gt;output-&gt;writeln(&#39;Hello world!&#39;);
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
</code></pre><p>Once your class is created you should fill out the <code>name</code> and <code>description</code> properties of the class, which will be used when displaying your command on the command <code>list</code> screen.</p><p>The <code>handle</code> method will be called when your command is executed. You may place any command logic in this method.</p><h3 id="defining-arguments"><a href="#defining-arguments" class="header-anchor">#</a> Defining arguments</h3><p>Arguments are defined by returning an array value from the <code>getArguments</code> method are where you may define any arguments your command receives. For example:</p><pre><code>    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [
            [&#39;example&#39;, InputArgument::REQUIRED, &#39;An example argument.&#39;],
        ];
    }
</code></pre><p>When defining <code>arguments</code>, the array definition values represent the following:</p><pre><code>array($name, $mode, $description, $defaultValue)
</code></pre><p>The argument <code>mode</code> may be any of the following: <code>InputArgument::REQUIRED</code> or <code>InputArgument::OPTIONAL</code>.</p><h3 id="defining-options"><a href="#defining-options" class="header-anchor">#</a> Defining options</h3><p>Options are defined by returning an array value from the <code>getOptions</code> method. Like arguments this method should return an array of commands, which are described by a list of array options. For example:</p><pre><code>    /**
     * Get the console command options.
     * @return array
     */
    protected function getOptions()
    {
        return [
            [&#39;example&#39;, null, InputOption::VALUE_OPTIONAL, &#39;An example option.&#39;, null],
        ];
    }
</code></pre><p>When defining <code>options</code>, the array definition values represent the following:</p><pre><code>array($name, $shortcut, $mode, $description, $defaultValue)
</code></pre><p>For options, the argument <code>mode</code> may be: <code>InputOption::VALUE_REQUIRED</code>, <code>InputOption::VALUE_OPTIONAL</code>, <code>InputOption::VALUE_IS_ARRAY</code>, <code>InputOption::VALUE_NONE</code>.</p><p>The <code>VALUE_IS_ARRAY</code> mode indicates that the switch may be used multiple times when calling the command:</p><pre><code>php artisan foo --option=bar --option=baz
</code></pre><p>The <code>VALUE_NONE</code> option indicates that the option is simply used as a &quot;switch&quot;:</p><pre><code>php artisan foo --option
</code></pre><h3 id="retrieving-input"><a href="#retrieving-input" class="header-anchor">#</a> Retrieving input</h3><p>While your command is executing, you will obviously need to access the values for the arguments and options accepted by your application. To do so, you may use the <code>argument</code> and <code>option</code> methods:</p><h4 id="retrieving-the-value-of-a-command-argument"><a href="#retrieving-the-value-of-a-command-argument" class="header-anchor">#</a> Retrieving the value of a command argument</h4><pre><code>$value = $this-&gt;argument(&#39;name&#39;);
</code></pre><h4 id="retrieving-all-arguments"><a href="#retrieving-all-arguments" class="header-anchor">#</a> Retrieving all arguments</h4><pre><code>$arguments = $this-&gt;argument();
</code></pre><h4 id="retrieving-the-value-of-a-command-option"><a href="#retrieving-the-value-of-a-command-option" class="header-anchor">#</a> Retrieving the value of a command option</h4><pre><code>$value = $this-&gt;option(&#39;name&#39;);
</code></pre><h4 id="retrieving-all-options"><a href="#retrieving-all-options" class="header-anchor">#</a> Retrieving all options</h4><pre><code>$options = $this-&gt;option();
</code></pre><h3 id="writing-output"><a href="#writing-output" class="header-anchor">#</a> Writing output</h3><p>To send output to the console, you may use the <code>info</code>, <code>comment</code>, <code>question</code> and <code>error</code> methods. Each of these methods will use the appropriate ANSI colors for their purpose.</p><h4 id="sending-information"><a href="#sending-information" class="header-anchor">#</a> Sending information</h4><pre><code>$this-&gt;info(&#39;Display this on the screen&#39;);
</code></pre><h4 id="sending-an-error-message"><a href="#sending-an-error-message" class="header-anchor">#</a> Sending an error message</h4><pre><code>$this-&gt;error(&#39;Something went wrong!&#39;);
</code></pre><h4 id="asking-the-user-for-input"><a href="#asking-the-user-for-input" class="header-anchor">#</a> Asking the user for input</h4><p>You may also use the <code>ask</code> and <code>confirm</code> methods to prompt the user for input:</p><pre><code>$name = $this-&gt;ask(&#39;What is your name?&#39;);
</code></pre><h4 id="asking-the-user-for-secret-input"><a href="#asking-the-user-for-secret-input" class="header-anchor">#</a> Asking the user for secret input</h4><pre><code>$password = $this-&gt;secret(&#39;What is the password?&#39;);
</code></pre><h4 id="asking-the-user-for-confirmation"><a href="#asking-the-user-for-confirmation" class="header-anchor">#</a> Asking the user for confirmation</h4><pre><code>if ($this-&gt;confirm(&#39;Do you wish to continue? [yes|no]&#39;))
{
    //
}
</code></pre><p>You may also specify a default value to the <code>confirm</code> method, which should be <code>true</code> or <code>false</code>:</p><pre><code>$this-&gt;confirm($question, true);
</code></pre><h4 id="progress-bars"><a href="#progress-bars" class="header-anchor">#</a> Progress Bars</h4><p>For long running tasks, it could be helpful to show a progress indicator. Using the output object, we can start, advance and stop the Progress Bar. First, define the total number of steps the process will iterate through. Then, advance the Progress Bar after processing each item:</p><pre><code>$users = App\\User::all();

$bar = $this-&gt;output-&gt;createProgressBar(count($users));

foreach ($users as $user) {
    $this-&gt;performTask($user);

    $bar-&gt;advance();
}

$bar-&gt;finish();
</code></pre>`,50)),e[2]||(e[2]=n("p",null,[o("For more advanced options, check out the "),n("a",{href:"https://symfony.com/doc/2.7/components/console/helpers/progressbar.html",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("Symfony Progress Bar component documentation"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),n("span",{class:"sr-only"},"(opens new window)")])]),o(".")],-1)),e[3]||(e[3]=i(`<h2 id="registering-commands"><a href="#registering-commands" class="header-anchor">#</a> Registering commands</h2><h4 id="registering-a-console-command"><a href="#registering-a-console-command" class="header-anchor">#</a> Registering a console command</h4><p>Once your command class is finished, you need to register it so it will be available for use. This is typically done in the <code>register</code> method of a <a href="./../plugin/registration.html#registration-methods">Plugin registration file</a> using the <code>registerConsoleCommand</code> helper method.</p><pre><code>class Blog extends PluginBase
{
    public function pluginDetails()
    {
        [...]
    }

    public function register()
    {
        $this-&gt;registerConsoleCommand(&#39;acme.mycommand&#39;, &#39;Acme\\Blog\\Console\\MyConsoleCommand&#39;);
    }
}
</code></pre><p>Alternatively, plugins can supply a file named <strong>init.php</strong> in the plugin directory that you can use to place command registration logic. Within this file, you may use the <code>Artisan::add</code> method to register the command:</p><pre><code>Artisan::add(new Acme\\Blog\\Console\\MyCommand);
</code></pre><h4 id="registering-a-command-in-the-application-container"><a href="#registering-a-command-in-the-application-container" class="header-anchor">#</a> Registering a command in the application container</h4><p>If your command is registered in the <a href="./../services/application.html#application-container">application container</a>, you may use the <code>Artisan::resolve</code> method to make it available to Artisan:</p><pre><code>Artisan::resolve(&#39;binding.name&#39;);
</code></pre><h4 id="registering-commands-in-a-service-provider"><a href="#registering-commands-in-a-service-provider" class="header-anchor">#</a> Registering commands in a service provider</h4><p>If you need to register commands from within a <a href="./application.html#service-providers">service provider</a>, you should call the <code>commands</code> method from the provider&#39;s <code>boot</code> method, passing the <a href="./application.html#application-container">container</a> binding for the command:</p><pre><code>public function boot()
{
    $this-&gt;app-&gt;singleton(&#39;acme.mycommand&#39;, function() {
        return new \\Acme\\Blog\\Console\\MyConsoleCommand;
    });

    $this-&gt;commands(&#39;acme.mycommand&#39;);
}
</code></pre><h2 id="calling-other-commands"><a href="#calling-other-commands" class="header-anchor">#</a> Calling other commands</h2><p>Sometimes you may wish to call other commands from your command. You may do so using the <code>call</code> method:</p><pre><code>$this-&gt;call(&#39;october:up&#39;);
</code></pre><p>You can also pass arguments as an array:</p><pre><code>$this-&gt;call(&#39;plugin:refresh&#39;, [&#39;name&#39; =&gt; &#39;October.Demo&#39;]);
</code></pre><p>As well as options:</p><pre><code>$this-&gt;call(&#39;october:update&#39;, [&#39;--force&#39; =&gt; true]);
</code></pre>`,19))])}const b=c(m,[["render",p]]);export{w as __pageData,b as default};
