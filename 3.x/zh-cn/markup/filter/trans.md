---
subtitle: Twig 过滤器
---
# |trans

`|trans` 和 `|trans_choice` 过滤器使用应用程序的本地化配置来翻译传入的值。可以通过传递字符串的默认翻译来加载本地化字符串。

```twig
{{ 'I love programming.'|trans }};
```

通过将数组作为第一个参数传递，可以在翻译字符串中替换参数。每个参数都以 `:` 字符为前缀。

```twig
{{ ':name loves programming.'|trans({ name: 'Jeff' }) }}
```

## 复数化

`trans_choice` 函数用于处理复数值。

```twig
{{ 'There is one apple|There are many apples'|trans_choice(3) }}
```

第二个参数可以包含参数。

```twig
{{ '{1} :value minute ago|[2,*] :value minutes ago'|trans_choice(5, { value: 5 }) }}
```

## 简短语法

`_` 和 `__` 过滤器可以与 `trans` 和 `trans_choice` 过滤器互换使用。

```twig
{{ 'I love programming.'|_ }}

{{ '{1} :value minute ago|[2,*] :value minutes ago'|__(1, { value: 1 }) }}
```

#### 参见

::: also
* [CMS 主题本地化](../../cms/themes/settings.md)
* [Laravel 本地化](https://laravel.com/docs/10.x/localization)
:::
