---
subtitle: Adds a collection of Tailor records to a page or layout.
---
# Collection

The `collection` component displays a collection of entries on the page. The collection component can be used on any page, layout or partial.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](./blueprints.md).

## Basic Usage

The following adds a collection of **Blog\Post** entries to the page. The collection is accessed in Twig by looping the default `collection` variable.

```twig
[collection]
handle = "Blog\Post"
==
{% for post in collection %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```

When multiple collections are used on the same page, the component can be assigned a name **posts** using the component alias and this is the variable name that becomes available to the page. The following collection is accessed using the `posts` variable instead.

```twig
[collection posts]
handle = "Blog\Post"
==
{% for post in posts %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```

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

## Eager Loading Related Records

In some cases, and for performance reasons, you may wish to eager load related records. Use the `load` method on the collection, passing the relation name. In the next example, the `categories` relation will be loaded with every post in the collection.

```twig
{% do authorPosts.load('categories') %}
```

#### See Also

::: also
* [Pagination](../features/pagination.md)
:::
