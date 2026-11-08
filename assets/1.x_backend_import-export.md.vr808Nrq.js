import{_ as i,r as e,o as a,c as s,e as o,a as d,s as l}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"Importing & Exporting - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Configuring the behavior","slug":"configuring-the-behavior","link":"#configuring-the-behavior","children":[{"level":3,"title":"Import page","slug":"import-page","link":"#import-page","children":[]},{"level":3,"title":"Export page","slug":"export-page","link":"#export-page","children":[]},{"level":3,"title":"Format options","slug":"format-options","link":"#format-options","children":[]}]},{"level":2,"title":"Import and export views","slug":"import-and-export-views","link":"#import-and-export-views","children":[{"level":3,"title":"Import view","slug":"import-view","link":"#import-view","children":[]},{"level":3,"title":"Export view","slug":"export-view","link":"#export-view","children":[]}]},{"level":2,"title":"Defining an import model","slug":"defining-an-import-model","link":"#defining-an-import-model","children":[]},{"level":2,"title":"Defining an export model","slug":"defining-an-export-model","link":"#defining-an-export-model","children":[]},{"level":2,"title":"Custom options","slug":"custom-options","link":"#custom-options","children":[]},{"level":2,"title":"Integration with list behavior","slug":"integration-with-list-behavior","link":"#integration-with-list-behavior","children":[]}],"relativePath":"1.x/backend/import-export.md","filePath":"1.x/backend/import-export.md"}'),p={name:"1.x/backend/import-export.md"};function c(h,t,m,g,u,f){const r=e("pre-heading"),n=e("post-heading");return a(),s("div",null,[o(r),t[0]||(t[0]=d("h1",null,"Importing & Exporting",-1)),o(n),t[1]||(t[1]=l(`<p><strong>Import Export behavior</strong> is a controller modifier that provides features for importing and exporting data. The behavior provides two pages called Import and Export. The Import page allows a user to upload a CSV file and match the columns to the database. The Export page is the opposite and allows a user to download columns from the database as a CSV file. The behavior provides the controller actions <code>import()</code> and <code>export()</code>.</p><p>The behavior configuration is defined in two parts, each part depends on a special model class along with a list and form field definition file. To use the importing and exporting behavior you should add it to the <code>$implement</code> property of the controller class. Also, the <code>$importExportConfig</code> class property should be defined and its value should refer to the YAML file used for configuring the behavior options.</p><pre><code>namespace Acme\\Shop\\Controllers;

class Products extends Controller
{
    public $implement = [
        &#39;Backend.Behaviors.ImportExportController&#39;,
    ];

    public $importExportConfig = &#39;config_import_export.yaml&#39;;

    // [...]
}
</code></pre><h2 id="configuring-the-behavior"><a href="#configuring-the-behavior" class="header-anchor">#</a> Configuring the behavior</h2><p>The configuration file referred in the <code>$importExportConfig</code> property is defined in YAML format. The file should be placed into the controller&#39;s <a href="./controllers-ajax.html">views directory</a>. Below is an example of a configuration file:</p><pre><code># ===================================
#  Import/Export Behavior Config
# ===================================

import:
    title: Import subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: Export subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
</code></pre><p>The configuration options listed below are optional. Define them if you want the behavior to support the <a href="#import-page">Import</a> or <a href="#export-page">Export</a>, or both.</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>defaultRedirect</strong></td><td>used as a fallback redirection page when no specific redirect page is defined.</td></tr><tr><td><strong>import</strong></td><td>a configuration array or reference to a config file for the Import page.</td></tr><tr><td><strong>export</strong></td><td>a configuration array or reference to a config file for the Export page.</td></tr><tr><td><strong>defaultFormatOptions</strong></td><td>a configuration array or reference to a config file for the default CSV format options.</td></tr></tbody></table></div><h3 id="import-page"><a href="#import-page" class="header-anchor">#</a> Import page</h3><p>To support the Import page add the following configuration to the YAML file:</p><pre><code>import:
    title: Import subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
</code></pre><p>The following configuration options are supported for the Import page:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a page title, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>list</strong></td><td>defines the list columns available for importing.</td></tr><tr><td><strong>form</strong></td><td>provides additional fields used as import options, optional.</td></tr><tr><td><strong>redirect</strong></td><td>redirection page when the import is complete, optional</td></tr><tr><td><strong>permissions</strong></td><td>user permissions needed to perform the operation, optional</td></tr></tbody></table></div><h3 id="export-page"><a href="#export-page" class="header-anchor">#</a> Export page</h3><p>To support the Export page add the following configuration to the YAML file:</p><pre><code>export:
    title: Export subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
