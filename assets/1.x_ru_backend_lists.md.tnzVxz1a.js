import{_ as d,r as n,o as s,c,e as a,a as t,s as l}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Списки - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Настройка списка","slug":"настроика-списка","link":"#настроика-списка","children":[{"level":3,"title":"Тулбар","slug":"тулбар","link":"#тулбар","children":[]},{"level":3,"title":"Фильтрация","slug":"фильтрация","link":"#фильтрация","children":[]}]},{"level":2,"title":"Столбцы списка","slug":"столбцы-списка","link":"#столбцы-списка","children":[{"level":3,"title":"Свойства столбцов","slug":"своиства-столбцов","link":"#своиства-столбцов","children":[]}]},{"level":2,"title":"Типы столбцов","slug":"типы-столбцов","link":"#типы-столбцов","children":[{"level":3,"title":"Text","slug":"text","link":"#text","children":[]},{"level":3,"title":"Number","slug":"number","link":"#number","children":[]},{"level":3,"title":"Switch","slug":"switch","link":"#switch","children":[]},{"level":3,"title":"Date & Time","slug":"date-time","link":"#date-time","children":[]},{"level":3,"title":"Date","slug":"date","link":"#date","children":[]},{"level":3,"title":"Time","slug":"time","link":"#time","children":[]},{"level":3,"title":"Time since","slug":"time-since","link":"#time-since","children":[]},{"level":3,"title":"Time tense","slug":"time-tense","link":"#time-tense","children":[]},{"level":3,"title":"Select","slug":"select","link":"#select","children":[]},{"level":3,"title":"Relation","slug":"relation","link":"#relation","children":[]},{"level":3,"title":"Partial","slug":"partial","link":"#partial","children":[]}]},{"level":2,"title":"Отображение списка","slug":"отображение-списка","link":"#отображение-списка","children":[]},{"level":2,"title":"Использование нескольких списков","slug":"использование-нескольких-списков","link":"#использование-нескольких-списков","children":[]},{"level":2,"title":"Использование фильтра","slug":"использование-фильтра","link":"#использование-фильтра","children":[{"level":3,"title":"Параметры фильтра","slug":"параметры-фильтра","link":"#параметры-фильтра","children":[]},{"level":3,"title":"Доступные типы фильтра","slug":"доступные-типы-фильтра","link":"#доступные-типы-фильтра","children":[]}]},{"level":2,"title":"Изменение списка","slug":"изменение-списка","link":"#изменение-списка","children":[{"level":3,"title":"Переопределение контроллера","slug":"переопределение-контроллера","link":"#переопределение-контроллера","children":[]},{"level":3,"title":"Изменение столбцов списка","slug":"изменение-столбцов-списка","link":"#изменение-столбцов-списка","children":[]},{"level":3,"title":"Изменение запроса к модели","slug":"изменение-запроса-к-модели","link":"#изменение-запроса-к-модели","children":[]}]}],"relativePath":"1.x/ru/backend/lists.md","filePath":"1.x/ru/backend/lists.md"}'),i={name:"1.x/ru/backend/lists.md"};function h(p,e,g,m,u,b){const r=n("pre-heading"),o=n("post-heading");return s(),c("div",null,[a(r),e[0]||(e[0]=t("h1",null,"Списки",-1)),a(o),e[1]||(e[1]=l(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p><code>Список</code> - это контроллер, используемый для отображения списка записей на странице с возможностью добавления новых, сортировки и поиска. По умолчанию действие контроллера <code>index()</code> отображает список, но его можно отобразить где угодно. Вы также можете отобразить несколько списков на странице.</p><p>Список зависит от <a href="#form-fields">столбцов</a> и класса <a href="./../database/model.html">модели</a>. Для того, чтобы использовать список, Вы должны указать его в свойстве <code>$implement</code> класса контроллера. Также должно быть определено свойство <code>$listConfig</code>, значение которого - YAML файл, используемый для настройки списка.</p><pre><code>namespace Acme\\Blog\\Controllers;

