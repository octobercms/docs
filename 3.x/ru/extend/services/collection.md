# Коллекция

Класс `October\Rain\Support\Collection` предоставляет удобную, выразительную обёртку для работы с массивами данных. Например, рассмотрим следующий код. Мы создадим новый экземпляр коллекции из массива, выполним функцию `strtoupper` для каждого элемента, а затем удалим все пустые элементы.

```php
$collection = new October\Rain\Support\Collection(['stewie', 'brian', null]);

$collection = $collection
    ->map(function ($name) {
        return strtoupper($name);
    })
    ->reject(function ($name) {
        return empty($name);
    })
;
```

Класс `Collection` позволяет цепочкой вызывать методы для удобного преобразования и сведения базового массива. В общем, каждый метод `Collection` возвращает совершенно новый экземпляр `Collection`.

## Создание коллекций

Как описано выше, передача массива в конструктор класса `October\Rain\Support\Collection` вернёт новый экземпляр для данного массива. Таким образом, создание коллекции очень просто:

```php
$collection = new October\Rain\Support\Collection([1, 2, 3]);
```

По умолчанию коллекции [моделей базы данных](../database/model.md) всегда возвращаются как экземпляры `Collection`; однако вы можете свободно использовать класс `Collection` везде, где это удобно для вашего приложения.

## Доступные методы

В оставшейся части документации мы обсудим каждый метод, доступный в классе `Collection`. Помните, все эти методы могут вызываться цепочкой для удобной манипуляции базовым массивом. Более того, почти каждый метод возвращает новый экземпляр `Collection`, позволяя сохранять оригинальную копию коллекции при необходимости.

Вы можете выбрать любой метод из этой таблицы, чтобы увидеть пример его использования:

<div class="content-list-p" markdown="1">

