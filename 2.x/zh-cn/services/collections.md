# 集合

`October\Rain\Support\Collection` 类为处理数据数组提供了一个流畅、方便的封装类。 例如，查看以下代码。 我们将从数组中创建一个新的集合实例，对每个元素运行`strtoupper`函数，然后删除所有空元素：

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

`Collection` 类允许您调用其方法以执行流畅的映射和减少底层数组。 一般来说，每个 `Collection` 方法都会返回一个全新的 `Collection` 实例。

## 创建集合

如上所述，将数组传递给 `October\Rain\Support\Collection` 类的构造函数将返回给定数组的新实例。 因此，创建一个集合非常简单：

```php
$collection = new October\Rain\Support\Collection([1, 2, 3]);
```

默认情况下，[数据库模型](../database/model.md) 的集合总是作为 `Collection` 实例返回； 您可以很方便的在您应用程序的任何地方随意使用 `Collection` 类。

## 可用方法

对于本文档的其余部分，我们将讨论 `Collection` 类中可用的每个方法。 请记住，所有这些方法都可以调用起来以流畅地操作底层数组。 此外，几乎每个方法都返回一个新的 `Collection` 实例，允许您在必要时保留集合的原始副本。

您可以从该表中选择任何方法来查看其用法示例：

<div class="content-list-p" markdown="1">

