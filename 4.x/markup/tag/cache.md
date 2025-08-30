---
subtitle: Twig Tag
---
# {% cache %}

The `{% cache %}` tag is used to cache content used on a page or partial. The cache key included with the tag can be any string except for the following reserved characters `{}()/\@:;`.

```twig
{% cache "cache key" %}
    Cached forever
{% endcache %}
```

You may set the cache to expire after a specific amount of time, specify the expiration time in minutes using the `ttl` modifier.

```twig
{% cache "cache key" ttl(5) %}
    Cached for 5 minutes
{% endcache %}
```

It is good practice is to embed some useful information in the key that allows the cache to automatically expire when it must be refreshed:

- Give each cache a unique name and namespace it like your templates.
- Embed an integer that you increment whenever the template code changes (to automatically invalidate all current caches).
- Embed a unique key that is updated whenever the variables used in the template code changes.

This allows you to use a cheap cache key lookup (e.g. updated timestamp on a model) to cache more expensive contents inside.

```twig
{% cache "blog_post;v1;" ~ post.id ~ ";" ~ post.updated_at %}
    <!-- Expensive Blog Post Contents Here -->
{% endcache %}
```
It is important to remember that the cache tag creates a new scope for variables. This means the changes are local to the template fragment.

```twig
{% set count = 1 %}

{% cache "cache key" ttl(5) %}
    {# Different scope to the value of count outside of the cache tag #}
    {% set count = 2 %}
    Some code
{% endcache %}

{# Displays 1 #}
{{ count }}
```
