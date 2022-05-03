---
subtitle: Twig Function
---
# redirect()

The `redirect()` function redirects the response to a URL or theme page.

To perform a redirect, pass the first argument as the destination, as either a CMS page name or a URL address.

```twig
{% if record.notFound %}
    {% do redirect('404') %}
{% endif %}
```

Page parameters can be passed as the second arguement.

```twig
{% do redirect('docs', { slug: 'home' }) %}
```

To redirect to a URL pass the fully qualified address instead of the page name.

```twig
{% do redirect('https://octobercms.com') %}
```

To include a redirect code, such as `302` (temporary) or `301` (permanent), use the second or third argument. The default is code `302`.

```twig
{% do redirect('https://octobercms.com', 301) %}
```
