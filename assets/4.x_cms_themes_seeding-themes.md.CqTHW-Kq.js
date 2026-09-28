import{_ as o,r as t,o as p,c as r,e as n,a as i,s as l}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Seeding Themes - October CMS - 4.x","titleTemplate":false,"description":"Populate blueprints and database records with sample content.","frontmatter":{"subtitle":"Populate blueprints and database records with sample content."},"headers":[{"level":2,"title":"Seeding a Theme","slug":"seeding-a-theme","link":"#seeding-a-theme","children":[]},{"level":2,"title":"Directory Structure","slug":"directory-structure","link":"#directory-structure","children":[]},{"level":2,"title":"Importing Languages","slug":"importing-languages","link":"#importing-languages","children":[]},{"level":2,"title":"Importing Data","slug":"importing-data","link":"#importing-data","children":[{"level":3,"title":"Tailor Blueprint Data","slug":"tailor-blueprint-data","link":"#tailor-blueprint-data","children":[]},{"level":3,"title":"File Attachment Data","slug":"file-attachment-data","link":"#file-attachment-data","children":[{"level":4,"title":"Using Media Library Paths","slug":"using-media-library-paths","link":"#using-media-library-paths","children":[]},{"level":4,"title":"Using Theme-relative Paths","slug":"using-theme-relative-paths","link":"#using-theme-relative-paths","children":[]}]},{"level":3,"title":"Media File Data","slug":"media-file-data","link":"#media-file-data","children":[]}]},{"level":2,"title":"Importing Blueprints","slug":"importing-blueprints","link":"#importing-blueprints","children":[]}],"relativePath":"4.x/cms/themes/seeding-themes.md","filePath":"4.x/cms/themes/seeding-themes.md"}'),c={name:"4.x/cms/themes/seeding-themes.md"};function u(d,a,h,g,m,k){const s=t("pre-heading"),e=t("post-heading");return p(),r("div",null,[n(s),a[0]||(a[0]=i("h1",null,"Seeding Themes",-1)),n(e),a[1]||(a[1]=l(`<p>Themes support the ability to import sample content from seed scripts, including database content and <a href="./../../cms/tailor/introduction.html">Tailor blueprints</a>. A specific folder inside the theme called <strong>seeds</strong> is used along with a directory structure to provide the content.</p><h2 id="seeding-a-theme"><a href="#seeding-a-theme" class="header-anchor">#</a> Seeding a Theme</h2><p>The <code>theme:seed</code> artisan command is used to seed a theme.</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan theme:seed <span class="token operator">&lt;</span>theme name<span class="token operator">&gt;</span>
</code></pre></div><p>You may also use the <code>--root</code> option to instruct the command to import the blueprints in to the root directory instead of in a nested directory.</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan theme:seed <span class="token operator">&lt;</span>theme name<span class="token operator">&gt;</span> <span class="token parameter variable">--root</span>
</code></pre></div><div class="custom-block tip"><p>You may also seed a theme using the admin panel by navigating to <strong>Settings → Frontend Theme → Manage → Seed Content</strong>.</p></div><h2 id="directory-structure"><a href="#directory-structure" class="header-anchor">#</a> Directory Structure</h2><p>Below you can see an example seed directory structure. The <strong>blueprints</strong> directory contains any blueprint templates used by the theme, these are imported automatically to the <strong>app/blueprints</strong> directory with a nested directory called <strong>mywebsite</strong>. The <strong>data.yaml</strong> file contains instructions on how to import the content in to the database.</p><pre class="dir-container"><code><p>├── themes
|   └── mywebsite
|       └── <code>seeds</code>  <em>← Theme Seed Directory</em>
|           ├── blueprints
|           |   └── post.yaml  <em>← Blueprint File</em>
|           ├── lang
|           |   └── en.json  <em>← Language File</em>
|           ├── media
|           |   └── banner.jpg  <em>← Media File</em>
|           ├── data
|           |   ├── blog-posts.json  <em>← Data File</em>
|           |   └── media-files.json
|           └── data.yaml  <em>← Seeding Script</em></p>
</code></pre><h2 id="importing-languages"><a href="#importing-languages" class="header-anchor">#</a> Importing Languages</h2><p>As an optional feature, languages can be imported to the <strong>app/lang</strong> directory by placing the <a href="./../../extend/multisite/localization.html">JSON language files</a> in the <strong>lang</strong> directory. This makes it possible to translate labels and other descriptions inside blueprints. If a language file already exists in the application language directory, then the language strings will be merged together.</p><h2 id="importing-data"><a href="#importing-data" class="header-anchor">#</a> Importing Data</h2><p>The <strong>data.yaml</strong> file contains a specific format used for importing content in to the database. In the example below, two sets of data are imported to the database for Tailor entry content.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Tailor\\Models\\RecordImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/blog<span class="token punctuation">-</span>posts.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
        <span class="token key atrule">blueprint_uuid</span><span class="token punctuation">:</span> edcd102e<span class="token punctuation">-</span>0525<span class="token punctuation">-</span>4e4d<span class="token punctuation">-</span>b07e<span class="token punctuation">-</span>633ae6c18db6
