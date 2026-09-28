import{_ as r,r as t,o as l,c as s,e as o,a as d,s as i}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Связи - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Настройка","slug":"настроика","link":"#настроика","children":[]},{"level":2,"title":"Типы","slug":"типы","link":"#типы","children":[{"level":3,"title":"Has many","slug":"has-many","link":"#has-many","children":[]},{"level":3,"title":"Belongs to many","slug":"belongs-to-many","link":"#belongs-to-many","children":[]},{"level":3,"title":"Belongs to many (with Pivot Data)","slug":"belongs-to-many-with-pivot-data","link":"#belongs-to-many-with-pivot-data","children":[]},{"level":3,"title":"Belongs to","slug":"belongs-to","link":"#belongs-to","children":[]},{"level":3,"title":"Has one","slug":"has-one","link":"#has-one","children":[]}]},{"level":2,"title":"Менеджер связей","slug":"менеджер-связеи","link":"#менеджер-связеи","children":[]}],"relativePath":"1.x/ru/backend/relations.md","filePath":"1.x/ru/backend/relations.md"}'),m={name:"1.x/ru/backend/relations.md"};function c(g,e,h,p,f,u){const n=t("pre-heading"),a=t("post-heading");return l(),s("div",null,[o(n),e[0]||(e[0]=d("h1",null,"Связи",-1)),o(a),e[1]||(e[1]=i(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p><code>Связи</code> - это модификатор контроллера, которой позволяет управлять сложными отношениями <a href="./../database/model.html">модели</a> на странице.</p><p>Для того, чтобы использовать связи, Вы должны указать их в перемененной <code>$implement</code> в классе контроллера. Также должна быть определена переменная <code>$relationConfig</code>, значение которой - YAML файл с настройками.</p><pre><code>namespace Acme\\Projects\\Controllers;

class Projects extends Controller
{
    public $implement = [
        &#39;Backend.Behaviors.FormController&#39;,
        &#39;Backend.Behaviors.RelationController&#39;,
    ];

