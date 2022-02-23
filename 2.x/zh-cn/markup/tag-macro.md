# {% macro %}

`{% macro %}` 标签允许您在模板中定义自定义函数，类似于常规编程语言。

```twig
{% macro input() %}
    ...
{% endmacro %}
```

或者，您可以在结束标记后包含macro的名称以提高可读性：

```twig
{% macro input() %}
    ...
{% endmacro input %}
```

以下示例定义了一个名为 `input()` 的函数，该函数接受 4 个参数，关联的值作为内部标记中的变量进行访问。

```twig
{% macro input(name, value, type, size) %}
    <input
        type="{{ type|default('text') }}"
        name="{{ name }}"
        value="{{ value|e }}"
        size="{{ size|default(20) }}" />
{% endmacro %}
```

> **注意**：macro参数不指定默认值，并且始终被认为是可选的。

## 调用宏

在使用macro之前，需要先使用`{% import %}`标签"导入"它。如果macro定义在同一个模板中，可以使用特殊的`_self`变量。

```twig
{% import _self as form %}
```

在这里，macro函数被分配给 `form` 变量，可以像任何其他函数一样被调用。

```twig
<p>{{ form.input('username') }}</p>
<p>{{ form.input('password', null, 'password') }}</p>
```

Macros 可以在 [主题部件](../cms/partials.md) 中定义并按名称导入. 要从名为 **macros/form.htm** 的部件导入macro，只需在 `import` 标记后传递名称作为字符串引用。

```twig
{% import 'macros/form' as form %}
```

或者，您可以从 [系统视图文件](../services/response-view.md#oc-views)导入macro，要从 **plugins/acme/blog/views/macros.htm** 导入，只需传递路径提示即可。

```twig
{% import 'acme.blog::macros' as form %}
```

## 嵌套宏

当您想在同一模板的另一个macro中使用macro时，您需要在本地导入它。

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

macro无权访问当前页面变量

```twig
<!-- October CMS -->
{{ site_name }}

{% macro myFunction() %}
    <!-- NULL -->
    {{ site_name }}
{% endmacro %}
```

您可以使用特殊的 `_context` 变量将变量传递给函数。

```twig
{% macro myFunction(vars) %}
    {{ vars.site_name }}
{% endmacro %}

{% import _self as form %}

<!-- October CMS -->
{{ form.myFunction(_context) }}
```
