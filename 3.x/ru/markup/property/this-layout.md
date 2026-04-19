---
subtitle: Twig-свойство
---
# this.layout

Вы можете получить доступ к текущему объекту макета через `this.layout`, который возвращает объект `Cms\Classes\Layout`.

## Свойства

`this.layout` имеет следующие свойства.

### id

Преобразует имя файла макета и имя папки в CSS-совместимый идентификатор.

```twig
<body class="layout-{{ this.layout.id }}">
```

Если файл макета — **default.htm**, это сгенерирует имя класса `layout-default`.

### description

Описание макета, определённое в конфигурации.

```twig
<meta name="description" content="{{ this.layout.description }}">
```
