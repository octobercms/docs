# |default

The `|default` filter returns the value passed as the first argument if the filtered value is undefined or empty, otherwise the filtered value is returned.

    {{ variable|default('The variable is not defined') }}

    {{ variable.foo|default('The foo property on variable is not defined') }}

    {{ variable['foo']|default('The foo key in variable is not defined') }}

    {{ ''|default('The variable is empty')  }}

When using the `default` filter on an expression that uses variables in some method calls, be sure to use the `default` filter whenever a variable can be undefined:

    {{ variable.method(foo|default('bar'))|default('bar') }}
