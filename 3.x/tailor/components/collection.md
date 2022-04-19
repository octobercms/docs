---
subtitle: Display multiple content entries on the page.
---
# Collection

The `collection` component displays a collection of entries on the page.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).

## Basic Usage

The following adds a collection of **Blog\Post** entries to the page. The collection component can be used on any page, layout or partial.

The component is assigned a name **posts** using the component alias and this is the variable name that becomes available to the page. The collection is looped over in Twig by accessing the `posts` collection and a `{% for %}` loop.

```ini
[collection posts]
handle = "Blog\Post"
==
{% for post in posts %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```

## Applying Queries to the Collection

When accessing the component variable using a method it will switch to a database query. For example, to show only posts that have a related author, you can use the `whereRelation` query method. To complete the query, proceed with the `get()` method.

```twig
<!-- Lists posts that are owned by Bella Vista -->
{% set authorPosts = posts.whereRelation('author', 'slug', 'bella-vista').get() %}
```

You could also apply pagination to the collection with the `paginate()` method instead.

```twig
<!-- Paginate posts at 10 per page -->
{% set authorPosts = posts.whereRelation(...).paginate(10) %}

<!-- Display the pagination navigation -->
{{ authorPosts.links|raw }}
```
