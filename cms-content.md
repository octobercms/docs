Content blocks reside in the **/content** directory of a theme directory.
Content files support the following extensions:

- **htm** - for HTML markup
- **txt** - for plain text
- **md** - for Markdown syntax

The extension only affects the way how content blocks are displayed in the back-end UI (with a WYSIWYG editor or with a plain text editor).
Use the `{% content %}` tag to render a content block in a page, partial or layout.
Example of a page rendering a content block:

    <div class="contacts">
        {% content "contacts.htm" %}
    </div>
