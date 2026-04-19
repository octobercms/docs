---
subtitle: Twig-свойство
---
# this.page

Вы можете получить доступ к текущему объекту страницы через `this.page`, который возвращает объект `Cms\Classes\Page`. К этому объекту также можно обратиться в [PHP-коде страницы](../../cms/themes/pages.md) как `$this->page`.

## Свойства

`this.page` имеет следующие свойства.

### layout

Ссылка на имя макета, используемого этой страницей, если определено. Не путать с `this.layout`.

```twig
{{ this.page.layout }}
```

### id

Преобразует имя файла страницы и имя папки в CSS-совместимый идентификатор.

```twig
<body class="page-{{ this.page.id }}">
```

Если файл страницы — **home/index.htm**, это сгенерирует имя класса `page-home-index`.

### title

Заголовок страницы, определённый в конфигурации.

```twig
<h1>{{ this.page.title }}</h1>
```

### description

Описание страницы, определённое в конфигурации.

```twig
<p>{{ this.page.description }}</p>
```

### meta_title

Альтернативное поле `title`, обычно более описательное для целей SEO.

```twig
<title>{{ this.page.meta_title }}</title>
```

### meta_description

Альтернативное поле `description`, обычно более описательное для целей SEO.

```twig
<meta name="description" content="{{ this.page.meta_description }}">
```

### hidden

Скрытые страницы доступны только авторизованным пользователям панели администрирования.

```twig
{% if this.page.hidden %}
    <p>Note to other admins: We are currently working on this page.</p>
{% endif %}
```

### fileName

Имя файла страницы в теме с расширением.

### baseFileName

Имя файла страницы в теме без расширения.
