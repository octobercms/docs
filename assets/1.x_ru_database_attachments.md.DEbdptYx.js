import{_ as d,r as o,o as s,c,e as n,a as e,s as p,d as a}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Прикрепление файлов - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Прикрепление файла к модели","slug":"прикрепление-фаила-к-модели","link":"#прикрепление-фаила-к-модели","children":[{"level":3,"title":"Creating new attachments","slug":"creating-new-attachments","link":"#creating-new-attachments","children":[]},{"level":3,"title":"Просмотр прикрепленных файлов","slug":"просмотр-прикрепленных-фаилов","link":"#просмотр-прикрепленных-фаилов","children":[]},{"level":3,"title":"Примеры","slug":"примеры","link":"#примеры","children":[]}]}],"relativePath":"1.x/ru/database/attachments.md","filePath":"1.x/ru/database/attachments.md"}'),i={name:"1.x/ru/database/attachments.md"};function g(h,t,m,u,f,_){const l=o("pre-heading"),r=o("post-heading");return s(),c("div",null,[n(l),t[0]||(t[0]=e("h1",null,"Прикрепление файлов",-1)),n(r),t[1]||(t[1]=p(`<p><a name="file-attachments" class="anchor"></a></p><h2 id="прикрепление-фаила-к-модели"><a href="#прикрепление-фаила-к-модели" class="header-anchor">#</a> Прикрепление файла к модели</h2><p>Вы можете прикреплять файлы к модели, используя <a href="./../database/relations.html#polymorphic-relations">полиморфные связи</a>.</p><p>In the examples below the model has a single Avatar attachment model and many Photo attachment models.</p><p>Пример прикрепления одного файла (аватара):</p><pre><code>public $attachOne = [
    &#39;avatar&#39; =&gt; &#39;System\\Models\\File&#39;
];
</code></pre><p>Пример прикрепления нескольких файлов (фотографий):</p><pre><code>public $attachMany = [
    &#39;photos&#39; =&gt; &#39;System\\Models\\File&#39;
];
</code></pre><p>Вы можете запретить/разрешить прямой доступ к файлам, используя дополнительный параметр <em>public</em>:</p><pre><code>public $attachOne = [
    &#39;avatar&#39; =&gt; [&#39;System\\Models\\File&#39;, &#39;public&#39; =&gt; false]
];
</code></pre><p>Все защищенные файлы лежат в папке <strong>uploads/protected</strong>.</p><p><a name="creating-attachments" class="anchor"></a></p><h3 id="creating-new-attachments"><a href="#creating-new-attachments" class="header-anchor">#</a> Creating new attachments</h3><p>Вы можете использовать метод <code>Input::file</code>, чтобы сразу прикрепить файл (<code>$attachOne</code>) к модели:</p><pre><code>$model-&gt;avatar = Input::file(&#39;file_input&#39;);
</code></pre><p>Или указать абсолютный путь до файла:</p><pre><code>$model-&gt;avatar = &#39;/path/to/somefile.jpg&#39;;
</code></pre><p>Используйте метод <code>create()</code>, чтобы прикрепить сразу несколько файлов (<code>$attachMany</code>):</p><pre><code>$model-&gt;avatar()-&gt;create([&#39;data&#39; =&gt; Input::file(&#39;file_input&#39;)]);
</code></pre><p>Или сначала создайте модель <code>File</code>:</p><pre><code>$file = new System\\Models\\File;
$file-&gt;data = Input::file(&#39;file_input&#39;);
$file-&gt;is_public = true;
$file-&gt;save();

$model-&gt;avatar()-&gt;add($file);
</code></pre><p><a name="viewing-attachments" class="anchor"></a></p><h3 id="просмотр-прикрепленных-фаилов"><a href="#просмотр-прикрепленных-фаилов" class="header-anchor">#</a> Просмотр прикрепленных файлов</h3>`,23)),t[2]||(t[2]=e("p",null,[a("Метод "),e("code",null,"getPath()"),a(" возвращает полный путь до загруженного файла. Пример: "),e("strong",null,[e("a",{href:"http://mysite.com/uploads/public/path/to/avatar.jpg",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("http://mysite.com/uploads/public/path/to/avatar.jpg"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),e("span",{class:"sr-only"},"(opens new window)")])])])],-1)),t[3]||(t[3]=p(`<pre><code>// один файл
echo $model-&gt;avatar-&gt;getPath();

// несколько файлов
foreach ($model-&gt;photos as $photo) {
    echo $photo-&gt;getPath();
}
</code></pre><p>Метод <code>getLocalPath()</code> возвращает абсолютный путь до загруженного файла.</p><pre><code>echo $model-&gt;avatar-&gt;getLocalPath();
</code></pre><p>Используйте метод <code>output()</code> для отображения содержимого файла:</p><pre><code>echo $model-&gt;avatar-&gt;output();
</code></pre><p>Вы можете изменить размер изображения при помощи метода <code>getThumb()</code>. Он принимает 3 параметра - ширину изображения (число или <strong>auto</strong>), высоту (число или <strong>auto</strong>) и массив со следующими элементами:</p><div class="table"><table tabindex="0"><thead><tr><th>Ключ</th><th>Значение</th></tr></thead><tbody><tr><td><strong>mode</strong></td><td>auto, exact, portrait, landscape, crop. По умолчанию: auto</td></tr><tr><td><strong>quality</strong></td><td>0 - 100. По умолчанию: 95</td></tr><tr><td><strong>extension</strong></td><td>auto, jpg, png, gif. По умолчанию: jpg</td></tr></tbody></table></div><p>Пример:</p><pre><code>echo $model-&gt;avatar-&gt;getThumb(100, 100, [&#39;mode&#39; =&gt; &#39;crop&#39;]);
</code></pre><p><a name="attachments-usage-example" class="anchor"></a></p><h3 id="примеры"><a href="#примеры" class="header-anchor">#</a> Примеры</h3><p>В этом разделе представлены все примеры использования моделей для прикрепления файлов - от определения связей, до отображения загруженного изображения на странице.</p><p>Связь с классом <code>System\\Models\\File</code> определяется внутри модели. Пример:</p><pre><code>class Post extends Model
{
    public $attachOne = [
        &#39;featured_image&#39; =&gt; &#39;System\\Models\\File&#39;
    ];
}
</code></pre><p>Создаем форму для загрузки файла:</p><pre><code>&lt;?= Form::open([&#39;files&#39; =&gt; true]) ?&gt;

    &lt;input name=&quot;example_file&quot; type=&quot;file&quot;&gt;

    &lt;button type=&quot;submit&quot;&gt;Upload File&lt;/button&gt;

&lt;?= Form::close() ?&gt;
</code></pre><p>Процесс загрузки файла на сервер и его привязка к модели:</p><pre><code>// Поиск модели
$post = Post::find(1);

// Сохранение изображения
if (Input::hasFile(&#39;example_file&#39;)) {
    $post-&gt;featured_image = Input::file(&#39;example_file&#39;);
}
</code></pre><p>В качестве альтернативы Вы можете использовать <a href="./../database/relations.html#deferred-binding">отложенное связывание</a>:</p><pre><code>// Поиск модели
$post = Post::find(1);

// Получаем файл из формы
$fileFromPost = Input::file(&#39;example_file&#39;);

// Сохранение изображения, если оно существует
if ($fileFromPost) {
    $post-&gt;featured_image()-&gt;create([&#39;data&#39; =&gt; $fileFromPost], $sessionKey);
}
</code></pre><p>Отображение файла на странице:</p><pre><code>// Поиск модели
$post = Post::find(1);

// Используем изображение по умолчанию, если его нет в статье
if ($post-&gt;featured_image) {
    $featuredImage = $post-&gt;featured_image-&gt;getPath();
}
else {
    $featuredImage = &#39;http://placehold.it/220x300&#39;;
}

&lt;img src=&quot;&lt;?= $featuredImage ?&gt;&quot; alt=&quot;Featured Image&quot;&gt;
</code></pre>`,22))])}const b=d(i,[["render",g]]);export{v as __pageData,b as default};
