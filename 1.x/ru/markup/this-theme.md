# this.theme

Используйте переменную `this.theme`, чтобы получить информацию о текущей теме.
You can access the current theme object via `this.theme` and it returns the object `Cms\Classes\Theme`, a reference to the [theme customization object](../themes/development#customization).

## Свойства

Объект `this.theme` класса `Cms\Classes\Theme` имеет прямой доступ к [полям темы](./themes/development#customization), а также имеет следующие свойства.

### id

Преобразует имя папки с темой в CSS-идентификатор.

```twig
<body class="theme-{{ this.theme.id }}">
```

### config

Массив, с настройкам темы, которые были найденные в файле `theme.yaml`.

```twig
<meta name="description" content="{{ this.theme.config.description }}">
```
