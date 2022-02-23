# this.param

您可以通过 `this.param` 访问当前 URL 参数，它会返回一个 PHP 数组。

## 访问页面参

此示例演示如何访问页面中的 `tab` URL 参数。 

```
url = "/account/:tab"
==
{% if this.param.tab == 'details' %}

    <p>这是您的所有详细信息</p>

{% elseif this.param.tab == 'history' %}

    <p>你看到的是过去的爆炸</p>

{% endif %}
```

如果参数名称也是变量，则可以使用数组语法。

```
url = "/account/:post_id"
==
{% set name = 'post_id' %}

<p>帖子ID是: {{ this.param[name] }}</p>
```
