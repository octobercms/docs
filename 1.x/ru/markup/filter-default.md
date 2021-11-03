# |default

Фильтр `| default` возвращает значение, переданное в качестве первого аргумента, если отфильтрованное значение не определено или пустое, в противном случае возвращается отфильтрованное значение.

    {{ variable|default('The variable is not defined') }}

    {{ variable.foo|default('The foo property on variable is not defined') }}

    {{ variable['foo']|default('The foo key in variable is not defined') }}

    {{ ''|default('The variable is empty')  }}

    {{ variable.method(foo|default('bar'))|default('bar') }}
