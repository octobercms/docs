# {% partial %}

Тег `{% partial %}` анализирует содержимое [фрагмента](./cms/partials.md) и отображает его на странице. Для этого Вы должны указать название файла в качестве параметра:

```twig
{% partial "footer" %}
```

Вы также можете указать название папки, в котором лежит файл:

```twig
{% partial "sidebar/menu" %}
```

> **Примечание**: В разделе [Темы ( Themes )](./cms/themes.md#subdirectories) Вы сможете найти больше информации о работе с подпапками.

Вы можете использовать переменную, чтобы указать название файла:

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

<a name="variables"></a>
## Переменные

Вы можете передавать параметры в фрагменты, указав их после названия файла:

```twig
{% partial "blog-posts" posts=posts %}
```

Вы также можете указать произвольные переменные:

```twig
{% partial "location" city="Vancouver" country="Canada" %}
```

Пример:

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```
