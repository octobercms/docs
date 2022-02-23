# this.environment

您可以通过 `this.environment` 访问当前环境对象，它会返回一个引用 [当前环境配置](../setup/configuration.md#oc-environment-configuration)的字符串。

## 例子

如果网站在测试环境中运行，以下示例将显示横幅：

```twig
{% if this.environment == 'test' %}

    <div class="banner">测试环境</div>

{% endif %}
```
