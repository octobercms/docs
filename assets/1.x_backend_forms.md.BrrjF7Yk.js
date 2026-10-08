import{_ as l,r as a,o as s,c,e as n,a as e,s as r,d as o}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Forms - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Configuring the form behavior","slug":"configuring-the-form-behavior","link":"#configuring-the-form-behavior","children":[{"level":3,"title":"Create page","slug":"create-page","link":"#create-page","children":[]},{"level":3,"title":"Update page","slug":"update-page","link":"#update-page","children":[]},{"level":3,"title":"Preview page","slug":"preview-page","link":"#preview-page","children":[]}]},{"level":2,"title":"Defining form fields","slug":"defining-form-fields","link":"#defining-form-fields","children":[{"level":3,"title":"Tab options","slug":"tab-options","link":"#tab-options","children":[]},{"level":3,"title":"Field options","slug":"field-options","link":"#field-options","children":[]}]},{"level":2,"title":"Available field types","slug":"available-field-types","link":"#available-field-types","children":[{"level":3,"title":"Text","slug":"text","link":"#text","children":[]},{"level":3,"title":"Number","slug":"number","link":"#number","children":[]},{"level":3,"title":"Password","slug":"password","link":"#password","children":[]},{"level":3,"title":"Email","slug":"email","link":"#email","children":[]},{"level":3,"title":"Textarea","slug":"textarea","link":"#textarea","children":[]},{"level":3,"title":"Dropdown","slug":"dropdown","link":"#dropdown","children":[]},{"level":3,"title":"Radio List","slug":"radio-list","link":"#radio-list","children":[]},{"level":3,"title":"Balloon Selector","slug":"balloon-selector","link":"#balloon-selector","children":[]},{"level":3,"title":"Checkbox","slug":"checkbox","link":"#checkbox","children":[]},{"level":3,"title":"Checkbox List","slug":"checkbox-list","link":"#checkbox-list","children":[]},{"level":3,"title":"Switch","slug":"switch","link":"#switch","children":[]},{"level":3,"title":"Section","slug":"section","link":"#section","children":[]},{"level":3,"title":"Partial","slug":"partial","link":"#partial","children":[]},{"level":3,"title":"Hint","slug":"hint","link":"#hint","children":[]},{"level":3,"title":"Widget","slug":"widget","link":"#widget","children":[]}]},{"level":2,"title":"Form widgets","slug":"form-widgets","link":"#form-widgets","children":[{"level":3,"title":"Code editor","slug":"code-editor","link":"#code-editor","children":[]},{"level":3,"title":"Color picker","slug":"color-picker","link":"#color-picker","children":[]},{"level":3,"title":"Data table","slug":"data-table","link":"#data-table","children":[{"level":4,"title":"Table configuration","slug":"table-configuration","link":"#table-configuration","children":[]},{"level":4,"title":"Column configuration","slug":"column-configuration","link":"#column-configuration","children":[]},{"level":4,"title":"Column validation","slug":"column-validation","link":"#column-validation","children":[]}]},{"level":3,"title":"Date picker","slug":"date-picker","link":"#date-picker","children":[]},{"level":3,"title":"File upload","slug":"file-upload","link":"#file-upload","children":[]},{"level":3,"title":"Markdown editor","slug":"markdown-editor","link":"#markdown-editor","children":[]},{"level":3,"title":"Media finder","slug":"media-finder","link":"#media-finder","children":[]},{"level":3,"title":"Nested Form","slug":"nested-form","link":"#nested-form","children":[]},{"level":3,"title":"Record finder","slug":"record-finder","link":"#record-finder","children":[]},{"level":3,"title":"Relation","slug":"relation","link":"#relation","children":[]},{"level":3,"title":"Repeater","slug":"repeater","link":"#repeater","children":[{"level":4,"title":"Repeater style","slug":"repeater-style","link":"#repeater-style","children":[]}]},{"level":3,"title":"Rich editor / WYSIWYG","slug":"rich-editor-wysiwyg","link":"#rich-editor-wysiwyg","children":[]},{"level":3,"title":"Sensitive","slug":"sensitive","link":"#sensitive","children":[]},{"level":3,"title":"Tag list","slug":"tag-list","link":"#tag-list","children":[]}]},{"level":2,"title":"Form views","slug":"form-views","link":"#form-views","children":[{"level":3,"title":"Create view","slug":"create-view","link":"#create-view","children":[]},{"level":3,"title":"Update view","slug":"update-view","link":"#update-view","children":[]},{"level":3,"title":"Preview view","slug":"preview-view","link":"#preview-view","children":[]}]},{"level":2,"title":"Applying conditions to fields","slug":"applying-conditions-to-fields","link":"#applying-conditions-to-fields","children":[{"level":3,"title":"Input preset converter","slug":"input-preset-converter","link":"#input-preset-converter","children":[]},{"level":3,"title":"Trigger events","slug":"trigger-events","link":"#trigger-events","children":[]},{"level":3,"title":"Field dependencies","slug":"field-dependencies","link":"#field-dependencies","children":[]},{"level":3,"title":"Preventing a field from being submitted","slug":"preventing-a-field-from-being-submitted","link":"#preventing-a-field-from-being-submitted","children":[]}]},{"level":2,"title":"Extending form behavior","slug":"extending-form-behavior","link":"#extending-form-behavior","children":[{"level":3,"title":"Overriding controller action","slug":"overriding-controller-action","link":"#overriding-controller-action","children":[]},{"level":3,"title":"Overriding controller redirect","slug":"overriding-controller-redirect","link":"#overriding-controller-redirect","children":[]},{"level":3,"title":"Extending model query","slug":"extending-model-query","link":"#extending-model-query","children":[]},{"level":3,"title":"Extending form fields","slug":"extending-form-fields","link":"#extending-form-fields","children":[]},{"level":3,"title":"Filtering form fields","slug":"filtering-form-fields","link":"#filtering-form-fields","children":[]}]},{"level":2,"title":"Validating form fields","slug":"validating-form-fields","link":"#validating-form-fields","children":[]}],"relativePath":"1.x/backend/forms.md","filePath":"1.x/backend/forms.md"}'),h={name:"1.x/backend/forms.md"};function p(f,t,g,u,m,b){const d=a("pre-heading"),i=a("post-heading");return s(),c("div",null,[n(d),t[0]||(t[0]=e("h1",null,"Forms",-1)),n(i),t[1]||(t[1]=r(`<p><strong>Form behavior</strong> is a controller modifier used for easily adding form functionality to a back-end page. The behavior provides three pages called Create, Update and Preview. The Preview page is a read-only version of the Update page. When you use the form behavior you don&#39;t need to define the <code>create</code>, <code>update</code> and <code>preview</code> actions in the controller - the behavior does it for you. However you should provide the corresponding view files.</p><p>Form behavior depends on form <a href="#defining-form-fields">field definitions</a> and a <a href="./../database/model.html">model class</a>. In order to use the form behavior you should add it to the <code>$implement</code> property of the controller class. Also, the <code>$formConfig</code> class property should be defined and its value should refer to the YAML file used for configuring the behavior options.</p><pre><code>namespace Acme\\Blog\\Controllers;

class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.FormController&#39;];

    public $formConfig = &#39;config_form.yaml&#39;;
}
</code></pre><blockquote><p><strong>Note:</strong> Very often the form and <a href="./lists.html">list behavior</a> are used together in a same controller.</p></blockquote><h2 id="configuring-the-form-behavior"><a href="#configuring-the-form-behavior" class="header-anchor">#</a> Configuring the form behavior</h2><p>The configuration file referred in the <code>$formConfig</code> property is defined in YAML format. The file should be placed into the controller&#39;s <a href="./controllers-ajax.html">views directory</a>. Below is an example of a typical form behavior configuration file:</p><pre><code># ===================================
#  Form Behavior Config
# ===================================

name: Blog Category
form: $/acme/blog/models/post/fields.yaml
modelClass: Acme\\Blog\\Post

create:
    title: New Blog Post

update:
    title: Edit Blog Post

preview:
    title: View Blog Post
</code></pre><p>The following fields are required in the form configuration file:</p><div class="table"><table tabindex="0"><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>the name of the object being managed by this form.</td></tr><tr><td><strong>form</strong></td><td>a configuration array or reference to a form field definition file, see <a href="#defining-form-fields">form fields</a>.</td></tr><tr><td><strong>modelClass</strong></td><td>a model class name, the form data is loaded and saved against this model.</td></tr></tbody></table></div><p>The configuration options listed below are optional. Define them if you want the form behavior to support the <a href="#create-page">Create</a>, <a href="#update-page">Update</a> or <a href="#preview-page">Preview</a> pages.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>defaultRedirect</strong></td><td>used as a fallback redirection page when no specific redirect page is defined.</td></tr><tr><td><strong>create</strong></td><td>a configuration array or reference to a config file for the Create page.</td></tr><tr><td><strong>update</strong></td><td>a configuration array or reference to a config file for the Update page.</td></tr><tr><td><strong>preview</strong></td><td>a configuration array or reference to a config file for the Preview page.</td></tr></tbody></table></div><h3 id="create-page"><a href="#create-page" class="header-anchor">#</a> Create page</h3><p>To support the Create page add the following configuration to the YAML file:</p><pre><code>create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
    flashSave: Post has been created!
