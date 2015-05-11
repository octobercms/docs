# this.param

You can access the current URL parameters via `this.param` and it returns a PHP array.

## Accessing page parameters

This example demonstrates how to access an URL parameter in a page.

    url = "/account/:tab"
    ==
    {% if this.param.tab == 'details' %}
        <p>You are on the account details tab</p>
    {% elseif this.param.tab == 'history' %}
        <p>You are on the history tab</p>
    {% endif %}

If the parameter name is also a variable, then array syntax can be used.

    url = "/account/:post_id"
    ==
    {% set name = 'post_id' %}
    <p>The post ID is: {{ this.param[name] }}</p>
