# Developer Guide

- [Writing documentation](#writing-docs)
- [Developer standards and patterns](#developer-standards)

<a name="writing-docs"></a>
## Writing documentation

Your contributions to the October documentation are very welcome. Please follow the next rules if you want to contribute. How to style perfect October documentation pages:

1. Each page that has at least one H2 header should have a TOC list. The TOC list should be the first element after the H1 header. The TOC should have links to all H2 headers on the page.
1. There should be an introductory text below the TOC, even if there is the Introduction section. You may want to get rid of the Introduction section if it's not really needed. Don't leave the TOC alone.
1. Try to use only H2 and H3 headers.
1. Each H2 and H3 header should have a link defined as.

    <a name="page-cycle-handlers"></a>

1. Only use UL tags for TOC lists.
1. Avoid short, 1 sentence, paragraphs. Merge short paragraphs and try to be a bit more verbose.
1. Avoid short hanging paragraphs below code sections. Merge such paragraphs with the text above the code blocks.
1. Use the inline `code` tags for everything related to code - variable names, function names, syntax examples, etc.
1. Use the **strong** tag for everything else.
1. Don't hesitate to make cross links to other documentation articles. Adding links to the same article in the same paragraph is not necessary.
1. See the [cms-pages.md](https://github.com/octobercms/docs/blob/master/cms-pages.md) or [cms-themes.md](https://github.com/octobercms/docs/blob/master/cms-themes.md) files for your reference.

<a name="psr-exceptions"></a>
## Exceptions to PSR standards

There are some exceptions to the PSR standard used by October.

<a name="psr-exception-methods"></a>
### Controller methods can have a single underscore

PSR-2 states that methods must be in **camelCase**. However, in Backend controllers October will prefix AJAX handlers with the action name to define a controlled context. For example:

    public function index()
    {
        // This is the index page (index action)
    }

    public function index_onDoSomething()
    {
        // AJAX handler only works on the index action
    }

    public function onDoSomethingElse()
    {
        // AJAX handler works globally for all actions
    }

An exception must be granted for these scenarios.

<a name="psr-exception-newline-expressions"></a>
### Subsequent expressions are on a new line

PSR-2 does not explicitly state that subsequent expressions should be on the same line as the closing parenthesis.

The following code is considered valid and is recommended for better spacing between logic:

    if ($expr1) {
        // if body
    }
    elseif ($expr2) {
        // elseif body
    }
    else {
        // else body;
    }

    try {
        // try body
    }
    catch (FirstExceptionType $e) {
        // catch body
    }
    catch (OtherExceptionType $e) {
        // catch body
    }

This is an acceptable preference based on a technicality, PSR-1 and PSR-2 are not explicit when using SHOULD, MUST, etc. in this case. However, at the time of writing, the PSR-2 codesniffer rules say it's not valid, so an exception may be required.

<a name="developer-standards"></a>
## Developer standards and patterns

This section describes some standards that we highly recommend to follow for everybody, especially if you are going to publish your products on the Marketplace.

<a name="vendor-naming"></a>
### Vendor naming

The vendor or author code in a namespace must begin with an uppercase character and should not contain underscores or dashes. These are examples of valid names:

    Acme.Blog
    RainLab.User
    Happygilmore.Golf

These are examples of names that are **not** valid:

    acme.blog
    rainLab.user
    Happy_gilmore.Golf

<a name="repository-naming"></a>
### Repository naming

Plugins to be named with the `-plugin` suffix and optional `oc-` prefix.

    blog-plugin
    oc-blog-plugin

Themes to be named with the `-theme` suffix and optional `oc-` prefix.

    happy-theme
    oc-happy-theme

<a name="variable-naming"></a>
### PHP Variable naming

Use **camelCase** everywhere except for the following:

1. Postback parameters should use **snake_case**
1. Database columns should use **snake_case**
1. Language keys should use **snake_case**

<a name="element-naming"></a>
### HTML element naming

[Form] Element names should use snake_case (underscores)

    <input name="first_name">

Where the name is an array, the array keys can be either StudlyCase or snake_case.

    <input name="ForumMember[first_name]">
    <input name="forum_member[first_name]">

Element IDs should be camel case or hyphen-case (dashes)

    <div id="firstNameGroup">
        <input id="firstName">
    </div>

    <div id="first-name-group">
        <input id="first-name">
    </div>

Element classes names should use hyphen-case (dashes)

    <div class="form-group">
        <input class="form-control">
    </div>

<a name="view-naming"></a>
### View file naming

Partial views should begin with an underscore character. Whereas Controller and Layout views do not begin with an underscore character. Since views are often found in a single folder, the underscore (_) and dash (-) characters can be used to organise the files. A dash is used as a substitute for a space character. An underscore is used as a substitute for a slash character (folder or namespace).

    index_fancy-layout.htm       <== Index\Fancy layout
    form-with-sidebar.htm        <== Form with sidebar
    _field-container.htm         <== Field container (partial)
    _field_baloon-selector.htm   <== Field\Baloon Selector (partial)

View files must end with the `.htm` file extension.

<a name="class-naming"></a>
### Class naming

Classes commonly are placed in the `classes` directory. There is a number of class suffixes and prefixes that we recommend to use.

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

<a name="event-naming"></a>
### Event naming

The term *after* is not used in Events, only the term *before* is used. For example:

1. **beforeSetAttribute** - this event comes *before* any default logic.
1. **setAttribute** - this event comes *after* any default logic.

Where possible events should cover global and local versions. Global events should be prefixed with the module or plugin name. For example:

    // For global events, it is prefixed with the module or plugin code
    Event::fire('cms.page.end');

    // For local events, the prefix is not required
    $this->fireEvent('page.end');

Avoid using terms such as *onSomething* in event names since the word *bind*/*fire* represent this action word.

It is good practise to always pass the calling object as the first parameter to the global event, the local event should not need this. Local events take priority over global events when halting, or come first when processing.

    // Local event
    if ($this->fireEvent('beforeAddContent', [$message, $view], true) === false)
        return;

    // Global event
    if (Event::fire('mailer.beforeAddContent', [$this, $message, $view], true) === false)
        return;

When expecting multiple results, it is easy to combine the arrays like so:

    // Combine local and global event results
    $eventResults = array_merge(
        $this->fireEvent('form.beforeRefresh', [$saveData]),
        Event::fire('backend.form.beforeRefresh', [$this, $saveData])
    );

When processing or filtering over a value, use the data holder pattern to pass the value by reference:

    // Pass content to events by reference
    $dataHolder = (object) ['content' => $content];
    $this->fireEvent('cms.processContent', [$dataHolder]);
    Event::fire('cms.processContent', [$this, $dataHolder]);
    $content = $dataHolder->content;

<a name="db-table-naming"></a>
### Database table naming

Tables names should be prefixed with the author and plugin name.

    acme_blog_xxx

Boolean column names should be prefixed with `is_`

    is_activated
    is_visible

This is because the model attributes can conflict, for example, `public $visible;` in the Model class conflicts with a database column with the same name. Some column names are exceptions, for example `notify_user`.

If your plugin extends tables belonging to other plugins, the added column names should be prefixed with the author and plugin name:

    acme_blog_category_id

The author and plugin name acronym is acceptable too:

    ab_category_id

<a name="component-naming"></a>
### Component naming

Component classes are commonly place in the `components` directory. The name of a component should represent its primary function.

To display a list of records, use the `List` suffix, eg:

    ProductList
    ProductReviewList
    CategoryList

To display a single record, use the `Details` suffix, eg:

    ProductDetails
    CategoryDetails

Using the suffix helps avoid conflicts with controller and model names. Alternatively you can name components without the suffix, for cases when the name is descriptive and does not conflict:

    ProductReviews
    CustomerCheckout
    SeoDirectory
    UserProfile

<a name="controller-naming"></a>
### Controller naming

Controllers are commonly are placed in `controllers` directory, for back-end controllers. The name of a controller should be a plural, for example:

    People
    Products
    Categories
    ProductCategories

<a name="model-naming"></a>
### Model naming

Models are commonly are placed in `models` directory. The name of a model should be a singular, for example:

    Person
    Product
    Category
    ProductCategory

When extending other models, you should prefix the field with at least the plugin name.

    User::extend(function($model) {
        $model->hasOne['forum_member'] = ['RainLab\Forum\Models\Member'];
    });

The fully qualified plugin name is also acceptable, for example:

    $user->rainlab_forum_member

<a name="model-scopes"></a>
### Model scopes

If a model scope returns a query object, used for chaining, they should generally be prefix with `apply` to indicate they are being applied to the query. Defined as:

    public function scopeApplyUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

Then applied to the model as:

    $model->applyUser($user);

Whilst `apply` is the ideal prefix name, here are some other prefixes we recommended for chained scopes:

    - is
    - for
    - with
    - without
    - filter

If a scope returns anything other than a query then any name can be used. Some acceptable names for non-chained scopes:

    - find
    - get
    - list
    - lists

<a name="class-guide"></a>
### Class guidance

These points are to be considered in a relaxed fashion:

1. In classes, properties and methods should be declared as `protected` in favor of `private`. So all classes can be used as base classes.
1. If a property contains a single value (not an array), make the property `public` instead of a get/set approach.
1. If a property contains a collection (is an array), make the property `protected` with get `getProperties`, `getProperty` and `setProperty`.

<a name="strict-trans-tables"></a>
### Use the STRICT_TRANS_TABLES mode with MySQL

When MySQL [STRICT_TRANS_TABLES mode](http://dev.mysql.com/doc/refman/5.0/en/sql-mode.html) is enabled the server performs strict data type validation. It is highly recommended to keep this mode enabled in MySQL during the development. This allows you to find errors before your code gets to a client's server with the enabled strict mode. The mode can be enabled in my.cnf (Unix) or my.ini (Windows) file:

    sql_mode=STRICT_TRANS_TABLES
