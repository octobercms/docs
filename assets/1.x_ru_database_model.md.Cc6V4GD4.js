import{_ as l,r,o as c,c as s,e as n,a as e,d,s as i}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Модель Активной Записи - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Определение модели","slug":"определение-модели","link":"#определение-модели","children":[{"level":3,"title":"Стандартные свойства","slug":"стандартные-своиства","link":"#стандартные-своиства","children":[{"level":4,"title":"Первичные ключи","slug":"первичные-ключи","link":"#первичные-ключи","children":[]},{"level":4,"title":"Отметки времени","slug":"отметки-времени","link":"#отметки-времени","children":[]},{"level":4,"title":"JSON атрибуты","slug":"json-атрибуты","link":"#json-атрибуты","children":[]}]}]},{"level":2,"title":"Получение нескольких моделей","slug":"получение-нескольких-моделеи","link":"#получение-нескольких-моделеи","children":[{"level":4,"title":"Доступ к значениям столбцов","slug":"доступ-к-значениям-столбцов","link":"#доступ-к-значениям-столбцов","children":[]},{"level":4,"title":"Добавление дополнительных ограничений","slug":"добавление-дополнительных-ограничении","link":"#добавление-дополнительных-ограничении","children":[]},{"level":4,"title":"Коллекции","slug":"коллекции","link":"#коллекции","children":[]},{"level":4,"title":"Разделение результата на блоки","slug":"разделение-результата-на-блоки","link":"#разделение-результата-на-блоки","children":[]}]},{"level":2,"title":"Получение одиночных моделей / агрегатные функции","slug":"получение-одиночных-моделеи-агрегатные-функции","link":"#получение-одиночных-моделеи-агрегатные-функции","children":[{"level":4,"title":"Исключения «Не найдено»","slug":"исключения-«не-наидено»","link":"#исключения-«не-наидено»","children":[]},{"level":3,"title":"Агрегатные функции","slug":"агрегатные-функции","link":"#агрегатные-функции","children":[]}]},{"level":2,"title":"Вставка и изменение моделей","slug":"вставка-и-изменение-моделеи","link":"#вставка-и-изменение-моделеи","children":[{"level":3,"title":"Простые вставки","slug":"простые-вставки","link":"#простые-вставки","children":[]},{"level":3,"title":"Простые изменения","slug":"простые-изменения","link":"#простые-изменения","children":[]},{"level":3,"title":"Массовое заполнение","slug":"массовое-заполнение","link":"#массовое-заполнение","children":[{"level":4,"title":"Другие методы создания","slug":"другие-методы-создания","link":"#другие-методы-создания","children":[]}]}]},{"level":2,"title":"Удаление моделей","slug":"удаление-моделеи","link":"#удаление-моделеи","children":[{"level":4,"title":"Удаление модели по ключу","slug":"удаление-модели-по-ключу","link":"#удаление-модели-по-ключу","children":[]},{"level":4,"title":"Удаление модели запросом","slug":"удаление-модели-запросом","link":"#удаление-модели-запросом","children":[]}]},{"level":2,"title":"Ограничения запросов","slug":"ограничения-запросов","link":"#ограничения-запросов","children":[{"level":4,"title":"Использование ограничений запросов","slug":"использование-ограничении-запросов","link":"#использование-ограничении-запросов","children":[]},{"level":4,"title":"Динамические ограничения","slug":"динамические-ограничения","link":"#динамические-ограничения","children":[]}]},{"level":2,"title":"События","slug":"события","link":"#события","children":[{"level":3,"title":"Основы использования","slug":"основы-использования","link":"#основы-использования","children":[]}]},{"level":2,"title":"Расширение моделей","slug":"расширение-моделеи","link":"#расширение-моделеи","children":[]}],"relativePath":"1.x/ru/database/model.md","filePath":"1.x/ru/database/model.md"}'),h={name:"1.x/ru/database/model.md"};function p(g,t,f,u,m,$){const a=r("pre-heading"),o=r("post-heading");return c(),s("div",null,[n(a),t[0]||(t[0]=e("h1",null,"Модель Активной Записи",-1)),n(o),t[1]||(t[1]=e("p",null,[e("a",{name:"introduction",class:"anchor"})],-1)),t[2]||(t[2]=e("h2",{id:"введение"},[e("a",{href:"#введение",class:"header-anchor"},"#"),d(" Введение")],-1)),t[3]||(t[3]=e("p",null,[d("В OctoberCMS Вы можете использовать красивую и простую реализацию шаблона Active Record для работы с базой данных, которая основана на "),e("a",{href:"http://laravel.com/docs/eloquent",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[d("Eloquent ORM"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),d(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),d(),e("span",{class:"sr-only"},"(opens new window)")])]),d(". Каждая таблица имеет соответствующий класс-модель, который используется для работы с этой таблицей. Модели позволяют запрашивать данные из таблиц, а также вставлять в них новые записи.")],-1)),t[4]||(t[4]=i(`<p>Класс модели находится в папке плагина в подпапке <strong>models</strong>. Пример:</p><pre><code>plugins/
  acme/
    blog/
      models/
        user/             &lt;=== Model config directory
          columns.yaml    &lt;=== Model config files
          fields.yaml     &lt;==^
        User.php          &lt;=== Model class
      Plugin.php