</code></pre><p>The following configuration options are supported for the Create page:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a page title, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>redirect</strong></td><td>redirection page when record is saved.</td></tr><tr><td><strong>redirectClose</strong></td><td>redirection page when record is saved and the <strong>close</strong> post variable is sent with the request.</td></tr><tr><td><strong>flashSave</strong></td><td>flash message to display when record is saved, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>form</strong></td><td>overrides the default form fields definitions for the create page only.</td></tr></tbody></table></div><h3 id="update-page"><a href="#update-page" class="header-anchor">#</a> Update page</h3><p>To support the Update page add the following configuration to the YAML file:</p><pre><code>update:
    title: Edit Blog Post
    redirect: acme/blog/posts
    flashSave: Post updated successfully!
    flashDelete: Post has been deleted.
</code></pre><p>The following configuration options are supported for the Update page:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a page title, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>redirect</strong></td><td>redirection page when record is saved.</td></tr><tr><td><strong>redirectClose</strong></td><td>redirection page when record is saved and <strong>close</strong> post variable is sent with the request.</td></tr><tr><td><strong>flashSave</strong></td><td>flash message to display when record is saved, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>flashDelete</strong></td><td>flash message to display when record is deleted, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>form</strong></td><td>overrides the default form fields definitions for the update page only.</td></tr></tbody></table></div><h3 id="preview-page"><a href="#preview-page" class="header-anchor">#</a> Preview page</h3><p>To support the Preview page add the following configuration to the YAML file:</p><pre><code>preview:
    title: View Blog Post
</code></pre><p>The following configuration options are supported for the Preview page:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a page title, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>form</strong></td><td>overrides the default form fields definitions for the preview page only.</td></tr></tbody></table></div><h2 id="defining-form-fields"><a href="#defining-form-fields" class="header-anchor">#</a> Defining form fields</h2><p>Form fields are defined with the YAML file. The form fields configuration is used by the form behavior for creating the form controls and binding them to the model fields. The file is placed to a subdirectory of the <strong>models</strong> directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn&#39;t matter, but <strong>fields.yaml</strong> and <strong>form_fields.yaml</strong> are common names. Example form fields file location:</p><pre><code>plugins/
  acme/
    blog/
      models/            &lt;=== Plugin models directory
        post/            &lt;=== Model configuration directory
          fields.yaml    &lt;=== Model form fields config file
        Post.php         &lt;=== model class
</code></pre><p>Fields can be placed in three areas, the <strong>outside area</strong>, <strong>primary tabs</strong> or <strong>secondary tabs</strong>. The next example shows the typical contents of a form fields definition file.</p><pre><code># ===================================
#  Form Field Definitions
# ===================================

fields:
    blog_title:
        label: Blog Title
        description: The title for this blog

    published_at:
        label: Published date
        description: When this blog post was published
        type: datepicker

    [...]

tabs:
    fields:
        [...]

secondaryTabs:
    fields:
        [...]
</code></pre><p>Fields from related models can be rendered with the <a href="#relation">Relation Widget</a> or the <a href="./relations.html#relationship-types">Relation Manager</a>. The exception is a OneToOne or morphOne related field, which must be defined as <strong>relation[field]</strong> and then can be specified as any other field of the model:</p><pre><code>    user_name:
        label: User Name
        description: The name of the user
    avatar[name]:
        label: Avatar
        description: will be saved in the Avatar table
    published_at:
        label: Published date
        description: When this blog post was published
        type: datepicker

    [...]
</code></pre><h3 id="tab-options"><a href="#tab-options" class="header-anchor">#</a> Tab options</h3><p>For each tab definition, namely <code>tabs</code> and <code>secondaryTabs</code>, you can specify these options:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>stretch</strong></td><td>specifies if this tab stretches to fit the parent height.</td></tr><tr><td><strong>defaultTab</strong></td><td>the default tab to assign fields to. Default: Misc.</td></tr><tr><td><strong>icons</strong></td><td>assign icons to tabs using tab names as the key.</td></tr><tr><td><strong>lazy</strong></td><td>array of tabs to be loaded dynamically when clicked. Useful for tabs that contain large amounts of content.</td></tr><tr><td><strong>cssClass</strong></td><td>assigns a CSS class to the tab container.</td></tr><tr><td><strong>paneCssClass</strong></td><td>assigns a CSS class to an individual tab pane. Value is an array, key is tab index or label, value is the CSS class. It can also be specified as a string, in which case the value will be applied to all tabs.</td></tr></tbody></table></div><blockquote><p><strong>Note:</strong> It is not recommended to use lazy loading on tabs with fields that are affected by triggers.</p></blockquote><pre><code>tabs:
    stretch: true
    defaultTab: User
    cssClass: text-blue
    lazy:
        - Groups
    paneCssClass:
        0: first-tab
        1: second-tab
    icons:
        User: icon-user
        Groups: icon-group

    fields:
        username:
            type: text
            label: Username
            tab: User

        groups:
            type: relation
            label: Groups
            tab: Groups
</code></pre><h3 id="field-options"><a href="#field-options" class="header-anchor">#</a> Field options</h3><p>For each field you can specify these options (where applicable):</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>a name when displaying the form field to the user.</td></tr><tr><td><strong>type</strong></td><td>defines how this field should be rendered (see <a href="#available-field-types">Available fields types</a> below). Default: text.</td></tr><tr><td><strong>span</strong></td><td>aligns the form field to one side. Options: auto, left, right, storm, full. Default: full. The parameter <code>storm</code> allows you to display the form as a Bootstrap grid, using the <code>cssClass</code> property, for example, <code>cssClass: col-xs-4</code>.</td></tr><tr><td><strong>size</strong></td><td>specifies a field size for fields that use it, for example, the textarea field. Options: tiny, small, large, huge, giant.</td></tr><tr><td><strong>placeholder</strong></td><td>if the field supports a placeholder value.</td></tr><tr><td><strong>comment</strong></td><td>places a descriptive comment below the field.</td></tr><tr><td><strong>commentAbove</strong></td><td>places a comment above the field.</td></tr><tr><td><strong>commentHtml</strong></td><td>allow HTML markup inside the comment. Options: true, false.</td></tr><tr><td><strong>default</strong></td><td>specify the default value for the field. For <code>dropdown</code>, <code>checkboxlist</code>, <code>radio</code> and <code>balloon-selector</code> widgets, you may specify an option key here to have it selected by default.</td></tr><tr><td><strong>defaultFrom</strong></td><td>takes the default value from the value of another field.</td></tr><tr><td><strong>tab</strong></td><td>assigns the field to a tab.</td></tr><tr><td><strong>cssClass</strong></td><td>assigns a CSS class to the field container.</td></tr><tr><td><strong>readOnly</strong></td><td>prevents the field from being modified. Options: true, false.</td></tr><tr><td><strong>disabled</strong></td><td>prevents the field from being modified and excludes it from the saved data. Options: true, false.</td></tr><tr><td><strong>hidden</strong></td><td>hides the field from the view and excludes it from the saved data. Options: true, false.</td></tr><tr><td><strong>stretch</strong></td><td>specifies if this field stretches to fit the parent height.</td></tr><tr><td><strong>context</strong></td><td>specifies what context should be used when displaying the field. Context can also be passed by using an <code>@</code> symbol in the field name, for example, <code>name@update</code>.</td></tr><tr><td><strong>dependsOn</strong></td><td>an array of other field names this field <a href="#field-dependencies">depends on</a>, when the other fields are modified, this field will update.</td></tr><tr><td><strong>trigger</strong></td><td>specify conditions for this field using <a href="#trigger-events">trigger events</a>.</td></tr><tr><td><strong>preset</strong></td><td>allows the field value to be initially set by the value of another field, converted using the <a href="#input-preset-converter">input preset converter</a>.</td></tr><tr><td><strong>required</strong></td><td>places a red asterisk next to the field label to indicate it is required (make sure to setup validation on the model as this is not enforced by the form controller).</td></tr><tr><td><strong>attributes</strong></td><td>specify custom HTML attributes to add to the form field element.</td></tr><tr><td><strong>containerAttributes</strong></td><td>specify custom HTML attributes to add to the form field container.</td></tr><tr><td><strong>permissions</strong></td><td>the <a href="./users.html#users-and-permissions">permissions</a> that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.</td></tr></tbody></table></div><h2 id="available-field-types"><a href="#available-field-types" class="header-anchor">#</a> Available field types</h2><p>There are various native field types that can be used for the <strong>type</strong> setting. For more advanced form fields, a <a href="#form-widgets">form widget</a> can be used instead.</p>`,43)),t[2]||(t[2]=e("div",{class:"content-list collection-method-list",markdown:"1"},[e("ul",null,[e("li",null,[e("a",{href:"#field-text"},"Text")]),e("li",null,[e("a",{href:"#field-number"},"Number")]),e("li",null,[e("a",{href:"#field-password"},"Password")]),e("li",null,[e("a",{href:"#field-email"},"Email")]),e("li",null,[e("a",{href:"#field-textarea"},"Textarea")]),e("li",null,[e("a",{href:"#field-dropdown"},"Dropdown")]),e("li",null,[e("a",{href:"#field-radio"},"Radio List")]),e("li",null,[e("a",{href:"#field-balloon"},"Balloon Selector")]),e("li",null,[e("a",{href:"#field-checkbox"},"Checkbox")]),e("li",null,[e("a",{href:"#field-checkboxlist"},"Checkbox List")]),e("li",null,[e("a",{href:"#field-switch"},"Switch")]),e("li",null,[e("a",{href:"#field-section"},"Section")]),e("li",null,[e("a",{href:"#field-partial"},"Partial")]),e("li",null,[e("a",{href:"#field-hint"},"Hint")]),e("li",null,[e("a",{href:"#field-widget"},"Widget")])])],-1)),t[3]||(t[3]=r(`<p><a name="field-text"></a></p><h3 id="text"><a href="#text" class="header-anchor">#</a> Text</h3><p><code>text</code> - renders a single line text box. This is the default type used if none is specified.</p><pre><code>blog_title:
    label: Blog Title
    type: text
