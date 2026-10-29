import{_ as r,r as a,o as d,c,e as s,a as e,s as o,d as n}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Lists - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Configuring the list behavior","slug":"configuring-the-list-behavior","link":"#configuring-the-list-behavior","children":[{"level":3,"title":"Adding a toolbar","slug":"adding-a-toolbar","link":"#adding-a-toolbar","children":[]},{"level":3,"title":"Filtering the list","slug":"filtering-the-list","link":"#filtering-the-list","children":[]}]},{"level":2,"title":"Defining list columns","slug":"defining-list-columns","link":"#defining-list-columns","children":[{"level":3,"title":"Column options","slug":"column-options","link":"#column-options","children":[]}]},{"level":2,"title":"Available column types","slug":"available-column-types","link":"#available-column-types","children":[{"level":3,"title":"Text","slug":"text","link":"#text","children":[]},{"level":3,"title":"Image","slug":"image","link":"#image","children":[]},{"level":3,"title":"Number","slug":"number","link":"#number","children":[]},{"level":3,"title":"Switch","slug":"switch","link":"#switch","children":[]},{"level":3,"title":"Date & Time","slug":"date-time","link":"#date-time","children":[]},{"level":3,"title":"Date","slug":"date","link":"#date","children":[]},{"level":3,"title":"Time","slug":"time","link":"#time","children":[]},{"level":3,"title":"Time since","slug":"time-since","link":"#time-since","children":[]},{"level":3,"title":"Time tense","slug":"time-tense","link":"#time-tense","children":[]},{"level":3,"title":"Select","slug":"select","link":"#select","children":[]},{"level":3,"title":"Relation","slug":"relation","link":"#relation","children":[]},{"level":3,"title":"Partial","slug":"partial","link":"#partial","children":[]},{"level":3,"title":"Color Picker","slug":"color-picker","link":"#color-picker","children":[]}]},{"level":2,"title":"Displaying the list","slug":"displaying-the-list","link":"#displaying-the-list","children":[]},{"level":2,"title":"Multiple list definitions","slug":"multiple-list-definitions","link":"#multiple-list-definitions","children":[]},{"level":2,"title":"Using list filters","slug":"using-list-filters","link":"#using-list-filters","children":[{"level":3,"title":"Scope options","slug":"scope-options","link":"#scope-options","children":[]},{"level":3,"title":"Filter Dependencies","slug":"filter-dependencies","link":"#filter-dependencies","children":[]},{"level":3,"title":"Available scope types","slug":"available-scope-types","link":"#available-scope-types","children":[]},{"level":3,"title":"Group","slug":"group","link":"#group","children":[]},{"level":3,"title":"Checkbox","slug":"checkbox","link":"#checkbox","children":[]},{"level":3,"title":"Switch","slug":"switch-1","link":"#switch-1","children":[]},{"level":3,"title":"Date","slug":"date-1","link":"#date-1","children":[]},{"level":3,"title":"Date Range","slug":"date-range","link":"#date-range","children":[]},{"level":3,"title":"Number","slug":"number-1","link":"#number-1","children":[]},{"level":3,"title":"Number Range","slug":"number-range","link":"#number-range","children":[]},{"level":3,"title":"Text","slug":"text-1","link":"#text-1","children":[]}]},{"level":2,"title":"Extending list behavior","slug":"extending-list-behavior","link":"#extending-list-behavior","children":[{"level":3,"title":"Overriding controller action","slug":"overriding-controller-action","link":"#overriding-controller-action","children":[]},{"level":3,"title":"Overriding views","slug":"overriding-views","link":"#overriding-views","children":[]},{"level":3,"title":"Extending column definitions","slug":"extending-column-definitions","link":"#extending-column-definitions","children":[]},{"level":3,"title":"Inject CSS row class","slug":"inject-css-row-class","link":"#inject-css-row-class","children":[]},{"level":3,"title":"Extending filter scopes","slug":"extending-filter-scopes","link":"#extending-filter-scopes","children":[]},{"level":3,"title":"Extending the model query","slug":"extending-the-model-query","link":"#extending-the-model-query","children":[]},{"level":3,"title":"Extending the records collection","slug":"extending-the-records-collection","link":"#extending-the-records-collection","children":[]},{"level":3,"title":"Custom column types","slug":"custom-column-types","link":"#custom-column-types","children":[]}]}],"relativePath":"1.x/backend/lists.md","filePath":"1.x/backend/lists.md"}'),p={name:"1.x/backend/lists.md"};function h(u,t,g,m,f,b){const i=a("pre-heading"),l=a("post-heading");return d(),c("div",null,[s(i),t[0]||(t[0]=e("h1",null,"Lists",-1)),s(l),t[1]||(t[1]=o(`<p><strong>List behavior</strong> is a controller modifier used for easily adding a record list to a page. The behavior provides the sortable and searchable list with optional links on its records. The behavior provides the controller action <code>index</code> however the list can be rendered anywhere and multiple list definitions can be used.</p><p>List behavior depends on list <a href="#defining-list-columns">column definitions</a> and a <a href="./../database/model.html">model class</a>. In order to use the list behavior you should add it to the <code>$implement</code> property of the controller class. Also, the <code>$listConfig</code> class property should be defined and its value should refer to the YAML file used for configuring the behavior options.</p><pre><code>namespace Acme\\Blog\\Controllers;

