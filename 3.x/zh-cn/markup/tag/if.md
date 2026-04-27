---
subtitle: Twig 标签
---
# {% if %}

`{% if %}` 和 `{% endif %}` 标签表示一个表达式，类似于 PHP 的 if 语句。在最简单的形式中，你可以用它来测试表达式是否为 `true`：

```twig
{% if online == false %}
    <p>The website is in maintenance mode.</p>
{% endif %}
```

你也可以测试数组是否不为空：

```twig
{% if users %}
    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>
{% endif %}
```

> **注意**：如果你想测试变量是否已定义，请使用 `{% if users is defined %}`。

你也可以使用 `not` 来检查值是否为 `false`：

```twig
{% if not user.subscribed %}
    <p>You are not subscribed to our mailing list.</p>
{% endif %}
```

对于多个表达式，可以使用 `{% elseif %}` 和 `{% else %}`：

```twig
{% if kenny.sick %}
    Kenny is sick.
{% elseif kenny.dead %}
    You killed Kenny! You bastard!!!
{% else %}
    Kenny looks okay so far.
{% endif %}
```

## 表达式规则

确定表达式为 true 还是 false 的规则与 PHP 相同，以下是边界情况的规则：

Value | Boolean evaluation
------------- | -------------
*empty string* | false
*numeric zero* | false
*whitespace-only string* | true
*empty array* | false
*null* | false
*non-empty array* | true
*object* | true
