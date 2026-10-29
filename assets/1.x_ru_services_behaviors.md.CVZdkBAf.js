import{_ as i,r as t,o as s,c,e as r,a as e,d as o,s as d}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Поведения ( Behaviors ) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Сравнение с трейтами","slug":"сравнение-с-треитами","link":"#сравнение-с-треитами","children":[]},{"level":2,"title":"Расширение конструкторов","slug":"расширение-конструкторов","link":"#расширение-конструкторов","children":[{"level":4,"title":"Динамическое объявление свойств","slug":"динамическое-объявление-своиств","link":"#динамическое-объявление-своиств","children":[]},{"level":4,"title":"Динамическое создание методов","slug":"динамическое-создание-методов","link":"#динамическое-создание-методов","children":[]},{"level":4,"title":"Динамическая имплементация поведения","slug":"динамическая-имплементация-поведения","link":"#динамическая-имплементация-поведения","children":[]}]},{"level":2,"title":"Примеры","slug":"примеры","link":"#примеры","children":[{"level":4,"title":"Behavior / Extension class","slug":"behavior-extension-class","link":"#behavior-extension-class","children":[]},{"level":4,"title":"Расширение класса","slug":"расширение-класса","link":"#расширение-класса","children":[]},{"level":4,"title":"Использование расширения","slug":"использование-расширения","link":"#использование-расширения","children":[]},{"level":4,"title":"Обнаружение использованных расширений","slug":"обнаружение-использованных-расширении","link":"#обнаружение-использованных-расширении","children":[]},{"level":3,"title":"Мягкое определение","slug":"мягкое-определение","link":"#мягкое-определение","children":[]},{"level":3,"title":"Использование трейтов вместо базовых классов","slug":"использование-треитов-вместо-базовых-классов","link":"#использование-треитов-вместо-базовых-классов","children":[]}]}],"relativePath":"1.x/ru/services/behaviors.md","filePath":"1.x/ru/services/behaviors.md"}'),h={name:"1.x/ru/services/behaviors.md"};function p(m,n,u,g,f,v){const l=t("pre-heading"),a=t("post-heading");return s(),c("div",null,[r(l),n[0]||(n[0]=e("h1",null,"Поведения ( Behaviors )",-1)),r(a),n[1]||(n[1]=e("p",null,[e("a",{href:"introduction",name:"introduction",class:"anchor"})],-1)),n[2]||(n[2]=e("h2",{id:"введение"},[e("a",{href:"#введение",class:"header-anchor"},"#"),o(" Введение")],-1)),n[3]||(n[3]=e("p",null,[o("Поведения позволяют классам иметь "),e("em",null,"приватные трейты"),o(" и являются аналогией "),e("a",{href:"http://php.net/manual/en/language.oop5.traits.php",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("native PHP Traits"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),e("span",{class:"sr-only"},"(opens new window)")])]),o(" за исключением того, что они имеют некоторые преимущества:")],-1)),n[4]||(n[4]=d(`<ol><li>Поведения имеют собственный конструктор.</li><li>Поведения могут иметь приватные (private) и защищенные (protected) методы.</li><li>Названия методов и свойств могут безопасно конфликтовать.</li><li>Классы могут быть динамически расширены поведением.</li></ol><p><a href="compare-traits" name="compare-traits" class="anchor"></a></p><h2 id="сравнение-с-треитами"><a href="#сравнение-с-треитами" class="header-anchor">#</a> Сравнение с трейтами</h2><p>Трейт:</p><pre><code>class MyClass
{
    use \\October\\Rain\\UtilityFunctions;
    use \\October\\Rain\\DeferredBinding;
}
</code></pre><p>Поведение:</p><pre><code>class MyClass extends \\October\\Rain\\Extension\\Extendable
{
    public $implement = [
        &#39;October.Rain.UtilityFunctions&#39;,
        &#39;October.Rain.DeferredBinding&#39;,
    ];
}
</code></pre><p>Трейт:</p><pre><code>trait UtilityFunctions
{
    public function sayHello()
    {
        echo &quot;Hello from &quot; . get_class($this);
    }
}
</code></pre><p>Поведение:</p><pre><code>class UtilityFunctions extends \\October\\Rain\\Extension\\ExtensionBase
{
    protected $parent;

    public function __construct($parent)
    {
        $this-&gt;parent = $parent;
    }

    public function sayHello()
    {
        echo &quot;Hello from &quot; . get_class($this-&gt;parent);
    }
}
</code></pre><p>Расширенный объект всегда передается в качестве первого параметра конструктору.</p><p><a href="constructor-extension" name="constructor-extension" class="anchor"></a></p><h2 id="расширение-конструкторов"><a href="#расширение-конструкторов" class="header-anchor">#</a> Расширение конструкторов</h2><p>Классы, которые используют <code>Extendable</code> или <code>ExtendableTrait</code> могут иметь конструктор, который можно расширить при помощи статического метода <code>extend</code>. Аргументом является функция-замыкания:</p><pre><code>MyNamespace\\Controller::extend(function($controller) {
    //
});
</code></pre><h4 id="динамическое-объявление-своиств"><a href="#динамическое-объявление-своиств" class="header-anchor">#</a> Динамическое объявление свойств</h4><p>Вы можете задать свойства динамически при помощи метода <code>addDynamicProperty</code>. Первый аргумент - название свойства, второй - его значение.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicProperty(&#39;tagsCache&#39;, null);
});
</code></pre><h4 id="динамическое-создание-методов"><a href="#динамическое-создание-методов" class="header-anchor">#</a> Динамическое создание методов</h4><p>Вы можете создать методы динамически при помощи метода <code>addDynamicMethod</code>. Первый аргумент - название метода, второй - <code>Closure</code>.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicProperty(&#39;tagsCache&#39;, null);

    $model-&gt;addDynamicMethod(&#39;getTagsAttribute&#39;, function() use ($model) {
        if ($this-&gt;tagsCache) {
            return $this-&gt;tagsCache;
        } else {
            return $this-&gt;tagsCache = $model-&gt;tags()-&gt;lists(&#39;name&#39;);
        }
    });
});
</code></pre><h4 id="динамическая-имплементация-поведения"><a href="#динамическая-имплементация-поведения" class="header-anchor">#</a> Динамическая имплементация поведения</h4><p>Эта уникальная возможность позволяет динамически изменять поведение, например:</p><pre><code>/**
 * Extend the RainLab.Users controller to include the RelationController behavior too
 */
