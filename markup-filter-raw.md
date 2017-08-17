# |raw

Output variables in October are automatically escaped, the `|raw` filter marks the value as being "safe" and will not be escaped if `raw` is the last filter applied.

    {# This variable won't be escaped #}
    {{ variable|raw }}

Be careful when using the `raw` filter inside expressions:

    {% set hello = '<strong>Hello</strong>' %}
    {% set hola = '<strong>Hola</strong>' %}

    {{ false ? '<strong>Hola</strong>' : hello|raw }}

    {# The above will not render the same as #}
    {{ false ? hola : hello|raw }}

    {# But renders the same as #}
    {{ (false ? hola : hello)|raw }}