class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.ListController&#39;];

    public $listConfig = &#39;list_config.yaml&#39;;
}
</code></pre><blockquote><p><strong>Note:</strong> Very often the list and <a href="./form.html">form behavior</a> are used together in a same controller.</p></blockquote><h2 id="configuring-the-list-behavior"><a href="#configuring-the-list-behavior" class="header-anchor">#</a> Configuring the list behavior</h2><p>The configuration file referred in the <code>$listConfig</code> property is defined in YAML format. The file should be placed into the controller&#39;s <a href="./controllers-ajax.html">views directory</a>. Below is an example of a typical list behavior configuration file:</p><pre><code># ===================================
#  List Behavior Config
# ===================================

title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\\Blog\\Models\\Post
recordUrl: acme/blog/posts/update/:id
</code></pre><p>The following fields are required in the list configuration file:</p><div class="table"><table tabindex="0"><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a title for this list.</td></tr><tr><td><strong>list</strong></td><td>a configuration array or reference to a list column definition file, see <a href="#defining-list-columns">list columns</a>.</td></tr><tr><td><strong>modelClass</strong></td><td>a model class name, the list data is loaded from this model.</td></tr></tbody></table></div><p>The configuration options listed below are optional.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>filter</strong></td><td>filter configuration, see <a href="#filtering-the-list">filtering the list</a>.</td></tr><tr><td><strong>recordUrl</strong></td><td>link each list record to another page. Eg: <strong>users/update:id</strong>. The <code>:id</code> part is replaced with the record identifier. This allows you to link the list behavior and the <a href="./forms.html">form behavior</a>.</td></tr><tr><td><strong>recordOnClick</strong></td><td>custom JavaScript code to execute when clicking on a record.</td></tr><tr><td><strong>noRecordsMessage</strong></td><td>a message to display when no records are found, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>deleteMessage</strong></td><td>a message to display when records are bulk deleted, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>noRecordsDeletedMessage</strong></td><td>a message to display when a bulk delete action is triggered, but no records were deleted, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>records to display per page, use 0 for no pages. Default: 0</td></tr><tr><td><strong>showPageNumbers</strong></td><td>displays page numbers with pagination. Disable this to improve list performance when working with large tables. Default: true</td></tr><tr><td><strong>toolbar</strong></td><td>reference to a Toolbar Widget configuration file, or an array with configuration (see below).</td></tr><tr><td><strong>showSorting</strong></td><td>displays the sorting link on each column. Default: true</td></tr><tr><td><strong>defaultSort</strong></td><td>sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys <code>column</code> and <code>direction</code>.</td></tr><tr><td><strong>showCheckboxes</strong></td><td>displays checkboxes next to each record. Default: false.</td></tr><tr><td><strong>showSetup</strong></td><td>displays the list column set up button. Default: false.</td></tr><tr><td><strong>showTree</strong></td><td>displays a tree hierarchy for parent/child records. Default: false.</td></tr><tr><td><strong>treeExpanded</strong></td><td>if tree nodes should be expanded by default. Default: false.</td></tr><tr><td><strong>customViewPath</strong></td><td>specify a custom view path to override partials used by the list, optional.</td></tr></tbody></table></div><h3 id="adding-a-toolbar"><a href="#adding-a-toolbar" class="header-anchor">#</a> Adding a toolbar</h3><p>To include a toolbar with the list, add the following configuration to the list configuration YAML file:</p><pre><code>toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
</code></pre><p>The toolbar configuration allows:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>buttons</strong></td><td>a reference to a controller partial file with the toolbar buttons. Eg: <strong>_list_toolbar.htm</strong></td></tr><tr><td><strong>search</strong></td><td>reference to a Search Widget configuration file, or an array with configuration.</td></tr></tbody></table></div><p>The search configuration supports the following options:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>prompt</strong></td><td>a placeholder to display when there is no active search, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>mode</strong></td><td>defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: all.</td></tr><tr><td><strong>scope</strong></td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>list model</strong> to apply to the search query. The first argument will contain the query object (as per a regular scope method), the second will contain the search term, and the third will be an array of the columns to be searched.</td></tr><tr><td><strong>searchOnEnter</strong></td><td>setting this to true will make the search widget wait for the Enter key to be pressed before it starts searching (the default behavior is that it starts searching automatically after someone enters something into the search field and then pauses for a short moment). Default: false.</td></tr></tbody></table></div><p>The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a <a href="./controls.html#scoreboards">scoreboard control</a> with charts. Example of a toolbar partial with the <strong>New Post</strong> button referring to the <strong>create</strong> action provided by the <a href="./forms.html">form behavior</a>:</p><pre><code>&lt;div data-control=&quot;toolbar&quot;&gt;
    &lt;a
        href=&quot;&lt;?= Backend::url(&#39;acme/blog/posts/create&#39;) ?&gt;&quot;
        class=&quot;btn btn-primary oc-icon-plus&quot;&gt;New Post&lt;/a&gt;
&lt;/div&gt;
</code></pre><h3 id="filtering-the-list"><a href="#filtering-the-list" class="header-anchor">#</a> Filtering the list</h3><p>To filter a list by user defined input, add the following list configuration to the YAML file:</p><pre><code>filter: config_filter.yaml
</code></pre><p>The <strong>filter</strong> option should make reference to a <a href="#using-list-filters">filter configuration file</a> path or supply an array with the configuration.</p><h2 id="defining-list-columns"><a href="#defining-list-columns" class="header-anchor">#</a> Defining list columns</h2><p>List columns are defined with the YAML file. The column configuration is used by the list behavior for creating the record table and displaying model columns in the table cells. The file is placed to a subdirectory of the <strong>models</strong> directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn&#39;t matter, but the <strong>columns.yaml</strong> and <strong>list_columns.yaml</strong> are common names. Example list columns file location:</p><pre><code>plugins/
  acme/
    blog/
      models/                  &lt;=== Plugin models directory
        post/                  &lt;=== Model configuration directory
          list_columns.yaml    &lt;=== Model list columns config file
        Post.php               &lt;=== model class
</code></pre><p>The next example shows the typical contents of a list column definitions file.</p><pre><code># ===================================
#  List Column Definitions
# ===================================

columns:
    name: Name
    email: Email
</code></pre><h3 id="column-options"><a href="#column-options" class="header-anchor">#</a> Column options</h3><p>For each column can specify these options (where applicable):</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>a name when displaying the list column to the user.</td></tr><tr><td><strong>type</strong></td><td>defines how this column should be rendered (see <a href="#available-column-types">Column types</a> below).</td></tr><tr><td><strong>default</strong></td><td>specifies the default value for the column if value is empty.</td></tr><tr><td><strong>searchable</strong></td><td>include this column in the list search results. Default: false.</td></tr><tr><td><strong>invisible</strong></td><td>specifies if this column is hidden by default. Default: false.</td></tr><tr><td><strong>sortable</strong></td><td>specifies if this column can be sorted. Default: true.</td></tr><tr><td><strong>clickable</strong></td><td>if set to false, disables the default click behavior when the column is clicked. Default: true.</td></tr><tr><td><strong>select</strong></td><td>defines a custom SQL select statement to use for the value.</td></tr><tr><td><strong>valueFrom</strong></td><td>defines a model attribute to use for the value.</td></tr><tr><td><strong>relation</strong></td><td>defines a model relationship column.</td></tr><tr><td><strong>useRelationCount</strong></td><td>use the count of the defined <code>relation</code> as the value for this column. Default: false</td></tr><tr><td><strong>cssClass</strong></td><td>assigns a CSS class to the column container.</td></tr><tr><td><strong>headCssClass</strong></td><td>assigns a CSS class to the column header container.</td></tr><tr><td><strong>width</strong></td><td>sets the column width, can be specified in percents (10%) or pixels (50px). There could be a single column without width specified, it will be stretched to take the available space.</td></tr><tr><td><strong>align</strong></td><td>specifies the column alignment. Possible values are <code>left</code>, <code>right</code> and <code>center</code>.</td></tr><tr><td><strong>permissions</strong></td><td>the <a href="./users.html#users-and-permissions">permissions</a> that the current backend user must have in order for the column to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.</td></tr></tbody></table></div><h2 id="available-column-types"><a href="#available-column-types" class="header-anchor">#</a> Available column types</h2><p>There are various column types that can be used for the <strong>type</strong> setting, these control how the list column is displayed. In addition to the native column types specified below, you may also <a href="#custom-column-types">define custom column types</a>.</p>`,34)),t[2]||(t[2]=e("div",{class:"content-list collection-method-list",markdown:"1"},[e("ul",null,[e("li",null,[e("a",{href:"#column-text"},"Text")]),e("li",null,[e("a",{href:"#column-image"},"Image")]),e("li",null,[e("a",{href:"#column-number"},"Number")]),e("li",null,[e("a",{href:"#column-switch"},"Switch")]),e("li",null,[e("a",{href:"#column-datetime"},"Date & Time")]),e("li",null,[e("a",{href:"#column-date"},"Date")]),e("li",null,[e("a",{href:"#column-time"},"Time")]),e("li",null,[e("a",{href:"#column-timesince"},"Time since")]),e("li",null,[e("a",{href:"#column-timetense"},"Time tense")]),e("li",null,[e("a",{href:"#column-select"},"Select")]),e("li",null,[e("a",{href:"#column-relation"},"Relation")]),e("li",null,[e("a",{href:"#column-partial"},"Partial")]),e("li",null,[e("a",{href:"#column-colorpicker"},"Colorpicker")])])],-1)),t[3]||(t[3]=o(`<p><a name="column-text"></a></p><h3 id="text"><a href="#text" class="header-anchor">#</a> Text</h3><p><code>text</code> - displays a text column, aligned left</p><pre><code>full_name:
    label: Full Name
    type: text
</code></pre><p>You can also specify a custom text format, for example <strong>Admin:Full Name (active)</strong></p><pre><code>full_name:
    label: Full Name
    type: text
    format: Admin:%s (active)
</code></pre><p><a name="column-image"></a></p><h3 id="image"><a href="#image" class="header-anchor">#</a> Image</h3><p><code>image</code> - displays an image using the built in <a href="./../services/image-resizing.html#resize-sources">image resizing functionality</a>.</p><pre><code>avatar:
    label: Avatar
    type: image
    sortable: false
    width: 150
    height: 150
    options:
        quality: 80
</code></pre><p>See the <a href="./../services/image-resizing.html#resize-sources">image resizing docs</a> for more information on what image sources are supported and what <a href="./../services/image-resizing.html#resize-parameters">options</a> are supported</p><p><a name="column-number"></a></p><h3 id="number"><a href="#number" class="header-anchor">#</a> Number</h3><p><code>number</code> - displays a number column, aligned right</p><pre><code>age:
    label: Age
    type: number
</code></pre><p>You can also specify a custom number format, for example currency <strong>$ 99.00</strong></p><pre><code>price:
    label: Price
    type: number
    format: $ %.2f
</code></pre>`,17)),t[4]||(t[4]=e("blockquote",null,[e("p",null,[e("strong",null,"Note:"),n(" Both "),e("code",null,"text"),n(" and "),e("code",null,"number"),n(" columns support the "),e("code",null,"format"),n(" property, this property follows the formatting rules of the "),e("a",{href:"https://secure.php.net/manual/en/function.sprintf.php",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("PHP sprintf() function"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(". Value must be a string.")])],-1)),t[5]||(t[5]=o(`<p><a name="column-switch"></a></p><h3 id="switch"><a href="#switch" class="header-anchor">#</a> Switch</h3><p><code>switch</code> - displays a on or off state for boolean columns.</p><pre><code>enabled:
    label: Enabled
    type: switch
</code></pre><p><a name="column-datetime"></a></p><h3 id="date-time"><a href="#date-time" class="header-anchor">#</a> Date &amp; Time</h3><p><code>datetime</code> - displays the column value as a formatted date and time. The next example displays dates as <strong>Thu, Dec 25, 1975 2:15 PM</strong>.</p><pre><code>created_at:
    label: Date
    type: datetime
</code></pre><p>You can also specify a custom date format, for example <strong>Thursday 25th of December 1975 02:15:16 PM</strong>:</p><pre><code>created_at:
    label: Date
    type: datetime
    format: l jS \\of F Y h:i:s A
</code></pre><p>You may also wish to set <code>ignoreTimezone: true</code> to prevent a timezone conversion between the date that is displayed and the date stored in the database, since by default the backend timezone preference is applied to the display value.</p><pre><code>created_at:
    label: Date
    type: datetime
    ignoreTimezone: true
</code></pre><blockquote><p><strong>Note:</strong> the <code>ignoreTimezone</code> option also applies to other date and time related field types, including <code>date</code>, <code>time</code>, <code>timesince</code> and <code>timetense</code>.</p></blockquote><p><a name="column-date"></a></p><h3 id="date"><a href="#date" class="header-anchor">#</a> Date</h3><p><code>date</code> - displays the column value as date format <strong>M j, Y</strong></p><pre><code>created_at:
    label: Date
    type: date
</code></pre><p><a name="column-time"></a></p><h3 id="time"><a href="#time" class="header-anchor">#</a> Time</h3><p><code>time</code> - displays the column value as time format <strong>g:i A</strong></p><pre><code>created_at:
    label: Date
    type: time
</code></pre><p><a name="column-timesince"></a></p><h3 id="time-since"><a href="#time-since" class="header-anchor">#</a> Time since</h3><p><code>timesince</code> - displays a human readable time difference from the value to the current time. Eg: <strong>10 minutes ago</strong></p><pre><code>created_at:
    label: Date
    type: timesince
</code></pre><p><a name="column-timetense"></a></p><h3 id="time-tense"><a href="#time-tense" class="header-anchor">#</a> Time tense</h3><p><code>timetense</code> - displays 24-hour time and the day using the grammatical tense of the current date. Eg: <strong>Today at 12:49</strong>, <strong>Yesterday at 4:00</strong> or <strong>18 Sep 2015 at 14:33</strong>.</p><pre><code>created_at:
    label: Date
    type: timetense
</code></pre><p><a name="column-select"></a></p><h3 id="select"><a href="#select" class="header-anchor">#</a> Select</h3><p><code>select</code> - allows to create a column using a custom select statement. Any valid SQL SELECT statement works here.</p><pre><code>full_name:
    label: Full Name
    select: concat(first_name, &#39; &#39;, last_name)
</code></pre><p><a name="column-relation"></a></p><h3 id="relation"><a href="#relation" class="header-anchor">#</a> Relation</h3><p><code>relation</code> - allows to display related columns, you can provide a relationship option. The value of this option has to be the name of the Active Record <a href="./../database/relations.html">relationship</a> on your model. In the next example the <strong>name</strong> value will be translated to the name attribute found in the related model (eg: <code>$model-&gt;name</code>).</p><pre><code>group:
    label: Group
    relation: groups
    select: name
</code></pre><p>To display a column that shows the number of related records, use the <code>useRelationCount</code> option.</p><pre><code>users_count:
    label: Users
    relation: users
    useRelationCount: true
</code></pre><blockquote><p><strong>Note:</strong> Using the <code>relation</code> option on a column will load the value from the <code>select</code>ed column into the attribute specified by this column. It is recommended that you name the column displaying the relation data without conflicting with existing model attributes as demonstrated in the examples below:</p></blockquote><p><strong>Best Practice:</strong></p><pre><code> group_name:
     label: Group
     relation: group
     select: name
</code></pre><p><strong>Poor Practice:</strong></p><pre><code># This will overwrite the value of $record-&gt;group_id which will break accessing relations from the list view
group_id:
    label: Group
    relation: group
    select: name
</code></pre><p><a name="column-partial"></a></p><h3 id="partial"><a href="#partial" class="header-anchor">#</a> Partial</h3><p><code>partial</code> - renders a partial, the <code>path</code> value can refer to a partial view file otherwise the column name is used as the partial name. Inside the partial these variables are available: <code>$value</code> is the default cell value, <code>$record</code> is the model used for the cell and <code>$column</code> is the configured class object <code>Backend\\Classes\\ListColumn</code>.</p><pre><code>content:
    label: Content
    type: partial
    path: ~/plugins/acme/blog/models/comment/_content_column.htm
</code></pre><p><a name="column-colorpicker"></a></p><h3 id="color-picker"><a href="#color-picker" class="header-anchor">#</a> Color Picker</h3><p><code>colorpicker</code> - displays a color from colorpicker column</p><pre><code>color:
    label: Background
    type: colorpicker
</code></pre><h2 id="displaying-the-list"><a href="#displaying-the-list" class="header-anchor">#</a> Displaying the list</h2><p>Usually lists are displayed in the index <a href="./controllers-ajax.html">view</a> file. Since lists include the toolbar, the view file will consist solely of the single <code>listRender</code> method call.</p><pre><code>&lt;?= $this-&gt;listRender() ?&gt;
</code></pre><h2 id="multiple-list-definitions"><a href="#multiple-list-definitions" class="header-anchor">#</a> Multiple list definitions</h2><p>The list behavior can support multiple lists in the same controller using named definitions. The <code>$listConfig</code> property can be defined as an array where the key is a definition name and the value is the configuration file.</p><pre><code>public $listConfig = [
    &#39;templates&#39; =&gt; &#39;config_templates_list.yaml&#39;,
    &#39;layouts&#39; =&gt; &#39;config_layouts_list.yaml&#39;
];
</code></pre><p>Each definition can then be displayed by passing the definition name as the first argument when calling the <code>listRender</code> method:</p><pre><code>&lt;?= $this-&gt;listRender(&#39;templates&#39;) ?&gt;
</code></pre><h2 id="using-list-filters"><a href="#using-list-filters" class="header-anchor">#</a> Using list filters</h2><p>Lists can be filtered by <a href="#filtering-the-list">adding a filter definition</a> to the list configuration. Similarly filters are driven by their own configuration file that contain filter scopes, each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.</p><pre><code># ===================================
# Filter Scope Definitions
# ===================================

scopes:

    category:
        label: Category
        modelClass: Acme\\Blog\\Models\\Category
        conditions: category_id in (:filtered)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:filtered)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: Hide published
        type: checkbox
        default: 1
        conditions: is_published &lt;&gt; true

    approved:
        label: Approved
        type: switch
        default: 2
        conditions:
            - is_approved &lt;&gt; true
            - is_approved = true

    created_at:
        label: Date
        type: date
        conditions: created_at &gt;= &#39;:filtered&#39;

    published_at:
        label: Date
        type: daterange
        conditions: created_at &gt;= &#39;:after&#39; AND created_at &lt;= &#39;:before&#39;
</code></pre><h3 id="scope-options"><a href="#scope-options" class="header-anchor">#</a> Scope options</h3><p>For each scope you can specify these options (where applicable):</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>a name when displaying the filter scope to the user.</td></tr><tr><td><strong>type</strong></td><td>defines how this scope should be rendered (see <a href="#available-scope-types">Scope types</a> below). Default: group.</td></tr><tr><td><strong>conditions</strong></td><td>specifies a raw where query statement to apply to the list model query, the <code>:filtered</code> parameter represents the filtered value(s).</td></tr><tr><td><strong>scope</strong></td><td>specifies a <a href="./../database/model.html#query-scopes">query scope method</a> defined in the <strong>list model</strong> to apply to the list query. The first argument will contain the query object (as per a regular scope method) and the second argument will contain the filtered value(s)</td></tr><tr><td><strong>options</strong></td><td>options to use if filtering by multiple items, this option can specify an array or a method name in the <code>modelClass</code> model.</td></tr><tr><td><strong>nameFrom</strong></td><td>if filtering by multiple items, the attribute to display for the name, taken from all records of the <code>modelClass</code> model.</td></tr><tr><td><strong>default</strong></td><td>can either be integer(switch,checkbox,number) or array(group,date range,number range) or string(date).</td></tr><tr><td><strong>permissions</strong></td><td>the <a href="./users.html#users-and-permissions">permissions</a> that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.</td></tr><tr><td><strong>dependsOn</strong></td><td>a string or an array of other scope names that this scope <a href="#filter-scope-dependencies">depends on</a>. When the other scopes are modified, this scope will update.</td></tr></tbody></table></div><h3 id="filter-dependencies"><a href="#filter-dependencies" class="header-anchor">#</a> Filter Dependencies</h3><p>Filter scopes can declare dependencies on other scopes by defining the <code>dependsOn</code> <a href="#scope-options">scope option</a>, which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will update dynamically. This provides an opportunity to change the available options to be provided to the scope.</p><pre><code>country:
    label: Country
    type: group
    conditions: country_id in (:filtered)
    modelClass: October\\Test\\Models\\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:filtered)
    modelClass: October\\Test\\Models\\Location
    options: getCityOptions
    dependsOn: country
