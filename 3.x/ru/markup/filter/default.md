---
subtitle: Twig-фильтр
---
# |default

Фильтр `|default` возвращает значение, переданное как первый аргумент, если фильтруемое значение не определено или пусто. В противном случае возвращается фильтруемое значение.

```twig
{{ variable|default('The variable is not defined') }}

{{ variable.foo|default('The foo property on variable is not defined') }}

{{ variable['foo']|default('The foo key in variable is not defined') }}

{{ ''|default('The variable is empty') }}
```

При использовании фильтра `default` в выражении, использующем переменные в вызовах методов, убедитесь, что фильтр `default` применяется всякий раз, когда переменная может быть не определена:

```twig
{{ variable.method(foo|default('bar'))|default('bar') }}
```
