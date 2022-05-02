---
subtitle: Twig Property
---
# this.method

You can access the current request method object via `this.method` and it returns the HTTP verb in uppercase.

```twig
{% if this.method == 'GET' %}
    <!-- Do GET Logic -->
{% else this.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```