# this.param

You can access the current URL parameters via `this.param` and it returns a PHP array.

## Accessing page parameters

This example demonstrates how to access the `tab` URL parameter in a page.

    url = "/account/:tab"
    ==
    {% if this.param.tab == 'details' %}

        <p>Here are all your details</p>

    {% elseif this.param.tab == 'history' %}

        <p>You are viewing a blast from the past</p>

    {% endif %}

If the parameter name is also a variable, then array syntax can be used.

    url = "/account/:post_id"
    ==
    {% set name = 'post_id' %}

    <p>The post ID is: {{ this.param[name] }}</p>
