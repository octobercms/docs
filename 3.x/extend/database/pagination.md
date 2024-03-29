# Pagination

## Basic usage

There are a few ways to paginate records, the most common is to call the `paginate` method on a query or model. This will return a special paginated collection that adds extra methods for displaying the results.

### Paginating Query Builder Results

There are several ways to paginate items. The simplest is by using the `paginate` method on the [query builder](./query.md) or a [model query](./model.md). The `paginate` method automatically takes care of setting the proper limit and offset based on the current page being viewed by the user. By default, the current page is detected by the value of the `?page` query string argument on the HTTP request. Of course, this value is automatically detected and automatically inserted into links generated by the paginator.

First, let's take a look at calling the `paginate` method on a query. In this example, the only argument passed to `paginate` is the number of items you would like displayed "per page". In this case, let's specify that we would like to display `15` items per page.

```php
$users = Db::table('users')->paginate(15);
```

::: warning
Currently, pagination operations that use a `groupBy` statement cannot be executed efficiently. If you need to use a `groupBy` with a paginated result set, it is recommended that you query the database and create a paginator manually.
:::

#### Simple Pagination

If you only need to display simple "Next" and "Previous" links in your pagination view, you have the option of using the `simplePaginate` method to perform a more efficient query. This is very useful for large datasets if you do not need to display a link for each page number when rendering your view.

```php
$users = Db::table('users')->simplePaginate(15);
```

#### Specify a Page Number

By default the paginator will take the current page number from the `?page` query string. You can specify a page number with the `paginateAtPage` and `simplePaginateAtPage` methods. The number of pages are supplied (first argument) along with the current page number (second argument).

```php
$recordsPerPage = 15;
$currentPage = 1;

$users = Db::table('users')->paginateAtPage($recordsPerPage, $currentPage);

$users = Db::table('users')->simplePaginateAtPage($recordsPerPage, $currentPage);
```

#### Specify a Custom Query Name

The `paginateCustom` and `simplePaginateCustom` methods are used for a custom query string name. The following will use the `?secondPage` query string to determine the page number.

```php
$recordsPerPage = 15;

$users = Db::table('users')->paginateCustom($recordsPerPage, 'secondPage');

$users = Db::table('users')->simplePaginateCustom($recordsPerPage, 'secondPage');
```

### Paginating Model Results

You may also paginate [database model](./model.md) queries. In this example, we will paginate the `User` model with `15` items per page. As you can see, the syntax is nearly identical to paginating query builder results:

```php
$users = User::paginate(15);
```

Of course, you may call `paginate` after setting other constraints on the query, such as `where` clauses:

```php
$users = User::where('votes', '>', 100)->paginate(15);
```

You may also use the `simplePaginate` method when paginating models:

```php
$users = User::where('votes', '>', 100)->simplePaginate(15);
```

You may specify the page number manually by passing a second argument, here we paginate `15` items per page, specifying that we are on page `2`:

```php
$users = User::where('votes', '>', 100)->paginate(15, 2);
```

### Manually Creating a Paginator

Sometimes you may wish to create a pagination instance manually, passing it an array of items. You may do so by creating either an `Illuminate\Pagination\Paginator` or `Illuminate\Pagination\LengthAwarePaginator` instance, depending on your needs.

The `Paginator` class does not need to know the total number of items in the result set, because of this the class does not have methods for retrieving the index of the last page. The `LengthAwarePaginator` accepts almost the same arguments as the `Paginator`, however it does require a count of the total number of items in the result set.

In other words, the `Paginator` corresponds to the `simplePaginate` method on the query builder and models, while the `LengthAwarePaginator` corresponds to the `paginate` method.

When manually creating a paginator instance, you should manually "slice" the array of results you pass to the paginator. If you're unsure how to do this, check out the [array_slice](http://php.net/manual/en/function.array-slice.php) PHP function.

## Displaying Results in a View

When you call the `paginate` or `simplePaginate` methods on a query builder or model query, you will receive a paginator instance. When calling the `paginate` method, you will receive an instance of `Illuminate\Pagination\LengthAwarePaginator`. When calling the `simplePaginate` method, you will receive an instance of `Illuminate\Pagination\Paginator`. These objects provide several methods that describe the result set. In addition to these helpers methods, the paginator instances are iterators and may be looped as an array.

So once you have retrieved the results, you may display the results and render the page links using PHP or [the Twig Pager function](../../markup/function/pager.md).

```php
<div class="container">
    <?php foreach ($users as $user): ?>
        <?= $user->name ?>
    <?php endforeach ?>
</div>

<?= $users->links() ?>
```

The `render` method will render the links to the rest of the pages in the result set. Each of these links will already contain the proper `?page` query string variable. The HTML generated by the `render` method is compatible with the [Bootstrap CSS framework](https://getbootstrap.com).

::: tip
When calling the `render` method from a Twig template, be sure to use the `|raw` filter so the HTML links are not escaped.
:::

#### Customizing the Paginator URI

The `setPath` method allows you to customize the URI used by the paginator when generating links. For example, if you want the paginator to generate links like `http://example.tld/custom/url?page=N`, you should pass `custom/url` to the `setPath` method:

```php
$users = User::paginate(15);
$users->setPath('custom/url');
echo $users->render();
```

#### Appending to Pagination Links

You may add to the query string of pagination links using the `appends` method. For example, to append `&sort=votes` to each pagination link, you should make the following call to `appends`.

```php
echo $users->appends(['sort' => 'votes'])->render();
```

If you wish to append a "hash fragment" to the paginator's URLs, you may use the `fragment` method. For example, to append `#foo` to the end of each pagination link, make the following call to the `fragment` method.

```php
echo $users->fragment('foo')->render();
```

#### Additional Helper Methods

You may also access additional pagination information via the following methods on paginator instances:

```php
$results->count()
$results->currentPage()
$results->hasMorePages()
$results->lastPage() // Not available when using simplePaginate
$results->nextPageUrl()
$results->perPage()
$results->previousPageUrl()
$results->total() // Not available when using simplePaginate
$results->url($page)
```

## Converting results to JSON

The paginator result classes implement the `Illuminate\Contracts\Support\JsonableInterface` contract and expose the `toJson` method, so it's very easy to convert your pagination results to JSON. You may also convert a paginator instance to JSON by simply returning it from a route or AJAX handler:

```php
Route::get('users', function () {
    return User::paginate();
});
```

The JSON from the paginator will include meta information such as `total`, `current_page`, `last_page`, and more. The actual result objects will be available via the `data` key in the JSON array. Here is an example of the JSON created by returning a paginator instance from a route:

#### Example Paginator JSON

```json
{
    "total": 50,
    "per_page": 15,
    "current_page": 1,
    "last_page": 4,
    "next_page_url": "http://octobercms.app?page=2",
    "prev_page_url": null,
    "from": 1,
    "to": 15,
    "data":[
        {
            // Result Object
        },
        {
            // Result Object
        }
    ]
}
```

#### See Also

::: also
* [CMS Pagination](../../cms/features/pagination.md)
* [Pager Twig function](../../markup/function/pager.md)
:::
