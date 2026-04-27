---
subtitle: Twig 过滤器
---
# |default

`|default` 过滤器在被过滤的值未定义或为空时返回作为第一个参数传递的值，否则返回被过滤的值。

```twig
{{ variable|default('The variable is not defined') }}

{{ variable.foo|default('The foo property on variable is not defined') }}

{{ variable['foo']|default('The foo key in variable is not defined') }}

{{ ''|default('The variable is empty') }}
```

当在使用变量的某些方法调用的表达式中使用 `default` 过滤器时，请确保在变量可能未定义的地方都使用 `default` 过滤器：

```twig
{{ variable.method(foo|default('bar'))|default('bar') }}
```
