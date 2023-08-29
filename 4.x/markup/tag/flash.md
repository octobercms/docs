---
subtitle: Twig Tag
---
# {% flash %}

::: aside
View the [Flash Messages article](../../cms/features/flash-messages.md) to learn more about using flash messages.
:::

The `{% flash %}` and `{% endflash %}` tags will render any flash messages stored in the user session, set by the `Flash` PHP class. The `message` variable inside will contain the flash message text and the markup inside will repeat for multiple flash messages.

```twig
<ul>
    {% flash %}
        <li>{{ message }}</li>
    {% endflash %}
</ul>
```

You can use the `type` variable that represents the flash message type &mdash; **success**, **error**, **info** or **warning**.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

You can also specify the `type`  to filter flash messages of a given type. The next example will show only **success** messages, if there is an **error** message it won't be displayed.

```twig
{% flash success %}
    <div class="alert alert-success">{{ message }}</div>
{% endflash %}
```

#### See Also

::: also
* [Flash Messages](../../cms/features/flash-messages.md)
:::
