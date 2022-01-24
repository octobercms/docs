# {% if %}

`{％ if ％}`和`{％ endif ％}`标记将表示表达式，并且与PHP的If语句类似。在最简单的形式中，您可以使用它来测试表达式是否为`true`：

```twig
{% if online == false %}
    <p>该网站处于维护模式。</p>
{% endif %}
```

您还可以测试数组是否不为空：

```twig
{% if users %}
    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>
{% endif %}
```

>**注意**：如果要测试变量是否已定义，则使用`{% if users is defined %}`。

您也可以使用`not`来检查评估为`false`的值：

```twig
{% if not user.subscribed %}
    <p>您没有订阅我们的邮件列表.</p>
{% endif %}
```

对于多个表达式， `{% elseif %}` 和 `{% else %}` 可以使用：

```twig
{% if kenny.sick %}
    肯尼病了。
{% elseif kenny.dead %}
    你杀了肯尼！ 你这个混蛋！！！
{% else %}
    到目前为止，肯尼看起来还不错。
{% endif %}
```

## 表达式规则

判断表达式是真还是假的规则与 PHP 中的相同：

值 | 布尔值
------------- | -------------
*空字符串* | false
*数字零* | false
*只有空格的字符串* | true
*空数组* | false
*NULL* | false
*非空数组* | true
*对象* | true
