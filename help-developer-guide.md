# Developer Guide

### October Philiosophy

[October](http://octobercms.com) is a Content Management System (CMS) and web platform whose sole purpose is to make your development workflow simple again.We feel building websites has become a convoluted and confusing process that leaves developers unsatisfied, we want to turn you around to the simpler side and get back to basics.

October's mission is to show the world that web development is not rocket science.

### Learning October

The best place to learn October is by [reading the documentation](http://octobercms.com/docs).

### Development Team

October was created by Alexey Bobkov and Samuel Georges, who both continue to develop the platform.

### How to style perfect October documentation pages

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

# Developer Standards and Patterns

## Repository naming

Plugins to be named with the `-plugin` suffix and optional `oc-` prefix.

    blog-plugin
    oc-blog-plugin

Themes to be named with the `-theme` suffix and optional `oc-` prefix.

    happy-theme
    oc-happy-theme

## Variable naming

Use **camelCase** everywhere except for the following:

* Postback parameters should use **snake_case**
* Database columns should use **snake_case**
* Language keys should use **snake_case**

## Class naming

Recommended class suffixes and prefixes:

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

NB: Don't get naming paralysis. Yes, names are very important but they're not important enough to waste huge amounts of time on. If you can't think up a good name in 10 minutes, move on.
