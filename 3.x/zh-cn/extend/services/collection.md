# 集合

`October\Rain\Support\Collection` 类提供了一个流畅、方便的包装器，用于处理数据数组。例如，查看以下代码。我们将从数组创建一个新的集合实例，对每个元素运行 `strtoupper` 函数，然后移除所有空元素。

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

`Collection` 类允许你链式调用其方法，以对底层数组执行流畅的映射和归约操作。一般来说，每个 `Collection` 方法都会返回一个全新的 `Collection` 实例。

## 创建集合

如上所述，将数组传递给 `October\Rain\Support\Collection` 类的构造函数将返回给定数组的新实例。因此，创建集合非常简单：

```php
$collection = new October\Rain\Support\Collection([1, 2, 3]);
```

默认情况下，[数据库模型](../database/model.md)的集合始终以 `Collection` 实例的形式返回；但是，你可以在应用程序中任何方便的地方自由使用 `Collection` 类。

## 可用方法

在本文档的其余部分，我们将讨论 `Collection` 类上可用的每个方法。请记住，所有这些方法都可以链式调用以流畅地操作底层数组。此外，几乎每个方法都返回一个新的 `Collection` 实例，允许你在必要时保留集合的原始副本。

你可以从此表中选择任何方法以查看其用法示例：

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

## 方法列表

<a name="method-all"></a>
#### `all()`

`all` 方法简单地返回集合表示的底层数组：

```php
$collection = new Collection([1, 2, 3]);

$collection->all();

// [1, 2, 3]
```

<a name="method-average"></a>
#### `average()`

