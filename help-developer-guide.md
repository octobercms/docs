# Developer Guide

- [October Philosophy](#philosophy)
- [Learning October](#learning)
- [Development Team](#team)
- [How to style perfect October documentation pages](#writing-docs)
- [Developer Standards and Patterns](#developer-standards)

<a name="philosophy" class="anchor" href="#philosophy"></a>
## October Philosophy

[October](http://octobercms.com) is a Content Management System (CMS) and web platform whose sole purpose is to make your development workflow simple again.We feel building websites has become a convoluted and confusing process that leaves developers unsatisfied, we want to turn you around to the simpler side and get back to basics.

October's mission is to show the world that web development is not rocket science.

<a name="learning" class="anchor" href="#learning"></a>
## Learning October

The best place to learn October is by [reading the documentation](http://octobercms.com/docs).

<a name="team" class="anchor" href="#team"></a>
## Development Team

October was created by [Alexey Bobkov](http://ca.linkedin.com/pub/aleksey-bobkov/2b/ba0/232) and [Samuel Georges](http://au.linkedin.com/pub/sam-georges/31/641/a9), who both continue to develop the platform.

<a name="writing-docs" class="anchor" href="#writing-docs"></a>
## How to style perfect October documentation pages

You contributions to the October documentation are very welcome. Please follow the next rules if you want to contribute.

* Each page that has at least one H2 header should have a TOC list. The TOC list should be the first element after the H1 header. The TOC should have links to all H2 headers on the page.
* There should be an introductory text below the TOC, even if there is the Introduction section. You may want to get rid of the Introduction section if it's not really needed. Don't leave the TOC alone.
* Try to use only H2 and H3 headers.
* Each H2 and H3 header should have a link defined as 

```
<a name="page-cycle-handlers" class="anchor" href="#page-cycle-handlers"></a>
```

* Avoid short, 1 sentence, paragraphs. Merge short paragraphs and try to be a bit more verbose.
* Avoid short hanging paragraphs below code sections. Merge such paragraphs with the text above the code blocks.
* Use the inline `code` tags for everything related to code - variable names, function names, syntax examples, etc.
* Use the **strong** tag for everything else.
* Don't hesitate to make cross links to other documentation articles. Adding links to the same article in the same paragraph is not necessary.
* See the [cms-pages.md](cms-pages.md) or [cms-themes.md](cms-themes.md) files for your reference.

<a name="developer-standards" class="anchor" href="#developer-standards"></a>
## Developer Standards and Patterns

This section describes some standards that we highly recommend to follow for everybody, especially if you are going to publish your products on the Marketplace.

<a name="repository-naming" class="anchor" href="#repository-naming"></a>
### Repository naming

Plugins to be named with the `-plugin` suffix and optional `oc-` prefix.

    blog-plugin
    oc-blog-plugin

Themes to be named with the `-theme` suffix and optional `oc-` prefix.

    happy-theme
    oc-happy-theme

<a name="variable-naming" class="anchor" href="#variable-naming"></a>
### Variable naming

Use **camelCase** everywhere except for the following:

* Postback parameters should use **snake_case**
* Database columns should use **snake_case**
* Language keys should use **snake_case**

<a name="class-naming" class="anchor" href="#class-naming"></a>
### Class naming

There is a number of class suffixes and prefixes that we recommend to use. 

> Don't get naming paralysis. Yes, names are very important but they're not important enough to waste huge amounts of time on. If you can't think up a good name in five minutes, move on.

* Manager
* Builder
* Writer
* Reader
* Handler
* Container
* Protocol
* Target
* Converter
* Controller
* View
* Factory
* Entity
* Bag