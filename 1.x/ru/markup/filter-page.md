# |page

Фильтр `|page` создает ссылку на страницу, используя имя файла, без расширения, в качестве параметра. Например, если есть страница **about.htm**, то Вы можете использовать следующий код для генерации ссылки на эту страницу:

```twig
<a href="{{ 'about'|page }}">About Us</a>
```

Помните, что если Вы ссылаетесь на страницу из подпапки, то должны указать ее имя:

```twig
<a href="{{ 'contacts/about'|page }}">About Us</a>
```

> **Примечание**: Подробную информацию о подпапках Вы можете найти в разделе [Темы](../cms/themes#subdirectories).

Вы можете создать ссылку на текущую страницу, отфильтровав пустую строку:

```twig
<a href="{{ ''|page }}">Refresh page</a>
```

Вы можете передать массив с параметрами для динамических URL в фильтр `|page`. Например, для страниц блога.

Содержимое страницы **post.htm**:

```
url = "/blog/post/:post_id"
==
[...]
```

Тогда ссылка в шаблоне будет выглядеть следующим образом:

```twig
<a href="{{ 'post'|page({ post_id: 10 }) }}">
    Blog post #10
</a>
```

Если __https://octobercms.info__ - адрес сайта, то результат будет следующим:

```html
<a href="https://octobercms.info/blog/post/10">
    Blog post #10
</a>
```

Теперь не обязательно указывать параметр `post_id` для новых ссылок:

```twig
<a href="{{ 'post-edit'|page }}">
    Edit this post
</a>
```

Результат:

```html
<a href="https://octobercms.info/blog/post/edit/10">
    Edit this post
</a>
```

Чтобы использовать другой `post_id`, просто, используйте `false`:

```twig
<a href="{{ 'post'|page(false) }}">
    Unknown blog post
</a>
```

Или укажите другое значение:

```twig
<a href="{{ 'post'|page({ post_id: 6 }) }}">
    Blog post #6
</a>
```