    public $formConfig = &#39;config_form.yaml&#39;;
    public $relationConfig = &#39;config_relation.yaml&#39;;
}
</code></pre><blockquote><p><strong>Важно:</strong> Очень часто связи используются вместе с <a href="./../backend/forms.html">формами</a>.</p></blockquote><p><a name="configuring-relation" class="anchor"></a></p><h2 id="настроика"><a href="#настроика" class="header-anchor">#</a> Настройка</h2><p>Файл с настройками, на который ссылается переменная <code>$relationConfig</code>, должен иметь YAML формат и находиться в папке с <a href="./../backend/controllers-views-ajax.html#introduction">представлением</a> контроллера.</p><p>Рассмотрим модель <em>Invoice</em>:</p><pre><code>class Invoice {
    public $hasMany = [
        &#39;items&#39; =&gt; [&#39;Acme\\Pay\\Models\\InvoiceItem&#39;],
    ];
}
</code></pre><p>в которой указана связь с моделью <em>InvoiceItem</em>. Эта связь имеет название <code>items</code>, которое также используется в YAML файле с настройками:</p><pre><code># ===================================
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
</code></pre><p>Вы можете использовать следующие параметры для настройки связи:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>метка связи, обязательно.</td></tr><tr><td><strong>view</strong></td><td>параметр определяет вид контейнера, см. ниже.</td></tr><tr><td><strong>manage</strong></td><td>параметр определяет вид модального окна, см. ниже.</td></tr><tr><td><strong>pivot</strong></td><td>ссылка на файл с описанием полей формы, которая используется для <a href="#belongs-to-many-pivot">связи с таблицей данных</a>.</td></tr><tr><td><strong>emptyMessage</strong></td><td>сообщение при отсутствии связей, необязательно.</td></tr><tr><td><strong>readOnly</strong></td><td>отключает возможность добавлять, обновлять, удалять или создавать отношения. По умолчанию: false</td></tr><tr><td><strong>deferredBinding</strong></td><td><a href="./../database/model.html#deferred-binding">откладывает все обязательные действия, используя ключ сессии</a> когда это возможно. По умолчанию: false</td></tr></tbody></table></div><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Тип</th><th>Описание</th></tr></thead><tbody><tr><td><strong>form</strong></td><td>Форма</td><td>ссылка на YAML файл с <a href="./backend-forms.html#form-fields">настройками формы</a>.</td></tr><tr><td><strong>list</strong></td><td>Список</td><td>ссылка на YAML файл с <a href="./backend-lists.html#list-columns">настройками списка</a>.</td></tr><tr><td><strong>showSearch</strong></td><td>Список</td><td>отображает форму для поиска записи. По умолчанию: false</td></tr><tr><td><strong>showSorting</strong></td><td>Список</td><td>позволяет сортировать записи. По умолчанию: true</td></tr><tr><td><strong>defaultSort</strong></td><td>Список</td><td>указывает столбец и направление для сортировки по умолчанию. Разрешается использование строки или массива, где ключ - <code>column</code>, значение - <code>direction</code>.</td></tr><tr><td><strong>recordsPerPage</strong></td><td>Список</td><td>максимальное количество строк на странице.</td></tr><tr><td><strong>conditions</strong></td><td>Список</td><td>дополнительное условие фильтрации.</td></tr><tr><td><strong>scope</strong></td><td>Список</td><td>определяет <a href="./../database/model.html#query-scopes">метод для изменения запроса</a>.</td></tr><tr><td><strong>showCheckboxes</strong></td><td>Список</td><td>отображает чекбокс для каждой строки.</td></tr><tr><td><strong>recordUrl</strong></td><td>Список</td><td>добавляет ссылку для каждой строки. Пример: <strong>users/update/:id</strong>. Где <code>:id</code> - идентификатор записи.</td></tr><tr><td><strong>recordOnClick</strong></td><td>Список</td><td>произвольный JavaScript код, который выполняется при клике на запись.</td></tr><tr><td><strong>toolbarPartial</strong></td><td>Форма и Список</td><td>ссылка на фрагмент контроллера с тулбаром. Пример: <strong>_relation_toolbar.htm</strong>. Этот параметр переопределяет <em>toolbarButtons</em>.</td></tr><tr><td><strong>toolbarButtons</strong></td><td>Форма и Список</td><td>позволяет отобразить кнопки: add, create, update, delete, remove, link, unlink. Пример: <strong>add|remove</strong> или <code>false</code>, чтобы ничего не показывать.</td></tr><tr><td><strong>title</strong></td><td>Форма и Список</td><td>заголовок модального окна, можно использовать <a href="./../plugin/localization.html">локализацию</a>.</td></tr><tr><td><strong>context</strong></td><td>Форма</td><td>контекст отображаемой формы. Строка или массив с ключами: create, update.</td></tr></tbody></table></div><p><a name="relationship-types" class="anchor"></a></p><h2 id="типы"><a href="#типы" class="header-anchor">#</a> Типы</h2><p>Отображение менеджера связей зависит от типа отношений. Каждый тип имеет свои требования к конфигурации, которые выделены <strong>жирным шрифтом</strong>. Доступны следующие типы связей:</p><ul><li><a href="#has-many">Has many</a></li><li><a href="#belongs-to-many">Belongs to many</a></li><li><a href="#belongs-to-many-pivot">Belongs to Many (with Pivot Data)</a></li><li><a href="#belongs-to">Belongs to</a></li><li><a href="#has-one">Has one</a></li></ul><p><a name="has-many" class="anchor"></a></p><h3 id="has-many"><a href="#has-many" class="header-anchor">#</a> Has many</h3><ol><li>Связанные записи отображаются в виде списка. (<strong>view.list</strong>).</li><li>При нажатии на запись отобразится форма для редактирования (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Add</em> на панели инструментов отобразится список выбора (<strong>manage.list</strong>).</li><li>При нажатии на кнопку <em>Create</em> на панели управления отобразится форма для создания (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Delete</em> запись/записи удаляется/удаляются.</li><li>При нажатии на кнопку <em>Remove</em> удаляются отношения.</li></ol><p>Например, если <em>запись в блоге</em> имеет много <em>комментариев</em>, то в качестве главной модели устанавливается запись, и отображается список комментариев, используя колонки из <strong>списка</strong>. При нажатии на комментарий отображается всплывающая форма с полями, определенными в <strong>форме</strong> &quot;Обновить комментарий&quot;. Комментарии могут быть созданы таким же образом. Ниже приведен пример конфигурационного файла:</p><pre><code># ===================================
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
</code></pre><p><a name="belongs-to-many" class="anchor"></a></p><h3 id="belongs-to-many"><a href="#belongs-to-many" class="header-anchor">#</a> Belongs to many</h3><ol><li>Связанные записи отображаются в виде списка (<strong>view.list</strong>).</li><li>При нажатии на кнопку <em>Add</em> на панели инструментов отобразится список выбора (<strong>manage.list</strong>).</li><li>При нажатии на кнопку <em>Create</em> на панели управления отобразится форма для создания (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Delete</em> запись/записи из таблицы удаляется/удаляются.</li><li>При нажатии на кнопку <em>Remove</em> удаляются отношения.</li></ol><p>Например, если <em>пользователь</em> принадлежит к нескольким <em>ролям</em>, то в качестве главной модели устанавливается пользователь, и отображается список ролей, используя колонки из <strong>списка</strong>. Роли пользователя могут быть добавлены или удалены. Ниже приведен пример конфигурационного файла:</p><pre><code># ===================================
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
</code></pre><p><a name="belongs-to-many-pivot" class="anchor"></a></p><h3 id="belongs-to-many-with-pivot-data"><a href="#belongs-to-many-with-pivot-data" class="header-anchor">#</a> Belongs to many (with Pivot Data)</h3><ol><li>Связанные записи отображаются в виде списка (<strong>view.list</strong>).</li><li>При нажатии на запись отобразится форма с данными для редактирования (<strong>pivot.form</strong>).</li><li>При нажатии на кнопку <em>Add</em> на панели инструментов отобразится список (<strong>manage.list</strong>) выбора и форма для ввода данных (<strong>pivot.form</strong>).</li><li>При нажатии на кнопку Удалить таблица с данными удаляется.</li></ol><p>Рассмотрим предыдущий пример. Роль может иметь ограниченный срок действия. При нажатии на нее отобразится всплывающая форма, которая позволяет изменить дату окончания этого срока. Ниже приведен пример конфигурационного файла:</p><pre><code># ===================================
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
</code></pre><p>Сводные данные доступны при определении полей формы и столбцов списка через <code>pivot</code>. Пример:</p><pre><code># ===================================
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
</code></pre><blockquote><p><strong>Note:</strong> Сводные данные (на данный момент) не поддерживаются <a href="./../database/relations.html#deferred-binding">отолежнным связыванием</a>, таким образом родительская модель должна существовать заранее.</p></blockquote><p><a name="belongs-to" class="anchor"></a></p><h3 id="belongs-to"><a href="#belongs-to" class="header-anchor">#</a> Belongs to</h3><ol><li>Связанная запись отображаются в виде формы предпросмотра (<strong>view.form</strong>).</li><li>При нажатии на кнопку <em>Create</em> отобразится форма создания (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Update</em> отобразится форма изменения (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Link</em> к отобразится список выбора (<strong>manage.list</strong>).</li><li>При нажатии на кнопку <em>Unlink</em> связь исчезнет.</li><li>При нажатии на кнопку <em>Delete</em> запись удаляется.</li></ol><p>Например, если <em>телефон</em> принадлежит <em>человеку</em>, то менеджер связей отобразит <strong>форму</strong> с определенными полями. При нажатии на кнопку &quot;Link&quot; отобразится список людей, к которым можно привязать телефон. При нажатии на кнопку &quot;Unlink&quot; связь исчезнет.</p><pre><code># ===================================
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
</code></pre><p><a name="has-one" class="anchor"></a></p><h3 id="has-one"><a href="#has-one" class="header-anchor">#</a> Has one</h3><ol><li>Связанная запись отображаются в виде формы предпросмотра (<strong>view.form</strong>).</li><li>При нажатии на кнопку <em>Create</em> отобразится форма создания (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Update</em> отобразится форма изменения (<strong>manage.form</strong>).</li><li>При нажатии на кнопку <em>Link</em> к отобразится список выбора (<strong>manage.list</strong>).</li><li>При нажатии на кнопку <em>Unlink</em> связь исчезнет.</li><li>При нажатии на кнопку <em>Delete</em> запись удаляется.</li></ol><p>Например, если <em>человек</em> имеет один <em>телефонный номер</em>, то менеджер связей отобразит <strong>форму</strong> с определенными полями. При нажатии на кнопку &quot;Изменить&quot; отобразится форма для редактирования. Если человек уже имеет телефон, то он обновится, иначе будет добавлен новый номер.</p><pre><code># ===================================
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
</code></pre><p><a name="relation-display" class="anchor"></a></p><h2 id="менеджер-связеи"><a href="#менеджер-связеи" class="header-anchor">#</a> Менеджер связей</h2><p>Целевая модель должна быть сначала инициализирована в контроллере путем вызова метода <code>initRelation()</code> для того, чтобы управлять отношениями на любой странице.</p><pre><code>$post = Post::where(&#39;id&#39;, 7)-&gt;first();
$this-&gt;initRelation($post);
</code></pre><blockquote><p><strong>Note:</strong> На страницах Создания, Редактирования и Предпросмотра модель инициализируется автоматически.</p></blockquote><p>Вы можете отобразить менеджер связи на определенной странице при помощи метода <code>relationRender()</code>. Например для страницы <a href="./../backend/forms.html#form-preview-view">Предпросмотра</a>, содержимое файла <strong>preview.htm</strong> может выглядеть так:</p><pre><code>&lt;?= $this-&gt;formRenderPreview() ?&gt;

&lt;?= $this-&gt;relationRender(&#39;comments&#39;) ?&gt;
</code></pre><p>Вы можете отобразить менеджер связи в режиме &quot;только чтение&quot;, передав массив <code>[&#39;readOnly&#39; =&gt; true]</code> в качестве второго аргумента:</p><pre><code>&lt;?= $this-&gt;relationRender(&#39;comments&#39;, [&#39;readOnly&#39; =&gt; true]) ?&gt;
</code></pre>`,57))])}const y=r(m,[["render",c]]);export{v as __pageData,y as default};
