# CMS Content blocks

- [Introduction](#introduction)
- [Rendering content blocks](#rendering-content-blocks)
- [Passing variables to content blocks](#content-variables)
    - [Global variables](#content-global-variables)

Content blocks are text, HTML or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout. They are designed to hold static content only and support basic templating variables. [Partials](partials) are more flexible and should be used for generating dynamic content.

<a name="introduction"></a>
## Introduction

Content blocks files reside in the **/content** subdirectory of a theme directory. The following extensions are supported for content files:

Extension | Description
------------- | -------------
**htm** | Used for HTML markup.
**txt** | Used for plain text.
**md** | Used for Markdown syntax.

The extension affects the way content blocks are displayed in the back-end user interface (with a WYSIWYG editor or with a plain text editor) and how the blocks are rendered on the website. Markdown blocks are converted to HTML before they are displayed.

<a name="rendering-content-blocks"></a>
## Rendering content blocks

Use the `{% content 'file.htm' %}` tag to render a content block in a [page](pages), [partial](partials) or [layout](layouts). Example of a page rendering a content block:

    url = "/contacts"
    ==
    <div class="contacts">
        {% content 'contacts.htm' %}
    </div>

<a name="content-variables"></a>
## Passing variables to content blocks

Sometimes you may need to pass variables to a content block from the external code. While content blocks do not support the use of Twig markup, they do support using variables with a basic syntax. You can pass variables to content blocks by specifying them after the content block name in the `{% content %}` tag:

    {% content 'welcome.htm' name='John' %}

Inside the content block, variables can be accessed using singular *curly brackets*:

    <h1>This is a demo for {name}</h1>

More information can be found [in the Markup guide](../markup/tag-content).

<a name="content-global-variables"></a>
### Global variables

You may register variables that are globally available to all content blocks with the `View::share` method.

    View::share('site_name', 'OctoberCMS');

This code could be called inside the register or boot method of a [plugin registration file](../plugin/registration). Using the above example, the variable `{site_name}` will be available inside all content blocks.