</code></pre><p><a name="field-number"></a></p><h3 id="number"><a href="#number" class="header-anchor">#</a> Number</h3><p><code>number</code> - renders a single line text box that takes numbers only.</p><pre><code>your_age:
    label: Your Age
    type: number
    step: 1  # defaults to &#39;any&#39;
    min: 1   # defaults to not present
    max: 100 # defaults to not present
</code></pre><p>If you would like to validate this field server-side on save to ensure that it is numeric, please use the <code>$rules</code> property on your model, like so:</p><pre><code>/**
 * @var array Validation rules
 */
public $rules = [
    &#39;your_age&#39; =&gt; &#39;numeric&#39;,
];
</code></pre>`,10)),t[4]||(t[4]=e("p",null,[o("For more information on model validation, please visit "),e("a",{href:"https://octobercms.com/docs/services/validation#rule-numeric",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("the documentation page"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),e("span",{class:"sr-only"},"(opens new window)")])]),o(".")],-1)),t[5]||(t[5]=r(`<p><a name="field-password"></a></p><h3 id="password"><a href="#password" class="header-anchor">#</a> Password</h3><p><code>password </code> - renders a single line password field.</p><pre><code>user_password:
    label: Password
    type: password
</code></pre><p><a name="field-email"></a></p><h3 id="email"><a href="#email" class="header-anchor">#</a> Email</h3><p><code>email</code> - renders a single line text box with the type of <code>email</code>, triggering an email-specialised keyboard in mobile browsers.</p><pre><code>user_email:
    label: Email Address
    type: email
</code></pre><p>If you would like to validate this field on save to ensure that it is a properly-formatted email address, please use the <code>$rules</code> property on your model, like so:</p><pre><code>/**
 * @var array Validation rules
 */
public $rules = [
    &#39;user_email&#39; =&gt; &#39;email&#39;,
];
</code></pre>`,10)),t[6]||(t[6]=e("p",null,[o("For more information on model validation, please visit "),e("a",{href:"https://octobercms.com/docs/services/validation#rule-email",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("the documentation page"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),e("span",{class:"sr-only"},"(opens new window)")])]),o(".")],-1)),t[7]||(t[7]=r(`<p><a name="field-textarea"></a></p><h3 id="textarea"><a href="#textarea" class="header-anchor">#</a> Textarea</h3><p><code>textarea</code> - renders a multiline text box. A size can also be specified with possible values: tiny, small, large, huge, giant.</p><pre><code>blog_contents:
    label: Contents
    type: textarea
    size: large
</code></pre><p><a name="field-dropdown"></a></p><h3 id="dropdown"><a href="#dropdown" class="header-anchor">#</a> Dropdown</h3><p><code>dropdown</code> - renders a dropdown with specified options. There are 6 ways to provide the drop-down options.</p><p>The first method defines <code>options</code> directly in the YAML file(two variants):</p><p>(value only):</p><pre><code>status_type:
    label: Blog Post Status
    type: dropdown
    default: published
    options:
        draft
        published
        archived
</code></pre><p>(key / value):</p><pre><code>status_type:
    label: Blog Post Status
    type: dropdown
    default: published
    options:
        draft: Draft
        published: Published
        archived: Archived
</code></pre><p>The second method defines options with a method declared in the model class. If the options element is omitted, the framework expects a method with the name <code>get*FieldName*Options</code> to be defined in the model. Using the example above, the model should have the <code>getStatusTypeOptions</code> method. The first argument of this method is the current value of this field and the second is the current data object for the entire form. This method should return an array of options in the format <strong>key =&gt; label</strong>.</p><pre><code>status_type:
    label: Blog Post Status
    type: dropdown
