# {% for %}

`{% for %}` 和 `{% endfor %}` 标签将遍历集合中的每个值。 集合可以是数组，也可以是实现了 `Traversable` 接口的对象。

```twig
<ul>
    {% for user in users %}
        <li>{{ user.username }}</li>
    {% endfor %}
</ul>
```

您还可以访问键和值：

```twig
<ul>
    {% for key, user in users %}
        <li>{{ key }}: {{ user.username }}</li>
    {% endfor %}
</ul>
```

如果集合为空，您可以使用 else 渲染替换块：

```twig
<ul>
    {% for user in users %}
        <li>{{ user.username }}</li>
    {% else %}
        <li><em>没有找到用户</em></li>
    {% endfor %}
</ul>
```

## 循环集合

如果确实需要遍历数字集合，可以使用 `..` 运算符:

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

`..` 运算符可以在两边使用任何表达式

```twig
{% for letter in 'a'|upper..'z'|upper %}
    - {{ letter }}
{% endfor %}
```

## 添加条件

与 PHP 不同，循环中没有"break"或"continue"的功能，但是您仍然可以过滤集合。 以下示例跳过所有不活动的`users`：
```twig
<ul>
    {% for user in users if user.active %}
        <li>{{ user.username }}</li>
    {% endfor %}
</ul>
```

## 循环变量

在`for`循环块的内部可以访问一些特殊变量:

变量| 描述
------------- | -------------
`loop.index` | 循环的当前迭代。 (1索引)
`loop.index0` | 循环的当前迭代。 (0索引)
`loop.revindex` | 循环结束的迭代次数(1索引)
`loop.revindex0` | 循环末尾的迭代次数(0索引)
`loop.first` | 如果第一次迭代则为true
`loop.last` |  如果最后一次迭代则为true
`loop.length` | 序列中的项目数
`loop.parent` | 父上下文

```twig
{% for user in users %}
    {{ loop.index }} - {{ user.username }}
{% endfor %}
```
