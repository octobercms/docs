# Parser

October CMS uses several standards for processing markup, templates and configuration. Each has been carefully selected to serve their role in making your development process and learning curve as simple as possible. As an example, the [objects found in a theme](../cms/themes.md) use the [Twig](#twig-template-parser) and [INI format](#initialization-ini-configuration-parser) in their template structure. Each parser is described in more detail below.

## Markdown Parser

Markdown allows you to write easy-to-read and easy-to-write plain text format, which then converts to HTML. The `Markdown` facade is used for parsing Markdown syntax and is based on [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/). Some quick examples of markdown:

```md
This text is **bold**, this text is *italic*, this text is ~~crossed out~~.

# The largest heading (an <h1> tag)
## The second largest heading (an <h2> tag)
...
###### The 6th largest heading (an <h6> tag)
```

Use the `Markdown::parse` method to render Markdown to HTML:

```php
$html = Markdown::parse($markdown);
```

You may also use the `|md` filter for [parsing Markdown in your front-end markup](../markup/filter-md).

```twig
{{ '**Text** is bold.'|md }}
```

### Using HTML in Markdown

Markdown is a superset of HTML so you can combine HTML and Markdown in the same template. When Markdown encounters any block-level HTML tag, the Markdown syntax will deactivate for all the content inside.

```html
<div>
    This **text** won't be parsed by *Markdown*
</div>
```

It is important to note that the Markdown parser will only accept one HTML node per line. In the example below, the second node is not included in the output.

```html
<!-- Output: <p>Foo</p> -->
<p>Foo</p><p>Bar</p>
```

When displaying complex HTML, especially via a Twig variable, you should wrap the variable in a single HTML node to make sure all the output is captured.

```twig
<div>
    {{ messageBody|raw }}
</div>
```

If you intentionally want to enable Markdown inside a block-level tag, you may do this by adding `markdown` attribute to the tag with a value of `1`.

```html
<div markdown="1">
    This **text** is now bold.
</div>
```

## Twig Template Parser

Twig is a simple but powerful template engine that parses HTML templates in to optimized PHP code, it the driving force behind [the front-end markup](../markup/templating.md), [view content](../services/response-view.md#oc-views) and [mail message content](../services/mail.md#oc-message-content).

The `Twig` facade is used for parsing Twig syntax, you may use the `Twig::parse` method to render Twig to HTML.

```php
$html = Twig::parse($twig);
```

The second argument can be used for passing variables to the Twig markup.

```php
$html = Twig::parse($twig, ['foo' => 'bar']);
```

The Twig parser can be extended to register custom features via [the plugin registration file](../plugin/registration.md#oc-extending-twig).

## Bracket Parser

October also ships with a simple bracket template parser as an alternative to the Twig parser, currently used for passing variables to [theme content blocks](../cms/content.md#oc-passing-variables-to-content-blocks). This engine is faster to render HTML and is designed to be more suitable for non-technical users. There is no facade for this parser so the fully qualified `October\Rain\Parse\Bracket` class should be used with the `parse` method.

```php
use October\Rain\Parse\Bracket;

$html = Bracket::parse($content, ['foo' => 'bar']);
```

The syntax uses singular *curly brackets* for rendering variables:

```
<p>Hello there, {foo}</p>
```

You may also pass an array of objects to parse as a variable.

```php
$html = Template::parse($content, ['likes' => [
    ['name' => 'Dogs'],
    ['name' => 'Fishing'],
    ['name' => 'Golf']
]]);
```

The array can be iterated using the following syntax:

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

## YAML Configuration Parser

YAML ("YAML Ain't Markup Language") is a configuration format, similar to Markdown it was designed to be an easy-to-read and easy-to-write format that converts to a PHP array. It is used practically everywhere for the back-end development of October, such as [form field](../backend/forms.md#oc-defining-form-fields) and [list column](../backend/lists.md#oc-defining-list-columns) definitions. An example of some YAML:

```yaml
receipt: Acme Purchase Invoice
date: 2015-10-02
user:
    name: Joe
    surname: Blogs
```

The `Yaml` facade is used for parsing YAML and you use the `Yaml::parse` method to render YAML to a PHP array:

```php
$array = Yaml::parse($yamlString);
```

Use the `parseFile` method to parse the contents of a file:

```php
$array = Yaml::parseFile($filePath);
```

The parser also supports operation in reverse, outputting YAML format from a PHP array. You may use the `render` method for this:

```php
$yamlString = Yaml::render($array);
```

## Initialization (INI) Configuration Parser

The INI file format is a standard for defining simple configuration files, commonly used by [components inside theme templates](../cms/components.md). It could be considered a cousin of the YAML format, although unlike YAML, it is incredibly simple, less sensitive to typos and does not rely on indentation. It supports basic key-value pairs with sections, for example:

```ini
receipt = "Acme Purchase Invoice"
date = "2015-10-02"

[user]
name = "Joe"
surname = "Blogs"
```

The `Ini` facade is used for parsing INI and you use the `Ini::parse` method to render INI to a PHP array:

```php
$array = Ini::parse($iniString);
```

Use the `parseFile` method to parse the contents of a file:

```php
$array = Ini::parseFile($filePath);
```

The parser also supports operation in reverse, outputting INI format from a PHP array. You may use the `render` method for this:

```php
$iniString = Ini::render($array);
```

### October Flavored INI

Traditionally, the INI parser used by the PHP function `parse_ini_string` is restricted to arrays that are 3 levels deep. For example:

```ini
level1Value = "foo"
level1Array[] = "bar"

[level1Object]
level2Value = "hello"
level2Array[] = "world"
level2Object[level3Value] = "stop here"
```

October has extended this functionality with *October flavored INI* to allow arrays of infinite depth, inspired by the syntax of HTML forms. Following on from the above example, the following syntax is supported:

```ini
[level1Object]
level2Object[level3Array][] = "Yay!"
level2Object[level3Object][level4Value] = "Yay!"
level2Object[level3Object][level4Array][] = "Yay!"
level2Object[level3Object][level4Object][level5Value] = "Yay!"
; ... to infinity and beyond!
```

## Dynamic Syntax Parser

Dynamic Syntax is a templating engine unique to October that fundamentally supports two modes of rendering. Parsing a template will produce two results, either a **view** or **editor** mode. Take this template text as an example, the inner part of the `{text}...{/text}` tags represents the default text for the **view** mode, while the inner attributes, `name` and `label`, are used as properties for the **editor** mode.

```
<h1>{text name="websiteName" label="Website Name"}Our wonderful website{/text}</h1>
```

There is no facade for this parser so the fully qualified `October\Rain\Parse\Syntax\Parser` class should be used with the `parse` method. The first argument of the `parse` method takes the template content as a string and returns a `Parser` object.

```php
use October\Rain\Parse\Syntax\Parser as SyntaxParser;

$syntax = SyntaxParser::parse($content);
```

### View Mode

Let's say we used the first example above as the template content, calling the `render` method by itself will render the template with the default text:

```php
echo $syntax->render();
// <h1>Our wonderful website</h1>
```

Just like any templating engine, passing an array of variables to the first argument of `render` will replace the variables inside the template. Here the default value of `websiteName` is replaced with our new value:

```php
echo $syntax->render(['websiteName' => 'October CMS']);
// <h1>October CMS</h1>
```

As a bonus feature, calling the `toTwig` method will output the template in a prepared state for rendering by the [Twig engine](#twig-template-parser).

```php
echo $syntax->toTwig();
// <h1>{{ websiteName }}</h1>
```

### Editor Mode

So far the Dynamic Syntax parser is not much different to a regular template engine, however the editor mode is where the utility of Dynamic Syntax becomes more apparent. The editor mode unlocks a new realm of possibility, for example, where [layouts inject custom form fields to pages](https://octobercms.com/plugin/rainlab-pages) that belong to them or for [dynamically built forms used in email campaigns](https://octobercms.com/plugin/responsiv-campaign).

To continue with the examples above, calling the `toEditor` method on the `Parser` object will return a PHP array of properties that define how the variable should be populated, by a form builder for example.

```php
$array = $syntax->toEditor();
// 'websiteName' => [
//     'label' => 'Website name',
//     'default' => 'Our wonderful website',
//     'type' => 'text'
// ]
```

You may notice the properties closely resemble the options found in [form field definitions](../backend/forms.md#oc-defining-form-fields). This is intentional so the two features compliment each other. We could now easily convert the array above to YAML and write to a `fields.yaml` file:

```php
$form = [
    'fields' => $syntax->toEditor()
];

File::put('fields.yaml', Yaml::render($form));
```

### Supported Tags

There are various tag types that can be used with the Dynamic Syntax parser, these are designed to match common [form field types](../backend/forms.md#oc-available-field-types).

#### Text

Single line input for smaller blocks of text.

```
{text name="websiteName" label="Website Name"}Our wonderful website{/text}
```

#### Textarea

Multiple line input for larger blocks of text.

```
{textarea name="websiteDescription" label="Website Description"}
    This is our vision for things to come
{/textarea}
```

#### Dropdown

Renders a dropdown form field.

```
{dropdown name="dropdown" label="Pick one" options="One|Two"}{/dropdown}
```

Renders a dropdown form field with independent values and labels.

```
{dropdown name="dropdown" label="Pick one" options="one:One|two:Two"}{/dropdown}
```

Renders a dropdown form field with an array returned by a static class method (the class must be a fully namespaced class).

```
{dropdown name="dropdown" label="Pick one" options="\Path\To\Class::method"}{/dropdown}
```

#### Radio

Renders a radio form field.

```
{radio name="radio" label="Thoughts?" options="y:Yes|n:No|m:Maybe"}{/radio}
```

#### Variable

Renders the form field type exactly as defined in the `type` attribute. This tag will simply set a variable and will render in view mode as an empty string.

```
{variable type="text" name="name" label="Name"}John{/variable}
```

#### Rich editor

Text input for rich content (WYSIWYG).

```
{richeditor name="content" label="Main content"}Default text{/richeditor}
```

Renders in Twig as

```twig
{{ content|raw }}
```

#### Markdown

Text input for Markdown content.

```
{markdown name="content" label="Markdown content"}Default text{/markdown}
```

Renders in Twig as

```twig
{{ content|md }}
```

#### Media finder

File selector for media library items. This tag value will contain the relative path to the file.

```
{mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}
```

Renders in Twig as

```twig
{{ logo|media }}
```

#### File upload

File uploader input for files. This tag value will contain the full path to the file.

```
{fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}
```

#### Color picker

Color picker widget for color selection. This tag will contain the selected hexadecimal value. You may optionally provide an `availableColors` attribute to define the available colours for selection.

```
{colorpicker name="bg_color" label="Background colour" allowEmpty="true" availableColors="#ffffff|#000000"}{/colorpicker}
```

#### Repeater

Renders a repeating section with other fields inside.

```
{repeater name="content_sections" prompt="Add another content section"}
    <h2>{text name="title" label="Title"}Title{/text}</h2>
    <p>{textarea name="content" label="Content"}Content{/textarea}</p>
{/repeater}
```

Renders in Twig as

```twig
{% for fields in repeater %}
    <h2>{{ fields.title }}</h2>
    <p>{{ fields.content|raw }}</p>
{% endfor %}
```

Calling `$syntax->toEditor` will return a different array for a repeater field:

```php
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
```

The repeater field also supports group mode, to be used with the dynamic syntax parser as follows:

```
{variable name="sections" type="repeater" prompt="Add another section" tab="Sections"
        groups="$/author/plugin/repeater_fields.yaml"}{/variable}
```

This is an example of the repeater_fields.yaml group configuration file:

```yaml
quote:
    name: Quote
    description: Quote item
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: Quote Position
            type: radio
            options:
                left: Left
                center: Center
                right: Right
        quote_content:
            span: auto
            label: Details
            type: textarea
```

For more information about the repeater group mode see [Repeater Widget](../backend/forms.md#oc-repeater).
