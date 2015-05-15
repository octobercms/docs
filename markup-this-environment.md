# this.environment

You can access the current environment object via `this.environment` and it returns a string that references the [current environment configuration](../help/installation#environment-config).

## Example

The following example will display a banner if the website is running in the test environment:

    {% if this.environment == 'test' %}

        <div class="banner">Test Environment</div>

    {% endif %}
