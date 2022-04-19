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

The following properties are supported by the component.

Property | Description
-------- | -------------
**js** | Array of JavaScript files in the theme **assets/js** folder
**less** | Array of LESS files in the theme **assets/less** folder
**scss** | Array of SCSS files in the theme **assets/scss** folder
**css** | Array of Stylesheet files in the theme **assets/css** folder
**vars** | Page variables names and values
**headers** | Page header names and values
