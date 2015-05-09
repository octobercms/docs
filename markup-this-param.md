# this.param

You can access the current URL parameters via `this.param` and it returns a PHP array.

## Accessing page parameters

This example demonstrates how to access an URL parameter in a page.

    url = "/blog/post/:post_id"
    ==
    {% if this.param.post_id == 1 %}
        <p>This is the first post in the blog!</p>
    {% endif %}

If the parameter name is also a variable, then array syntax can be used.

    {% set name = 'post_id' %}

    {% if this.param[name] == 1 %}
        <p>This is the first post in the blog!</p>
    {% endif %}