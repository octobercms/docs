import{_ as l,r as n,o as u,c,e as i,a as e,s as r,d as t}from"./chunks/framework.CXcwiNg-.js";const q=JSON.parse('{"title":"Configuration - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Web server configuration","slug":"web-server-configuration","link":"#web-server-configuration","children":[{"level":3,"title":"Apache configuration","slug":"apache-configuration","link":"#apache-configuration","children":[]},{"level":3,"title":"Nginx configuration","slug":"nginx-configuration","link":"#nginx-configuration","children":[]},{"level":3,"title":"Lighttpd configuration","slug":"lighttpd-configuration","link":"#lighttpd-configuration","children":[]},{"level":3,"title":"IIS configuration","slug":"iis-configuration","link":"#iis-configuration","children":[]}]},{"level":2,"title":"Application configuration","slug":"application-configuration","link":"#application-configuration","children":[{"level":3,"title":"Debug mode","slug":"debug-mode","link":"#debug-mode","children":[]},{"level":3,"title":"Safe mode","slug":"safe-mode","link":"#safe-mode","children":[]},{"level":3,"title":"CSRF protection","slug":"csrf-protection","link":"#csrf-protection","children":[]},{"level":3,"title":"Bleeding edge updates","slug":"bleeding-edge-updates","link":"#bleeding-edge-updates","children":[]},{"level":3,"title":"Using a public folder","slug":"using-a-public-folder","link":"#using-a-public-folder","children":[]},{"level":3,"title":"Using a shared hosting","slug":"using-a-shared-hosting","link":"#using-a-shared-hosting","children":[]}]},{"level":2,"title":"Environment configuration","slug":"environment-configuration","link":"#environment-configuration","children":[{"level":3,"title":"Defining a base environment","slug":"defining-a-base-environment","link":"#defining-a-base-environment","children":[]},{"level":3,"title":"Domain driven environment","slug":"domain-driven-environment","link":"#domain-driven-environment","children":[]},{"level":3,"title":"Converting to DotEnv configuration","slug":"converting-to-dotenv-configuration","link":"#converting-to-dotenv-configuration","children":[]}]}],"relativePath":"1.x/setup/configuration.md","filePath":"1.x/setup/configuration.md"}'),d={name:"1.x/setup/configuration.md"};function p(g,o,h,f,m,b){const a=n("pre-heading"),s=n("post-heading");return u(),c("div",null,[i(a),o[0]||(o[0]=e("h1",null,"Configuration",-1)),i(s),o[1]||(o[1]=r(`<p>All of the configuration files for October are stored in the <strong>config/</strong> directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.</p><h2 id="web-server-configuration"><a href="#web-server-configuration" class="header-anchor">#</a> Web server configuration</h2><p>October has basic configuration that should be applied to your webserver. Common webservers and their configuration can be found below.</p><h3 id="apache-configuration"><a href="#apache-configuration" class="header-anchor">#</a> Apache configuration</h3><p>If your webserver is running Apache there are some extra system requirements:</p><ol><li>mod_rewrite should be installed</li><li>AllowOverride option should be switched on</li></ol><p>In some cases you may need to uncomment this line in the <code>.htaccess</code> file:</p><pre><code>##
## You may need to uncomment the following line for some hosting environments,
## if you have installed to a subdirectory, enter the name here also.
##
# RewriteBase /
</code></pre><p>If you have installed to a subdirectory, you should add the name of the subdirectory also:</p><pre><code>RewriteBase /mysubdirectory/
</code></pre><h3 id="nginx-configuration"><a href="#nginx-configuration" class="header-anchor">#</a> Nginx configuration</h3><p>There are small changes required to configure your site in Nginx.</p><p><code>nano /etc/nginx/sites-available/default</code></p><p>Use the following code in <strong>server</strong> section. If you have installed October into a subdirectory, replace the first <code>/</code> in location directives with the directory October was installed under:</p><pre><code>location / {
    # Let OctoberCMS handle everything by default.
    # The path not resolved by OctoberCMS router will return OctoberCMS&#39;s 404 page.
    # Everything that does not match with the whitelist below will fall into this.
    rewrite ^/.*$ /index.php last;
}

# Pass the PHP scripts to FastCGI server
location ~ ^/index.php {
    # Write your FPM configuration here

}

# Whitelist
## Let October handle if static file not exists
location ~ ^/favicon\\.ico { try_files $uri /index.php; }
location ~ ^/sitemap\\.xml { try_files $uri /index.php; }
location ~ ^/robots\\.txt { try_files $uri /index.php; }
location ~ ^/humans\\.txt { try_files $uri /index.php; }

## Let nginx return 404 if static file not exists
location ~ ^/storage/app/uploads/public { try_files $uri 404; }
location ~ ^/storage/app/media { try_files $uri 404; }
location ~ ^/storage/app/resized { try_files $uri 404; }
location ~ ^/storage/temp/public { try_files $uri 404; }

location ~ ^/modules/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/behaviors/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/behaviors/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/widgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/widgets/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/formwidgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/formwidgets/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/reportwidgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/reportwidgets/.*/resources { try_files $uri 404; }

location ~ ^/plugins/.*/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/behaviors/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/behaviors/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/reportwidgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/reportwidgets/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/formwidgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/formwidgets/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/widgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/widgets/.*/resources { try_files $uri 404; }

location ~ ^/themes/.*/assets { try_files $uri 404; }
location ~ ^/themes/.*/resources { try_files $uri 404; }
</code></pre><h3 id="lighttpd-configuration"><a href="#lighttpd-configuration" class="header-anchor">#</a> Lighttpd configuration</h3><p>If your webserver is running Lighttpd you can use the following configuration to run OctoberCMS. Open your site configuration file with your favorite editor.</p><p><code>nano /etc/lighttpd/conf-enabled/sites.conf</code></p><p>Paste the following code in the editor and change the <strong>host address</strong> and <strong>server.document-root</strong> to match your project.</p><pre><code>$HTTP[&quot;host&quot;] =~ &quot;domain.example.com&quot; {
    server.document-root = &quot;/var/www/example/&quot;

    url.rewrite-once = (
        &quot;^/(plugins|modules/(system|backend|cms))/(([\\w-]+/)+|/|)assets/([\\w-]+/)+[-\\w^&amp;&#39;@{}[\\],$=!#().%+~/ ]+\\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\\?.*|)$&quot; =&gt; &quot;$0&quot;,
        &quot;^/(system|themes/[\\w-]+)/assets/([\\w-]+/)+[-\\w^&amp;&#39;@{}[\\],$=!#().%+~/ ]+\\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\\?.*|)$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/app/uploads/public/[\\w-]+/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/app/media/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/app/resized/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/temp/public/[\\w-]+/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/(favicon\\.ico)$&quot; =&gt; &quot;$0&quot;,
        &quot;(.*)&quot; =&gt; &quot;/index.php$1&quot;
    )
}
</code></pre><h3 id="iis-configuration"><a href="#iis-configuration" class="header-anchor">#</a> IIS configuration</h3><p>If your webserver is running Internet Information Services (IIS) you can use the following in your <strong>web.config</strong> configuration file to run OctoberCMS.</p><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;configuration&gt;
    &lt;system.webServer&gt;
        &lt;rewrite&gt;
            &lt;rules&gt;
                &lt;clear /&gt;
                &lt;rule name=&quot;OctoberCMS to handle all non-whitelisted URLs&quot; stopProcessing=&quot;true&quot;&gt;
                   &lt;match url=&quot;^(.*)$&quot; ignoreCase=&quot;false&quot; /&gt;
                   &lt;conditions logicalGrouping=&quot;MatchAll&quot;&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/.well-known/*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/storage/app/uploads/public/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/storage/app/media/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/storage/app/resized/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/storage/temp/public/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/themes/.*/(assets|resources)/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/plugins/.*/(assets|resources)/.*&quot; negate=&quot;true&quot; /&gt;
                       &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; pattern=&quot;^/modules/.*/(assets|resources)/.*&quot; negate=&quot;true&quot; /&gt;
                   &lt;/conditions&gt;
                   &lt;action type=&quot;Rewrite&quot; url=&quot;index.php&quot; appendQueryString=&quot;true&quot; /&gt;
               &lt;/rule&gt;
            &lt;/rules&gt;
        &lt;/rewrite&gt;
    &lt;/system.webServer&gt;
&lt;/configuration&gt;
</code></pre><h2 id="application-configuration"><a href="#application-configuration" class="header-anchor">#</a> Application configuration</h2><h3 id="debug-mode"><a href="#debug-mode" class="header-anchor">#</a> Debug mode</h3><p>The debug setting is found in the <code>config/app.php</code> configuration file with the <code>debug</code> parameter and is enabled by default.</p><p>When enabled, this setting will show detailed error messages when they occur along with other debugging features. While useful during development, debug mode should always be disabled when used in a live production site. This prevents potentially sensitive information from being displayed to the end-user.</p><p>The debug mode uses the following features when enabled:</p><ol><li><a href="./../cms/pages.html#error-page">Detailed error pages</a> are displayed.</li><li>Failed user authentication provides a specific reason.</li><li><a href="./../markup/filter-theme.html">Combined assets</a> are not minified by default.</li><li><a href="#safe-mode">Safe mode</a> is disabled by default.</li></ol><blockquote><p><strong>Important</strong>: Always set the <code>app.debug</code> setting to <code>false</code> for production environments.</p></blockquote><h3 id="safe-mode"><a href="#safe-mode" class="header-anchor">#</a> Safe mode</h3><p>The safe mode setting is found in the <code>config/cms.php</code> configuration file with the <code>enableSafeMode</code> parameter. The default value is <code>null</code>.</p><p>If safe mode is enabled, the PHP code section is disabled in CMS templates for security reasons. If set to <code>null</code>, safe mode is on when <a href="#debug-mode">debug mode</a> is disabled.</p><h3 id="csrf-protection"><a href="#csrf-protection" class="header-anchor">#</a> CSRF protection</h3><p>October provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user&#39;s session. Then when a <a href="./../services/html.html#form-tokens">opening form tag is used</a> the token is added to the page and submitted back with each request.</p><p>While CSRF protection is enabled by default, you can disable it with the <code>enableCsrfProtection</code> parameter in the <code>config/cms.php</code> configuration file.</p><h3 id="bleeding-edge-updates"><a href="#bleeding-edge-updates" class="header-anchor">#</a> Bleeding edge updates</h3><p>The October platform and some marketplace plugins will implement changes in two stages to ensure overall stability and integrity of the platform. This means they have a <em>test build</em> in addition to the default <em>stable build</em>.</p><p>You can instruct the platform to prefer test builds from the marketplace by changing the <code>edgeUpdates</code> parameter in the <code>config/cms.php</code> configuration file.</p><pre><code>/*
|--------------------------------------------------------------------------
| Bleeding edge updates
|--------------------------------------------------------------------------
|
| If you are developing with October, it is important to have the latest
| code base, set this value to &#39;true&#39; to tell the platform to download
| and use the development copies of core files and plugins.
|
*/

&#39;edgeUpdates&#39; =&gt; false,
</code></pre><blockquote><p><strong>Note:</strong> For plugin developers we recommend enabling <strong>Test updates</strong> for your plugins listed on the marketplace, via the Plugin Settings page.</p></blockquote><blockquote><p><strong>Note:</strong> If using <a href="./../console/commands.html#console-install-composer">Composer</a> to manage updates, then replace the default OctoberCMS requirements in your <code>composer.json</code> file with the following in order to download updates directly from the develop branch.</p></blockquote><pre><code>&quot;october/rain&quot;: &quot;dev-develop as 1.0&quot;,
&quot;october/system&quot;: &quot;dev-develop&quot;,
&quot;october/backend&quot;: &quot;dev-develop&quot;,
&quot;october/cms&quot;: &quot;dev-develop&quot;,
&quot;laravel/framework&quot;: &quot;~6.0&quot;,
</code></pre><h3 id="using-a-public-folder"><a href="#using-a-public-folder" class="header-anchor">#</a> Using a public folder</h3><p>For ultimate security in production environments you may configure your web server to use a <strong>public/</strong> folder to ensure only public files can be accessed. First you will need to spawn a public folder using the <code>october:mirror</code> command.</p><pre><code>php artisan october:mirror public/
</code></pre><p>This will create a new directory called <strong>public/</strong> in the project&#39;s base directory, from here you should modify the webserver configuration to use this new path as the home directory, also known as <em>wwwroot</em>.</p><blockquote><p><strong>Note</strong>: The above command may need to be performed with System Administrator or <em>sudo</em> privileges. It should also be performed after each system update or when a new plugin is installed.</p></blockquote><h3 id="using-a-shared-hosting"><a href="#using-a-shared-hosting" class="header-anchor">#</a> Using a shared hosting</h3><p>If you share a server with other users, you should act as if your neighbor&#39;s site was compromised. Make sure all files with passwords (e.g. CMS configuration files like <code>config/database.php</code>) cannot be read from other user accounts, even if they figure out absolute paths of your files. Setting permissions of such important files to 600 (read and write only to the owner and nothing to anyone else) is a good idea.</p><p>You can setup this protection in the file location <code>config/cms.php</code> in the section titled <strong>Default permission mask</strong>.</p><pre><code>/*
|--------------------------------------------------------------------------
| Default permission mask
|--------------------------------------------------------------------------
|
| Specifies a default file and folder permission for newly created objects.
|
*/

&#39;defaultMask&#39; =&gt; [&#39;file&#39; =&gt; &#39;644&#39;, &#39;folder&#39; =&gt; &#39;755&#39;],
</code></pre><blockquote><p><strong>Note</strong>: Don&#39;t forget to manually check to see if the files are already set to 644, as you may need to go into your cPanel and set them.</p></blockquote><h2 id="environment-configuration"><a href="#environment-configuration" class="header-anchor">#</a> Environment configuration</h2><h3 id="defining-a-base-environment"><a href="#defining-a-base-environment" class="header-anchor">#</a> Defining a base environment</h3><p>It is often helpful to have different configuration values based on the environment the application is running in. You can do this by setting the <code>APP_ENV</code> environment variable which by default it is set to <strong>production</strong>. There are two common ways to change this value:</p><ol><li><p>Set <code>APP_ENV</code> value directly with your webserver.</p><p>For example, in Apache this line can be added to the <code>.htaccess</code> or <code>httpd.config</code> file:</p><pre><code> SetEnv APP_ENV &quot;dev&quot;
</code></pre></li><li><p>Create a <strong>.env</strong> file in the root directory with the following content:</p><pre><code> APP_ENV=dev
</code></pre></li></ol><p>In both of the above examples, the environment is set to the new value <code>dev</code>. Configuration files can now be created in the path <strong>config/dev</strong> and will override the application&#39;s base configuration.</p><p>For example, to use a different MySQL database for the <code>dev</code> environment only, create a file called <strong>config/dev/database.php</strong> using this content:</p><pre><code>&lt;?php

return [
    &#39;connections&#39; =&gt; [
        &#39;mysql&#39; =&gt; [
            &#39;host&#39;     =&gt; &#39;localhost&#39;,
            &#39;port&#39;     =&gt; &#39;&#39;,
            &#39;database&#39; =&gt; &#39;database&#39;,
            &#39;username&#39; =&gt; &#39;root&#39;,
            &#39;password&#39; =&gt; &#39;&#39;
        ]
    ]
];
</code></pre><h3 id="domain-driven-environment"><a href="#domain-driven-environment" class="header-anchor">#</a> Domain driven environment</h3><p>October supports using an environment detected by a specific hostname. You may place these hostnames in an environment configuration file, for example, <strong>config/environment.php</strong>.</p><p>Using this file contents below, when the application is accessed via <strong>global.website.tld</strong> the environment will be set to <code>global</code> and likewise for the others.</p><pre><code>&lt;?php

return [
    &#39;hosts&#39; =&gt; [
        &#39;global.website.tld&#39; =&gt; &#39;global&#39;,
        &#39;local.website.tld&#39; =&gt; &#39;local&#39;,
    ]
];
</code></pre><h3 id="converting-to-dotenv-configuration"><a href="#converting-to-dotenv-configuration" class="header-anchor">#</a> Converting to DotEnv configuration</h3>`,65)),o[2]||(o[2]=e("p",null,[t("As an alternative to the "),e("a",{href:"#defining-a-base-environment"},"base environment configuration"),t(" you may place common values in the environment instead of using configuration files. The config is then accessed using "),e("a",{href:"https://github.com/vlucas/phpdotenv",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("DotEnv"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" syntax. Run the "),e("code",null,"october:env"),t(" command to move common config values to the environment:")],-1)),o[3]||(o[3]=r(`<pre><code>php artisan october:env
</code></pre><p>This will create an <strong>.env</strong> file in project root directory and modify configuration files to use <code>env</code> helper function. The first argument contains the key name found in the environment, the second argument contains an optional default value.</p><pre><code>&#39;debug&#39; =&gt; env(&#39;APP_DEBUG&#39;, true),
</code></pre><p>Your <code>.env</code> file should not be committed to your application&#39;s source control, since each developer or server using your application could require a different environment configuration.</p><p>It is also important that your <code>.env</code> file is not accessible to the public in production. To accomplish this, you should consider using a <a href="#using-a-public-folder">public folder</a>.</p>`,5))])}const y=l(d,[["render",p]]);export{q as __pageData,y as default};