</code></pre><p>In the above example, the <code>city</code> scope will refresh when the <code>country</code> scope has changed. Any scope that defines the <code>dependsOn</code> property will be passed all current scope objects for the Filter widget, including their current values, as an array that is keyed by the scope names.</p><pre><code>public function getCountryOptions()
{
    return Country::lists(&#39;name&#39;, &#39;id&#39;);
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes[&#39;country&#39;]-&gt;value)) {
        return City::whereIn(&#39;country_id&#39;, array_keys($scopes[&#39;country&#39;]-&gt;value))-&gt;lists(&#39;name&#39;, &#39;id&#39;);
    } else {
        return City::lists(&#39;name&#39;, &#39;id&#39;);
    }
}
</code></pre><blockquote><p><strong>Note:</strong> Scope dependencies with <code>type: group</code> are only supported at this stage.</p></blockquote><h3 id="available-scope-types"><a href="#available-scope-types" class="header-anchor">#</a> Available scope types</h3><p>These types can be used to determine how the filter scope should be displayed.</p>`,74)),t[6]||(t[6]=e("div",{class:"content-list collection-method-list",markdown:"1"},[e("ul",null,[e("li",null,[e("a",{href:"#filter-group"},"Group")]),e("li",null,[e("a",{href:"#filter-checkbox"},"Checkbox")]),e("li",null,[e("a",{href:"#filter-switch"},"Switch")]),e("li",null,[e("a",{href:"#filter-date"},"Date")]),e("li",null,[e("a",{href:"#filter-daterange"},"Date range")]),e("li",null,[e("a",{href:"#filter-number"},"Number")]),e("li",null,[e("a",{href:"#filter-numberrange"},"Number range")]),e("li",null,[e("a",{href:"#filter-text"},"Text")])])],-1)),t[7]||(t[7]=o(`<p><a name="filter-group"></a></p><h3 id="group"><a href="#group" class="header-anchor">#</a> Group</h3><p><code>group</code> - filters the list by a group of items, usually by a related model and requires a <code>nameFrom</code> or <code>options</code> definition. Eg: Status name as open, closed, etc.</p><pre><code>status:
    label: Status
    type: group
    conditions: status in (:filtered)
    default:
        pending: Pending
        active: Active
    options:
        pending: Pending
        active: Active
        closed: Closed
</code></pre><p><a name="filter-checkbox"></a></p><h3 id="checkbox"><a href="#checkbox" class="header-anchor">#</a> Checkbox</h3><p><code>checkbox</code> - used as a binary checkbox to apply a predefined condition or query to the list, either on or off. Use 0 for off and 1 for on for default value</p><pre><code>published:
    label: Hide published
    type: checkbox
    default: 1
    conditions: is_published &lt;&gt; true
</code></pre><p><a name="filter-switch"></a></p><h3 id="switch-1"><a href="#switch-1" class="header-anchor">#</a> Switch</h3><p><code>switch</code> - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off. Use 0 for off, 1 for indeterminate and 2 for on for default value</p><pre><code>approved:
    label: Approved
    type: switch
    default: 1
    conditions:
        - is_approved &lt;&gt; true
        - is_approved = true
</code></pre><p><a name="filter-date"></a></p><h3 id="date-1"><a href="#date-1" class="header-anchor">#</a> Date</h3><p><code>date</code> - displays a date picker for a single date to be selected. The values available to be used in the conditions property are:</p><ul><li><p><code>:filtered</code>: The selected date formatted as <code>Y-m-d</code></p></li><li><p><code>:before</code>: The selected date formatted as <code>Y-m-d 00:00:00</code>, converted from the backend timezone to the app timezone</p></li><li><p><code>:after</code>: The selected date formatted as <code>Y-m-d 23:59:59</code>, converted from the backend timezone to the app timezone</p><p>created_at: label: Date type: date minDate: &#39;2001-01-23&#39; maxDate: &#39;2030-10-13&#39; yearRange: 10 conditions: created_at &gt;= &#39;:filtered&#39;</p></li></ul><p><a name="filter-daterange"></a></p><h3 id="date-range"><a href="#date-range" class="header-anchor">#</a> Date Range</h3><p><code>daterange</code> - displays a date picker for two dates to be selected as a date range. The values available to be used in the conditions property are:</p><ul><li><p><code>:before</code>: The selected &quot;before&quot; date formatted as <code>Y-m-d H:i:s</code></p></li><li><p><code>:beforeDate</code>: The selected &quot;before&quot; date formatted as <code>Y-m-d</code></p></li><li><p><code>:after</code>: The selected &quot;after&quot; date formatted as <code>Y-m-d H:i:s</code></p></li><li><p><code>:afterDate</code>: The selected &quot;after&quot; date formatted as <code>Y-m-d</code></p><p>published_at: label: Date type: daterange minDate: &#39;2001-01-23&#39; maxDate: &#39;2030-10-13&#39; yearRange: 10 conditions: created_at &gt;= &#39;:after&#39; AND created_at &lt;= &#39;:before&#39;</p></li></ul><p>To use default value for Date and Date Range</p><div class="language-php extra-class"><pre class="language-php"><code>    <span class="token class-name static-context">myController</span><span class="token operator">::</span><span class="token function">extendListFilterScopes</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$filter</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
            <span class="token string single-quoted-string">&#39;Date Test&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;label&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Date Test&#39;</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;daterange&#39;</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;default&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">myDefaultTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;conditions&#39;</span> <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;created_at &gt;= &#39;:after&#39; AND created_at &lt;= &#39;:before&#39;&quot;</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// return value must be instance of carbon</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">myDefaultTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token number">0</span> <span class="token operator">=&gt;</span> <span class="token class-name static-context">Carbon</span><span class="token operator">::</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;2012-02-02&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token number">1</span> <span class="token operator">=&gt;</span> <span class="token class-name static-context">Carbon</span><span class="token operator">::</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;2012-04-02&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre></div><p>You may also wish to set <code>ignoreTimezone: true</code> to prevent a timezone conversion between the date that is displayed and the date stored in the database, since by default the backend timezone preference is applied to the display value.</p><pre><code>published_at:
    label: Date
    type: daterange
    minDate: &#39;2001-01-23&#39;
    maxDate: &#39;2030-10-13&#39;
    yearRange: 10
    conditions: created_at &gt;= &#39;:after&#39; AND created_at &lt;= &#39;:before&#39;
    ignoreTimezone: true
</code></pre><blockquote><p><strong>Note:</strong> the <code>ignoreTimezone</code> option also applies to the <code>date</code> filter type as well.</p></blockquote><p><a name="filter-number"></a></p><h3 id="number-1"><a href="#number-1" class="header-anchor">#</a> Number</h3><p><code>number</code> - displays input for a single number to be entered. The value is available to be used in the conditions property as <code>:filtered</code>.</p><pre><code>age:
    label: Age
    type: number
    default: 14
    conditions: age &gt;= &#39;:filtered&#39;
</code></pre><p><a name="filter-numberrange"></a></p><h3 id="number-range"><a href="#number-range" class="header-anchor">#</a> Number Range</h3><p><code>numberrange</code> - displays inputs for two numbers to be entered as a number range. The values available to be used in the conditions property are:</p><ul><li><code>:min</code>: The minimum value, defaults to -2147483647</li><li><code>:max</code>: The maximum value, defaults to 2147483647</li></ul><p>You may leave either the minimum value blank to search everything up to the maximum value, and vice versa, you may leave the maximum value blank to search everything at least the minimum value.</p><pre><code>visitors:
    label: Visitor Count
    type: numberrange
    default:
        0: 10
        1: 20
    conditions: visitors &gt;= &#39;:min&#39; and visitors &lt;= &#39;:max&#39;
</code></pre><p><a name="filter-text"></a></p><h3 id="text-1"><a href="#text-1" class="header-anchor">#</a> Text</h3><p><code>text</code> - display text input for a string to be entered. You can specify a <code>size</code> attribute that will be injected in the input size attribute (default: 10).</p><pre><code>username:
    label: Username
    type: text
    conditions: username = :value
    size: 2
</code></pre><h2 id="extending-list-behavior"><a href="#extending-list-behavior" class="header-anchor">#</a> Extending list behavior</h2><p>Sometimes you may wish to modify the default list behavior and there are several ways you can do this.</p><h3 id="overriding-controller-action"><a href="#overriding-controller-action" class="header-anchor">#</a> Overriding controller action</h3><p>You can use your own logic for the <code>index</code> action method in the controller, then optionally call the List behavior <code>index</code> parent method.</p><pre><code>public function index()
{
    //
    // Do any custom code here
    //

    // Call the ListController behavior index() method
    $this-&gt;asExtension(&#39;ListController&#39;)-&gt;index();
}
</code></pre><h3 id="overriding-views"><a href="#overriding-views" class="header-anchor">#</a> Overriding views</h3><p>The <code>ListController</code> behavior has a main container view that you may override by creating a special file named <code>_list_container.htm</code> in your controller directory. The following example will add a sidebar to the list:</p><pre><code>&lt;?php if ($toolbar): ?&gt;
    &lt;?= $toolbar-&gt;render() ?&gt;
&lt;?php endif ?&gt;

&lt;?php if ($filter): ?&gt;
    &lt;?= $filter-&gt;render() ?&gt;
&lt;?php endif ?&gt;

&lt;div class=&quot;row row-flush&quot;&gt;
    &lt;div class=&quot;col-sm-3&quot;&gt;
        [Insert sidebar here]
    &lt;/div&gt;
    &lt;div class=&quot;col-sm-9 list-with-sidebar&quot;&gt;
        &lt;?= $list-&gt;render() ?&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><p>The behavior will invoke a <code>Lists</code> widget that also contains numerous views that you may override. This is possible by specifying a <code>customViewPath</code> option as described in the <a href="#configuring-the-list-behavior">list configuration options</a>. The widget will look in this path for a view first, then fall back to the default location.</p><pre><code># Custom view path
customViewPath: $/acme/blog/controllers/reviews/list
</code></pre><blockquote><p><strong>Note</strong>: It is a good idea to use a sub-directory, for example <code>list</code>, to avoid conflicts.</p></blockquote><p>For example, to modify the list body row markup, create a file called <code>list/_list_body_row.htm</code> in your controller directory.</p><pre><code>&lt;tr&gt;
    &lt;?php foreach ($columns as $key =&gt; $column): ?&gt;
        &lt;td&gt;&lt;?= $this-&gt;getColumnValue($record, $column) ?&gt;&lt;/td&gt;
    &lt;?php endforeach ?&gt;
&lt;/tr&gt;
</code></pre><h3 id="extending-column-definitions"><a href="#extending-column-definitions" class="header-anchor">#</a> Extending column definitions</h3><p>You can extend the columns of another controller from outside by calling the <code>extendListColumns</code> static method on the controller class. This method can take two arguments, <strong>$list</strong> will represent the Lists widget object and <strong>$model</strong> represents the model used by the list. Take this controller for example:</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.ListController&#39;];

    public $listConfig = &#39;list_config.yaml&#39;;
}
</code></pre><p>Using the <code>extendListColumns</code> method you can add extra columns to any list rendered by this controller. It is a good idea to check the <strong>$model</strong> is of the correct type. Here is an example:</p><pre><code>    Categories::extendListColumns(function($list, $model)
    {
        if (!$model instanceof MyModel) {
            return;
        }

        $list-&gt;addColumns([
            &#39;my_column&#39; =&gt; [
                &#39;label&#39; =&gt; &#39;My Column&#39;
            ]
        ]);

    });
</code></pre><p>You can also extend the list columns internally by overriding the <code>listExtendColumns</code> method inside the controller class.</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    [...]

    public function listExtendColumns($list)
    {
        $list-&gt;addColumns([...]);
    }
}
</code></pre><p>The following methods are available on the $list object.</p><div class="table"><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><strong>addColumns</strong></td><td>adds new columns to the list</td></tr><tr><td><strong>removeColumn</strong></td><td>removes a column from the list</td></tr></tbody></table></div><p>Each method takes an array of columns similar to the <a href="#defining-list-columns">list column configuration</a>.</p><h3 id="inject-css-row-class"><a href="#inject-css-row-class" class="header-anchor">#</a> Inject CSS row class</h3><p>You can inject a custom css row class by adding a <code>listInjectRowClass</code> method on the controller class. This method can take two arguments, <strong>$record</strong> will represent a single model record and <strong>$definition</strong> contains the name of the List widget definition. You can return any string value containing your row classes. These classes will be added to the row&#39;s HTML markup.</p><pre><code>class Lessons extends \\Backend\\Classes\\Controller
{
    [...]

    public function listInjectRowClass($lesson, $definition)
    {
        // Strike through past lessons
        if ($lesson-&gt;lesson_date-&gt;lt(Carbon::today())) {
            return &#39;strike&#39;;
        }
    }
}
</code></pre><p>A special CSS class <code>nolink</code> is available to force a row to be unclickable, even if the <code>recordUrl</code> or <code>recordOnClick</code> options are defined for the List widget. Returning this class in an event will allow you to make records unclickable - for example, for soft-deleted rows or for informational rows:</p><pre><code>    public function listInjectRowClass($record, $value)
    {
        if ($record-&gt;trashed()) {
            return &#39;nolink&#39;;
        }
    }
</code></pre><h3 id="extending-filter-scopes"><a href="#extending-filter-scopes" class="header-anchor">#</a> Extending filter scopes</h3><p>You can extend the filter scopes of another controller from outside by calling the <code>extendListFilterScopes</code> static method on the controller class. This method can take the argument <strong>$filter</strong> which will represent the Filter widget object. Take this controller for example:</p><pre><code>    Categories::extendListFilterScopes(function($filter) {
        // Add custom CSS classes to the Filter widget itself
        $filter-&gt;cssClasses = array_merge($filter-&gt;cssClasses, [&#39;my&#39;, &#39;array&#39;, &#39;of&#39;, &#39;classes&#39;]);

        $filter-&gt;addScopes([
            &#39;my_scope&#39; =&gt; [
                &#39;label&#39; =&gt; &#39;My Filter Scope&#39;
            ]
        ]);
    });
