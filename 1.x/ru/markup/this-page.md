# this.page

Используйте переменную `this.page`, чтобы получить информацию о текущей странице.

## Свойства

Объект `this.page` класса `Cms\Classes\Page` имеет следующие свойства.

### layout

Ссылка на название шаблона, который используется этой страницей. Не путать с `this.layout`.

```twig
{{ this.page.layout }}
```

### id

Преобразует имя файла страницы и имя папки в CSS-идентификатор.

```twig
<body class="page-{{ this.page.id }}">
```

### title

Заголовок страницы (указывается в административной части сайта).

```twig
<h1>{{ this.page.title }}</h1>
```

### description

Описание страницы (указывается в административной части сайта).

```twig
<p>{{ this.page.description }}</p>
```

### meta_title

Альтернативный заголовок страницы, который, обычно, используется для SEO.

```twig
<title>{{ this.page.meta_title }}</title>
```

### meta_description

Альтернативное описание страницы, которое, обычно, используется для SEO.

```twig
<meta name="description" content="{{ this.page.meta_description }}">
```

### hidden

Скрытые страницы доступны только зарегистрированным пользователям.

```twig
{% if this.page.hidden %}
    <p>Note to other admins: We are currently working on this page.</p>
{% endif %}
```

### fileName

Название файла с расширением.

### baseFileName

Название файла без расширения.
