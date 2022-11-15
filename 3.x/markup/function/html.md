---
subtitle: Twig Function
---
# html()

Functions prefixed with `html_` perform tasks that are useful when dealing with HTML markup. The helper maps directly to the `Html` PHP class and its methods. For example:

```twig
{{ html_strip() }}
```

The above is the PHP equivalent of the following:

```php
<?= Html::strip() ?>
```

::: warning
Methods in *camelCase* should be converted to *snake_case*.
:::

You may also apply the HTML functions as a Twig filter.

```twig
{{ ''|html_strip }}
```

## html_strip()

Removes HTML from a string.

```twig
// Outputs: Hello world
{{ '<strong>Hello world</strong>'|html_strip }}
```

You may pass the first argument as allowable tags.

```twig
// Outputs: <p>Text</p>
{{ '<p><b>Text</b></p>'|html_strip('<p>') }}
```

## html_limit()

Limits HTML with specific length with a proper tag handling.

```twig
{{ '<p>Post content...</p>'|html_limit(100) }}
```

To add a suffix when limit is applied, pass it as the second argument. Defaults to `...`.

```twig
{{ '<p>Post content...</p>'|html_limit(100, '... Read more!') }}
```

## html_clean()

Cleans HTML to prevent most XSS attacks.

```twig
{{ '<script>window.location = "http://google.com"</script>'|html_clean }}
```

## html_email()

Obfuscates an e-mail address to prevent spam-bots from sniffing it.

```twig
{{ 'me@mysite.tld'|html_email }}
```

For example:

```twig
<a href="mailto: {{ 'me@mysite.tld'|html_email }}">Email me</a>

<!-- The above will output -->
<a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">Email me</a>
```

## html_mailto()

Outputs a complete anchor link with obfuscated email.

{{ 'me@mysite.tld'|html_mailto }}
