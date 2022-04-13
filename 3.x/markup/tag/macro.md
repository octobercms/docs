# {% macro %}

The `{% macro %}` tag allows you to define custom functions in your templates, similar to regular programming languages.

```twig
{% macro input() %}
    ...
{% endmacro %}
```

Alternatively you can include the name of the macro after the end tag for better readability:

```twig
{% macro input() %}
    ...
{% endmacro input %}
```

The following example defines a function called `input()` that takes 4 arguments, the associated values are accessed as variables within the markup inside.

```twig
{% macro input(name, value, type, size) %}
    <input
        type="{{ type|default('text') }}"
        name="{{ name }}"
        value="{{ value|e }}"
        size="{{ size|default(20) }}" />
{% endmacro %}
```

> **Note**: Macro arguments don't specify default values and are always considered optional.

## Calling Macros

Before a macro can be used it needs to be "imported" first using the `{% import %}` tag. If the macro is defined in the same template, the special `_self` variable can be used.

```twig
{% import _self as form %}
```

Here the macro functions are assigned to the `form` variable, available to be called like any other function.

```twig
<p>{{ form.input('username') }}</p>
<p>{{ form.input('password', null, 'password') }}</p>
```

Macros can be defined in [a theme partial](../cms/partials.md) and imported by name. To import the macros from a partial called **macros/form.htm**, simply pass the name after the `import` tag quoted as a string.

```twig
{% import 'macros/form' as form %}
```

Alternatively you may import macros from a [system view file](../services/response-view.md#oc-views) and these will be accepted. To import from **plugins/acme/blog/views/macros.htm** simply pass the path hint instead.

```twig
{% import 'acme.blog::macros' as form %}
```

## Nested Macros

When you want to use a macro inside another macro from the same template, you need to import it locally.

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

## Context Variable

Macros don't have access to the current page variables.

```twig
<!-- October CMS -->
{{ site_name }}

{% macro myFunction() %}
    <!-- NULL -->
    {{ site_name }}
{% endmacro %}
```

You may pass the variables to the function using the special `_context` variable.

```twig
{% macro myFunction(vars) %}
    {{ vars.site_name }}
{% endmacro %}

{% import _self as form %}

<!-- October CMS -->
{{ form.myFunction(_context) }}
```
