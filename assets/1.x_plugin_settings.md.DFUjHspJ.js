import{_ as o,r as t,o as i,c as r,e as n,a as c,s as l}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Settings & Config - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Database settings","slug":"database-settings","link":"#database-settings","children":[{"level":3,"title":"Writing to a settings model","slug":"writing-to-a-settings-model","link":"#writing-to-a-settings-model","children":[]},{"level":3,"title":"Reading from a settings model","slug":"reading-from-a-settings-model","link":"#reading-from-a-settings-model","children":[]}]},{"level":2,"title":"Backend settings pages","slug":"backend-settings-pages","link":"#backend-settings-pages","children":[{"level":3,"title":"Settings link registration","slug":"settings-link-registration","link":"#settings-link-registration","children":[]},{"level":3,"title":"Setting the page navigation context","slug":"setting-the-page-navigation-context","link":"#setting-the-page-navigation-context","children":[]}]},{"level":2,"title":"File-based configuration","slug":"file-based-configuration","link":"#file-based-configuration","children":[]}],"relativePath":"1.x/plugin/settings.md","filePath":"1.x/plugin/settings.md"}'),p={name:"1.x/plugin/settings.md"};function g(d,e,h,u,m,f){const s=t("pre-heading"),a=t("post-heading");return i(),r("div",null,[n(s),e[0]||(e[0]=c("h1",null,"Settings & Config",-1)),n(a),e[1]||(e[1]=l(`<p>There are two ways to configure plugins - with back-end settings forms and with configuration files. Using database settings with back-end pages provide a better user experience, but they carry more overhead for the initial development. File-based configuration is suitable for configuration that is rarely modified.</p><h2 id="database-settings"><a href="#database-settings" class="header-anchor">#</a> Database settings</h2><p>You can create models for storing settings in the database by implementing the <code>SettingsModel</code> behavior in a model class. This model can be used directly for creating the back-end settings form. You don&#39;t need to create a database table and a controller for creating the back-end settings forms based on the settings model.</p><p>The settings model classes should extend the Model class and implement the <code>System.Behaviors.SettingsModel</code> behavior. The settings models, like any other models, should be defined in the <strong>models</strong> subdirectory of the plugin directory. The model from the next example should be defined in the <code>plugins/acme/demo/models/Settings.php</code> script.</p><pre><code>&lt;?php namespace Acme\\Demo\\Models;

use Model;

