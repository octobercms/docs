import{_ as l,r as a,o,c as p,e as n,a as r,s as i}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Creating Blueprints - October CMS User Guide","titleTemplate":false,"description":"Define a Team Members content type and a settings global","frontmatter":{"subtitle":"Define a Team Members content type and a settings global"},"headers":[{"level":2,"title":"Create the Team Member Blueprint","slug":"create-the-team-member-blueprint","link":"#create-the-team-member-blueprint","children":[]},{"level":2,"title":"Create the Team Settings Global","slug":"create-the-team-settings-global","link":"#create-the-team-settings-global","children":[]},{"level":2,"title":"Run the Migration","slug":"run-the-migration","link":"#run-the-migration","children":[]},{"level":2,"title":"Verify in the Backend","slug":"verify-in-the-backend","link":"#verify-in-the-backend","children":[]},{"level":2,"title":"Next Steps","slug":"next-steps","link":"#next-steps","children":[]}],"relativePath":"user-guide/quickstart/content-management/creating-blueprints.md","filePath":"user-guide/quickstart/content-management/creating-blueprints.md"}'),c={name:"user-guide/quickstart/content-management/creating-blueprints.md"};function u(k,e,m,d,h,g){const t=a("pre-heading"),s=a("post-heading");return o(),p("div",null,[n(t),e[0]||(e[0]=r("h1",null,"Creating Blueprints",-1)),n(s),e[1]||(e[1]=i(`<p>Let&#39;s create two blueprints: an <strong>entry</strong> blueprint for team members and a <strong>global</strong> blueprint for team page settings. Together, they will give us a complete content type with a backend form and configurable display options.</p><h2 id="create-the-team-member-blueprint"><a href="#create-the-team-member-blueprint" class="header-anchor">#</a> Create the Team Member Blueprint</h2><ol><li>In your theme&#39;s directory, create a <code>blueprints</code> folder if it doesn&#39;t exist.</li><li>Create a new file at <code>themes/mytheme/blueprints/team/member.yaml</code>.</li><li>Paste the following:</li></ol><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Team\\Member
<span class="token key atrule">type</span><span class="token punctuation">:</span> entry
<span class="token key atrule">name</span><span class="token punctuation">:</span> Team Member

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">role</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
        <span class="token key atrule">span</span><span class="token punctuation">:</span> auto
    <span class="token key atrule">email</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Email Address
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
        <span class="token key atrule">span</span><span class="token punctuation">:</span> auto
        <span class="token key atrule">validation</span><span class="token punctuation">:</span> email
    <span class="token key atrule">photo</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Photo
        <span class="token key atrule">type</span><span class="token punctuation">:</span> fileupload
        <span class="token key atrule">mode</span><span class="token punctuation">:</span> image
        <span class="token key atrule">span</span><span class="token punctuation">:</span> auto
    <span class="token key atrule">bio</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Bio
        <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
        <span class="token key atrule">size</span><span class="token punctuation">:</span> small
        <span class="token key atrule">span</span><span class="token punctuation">:</span> full
</code></pre></div><p>This blueprint defines a team member with a role, email address, photo, and short bio. Tailor automatically adds <strong>title</strong> and <strong>slug</strong> fields to every entry blueprint, so we don&#39;t need to define those.</p><div class="custom-block tip"><p>You can organize blueprint files in any folder structure you like, such as <code>blueprints/team/member.yaml</code>, <code>blueprints/member.yaml</code>, or even <code>blueprints/my-stuff/team-member.yaml</code>. Tailor finds them by handle, not by file path.</p></div><h2 id="create-the-team-settings-global"><a href="#create-the-team-settings-global" class="header-anchor">#</a> Create the Team Settings Global</h2><p>Now create a global blueprint to control how the team page behaves. Create a new file at <code>themes/mytheme/blueprints/team/settings.yaml</code>:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Team\\Settings
<span class="token key atrule">type</span><span class="token punctuation">:</span> global
<span class="token key atrule">name</span><span class="token punctuation">:</span> Team Settings

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">page_title</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Page Title
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
        <span class="token key atrule">default</span><span class="token punctuation">:</span> Meet the Team
    <span class="token key atrule">introduction</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Introduction
        <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
        <span class="token key atrule">size</span><span class="token punctuation">:</span> small
    <span class="token key atrule">show_photos</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Show Profile Photos
        <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> Toggle whether team member photos are displayed on the team page.
    <span class="token key atrule">per_page</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Members Per Page
        <span class="token key atrule">type</span><span class="token punctuation">:</span> number
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">6</span>
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> How many team members to show per page before pagination kicks in.
</code></pre></div><p>This global provides settings we will use when building the frontend: the page title, an intro paragraph, a toggle for profile photos, and a pagination control.</p><h2 id="run-the-migration"><a href="#run-the-migration" class="header-anchor">#</a> Run the Migration</h2><p>After creating blueprints, you need to run a migration so Tailor can set up the database tables:</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan tailor:migrate
</code></pre></div><p>Or with DDEV:</p><div class="language-bash extra-class"><pre class="language-bash"><code>ddev artisan tailor:migrate
</code></pre></div><p>This reads your blueprint files and creates the necessary database structure. Run this command every time you add or modify a blueprint.</p><div class="custom-block tip"><p>You can also migrate blueprints from the Editor. When editing a blueprint file in the backend, click the <strong>Save &amp; Migrate</strong> button to save your changes and run the migration in one step.</p></div><h2 id="verify-in-the-backend"><a href="#verify-in-the-backend" class="header-anchor">#</a> Verify in the Backend</h2><p>Log into the backend and look at the navigation. You should see new entries for <strong>Team Member</strong> and <strong>Team Settings</strong> under the <strong>Content</strong> menu. Click into each one to see the forms Tailor generated. They match the fields you defined, with no code written.</p><h2 id="next-steps"><a href="#next-steps" class="header-anchor">#</a> Next Steps</h2><p>Your blueprints are ready. Continue to <a href="./managing-entries.html">Managing Entries</a> to add some team members and customize how they appear in the backend.</p><p>For the complete blueprint reference, see <a href="./../../../4.x/cms/tailor/blueprints.html">Blueprints</a> in the developer documentation.</p>`,22))])}const f=l(c,[["render",u]]);export{b as __pageData,f as default};
