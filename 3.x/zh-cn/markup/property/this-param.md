---
subtitle: Twig 属性
---
# this.param

您可以通过 `this.param` 访问当前 URL 参数，它返回一个 PHP 数组。

## 访问页面参数

此示例演示如何在页面中访问 `tab` URL 参数。

::: cmstemplate
```ini
url = "/account/:tab"
```
```twig
{% if this.param.tab == 'details' %}

    <p>Here are all your details</p>

{% elseif this.param.tab == 'history' %}

    <p>You are viewing a blast from the past</p>

{% endif %}
```
:::

如果参数名同时也是一个变量，则可以使用数组语法。

::: cmstemplate
```ini
url = "/account/:post_id"
```
```twig
{% set name = 'post_id' %}

<p>The post ID is: {{ this.param[name] }}</p>
```
:::