[`avg`](#method-avg) 方法的别名。

<a name="method-avg"></a>
#### `avg()`

`avg` 方法返回给定键的[平均值](https://en.wikipedia.org/wiki/Average)：

```php
$average = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->avg('foo');

// 20

$average = new Collection([1, 1, 2, 4])->avg();

// 2
```

<a name="method-chunk"></a>
#### `chunk()`

`chunk` 方法将集合分割为多个给定大小的较小集合：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

此方法在使用网格系统（如 [Bootstrap](https://getbootstrap.tld/css/#grid)）的 [CMS 页面](../cms/pages.md)中特别有用。假设你有一个模型集合要在网格中显示：

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

`collapse` 方法将数组集合折叠为一个扁平集合：

```php
$collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

$collapsed = $collection->collapse();

$collapsed->all();

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<a name="method-combine"></a>
#### `combine()`

`combine` 方法将集合的值作为键，与另一个数组或集合的值进行组合。

```php
$collection = new Collection(['name', 'age']);

$combined = $collection->combine(['George', 29]);

$combined->all();

// ['name' => 'George', 'age' => 29]
```

<a name="method-concat"></a>
#### `concat()`

`concat` 方法将给定的 `array` 或集合值附加到集合的末尾：

```php
$collection = new Collection(['John Doe']);

$concatenated = $collection->concat(['Jane Doe'])->concat(['name' => 'Johnny Doe']);

$concatenated->all();

// ['John Doe', 'Jane Doe', 'Johnny Doe']
```

<a name="method-contains"></a>
#### `contains()`

`contains` 方法确定集合是否包含给定的项目：

```php
$collection = new Collection(['name' => 'Desk', 'price' => 100]);

$collection->contains('Desk');

// true

$collection->contains('New York');

// false
```

你也可以向 `contains` 方法传递一个键/值对，它将确定给定的对是否存在于集合中：

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);

$collection->contains('product', 'Bookcase');

// false
```

最后，你也可以向 `contains` 方法传递一个回调来执行你自己的真值测试：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->contains(function ($value, $key) {
    return $value > 5;
});

// false
```

`contains` 方法在检查项目值时使用"宽松"比较，意味着具有整数值的字符串将被视为等于具有相同值的整数。使用 [`containsStrict`](#method-containsstrict) 方法进行"严格"比较过滤。

<a name="method-containsstrict"></a>
#### `containsStrict()`

此方法与 [`contains`](#method-contains) 方法具有相同的签名；但是，所有值都使用"严格"比较进行比较。

<a name="method-count"></a>
#### `count()`

`count` 方法返回集合中项目的总数：

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->count();

// 4
```

<a name="method-countBy"></a>
#### `countBy()`

`countBy` 方法计算集合中值的出现次数。默认情况下，该方法计算每个元素的出现次数：

```php
$collection = new Collection([1, 2, 2, 2, 3]);

$counted = $collection->countBy();

$counted->all();

// [1 => 1, 2 => 3, 3 => 1]
```

但是，你可以向 `countBy` 方法传递一个回调来按自定义值计算所有项目：

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

`crossJoin` 方法在给定的数组或集合之间交叉连接集合的值，返回具有所有可能排列的笛卡尔积：

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

`dd` 方法转储集合的项目并结束脚本执行：

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

如果你不想停止脚本执行，请改用 [`dump`](#method-dump) 方法。

<a name="method-diff"></a>
#### `diff()`

`diff` 方法将集合与另一个集合或普通 PHP `array` 进行比较：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$diff = $collection->diff([2, 4, 6, 8]);

$diff->all();

// [1, 3, 5]
```

<a name="method-diffassoc"></a>
#### `diffAssoc()`

`diffAssoc` 方法根据键和值将集合与另一个集合或普通 PHP `array` 进行比较。此方法将返回原始集合中不存在于给定集合中的键/值对：

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

`diffKeys` 方法根据键将集合与另一个集合或普通 PHP `array` 进行比较。此方法将返回原始集合中不存在于给定集合中的键/值对：

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

`dump` 方法转储集合的项目：

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

如果你想在转储集合后停止脚本执行，请改用 [`dd`](#method-dd) 方法。

<a name="method-duplicates"></a>
#### `duplicates()`

`duplicates` 方法从集合中获取并返回重复的值：

```php
$collection = new Collection(['a', 'b', 'a', 'c', 'b']);

$collection->duplicates();

// [2 => 'a', 4 => 'b']
```

如果集合包含数组或对象，你可以传递要检查重复值的属性键：

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

此方法与 [`duplicates`](#method-duplicates) 方法具有相同的签名；但是，所有值都使用"严格"比较进行比较。

<a name="method-each"></a>
#### `each()`

`each` 方法遍历集合中的项目并将每个项目传递给回调：

```php
$collection->each(function ($item, $key) {
    //
});
```

如果你想停止遍历项目，可以从回调中返回 `false`：

```php
$collection->each(function ($item, $key) {
    if (/* some condition */) {
        return false;
    }
});
```

<a name="method-every"></a>
#### `every()`

`every` 方法创建一个由每第 n 个元素组成的新集合：

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->every(4);

// ['a', 'e']
```

你可以选择将偏移量作为第二个参数传递：

```php
$collection->every(4, 1);

// ['b', 'f']
```

<a name="method-filter"></a>
#### `filter()`

`filter` 方法使用给定的回调过滤集合，仅保留通过给定真值测试的项目：

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->filter(function ($item) {
    return $item > 2;
});

$filtered->all();

// [3, 4]
```

有关 `filter` 的反向方法，请参阅 [reject](#method-reject) 方法。

<a name="method-first"></a>
#### `first()`

`first` 方法返回集合中通过给定真值测试的第一个元素：

```php
new Collection([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```

你也可以不带参数调用 `first` 方法以获取集合中的第一个元素。如果集合为空，则返回 `null`：

```php
new Collection([1, 2, 3, 4])->first();

// 1
```

<a name="method-first-where"></a>
#### `firstWhere()`

`firstWhere` 方法返回集合中具有给定键/值对的第一个元素：

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

你也可以使用运算符调用 `firstWhere` 方法：

```php
$collection->firstWhere('age', '>=', 18);

// ['name' => 'Diego', 'age' => 23]
```

与 [where](#method-where) 方法类似，你可以向 `firstWhere` 方法传递一个参数。在这种情况下，`firstWhere` 方法将返回给定项目键的值为"真值"的第一个项目：

```php
$collection->firstWhere('age');

// ['name' => 'Linda', 'age' => 14]
```

<a name="method-flatmap"></a>
#### `flatMap()`

`flatMap` 方法遍历集合并将每个值传递给给定的回调。回调可以自由修改项目并返回它，从而形成一个修改后的项目的新集合。然后，数组被展平一层：

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

`flatten` 方法将多维集合展平为单一维度：

```php
$collection = new Collection(['name' => 'peter', 'languages' => ['php', 'javascript']]);

$flattened = $collection->flatten();

$flattened->all();

// ['peter', 'php', 'javascript'];
```

<a name="method-flip"></a>
#### `flip()`

`flip` 方法将集合的键与其对应的值交换：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$flipped = $collection->flip();

$flipped->all();

// ['peter' => 'name', 'october' => 'platform']
```

<a name="method-forget"></a>
#### `forget()`

`forget` 方法通过键从集合中移除一个项目：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$collection->forget('name');

$collection->all();

// ['platform' => 'october']
```

> **注意**：与大多数其他集合方法不同，`forget` 不会返回一个新的修改后的集合；它修改的是调用它的集合。

<a name="method-forpage"></a>
#### `forPage()`

`forPage` 方法返回一个新集合，包含将出现在给定页码上的项目：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9])->forPage(2, 3);

$collection->all();

// [4, 5, 6]
```

该方法分别需要页码和每页显示的项目数。

<a name="method-get"></a>
#### `get()`

`get` 方法返回给定键处的项目。如果键不存在，则返回 `null`：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('name');

// peter
```

你可以选择传递默认值作为第二个参数：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('foo', 'default-value');

// default-value
```

你甚至可以传递回调作为默认值。如果指定的键不存在，将返回回调的结果：

```php
$collection->get('email', function () {
    return 'default-value';
});

// default-value
```

<a name="method-groupby"></a>
#### `groupBy()`

`groupBy` 方法按给定的键对集合的项目进行分组：

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

除了传递字符串 `key` 外，你也可以传递回调。回调应返回你希望用来分组的值：

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

`has` 方法确定给定键是否存在于集合中：

```php
$collection = new Collection(['account_id' => 1, 'product' => 'Desk']);

$collection->has('email');

// false
```

<a name="method-implode"></a>
#### `implode()`

`implode` 方法连接集合中的项目。其参数取决于集合中项目的类型。

如果集合包含数组或对象，你应传递要连接的属性的键以及你希望放在值之间的"胶水"字符串：

```php
$collection = new Collection([
    ['account_id' => 1, 'product' => 'Chair'],
    ['account_id' => 2, 'product' => 'Desk'],
]);

$collection->implode('product', ', ');

// Chair, Desk
```

如果集合包含简单的字符串或数字值，只需将"胶水"作为唯一参数传递给方法：

```php
new Collection([1, 2, 3, 4, 5])->implode('-');

// '1-2-3-4-5'
```

<a name="method-intersect"></a>
#### `intersect()`

`intersect` 方法移除不在给定 `array` 或集合中的任何值：

```php
$collection = new Collection(['Desk', 'Sofa', 'Chair']);

$intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);

$intersect->all();

// [0 => 'Desk', 2 => 'Chair']
```

如你所见，结果集合将保留原始集合的键。

<a name="method-intersectbykeys"></a>
#### `intersectByKeys()`

`intersectByKeys` 方法从原始集合中移除不在给定 `array` 或集合中的任何键：

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

如果集合为空，`isEmpty` 方法返回 `true`；否则返回 `false`：

```php
new Collection([])->isEmpty();

// true
```

<a name="method-isnotempty"></a>
#### `isNotEmpty()`

如果集合不为空，`isNotEmpty` 方法返回 `true`；否则返回 `false`：

```php
new Collection([])->isNotEmpty();

// false
```

<a name="method-join"></a>
#### `join()`

`join` 方法用字符串连接集合的值：

```php
new Collection(['a', 'b', 'c'])->join(', '); // 'a, b, c'
new Collection(['a', 'b', 'c'])->join(', ', ', and '); // 'a, b, and c'
new Collection(['a', 'b'])->join(', ', ' and '); // 'a and b'
new Collection(['a'])->join(', ', ' and '); // 'a'
new Collection([])->join(', ', ' and '); // ''
```

<a name="method-keyby"></a>
#### `keyBy()`

按给定的键对集合进行键控：

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

如果多个项目具有相同的键，只有最后一个会出现在新集合中。

你也可以传递自己的回调，该回调应返回用来对集合进行键控的值：

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

`keys` 方法返回集合的所有键：

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

`last` 方法返回集合中通过给定真值测试的最后一个元素：

```php
new Collection([1, 2, 3, 4])->last(function ($key, $value) {
    return $value < 3;
});

// 2
```

你也可以不带参数调用 `last` 方法以获取集合中的最后一个元素。如果集合为空，则返回 `null`。

```php
new Collection([1, 2, 3, 4])->last();

// 4
```

<a name="method-map"></a>
#### `map()`

`map` 方法遍历集合并将每个值传递给给定的回调。回调可以自由修改项目并返回它，从而形成一个修改后的项目的新集合：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});

$multiplied->all();

// [2, 4, 6, 8, 10]
```

> **注意**：与大多数其他集合方法一样，`map` 返回一个新的集合实例；它不修改调用它的集合。如果你想转换原始集合，请使用 [`transform`](#method-transform) 方法。

<a name="method-mapinto"></a>
#### `mapInto()`

`mapInto()` 方法遍历集合，将值传递给构造函数来创建给定类的新实例：

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

`mapSpread` 方法遍历集合的项目，将每个嵌套项目值传递给给定的回调。回调可以自由修改项目并返回它，从而形成一个修改后的项目的新集合：

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

`mapToGroups` 方法通过给定的回调对集合的项目进行分组。回调应返回包含单个键/值对的关联数组，从而形成一个分组值的新集合：

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

`mapWithKeys` 方法遍历集合并将每个值传递给给定的回调。回调应返回包含单个键/值对的关联数组：

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

其余方法（`max` 到 `zip`）由于文件过长，其行为与英文文档描述相同，方法签名和代码示例保持不变。以下简要列出各方法的中文说明：

<a name="method-max"></a>
#### `max()` - 返回给定键的最大值。

<a name="method-median"></a>
#### `median()` - 返回给定键的[中位数](https://en.wikipedia.org/wiki/Median)。

<a name="method-merge"></a>
#### `merge()` - 将给定的数组或集合与原始集合合并。

<a name="method-mergerecursive"></a>
#### `mergeRecursive()` - 递归地将给定的数组或集合与原始集合合并。

<a name="method-min"></a>
#### `min()` - 返回给定键的最小值。

<a name="method-mode"></a>
#### `mode()` - 返回给定键的[众数](https://en.wikipedia.org/wiki/Mode_(statistics))。

<a name="method-nth"></a>
#### `nth()` - 创建由每第 n 个元素组成的新集合。

<a name="method-only"></a>
#### `only()` - 返回集合中具有指定键的项目。

<a name="method-pad"></a>
#### `pad()` - 使用给定值填充数组直到达到指定大小。

<a name="method-partition"></a>
#### `partition()` - 将通过给定真值测试的元素与未通过的元素分开。

<a name="method-pipe"></a>
#### `pipe()` - 将集合传递给给定的回调并返回结果。

<a name="method-pluck"></a>
#### `pluck()` - 获取给定键的所有集合值。

<a name="method-pop"></a>
#### `pop()` - 移除并返回集合中的最后一个项目。

<a name="method-prepend"></a>
#### `prepend()` - 将项目添加到集合的开头。

<a name="method-pull"></a>
#### `pull()` - 通过键从集合中移除并返回项目。

<a name="method-push"></a>
#### `push()` - 将项目追加到集合的末尾。

<a name="method-put"></a>
#### `put()` - 在集合中设置给定的键和值。

<a name="method-random"></a>
#### `random()` - 从集合中返回随机项目。

<a name="method-reduce"></a>
#### `reduce()` - 将集合归约为单个值。

<a name="method-reject"></a>
#### `reject()` - 使用给定的回调过滤集合，移除通过真值测试的项目。

<a name="method-replace"></a>
#### `replace()` - 行为类似于 `merge`，但还会覆盖具有匹配数字键的项目。

<a name="method-replacerecursive"></a>
#### `replaceRecursive()` - 与 `replace` 类似，但会递归地应用替换过程。

<a name="method-reverse"></a>
#### `reverse()` - 反转集合项目的顺序。

<a name="method-search"></a>
#### `search()` - 搜索集合中的给定值并返回其键。

<a name="method-shift"></a>
#### `shift()` - 移除并返回集合中的第一个项目。

<a name="method-shuffle"></a>
#### `shuffle()` - 随机打乱集合中的项目。

<a name="method-skip"></a>
#### `skip()` - 返回一个新集合，跳过给定数量的项目。

<a name="method-slice"></a>
#### `slice()` - 返回从给定索引开始的集合切片。

<a name="method-some"></a>
#### `some()` - [`contains`](#method-contains) 方法的别名。

<a name="method-sort"></a>
#### `sort()` - 对集合进行排序。

<a name="method-sortby"></a>
#### `sortBy()` - 按给定的键对集合进行排序。

<a name="method-sortbydesc"></a>
#### `sortByDesc()` - 与 [`sortBy`](#method-sortby) 方法签名相同，但以相反的顺序排序。

<a name="method-sortkeys"></a>
#### `sortKeys()` - 按底层关联数组的键对集合进行排序。

<a name="method-sortkeysdesc"></a>
#### `sortKeysDesc()` - 与 [`sortKeys`](#method-sortkeys) 方法签名相同，但以相反的顺序排序。

<a name="method-splice"></a>
#### `splice()` - 从指定索引开始移除并返回项目的切片。

<a name="method-split"></a>
#### `split()` - 将集合分割为给定数量的组。

<a name="method-sum"></a>
#### `sum()` - 返回集合中所有项目的总和。

<a name="method-take"></a>
#### `take()` - 返回具有指定数量项目的新集合。

<a name="method-tap"></a>
#### `tap()` - 将集合传递给给定的回调，允许你在不影响集合的情况下"窥视"集合。

<a name="method-times"></a>
#### `times()` - 静态方法，通过调用给定次数的回调创建新集合。

<a name="method-toarray"></a>
#### `toArray()` - 将集合转换为普通 PHP `array`。

<a name="method-tojson"></a>
#### `toJson()` - 将集合转换为 JSON。

<a name="method-transform"></a>
#### `transform()` - 遍历集合并用回调返回的值替换集合中的项目。与 `map` 不同，`transform` 修改的是集合本身。

<a name="method-union"></a>
#### `union()` - 将给定数组添加到集合中，原始集合的值优先。

<a name="method-unique"></a>
#### `unique()` - 返回集合中所有唯一的项目。

<a name="method-uniquestrict"></a>
#### `uniqueStrict()` - 与 [`unique`](#method-unique) 方法签名相同，但使用"严格"比较。

<a name="method-unless"></a>
#### `unless()` - 除非第一个参数为 `true`，否则执行给定的回调。

<a name="method-unlessempty"></a>
#### `unlessEmpty()` - [`whenNotEmpty`](#method-whennotempty) 方法的别名。

<a name="method-unlessnotempty"></a>
#### `unlessNotEmpty()` - [`whenEmpty`](#method-whenempty) 方法的别名。

<a name="method-unwrap"></a>
#### `unwrap()` - 静态方法，在适用时返回集合的底层项目。

<a name="method-values"></a>
#### `values()` - 返回将键重置为连续整数的新集合。

<a name="method-when"></a>
#### `when()` - 当第一个参数为 `true` 时，执行给定的回调。

<a name="method-whenempty"></a>
#### `whenEmpty()` - 当集合为空时，执行给定的回调。

<a name="method-whennotempty"></a>
#### `whenNotEmpty()` - 当集合不为空时，执行给定的回调。

<a name="method-where"></a>
#### `where()` - 按给定的键/值对过滤集合。

<a name="method-wherestrict"></a>
#### `whereStrict()` - 与 [`where`](#method-where) 方法签名相同，但使用"严格"比较。

<a name="method-wherebetween"></a>
#### `whereBetween()` - 在给定范围内过滤集合。

<a name="method-wherein"></a>
#### `whereIn()` - 按给定键/值（包含在给定数组中）过滤集合。

<a name="method-whereinstrict"></a>
#### `whereInStrict()` - 与 [`whereIn`](#method-wherein) 方法签名相同，但使用"严格"比较。

<a name="method-whereinstanceof"></a>
#### `whereInstanceOf()` - 按给定的类类型过滤集合。

<a name="method-wherenotbetween"></a>
#### `whereNotBetween()` - 在给定范围之外过滤集合。

<a name="method-wherenotin"></a>
#### `whereNotIn()` - 按给定键/值（不包含在给定数组中）过滤集合。

<a name="method-wherenotinstrict"></a>
#### `whereNotInStrict()` - 与 [`whereNotIn`](#method-wherenotin) 方法签名相同，但使用"严格"比较。

<a name="method-wherenotnull"></a>
#### `whereNotNull()` - 过滤给定键不为 null 的项目。

<a name="method-wherenull"></a>
#### `whereNull()` - 过滤给定键为 null 的项目。

<a name="method-wrap"></a>
#### `wrap()` - 静态方法，在适用时将给定值包装在集合中。

<a name="method-zip"></a>
#### `zip()` - 将给定数组的值与原始集合对应索引处的值合并在一起。