</code></pre><blockquote><p>The array of scopes provided is similar to the <a href="#using-list-filters">list filters configuration</a>.</p></blockquote><p>You can also extend the filter scopes internally to the controller class, simply override the <code>listFilterExtendScopes</code> method.</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    [...]

    public function listFilterExtendScopes($filter)
    {
        $filter-&gt;addScopes([...]);
    }
}
</code></pre><p>The following methods are available on the $filter object.</p><div class="table"><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><strong>addScopes</strong></td><td>adds new scopes to filter widget</td></tr><tr><td><strong>removeScope</strong></td><td>remove scope from filter widget</td></tr></tbody></table></div><h3 id="extending-the-model-query"><a href="#extending-the-model-query" class="header-anchor">#</a> Extending the model query</h3><p>The lookup query for the list <a href="./../database/model.html">database model</a> can be extended by overriding the <code>listExtendQuery</code> method inside the controller class. This example will ensure that soft deleted records are included in the list data, by applying the <strong>withTrashed</strong> scope to the query:</p><pre><code>public function listExtendQuery($query)
{
    $query-&gt;withTrashed();
}
</code></pre><p>When dealing with multiple lists definitions in a same controller, you can use the second parameter of <code>listExtendQuery</code> which contains the name of the definition :</p><pre><code>public $listConfig = [
    &#39;inbox&#39; =&gt; &#39;config_inbox_list.yaml&#39;,
    &#39;trashed&#39; =&gt; &#39;config_trashed_list.yaml&#39;
];