[all](#method-all)-返回代表集合的底层数组
[average](#method-average)-avg的别名
[avg](#method-avg)-获取指定数组key的平均值
[chunk](#method-chunk)-集合分块
[collapse](#method-collapse)-多维数组转一维数组
[collect](#method-collect)-返回一个新的 `Collection` 实例
[combine](#method-combine)-数组key和数组value组合合并
[concat](#method-concat)-集合末端附加指定数组或集合
[contains](#method-contains)-检查集合是否包含指定的元素
[containsStrict](#method-containsstrict)-严格检查集合是否包含指定的元素
[count](#method-count)-返回集合内元素的总数量
[countBy](#method-countBy)-计算每个元素的出现次数
[crossJoin](#method-crossjoin)-回所有可能排列的笛卡尔积
[dd](#method-dd)-打印集合元素并中断脚本执行
[diff](#method-diff)-返回原集合中存在而指定集合中不存在的值
[diffAssoc](#method-diffassoc)-会返回原集合不存在于指定集合的键 / 值对
[diffKeys](#method-diffkeys)-返回原集合中存在而指定集合中不存在键所对应的键 / 值对
[dump](#method-dump)-打印集合项
[duplicates](#method-duplicates)-从集合中检索并返回重复的值
[duplicatesStrict](#method-duplicatesstrict)-从集合中严格检索并返回重复的值
[each](#method-each)-循环集合项并将其传递到回调函数中
[filter](#method-filter)-给定回调函数条件过滤集合
[first](#method-first)-给定回调函数条件过滤通过的第一个元素
[firstWhere](#method-first-where)-返回集合中含有指定键 / 值对的第一个元素
[flatMap](#method-flatmap)-遍历集合并将每个值传递到回调函数，可重写值
[flatten](#method-flatten)-将多维集合转为一维集合
[flip](#method-flip)-将集合的键和对应的值进行互换
[forget](#method-forget)-过指定的键来移除集合中对应的元素
[forPage](#method-forpage)-返回一个含有指定页码数集合项的新集合
[get](#method-get)-返回指定键的集合项
[groupBy](#method-groupby)-根据指定键对集合项进行分组
[has](#method-has)-判断集合中是否存在指定键
[implode](#method-implode)-合并集合项为字符串
[intersect](#method-intersect)-从原集合中移除在指定 `array` 或集合中不存在的值
[intersectByKeys](#method-intersectbykeys)-从原集合中移除在指定 `array` 或集合中不存在的任何键
[isEmpty](#method-isempty)-判断集合是否为空
[isNotEmpty](#method-isnotempty)-判断集合是否不为空
[join](#method-join)-将集合中的值用字符串连接
[keyBy](#method-keyby)-以指定的键作为集合的键
[keys](#method-keys)-返回集合中所有的键
[last](#method-last)-返回集合中通过指定条件测试的最后一个元素
[map](#method-map)-遍历集合并将每一个值传入给定的回调函数，可重写值
[mapInto](#method-mapinto)-迭代集合，通过将值传递给构造函数来创建给定类的新实例
[mapSpread](#method-mapspread)-
[mapToGroups](#method-maptogroups)-
[mapWithKeys](#method-mapwithkeys)-
[max](#method-max)-
[median](#method-median)-
[merge](#method-merge)-
[mergeRecursive](#method-mergerecursive)-
[min](#method-min)-
[mode](#method-mode)-
[nth](#method-nth)-
[only](#method-only)-
[pad](#method-pad)-
[partition](#method-partition)-
[pipe](#method-pipe)-
[pluck](#method-pluck)-
[pop](#method-pop)-
[prepend](#method-prepend)-
[pull](#method-pull)-
[push](#method-push)-
[put](#method-put)-
[random](#method-random)-
[reduce](#method-reduce)-
[reject](#method-reject)-
[replace](#method-replace)-
[replaceRecursive](#method-replacerecursive)-
[reverse](#method-reverse)-
[search](#method-search)-
[shift](#method-shift)-
[shuffle](#method-shuffle)-
[skip](#method-skip)-
[slice](#method-slice)-
[some](#method-some)-
[sort](#method-sort)-
[sortBy](#method-sortby)-
[sortByDesc](#method-sortbydesc)-
[sortKeys](#method-sortkeys)-
[sortKeysDesc](#method-sortkeysdesc)-
[splice](#method-splice)-
[split](#method-split)-
[sum](#method-sum)-
[take](#method-take)-
[tap](#method-tap)-
[times](#method-times)-
[toArray](#method-toarray)-
[toJson](#method-tojson)-
[transform](#method-transform)-
[union](#method-union)-
[unique](#method-unique)-
[uniqueStrict](#method-uniquestrict)-
[unless](#method-unless)-
[unlessEmpty](#method-unlessempty)-
[unlessNotEmpty](#method-unlessnotempty)-
[unwrap](#method-unwrap)-
[values](#method-values)-
[when](#method-when)-
[whenEmpty](#method-whenempty)-
[whenNotEmpty](#method-whennotempty)-
[where](#method-where)-
[whereStrict](#method-wherestrict)-
[whereBetween](#method-wherebetween)-
[whereIn](#method-wherein)-
[whereInStrict](#method-whereinstrict)-
[whereInstanceOf](#method-whereinstanceof)-
[whereNotBetween](#method-wherenotbetween)-
[whereNotIn](#method-wherenotin)-
[whereNotInStrict](#method-wherenotinstrict)-
[whereNotNull](#method-wherenotnull)-
[whereNull](#method-wherenull)-
[wrap](#method-wrap)-
[zip](#method-zip)-

</div>

## 方法列表

<a name="method-all"></a>
#### `all()`

`all` 方法简单地返回集合所代表的底层数组：

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

`avg` 方法返回给定键的 [平均值](https://en.wikipedia.org/wiki/Average)：

```php
$average = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->avg('foo');

// 20

$average = new Collection([1, 1, 2, 4])->avg();

// 2
```

<a name="method-chunk"></a>
#### `chunk()`

`chunk` 方法把集合分割成多个指定大小的较小集合：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

当使用网格系统(例如 [Bootstrap](https://getbootstrap.tld/css/#grid))时，此方法在 [CMS 页面](../cms/pages.md) 中特别有用。 想象一下，您有一组要在网格中显示的模型：

```twig
{% for chunk in products.chunk(3) %}
    <div class="row">
        {% for product in chunk %}
            <div class="col-xs-4">{{ product.name }}</div>
        {% endfor %}
    </div>
{% endfor %}
```

<a name="method-collapse"></a>
#### `collapse()`

`collapse` 方法把一个多数组集合平铺为单个扁平的集合：

```php
$collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

$collapsed = $collection->collapse();

$collapsed->all();

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<a name="method-combine"></a>
#### `combine()`

`combine` 方法将一个集合的值作为键，与另一个数组或集合的值进行结合：

```php
$collection = new Collection(['name', 'age']);

$combined = $collection->combine(['George', 29]);

$combined->all();

// ['name' => 'George', 'age' => 29]
```

<a name="method-collect"></a>
#### `collect()`

`collect` 方法返回一个新的 `Collection` 实例，其中包含当前集合中的项目：

```php
$collectionA = new Collection([1, 2, 3]);

$collectionB = $collectionA->collect();

$collectionB->all();

// [1, 2, 3]
```

`collect` 方法主要用于将 [懒集合](#lazy-collections) 转换为标准的 `Collection` 实例：

```php
$lazyCollection = LazyCollection::make(function () {
    yield 1;
    yield 2;
    yield 3;
});

$collection = $lazyCollection->collect();

get_class($collection);

// 'October\Rain\Support\Collection'

$collection->all();

// [1, 2, 3]
```

> **提示**：当你有一个 `Enumerable` 的实例并且需要一个非懒集合实例时，`collect` 方法特别有用。 由于 `collect()` 是 `Enumerable` 合约的一部分，您可以安全地使用它来获取 `Collection` 实例。

<a name="method-concat"></a>
#### `concat()`

`concat` 方法在集合的末端附加指定的 `数组` 或集合值：

```php
$collection = new Collection(['John Doe']);

$concatenated = $collection->concat(['Jane Doe'])->concat(['name' => 'Johnny Doe']);

$concatenated->all();

// ['John Doe', 'Jane Doe', 'Johnny Doe']
```

<a name="method-contains"></a>
#### `contains()`

`contains` 方法检查集合是否包含指定的元素：

```php
$collection = new Collection(['name' => 'Desk', 'price' => 100]);

$collection->contains('Desk');

// true

$collection->contains('New York');

// false
```

你也可以传递一个键 / 值对给 `contains` 方法，它将检查集合中是否存在指定的键 / 值对：

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);

$collection->contains('product', 'Bookcase');

// false
```

最后，你也可以传递一个回调函数给 `contains` 方法来执行你的真值检验：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->contains(function ($value, $key) {
    return $value > 5;
});

// false
```

`contains` 方法用"松散"比较检查元素值，意味着整数值的字符串会被视同等值的整数。用 [`containsStrict`](#method-containsstrict) 方法使用"严格"比较过滤。

<a name="method-containsstrict"></a>
#### `containsStrict()`

此方法与 [`contains`](#method-contains)方法类似； 但是，所有值都使用"严格"比较来比较所有的值。

<a name="method-count"></a>
#### `count()`

`count` 方法返回集合内元素的总数量：

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->count();

// 4
```

<a name="method-countBy"></a>
#### `countBy()`

`countBy` 方法计算集合中每个值的出现次数。默认情况下，该方法计算每个元素的出现次数：

```php
$collection = new Collection([1, 2, 2, 2, 3]);

$counted = $collection->countBy();

$counted->all();

// [1 => 1, 2 => 3, 3 => 1]
```

但是，你也可以向 `countBy` 传递一个回调函数来计算自定义的值出现的次数：

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

`crossJoin` 方法交叉连接指定数组或集合的值，返回所有可能排列的笛卡尔积：

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

`dd`  方法用于打印集合元素并中断脚本执行：

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

如果你不想中断执行脚本，请使用 [`dump`](#method-dump) 方法替代。

<a name="method-diff"></a>
#### `diff()`

`diff` 方法将集合与其它集合或者 PHP 数组进行值的比较。然后返回原集合中存在而指定集合中不存在的值

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$diff = $collection->diff([2, 4, 6, 8]);

$diff->all();

// [1, 3, 5]
```

<a name="method-diffassoc"></a>
#### `diffAssoc()`

`diffAssoc` 方法与另外一个集合或基于 PHP 数组的键 / 值对进行比较。这个方法将会返回原集合不存在于指定集合的键 / 值对：

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

`diffKeys` 方法和另外一个集合或 PHP 数组的键(keys)进行比较，然后返回原集合中存在而指定集合中不存在键所对应的键 / 值对：

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

`dump` 方法用于打印集合项

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

如果要在打印集合后终止执行脚本，请使用 [`dd`](#method-dd) 方法代替。

<a name="method-duplicates"></a>
#### `duplicates()`

`duplicates` 方法从集合中检索并返回重复的值：

```php
$collection = new Collection(['a', 'b', 'a', 'c', 'b']);

$collection->duplicates();

// [2 => 'a', 4 => 'b']
```

如果集合包含数组或对象，则可以传递希望检查重复值的属性的键：

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

此方法与 [`duplicates`](#method-duplicates) 方法具有相同的签名；但是，所有值都以"严格"的方式进行比较

<a name="method-each"></a>
#### `each()`

`each` 方法用于循环集合项并将其传递到回调函数中：

```php
$collection->each(function ($item, $key) {
    //
});
```

如果你想中断对集合项的循环，那么就在你的回调函数中返回 `false`：

```php
$collection->each(function ($item, $key) {
    if (/* some condition */) {
        return false;
    }
});
```

<a name="method-every"></a>
#### `every()`

`every` 方法可用于验证集合中的每一个元素是否通过指定的条件测试：

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->every(4);

// ['a', 'e']
```

您可以选择将偏移量作为第二个参数传递：

```php
$collection->every(4, 1);

// ['b', 'f']
```

<a name="method-filter"></a>
#### `filter()`

`filter` 方法使用给定的回调函数过滤集合，只保留那些通过指定条件测试的集合项：

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->filter(function ($item) {
    return $item > 2;
});

$filtered->all();

// [3, 4]
```

对于 `filter` 的逆操作，请参见 [reject](#method-reject) 方法。

<a name="method-first"></a>
#### `first()`

`first`  方法返回集合中通过指定条件测试的第一个元素：

```php
new Collection([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```

你也可以不传入参数调用 `first` 方法来获取集合中的第一个元素。如果集合为空，则会返回 `null` ：

```php
new Collection([1, 2, 3, 4])->first();

// 1
```

<a name="method-first-where"></a>
#### `firstWhere()`

`firstWhere` 方法返回集合中含有指定键 / 值对的第一个元素：:

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

你也可以使用运算符来调用 `firstWhere` 方法：

```php
$collection->firstWhere('age', '>=', 18);

// ['name' => 'Diego', 'age' => 23]
```

和 [where](#method-where) 方法一样，你可以将一个参数传递给 `firstWhere` 方法。在这种情况下， `firstWhere` 方法将返回指定键的值为"真"的第一个集合项：

```php
$collection->firstWhere('age');

// ['name' => 'Linda', 'age' => 14]
```

<a name="method-flatmap"></a>
#### `flatMap()`

`flatMap` 方法遍历集合并将其中的每个值传递到给定的回调函数。可以通过回调函数修改集合项并返回它们，从而形成一个被修改过的新集合。然后，集合转化的数组是同级的：

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

`flatten` 方法将多维集合转为一维集合：

```php
$collection = new Collection(['name' => 'peter', 'languages' => ['php', 'javascript']]);

$flattened = $collection->flatten();

$flattened->all();

// ['peter', 'php', 'javascript'];
```

<a name="method-flip"></a>
#### `flip()`

`flip` 方法将集合的键和对应的值进行互换：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$flipped = $collection->flip();

$flipped->all();

// ['peter' => 'name', 'october' => 'platform']
```

<a name="method-forget"></a>
#### `forget()`

`forget` 方法将通过指定的键来移除集合中对应的元素：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$collection->forget('name');

$collection->all();

// ['platform' => 'october']
```

> **注意**: 与大多数集合的方法不同的是， `forget` 不会返回修改后的新集合；它会直接修改原集合。

<a name="method-forpage"></a>
#### `forPage()`

`forPage` 方法返回一个含有指定页码数集合项的新集合。这个方法接受页码数作为其第一个参数，每页显示的项数作为其第二个参数：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9])->forPage(2, 3);

$collection->all();

// [4, 5, 6]
```

该方法分别需要页码和每页显示的项目数。

<a name="method-get"></a>
#### `get()`

`get` 方法返回指定键的集合项，如果该键在集合中不存在，则返回`null`：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('name');

// peter
```

你可以任选一个默认值作为第二个参数传递：

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('foo', 'default-value');

// default-value
```

你甚至可以将一个回调函数作为默认值传递。如果指定的键不存在，就会返回回调函数的结果：

```php
$collection->get('email', function () {
    return 'default-value';
});

// default-value
```

<a name="method-groupby"></a>
#### `groupBy()`

`groupBy` 方法根据指定键对集合项进行分组：

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

你可以传递一个回调函数来代替一个字符串的 `key`。这个回调函数应该返回你希望用来分组的键的值：

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

`has` 方法判断集合中是否存在指定键：

```php
$collection = new Collection(['account_id' => 1, 'product' => 'Desk']);

$collection->has('email');

// false
```

<a name="method-implode"></a>
#### `implode()`

`implode` 方法用于合并集合项。其参数取决于集合项的类型。

如果集合包含数组或对象，你应该传递你希望合并的属性的键，以及你希望放在值之间用来"拼接"的字符串：

```php
$collection = new Collection([
    ['account_id' => 1, 'product' => 'Chair'],
    ['account_id' => 2, 'product' => 'Desk'],
]);

$collection->implode('product', ', ');

// Chair, Desk
```

如果集合中包含简单的字符串或数值，只需要传入"拼接"用的字符串作为该方法的唯一参数即可：

```php
new Collection([1, 2, 3, 4, 5])->implode('-');

// '1-2-3-4-5'
```

<a name="method-intersect"></a>
#### `intersect()`

`intersect`  方法从原集合中移除在指定 `array` 或集合中不存在的值。生成的集合将会保留原集合的键

```php
$collection = new Collection(['Desk', 'Sofa', 'Chair']);

$intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);

$intersect->all();

// [0 => 'Desk', 2 => 'Chair']
```

如您所见，生成的集合将保留原始集合的键。

<a name="method-intersectbykeys"></a>
#### `intersectByKeys()`

`intersectByKeys` 方法从原集合中移除在指定 `array` 或集合中不存在的任何键：

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

如果集合为空， `isEmpty` 方法返回 `true` ，否则返回 `false` ：

```php
new Collection([])->isEmpty();

// true
```

<a name="method-isnotempty"></a>
#### `isNotEmpty()`

如果集合不为空，`isNotEmpty` 方法返回 `true` ，否则返回 `false` ：

```php
new Collection([])->isNotEmpty();

// false
```

<a name="method-join"></a>
#### `join()`

`join` 方法会将集合中的值用字符串连接：

```php
new Collection(['a', 'b', 'c'])->join(', '); // 'a, b, c'
new Collection(['a', 'b', 'c'])->join(', ', ', and '); // 'a, b, and c'
new Collection(['a', 'b'])->join(', ', ' and '); // 'a and b'
new Collection(['a'])->join(', ', ' and '); // 'a'
new Collection([])->join(', ', ' and '); // ''
```

<a name="method-keyby"></a>
#### `keyBy()`

`keyBy` 方法以指定的键作为集合的键：

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

如果多个元素具有相同的键，则只有最后一个元素会显示在新集合中。

你还可以在这个方法传递一个回调函数。该回调函数返回的值会作为该集合的键：

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

`keys` 方法返回集合中所有的键：

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

`last` 方法返回集合中通过指定条件测试为真的最后一个元素：

```php
new Collection([1, 2, 3, 4])->last(function ($key, $value) {
    return $value < 3;
});

// 2
```

不传入参数的情况下， `last` 方法会获取集合中最后一个元素。如果集合为空，方法将返回 `null` ：

```php
new Collection([1, 2, 3, 4])->last();

// 4
```

<a name="method-map"></a>
#### `map()`

`map` 方法遍历集合并将每一个值传入给定的回调函数。该回调函数可以任意修改集合项并返回，从而生成被修改过集合项的新集合：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});

$multiplied->all();

// [2, 4, 6, 8, 10]
```

> **注意**: 与其他大多数集合方法一样， `map` 会返回一个新的集合实例；它不会修改原集合。如果你想修改原集合，请使用 [`transform`](#method-transform) 方法。

<a name="method-mapinto"></a>
#### `mapInto()`

`mapInto()` 方法可以迭代集合，通过将值传递给构造函数来创建给定类的新实例：

```php
class Currency
{
    /**
     * 创建一个新的货币实例。
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

`mapSpread` 方法可以迭代集合，将每个嵌套项值给指定的回调函数。该回调函数可以自由修改该集合项并返回，从而生成被修改过集合项的新集合：

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

`mapToGroups` 方法通过给定的回调函数对集合项进行分组。该回调函数应该返回一个包含单个键 / 值对的关联数组，从而生成一个分组值的新集合：

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

`mapWithKeys` 方法遍历集合并将每个值传入给定的回调函数。该回调函数将返回一个包含单个键 / 值对的关联数组：

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

`max` 方法返回指定键的最大值：

```php
$max = new Collection([['foo' => 10], ['foo' => 20]])->max('foo');

// 20

$max = new Collection([1, 2, 3, 4, 5])->max();

// 5
```

<a name="method-median"></a>
#### `median()`

`median` 方法返回指定键的 [中间值](https://en.wikipedia.org/wiki/Median)：

```php
$median = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->median('foo');

// 15

$median = new Collection([1, 1, 2, 4])->median();

// 1.5
```

<a name="method-merge"></a>
#### `merge()`

`merge` 方法将合并指定的数组或集合到原集合。如果给定的集合项的字符串键与原集合中的字符串键相匹配，则指定集合项的值将覆盖原集合的值：

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->merge(['price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => 1, 'price' => 200, 'discount' => false]
```

如果给定的集合项为数字，则这些值将会追加在集合的最后：

```php
$collection = new Collection(['Desk', 'Chair']);

$merged = $collection->merge(['Bookcase', 'Door']);

$merged->all();

// ['Desk', 'Chair', 'Bookcase', 'Door']
```

<a name="method-mergerecursive"></a>
#### `mergeRecursive()`

`mergeRecursive` 方法以递归的形式合并给定的数组或集合到原集合中，如果给定集合项的字符串键与原集合的字符串键一致，则会将给定的集合项的值以递归的形式合并到原集合的相同键中。

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->mergeRecursive(['product_id' => 2, 'price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => [1, 2], 'price' => [100, 200], 'discount' => false]
```

<a name="method-min"></a>
#### `min()`

`min` 方法返回指定键的最小值：

```php
$min = new Collection([['foo' => 10], ['foo' => 20]])->min('foo');

// 10

$min = new Collection([1, 2, 3, 4, 5])->min();

// 1
```

<a name="method-mode"></a>
#### `mode()`

`mode` 方法返回指定键的 [众数](https://en.wikipedia.org/wiki/Mode_(statistics))：

```php
$mode = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->mode('foo');

// [10]

$mode = new Collection([1, 1, 2, 4])->mode();

// [1]
```

<a name="method-nth"></a>
#### `nth()`

`nth` 方法创建由每 n 个元素取一个元素组成的一个新集合：

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->nth(4);

// ['a', 'e']
```

你也可以设置指定的偏移位置作为第二个参数：

```php
$collection->nth(4, 1);

// ['b', 'f']
```

<a name="method-only"></a>
#### `only()`

`only` 方法返回集合中所有指定键的集合项：

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]);

$filtered = $collection->only(['product_id', 'name']);

$filtered->all();

// ['product_id' => 1, 'name' => 'Desk']
```

与 `only` 对应的是 [except](#method-except) 方法。

<a name="method-pad"></a>
#### `pad()`

`pad` 方法将使用给定的值填充数组，直到数组达到指定的大小。该方法的行为与 [array_pad](https://secure.php.net/manual/en/function.array-pad.php) PHP 函数功能类似。

要填充到左侧，你应该使用负值。如果给定大小的绝对值小于或等于数组的长度，则不会发生填充：

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

`partition` 是可以和 PHP 的 `list` 方法配合使用，利用回调返回是否为真来分开通过指定条件的元素以及那些不通过指定条件的元素：

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

`pipe` 可以把集合放到回调参数中并返回回调的结果：

```php
$collection = new Collection([1, 2, 3]);

$piped = $collection->pipe(function ($collection) {
    return $collection->sum();
});

// 6
```

<a name="method-pluck"></a>
#### `pluck()`

`pluck` 可以获取集合中指定键对应的所有值：

```php
$collection = new Collection([
    ['product_id' => 'prod-100', 'name' => 'Chair'],
    ['product_id' => 'prod-200', 'name' => 'Desk'],
]);

$plucked = $collection->pluck('name');

$plucked->all();

// ['Chair', 'Desk']
```

你也可以通过传入第二个参数来指定生成集合的key：

```php
$plucked = $collection->pluck('name', 'product_id');

$plucked->all();

// ['prod-100' => 'Desk', 'prod-200' => 'Chair']
```

<a name="method-pop"></a>
#### `pop()`

 `pop` 从原集合返回并移除集合中的最后一项：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->pop();

// 5

$collection->all();

// [1, 2, 3, 4]
```

<a name="method-prepend"></a>
#### `prepend()`

 `prepend` 方法将指定的值添加到集合的开头：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->prepend(0);

$collection->all();

// [0, 1, 2, 3, 4, 5]
```

<a name="method-pull"></a>
#### `pull()`

`pull` 方法把指定键对应的值从集合中移除并返回：

```php
$collection = new Collection(['product_id' => 'prod-100', 'name' => 'Desk']);

$collection->pull('name');

// 'Desk'

$collection->all();

// ['product_id' => 'prod-100']
```

<a name="method-push"></a>
#### `push()`

`push` 方法把指定的值追加到集合项的末尾

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->push(5);

$collection->all();

// [1, 2, 3, 4, 5]
```

<a name="method-put"></a>
#### `put()`

`put` 方法在集合内设置给定的键和值：

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk']);

$collection->put('price', 100);

$collection->all();

// ['product_id' => 1, 'name' => 'Desk', 'price' => 100]
```

<a name="method-random"></a>
#### `random()`

`random` 方法从集合中返回一个随机项：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->random();

// 4 - (retrieved randomly)
```

你可以选择传入一个整数到 `random` 来指定要获取的随即项的数量。只要你显示传递你希望接收的数量时，则会返回项目的集合：

```php
$random = $collection->random(3);

$random->all();

// [2, 4, 5] - (retrieved randomly)
```

<a name="method-reduce"></a>
#### `reduce()`

`reduce` 方法将每次迭代的结果传递给下一次迭代直到集合减少为单个值：

```php
$collection = new Collection([1, 2, 3]);

$total = $collection->reduce(function ($carry, $item) {
    return $carry + $item;
});

// 6
```

第一次迭代时 `$carry` 的数值为 `null`； 你也可以通过传入第二个参数到 `reduce` 来指定它的初始值：

```php
$collection->reduce(function ($carry, $item) {
    return $carry + $item;
}, 4);

// 10
```

<a name="method-reject"></a>
#### `reject()`

`reject` 方法使用指定的回调函数过滤集合。如果回调函数返回 `true` 就会把对应的元素从集合中移除：

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->reject(function ($item) {
    return $item > 2;
});

$filtered->all();

// [1, 2]
```

对于 `reject` 方法的逆操作，请参见 [`filter`](#method-filter) 方法。

<a name="method-replace"></a>
#### `replace()`

`replace` 方法类似于 `merge` ；不过， `replace` 不仅可以覆盖匹配到的相同字符串键的元素，而且也可以覆盖匹配到数字键的元素：

```php
$collection = new Collection(['James', 'Scott', 'Dan']);

$replaced = $collection->replace([1 => 'Victoria', 3 => 'Finn']);

$replaced->all();

// ['James', 'Victoria', 'Dan', 'Finn']
```

<a name="method-replacerecursive"></a>
#### `replaceRecursive()`

这个方法类似 `replace` ，但是会以递归的形式将数组替换到具有相同键的元素中：

```php
$collection = new Collection(['George', 'Scott', ['James', 'Victoria', 'Finn']]);

$replaced = $collection->replaceRecursive(['Charlie', 2 => [1 => 'King']]);

$replaced->all();

// ['Charlie', 'Scott', ['James', 'King', 'Finn']]
```

<a name="method-reverse"></a>
#### `reverse()`

`reverse` 方法用来倒转集合项的顺序，并保留原始的键：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$reversed = $collection->reverse();

$reversed->all();

// [5, 4, 3, 2, 1]
```

<a name="method-search"></a>
#### `search()`

`search` 方法在集合中搜索给定的值并返回它的键。如果没有找到，则返回 `false` 。

```php
$collection = new Collection([2, 4, 6, 8]);

$collection->search(4);

// 1
```

使用 "宽松"的方式进行搜索，这意味着具有整数值的字符串会被认为等于相同值的整数。使用 "严格"的方式进行搜索，就传入 `true` 作为该方法的第二个参数：


```php
$collection->search('4', true);

// false
```

Alternatively, you may pass in your own callback to search for the first item that passes your truth test:

```php
$collection->search(function ($item, $key) {
    return $item > 5;
});

// 2
```

<a name="method-shift"></a>
#### `shift()`

`shift` 方法移除并返回集合的第一个元素：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->shift();

// 1

$collection->all();

// [2, 3, 4, 5]
```

<a name="method-shuffle"></a>
#### `shuffle()`

`shuffle` 方法随机打乱元素：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$shuffled = $collection->shuffle();

$shuffled->all();

// [3, 2, 5, 1, 4] (generated randomly)
```

<a name="method-skip"></a>
#### `skip()`

`skip` 方法返回除了给定的元素数目的新集合：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$collection = $collection->skip(4);

$collection->all();

// [5, 6, 7, 8, 9, 10]
```

<a name="method-slice"></a>
#### `slice()`

`slice` 方法返回集合中给定索引开始后面的部分：

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$slice = $collection->slice(4);

$slice->all();

// [5, 6, 7, 8, 9, 10]
```

如果你想限制返回内容的大小，可以将你期望的大小作为第二个参数传递到该方法：

```php
$slice = $collection->slice(4, 2);

$slice->all();

// [5, 6]
```

默认情况下，返回的内容将会保留原始键。如果你不希望保留原始键，你可以使用 [`values`](#method-values) 方法来重新建立索引。

<a name="method-some"></a>
#### `some()`

[`contains`](#method-contains) 方法的别名。

<a name="method-sort"></a>
#### `sort()`

`sort` 方法对集合进行排序：

```php
$collection = new Collection([5, 3, 1, 2, 4]);

$sorted = $collection->sort();

$sorted->values()->all();

// [1, 2, 3, 4, 5]
```

排序后的集合会保留原数组的键，所以在这个例子我们将使用 [`values`](#method-values) 方法去把键重置为连续编号的索引：


要对嵌套数组或对象的集合进行排序，请参阅 [`sortBy`](#method-sortby) 和 [`sortByDesc`](#method-sortbydesc) 方法。

如果你有更高级的排序需求，可以通过自己的算法将回调函数传递到 `sort` 。请参阅 PHP 文档的 [`uasort`](http://php.net/manual/en/function.usort.php#refsect1-function.usort-parameters)，这是集合的 `sort` 方法在底层所调用的。

<a name="method-sortby"></a>
#### `sortBy()`

`sortBy` 方法将根据指定键对集合进行排序:

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

排序后的集合会保留原始数组的键，所以在这个例子中我们使用 [`values`](#method-values) 方法将键重置为连续编号的索引：

你可以通过你自己的回调来决定如何排序集合的值:

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

该方法与 [`sortBy`](#method-sortby) 方法一样，但是会以相反的顺序来对集合进行排序：

<a name="method-sortkeys"></a>
#### `sortKeys()`

`sortKeys` 方法通过底层关联数组的键来对集合进行排序：

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

该方法与 [`sortKeys`](#method-sortkeys)方法一样，但是会以相反的顺序来对集合进行排序。

<a name="method-splice"></a>
#### `splice()`

`splice` 方法移除并返回指定索引开始的元素片段：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2);

$chunk->all();

// [3, 4, 5]

$collection->all();

// [1, 2]
```

你可以传递第二个参数用以限制被删除内容的大小：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 4, 5]
```

此外，你可以传入含有新参数项的第三个参数来代替集合中删除的元素：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1, [10, 11]);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 10, 11, 4, 5]
```

<a name="method-splice"></a>
#### `splice()`

`splice` 方法移除并返回指定索引开始的元素片段：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2);

$chunk->all();

// [3, 4, 5]

$collection->all();

// [1, 2]
```

你可以传递第二个参数用以限制被删除内容的大小：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 4, 5]
```

此外，你可以传入含有新参数项的第三个参数来代替集合中删除的元素：

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

`split` 方法将集合按照给定的值拆分：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$groups = $collection->split(3);

$groups->toArray();

// [[1, 2], [3, 4], [5]]
```

<a name="method-sum"></a>
#### `sum()`

`sum` 方法返回集合内所有项的和：

```php
new Collection([1, 2, 3, 4, 5])->sum();

// 15
```

如果集合包含嵌套数组或对象，则应该传入一个键来指定要进行求和的值：

```php
$collection = new Collection([
    ['name' => 'JavaScript: The Good Parts', 'pages' => 176],
    ['name' => 'JavaScript: The Definitive Guide', 'pages' => 1096],
]);

$collection->sum('pages');

// 1272
```

另外，你可以传入自己的回调函数来决定要用集合中的哪些值进行求和：

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

`take` 方法返回给定数量项的新集合：

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

// [0, 1, 2]
```

你也可以传递负整数从集合末尾获取指定数量的项：

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(-2);

$chunk->all();

// [4, 5]
```

<a name="method-tap"></a>
#### `tap()`

`tap` 方法将给定的回调函数传入该集合，允许你在一个特定点"tap"集合，并在不影响集合本身的情况下对集合项执行某些操作

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

静态 `times` 方法通过调用给定次数的回调函数来创建新集合：

```php
$collection = Collection::times(10, function ($number) {
    return $number * 9;
});

$collection->all();

// [9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
```

<a name="method-toarray"></a>
#### `toArray()`

`toArray` 方法将集合转换为普通的 PHP `array`。 如果集合的值为 [数据库模型](../database/model.md)，模型也将被转换为数组：

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toArray();

/*
    [
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```

> **注意**: `toArray` 也会将所有集合的嵌套对象转换为数组。如果你想获取原数组，可以使用 [`all`](#method-all) 方法。

<a name="method-tojson"></a>
#### `toJson()`

`toJson` 方法将集合转换成 JSON 字符串：

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toJson();

// '{"name":"Desk","price":200}'
```

<a name="method-transform"></a>
#### `transform()`

`transform` 方法会遍历整个集合，并对集合中的每个元素都会调用其回调函数。集合中的元素将被替换为回调函数返回的值：

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->transform(function ($item, $key) {
    return $item * 2;
});

$collection->all();

// [2, 4, 6, 8, 10]
```

> **注意**: 与大多数集合方法不同， `transform` 会修改集合本身。如果你想创建新集合，可以使用 [`map`](#method-map) 方法。

<a name="method-union"></a>
#### `union()`

`union` 方法将给定数组添加到集合中。如果给定的数组含有与原集合一样的键，则首选原始集合的值：

```php
$collection = new Collection([1 => ['a'], 2 => ['b']]);

$union = $collection->union([3 => ['c'], 1 => ['b']]);

$union->all();

// [1 => ['a'], 2 => ['b'], 3 => ['c']]
```

<a name="method-unique"></a>
#### `unique()`

`unique` 方法返回集合中所有唯一项。返回的集合保留着原数组的键，所以在这个例子中，我们使用 [`values`](#method-values) 方法把键重置为连续编号的索引：

```php
$collection = new Collection([1, 1, 2, 2, 3, 4, 2]);

$unique = $collection->unique();

$unique->values()->all();

// [1, 2, 3, 4]
```

当处理嵌套数组或对象时，你可以指定用于确定唯一性的键：

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

你也可以通过传递自己的回调函数来确定元素的唯一性：

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

`unique` 方法在检查项目值时使用"宽松"模式比较，意味着具有整数值的字符串将被视为等于相同值的整数。你可以使用 [`uniqueStrict`](#method-uniquestrict) 方法做"严格"模式比较。

<a name="method-uniquestrict"></a>
#### `uniqueStrict()`

这个方法与 [`unique`](#method-unique) 方法一样，然而，所有的值是用"严格"模式来比较的。

<a name="method-unless"></a>
#### `unless()`

`unless` 法当传入的第一个参数不为 `true` 的时候，将执行给定的回调函数：

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

与 `unless` 相反的方法，请查看 [`when`](#method-when) 方法

<a name="method-unlessempty"></a>
#### `unlessEmpty()`

[`whenNotEmpty`](#method-whennotempty) 的别名方法。

<a name="method-unlessnotempty"></a>
#### `unlessNotEmpty()`

[`whenEmpty`](#method-whenempty) 的别名方法。

<a name="method-unwrap"></a>
#### `unwrap()`

静态 `unwrap` 方法返回集合内部的可用元素：

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

`values` 方法返回键被重置为连续key的新集合：

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

当 `when` 方法的第一个参数传入为 `true` 时，将执行给定的回调函数：

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

与 `when` 相反的方法，请查看 [`unless`](#method-unless) 方法。

<a name="method-whenempty"></a>
#### `whenEmpty()`

`whenEmpty` 方法是当集合为空时，将执行给定的回调函数：

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

与 `whenEmpty` 相反的方法，请查看 [`whenNotEmpty`](#method-whennotempty) 方法。

<a name="method-whennotempty"></a>
#### `whenNotEmpty()`

`whenNotEmpty` 方法当集合不为空时，将执行给定的回调函数：

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

与 `whenNotEmpty` 相反的方法，请查看 [`whenEmpty`](#method-whenempty) 方法。

<a name="method-where"></a>
#### `where()`

`where` 方法通过给定的键 / 值对查询过滤集合的结果：

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

`where` 方法在检查集合项值时使用"宽松"模式比较，这意味着具有整数值的字符串会被认为等于相同值的整数。你可以使用 [`whereStrict`](#method-wherestrict) 方法进行"严格"模式比较。

而且，你还可以将一个比较运算符作为第二个参数传递。

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

此方法和 [`where`](#method-where) 方法使用相似；但是它是"严格"模式去匹配值和类型。

<a name="method-wherebetween"></a>
#### `whereBetween()`

`whereBetween` 方法会筛选给定范围的集合：

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

`whereIn` 方法会根据包含给定数组的键 / 值对来过滤集合：

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

`whereIn`方法在检查集合项值时使用"宽松"模式比较，这意味着具有整数值的字符串会被认为等于相同值的整数。你可以使用 [`whereInStrict`](#method-whereinstrict) 方法进行"严格"模式比较。

<a name="method-whereinstrict"></a>
#### `whereInStrict()`

此方法和 [`whereIn`](#method-wherein) 方法使用相似；但是它是"严格"模式去匹配值和类型。

<a name="method-whereinstanceof"></a>
#### `whereInstanceOf()`

`whereInstanceOf` 方法根据给定的类来过滤集合：

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

`whereNotBetween` 方法在指定的范围内过滤集合

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

`whereNotIn` 方法根据未包含在指定数组的键 / 值对来对集合进行过滤：

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

`whereNotIn` 方法在检查集合项值时使用"宽松"模式比较，这意味着具有整数值的字符串会被认为等于相同值的整数。你可以使用 [`whereNotInStrict`](#method-wherenotinstrict) 方法进行"严格"模式比较

<a name="method-wherenotinstrict"></a>
#### `whereNotInStrict()`

这个方法与 [`whereNotIn`](#method-wherenotin) 方法类似；不同的是会使用"严格"模式比较。

<a name="method-wherenotnull"></a>
#### `whereNotNull()`

`whereNotNull` 方法筛选给定键不为 NULL 的项：

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

`whereNull` 方法筛选给定键为 NULL 的项：

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

静态 `wrap` 方法会将给定值封装到集合中：

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

`zip` 方法在与集合的值对应的索引处合并给定数组的值：

```php
$collection = new Collection(['Chair', 'Desk']);

$zipped = $collection->zip([100, 200]);

$zipped->all();

// [['Chair', 100], ['Desk', 200]]
```
