import{_ as s,r as e,o as a,c as d,e as o,a as l,s as c}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Импорт и экспорт - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Настройка поведения","slug":"настроика-поведения","link":"#настроика-поведения","children":[{"level":3,"title":"Страница Импорта","slug":"страница-импорта","link":"#страница-импорта","children":[]},{"level":3,"title":"Страница Экспорта","slug":"страница-экспорта","link":"#страница-экспорта","children":[]}]},{"level":2,"title":"Представления","slug":"представления","link":"#представления","children":[{"level":3,"title":"Импорт","slug":"импорт","link":"#импорт","children":[]},{"level":3,"title":"Экспорт","slug":"экспорт","link":"#экспорт","children":[]}]},{"level":2,"title":"Модель Импорта","slug":"модель-импорта","link":"#модель-импорта","children":[]},{"level":2,"title":"Модель Экспорта","slug":"модель-экспорта","link":"#модель-экспорта","children":[]},{"level":2,"title":"Пользовательские поля","slug":"пользовательские-поля","link":"#пользовательские-поля","children":[]},{"level":2,"title":"Интеграция со списком","slug":"интеграция-со-списком","link":"#интеграция-со-списком","children":[]}],"relativePath":"1.x/ru/backend/import-export.md","filePath":"1.x/ru/backend/import-export.md"}'),i={name:"1.x/ru/backend/import-export.md"};function p(m,t,u,h,g,b){const r=e("pre-heading"),n=e("post-heading");return a(),d("div",null,[o(r),t[0]||(t[0]=l("h1",null,"Импорт и экспорт",-1)),o(n),t[1]||(t[1]=c(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p><strong>Поведение Импорт-Экспорт</strong> - модификатор контроллера, который позволяет настроить импорт и экспорт данных при помощи двух страниц: &quot;Импорт&quot; и &quot;Экспорт&quot;. Страница &quot;Импорт&quot; позволяет пользователю загрузить CSV файл и внести новые значения в таблицу в базе данных. Страница &quot;Экспорт&quot; позволяет скачать данные из таблицы в CSV файл. При этом используются два действия контроллера - <code>import()</code> и <code>export()</code> соответственно.</p><p>Чтобы использовать импорт и экспорт, Вам необходимо добавить свойства <code>$implement</code> и <code>$importExportConfig</code> в контроллер:</p><pre><code>namespace Acme\\Shop\\Controllers;

class Products extends Controller
{
    public $implement = [
        &#39;Backend.Behaviors.ImportExportController&#39;,
    ];

    public $importExportConfig = &#39;config_import_export.yaml&#39;;

    // [...]
}
</code></pre><p><a name="configuring-import-export" class="anchor"></a></p><h2 id="настроика-поведения"><a href="#настроика-поведения" class="header-anchor">#</a> Настройка поведения</h2><p>Файл <strong>config_import_export.yaml</strong> должен лежать в <a href="./../backend/controllers-views-ajax/.html#introduction">папке с представлениями</a> контроллера. Пример содержимого:</p><pre><code># ===================================
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
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>defaultRedirect</strong></td><td>страница, на которую будет перенаправлен пользователь по умолчанию.</td></tr><tr><td><strong>import</strong></td><td>массив с настройками или ссылка на файл с настройками страницы Импорта.</td></tr><tr><td><strong>export</strong></td><td>массив с настройками или ссылка на файл с настройками страницы Экспорта.</td></tr></tbody></table></div><p><a name="import-page" class="anchor"></a></p><h3 id="страница-импорта"><a href="#страница-импорта" class="header-anchor">#</a> Страница Импорта</h3><p>Добавьте следующие настройки в YAML файл для создания страницы Импорта:</p><pre><code>import:
    title: Import subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
</code></pre><p>Параметры конфигурации:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметры</th><th>Описание</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>название страницы, можно использовать <a href="./../plugin/localization.html">локализацию</a>.</td></tr><tr><td><strong>list</strong></td><td>определяет столбцы списка доступных для импорта.</td></tr><tr><td><strong>form</strong></td><td>дополнительные поля, опционально.</td></tr><tr><td><strong>redirect</strong></td><td>страница, на которую будет перенаправлен пользователь после окончания импорта, опционально.</td></tr><tr><td><strong>permissions</strong></td><td>права, которые должен иметь пользователь для выполнения операции, опционально.</td></tr></tbody></table></div><p><a name="export-page" class="anchor"></a></p><h3 id="страница-экспорта"><a href="#страница-экспорта" class="header-anchor">#</a> Страница Экспорта</h3><p>Добавьте следующие настройки в YAML файл для создания страницы Экспорта:</p><pre><code>export:
    title: Export subscribers
    modelClass: Acme\\Campaign\\Models\\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