[all](#method-all)
[average](#method-average)
[avg](#method-avg)
[chunk](#method-chunk)
[collapse](#method-collapse)
[combine](#method-combine)
[concat](#method-concat)
[contains](#method-contains)
[containsStrict](#method-containsstrict)
[count](#method-count)
[countBy](#method-countBy)
[crossJoin](#method-crossjoin)
[dd](#method-dd)
[diff](#method-diff)
[diffAssoc](#method-diffassoc)
[diffKeys](#method-diffkeys)
[dump](#method-dump)
[duplicates](#method-duplicates)
[duplicatesStrict](#method-duplicatesstrict)
[each](#method-each)
[filter](#method-filter)
[first](#method-first)
[firstWhere](#method-first-where)
[flatMap](#method-flatmap)
[flatten](#method-flatten)
[flip](#method-flip)
[forget](#method-forget)
[forPage](#method-forpage)
[get](#method-get)
[groupBy](#method-groupby)
[has](#method-has)
[implode](#method-implode)
[intersect](#method-intersect)
[intersectByKeys](#method-intersectbykeys)
[isEmpty](#method-isempty)
[isNotEmpty](#method-isnotempty)
[join](#method-join)
[keyBy](#method-keyby)
[keys](#method-keys)
[last](#method-last)
[map](#method-map)
[mapInto](#method-mapinto)
[mapSpread](#method-mapspread)
[mapToGroups](#method-maptogroups)
[mapWithKeys](#method-mapwithkeys)
[max](#method-max)
[median](#method-median)
[merge](#method-merge)
[mergeRecursive](#method-mergerecursive)
[min](#method-min)
[mode](#method-mode)
[nth](#method-nth)
[only](#method-only)
[pad](#method-pad)
[partition](#method-partition)
[pipe](#method-pipe)
[pluck](#method-pluck)
[pop](#method-pop)
[prepend](#method-prepend)
[pull](#method-pull)
[push](#method-push)
[put](#method-put)
[random](#method-random)
[reduce](#method-reduce)
[reject](#method-reject)
[replace](#method-replace)
[replaceRecursive](#method-replacerecursive)
[reverse](#method-reverse)
[search](#method-search)
[shift](#method-shift)
[shuffle](#method-shuffle)
[skip](#method-skip)
[slice](#method-slice)
[some](#method-some)
[sort](#method-sort)
[sortBy](#method-sortby)
[sortByDesc](#method-sortbydesc)
[sortKeys](#method-sortkeys)
[sortKeysDesc](#method-sortkeysdesc)
[splice](#method-splice)
[split](#method-split)
[sum](#method-sum)
[take](#method-take)
[tap](#method-tap)
[times](#method-times)
[toArray](#method-toarray)
[toJson](#method-tojson)
[transform](#method-transform)
[union](#method-union)
[unique](#method-unique)
[uniqueStrict](#method-uniquestrict)
[unless](#method-unless)
[unlessEmpty](#method-unlessempty)
[unlessNotEmpty](#method-unlessnotempty)
[unwrap](#method-unwrap)
[values](#method-values)
[when](#method-when)
[whenEmpty](#method-whenempty)
[whenNotEmpty](#method-whennotempty)
[where](#method-where)
[whereStrict](#method-wherestrict)
[whereBetween](#method-wherebetween)
[whereIn](#method-wherein)
[whereInStrict](#method-whereinstrict)
[whereInstanceOf](#method-whereinstanceof)
[whereNotBetween](#method-wherenotbetween)
[whereNotIn](#method-wherenotin)
[whereNotInStrict](#method-wherenotinstrict)
[whereNotNull](#method-wherenotnull)
[whereNull](#method-wherenull)
[wrap](#method-wrap)
[zip](#method-zip)

</div>

## Список методов

<a name="method-all"></a>
#### `all()`

Метод `all` просто возвращает базовый массив, представленный коллекцией:

```php
$collection = new Collection([1, 2, 3]);

$collection->all();

// [1, 2, 3]
```

<a name="method-average"></a>
#### `average()`

Псевдоним для метода [`avg`](#method-avg).

<a name="method-avg"></a>
#### `avg()`

Метод `avg` возвращает [среднее значение](https://en.wikipedia.org/wiki/Average) данного ключа:

```php
$average = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->avg('foo');

// 20

$average = new Collection([1, 1, 2, 4])->avg();

// 2
```

<a name="method-chunk"></a>
#### `chunk()`

Метод `chunk` разбивает коллекцию на несколько меньших коллекций заданного размера:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

Этот метод особенно полезен в [страницах CMS](../cms/pages.md) при работе с сеточной системой, такой как [Bootstrap](https://getbootstrap.tld/css/#grid). Представьте, что у вас есть коллекция моделей, которые вы хотите отобразить в сетке:

```twig
{% for chunk in products.chunk(3) %}
    <div class="row">
        {% for product in chunk %}
            <div class="col-4">{{ product.name }}</div>
        {% endfor %}
    </div>
{% endfor %}
```

<a name="method-collapse"></a>
#### `collapse()`

Метод `collapse` сворачивает коллекцию массивов в одну плоскую коллекцию:

```php
$collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

$collapsed = $collection->collapse();

$collapsed->all();

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<a name="method-combine"></a>
#### `combine()`

Метод `combine` объединяет значения коллекции в качестве ключей со значениями другого массива или коллекции.

```php
$collection = new Collection(['name', 'age']);

$combined = $collection->combine(['George', 29]);

$combined->all();

// ['name' => 'George', 'age' => 29]
```

<a name="method-concat"></a>
#### `concat()`

Метод `concat` добавляет значения данного `массива` или коллекции в конец коллекции:

```php
$collection = new Collection(['John Doe']);

$concatenated = $collection->concat(['Jane Doe'])->concat(['name' => 'Johnny Doe']);

$concatenated->all();

// ['John Doe', 'Jane Doe', 'Johnny Doe']
```

<a name="method-contains"></a>
#### `contains()`

Метод `contains` определяет, содержит ли коллекция данный элемент:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 100]);

$collection->contains('Desk');

// true

$collection->contains('New York');

// false
```

Вы также можете передать пару ключ/значение в метод `contains`, который определит, существует ли данная пара в коллекции:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);

$collection->contains('product', 'Bookcase');

// false
```

Наконец, вы также можете передать callback в метод `contains` для выполнения собственного теста на истинность:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->contains(function ($value, $key) {
    return $value > 5;
});

// false
```

Метод `contains` использует «нестрогое» сравнение при проверке значений элементов, что означает, что строка с целочисленным значением будет считаться равной целому числу с тем же значением. Используйте метод [`containsStrict`](#method-containsstrict) для фильтрации с использованием «строгого» сравнения.

<a name="method-containsstrict"></a>
#### `containsStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`contains`](#method-contains); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-count"></a>
#### `count()`

Метод `count` возвращает общее количество элементов в коллекции:

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->count();

// 4
```

<a name="method-countBy"></a>
#### `countBy()`

Метод `countBy` подсчитывает вхождения значений в коллекции. По умолчанию метод подсчитывает вхождения каждого элемента:

```php
$collection = new Collection([1, 2, 2, 2, 3]);

$counted = $collection->countBy();

$counted->all();

// [1 => 1, 2 => 3, 3 => 1]
```

Однако вы можете передать callback в метод `countBy` для подсчёта всех элементов по пользовательскому значению:

```php
$collection = new Collection(['alice@gmail.tld', 'bob@yahoo.tld', 'carlos@gmail.tld']);

$counted = $collection->countBy(function ($email) {
    return substr(strrchr($email, "@"), 1);
});

$counted->all();

// ['gmail.tld' => 2, 'yahoo.tld' => 1]
```

<a name="method-crossjoin"></a>
#### `crossJoin()`

Метод `crossJoin` выполняет перекрёстное соединение значений коллекции с данными массивами или коллекциями, возвращая декартово произведение со всеми возможными перестановками:

```php
$collection = new Collection([1, 2]);

$matrix = $collection->crossJoin(['a', 'b']);

$matrix->all();

/*
    [
        [1, 'a'],
        [1, 'b'],
        [2, 'a'],
        [2, 'b'],
    ]
*/

$collection = new Collection([1, 2]);

$matrix = $collection->crossJoin(['a', 'b'], ['I', 'II']);

$matrix->all();

/*
    [
        [1, 'a', 'I'],
        [1, 'a', 'II'],
        [1, 'b', 'I'],
        [1, 'b', 'II'],
        [2, 'a', 'I'],
        [2, 'a', 'II'],
        [2, 'b', 'I'],
        [2, 'b', 'II'],
    ]
*/
```

<a name="method-dd"></a>
#### `dd()`

Метод `dd` выводит элементы коллекции и завершает выполнение скрипта:

```php
$collection = new Collection(['John Doe', 'Jane Doe']);

$collection->dd();

/*
    Collection {
        #items: array:2 [
            0 => "John Doe"
            1 => "Jane Doe"
        ]
    }
*/
```

Если вы не хотите останавливать выполнение скрипта, используйте вместо этого метод [`dump`](#method-dump).

<a name="method-diff"></a>
#### `diff()`

Метод `diff` сравнивает коллекцию с другой коллекцией или простым PHP-массивом `array`:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$diff = $collection->diff([2, 4, 6, 8]);

$diff->all();

// [1, 3, 5]
```

<a name="method-diffassoc"></a>
#### `diffAssoc()`

Метод `diffAssoc` сравнивает коллекцию с другой коллекцией или простым PHP-массивом `array` на основе ключей и значений. Этот метод вернёт пары ключ/значение из оригинальной коллекции, которые отсутствуют в данной коллекции:

```php
$collection = new Collection([
    'color' => 'orange',
    'type' => 'fruit',
    'remain' => 6
]);

$diff = $collection->diffAssoc([
    'color' => 'yellow',
    'type' => 'fruit',
    'remain' => 3,
    'used' => 6,
]);

$diff->all();

// ['color' => 'orange', 'remain' => 6]
```

<a name="method-diffkeys"></a>
#### `diffKeys()`

Метод `diffKeys` сравнивает коллекцию с другой коллекцией или простым PHP-массивом `array` на основе ключей. Этот метод вернёт пары ключ/значение из оригинальной коллекции, которые отсутствуют в данной коллекции:

```php
$collection = new Collection([
    'one' => 10,
    'two' => 20,
    'three' => 30,
    'four' => 40,
    'five' => 50,
]);

$diff = $collection->diffKeys([
    'two' => 2,
    'four' => 4,
    'six' => 6,
    'eight' => 8,
]);

$diff->all();

// ['one' => 10, 'three' => 30, 'five' => 50]
```

<a name="method-dump"></a>
#### `dump()`

Метод `dump` выводит элементы коллекции:

```php
$collection = new Collection(['John Doe', 'Jane Doe']);

$collection->dump();

/*
    Collection {
        #items: array:2 [
            0 => "John Doe"
            1 => "Jane Doe"
        ]
    }
*/
```

Если вы хотите остановить выполнение скрипта после вывода коллекции, используйте вместо этого метод [`dd`](#method-dd).

<a name="method-duplicates"></a>
#### `duplicates()`

Метод `duplicates` извлекает и возвращает дублирующиеся значения из коллекции:

```php
$collection = new Collection(['a', 'b', 'a', 'c', 'b']);

$collection->duplicates();

// [2 => 'a', 4 => 'b']
```

Если коллекция содержит массивы или объекты, вы можете передать ключ атрибутов, которые хотите проверить на дубликаты:

```php
$employees = new Collection([
    ['email' => 'samantha@example.tld', 'position' => 'Developer'],
    ['email' => 'john@example.tld', 'position' => 'Designer'],
    ['email' => 'elaine@example.tld', 'position' => 'Developer'],
])

$employees->duplicates('position');

// [2 => 'Developer']
```

<a name="method-duplicatesstrict"></a>
#### `duplicatesStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`duplicates`](#method-duplicates); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-each"></a>
#### `each()`

Метод `each` перебирает элементы коллекции и передаёт каждый элемент в callback:

```php
$collection->each(function ($item, $key) {
    //
});
```

Если вы хотите прекратить перебор элементов, вы можете вернуть `false` из callback:

```php
$collection->each(function ($item, $key) {
    if (/* some condition */) {
        return false;
    }
});
```

<a name="method-every"></a>
#### `every()`

Метод `every` создаёт новую коллекцию, состоящую из каждого n-го элемента:

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->every(4);

// ['a', 'e']
```

Опционально можно передать смещение вторым аргументом:

```php
$collection->every(4, 1);

// ['b', 'f']
```

<a name="method-filter"></a>
#### `filter()`

Метод `filter` фильтрует коллекцию с помощью данного callback, оставляя только те элементы, которые проходят заданный тест на истинность:

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->filter(function ($item) {
    return $item > 2;
});

$filtered->all();

// [3, 4]
```

Для обратного действия `filter` смотрите метод [reject](#method-reject).

<a name="method-first"></a>
#### `first()`

Метод `first` возвращает первый элемент коллекции, который проходит заданный тест на истинность:

```php
new Collection([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```

Вы также можете вызвать метод `first` без аргументов, чтобы получить первый элемент коллекции. Если коллекция пуста, возвращается `null`:

```php
new Collection([1, 2, 3, 4])->first();

// 1
```

<a name="method-first-where"></a>
#### `firstWhere()`

Метод `firstWhere` возвращает первый элемент коллекции с данной парой ключ/значение:

```php
$collection = new Collection([
    ['name' => 'Regena', 'age' => null],
    ['name' => 'Linda', 'age' => 14],
    ['name' => 'Diego', 'age' => 23],
    ['name' => 'Linda', 'age' => 84],
]);

$collection->firstWhere('name', 'Linda');

// ['name' => 'Linda', 'age' => 14]
```

Вы также можете вызвать метод `firstWhere` с оператором:

```php
$collection->firstWhere('age', '>=', 18);

// ['name' => 'Diego', 'age' => 23]
```

Как и метод [where](#method-where), вы можете передать один аргумент в метод `firstWhere`. В этом случае метод `firstWhere` вернёт первый элемент, где значение данного ключа элемента является «истинным»:

```php
$collection->firstWhere('age');

// ['name' => 'Linda', 'age' => 14]
```

<a name="method-flatmap"></a>
#### `flatMap()`

Метод `flatMap` перебирает коллекцию и передаёт каждое значение в данный callback. Callback может свободно модифицировать элемент и возвращать его, формируя новую коллекцию модифицированных элементов. Затем массив разворачивается на один уровень:

```php
$collection = new Collection([
    ['name' => 'Sally'],
    ['school' => 'Harvard'],
    ['age' => 28]
]);

$flattened = $collection->flatMap(function ($values) {
    return array_map('strtoupper', $values);
});

$flattened->all();

// ['name' => 'SALLY', 'school' => 'HARVARD', 'age' => '28'];
```

<a name="method-flatten"></a>
#### `flatten()`

Метод `flatten` разворачивает многомерную коллекцию в одномерную:

```php
$collection = new Collection(['name' => 'peter', 'languages' => ['php', 'javascript']]);

$flattened = $collection->flatten();

$flattened->all();

// ['peter', 'php', 'javascript'];
```

<a name="method-flip"></a>
#### `flip()`

Метод `flip` меняет местами ключи коллекции с соответствующими значениями:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$flipped = $collection->flip();

$flipped->all();

// ['peter' => 'name', 'october' => 'platform']
```

<a name="method-forget"></a>
#### `forget()`

Метод `forget` удаляет элемент из коллекции по его ключу:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$collection->forget('name');

$collection->all();

// ['platform' => 'october']
```

> **Примечание**: В отличие от большинства других методов коллекции, `forget` не возвращает новую модифицированную коллекцию; он модифицирует коллекцию, на которой вызван.

<a name="method-forpage"></a>
#### `forPage()`

Метод `forPage` возвращает новую коллекцию, содержащую элементы, которые были бы на данном номере страницы:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9])->forPage(2, 3);

$collection->all();

// [4, 5, 6]
```

Метод требует номер страницы и количество элементов для отображения на странице соответственно.

<a name="method-get"></a>
#### `get()`

Метод `get` возвращает элемент по данному ключу. Если ключ не существует, возвращается `null`:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('name');

// peter
```

Опционально можно передать значение по умолчанию вторым аргументом:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('foo', 'default-value');

// default-value
```

Вы даже можете передать callback в качестве значения по умолчанию. Результат callback будет возвращён, если указанный ключ не существует:

```php
$collection->get('email', function () {
    return 'default-value';
});

// default-value
```

<a name="method-groupby"></a>
#### `groupBy()`

Метод `groupBy` группирует элементы коллекции по данному ключу:

```php
$collection = new Collection([
    ['account_id' => 'account-x10', 'product' => 'Bookcase'],
    ['account_id' => 'account-x10', 'product' => 'Chair'],
    ['account_id' => 'account-x11', 'product' => 'Desk'],
]);

$grouped = $collection->groupBy('account_id');

$grouped->toArray();

/*
    [
        'account-x10' => [
            ['account_id' => 'account-x10', 'product' => 'Bookcase'],
            ['account_id' => 'account-x10', 'product' => 'Chair'],
        ],
        'account-x11' => [
            ['account_id' => 'account-x11', 'product' => 'Desk'],
        ],
    ]
*/
```

Помимо передачи строкового `ключа`, вы также можете передать callback. Callback должен возвращать значение, по которому вы хотите группировать:

```php
$grouped = $collection->groupBy(function ($item, $key) {
    return substr($item['account_id'], -3);
});

$grouped->toArray();

/*
    [
        'x10' => [
            ['account_id' => 'account-x10', 'product' => 'Bookcase'],
            ['account_id' => 'account-x10', 'product' => 'Chair'],
        ],
        'x11' => [
            ['account_id' => 'account-x11', 'product' => 'Desk'],
        ],
    ]
*/
```

<a name="method-has"></a>
#### `has()`

Метод `has` определяет, существует ли данный ключ в коллекции:

```php
$collection = new Collection(['account_id' => 1, 'product' => 'Desk']);

$collection->has('email');

// false
```

<a name="method-implode"></a>
#### `implode()`

Метод `implode` объединяет элементы коллекции. Его аргументы зависят от типа элементов в коллекции.

Если коллекция содержит массивы или объекты, вы должны передать ключ атрибутов, которые хотите объединить, и строку-«клей», которую хотите поместить между значениями:

```php
$collection = new Collection([
    ['account_id' => 1, 'product' => 'Chair'],
    ['account_id' => 2, 'product' => 'Desk'],
]);

$collection->implode('product', ', ');

// Chair, Desk
```

Если коллекция содержит простые строки или числовые значения, просто передайте «клей» как единственный аргумент метода:

```php
new Collection([1, 2, 3, 4, 5])->implode('-');

// '1-2-3-4-5'
```

<a name="method-intersect"></a>
#### `intersect()`

Метод `intersect` удаляет любые значения, которые отсутствуют в данном `массиве` или коллекции:

```php
$collection = new Collection(['Desk', 'Sofa', 'Chair']);

$intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);

$intersect->all();

// [0 => 'Desk', 2 => 'Chair']
```

Как видите, результирующая коллекция сохранит ключи оригинальной коллекции.

<a name="method-intersectbykeys"></a>
#### `intersectByKeys()`

Метод `intersectByKeys` удаляет любые ключи из оригинальной коллекции, которые отсутствуют в данном `массиве` или коллекции:

```php
$collection = new Collection([
    'serial' => 'UX301', 'type' => 'screen', 'year' => 2009
]);

$intersect = $collection->intersectByKeys([
    'reference' => 'UX404', 'type' => 'tab', 'year' => 2011
]);

$intersect->all();

// ['type' => 'screen', 'year' => 2009]
```

<a name="method-isempty"></a>
#### `isEmpty()`

Метод `isEmpty` возвращает `true`, если коллекция пуста; в противном случае возвращается `false`:

```php
new Collection([])->isEmpty();

// true
```

<a name="method-isnotempty"></a>
#### `isNotEmpty()`

Метод `isNotEmpty` возвращает `true`, если коллекция не пуста; в противном случае возвращается `false`:

```php
new Collection([])->isNotEmpty();

// false
```

<a name="method-join"></a>
#### `join()`

Метод `join` объединяет значения коллекции строкой:

```php
new Collection(['a', 'b', 'c'])->join(', '); // 'a, b, c'
new Collection(['a', 'b', 'c'])->join(', ', ', and '); // 'a, b, and c'
new Collection(['a', 'b'])->join(', ', ' and '); // 'a and b'
new Collection(['a'])->join(', ', ' and '); // 'a'
new Collection([])->join(', ', ' and '); // ''
```

<a name="method-keyby"></a>
#### `keyBy()`

Индексирует коллекцию по данному ключу:

```php
$collection = new Collection([
    ['product_id' => 'prod-100', 'name' => 'chair'],
    ['product_id' => 'prod-200', 'name' => 'desk'],
]);

$keyed = $collection->keyBy('product_id');

$keyed->all();

/*
    [
        'prod-100' => ['product_id' => 'prod-100', 'name' => 'Chair'],
        'prod-200' => ['product_id' => 'prod-200', 'name' => 'Desk'],
    ]
*/
```

Если несколько элементов имеют один и тот же ключ, в новой коллекции появится только последний.

Вы также можете передать свой собственный callback, который должен возвращать значение для индексации коллекции:

```php
$keyed = $collection->keyBy(function ($item) {
    return strtoupper($item['product_id']);
});

$keyed->all();

/*
    [
        'PROD-100' => ['product_id' => 'prod-100', 'name' => 'Chair'],
        'PROD-200' => ['product_id' => 'prod-200', 'name' => 'Desk'],
    ]
*/
```

<a name="method-keys"></a>
#### `keys()`

Метод `keys` возвращает все ключи коллекции:

```php
$collection = new Collection([
    'prod-100' => ['product_id' => 'prod-100', 'name' => 'Chair'],
    'prod-200' => ['product_id' => 'prod-200', 'name' => 'Desk'],
]);

$keys = $collection->keys();

$keys->all();

// ['prod-100', 'prod-200']
```

<a name="method-last"></a>
#### `last()`

Метод `last` возвращает последний элемент коллекции, который проходит заданный тест на истинность:

```php
new Collection([1, 2, 3, 4])->last(function ($key, $value) {
    return $value < 3;
});

// 2
```

Вы также можете вызвать метод `last` без аргументов, чтобы получить последний элемент коллекции. Если коллекция пуста, возвращается `null`.

```php
new Collection([1, 2, 3, 4])->last();

// 4
```

<a name="method-map"></a>
#### `map()`

Метод `map` перебирает коллекцию и передаёт каждое значение в данный callback. Callback может свободно модифицировать элемент и возвращать его, формируя новую коллекцию модифицированных элементов:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});

$multiplied->all();

// [2, 4, 6, 8, 10]
```

> **Примечание**: Как и большинство других методов коллекции, `map` возвращает новый экземпляр коллекции; он не модифицирует коллекцию, на которой вызван. Если вы хотите трансформировать оригинальную коллекцию, используйте метод [`transform`](#method-transform).

<a name="method-mapinto"></a>
#### `mapInto()`

Метод `mapInto()` перебирает коллекцию, создавая новый экземпляр данного класса, передавая значение в конструктор:

```php
class Currency
{
    /**
     * Create a new currency instance.
     *
     * @param  string  $code
     * @return void
     */
    function __construct(string $code)
    {
        $this->code = $code;
    }
}

$collection = new Collection(['AUD', 'USD', 'GBP']);

$currencies = $collection->mapInto(Currency::class);

$currencies->all();

// [Currency('AUD'), Currency('USD'), Currency('GBP')]
```

<a name="method-mapspread"></a>
#### `mapSpread()`

Метод `mapSpread` перебирает элементы коллекции, передавая каждое вложенное значение элемента в данный callback. Callback может свободно модифицировать элемент и возвращать его, формируя новую коллекцию модифицированных элементов:

```php
$collection = new Collection([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

$chunks = $collection->chunk(2);

$sequence = $chunks->mapSpread(function ($even, $odd) {
    return $even + $odd;
});

$sequence->all();

// [1, 5, 9, 13, 17]
```

<a name="method-maptogroups"></a>
#### `mapToGroups()`

Метод `mapToGroups` группирует элементы коллекции с помощью данного callback. Callback должен возвращать ассоциативный массив, содержащий одну пару ключ/значение, формируя новую коллекцию сгруппированных значений:

```php
$collection = new Collection([
    [
        'name' => 'John Doe',
        'department' => 'Sales',
    ],
    [
        'name' => 'Jane Doe',
        'department' => 'Sales',
    ],
    [
        'name' => 'Johnny Doe',
        'department' => 'Marketing',
    ]
]);

$grouped = $collection->mapToGroups(function ($item, $key) {
    return [$item['department'] => $item['name']];
});

$grouped->toArray();

/*
    [
        'Sales' => ['John Doe', 'Jane Doe'],
        'Marketing' => ['Johnny Doe'],
    ]
*/

$grouped->get('Sales')->all();

// ['John Doe', 'Jane Doe']
```

<a name="method-mapwithkeys"></a>
#### `mapWithKeys()`

Метод `mapWithKeys` перебирает коллекцию и передаёт каждое значение в данный callback. Callback должен возвращать ассоциативный массив, содержащий одну пару ключ/значение:

```php
$collection = new Collection([
    [
        'name' => 'John',
        'department' => 'Sales',
        'email' => 'john@example.tld'
    ],
    [
        'name' => 'Jane',
        'department' => 'Marketing',
        'email' => 'jane@example.tld'
    ]
]);

$keyed = $collection->mapWithKeys(function ($item) {
    return [$item['email'] => $item['name']];
});

$keyed->all();

/*
    [
        'john@example.tld' => 'John',
        'jane@example.tld' => 'Jane',
    ]
*/
```

<a name="method-max"></a>
#### `max()`

Метод `max` возвращает максимальное значение данного ключа:

```php
$max = new Collection([['foo' => 10], ['foo' => 20]])->max('foo');

// 20

$max = new Collection([1, 2, 3, 4, 5])->max();

// 5
```

<a name="method-median"></a>
#### `median()`

Метод `median` возвращает [медианное значение](https://en.wikipedia.org/wiki/Median) данного ключа:

```php
$median = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->median('foo');

// 15

$median = new Collection([1, 1, 2, 4])->median();

// 1.5
```

<a name="method-merge"></a>
#### `merge()`

Метод `merge` объединяет данный массив или коллекцию с оригинальной коллекцией. Если строковый ключ в данных элементах совпадает со строковым ключом в оригинальной коллекции, значение данных элементов перезапишет значение в оригинальной коллекции:

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->merge(['price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => 1, 'price' => 200, 'discount' => false]
```

Если ключи данных элементов числовые, значения будут добавлены в конец коллекции:

```php
$collection = new Collection(['Desk', 'Chair']);

$merged = $collection->merge(['Bookcase', 'Door']);

$merged->all();

// ['Desk', 'Chair', 'Bookcase', 'Door']
```

<a name="method-mergerecursive"></a>
#### `mergeRecursive()`

Метод `mergeRecursive` рекурсивно объединяет данный массив или коллекцию с оригинальной коллекцией. Если строковый ключ в данных элементах совпадает со строковым ключом в оригинальной коллекции, значения для этих ключей объединяются в массив, и это выполняется рекурсивно:

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->mergeRecursive(['product_id' => 2, 'price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => [1, 2], 'price' => [100, 200], 'discount' => false]
```

<a name="method-min"></a>
#### `min()`

Метод `min` возвращает минимальное значение данного ключа:

```php
$min = new Collection([['foo' => 10], ['foo' => 20]])->min('foo');

// 10

$min = new Collection([1, 2, 3, 4, 5])->min();

// 1
```

<a name="method-mode"></a>
#### `mode()`

Метод `mode` возвращает [модальное значение](https://en.wikipedia.org/wiki/Mode_(statistics)) данного ключа:

```php
$mode = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->mode('foo');

// [10]

$mode = new Collection([1, 1, 2, 4])->mode();

// [1]
```

<a name="method-nth"></a>
#### `nth()`

Метод `nth` создаёт новую коллекцию, состоящую из каждого n-го элемента:

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->nth(4);

// ['a', 'e']
```

Опционально можно передать смещение вторым аргументом:

```php
$collection->nth(4, 1);

// ['b', 'f']
```

<a name="method-only"></a>
#### `only()`

Метод `only` возвращает элементы коллекции с указанными ключами:

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]);

$filtered = $collection->only(['product_id', 'name']);

$filtered->all();

// ['product_id' => 1, 'name' => 'Desk']
```

Для обратного действия `only` смотрите метод [except](#method-except).

<a name="method-pad"></a>
#### `pad()`

Метод `pad` заполняет массив данным значением до достижения указанного размера. Этот метод ведёт себя как PHP-функция [array_pad](https://secure.php.net/manual/en/function.array-pad.php).

Для заполнения слева укажите отрицательный размер. Заполнение не произойдёт, если абсолютное значение данного размера меньше или равно длине массива:

```php
$collection = new Collection(['A', 'B', 'C']);

$filtered = $collection->pad(5, 0);

$filtered->all();

// ['A', 'B', 'C', 0, 0]

$filtered = $collection->pad(-5, 0);

$filtered->all();

// [0, 0, 'A', 'B', 'C']
```

<a name="method-partition"></a>
#### `partition()`

Метод `partition` может быть комбинирован с PHP-функцией `list` для разделения элементов, проходящих заданный тест на истинность, от тех, которые не проходят:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6]);

list($underThree, $equalOrAboveThree) = $collection->partition(function ($i) {
    return $i < 3;
});

$underThree->all();

// [1, 2]

$equalOrAboveThree->all();

// [3, 4, 5, 6]
```

<a name="method-pipe"></a>
#### `pipe()`

Метод `pipe` передаёт коллекцию в данный callback и возвращает результат:

```php
$collection = new Collection([1, 2, 3]);

$piped = $collection->pipe(function ($collection) {
    return $collection->sum();
});

// 6
```

<a name="method-pluck"></a>
#### `pluck()`

Метод `pluck` извлекает все значения коллекции для данного ключа:

```php
$collection = new Collection([
    ['product_id' => 'prod-100', 'name' => 'Chair'],
    ['product_id' => 'prod-200', 'name' => 'Desk'],
]);

$plucked = $collection->pluck('name');

$plucked->all();

// ['Chair', 'Desk']
```

Вы также можете указать, как вы хотите индексировать результирующую коллекцию:

```php
$plucked = $collection->pluck('name', 'product_id');

$plucked->all();

// ['prod-100' => 'Desk', 'prod-200' => 'Chair']
```

<a name="method-pop"></a>
#### `pop()`

Метод `pop` удаляет и возвращает последний элемент из коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->pop();

// 5

$collection->all();

// [1, 2, 3, 4]
```

<a name="method-prepend"></a>
#### `prepend()`

Метод `prepend` добавляет элемент в начало коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->prepend(0);

$collection->all();

// [0, 1, 2, 3, 4, 5]
```

<a name="method-pull"></a>
#### `pull()`

Метод `pull` удаляет и возвращает элемент из коллекции по его ключу:

```php
$collection = new Collection(['product_id' => 'prod-100', 'name' => 'Desk']);

$collection->pull('name');

// 'Desk'

$collection->all();

// ['product_id' => 'prod-100']
```

<a name="method-push"></a>
#### `push()`

Метод `push` добавляет элемент в конец коллекции:

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->push(5);

$collection->all();

// [1, 2, 3, 4, 5]
```

<a name="method-put"></a>
#### `put()`

Метод `put` устанавливает данный ключ и значение в коллекции:

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk']);

$collection->put('price', 100);

$collection->all();

// ['product_id' => 1, 'name' => 'Desk', 'price' => 100]
```

<a name="method-random"></a>
#### `random()`

Метод `random` возвращает случайный элемент из коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->random();

// 4 - (retrieved randomly)
```

Опционально можно передать целое число в `random`. Если это число больше `1`, возвращается коллекция элементов:

```php
$random = $collection->random(3);

$random->all();

// [2, 4, 5] - (retrieved randomly)
```

<a name="method-reduce"></a>
#### `reduce()`

Метод `reduce` сводит коллекцию к одному значению, передавая результат каждой итерации в следующую:

```php
$collection = new Collection([1, 2, 3]);

$total = $collection->reduce(function ($carry, $item) {
    return $carry + $item;
});

// 6
```

Значение `$carry` на первой итерации равно `null`; однако вы можете указать его начальное значение, передав второй аргумент в `reduce`:

```php
$collection->reduce(function ($carry, $item) {
    return $carry + $item;
}, 4);

// 10
```

<a name="method-reject"></a>
#### `reject()`

Метод `reject` фильтрует коллекцию с помощью данного callback. Callback должен возвращать `true` для любых элементов, которые нужно удалить из результирующей коллекции:

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->reject(function ($item) {
    return $item > 2;
});

$filtered->all();

// [1, 2]
```

Для обратного действия метода `reject` смотрите метод [`filter`](#method-filter).

<a name="method-replace"></a>
#### `replace()`

Метод `replace` ведёт себя аналогично `merge`; однако, помимо перезаписи совпадающих элементов со строковыми ключами, метод `replace` также перезапишет элементы в коллекции с совпадающими числовыми ключами:

```php
$collection = new Collection(['James', 'Scott', 'Dan']);

$replaced = $collection->replace([1 => 'Victoria', 3 => 'Finn']);

$replaced->all();

// ['James', 'Victoria', 'Dan', 'Finn']
```

<a name="method-replacerecursive"></a>
#### `replaceRecursive()`

Этот метод работает как `replace`, но он будет рекурсивно обрабатывать массивы и применять тот же процесс замены к внутренним значениям:

```php
$collection = new Collection(['George', 'Scott', ['James', 'Victoria', 'Finn']]);

$replaced = $collection->replaceRecursive(['Charlie', 2 => [1 => 'King']]);

$replaced->all();

// ['Charlie', 'Scott', ['James', 'King', 'Finn']]
```

<a name="method-reverse"></a>
#### `reverse()`

Метод `reverse` переворачивает порядок элементов коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$reversed = $collection->reverse();

$reversed->all();

// [5, 4, 3, 2, 1]
```

<a name="method-search"></a>
#### `search()`

Метод `search` ищет в коллекции данное значение и возвращает его ключ, если найдено. Если элемент не найден, возвращается `false`.

```php
$collection = new Collection([2, 4, 6, 8]);

$collection->search(4);

// 1
```

Поиск выполняется с использованием «нестрогого» сравнения. Для использования строгого сравнения передайте `true` вторым аргументом метода:

```php
$collection->search('4', true);

// false
```

Альтернативно вы можете передать свой собственный callback для поиска первого элемента, проходящего ваш тест на истинность:

```php
$collection->search(function ($item, $key) {
    return $item > 5;
});

// 2
```

<a name="method-shift"></a>
#### `shift()`

Метод `shift` удаляет и возвращает первый элемент из коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->shift();

// 1

$collection->all();

// [2, 3, 4, 5]
```

<a name="method-shuffle"></a>
#### `shuffle()`

Метод `shuffle` случайным образом перемешивает элементы коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$shuffled = $collection->shuffle();

$shuffled->all();

// [3, 2, 5, 1, 4] (generated randomly)
```

<a name="method-skip"></a>
#### `skip()`

Метод `skip` возвращает новую коллекцию без первых указанных элементов:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$collection = $collection->skip(4);

$collection->all();

// [5, 6, 7, 8, 9, 10]
```

<a name="method-slice"></a>
#### `slice()`

Метод `slice` возвращает срез коллекции, начиная с данного индекса:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$slice = $collection->slice(4);

$slice->all();

// [5, 6, 7, 8, 9, 10]
```

Если вы хотите ограничить размер возвращаемого среза, передайте желаемый размер вторым аргументом метода:

```php
$slice = $collection->slice(4, 2);

$slice->all();

// [5, 6]
```

Возвращённый срез по умолчанию сохраняет ключи. Если вы не хотите сохранять оригинальные ключи, используйте метод [`values`](#method-values) для их переиндексации.

<a name="method-some"></a>
#### `some()`

Псевдоним для метода [`contains`](#method-contains).

<a name="method-sort"></a>
#### `sort()`

Метод `sort` сортирует коллекцию:

```php
$collection = new Collection([5, 3, 1, 2, 4]);

$sorted = $collection->sort();

$sorted->values()->all();

// [1, 2, 3, 4, 5]
```

Отсортированная коллекция сохраняет оригинальные ключи массива. В этом примере мы использовали метод [`values`](#method-values) для сброса ключей к последовательной нумерации.

Для сортировки коллекции вложенных массивов или объектов смотрите методы [`sortBy`](#method-sortby) и [`sortByDesc`](#method-sortbydesc).

Если ваши потребности в сортировке более сложные, вы можете передать callback в `sort` с собственным алгоритмом. Обратитесь к документации PHP по [`usort`](http://php.net/manual/en/function.usort.php#refsect1-function.usort-parameters), которую метод `sort` коллекции использует внутри.

<a name="method-sortby"></a>
#### `sortBy()`

Метод `sortBy` сортирует коллекцию по данному ключу:

```php
$collection = new Collection([
    ['name' => 'Desk', 'price' => 200],
    ['name' => 'Chair', 'price' => 100],
    ['name' => 'Bookcase', 'price' => 150],
]);

$sorted = $collection->sortBy('price');

$sorted->values()->all();

/*
    [
        ['name' => 'Chair', 'price' => 100],
        ['name' => 'Bookcase', 'price' => 150],
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```

Отсортированная коллекция сохраняет оригинальные ключи массива. В этом примере мы использовали метод [`values`](#method-values) для сброса ключей к последовательной нумерации.

Вы также можете передать свой собственный callback для определения того, как сортировать значения коллекции:

```php
$collection = new Collection([
    ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
    ['name' => 'Chair', 'colors' => ['Black']],
    ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
]);

$sorted = $collection->sortBy(function ($product, $key) {
    return count($product['colors']);
});

$sorted->values()->all();

/*
    [
        ['name' => 'Chair', 'colors' => ['Black']],
        ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
        ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
    ]
*/
```

<a name="method-sortbydesc"></a>
#### `sortByDesc()`

Этот метод имеет ту же сигнатуру, что и метод [`sortBy`](#method-sortby), но сортирует коллекцию в обратном порядке.

<a name="method-sortkeys"></a>
#### `sortKeys()`

Метод `sortKeys` сортирует коллекцию по ключам базового ассоциативного массива:

```php
$collection = new Collection([
    'id' => 22345,
    'first' => 'John',
    'last' => 'Doe',
]);

$sorted = $collection->sortKeys();

$sorted->all();

/*
    [
        'first' => 'John',
        'id' => 22345,
        'last' => 'Doe',
    ]
*/
```

<a name="method-sortkeysdesc"></a>
#### `sortKeysDesc()`

Этот метод имеет ту же сигнатуру, что и метод [`sortKeys`](#method-sortkeys), но сортирует коллекцию в обратном порядке.

<a name="method-splice"></a>
#### `splice()`

Метод `splice` удаляет и возвращает срез элементов, начиная с указанного индекса:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2);

$chunk->all();

// [3, 4, 5]

$collection->all();

// [1, 2]
```

Вы можете передать второй аргумент для ограничения размера результирующего среза:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 4, 5]
```

Кроме того, вы можете передать третий аргумент, содержащий новые элементы для замены элементов, удалённых из коллекции:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1, [10, 11]);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 10, 11, 4, 5]
```

<a name="method-split"></a>
#### `split()`

Метод `split` разбивает коллекцию на данное количество групп:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$groups = $collection->split(3);

$groups->toArray();

// [[1, 2], [3, 4], [5]]
```

<a name="method-sum"></a>
#### `sum()`

Метод `sum` возвращает сумму всех элементов коллекции:

```php
new Collection([1, 2, 3, 4, 5])->sum();

// 15
```

Если коллекция содержит вложенные массивы или объекты, передайте ключ для определения, какие значения суммировать:

```php
$collection = new Collection([
    ['name' => 'JavaScript: The Good Parts', 'pages' => 176],
    ['name' => 'JavaScript: The Definitive Guide', 'pages' => 1096],
]);

$collection->sum('pages');

// 1272
```

Кроме того, вы можете передать свой собственный callback для определения, какие значения коллекции суммировать:

```php
$collection = new Collection([
    ['name' => 'Chair', 'colors' => ['Black']],
    ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
    ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
]);

$collection->sum(function ($product) {
    return count($product['colors']);
});

// 6
```

<a name="method-take"></a>
#### `take()`

Метод `take` возвращает новую коллекцию с указанным количеством элементов:

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

// [0, 1, 2]
```

Вы также можете передать отрицательное целое число для получения указанного количества элементов с конца коллекции:

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(-2);

$chunk->all();

// [4, 5]
```

<a name="method-tap"></a>
#### `tap()`

Метод `tap` передаёт коллекцию в данный callback, позволяя «подключиться» к коллекции в определённой точке и выполнить что-то с элементами, не затрагивая саму коллекцию:

```php
new Collection([2, 4, 3, 1, 5])
    ->sort()
    ->tap(function ($collection) {
        Log::debug('Values after sorting', $collection->values()->toArray());
    })
    ->shift();

// 1
```

<a name="method-times"></a>
#### `times()`

Статический метод `times` создаёт новую коллекцию, вызывая callback указанное количество раз:

```php
$collection = Collection::times(10, function ($number) {
    return $number * 9;
});

$collection->all();

// [9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
```

<a name="method-toarray"></a>
#### `toArray()`

Метод `toArray` преобразует коллекцию в простой PHP-массив `array`. Если значения коллекции являются [моделями базы данных](../database/model.md), модели также будут преобразованы в массивы:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toArray();

/*
    [
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```

> **Примечание**: `toArray` также преобразует все вложенные объекты в массив. Если вы хотите получить базовый массив как есть, используйте вместо этого метод [`all`](#method-all).

<a name="method-tojson"></a>
#### `toJson()`

Метод `toJson` преобразует коллекцию в JSON:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toJson();

// '{"name":"Desk","price":200}'
```

<a name="method-transform"></a>
#### `transform()`

Метод `transform` перебирает коллекцию и вызывает данный callback для каждого элемента. Элементы в коллекции будут заменены значениями, возвращёнными callback:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->transform(function ($item, $key) {
    return $item * 2;
});

$collection->all();

// [2, 4, 6, 8, 10]
```

> **Примечание**: В отличие от большинства других методов коллекции, `transform` модифицирует саму коллекцию. Если вы хотите создать новую коллекцию, используйте метод [`map`](#method-map).

<a name="method-union"></a>
#### `union()`

Метод `union` добавляет данный массив в коллекцию. Если данный массив содержит ключи, которые уже есть в оригинальной коллекции, будут предпочтены значения оригинальной коллекции:

```php
$collection = new Collection([1 => ['a'], 2 => ['b']]);

$union = $collection->union([3 => ['c'], 1 => ['b']]);

$union->all();

// [1 => ['a'], 2 => ['b'], 3 => ['c']]
```

<a name="method-unique"></a>
#### `unique()`

Метод `unique` возвращает все уникальные элементы коллекции. Возвращённая коллекция сохраняет оригинальные ключи массива, поэтому в этом примере мы использовали метод [`values`](#method-values) для сброса ключей к последовательной нумерации:

```php
$collection = new Collection([1, 1, 2, 2, 3, 4, 2]);

$unique = $collection->unique();

$unique->values()->all();

// [1, 2, 3, 4]
```

При работе с вложенными массивами или объектами вы можете указать ключ, используемый для определения уникальности:

```php
$collection = new Collection([
    ['name' => 'iPhone 12', 'brand' => 'Apple', 'type' => 'phone'],
    ['name' => 'iPhone 13', 'brand' => 'Apple', 'type' => 'phone'],
    ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
    ['name' => 'Galaxy S21', 'brand' => 'Samsung', 'type' => 'phone'],
    ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
]);

$unique = $collection->unique('brand');

$unique->values()->all();

/*
    [
        ['name' => 'iPhone 13', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'Galaxy S21', 'brand' => 'Samsung', 'type' => 'phone'],
    ]
*/
```

Вы также можете передать свой собственный callback для определения уникальности элемента:

```php
$unique = $collection->unique(function ($item) {
    return $item['brand'].$item['type'];
});

$unique->values()->all();

/*
    [
        ['name' => 'iPhone 12', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
        ['name' => 'Galaxy S21', 'brand' => 'Samsung', 'type' => 'phone'],
        ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
    ]
*/
```

Метод `unique` использует «нестрогое» сравнение при проверке значений элементов, что означает, что строка с целочисленным значением будет считаться равной целому числу с тем же значением. Используйте метод [`uniqueStrict`](#method-uniquestrict) для фильтрации с использованием «строгого» сравнения.

<a name="method-uniquestrict"></a>
#### `uniqueStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`unique`](#method-unique); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-unless"></a>
#### `unless()`

Метод `unless` выполнит данный callback, если первый аргумент метода не оценивается как `true`:

```php
$collection = new Collection([1, 2, 3]);

$collection->unless(true, function ($collection) {
    return $collection->push(4);
});

$collection->unless(false, function ($collection) {
    return $collection->push(5);
});

$collection->all();

// [1, 2, 3, 5]
```

Для обратного действия `unless` смотрите метод [`when`](#method-when).

<a name="method-unlessempty"></a>
#### `unlessEmpty()`

Псевдоним для метода [`whenNotEmpty`](#method-whennotempty).

<a name="method-unlessnotempty"></a>
#### `unlessNotEmpty()`

Псевдоним для метода [`whenEmpty`](#method-whenempty).

<a name="method-unwrap"></a>
#### `unwrap()`

Статический метод `unwrap` возвращает базовые элементы коллекции из данного значения, если применимо:

```php
Collection::unwrap(new Collection('John Doe'));

// ['John Doe']

Collection::unwrap(['John Doe']);

// ['John Doe']

Collection::unwrap('John Doe');

// 'John Doe'
```

<a name="method-values"></a>
#### `values()`

Метод `values` возвращает новую коллекцию с ключами, сброшенными к последовательным целым числам:

```php
$collection = new Collection([
    10 => ['product' => 'Desk', 'price' => 200],
    11 => ['product' => 'Desk', 'price' => 200]
]);

$values = $collection->values();

$values->all();

/*
    [
        0 => ['product' => 'Desk', 'price' => 200],
        1 => ['product' => 'Desk', 'price' => 200],
    ]
*/
```

<a name="method-when"></a>
#### `when()`

Метод `when` выполнит данный callback, когда первый аргумент метода оценивается как `true`:

```php
$collection = new Collection([1, 2, 3]);

$collection->when(true, function ($collection) {
    return $collection->push(4);
});

$collection->when(false, function ($collection) {
    return $collection->push(5);
});

$collection->all();

// [1, 2, 3, 4]
```

Для обратного действия `when` смотрите метод [`unless`](#method-unless).

<a name="method-whenempty"></a>
#### `whenEmpty()`

Метод `whenEmpty` выполнит данный callback, когда коллекция пуста:

```php
$collection = new Collection(['michael', 'tom']);

$collection->whenEmpty(function ($collection) {
    return $collection->push('steve');
});

$collection->all();

// ['michael', 'tom']


$collection = new Collection();

$collection->whenEmpty(function ($collection) {
    return $collection->push('steve');
});

$collection->all();

// ['steve']

$collection = new Collection(['michael', 'tom']);

$collection->whenEmpty(function ($collection) {
    return $collection->push('steve');
}, function ($collection) {
    return $collection->push('prince');
});

$collection->all();

// ['michael', 'tom', 'prince']
```

Для обратного действия `whenEmpty` смотрите метод [`whenNotEmpty`](#method-whennotempty).

<a name="method-whennotempty"></a>
#### `whenNotEmpty()`

Метод `whenNotEmpty` выполнит данный callback, когда коллекция не пуста:

```php
$collection = new Collection(['michael', 'tom']);

$collection->whenNotEmpty(function ($collection) {
    return $collection->push('steve');
});

$collection->all();

// ['michael', 'tom', 'steve']


$collection = new Collection();

$collection->whenNotEmpty(function ($collection) {
    return $collection->push('steve');
});

$collection->all();

// []


$collection = new Collection();

$collection->whenNotEmpty(function ($collection) {
    return $collection->push('steve');
}, function ($collection) {
    return $collection->push('prince');
});

$collection->all();

// ['prince']
```

Для обратного действия `whenNotEmpty` смотрите метод [`whenEmpty`](#method-whenempty).

<a name="method-where"></a>
#### `where()`

Метод `where` фильтрует коллекцию по данной паре ключ/значение:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Door', 'price' => 100],
]);

$filtered = $collection->where('price', 100);

$filtered->all();

/*
    [
        ['product' => 'Chair', 'price' => 100],
        ['product' => 'Door', 'price' => 100],
    ]
*/
```

Метод `where` использует «нестрогое» сравнение при проверке значений элементов, что означает, что строка с целочисленным значением будет считаться равной целому числу с тем же значением. Используйте метод [`whereStrict`](#method-wherestrict) для фильтрации с использованием «строгого» сравнения.

Опционально можно передать оператор сравнения вторым параметром.

```php
$collection = new Collection([
    ['name' => 'Jim', 'deleted_at' => '2019-01-01 00:00:00'],
    ['name' => 'Sally', 'deleted_at' => '2019-01-02 00:00:00'],
    ['name' => 'Sue', 'deleted_at' => null],
]);

$filtered = $collection->where('deleted_at', '!=', null);

$filtered->all();

/*
    [
        ['name' => 'Jim', 'deleted_at' => '2019-01-01 00:00:00'],
        ['name' => 'Sally', 'deleted_at' => '2019-01-02 00:00:00'],
    ]
*/
```

<a name="method-wherestrict"></a>
#### `whereStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`where`](#method-where); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-wherebetween"></a>
#### `whereBetween()`

Метод `whereBetween` фильтрует коллекцию в заданном диапазоне:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 80],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Pencil', 'price' => 30],
    ['product' => 'Door', 'price' => 100],
]);

$filtered = $collection->whereBetween('price', [100, 200]);

$filtered->all();

/*
    [
        ['product' => 'Desk', 'price' => 200],
        ['product' => 'Bookcase', 'price' => 150],
        ['product' => 'Door', 'price' => 100],
    ]
*/
```

<a name="method-wherein"></a>
#### `whereIn()`

Метод `whereIn` фильтрует коллекцию по данному ключу/значению, содержащемуся в данном массиве:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Door', 'price' => 100],
]);

$filtered = $collection->whereIn('price', [150, 200]);

$filtered->all();

/*
    [
        ['product' => 'Desk', 'price' => 200],
        ['product' => 'Bookcase', 'price' => 150],
    ]
*/
```

Метод `whereIn` использует «нестрогое» сравнение при проверке значений элементов, что означает, что строка с целочисленным значением будет считаться равной целому числу с тем же значением. Используйте метод [`whereInStrict`](#method-whereinstrict) для фильтрации с использованием «строгого» сравнения.

<a name="method-whereinstrict"></a>
#### `whereInStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`whereIn`](#method-wherein); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-whereinstanceof"></a>
#### `whereInstanceOf()`

Метод `whereInstanceOf` фильтрует коллекцию по данному типу класса:

```php
use App\User;
use App\Post;

$collection = new Collection([
    new User,
    new User,
    new Post,
]);

$filtered = $collection->whereInstanceOf(User::class);

$filtered->all();

// [App\User, App\User]
```

<a name="method-wherenotbetween"></a>
#### `whereNotBetween()`

Метод `whereNotBetween` фильтрует коллекцию за пределами заданного диапазона:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 80],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Pencil', 'price' => 30],
    ['product' => 'Door', 'price' => 100],
]);

$filtered = $collection->whereNotBetween('price', [100, 200]);

$filtered->all();

/*
    [
        ['product' => 'Chair', 'price' => 80],
        ['product' => 'Pencil', 'price' => 30],
    ]
*/
```

<a name="method-wherenotin"></a>
#### `whereNotIn()`

Метод `whereNotIn` фильтрует коллекцию по данному ключу/значению, не содержащемуся в данном массиве:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Door', 'price' => 100],
]);

$filtered = $collection->whereNotIn('price', [150, 200]);

$filtered->all();

/*
    [
        ['product' => 'Chair', 'price' => 100],
        ['product' => 'Door', 'price' => 100],
    ]
*/
```

Метод `whereNotIn` использует «нестрогое» сравнение при проверке значений элементов, что означает, что строка с целочисленным значением будет считаться равной целому числу с тем же значением. Используйте метод [`whereNotInStrict`](#method-wherenotinstrict) для фильтрации с использованием «строгого» сравнения.

<a name="method-wherenotinstrict"></a>
#### `whereNotInStrict()`

Этот метод имеет ту же сигнатуру, что и метод [`whereNotIn`](#method-wherenotin); однако все значения сравниваются с использованием «строгого» сравнения.

<a name="method-wherenotnull"></a>
#### `whereNotNull()`

Метод `whereNotNull` фильтрует элементы, где данный ключ не равен null:

```php
$collection = new Collection([
    ['name' => 'Desk'],
    ['name' => null],
    ['name' => 'Bookcase'],
]);

$filtered = $collection->whereNotNull('name');

$filtered->all();

/*
    [
        ['name' => 'Desk'],
        ['name' => 'Bookcase'],
    ]
*/
```

<a name="method-wherenull"></a>
#### `whereNull()`

Метод `whereNull` фильтрует элементы, где данный ключ равен null:

```php
$collection = new Collection([
    ['name' => 'Desk'],
    ['name' => null],
    ['name' => 'Bookcase'],
]);

$filtered = $collection->whereNull('name');

$filtered->all();

/*
    [
        ['name' => null],
    ]
*/
```

<a name="method-wrap"></a>
#### `wrap()`

Статический метод `wrap` оборачивает данное значение в коллекцию, если применимо:

```php
$collection = Collection::wrap('John Doe');

$collection->all();

// ['John Doe']

$collection = Collection::wrap(['John Doe']);

$collection->all();

// ['John Doe']

$collection = Collection::wrap(new Collection('John Doe'));

$collection->all();

// ['John Doe']
```

<a name="method-zip"></a>
#### `zip()`

Метод `zip` объединяет значения данного массива со значениями оригинальной коллекции по соответствующему индексу:

```php
$collection = new Collection(['Chair', 'Desk']);

$zipped = $collection->zip([100, 200]);

$zipped->all();

// [['Chair', 100], ['Desk', 200]]
```
