# |default

如果过滤后的值未定义或为空,`|default` 过滤器将返回第一个参数传递的值,否则返回过滤后的值
```twig
{{ variable|default('变量未定义') }}

{{ variable.foo|default('变量上的 foo 属性未定义') }}

{{ variable['foo']|default('变量中的 foo 键未定义') }}

{{ ''|default('变量为空') }}
```

当使用 default 筛选在某些方法调用中使用变量的表达式，请确保使用 default 当变量未定义时过滤：

```twig
{{ variable.method(foo|default('bar'))|default('bar') }}
```
