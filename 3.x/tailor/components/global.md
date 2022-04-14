# Global

Makes globals available to the page.

Attaching the global to a page or layout.

```ini
[global blogConfig]
handle = "Blog\Config"
```

Accessing a global property.

```twig
{% if blogConfig.about_this_blog %}
    <p>{{ blogConfig.about_this_blog }}</p>
{% endif %}
```
