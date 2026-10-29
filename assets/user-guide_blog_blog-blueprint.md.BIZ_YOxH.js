import{_ as o,r as a,o as l,c as p,e as s,a as i,s as c}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Blog Blueprint - October CMS User Guide","titleTemplate":false,"description":"Define the Tailor blueprint for your blog posts.","frontmatter":{"subtitle":"Define the Tailor blueprint for your blog posts."},"headers":[{"level":2,"title":"Creating the Post Blueprint","slug":"creating-the-post-blueprint","link":"#creating-the-post-blueprint","children":[{"level":3,"title":"What This Does","slug":"what-this-does","link":"#what-this-does","children":[]}]},{"level":2,"title":"Adding Navigation","slug":"adding-navigation","link":"#adding-navigation","children":[]},{"level":2,"title":"Running the Migration","slug":"running-the-migration","link":"#running-the-migration","children":[]},{"level":2,"title":"Creating a Category Blueprint","slug":"creating-a-category-blueprint","link":"#creating-a-category-blueprint","children":[{"level":3,"title":"What This Does","slug":"what-this-does-1","link":"#what-this-does-1","children":[]}]},{"level":2,"title":"Creating a Tag Blueprint","slug":"creating-a-tag-blueprint","link":"#creating-a-tag-blueprint","children":[]},{"level":2,"title":"Linking Categories and Tags to Posts","slug":"linking-categories-and-tags-to-posts","link":"#linking-categories-and-tags-to-posts","children":[{"level":3,"title":"What This Does","slug":"what-this-does-2","link":"#what-this-does-2","children":[]}]},{"level":2,"title":"Testing in the Backend","slug":"testing-in-the-backend","link":"#testing-in-the-backend","children":[]},{"level":2,"title":"Next Steps","slug":"next-steps","link":"#next-steps","children":[]}],"relativePath":"user-guide/blog/blog-blueprint.md","filePath":"user-guide/blog/blog-blueprint.md"}'),r={name:"user-guide/blog/blog-blueprint.md"};function u(k,n,g,d,h,y){const e=a("pre-heading"),t=a("post-heading");return l(),p("div",null,[s(e),n[0]||(n[0]=i("h1",null,"Blog Blueprint",-1)),s(t),n[1]||(n[1]=c(`<p>Before you can create blog posts, you need to define what a blog post looks like. In October CMS, this is done with a Tailor blueprint, a YAML file that describes the fields, behavior, and backend navigation for your content type.</p><h2 id="creating-the-post-blueprint"><a href="#creating-the-post-blueprint" class="header-anchor">#</a> Creating the Post Blueprint</h2><ol><li>In your theme&#39;s directory, create a <code>blueprints</code> folder if it doesn&#39;t exist.</li><li>Create a new file at <code>themes/mytheme/blueprints/blog/post.yaml</code>.</li><li>Paste the following:</li></ol><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
    <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> New Post

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">content</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
        <span class="token key atrule">type</span><span class="token punctuation">:</span> richeditor
        <span class="token key atrule">span</span><span class="token punctuation">:</span> adaptive

    <span class="token key atrule">excerpt</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Excerpt
        <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
        <span class="token key atrule">size</span><span class="token punctuation">:</span> small
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> A short summary shown on the listing page.

    <span class="token key atrule">featured_image</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Featured Image
        <span class="token key atrule">type</span><span class="token punctuation">:</span> fileupload
        <span class="token key atrule">mode</span><span class="token punctuation">:</span> image
        <span class="token key atrule">maxFiles</span><span class="token punctuation">:</span> <span class="token number">1</span>

    <span class="token key atrule">is_featured</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Featured Post
        <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> Feature this post at the top of the listing.
</code></pre></div><h3 id="what-this-does"><a href="#what-this-does" class="header-anchor">#</a> What This Does</h3><ul><li><strong><code>type: stream</code></strong>: a stream is designed for time-stamped entries like blog posts. Unlike the <code>entry</code> type you used in the Quick Start, streams automatically sort by published date (newest first).</li><li><strong><code>richeditor</code></strong>: a visual editor for the post body.</li><li><strong><code>fileupload</code></strong> with <code>mode: image</code>: an image upload field limited to one file.</li><li><strong><code>customMessages</code></strong>: changes the &quot;Create&quot; button label in the backend to &quot;New Post&quot;.</li><li>Tailor automatically adds <strong>title</strong>, <strong>slug</strong>, and <strong>published date</strong> fields to every entry blueprint, so you don&#39;t need to define those yourself.</li></ul><h2 id="adding-navigation"><a href="#adding-navigation" class="header-anchor">#</a> Adding Navigation</h2><p>To make your blog posts accessible from the backend sidebar, add navigation blocks to the blueprint. Update <code>themes/mytheme/blueprints/blog/post.yaml</code> to include navigation above the fields:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
    <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> New Post

