# Parser service

- [Introduction](#introduction)
- [Markdown parser](#markdown-parser)
- [Twig template parser](#twig-parser)
- [Bracket parser](#bracket-parser)
- [YAML configuration parser](#yaml-parser)
- [Initialization (INI) configuration parser](#ini-parser)
    - [October flavored INI](#october-ini)
- [Dynamic Syntax parser](#dynamic-syntax-parser)
    - [View mode](#syntax-view-mode)
    - [Editor mode](#syntax-editor-mode)
    - [Supported tags](#syntax-supported-tags)

<a name="introduction"></a>
## Introduction

October uses several standards for processing markup, templates and configuration. Each has been carefully selected to serve their role in making your development process and learning curve as simple as possible. As an example, the [objects found in a theme](../cms/themes) use the [Twig](#twig-parser) and [INI format](#ini-parser) in their template structure. Each parser is described in more detail below.

<a name="markdown-parser"></a>
## Markdown parser

Markdown allows you to write easy-to-read and easy-to-write plain text format, which then converts to HTML. The `Markdown` facade is used for parsing Markdown syntax and is based on [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/). Some quick examples of markdown:

    This text is **bold**, this text is *italic*, this text is ~~crossed out~~.

    # The largest heading (an <h1> tag)
    ## The second largest heading (an <h2> tag)
    ...
    ###### The 6th largest heading (an <h6> tag)

Use the `Markdown::parse` method to render Markdown to HTML:

    $html = Markdown::parse($markdown);

You may also use the `|md` filter for [parsing Markdown in your front-end markup](../markup/filter-md).

    {{ '**Text** is bold.'|md }}

<a name="twig-parser"></a>
## Twig template parser

Twig is a simple but powerful template engine that parses HTML templates in to optimized PHP code, it the driving force behind [the front-end markup](../markup), [view content](../services/response-view#views) and [mail message content](../services/mail#message-content).

The `Twig` facade is used for parsing Twig syntax, you may use the `Twig::parse` method to render Twig to HTML.

    $html = Twig::parse($twig);

The second argument can be used for passing variables to the Twig markup.

    $html = Twig::parse($twig, ['foo' => 'bar']);

The Twig parser can be extended to register custom features via [the plugin registration file](../plugin/registration#extending-twig).

<a name="bracket-parser"></a>
## Bracket parser

October also ships with a simple bracket template parser as an alternative to the Twig parser, currently used for passing variables to [theme content blocks](../cms/content#content-variables). This engine is faster to render HTML and is designed to be more suitable for non-technical users. There is no facade for this parser so the fully qualified `October\Rain\Parse\Bracket` class should be used with the `parse` method.

    use October\Rain\Parse\Bracket;

    $html = Bracket::parse($content, ['foo' => 'bar']);

The syntax uses singular *curly brackets* for rendering variables:

    <p>Hello there, {foo}</p>

You may also pass an array of objects to parse as a variable.

    $html = Template::parse($content, ['likes' => [
        ['name' => 'Dogs'],
        ['name' => 'Fishing'],
        ['name' => 'Golf']
    ]]);

The array can be iterated using the following syntax:

    <ul>
        {likes}
            <li>{name}</li>
        {/likes}
    </ul>

<a name="yaml-parser"></a>
## YAML configuration parser

YAML ("YAML Ain't Markup Language") is a configuration format, similar to Markdown it was designed to be an easy-to-read and easy-to-write format that converts to a PHP array. It is used practically everywhere for the back-end development of October, such as [form field](../backend/forms#form-fields) and [list column](../backend/lists##list-columns) definitions. An example of some YAML:

    receipt:     Acme Purchase Invoice
    date:        2015-10-02
    user:
        name:    Joe
        surname: Blogs

The `Yaml` facade is used for parsing YAML and you use the `Yaml::parse` method to render YAML to a PHP array:

    $array = Yaml::parse($yamlString);

Use the `parseFile` method to parse the contents of a file:

    $array = Yaml::parseFile($filePath);

The parser also supports operation in reverse, outputting YAML format from a PHP array. You may use the `render` method for this:

    $yamlString = Yaml::render($array);

<a name="ini-parser"></a>
## Initialization (INI) configuration parser

The INI file format is a standard for defining simple configuration files, commonly used by [components inside theme templates](../cms/components). It could be considered a cousin of the YAML format, although unlike YAML, it is incredibly simple, less sensitive to typos and does not rely on indentation. It supports basic key-value pairs with sections, for example:

    receipt = "Acme Purchase Invoice"
    date = "2015-10-02"

    [user]
    name = "Joe"
    surname = "Blogs"

The `Ini` facade is used for parsing INI and you use the `Ini::parse` method to render INI to a PHP array:

    $array = Ini::parse($iniString);

Use the `parseFile` method to parse the contents of a file:

    $array = Ini::parseFile($filePath);

The parser also supports operation in reverse, outputting INI format from a PHP array. You may use the `render` method for this:

    $iniString = Ini::render($array);

<a name="october-ini"></a>
### October flavored INI

Traditionally, the INI parser used by the PHP function `parse_ini_string` is restricted to arrays that are 3 levels deep. For example:

    level1Value = "foo"
    level1Array[] = "bar"

    [level1Object]
    level2Value = "hello"
    level2Array[] = "world"
    level2Object[level3Value] = "stop here"

October has extended this functionality with *October flavored INI* to allow arrays of infinite depth, inspired by the syntax of HTML forms. Following on from the above example, the following syntax is supported:

    [level1Object]
    level2Object[level3Array][] = "Yay!"
    level2Object[level3Object][level4Value] = "Yay!"
    level2Object[level3Object][level4Array][] = "Yay!"
    level2Object[level3Object][level4Object][level5Value] = "Yay!"
    ; ... to infinity and beyond!

<a name="dynamic-syntax-parser"></a>
## Dynamic Syntax parser

Dynamic Syntax is a templating engine unique to October that fundamentally supports two modes of rendering. Parsing a template will produce two results, either a **view** or **editor** mode. Take this template text as an example, the inner part of the `{text}...{/text}` tags represents the default text for the **view** mode, while the inner attributes, `name` and `label`, are used as properties for the **editor** mode.

    <h1>{text name="websiteName" label="Website Name"}Our wonderful website{/text}</h1>

There is no facade for this parser so the fully qualified `October\Rain\Parse\Syntax\Parser` class should be used with the `parse` method. The first argument of the `parse` method takes the template content as a string and returns a `Parser` object.

    use October\Rain\Parse\Syntax\Parser as SyntaxParser;

    $syntax = SyntaxParser::parse($content);

<a name="syntax-view-mode"></a>
### View mode

Let's say we used the first example above as the template content, calling the `render` method by itself will render the template with the default text:

    echo $syntax->render();
    // <h1>Our wonderful website</h1>

Just like any templating engine, passing an array of variables to the first argument of `render` will replace the variables inside the template. Here the default value of `websiteName` is replaced with our new value:

    echo $syntax->render(['websiteName' => 'OctoberCMS']);
    // <h1>OctoberCMS</h1>

As a bonus feature, calling the `toTwig` method will output the template in a prepared state for rendering by the [Twig engine](#twig-parser).

    echo $syntax->toTwig();
    // <h1>{{ websiteName }}</h1>

<a name="syntax-editor-mode"></a>
### Editor mode

So far the Dynamic Syntax parser is not much different to a regular template engine, however the editor mode is where the utility of Dynamic Syntax becomes more apparent. The editor mode unlocks a new realm of possibility, for example, where [layouts inject custom form fields to pages](http://octobercms.com/plugin/rainlab-pages) that belong to them or for [dynamically built forms used in email campaigns](http://octobercms.com/plugin/responsiv-campaign).

To continue with the examples above, calling the `toEditor` method on the `Parser` object will return a PHP array of properties that define how the variable should be populated, by a form builder for example.

    $array = $syntax->toEditor();
    // 'websiteName' => [
    //     'label' => 'Website name',
    //     'default' => 'Our wonderful website',
    //     'type' => 'text'
    // ]

You may notice the properties closely resemble the options found in [form field definintions](../backend/forms#form-fields). This is intentional so the two features compliment each other. We could now easily convert the array above to YAML and write to a `fields.yaml` file:

    $form = [
        'fields' => $syntax->toEditor()
    ];

    File::put('fields.yaml', Yaml::render($form));

<a name="syntax-supported-tags"></a>
### Supported tags

There are various tag types that can be used with the Dynamic Syntax parser, these are designed to match common [form field types](../backend/forms#field-types).

#### Text

Single line input for smaller blocks of text.

    {text name="websiteName" label="Website Name"}Our wonderful website{/text}

#### Textarea

Multiple line input for larger blocks of text.

    {textarea name="websiteDescription" label="Website Description"}
        This is our vision for things to come
    {/textarea}

### Dropdown

Renders a dropdown form field.

    {dropdown name="dropdown" label="Pick one" options="One|Two"}{/dropdown}

### Radio

Renders a radio form field.

    {radio name="radio" label="Thoughts?" options="y:Yes|n:No|m:Maybe"}{/radio}

#### Variable

Renders the form field type exactly as defined in the `type` attribute. This tag will simply set a variable and will render in view mode as an empty string.

    {variable type="text" name="name" label="Name"}John{/variable}

#### Rich editor

Text input for rich content (WYSIWYG).

    {richeditor name="content" label="Main content"}Default text{/richeditor}

Renders in Twig as

    {{ content|raw }}

#### Markdown

Text input for Markdown content.

    {markdown name="content" label="Markdown content"}Default text{/markdown}

Renders in Twig as

    {{ content|md }}

<!--
#### Checkbox

Renders conditional content inside (still under development)

    {checkbox name="showHeader" label="Show heading" default="true"}
        <p>This content will be shown if the checkbox is ticked</p>
    {/checkbox}

Renders in Twig as

    {% if checkbox %}
        {{ showHeader }}
    {% endif %}
-->

#### Media finder

File selector for media library items. This tag value will contain the relative path to the file.

    {mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}

Renders in Twig as

    {{ logo|media }}

#### File upload

File uploader input for files. This tag value will contain the full path to the file.

    {fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}

#### Repeater

Renders a repeating section with other fields inside.

    {repeater name="content_sections" prompt="Add another content section"}
        <h2>{text name="title" label="Title"}Title{/text}</h2>
        <p>{textarea name="content" label="Content"}Content{/textarea}</p>
    {/repeater}

Renders in Twig as

    {% for fields in repeater %}
        <h2>{{ fields.title }}</h2>
        <p>{{ fields.content|raw }}</p>
    {% endfor %}

Calling `$syntax->toEditor()` will return a different array for a repeater field:

    'repeater' => [
        'label' => 'Website name',
        'type' => 'repeater',
        'fields' => [

            'title' => [
                'label' => 'Title',
                'default' => 'Title',
                'type' => 'text'
            ],
            'content' => [
                'label' => 'Content',
                'default' => 'Content',
                'type' => 'textarea'
            ]

        ]
    ]
