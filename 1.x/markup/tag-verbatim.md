# {% verbatim %}

The `{% verbatim %}` tag marks entire sections as being raw text that should not be parsed.

    {% verbatim %}<p>Hello, {{ name }}</p>{% endverbatim %}

The above will render in the browser exactly as:

    <p>Hello, {{ name }}</p>

For example, AngularJS uses the same templating syntax so you can decide which variables to use for each.

    <p>Hello {{ name }}, this is parsed by Twig</p>

    {% verbatim %}
        <p>Hello {{ name }}, this is parsed by AngularJS</p>
    {% endverbatim %}
