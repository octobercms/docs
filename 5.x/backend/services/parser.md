---
previousPath: extend/services/parser.md
subtitle: Parse Markdown, Twig, YAML and INI content in PHP, and build editable templates with the Dynamic Syntax parser.
---
# Parser

October CMS includes parsers for the markup, template and configuration formats it uses. Use them to render content to HTML or to read and write configuration files in PHP.

```php
$html = Markdown::parse('This text is **bold**.');

$array = Yaml::parseFile($filePath);
```

Each format has its own role. For example, the [objects found in a theme](../../themes/structure.md) use the Twig and INI formats in their template structure.

## Parsing Markdown

Markdown is a readable plain text format that converts to HTML. The `Markdown` facade parses Markdown syntax and is based on [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/). Here are some examples of Markdown.

```md
This text is **bold**, this text is *italic*, this text is ~~crossed out~~.

# The largest heading (an <h1> tag)
## The second largest heading (an <h2> tag)
...
###### The 6th largest heading (an <h6> tag)
```

Use the `Markdown::parse` method to render Markdown to HTML.

```php
$html = Markdown::parse($markdown);
```

In your frontend markup, use the [`|md` filter](../../handbook/twig-filters/md.md) to parse Markdown.

```twig
{{ '**Text** is bold.'|md }}
```

### Using HTML in Markdown

Markdown is a superset of HTML, so you can combine HTML and Markdown in the same template. When Markdown finds a block-level HTML tag, Markdown syntax is turned off for all the content inside it.

```html
<div>
    This **text** won't be parsed by *Markdown*
</div>
```

The Markdown parser only accepts one HTML node per line. In the example below, the second node is not included in the output.

```html
<!-- Output: <p>Foo</p> -->
<p>Foo</p><p>Bar</p>
```

When you display complex HTML, especially from a Twig variable, wrap the variable in a single HTML node so all the output is captured.

```twig
<div>
    {{ messageBody|raw }}
</div>
```

To turn on Markdown inside a block-level tag, add the `markdown` attribute to the tag with a value of `1`.

```html
<div markdown="1">
    This **text** is now bold.
</div>
```

## Rendering Twig Templates

Twig is a template engine that compiles HTML templates into optimized PHP code. It powers [the frontend markup](../../themes/templating.md), [view content](./response-view.md) and [mail message content](./mail.md).

Use the `Twig::parse` method of the `Twig` facade to render Twig to HTML.

```php
$html = Twig::parse($twig);
```

Pass variables to the Twig markup as the second argument.

```php
$html = Twig::parse($twig, ['foo' => 'bar']);
```

You can register custom Twig features in [the plugin registration file](../../themes/extending/twig.md).

## Rendering Bracket Templates

The bracket parser is a simple template parser and an alternative to Twig. It is currently used for passing variables to [theme content blocks](../../themes/content.md). It renders HTML faster than Twig, and its syntax suits non-technical users. There is no facade for this parser, so call the `parse` method of the `October\Rain\Parse\Bracket` class.

```php
use October\Rain\Parse\Bracket;

$html = Bracket::parse($content, ['foo' => 'bar']);
```

The syntax uses single *curly brackets* to render variables.

```
<p>Hello there, {foo}</p>
```

You can also pass an array of objects as a variable.

```php
$html = Bracket::parse($content, ['likes' => [
    ['name' => 'Dogs'],
    ['name' => 'Fishing'],
    ['name' => 'Golf']
]]);
```

Then loop over the array with the following syntax.

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

## Parsing YAML

YAML ("YAML Ain't Markup Language") is a configuration format. Like Markdown, it is designed to be readable, and it converts to a PHP array. October CMS uses YAML throughout backend development, for example in [form field definitions](../../handbook/form-fields.md).

```yaml
receipt: Acme Purchase Invoice
date: 2015-10-02
user:
    name: Joe
    surname: Blogs
```

Use the `Yaml::parse` method of the `Yaml` facade to convert YAML to a PHP array.

```php
$array = Yaml::parse($yamlString);
```

Use the `parseFile` method to parse the contents of a file.

```php
$array = Yaml::parseFile($filePath);
```

The parser also works in reverse. Use the `render` method to output YAML from a PHP array.

```php
$yamlString = Yaml::render($array);
```

## Parsing INI Files

The INI file format is a standard for simple configuration files, commonly used by [components inside theme templates](../../themes/components.md). Unlike YAML, it is very simple, less sensitive to typos and does not rely on indentation. It supports basic key-value pairs with sections.

```ini
receipt = "Acme Purchase Invoice"
date = "2015-10-02"

[user]
name = "Joe"
surname = "Blogs"
```

Use the `Ini::parse` method of the `Ini` facade to convert INI to a PHP array.

```php
$array = Ini::parse($iniString);
```

Use the `parseFile` method to parse the contents of a file.

```php
$array = Ini::parseFile($filePath);
```

The parser also works in reverse. Use the `render` method to output INI from a PHP array.

```php
$iniString = Ini::render($array);
```

### October Flavored INI

The INI parser used by the PHP function `parse_ini_string` is limited to arrays that are 3 levels deep.

```ini
level1Value = "foo"
level1Array[] = "bar"

[level1Object]
level2Value = "hello"
level2Array[] = "world"
level2Object[level3Value] = "stop here"
```

October CMS extends this with *October flavored INI*, which allows arrays of any depth using a syntax inspired by HTML forms. Following on from the example above, the following syntax is supported.

```ini
[level1Object]
level2Object[level3Array][] = "Yay!"
level2Object[level3Object][level4Value] = "Yay!"
level2Object[level3Object][level4Array][] = "Yay!"
level2Object[level3Object][level4Object][level5Value] = "Yay!"
; ... to infinity and beyond!
```

