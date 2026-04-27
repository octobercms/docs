---
subtitle: Twig 标签
---
# {% for %}

`{% for %}` 和 `{% endfor %}` 标签将遍历集合中的每个值。集合可以是数组或实现了 `Traversable` 接口的对象。

```twig
<ul>
    {% for user in users %}
        <li>{{ user.username }}</li>
    {% endfor %}
</ul>
```

你也可以同时访问键和值：

```twig
<ul>
    {% for key, user in users %}
        <li>{{ key }}: {{ user.username }}</li>
    {% endfor %}
</ul>
```

如果集合为空，你可以使用 else 渲染一个替代块：

```twig
<ul>
    {% for user in users %}
        <li>{{ user.username }}</li>
    {% else %}
        <li><em>There are no users found</em></li>
    {% endfor %}
</ul>
```

## 遍历集合

如果你需要遍历一组数字，可以使用 `..` 运算符：

```twig
{% for i in 0..10 %}
    - {{ i }}
{% endfor %}
```

上面的代码片段将打印从 0 到 10 的所有数字。

它也可以用于字母：

```twig
{% for letter in 'a'..'z' %}
    - {{ letter }}
{% endfor %}
```

`..` 运算符两侧可以使用任何表达式：

```twig
{% for letter in 'a'|upper..'z'|upper %}
    - {{ letter }}
{% endfor %}
```

## 添加条件

与 PHP 不同，循环中没有 `break` 或 `continue` 函数，但你仍然可以过滤集合。以下示例跳过所有未激活的 `users`。

```twig
<ul>
    {% for user in users %}
        {% if user.active %}
            <li>{{ user.username }}</li>
        {% endif %}
    {% endfor %}
</ul>
```

## 循环变量

在 `for` 循环块内部，你可以访问一些特殊变量：

Variable | Description
------------- | -------------
`loop.index` | 当前循环迭代次数（从 1 开始）
`loop.index0` | 当前循环迭代次数（从 0 开始）
`loop.revindex` | 距循环结束的迭代次数（从 1 开始）
`loop.revindex0` | 距循环结束的迭代次数（从 0 开始）
`loop.first` | 如果是第一次迭代则为 true
`loop.last` | 如果是最后一次迭代则为 true
`loop.length` | 集合中的元素数量
`loop.parent` | 父级上下文

```twig
{% for user in users %}
    {{ loop.index }} - {{ user.username }}
{% endfor %}
```
