import{_ as o,r as n,o as t,c as d,e as a,a as c,s as l}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Сериализация - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Основы использования","slug":"основы-использования","link":"#основы-использования","children":[{"level":4,"title":"Преобразование модели в массив","slug":"преобразование-модели-в-массив","link":"#преобразование-модели-в-массив","children":[]},{"level":4,"title":"Преобразование модели в JSON","slug":"преобразование-модели-в-json","link":"#преобразование-модели-в-json","children":[]}]},{"level":2,"title":"Скрытие атрибутов из JSON","slug":"скрытие-атрибутов-из-json","link":"#скрытие-атрибутов-из-json","children":[]},{"level":2,"title":"Добавление атрибутов в JSON","slug":"добавление-атрибутов-в-json","link":"#добавление-атрибутов-в-json","children":[]}],"relativePath":"1.x/ru/database/serialization.md","filePath":"1.x/ru/database/serialization.md"}'),i={name:"1.x/ru/database/serialization.md"};function p(h,e,u,m,f,_){const r=n("pre-heading"),s=n("post-heading");return t(),d("div",null,[a(r),e[0]||(e[0]=c("h1",null,"Сериализация",-1)),a(s),e[1]||(e[1]=l(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>При построении JSON API очень часто требуется преобразовать модель и отношения в массив или JSON. Октябрь обладает как удобным механизмом для подобных конвертаций, так и инструментами для контроля над отдельными атрибутами при сериализации.</p><p><a name="basic-usage" class="anchor"></a></p><h2 id="основы-использования"><a href="#основы-использования" class="header-anchor">#</a> Основы использования</h2><h4 id="преобразование-модели-в-массив"><a href="#преобразование-модели-в-массив" class="header-anchor">#</a> Преобразование модели в массив</h4><p>Используйте метод <code>toArray</code>, чтобы преобразовать модель и соответствующие ей <a href="./../database/relations.html">связи</a> в массив. Этот метод рекурсивный, так что все атрибуты и все отношения (включая отношения отношений) так же будут преобразованы в массивы:</p><pre><code>$user = User::with(&#39;roles&#39;)-&gt;first();

return $user-&gt;toArray();
</code></pre><p>Также можно преобразовывать в массивы и <a href="./../database/collections.html">коллекции</a>:</p><pre><code>$users = User::all();

return $users-&gt;toArray();
</code></pre><h4 id="преобразование-модели-в-json"><a href="#преобразование-модели-в-json" class="header-anchor">#</a> Преобразование модели в JSON</h4><p>Для преобразования модели в JSON Вы можете использовать метод <code>toJson</code>. Как и <code>toArray</code>, метод <code>toJson</code> также является рекурсивным, поэтому все атрибуты и отношения так же будут преобразованы в JSON:</p><pre><code>$user = User::find(1);

return $user-&gt;toJson();
</code></pre><p>Как вариант, можно привести модель или коллекцию к строке, что автоматически вызовет метод <code>toJson</code>:</p><pre><code>$user = User::find(1);

return (string) $user;
</code></pre><p>Т.к. модели и коллекции преобразуются в JSON при приведении к строке, Вы можете возвращать объекты модели напрямую из маршрутов и контроллеров:</p><pre><code>Route::get(&#39;users&#39;, function () {
    return User::all();
});
</code></pre><p><a name="hiding-attributes-from-json" class="anchor"></a></p><h2 id="скрытие-атрибутов-из-json"><a href="#скрытие-атрибутов-из-json" class="header-anchor">#</a> Скрытие атрибутов из JSON</h2><p>Иногда Вам может потребоваться ограничения видимости атрибутов (например, пароля) при конвертации в массив или JSON представление. Для реализации этого функционала используйте свойство <code>$hidden</code> в своей модели:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [&#39;password&#39;];
}
</code></pre><p>В качестве альтернативного варианта, можно использовать атрибут <code>$visible</code> и определить «белый» список разрешенных полей и отношений при конвертации в JSON:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [&#39;first_name&#39;, &#39;last_name&#39;];
}
</code></pre><p><a name="appending-values-to-json" class="anchor"></a></p><h2 id="добавление-атрибутов-в-json"><a href="#добавление-атрибутов-в-json" class="header-anchor">#</a> Добавление атрибутов в JSON</h2><p>Бывают ситуации, когда при экспорте Вам может понадобиться добавить атрибуты, соответствующих полей для которых в БД нет. Чтобы сделать это, для начала, определите для него <a href="./../database/mutators.html">аксессор</a>:</p><pre><code>class User extends Model
{
    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this-&gt;attributes[&#39;admin&#39;] == &#39;yes&#39;;
    }
}
</code></pre><p>После того, как такой метод создан, добавьте имя атрибута в свойство <code>appends</code>:</p><pre><code>class User extends Model
{
    /**
     * The accessors to append to the model&#39;s array form.
     *
     * @var array
     */
    protected $appends = [&#39;is_admin&#39;];
}
</code></pre><p>После того как атрибут добавлен в массив <code>appends</code>, он будет доступен как при конвертации в массив так и JSON. К этим атрибутам также относятся правила, заданные в <code>visible</code> и <code>hidden</code> массивах.</p>`,30))])}const S=o(i,[["render",p]]);export{b as __pageData,S as default};