<span class="token key atrule">primaryNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Blog
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> ph ph<span class="token punctuation">-</span>pencil
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">200</span>

<span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Posts
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">100</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token comment"># ... (same fields as above)</span>
</code></pre></div><p>The <code>primaryNavigation</code> creates a top-level <strong>Blog</strong> menu item. The <code>navigation</code> creates a <strong>Posts</strong> sub-item underneath it. Categories and tags will nest under this same menu later.</p><h2 id="running-the-migration"><a href="#running-the-migration" class="header-anchor">#</a> Running the Migration</h2><p>After creating a blueprint, run the migration so Tailor can set up the database tables:</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan tailor:migrate
</code></pre></div><p>Or with DDEV:</p><div class="language-bash extra-class"><pre class="language-bash"><code>ddev artisan tailor:migrate
</code></pre></div><p>Run this command every time you add or modify a blueprint.</p><div class="custom-block tip"><p>You can also migrate blueprints from the Editor. When editing a blueprint file in the backend, click the <strong>Save &amp; Migrate</strong> button to save and run the migration in one step.</p></div><h2 id="creating-a-category-blueprint"><a href="#creating-a-category-blueprint" class="header-anchor">#</a> Creating a Category Blueprint</h2><p>Categories let you organize posts by topic. Create a new file at <code>themes/mytheme/blueprints/blog/category.yaml</code>:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Category
<span class="token key atrule">type</span><span class="token punctuation">:</span> structure
<span class="token key atrule">name</span><span class="token punctuation">:</span> Category

<span class="token key atrule">structure</span><span class="token punctuation">:</span>
    <span class="token key atrule">maxDepth</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
    <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> New Category

<span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> Blog\\Post
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> ph ph<span class="token punctuation">-</span>list<span class="token punctuation">-</span>bullets
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">200</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Description
        <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
        <span class="token key atrule">size</span><span class="token punctuation">:</span> small
</code></pre></div><h3 id="what-this-does-1"><a href="#what-this-does-1" class="header-anchor">#</a> What This Does</h3><ul><li><strong><code>type: structure</code></strong>: entries with ordering support. <code>maxDepth: 1</code> keeps categories flat (no sub-categories).</li><li><strong><code>parent: Blog\\Post</code></strong>: nests the Categories navigation item under the Blog menu.</li><li>Title and slug are added automatically, just like with posts.</li></ul><h2 id="creating-a-tag-blueprint"><a href="#creating-a-tag-blueprint" class="header-anchor">#</a> Creating a Tag Blueprint</h2><p>Tags provide a more flexible way to label posts. Create <code>themes/mytheme/blueprints/blog/tag.yaml</code>:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Tag
<span class="token key atrule">type</span><span class="token punctuation">:</span> entry
<span class="token key atrule">name</span><span class="token punctuation">:</span> Tag

<span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Tags
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> Blog\\Post
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> ph ph<span class="token punctuation">-</span>tag
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">300</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">posts</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
        <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Post
        <span class="token key atrule">inverse</span><span class="token punctuation">:</span> tags
        <span class="token key atrule">hidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre></div><p>Tags only need a title and slug, which Tailor adds automatically. The <code>posts</code> field is an <strong>inverse relation</strong> that tells Tailor tags are connected to posts through the <code>tags</code> field on the post blueprint. Setting <code>hidden: true</code> keeps it out of the backend form since you don&#39;t need to edit it directly. You will use this relationship later to count how many posts each tag has.</p><h2 id="linking-categories-and-tags-to-posts"><a href="#linking-categories-and-tags-to-posts" class="header-anchor">#</a> Linking Categories and Tags to Posts</h2><p>Now that the category and tag blueprints exist, update the post blueprint to reference them. Open <code>themes/mytheme/blueprints/blog/post.yaml</code> and add <code>categories</code> and <code>tags</code> fields at the bottom:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
    <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> New Post

