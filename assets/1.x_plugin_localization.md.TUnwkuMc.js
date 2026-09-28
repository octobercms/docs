import{_ as r,r as o,o as s,c,e as i,a as e,d as t,s as p}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Localization - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Localization directory and file structure","slug":"localization-directory-and-file-structure","link":"#localization-directory-and-file-structure","children":[]},{"level":2,"title":"Accessing localization strings","slug":"accessing-localization-strings","link":"#accessing-localization-strings","children":[]},{"level":2,"title":"Overriding localization strings","slug":"overriding-localization-strings","link":"#overriding-localization-strings","children":[]}],"relativePath":"1.x/plugin/localization.md","filePath":"1.x/plugin/localization.md"}'),d={name:"1.x/plugin/localization.md"};function g(u,n,h,f,m,z){const l=o("pre-heading"),a=o("post-heading");return s(),c("div",null,[i(l),n[0]||(n[0]=e("h1",null,"Localization",-1)),i(a),n[1]||(n[1]=e("p",null,[t("Plugins can have localization files in the "),e("strong",null,"lang"),t(" subdirectory of the plugin directory. Plugins' localization files are registered automatically. The localization strings are supported automatically in the back-end user interface menus, form labels, etc. - if you provide the localization key instead of a real string, the system will try to load it from the localization file. In other cases you need to load the localization string "),e("a",{href:"#accessing-localization-strings"},"with the API"),t(".")],-1)),n[2]||(n[2]=e("blockquote",null,[e("p",null,[e("strong",null,"Note"),t(": For translating front-end content, "),e("a",{href:"http://octobercms.com/plugin/rainlab-translate",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("there are plugins that can be used"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" for this purpose.")])],-1)),n[3]||(n[3]=e("h2",{id:"localization-directory-and-file-structure"},[e("a",{href:"#localization-directory-and-file-structure",class:"header-anchor"},"#"),t(" Localization directory and file structure")],-1)),n[4]||(n[4]=e("p",null,"Below is an example of the plugin's lang directory:",-1)),n[5]||(n[5]=e("pre",null,[e("code",null,`plugins/
  acme/
    todo/             <=== Plugin directory
      lang/           <=== Localization directory
        en/           <=== Language directory
          lang.php    <=== Localization file
        fr/
          lang.php
`)],-1)),n[6]||(n[6]=e("p",null,[t("The "),e("strong",null,"lang.php"),t(" file should define and return an array of any depth, for example:")],-1)),n[7]||(n[7]=e("pre",null,[e("code",null,`<?php

return [
    'app' => [
        'name' => 'OctoberCMS',
        'tagline' => 'Getting back to basics'
    ]
];
`)],-1)),n[8]||(n[8]=e("p",null,[t("The "),e("strong",null,"validation.php"),t(" file has a similar structure to the "),e("strong",null,"lang.php"),t(" and is used to specify your "),e("a",{href:"https://octobercms.com/docs/services/validation#localization",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("custom validation"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" messages in a language file, for example:")],-1)),n[9]||(n[9]=p(`<pre><code>&lt;?php

return [
    &#39;required&#39; =&gt; &#39;We need to know your xxx!&#39;,
    &#39;email.required&#39; =&gt; &#39;We need to know your e-mail address!&#39;,
];
</code></pre><h2 id="accessing-localization-strings"><a href="#accessing-localization-strings" class="header-anchor">#</a> Accessing localization strings</h2><p>The localization strings can be loaded with the <code>Lang</code> class. The parameter it accepts is the localization key string that consists of the plugin name, the localization file name and the path to the localization string inside the array returned from the file. The next example loads the <strong>app.name</strong> string from the plugins/acme/blog/lang/en/lang.php file (the language is set with the <code>locale</code> parameter in the <code>config/app.php</code> configuration file):</p><pre><code>echo Lang::get(&#39;acme.blog::lang.app.name&#39;);
</code></pre><h2 id="overriding-localization-strings"><a href="#overriding-localization-strings" class="header-anchor">#</a> Overriding localization strings</h2><p>System users can override plugin localization strings without altering the plugins&#39; files. This is done by adding localization files to the <strong>lang</strong> directory. For example, to override the lang.php file of the <strong>acme/blog</strong> plugin you should create the file in the following location:</p><pre><code>lang/               &lt;=== App localization directory
  en/               &lt;=== Language directory
    acme/           &lt;=== Plugin / Module directory
      blog/         &lt;===^
        lang.php    &lt;=== Localization override file
</code></pre><p>The file could contain only strings you want to override, there is no need to replace the entire file. Example:</p><pre><code>&lt;?php

return [
    &#39;app&#39; =&gt; [
        &#39;name&#39; =&gt; &#39;OctoberCMS!&#39;
    ]
];
</code></pre>`,9))])}const x=r(d,[["render",g]]);export{v as __pageData,x as default};