RainLab\\Users\\Controllers\\Users::extend(function($controller) {

    // Implement the list controller behavior dynamically
    $controller-&gt;implement[] = &#39;Backend.Behaviors.RelationController&#39;;

    // Declare the relationConfig property dynamically for the RelationController behavior to use
    $controller-&gt;addDynamicProperty(&#39;relationConfig&#39;, &#39;$/myvendor/myplugin/controllers/users/config_relation.yaml&#39;);
});
</code></pre><p><a href="usage-example" name="usage-example" class="anchor"></a></p><h2 id="примеры"><a href="#примеры" class="header-anchor">#</a> Примеры</h2><h4 id="behavior-extension-class"><a href="#behavior-extension-class" class="header-anchor">#</a> Behavior / Extension class</h4><pre><code>&lt;?php namespace MyNamespace\\Behaviors;

class FormController extends \\October\\Rain\\Extension\\ExtensionBase
{
    /**
     * @var Reference to the extended object.
     */
    protected $controller;

    /**
     * Constructor
     */
    public function __construct($controller)
    {
        $this-&gt;controller = $controller;
    }

    public function someMethod()
    {
        return &quot;I come from the FormController Behavior!&quot;;
    }

    public function otherMethod()
    {
        return &quot;You might not see me...&quot;;
    }
}
</code></pre><h4 id="расширение-класса"><a href="#расширение-класса" class="header-anchor">#</a> Расширение класса</h4><p>This <code>Controller</code> class will implement the <code>FormController</code> behavior and then the methods will become available (mixed in) to the class. We will override the <code>otherMethod</code> method.</p><pre><code>&lt;?php namespace MyNamespace;

class Controller extends \\October\\Rain\\Extension\\Extendable
{

    /**
     * Implement the FormController behavior
     */
    public $implement = [
        &#39;MyNamespace.Behaviors.FormController&#39;
    ];

    public function otherMethod()
    {
        return &quot;I come from the main Controller!&quot;;
    }
}
</code></pre><h4 id="использование-расширения"><a href="#использование-расширения" class="header-anchor">#</a> Использование расширения</h4><pre><code>$controller = new MyNamespace\\Controller;

// Prints: I come from the FormController Behavior!
echo $controller-&gt;someMethod();

// Prints: I come from the main Controller!
echo $controller-&gt;otherMethod();

// Prints: You might not see me...
echo $controller-&gt;asExtension(&#39;FormController&#39;)-&gt;otherMethod();
</code></pre><h4 id="обнаружение-использованных-расширении"><a href="#обнаружение-использованных-расширении" class="header-anchor">#</a> Обнаружение использованных расширений</h4><p>Используйте метод <code>isClassExtendedWith</code>, чтобы проверить, был ли объект расширен при помощи поведения:</p><pre><code>$controller-&gt;isClassExtendedWith(&#39;Backend.Behaviors.RelationController&#39;);
</code></pre><p>Пример:</p><pre><code>UsersController::extend(function($controller) {

    // Implement behavior if not already implemented
    if (!$controller-&gt;isClassExtendedWith(&#39;Backend.Behaviors.RelationController&#39;)) {
        $controller-&gt;implement[] = &#39;Backend.Behaviors.RelationController&#39;;
    }

    // Define property if not already defined
    if (!isset($controller-&gt;relationConfig)) {
        $controller-&gt;addDynamicProperty(&#39;relationConfig&#39;);
    }

    // Splice in configuration safely
    $myConfigPath = &#39;$/myvendor/myplugin/controllers/users/config_relation.yaml&#39;;

    $controller-&gt;relationConfig = $this-&gt;mergeConfig(
        $controller-&gt;relationConfig,
        $myConfigPath
    );

}
</code></pre><h3 id="мягкое-определение"><a href="#мягкое-определение" class="header-anchor">#</a> Мягкое определение</h3><p>Используйте символ <code>@</code>, чтобы избежать ошибки <em>Class not found</em>, при использовании поведений:</p><pre><code>class User extends \\October\\Rain\\Extension\\Extendable
{
    public $implement = [&#39;@RainLab.Translate.Behaviors.TranslatableModel&#39;];
}
</code></pre><p>Если класс <code>RainLab\\Translate\\Behaviors\\TranslatableModel</code> не существует, то ошибка не будет отображаться. Это эквивалентно следующему коду:</p><pre><code>class User extends \\October\\Rain\\Extension\\Extendable
{
    public $implement = [];

    public function __construct()
    {
        if (class_exists(&#39;RainLab\\Translate\\Behaviors\\TranslatableModel&#39;)) {
            $this-&gt;implement[] = &#39;RainLab.Translate.Behaviors.TranslatableModel&#39;;
        }

        parent::__construct();
    }
}
</code></pre><h3 id="использование-треитов-вместо-базовых-классов"><a href="#использование-треитов-вместо-базовых-классов" class="header-anchor">#</a> Использование трейтов вместо базовых классов</h3><p>В некоторых случаях Вы можете не захотеть расширять классы <code>ExtensionBase</code> или <code>Extendable</code>. В таком случае, Вы можете использовать трейты. Очевидно, что поведения не доступны родительскому классу.</p><ul><li><p>При использовании <code>ExtensionTrait</code> методы класса<code> ExtensionBase</code> должны применяться к классу.</p></li><li><p>При использовании <code>ExtendableTrait</code> методы класса <code>Extendable</code> должны применяться к классу.</p></li></ul>`,47))])}const C=i(h,[["render",p]]);export{b as __pageData,C as default};