## Building Editable Templates with Dynamic Syntax

Dynamic Syntax is a template engine unique to October CMS that renders a template in two modes: **view** mode and **editor** mode. In the following template, the content between the `{text}...{/text}` tags is the default text for view mode, while the `name` and `label` attributes are properties for editor mode.

```
<h1>{text name="websiteName" label="Website Name"}Our wonderful website{/text}</h1>
```

There is no facade for this parser, so call the `parse` method of the `October\Rain\Parse\Syntax\Parser` class. It takes the template content as a string and returns a `Parser` object.

```php
use October\Rain\Parse\Syntax\Parser as SyntaxParser;

$syntax = SyntaxParser::parse($content);
```

### View Mode

Using the template above as the content, call the `render` method to render the template with its default text.

```php
echo $syntax->render();
// <h1>Our wonderful website</h1>
```

Pass an array of variables as the first argument of `render` to replace the variables in the template. Here the default value of `websiteName` is replaced with a new value.

```php
echo $syntax->render(['websiteName' => 'October CMS']);
// <h1>October CMS</h1>
```

Call the `toTwig` method to output the template ready for rendering by the Twig engine.

```php
echo $syntax->toTwig();
// <h1>{{ websiteName }}</h1>
```

### Editor Mode

Editor mode is what sets Dynamic Syntax apart from a regular template engine. For example, it lets [layouts add custom form fields to the pages](https://octobercms.com/plugin/rainlab-pages) that use them, or [build forms dynamically for email campaigns](https://octobercms.com/plugin/responsiv-campaign).

Call the `toEditor` method of the `Parser` object to get a PHP array of properties that describe how each variable should be filled, for example by a form builder.

```php
$array = $syntax->toEditor();
// 'websiteName' => [
//     'label' => 'Website name',
//     'default' => 'Our wonderful website',
//     'type' => 'text'
// ]
```

These properties closely match the options of [form field definitions](../../handbook/form-fields.md), so the two features complement each other. For example, you can convert the array above to YAML and write it to a `fields.yaml` file.

```php
$form = [
    'fields' => $syntax->toEditor()
];

File::put('fields.yaml', Yaml::render($form));
```

### Supported Tags

The Dynamic Syntax parser supports the following tags, which match common [form field types](../../handbook/form-fields.md).

#### Text

Single line input for smaller blocks of text.

```html
{text name="websiteName" label="Website Name"}Our wonderful website{/text}
```

#### Textarea

Multiple line input for larger blocks of text.

```html
{textarea name="websiteDescription" label="Website Description"}
    This is our vision for things to come
{/textarea}
```

#### Dropdown

Renders a dropdown form field.

```html
{dropdown name="dropdown" label="Pick one" options="One|Two"}{/dropdown}
```

Renders a dropdown form field with separate values and labels.

```html
{dropdown name="dropdown" label="Pick one" options="one:One|two:Two"}{/dropdown}
```

Renders a dropdown form field with an array returned by a static class method. The class must be fully namespaced.

```html
{dropdown name="dropdown" label="Pick one" options="Path\To\Class::method"}{/dropdown}
```

#### Radio

Renders a radio form field.

```html
{radio name="radio" label="Thoughts?" options="y:Yes|n:No|m:Maybe"}{/radio}
```

#### Variable

Renders the form field type set in the `type` attribute. This tag only sets a variable, and renders as an empty string in view mode.

```html
{variable type="text" name="name" label="Name"}John{/variable}
```

#### Rich Editor

Text input for rich content (WYSIWYG).

```html
{richeditor name="content" label="Main content"}Default text{/richeditor}
```

Renders in Twig as:

```twig
{{ content|raw }}
```

#### Markdown

Text input for Markdown content.

```html
{markdown name="content" label="Markdown content"}Default text{/markdown}
```

Renders in Twig as:

```twig
{{ content|md }}
```

#### Media Finder

File selector for media library items. The tag value contains the relative path to the file.

```html
{mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}
```

Renders in Twig as:

```twig
{{ logo|media }}
```

#### File Upload

File uploader input for files. The tag value contains the full path to the file.

```html
{fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}
```

#### Color Picker

Color picker widget for selecting a color. The tag contains the selected hexadecimal value. Add the optional `availableColors` attribute to set the colors available for selection.

```html
{colorpicker name="bg_color" label="Background colour" allowEmpty="true" availableColors="#ffffff|#000000"}{/colorpicker}
```

#### Repeater

Renders a repeating section with other fields inside.

```html
{repeater name="content_sections" prompt="Add another content section"}
    <h2>{text name="title" label="Title"}Title{/text}</h2>
    <p>{textarea name="content" label="Content"}Content{/textarea}</p>
{/repeater}
```

Renders in Twig as:

```twig
{% for fields in repeater %}
    <h2>{{ fields.title }}</h2>
    <p>{{ fields.content|raw }}</p>
{% endfor %}
```

Calling `$syntax->toEditor` returns a different array for a repeater field.

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

The repeater field also supports group mode with the Dynamic Syntax parser.

```html
{variable name="sections" type="repeater" prompt="Add another section" tab="Sections"
        groups="$/author/plugin/repeater_fields.yaml"}{/variable}
```

This is an example of the **repeater_fields.yaml** group configuration file.

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

For more information about the repeater group mode, see the [Repeater field](../../handbook/form-fields/repeater.md).

#### See Also

::: also
* [md Twig Filter](../../handbook/twig-filters/md.md)
* [Form Fields](../../handbook/form-fields.md)
* [Extending Twig](../../themes/extending/twig.md)
:::
