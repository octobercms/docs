---
previousPath: cms/themes/content.md
subtitle: Keep editable text, HTML and Markdown in content files and render them in your templates.
---
# Content Blocks

A content block is a file of static text, HTML or [Markdown](http://daringfireball.net/projects/markdown/syntax) that is edited separately from the page or layout. Use content blocks for static content. For dynamic content, use [partials](./partials.md), which are more flexible.

::: cmstemplate
```ini
url = "/contacts"
```
```twig
<div class="contacts">
    {% content 'contacts.html' %}
</div>
```
:::

## Creating a Content Block

Content block files live in the **content** directory of your theme. The file extension sets the editor used in the admin panel and how the block renders on the website. For example, Markdown blocks are converted to HTML before display.

Extension | Description
------------- | -------------
**html** | HTML markup, edited with a WYSIWYG editor.
**htm** | HTML markup, edited with a code editor.
**txt** | plain text.
**md** | Markdown syntax, edited with a Markdown editor.

## Rendering a Content Block

Use the `{% content %}` tag with the file name to render a content block in a [page](./pages.md), [partial](./partials.md) or [layout](./layouts.md).

```twig
{% content 'my-markdown.md' %}
```

## Passing Variables to Content Blocks

Content blocks do not support Twig markup, but they do support variables with a basic syntax. Pass variables after the file name in the `{% content %}` tag. The following passes a variable called `name` with the value **John**.

```twig
{% content 'welcome.htm' name='John' %}
```

Inside the content block, read the variable with *single* curly brackets.

```html
<h1>This is a demo for {name}</h1>
```

See the [content tag](../handbook/twig-tags/content.md) for more ways to use variables.

### Global Variables

To make a variable available to every content block, register it with the `View::share` method.

```php
View::share('site_name', 'October CMS');
```

A common place for this call is the `register` or `boot` method of a [plugin registration file](../backend/plugins/introduction.md). In the example above, the `{site_name}` variable becomes available in all content blocks.

```html
<p>Welcome to {site_name}</p>
```

## Translating Content Blocks

When your [sites](./sites/multisite.md) use different locales, translate a content block by placing a copy of the file in a subdirectory named after the locale. The base file is the default, and the locale directory mirrors the same file path.

```
content/
├── my-content.htm          ← Default locale
├── fr/
│   └── my-content.htm      ← French
└── ru/
    └── my-content.htm      ← Russian
```

Nested paths mirror the same way. For example, `content/blog/intro.htm` translates as `content/fr/blog/intro.htm`, with the locale directory at the content root.

When the block renders, the following locations are checked for the active site's locale, and the first matching file wins.

1. The exact site locale, for example `fr-ca`.
2. The base language of the locale, for example `fr`.
3. The base file.

A site using the `fr-ca` locale therefore shares the `fr` directory until a dedicated `fr-ca` directory exists, and a site without a matching directory falls back to the base file. The lookup only applies to directories that match the active site's locale. You can still render a file in any other directory by its path, for example `{% content 'fr/my-content.htm' %}`.

#### See Also

::: also
* [Content Twig Tag](../handbook/twig-tags/content.md)
* [Partials](./partials.md)
* [Theme Localization](./sites/localization.md)
:::
