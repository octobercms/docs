---
subtitle: Twig-функция
---
# collect()

Функция `collect()` предоставляет более удобный интерфейс для создания массивов в Twig. Twig намеренно минималистичен как слой представления, и построение массива требует непрерывного процесса слияния.

Рассмотрим следующий пример создания массива с использованием встроенного Twig-фильтра `|merge`:

```twig
{% set array = [] %}
{% for item in items %}
    {% set array = array|merge([{ title: item.title, ... }]) %}
{% endfor %}
```

Использование функции `collect()` возвращает [объект коллекции](../../extend/services/collection.md), который позволяет добавлять элементы с помощью push. Приведённый выше пример можно реализовать с помощью метода `push`.

```twig
{% set array = collect() %}
{% for item in items %}
    {% do array.push({ title: item.title, ... }) %}
{% endfor %}
```

Передача массива в качестве первого аргумента инициализирует коллекцию с предварительно заполненными элементами.

```twig
{% set array = collect([
    { title: item.title, ... },
    { title: item.title, ... }
]) %}
```

## shuffle

Метод `shuffle()` перемешивает коллекцию.

```twig
{{ collect(songs).shuffle() }}
```

В цикле foreach.

```twig
{% for fruit in collect(['apple', 'banana', 'orange']).shuffle() %}
    {{ fruit }}
{% endfor %}
```

## sortBy

Методы `sortBy()` и `sortByDesc` могут сортировать коллекцию по заданному полю (ключу).

```twig
collect(data).sortBy('age')
```

Например:

```twig
// Output: John David
{% set data = [{'name': 'David', 'age': 31}, {'name': 'John', 'age': 28}] %}

{% for item in collect(data).sortBy('age') %}
    {{ item.name }}&nbsp;
{% endfor %}
```

#### См. также

::: also
* [Создание API-ресурсов](../../cms/resources/building-apis.md)
:::