public function listExtendQuery($query, $definition)
{
    if ($definition === &#39;trashed&#39;) {
        $query-&gt;onlyTrashed();
    }
}
</code></pre><p>The <a href="#using-list-filters">list filter</a> model query can also be extended by overriding the <code>listFilterExtendQuery</code> method:</p><pre><code>public function listFilterExtendQuery($query, $scope)
{
    if ($scope-&gt;scopeName == &#39;status&#39;) {
        $query-&gt;where(&#39;status&#39;, &#39;&lt;&gt;&#39;, &#39;all&#39;);
    }
}
</code></pre><h3 id="extending-the-records-collection"><a href="#extending-the-records-collection" class="header-anchor">#</a> Extending the records collection</h3><p>The collection of records used by the list can be extended by overriding the <code>listExtendRecords</code> method inside the controller class. This example uses the <code>sort</code> method on the <a href="./../database/collection.html">record collection</a> to change the sort order of the records.</p><pre><code>public function listExtendRecords($records)
{
    return $records-&gt;sort(function ($a, $b) {
        return $a-&gt;computedVal() &gt; $b-&gt;computedVal();
    });
}
</code></pre><h3 id="custom-column-types"><a href="#custom-column-types" class="header-anchor">#</a> Custom column types</h3><p>Custom list column types can be registered in the back-end with the <code>registerListColumnTypes</code> method of the <a href="./../plugin/registration.html#registration-methods">Plugin registration class</a>. The method should return an array where the key is the type name and the value is a callable function. The callable function receives three arguments, the native <code>$value</code>, the <code>$column</code> definition object and the model <code>$record</code> object.</p><pre><code>public function registerListColumnTypes()
{
    return [
        // A local method, i.e $this-&gt;evalUppercaseListColumn()
        &#39;uppercase&#39; =&gt; [$this, &#39;evalUppercaseListColumn&#39;],

        // Using an inline closure
        &#39;loveit&#39; =&gt; function($value) { return &#39;I love &#39;. $value; }
    ];
}

public function evalUppercaseListColumn($value, $column, $record)
{
    return strtoupper($value);
}
</code></pre><p>Using the custom list column type is as simple as calling it by name using the <code>type</code> option.</p><pre><code># ===================================
#  List Column Definitions
# ===================================

columns:
    secret_code:
        label: Secret code
        type: uppercase
</code></pre>`,90))])}const w=r(p,[["render",h]]);export{v as __pageData,w as default};
