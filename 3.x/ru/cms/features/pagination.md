---
subtitle: Узнайте, как отображать ссылки пагинации.
---
# Пагинация

October CMS включает встроенные функции пагинации, интегрированные со стандартными шаблонами и обеспечивающие полную гибкость для пользовательской разметки. Пагинированные записи тесно интегрированы с [запросами пагинации модели](../../extend/database/pagination.md) и [Twig-функцией `pager()`](../../markup/function/pager.md).

## Пагинация данных

Пагинированный набор данных может поступать из [логики компонентов](../../extend/cms-components.md), из [PHP-секции](../themes/themes.md) страницы или макета, или из [компонента Tailor](../tailor/components.md). Ниже приведён пример страницы, запрашивающей пагинированные данные из компонента Tailor с шагом **10** записей на страницу.

::: cmstemplate
```ini
url = "/blog"

[collection]
handle = "Blog\Post"
```
```twig
{% set posts = collection.paginate(10) %}
```
:::

Теперь переменная `posts` доступна. Мы можем перебрать каждую запись и отобразить ссылки пагинации.

```twig
<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ pager(posts) }}
</nav>
```

### Несколько экземпляров пагинации

По умолчанию пагинация берёт номер текущей страницы из строки запроса `?page`, поэтому один и тот же номер страницы будет использоваться при отображении двух или более наборов пагинированных данных. Для решения этой проблемы используйте метод `paginateCustom` и укажите уникальное имя параметра.

::: cmstemplate
```ini
url = "/blog"

[collection blog]
handle = "Blog\Post"

[collection category]
handle = "Blog\Category"
```
```twig
{% set posts = blog.paginateCustom(10, 'postPage') %}

{% set comments = comments.paginateCustom(10, 'commentPage') %}
```
:::

Установите опцию `withQuery`, чтобы сохранить номер страницы для других экземпляров пагинации (необязательно).

```twig
{{ pager(categories, { withQuery: true }) }}
```

В результате строка запроса будет содержать оба номера страниц, например,<br>`?postPage=1&commentPage=2`.

### Использование пользовательской разметки пагинации

Чтобы использовать пользовательскую разметку пагинации, начните с расположений файлов ниже и скопируйте содержимое в фрагмент внутри вашей темы.

Шаблон | Описание
------------- | -------------
`default` | Стандартный шаблон пагинации.<br>Расположение: `~/modules/system/views/pagination/default.htm`
`simple` | Пагинация только с кнопками «Назад» и «Вперёд».<br>Расположение: `~/modules/system/views/pagination/simple.htm`
`ajax` | AJAX-пагинация записей.<br>Расположение: `~/modules/system/views/pagination/ajax.htm`

Затем отрендерите как фрагмент, передав опцию `partial` в pager.

```twig
{{ pager(records, { partial: 'my-custom-pagination' }) }}
```

## AJAX-пагинация

Используйте Twig-функцию `ajaxPager()` для динамического обновления пагинированных записей с помощью AJAX. Фрагмент должен отображать записи и включать пагинатор внутри, например, фрагмент с именем **latest-posts.htm** со следующим содержимым.

```twig
<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ ajaxPager(posts) }}
</nav>
```

Затем отрендерите фрагмент на странице с помощью [Twig-тега `{% ajaxPartial %}`](../../markup/tag/ajax-partial.md).

::: cmstemplate
```ini
url = "/blog"

[collection blog]
handle = "Blog\Post"
```
```twig
{% set posts = blog.paginate(10) %}

<h3>Latest Posts</h3>
{% ajaxPartial 'latest-posts' %}
```
:::

Альтернативно вы можете инкапсулировать всю логику внутри фрагмента, чтобы сделать его полностью переносимым.

::: cmstemplate
```ini
[collection blog]
handle = "Blog\Post"
```
```twig
{% set posts = blog.paginate(10) %}

<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ ajaxPager(posts) }}
</nav>
```
:::

Фрагмент затем можно отрендерить в любом месте страницы или макета без дополнительной настройки.

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'latest-posts' %}
```
:::

## Пагинация «Загрузить ещё»

Кнопка «Загрузить ещё», иногда называемая бесконечным загрузчиком, — это метод отображения записей стопкой вместо разбиения на несколько страниц.

Этот подход использует AJAX-фрагмент для добавления нового содержимого вместе с самоуничтожающейся кнопкой. Например, фрагмент с именем **load-more-posts.htm** со следующим содержимым.

```twig
{% set posts = blog.paginate(10) %}

<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

{% if posts.hasMorePages %}
    <button
        data-request="onAjax"
        data-request-update="{ _self: '@' }"
        data-request-success="this.remove()"
        data-request-data="{ page: {{ posts.currentPage + 1 }} }"
        data-attach-loading>
        Load More
    </button>
{% endif %}
```

Элемент button использует комбинацию AJAX-атрибутов для выполнения [самообновления в режиме добавления](../ajax/update-partials.md), передавая номер следующей страницы в качестве данных и удаляя себя после завершения.

Фрагмент должен быть отрендерен с помощью [Twig-тега `{% ajaxPartial %}`](../../markup/tag/ajax-partial.md).

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'load-more-posts' %}
```
:::

#### См. также

::: also
* [Пагинация моделей](../../extend/database/pagination.md)
* [Twig-функция pager](../../markup/function/pager.md)
:::
