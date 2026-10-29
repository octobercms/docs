import{_ as d,r as t,o as c,c as i,e as o,a as e,s,d as a}from"./chunks/framework.CXcwiNg-.js";const $=JSON.parse('{"title":"Трейты ( Database Traits ) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Hashable","slug":"hashable","link":"#hashable","children":[]},{"level":2,"title":"Purgeable","slug":"purgeable","link":"#purgeable","children":[]},{"level":2,"title":"Encryptable","slug":"encryptable","link":"#encryptable","children":[]},{"level":2,"title":"Sluggable","slug":"sluggable","link":"#sluggable","children":[]},{"level":2,"title":"Revisionable","slug":"revisionable","link":"#revisionable","children":[]},{"level":2,"title":"Sortable","slug":"sortable","link":"#sortable","children":[]},{"level":2,"title":"Simple Tree","slug":"simple-tree","link":"#simple-tree","children":[]},{"level":2,"title":"Nested Tree","slug":"nested-tree","link":"#nested-tree","children":[{"level":3,"title":"Создание корневого узла","slug":"создание-корневого-узла","link":"#создание-корневого-узла","children":[]},{"level":3,"title":"Вставка узлов","slug":"вставка-узлов","link":"#вставка-узлов","children":[]},{"level":3,"title":"Удаление узлов","slug":"удаление-узлов","link":"#удаление-узлов","children":[]},{"level":3,"title":"Получение уровня вложенности узла","slug":"получение-уровня-вложенности-узла","link":"#получение-уровня-вложенности-узла","children":[]},{"level":3,"title":"Перемещение узлов","slug":"перемещение-узлов","link":"#перемещение-узлов","children":[]}]},{"level":2,"title":"Валидация","slug":"валидация","link":"#валидация","children":[{"level":3,"title":"Retrieving validation errors","slug":"retrieving-validation-errors","link":"#retrieving-validation-errors","children":[]},{"level":3,"title":"Переопределение валидации","slug":"переопределение-валидации","link":"#переопределение-валидации","children":[]},{"level":3,"title":"Пользовательские сообщения об ошибках","slug":"пользовательские-сообщения-об-ошибках","link":"#пользовательские-сообщения-об-ошибках","children":[]},{"level":3,"title":"Пользовательские имена атрибутов","slug":"пользовательские-имена-атрибутов","link":"#пользовательские-имена-атрибутов","children":[]},{"level":3,"title":"Динамическая валидация","slug":"динамическая-валидация","link":"#динамическая-валидация","children":[]},{"level":3,"title":"Пользовательские правила проверки","slug":"пользовательские-правила-проверки","link":"#пользовательские-правила-проверки","children":[]}]},{"level":2,"title":"Soft deleting","slug":"soft-deleting","link":"#soft-deleting","children":[{"level":3,"title":"Запросы с мягко-удалёнными моделями","slug":"запросы-с-мягко-удаленными-моделями","link":"#запросы-с-мягко-удаленными-моделями","children":[{"level":4,"title":"Включить мягко-удалённые модели","slug":"включить-мягко-удаленные-модели","link":"#включить-мягко-удаленные-модели","children":[]},{"level":4,"title":"Получение только мягко-удалённых моделей","slug":"получение-только-мягко-удаленных-моделеи","link":"#получение-только-мягко-удаленных-моделеи","children":[]},{"level":4,"title":"Восстановление мягко-удалённых моделей","slug":"восстановление-мягко-удаленных-моделеи","link":"#восстановление-мягко-удаленных-моделеи","children":[]},{"level":4,"title":"Удаление мягко-удалённых моделей","slug":"удаление-мягко-удаленных-моделеи","link":"#удаление-мягко-удаленных-моделеи","children":[]}]},{"level":3,"title":"Мягкое удаление связей","slug":"мягкое-удаление-связеи","link":"#мягкое-удаление-связеи","children":[]}]},{"level":2,"title":"Nullable","slug":"nullable","link":"#nullable","children":[]}],"relativePath":"1.x/ru/database/traits.md","filePath":"1.x/ru/database/traits.md"}'),p={name:"1.x/ru/database/traits.md"};function h(u,r,g,b,m,f){const n=t("pre-heading"),l=t("post-heading");return c(),i("div",null,[o(n),r[0]||(r[0]=e("h1",null,"Трейты ( Database Traits )",-1)),o(l),r[1]||(r[1]=s(`<p><a href="hashable" name="hashable" class="anchor"></a></p><h2 id="hashable"><a href="#hashable" class="header-anchor">#</a> Hashable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Hashable</code> и свойство <code>$hashable</code> в модели, чтобы указать какие из ее атрибутов должны хэшироваться. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Hashable;

    /**
     * @var array List of attributes to hash.
     */
    protected $hashable = [&#39;password&#39;];
}
</code></pre><p><a href="purgeable" name="purgeable" class="anchor"></a></p><h2 id="purgeable"><a href="#purgeable" class="header-anchor">#</a> Purgeable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Purgeable</code> и свойство<code>$purgeable</code> в модели, чтобы указать какие из ее атрибутов не должны сохранятся при создании и обновлении. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Purgeable;

    /**
     * @var array List of attributes to purge.
     */
    protected $purgeable = [&#39;password_confirmation&#39;];
}
</code></pre><p>Используйте метод <code>getOriginalPurgeValue</code>, чтобы получить значение атрибута:</p><pre><code>return $user-&gt;getOriginalPurgeValue(&#39;password_confirmation&#39;);
</code></pre><p><a href="encryptable" name="encryptable" class="anchor"></a></p><h2 id="encryptable"><a href="#encryptable" class="header-anchor">#</a> Encryptable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Encryptable</code> и свойство <code>$encryptable</code> в модели, чтобы указать какие из ее атрибутов должны быть зашифрованы. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Encryptable;

    /**
     * @var array List of attributes to encrypt.
     */
    protected $encryptable = [&#39;api_key&#39;, &#39;api_secret&#39;];
}
</code></pre><p><a href="sluggable" name="sluggable" class="anchor"></a></p><h2 id="sluggable"><a href="#sluggable" class="header-anchor">#</a> Sluggable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Sluggable</code> и свойство <code>$slugs</code> для автоматической генерации URL. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Sluggable;

    /**
     * @var array Generate slugs for these attributes.
     */
    protected $slugs = [&#39;slug&#39; =&gt; &#39;name&#39;];
}
</code></pre><p>Вы можете указать несколько источников:</p><pre><code>protected $slugs = [
    &#39;slug&#39; =&gt; [&#39;first_name&#39;, &#39;last_name&#39;]
];
</code></pre><p>URL будет сгенерирован автоматически только при создании записи в БД. Чтобы заменить слаг на другой, укажите его вручную:</p><pre><code>$user = new User;
$user-&gt;name = &#39;Remy&#39;;
$user-&gt;slug = &#39;custom-slug&#39;;
$user-&gt;save(); // Slug will not be generated
</code></pre><p>Используйте метод <code>slugAttributes</code>, чтобы сгенерировать новый URL при обновлении модели:</p><pre><code>$user = User::find(1);
$user-&gt;slug = null;
$user-&gt;slugAttributes();
$user-&gt;save();
</code></pre><p><a href="revisionable" name="revisionable" class="anchor"></a></p><h2 id="revisionable"><a href="#revisionable" class="header-anchor">#</a> Revisionable</h2><p>Модели в OctoberCMS могут запоминать историю изменений при помощи ревизий. Для этого используйте трейт <code>October\\Rain\\Database\\Traits\\Revisionable</code>, свойство <code>$revisionable</code> и связь <code>revision_history</code> в модели, чтобы указать какие из ее атрибутов необходимо отслеживать. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Revisionable;

    /**
     * @var array Monitor these attributes for changes.
     */
    protected $revisionable = [&#39;name&#39;, &#39;email&#39;];

    /**
     * @var array Relations
     */
    public $morphMany = [
        &#39;revision_history&#39; =&gt; [&#39;System\\Models\\Revision&#39;, &#39;name&#39; =&gt; &#39;revisionable&#39;]
    ];
}
</code></pre><p>Вы можете ограничить количество записей при помощи свойства <code>$revisionableLimit</code>:</p><pre><code>/**
 * @var int Maximum number of revision records to keep.
 */
public $revisionableLimit = 8;
</code></pre><p>Вы можете получить все ревизии, как и любое другое отношение:</p><pre><code>$history = User::find(1)-&gt;revision_history;

foreach ($history as $record) {
    echo $record-&gt;field . &#39; updated &#39;;
    echo &#39;from &#39; . $record-&gt;old_value;
    echo &#39;to &#39; . $record-&gt;new_value;
}
</code></pre><p><a href="sortable" name="sortable" class="anchor"></a></p><h2 id="sortable"><a href="#sortable" class="header-anchor">#</a> Sortable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Sortable</code>, чтобы отсортировать модели в коллекции:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Sortable;
}
</code></pre><p>Используйте метод <code>setSortableOrder</code>, чтобы изменить порядок одной или нескольких моделей:</p><pre><code>// Sets the order of the user to 1...
$user-&gt;setSortableOrder($user-&gt;id, 1);

// Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
$user-&gt;setSortableOrder([1, 2, 3], [3, 2, 1]);
</code></pre><p><a href="simple-tree" name="simple-tree" class="anchor"></a></p><h2 id="simple-tree"><a href="#simple-tree" class="header-anchor">#</a> Simple Tree</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\SimpleTree</code> и колонку <code>parent_id</code> в БД для создания простого дерева. Пример:</p><pre><code>class Category extends Model
{
    use \\October\\Rain\\Database\\Traits\\SimpleTree;
}
</code></pre><p>Он автоматически добавит две <a href="./../database/relations.html">связи</a> <code>parent</code> и <code>children</code>, которые эквивалентны следующим описаниям:</p><pre><code>public $belongsTo = [
    &#39;parent&#39;    =&gt; [&#39;User&#39;, &#39;key&#39; =&gt; &#39;parent_id&#39;],
];

public $hasMany = [
    &#39;children&#39;    =&gt; [&#39;User&#39;, &#39;key&#39; =&gt; &#39;parent_id&#39;],
];
</code></pre><p>Вы можете изменить название столбца при помощи константы <code>PARENT_ID</code>:</p><pre><code>const PARENT_ID = &#39;my_parent_column&#39;;
</code></pre><p>Коллекция моделей, которая использует этот трейт будет иметь тип <code>October\\Rain\\Database\\TreeCollection</code>.</p><p>Используйте метод <code>toNested</code>, чтобы получить древовидную структуру:</p><pre><code>Category::all()-&gt;toNested();
</code></pre><p><a href="nested-tree" name="nested-tree" class="anchor"></a></p><h2 id="nested-tree"><a href="#nested-tree" class="header-anchor">#</a> Nested Tree</h2>`,51)),r[2]||(r[2]=e("p",null,[e("a",{href:"https://en.wikipedia.org/wiki/Nested_set_model",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("Модель вложенных множеств"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),e("span",{class:"sr-only"},"(opens new window)")])]),a(" представляет собой усовершенствованную технику для поддержания иерархии при помощи столбцов "),e("code",null,"parent_id"),a(", "),e("code",null,"nest_left"),a(", "),e("code",null,"nest_right"),a(", "),e("code",null,"nest_depth"),a(" в БД и трейта "),e("code",null,"October\\Rain\\Database\\Traits\\NestedTree"),a(". Пример:")],-1)),r[3]||(r[3]=s(`<pre><code>class Category extends Model
{
    use \\October\\Rain\\Database\\Traits\\NestedTree;
}
</code></pre><h3 id="создание-корневого-узла"><a href="#создание-корневого-узла" class="header-anchor">#</a> Создание корневого узла</h3><pre><code>$root = Category::create([&#39;name&#39; =&gt; &#39;Root category&#39;]);
</code></pre><p>или</p><pre><code>$node-&gt;makeRoot();
</code></pre><p>или</p><pre><code>$node-&gt;parent_id = null;
$node-&gt;save();
</code></pre><h3 id="вставка-узлов"><a href="#вставка-узлов" class="header-anchor">#</a> Вставка узлов</h3><pre><code>$child1 = $root-&gt;children()-&gt;create([&#39;name&#39; =&gt; &#39;Child 1&#39;]);
</code></pre><p>или</p><pre><code>$child2 = Category::create([&#39;name&#39; =&gt; &#39;Child 2&#39;]);
$child2-&gt;makeChildOf($root);
</code></pre><h3 id="удаление-узлов"><a href="#удаление-узлов" class="header-anchor">#</a> Удаление узлов</h3><pre><code>$child1-&gt;delete();
</code></pre><h3 id="получение-уровня-вложенности-узла"><a href="#получение-уровня-вложенности-узла" class="header-anchor">#</a> Получение уровня вложенности узла</h3><pre><code>// 0 when root
$node-&gt;getLevel()
</code></pre><h3 id="перемещение-узлов"><a href="#перемещение-узлов" class="header-anchor">#</a> Перемещение узлов</h3><p><code>moveLeft()</code>: Найти &quot;брата&quot; слева и переместить узел левее него. <code>moveRight()</code>: Найти &quot;брата&quot; справа и переместить узел правее него. <code>moveBefore($otherNode)</code>: Переместить узел слева от ... <code>moveAfter($otherNode)</code>: Переместить узел справа от ... <code>makeChildOf($otherNode)</code>: Сделать узел дочерним ... <code>makeRoot()</code>: Сделайте текущий узел корневым.</p><p><a href="validation" name="validation" class="anchor"></a></p><h2 id="валидация"><a href="#валидация" class="header-anchor">#</a> Валидация</h2><p>Модели в OctoberCMS используют встроенный класс <a href="./../services/validation.html">валидации</a>. Используйте трейт <code>October\\Rain\\Database\\Traits\\Validation</code> и свойство <code>$rules</code>, чтобы задать правила валидации:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\Validation;

    public $rules = [
        &#39;name&#39;                  =&gt; &#39;required|between:4,16&#39;,
        &#39;email&#39;                 =&gt; &#39;required|email&#39;,
        &#39;password&#39;              =&gt; &#39;required|alpha_num|between:4,8|confirmed&#39;,
        &#39;password_confirmation&#39; =&gt; &#39;required|alpha_num|between:4,8&#39;
    ];
}
</code></pre><blockquote><p><strong>Примечание</strong>: Вы также можете использовать <a href="./../services/validation.html#basic-usage">array syntax</a>.</p></blockquote><p>Модели автоматически проверяют себя при вызове метода <code>save()</code>.</p><pre><code>$user = new User;
$user-&gt;name = &#39;Adam Person&#39;;
$user-&gt;email = &#39;a.person@email.address.com&#39;;
$user-&gt;password = &#39;passw0rd&#39;;

// Returns false if model is invalid
$success = $user-&gt;save();
</code></pre><blockquote><p><strong>Примечание:</strong> Вы можете использовать метод <code>validate()</code>, чтобы проверить модель в любое время.</p></blockquote><p><a href="retrieving-validation-errors" name="retrieving-validation-errors" class="anchor"></a></p><h3 id="retrieving-validation-errors"><a href="#retrieving-validation-errors" class="header-anchor">#</a> Retrieving validation errors</h3><p>Когда модель не проходит валидацию, к ней добавляется объект <code>Illuminate\\Support\\MessageBag</code>, который содержит сообщение об ошибке. Используйте метод <code>errors()</code> или свойство <code>$validationErrors</code>, чтобы получить экземпляр коллекции. Используйте метод <code>errors()-&gt;all()</code>, чтобы получить все ошибки. Используйте метод <code>validationErrors-&gt;get(&#39;attribute&#39;)</code>, чтобы получить сообщение об ошибки конкретного атрибута.</p><blockquote><p><strong>Примечание:</strong> Модель использует объект MessagesBag, который имеет <a href="./../services/validation.html#working-with-error-messages">простой и элегантный метод</a> для форматирования ошибок.</p></blockquote><p><a href="overriding-validation" name="overriding-validation" class="anchor"></a></p><h3 id="переопределение-валидации"><a href="#переопределение-валидации" class="header-anchor">#</a> Переопределение валидации</h3><p>Используйте метод <code>forceSave()</code>, чтобы сохранить модель, не смотря на ошибки.</p><pre><code>$user = new User;

// Creates a user without validation
$user-&gt;forceSave();
</code></pre><p><a href="custom-error-messages" name="custom-error-messages" class="anchor"></a></p><h3 id="пользовательские-сообщения-об-ошибках"><a href="#пользовательские-сообщения-об-ошибках" class="header-anchor">#</a> Пользовательские сообщения об ошибках</h3><p>Вы можете изменить сообщения об ошибках при помощи свойства <code>$customMessages</code>:</p><pre><code>class User extends Model
{
    public $customMessages = [
       &#39;required&#39; =&gt; &#39;The :attribute field is required.&#39;,
        ...
    ];
}
</code></pre><p><a href="custom-attribute-names" name="custom-attribute-names" class="anchor"></a></p><h3 id="пользовательские-имена-атрибутов"><a href="#пользовательские-имена-атрибутов" class="header-anchor">#</a> Пользовательские имена атрибутов</h3><p>Вы можете изменить имена атрибутов при помощи свойства <code>$attributeNames</code>:</p><pre><code>class User extends Model
{
    public $attributeNames = [
       &#39;email&#39; =&gt; &#39;Email Address&#39;,
        ...
    ];
}
</code></pre><p><a href="dynamic-validation-rules" name="dynamic-validation-rules" class="anchor"></a></p><h3 id="динамическая-валидация"><a href="#динамическая-валидация" class="header-anchor">#</a> Динамическая валидация</h3><p>Вы можете использовать динамическую валидацию при помощи метода <code>beforeValidate</code>. Пример:</p><pre><code>public function beforeValidate()
{
    if (!$this-&gt;is_remote) {
        $this-&gt;rules[&#39;latitude&#39;] = &#39;required&#39;;
        $this-&gt;rules[&#39;longitude&#39;] = &#39;required&#39;;
    }
}
</code></pre><p><a href="custom-validation-rules" name="custom-validation-rules" class="anchor"></a></p><h3 id="пользовательские-правила-проверки"><a href="#пользовательские-правила-проверки" class="header-anchor">#</a> Пользовательские правила проверки</h3><p>Вы также можете создавать свои собственные <a href="./../services/validation.html#custom-validation-rules">правила проверки</a>.</p><p><a href="soft-deleting" name="soft-deleting" class="anchor"></a></p><h2 id="soft-deleting"><a href="#soft-deleting" class="header-anchor">#</a> Soft deleting</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\SoftDelete</code> и столбец <code>deleted_at</code>, чтобы при удалении записи из БД к ней добавлялась метка со временем ее удаления:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\SoftDelete;

    protected $dates = [&#39;deleted_at&#39;];
}
</code></pre><blockquote><p><strong>Примечание:</strong> Сама запись при этом не удаляется.</p></blockquote><p>Используйте метод <code>softDeletes</code>, чтобы добавить столбец <code>deleted_at</code> в вашу таблицу:</p><pre><code>Schema::table(&#39;posts&#39;, function ($table) {
    $table-&gt;softDeletes();
});
</code></pre><p>Используйте метод <code>trashed</code>, чтобы получить все удаленные записи:</p><pre><code>if ($user-&gt;trashed()) {
    //
}
</code></pre><p><a href="querying-soft-deleted-models" name="querying-soft-deleted-models" class="anchor"></a></p><h3 id="запросы-с-мягко-удаленными-моделями"><a href="#запросы-с-мягко-удаленными-моделями" class="header-anchor">#</a> Запросы с мягко-удалёнными моделями</h3><h4 id="включить-мягко-удаленные-модели"><a href="#включить-мягко-удаленные-модели" class="header-anchor">#</a> Включить мягко-удалённые модели</h4><p>Используйте метод <code>withTrashed</code>, чтобы включить мягко-удалённые модели в результаты запроса:</p><pre><code>$users = User::withTrashed()-&gt;where(&#39;account_id&#39;, 1)-&gt;get();
</code></pre><p>Вы также можете использовать метод <code>withTrashed</code> при работе со связями:</p><pre><code>$flight-&gt;history()-&gt;withTrashed()-&gt;get();
</code></pre><h4 id="получение-только-мягко-удаленных-моделеи"><a href="#получение-только-мягко-удаленных-моделеи" class="header-anchor">#</a> Получение только мягко-удалённых моделей</h4><p>Используйте метод <code>onlyTrashed</code>, чтобы получить <strong>только</strong> мягко-удалённые модели:</p><pre><code>$users = User::onlyTrashed()-&gt;where(&#39;account_id&#39;, 1)-&gt;get();
</code></pre><h4 id="восстановление-мягко-удаленных-моделеи"><a href="#восстановление-мягко-удаленных-моделеи" class="header-anchor">#</a> Восстановление мягко-удалённых моделей</h4><p>Используйте метод <code>restore</code>, чтобы восстановить мягко-удалённые модели:</p><pre><code>$user-&gt;restore();

// Восстановить модель с account_id=1
User::withTrashed()-&gt;where(&#39;account_id&#39;, 1)-&gt;restore();

// Восстановить все удаленные модели
$user-&gt;posts()-&gt;restore();
</code></pre><h4 id="удаление-мягко-удаленных-моделеи"><a href="#удаление-мягко-удаленных-моделеи" class="header-anchor">#</a> Удаление мягко-удалённых моделей</h4><p>Используйте метод <code>forceDelete</code>, чтобы удалить мягко-удалённые модели навсегда:</p><pre><code>// Принудительное удаление экземпляра одной модели
$user-&gt;forceDelete();

// Принудительное удаление всех связанных моделей
$user-&gt;posts()-&gt;forceDelete();
</code></pre><p><a href="soft-deleting-relations" name="soft-deleting-relations" class="anchor"></a></p><h3 id="мягкое-удаление-связеи"><a href="#мягкое-удаление-связеи" class="header-anchor">#</a> Мягкое удаление связей</h3><p>Используйте параметр <code>softDelete</code>, чтобы применить каскадное удаление. Например, при удалении пользователя, все принадлежащие ему комментарии будут также удалены. Пример:</p><pre><code>class User extends Model
{
    use \\October\\Rain\\Database\\Traits\\SoftDelete;

    public $hasMany = [
        &#39;comments&#39; =&gt; [&#39;Acme\\Blog\\Models\\Comment&#39;, &#39;softDelete&#39; =&gt; true]
    ];
}
</code></pre><blockquote><p><strong>Примечание:</strong> Если связанная модель не использует &quot;мягкое удаление&quot;, то все ее записи удалятся навсегда.</p></blockquote><p>Under these same conditions, when the primary model is restored, all the related models that use the <code>softDelete</code> option will also be restored.</p><pre><code>// Restore the user and comments
$user-&gt;restore();
</code></pre><p><a href="nullable" name="nullable" class="anchor"></a></p><h2 id="nullable"><a href="#nullable" class="header-anchor">#</a> Nullable</h2><p>Используйте трейт <code>October\\Rain\\Database\\Traits\\Nullable</code> и свойство <code>$nullable</code>, чтобы задать <code>NULL</code> всем пустым атрибутам. Пример:</p><pre><code>class Product extends Model
{
    use \\October\\Rain\\Database\\Traits\\Nullable;

    /**
     * @var array Nullable attributes.
     */
    protected $nullable = [&#39;sku&#39;];
}
</code></pre>`,84))])}const _=d(p,[["render",h]]);export{$ as __pageData,_ as default};
