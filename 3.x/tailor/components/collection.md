---
subtitle: Display multiple content entries on the page.
---
# Collection

Displays a collection of entries.

Attaching the collection to a page.

```ini
[collection blog]
handle = "Blog\Post"
```

Looping over the entries.

```twig
{% for post in blog %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).
