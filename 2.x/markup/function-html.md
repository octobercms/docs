# html()

Functions prefixed with `html_` perform tasks that are useful when dealing with html markup. The helper maps directly to the `Html` PHP class and its methods. For example:

    {{ html_strip() }}

is the PHP equivalent of the following:

    <?= Html::strip() ?>

> **Note**: Methods in *camelCase* should be converted to *snake_case*.

## html_strip()

Removes HTML from a string.

    {{ html_strip('<strong>Hello world</strong>') }}

## html_limit()

Limits HTML with specific length with a proper tag handling.

    {{ html_limit('<p>Post content...</p>', 100) }}

To add a suffix when limit is applied, pass it as the third argument. Defaults to `...`.

    {{ html_limit('<p>Post content...</p>', 100, '... Read more!') }}

## html_clean()

Cleans HTML to prevent most XSS attacks.

    {{ html_clean('<script>window.location = "http://google.com"</script>') }}

## html_email()

Obfuscates an e-mail address to prevent spam-bots from sniffing it.

    {{ html_email('a@b.c') }}

For example:

    <a href="mailto: {{ html_email('a@b.c')|raw }}">Email me</a>

    <!-- The above will output -->
    <a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">Email me</a>
