# {% for %}

The `{% for %}` and `{% endfor %}` tags will loop over each value in a collection. A collection can be either an array or an object implementing the `Traversable` interface.

    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>

You can also access both keys and values:

    <ul>
        {% for key, user in users %}
            <li>{{ key }}: {{ user.username }}</li>
        {% endfor %}
    </ul>

If the collection is empty, you can render a replacement block by using else:

    <ul>
        {% for user in users %}
            <li>{{ user.username }}</li>
        {% else %}
            <li><em>There are no users found</em></li>
        {% endfor %}
    </ul>

## Looping a collection

If you do need to iterate over a collection of numbers, you can use the `..` operator:

    {% for i in 0..10 %}
        - {{ i }}
    {% endfor %}

The above snippet of code would print all numbers from 0 to 10.

It can also be useful with letters:

    {% for letter in 'a'..'z' %}
        - {{ letter }}
    {% endfor %}

The `..` operator can take any expression at both sides:

    {% for letter in 'a'|upper..'z'|upper %}
        - {{ letter }}
    {% endfor %}

## Adding a condition

Unlike in PHP there is no function to `break` or `continue` in a loop, however you can still filter the collection. The following example skips all the `users` which are not active:

    <ul>
        {% for user in users if user.active %}
            <li>{{ user.username }}</li>
        {% endfor %}
    </ul>

## The loop variable

Inside of a `for` loop block you can access some special variables:

Variable | Description
------------- | -------------
`loop.index` | The current iteration of the loop. (1 indexed)
`loop.index0` | The current iteration of the loop. (0 indexed)
`loop.revindex` |  The number of iterations from the end of the loop (1 indexed)
`loop.revindex0` | The number of iterations from the end of the loop (0 indexed)
`loop.first` | True if first iteration
`loop.last` |  True if last iteration
`loop.length` | The number of items in the collection
`loop.parent` | The parent context

    {% for user in users %}
        {{ loop.index }} - {{ user.username }}
    {% endfor %}
