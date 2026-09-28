import{_ as l,r as s,o as c,c as i,e as o,a as e,s as a,d as n}from"./chunks/framework.CXcwiNg-.js";const _=JSON.parse('{"title":"Мутаторы (Mutators) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Accessors & mutators","slug":"accessors-mutators","link":"#accessors-mutators","children":[{"level":4,"title":"Определение аксессора","slug":"определение-аксессора","link":"#определение-аксессора","children":[]},{"level":4,"title":"Определение мутатора","slug":"определение-мутатора","link":"#определение-мутатора","children":[]}]},{"level":2,"title":"Мутаторы дат","slug":"мутаторы-дат","link":"#мутаторы-дат","children":[]},{"level":2,"title":"Приведение типов","slug":"приведение-типов","link":"#приведение-типов","children":[{"level":4,"title":"Преобразование в массив","slug":"преобразование-в-массив","link":"#преобразование-в-массив","children":[]}]}],"relativePath":"1.x/ru/database/mutators.md","filePath":"1.x/ru/database/mutators.md"}'),p={name:"1.x/ru/database/mutators.md"};function u(h,t,m,f,g,b){const r=s("pre-heading"),d=s("post-heading");return c(),i("div",null,[o(r),t[0]||(t[0]=e("h1",null,"Мутаторы (Mutators)",-1)),o(d),t[1]||(t[1]=a(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Аксессоры (accessors) и мутаторы (mutators) - это специальные методы, которые позволяют Вам преобразовывать данные на лету в процессе получения или записи данных в модель. Например, Вы хотите <a href="./../services/encryption.html">шифровать</a> данные в БД, и дешифровать их в момент чтения из базы данных. При помощи аксессоров и мутаторов вы можете сделать этот процесс прозрачным для всей остальной логики приложения.</p><p><a name="accessors-and-mutators" class="anchor"></a></p><h2 id="accessors-mutators"><a href="#accessors-mutators" class="header-anchor">#</a> Accessors &amp; mutators</h2><h4 id="определение-аксессора"><a href="#определение-аксессора" class="header-anchor">#</a> Определение аксессора</h4><p>Чтобы определить аксессор на поле <code>foo</code> модели, создайте метод <code>getFooAttribute</code>. <code>Foo</code> - это название поля, переведенное в &quot;camel case&quot;. Названия полей с подчеркиваниями, как всегда, будут преобразованы в строки с большими буквами перед подчеркиваниями. Аксессрор будет вызываться каждый раз, когда будет производиться чтение заданного поля в модели. Например, создадим аксессор на поле <code>first_name</code>:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * Get the user&#39;s first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
</code></pre><p>Аксессор получает значение оригинальное поля и возвращает преобразованное. Теперь при обычном доступе к полю, мы получим значение с заменённой первой буквой на большую:</p><pre><code>$user = User::find(1);

$firstName = $user-&gt;first_name;
</code></pre><h4 id="определение-мутатора"><a href="#определение-мутатора" class="header-anchor">#</a> Определение мутатора</h4><p>Чтобы определить мутатор на поле foo модели, создайте метод <code>setFooAttribute</code>. <code>Foo</code> - это название поля, переведенное в &quot;camel case&quot;. Названия полей с подчеркиваниями, как всегда, будут преобразованы в строки с большими буквами перед подчеркиваниями. Мутатор будет автоматически вызываться каждый раз, когда заданному полю модели будет присваиваться значение. Например, создадим мутатор на поле <code>first_name</code>:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * Set the user&#39;s first name.
     *
     * @param  string  $value
     * @return string
     */
    public function setFirstNameAttribute($value)
    {
        $this-&gt;attributes[&#39;first_name&#39;] = strtolower($value);
    }
}
</code></pre><p>Мутатор получит значение, которое устанавливается в атрибуте, что позволяет Вам манипулировать им. Например, если Вы попытаетесь установить значение <code>Sally</code> для атрибута <code>first_name</code>:</p><pre><code>$user = User::find(1);

$user-&gt;first_name = &#39;Sally&#39;;
</code></pre><p>то вызовется функция <code>setFirstNameAttribute</code> со значением <code>Sally</code>. Мутатор принимает значение, которое надо присвоить полю и присваивает его, используя внутреннее свойство модели Eloquent $attributes.</p><p><a name="date-mutators" class="anchor"></a></p><h2 id="мутаторы-дат"><a href="#мутаторы-дат" class="header-anchor">#</a> Мутаторы дат</h2>`,18)),t[2]||(t[2]=e("p",null,[n("По умолчанию в моделях Октября есть внутренние мутаторы и аксессоры на поля "),e("code",null,"created_at"),n(" и "),e("code",null,"updated_at"),n(", которые преобразуют timestamp, хранящийся в базе данных, в объект "),e("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Carbon"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(", который расширяет встроенный в PHP класс "),e("code",null,"DateTime"),n(" и содержит много полезных методов для манипуляции с датой.")],-1)),t[3]||(t[3]=e("p",null,[n("Вы можете изменить список полей, к которым применяются эти мутаторы дат (в том числе полностью запретив такое поведение), переопределив у себя в модели свойство "),e("code",null,"$dates"),n(":")],-1)),t[4]||(t[4]=e("pre",null,[e("code",null,`class User extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'disabled_at'];
}
`)],-1)),t[5]||(t[5]=e("p",null,[n("В полях, определенные в $dates, Вы можете записывать UNIX timestamp (целое число секунд с начала эпохи UNIX), строку даты (Y-m-d), строку даты со временем (Y-m-d H:i:s) и объект "),e("code",null,"DateTime"),n(" / "),e("code",null,"Carbon"),n(" - мутаторы все это поймут и при записи в базу данных преобразуют в timestamp-строку.")],-1)),t[6]||(t[6]=e("pre",null,[e("code",null,`$user = User::find(1);

$user->disabled_at = Carbon::now();

$user->save();
`)],-1)),t[7]||(t[7]=e("p",null,[n("При получении значений из этих полей вы получите объект класса "),e("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Carbon"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(". Далее вы можете использовать все методы этого класса.")],-1)),t[8]||(t[8]=a(`<pre><code>$user = User::find(1);

return $user-&gt;disabled_at-&gt;getTimestamp();
</code></pre><p>По умолчанию все даты отформатированы в виде<code>&#39;Y-m-d H:i:s&#39;</code>. Если Вы хотите изменить формат отображения, то добавьте свойство <code>$dateFormat</code> в Вашу модель.</p><pre><code>class Flight extends Model
{
    /**
     * The storage format of the model&#39;s date columns.
     *
     * @var string
     */
    protected $dateFormat = &#39;U&#39;;
}
</code></pre><p><a name="attribute-casting" class="anchor"></a></p><h2 id="приведение-типов"><a href="#приведение-типов" class="header-anchor">#</a> Приведение типов</h2><p>Помимо аксессоров, у моделей есть более простой способ приводить атрибуты к определённому типу при чтении из базы данных. Для реализации такого поведения, определите свойство <code>$casts</code>. Это должен быть массив, где ключ - название атрибута, а значение - типа данных. Поддерживаются: <code>integer</code>, <code>real</code>, <code>float</code>, <code>double</code>, <code>string</code>, <code>boolean</code>, <code>object</code> and <code>array</code>.</p><p>Например, если мы хотим, чтобы атрибут <code>is_admin</code>, который в базе данных имеет тип tiny integer и принимает значения 0 или 1, у нас в модели имел логический тип:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        &#39;is_admin&#39; =&gt; &#39;boolean&#39;,
    ];
}
</code></pre><p>Теперь каждый раз, когда мы будем запрашивать в модели этот атрибут, будем получать <code>true</code> или <code>false</code>.</p><pre><code>$user = User::find(1);

if ($user-&gt;is_admin) {
    //
}
</code></pre><h4 id="преобразование-в-массив"><a href="#преобразование-в-массив" class="header-anchor">#</a> Преобразование в массив</h4><p>Преобразование в массив особенно полезно применять там, где данные в базе данных хранятся в сериализованном JSON. В этом случае в коде можно работать с атрибутом как с массивом, а при записи/чтении из базы данных он будет автоматически сериализовываться/десериализовываться.</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        &#39;options&#39; =&gt; &#39;array&#39;,
    ];
}
</code></pre><p>Пример:</p><pre><code>$user = User::find(1);

$options = $user-&gt;options;

$options[&#39;key&#39;] = &#39;value&#39;;

$user-&gt;options = $options;

$user-&gt;save();
</code></pre>`,15))])}const $=l(p,[["render",u]]);export{_ as __pageData,$ as default};
