---
subtitle: Twig-фильтр
---
# |page

Фильтр `|page` создаёт ссылку на страницу, используя имя файла страницы без расширения в качестве параметра. Например, если существует страница about.htm, вы можете использовать следующий код для генерации ссылки на неё:

```twig
<a href="{{ 'about'|page }}">About Us</a>
```

Помните, что при ссылке на страницу из поддиректории необходимо указать имя поддиректории:

```html
<a href="{{ 'contacts/about'|page }}">About Us</a>
```

::: tip
[Документация по темам](../../cms/themes/themes.md) содержит подробности об использовании поддиректорий.
:::

Для доступа к ссылке на определённую страницу из PHP-секции можно использовать `$this->pageUrl('page-name-without-extension')`.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['newsPage'] = $this->pageUrl('blog/overview');
}
?>
```
```twig
{{ newsPage }}
```
:::

Вы можете создать ссылку на текущую страницу, применив фильтр к переменной `this`.

```twig
<a href="{{ this|page }}">Refresh page</a>
```

Чтобы получить ссылку на текущую страницу в PHP, вызовите метод `$this->pageUrl()` без аргументов.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['currentUrl'] = $this->pageUrl();
}
?>
```
```twig
{{ currentUrl }}
```
:::

## Обратная маршрутизация

При ссылке на страницу с определёнными параметрами URL фильтр `|page` поддерживает обратную маршрутизацию, принимая массив в качестве первого аргумента.

::: cmstemplate
```ini
url = "/blog/post/:post_id"
```
```twig
[...]
```
:::

Если приведённое выше содержимое находится в CMS-файле страницы **post.htm**, вы можете сослаться на эту страницу следующим образом:

```twig
<a href="{{ 'post'|page({ post_id: 10 }) }}">
    Blog post #10
</a>
```

Если адрес сайта — __https://octobercms.com__, приведённый выше пример выведет следующее:

```html
<a href="https://octobercms.com/blog/post/10">
    Blog post #10
</a>
```

## Постоянные параметры URL

Если параметр URL уже присутствует в окружении, фильтр `|page` будет использовать его автоматически.

```ini
url = "/blog/post/:post_id"

url = "/blog/post/edit/:post_id"
```

Если есть две страницы, **post.htm** и **post-edit.htm**, с указанными выше URL, вы можете ссылаться на любую из них без необходимости определять параметр `post_id`.

```twig
<a href="{{ 'post-edit'|page }}">
    Edit this post
</a>
```

Когда приведённая выше разметка появляется на странице **post.htm**, она выведет следующее:

```html
<a href="https://octobercms.com/blog/post/edit/10">
    Edit this post
</a>
```

Значение `post_id`, равное *10*, уже известно и сохранилось между окружениями. Вы можете отключить эту функциональность, передав 2-й аргумент как `false`:

```twig
<a href="{{ 'post'|page(false) }}">
    Unknown blog post
</a>
```

Или определив другое значение:

```twig
<a href="{{ 'post'|page({ post_id: 6 }) }}">
    Blog post #6
</a>
```
