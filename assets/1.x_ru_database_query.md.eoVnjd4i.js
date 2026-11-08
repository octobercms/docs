import{_ as n,r,o as a,c,e as t,a as o,s as d}from"./chunks/framework.CXcwiNg-.js";const k=JSON.parse(`{"title":"Запросы к базе данных - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Получение результатов","slug":"получение-результатов","link":"#получение-результатов","children":[{"level":4,"title":"Получение всех строк из таблицы","slug":"получение-всех-строк-из-таблицы","link":"#получение-всех-строк-из-таблицы","children":[]},{"level":4,"title":"Получение одной записи","slug":"получение-однои-записи","link":"#получение-однои-записи","children":[]},{"level":4,"title":"Получение одного поля из записей","slug":"получение-одного-поля-из-записеи","link":"#получение-одного-поля-из-записеи","children":[]},{"level":4,"title":"Обработка большого объема данных","slug":"обработка-большого-объема-данных","link":"#обработка-большого-объема-данных","children":[]},{"level":4,"title":"Получение списка всех значений одного поля","slug":"получение-списка-всех-значении-одного-поля","link":"#получение-списка-всех-значении-одного-поля","children":[]},{"level":3,"title":"Аггрегатные функции","slug":"аггрегатные-функции","link":"#аггрегатные-функции","children":[]}]},{"level":2,"title":"Выборки (SELECT)","slug":"выборки-select","link":"#выборки-select","children":[{"level":4,"title":"Указание выбора","slug":"указание-выбора","link":"#указание-выбора","children":[]},{"level":4,"title":"Использование сырого выражения","slug":"использование-сырого-выражения","link":"#использование-сырого-выражения","children":[]}]},{"level":2,"title":"Объединения (JOIN)","slug":"объединения-join","link":"#объединения-join","children":[{"level":4,"title":"Объединение типа INNER JOIN","slug":"объединение-типа-inner-join","link":"#объединение-типа-inner-join","children":[]},{"level":4,"title":"Объединение типа LEFT JOIN","slug":"объединение-типа-left-join","link":"#объединение-типа-left-join","children":[]},{"level":4,"title":"Расширенное объединение","slug":"расширенное-объединение","link":"#расширенное-объединение","children":[]}]},{"level":2,"title":"Слияния (UNION)","slug":"слияния-union","link":"#слияния-union","children":[]},{"level":2,"title":"Выражения с WHERE","slug":"выражения-с-where","link":"#выражения-с-where","children":[{"level":4,"title":"Простой пример","slug":"простои-пример","link":"#простои-пример","children":[]},{"level":4,"title":"Условия ИЛИ:","slug":"условия-или","link":"#условия-или","children":[]},{"level":4,"title":"Фильтрация по интервалу значений","slug":"фильтрация-по-интервалу-значении","link":"#фильтрация-по-интервалу-значении","children":[]},{"level":4,"title":"Фильтрация по совпадению с массивом значений","slug":"фильтрация-по-совпадению-с-массивом-значении","link":"#фильтрация-по-совпадению-с-массивом-значении","children":[]},{"level":4,"title":"Поиск неустановленных значений (NULL)","slug":"поиск-неустановленных-значении-null","link":"#поиск-неустановленных-значении-null","children":[]}]},{"level":2,"title":"Сложные выражения с WHERE","slug":"сложные-выражения-с-where","link":"#сложные-выражения-с-where","children":[{"level":4,"title":"Группировка условий","slug":"группировка-условии","link":"#группировка-условии","children":[]},{"level":4,"title":"Проверка на существование","slug":"проверка-на-существование","link":"#проверка-на-существование","children":[]}]},{"level":2,"title":"Сортировка, группировка, ограничение и смещение","slug":"сортировка-группировка-ограничение-и-смещение","link":"#сортировка-группировка-ограничение-и-смещение","children":[{"level":4,"title":"Сортировка","slug":"сортировка","link":"#сортировка","children":[]},{"level":4,"title":"Группировка","slug":"группировка","link":"#группировка","children":[]},{"level":4,"title":"Ограничение и смещение","slug":"ограничение-и-смещение","link":"#ограничение-и-смещение","children":[]}]},{"level":2,"title":"Вставка (INSERT)","slug":"вставка-insert","link":"#вставка-insert","children":[{"level":4,"title":"Вставка нескольких записей одновременно","slug":"вставка-нескольких-записеи-одновременно","link":"#вставка-нескольких-записеи-одновременно","children":[]},{"level":4,"title":"Вставка записи и получение её нового ID","slug":"вставка-записи-и-получение-ее-нового-id","link":"#вставка-записи-и-получение-ее-нового-id","children":[]}]},{"level":2,"title":"Обновление (UPDATE)","slug":"обновление-update","link":"#обновление-update","children":[{"level":4,"title":"Обновление записей в таблице","slug":"обновление-записеи-в-таблице","link":"#обновление-записеи-в-таблице","children":[]},{"level":4,"title":"Увеличение или уменьшение значения поля","slug":"увеличение-или-уменьшение-значения-поля","link":"#увеличение-или-уменьшение-значения-поля","children":[]}]},{"level":2,"title":"Удаление (DELETE)","slug":"удаление-delete","link":"#удаление-delete","children":[{"level":4,"title":"Удаление всех записей","slug":"удаление-всех-записеи","link":"#удаление-всех-записеи","children":[]},{"level":4,"title":"Удаление записей из таблицы","slug":"удаление-записеи-из-таблицы","link":"#удаление-записеи-из-таблицы","children":[]},{"level":4,"title":"Очистка таблицы","slug":"очистка-таблицы","link":"#очистка-таблицы","children":[]}]},{"level":2,"title":"Блокирование (lock) данных","slug":"блокирование-lock-данных","link":"#блокирование-lock-данных","children":[{"level":4,"title":"SELECT с 'shared lock':","slug":"select-с-shared-lock","link":"#select-с-shared-lock","children":[]},{"level":4,"title":"SELECT с 'lock for update':","slug":"select-с-lock-for-update","link":"#select-с-lock-for-update","children":[]}]},{"level":2,"title":"Кэширование запросов","slug":"кэширование-запросов","link":"#кэширование-запросов","children":[]}],"relativePath":"1.x/ru/database/query.md","filePath":"1.x/ru/database/query.md"}`),h={name:"1.x/ru/database/query.md"};function i(g,e,u,p,b,f){const s=r("pre-heading"),l=r("post-heading");return a(),c("div",null,[t(s),e[0]||(e[0]=o("h1",null,"Запросы к базе данных",-1)),t(l),e[1]||(e[1]=d(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Query Builder - конструктор запросов - предоставляет удобный, выразительный интерфейс для создания и выполнения запросов к базе данных. Он может использоваться для выполнения большинства типов операций и работает со всеми подерживаемыми СУБД.</p><blockquote><p><strong>Примечание:</strong> конструктор запросов использует средства PDO для защиты вашего приложения от SQL-инъекций. Нет необходимости экранировать строки перед их передачей в запрос.</p></blockquote><p><a name="retrieving-results" class="anchor"></a></p><h2 id="получение-результатов"><a href="#получение-результатов" class="header-anchor">#</a> Получение результатов</h2><h4 id="получение-всех-строк-из-таблицы"><a href="#получение-всех-строк-из-таблицы" class="header-anchor">#</a> Получение всех строк из таблицы</h4><p>Давайте получим все записи из таблицы при помощи метода <code>get</code>. Для этого используем метод <code>table</code> из фасада <code>Db</code>, который вернет экземпляр конструктора запросов, позволяя Вам добавлять остальные методы друг за другом и затем, наконец, получить результат:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;get();
</code></pre><p>Как и <a href="./../database/basics.html#running-queries">сырые SQL-запросы</a>, метод <code>get</code> возвращает массив с результатами, элементы которого являются экземплярами объекта PHP <code>stdClass</code>. Вы можете получить доступ к значению каждого столбца, обратившись к нему как свойству объекта:</p><pre><code>foreach ($users as $user) {
    echo $user-&gt;name;
}
</code></pre><h4 id="получение-однои-записи"><a href="#получение-однои-записи" class="header-anchor">#</a> Получение одной записи</h4><pre><code>$user = Db::table(&#39;users&#39;)-&gt;where(&#39;name&#39;, &#39;John&#39;)-&gt;first();

echo $user-&gt;name;
</code></pre><h4 id="получение-одного-поля-из-записеи"><a href="#получение-одного-поля-из-записеи" class="header-anchor">#</a> Получение одного поля из записей</h4><pre><code>$email = Db::table(&#39;users&#39;)-&gt;where(&#39;name&#39;, &#39;John&#39;)-&gt;pluck(&#39;email&#39;);
</code></pre><h4 id="обработка-большого-объема-данных"><a href="#обработка-большого-объема-данных" class="header-anchor">#</a> Обработка большого объема данных</h4><p>Если Вам нужно обработать тысячи записей базы данных, используйте метод <code>chunk</code>, который извлекает несколько строк за раз и передает их в <code>Closure</code> для обработки. Пример:</p><pre><code>Db::table(&#39;users&#39;)-&gt;chunk(100, function($users) {
    foreach ($users as $user) {
        //
    }
});
</code></pre><p>Вы можете остановить извлечение строк при помощи <code>return false</code> в <code>Closure</code>:</p><pre><code>Db::table(&#39;users&#39;)-&gt;chunk(100, function($users) {
    // Process the records...

    return false;
});
</code></pre><h4 id="получение-списка-всех-значении-одного-поля"><a href="#получение-списка-всех-значении-одного-поля" class="header-anchor">#</a> Получение списка всех значений одного поля</h4><p>Используйте метод <code>lists</code>, чтобы вернуть массив значений одного поля:</p><pre><code>$titles = Db::table(&#39;roles&#39;)-&gt;lists(&#39;title&#39;);

foreach ($titles as $title) {
    echo $title;
}
</code></pre><p>Вы можете указать произвольный ключ для возвращаемого массива:</p><pre><code>$roles = Db::table(&#39;roles&#39;)-&gt;lists(&#39;title&#39;, &#39;name&#39;);

foreach ($roles as $name =&gt; $title) {
    echo $title;
}
</code></pre><p><a name="aggregates" class="anchor"></a></p><h3 id="аггрегатные-функции"><a href="#аггрегатные-функции" class="header-anchor">#</a> Аггрегатные функции</h3><p>Конструктор запросов содержит множество аггрегатных методов, таких как <code>count</code>, <code>max</code>, <code>min</code>, <code>avg</code> и <code>sum</code>.</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;count();

$price = Db::table(&#39;orders&#39;)-&gt;max(&#39;price&#39;);
</code></pre><p>Вы также можете комбинировать эти методы с другими:</p><pre><code>$price = Db::table(&#39;orders&#39;)
    -&gt;where(&#39;is_finalized&#39;, 1)
    -&gt;avg(&#39;price&#39;);
</code></pre><p><a name="selects" class="anchor"></a></p><h2 id="выборки-select"><a href="#выборки-select" class="header-anchor">#</a> Выборки (SELECT)</h2><h4 id="указание-выбора"><a href="#указание-выбора" class="header-anchor">#</a> Указание выбора</h4><p>Вы можете использовать метод <code>select</code>, чтобы выбрать только те данные, которые Вам нужны:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;select(&#39;name&#39;, &#39;email as user_email&#39;)-&gt;get();
</code></pre><p>Метод <code>distinct</code> позволяет принудительно возвращать результаты запроса:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;distinct()-&gt;get();
</code></pre><p>Используйье метод <code>addSelect</code>, чтобы добавить еще один столбец в конструктор запросов:</p><pre><code>$query = Db::table(&#39;users&#39;)-&gt;select(&#39;name&#39;);

$users = $query-&gt;addSelect(&#39;age&#39;)-&gt;get();
</code></pre><h4 id="использование-сырого-выражения"><a href="#использование-сырого-выражения" class="header-anchor">#</a> Использование сырого выражения</h4><p>Используйте метод <code>Db::raw</code>, чтобы добавить уже готовое SQL-выражение в ваш запрос:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;select(Db::raw(&#39;count(*) as user_count, status&#39;))
    -&gt;where(&#39;status&#39;, &#39;&lt;&gt;&#39;, 1)
    -&gt;groupBy(&#39;status&#39;)
    -&gt;get();
</code></pre><p><a name="joins" class="anchor"></a></p><h2 id="объединения-join"><a href="#объединения-join" class="header-anchor">#</a> Объединения (JOIN)</h2><h4 id="объединение-типа-inner-join"><a href="#объединение-типа-inner-join" class="header-anchor">#</a> Объединение типа INNER JOIN</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)
    -&gt;join(&#39;orders&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;orders.user_id&#39;)
    -&gt;select(&#39;users.*&#39;, &#39;contacts.phone&#39;, &#39;orders.price&#39;)
    -&gt;get();
</code></pre><h4 id="объединение-типа-left-join"><a href="#объединение-типа-left-join" class="header-anchor">#</a> Объединение типа LEFT JOIN</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;leftJoin(&#39;posts&#39;, &#39;users.id&#39;, &#39;=&#39;, &#39;posts.user_id&#39;)
    -&gt;get();
</code></pre><h4 id="расширенное-объединение"><a href="#расширенное-объединение" class="header-anchor">#</a> Расширенное объединение</h4><p>Вы можете указать более сложные условия:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, function ($join) {
        $join-&gt;on(&#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)-&gt;orOn(...);
    })
    -&gt;get();
</code></pre><p>Внутри join() можно использовать <code>where</code> и <code>orWhere</code>:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;join(&#39;contacts&#39;, function ($join) {
        $join-&gt;on(&#39;users.id&#39;, &#39;=&#39;, &#39;contacts.user_id&#39;)
            -&gt;where(&#39;contacts.user_id&#39;, &#39;&gt;&#39;, 5);
    })
    -&gt;get();
</code></pre><p><a name="unions" class="anchor"></a></p><h2 id="слияния-union"><a href="#слияния-union" class="header-anchor">#</a> Слияния (UNION)</h2><p>Конструктор запросов позволяет создавать слияния двух запросов вместе:</p><pre><code>$first = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;first_name&#39;);

$users = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;last_name&#39;)
    -&gt;union($first)
    -&gt;get();
</code></pre><p>Также существует метод <code>unionAll</code> с аналогичными параметрами.</p><p><a name="where-clauses" class="anchor"></a></p><h2 id="выражения-с-where"><a href="#выражения-с-where" class="header-anchor">#</a> Выражения с WHERE</h2><h4 id="простои-пример"><a href="#простои-пример" class="header-anchor">#</a> Простой пример</h4><pre><code>$users = Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;=&#39;, 100)-&gt;get();
</code></pre><p>или</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, 100)-&gt;get();
</code></pre><p>Вы также можете использовать другие операторы сравнения:</p><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&gt;=&#39;, 100)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&lt;&gt;&#39;, 100)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;name&#39;, &#39;like&#39;, &#39;T%&#39;)
    -&gt;get();
</code></pre><h4 id="условия-или"><a href="#условия-или" class="header-anchor">#</a> Условия ИЛИ:</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)
    -&gt;orWhere(&#39;name&#39;, &#39;John&#39;)
    -&gt;get();
</code></pre><h4 id="фильтрация-по-интервалу-значении"><a href="#фильтрация-по-интервалу-значении" class="header-anchor">#</a> Фильтрация по интервалу значений</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereBetween(&#39;votes&#39;, [1, 100])-&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;whereNotBetween(&#39;votes&#39;, [1, 100])
    -&gt;get();
</code></pre><h4 id="фильтрация-по-совпадению-с-массивом-значении"><a href="#фильтрация-по-совпадению-с-массивом-значении" class="header-anchor">#</a> Фильтрация по совпадению с массивом значений</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereIn(&#39;id&#39;, [1, 2, 3])
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;whereNotIn(&#39;id&#39;, [1, 2, 3])
    -&gt;get();
</code></pre><h4 id="поиск-неустановленных-значении-null"><a href="#поиск-неустановленных-значении-null" class="header-anchor">#</a> Поиск неустановленных значений (NULL)</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;whereNull(&#39;updated_at&#39;)
    -&gt;get();

$users = Db::table(&#39;users&#39;)
    -&gt;whereNotNull(&#39;updated_at&#39;)
    -&gt;get();
</code></pre><p><a name="advanced-where-clauses" class="anchor"></a></p><h2 id="сложные-выражения-с-where"><a href="#сложные-выражения-с-where" class="header-anchor">#</a> Сложные выражения с WHERE</h2><h4 id="группировка-условии"><a href="#группировка-условии" class="header-anchor">#</a> Группировка условий</h4><p>Иногда вам нужно сделать выборку по более сложным параметрам, таким как &quot;существует ли&quot; или вложенная группировка условий. Конструктор запросов справится и с этим:</p><pre><code>Db::table(&#39;users&#39;)
    -&gt;where(&#39;name&#39;, &#39;=&#39;, &#39;John&#39;)
    -&gt;orWhere(function ($query) {
        $query-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)
            -&gt;where(&#39;title&#39;, &#39;&lt;&gt;&#39;, &#39;Admin&#39;);
    })
    -&gt;get();
</code></pre><p>Команда выше выполнит такой SQL:</p><pre><code>select * from users where name = &#39;John&#39; or (votes &gt; 100 and title &lt;&gt; &#39;Admin&#39;)
</code></pre><h4 id="проверка-на-существование"><a href="#проверка-на-существование" class="header-anchor">#</a> Проверка на существование</h4><pre><code>Db::table(&#39;users&#39;)
    -&gt;whereExists(function ($query) {
        $query-&gt;select(Db::raw(1))
            -&gt;from(&#39;orders&#39;)
            -&gt;whereRaw(&#39;orders.user_id = users.id&#39;);
    })
    -&gt;get();
</code></pre><p>Эта команда выше выполнит такой запрос:</p><pre><code>select * from users where exists (
    select 1 from orders where orders.user_id = users.id
)
</code></pre><p><a name="ordering-grouping-limit-and-offset" class="anchor"></a></p><h2 id="сортировка-группировка-ограничение-и-смещение"><a href="#сортировка-группировка-ограничение-и-смещение" class="header-anchor">#</a> Сортировка, группировка, ограничение и смещение</h2><h4 id="сортировка"><a href="#сортировка" class="header-anchor">#</a> Сортировка</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;orderBy(&#39;name&#39;, &#39;desc&#39;) // \`asc\` или \`desc\`
    -&gt;get();
</code></pre><h4 id="группировка"><a href="#группировка" class="header-anchor">#</a> Группировка</h4><pre><code>$users = Db::table(&#39;users&#39;)
    -&gt;groupBy(&#39;account_id&#39;)
    -&gt;having(&#39;account_id&#39;, &#39;&gt;&#39;, 100) // также как в where
    -&gt;get();

$users = Db::table(&#39;orders&#39;)
    -&gt;select(&#39;department&#39;, Db::raw(&#39;SUM(price) as total_sales&#39;))
    -&gt;groupBy(&#39;department&#39;)
    -&gt;havingRaw(&#39;SUM(price) &gt; 2500&#39;)
    -&gt;get();
</code></pre><h4 id="ограничение-и-смещение"><a href="#ограничение-и-смещение" class="header-anchor">#</a> Ограничение и смещение</h4><pre><code>$users = Db::table(&#39;users&#39;)-&gt;skip(10)-&gt;take(5)-&gt;get();
</code></pre><p><a name="inserts" class="anchor"></a></p><h2 id="вставка-insert"><a href="#вставка-insert" class="header-anchor">#</a> Вставка (INSERT)</h2><p>####Вставка записи в таблицу</p><pre><code>Db::table(&#39;users&#39;)-&gt;insert(
    [&#39;email&#39; =&gt; &#39;john@example.com&#39;, &#39;votes&#39; =&gt; 0]
);
</code></pre><h4 id="вставка-нескольких-записеи-одновременно"><a href="#вставка-нескольких-записеи-одновременно" class="header-anchor">#</a> Вставка нескольких записей одновременно</h4><pre><code>Db::table(&#39;users&#39;)-&gt;insert([
    [&#39;email&#39; =&gt; &#39;taylor@example.com&#39;, &#39;votes&#39; =&gt; 0],
    [&#39;email&#39; =&gt; &#39;dayle@example.com&#39;, &#39;votes&#39; =&gt; 0]
]);
</code></pre><h4 id="вставка-записи-и-получение-ее-нового-id"><a href="#вставка-записи-и-получение-ее-нового-id" class="header-anchor">#</a> Вставка записи и получение её нового ID</h4><p>Если таблица имеет автоинкрементный индекс, то можно использовать метод <code>insertGetId</code> для вставки записи и получения её порядкового номера:</p><pre><code>$id = Db::table(&#39;users&#39;)-&gt;insertGetId(
    [&#39;email&#39; =&gt; &#39;john@example.com&#39;, &#39;votes&#39; =&gt; 0]
);
</code></pre><p><a name="updates" class="anchor"></a></p><h2 id="обновление-update"><a href="#обновление-update" class="header-anchor">#</a> Обновление (UPDATE)</h2><h4 id="обновление-записеи-в-таблице"><a href="#обновление-записеи-в-таблице" class="header-anchor">#</a> Обновление записей в таблице</h4><pre><code>Db::table(&#39;users&#39;)
    -&gt;where(&#39;id&#39;, 1)
    -&gt;update([&#39;votes&#39; =&gt; 1]);
</code></pre><h4 id="увеличение-или-уменьшение-значения-поля"><a href="#увеличение-или-уменьшение-значения-поля" class="header-anchor">#</a> Увеличение или уменьшение значения поля</h4><pre><code>Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;);

Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;, 5);

Db::table(&#39;users&#39;)-&gt;decrement(&#39;votes&#39;);

Db::table(&#39;users&#39;)-&gt;decrement(&#39;votes&#39;, 5);
</code></pre><p>Вы также можете указать дополнительные поля для изменения:</p><pre><code>Db::table(&#39;users&#39;)-&gt;increment(&#39;votes&#39;, 1, [&#39;name&#39; =&gt; &#39;John&#39;]);
</code></pre><p><a name="deletes" class="anchor"></a></p><h2 id="удаление-delete"><a href="#удаление-delete" class="header-anchor">#</a> Удаление (DELETE)</h2><h4 id="удаление-всех-записеи"><a href="#удаление-всех-записеи" class="header-anchor">#</a> Удаление всех записей</h4><pre><code>Db::table(&#39;users&#39;)-&gt;delete();
</code></pre><h4 id="удаление-записеи-из-таблицы"><a href="#удаление-записеи-из-таблицы" class="header-anchor">#</a> Удаление записей из таблицы</h4><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&lt;&#39;, 100)-&gt;delete();
</code></pre><h4 id="очистка-таблицы"><a href="#очистка-таблицы" class="header-anchor">#</a> Очистка таблицы</h4><pre><code>Db::table(&#39;users&#39;)-&gt;truncate();
</code></pre><p><a name="pessimistic-locking" class="anchor"></a></p><h2 id="блокирование-lock-данных"><a href="#блокирование-lock-данных" class="header-anchor">#</a> Блокирование (lock) данных</h2><h4 id="select-с-shared-lock"><a href="#select-с-shared-lock" class="header-anchor">#</a> SELECT с &#39;shared lock&#39;:</h4><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;sharedLock()-&gt;get();
</code></pre><h4 id="select-с-lock-for-update"><a href="#select-с-lock-for-update" class="header-anchor">#</a> SELECT с &#39;lock for update&#39;:</h4><pre><code>Db::table(&#39;users&#39;)-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100)-&gt;lockForUpdate()-&gt;get();
</code></pre><p><a name="caching-queries" class="anchor"></a></p><h2 id="кэширование-запросов"><a href="#кэширование-запросов" class="header-anchor">#</a> Кэширование запросов</h2><p>Вы можете легко закэшировать запрос при помощи методов <code>remember</code> или <code>rememberForever</code>:</p><pre><code>$users = Db::table(&#39;users&#39;)-&gt;remember(10)-&gt;get();
</code></pre><p>В этом примере результаты выборки будут сохранены в кэше на 10 минут. В течении этого времени данный запрос не будет отправляться к СУБД - вместо этого результат будет получен из системы кэширования, указанного по умолчанию в вашем файле настроек.</p>`,130))])}const v=n(h,[["render",i]]);export{k as __pageData,v as default};
