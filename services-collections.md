# Collections

- [Introduction](#introduction)
- [Creating collections](#creating-collections)
- [Available methods](#available-methods)

<a name="introduction"></a>
## Introduction

The `October\Rain\Support\Collection` class provides a fluent, convenient wrapper for working with arrays of data. For example, check out the following code. We'll create a new collection instance from the array, run the `strtoupper` function on each element, and then remove all empty elements:

    $collection = new October\Rain\Support\Collection(['stewie', 'brian', null]);

    $collection = $collection
        ->map(function ($name) {
            return strtoupper($name);
        })
        ->reject(function ($name) {
            return empty($name);
        })
    ;

The `Collection` class allows you to chain its methods to perform fluent mapping and reducing of the underlying array. In general every `Collection` method returns an entirely new `Collection` instance.

<a name="creating-collections"></a>
## Creating collections

As described above, passing an array to the constructor of the `October\Rain\Support\Collection` class will return a new instance for the given array. So, creating a collection is as simple as:

    $collection = new October\Rain\Support\Collection([1, 2, 3]);

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
[chunk](#method-chunk)
[collapse](#method-collapse)
[contains](#method-contains)
[count](#method-count)
[diff](#method-diff)
[each](#method-each)
[filter](#method-filter)
[first](#method-first)
[flatten](#method-flatten)
[flip](#method-flip)
[forget](#method-forget)
[forPage](#method-forpage)
[get](#method-get)
[groupBy](#method-groupby)
[has](#method-has)
[implode](#method-implode)
[intersect](#method-intersect)
[isEmpty](#method-isempty)
[keyBy](#method-keyby)
[keys](#method-keys)
[last](#method-last)
[map](#method-map)
[merge](#method-merge)
[pluck](#method-pluck)
[pop](#method-pop)
[prepend](#method-prepend)
[pull](#method-pull)
[push](#method-push)
[put](#method-put)
[random](#method-random)
[reduce](#method-reduce)
[reject](#method-reject)
[reverse](#method-reverse)
[search](#method-search)
[shift](#method-shift)
[shuffle](#method-shuffle)
[slice](#method-slice)
[sort](#method-sort)
[sortBy](#method-sortby)
[sortByDesc](#method-sortbydesc)
[splice](#method-splice)
[sum](#method-sum)
[take](#method-take)
[toArray](#method-toarray)
[toJson](#method-tojson)
[transform](#method-transform)
[unique](#method-unique)
[values](#method-values)
[where](#method-where)
[whereLoose](#method-whereloose)
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

    $collection = new Collection([1, 2, 3]);

    $collection->all();

    // [1, 2, 3]

<a name="method-chunk"></a>
#### `chunk()` {.collection-method}

The `chunk` method breaks the collection into multiple, smaller collections of a given size:

    $collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

    $chunks = $collection->chunk(4);

    $chunks->toArray();

    // [[1, 2, 3, 4], [5, 6, 7]]

This method is especially useful in [CMS pages](../cms/pages) when working with a grid system, such as [Bootstrap](http://getbootstrap.com/css/#grid). Imagine you have a collection of models you want to display in a grid:

    {% for chunk in products.chunk(3) %}
        <div class="row">
            {% for product in chunk %}
                <div class="col-xs-4">{{ product.name }}</div>
            {% endfor %}
        </div>
    {% endfor %}

<a name="method-collapse"></a>
#### `collapse()` {.collection-method}

The `collapse` method collapses a collection of arrays into a flat collection:

    $collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    $collapsed = $collection->collapse();

    $collapsed->all();

    // [1, 2, 3, 4, 5, 6, 7, 8, 9]

<a name="method-contains"></a>
#### `contains()` {.collection-method}

The `contains` method determines whether the collection contains a given item:

    $collection = new Collection(['name' => 'Desk', 'price' => 100]);

    $collection->contains('Desk');

    // true

    $collection->contains('New York');

    // false

You may also pass a key / value pair to the `contains` method, which will determine if the given pair exists in the collection:

    $collection = new Collection([
        ['product' => 'Desk', 'price' => 200],
        ['product' => 'Chair', 'price' => 100],
    ]);

    $collection->contains('product', 'Bookcase');

    // false

Finally, you may also pass a callback to the `contains` method to perform your own truth test:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->contains(function ($key, $value) {
        return $value > 5;
    });

    // false

<a name="method-count"></a>
#### `count()` {.collection-method}

The `count` method returns the total number of items in the collection:

    $collection = new Collection([1, 2, 3, 4]);

    $collection->count();

    // 4

<a name="method-diff"></a>
#### `diff()` {.collection-method}

The `diff` method compares the collection against another collection or a plain PHP `array`:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $diff = $collection->diff([2, 4, 6, 8]);

    $diff->all();

    // [1, 3, 5]

<a name="method-each"></a>
#### `each()` {.collection-method}

The `each` method iterates over the items in the collection and passes each item to a given callback:

    $collection = $collection->each(function ($item, $key) {
        //
    });

Return `false` from your callback to break out of the loop:

    $collection = $collection->each(function ($item, $key) {
        if (/* some condition */) {
            return false;
        }
    });

<a name="method-every"></a>
#### `every()` {.collection-method}

The `every` method creates a new collection consisting of every n-th element:

    $collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

    $collection->every(4);

    // ['a', 'e']

You may optionally pass offset as the second argument:

    $collection->every(4, 1);

    // ['b', 'f']

<a name="method-filter"></a>
#### `filter()` {.collection-method}

The `filter` method filters the collection by a given callback, keeping only those items that pass a given truth test:

    $collection = new Collection([1, 2, 3, 4]);

    $filtered = $collection->filter(function ($item) {
        return $item > 2;
    });

    $filtered->all();

    // [3, 4]

For the inverse of `filter`, see the [reject](#method-reject) method.

<a name="method-first"></a>
#### `first()` {.collection-method}

The `first` method returns the first element in the collection that passes a given truth test:

    new Collection([1, 2, 3, 4])->first(function ($value, $key) {
        return $value > 2;
    });

    // 3

You may also call the `first` method with no arguments to get the first element in the collection. If the collection is empty, `null` is returned:

    new Collection([1, 2, 3, 4])->first();

    // 1

<a name="method-flatten"></a>
#### `flatten()` {.collection-method}

The `flatten` method flattens a multi-dimensional collection into a single dimension:

    $collection = new Collection(['name' => 'peter', 'languages' => ['php', 'javascript']]);

    $flattened = $collection->flatten();

    $flattened->all();

    // ['peter', 'php', 'javascript'];

<a name="method-flip"></a>
#### `flip()` {.collection-method}

The `flip` method swaps the collection's keys with their corresponding values:

    $collection = new Collection(['name' => 'peter', 'platform' => 'october']);

    $flipped = $collection->flip();

    $flipped->all();

    // ['peter' => 'name', 'october' => 'platform']

<a name="method-forget"></a>
#### `forget()` {.collection-method}

The `forget` method removes an item from the collection by its key:

    $collection = new Collection(['name' => 'peter', 'platform' => 'october']);

    $collection->forget('name');

    $collection->all();

    // ['platform' => 'october']

> **Note:** Unlike most other collection methods, `forget` does not return a new modified collection; it modifies the collection it is called on.

<a name="method-forpage"></a>
#### `forPage()` {.collection-method}

The `forPage` method returns a new collection containing the items that would be present on a given page number:

    $collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9])->forPage(2, 3);

    $collection->all();

    // [4, 5, 6]

The method requires the page number and the number of items to show per page, respectively.

<a name="method-get"></a>
#### `get()` {.collection-method}

The `get` method returns the item at a given key. If the key does not exist, `null` is returned:

    $collection = new Collection(['name' => 'peter', 'platform' => 'october']);

    $value = $collection->get('name');

    // peter

You may optionally pass a default value as the second argument:

    $collection = new Collection(['name' => 'peter', 'platform' => 'october']);

    $value = $collection->get('foo', 'default-value');

    // default-value

You may even pass a callback as the default value. The result of the callback will be returned if the specified key does not exist:

    $collection->get('email', function () {
        return 'default-value';
    });

    // default-value

<a name="method-groupby"></a>
#### `groupBy()` {.collection-method}

The `groupBy` method groups the collection's items by a given key:

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

In addition to passing a string `key`, you may also pass a callback. The callback should return the value you wish to key the group by:

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

<a name="method-has"></a>
#### `has()` {.collection-method}

The `has` method determines if a given key exists in the collection:

    $collection = new Collection(['account_id' => 1, 'product' => 'Desk']);

    $collection->has('email');

    // false

<a name="method-implode"></a>
#### `implode()` {.collection-method}

The `implode` method joins the items in a collection. Its arguments depend on the type of items in the collection.

If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values:

    $collection = new Collection([
        ['account_id' => 1, 'product' => 'Chair'],
        ['account_id' => 2, 'product' => 'Desk'],
    ]);

    $collection->implode('product', ', ');

    // Chair, Desk

If the collection contains simple strings or numeric values, simply pass the "glue" as the only argument to the method:

    new Collection([1, 2, 3, 4, 5])->implode('-');

    // '1-2-3-4-5'

<a name="method-intersect"></a>
#### `intersect()` {.collection-method}

The `intersect` method removes any values that are not present in the given `array` or collection:

    $collection = new Collection(['Desk', 'Sofa', 'Chair']);

    $intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);

    $intersect->all();

    // [0 => 'Desk', 2 => 'Chair']

As you can see, the resulting collection will preserve the original collection's keys.

<a name="method-isempty"></a>
#### `isEmpty()` {.collection-method}

The `isEmpty` method returns `true` if the collection is empty; otherwise `false` is returned:

    new Collection([])->isEmpty();

    // true

<a name="method-keyby"></a>
#### `keyBy()` {.collection-method}

Keys the collection by the given key:

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

If multiple items have the same key, only the last one will appear in the new collection.

You may also pass your own callback, which should return the value to key the collection by:

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


<a name="method-keys"></a>
#### `keys()` {.collection-method}

The `keys` method returns all of the collection's keys:

    $collection = new Collection([
        'prod-100' => ['product_id' => 'prod-100', 'name' => 'Chair'],
        'prod-200' => ['product_id' => 'prod-200', 'name' => 'Desk'],
    ]);

    $keys = $collection->keys();

    $keys->all();

    // ['prod-100', 'prod-200']

<a name="method-last"></a>
#### `last()` {.collection-method}

The `last` method returns the last element in the collection that passes a given truth test:

    new Collection([1, 2, 3, 4])->last(function ($key, $value) {
        return $value < 3;
    });

    // 2

You may also call the `last` method with no arguments to get the last element in the collection. If the collection is empty then `null` is returned.

    new Collection([1, 2, 3, 4])->last();

    // 4

<a name="method-map"></a>
#### `map()` {.collection-method}

The `map` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $multiplied = $collection->map(function ($item, $key) {
        return $item * 2;
    });

    $multiplied->all();

    // [2, 4, 6, 8, 10]

> **Note:** Like most other collection methods, `map` returns a new collection instance; it does not modify the collection it is called on. If you want to transform the original collection, use the [`transform`](#method-transform) method.

<a name="method-merge"></a>
#### `merge()` {.collection-method}

The `merge` method merges the given array into the collection. Any string key in the array matching a string key in the collection will overwrite the value in the collection:

    $collection = new Collection(['product_id' => 1, 'name' => 'Desk']);

    $merged = $collection->merge(['price' => 100, 'discount' => false]);

    $merged->all();

    // ['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]

If the given array's keys are numeric, the values will be appended to the end of the collection:

    $collection = new Collection(['Bookcase', 'Chair']);

    $merged = $collection->merge(['Desk', 'Door']);

    $merged->all();

    // ['Bookcase', 'Chair', 'Desk', 'Door']

<a name="method-pluck"></a>
#### `pluck()` {.collection-method}

The `pluck` method retrieves all of the collection values for a given key:

    $collection = new Collection([
        ['product_id' => 'prod-100', 'name' => 'Chair'],
        ['product_id' => 'prod-200', 'name' => 'Desk'],
    ]);

    $plucked = $collection->pluck('name');

    $plucked->all();

    // ['Chair', 'Desk']

You may also specify how you wish the resulting collection to be keyed:

    $plucked = $collection->pluck('name', 'product_id');

    $plucked->all();

    // ['prod-100' => 'Desk', 'prod-200' => 'Chair']

<a name="method-pop"></a>
#### `pop()` {.collection-method}

The `pop` method removes and returns the last item from the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->pop();

    // 5

    $collection->all();

    // [1, 2, 3, 4]

<a name="method-prepend"></a>
#### `prepend()` {.collection-method}

The `prepend` method adds an item to the beginning of the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->prepend(0);

    $collection->all();

    // [0, 1, 2, 3, 4, 5]

<a name="method-pull"></a>
#### `pull()` {.collection-method}

The `pull` method removes and returns an item from the collection by its key:

    $collection = new Collection(['product_id' => 'prod-100', 'name' => 'Desk']);

    $collection->pull('name');

    // 'Desk'

    $collection->all();

    // ['product_id' => 'prod-100']

<a name="method-push"></a>
#### `push()` {.collection-method}

The `push` method appends an item to the end of the collection:

    $collection = new Collection([1, 2, 3, 4]);

    $collection->push(5);

    $collection->all();

    // [1, 2, 3, 4, 5]

<a name="method-put"></a>
#### `put()` {.collection-method}

The `put` method sets the given key and value in the collection:

    $collection = new Collection(['product_id' => 1, 'name' => 'Desk']);

    $collection->put('price', 100);

    $collection->all();

    // ['product_id' => 1, 'name' => 'Desk', 'price' => 100]

<a name="method-random"></a>
#### `random()` {.collection-method}

The `random` method returns a random item from the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->random();

    // 4 - (retrieved randomly)

You may optionally pass an integer to `random`. If that integer is more than `1`, a collection of items is returned:

    $random = $collection->random(3);

    $random->all();

    // [2, 4, 5] - (retrieved randomly)

<a name="method-reduce"></a>
#### `reduce()` {.collection-method}

The `reduce` method reduces the collection to a single value, passing the result of each iteration into the subsequent iteration:

    $collection = new Collection([1, 2, 3]);

    $total = $collection->reduce(function ($carry, $item) {
        return $carry + $item;
    });

    // 6

The value for `$carry` on the first iteration is `null`; however, you may specify its initial value by passing a second argument to `reduce`:

    $collection->reduce(function ($carry, $item) {
        return $carry + $item;
    }, 4);

    // 10

<a name="method-reject"></a>
#### `reject()` {.collection-method}

The `reject` method filters the collection using the given callback. The callback should return `true` for any items it wishes to remove from the resulting collection:

    $collection = new Collection([1, 2, 3, 4]);

    $filtered = $collection->reject(function ($item) {
        return $item > 2;
    });

    $filtered->all();

    // [1, 2]

For the inverse of the `reject` method, see the [`filter`](#method-filter) method.

<a name="method-reverse"></a>
#### `reverse()` {.collection-method}

The `reverse` method reverses the order of the collection's items:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $reversed = $collection->reverse();

    $reversed->all();

    // [5, 4, 3, 2, 1]

<a name="method-search"></a>
#### `search()` {.collection-method}

The `search` method searches the collection for the given value and returns its key if found. If the item is not found, `false` is returned.

    $collection = new Collection([2, 4, 6, 8]);

    $collection->search(4);

    // 1

The search is done using a "loose" comparison. To use strict comparison, pass `true` as the second argument to the method:

    $collection->search('4', true);

    // false

Alternatively, you may pass in your own callback to search for the first item that passes your truth test:

    $collection->search(function ($item, $key) {
        return $item > 5;
    });

    // 2

<a name="method-shift"></a>
#### `shift()` {.collection-method}

The `shift` method removes and returns the first item from the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->shift();

    // 1

    $collection->all();

    // [2, 3, 4, 5]

<a name="method-shuffle"></a>
#### `shuffle()` {.collection-method}

The `shuffle` method randomly shuffles the items in the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $shuffled = $collection->shuffle();

    $shuffled->all();

    // [3, 2, 5, 1, 4] (generated randomly)

<a name="method-slice"></a>
#### `slice()` {.collection-method}

The `slice` method returns a slice of the collection starting at the given index:

    $collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    $slice = $collection->slice(4);

    $slice->all();

    // [5, 6, 7, 8, 9, 10]

If you would like to limit the size of the returned slice, pass the desired size as the second argument to the method:

    $slice = $collection->slice(4, 2);

    $slice->all();

    // [5, 6]

The returned slice will have new, numerically indexed keys. If you wish to preserve the original keys, pass `true` as the third argument to the method.

<a name="method-sort"></a>
#### `sort()` {.collection-method}

The `sort` method sorts the collection:

    $collection = new Collection([5, 3, 1, 2, 4]);

    $sorted = $collection->sort();

    $sorted->values()->all();

    // [1, 2, 3, 4, 5]

The sorted collection keeps the original array keys. In this example we used the [`values`](#method-values) method to reset the keys to consecutively numbered indexes.

For sorting a collection of nested arrays or objects, see the [`sortBy`](#method-sortby) and [`sortByDesc`](#method-sortbydesc) methods.

If your sorting needs are more advanced, you may pass a callback to `sort` with your own algorithm. Refer to the PHP documentation on [`usort`](http://php.net/manual/en/function.usort.php#refsect1-function.usort-parameters), which is what the collection's `sort` method calls under the hood.

<a name="method-sortby"></a>
#### `sortBy()` {.collection-method}

The `sortBy` method sorts the collection by the given key:

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

The sorted collection keeps the original array keys. In this example we used the [`values`](#method-values) method to reset the keys to consecutively numbered indexes.

You can also pass your own callback to determine how to sort the collection values:

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

<a name="method-sortbydesc"></a>
#### `sortByDesc()` {.collection-method}

This method has the same signature as the [`sortBy`](#method-sortby) method, but will sort the collection in the opposite order.

<a name="method-splice"></a>
#### `splice()` {.collection-method}

The `splice` method removes and returns a slice of items starting at the specified index:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $chunk = $collection->splice(2);

    $chunk->all();

    // [3, 4, 5]

    $collection->all();

    // [1, 2]

You may pass a second argument to limit the size of the resulting chunk:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $chunk = $collection->splice(2, 1);

    $chunk->all();

    // [3]

    $collection->all();

    // [1, 2, 4, 5]

In addition, you can pass a third argument containing the new items to replace the items removed from the collection:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $chunk = $collection->splice(2, 1, [10, 11]);

    $chunk->all();

    // [3]

    $collection->all();

    // [1, 2, 10, 11, 4, 5]

<a name="method-sum"></a>
#### `sum()` {.collection-method}

The `sum` method returns the sum of all items in the collection:

    new Collection([1, 2, 3, 4, 5])->sum();

    // 15

If the collection contains nested arrays or objects, you should pass a key to use for determining which values to sum:

    $collection = new Collection([
        ['name' => 'JavaScript: The Good Parts', 'pages' => 176],
        ['name' => 'JavaScript: The Definitive Guide', 'pages' => 1096],
    ]);

    $collection->sum('pages');

    // 1272

In addition, you may pass your own callback to determine which values of the collection to sum:

    $collection = new Collection([
        ['name' => 'Chair', 'colors' => ['Black']],
        ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
        ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
    ]);

    $collection->sum(function ($product) {
        return count($product['colors']);
    });

    // 6

<a name="method-take"></a>
#### `take()` {.collection-method}

The `take` method returns a new collection with the specified number of items:

    $collection = new Collection([0, 1, 2, 3, 4, 5]);

    $chunk = $collection->take(3);

    $chunk->all();

    // [0, 1, 2]

You may also pass a negative integer to take the specified amount of items from the end of the collection:

    $collection = new Collection([0, 1, 2, 3, 4, 5]);

    $chunk = $collection->take(-2);

    $chunk->all();

    // [4, 5]

<a name="method-toarray"></a>
#### `toArray()` {.collection-method}

The `toArray` method converts the collection into a plain PHP `array`. If the collection's values are [database models](../database/model), the models will also be converted to arrays:

    $collection = new Collection(['name' => 'Desk', 'price' => 200]);

    $collection->toArray();

    /*
        [
            ['name' => 'Desk', 'price' => 200],
        ]
    */

> **Note:** `toArray` also converts all of its nested objects to an array. If you want to get the underlying array as is, use the [`all`](#method-all) method instead.

<a name="method-tojson"></a>
#### `toJson()` {.collection-method}

The `toJson` method converts the collection into JSON:

    $collection = new Collection(['name' => 'Desk', 'price' => 200]);

    $collection->toJson();

    // '{"name":"Desk","price":200}'

<a name="method-transform"></a>
#### `transform()` {.collection-method}

The `transform` method iterates over the collection and calls the given callback with each item in the collection. The items in the collection will be replaced by the values returned by the callback:

    $collection = new Collection([1, 2, 3, 4, 5]);

    $collection->transform(function ($item, $key) {
        return $item * 2;
    });

    $collection->all();

    // [2, 4, 6, 8, 10]

> **Note:** Unlike most other collection methods, `transform` modifies the collection itself. If you wish to create a new collection instead, use the [`map`](#method-map) method.

<a name="method-unique"></a>
#### `unique()` {.collection-method}

The `unique` method returns all of the unique items in the collection:

    $collection = new Collection([1, 1, 2, 2, 3, 4, 2]);

    $unique = $collection->unique();

    $unique->values()->all();

    // [1, 2, 3, 4]

The returned collection keeps the original array keys. In this example we used the [`values`](#method-values) method to reset the keys to consecutively numbered indexes.

When dealing with nested arrays or objects, you may specify the key used to determine uniqueness:

    $collection = new Collection([
        ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'iPhone 5', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
        ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
        ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
    ]);

    $unique = $collection->unique('brand');

    $unique->values()->all();

    /*
        [
            ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
            ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
        ]
    */

You may also pass your own callback to determine item uniqueness:

    $unique = $collection->unique(function ($item) {
        return $item['brand'].$item['type'];
    });

    $unique->values()->all();

    /*
        [
            ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
            ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
            ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
            ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
        ]
    */

<a name="method-values"></a>
#### `values()` {.collection-method}

The `values` method returns a new collection with the keys reset to consecutive integers:

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
<a name="method-where"></a>
#### `where()` {.collection-method}

The `where` method filters the collection by a given key / value pair:

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

The `where` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereStrict`](#method-wherestrict) method to filter using "strict" comparisons.

<a name="method-wherestrict"></a>
#### `whereStrict()` {.collection-method}

This method has the same signature as the [`where`](#method-where) method; however, all values are compared using "strict" comparisons.

<a name="method-zip"></a>
#### `zip()` {.collection-method}

The `zip` method merges together the values of the given array with the values of the collection at the corresponding index:

    $collection = new Collection(['Chair', 'Desk']);

    $zipped = $collection->zip([100, 200]);

    $zipped->all();

    // [['Chair', 100], ['Desk', 200]]
