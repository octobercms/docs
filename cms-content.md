Content blocks are text, HTML or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout. Content blocks files reside in the **/content** subdirectory of a theme directory. The following extensions are supported for content files:

Extension  | Description
------------- | -------------
**htm** | Used for HTML markup.
**txt** | Used for plain text.
**md** | Used for Markdown syntax.

The extension affects the way content blocks are displayed in the back-end user interface (with a WYSIWYG editor or with a plain text editor) and how the blocks are rendered on the website. Markdown blocks are converted to HTML before they are displayed.

Use the `{% content 'file.htm' %}` tag to render a content block in a [page](pages), [partial](partials) or [layout](layouts). Example of a page rendering a content block:

    url = "/contacts"
    ==
    <div class="contacts">
        {% content 'contacts.htm' %}
    </div>
