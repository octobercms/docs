import{_ as a,r as t,o as l,c as r,e as o,a as s,s as d}from"./chunks/framework.CXcwiNg-.js";const w=JSON.parse('{"title":"Relations - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Configuring the relation behavior","slug":"configuring-the-relation-behavior","link":"#configuring-the-relation-behavior","children":[]},{"level":2,"title":"Relationship types","slug":"relationship-types","link":"#relationship-types","children":[{"level":3,"title":"Has many","slug":"has-many","link":"#has-many","children":[]},{"level":3,"title":"Belongs to many","slug":"belongs-to-many","link":"#belongs-to-many","children":[]},{"level":3,"title":"Belongs to many (with Pivot Data)","slug":"belongs-to-many-with-pivot-data","link":"#belongs-to-many-with-pivot-data","children":[]},{"level":3,"title":"Belongs to","slug":"belongs-to","link":"#belongs-to","children":[]},{"level":3,"title":"Has one","slug":"has-one","link":"#has-one","children":[]}]},{"level":2,"title":"Displaying a relation manager","slug":"displaying-a-relation-manager","link":"#displaying-a-relation-manager","children":[]},{"level":2,"title":"Extending relation behavior","slug":"extending-relation-behavior","link":"#extending-relation-behavior","children":[{"level":3,"title":"Extending relation configuration","slug":"extending-relation-configuration","link":"#extending-relation-configuration","children":[]},{"level":3,"title":"Extending the view widget","slug":"extending-the-view-widget","link":"#extending-the-view-widget","children":[{"level":4,"title":"How to remove a column","slug":"how-to-remove-a-column","link":"#how-to-remove-a-column","children":[]}]},{"level":3,"title":"Extending the manage widget","slug":"extending-the-manage-widget","link":"#extending-the-manage-widget","children":[]},{"level":3,"title":"Extending the pivot widget","slug":"extending-the-pivot-widget","link":"#extending-the-pivot-widget","children":[]},{"level":3,"title":"Extending the filter widgets","slug":"extending-the-filter-widgets","link":"#extending-the-filter-widgets","children":[]},{"level":3,"title":"Extending the refresh results","slug":"extending-the-refresh-results","link":"#extending-the-refresh-results","children":[]}]}],"relativePath":"1.x/backend/relations.md","filePath":"1.x/backend/relations.md"}'),h={name:"1.x/backend/relations.md"};function m(c,e,g,p,f,u){const n=t("pre-heading"),i=t("post-heading");return l(),r("div",null,[o(n),e[0]||(e[0]=s("h1",null,"Relations",-1)),o(i),e[1]||(e[1]=d(`<p><strong>Relation behavior</strong> is a controller modifier used for easily managing complex <a href="./../database/model.html">model</a> relationships on a page. Not to be confused with <a href="./lists.html#available-column-types">List relation columns</a> or <a href="./forms.html#relation">Form relation fields</a> that only provide simple management.</p><p>Relation behavior depends on <a href="#relationship-types">relation definitions</a>. In order to use the relation behavior you should add the <code>Backend.Behaviors.RelationController</code> definition to the <code>$implement</code> field of the controller class. Also, the <code>$relationConfig</code> class property should be defined and its value should refer to the YAML file used for <a href="#configuring-the-relation-behavior">configuring the behavior options</a>.</p><pre><code>namespace Acme\\Projects\\Controllers;

class Projects extends Controller
{
    public $implement = [
        &#39;Backend.Behaviors.FormController&#39;,
        &#39;Backend.Behaviors.RelationController&#39;,
    ];

    public $formConfig = &#39;config_form.yaml&#39;;
    public $relationConfig = &#39;config_relation.yaml&#39;;
}
</code></pre><blockquote><p><strong>Note:</strong> Very often the relation behavior is used together with the <a href="./form.html">form behavior</a>.</p></blockquote><h2 id="configuring-the-relation-behavior"><a href="#configuring-the-relation-behavior" class="header-anchor">#</a> Configuring the relation behavior</h2><p>The configuration file referred in the <code>$relationConfig</code> property is defined in YAML format. The file should be placed into the controller&#39;s <a href="./controllers-ajax.html">views directory</a>. The required configuration depends on the <a href="#relationship-types">relationship type</a> between the target model and the related model.</p><p>The first level field in the relation configuration file defines the relationship name in the target model. For example:</p><pre><code>class Invoice {
    public $hasMany = [
        &#39;items&#39; =&gt; [&#39;Acme\\Pay\\Models\\InvoiceItem&#39;],
    ];
}
</code></pre><p>An <em>Invoice</em> model with a relationship called <code>items</code> should define the first level field using the same relationship name:</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

items:
    label: Invoice Line Item
    view:
        list: $/acme/pay/models/invoiceitem/columns.yaml
        toolbarButtons: create|delete
    manage:
        form: $/acme/pay/models/invoiceitem/fields.yaml
        recordsPerPage: 10
</code></pre><p>The following options are then used for each relationship name definition:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>a label for the relation, in the singular tense, required.</td></tr><tr><td><strong>view</strong></td><td>configuration specific to the view container, see below.</td></tr><tr><td><strong>manage</strong></td><td>configuration specific to the management popup, see below.</td></tr><tr><td><strong>pivot</strong></td><td>a reference to form field definition file, used for <a href="#belongs-to-many-with-pivot-data">relations with pivot table data</a>.</td></tr><tr><td><strong>emptyMessage</strong></td><td>a message to display when the relationship is empty, optional.</td></tr><tr><td><strong>readOnly</strong></td><td>disables the ability to add, update, delete or create relations. default: false</td></tr><tr><td><strong>deferredBinding</strong></td><td><a href="./../database/model.html#deferred-binding">defers all binding actions using a session key</a> when it is available. default: false</td></tr></tbody></table></div><p>These configuration values can be specified for the <strong>view</strong> or <strong>manage</strong> options, where applicable to the render type of list, form or both.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>form</strong></td><td>Form</td><td>a reference to form field definition file, see <a href="./forms.html#defining-form-fields">backend form fields</a>.</td></tr><tr><td><strong>list</strong></td><td>List</td><td>a reference to list column definition file, see <a href="./lists.html#defining-list-columns">backend list columns</a>.</td></tr><tr><td><strong>showSearch</strong></td><td>List</td><td>display an input for searching the records. Default: false</td></tr><tr><td><strong>showSorting</strong></td><td>List</td><td>displays the sorting link on each column. Default: true</td></tr><tr><td><strong>defaultSort</strong></td><td>List</td><td>sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys <code>column</code> and <code>direction</code>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>List</td><td>maximum rows to display for each page.</td></tr><tr><td><strong>noRecordsMessage</strong></td><td>List</td><td>a message to display when no records are found, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>conditions</strong></td><td>List</td><td>specifies a raw where query statement to apply to the list model query.</td></tr><tr><td><strong>scope</strong></td><td>List</td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>related form model</strong> to apply to the list query always. The model that this relationship will be attached to (i.e. the <strong>parent model</strong>) is passed to this scope method as the second parameter (<code>$query</code> is the first).</td></tr><tr><td><strong>filter</strong></td><td>List</td><td>a reference to a filter scopes definition file, see <a href="./lists.html#using-list-filters">backend list filters</a>.</td></tr></tbody></table></div><p>These configuration values can be specified only for the <strong>view</strong> options.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>showCheckboxes</strong></td><td>List</td><td>displays checkboxes next to each record.</td></tr><tr><td><strong>recordUrl</strong></td><td>List</td><td>link each list record to another page. Eg: <strong>users/update/:id</strong>. The <code>:id</code> part is replaced with the record identifier.</td></tr><tr><td><strong>customViewPath</strong></td><td>List</td><td>specify a custom view path to override partials used by the list.</td></tr><tr><td><strong>recordOnClick</strong></td><td>List</td><td>custom JavaScript code to execute when clicking on a record.</td></tr><tr><td><strong>toolbarPartial</strong></td><td>Both</td><td>a reference to a controller partial file with the toolbar buttons. Eg: <strong>_relation_toolbar.htm</strong>. This option overrides the <em>toolbarButtons</em> option.</td></tr><tr><td><strong>toolbarButtons</strong></td><td>Both</td><td>the set of buttons to display. This can be formatted as an array or a pipe separated string, or set to <code>false</code> to show no buttons. Available options are: <code>create</code>, <code>update</code>, <code>delete</code>, <code>add</code>, <code>remove</code>, <code>link</code>, &amp; <code>unlink</code>. Example: <code>add|remove</code>. <br> Additionally, you can customize the text inside these buttons by setting this property to an associative array, with the key being the button type and the value being the text for that button. Example: <code>create: &#39;Assign User&#39;</code>. The value also supports translation.</td></tr></tbody></table></div><p>These configuration values can be specified only for the <strong>manage</strong> options.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>Both</td><td>a popup title, can refer to a <a href="./../plugin/localization.html">localization string</a>. <br> Additionally, you can customize the title for each mode individually by setting this to an associative array, with the key being the mode and the value being the title used when displaying that mode. Eg: <code>form: acme.blog::lang.subcategory.FormTitle</code>.</td></tr><tr><td><strong>context</strong></td><td>Form</td><td>context of the form being displayed. Can be a string or an array with keys: create, update.</td></tr></tbody></table></div><h2 id="relationship-types"><a href="#relationship-types" class="header-anchor">#</a> Relationship types</h2><p>How the relation manager is displayed depends on the relationship definition in the target model. The relationship type will also determine the configuration requirements, these are shown in <strong>bold</strong>. The following relationship types are available:</p><h3 id="has-many"><a href="#has-many" class="header-anchor">#</a> Has many</h3><ol><li>Related records are displayed as a list (<strong>view.list</strong>).</li><li>Clicking a record will display an update form (<strong>manage.form</strong>).</li><li>Clicking <em>Add</em> will display a selection list (<strong>manage.list</strong>).</li><li>Clicking <em>Create</em> will display a create form (<strong>manage.form</strong>).</li><li>Clicking <em>Delete</em> will destroy the record(s).</li><li>Clicking <em>Remove</em> will orphan the relationship.</li></ol><p>For example, if a <em>Blog Post</em> has many <em>Comments</em>, the target model is set as the blog post and a list of comments is displayed, using columns from the <strong>list</strong> definition. Clicking on a comment opens a popup form with the fields defined in <strong>form</strong> to update the comment. Comments can be created in the same way. Below is an example of the relation behavior configuration file:</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

comments:
    label: Comment
    manage:
        form: $/acme/blog/models/comment/fields.yaml
        list: $/acme/blog/models/comment/columns.yaml
    view:
        list: $/acme/blog/models/comment/columns.yaml
        toolbarButtons: create|delete
</code></pre><h3 id="belongs-to-many"><a href="#belongs-to-many" class="header-anchor">#</a> Belongs to many</h3><ol><li>Related records are displayed as a list (<strong>view.list</strong>).</li><li>Clicking <em>Add</em> will display a selection list (<strong>manage.list</strong>).</li><li>Clicking <em>Create</em> will display a create form (<strong>manage.form</strong>).</li><li>Clicking <em>Delete</em> will destroy the pivot table record(s).</li><li>Clicking <em>Remove</em> will orphan the relationship.</li></ol><p>For example, if a <em>User</em> belongs to many <em>Roles</em>, the target model is set as the user and a list of roles is displayed, using columns from the <strong>list</strong> definition. Existing roles can be added and removed from the user. Below is an example of the relation behavior configuration file:</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
        toolbarButtons: add|remove
    manage:
        list: $/acme/user/models/role/columns.yaml
        form: $/acme/user/models/role/fields.yaml
</code></pre><h3 id="belongs-to-many-with-pivot-data"><a href="#belongs-to-many-with-pivot-data" class="header-anchor">#</a> Belongs to many (with Pivot Data)</h3><blockquote><p><strong>Note:</strong> Pivot data is not supported by <a href="./../database/relations.html#deferred-binding">deferred bindings</a> at this time, so the parent model should exist. If your relation behavior config has <code>deferredBinding: true</code>, the pivot data will <strong>not</strong> be available to use in the list configuration (ex.<code>pivot[attribute]</code>).</p></blockquote><ol><li>Related records are displayed as a list (<strong>view.list</strong>).</li><li>Clicking a record will display an update form (<strong>pivot.form</strong>).</li><li>Clicking <em>Add</em> will display a selection list (<strong>manage.list</strong>), then a data entry form (<strong>pivot.form</strong>).</li><li>Clicking <em>Remove</em> will destroy the pivot table record(s).</li></ol><p>Continuing the example in <em>Belongs To Many</em> relations, if a role also carried an expiry date, clicking on a role will open a popup form with the fields defined in <strong>pivot</strong> to update the expiry date. Below is an example of the relation behavior configuration file:</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
    manage:
        list: $/acme/user/models/role/columns.yaml
    pivot:
        form: $/acme/user/models/role/fields.yaml
</code></pre><p>Pivot data is available when defining form fields and list columns via the <code>pivot</code> relation, see the example below:</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

teams:
    label: Team
    view:
        list:
            columns:
                name:
                    label: Name
                pivot[team_color]:
                    label: Team color
    manage:
        list:
            columns:
                name:
                    label: Name
    pivot:
        form:
            fields:
                pivot[team_color]:
                    label: Team color
</code></pre><h3 id="belongs-to"><a href="#belongs-to" class="header-anchor">#</a> Belongs to</h3><ol><li>Related record is displayed as a preview form (<strong>view.form</strong>).</li><li>Clicking <em>Create</em> will display a create form (<strong>manage.form</strong>).</li><li>Clicking <em>Update</em> will display an update form (<strong>manage.form</strong>).</li><li>Clicking <em>Link</em> will display a selection list (<strong>manage.list</strong>).</li><li>Clicking <em>Unlink</em> will orphan the relationship.</li><li>Clicking <em>Delete</em> will destroy the record.</li></ol><p>For example, if a <em>Phone</em> belongs to a <em>Person</em> the relation manager will display a form with the fields defined in <strong>form</strong>. Clicking the Link button will display a list of People to associate with the Phone. Clicking the Unlink button will dissociate the Phone with the Person.</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

person:
    label: Person
    view:
        form: $/acme/user/models/person/fields.yaml
        toolbarButtons: link|unlink
    manage:
        form: $/acme/user/models/person/fields.yaml
        list: $/acme/user/models/person/columns.yaml
</code></pre><h3 id="has-one"><a href="#has-one" class="header-anchor">#</a> Has one</h3><ol><li>Related record is displayed as a preview form (<strong>view.form</strong>).</li><li>Clicking <em>Create</em> will display a create form (<strong>manage.form</strong>).</li><li>Clicking <em>Update</em> will display an update form (<strong>manage.form</strong>).</li><li>Clicking <em>Link</em> will display a selection list (<strong>manage.list</strong>).</li><li>Clicking <em>Unlink</em> will orphan the relationship.</li><li>Clicking <em>Delete</em> will destroy the record.</li></ol><p>For example, if a <em>Person</em> has one <em>Phone</em> the relation manager will display form with the fields defined in <strong>form</strong> for the Phone. When clicking the Update button, a popup is displayed with the fields now editable. If the Person already has a Phone the fields are update, otherwise a new Phone is created for them.</p><pre><code># ===================================
#  Relation Behavior Config
# ===================================

phone:
    label: Phone
    view:
        form: $/acme/user/models/phone/fields.yaml
        toolbarButtons: update|delete
    manage:
        form: $/acme/user/models/phone/fields.yaml
        list: $/acme/user/models/phone/columns.yaml
</code></pre><h2 id="displaying-a-relation-manager"><a href="#displaying-a-relation-manager" class="header-anchor">#</a> Displaying a relation manager</h2><p>Before relations can be managed on any page, the target model must first be initialized in the controller by calling the <code>initRelation</code> method.</p><pre><code>$post = Post::where(&#39;id&#39;, 7)-&gt;first();
$this-&gt;initRelation($post);
</code></pre><blockquote><p><strong>Note:</strong> The <a href="./forms.html">form behavior</a> will automatically initialize the model on its create, update and preview actions.</p></blockquote><p>The relation manager can then be displayed for a specified relation definition by calling the <code>relationRender</code> method. For example, if you want to display the relation manager on the <a href="./forms.html#preview-view">Preview</a> page, the <strong>preview.htm</strong> view contents could look like this:</p><pre><code>&lt;?= $this-&gt;formRenderPreview() ?&gt;

&lt;?= $this-&gt;relationRender(&#39;comments&#39;) ?&gt;
</code></pre><p>You may instruct the relation manager to render in read only mode by passing the option as the second argument:</p><pre><code>&lt;?= $this-&gt;relationRender(&#39;comments&#39;, [&#39;readOnly&#39; =&gt; true]) ?&gt;
</code></pre><h2 id="extending-relation-behavior"><a href="#extending-relation-behavior" class="header-anchor">#</a> Extending relation behavior</h2><p>Sometimes you may wish to modify the default relation behavior and there are several ways you can do this.</p><h3 id="extending-relation-configuration"><a href="#extending-relation-configuration" class="header-anchor">#</a> Extending relation configuration</h3><p>Provides an opportunity to manipulate the relation configuration. The following example can be used to inject a different columns.yaml file based on a property of your model.</p><pre><code>public function relationExtendConfig($config, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field != &#39;myField&#39;)
        return;

    // Show a different list for business customers
    if ($model-&gt;mode == &#39;b2b&#39;) {
        $config-&gt;view[&#39;list&#39;] = &#39;$/author/plugin_name/models/mymodel/b2b_columns.yaml&#39;;
    }
}
</code></pre><h3 id="extending-the-view-widget"><a href="#extending-the-view-widget" class="header-anchor">#</a> Extending the view widget</h3><p>Provides an opportunity to manipulate the view widget.</p><blockquote><p><strong>Note</strong>: The view widget has not yet fully initialized, so not all public methods will work as expected! For more information read <a href="#remove-column">How to remove a column</a>.</p></blockquote><p>For example you might want to toggle showCheckboxes based on a property of your model.</p><pre><code>public function relationExtendViewWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field != &#39;myField&#39;)
        return;

    if ($model-&gt;constant) {
        $widget-&gt;showCheckboxes = false;
    }
}
</code></pre><h4 id="how-to-remove-a-column"><a href="#how-to-remove-a-column" class="header-anchor">#</a> How to remove a column</h4><p>Since the widget has not completed initializing at this point of the runtime cycle you can&#39;t call $widget-&gt;removeColumn(). The addColumns() method as described in the <a href="/docs/backend/lists.html#extending-column-definitions">ListController documentation</a> will work as expected, but to remove a column we need to listen to the &#39;list.extendColumns&#39; event within the relationExtendViewWidget() method. The following example shows how to remove a column:</p><pre><code>public function relationExtendViewWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field != &#39;myField&#39;)
        return;

    // Will not work!
    $widget-&gt;removeColumn(&#39;my_column&#39;);

    // This will work
    $widget-&gt;bindEvent(&#39;list.extendColumns&#39;, function () use($widget) {
        $widget-&gt;removeColumn(&#39;my_column&#39;);
    });
}
</code></pre><h3 id="extending-the-manage-widget"><a href="#extending-the-manage-widget" class="header-anchor">#</a> Extending the manage widget</h3><p>Provides an opportunity to manipulate the manage widget of your relation.</p><pre><code>public function relationExtendManageWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field != &#39;myField&#39;)
        return;

    // manipulate widget as needed
}
</code></pre><h3 id="extending-the-pivot-widget"><a href="#extending-the-pivot-widget" class="header-anchor">#</a> Extending the pivot widget</h3><p>Provides an opportunity to manipulate the pivot widget of your relation.</p><pre><code>public function relationExtendPivotWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field != &#39;myField&#39;)
        return;

    // manipulate widget as needed
}
</code></pre><h3 id="extending-the-filter-widgets"><a href="#extending-the-filter-widgets" class="header-anchor">#</a> Extending the filter widgets</h3><p>There are two filter widgets that may be extended using the following methods, one for the view mode and one for the manage mode of the <code>RelationController</code>.</p><pre><code>public function relationExtendViewFilterWidget($widget, $field, $model)
{
    // Extends the view filter widget
}

public function relationExtendManageFilterWidget($widget, $field, $model)
{
    // Extends the manage filter widget
}
</code></pre><p>Examples on how to add or remove scopes programmatically in the filter widgets can be found in the <strong>Extending filter scopes</strong> section of the <a href="/docs/backend/lists.html#extending-filter-scopes">Backend list documentation</a>.</p><h3 id="extending-the-refresh-results"><a href="#extending-the-refresh-results" class="header-anchor">#</a> Extending the refresh results</h3><p>The view widget is often refreshed when the manage widget makes a change, you can use this method to inject additional containers when this process occurs. Return an array with the extra values to send to the browser, eg:</p><pre><code>public function relationExtendRefreshResults($field)
{
    // Make sure the field is the expected one
    if ($field != &#39;myField&#39;)
        return;

    return [&#39;#myCounter&#39; =&gt; &#39;Total records: 6&#39;];
}
</code></pre>`,77))])}const b=a(h,[["render",m]]);export{w as __pageData,b as default};
