# Resources

Reference assets and variables included on this page.

Attaching the resources to a page and setting a variable.

```ini
[resources]
vars[activeNavLink] = 'blog'
```

Accessing the variable.

```twig
{% if activeNavLink === 'blog' %}
    <p>The blog is active!</p>
{% endif %}
```