</code></pre><p>Параметры конфигурации:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметры</th><th>Описание</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>название страницы, можно использовать <a href="./../plugin/localization.html">локализацию</a>.</td></tr><tr><td><strong>fileName</strong></td><td>название файла, по умолчанию <strong>export.csv</strong>.</td></tr><tr><td><strong>list</strong></td><td>определяет столбцы списка доступных для экспорта.</td></tr><tr><td><strong>form</strong></td><td>дополнительные поля, опционально.</td></tr><tr><td><strong>redirect</strong></td><td>страница, на которую будет перенаправлен пользователь после окончания экспорта, опционально.</td></tr><tr><td><strong>useList</strong></td><td><a href="#list-behavior-integration">интеграция со списком</a>, <strong>true</strong> или <strong>false</strong>, по умолчанию <strong>false</strong>, опционально.</td></tr></tbody></table></div><p><a name="import-export-views" class="anchor"></a></p><h2 id="представления"><a href="#представления" class="header-anchor">#</a> Представления</h2><p>Для каждой страницы Импорта и Экспорта должен существовать свой файл <a href="./../backend/controllers-views-ajax/.html#introduction">представления</a> <strong>import.htm</strong> и <strong>export.htm</strong> соответственно.</p><p>Поведение предоставляет доступ к двум методам в классе контроллера: <code>importRender()</code> и <code>exportRender()</code>, которые нужны для отображения элементов формы импорта и экспорта.</p><p><a name="import-view" class="anchor"></a></p><h3 id="импорт"><a href="#импорт" class="header-anchor">#</a> Импорт</h3><p>Представление <strong>import.htm</strong> отображает форму для импорта данных. Обычно страница содержит хлебные крошки, элемент формы импорта и кнопку. Атрибут <strong>data-request</strong> должен указывать на AJAX обработчик <code>onImport</code>. Ниже представлен пример содержимого файла import.htm:</p><pre><code>&lt;?= Form::open([&#39;class&#39; =&gt; &#39;layout&#39;]) ?&gt;

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
</code></pre><p><a name="export-view" class="anchor"></a></p><h3 id="экспорт"><a href="#экспорт" class="header-anchor">#</a> Экспорт</h3><p>Представление <strong>export.htm</strong> отображает форму для экспорта данных. Обычно страница содержит хлебные крошки, элемент формы экспорта и кнопку. Атрибут <strong>data-request</strong> должен указывать на AJAX обработчик <code>onExport</code>. Ниже представлен пример содержимого файла export.htm:</p><pre><code>&lt;?= Form::open([&#39;class&#39; =&gt; &#39;layout&#39;]) ?&gt;

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
</code></pre><p><a name="import-model" class="anchor"></a></p><h2 id="модель-импорта"><a href="#модель-импорта" class="header-anchor">#</a> Модель Импорта</h2><p>Для импорта данных необходимо создать специальную модель, которая расширяет класс <code>Backend\\Models\\ImportModel</code>. Пример:</p><pre><code>class SubscriberImport extends \\Backend\\Models\\ImportModel
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
</code></pre><p>Класс должен содержать метод <code>importData()</code>, который используется для импорта данных. Параметр <code>$results</code> будет содержать массив с данными. Параметр <code>$sessionKey</code> содержит ключ сессии, который используется для запроса.</p><div class="table"><table tabindex="0"><thead><tr><th>Метод</th><th>Описание</th></tr></thead><tbody><tr><td><code>logUpdated()</code></td><td>Вызывается, когда запись обновлена.</td></tr><tr><td><code>logCreated()</code></td><td>Вызывается при создании записи.</td></tr><tr><td><code>logError(rowIndex, message)</code></td><td>Вызывается, когда существует проблема, связанная с импортом записи.</td></tr><tr><td><code>logWarning(rowIndex, message)</code></td><td>Используется для обеспечения &quot;мягкого предупреждение&quot;, например, изменение значения.</td></tr><tr><td><code>logSkipped(rowIndex, message)</code></td><td>Используется, когда вся строка данных не была импортирована.</td></tr></tbody></table></div><p><a name="export-model" class="anchor"></a></p><h2 id="модель-экспорта"><a href="#модель-экспорта" class="header-anchor">#</a> Модель Экспорта</h2><p>Для экспорта данных необходимо создать специальную модель, которая расширяет класс <code>Backend\\Models\\ExportModel</code>. Пример:</p><pre><code>class SubscriberExport extends \\Backend\\Models\\ExportModel
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
</code></pre><p>Класс должен содержать метод <code>exportData()</code>, который используется для экспорта данных. Параметр <code>$columns</code> содержит название столбцов для экспорта. Параметр <code>$sessionKey</code> содержит ключ сессии, который используется для запроса.</p><p><a name="custom-options" class="anchor"></a></p><h2 id="пользовательские-поля"><a href="#пользовательские-поля" class="header-anchor">#</a> Пользовательские поля</h2><p>Формы импорта и экспорта также поддерживают произвольные поля, которые могут быть добавлены при помощи параметра <strong>form</strong> в файле с настройками импорта и экспорта. Значения этих полей передаются в модель импорта / экспорта и доступны во время обработки.</p><pre><code>import:
    [...]
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    [...]
    form: $/acme/campaign/models/subscriberexport/fields.yaml
</code></pre><p>Пример содержимого файла <code>fields.yaml</code>:</p><pre><code># ===================================
#  Form Field Definitions
# ===================================

fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
</code></pre><p>Значение поля <strong>auto_create_lists</strong> может быть получено при помощи <code>$this-&gt;auto_create_lists</code> внутри метода <code>importData()</code> или <code>exportData()</code>:</p><pre><code>class SubscriberImport extends \\Backend\\Models\\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this-&gt;auto_create_lists) {
            // Do something
        }

        [...]
    }
}
</code></pre><p><a name="list-behavior-integration" class="anchor"></a></p><h2 id="интеграция-со-списком"><a href="#интеграция-со-списком" class="header-anchor">#</a> Интеграция со списком</h2><p>Вы можете использовать <a href="./../backend/lists.html">списки</a> для экспорта данных. Для этого необходимо добавить <code>Backend.Behaviors.ListController</code> в свойство <code>$implement</code> класса контроллера. Пример:</p><pre><code>export:
    useList: true
</code></pre><p>Если вы используете <a href="./../backend/lists.html#multiple-list-definitions">несколько списков</a>:</p><pre><code>export:
    useList: orders
    fileName: orders.csv
</code></pre>`,59))])}const $=s(i,[["render",p]]);export{f as __pageData,$ as default};
