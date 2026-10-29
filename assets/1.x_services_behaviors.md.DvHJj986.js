import{_ as l,r as o,o as r,c,e as a,a as e,d as t,s as d}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"Behaviors - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Comparison to traits","slug":"comparison-to-traits","link":"#comparison-to-traits","children":[]},{"level":2,"title":"Extending constructors","slug":"extending-constructors","link":"#extending-constructors","children":[{"level":4,"title":"Dynamically declaring properties","slug":"dynamically-declaring-properties","link":"#dynamically-declaring-properties","children":[]},{"level":4,"title":"Retrieving dynamic properties","slug":"retrieving-dynamic-properties","link":"#retrieving-dynamic-properties","children":[]},{"level":4,"title":"Dynamically creating methods","slug":"dynamically-creating-methods","link":"#dynamically-creating-methods","children":[]},{"level":4,"title":"Checking the existence of a method","slug":"checking-the-existence-of-a-method","link":"#checking-the-existence-of-a-method","children":[]},{"level":4,"title":"List all available methods","slug":"list-all-available-methods","link":"#list-all-available-methods","children":[]},{"level":4,"title":"Dynamically implementing a behavior","slug":"dynamically-implementing-a-behavior","link":"#dynamically-implementing-a-behavior","children":[]}]},{"level":2,"title":"Usage example","slug":"usage-example","link":"#usage-example","children":[{"level":4,"title":"Behavior / Extension class","slug":"behavior-extension-class","link":"#behavior-extension-class","children":[]},{"level":4,"title":"Extending a class","slug":"extending-a-class","link":"#extending-a-class","children":[]},{"level":4,"title":"Using the extension","slug":"using-the-extension","link":"#using-the-extension","children":[]},{"level":4,"title":"Detecting utilized extensions","slug":"detecting-utilized-extensions","link":"#detecting-utilized-extensions","children":[]},{"level":3,"title":"Soft definition","slug":"soft-definition","link":"#soft-definition","children":[]},{"level":3,"title":"Using Traits instead of base classes","slug":"using-traits-instead-of-base-classes","link":"#using-traits-instead-of-base-classes","children":[]}]}],"relativePath":"1.x/services/behaviors.md","filePath":"1.x/services/behaviors.md"}'),h={name:"1.x/services/behaviors.md"};function p(m,n,u,g,b,f){const i=o("pre-heading"),s=o("post-heading");return r(),c("div",null,[a(i),n[0]||(n[0]=e("h1",null,"Behaviors",-1)),a(s),n[1]||(n[1]=e("p",null,[t("Behaviors add the ability for classes to have "),e("em",null,"private traits"),t(", also known as Behaviors. These are similar to "),e("a",{href:"http://php.net/manual/en/language.oop5.traits.php",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("native PHP Traits"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" except they have some distinct benefits:")],-1)),n[2]||(n[2]=d(`<ol><li>Behaviors have their own constructor.</li><li>Behaviors can have private or protected methods.</li><li>Methods and property names can conflict safely.</li><li>Classes can be extended with behaviors dynamically.</li></ol><h2 id="comparison-to-traits"><a href="#comparison-to-traits" class="header-anchor">#</a> Comparison to traits</h2><p>Where you might use a PHP trait like this:</p><pre><code>class MyClass
{
    use \\October\\Rain\\UtilityFunctions;
    use \\October\\Rain\\DeferredBinding;
}
</code></pre><p>A behavior is used in a similar fashion:</p><pre><code>class MyClass extends \\October\\Rain\\Extension\\Extendable
{
    public $implement = [
        &#39;October.Rain.UtilityFunctions&#39;,
        &#39;October.Rain.DeferredBinding&#39;,
    ];
}
</code></pre><blockquote><p><strong>Note</strong>: Implementing behaviors is case sensitive, so <code>RainLab.Translate.Behaviors.TranslatableModel</code> will work but <code>Rainlab.Translate.Behaviors.TranslatableModel</code> will not.</p></blockquote><p>Where you might define a trait like this:</p><pre><code>trait UtilityFunctions
{
    public function sayHello()
    {
        echo &quot;Hello from &quot; . get_class($this);
    }
}
</code></pre><p>A behavior is defined like this:</p><pre><code>class UtilityFunctions extends \\October\\Rain\\Extension\\ExtensionBase
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
</code></pre><p>The extended object is always passed as the first parameter to the Behavior&#39;s constructor.</p><p>To summarize:</p><ul><li>Extend \\October\\Rain\\Extension\\ExtensionBase to declare your class as a Behaviour</li><li>The class wanting to -implement- the Behaviour needs to extend \\October\\Rain\\Extension\\Extendable</li></ul><blockquote><p><strong>Note</strong>: See <a href="#using-traits-instead-of-base-classes">Using traits instead of base classes</a></p></blockquote><h2 id="extending-constructors"><a href="#extending-constructors" class="header-anchor">#</a> Extending constructors</h2><p>Any class that uses the <code>Extendable</code> or <code>ExtendableTrait</code> can have its constructor extended with the static <code>extend</code> method. The argument should pass a closure that will be called as part of the class constructor.</p><pre><code>MyNamespace\\Controller::extend(function($controller) {
    //
});
</code></pre><h4 id="dynamically-declaring-properties"><a href="#dynamically-declaring-properties" class="header-anchor">#</a> Dynamically declaring properties</h4><p>Properties can be declared on an extendable object by calling <code>addDynamicProperty</code> and passing a property name and value.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicProperty(&#39;tagsCache&#39;, null);
});
</code></pre><blockquote><p><strong>Note</strong>: Attempting to set undeclared properties through normal means (<code>$this-&gt;foo = &#39;bar&#39;;</code>) on an object that implements the <strong>October\\Rain\\Extension\\ExtendableTrait</strong> will not work. It won&#39;t throw an exception, but it will not autodeclare the property either. <code>addDynamicProperty</code> must be called in order to set previously undeclared properties on extendable objects.</p></blockquote><h4 id="retrieving-dynamic-properties"><a href="#retrieving-dynamic-properties" class="header-anchor">#</a> Retrieving dynamic properties</h4><p>Properties created dynamically can be retrieved with the getDynamicProperties function inherited from the ExtendableTrait.</p><p>So retrieving all dynamic properties would look like this:</p><pre><code>$model-&gt;getDynamicProperties();
</code></pre><p>This will return an associative array [key =&gt; value], with the key being the dynamic property name and the value being the property value.</p><p>If we know what property we want we can simply append the key (property name) to the function:</p><pre><code>$model-&gt;getDynamicProperties()[$key];
</code></pre><h4 id="dynamically-creating-methods"><a href="#dynamically-creating-methods" class="header-anchor">#</a> Dynamically creating methods</h4><p>Methods can be created to an extendable object by calling <code>addDynamicMethod</code> and passing a method name and callable object, like a <code>Closure</code>.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicProperty(&#39;tagsCache&#39;, null);

    $model-&gt;addDynamicMethod(&#39;getTagsAttribute&#39;, function() use ($model) {
        if ($this-&gt;tagsCache) {
            return $this-&gt;tagsCache;
        } else {
            return $this-&gt;tagsCache = $model-&gt;tags()-&gt;lists(&#39;name&#39;);
        }
    });
});
</code></pre><h4 id="checking-the-existence-of-a-method"><a href="#checking-the-existence-of-a-method" class="header-anchor">#</a> Checking the existence of a method</h4><p>You can check for the existence of a method in an <code>Extendable</code> class by using the <code>methodExists</code> method - similar to the PHP <code>method_exists()</code> function. This will detect both standard methods and dynamic methods that have been added through a <code>addDynamicMethod</code> call. <code>methodExists</code> accepts one parameter: a string of the method name to check the existence of.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicMethod(&#39;getTagsAttribute&#39;, function () use ($model) {
        return $this-&gt;tagsCache;
    });
});

