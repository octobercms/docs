# this.layout

Используйте переменную `this.layout`, чтобы получить информацию о текущем шаблоне.

## Свойства

Объект `this.layout` класса `Cms\Classes\Layout` имеет следующие свойства.

### id

Преобразует имя файла шаблона и имя папки в CSS-идентификатор.

```twig
<body class="layout-{{ this.layout.id }}">
```

### description

Описание шаблона (указывается в административной части сайта).

```twig
<meta name="description" content="{{ this.layout.description }}">
```
