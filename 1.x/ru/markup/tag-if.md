# {% if %}

Теги `{% if %}` и `{% endif %}`создают конструкцию, которая является аналогией условного оператора `if` в PHP. Пример:

```twig
{% if online == false %}
    <p>The website is in maintenance mode.</p>
{% endif %}
```

Пример проверки массива на пустоту:

```twig
{% if users %}
    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>
{% endif %}
```

> **Примечание**: Если Вы хотите проверить, была ли определена переменная, то необходимо использовать следующее выражение: `{% if users is defined %}`.

Вы также можете использовать `not` для проверки значений:

```twig
{% if not user.subscribed %}
    <p>You are not subscribed to our mailing list.</p>
{% endif %}
```

Если у Вас есть несколько условий, используйте `{% elseif %}` и `{% else %}`:

```twig
{% if kenny.sick %}
    Kenny is sick.
{% elseif kenny.dead %}
    You killed Kenny! You bastard!!!
{% else %}
    Kenny looks okay so far.
{% endif %}
```

## Правила

Правила, которые определяют, является ли выражение истинным или ложным, такие же как и в PHP:

Значение | Истинность
------------- | -------------
*empty string* | false
*numeric zero* | false
*whitespace-only string* | true
*empty array* | false
*null* | false
*non-empty array* | true
*object* | true
