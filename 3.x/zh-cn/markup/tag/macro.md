---
subtitle: Twig 标签
---
# {% macro %}

`{% macro %}` 标签允许你在模板中定义自定义函数，类似于常规编程语言。

```twig
{% macro input() %}
    ...
{% endmacro %}
```

你也可以在结束标签后包含宏的名称以提高可读性：

```twig
{% macro input() %}
    ...
{% endmacro input %}
```

以下示例定义了一个名为 `input()` 的函数，它接受 4 个参数，相关的值在内部的标记中作为变量被访问。

```twig
{% macro input(name, value, type, size) %}
    <input
        type="{{ type|default('text') }}"
        name="{{ name }}"
        value="{{ value|e }}"
        size="{{ size|default(20) }}" />
{% endmacro %}
```

> **注意**：宏参数不指定默认值，始终被视为可选的。

## 调用宏

在使用宏之前，需要先使用 `{% import %}` 标签进行"导入"。如果宏定义在同一模板中，可以使用特殊的 `_self` 变量。

```twig
{% import _self as form %}
```

这里宏函数被分配给了 `form` 变量，可以像任何其他函数一样调用。

```twig
<p>{{ form.input('username') }}</p>
<p>{{ form.input('password', null, 'password') }}</p>
```

宏可以定义在[主题部件](../../cms/themes/partials.md)中，并通过名称导入。要从名为 **macros/form.htm** 的部件导入宏，只需在 `import` 标签后以引号字符串的形式传递名称即可。

```twig
{% import 'macros/form' as form %}
```

你也可以从[系统视图文件](../../extend/services/response-view.md)导入宏，这些也是可以接受的。要从 **plugins/acme/blog/views/macros.htm** 导入，只需传递路径提示即可。

```twig
{% import 'acme.blog::macros' as form %}
```

## 嵌套宏

当你想在同一模板中的另一个宏内使用宏时，需要在本地导入它。

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

## 上下文变量

宏无法访问当前页面的变量。

```twig
<!-- October CMS -->
{{ site_name }}

{% macro myFunction() %}
    <!-- NULL -->
    {{ site_name }}
{% endmacro %}
```

你可以使用特殊的 `_context` 变量将变量传递给函数。

```twig
{% macro myFunction(vars) %}
    {{ vars.site_name }}
{% endmacro %}

{% import _self as form %}

<!-- October CMS -->
{{ form.myFunction(_context) }}
```
