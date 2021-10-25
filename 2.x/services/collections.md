# Collections

- [Introduction](#introduction)
- [Creating collections](#creating-collections)
- [Available methods](#available-methods)

<a name="introduction"></a>
## Introduction

The `October\Rain\Support\Collection` class provides a fluent, convenient wrapper for working with arrays of data. For example, check out the following code. We'll create a new collection instance from the array, run the `strtoupper` function on each element, and then remove all empty elements:

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

The `Collection` class allows you to chain its methods to perform fluent mapping and reducing of the underlying array. In general every `Collection` method returns an entirely new `Collection` instance.

<a name="creating-collections"></a>
## Creating collections

As described above, passing an array to the constructor of the `October\Rain\Support\Collection` class will return a new instance for the given array. So, creating a collection is as simple as:

```php
$collection = new October\Rain\Support\Collection([1, 2, 3]);
```

By default, collections of [database models](../database/model) are always returned as `Collection` instances; however, feel free to use the `Collection` class wherever it is convenient for your application.

<a name="available-methods"></a>
## Available methods

For the remainder of this documentation, we'll discuss each method available on the `Collection` class. Remember, all of these methods may be chained for fluently manipulating the underlying array. Furthermore, almost every method returns a new `Collection` instance, allowing you to preserve the original copy of the collection when necessary.

You may select any method from this table to see an example of its usage:

<style>
    .collection-method-list > p {
        column-count: 3; -moz-column-count: 3; -webkit-column-count: 3;
        column-gap: 2em; -moz-column-gap: 2em; -webkit-column-gap: 2em;
    }

    .collection-method-list a {
        display: block;
    }
</style>

<div class="collection-method-list" markdown="1">

[all](#method-all)
[average](#method-average)
[avg](#method-avg)
[chunk](#method-chunk)
[collapse](#method-collapse)
[collect](#method-collect)
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

<a name="method-listing"></a>
## Method Listing

<style>
    .collection-method code {
        font-size: 14px;
    }

    .collection-method:not(.first-collection-method) {
        margin-top: 50px;
    }
</style>

<a name="method-all"></a>
#### `all()` {.collection-method .first-collection-method}

The `all` method simply returns the underlying array represented by the collection:

```php
$collection = new Collection([1, 2, 3]);

$collection->all();

// [1, 2, 3]
```

<a name="method-average"></a>
#### `average()` {#collection-method}

Alias for the [`avg`](#method-avg) method.

<a name="method-avg"></a>
#### `avg()` {#collection-method}

The `avg` method returns the [average value](https://en.wikipedia.org/wiki/Average) of a given key:

```php
$average = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->avg('foo');

// 20

$average = new Collection([1, 1, 2, 4])->avg();

// 2
```

<a name="method-chunk"></a>
#### `chunk()` {.collection-method}

The `chunk` method breaks the collection into multiple, smaller collections of a given size:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

This method is especially useful in [CMS pages](../cms/pages) when working with a grid system, such as [Bootstrap](https://getbootstrap.tld/css/#grid). Imagine you have a collection of models you want to display in a grid:

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
#### `collapse()` {.collection-method}

The `collapse` method collapses a collection of arrays into a flat collection:

```php
$collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

$collapsed = $collection->collapse();

$collapsed->all();

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<a name="method-combine"></a>
#### `combine()` {#collection-method}

The `combine` method combines the values of the collection, as keys, with the values of another array or collection.

```php
$collection = new Collection(['name', 'age']);

$combined = $collection->combine(['George', 29]);

$combined->all();

// ['name' => 'George', 'age' => 29]
```

<a name="method-collect"></a>
#### `collect()` {#collection-method}

The `collect` method returns a new `Collection` instance with the items currently in the collection:

```php
$collectionA = new Collection([1, 2, 3]);

$collectionB = $collectionA->collect();

$collectionB->all();

// [1, 2, 3]
```

The `collect` method is primarily useful for converting [lazy collections](#lazy-collections) into standard `Collection` instances:

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

> **Tip**: The `collect` method is especially useful when you have an instance of `Enumerable` and need a non-lazy collection instance. Since `collect()` is part of the `Enumerable` contract, you can safely use it to get a `Collection` instance.

<a name="method-concat"></a>
#### `concat()` {#collection-method}

The `concat` method appends the given `array` or collection values onto the end of the collection:

```php
$collection = new Collection(['John Doe']);

$concatenated = $collection->concat(['Jane Doe'])->concat(['name' => 'Johnny Doe']);

$concatenated->all();

// ['John Doe', 'Jane Doe', 'Johnny Doe']
```

<a name="method-contains"></a>
#### `contains()` {#collection-method}

The `contains` method determines whether the collection contains a given item:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 100]);

$collection->contains('Desk');

// true

$collection->contains('New York');

// false
```

You may also pass a key / value pair to the `contains` method, which will determine if the given pair exists in the collection:

```php
$collection = new Collection([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);

$collection->contains('product', 'Bookcase');

// false
```

Finally, you may also pass a callback to the `contains` method to perform your own truth test:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->contains(function ($value, $key) {
    return $value > 5;
});

// false
```

The `contains` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`containsStrict`](#method-containsstrict) method to filter using "strict" comparisons.

<a name="method-containsstrict"></a>
#### `containsStrict()` {#collection-method}

This method has the same signature as the [`contains`](#method-contains) method; however, all values are compared using "strict" comparisons.

<a name="method-count"></a>
#### `count()` {.collection-method}

The `count` method returns the total number of items in the collection:

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->count();

// 4
```

<a name="method-countBy"></a>
#### `countBy()` {#collection-method}

The `countBy` method counts the occurrences of values in the collection. By default, the method counts the occurrences of every element:

```php
$collection = new Collection([1, 2, 2, 2, 3]);

$counted = $collection->countBy();

$counted->all();

// [1 => 1, 2 => 3, 3 => 1]
```

However, you pass a callback to the `countBy` method to count all items by a custom value:

```php
$collection = new Collection(['alice@gmail.tld', 'bob@yahoo.tld', 'carlos@gmail.tld']);

$counted = $collection->countBy(function ($email) {
    return substr(strrchr($email, "@"), 1);
});

$counted->all();

// ['gmail.tld' => 2, 'yahoo.tld' => 1]
```

<a name="method-crossjoin"></a>
#### `crossJoin()` {#collection-method}

The `crossJoin` method cross joins the collection's values among the given arrays or collections, returning a Cartesian product with all possible permutations:

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
#### `dd()` {#collection-method}

The `dd` method dumps the collection's items and ends execution of the script:

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

If you do not want to stop executing the script, use the [`dump`](#method-dump) method instead.

<a name="method-diff"></a>
#### `diff()` {.collection-method}

The `diff` method compares the collection against another collection or a plain PHP `array`:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$diff = $collection->diff([2, 4, 6, 8]);

$diff->all();

// [1, 3, 5]
```

<a name="method-diffassoc"></a>
#### `diffAssoc()` {#collection-method}

The `diffAssoc` method compares the collection against another collection or a plain PHP `array` based on its keys and values. This method will return the key / value pairs in the original collection that are not present in the given collection:

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
#### `diffKeys()` {#collection-method}

The `diffKeys` method compares the collection against another collection or a plain PHP `array` based on its keys. This method will return the key / value pairs in the original collection that are not present in the given collection:

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
#### `dump()` {#collection-method}

The `dump` method dumps the collection's items:

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

If you want to stop executing the script after dumping the collection, use the [`dd`](#method-dd) method instead.

<a name="method-duplicates"></a>
#### `duplicates()` {#collection-method}

The `duplicates` method retrieves and returns duplicate values from the collection:

```php
$collection = new Collection(['a', 'b', 'a', 'c', 'b']);

$collection->duplicates();

// [2 => 'a', 4 => 'b']
```

If the collection contains arrays or objects, you can pass the key of the attributes that you wish to check for duplicate values:

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
#### `duplicatesStrict()` {#collection-method}

This method has the same signature as the [`duplicates`](#method-duplicates) method; however, all values are compared using "strict" comparisons.

<a name="method-each"></a>
#### `each()` {#collection-method}

The `each` method iterates over the items in the collection and passes each item to a callback:

```php
$collection->each(function ($item, $key) {
    //
});
```

If you would like to stop iterating through the items, you may return `false` from your callback:

```php
$collection->each(function ($item, $key) {
    if (/* some condition */) {
        return false;
    }
});
```

<a name="method-every"></a>
#### `every()` {.collection-method}

The `every` method creates a new collection consisting of every n-th element:

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->every(4);

// ['a', 'e']
```

You may optionally pass offset as the second argument:

```php
$collection->every(4, 1);

// ['b', 'f']
```

<a name="method-filter"></a>
#### `filter()` {.collection-method}

The `filter` method filters the collection by a given callback, keeping only those items that pass a given truth test:

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->filter(function ($item) {
    return $item > 2;
});

$filtered->all();

// [3, 4]
```

For the inverse of `filter`, see the [reject](#method-reject) method.

<a name="method-first"></a>
#### `first()` {.collection-method}

The `first` method returns the first element in the collection that passes a given truth test:

```php
new Collection([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```

You may also call the `first` method with no arguments to get the first element in the collection. If the collection is empty, `null` is returned:

```php
new Collection([1, 2, 3, 4])->first();

// 1
```

<a name="method-first-where"></a>
#### `firstWhere()` {#collection-method}

The `firstWhere` method returns the first element in the collection with the given key / value pair:

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

You may also call the `firstWhere` method with an operator:

```php
$collection->firstWhere('age', '>=', 18);

// ['name' => 'Diego', 'age' => 23]
```

Like the [where](#method-where) method, you may pass one argument to the `firstWhere` method. In this scenario, the `firstWhere` method will return the first item where the given item key's value is "truthy":

```php
$collection->firstWhere('age');

// ['name' => 'Linda', 'age' => 14]
```

<a name="method-flatmap"></a>
#### `flatMap()` {#collection-method}

The `flatMap` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items. Then, the array is flattened by a level:

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
#### `flatten()` {.collection-method}

The `flatten` method flattens a multi-dimensional collection into a single dimension:

```php
$collection = new Collection(['name' => 'peter', 'languages' => ['php', 'javascript']]);

$flattened = $collection->flatten();

$flattened->all();

// ['peter', 'php', 'javascript'];
```

<a name="method-flip"></a>
#### `flip()` {.collection-method}

The `flip` method swaps the collection's keys with their corresponding values:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$flipped = $collection->flip();

$flipped->all();

// ['peter' => 'name', 'october' => 'platform']
```

<a name="method-forget"></a>
#### `forget()` {.collection-method}

The `forget` method removes an item from the collection by its key:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$collection->forget('name');

$collection->all();

// ['platform' => 'october']
```

> **Note**: Unlike most other collection methods, `forget` does not return a new modified collection; it modifies the collection it is called on.

<a name="method-forpage"></a>
#### `forPage()` {.collection-method}

The `forPage` method returns a new collection containing the items that would be present on a given page number:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9])->forPage(2, 3);

$collection->all();

// [4, 5, 6]
```

The method requires the page number and the number of items to show per page, respectively.

<a name="method-get"></a>
#### `get()` {.collection-method}

The `get` method returns the item at a given key. If the key does not exist, `null` is returned:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('name');

// peter
```

You may optionally pass a default value as the second argument:

```php
$collection = new Collection(['name' => 'peter', 'platform' => 'october']);

$value = $collection->get('foo', 'default-value');

// default-value
```

You may even pass a callback as the default value. The result of the callback will be returned if the specified key does not exist:

```php
$collection->get('email', function () {
    return 'default-value';
});

// default-value
```

<a name="method-groupby"></a>
#### `groupBy()` {.collection-method}

The `groupBy` method groups the collection's items by a given key:

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

In addition to passing a string `key`, you may also pass a callback. The callback should return the value you wish to key the group by:

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
#### `has()` {.collection-method}

The `has` method determines if a given key exists in the collection:

```php
$collection = new Collection(['account_id' => 1, 'product' => 'Desk']);

$collection->has('email');

// false
```

<a name="method-implode"></a>
#### `implode()` {.collection-method}

The `implode` method joins the items in a collection. Its arguments depend on the type of items in the collection.

If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values:

```php
$collection = new Collection([
    ['account_id' => 1, 'product' => 'Chair'],
    ['account_id' => 2, 'product' => 'Desk'],
]);

$collection->implode('product', ', ');

// Chair, Desk
```

If the collection contains simple strings or numeric values, simply pass the "glue" as the only argument to the method:

```php
new Collection([1, 2, 3, 4, 5])->implode('-');

// '1-2-3-4-5'
```

<a name="method-intersect"></a>
#### `intersect()` {.collection-method}

The `intersect` method removes any values that are not present in the given `array` or collection:

```php
$collection = new Collection(['Desk', 'Sofa', 'Chair']);

$intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);

$intersect->all();

// [0 => 'Desk', 2 => 'Chair']
```

As you can see, the resulting collection will preserve the original collection's keys.

<a name="method-intersectbykeys"></a>
#### `intersectByKeys()` {#collection-method}

The `intersectByKeys` method removes any keys from the original collection that are not present in the given `array` or collection:

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
#### `isEmpty()` {.collection-method}

The `isEmpty` method returns `true` if the collection is empty; otherwise `false` is returned:

```php
new Collection([])->isEmpty();

// true
```

<a name="method-isnotempty"></a>
#### `isNotEmpty()` {#collection-method}

The `isNotEmpty` method returns `true` if the collection is not empty; otherwise, `false` is returned:

```php
new Collection([])->isNotEmpty();

// false
```

<a name="method-join"></a>
#### `join()` {#collection-method}

The `join` method joins the collection's values with a string:

```php
new Collection(['a', 'b', 'c'])->join(', '); // 'a, b, c'
new Collection(['a', 'b', 'c'])->join(', ', ', and '); // 'a, b, and c'
new Collection(['a', 'b'])->join(', ', ' and '); // 'a and b'
new Collection(['a'])->join(', ', ' and '); // 'a'
new Collection([])->join(', ', ' and '); // ''
```

<a name="method-keyby"></a>
#### `keyBy()` {.collection-method}

Keys the collection by the given key:

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

If multiple items have the same key, only the last one will appear in the new collection.

You may also pass your own callback, which should return the value to key the collection by:

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
#### `keys()` {.collection-method}

The `keys` method returns all of the collection's keys:

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
#### `last()` {.collection-method}

The `last` method returns the last element in the collection that passes a given truth test:

```php
new Collection([1, 2, 3, 4])->last(function ($key, $value) {
    return $value < 3;
});

// 2
```

You may also call the `last` method with no arguments to get the last element in the collection. If the collection is empty then `null` is returned.

```php
new Collection([1, 2, 3, 4])->last();

// 4
```

<a name="method-map"></a>
#### `map()` {.collection-method}

The `map` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});

$multiplied->all();

// [2, 4, 6, 8, 10]
```

> **Note**: Like most other collection methods, `map` returns a new collection instance; it does not modify the collection it is called on. If you want to transform the original collection, use the [`transform`](#method-transform) method.

<a name="method-mapinto"></a>
#### `mapInto()` {#collection-method}

The `mapInto()` method iterates over the collection, creating a new instance of the given class by passing the value into the constructor:

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
#### `mapSpread()` {#collection-method}

The `mapSpread` method iterates over the collection's items, passing each nested item value into the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:

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
#### `mapToGroups()` {#collection-method}

The `mapToGroups` method groups the collection's items by the given callback. The callback should return an associative array containing a single key / value pair, thus forming a new collection of grouped values:

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
#### `mapWithKeys()` {#collection-method}

The `mapWithKeys` method iterates through the collection and passes each value to the given callback. The callback should return an associative array containing a single key / value pair:

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
#### `max()` {#collection-method}

The `max` method returns the maximum value of a given key:

```php
$max = new Collection([['foo' => 10], ['foo' => 20]])->max('foo');

// 20

$max = new Collection([1, 2, 3, 4, 5])->max();

// 5
```

<a name="method-median"></a>
#### `median()` {#collection-method}

The `median` method returns the [median value](https://en.wikipedia.org/wiki/Median) of a given key:

```php
$median = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->median('foo');

// 15

$median = new Collection([1, 1, 2, 4])->median();

// 1.5
```

<a name="method-merge"></a>
#### `merge()` {#collection-method}

The `merge` method merges the given array or collection with the original collection. If a string key in the given items matches a string key in the original collection, the given items's value will overwrite the value in the original collection:

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->merge(['price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => 1, 'price' => 200, 'discount' => false]
```

If the given items's keys are numeric, the values will be appended to the end of the collection:

```php
$collection = new Collection(['Desk', 'Chair']);

$merged = $collection->merge(['Bookcase', 'Door']);

$merged->all();

// ['Desk', 'Chair', 'Bookcase', 'Door']
```

<a name="method-mergerecursive"></a>
#### `mergeRecursive()` {#collection-method}

The `mergeRecursive` method merges the given array or collection recursively with the original collection. If a string key in the given items matches a string key in the original collection, then the values for these keys are merged together into an array, and this is done recursively:

```php
$collection = new Collection(['product_id' => 1, 'price' => 100]);

$merged = $collection->mergeRecursive(['product_id' => 2, 'price' => 200, 'discount' => false]);

$merged->all();

// ['product_id' => [1, 2], 'price' => [100, 200], 'discount' => false]
```

<a name="method-min"></a>
#### `min()` {#collection-method}

The `min` method returns the minimum value of a given key:

```php
$min = new Collection([['foo' => 10], ['foo' => 20]])->min('foo');

// 10

$min = new Collection([1, 2, 3, 4, 5])->min();

// 1
```

<a name="method-mode"></a>
#### `mode()` {#collection-method}

The `mode` method returns the [mode value](https://en.wikipedia.org/wiki/Mode_(statistics)) of a given key:

```php
$mode = new Collection([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->mode('foo');

// [10]

$mode = new Collection([1, 1, 2, 4])->mode();

// [1]
```

<a name="method-nth"></a>
#### `nth()` {#collection-method}

The `nth` method creates a new collection consisting of every n-th element:

```php
$collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

$collection->nth(4);

// ['a', 'e']
```

You may optionally pass an offset as the second argument:

```php
$collection->nth(4, 1);

// ['b', 'f']
```

<a name="method-only"></a>
#### `only()` {#collection-method}

The `only` method returns the items in the collection with the specified keys:

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]);

$filtered = $collection->only(['product_id', 'name']);

$filtered->all();

// ['product_id' => 1, 'name' => 'Desk']
```

For the inverse of `only`, see the [except](#method-except) method.

<a name="method-pad"></a>
#### `pad()` {#collection-method}

The `pad` method will fill the array with the given value until the array reaches the specified size. This method behaves like the [array_pad](https://secure.php.net/manual/en/function.array-pad.php) PHP function.

To pad to the left, you should specify a negative size. No padding will take place if the absolute value of the given size is less than or equal to the length of the array:

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
#### `partition()` {#collection-method}

The `partition` method may be combined with the `list` PHP function to separate elements that pass a given truth test from those that do not:

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
#### `pipe()` {#collection-method}

The `pipe` method passes the collection to the given callback and returns the result:

```php
$collection = new Collection([1, 2, 3]);

$piped = $collection->pipe(function ($collection) {
    return $collection->sum();
});

// 6
```

<a name="method-pluck"></a>
#### `pluck()` {.collection-method}

The `pluck` method retrieves all of the collection values for a given key:

```php
$collection = new Collection([
    ['product_id' => 'prod-100', 'name' => 'Chair'],
    ['product_id' => 'prod-200', 'name' => 'Desk'],
]);

$plucked = $collection->pluck('name');

$plucked->all();

// ['Chair', 'Desk']
```

You may also specify how you wish the resulting collection to be keyed:

```php
$plucked = $collection->pluck('name', 'product_id');

$plucked->all();

// ['prod-100' => 'Desk', 'prod-200' => 'Chair']
```

<a name="method-pop"></a>
#### `pop()` {.collection-method}

The `pop` method removes and returns the last item from the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->pop();

// 5

$collection->all();

// [1, 2, 3, 4]
```

<a name="method-prepend"></a>
#### `prepend()` {.collection-method}

The `prepend` method adds an item to the beginning of the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->prepend(0);

$collection->all();

// [0, 1, 2, 3, 4, 5]
```

<a name="method-pull"></a>
#### `pull()` {.collection-method}

The `pull` method removes and returns an item from the collection by its key:

```php
$collection = new Collection(['product_id' => 'prod-100', 'name' => 'Desk']);

$collection->pull('name');

// 'Desk'

$collection->all();

// ['product_id' => 'prod-100']
```

<a name="method-push"></a>
#### `push()` {.collection-method}

The `push` method appends an item to the end of the collection:

```php
$collection = new Collection([1, 2, 3, 4]);

$collection->push(5);

$collection->all();

// [1, 2, 3, 4, 5]
```

<a name="method-put"></a>
#### `put()` {.collection-method}

The `put` method sets the given key and value in the collection:

```php
$collection = new Collection(['product_id' => 1, 'name' => 'Desk']);

$collection->put('price', 100);

$collection->all();

// ['product_id' => 1, 'name' => 'Desk', 'price' => 100]
```

<a name="method-random"></a>
#### `random()` {.collection-method}

The `random` method returns a random item from the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->random();

// 4 - (retrieved randomly)
```

You may optionally pass an integer to `random`. If that integer is more than `1`, a collection of items is returned:

```php
$random = $collection->random(3);

$random->all();

// [2, 4, 5] - (retrieved randomly)
```

<a name="method-reduce"></a>
#### `reduce()` {.collection-method}

The `reduce` method reduces the collection to a single value, passing the result of each iteration into the subsequent iteration:

```php
$collection = new Collection([1, 2, 3]);

$total = $collection->reduce(function ($carry, $item) {
    return $carry + $item;
});

// 6
```

The value for `$carry` on the first iteration is `null`; however, you may specify its initial value by passing a second argument to `reduce`:

```php
$collection->reduce(function ($carry, $item) {
    return $carry + $item;
}, 4);

// 10
```

<a name="method-reject"></a>
#### `reject()` {.collection-method}

The `reject` method filters the collection using the given callback. The callback should return `true` for any items it wishes to remove from the resulting collection:

```php
$collection = new Collection([1, 2, 3, 4]);

$filtered = $collection->reject(function ($item) {
    return $item > 2;
});

$filtered->all();

// [1, 2]
```

For the inverse of the `reject` method, see the [`filter`](#method-filter) method.

<a name="method-replace"></a>
#### `replace()` {#collection-method}

The `replace` method behaves similarly to `merge`; however, in addition to overwriting matching items with string keys, the `replace` method will also overwrite items in the collection that have matching numeric keys:

```php
$collection = new Collection(['James', 'Scott', 'Dan']);

$replaced = $collection->replace([1 => 'Victoria', 3 => 'Finn']);

$replaced->all();

// ['James', 'Victoria', 'Dan', 'Finn']
```

<a name="method-replacerecursive"></a>
#### `replaceRecursive()` {#collection-method}

This method works like `replace`, but it will recur into arrays and apply the same replacement process to the inner values:

```php
$collection = new Collection(['George', 'Scott', ['James', 'Victoria', 'Finn']]);

$replaced = $collection->replaceRecursive(['Charlie', 2 => [1 => 'King']]);

$replaced->all();

// ['Charlie', 'Scott', ['James', 'King', 'Finn']]
```

<a name="method-reverse"></a>
#### `reverse()` {.collection-method}

The `reverse` method reverses the order of the collection's items:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$reversed = $collection->reverse();

$reversed->all();

// [5, 4, 3, 2, 1]
```

<a name="method-search"></a>
#### `search()` {.collection-method}

The `search` method searches the collection for the given value and returns its key if found. If the item is not found, `false` is returned.

```php
$collection = new Collection([2, 4, 6, 8]);

$collection->search(4);

// 1
```

The search is done using a "loose" comparison. To use strict comparison, pass `true` as the second argument to the method:

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
#### `shift()` {.collection-method}

The `shift` method removes and returns the first item from the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->shift();

// 1

$collection->all();

// [2, 3, 4, 5]
```

<a name="method-shuffle"></a>
#### `shuffle()` {.collection-method}

The `shuffle` method randomly shuffles the items in the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$shuffled = $collection->shuffle();

$shuffled->all();

// [3, 2, 5, 1, 4] (generated randomly)
```

<a name="method-skip"></a>
#### `skip()` {#collection-method}

The `skip` method returns a new collection, without the first given amount of items:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$collection = $collection->skip(4);

$collection->all();

// [5, 6, 7, 8, 9, 10]
```

<a name="method-slice"></a>
#### `slice()` {#collection-method}

The `slice` method returns a slice of the collection starting at the given index:

```php
$collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$slice = $collection->slice(4);

$slice->all();

// [5, 6, 7, 8, 9, 10]
```

If you would like to limit the size of the returned slice, pass the desired size as the second argument to the method:

```php
$slice = $collection->slice(4, 2);

$slice->all();

// [5, 6]
```

The returned slice will preserve keys by default. If you do not wish to preserve the original keys, you can use the [`values`](#method-values) method to reindex them.

<a name="method-some"></a>
#### `some()` {#collection-method}

Alias for the [`contains`](#method-contains) method.

<a name="method-sort"></a>
#### `sort()` {.collection-method}

The `sort` method sorts the collection:

```php
$collection = new Collection([5, 3, 1, 2, 4]);

$sorted = $collection->sort();

$sorted->values()->all();

// [1, 2, 3, 4, 5]
```

The sorted collection keeps the original array keys. In this example we used the [`values`](#method-values) method to reset the keys to consecutively numbered indexes.

For sorting a collection of nested arrays or objects, see the [`sortBy`](#method-sortby) and [`sortByDesc`](#method-sortbydesc) methods.

If your sorting needs are more advanced, you may pass a callback to `sort` with your own algorithm. Refer to the PHP documentation on [`usort`](http://php.net/manual/en/function.usort.php#refsect1-function.usort-parameters), which is what the collection's `sort` method calls under the hood.

<a name="method-sortby"></a>
#### `sortBy()` {.collection-method}

The `sortBy` method sorts the collection by the given key:

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

The sorted collection keeps the original array keys. In this example we used the [`values`](#method-values) method to reset the keys to consecutively numbered indexes.

You can also pass your own callback to determine how to sort the collection values:

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
#### `sortByDesc()` {.collection-method}

This method has the same signature as the [`sortBy`](#method-sortby) method, but will sort the collection in the opposite order.

<a name="method-sortkeys"></a>
#### `sortKeys()` {#collection-method}

The `sortKeys` method sorts the collection by the keys of the underlying associative array:

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
#### `sortKeysDesc()` {#collection-method}

This method has the same signature as the [`sortKeys`](#method-sortkeys) method, but will sort the collection in the opposite order.

<a name="method-splice"></a>
#### `splice()` {#collection-method}

The `splice` method removes and returns a slice of items starting at the specified index:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2);

$chunk->all();

// [3, 4, 5]

$collection->all();

// [1, 2]
```

You may pass a second argument to limit the size of the resulting chunk:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 4, 5]
```

In addition, you can pass a third argument containing the new items to replace the items removed from the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1, [10, 11]);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 10, 11, 4, 5]
```

<a name="method-splice"></a>
#### `splice()` {.collection-method}

The `splice` method removes and returns a slice of items starting at the specified index:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2);

$chunk->all();

// [3, 4, 5]

$collection->all();

// [1, 2]
```

You may pass a second argument to limit the size of the resulting chunk:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 4, 5]
```

In addition, you can pass a third argument containing the new items to replace the items removed from the collection:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$chunk = $collection->splice(2, 1, [10, 11]);

$chunk->all();

// [3]

$collection->all();

// [1, 2, 10, 11, 4, 5]
```

<a name="method-split"></a>
#### `split()` {#collection-method}

The `split` method breaks a collection into the given number of groups:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$groups = $collection->split(3);

$groups->toArray();

// [[1, 2], [3, 4], [5]]
```

<a name="method-sum"></a>
#### `sum()` {.collection-method}

The `sum` method returns the sum of all items in the collection:

```php
new Collection([1, 2, 3, 4, 5])->sum();

// 15
```

If the collection contains nested arrays or objects, you should pass a key to use for determining which values to sum:

```php
$collection = new Collection([
    ['name' => 'JavaScript: The Good Parts', 'pages' => 176],
    ['name' => 'JavaScript: The Definitive Guide', 'pages' => 1096],
]);

$collection->sum('pages');

// 1272
```

In addition, you may pass your own callback to determine which values of the collection to sum:

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
#### `take()` {.collection-method}

The `take` method returns a new collection with the specified number of items:

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

// [0, 1, 2]
```

You may also pass a negative integer to take the specified amount of items from the end of the collection:

```php
$collection = new Collection([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(-2);

$chunk->all();

// [4, 5]
```

<a name="method-tap"></a>
#### `tap()` {#collection-method}

The `tap` method passes the collection to the given callback, allowing you to "tap" into the collection at a specific point and do something with the items while not affecting the collection itself:

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
#### `times()` {#collection-method}

The static `times` method creates a new collection by invoking the callback a given amount of times:

```php
$collection = Collection::times(10, function ($number) {
    return $number * 9;
});

$collection->all();

// [9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
```

This method can be useful when combined with factories to create [Eloquent](/docs/{{version}}/eloquent) models:

```php
$categories = Collection::times(3, function ($number) {
    return factory(Category::class)->create(['name' => "Category No. $number"]);
});

$categories->all();

/*
    [
        ['id' => 1, 'name' => 'Category No. 1'],
        ['id' => 2, 'name' => 'Category No. 2'],
        ['id' => 3, 'name' => 'Category No. 3'],
    ]
*/
```

<a name="method-toarray"></a>
#### `toArray()` {.collection-method}

The `toArray` method converts the collection into a plain PHP `array`. If the collection's values are [database models](../database/model), the models will also be converted to arrays:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toArray();

/*
    [
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```

> **Note**: `toArray` also converts all of its nested objects to an array. If you want to get the underlying array as is, use the [`all`](#method-all) method instead.

<a name="method-tojson"></a>
#### `toJson()` {.collection-method}

The `toJson` method converts the collection into JSON:

```php
$collection = new Collection(['name' => 'Desk', 'price' => 200]);

$collection->toJson();

// '{"name":"Desk","price":200}'
```

<a name="method-transform"></a>
#### `transform()` {.collection-method}

The `transform` method iterates over the collection and calls the given callback with each item in the collection. The items in the collection will be replaced by the values returned by the callback:

```php
$collection = new Collection([1, 2, 3, 4, 5]);

$collection->transform(function ($item, $key) {
    return $item * 2;
});

$collection->all();

// [2, 4, 6, 8, 10]
```

> **Note**: Unlike most other collection methods, `transform` modifies the collection itself. If you wish to create a new collection instead, use the [`map`](#method-map) method.

<a name="method-union"></a>
#### `union()` {#collection-method}

The `union` method adds the given array to the collection. If the given array contains keys that are already in the original collection, the original collection's values will be preferred:

```php
$collection = new Collection([1 => ['a'], 2 => ['b']]);

$union = $collection->union([3 => ['c'], 1 => ['b']]);

$union->all();

// [1 => ['a'], 2 => ['b'], 3 => ['c']]
```

<a name="method-unique"></a>
#### `unique()` {#collection-method}

The `unique` method returns all of the unique items in the collection. The returned collection keeps the original array keys, so in this example we'll use the [`values`](#method-values) method to reset the keys to consecutively numbered indexes:

```php
$collection = new Collection([1, 1, 2, 2, 3, 4, 2]);

$unique = $collection->unique();

$unique->values()->all();

// [1, 2, 3, 4]
```

When dealing with nested arrays or objects, you may specify the key used to determine uniqueness:

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

You may also pass your own callback to determine item uniqueness:

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

The `unique` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`uniqueStrict`](#method-uniquestrict) method to filter using "strict" comparisons.

<a name="method-uniquestrict"></a>
#### `uniqueStrict()` {#collection-method}

This method has the same signature as the [`unique`](#method-unique) method; however, all values are compared using "strict" comparisons.

<a name="method-unless"></a>
#### `unless()` {#collection-method}

The `unless` method will execute the given callback unless the first argument given to the method evaluates to `true`:

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

For the inverse of `unless`, see the [`when`](#method-when) method.

<a name="method-unlessempty"></a>
#### `unlessEmpty()` {#collection-method}

Alias for the [`whenNotEmpty`](#method-whennotempty) method.

<a name="method-unlessnotempty"></a>
#### `unlessNotEmpty()` {#collection-method}

Alias for the [`whenEmpty`](#method-whenempty) method.

<a name="method-unwrap"></a>
#### `unwrap()` {#collection-method}

The static `unwrap` method returns the collection's underlying items from the given value when applicable:

```php
Collection::unwrap(new Collection('John Doe'));

// ['John Doe']

Collection::unwrap(['John Doe']);

// ['John Doe']

Collection::unwrap('John Doe');

// 'John Doe'
```

<a name="method-values"></a>
#### `values()` {.collection-method}

The `values` method returns a new collection with the keys reset to consecutive integers:

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
#### `when()` {#collection-method}

The `when` method will execute the given callback when the first argument given to the method evaluates to `true`:

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

For the inverse of `when`, see the [`unless`](#method-unless) method.

<a name="method-whenempty"></a>
#### `whenEmpty()` {#collection-method}

The `whenEmpty` method will execute the given callback when the collection is empty:

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

For the inverse of `whenEmpty`, see the [`whenNotEmpty`](#method-whennotempty) method.

<a name="method-whennotempty"></a>
#### `whenNotEmpty()` {#collection-method}

The `whenNotEmpty` method will execute the given callback when the collection is not empty:

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

For the inverse of `whenNotEmpty`, see the [`whenEmpty`](#method-whenempty) method.

<a name="method-where"></a>
#### `where()` {#collection-method}

The `where` method filters the collection by a given key / value pair:

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

The `where` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereStrict`](#method-wherestrict) method to filter using "strict" comparisons.

Optionally, you may pass a comparison operator as the second parameter.

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
#### `whereStrict()` {#collection-method}

This method has the same signature as the [`where`](#method-where) method; however, all values are compared using "strict" comparisons.

<a name="method-wherebetween"></a>
#### `whereBetween()` {#collection-method}

The `whereBetween` method filters the collection within a given range:

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
#### `whereIn()` {#collection-method}

The `whereIn` method filters the collection by a given key / value contained within the given array:

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

The `whereIn` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereInStrict`](#method-whereinstrict) method to filter using "strict" comparisons.

<a name="method-whereinstrict"></a>
#### `whereInStrict()` {#collection-method}

This method has the same signature as the [`whereIn`](#method-wherein) method; however, all values are compared using "strict" comparisons.

<a name="method-whereinstanceof"></a>
#### `whereInstanceOf()` {#collection-method}

The `whereInstanceOf` method filters the collection by a given class type:

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
#### `whereNotBetween()` {#collection-method}

The `whereNotBetween` method filters the collection within a given range:

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
#### `whereNotIn()` {#collection-method}

The `whereNotIn` method filters the collection by a given key / value not contained within the given array:

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

The `whereNotIn` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereNotInStrict`](#method-wherenotinstrict) method to filter using "strict" comparisons.

<a name="method-wherenotinstrict"></a>
#### `whereNotInStrict()` {#collection-method}

This method has the same signature as the [`whereNotIn`](#method-wherenotin) method; however, all values are compared using "strict" comparisons.

<a name="method-wherenotnull"></a>
#### `whereNotNull()` {#collection-method}

The `whereNotNull` method filters items where the given key is not null:

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
#### `whereNull()` {#collection-method}

The `whereNull` method filters items where the given key is null:

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
#### `wrap()` {#collection-method}

The static `wrap` method wraps the given value in a collection when applicable:

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
#### `zip()` {#collection-method}

The `zip` method merges together the values of the given array with the values of the original collection at the corresponding index:

```php
$collection = new Collection(['Chair', 'Desk']);

$zipped = $collection->zip([100, 200]);

$zipped->all();

// [['Chair', 100], ['Desk', 200]]
```
