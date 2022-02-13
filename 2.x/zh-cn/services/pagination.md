# 分页

## 基本用法

有几种方法可以对记录进行分页，最常见的是在查询或模型上调用 `paginate` 方法。这将返回一个特殊的分页集合，该集合添加了额外的方法来显示结果。

### 分页查询生成器结果

有几种方法可以对项目进行分页。最简单的方法是在 [查询生成器](../database/query.md) 或 [模型查询](../database/model.md) 上使用 `paginate` 方法。 `paginate` 方法会根据用户正在查看的当前页面自动设置适当的限制和偏移量。默认情况下，当前页面由 HTTP 请求上的 `?page` 查询字符串参数的值检测。当然，这个值会被自动检测并自动插入到分页器生成的链接中。

首先，让我们看一下在查询中调用 `paginate` 方法。在此示例中，传递给 `paginate` 的唯一参数是您希望"每页"显示的项目数。在这种情况下，让我们指定我们希望每页显示 15 个项目：

```php
$users = Db::table('users')->paginate(15);
```

> **注意**：目前，使用 `groupBy` 语句的分页操作无法有效执行。 如果您需要使用带有分页结果集的 `groupBy`，建议您查询数据库并手动创建分页器。

#### 简单分页

如果您只需要在分页视图中显示简单的"下一个"和"上一个"链接，您可以选择使用 `simplePaginate` 方法来执行更有效的查询。 如果在渲染视图时不需要为每个页码显示链接，这对于大型数据集非常有用：

```php
$users = Db::table('users')->simplePaginate(15);
```

### 分页模型结果

您还可以对 [数据库模型](../database/model.md) 查询进行分页。 在这个例子中，我们将用每页 15 个项目对 `User` 模型进行分页。 如您所见，语法几乎与分页查询生成器结果相同：

```php
$users = User::paginate(15);
```

当然，你可以在对查询设置其他约束后调用 `paginate`，例如 `where` 子句：

```php
$users = User::where('votes', '>', 100)->paginate(15);
```

你也可以在模型分页时使用 `simplePaginate` 方法：

```php
$users = User::where('votes', '>', 100)->simplePaginate(15);
```

您可以通过传递第二个参数手动指定页码，这里我们为每页分配 15 个项目，指定我们在第 2 页：

```php
$users = User::where('votes', '>', 100)->paginate(15, 2);
```

### 手动创建分页器

有时您可能希望手动创建一个分页实例，并传递一个项目数组。您可以通过创建 `Illuminate\Pagination\Paginator` 或 `Illuminate\Pagination\LengthAwarePaginator` 实例来实现，具体取决于您的需要。

`Paginator` 类不需要知道结果集中的项目总数，因此该类没有检索最后一页索引的方法。 `LengthAwarePaginator` 接受与 `Paginator` 几乎相同的参数，但是它确实需要对结果集中的项目总数进行计数。

换句话说，`Paginator` 对应于查询构建器和模型上的 `simplePaginate` 方法，而 `LengthAwarePaginator` 对应于 `paginate` 方法。

手动创建分页器实例时，您应该手动对传递给分页器的结果数组进行"切片"。如果您不确定如何执行此操作，请查看 [array_slice](http://php.net/manual/en/function.array-slice.php) PHP 函数。

## 在视图中显示结果

当您在查询构建器或模型查询上调用 `paginate` 或 `simplePaginate` 方法时，您将收到一个分页器实例。调用 `paginate` 方法时，您将收到 `Illuminate\Pagination\LengthAwarePaginator` 的实例。当调用 `simplePaginate` 方法时，您将收到 `Illuminate\Pagination\Paginator` 的实例。这些对象提供了几种描述结果集的方法。除了这些辅助方法之外，分页器实例也是迭代器，可以作为数组循环。

因此，一旦您检索到结果，您就可以使用 Twig 显示结果并呈现页面链接：

```twig
<div class="container">
    {% for user in users %}
        {{ user.name }}
    {% endfor %}
</div>

{{ users.render|raw }}
```

`render` 方法将呈现指向结果集中其余页面的链接。这些链接中的每一个都已经包含正确的 `?page` 查询字符串变量。 `render` 方法生成的 HTML 兼容 [Bootstrap CSS 框架](https://getbootstrap.com)。

> **注意**：当从 Twig 模板调用 `render` 方法时，请务必使用 `|raw` 过滤器，以免 HTML 链接被转义。

#### 自定义分页器 URI

`setPath` 方法允许您自定义分页器在生成链接时使用的 URI。例如，如果您希望分页器生成类似 `http://example.com/custom/url?page=N` 的链接，则应将 `custom/url` 传递给 `setPath` 方法：

```php
$users = User::paginate(15);
$users->setPath('custom/url');
```

#### 附加到分页链接

您可以使用 `appends` 方法添加到分页链接的查询字符串中。例如，要将 `&sort=votes` 附加到每个分页链接，您应该对 `appends` 进行以下调用：

```twig
{{ users.appends({sort: 'votes'}).render|raw }}
```

如果您希望将"哈希片段"附加到分页器的 URL，您可以使用 `fragment` 方法。例如，要将 `#foo` 附加到每个分页链接的末尾，请对 `fragment` 方法进行以下调用：

```twig
{{ users.fragment('foo').render|raw }}
```

#### 额外的辅助方法

您还可以通过分页器实例上的以下方法访问其他分页信息：

```php
$results->count()
$results->currentPage()
$results->hasMorePages()
$results->lastPage() // 使用 simplePaginate 时不可用
$results->nextPageUrl()
$results->perPage()
$results->previousPageUrl()
$results->total() // 使用 simplePaginate 时不可用
$results->url($page)
```

## 将结果转换为 JSON

分页器结果类实现了 `Illuminate\Contracts\Support\JsonableInterface` 契约并公开了 `toJson` 方法，因此很容易将分页结果转换为 JSON。 您还可以通过简单地从路由或 AJAX 处理程序返回它来将分页器实例转换为 JSON：

```php
Route::get('users', function () {
    return User::paginate();
});
```

来自分页器的 JSON 将包含元信息，例如`total`, `current_page`, `last_page`等。 实际结果对象将通过 JSON 数组中的 `data` 键获得。 以下是通过从路由返回分页器实例创建的 JSON 示例：

#### 示例分页器 JSON

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
            // 结果对象
        },
        {
            // 结果对象
        }
    ]
}
```
