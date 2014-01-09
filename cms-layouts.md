Layout templates reside in the **/layouts** directory of a theme. Layout files should have the **htm** extension. The configuration section is optional for layouts. 

The following configuration parameters are supported:

- *name* - the layout name, for the back-end UI (optional)
- *description* - the layout description, for the back-end UI (optional)

Simplest layout example:

```php
<html>
  <body>
    {% page %}
  </body>
</html>
```

The `{% page %}` tag outputs the page content.