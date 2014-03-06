Partial templates reside in the **/partials** directory of a theme. Partial files should have the **htm** extension. The configuration section is optional for partials.

The following configuration parameters are supported:

- **description** - the partial description, for the back-end UI (optional)

Simplest partial example:

```php
<p>This is a partial</p>
```

Use the `{% partial %}` tag to render a partial in a layout, page, or another partial. Example of a page referring a partial: 

```php
...
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

#### Partial variables

You can pass parameters to partials by specifying them after the partial name in the partial tag:

```php
...
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

Inside the partial, parameters can be accessed like any other Twig variable:

```php
...
<p>Country: {{ country }}, city: {{ city }}.</p>
```
