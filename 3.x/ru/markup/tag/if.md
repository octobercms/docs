---
subtitle: Twig-тег
---
# {% if %}

Теги `{% if %}` и `{% endif %}` представляют выражение и аналогичны операторам if в PHP. В простейшей форме можно проверить, вычисляется ли выражение как `true`:

```twig
{% if online == false %}
    <p>The website is in maintenance mode.</p>
{% endif %}
```

Вы также можете проверить, не пуст ли массив:

```twig
{% if users %}
    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>
{% endif %}
```

> **Примечание**: Если вы хотите проверить, определена ли переменная, используйте `{% if users is defined %}`.

Вы также можете использовать `not` для проверки значений, вычисляемых как `false`:

```twig
{% if not user.subscribed %}
    <p>You are not subscribed to our mailing list.</p>
{% endif %}
```

Для множественных выражений можно использовать `{% elseif %}` и `{% else %}`:

```twig
{% if kenny.sick %}
    Kenny is sick.
{% elseif kenny.dead %}
    You killed Kenny! You bastard!!!
{% else %}
    Kenny looks okay so far.
{% endif %}
```

## Правила выражений

Правила определения истинности или ложности выражения такие же, как в PHP. Вот граничные случаи:

Значение | Логическое вычисление
------------- | -------------
*пустая строка* | false
*числовой ноль* | false
*строка только из пробелов* | true
*пустой массив* | false
*null* | false
*непустой массив* | true
*объект* | true
