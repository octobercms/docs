# dump()

The `dump()` function dumps information about a template variable. This is useful when debugging a template that does not behave as expected.

    {{ dump(user) }}

You can inspect several variables by passing them as additional arguments:

    {{ dump(user, categories) }}

If you don't pass any value, all variables from the current context are dumped:

    {{ dump() }}