</code></pre><p>The following configuration options are supported for the Export page:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>a page title, can refer to a <a href="./../plugin/localization.html">localization string</a>.</td></tr><tr><td><strong>fileName</strong></td><td>the file name to use for the exported file, default <strong>export.csv</strong>.</td></tr><tr><td><strong>list</strong></td><td>defines the list columns available for exporting.</td></tr><tr><td><strong>form</strong></td><td>provides additional fields used as import options, optional.</td></tr><tr><td><strong>redirect</strong></td><td>redirection page when the export is complete, optional.</td></tr><tr><td><strong>useList</strong></td><td>set to true or the value of a list definition to enable <a href="#list-behavior-integration">integration with Lists</a>, default: false.</td></tr></tbody></table></div><h3 id="format-options"><a href="#format-options" class="header-anchor">#</a> Format options</h3><p>To override the default CSV format options add the following configuration to the YAML file:</p><pre><code>defaultFormatOptions:
    delimiter: &#39;;&#39;
    enclosure: &#39;&quot;&#39;
    escape: &#39;\\&#39;
    encoding: &#39;utf-8&#39;
</code></pre><p>The following configuration options (all optional) are supported for the format options:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>delimiter</strong></td><td>Delimiter character.</td></tr><tr><td><strong>enclosure</strong></td><td>Enclosure character.</td></tr><tr><td><strong>escape</strong></td><td>Escape character.</td></tr><tr><td><strong>encoding</strong></td><td>File encoding (only used for the import).</td></tr></tbody></table></div><h2 id="import-and-export-views"><a href="#import-and-export-views" class="header-anchor">#</a> Import and export views</h2><p>For each page feature <a href="#import-page">Import</a> and <a href="#export-page">Export</a> you should provide a <a href="./controllers-ajax.html">view file</a> with the corresponding name - <strong>import.htm</strong> and <strong>export.htm</strong>.</p><p>The import/export behavior adds two methods to the controller class: <code>importRender</code> and <code>exportRender</code>. These methods render the importing and exporting sections as per the YAML configuration file described above.</p><h3 id="import-view"><a href="#import-view" class="header-anchor">#</a> Import view</h3><p>The <strong>import.htm</strong> view represents the Import page that allows users to import data. A typical Import page contains breadcrumbs, the import section itself, and the submission buttons. The <strong>data-request</strong> attribute should refer to the <code>onImport</code> AJAX handler provided by the behavior. Below is a contents of the typical import.htm view file.</p><pre><code>&lt;?= Form::open([&#39;class&#39; =&gt; &#39;layout&#39;]) ?&gt;

    &lt;div class=&quot;layout-row&quot;&gt;
        &lt;?= $this-&gt;importRender() ?&gt;
    &lt;/div&gt;

    &lt;div class=&quot;form-buttons&quot;&gt;
        &lt;button
            type=&quot;submit&quot;
            data-control=&quot;popup&quot;
            data-handler=&quot;onImportLoadForm&quot;
            data-keyboard=&quot;false&quot;
            class=&quot;btn btn-primary&quot;&gt;
            Import records
        &lt;/button&gt;
    &lt;/div&gt;

&lt;?= Form::close() ?&gt;
</code></pre><h3 id="export-view"><a href="#export-view" class="header-anchor">#</a> Export view</h3><p>The <strong>export.htm</strong> view represents the Export page that allows users to export a file from the database. A typical Export page contains breadcrumbs, the export section itself, and the submission buttons. The <strong>data-request</strong> attribute should refer to the <code>onExport</code> AJAX handler provided by the behavior. Below is a contents of the typical export.htm form.</p><pre><code>&lt;?= Form::open([&#39;class&#39; =&gt; &#39;layout&#39;]) ?&gt;

    &lt;div class=&quot;layout-row&quot;&gt;
        &lt;?= $this-&gt;exportRender() ?&gt;
    &lt;/div&gt;

    &lt;div class=&quot;form-buttons&quot;&gt;
        &lt;button
            type=&quot;submit&quot;
            data-control=&quot;popup&quot;
            data-handler=&quot;onExportLoadForm&quot;
            data-keyboard=&quot;false&quot;
            class=&quot;btn btn-primary&quot;&gt;
            Export records
        &lt;/button&gt;
    &lt;/div&gt;

