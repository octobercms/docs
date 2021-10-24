# {% if %}

The `{% if %}` and `{% endif %}` tags will represent an expression and is comparable with the if statements of PHP. In the simplest form you can use it to test if an expression evaluates to `true`:

    {% if online == false %}
        <p>The website is in maintenance mode.</p>
    {% endif %}

You can also test if an array is not empty:

    {% if users %}
        <ul>
            {% for user in users %}
                <li>{{ user.username }}</li>
            {% endfor %}
        </ul>
    {% endif %}

> **Note**: If you want to test if the variable is defined, use `{% if users is defined %}` instead.

You can also use `not` to check for values that evaluate to `false`:

    {% if not user.subscribed %}
        <p>You are not subscribed to our mailing list.</p>
    {% endif %}

For multiple expressions `{% elseif %}` and `{% else %}` can be used:

    {% if kenny.sick %}
        Kenny is sick.
    {% elseif kenny.dead %}
        You killed Kenny! You bastard!!!
    {% else %}
        Kenny looks okay so far.
    {% endif %}

## Expression rules

The rules to determine if an expression is true or false are the same as in PHP, here are the edge cases rules:

Value | Boolean evaluation
------------- | -------------
*empty string* | false
*numeric zero* | false
*whitespace-only string* | true
*empty array* | false
*null* | false
*non-empty array* | true
*object* | true
