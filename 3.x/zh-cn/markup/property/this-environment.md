---
subtitle: Twig 属性
---
# this.environment

您可以通过 `this.environment` 访问当前环境对象，它返回一个引用[当前环境配置](../../setup/configuration.md)的字符串。

## 示例

以下示例将在网站运行于测试环境时显示一个横幅：

```twig
{% if this.environment == 'test' %}

    <div class="banner">Test Environment</div>

{% endif %}
```
