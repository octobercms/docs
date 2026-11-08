import{_ as r,r as n,o as c,c as l,e as o,a as d,s}from"./chunks/framework.CXcwiNg-.js";const A=JSON.parse('{"title":"Разработка команды для консоли - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Создание команды","slug":"создание-команды","link":"#создание-команды","children":[{"level":3,"title":"Определение аргументов","slug":"определение-аргументов","link":"#определение-аргументов","children":[]},{"level":3,"title":"Определение параметров","slug":"определение-параметров","link":"#определение-параметров","children":[]},{"level":3,"title":"Получение входных данных","slug":"получение-входных-данных","link":"#получение-входных-данных","children":[{"level":4,"title":"Получить значение аргумента","slug":"получить-значение-аргумента","link":"#получить-значение-аргумента","children":[]},{"level":4,"title":"Получить значения всех аргументов","slug":"получить-значения-всех-аргументов","link":"#получить-значения-всех-аргументов","children":[]},{"level":4,"title":"Получить значение параметра","slug":"получить-значение-параметра","link":"#получить-значение-параметра","children":[]},{"level":4,"title":"Получить значения всех параметров","slug":"получить-значения-всех-параметров","link":"#получить-значения-всех-параметров","children":[]}]},{"level":3,"title":"Вывод текста в консоль","slug":"вывод-текста-в-консоль","link":"#вывод-текста-в-консоль","children":[{"level":4,"title":"Простое сообщение","slug":"простое-сообщение","link":"#простое-сообщение","children":[]},{"level":4,"title":"Сообщение об ошибке","slug":"сообщение-об-ошибке","link":"#сообщение-об-ошибке","children":[]},{"level":4,"title":"Задать вопрос","slug":"задать-вопрос","link":"#задать-вопрос","children":[]}]}]},{"level":2,"title":"Регистрация команд","slug":"регистрация-команд","link":"#регистрация-команд","children":[{"level":4,"title":"Регистрация консольной команды","slug":"регистрация-консольнои-команды","link":"#регистрация-консольнои-команды","children":[]},{"level":4,"title":"Регистрация команды в контейнере приложения","slug":"регистрация-команды-в-контеинере-приложения","link":"#регистрация-команды-в-контеинере-приложения","children":[]},{"level":4,"title":"Регистрация команды в методе boot()","slug":"регистрация-команды-в-методе-boot","link":"#регистрация-команды-в-методе-boot","children":[]}]},{"level":2,"title":"Вызов других команд","slug":"вызов-других-команд","link":"#вызов-других-команд","children":[]}],"relativePath":"1.x/ru/console/development.md","filePath":"1.x/ru/console/development.md"}'),i={name:"1.x/ru/console/development.md"};function p(h,e,m,u,g,f){const t=n("pre-heading"),a=n("post-heading");return c(),l("div",null,[o(t),e[0]||(e[0]=d("h1",null,"Разработка команды для консоли",-1)),o(a),e[1]||(e[1]=s(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>В дополнение к предоставленным консольным командам, вы можете создавать свои собственные, которые должны находится в папке с плагином в подпапке <strong>console</strong>. Используйте инструмент командной строки - <a href="./../console/scaffolding.html#scaffold-create-command">scaffolding</a> для генерации файла.</p><p><a name="building-a-command" class="anchor"></a></p><h2 id="создание-команды"><a href="#создание-команды" class="header-anchor">#</a> Создание команды</h2><p>Если Вы хотите создать консольную команду <code>acme:mycommand</code>, Вы должны создать файл <strong>plugins/acme/blog/console/MyCommand.php</strong> со следующим кодом:</p><pre><code>&lt;?php namespace Acme\\Blog\\Console;

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
    public function fire()
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
</code></pre><p>После того, как ваш класс будет создан, Вы должны указать свойства <code>name</code> и <code>description</code>.</p><p>Метод <code>fire()</code> вызывается в момент выполнения вашей команды.</p><p><a name="defining-arguments" class="anchor"></a></p><h3 id="определение-аргументов"><a href="#определение-аргументов" class="header-anchor">#</a> Определение аргументов</h3><p>В методе <code>getArguments()</code> Вы можете указать любые аргументы, которые необходимы для работы вашей команды. Например:</p><pre><code>    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [
            // array($name, $mode, $description, $defaultValue)
            [&#39;example&#39;, InputArgument::REQUIRED, &#39;An example argument.&#39;, &#39;defaultValue&#39;],
        ];
    }
</code></pre><p>Переменная <code>$mode</code> может принимать только следующие значения: <code>InputArgument::REQUIRED</code> или <code>InputArgument::OPTIONAL</code>.</p><p><a name="defining-options" class="anchor"></a></p><h3 id="определение-параметров"><a href="#определение-параметров" class="header-anchor">#</a> Определение параметров</h3><p>Параметры определяются в методе <code>getOptions()</code>. Например:</p><pre><code>    /**
     * Get the console command options.
     * @return array
     */
    protected function getOptions()
    {
        return [
            // array($name, $shortcut, $mode, $description, $defaultValue)
            [&#39;example&#39;, null, InputOption::VALUE_OPTIONAL, &#39;An example option.&#39;, null],
        ];
    }
</code></pre><p>Переменная <code>$mode</code> может принимать только следующие значения: <code>InputOption::VALUE_REQUIRED</code>, <code>InputOption::VALUE_OPTIONAL</code>, <code>InputOption::VALUE_IS_ARRAY</code>, <code>InputOption::VALUE_NONE</code>.</p><p>Значение <code>VALUE_IS_ARRAY</code> означает, что параметр может быть использован несколько раз:</p><pre><code>php artisan foo --option=bar --option=baz
</code></pre><p>Значение <code>VALUE_NONE</code> означает, что параметр используется просто как &quot;ключ&quot;:</p><pre><code>php artisan foo --option
</code></pre><p><a name="retrieving-input" class="anchor"></a></p><h3 id="получение-входных-данных"><a href="#получение-входных-данных" class="header-anchor">#</a> Получение входных данных</h3><p>Во время выполнения вашей команды, Вы можете получить доступ к значениям аргументов и параметров при помощи методов <code>$this-&gt;argument()</code> и <code>$this-&gt;option()</code>:</p><h4 id="получить-значение-аргумента"><a href="#получить-значение-аргумента" class="header-anchor">#</a> Получить значение аргумента</h4><pre><code>$value = $this-&gt;argument(&#39;name&#39;);
</code></pre><h4 id="получить-значения-всех-аргументов"><a href="#получить-значения-всех-аргументов" class="header-anchor">#</a> Получить значения всех аргументов</h4><pre><code>$arguments = $this-&gt;argument();
</code></pre><h4 id="получить-значение-параметра"><a href="#получить-значение-параметра" class="header-anchor">#</a> Получить значение параметра</h4><pre><code>$value = $this-&gt;option(&#39;name&#39;);
</code></pre><h4 id="получить-значения-всех-параметров"><a href="#получить-значения-всех-параметров" class="header-anchor">#</a> Получить значения всех параметров</h4><pre><code>$options = $this-&gt;option();
</code></pre><p><a name="writing-output" class="anchor"></a></p><h3 id="вывод-текста-в-консоль"><a href="#вывод-текста-в-консоль" class="header-anchor">#</a> Вывод текста в консоль</h3><p>Вы можете использовать методы: <code>info</code>, <code>comment</code>, <code>question</code> и <code>error</code>, для вывода текста в консоль.</p><h4 id="простое-сообщение"><a href="#простое-сообщение" class="header-anchor">#</a> Простое сообщение</h4><pre><code>$this-&gt;info(&#39;Display this on the screen&#39;);
</code></pre><h4 id="сообщение-об-ошибке"><a href="#сообщение-об-ошибке" class="header-anchor">#</a> Сообщение об ошибке</h4><pre><code>$this-&gt;error(&#39;Something went wrong!&#39;);
</code></pre><h4 id="задать-вопрос"><a href="#задать-вопрос" class="header-anchor">#</a> Задать вопрос</h4><pre><code>$name = $this-&gt;ask(&#39;What is your name?&#39;);

$password = $this-&gt;secret(&#39;What is the password?&#39;);

if ($this-&gt;confirm(&#39;Do you wish to continue? [yes|no]&#39;))
{
    //
}

$this-&gt;confirm($question, true); // Указываем значение по умолчанию \`true\` или \`false\`
</code></pre><p><a name="registering-commands" class="anchor"></a></p><h2 id="регистрация-команд"><a href="#регистрация-команд" class="header-anchor">#</a> Регистрация команд</h2><h4 id="регистрация-консольнои-команды"><a href="#регистрация-консольнои-команды" class="header-anchor">#</a> Регистрация консольной команды</h4><p>После того, как Вы закончили с классом команды, не забудьте <a href="./../plugin/registration.html#registration-methods">зарегистрировать его в файле <strong>Plugin.php</strong></a>, используя метод <code>registerConsoleCommand()</code>:</p><pre><code>class Blog extends PluginBase
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
</code></pre><p>Вы также можете создать файл <strong>init.php</strong> в папке с плагином и зарегистрировать команду в нем, используя метод <code>Artisan::add</code>:</p><pre><code>Artisan::add(new Acme\\Blog\\Console\\MyCommand);
</code></pre><h4 id="регистрация-команды-в-контеинере-приложения"><a href="#регистрация-команды-в-контеинере-приложения" class="header-anchor">#</a> Регистрация команды в контейнере приложения</h4><p>Если ваша команда зарегистрирована в <a href="./../services/application.html#app-container">контейнере приложения</a>, Вы можете использовать метод <code>Artisan::resolve</code>, чтобы сделать его доступным для Artisan:</p><pre><code>Artisan::resolve(&#39;binding.name&#39;);
</code></pre><h4 id="регистрация-команды-в-методе-boot"><a href="#регистрация-команды-в-методе-boot" class="header-anchor">#</a> Регистрация команды в методе <code>boot()</code></h4><pre><code>public function boot()
{
    $this-&gt;app-&gt;singleton(&#39;acme.mycommand&#39;, function() {
        return new \\Acme\\Blog\\Console\\MyConsoleCommand;
    });

    $this-&gt;commands(&#39;acme.mycommand&#39;);
}
</code></pre><p><a name="calling-other-commands" class="anchor"></a></p><h2 id="вызов-других-команд"><a href="#вызов-других-команд" class="header-anchor">#</a> Вызов других команд</h2><p>Вы можете использовать метод <code>call</code> для вызова других команд:</p><pre><code>$this-&gt;call(&#39;october:up&#39;);
</code></pre><p>Используйте массив для передачи параметров и аргументов:</p><pre><code>$this-&gt;call(&#39;october:update&#39;, [&#39;--force&#39; =&gt; true]);

$this-&gt;call(&#39;plugin:refresh&#39;, [&#39;name&#39; =&gt; &#39;October.Demo&#39;]);
</code></pre>`,61))])}const v=r(i,[["render",p]]);export{A as __pageData,v as default};
