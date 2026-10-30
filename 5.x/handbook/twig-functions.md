---
subtitle: Functions available in themes, alongside the functions built into Twig.
---
# Twig Functions

Function | Description
------------- | -------------
[`abort()`](./twig-functions/abort.md) | aborts the request with an HTTP status code.
[`ajaxHandler()`](./twig-functions/ajax-handler.md) | runs an AJAX handler and returns its response.
[`carbon()`](./twig-functions/carbon.md) | creates a Carbon object for working with dates and times.
[`collect()`](./twig-functions/collect.md) | builds an array using a fluent interface.
[`config()`](./twig-functions/config.md) | returns a configuration value.
[`dump()`](./twig-functions/dump.md) | dumps information about a variable for debugging.
[`form_*()`](./twig-functions/form.md) | calls the methods of the `Form` helper class.
[`html_*()`](./twig-functions/html.md) | calls the methods of the `Html` helper class.
[`pager()`](./twig-functions/pager.md) | returns the pagination details for paginated records.
[`redirect()`](./twig-functions/redirect.md) | redirects to a URL or theme page.
[`response()`](./twig-functions/response.md) | returns a custom response instead of the page.
[`str_*()`](./twig-functions/str.md) | calls the methods of the `Str` helper class.
[`trans()`](./twig-functions/trans.md) | translates a string using the localization files, also available as `__()`.
[`vite()`](./twig-functions/vite.md) | renders the tags for theme assets built with Vite.

#### See Also

::: also
* [Twig Templating](../themes/templating.md)
* [Built-in Twig Functions](https://twig.symfony.com/doc/functions/index.html)
:::