$post = new Post;

$post-&gt;methodExists(&#39;getTagsAttribute&#39;); // true
$post-&gt;methodExists(&#39;missingMethod&#39;); // false
</code></pre><h4 id="list-all-available-methods"><a href="#list-all-available-methods" class="header-anchor">#</a> List all available methods</h4><p>To retrieve a list of all available methods in an <code>Extendable</code> class, you can use the <code>getClassMethods</code> method. This method operates similar to the PHP <code>get_class_methods()</code> function in that it returns an array of available methods in a class, but in addition to defined methods in the class, it will also list any methods provided by an extension or through an <code>addDynamicMethod</code> call.</p><pre><code>Post::extend(function($model) {
    $model-&gt;addDynamicMethod(&#39;getTagsAttribute&#39;, function () use ($model) {
        return $this-&gt;tagsCache;
    });
});

$post = new Post;

$methods = $post-&gt;getClassMethods();

/**
 * $methods = [
 *   0 =&gt; &#39;__construct&#39;,
 *   1 =&gt; &#39;extend&#39;,
 *   2 =&gt; &#39;getTagsAttribute&#39;,
 *   ...
 * ];
 */
</code></pre><h4 id="dynamically-implementing-a-behavior"><a href="#dynamically-implementing-a-behavior" class="header-anchor">#</a> Dynamically implementing a behavior</h4><p>This unique ability to extend constructors allows behaviors to be implemented dynamically, for example:</p><pre><code>/**
 * Extend the RainLab.Users controller to include the RelationController behavior too
 */
