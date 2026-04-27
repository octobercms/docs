---
subtitle: 向页面添加模型记录集合。
---
# 集合（Collection）

`collection` 组件在页面上显示条目集合。集合组件可以在任何页面、布局或部件中使用。

## 可用属性

该组件支持以下属性。

属性 | 描述
-------- | -------------
**handle** | [条目蓝图](../tailor/blueprints.md)的句柄。
**recordsPerPage** | 单页显示的记录数。留空则禁用分页。
**pageNumber** | 此值用于确定用户所在的页码。
**sortColumn** | 记录排序所依据的列名。
**sortDirection** | 记录排序的方向。支持的值为 `asc` 和 `desc`。

## 基本用法

以下示例向页面添加了一个 **Blog\Post** 条目的集合。在 Twig 中通过循环默认的 `collection` 变量来访问该集合。

::: cmstemplate
```ini
[collection]
handle = "Blog\Post"
```
```twig
{% for post in collection %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```
:::

当同一页面上使用多个集合时，可以使用组件别名将组件分配名称 **posts**，这就是页面可用的变量名称。以下集合使用 `posts` 变量来访问。

::: cmstemplate
```ini
[collection posts]
handle = "Blog\Post"
```
```twig
{% for post in posts %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```
:::

使用 `is empty` 或 `is not empty` 表达式来检查集合是否至少有一条可显示的记录。

```twig
{% if posts is not empty %}
    {# ... #}
{% endif %}
```

## 执行查询

当使用方法访问组件变量时，它将切换到[数据库模型查询](../../extend/database/query.md)。例如，要仅显示字段 `color` 值为 **blue** 的条目，可以使用 `where` 查询方法。使用 `{% set %}` Twig 标签将结果赋值给新变量。

```twig
{% set bluePosts = posts.where('color', 'blue').get() %}
```

要仅显示具有相关作者的文章，可以使用 `whereRelation` 查询方法。使用 `get()` 方法完成查询。以下示例列出分配给 slug 设置为 **bella-vista** 的 `author` 的文章。

```twig
{% set authorPosts = posts.whereRelation('author', 'slug', 'bella-vista').get() %}
```

### 访问条目类型

要按条目类型筛选记录，使用 `content_group` 属性执行 `where()` 查询。以下示例将列出使用条目类型代码 **featured_post** 的文章。

```twig
{% set featuredPosts = posts.where('content_group', 'featured_post').get() %}
```

### 分页记录

您也可以使用 `paginate()` 方法对集合进行分页。以下示例将文章按每页 **10** 条进行分页并显示分页导航。

```twig
{% set authorPosts = posts.whereRelation(...).paginate(10) %}

{{ pager(authorPosts) }}
```

::: tip
请参阅[分页功能](../features/pagination.md)了解更多关于记录分页的信息。
:::

### 搜索记录

要搜索记录，使用 [`searchWhere()` 方法](../../extend/database/query.md)对列值执行搜索查询。以下示例将使用不区分大小写的查询在提供的搜索词和列中搜索记录。

```twig
{% set foundPages = pages.searchWhere(searchTerm, ['title', 'content']).get() %}
```

您还可以使用 [`searchWhereRelation()` 方法](../../extend/database/relations.md)搜索相关记录，其中关系名称包含在方法中用于查询关系是否存在。

```twig
{% set foundPages = pages.searchWhereRelation(searchTerm, 'author', ['title']).get() %}
```

## 预加载相关记录

在某些情况下，出于性能原因，您可能希望预加载相关记录。在集合上使用 `load` 方法，传入关系名称。在下面的示例中，`categories` 关系将与集合中的每篇文章一起加载。

```twig
{% do authorPosts.load('categories') %}
```

## 统计记录数

假设您想显示博客分类列表并统计每个分类中的文章数量。首先，在分类蓝图上定义[反向关系](../../element/content/field-entries.md)为 **posts**。

```yaml
posts:
    type: entries
    source: Blog\Post
    inverse: categories
    hidden: true
```

然后，在集合组件上调用 `withCount` 函数，接着调用 `get` 返回分类记录集合。这将在每个分类上创建一个名为 **post_count** 的属性。

```twig
{% set categories = collection.withCount('posts').get() %}
{% for category in categories %}
    <h5>{{ category.title }} ({{ category.post_count }} posts)</h5>
{% endfor %}
```

#### 另请参阅

::: also
* [分页](../features/pagination.md)
* [模型查询](../../extend/database/model.md)
* [数据库关系](../../extend/database/relations.md)
:::
