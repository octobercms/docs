# {% verbatim %}

The verbatim tag marks entire sections as being raw text that should not be parsed. For example, AngularJS uses the same templating syntax.

    <p>Hello {{ name }}, this is parsed by Twig</p>

    {% verbatim %}
        <p>Hello {{ name }}, this is parsed by Angular</p>
    {% endverbatim %}
