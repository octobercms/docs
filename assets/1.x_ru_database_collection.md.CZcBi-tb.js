import{_ as c,r as n,o as r,c as l,e as t,a as d,s}from"./chunks/framework.CXcwiNg-.js";const _=JSON.parse('{"title":"Коллекции - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Примеры","slug":"примеры","link":"#примеры","children":[{"level":4,"title":"Конвертация коллекции в JSON или массив","slug":"конвертация-коллекции-в-json-или-массив","link":"#конвертация-коллекции-в-json-или-массив","children":[]},{"level":4,"title":"Нахождение первого совпадения","slug":"нахождение-первого-совпадения","link":"#нахождение-первого-совпадения","children":[]},{"level":4,"title":"Итерация коллекции","slug":"итерация-коллекции","link":"#итерация-коллекции","children":[]},{"level":4,"title":"Проверка ключа","slug":"проверка-ключа","link":"#проверка-ключа","children":[]}]},{"level":2,"title":"Пользовательские коллекции","slug":"пользовательские-коллекции","link":"#пользовательские-коллекции","children":[]},{"level":2,"title":"Data feed","slug":"data-feed","link":"#data-feed","children":[{"level":3,"title":"Использование","slug":"использование","link":"#использование","children":[]},{"level":3,"title":"Обработка результатов","slug":"обработка-результатов","link":"#обработка-результатов","children":[]},{"level":3,"title":"Сортировка результатов","slug":"сортировка-результатов","link":"#сортировка-результатов","children":[]}]}],"relativePath":"1.x/ru/database/collection.md","filePath":"1.x/ru/database/collection.md"}'),i={name:"1.x/ru/database/collection.md"};function p(h,e,u,g,m,f){const o=n("pre-heading"),a=n("post-heading");return r(),l("div",null,[t(o),e[0]||(e[0]=d("h1",null,"Коллекции",-1)),t(a),e[1]||(e[1]=s(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Все наборы результатов, возвращаемые моделью, являются экземплярами объекта <code>Illuminate\\Database\\Eloquent\\Collection</code>, в том числе результаты, получаемые при помощи метода <code>get</code> или доступные через отношения. Объект коллекции расширяет <a href="./../services/collections.html">базовую коллекцию</a>. Поэтому он наследует десятки методов, используемых для гибкой работы с базовым набором моделей.</p><p>Конечно же, все коллекции также служат в качестве итераторов, позволяя вам перебирать их в цикле, как простые массивы в PHP:</p><pre><code>$users = User::where(&#39;is_active&#39;, true)-&gt;get();

foreach ($users as $user) {
    echo $user-&gt;name;
}
</code></pre><p>Тем не менее, коллекции гораздо мощнее, чем массивы и предоставляют различные варианты операций отображения/уменьшения с использованием интуитивно понятного интерфейса. Например, давайте удалим все неактивные модели и возвратим имена для каждого оставшегося пользователя:</p><pre><code>$users = User::get();

$names = $users-&gt;filter(function ($user) {
        return $user-&gt;is_active === true;
    })
    -&gt;map(function ($user) {
        return $user-&gt;name;
    });
</code></pre><p><a name="usage-examples" class="anchor"></a></p><h2 id="примеры"><a href="#примеры" class="header-anchor">#</a> Примеры</h2><p>Следующие методы вернут объект <code>Коллекции</code>:</p><pre><code>$collection = User::all();
$collection = User::where(&#39;name&#39;, &#39;Joe&#39;)-&gt;get();
$collection = User::find(3)-&gt;groups;
</code></pre><h4 id="конвертация-коллекции-в-json-или-массив"><a href="#конвертация-коллекции-в-json-или-массив" class="header-anchor">#</a> Конвертация коллекции в JSON или массив</h4><pre><code>$phpArray = $collection-&gt;toArray();

$jsonString = $collection-&gt;toJson();
</code></pre><h4 id="нахождение-первого-совпадения"><a href="#нахождение-первого-совпадения" class="header-anchor">#</a> Нахождение первого совпадения</h4><pre><code>$found = $collection-&gt;first(function($model) {
    return $model-&gt;color == &#39;red&#39;;
});
</code></pre><h4 id="итерация-коллекции"><a href="#итерация-коллекции" class="header-anchor">#</a> Итерация коллекции</h4><pre><code>$collection-&gt;each(function($model) {
    $model-&gt;is_cool = true;
});
</code></pre><h4 id="проверка-ключа"><a href="#проверка-ключа" class="header-anchor">#</a> Проверка ключа</h4><pre><code>if ($collection-&gt;contains(3)) {
    // Коллекция имеет Модель с ID = 3
}
</code></pre><p><a name="custom-collections" class="anchor"></a></p><h2 id="пользовательские-коллекции"><a href="#пользовательские-коллекции" class="header-anchor">#</a> Пользовательские коллекции</h2><p>Если вам нужно использовать пользовательский объект <code>Collection</code> со своими собственными методами наследования, вы можете переопределить метод <code>newCollection</code> в вашей модели:</p><pre><code>class User extends Model
{
    /**
     * Create a new Collection instance.
     */
    public function newCollection(array $models = [])
    {
        return new CustomCollection($models);
    }
}
</code></pre><p>После определения метода <code>newCollection</code> Вы получите экземпляр пользовательской коллекции при любом обращении к экземпляру <code>Collection</code> этой модели. Если вы хотите использовать собственную коллекцию для каждой модели в вашем приложении, вы должны переопределить метод <code>newCollection</code> в базовом классе модели, наследуемой всеми вашими моделями.</p><pre><code>use October\\Rain\\Database\\Collection as CollectionBase;

class CustomCollection extends CollectionBase
{
}
</code></pre><p><a name="data-feed" class="anchor"></a></p><h2 id="data-feed"><a href="#data-feed" class="header-anchor">#</a> Data feed</h2><p>Data feed позволяют Вам объединять модели классов в одну коллекцию. Это полезно для создания списка данных, в котором используется навигация. Объекты подготавливаются до вызова метода <code>get</code>, после чего они объединяются в коллекцию, которая имеет вид обычного набора данных</p><p>Класс <code>DataFeed</code> имитирует модель Active Record и поддерживает методы <code>limit</code> и <code>paginate</code>.</p><p><a name="creating-feed" class="anchor"></a></p><h3 id="использование"><a href="#использование" class="header-anchor">#</a> Использование</h3><p>В следующем примере модели User, Post и Comment будут объединены в одну коллекцию, которая будет содержать 10 записей.</p><pre><code>$feed = new October\\Rain\\Database\\DataFeed;
$feed-&gt;add(&#39;user&#39;, new User);
$feed-&gt;add(&#39;post&#39;, Post::where(&#39;category_id&#39;, 7));

$feed-&gt;add(&#39;comment&#39;, function() {
    $comment = new Comment;
    return $comment-&gt;where(&#39;approved&#39;, true);
});

$results = $feed-&gt;limit(10)-&gt;get();
</code></pre><p><a name="data-feed-processing" class="anchor"></a></p><h3 id="обработка-результатов"><a href="#обработка-результатов" class="header-anchor">#</a> Обработка результатов</h3><p>Метод <code>get</code> вернет объект <code>Collection</code>, который содержит результаты запроса. Записи могут быть дифференцированны при помощи атрибута <code>tag_name</code>, который был установлен в качестве первого параметра при создании модели.</p><pre><code>foreach ($results as $result) {

    if ($result-&gt;tag_name == &#39;post&#39;)
        echo &quot;New Blog Post: &quot; . $record-&gt;title;

    elseif ($result-&gt;tag_name == &#39;comment&#39;)
        echo &quot;New Comment: &quot; . $record-&gt;content;

    elseif ($result-&gt;tag_name == &#39;user&#39;)
        echo &quot;New User: &quot; . $record-&gt;name;

}
</code></pre><p><a name="data-feed-ordering" class="anchor"></a></p><h3 id="сортировка-результатов"><a href="#сортировка-результатов" class="header-anchor">#</a> Сортировка результатов</h3><p>Результаты могут быть отсортированы по одной колонке таблицы для всех результатов или индивидуально при помощи метода <code>add</code>. Отдельно указывается направление сортировки.</p><pre><code>// Ordered by updated_at if it exists, otherwise created_at
$feed-&gt;add(&#39;user&#39;, new User, &#39;ifnull(updated_at, created_at)&#39;);

// Ordered by id
$feed-&gt;add(&#39;comments&#39;, new Comment, &#39;id&#39;);

// Ordered by name (specified default below)
$feed-&gt;add(&#39;posts&#39;, new Post);

// Specifies the default column and the direction
$feed-&gt;orderBy(&#39;name&#39;, &#39;asc&#39;)-&gt;get();
</code></pre>`,41))])}const C=c(i,[["render",p]]);export{_ as __pageData,C as default};