</code></pre><p>Папка с настройками модели может содержать файлы с описанием <a href="./../backend/lists.html#list-columns">столбцов списка</a> и <a href="./../backend/forms.html#form-fields">полей формы</a>. Название этой папки совпадает с названием класса модели и должно быть написано строчными буквами.</p><p><a name="defining-models" class="anchor"></a></p><h2 id="определение-модели"><a href="#определение-модели" class="header-anchor">#</a> Определение модели</h2><p>В большинстве случаев, для каждой таблице в базе должен существовать класс модели, который должен расширять класс <code>Model</code>. Пример:</p><pre><code>namespace Acme\\Blog\\Models;

use Model;

class Post extends Model
{
    /**
     * Название таблицы.
     *
     * @var string
     */
    protected $table = &#39;acme_blog_posts&#39;;
}
</code></pre><p>Свойство <code>$table</code> указывает на таблицу, соответствующей данной модели. Название таблицы состоит из имени автора, названия плагина и произвольного названия (которое должно быть осмысленным).</p><p><a name="standard-properties" class="anchor"></a></p><h3 id="стандартные-своиства"><a href="#стандартные-своиства" class="header-anchor">#</a> Стандартные свойства</h3><p>Вы можете использовать следующие стандартные свойства в модели:</p><pre><code>class User extends Model
{
    protected $primaryKey = &#39;id&#39;;

    public $exists = false;

    protected $dates = [&#39;last_seen_at&#39;];

    public $timestamps = true;

    protected $jsonable = [&#39;permissions&#39;];

    protected $guarded = [&#39;*&#39;];
}
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Свойство</th><th>Описание</th></tr></thead><tbody><tr><td><strong>$primaryKey</strong></td><td>первичный ключ с именем id.</td></tr><tr><td><strong>$exists</strong></td><td>указывает на то, что модель существует.</td></tr><tr><td><strong>$dates</strong></td><td>указанные атрибуты преобразуются в экземпляр объекта Carbon/DateTime после получения.</td></tr><tr><td><strong>$timestamps</strong></td><td>автоматически устанавливает поля created_at и updated_at.</td></tr><tr><td><strong>$jsonable</strong></td><td>указанные атрибуты кодируются в JSON перед сохранением и преобразуются в массивы после получения.</td></tr><tr><td><strong>$fillable</strong></td><td>определяет, для каких атрибутов модели разрешено <a href="#mass-assignment">массовое назначение</a>.</td></tr><tr><td><strong>$guarded</strong></td><td>определяет, для каких атрибутов модели запрещено <a href="#mass-assignment">массовое назначение</a>.</td></tr><tr><td><strong>$visible</strong></td><td>определяет атрибуты, которые можно показать в <a href="./../database/serialization.html">преобразованном массиве модели</a>.</td></tr><tr><td><strong>$hidden</strong></td><td>скрывает атрибуты из <a href="./../database/serialization.html">преобразованного массива модели</a> — например, пароль у модели <code>User</code>.</td></tr></tbody></table></div><h4 id="первичные-ключи"><a href="#первичные-ключи" class="header-anchor">#</a> Первичные ключи</h4><p>Модель предполагает, что каждая таблица имеет первичный ключ с именем <code>id</code>. Вы можете определить свойство <code>$primaryKey</code> для указания другого имени. Пример:</p><pre><code>class Post extends Model
{
    /**
     * Первичный ключ модели.
     *
     * @var string
     */
    protected $primaryKey = &#39;id&#39;;
}
</code></pre><h4 id="отметки-времени"><a href="#отметки-времени" class="header-anchor">#</a> Отметки времени</h4><p>По умолчанию модель ожидает наличия в ваших таблицах столбцов <code>updated_at</code> и <code>created_at</code>. Если вы не хотите, чтобы они автоматически обрабатывались, установите свойство <code>$timestamps</code> класса модели как <code>false</code>:</p><pre><code>class Post extends Model
{
    /**
     * Определяет необходимость отметок времени для модели.
     *
     * @var bool
     */
    public $timestamps = false;
}
</code></pre><p>Если вы хотите изменить формат отметок времени, задайте свойство <code>$dateFormat</code> вашей модели. Это свойство определяет, как атрибуты времени будут храниться в базе данных, а также задаёт их формат при сериализации модели в массив или JSON:</p><pre><code>class Post extends Model
{
    /**
     * @var string
     */
    protected $dateFormat = &#39;U&#39;;
}
</code></pre><h4 id="json-атрибуты"><a href="#json-атрибуты" class="header-anchor">#</a> JSON атрибуты</h4><p>Значения указанных в свойстве <code>$jsonable</code> атрибутов кодируются в JSON перед сохранением и преобразуются в массивы после получения из базы данных:</p><pre><code>class Post extends Model
{
    /**
     * @var array
     */
    protected $jsonable = [&#39;data&#39;];
}
</code></pre><p><a name="retrieving-multiple-models" class="anchor"></a></p><h2 id="получение-нескольких-моделеи"><a href="#получение-нескольких-моделеи" class="header-anchor">#</a> Получение нескольких моделей</h2><p>После создания модели и <a href="./../database/structure.html#migration-structure">связанной с ней таблицы</a>, вы можете начать получать значения из вашей базы данных. Каждая модель представляет собой мощный <a href="./../database/query.html">конструктор запросов</a>, позволяющий удобно выполнять запросы к связанной таблице. Например:</p><pre><code>$flights = Flight::all();
</code></pre><h4 id="доступ-к-значениям-столбцов"><a href="#доступ-к-значениям-столбцов" class="header-anchor">#</a> Доступ к значениям столбцов</h4><p>Если у вас есть экземпляр модели, Вы можете обращаться к значениям столбцов модели, обращаясь к соответствующим свойствам. Например, давайте пройдёмся по каждому экземпляру Flight, возвращённому нашим запросом, и выведем значение столбца <code>name</code>:</p><pre><code>foreach ($flights as $flight) {
    echo $flight-&gt;name;
}
</code></pre><h4 id="добавление-дополнительных-ограничении"><a href="#добавление-дополнительных-ограничении" class="header-anchor">#</a> Добавление дополнительных ограничений</h4><p>Метод <code>all</code> возвращает все результаты из таблицы модели. Поскольку каждая модель работает как <a href="./../database/query.html">конструктор запросов</a>, Вы можете также добавить ограничения в запрос, а затем использовать метод <code>get</code> для получения результатов:</p><pre><code>$flights = Flight::where(&#39;active&#39;, 1)
    -&gt;orderBy(&#39;name&#39;, &#39;desc&#39;)
    -&gt;take(10)
    -&gt;get();
</code></pre><blockquote><p><strong>Примечание:</strong> Все методы, доступные в конструкторе запросов, также доступны при работе с моделями. Вы можете использовать любой из них.</p></blockquote><h4 id="коллекции"><a href="#коллекции" class="header-anchor">#</a> Коллекции</h4><p>Такие методы, как <code>all</code> и <code>get</code>, которые получают несколько результатов, возвращают экземпляр <code>Collection</code>. Этот класс предоставляет большое количество <a href="./../database/collection.html">полезных методов</a> для работы с результатами запроса. Само собой, Вы можете просто перебирать такую коллекцию в цикле как массив:</p><pre><code>foreach ($flights as $flight) {
    echo $flight-&gt;name;
}
</code></pre><h4 id="разделение-результата-на-блоки"><a href="#разделение-результата-на-блоки" class="header-anchor">#</a> Разделение результата на блоки</h4><p>Если вам нужно обработать тысячи записей, используйте команду <code>chunk</code> (блок — прим. пер.). Метод <code>chunk</code> получает модель частями, передавая их в <code>Closure</code> для обработки. Использование этого метода уменьшает используемый объём оперативной памяти:</p><pre><code>Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
</code></pre><p>Первый передаваемый в метод аргумент — число записей, получаемых в одном &quot;блоке&quot;. Передаваемая в качестве второго аргумента функция будет вызываться для каждого блока, получаемого из БД.</p><p><a name="retrieving-single-models" class="anchor"></a></p><h2 id="получение-одиночных-моделеи-агрегатные-функции"><a href="#получение-одиночных-моделеи-агрегатные-функции" class="header-anchor">#</a> Получение одиночных моделей / агрегатные функции</h2><p>Кроме получения всех записей указанной таблицы Вы можете также получить конкретные записи при помощи методов <code>find</code> и <code>first</code>. Вместо коллекции моделей эти методы возвращают один экземпляр модели:</p><pre><code>// Retrieve a model by its primary key
$flight = Flight::find(1);

// Retrieve the first model matching the query constraints
$flight = Flight::where(&#39;active&#39;, 1)-&gt;first();
</code></pre><h4 id="исключения-«не-наидено»"><a href="#исключения-«не-наидено»" class="header-anchor">#</a> Исключения «Не найдено»</h4><p>Иногда вам нужно возбудить исключение, если определённая модель не была найдена. Например в маршрутах или контроллерах. Методы <code>findOrFail</code> и <code>firstOrFail</code> получают первый результат запроса. А если результатов нет, то происходит исключение Illuminate\\Database\\Eloquent\\ModelNotFoundException:</p><pre><code>$model = Flight::findOrFail(1);

$model = Flight::where(&#39;legs&#39;, &#39;&gt;&#39;, 100)-&gt;firstOrFail();
</code></pre><p>Если исключение не поймано, пользователю автоматически посылается HTTP-отклик 404, поэтому нет необходимости писать явные проверки для возврата откликов 404 при использовании этих методов:</p><pre><code>Route::get(&#39;/api/flights/{id}&#39;, function ($id) {
    return Flight::findOrFail($id);
});
</code></pre><p><a name="retrieving-aggregates" class="anchor"></a></p><h3 id="агрегатные-функции"><a href="#агрегатные-функции" class="header-anchor">#</a> Агрегатные функции</h3><p>Вы также можете использовать агрегатные функции конструктора запросов, такие как <code>count</code>, <code>max</code>, <code>sum</code> и <a href="./../database/query.html#aggregates">другие</a>. Эти методы возвращают соответствующее скалярное значение вместо полного экземпляра модели:</p><pre><code>$count = Flight::where(&#39;active&#39;, 1)-&gt;count();

$max = Flight::where(&#39;active&#39;, 1)-&gt;max(&#39;price&#39;);
</code></pre><p><a name="inserting-and-updating-models" class="anchor"></a></p><h2 id="вставка-и-изменение-моделеи"><a href="#вставка-и-изменение-моделеи" class="header-anchor">#</a> Вставка и изменение моделей</h2><p><a name="basic-inserts" class="anchor"></a></p><h3 id="простые-вставки"><a href="#простые-вставки" class="header-anchor">#</a> Простые вставки</h3><p>Для создания новой записи в БД просто создайте экземпляр модели, задайте атрибуты модели и вызовите метод <code>save</code>: $flight = new Flight; $flight-&gt;name = &#39;Sydney to Canberra&#39;; $flight-&gt;save();</p><p>В этом примере мы просто создали экземпляр модели <code>Flight</code> и присвоили значение параметру <code>name</code>. При вызове метода <code>save</code> запись будет вставлена в таблицу. Отметки времени <code>created_at</code> и <code>updated_at</code> будут автоматически установлены, поэтому их не надо указывать вручную.</p><p><a name="basic-updates" class="anchor"></a></p><h3 id="простые-изменения"><a href="#простые-изменения" class="header-anchor">#</a> Простые изменения</h3><p>Метод <code>save</code> можно использовать и для изменения существующей модели в БД. Для изменения модели сначала Вам нужно получить её, далее изменить необходимые атрибуты и вызвать метод <code>save</code>. Отметка времени <code>updated_at</code> будет установлена автоматически, поэтому её не надо задавать вручную:</p><pre><code>$flight = Flight::find(1);
$flight-&gt;name = &#39;Darwin to Adelaide&#39;;
$flight-&gt;save();
</code></pre><p>Изменения можно выполнить для нескольких моделей, которые соответствуют указанному запросу. В этом примере все рейсы, которые отмечены как <code>active</code> и имеют <code>destination</code> равное <code>San Diego</code>, будут отмечены как delayed:</p><pre><code>Flight::where(&#39;is_active&#39;, true)
    -&gt;where(&#39;destination&#39;, &#39;Perth&#39;)
    -&gt;update([&#39;delayed&#39; =&gt; true]);
</code></pre><p>Метод <code>update</code> ожидает массив пар столбец/значение, обозначающий, какие столбцы нужно изменить.</p><p><a name="mass-assignment" class="anchor"></a></p><h3 id="массовое-заполнение"><a href="#массовое-заполнение" class="header-anchor">#</a> Массовое заполнение</h3><p>Вы также можете использовать метод <code>create</code> для создания и сохранения модели одной строкой. Метод вернёт добавленную модель. Однако перед этим вам нужно определить либо свойство <code>fillable</code>, либо <code>guarded</code> в классе модели, так как изначально все модели защищены от массового заполнения.</p><p>Уязвимость массового заполнения проявляется, когда пользователь передаёт с помощью запроса неподходящий HTTP-параметр, и вы не ожидаете, что этот параметр изменит столбец в вашей БД. Например, злоумышленник может послать в HTTP-запросе параметр <code>is_admin</code>, который затем применяется к методу <code>create</code> вашей модели, позволяя пользователю повысить свои привилегии до администратора.</p><p>Поэтому, для начала нужно определить, для каких атрибутов разрешить массовое заполнение. Это делается с помощью свойства модели <code>$fillable</code>. Например, давайте разрешим массовое назначение атрибута <code>name</code> нашей модели <code>Flight</code>:</p><pre><code>class Flight extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [&#39;name&#39;];
}
</code></pre><p>Теперь мы можем использовать метод <code>create</code> для вставки новой записи в базу данных. Метод <code>create</code> возвращает сохранённый экземпляр модели:</p><pre><code>$flight = Flight::create([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><p>Параметр <code>$fillable</code> служит «белым списком» атрибутов, для которых разрешено массовое назначение. А параметр <code>$guarded</code> служит «чёрным списком». Параметр <code>$guarded</code> должен содержать массив атрибутов, для которых будет запрещено массовое назначение. Атрибутам, не вошедшим в этот массив, будет разрешено массовое назначение. Само собой, вы должны использовать только один из этих параметров:</p><pre><code>class Flight extends Model
{
    /**
     * The attributes that aren&#39;t mass assignable.
     *
     * @var array
     */
    protected $guarded = [&#39;price&#39;];
}
</code></pre><p>В этом примере всем атрибутам <strong>кроме <code>price</code></strong> разрешено массовое назначение.</p><p>Вы также можете запретить массовое заполнение всем атрибутам, используя символ <code>*</code>.</p><h4 id="другие-методы-создания"><a href="#другие-методы-создания" class="header-anchor">#</a> Другие методы создания</h4><p>Возможно, когда-нибудь Вам понадобится создать модель без ее сохранения. Для этого можно использовать метод <code>make</code>.</p><pre><code>$flight = Flight::make([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);

// Functionally the same as...
$flight = new Flight;
$flight-&gt;fill([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><p>Существует ещё два метода, которые можно использовать для создания моделей с помощью массового заполнения: <code>firstOrCreate</code> и <code>firstOrNew</code>. Метод <code>firstOrCreate</code> пытается найти запись БД, используя указанные пары столбец/значение. Если модель не найдена в БД, запись будет вставлена в БД с указанными атрибутами.</p><p>Метод <code>firstOrNew</code> как и <code>firstOrCreate</code> пытается найти в БД запись, соответствующую указанным атрибутам. Однако если модель не найдена, будет возвращён новый экземпляр модели. Учтите, что эта модель ещё не помещена в БД. Вам надо вызвать метод <code>save</code> вручную, чтобы сохранить её:</p><pre><code>// Получить рейс по атрибутам или создать его, если он не существует
$flight = Flight::firstOrCreate([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);

// Получить рейс по атрибутам, или создать новый экземпляр
$flight = Flight::firstOrNew([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><p><a name="deleting-models" class="anchor"></a></p><h2 id="удаление-моделеи"><a href="#удаление-моделеи" class="header-anchor">#</a> Удаление моделей</h2><p>Используйте метод <code>delete</code>, чтобы удалить модель:</p><pre><code>$flight = Flight::find(1);

$flight-&gt;delete();
</code></pre><h4 id="удаление-модели-по-ключу"><a href="#удаление-модели-по-ключу" class="header-anchor">#</a> Удаление модели по ключу</h4><p>В предыдущем примере мы получили модель из БД перед вызовом метода <code>delete</code>. Но если вы знаете первичный ключ модели, вы можете удалить модель, не получая её. Для этого вызовите метод <code>destroy</code>:</p><pre><code>Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
</code></pre><h4 id="удаление-модели-запросом"><a href="#удаление-модели-запросом" class="header-anchor">#</a> Удаление модели запросом</h4><p>Вы также можете выполнить запрос на удаление на наборе моделей. В следующем примере мы удалим все неактивные рейсы:</p><pre><code>$deletedRows = Flight::where(&#39;active&#39;, 0)-&gt;delete();
</code></pre><blockquote><p><strong>Примечание</strong>: Важно отметить, что при таком способе удаления <a href="#model-events">события</a> не сработают.</p></blockquote><p><a name="query-scopes" class="anchor"></a></p><h2 id="ограничения-запросов"><a href="#ограничения-запросов" class="header-anchor">#</a> Ограничения запросов</h2><p>Ограничения позволяют Вам определить набор условий, который Вы можете использовать в приложении. Например, если Вам часто требуется получать пользователей, которые сейчас «популярны». Для создания заготовки просто начните имя метода с префикса <code>scope</code>:</p><pre><code>class User extends Model
{
    /**
     * Scope a query to only include popular users.
     */
    public function scopePopular($query)
    {
        return $query-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100);
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query-&gt;where(&#39;is_active&#39;, 1);
    }
}
</code></pre><h4 id="использование-ограничении-запросов"><a href="#использование-ограничении-запросов" class="header-anchor">#</a> Использование ограничений запросов</h4><p>Когда Вы определили ограничения, то можете вызывать нужный метод при запросах к модели. Но теперь Вам не нужно использовать префикс <code>scope</code>, например:</p><pre><code>$users = User::popular()-&gt;active()-&gt;orderBy(&#39;created_at&#39;)-&gt;get();
</code></pre><p>Вы даже можете сцеплять вызовы разных ограничений.</p><h4 id="динамические-ограничения"><a href="#динамические-ограничения" class="header-anchor">#</a> Динамические ограничения</h4><p>Иногда Вам может потребоваться определить ограничения, которые принимают параметры. Для этого, просто, добавьте нужные параметры в метод после аргумента <code>$query</code>:</p><pre><code>class User extends Model
{
    /**
     * Пример запроса пользователей определённого типа.
     */
    public function scopeApplyType($query, $type)
    {
        return $query-&gt;where(&#39;type&#39;, $type);
    }
}
</code></pre><p>А затем передайте их при вызове метода:</p><pre><code>$users = User::applyType(&#39;admin&#39;)-&gt;get();
</code></pre><p><a name="events" class="anchor"></a></p><h2 id="события"><a href="#события" class="header-anchor">#</a> События</h2><p>События позволяют вам легко выполнять код при каждом сохранении, удалении или изменении класса конкретной модели в базе данных. Доступны следующие методы:</p><div class="table"><table tabindex="0"><thead><tr><th>Event</th><th>Description</th></tr></thead><tbody><tr><td><strong>beforeCreate</strong></td><td>перед сохранением модели (при создании).</td></tr><tr><td><strong>afterCreate</strong></td><td>после сохранения модели (при создании).</td></tr><tr><td><strong>beforeSave</strong></td><td>перед сохранением модели (при создании или обновлении).</td></tr><tr><td><strong>afterSave</strong></td><td>после сохранения модели (при создании или обновлении).</td></tr><tr><td><strong>beforeValidate</strong></td><td>перед валидацией модели.</td></tr><tr><td><strong>afterValidate</strong></td><td>после валидации модели.</td></tr><tr><td><strong>beforeUpdate</strong></td><td>перед обновлением модели.</td></tr><tr><td><strong>afterUpdate</strong></td><td>после обновления модели.</td></tr><tr><td><strong>beforeDelete</strong></td><td>перед удалением модели.</td></tr><tr><td><strong>afterDelete</strong></td><td>после удаления модели.</td></tr><tr><td><strong>beforeRestore</strong></td><td>перед восстановлением модели.</td></tr><tr><td><strong>afterRestore</strong></td><td>после восстановления модели.</td></tr><tr><td><strong>beforeFetch</strong></td><td>перед заполнением модели.</td></tr><tr><td><strong>afterFetch</strong></td><td>после заполнения модели.</td></tr></tbody></table></div><p>Пример:</p><pre><code>/**
 * Генерируем URL
 */
public function beforeCreate()
{
    $this-&gt;slug = Str::slug($this-&gt;name);
}
</code></pre><p><a name="basic-usage" class="anchor"></a></p><h3 id="основы-использования"><a href="#основы-использования" class="header-anchor">#</a> Основы использования</h3><p>Когда новая модель сохраняется впервые, возникают события <code>beforeCreate</code> и <code>afterCreate</code>. Если модель уже существовала на момент вызова метода <code>save</code>, вызываются события <code>beforeUpdate</code> / <code>afterUpdate</code>. В обоих случаях также возникнут события <code>beforeSave</code> / <code>afterSave</code>.</p><p>Например, давайте определим слушателя событий, заполняющий атрибут <code>slug</code> при создании модели:</p><pre><code>/**
 * Генерируем URL
 */
public function beforeCreate()
{
    $this-&gt;slug = Str::slug($this-&gt;name);
}
</code></pre><p>Если обработчики <code>creating</code>, <code>updating</code>, <code>saving</code> или <code>deleting</code> вернут значение false, то действие будет отменено:</p><pre><code>public function beforeCreate()
{
    if (!$user-&gt;isValid()) {
        return false;
    }
}
</code></pre><p>Вы можете использовать метод <code>bindEvent</code>, чтобы связать <a href="./../services/events.html">локальные события</a> с экземпляром модели. Название метода должно быть таким же, как и название переопределяемого метода с префиксом <code>model.</code>.</p><pre><code>$flight = new Flight;
$flight-&gt;bindEvent(&#39;model.beforeCreate&#39;, function() use ($model) {
    $model-&gt;slug = Str::slug($model-&gt;name);
})
</code></pre><p><a name="extending-models" class="anchor"></a></p><h2 id="расширение-моделеи"><a href="#расширение-моделеи" class="header-anchor">#</a> Расширение моделей</h2><p>Так как модели имеют <a href="./../services/behaviors.html">поведение</a>, то они могут быть расширены при помощи метода <code>extend()</code>. Пример:</p><pre><code>User::extend(function($model) {
    $model-&gt;hasOne[&#39;author&#39;] = [&#39;Author&#39;, &#39;key&#39; =&gt; &#39;user_id&#39;];
});

User::extend(function($model) {
    $model-&gt;bindEvent(&#39;model.beforeSave&#39;, function() use ($model) {
        // ...
    });
});
</code></pre>`,129))])}const y=l(h,[["render",p]]);export{b as __pageData,y as default};
