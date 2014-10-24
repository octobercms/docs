# Developer Guide

- [Writing documentation](#writing-docs)
- [Developer standards and patterns](#developer-standards)

<a name="writing-docs" class="anchor" href="#writing-docs"></a>
## Writing documentation

Your contributions to the October documentation are very welcome. Please follow the next rules if you want to contribute. How to style perfect October documentation pages:

1. Each page that has at least one H2 header should have a TOC list. The TOC list should be the first element after the H1 header. The TOC should have links to all H2 headers on the page.
1. There should be an introductory text below the TOC, even if there is the Introduction section. You may want to get rid of the Introduction section if it's not really needed. Don't leave the TOC alone.
1. Try to use only H2 and H3 headers.
1. Each H2 and H3 header should have a link defined as.

    ```
    <a name="page-cycle-handlers" class="anchor" href="#page-cycle-handlers"></a>
    ```

1. Only use UL tags for TOC lists.
1. Avoid short, 1 sentence, paragraphs. Merge short paragraphs and try to be a bit more verbose.
1. Avoid short hanging paragraphs below code sections. Merge such paragraphs with the text above the code blocks.
1. Use the inline `code` tags for everything related to code - variable names, function names, syntax examples, etc.
1. Use the **strong** tag for everything else.
1. Don't hesitate to make cross links to other documentation articles. Adding links to the same article in the same paragraph is not necessary.
1. See the [cms-pages.md](cms-pages.md) or [cms-themes.md](cms-themes.md) files for your reference.

<a name="developer-standards" class="anchor" href="#developer-standards"></a>
## Developer standards and patterns

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
### PHP Variable naming

Use **camelCase** everywhere except for the following:

1. Postback parameters should use **snake_case**
1. Database columns should use **snake_case**
1. Language keys should use **snake_case**

<a name="element-naming" class="anchor" href="#element-naming"></a>
### HTML element naming

[Form] Element names should use snake_case (underscores)

    <input name="first_name" />

Where the name is an array, the array keys can be either StudlyCase or snake_case.

    <input name="ForumMember[first_name]" />
    <input name="forum_member[first_name]" />

Element IDs should be camel case or hyphen-case (dashes)

    <div id="firstNameGroup">
        <input id="firstName" />
    </div>

    <div id="first-name-group">
        <input id="first-name" />
    </div>

Element classes names should use hyphen-case (dashes)

    <div class="form-group">
        <input class="form-control" />
    </div>

<a name="view-naming" class="anchor" href="#view-naming"></a>
### View file naming

Partial views should begin with an underscore character. Whereas Controller and Layout views do not begin with an underscore character. Since views are often found in a single folder, the underscore (_) and dash (-) characters can be used to organise the files. A dash is used as a substitute for a space character. An underscore is used as a substitute for a slash character (folder or namespace).

    index_fancy-layout.htm       <== Index\Fancy layout
    form-with-sidebar.htm        <== Form with sidebar
    _field-container.htm         <== Field container (partial)
    _field_baloon-selector.htm   <== Field\Baloon Selector (partial)

View files must end with the `.htm` file extension.

<a name="class-naming" class="anchor" href="#class-naming"></a>
### Class naming

There is a number of class suffixes and prefixes that we recommend to use.

1. Manager
1. Builder
1. Writer
1. Reader
1. Handler
1. Container
1. Protocol
1. Target
1. Converter
1. Controller
1. View
1. Factory
1. Entity
1. Bag

> Don't get naming paralysis. Yes, names are very important but they're not important enough to waste huge amounts of time on. If you can't think up a good name in five minutes, move on.

<a name="event-naming" class="anchor" href="#event-naming"></a>
### Event naming

The term *after* is not used in Events, only the term *before* is used. For example:

1. **beforeSetAttribute** - this event comes *before* any default logic.
1. **setAttribute** - this event comes *after* any default logic.

Where possible events should cover global and local versions. Global events should be prefixed with the module or plugin name. For example:

    // For global events, it is prefixed with the module or plugin code
    Event::fire('cms.page.end')

    // For local events, the prefix is not required
    $this->fireEvent('page.end')

Avoid using terms such as *onSomething* in event names since the word *bind*/*fire* represent this action word.

It is good practise to always pass the calling object as the first parameter to the global event, the local event should not need this. Local events take priority over global events.

    // Local event
    if ($this->fireEvent('beforeAddContent', [$message, $view], true) === false)
        return;

    // Global event
    if (Event::fire('mailer.beforeAddContent', [$this, $message, $view], true) === false)
        return;

When expecting results, it is easy to combine the arrays like so:

    // Combine local and global event results
    $eventResults = $this->fireEvent('form.beforeRefresh', [$saveData]) + Event::fire('backend.form.beforeRefresh', [$this, $saveData]);

<a name="db-table-naming" class="anchor" href="#db-table-naming"></a>
### Database table naming

Tables names should be prefixed with the author and plugin name.

    acme_blog_xxx

Boolean column names should be prefixed with `is_`

    is_activated
    is_visible

This is because the model attributes can conflict, for example, `public $visible;` in the Model class conflicts with a database column with the same name. Some column names are exceptions, for example `notify_user`.

<a name="model-naming" class="anchor" href="#model-naming"></a>
### Model naming

When extending other models, you should prefix the field with at least the plugin name.

    User::extend(function($model) {
        $model->hasOne['forum_member'] = ['RainLab\Forum\Models\Member'];
    });

The fully qualified plugin name is also acceptable, for example:

    $user->rainlab_forum_member

<a name="class-guide" class="anchor" href="#class-guide"></a>
### Class guidance

These points are to be considered in a relaxed fashion:

1. In classes, properties and methods should be declared as `protected` in favor of `private`. So all classes can be used as base classes.
1. If a property contains a single value (not an array), make the property `public` instead of a get/set approach.
1. If a property contains a collection (is an array), make the property `protected` with get `getProperties`, `getProperty` and `setProperty`.

<a name="strict-trans-tables" class="anchor" href="#strict-trans-tables"></a>
### Use the STRICT_TRANS_TABLES mode with MySQL

When MySQL [STRICT_TRANS_TABLES mode](http://dev.mysql.com/doc/refman/5.0/en/sql-mode.html) is enabled the server performs strict data type validation. It is highly recommended to keep this mode enabled in MySQL during the development. This allows to find errors before your code gets to a client's server with the enabled strict mode. The mode can be enabled in my.cnf (Unix) or my.ini (Windows) file:

    sql_mode=STRICT_TRANS_TABLES