&lt;?= Form::close() ?&gt;
</code></pre><h2 id="defining-an-import-model"><a href="#defining-an-import-model" class="header-anchor">#</a> Defining an import model</h2><p>For importing data you should create a dedicated model for this process which extends the <code>Backend\\Models\\ImportModel</code> class. Here is an example class definition:</p><pre><code>class SubscriberImport extends \\Backend\\Models\\ImportModel
{
    /**
     * @var array The rules to be applied to the data.
     */
    public $rules = [];

    public function importData($results, $sessionKey = null)
    {
        foreach ($results as $row =&gt; $data) {

            try {
                $subscriber = new Subscriber;
                $subscriber-&gt;fill($data);
                $subscriber-&gt;save();

                $this-&gt;logCreated();
            }
            catch (\\Exception $ex) {
                $this-&gt;logError($row, $ex-&gt;getMessage());
            }

        }
    }
}
</code></pre><p>The class must define a method called <code>importData</code> used for processing the imported data. The first parameter <code>$results</code> will contain an array containing the data to import. The second parameter <code>$sessionKey</code> will contain the session key used for the request.</p><div class="table"><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>logUpdated()</code></td><td>Called when a record is updated.</td></tr><tr><td><code>logCreated()</code></td><td>Called when a record is created.</td></tr><tr><td><code>logError(rowIndex, message)</code></td><td>Called when there is a problem with importing the record.</td></tr><tr><td><code>logWarning(rowIndex, message)</code></td><td>Used to provide a soft warning, like modifying a value.</td></tr><tr><td><code>logSkipped(rowIndex, message)</code></td><td>Used when the entire row of data was not imported (skipped).</td></tr></tbody></table></div><h2 id="defining-an-export-model"><a href="#defining-an-export-model" class="header-anchor">#</a> Defining an export model</h2><p>For exporting data you should create a dedicated model which extends the <code>Backend\\Models\\ExportModel</code> class. Here is an example:</p><pre><code>class SubscriberExport extends \\Backend\\Models\\ExportModel
{
    public function exportData($columns, $sessionKey = null)
    {
        $subscribers = Subscriber::all();
        $subscribers-&gt;each(function($subscriber) use ($columns) {
            $subscriber-&gt;addVisible($columns);
        });
        return $subscribers-&gt;toArray();
    }
}
</code></pre><p>The class must define a method called <code>exportData</code> used for returning the export data. The first parameter <code>$columns</code> is an array of column names to export. The second parameter <code>$sessionKey</code> will contain the session key used for the request.</p><h2 id="custom-options"><a href="#custom-options" class="header-anchor">#</a> Custom options</h2><p>Both import and export forms support custom options that can be introduced using form fields, defined in the <strong>form</strong> option in the import or export configuration respectively. These values are then passed to the Import / Export model and are available during processing.</p><pre><code>import:
    [...]
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    [...]
    form: $/acme/campaign/models/subscriberexport/fields.yaml
</code></pre><p>The form fields specified will appear on the import/export page. Here is an example <code>fields.yaml</code> file contents:</p><pre><code># ===================================
#  Form Field Definitions
# ===================================

fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
</code></pre><p>The value of the form field above called <strong>auto_create_lists</strong> can be accessed using <code>$this-&gt;auto_create_lists</code> inside the <code>importData</code> method of the import model. If this were the export model, the value would be available inside the <code>exportData</code> method instead.</p><pre><code>class SubscriberImport extends \\Backend\\Models\\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this-&gt;auto_create_lists) {
            // Do something
        }

        [...]
    }
}
</code></pre><h2 id="integration-with-list-behavior"><a href="#integration-with-list-behavior" class="header-anchor">#</a> Integration with list behavior</h2><p>There is an alternative approach to exporting data that uses the <a href="./lists.html">list behavior</a> to provide the export data. In order to use this feature you should have the <code>Backend.Behaviors.ListController</code> definition to the <code>$implement</code> field of the controller class. You do not need to use an export view and all the settings will be pulled from the list. Here is the only configuration needed:</p><pre><code>export:
    useList: true
</code></pre><p>If you are using <a href="./lists.html#multiple-list-definitions">multiple list definitions</a>, then you can supply the list definition:</p><pre><code>export:
    useList: orders
    fileName: orders.csv
</code></pre><p>The <code>useList</code> option also supports extended configuration options.</p><pre><code>export:
    useList:
        definition: orders
        raw: true
</code></pre><p>The following configuration options are supported:</p><div class="table"><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><strong>definition</strong></td><td>the list definition to source records from, optional.</td></tr><tr><td><strong>raw</strong></td><td>output the raw attribute values from the record, default: false.</td></tr></tbody></table></div>`,57))])}const v=i(p,[["render",c]]);export{x as __pageData,v as default};
