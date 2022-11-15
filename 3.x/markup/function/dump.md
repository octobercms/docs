---
subtitle: Twig Function
---
# dump()

The `dump()` function dumps information about a template variable. This is useful when debugging a template that does not behave as expected.

```twig
{{ dump(user) }}
```

You can inspect several variables by passing them as additional arguments:

```twig
{{ dump(user, categories) }}
```

If you don't pass any value, all variables from the current context are dumped:

```twig
{{ dump() }}
```

## d()

The `d()` function acts as shorter syntax for debugging in Twig. It will show less detail about the object but makes the values easier to see all at once. It will recursively dump provided variables in the same manner as the `dd()` PHP function.

```twig
{{ d(user) }}
```

You may also pass multiple variables in the arguments.

```twig
{{ d(variable1, variable2) }}
```

The `dd()` function is an alternative that will dump the values and then terminate the process.

```twig
{{ dd('dump and die') }}
```

::: warning
The `dump()` and `d()` functions are not available when [safe mode is enabled](../../setup/configuration.md).
:::
