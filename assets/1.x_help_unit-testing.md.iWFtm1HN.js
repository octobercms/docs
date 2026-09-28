import{_ as l,r as s,o as r,c as u,e as o,a as e,s as g,d as t}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Unit Testing - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Testing plugins","slug":"testing-plugins","link":"#testing-plugins","children":[{"level":3,"title":"Creating plugin tests","slug":"creating-plugin-tests","link":"#creating-plugin-tests","children":[{"level":4,"title":"Changing database engine for plugins tests","slug":"changing-database-engine-for-plugins-tests","link":"#changing-database-engine-for-plugins-tests","children":[]}]}]},{"level":2,"title":"System testing","slug":"system-testing","link":"#system-testing","children":[{"level":3,"title":"Unit tests","slug":"unit-tests","link":"#unit-tests","children":[]},{"level":3,"title":"Functional tests","slug":"functional-tests","link":"#functional-tests","children":[]}]}],"relativePath":"1.x/help/unit-testing.md","filePath":"1.x/help/unit-testing.md"}'),c={name:"1.x/help/unit-testing.md"};function p(d,n,h,f,b,m){const i=s("pre-heading"),a=s("post-heading");return r(),u("div",null,[o(i),n[0]||(n[0]=e("h1",null,"Unit Testing",-1)),o(a),n[1]||(n[1]=g(`<h2 id="testing-plugins"><a href="#testing-plugins" class="header-anchor">#</a> Testing plugins</h2><p>Individual plugin test cases can be run by running <code>../../../vendor/bin/phpunit</code> in the plugin&#39;s base directory (ex. <code>plugins/acme/demo</code>.</p><h3 id="creating-plugin-tests"><a href="#creating-plugin-tests" class="header-anchor">#</a> Creating plugin tests</h3><p>Plugins can be tested by creating a file called <code>phpunit.xml</code> in the base directory with the following content, for example, in a file <strong>/plugins/acme/blog/phpunit.xml</strong>:</p><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;phpunit backupGlobals=&quot;false&quot;
         backupStaticAttributes=&quot;false&quot;
         bootstrap=&quot;../../../tests/bootstrap.php&quot;
         colors=&quot;true&quot;
         convertErrorsToExceptions=&quot;true&quot;
         convertNoticesToExceptions=&quot;true&quot;
         convertWarningsToExceptions=&quot;true&quot;
         processIsolation=&quot;false&quot;
         stopOnFailure=&quot;false&quot;
&gt;
    &lt;testsuites&gt;
        &lt;testsuite name=&quot;Plugin Unit Test Suite&quot;&gt;
            &lt;directory&gt;./tests&lt;/directory&gt;
        &lt;/testsuite&gt;
    &lt;/testsuites&gt;
    &lt;php&gt;
        &lt;env name=&quot;APP_ENV&quot; value=&quot;testing&quot;/&gt;
        &lt;env name=&quot;CACHE_DRIVER&quot; value=&quot;array&quot;/&gt;
        &lt;env name=&quot;SESSION_DRIVER&quot; value=&quot;array&quot;/&gt;
    &lt;/php&gt;
&lt;/phpunit&gt;
</code></pre><p>Then a <strong>tests/</strong> directory can be created to contain the test classes. The file structure should mimic the base directory with classes having a <code>Test</code> suffix. Using a namespace for the class is also recommended.</p><pre><code>&lt;?php namespace Acme\\Blog\\Tests\\Models;

use Acme\\Blog\\Models\\Post;
use PluginTestCase;

class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create([&#39;title&#39; =&gt; &#39;Hi!&#39;]);
        $this-&gt;assertEquals(1, $post-&gt;id);
    }
}
</code></pre><p>The test class should extend the base class <code>PluginTestCase</code> and this is a special class that will set up the October database stored in memory, as part of the <code>setUp</code> method. It will also refresh the plugin being tested, along with any of the defined dependencies in the plugin registration file. This is the equivalent of running the following before each test:</p><pre><code>php artisan october:up
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh &lt;dependency&gt;, ...]
</code></pre><blockquote><p><strong>Note:</strong> If your plugin uses <a href="./../plugin/settings.html#file-based-configuration">configuration files</a>, then you will need to run <code>System\\Classes\\PluginManager::instance()-&gt;registerAll(true);</code> in the <code>setUp</code> method of your tests. Below is an example of a base test case class that should be used if you need to test your plugin working with other plugins instead of in isolation.</p></blockquote><pre><code>use System\\Classes\\PluginManager;

class BaseTestCase extends PluginTestCase
{
    public function setUp(): void
    {
        parent::setUp();

        // Get the plugin manager
        $pluginManager = PluginManager::instance();

        // Register the plugins to make features like file configuration available
        $pluginManager-&gt;registerAll(true);

        // Boot all the plugins to test with dependencies of this plugin
        $pluginManager-&gt;bootAll(true);
    }

    public function tearDown(): void
    {
        parent::tearDown();

        // Get the plugin manager
        $pluginManager = PluginManager::instance();

        // Ensure that plugins are registered again for the next test
        $pluginManager-&gt;unregisterAll();
    }
}
</code></pre><h4 id="changing-database-engine-for-plugins-tests"><a href="#changing-database-engine-for-plugins-tests" class="header-anchor">#</a> Changing database engine for plugins tests</h4><p>By default OctoberCMS uses SQLite stored in memory for the plugin testing environment. If you want to override the default behavior set the <code>useConfigForTesting</code> config to <code>true</code> in your <code>/config/database.php</code> file. When the <code>APP_ENV</code> is <code>testing</code> and the <code>useConfigForTesting</code> is <code>true</code> database parameters will be taken from <code>/config/database.php</code>.</p><p>You can override the <code>/config/database.php</code> file by creating <code>/config/testing/database.php</code>. In this case variables from the latter file will be taken.</p><h2 id="system-testing"><a href="#system-testing" class="header-anchor">#</a> System testing</h2><p>To perform unit testing on the core October files, you should download a development copy using Composer or cloning the Git repository. This will ensure you have the <code>tests/</code> directory necessary to run unit tests.</p><h3 id="unit-tests"><a href="#unit-tests" class="header-anchor">#</a> Unit tests</h3><p>Unit tests can be performed by running <code>vendor/bin/phpunit</code> in the root directory of your October CMS installation.</p><h3 id="functional-tests"><a href="#functional-tests" class="header-anchor">#</a> Functional tests</h3>`,19)),n[2]||(n[2]=e("p",null,[t("Functional tests can be performed by installing the "),e("a",{href:"https://octobercms.com/plugin/rainlab-dusk",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("RainLab Dusk"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" in your October CMS installation. The RainLab Dusk plugin is powered by Laravel Dusk, a comprehensive testing suite for the Laravel framework that is designed to test interactions with a fully operational October CMS instance through a virtual browser.")],-1)),n[3]||(n[3]=e("p",null,[t("For information on installing and setting up your October CMS install to run functional tests, please review the "),e("a",{href:"https://github.com/rainlab/dusk-plugin/blob/master/README.md",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("README"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" for the plugin.")],-1))])}const w=l(c,[["render",p]]);export{y as __pageData,w as default};
