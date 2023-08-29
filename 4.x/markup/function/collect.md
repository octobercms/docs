---
subtitle: Twig Function
---
# collect()

The `collect()` function provides a nicer interface for building arrays in Twig. Twig is intentionally minimalist as a view layer and building an array requires a continuous merge process.

Take the following example to build an array using the native Twig `|merge` filter:

```twig
{% set array = [] %}
{% for item in items %}
    {% set array = array|merge([{ title: item.title, ... }]) %}
{% endfor %}
```

Using the `collect()` function returns [a collection object](../../extend/services/collection.md) that lets you push elements instead. The above example can be achieve using the `push` method.

```twig
{% set array = collect() %}
{% for item in items %}
    {% do array.push({ title: item.title, ... }) %}
{% endfor %}
```

Passing an array as the first argument will initialize the collection with items prepopulated.

```twig
{% set array = collect([
    { title: item.title, ... },
    { title: item.title, ... }
]) %}
```

## shuffle

The `shuffle()` method shuffles the collection.

```twig
{{ collect(songs).shuffle() }}
```

In a foreach loop.

```twig
{% for fruit in collect(['apple', 'banana', 'orange']).shuffle() %}
    {{ fruit }}
{% endfor %}
```

## sortBy

The `sortBy()` and `sortByDesc` methods can sort a collection by given field (key).

```twig
collect(data).sortBy('age')
```

For example:

```twig
// Output: John David
{% set data = [{'name': 'David', 'age': 31}, {'name': 'John', 'age': 28}] %}

{% for item in collect(data).sortBy('age') %}
    {{ item.name }}&nbsp;
{% endfor %}
```

#### See Also

::: also
* [Building API Resources](../../cms/resources/building-apis.md)
:::