<span class="token key atrule">primaryNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Blog
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> ph ph<span class="token punctuation">-</span>pencil
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">200</span>

<span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Posts
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">100</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">content</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
        <span class="token key atrule">type</span><span class="token punctuation">:</span> richeditor
        <span class="token key atrule">span</span><span class="token punctuation">:</span> adaptive

    <span class="token key atrule">excerpt</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Excerpt
        <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
        <span class="token key atrule">size</span><span class="token punctuation">:</span> small
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> A short summary shown on the listing page.

    <span class="token key atrule">featured_image</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Featured Image
        <span class="token key atrule">type</span><span class="token punctuation">:</span> fileupload
        <span class="token key atrule">mode</span><span class="token punctuation">:</span> image
        <span class="token key atrule">maxFiles</span><span class="token punctuation">:</span> <span class="token number">1</span>

    <span class="token key atrule">is_featured</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Featured Post
        <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> Feature this post at the top of the listing.

    <span class="token key atrule">categories</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
        <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
        <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Category
        <span class="token key atrule">tab</span><span class="token punctuation">:</span> Manage

    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Tags
        <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
        <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Tag
        <span class="token key atrule">displayMode</span><span class="token punctuation">:</span> taglist
        <span class="token key atrule">tab</span><span class="token punctuation">:</span> Manage
</code></pre></div><h3 id="what-this-does-2"><a href="#what-this-does-2" class="header-anchor">#</a> What This Does</h3><ul><li><strong><code>type: entries</code></strong>: creates a relationship to another blueprint. Posts can now be linked to categories and tags.</li><li><strong><code>source: Blog\\Category</code></strong>: tells the field which blueprint to pull records from.</li><li><strong><code>displayMode: taglist</code></strong>: renders tags as a type-and-select input instead of a relation list, making it fast to add tags while editing a post.</li><li><strong><code>tab: Manage</code></strong>: groups these fields on a separate tab to keep the editing form clean.</li></ul><p>Run the migration again to apply the changes:</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan tailor:migrate
</code></pre></div><h2 id="testing-in-the-backend"><a href="#testing-in-the-backend" class="header-anchor">#</a> Testing in the Backend</h2><ol><li><p>Refresh the backend. You should see <strong>Blog</strong> in the sidebar with <strong>Posts</strong>, <strong>Categories</strong>, and <strong>Tags</strong> sub-items.</p></li><li><p>Click <strong>Categories</strong> and create a few:</p><ul><li><strong>Technology</strong></li><li><strong>Travel</strong></li><li><strong>Tutorials</strong></li></ul></li><li><p>Click <strong>Tags</strong> and create a few:</p><ul><li><strong>Getting Started</strong></li><li><strong>Tips</strong></li><li><strong>October CMS</strong></li></ul></li><li><p>Click <strong>Posts</strong> and create some sample blog posts:</p><ul><li><strong>Getting Started with October CMS</strong>: assign to Technology and Getting Started. Add an excerpt like <code>A beginner&#39;s guide to building websites with October CMS.</code></li><li><strong>Building Your First Theme</strong>: assign to Tutorials and October CMS. Add an excerpt like <code>Learn how to create a theme from scratch with layouts, pages, and partials.</code></li><li><strong>Weekend in the Mountains</strong>: assign to Travel and Tips. Add an excerpt like <code>A photo journal from a weekend hiking trip in the mountains.</code></li></ul></li></ol><div class="custom-block tip"><p>When adding tags to a post, you can type a tag name directly into the tag list field. If the tag already exists, it will be suggested. If it doesn&#39;t, a new tag will be created for you.</p></div><p>Upload any images for the featured image field, or leave it blank for now. The frontend will handle missing images gracefully.</p><h2 id="next-steps"><a href="#next-steps" class="header-anchor">#</a> Next Steps</h2><p>With your blueprints in place, continue to <a href="./listing-page.html">Listing Page</a> to display your blog posts on the frontend.</p><p>For the complete blueprint reference, see <a href="./../../4.x/cms/tailor/blueprints.html">Blueprints</a> and <a href="./../../4.x/cms/tailor/content-fields.html">Content Fields</a> in the developer documentation.</p>`,40))])}const f=o(r,[["render",u]]);export{b as __pageData,f as default};
