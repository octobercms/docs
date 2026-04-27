---
subtitle: Twig-тег
---
# {% macro %}

Тег `{% macro %}` позволяет определять пользовательские функции в шаблонах, аналогично обычным языкам программирования.

```twig
{% macro input() %}
    ...
{% endmacro %}
```

Также можно указать имя макроса после закрывающего тега для лучшей читаемости:

```twig
{% macro input() %}
    ...
{% endmacro input %}
```

Следующий пример определяет функцию `input()`, принимающую 4 аргумента. Связанные значения доступны как переменные внутри разметки.

```twig
{% macro input(name, value, type, size) %}
    <input
        type="{{ type|default('text') }}"
        name="{{ name }}"
        value="{{ value|e }}"
        size="{{ size|default(20) }}" />
{% endmacro %}
```

> **Примечание**: Аргументы макросов не определяют значения по умолчанию и всегда считаются необязательными.

## Вызов макросов

Перед использованием макроса его необходимо «импортировать» с помощью тега `{% import %}`. Если макрос определён в том же шаблоне, можно использовать специальную переменную `_self`.

```twig
{% import _self as form %}
```

Здесь функции макроса назначены переменной `form` и доступны для вызова как любая другая функция.

```twig
<p>{{ form.input('username') }}</p>
<p>{{ form.input('password', null, 'password') }}</p>
```

Макросы можно определять в [фрагменте темы](../../cms/themes/partials.md) и импортировать по имени. Чтобы импортировать макросы из фрагмента с именем **macros/form.htm**, просто передайте имя после тега `import` в кавычках как строку.

```twig
{% import 'macros/form' as form %}
```

Также можно импортировать макросы из [системного файла представления](../../extend/services/response-view.md) — они также будут приняты. Чтобы импортировать из **plugins/acme/blog/views/macros.htm**, просто передайте подсказку пути.

```twig
{% import 'acme.blog::macros' as form %}
```

## Вложенные макросы

Если вы хотите использовать макрос внутри другого макроса из того же шаблона, необходимо импортировать его локально.

```twig
{% macro input(name, value, type, size) %}
    <input
        type="{{ type|default('text') }}"
        name="{{ name }}"
        value="{{ value|e }}"
        size="{{ size|default(20) }}" />
{% endmacro %}

{% macro wrapped_input(name, value, type, size) %}
    {% import _self as form %}

    <div class="field">
        {{ form.input(name, value, type, size) }}
    </div>
{% endmacro %}
```

## Контекстная переменная

Макросы не имеют доступа к переменным текущей страницы.

```twig
<!-- October CMS -->
{{ site_name }}

{% macro myFunction() %}
    <!-- NULL -->
    {{ site_name }}
{% endmacro %}
```

Вы можете передать переменные в функцию, используя специальную переменную `_context`.

```twig
{% macro myFunction(vars) %}
    {{ vars.site_name }}
{% endmacro %}

{% import _self as form %}

<!-- October CMS -->
{{ form.myFunction(_context) }}
```
