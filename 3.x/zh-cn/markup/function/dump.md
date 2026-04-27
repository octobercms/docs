---
subtitle: Twig 函数
---
# dump()

`dump()` 函数转储模板变量的信息。这在调试行为不符合预期的模板时非常有用。

```twig
{{ dump(user) }}
```

您可以通过将多个变量作为附加参数传递来检查它们：

```twig
{{ dump(user, categories) }}
```

如果不传递任何值，将转储当前上下文中的所有变量：

```twig
{{ dump() }}
```

## d()

`d()` 函数是 Twig 中调试的简短语法。它显示的对象细节较少，但使值更易于一目了然。它将以与 PHP `dd()` 函数相同的方式递归转储提供的变量。

```twig
{{ d(user) }}
```

您也可以在参数中传递多个变量。

```twig
{{ d(variable1, variable2) }}
```

`dd()` 函数是一个替代方案，它将转储值然后终止进程。

```twig
{{ dd('dump and die') }}
```

::: warning
当[安全模式启用](../../setup/configuration.md)时，`dump()` 和 `d()` 函数不可用。
:::