class Settings extends Model
{
    public $implement = [&#39;System.Behaviors.SettingsModel&#39;];

    // A unique code
    public $settingsCode = &#39;acme_demo_settings&#39;;

    // Reference to field configuration
    public $settingsFields = &#39;fields.yaml&#39;;
}
</code></pre><p>The <code>$settingsCode</code> property is required for settings models. It defines the unique settings key which is used for saving the settings to the database.</p><p>The <code>$settingsFields</code> property is required if are going to build a back-end settings form based on the model. The property specifies a name of the YAML file containing the form fields definition. The form fields are described in the <a href="./../backend/forms.html">Backend forms</a> article. The YAML file should be placed to the directory with the name matching the model class name in lowercase. For the model from the previous example the directory structure would look like this:</p><pre><code>plugins/
  acme/
    demo/
      models/
        settings/        &lt;=== Model files directory
          fields.yaml    &lt;=== Model form fields
        Settings.php     &lt;=== Model script
</code></pre><p>Settings models <a href="#backend-settings-pages">can be registered</a> to appear on the <strong>back-end Settings page</strong>, but it is not a requirement - you can set and read settings values like any other model.</p><h3 id="writing-to-a-settings-model"><a href="#writing-to-a-settings-model" class="header-anchor">#</a> Writing to a settings model</h3><p>The settings model has the static <code>set</code> method that allows to save individual or multiple values. You can also use the standard model features for setting the model properties and saving the model.</p><pre><code>use Acme\\Demo\\Models\\Settings;

...

// Set a single value
Settings::set(&#39;api_key&#39;, &#39;ABCD&#39;);

// Set an array of values
Settings::set([&#39;api_key&#39; =&gt; &#39;ABCD&#39;]);

// Set object values
$settings = Settings::instance();
$settings-&gt;api_key = &#39;ABCD&#39;;
$settings-&gt;save();
</code></pre><h3 id="reading-from-a-settings-model"><a href="#reading-from-a-settings-model" class="header-anchor">#</a> Reading from a settings model</h3><p>The settings model has the static <code>get</code> method that enables you to load individual properties. Also, when you instantiate a model with the <code>instance</code> method, it loads the properties from the database and you can access them directly.</p><pre><code>// Outputs: ABCD
echo Settings::instance()-&gt;api_key;

// Get a single value
echo Settings::get(&#39;api_key&#39;);

// Get a value and return a default value if it doesn&#39;t exist
echo Settings::get(&#39;is_activated&#39;, true);
</code></pre><h2 id="backend-settings-pages"><a href="#backend-settings-pages" class="header-anchor">#</a> Backend settings pages</h2><p>The back-end contains a dedicated area for housing settings and configuration, it can be accessed by clicking the <strong>Settings</strong> link in the main menu. The Settings page contains a list of links to the configuration pages registered by the system and other plugins.</p><h3 id="settings-link-registration"><a href="#settings-link-registration" class="header-anchor">#</a> Settings link registration</h3><p>The back-end settings navigation links can be extended by overriding the <code>registerSettings</code> method inside the <a href="./registration.html#registration-file">Plugin registration class</a>. When you create a configuration link you have two options - create a link to a specific back-end page, or create a link to a settings model. The next example shows how to create a link to a back-end page.</p><pre><code>public function registerSettings()
{
    return [
        &#39;location&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;Locations&#39;,
            &#39;description&#39; =&gt; &#39;Manage available user countries and states.&#39;,
            &#39;category&#39;    =&gt; &#39;Users&#39;,
            &#39;icon&#39;        =&gt; &#39;icon-globe&#39;,
            &#39;url&#39;         =&gt; Backend::url(&#39;acme/user/locations&#39;),
            &#39;order&#39;       =&gt; 500,
            &#39;keywords&#39;    =&gt; &#39;geography place placement&#39;
        ]
    ];
}
</code></pre><blockquote><p><strong>Note:</strong> Back-end settings pages should <a href="#setting-the-page-navigation-context">set the settings context</a> in order to mark the corresponding settings menu item active in the System page sidebar. Settings context for settings models is detected automatically.</p></blockquote><p>The following example creates a link to a settings model. Settings models is a part of the settings API which is described above in the <a href="#database-settings">Database settings</a> section.</p><pre><code>public function registerSettings()
{
    return [
        &#39;settings&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;User Settings&#39;,
            &#39;description&#39; =&gt; &#39;Manage user based settings.&#39;,
            &#39;category&#39;    =&gt; &#39;Users&#39;,
            &#39;icon&#39;        =&gt; &#39;icon-cog&#39;,
            &#39;class&#39;       =&gt; &#39;Acme\\User\\Models\\Settings&#39;,
            &#39;order&#39;       =&gt; 500,
            &#39;keywords&#39;    =&gt; &#39;security location&#39;,
            &#39;permissions&#39; =&gt; [&#39;acme.users.access_settings&#39;]
        ]
    ];
}
</code></pre><p>The optional <code>keywords</code> parameter is used by the settings search feature. If keywords are not provided, the search uses only the settings item label and description.</p><h3 id="setting-the-page-navigation-context"><a href="#setting-the-page-navigation-context" class="header-anchor">#</a> Setting the page navigation context</h3><p>Just like <a href="./../backend/controllers-ajax.html#setting-the-navigation-context">setting navigation context in the controller</a>, Back-end settings pages should set the settings navigation context. It&#39;s required in order to mark the current settings link in the System page sidebar as active. Use the <code>System\\Classes\\SettingsManager</code> class to set the settings context. Usually it could be done in the controller constructor:</p><pre><code>public function __construct()
{
    parent::__construct();

    [...]

    BackendMenu::setContext(&#39;October.System&#39;, &#39;system&#39;, &#39;settings&#39;);
    SettingsManager::setContext(&#39;You.Plugin&#39;, &#39;settings&#39;);
}
</code></pre><p>The first argument of the <code>setContext</code> method is the settings item owner in the following format: <strong>author.plugin</strong>. The second argument is the setting name, the same as you provided when <a href="#settings-link-registration">registering the back-end settings page</a>.</p><h2 id="file-based-configuration"><a href="#file-based-configuration" class="header-anchor">#</a> File-based configuration</h2><p>Plugins can have a configuration file <code>config.php</code> in the <code>config</code> subdirectory of the plugin directory. The configuration files are PHP scripts that define and return an <strong>array</strong>. Example configuration file <code>plugins/acme/demo/config/config.php</code>:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;maxItems&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;display&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">5</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre></div><p>Use the <code>Config</code> class for accessing the configuration values defined in the configuration file. The <code>Config::get($name, $default = null)</code> method accepts the plugin and the parameter name in the following format: <strong>Acme.Demo::maxItems</strong>. The second optional parameter defines the default value to return if the configuration parameter doesn&#39;t exist. Example:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">Config</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token variable">$maxItems</span> <span class="token operator">=</span> <span class="token class-name static-context">Config</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;acme.demo::maxItems&#39;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>You may also use a different filename for the configuration file and this affects the key name. For example, a configuration file named <strong>custom.php</strong> will prefix the key name with <code>custom</code>, using the following format: <strong>Acme.Demo::custom.maxItems</strong>. Example configuration file <strong>plugins/acme/demo/config/custom.php</strong>.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$maxItems</span> <span class="token operator">=</span> <span class="token class-name static-context">Config</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;acme.demo::custom.maxItems&#39;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>A plugin configuration can be overridden by the application by creating a configuration file <code>config/author/plugin/config.php</code>, for example <code>config/acme/todo/config.php</code>, or <code>config/acme/todo/dev/config.php</code> for different environment. Inside the overridden configuration file you can return only values you want to override:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;maxItems&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">20</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre></div><p>If you want to use separate configurations across different environments (eg: <strong>dev</strong>, <strong>production</strong>), simply create another file in <code>config/author/plugin/environment/config.php</code>. Replace <strong>environment</strong> with the environment name. This will be merged with <code>config/author/plugin/config.php</code>.</p><p>Example:</p><p><strong>config/author/plugin/production/config.php:</strong></p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;maxItems&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">25</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre></div><p>This will set <code>maxItems</code> to 25 when <code>APP_ENV</code> is set to <strong>production</strong>.</p>`,42))])}const v=o(p,[["render",g]]);export{b as __pageData,v as default};
