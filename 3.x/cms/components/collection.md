---
subtitle: Adds a collection of model records to the page.
---
# Collection

The `collection` component displays a collection of entries on the page. The collection component can be used on any page, layout or partial.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](./blueprints.md).
**recordsPerPage** | Number of records to display on a single page. Leave empty to disable pagination.
**pageNumber** | This value is used to determine what page the user is on.
**sortColumn** | Column name the records should be ordered by.
**sortDirection** | Direction the records should be ordered by. Supported values are `asc` and `desc`.

## Basic Usage

The following adds a collection of **Blog\Post** entries to the page. The collection is accessed in Twig by looping the default `collection` variable.

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

When multiple collections are used on the same page, the component can be assigned a name **posts** using the component alias and this is the variable name that becomes available to the page. The following collection is accessed using the `posts` variable instead.

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

## Performing Queries

When accessing the component variable using a method it will switch to a [database model query](../../extend/database/query.md). For example, to only show entries that have a field `color` with the value **blue** use the `where` query method. Using the `{% set %}` Twig tag will assign the result to a new variable.

```twig
{% set bluePosts = posts.where('color', 'blue').get() %}
```

To show only posts that have a related author, you can use the `whereRelation` query method. To complete the query, proceed with the `get()` method. The following lists posts that are assigned to the `author` with a slug set to **bella-vista**.

```twig
{% set authorPosts = posts.whereRelation('author', 'slug', 'bella-vista').get() %}
```

### Accessing the Entry Type

To filter records by their entry type, perform a `where()` query using the `content_group` attribute. The following will list posts that use the entry type code **featured_post**.

```twig
{% set featuredPosts = posts.where('content_group', 'featured_post').get() %}
```

### Paginating Records

You could also apply pagination to the collection with the `paginate()` method instead. The following will paginate the posts at **10** per page and displays the paginated navigation.

```twig
{% set authorPosts = posts.whereRelation(...).paginate(10) %}

{{ pager(authorPosts) }}
```

::: tip
See the [Pagination feature](../features/pagination.md) to learn more about paging records.
:::

### Searching Records

To search records, use the [`searchWhere()` method](../../extend/database/query.md) to perform a search query on a column's value. The following will search for records the supplied term and columns using a case insensitive query.

```twig
{% set foundPages = pages.searchWhere(searchTerm, ['title', 'content']).get() %}
```

You may also use the [`searchWhereRelation()` method](../../extend/database/relations.md) to search related records, where the relation name is included in the method for querying the relationship existence.

```twig
{% set foundPages = pages.searchWhereRelation(searchTerm, 'author', ['title']).get() %}
```

## Eager Loading Related Records

In some cases, and for performance reasons, you may wish to eager load related records. Use the `load` method on the collection, passing the relation name. In the next example, the `categories` relation will be loaded with every post in the collection.

```twig
{% do authorPosts.load('categories') %}
```

#### See Also

::: also
* [Pagination](../features/pagination.md)
:::
