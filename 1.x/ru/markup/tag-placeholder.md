# {% placeholder %}

Тег `{% placeholder %}` отображает содержимое между двумя тегами `{% put %}` и `{% endput %}`, которое обычно [находится внутри Шаблонов ( Макетов, Layouts )](./cms-layouts#placeholders).

```twig
{% placeholder name %}
```

Вы можете добавить тег `{% placeholder %}` в шаблон, фрагмент или на страницу.

```twig
{% put name %}
    <p>Place this text in the name placeholder</p>
{% endput %}
```

<a name="default-placeholder-content"></a>
## Содержимое по умолчанию

Вы можете указать содержимое по умолчанию, которое может быть заменено или дополнено уже на странице.

Пример определения заменителя в шаблоне:

```twig
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

Пример расширения заменителя на странице:

```twig
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

<a name="checking-placeholder-exits"></a>
## Проверка наличия заменителя

Вы можете проверить наличие содержимого заполнителя в шаблоне при помощи функции `placeholder ()`. Пример:

```twig
{% if placeholder('sidemenu') %}
    <!-- Markup for a page with a sidebar -->
    <div class="row">
        <div class="col-md-3">
            {% placeholder sidemenu %}
        </div>
        <div class="col-md-9">
            {% page %}
        </div>
    </div>
{% else %}
    <!-- Markup for a page without a sidebar -->
    {% page %}
{% endif %}
```

<a name="custom-placeholder-attributes"></a>
## Пользовательские атрибуты

Тег `placeholder` принимает два необязательных атрибута: `title` и `type`. Атрибут `title` не используется самой CMS, но может пригодиться при работе с  другими плагинами. Атрибут `type` управляет типом заменителя. На данный момент их всего два: **text** и **html**. Содержимое текстовых заменителей экранируется перед его отображением. Атрибуты заголовка и типа должны быть определены после названия заменителя и атрибута `default` (если он указан). Пример:

```twig
{% placeholder ordering default title="Ordering information" type="text" %}
    There is no ordering information for this product.
{% endplaceholder %}
```
