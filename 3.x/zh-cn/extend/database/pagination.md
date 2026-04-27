# 分页

## 基本用法

有几种分页记录的方式，最常见的是在查询或模型上调用 `paginate` 方法。这将返回一个特殊的分页集合，添加了用于显示结果的额外方法。

### 分页查询构建器结果

有几种分页项目的方式。最简单的是在[查询构建器](./query.md)或[模型查询](./model.md)上使用 `paginate` 方法。`paginate` 方法会根据用户当前查看的页面自动设置正确的限制和偏移量。默认情况下，当前页面通过 HTTP 请求中 `?page` 查询字符串参数的值来检测。当然，此值会被自动检测，并自动插入到分页器生成的链接中。

首先，让我们看看在查询上调用 `paginate` 方法。在此示例中，传递给 `paginate` 的唯一参数是您希望"每页"显示的项目数。在本例中，让我们指定每页显示 `15` 个项目。

```php
$users = Db::table('users')->paginate(15);
```

::: warning
目前，使用 `groupBy` 语句的分页操作无法有效执行。如果您需要将 `groupBy` 与分页结果集一起使用，建议您查询数据库并手动创建分页器。
:::

#### 简单分页

如果您只需要在分页视图中显示简单的"下一页"和"上一页"链接，您可以选择使用 `simplePaginate` 方法来执行更高效的查询。当渲染视图时不需要显示每个页码的链接时，这对于大型数据集非常有用。

```php
$users = Db::table('users')->simplePaginate(15);
```

#### 指定页码

默认情况下，分页器将从 `?page` 查询字符串获取当前页码。您可以使用 `paginateAtPage` 和 `simplePaginateAtPage` 方法指定页码。页数（第一个参数）和当前页码（第二个参数）一起提供。

```php
$recordsPerPage = 15;
$currentPage = 1;

$users = Db::table('users')->paginateAtPage($recordsPerPage, $currentPage);

$users = Db::table('users')->simplePaginateAtPage($recordsPerPage, $currentPage);
```

#### 指定自定义查询名称

`paginateCustom` 和 `simplePaginateCustom` 方法用于自定义查询字符串名称。以下将使用 `?secondPage` 查询字符串来确定页码。

```php
$recordsPerPage = 15;

$users = Db::table('users')->paginateCustom($recordsPerPage, 'secondPage');

$users = Db::table('users')->simplePaginateCustom($recordsPerPage, 'secondPage');
```

### 分页模型结果

您也可以分页[数据库模型](./model.md)查询。在此示例中，我们将以每页 `15` 个项目分页 `User` 模型。如您所见，语法与分页查询构建器结果几乎相同：

```php
$users = User::paginate(15);
```

当然，您可以在对查询设置其他约束（如 `where` 子句）后调用 `paginate`：

```php
$users = User::where('votes', '>', 100)->paginate(15);
```

分页模型时也可以使用 `simplePaginate` 方法：

```php
$users = User::where('votes', '>', 100)->simplePaginate(15);
```

您可以通过传递第二个参数手动指定页码，这里我们每页分页 `15` 个项目，指定我们在第 `2` 页：

```php
$users = User::where('votes', '>', 100)->paginate(15, 2);
```

### 手动创建分页器

有时您可能希望手动创建分页实例，向其传递项目数组。您可以根据需要创建 `Illuminate\Pagination\Paginator` 或 `Illuminate\Pagination\LengthAwarePaginator` 实例。

`Paginator` 类不需要知道结果集中的项目总数，因此该类没有检索最后一页索引的方法。`LengthAwarePaginator` 接受与 `Paginator` 几乎相同的参数，但它确实需要结果集中项目总数的计数。

换句话说，`Paginator` 对应于查询构建器和模型上的 `simplePaginate` 方法，而 `LengthAwarePaginator` 对应于 `paginate` 方法。

手动创建分页器实例时，您应该手动"切片"传递给分页器的结果数组。如果您不确定如何执行此操作，请查看 [array_slice](http://php.net/manual/en/function.array-slice.php) PHP 函数。

## 在视图中显示结果

当您在查询构建器或模型查询上调用 `paginate` 或 `simplePaginate` 方法时，您将收到一个分页器实例。当调用 `paginate` 方法时，您将收到 `Illuminate\Pagination\LengthAwarePaginator` 的实例。当调用 `simplePaginate` 方法时，您将收到 `Illuminate\Pagination\Paginator` 的实例。这些对象提供了几种描述结果集的方法。除了这些辅助方法外，分页器实例是迭代器，可以像数组一样循环。

因此，一旦检索到结果，您可以使用 PHP 或 [Twig Pager 函数](../../markup/function/pager.md)显示结果并渲染页面链接。

```php
<div class="container">
    <?php foreach ($users as $user): ?>
        <?= $user->name ?>
    <?php endforeach ?>
</div>

<?= $users->links() ?>
```

`render` 方法将渲染到结果集中其余页面的链接。每个链接都已包含正确的 `?page` 查询字符串变量。`render` 方法生成的 HTML 与 [Bootstrap CSS 框架](https://getbootstrap.com)兼容。

::: tip
从 Twig 模板调用 `render` 方法时，请务必使用 `|raw` 过滤器，以便 HTML 链接不会被转义。
:::

#### 自定义分页器 URI

`setPath` 方法允许您自定义分页器在生成链接时使用的 URI。例如，如果您希望分页器生成类似 `http://example.tld/custom/url?page=N` 的链接，您应该将 `custom/url` 传递给 `setPath` 方法：

```php
$users = User::paginate(15);
$users->setPath('custom/url');
echo $users->render();
```

#### 向分页链接追加内容

您可以使用 `appends` 方法向分页链接的查询字符串添加内容。例如，要向每个分页链接追加 `&sort=votes`，您应该对 `appends` 进行以下调用。

```php
echo $users->appends(['sort' => 'votes'])->render();
```

如果您希望向分页器的 URL 追加"哈希片段"，您可以使用 `fragment` 方法。例如，要在每个分页链接末尾追加 `#foo`，请对 `fragment` 方法进行以下调用。

```php
echo $users->fragment('foo')->render();
```

#### 其他辅助方法

您还可以通过分页器实例上的以下方法访问其他分页信息：

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

## 将结果转换为 JSON

分页器结果类实现了 `Illuminate\Contracts\Support\JsonableInterface` 契约并公开了 `toJson` 方法，因此将分页结果转换为 JSON 非常容易。您还可以通过从路由或 AJAX 处理程序返回分页器实例来将其转换为 JSON：

```php
Route::get('users', function () {
    return User::paginate();
});
```

分页器的 JSON 将包含元信息，如 `total`、`current_page`、`last_page` 等。实际的结果对象将通过 JSON 数组中的 `data` 键提供。以下是从路由返回分页器实例创建的 JSON 示例：

#### 分页器 JSON 示例

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

#### 另请参阅

::: also
* [CMS 分页](../../cms/features/pagination.md)
* [Pager Twig 函数](../../markup/function/pager.md)
:::