RainLab\\Users\\Controllers\\Users::extend(function($controller) {

    // Implement the list controller behavior dynamically
    $controller-&gt;implement[] = &#39;Backend.Behaviors.RelationController&#39;;

    // Declare the relationConfig property dynamically for the RelationController behavior to use
    $controller-&gt;addDynamicProperty(&#39;relationConfig&#39;, &#39;$/myvendor/myplugin/controllers/users/config_relation.yaml&#39;);
});
</code></pre><h2 id="usage-example"><a href="#usage-example" class="header-anchor">#</a> Usage example</h2><h4 id="behavior-extension-class"><a href="#behavior-extension-class" class="header-anchor">#</a> Behavior / Extension class</h4><pre><code>&lt;?php namespace MyNamespace\\Behaviors;

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
</code></pre><h4 id="extending-a-class"><a href="#extending-a-class" class="header-anchor">#</a> Extending a class</h4><p>This <code>Controller</code> class will implement the <code>FormController</code> behavior and then the methods will become available (mixed in) to the class. We will override the <code>otherMethod</code> method.</p><pre><code>&lt;?php namespace MyNamespace;

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
</code></pre><h4 id="using-the-extension"><a href="#using-the-extension" class="header-anchor">#</a> Using the extension</h4><pre><code>$controller = new MyNamespace\\Controller;

// Prints: I come from the FormController Behavior!
echo $controller-&gt;someMethod();

// Prints: I come from the main Controller!
echo $controller-&gt;otherMethod();

// Prints: You might not see me...
echo $controller-&gt;asExtension(&#39;FormController&#39;)-&gt;otherMethod();
</code></pre><h4 id="detecting-utilized-extensions"><a href="#detecting-utilized-extensions" class="header-anchor">#</a> Detecting utilized extensions</h4><p>To check if an object has been extended with a behavior, you may use the <code>isClassExtendedWith</code> method on the object.</p><pre><code>$controller-&gt;isClassExtendedWith(&#39;Backend.Behaviors.RelationController&#39;);
</code></pre><p>Below is an example of dynamically extending a <code>UsersController</code> of a third-party plugin utilizing this method to avoid preventing other plugins from also extending the afore-mentioned third-party plugin.</p><pre><code>UsersController::extend(function($controller) {

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

    $controller-&gt;relationConfig = $controller-&gt;mergeConfig(
        $controller-&gt;relationConfig,
        $myConfigPath
    );

}
</code></pre><h3 id="soft-definition"><a href="#soft-definition" class="header-anchor">#</a> Soft definition</h3><p>If a behavior class does not exist, like a trait, a <em>Class not found</em> error will be thrown. In some cases you may wish to suppress this error, for conditional implementation if a behavior is present in the system. You can do this by placing an <code>@</code> symbol at the beginning of the class name.</p><pre><code>class User extends \\October\\Rain\\Extension\\Extendable
{
    public $implement = [&#39;@RainLab.Translate.Behaviors.TranslatableModel&#39;];
}
</code></pre><p>If the class name <code>RainLab\\Translate\\Behaviors\\TranslatableModel</code> does not exist, no error will be thrown. This is the equivalent of the following code:</p><pre><code>class User extends \\October\\Rain\\Extension\\Extendable
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
</code></pre><h3 id="using-traits-instead-of-base-classes"><a href="#using-traits-instead-of-base-classes" class="header-anchor">#</a> Using Traits instead of base classes</h3><p>For those cases where you may not wish to extend the <code>ExtensionBase</code> or <code>Extendable</code> classes, you can use the traits instead. Your classes will have to be implemented as follows:</p><p>First let&#39;s create the class that will act as a Behaviour, ie. can be -implemented- by other classes.</p><pre><code>&lt;?php namespace MyNamespace\\Behaviours;

class WaveBehaviour
{
    use \\October\\Rain\\Extension\\ExtensionTrait;

    /**
     * When using the Extensiontrait, your behaviour also has to implement this method
     * @see \\October\\Rain\\Extension\\ExtensionBase
     */
    public static function extend(callable $callback)
    {
        self::extensionExtendCallback($callback);
    }

    public function wave()
    {
        echo &quot;*waves*&lt;br&gt;&quot;;
    }
}
</code></pre><p>Now let&#39;s create the class that is able to -implement- behaviours using the ExtendableTrait.</p><pre><code>class AI
{
    use \\October\\Rain\\Extension\\ExtendableTrait;

    /**
     * @var array Extensions implemented by this class.
     */
    public $implement;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this-&gt;extendableConstruct();
    }
    public function __get($name)
    {
        return $this-&gt;extendableGet($name);
    }
    public function __set($name, $value)
    {
        $this-&gt;extendableSet($name, $value);
    }
    public function __call($name, $params)
    {
        return $this-&gt;extendableCall($name, $params);
    }
    public static function __callStatic($name, $params)
    {
        return self::extendableCallStatic($name, $params);
    }
    public static function extend(callable $callback)
    {
        self::extendableExtendCallback($callback);
    }

    public function youGotBrains()
    {
        echo &quot;I&#39;ve got an AI!&lt;br&gt;&quot;;
    }
}
</code></pre><p>The AI class is now able to use behaviours. Let&#39;s extend it and have this class implement the WaveBehaviour.</p><pre><code>&lt;?php namespace MyNamespace\\Classes;

class Robot extends AI
{
    public $implement = [
        &#39;MyNamespace.Behaviours.WaveBehaviour&#39;
    ];

    public function identify()
    {
        echo &quot;I&#39;m a Robot&lt;br&gt;&quot;;
        echo $this-&gt;youGotBrains();
        echo $this-&gt;wave();
    }
}
</code></pre><p>You can now utilize the Robot as follows:</p><pre><code>    $robot = new Robot();
    $robot-&gt;identify();
</code></pre><p>Which will output:</p><pre><code>I&#39;m a Robot
I&#39;ve got an AI!
*waves*
</code></pre><p>Remember:</p><ul><li><p>When using the <code>ExtensionTrait</code> the methods from <code>ExtensionBase</code> should be applied to the class.</p></li><li><p>When using the <code>ExtendableTrait</code> the methods from <code>Extendable</code> should be applied to the class.</p></li></ul>`,73))])}const v=l(h,[["render",p]]);export{x as __pageData,v as default};