<span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Media File Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Media\\Models\\MediaLibraryItemImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/media<span class="token punctuation">-</span>files.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
</code></pre></div><p>The YAML file should define an array where each item in the array supports the following properties.</p><div class="table"><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>gives the import step a name to display to the user.</td></tr><tr><td><strong>class</strong></td><td>refers to a model that extends the interface of <code>Backend\\Models\\ImportModel</code>.</td></tr><tr><td><strong>file</strong></td><td>refers to the JSON data file that contains the content to import.</td></tr><tr><td><strong>attributes</strong></td><td>a list of attributes to set on the Import Model before importing.</td></tr></tbody></table></div><h3 id="tailor-blueprint-data"><a href="#tailor-blueprint-data" class="header-anchor">#</a> Tailor Blueprint Data</h3><p>Use the <code>Tailor\\Models\\RecordImport</code> class to import Tailor blueprints to the app directory. The following is an example of a JSON file that can be used to import blog categories. Each item in the JSON array produces an imported record in the database with the supplied attributes. Providing an <strong>id</strong> attribute allows records to link across multiple imports.</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Announcements&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;announcements&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;News&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;news&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h3 id="file-attachment-data"><a href="#file-attachment-data" class="header-anchor">#</a> File Attachment Data</h3><p>When seeding Tailor entries that have file attachment fields (<code>attachOne</code> or <code>attachMany</code>), you can reference files that should be attached to the imported records. Files can be referenced from two sources: the <strong>media library</strong> or <strong>theme-relative paths</strong> on disk.</p><h4 id="using-media-library-paths"><a href="#using-media-library-paths" class="header-anchor">#</a> Using Media Library Paths</h4><p>If you seed your media files first using <code>MediaLibraryItemImport</code>, you can reference them by their media-relative path. Make sure the media import step comes <strong>before</strong> the record import step in <code>data.yaml</code>.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Media File Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Media\\Models\\MediaLibraryItemImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/media<span class="token punctuation">-</span>files.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
<span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Tailor\\Models\\RecordImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/blog<span class="token punctuation">-</span>posts.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
        <span class="token key atrule">blueprint_uuid</span><span class="token punctuation">:</span> edcd102e<span class="token punctuation">-</span>0525<span class="token punctuation">-</span>4e4d<span class="token punctuation">-</span>b07e<span class="token punctuation">-</span>633ae6c18db6
</code></pre></div><p>In the record data file, reference the media paths directly.</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My Post&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-post&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;featured_image&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-theme/hero.jpg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;gallery&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;my-theme/photo1.jpg&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;my-theme/photo2.jpg&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><p>For <code>attachOne</code> relations, the value should be a single path string. For <code>attachMany</code> relations, the value should be an array of path strings.</p><h4 id="using-theme-relative-paths"><a href="#using-theme-relative-paths" class="header-anchor">#</a> Using Theme-relative Paths</h4><p>You can also reference files directly from the theme directory without importing them to the media library first. Place the files in the theme&#39;s <strong>seeds</strong> directory and reference them by their path relative to the theme root.</p><pre class="dir-container"><code><p>├── themes
|   └── mywebsite
|       └── seeds
|           ├── files
|           |   ├── hero.jpg
|           |   ├── photo1.jpg
|           |   └── photo2.jpg
|           ├── data
|           |   └── blog-posts.json
|           └── data.yaml</p>
</code></pre><div class="language-json extra-class"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My Post&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-post&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;featured_image&quot;</span><span class="token operator">:</span> <span class="token string">&quot;seeds/files/hero.jpg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;gallery&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;seeds/files/photo1.jpg&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;seeds/files/photo2.jpg&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h3 id="media-file-data"><a href="#media-file-data" class="header-anchor">#</a> Media File Data</h3><p>Use the <code>Media\\Models\\MediaLibraryItemImport</code> to import images in to the media directory. The following JSON is an example of importing files to the media library. The <strong>rootPath</strong> attribute defines a prefix for the media library, this could set to an empty string to import everything in the root directory. The <strong>type</strong> attribute specifies either <code>file</code> or <code>folder</code> are used to import their respective types, with the <strong>path</strong> as the destination and <strong>source</strong> as the source file, found in the context of the theme directory.</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;folder&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-theme/announcements&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;seeds/media/announcements&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;folder&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-theme/news/2025&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;seeds/media/news&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-theme/banner.jpg&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;seeds/media/banner.jpg&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h2 id="importing-blueprints"><a href="#importing-blueprints" class="header-anchor">#</a> Importing Blueprints</h2><div class="custom-block aside"><p>Since blueprints do not depend on any specific file or directory structure, they can be moved around freely.</p></div><p>When importing blueprints, simply place the blueprint files in the <strong>seeds/blueprints</strong> directory. It does not use any configuration, when seeding all blueprints are simply copied to the <strong>app/blueprints</strong> directory. A new directory is created inside that has the same name as the theme. The blueprints are placed inside this new directory.</p><div class="custom-block tip"><p>Blueprints do not always need to be imported via seeding. They can be included in the theme&#39;s <strong>/blueprints</strong> directory instead. See <a href="./../tailor/introduction.html">the introduction article</a> to learn more.</p></div>`,39))])}const b=o(c,[["render",u]]);export{f as __pageData,b as default};