class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.ListController&#39;];

    public $listConfig = &#39;list_config.yaml&#39;;
}
</code></pre><blockquote><p><strong>Примечание:</strong> Очень часто список используются вместе с <a href="./../backend/forms.html">формами</a> в одном контроллере.</p></blockquote><p><a name="configuring-list" class="anchor"></a></p><h2 id="настроика-списка"><a href="#настроика-списка" class="header-anchor">#</a> Настройка списка</h2><p>Конфигурационный файл, на который ссылается переменная <code>$listConfig</code>, должен иметь YAML формат и находиться в папке с представлением контроллера. Ниже представлен типичный файл с настройками:</p><pre><code># ===================================
#  List Behavior Config
# ===================================

title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\\Blog\\Models\\Post
recordUrl: acme/blog/posts/update/:id
</code></pre><p>Следующие параметры являются обязательными:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>заголовок списка.</td></tr><tr><td><strong>list</strong></td><td>ссылка на файл, определяющий отображаемые <a href="#list-columns">столбцы</a> в таблице.</td></tr><tr><td><strong>modelClass</strong></td><td>имя класса модели, из которой будут загружаться данные.</td></tr></tbody></table></div><p>Параметры конфигурации, перечисленные ниже, не являются обязательными.</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>filter</strong></td><td><a href="#adding-filters">настройка фильтра</a>.</td></tr><tr><td><strong>recordUrl</strong></td><td>добавить ссылку к каждой записи. Например: <strong>users/update:id</strong>. Где <code>:id</code> - уникальный идентификатор записи в таблице. Это позволяет связать списки и <a href="./../backend/forms.html">формы</a>.</td></tr><tr><td><strong>recordOnClick</strong></td><td>произвольный JavaScript код, который выполняется при клике на запись.</td></tr><tr><td><strong>noRecordsMessage</strong></td><td>текст, который будет отображаться при отсутствии записей. Можно использовать <a href="./../plugin/localization.html">переведенную строку</a>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>количество записей на странице. По умолчанию: 0 (отображаются все)</td></tr><tr><td><strong>toolbar</strong></td><td>ссылка на файл с настройками тулбара или массив с настройками (см. ниже).</td></tr><tr><td><strong>showSorting</strong></td><td>отображать сортировку на каждом столбце. По умолчанию: true.</td></tr><tr><td><strong>defaultSort</strong></td><td>сортировка по умолчанию. Поддерживается строка или массив с ключами: <code>column</code> и <code>direction</code>.</td></tr><tr><td><strong>showCheckboxes</strong></td><td>отображает чекбоксы к каждой записи. По умолчанию: false.</td></tr><tr><td><strong>showSetup</strong></td><td>отображает кнопку с настройками списка. По умолчанию: false.</td></tr><tr><td><strong>showTree</strong></td><td>отображает записи в виде дерева. По умолчанию: false.</td></tr><tr><td><strong>treeExpanded</strong></td><td>отображает сразу развернутое дерево. По умолчанию: false.</td></tr></tbody></table></div><p><a name="adding-toolbar" class="anchor"></a></p><h3 id="тулбар"><a href="#тулбар" class="header-anchor">#</a> Тулбар</h3><p>Чтобы добавить тулбар к списку, нужно добавить следующие настройки в конфигурационный YAML файл списка:</p><pre><code>toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
</code></pre><p>Параметры тулбара:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>buttons</strong></td><td>ссылка на фрагмент контроллера с кнопками. Пример: <strong>_list_toolbar.htm</strong></td></tr><tr><td><strong>search</strong></td><td>ссылка на конфигурационный файл виджета с поиском или массив с настройками.</td></tr></tbody></table></div><p>Настройки виджета с поиском:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>prompt</strong></td><td>placeholder (можно использовать <a href="./../plugin/localization.html">переведенную строку</a>).</td></tr><tr><td><strong>mode</strong></td><td>определяет формат поиска. Можно использовать: all (все), any (любое из), exact (точное совпадение). По умолчанию: all.</td></tr><tr><td><strong>scope</strong></td><td>определяет <a href="./../database/model.html#query-scopes">метод для изменения запроса</a>.</td></tr></tbody></table></div><p>Тулбар может содержать в себе различные кнопки, <a href="./../backend/controls.html#scoreboards">индикаторы</a> или графики. Пример фрагмента с кнопкой, при нажатии на которую появляется форма создания новой записи:</p><pre><code>&lt;div data-control=&quot;toolbar&quot;&gt;
    &lt;a
        href=&quot;&lt;?= Backend::url(&#39;acme/blog/posts/create&#39;) ?&gt;&quot;
        class=&quot;btn btn-primary oc-icon-plus&quot;&gt;New Post&lt;/a&gt;
&lt;/div&gt;
</code></pre><p><a name="adding-filters" class="anchor"></a></p><h3 id="фильтрация"><a href="#фильтрация" class="header-anchor">#</a> Фильтрация</h3><p>Добавьте следующие настройки в конфигурационный YAML файл списка для отображения фильтра:</p><pre><code>filter: config_filter.yaml
</code></pre><p>Параметр <strong>filter</strong> должен указывать на <a href="#list-filters">файл</a> или массив с настройками.</p><p><a name="list-columns" class="anchor"></a></p><h2 id="столбцы-списка"><a href="#столбцы-списка" class="header-anchor">#</a> Столбцы списка</h2><p>Отображаемые столбцы списка задаются в YAML файле, который находится в подпапке папки <strong>models</strong>. Имя подпапки должно совпадать с именем класса модели и пишется строчными буквами. Название же самого файла может быть любым, но лучше использовать <strong>columns.yaml</strong> и <strong>list_columns.yaml</strong>. Пример:</p><pre><code>plugins/
  acme/
    blog/
      models/                  &lt;=== папка модели
        post/                  &lt;=== папка с настройками модели
          list_columns.yaml    &lt;=== файл с настройками списка
        Post.php               &lt;=== класс модели
</code></pre><p>Следующий пример показывает типичное содержимое файла <code>list_columns.yaml</code>.</p><pre><code># ===================================
#  List Column Definitions
# ===================================

columns:
    name: Name
    email: Email
</code></pre><p><a name="column-options" class="anchor"></a></p><h3 id="своиства-столбцов"><a href="#своиства-столбцов" class="header-anchor">#</a> Свойства столбцов</h3><p>Для каждого столбца можно задать следующие свойства (если применимо):</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>название столбца.</td></tr><tr><td><strong>type</strong></td><td>формат отображения (см. <a href="#column-types">Типы столбцов</a>).</td></tr><tr><td><strong>default</strong></td><td>значение по умолчанию.</td></tr><tr><td><strong>searchable</strong></td><td>включить это поле в результаты поиска. По умолчанию: false.</td></tr><tr><td><strong>invisible</strong></td><td>определяет, будет ли этот столбец скрыт по умолчанию. По умолчанию: false.</td></tr><tr><td><strong>sortable</strong></td><td>добавляет возможность сортировки. По умолчанию: true.</td></tr><tr><td><strong>clickable</strong></td><td>если <code>false</code>, то отключает клик по столбцу. По умолчанию: true.</td></tr><tr><td><strong>select</strong></td><td>определяет произвольный SQL select запрос.</td></tr><tr><td><strong>valueFrom</strong></td><td>определяет атрибут модели.</td></tr><tr><td><strong>relation</strong></td><td>определяет столбец отношений.</td></tr><tr><td><strong>cssClass</strong></td><td>добавляет CSS класс к контейнеру столбца.</td></tr><tr><td><strong>width</strong></td><td>определяет ширину столбца в пикселях или процентах.</td></tr></tbody></table></div><p><a name="column-types" class="anchor"></a></p><h2 id="типы-столбцов"><a href="#типы-столбцов" class="header-anchor">#</a> Типы столбцов</h2>`,41)),e[2]||(e[2]=t("div",{class:"content-list collection-method-list",markdown:"1"},[t("ul",null,[t("li",null,[t("a",{href:"#column-text"},"Text")]),t("li",null,[t("a",{href:"#column-number"},"Number")]),t("li",null,[t("a",{href:"#column-switch"},"Switch")]),t("li",null,[t("a",{href:"#column-datetime"},"Date & Time")]),t("li",null,[t("a",{href:"#column-date"},"Date")]),t("li",null,[t("a",{href:"#column-time"},"Time")]),t("li",null,[t("a",{href:"#column-timesince"},"Time since")]),t("li",null,[t("a",{href:"#column-timetense"},"Time tense")]),t("li",null,[t("a",{href:"#column-select"},"Select")]),t("li",null,[t("a",{href:"#column-relation"},"Relation")]),t("li",null,[t("a",{href:"#column-partial"},"Partial")])])],-1)),e[3]||(e[3]=l(`<p><a name="column-text" class="anchor"></a></p><h3 id="text"><a href="#text" class="header-anchor">#</a> Text</h3><p><code>text</code> - отображает столбец с текстом. Выравнивание по левому краю.</p><pre><code>full_name:
    label: Full Name
    type: text
</code></pre><p><a name="column-number" class="anchor"></a></p><h3 id="number"><a href="#number" class="header-anchor">#</a> Number</h3><p><code>number</code> - отображает столбец с числами. Выравнивание по правому краю.</p><pre><code>age:
    label: Age
    type: number
</code></pre><p><a name="column-switch" class="anchor"></a></p><h3 id="switch"><a href="#switch" class="header-anchor">#</a> Switch</h3><p><code>switch</code> - отображает столбец со значениями true или false.</p><pre><code>enabled:
    label: Enabled
    type: switch
</code></pre><p><a name="column-datetime" class="anchor"></a></p><h3 id="date-time"><a href="#date-time" class="header-anchor">#</a> Date &amp; Time</h3><p><code>datetime</code> - отображает столбец с временем и датой. Пример: <strong>Thu, Dec 25, 1975 2:15 PM</strong>.</p><pre><code>created_at:
    label: Date
    type: datetime
</code></pre><p>Вы также можете указать произвольный формат даты. Например: <strong>Thursday 25th of December 1975 02:15:16 PM</strong>:</p><pre><code>created_at:
    label: Date
    type: datetime
    format: l jS \\of F Y h:i:s A
</code></pre><p><a name="column-date" class="anchor"></a></p><h3 id="date"><a href="#date" class="header-anchor">#</a> Date</h3><p><code>date</code> - отображает столбец с датой <strong>M j Y</strong></p><pre><code>created_at:
    label: Date
    type: date
</code></pre><p><a name="column-time" class="anchor"></a></p><h3 id="time"><a href="#time" class="header-anchor">#</a> Time</h3><p><code>time</code> - отображает столбец со временем <strong>g:i a</strong></p><pre><code>created_at:
    label: Date
    type: time
</code></pre><p><a name="column-timesince" class="anchor"></a></p><h3 id="time-since"><a href="#time-since" class="header-anchor">#</a> Time since</h3><p><code>timesince</code> - отображает столбец с разницей во времени. Пример: <strong>10 minutes ago</strong></p><pre><code>created_at:
    label: Date
    type: timesince
</code></pre><p><a name="column-timetense" class="anchor"></a></p><h3 id="time-tense"><a href="#time-tense" class="header-anchor">#</a> Time tense</h3><p><code>timetense</code> - отображает столбец со временем. Пример: <strong>Today at 12:49</strong>, <strong>Yesterday at 4:00</strong> or <strong>18 Sep 2015 at 14:33</strong>.</p><pre><code>created_at:
    label: Date
    type: timetense
</code></pre><p><a name="column-select" class="anchor"></a></p><h3 id="select"><a href="#select" class="header-anchor">#</a> Select</h3><p><code>select</code> - позволяет создать колонку, используя произвольный SQL select запрос.</p><pre><code>full_name:
    label: Full Name
    select: concat(first_name, &#39; &#39;, last_name)
</code></pre><p><a name="column-relation" class="anchor"></a></p><h3 id="relation"><a href="#relation" class="header-anchor">#</a> Relation</h3><p><code>relation</code> - позволяет отображать связанные столбцы. Значением этого параметра должно быть Имя Активной Записи <a href="./../database/model.html#relationships">отношения</a> Вашей модели. Пример:</p><pre><code>group:
    label: Group
    relation: groups
    select: name
</code></pre><p>Если <a href="./../database/relations.html">отношение</a> использует аргумент <strong>count</strong>, то Вы можете отобразить число, используя параметры: <code>valueFrom</code> и <code>default</code>.</p><pre><code>users_count:
    label: Users
    relation: users_count
    valueFrom: count
    default: 0
</code></pre><p><a name="column-partial" class="anchor"></a></p><h3 id="partial"><a href="#partial" class="header-anchor">#</a> Partial</h3><p><code>partial</code> - отображает фрагмент. Параметр <code>path</code> указывает на <strong>.htm</strong> файл с содержимым ячейки. Внутри фрагмента доступные следующие переменные: <code>$value</code> - значение ячейки по умолчанию, <code>$record</code> - модель и <code>$column</code> - экземпляр класса <code>Backend\\Classes\\ListColumn</code>.</p><pre><code>content:
    type: partial
    path: ~/plugins/acme/blog/models/comments/_content_column.htm
</code></pre><p><a name="displaying-list" class="anchor"></a></p><h2 id="отображение-списка"><a href="#отображение-списка" class="header-anchor">#</a> Отображение списка</h2><p>Обычно списки отображаются в <a href="./../backend/controllers-views-ajax/.html#introduction">представлении</a> в методе <code>index</code> при помощи метода <code>listRender()</code>. Пример:</p><pre><code>&lt;?= $this-&gt;listRender() ?&gt;
</code></pre><p><a name="multiple-list-definitions" class="anchor"></a></p><h2 id="использование-нескольких-списков"><a href="#использование-нескольких-списков" class="header-anchor">#</a> Использование нескольких списков</h2><p>Вы можете использовать несколько списков в одном контроллере, если укажите в свойстве <code>$listConfig</code> массив, в котором ключ - название списка, а значение - ссылка на файл с настройками.</p><pre><code>public $listConfig = [
    &#39;templates&#39; =&gt; &#39;config_templates_list.yaml&#39;,
    &#39;layouts&#39; =&gt; &#39;config_layouts_list.yaml&#39;
];
</code></pre><p>Передайте ключ в метод <code>listRender()</code> для отображения нужного списка:</p><pre><code>&lt;?= $this-&gt;listRender(&#39;templates&#39;) ?&gt;
</code></pre><p><a name="list-filters" class="anchor"></a></p><h2 id="использование-фильтра"><a href="#использование-фильтра" class="header-anchor">#</a> Использование фильтра</h2><p>Вы можете <a href="#adding-filters">отфильтровать</a> элементы в списке по нужному полю. Пример:</p><pre><code># ===================================
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
        conditions: is_published &lt;&gt; true

    approved:
        label: Approved
        type: switch
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
</code></pre><p><a name="filter-scope-options" class="anchor"></a></p><h3 id="параметры-фильтра"><a href="#параметры-фильтра" class="header-anchor">#</a> Параметры фильтра</h3><p>Вы можете указать следующие параметры для каждого фильтра:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>название фильтра.</td></tr><tr><td><strong>type</strong></td><td><a href="#scope-types">тип фильтра</a>. По умолчанию: group.</td></tr><tr><td><strong>conditions</strong></td><td>дополнительное условие.</td></tr><tr><td><strong>scope</strong></td><td><a href="./../database/model.html#query-scopes">метод запроса</a>.</td></tr><tr><td><strong>options</strong></td><td>список значений или название метода в модели <code>modelClass</code>.</td></tr><tr><td><strong>nameFrom</strong></td><td>имя поля, которое нужно использовать в качестве названий.</td></tr></tbody></table></div><p><a name="scope-types" class="anchor"></a></p><h3 id="доступные-типы-фильтра"><a href="#доступные-типы-фильтра" class="header-anchor">#</a> Доступные типы фильтра</h3><p>Вы можете использовать следующие типы фильтров:</p><div class="table"><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>group</strong></td><td>отображает группу элементов.</td></tr><tr><td><strong>checkbox</strong></td><td>отображает чекбокс.</td></tr><tr><td><strong>switch</strong></td><td>отображает переключатель между двумя предварительно установленными условиями.</td></tr><tr><td><strong>date</strong></td><td>отображает выбор даты.</td></tr><tr><td><strong>daterange</strong></td><td>отображает выбор промежутка между двумя датами. Параметры <code>:before</code> и <code>:after</code> передаются в <strong>conditions</strong>.</td></tr></tbody></table></div><p><a name="extend-list-behavior" class="anchor"></a></p><h2 id="изменение-списка"><a href="#изменение-списка" class="header-anchor">#</a> Изменение списка</h2><p>Вы можете изменить список следующими способами:</p><ul><li><a href="#overriding-action">Переопределить контроллер</a></li><li><a href="#extend-list-columns">Изменить столбцы списка</a></li><li><a href="#extend-model-query">Изменить запрос к модели</a></li></ul><p><a name="overriding-action" class="anchor"></a></p><h3 id="переопределение-контроллера"><a href="#переопределение-контроллера" class="header-anchor">#</a> Переопределение контроллера</h3><p>Вы можете использовать свою собственную логику в контроллере в методе <code>index()</code>, а затем, при необходимости, отобразить список.</p><pre><code>public function index()
{
    //
    // Do any custom code here
    //

    // Call the ListController behavior index() method
    $this-&gt;asExtension(&#39;ListController&#39;)-&gt;index();
}
</code></pre><p><a name="extend-list-columns" class="anchor"></a></p><h3 id="изменение-столбцов-списка"><a href="#изменение-столбцов-списка" class="header-anchor">#</a> Изменение столбцов списка</h3><p>Вы можете добавить новые столбцы в список, используя метод <code>extendListColumns</code>. Он принимает два аргумента: <strong>$list</strong> и <strong>$model</strong>. Пример:</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    public $implement = [&#39;Backend.Behaviors.ListController&#39;];

    public $listConfig = &#39;list_config.yaml&#39;;
}


Categories::extendListColumns(function($list, $model) {

    if (!$model instanceof MyModel)
        return;

    $list-&gt;addColumns([
        &#39;my_column&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;My Column&#39;
        ]
    ]);

});
</code></pre><p>Также Вы можете переопределить метод <code>listExtendColumns</code> в классе контроллера.</p><pre><code>class Categories extends \\Backend\\Classes\\Controller
{
    [...]

    public function listExtendColumns($list)
    {
        $list-&gt;addColumns([...]);
    }
}
</code></pre><p>Доступные методы объекта <code>$list</code>:</p><div class="table"><table tabindex="0"><thead><tr><th>Метод</th><th>Описание</th></tr></thead><tbody><tr><td><strong>addColumns</strong></td><td>добавляет новые столбцы в список</td></tr><tr><td><strong>removeColumn</strong></td><td>удаляет столбцы из списка</td></tr></tbody></table></div><p><a name="extend-model-query" class="anchor"></a></p><h3 id="изменение-запроса-к-модели"><a href="#изменение-запроса-к-модели" class="header-anchor">#</a> Изменение запроса к модели</h3><p>Вы можете переопределить метод <code>listExtendQuery</code>, чтобы изменить запрос к модели при отображении списка внутри класса контроллера. Пример:</p><pre><code>public function listExtendQuery($query)
{
    $query-&gt;withTrashed();
}
</code></pre><p>Вы также можете переопределить метод <code>listFilterExtendQuery</code>, чтобы изменить запрос к модели при фильтрации списка внутри класса контроллера. Пример:</p><pre><code>public function listFilterExtendQuery($query, $scope)
{
    if ($scope-&gt;scopeName == &#39;status&#39;) {
        $query-&gt;where(&#39;status&#39;, &#39;&lt;&gt;&#39;, &#39;all&#39;);
    }
}
</code></pre>`,92))])}const v=d(i,[["render",h]]);export{y as __pageData,v as default};