</code></pre><p>Supplying the dropdown options in the model class:</p><pre><code>public function getStatusTypeOptions($value, $formData)
{
    return [&#39;all&#39; =&gt; &#39;All&#39;, ...];
}
</code></pre><p>The third global method <code>getDropdownOptions</code> can also be defined in the model, this will be used for all dropdown field types for the model. The first argument of this method is the field name, the second is the current value of the field, and the third is the current data object for the entire form. It should return an array of options in the format <strong>key =&gt; label</strong>.</p><pre><code>public function getDropdownOptions($fieldName, $value, $formData)
{
    if ($fieldName == &#39;status&#39;) {
        return [&#39;all&#39; =&gt; &#39;All&#39;, ...];
    }
    else {
        return [&#39;&#39; =&gt; &#39;-- none --&#39;];
    }
}
</code></pre><p>The fourth method uses a specific method declared in the model class. In the next example the <code>listStatuses</code> method should be defined in the model class. This method receives all the same arguments as the <code>getDropdownOptions</code> method, and should return an array of options in the format <strong>key =&gt; label</strong>.</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    options: listStatuses
</code></pre><p>Supplying the dropdown options to the model class:</p><pre><code>public function listStatuses($fieldName, $value, $formData)
{
    return [&#39;published&#39; =&gt; &#39;Published&#39;, ...];
}
</code></pre><p>The fifth method allows you to specify a static method on a class to return the options:</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    options: \\MyAuthor\\MyPlugin\\Classes\\FormHelper::staticMethodOptions
</code></pre><p>Supplying the dropdown options to the model class:</p><pre><code>public static function staticMethodOptions($formWidget, $formField)
{
    return [&#39;published&#39; =&gt; &#39;Published&#39;, ...];
}
</code></pre><p>The sixth method allows you to specify a callable object via an array definition. If using PHP, you&#39;re able to provide an array with the first element being the object and the second element being the method you want to call on that object. If you&#39;re using YAML, you&#39;re limited to a static method defined as the second element and the namespaced reference to a class as the first element:</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    options: [\\MyAuthor\\MyPlugin\\Classes\\FormHelper, staticMethodOptions]
</code></pre><p>Supplying the dropdown options to the model class:</p><pre><code>public static function staticMethodOptions($formWidget, $formField)
{
    return [&#39;published&#39; =&gt; &#39;Published&#39;, ...];
}
</code></pre><p>To define the behavior when there is no selection, you may specify an <code>emptyOption</code> value to include an empty option that can be reselected.</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    emptyOption: -- no status --
</code></pre><p>Alternatively you may use the <code>placeholder</code> option to use a &quot;one-way&quot; empty option that cannot be reselected.</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    placeholder: -- select a status --
</code></pre><p>By default the dropdown has a searching feature, allowing quick selection of a value. This can be disabled by setting the <code>showSearch</code> option to <code>false</code>.</p><pre><code>status:
    label: Blog Post Status
    type: dropdown
    showSearch: false
</code></pre><p><a name="field-radio"></a></p><h3 id="radio-list"><a href="#radio-list" class="header-anchor">#</a> Radio List</h3><p><code>radio</code> - renders a list of radio options, where only one item can be selected at a time.</p><pre><code>security_level:
    label: Access Level
    type: radio
    default: guests
    options:
        all: All
        registered: Registered only
        guests: Guests only
</code></pre><p>Radio lists can also support a secondary description.</p><pre><code>security_level:
    label: Access Level
    type: radio
    options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]
</code></pre><p>Radio lists support the same methods for defining the options as the <a href="#field-dropdown">dropdown field type</a>. For radio lists the method could return either the simple array: <strong>key =&gt; value</strong> or an array of arrays for providing the descriptions: <strong>key =&gt; [label, description]</strong>. Options can be displayed inline with each other instead of in separate rows by specifying <code>cssClass: &#39;inline-options&#39;</code> on the radio field config.</p><p><a name="field-balloon"></a></p><h3 id="balloon-selector"><a href="#balloon-selector" class="header-anchor">#</a> Balloon Selector</h3><p><code>balloon-selector</code> - renders a list, where only one item can be selected at a time.</p><pre><code>gender:
    label: Gender
    type: balloon-selector
    default: female
    options:
        female: Female
        male: Male
</code></pre><p>Balloon selectors support the same methods for defining the options as the <a href="#field-dropdown">dropdown field type</a>.</p><p><a name="field-checkbox"></a></p><h3 id="checkbox"><a href="#checkbox" class="header-anchor">#</a> Checkbox</h3><p><code>checkbox</code> - renders a single checkbox.</p><pre><code>show_content:
    label: Display content
    type: checkbox
    default: true
</code></pre><p><a name="field-checkboxlist"></a></p><h3 id="checkbox-list"><a href="#checkbox-list" class="header-anchor">#</a> Checkbox List</h3><p><code>checkboxlist</code> - renders a list of checkboxes.</p><pre><code>permissions:
    label: Permissions
    type: checkboxlist
    # set to true to explicitly enable the &quot;Select All&quot;, &quot;Select None&quot; options
    # on lists that have &lt;=10 items (&gt;10 automatically enables it)
    quickselect: true
    default: open_account
    options:
        open_account: Open account
        close_account: Close account
        modify_account: Modify account
</code></pre><p>Checkbox lists support the same methods for defining the options as the <a href="#field-dropdown">dropdown field type</a> and also support secondary descriptions, found in the <a href="#field-radio">radio field type</a>. Options can be displayed inline with each other instead of in separate rows by specifying <code>cssClass: &#39;inline-options&#39;</code> on the checkboxlist field config.</p><p><a name="field-switch"></a></p><h3 id="switch"><a href="#switch" class="header-anchor">#</a> Switch</h3><p><code>switch</code> - renders a switchbox.</p><pre><code>show_content:
    label: Display content
    type: switch
    comment: Flick this switch to display content
    on: myauthor.myplugin::lang.models.mymodel.show_content.on
    off: myauthor.myplugin::lang.models.mymodel.show_content.off
</code></pre><p><a name="field-section"></a></p><h3 id="section"><a href="#section" class="header-anchor">#</a> Section</h3><p><code>section</code> - renders a section heading and subheading. The <code>label</code> and <code>comment</code> values are optional and contain the content for the heading and subheading.</p><pre><code>user_details_section:
    label: User details
    type: section
    comment: This section contains details about the user.
</code></pre><p><a name="field-partial"></a></p><h3 id="partial"><a href="#partial" class="header-anchor">#</a> Partial</h3><p><code>partial</code> - renders a partial, the <code>path</code> value can refer to a partial view file otherwise the field name is used as the partial name. Inside the partial these variables are available: <code>$value</code> is the default field value, <code>$model</code> is the model used for the field and <code>$field</code> is the configured class object <code>Backend\\Classes\\FormField</code>.</p><pre><code>content:
    type: partial
    path: $/acme/blog/models/comments/_content_field.htm
</code></pre><p><a name="field-hint"></a></p><h3 id="hint"><a href="#hint" class="header-anchor">#</a> Hint</h3><p><code>hint</code> - identical to a <code>partial</code> field but renders inside a hint container that can be hidden by the user.</p><pre><code>content:
    type: hint
    path: content_field
</code></pre><p><a name="field-widget"></a></p><h3 id="widget"><a href="#widget" class="header-anchor">#</a> Widget</h3><p><code>widget</code> - renders a custom form widget, the <code>type</code> field can refer directly to the class name of the widget or the registered alias name.</p><pre><code>blog_content:
    type: Backend\\FormWidgets\\RichEditor
    size: huge
</code></pre><h2 id="form-widgets"><a href="#form-widgets" class="header-anchor">#</a> Form widgets</h2><p>There are various form widgets included as standard, although it is common for plugins to provide their own custom form widgets. You can read more on the <a href="./widgets.html#form-widgets">Form Widgets</a> article.</p>`,79)),t[8]||(t[8]=e("div",{class:"content-list collection-method-list",markdown:"1"},[e("ul",null,[e("li",null,[e("a",{href:"#widget-codeeditor"},"Code editor")]),e("li",null,[e("a",{href:"#widget-colorpicker"},"Color picker")]),e("li",null,[e("a",{href:"#widget-datatable"},"Data table")]),e("li",null,[e("a",{href:"#widget-datepicker"},"Date picker")]),e("li",null,[e("a",{href:"#widget-fileupload"},"File upload")]),e("li",null,[e("a",{href:"#widget-markdowneditor"},"Markdown editor")]),e("li",null,[e("a",{href:"#widget-mediafinder"},"Media finder")]),e("li",null,[e("a",{href:"#widget-nestedform"},"Nested Form")]),e("li",null,[e("a",{href:"#widget-recordfinder"},"Record finder")]),e("li",null,[e("a",{href:"#widget-relation"},"Relation")]),e("li",null,[e("a",{href:"#widget-repeater"},"Repeater")]),e("li",null,[e("a",{href:"#widget-richeditor"},"Rich editor / WYSIWYG")]),e("li",null,[e("a",{href:"#widget-sensitive"},"Sensitive")]),e("li",null,[e("a",{href:"#widget-taglist"},"Tag list")])])],-1)),t[9]||(t[9]=r(`<p><a name="widget-codeeditor"></a></p><h3 id="code-editor"><a href="#code-editor" class="header-anchor">#</a> Code editor</h3><p><code>codeeditor</code> - renders a plaintext editor for formatted code or markup. Note the options may be inherited by the code editor preferences defined for the Administrator in the back-end.</p><pre><code>css_content:
    type: codeeditor
    size: huge
    language: html
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>language</strong></td><td>code language, for example, php, css, javascript, html. Default: php.</td></tr><tr><td><strong>showGutter</strong></td><td>shows a gutter with line numbers. Default: true.</td></tr><tr><td><strong>wrapWords</strong></td><td>breaks long lines on to a new line. Default true.</td></tr><tr><td><strong>fontSize</strong></td><td>the text font size. Default: 12.</td></tr></tbody></table></div><p><a name="widget-colorpicker"></a></p><h3 id="color-picker"><a href="#color-picker" class="header-anchor">#</a> Color picker</h3><p><code>colorpicker</code> - renders controls to select a hexadecimal color value.</p><pre><code>color:
    label: Background
    type: colorpicker
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>availableColors</strong></td><td>list of available colors.</td></tr><tr><td><strong>allowEmpty</strong></td><td>allows empty input value. Default: false</td></tr></tbody></table></div><p>There are two ways to provide the available colors for the colorpicker. The first method defines the <code>availableColors</code> directly as a list of hex color codes in the YAML file:</p><pre><code>color:
    label: Background
    type: colorpicker
    availableColors: [&#39;#000000&#39;, &#39;#111111&#39;, &#39;#222222&#39;]
</code></pre><p>The second method uses a specific method declared in the model class. This method should return an array of hex colors in the same format as in the example above. The first argument of this method is the field name, the second is the currect value of the field, and the third is the current data object for the entire form.</p><pre><code>color:
    label: Background
    type: colorpicker
    availableColors: myColorList
</code></pre><p>Supplying the available colors in the model class:</p><pre><code>public function myColorList($fieldName, $value, $formData)
{
    return [&#39;#000000&#39;, &#39;#111111&#39;, &#39;#222222&#39;]
}
</code></pre><p>If the <code>availableColors</code> field in not defined in the YAML file, the colorpicker uses a set of 20 default colors.</p><p><a name="widget-datatable"></a></p><h3 id="data-table"><a href="#data-table" class="header-anchor">#</a> Data table</h3><p><code>datatable</code> - renders an editable table of records, formatted as a grid. Cell content can be editable directly in the grid, allowing for the management of several rows and columns of information.</p><blockquote><p><strong>NOTE:</strong> In order to use this with a model, the field should be defined as a <code>jsonable</code> attribute, or as another attribute that can handle storing arrayed data.</p></blockquote><pre><code>data:
    type: datatable
    adding: true
    btnAddRowLabel: Add Row Above
    btnAddRowBelowLabel: Add Row Below
    btnDeleteRowLabel: Delete Row
    columns: []
    deleting: true
    dynamicHeight: true
    fieldName: null
    height: false
    keyFrom: id
    recordsPerPage: false
    searching: false
    toolbar: []
</code></pre><h4 id="table-configuration"><a href="#table-configuration" class="header-anchor">#</a> Table configuration</h4><p>The following lists the configuration values of the data table widget itself.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>adding</strong></td><td>allow records to be added to the data table. Default: <code>true</code>.</td></tr><tr><td><strong>btnAddRowLabel</strong></td><td>defines a custom label for the &quot;Add Row Above&quot; button.</td></tr><tr><td><strong>btnAddRowBelowLabel</strong></td><td>defines a custom label for the &quot;Add Row Below&quot; button.</td></tr><tr><td><strong>btnDeleteRowLabel</strong></td><td>defines a custom label for the &quot;Delete Row&quot; button.</td></tr><tr><td><strong>columns</strong></td><td>an array representing the column configuration of the data table. See the <em>Column configuration</em> section below.</td></tr><tr><td><strong>deleting</strong></td><td>allow records to be deleted from the data table. Default: <code>false</code>.</td></tr><tr><td><strong>dynamicHeight</strong></td><td>if <code>true</code>, the data table&#39;s height will extend or shrink depending on the records added, up to the maximum size defined by the <code>height</code> configuration value. Default: <code>false</code>.</td></tr><tr><td><strong>fieldName</strong></td><td>defines a custom field name to use in the POST data sent from the data table. Leave blank to use the default field alias.</td></tr><tr><td><strong>height</strong></td><td>the data table&#39;s height, in pixels. If set to <code>false</code>, the data table will stretch to fit the field container.</td></tr><tr><td><strong>keyFrom</strong></td><td>the data attribute to use for keying each record. This should usually be set to <code>id</code>. Only supports integer values.</td></tr><tr><td><strong>postbackHandlerName</strong></td><td>specifies the AJAX handler name in which the data table content will be sent with. When set to <code>null</code> (default), the handler name will be auto-detected from the request name used by the form which contains the data table. It is recommended to keep this as <code>null</code>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>the number of records to show per page. If set to <code>false</code>, the pagination will be disabled.</td></tr><tr><td><strong>searching</strong></td><td>allow records to be searched via a search box. Default: <code>false</code>.</td></tr><tr><td><strong>toolbar</strong></td><td>an array representing the toolbar configuration of the data table.</td></tr></tbody></table></div><h4 id="column-configuration"><a href="#column-configuration" class="header-anchor">#</a> Column configuration</h4><p>The data table widget allows for the specification of columns as an array via the <code>columns</code> configuration variable. Each column should use the field name as a key, and the following configuration variables to set up the field.</p><p>Example:</p><pre><code>columns:
    id:
        type: string
        title: ID
        validation:
            integer:
                message: Please enter a number
    name:
        type: string
        title: Name
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>type</strong></td><td>the input type for this column&#39;s cells. Must be one of the following: <code>string</code>, <code>checkbox</code>, <code>dropdown</code> or <code>autocomplete</code>.</td></tr><tr><td><strong>options</strong></td><td>for <code>dropdown</code> and <code>autocomplete</code> columns only - this specifies the AJAX handler that will return the available options, as an array. The array key is used as the value of the option, and the array value is used as the option label.</td></tr><tr><td><strong>readOnly</strong></td><td>whether this column is read-only. Default: <code>false</code>.</td></tr><tr><td><strong>title</strong></td><td>defines the column&#39;s title.</td></tr><tr><td><strong>validation</strong></td><td>an array specifying the validation for the content of the column&#39;s cells. See the <em>Column validation</em> section below.</td></tr><tr><td><strong>width</strong></td><td>defines the width of the column, in pixels.</td></tr></tbody></table></div><h4 id="column-validation"><a href="#column-validation" class="header-anchor">#</a> Column validation</h4><p>Column cells can be validated against the below types of validation. Validation should be specified as an array, with the type of validation used as a key, and an optional message specified as the <code>message</code> attrbute for that validation.</p><div class="table"><table tabindex="0"><thead><tr><th>Validation</th><th>Description</th></tr></thead><tbody><tr><td><strong>float</strong></td><td>Validates the data as a float. An optional boolean <code>allowNegative</code> attribute can be provided, allowing for negative float numbers.</td></tr><tr><td><strong>integer</strong></td><td>Validates the data as an integer. An optional boolean <code>allowNegative</code> attribute can be provided, allowing for negative integers.</td></tr><tr><td><strong>length</strong></td><td>Validates the data to be of a certain length. An integer <code>min</code> and <code>max</code> attribute must be provided, representing the minimum and maximum number of characters that must be entered.</td></tr><tr><td><strong>regex</strong></td><td>Validates the data against a regular expression. A string <code>pattern</code> attribute must be provided, defining the regular expression to test the data against.</td></tr><tr><td><strong>required</strong></td><td>Validates that the data must be entered before saving.</td></tr></tbody></table></div><p><a name="widget-datepicker"></a></p><h3 id="date-picker"><a href="#date-picker" class="header-anchor">#</a> Date picker</h3><p><code>datepicker</code> - renders a text field used for selecting date and times.</p><pre><code>published_at:
    label: Published
    type: datepicker
    mode: date
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>the expected result, either date, datetime or time. Default: datetime.</td></tr><tr><td><strong>format</strong></td><td>provide an explicit date display format. Eg: Y-m-d</td></tr><tr><td><strong>minDate</strong></td><td>the minimum/earliest date that can be selected.</td></tr><tr><td><strong>maxDate</strong></td><td>the maximum/latest date that can be selected.</td></tr><tr><td><strong>firstDay</strong></td><td>the first day of the week. Default: 0 (Sunday).</td></tr><tr><td><strong>showWeekNumber</strong></td><td>show week numbers at head of row. Default: false</td></tr><tr><td><strong>ignoreTimezone</strong></td><td>store date and time exactly as it is displayed, ignoring the backend specified timezone preference.</td></tr></tbody></table></div><p><a name="widget-fileupload"></a></p><h3 id="file-upload"><a href="#file-upload" class="header-anchor">#</a> File upload</h3><p><code>fileupload</code> - renders a file uploader for images or regular files.</p><pre><code>avatar:
    label: Avatar
    type: fileupload
    mode: image
    imageHeight: 260
    imageWidth: 260
    thumbOptions:
        mode: crop
        offset:
            - 0
            - 0
        quality: 90
        sharpen: 0
        interlace: false
        extension: auto
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>the expected file type, either file or image. Default: image.</td></tr><tr><td><strong>imageWidth</strong></td><td>if using image type, the image will be resized to this width, optional.</td></tr><tr><td><strong>imageHeight</strong></td><td>if using image type, the image will be resized to this height, optional.</td></tr><tr><td><strong>fileTypes</strong></td><td>file extensions that are accepted by the uploader, optional. Eg: <code>zip,txt</code></td></tr><tr><td><strong>mimeTypes</strong></td><td>MIME types that are accepted by the uploader, either as file extension or fully qualified name, optional. Eg: <code>bin,txt</code></td></tr><tr><td><strong>maxFilesize</strong></td><td>file size in Mb that are accepted by the uploader, optional. Default: from &quot;upload_max_filesize&quot; param value</td></tr><tr><td><strong>useCaption</strong></td><td>allows a title and description to be set for the file. Default: true</td></tr><tr><td><strong>prompt</strong></td><td>text to display for the upload button, applies to files only, optional.</td></tr><tr><td><strong>thumbOptions</strong></td><td>options to pass to the thumbnail generating method for the file</td></tr><tr><td><strong>attachOnUpload</strong></td><td>Automatically attaches the uploaded file on upload if the parent record exists instead of using deferred binding to attach on save of the parent record. Defaults to false.</td></tr></tbody></table></div><blockquote><p><strong>Note:</strong> Unlike the <a href="#mediafinder">Media Finder FormWidget</a>, the File Upload FormWidget uses <a href="./../database/attachments.html">database file attachments</a>; so the field name must match a valid <code>attachOne</code> or <code>attachMany</code> relationship on the Model associated with the Form. <strong>IMPORTANT:</strong> Having a database column with the name used by this field type (i.e. a database column with the name of an existing <code>attachOne</code> or <code>attachMany</code> relationship) <strong>will</strong> cause this FormWidget to break. Use database columns with the Media Finder FormWidget and file attachment relationships with the File Upload FormWidget.</p></blockquote><p><a name="widget-markdowneditor"></a></p><h3 id="markdown-editor"><a href="#markdown-editor" class="header-anchor">#</a> Markdown editor</h3><p><code>markdown</code> - renders a basic editor for markdown formatted text.</p><pre><code>md_content:
    type: markdown
    size: huge
    mode: split
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>the expected view mode, either tab or split. Default: tab.</td></tr></tbody></table></div><p><a name="widget-mediafinder"></a></p><h3 id="media-finder"><a href="#media-finder" class="header-anchor">#</a> Media finder</h3><p><code>mediafinder</code> - renders a field for selecting an item from the media manager library. Expanding the field displays the media manager to locate a file. The resulting selection is a string as the relative path to the file.</p><pre><code>background_image:
    label: Background image
    type: mediafinder
    mode: image
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>the expected file type, either file or image. Default: file.</td></tr><tr><td><strong>prompt</strong></td><td>text to display when there is no item selected. The <code>%s</code> character represents the media manager icon.</td></tr><tr><td><strong>imageWidth</strong></td><td>if using image type, the preview image will be displayed to this width, optional.</td></tr><tr><td><strong>imageHeight</strong></td><td>if using image type, the preview image will be displayed to this height, optional.</td></tr></tbody></table></div><blockquote><p><strong>Note:</strong> Unlike the <a href="#file-upload">File Upload FormWidget</a>, the Media Finder FormWidget stores its data as a string representing the path to the image selected within the Media Library.</p></blockquote><p><a name="widget-nestedform"></a></p><h3 id="nested-form"><a href="#nested-form" class="header-anchor">#</a> Nested Form</h3><p><code>nestedform</code> - renders a nested form as the contents of this field, returns data as an array of the fields contained.</p><blockquote><p><strong>NOTE:</strong> In order to use this with a model, the field should be defined as a <code>jsonable</code> attribute, or as another attribute that can handle storing arrayed data.</p></blockquote><pre><code>content:
    type: nestedform
    usePanelStyles: false
    form:
        fields:
            added_at:
                label: Date added
                type: datepicker
            details:
                label: Details
                type: textarea
            title:
                label: This the title
                type: text
        tabs:
            meta_title:
                lable: Meta Title
                tab: SEO
            color:
                label: Color
                type: colorpicker
                tab: Design
        secondaryTabs:
            is_active:
                label: Active
                type: checkbox
            logo:
                label: Logo
                type: mediafinder
                mode: image
</code></pre><p>A nested form supports the same syntax as a form itself, including tabs and secondaryTabs. The jsonsable attribute, has the structure of your form definition. It&#39;s even possible to use nested forms inside a nested form.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>form</strong></td><td>same as in <a href="#defining-form-fields">form definition</a></td></tr><tr><td><strong>usePanelStyles</strong></td><td>defines if a panel like look is applied or not (defaults true)</td></tr></tbody></table></div><p><a name="widget-recordfinder"></a></p><h3 id="record-finder"><a href="#record-finder" class="header-anchor">#</a> Record finder</h3><p><code>recordfinder</code> - renders a field with details of a related record. Expanding the field displays a popup list to search large amounts of records. Supported by singular relationships only.</p><pre><code>user:
    label: User
    type: recordfinder
    list: ~/plugins/rainlab/user/models/user/columns.yaml
    recordsPerPage: 10
    title: Find Record
    prompt: Click the Find button to find a user
    keyFrom: id
    nameFrom: name
    descriptionFrom: email
    conditions: email = &quot;bob@example.com&quot;
    scope: whereActive
    searchMode: all
    searchScope: searchUsers
    useRelation: false
    modelClass: RainLab\\User\\Models\\User
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>keyFrom</strong></td><td>the name of column to use in the relation used for key. Default: id.</td></tr><tr><td><strong>nameFrom</strong></td><td>the column name to use in the relation used for displaying the name. Default: name.</td></tr><tr><td><strong>descriptionFrom</strong></td><td>the column name to use in the relation used for displaying a description. Default: description.</td></tr><tr><td><strong>title</strong></td><td>text to display in the title section of the popup.</td></tr><tr><td><strong>prompt</strong></td><td>text to display when there is no record selected. The <code>%s</code> character represents the search icon.</td></tr><tr><td><strong>list</strong></td><td>a configuration array or reference to a list column definition file, see <a href="./lists.html#defining-list-columns">list columns</a>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>records to display per page, use 0 for no pages. Default: 10</td></tr><tr><td><strong>conditions</strong></td><td>specifies a raw where query statement to apply to the list model query.</td></tr><tr><td><strong>scope</strong></td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>related form model</strong> to apply to the list query always. The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.</td></tr><tr><td><strong>searchMode</strong></td><td>defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: all.</td></tr><tr><td><strong>searchScope</strong></td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>related form model</strong> to apply to the search query, the first argument will contain the search term.</td></tr><tr><td><strong>useRelation</strong></td><td>Flag for using the name of the field as a relation name to interact with directly on the parent model. Default: true. Disable to return just the selected model&#39;s ID</td></tr><tr><td><strong>modelClass</strong></td><td>Class of the model to use for listing records when useRelation = false</td></tr></tbody></table></div><p><a name="widget-relation"></a></p><h3 id="relation"><a href="#relation" class="header-anchor">#</a> Relation</h3><p><code>relation</code> - renders either a dropdown or checkbox list according to the field relation type. Singular relationships display a dropdown, multiple relationships display a checkbox list. The label used for displaying each relation is sourced by the <code>nameFrom</code> or <code>select</code> definition.</p><pre><code>categories:
    label: Categories
    type: relation
    nameFrom: title
</code></pre><p>Alternatively, you may populate the label using a custom <code>select</code> statement. Any valid SQL statement works here.</p><pre><code>user:
    label: User
    type: relation
    select: concat(first_name, &#39; &#39;, last_name)
</code></pre><p>You can also provide a model scope to use to filter the results with the <code>scope</code> property.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>nameFrom</strong></td><td>a model attribute name used for displaying the relation label. Default: name.</td></tr><tr><td><strong>select</strong></td><td>a custom SQL select statement to use for the name.</td></tr><tr><td><strong>order</strong></td><td>an order clause to sort options by. Example: <code>name desc</code>.</td></tr><tr><td><strong>emptyOption</strong></td><td>text to display when there is no available selections.</td></tr><tr><td><strong>scope</strong></td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>related form model</strong> to apply to the list query always.</td></tr></tbody></table></div><p><a name="widget-repeater"></a></p><h3 id="repeater"><a href="#repeater" class="header-anchor">#</a> Repeater</h3><p><code>repeater</code> - renders a repeating set of form fields defined within.</p><pre><code>extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            added_at:
                label: Date added
                type: datepicker
            details:
                label: Details
                type: textarea
            title_when_collapsed:
                label: This field is the title when collapsed
                type: text
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>form</strong></td><td>a reference to form field definition file, see <a href="#defining-form-fields">backend form fields</a>. Inline fields can also be used.</td></tr><tr><td><strong>prompt</strong></td><td>text to display for the create button. Default: Add new item.</td></tr><tr><td><strong>titleFrom</strong></td><td>name of field within items to use as the title for the collapsed item.</td></tr><tr><td><strong>minItems</strong></td><td>minimum items required. Pre-displays those items when not using groups. For example if you set <strong>&#39;minItems: 1&#39;</strong> the first row will be displayed and not hidden.</td></tr><tr><td><strong>maxItems</strong></td><td>maximum number of items to allow within the repeater.</td></tr><tr><td><strong>groups</strong></td><td>references a group of form fields placing the repeater in group mode (see below). An inline definition can also be used.</td></tr><tr><td><strong>style</strong></td><td>the behavior style to apply for repeater items. Can be one of the following: <code>default</code>, <code>collapsed</code> or <code>accordion</code>. See the <strong>Repeater styles</strong> section below for more information.</td></tr></tbody></table></div><p>The repeater field supports a group mode which allows a custom set of fields to be chosen for each iteration.</p><pre><code>content:
    type: repeater
    prompt: Add content block
    groups: $/acme/blog/config/repeater_fields.yaml
</code></pre><p>This is an example of a group configuration file, which would be located in <strong>/plugins/acme/blog/config/repeater_fields.yaml</strong>. Alternatively these definitions could be specified inline with the repeater.</p><pre><code>textarea:
    name: Textarea
    description: Basic text field
    icon: icon-file-text-o
    fields:
        text_area:
            label: Text Content
            type: textarea
            size: large

quote:
    name: Quote
    description: Quote item
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: Quote Position
            type: radio
            options:
                left: Left
                center: Center
                right: Right
        quote_content:
            span: auto
            label: Details
            type: textarea
</code></pre><p>Each group must specify a unique key and the definition supports the following options.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>the name of the group.</td></tr><tr><td><strong>description</strong></td><td>a brief description of the group.</td></tr><tr><td><strong>icon</strong></td><td>defines an icon for the group, optional.</td></tr><tr><td><strong>fields</strong></td><td>form fields belonging to the group, see <a href="#defining-form-fields">backend form fields</a>.</td></tr></tbody></table></div><blockquote><p><strong>Note</strong>: The group key is stored along with the saved data as the <code>_group</code> attribute.</p></blockquote><h4 id="repeater-style"><a href="#repeater-style" class="header-anchor">#</a> Repeater style</h4><p>The <code>style</code> attribute of the repeater widget controls the behaviour of repeater items. There are three different types of styles available for developers:</p><ul><li><strong>default:</strong> Shows all the repeater items as expanded on page load. This is the default current behavior, and will be used if style is not defined in the repeater widget&#39;s configuration.</li><li><strong>collapsed:</strong> Shows all the repeater items as collapsed (minimised) on page load. The user can collapse or expand items as they wish.</li><li><strong>accordion:</strong> Shows only the first repeater item as expanded on load, with all others collapsed. When another item is exanded, any other expanded item is collapsed, effectively making it so that only one item is expanded at a time.</li></ul><p><a name="widget-richeditor"></a></p><h3 id="rich-editor-wysiwyg"><a href="#rich-editor-wysiwyg" class="header-anchor">#</a> Rich editor / WYSIWYG</h3><p><code>richeditor</code> - renders a visual editor for rich formatted text, also known as a WYSIWYG editor.</p><pre><code>html_content:
    type: richeditor
    toolbarButtons: bold|italic
    size: huge
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>toolbarButtons</strong></td><td>which buttons to show on the editor toolbar.</td></tr></tbody></table></div><p>The available toolbar buttons are:</p><pre><code>fullscreen, bold, italic, underline, strikeThrough, subscript, superscript, fontFamily, fontSize, |, color, emoticons, inlineStyle, paragraphStyle, |, paragraphFormat, align, formatOL, formatUL, outdent, indent, quote, insertHR, -, insertLink, insertImage, insertVideo, insertAudio, insertFile, insertTable, undo, redo, clearFormatting, selectAll, html
</code></pre><blockquote><p><strong>Note</strong>: <code>|</code> will insert a vertical separator line in the toolbar and <code>-</code> a horizontal one.</p></blockquote><p><a name="widget-sensitive"></a></p><h3 id="sensitive"><a href="#sensitive" class="header-anchor">#</a> Sensitive</h3><p><code>sensitive</code> - renders a revealable password field that can be used for sensitive information such as API keys or secrets, configuration values, etc. A sensitive field can be toggled visible and hidden at the user&#39;s request.</p><p>A sensitive field that contains a previously entered value will have the value replaced with a placeholder value on load, preventing the value from being guessed by length or copied. Upon revealing the value, the original value is retrieved by AJAX and populated into the field.</p><pre><code>api_secret:
    type: sensitive
    allowCopy: false
    hideOnTabChange: true
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>allowCopy</strong></td><td>adds a &quot;copy&quot; action to the sensitive field, allowing the user to copy the password without revealing it. Default: false</td></tr><tr><td><strong>hiddenPlaceholder</strong></td><td>sets the placeholder text that is used to simulate a hidden, unrevealed value. You can change this to a long or short string to emulate different length values. Default: <code>__hidden__</code></td></tr><tr><td><strong>hideOnTabChange</strong></td><td>if true, the sensitive field will automatically be hidden if the user navigates to a different tab, or minimizes their browser. Default: true</td></tr></tbody></table></div><p><a name="widget-taglist"></a></p><h3 id="tag-list"><a href="#tag-list" class="header-anchor">#</a> Tag list</h3><p><code>taglist</code> - renders a field for inputting a list of tags.</p><pre><code>tags:
    type: taglist
    separator: space
</code></pre><p>A tag list support the same methods for defining the options as the <a href="#field-dropdown">dropdown field type</a>.</p><pre><code>tags:
    type: taglist
    options:
        - Red
        - Blue
        - Orange
</code></pre><p>You may use the <code>mode</code> called <strong>relation</strong> where the field name is a <a href="./../database/relations.html#many-to-many">many-to-many relationship</a>. This will automatically source and assign tags via the relationship. If custom tags are supported, they will be created before assignment.</p><pre><code>tags:
    type: taglist
    mode: relation
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>controls how the value is returned, either string, array or relation. Default: string</td></tr><tr><td><strong>separator</strong></td><td>separate tags with the specified character, either comma or space. Default: comma</td></tr><tr><td><strong>customTags</strong></td><td>allows custom tags to be entered manually by the user. Default: true</td></tr><tr><td><strong>options</strong></td><td>specifies a method or array for predefined options. Set to true to use model <code>get*Field*Options</code> method. Optional.</td></tr><tr><td><strong>nameFrom</strong></td><td>if relation mode is used, a model attribute name for displaying the tag name. Default: name</td></tr><tr><td><strong>useKey</strong></td><td>use the key instead of value for saving and reading data. Default: false</td></tr></tbody></table></div><h2 id="form-views"><a href="#form-views" class="header-anchor">#</a> Form views</h2><p>For each page your form supports <a href="#create-page">Create</a>, <a href="#update-page">Update</a> and <a href="#preview-page">Preview</a> you should provide a <a href="./../backend/controllers-ajax.html">view file</a> with the corresponding name - <strong>create.htm</strong>, <strong>update.htm</strong> and <strong>preview.htm</strong>.</p><p>The form behavior adds two methods to the controller class: <code>formRender</code> and <code>formRenderPreview</code>. These methods render the form controls configured with the YAML file described above.</p><h3 id="create-view"><a href="#create-view" class="header-anchor">#</a> Create view</h3><p>The <strong>create.htm</strong> view represents the Create page that allows users to create new records. A typical Create page contains breadcrumbs, the form itself, and the form buttons. The <strong>data-request</strong> attribute should refer to the <code>onSave</code> AJAX handler provided by the form behavior. Below is a contents of the typical create.htm form.</p><pre><code>&lt;?= Form::open([&#39;class&#39;=&gt;&#39;layout&#39;]) ?&gt;

    &lt;div class=&quot;layout-row&quot;&gt;
        &lt;?= $this-&gt;formRender() ?&gt;
    &lt;/div&gt;

    &lt;div class=&quot;form-buttons&quot;&gt;
        &lt;div class=&quot;loading-indicator-container&quot;&gt;
            &lt;button
                type=&quot;button&quot;
                data-request=&quot;onSave&quot;
                data-request-data=&quot;close:true&quot;
                data-hotkey=&quot;ctrl+enter, cmd+enter&quot;
                data-load-indicator=&quot;Creating Category...&quot;
                class=&quot;btn btn-default&quot;&gt;
                Create and Close
            &lt;/button&gt;
            &lt;span class=&quot;btn-text&quot;&gt;
                or &lt;a href=&quot;&lt;?= Backend::url(&#39;acme/blog/categories&#39;) ?&gt;&quot;&gt;Cancel&lt;/a&gt;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;

&lt;?= Form::close() ?&gt;
</code></pre><h3 id="update-view"><a href="#update-view" class="header-anchor">#</a> Update view</h3><p>The <strong>update.htm</strong> view represents the Update page that allows users to update or delete existing records. A typical Update page contains breadcrumbs, the form itself, and the form buttons. The Update page is very similar to the Create page, but usually has the Delete button. The <strong>data-request</strong> attribute should refer to the <code>onSave</code> AJAX handler provided by the form behavior. Below is a contents of the typical update.htm form.</p><pre><code>&lt;?= Form::open([&#39;class&#39;=&gt;&#39;layout&#39;]) ?&gt;

    &lt;div class=&quot;layout-row&quot;&gt;
        &lt;?= $this-&gt;formRender() ?&gt;
    &lt;/div&gt;

    &lt;div class=&quot;form-buttons&quot;&gt;
        &lt;div class=&quot;loading-indicator-container&quot;&gt;
            &lt;button
                type=&quot;button&quot;
                data-request=&quot;onSave&quot;
                data-request-data=&quot;close:true&quot;
                data-hotkey=&quot;ctrl+enter, cmd+enter&quot;
                data-load-indicator=&quot;Saving Category...&quot;
                class=&quot;btn btn-default&quot;&gt;
                Save and Close
            &lt;/button&gt;
            &lt;button
                type=&quot;button&quot;
                class=&quot;oc-icon-trash-o btn-icon danger pull-right&quot;
                data-request=&quot;onDelete&quot;
                data-load-indicator=&quot;Deleting Category...&quot;
                data-request-confirm=&quot;Do you really want to delete this category?&quot;&gt;
            &lt;/button&gt;
            &lt;span class=&quot;btn-text&quot;&gt;
                or &lt;a href=&quot;&lt;?= Backend::url(&#39;acme/blog/categories&#39;) ?&gt;&quot;&gt;Cancel&lt;/a&gt;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;

&lt;?= Form::close() ?&gt;
</code></pre><h3 id="preview-view"><a href="#preview-view" class="header-anchor">#</a> Preview view</h3><p>The <strong>preview.htm</strong> view represents the Preview page that allows users to preview existing records in the read-only mode. A typical Preview page contains breadcrumbs and the form itself. Below is a contents of the typical preview.htm form.</p><pre><code>&lt;div class=&quot;form-preview&quot;&gt;
    &lt;?= $this-&gt;formRenderPreview() ?&gt;
&lt;/div&gt;
</code></pre><h2 id="applying-conditions-to-fields"><a href="#applying-conditions-to-fields" class="header-anchor">#</a> Applying conditions to fields</h2><p>Sometimes you may want to manipulate the value or appearance of a form field under certain conditions, for example, you may want to hide an input if a checkbox is ticked. There are a few ways you can do this, either by using the trigger API or field dependencies. The input preset converter is primarily used to converting field values. These options are described in more detail below.</p><h3 id="input-preset-converter"><a href="#input-preset-converter" class="header-anchor">#</a> Input preset converter</h3><p>The input preset converter is defined with the <code>preset</code> <a href="#field-options">form field option</a> and allows you to convert text entered into an element to a URL, slug or file name value in another input element.</p><p>In this example we will automatically fill out the <code>url</code> field value when a user enters text in the <code>title</code> field. If the text <strong>Hello world</strong> is typed in for the Title, the URL will follow suit with the converted value of <strong>/hello-world</strong>. This behavior will only occur when the destination field (<code>url</code>) is empty and untouched.</p><pre><code>title:
    label: Title

url:
    label: URL
    preset:
        field: title
        type: url
</code></pre><p>Alternatively, the <code>preset</code> value can also be a string that refers to the <strong>field</strong> only, the <code>type</code> option will then default to <strong>slug</strong>.</p><pre><code>slug:
    label: Slug
    preset: title
</code></pre><p>The following options are available for the <code>preset</code> option:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>field</strong></td><td>defines the other field name to source the value from.</td></tr><tr><td><strong>type</strong></td><td>specifies the conversion type. See below for supported values.</td></tr><tr><td><strong>prefixInput</strong></td><td>optional, prefixes the converted value with the value found in the supplied input element using a CSS selector.</td></tr></tbody></table></div><p>Following are the supported types:</p><div class="table"><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>exact</strong></td><td>copies the exact value</td></tr><tr><td><strong>slug</strong></td><td>formats the copied value as a slug</td></tr><tr><td><strong>url</strong></td><td>same as slug but prefixed with a /</td></tr><tr><td><strong>camel</strong></td><td>formats the copied value with camelCase</td></tr><tr><td><strong>file</strong></td><td>formats the copied value as a file name with whitespace replaced with dashes</td></tr></tbody></table></div><h3 id="trigger-events"><a href="#trigger-events" class="header-anchor">#</a> Trigger events</h3><p>Trigger events are defined with the <code>trigger</code> <a href="#field-options">form field option</a> and is a simple browser based solution that uses JavaScript. It allows you to change elements attributes such as visibility or value, based on another elements&#39; state. Here is a sample definition:</p><pre><code>is_delayed:
    label: Send later
    comment: Place a tick in this box if you want to send this message at a later time.
    type: checkbox

send_at:
    label: Send date
    type: datepicker
    cssClass: field-indent
    trigger:
        action: show
        field: is_delayed
        condition: checked
</code></pre><p>In the above example the <code>send_at</code> form field will only be shown if the <code>is_delayed</code> field is checked. In other words, the field will show (action) if the other form input (field) is checked (condition). The <code>trigger</code> definition specifies these options:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>action</strong></td><td>defines the action applied to this field when the condition is met. Supported values: show, hide, enable, disable, empty.</td></tr><tr><td><strong>field</strong></td><td>defines the other field name that will trigger the action. Normally the field name refers to a field in the same level form. For example, if this field is in a <a href="#repeater">repeater widget</a>, only fields in that same repeater widget will be checked. However, if the field name is preceded by a caret symbol <code>^</code> like: <code>^parent_field</code>, it will refer to a repeater widget or form one level higher than the field itself. Additionally, if more than one caret <code>^</code> is used, it will refer that many levels higher: <code>^^grand_parent_field</code>, <code>^^^grand_grand_parent_field</code>, etc.</td></tr><tr><td><strong>condition</strong></td><td>determines the condition the specified field should satisfy for the condition to be considered &quot;true&quot;. Supported values: checked, unchecked, value[somevalue].</td></tr></tbody></table></div><h3 id="field-dependencies"><a href="#field-dependencies" class="header-anchor">#</a> Field dependencies</h3><p>Form fields can declare dependencies on other fields by defining the <code>dependsOn</code> <a href="#field-options">form field option</a> which provides a more robust server side solution for updating fields when their dependencies are modified. When the fields that are declared as dependencies change, the defining field will update using the AJAX framework. This provides an opportunity to interact with the field&#39;s properties using the <code>filterFields</code> methods or changing available options to be provided to the field. Examples below:</p><pre><code>country:
    label: Country
    type: dropdown

state:
    label: State
    type: dropdown
    dependsOn: country
</code></pre><p>In the above example the <code>state</code> form field will refresh when the <code>country</code> field has a changed value. When this occurs, the current form data will be filled in the model so the dropdown options can use it.</p><pre><code>public function getCountryOptions()
{
    return [&#39;au&#39; =&gt; &#39;Australia&#39;, &#39;ca&#39; =&gt; &#39;Canada&#39;];
}

public function getStateOptions()
{
    if ($this-&gt;country == &#39;au&#39;) {
        return [&#39;act&#39; =&gt; &#39;Capital Territory&#39;, &#39;qld&#39; =&gt; &#39;Queensland&#39;, ...];
    }
    elseif ($this-&gt;country == &#39;ca&#39;) {
        return [&#39;bc&#39; =&gt; &#39;British Columbia&#39;, &#39;on&#39; =&gt; &#39;Ontario&#39;, ...];
    }
}
</code></pre><p>This example is useful for manipulating the model values, but it does not have access to the form field definitions. You can filter the form fields by defining a <code>filterFields</code> method inside the model, described in the <a href="#filtering-form-fields">Filtering form fields</a> section. An example is provided below:</p><pre><code>dnsprovider:
    label: DNS Provider
    type: dropdown

registrar:
    label: Registrar
    type: dropdown

specificfields[for][provider1]:
    label: Provider 1 ID
    type: text
    hidden: true
    dependsOn:
        - dnsprovider
        - registrar

specificfields[for][provider2]:
    label: Provider 2 ID
    type: text
    hidden: true
    dependsOn:
        - dnsprovider
        - registrar
</code></pre><p>And the logic for the filterFields method would be as follows:</p><pre><code>public function filterFields($fields, $context = null)
{
    $displayedVendors = strtolower($this-&gt;dnsprovider-&gt;name . $this-&gt;registrar-&gt;name);
    if (str_contains($displayedVendors, &#39;provider1&#39;)) {
        $fields-&gt;{&#39;specificfields[for][provider1]&#39;}-&gt;hidden = false;
    }
    if (str_contains($displayedVendors, &#39;provider2&#39;)) {
        $fields-&gt;{&#39;specificfields[for][provider2]&#39;}-&gt;hidden = false;
    }
}
</code></pre><p>In the above example, both the <code>provider1</code> and <code>provider2</code> fields will automatically refresh whenever either the <code>dnsprovider</code> or <code>registrar</code> fields are modified. When this occurs, the full form cycle will be processed, which means that any logic defined in <code>filterFields</code> methods would be run again, allowing you to filter which fields get displayed dynamically.</p><h3 id="preventing-a-field-from-being-submitted"><a href="#preventing-a-field-from-being-submitted" class="header-anchor">#</a> Preventing a field from being submitted</h3><p>Sometimes you may need to prevent a field from being submitted. In order to do that, just add an underscore (_) before the name of the field in the form configuration file. Form fields beginning with an underscore are purged automatically and no longer saved to the model.</p><pre><code>address:
    label: Title
    type: text

_map:
    label: Point your address on the map
    type: mapviewer
</code></pre><h2 id="extending-form-behavior"><a href="#extending-form-behavior" class="header-anchor">#</a> Extending form behavior</h2><p>Sometimes you may wish to modify the default form behavior and there are several ways you can do this.</p><h3 id="overriding-controller-action"><a href="#overriding-controller-action" class="header-anchor">#</a> Overriding controller action</h3><p>You can use your own logic for the <code>create</code>, <code>update</code> or <code>preview</code> action method in the controller, then optionally call the Form behavior parent method.</p><pre><code>public function update($recordId, $context = null)
{
    //
    // Do any custom code here
    //

    // Call the FormController behavior update() method
    return $this-&gt;asExtension(&#39;FormController&#39;)-&gt;update($recordId, $context);
}
</code></pre><h3 id="overriding-controller-redirect"><a href="#overriding-controller-redirect" class="header-anchor">#</a> Overriding controller redirect</h3><p>You can specify the URL to redirect to after the model is saved by overriding the <code>formGetRedirectUrl</code> method. This method returns the location to redirect to with relative URLs being treated as backend URLs.</p><pre><code>public function formGetRedirectUrl($context = null, $model = null)
{
    return &#39;https://octobercms.com&#39;;
}
</code></pre><h3 id="extending-model-query"><a href="#extending-model-query" class="header-anchor">#</a> Extending model query</h3><p>The lookup query for the form <a href="./../database/model.html">database model</a> can be extended by overriding the <code>formExtendQuery</code> method inside the controller class. This example will ensure that soft deleted records can still be found and updated, by applying the <strong>withTrashed</strong> scope to the query:</p><pre><code>public function formExtendQuery($query)
{
    $query-&gt;withTrashed();
}
</code></pre><h3 id="extending-form-fields"><a href="#extending-form-fields" class="header-anchor">#</a> Extending form fields</h3><p>You can extend the fields of another controller from outside by calling the <code>extendFormFields</code> static method on the controller class. This method can take three arguments, <strong>$form</strong> will represent the Form widget object, <strong>$model</strong> represents the model used by the form and <strong>$context</strong> is a string containing the form context. Take this controller for example:</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.FormController&#39;];

    public $formConfig = &#39;config_form.yaml&#39;;
}
</code></pre><p>Using the <code>extendFormFields</code> method you can add extra fields to any form rendered by this controller. Since this has the potential to affect all forms used by this controller, it is a good idea to check the <strong>$model</strong> is of the correct type. Here is an example:</p><pre><code>Categories::extendFormFields(function($form, $model, $context)
{
    if (!$model instanceof MyModel) {
        return;
    }

    $form-&gt;addFields([
        &#39;my_field&#39; =&gt; [
            &#39;label&#39;   =&gt; &#39;My Field&#39;,
            &#39;comment&#39; =&gt; &#39;This is a custom field I have added.&#39;,
        ],
    ]);

});
</code></pre><p>You can also extend the form fields internally by overriding the <code>formExtendFields</code> method inside the controller class. This will only affect the form used by the <code>FormController</code> behavior.</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    [...]

    public function formExtendFields($form)
    {
        $form-&gt;addFields([...]);
    }
}
</code></pre><p>The following methods are available on the $form object.</p><div class="table"><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><strong>addFields</strong></td><td>adds new fields to the outside area</td></tr><tr><td><strong>addTabFields</strong></td><td>adds new fields to the tabbed area</td></tr><tr><td><strong>addSecondaryTabFields</strong></td><td>adds new fields to the secondary tabbed area</td></tr><tr><td><strong>removeField</strong></td><td>remove a field from any areas</td></tr></tbody></table></div><p>Each method takes an array of fields similar to the <a href="#defining-form-fields">form field configuration</a>.</p><h3 id="filtering-form-fields"><a href="#filtering-form-fields" class="header-anchor">#</a> Filtering form fields</h3><p>You can filter the form field definitions by overriding the <code>filterFields</code> method inside the Model used. This allows you to manipulate visibility and other field properties based on the model data. The method takes two arguments <strong>$fields</strong> will represent an object of the fields already defined by the <a href="#defining-form-fields">field configuration</a> and <strong>$context</strong> represents the active form context.</p><pre><code>public function filterFields($fields, $context = null)
{
    if ($this-&gt;source_type == &#39;http&#39;) {
        $fields-&gt;source_url-&gt;hidden = false;
        $fields-&gt;git_branch-&gt;hidden = true;
    }
    elseif ($this-&gt;source_type == &#39;git&#39;) {
        $fields-&gt;source_url-&gt;hidden = false;
        $fields-&gt;git_branch-&gt;hidden = false;
    }
    else {
        $fields-&gt;source_url-&gt;hidden = true;
        $fields-&gt;git_branch-&gt;hidden = true;
    }
}
</code></pre><p>The above example will set the <code>hidden</code> flag on certain fields by checking the value of the Model attribute <code>source_type</code>. This logic will be applied when the form first loads and also when updated by a <a href="#field-dependencies">defined field dependency</a>.</p><h2 id="validating-form-fields"><a href="#validating-form-fields" class="header-anchor">#</a> Validating form fields</h2><p>To validate the fields of your form you can make use of the <a href="./../database/traits.html#validation">Validation</a> trait in your model.</p>`,182))])}const w=l(h,[["render",p]]);export{v as __pageData,w as default};
