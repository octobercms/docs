import{_ as l,r as i,o as p,c as d,e as a,a as e,s,d as n}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Version History - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Update process","slug":"update-process","link":"#update-process","children":[{"level":3,"title":"Plugin dependencies","slug":"plugin-dependencies","link":"#plugin-dependencies","children":[]}]},{"level":2,"title":"Plugin version file","slug":"plugin-version-file","link":"#plugin-version-file","children":[{"level":3,"title":"Important updates","slug":"important-updates","link":"#important-updates","children":[]},{"level":3,"title":"Migration and seed files","slug":"migration-and-seed-files","link":"#migration-and-seed-files","children":[]}]}],"relativePath":"1.x/plugin/updates.md","filePath":"1.x/plugin/updates.md"}'),u={name:"1.x/plugin/updates.md"};function c(h,t,g,m,f,b){const o=i("pre-heading"),r=i("post-heading");return p(),d("div",null,[a(o),t[0]||(t[0]=e("h1",null,"Version History",-1)),a(r),t[1]||(t[1]=s(`<p>It is good practice for plugins to maintain a change log that documents any changes or improvements in the code. In addition to writing notes about changes, this process has the useful ability to execute <a href="./../database/structure.html">migration and seed files</a> in their correct order.</p><p>The change log is stored in a YAML file called <code>version.yaml</code> inside the <strong>/updates</strong> directory of a plugin, which co-exists with migration and seed files. This example displays a typical plugin updates directory structure:</p><pre><code>plugins/
  author/
    myplugin/
      updates/                      &lt;=== Updates directory
        version.yaml                &lt;=== Plugin version file
        create_tables.php           &lt;=== Database scripts
        seed_the_database.php       &lt;=== Migration file
        create_another_table.php    &lt;=== Migration file
</code></pre><h2 id="update-process"><a href="#update-process" class="header-anchor">#</a> Update process</h2><p>During an update the system will notify the user about recent changes to plugins, it can also prompt them about <a href="#important-updates">important or breaking changes</a>. Any given migration or seed file will only be excuted once after a successful update. October executes the update process automatically when any of the following occurs:</p><ol><li>When an administrator signs in to the back-end.</li><li>When the system is updated using the update feature in the back-end area.</li><li>When the <a href="./../console/commands.html#database-migration">console command</a> <code>php artisan october:up</code> is called in the command line from the application directory.</li></ol><blockquote><p><strong>Note:</strong> The plugin <a href="./../plugin/registration.html#routing-and-initialization">initialization process</a> is disabled during the update process, this should be a consideration in migration and seeding scripts.</p></blockquote><h3 id="plugin-dependencies"><a href="#plugin-dependencies" class="header-anchor">#</a> Plugin dependencies</h3><p>Updates are applied in a specific order, based on the <a href="./../plugin/registration.html#dependency-definitions">defined dependencies in the plugin registration file</a>. Plugins that are dependant will not be updated until all their dependencies have been updated first.</p><pre><code>&lt;?php namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    public $require = [&#39;Acme.User&#39;];
}
</code></pre><p>In the example above the <strong>Acme.Blog</strong> plugin will not be updated until the <strong>Acme.User</strong> plugin has been fully updated.</p><h2 id="plugin-version-file"><a href="#plugin-version-file" class="header-anchor">#</a> Plugin version file</h2>`,12)),t[2]||(t[2]=e("p",null,[n("The "),e("strong",null,"version.yaml"),n(" file, called the "),e("em",null,"Plugin version file"),n(", contains the version comments and refers to database scripts in the correct order. Please read the "),e("a",{href:"./../database/structure.html"},"Database structure"),n(" article for information about the migration files. This file is required if you're going to submit the plugin to the "),e("a",{href:"http://octobercms.com/help/site/marketplace",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Marketplace"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(". Here is an example of a plugin version file:")],-1)),t[3]||(t[3]=s(`<pre><code>1.0.1: &quot;First version&quot;
1.0.2: &quot;Second version&quot;
1.0.3:
    - &quot;Third version&quot;
    - &quot;which has a lot of changes&quot;
    - &quot;including this one&quot;
1.1.0: &quot;!!! Important update&quot;
1.1.1:
    - &quot;Update with a migration and seed&quot;
    - &quot;and here&#39;s the migration&quot;
    - create_tables.php
    - &quot;and here&#39;s the seed&quot;
    - seed_the_database.php
</code></pre><blockquote><p><strong>Note:</strong> <code>version.yaml</code> files support having multiple text entries per version as the change log description. You can have as many update messages as you want, migration files can be listed in any position too.</p></blockquote><p>As you can see above, there should be a key that represents the version number followed by the update message, which is either a string or an array containing update messages. For updates that refer to migration or seeding files, lines that are script file names can be placed in any position. An example of a comment with no associated update files:</p><pre><code>1.0.1: &quot;A single comment that uses no update scripts.&quot;
</code></pre><h3 id="important-updates"><a href="#important-updates" class="header-anchor">#</a> Important updates</h3><p>Sometimes a plugin needs to introduce features that will break websites already using the plugin. If an update comment in the <strong>version.yaml</strong> file begins with three exclamation marks (<code>!!!</code>) then it will be considered <em>Important</em> and will require the user to confirm before updating. An example of an important update comment:</p><pre><code>1.1.0: &quot;!!! This is an important update that contains breaking changes.&quot;
</code></pre><p>When the system detects an important update it will provide three options to proceed:</p><ol><li>Confirm update</li><li>Skip this plugin (once only)</li><li>Skip this plugin (always)</li></ol><p>Confirming the comment will update the plugin as usual, or if the comment is skipped it will not be updated.</p><h3 id="migration-and-seed-files"><a href="#migration-and-seed-files" class="header-anchor">#</a> Migration and seed files</h3><p>As previously described, updates also define when <a href="./../database/structure.html">migration and seed files</a> should be applied. An update line with a comment and updates:</p><pre><code>1.1.1:
    - &quot;This update will execute the two scripts below.&quot;
    - some_upgrade_file.php
    - some_seeding_file.php
</code></pre><p>The update file name should use <em>snake_case</em> while the containing PHP class should use <em>CamelCase</em>. For a file named <strong>some_upgrade_file.php</strong> the corresponding class would be <code>SomeUpgradeFile</code>.</p><pre><code>&lt;?php namespace Acme\\Blog\\Updates;

use Schema;
use October\\Rain\\Database\\Updates\\Migration;

/**
 * some_upgrade_file.php
 */
class SomeUpgradeFile extends Migration
{
    ///
}
</code></pre>`,15))])}const y=l(u,[["render",c]]);export{v as __pageData,y as default};
