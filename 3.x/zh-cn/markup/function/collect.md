---
subtitle: Twig 函数
---
# collect()

`collect()` 函数为在 Twig 中构建数组提供了更友好的接口。Twig 作为视图层有意保持简约，构建数组需要持续的合并过程。

以下示例使用原生 Twig `|merge` 过滤器来构建数组：

```twig
{% set array = [] %}
{% for item in items %}
    {% set array = array|merge([{ title: item.title, ... }]) %}
{% endfor %}
```

使用 `collect()` 函数返回[一个集合对象](../../extend/services/collection.md)，允许您使用 push 方法添加元素。上述示例可以使用 `push` 方法实现。

```twig
{% set array = collect() %}
{% for item in items %}
    {% do array.push({ title: item.title, ... }) %}
{% endfor %}
```

将数组作为第一个参数传递可以用预填充的项目初始化集合。

```twig
{% set array = collect([
    { title: item.title, ... },
    { title: item.title, ... }
]) %}
```

## shuffle

`shuffle()` 方法用于随机打乱集合。

```twig
{{ collect(songs).shuffle() }}
```

在 foreach 循环中使用。

```twig
{% for fruit in collect(['apple', 'banana', 'orange']).shuffle() %}
    {{ fruit }}
{% endfor %}
```

## sortBy

`sortBy()` 和 `sortByDesc` 方法可以按给定字段（键）对集合进行排序。

```twig
collect(data).sortBy('age')
```

例如：

```twig
// Output: John David
{% set data = [{'name': 'David', 'age': 31}, {'name': 'John', 'age': 28}] %}

{% for item in collect(data).sortBy('age') %}
    {{ item.name }}&nbsp;
{% endfor %}
```

#### 参见

::: also
* [构建 API 资源](../../cms/resources/building-apis.md)
:::
