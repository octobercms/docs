# 解析器

October CMS 使用多种标准来处理标记、模板和配置。每种标准都经过精心挑选，以在使你的开发过程和学习曲线尽可能简单方面发挥其作用。例如，[主题中的对象](../../cms/themes/themes.md)在其模板结构中使用 Twig 和 INI 格式。每个解析器在下面有更详细的描述。

## Markdown 解析器

Markdown 允许你编写易于阅读和易于编写的纯文本格式，然后将其转换为 HTML。`Markdown` 门面用于解析 Markdown 语法，基于 [GitHub 风格的 markdown](https://help.github.com/articles/github-flavored-markdown/)。以下是一些 Markdown 的简单示例：

```md
This text is **bold**, this text is *italic*, this text is ~~crossed out~~.

# The largest heading (an <h1> tag)
## The second largest heading (an <h2> tag)
...
###### The 6th largest heading (an <h6> tag)
```

使用 `Markdown::parse` 方法将 Markdown 渲染为 HTML：

```php
$html = Markdown::parse($markdown);
```

你也可以使用 `|md` 过滤器在[前端标记中解析 Markdown](../../markup/filter/md.md)。

```twig
{{ '**Text** is bold.'|md }}
```

### 在 Markdown 中使用 HTML

Markdown 是 HTML 的超集，因此你可以在同一模板中组合 HTML 和 Markdown。当 Markdown 遇到任何块级 HTML 标签时，其内部的所有内容的 Markdown 语法将被停用。

```html
<div>
    This **text** won't be parsed by *Markdown*
</div>
```

需要注意的是，Markdown 解析器每行只接受一个 HTML 节点。在下面的示例中，第二个节点不包含在输出中。

```html
<!-- Output: <p>Foo</p> -->
<p>Foo</p><p>Bar</p>
```

当显示复杂的 HTML 时，特别是通过 Twig 变量显示时，你应该将变量包装在单个 HTML 节点中，以确保所有输出都被捕获。

```twig
<div>
    {{ messageBody|raw }}
</div>
```

如果你有意想在块级标签内启用 Markdown，可以通过向标签添加值为 `1` 的 `markdown` 属性来实现。

```html
<div markdown="1">
    This **text** is now bold.
</div>
```

## Twig 模板解析器

Twig 是一个简单但强大的模板引擎，它将 HTML 模板解析为优化的 PHP 代码，是[前端标记](../../markup/templating.md)、[视图内容](./response-view.md)和[邮件消息内容](../system/sending-mail.md)的驱动力。

`Twig` 门面用于解析 Twig 语法，你可以使用 `Twig::parse` 方法将 Twig 渲染为 HTML。

```php
$html = Twig::parse($twig);
```

第二个参数可用于将变量传递给 Twig 标记。

```php
$html = Twig::parse($twig, ['foo' => 'bar']);
```

Twig 解析器可以通过[插件注册文件](../twig-tags.md)扩展以注册自定义功能。

## 花括号解析器

October CMS 还附带了一个简单的花括号模板解析器，作为 Twig 解析器的替代方案，目前用于将变量传递给[主题内容块](../../cms/themes/content.md)。此引擎渲染 HTML 更快，设计上更适合非技术用户。此解析器没有门面，因此应使用完全限定的 `October\Rain\Parse\Bracket` 类及其 `parse` 方法。

```php
use October\Rain\Parse\Bracket;

$html = Bracket::parse($content, ['foo' => 'bar']);
```

语法使用单个*花括号*来渲染变量：

```
<p>Hello there, {foo}</p>
```

你也可以传递对象数组来解析为变量。

```php
$html = Template::parse($content, ['likes' => [
    ['name' => 'Dogs'],
    ['name' => 'Fishing'],
    ['name' => 'Golf']
]]);
```

数组可以使用以下语法进行迭代：

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

## YAML 配置解析器

YAML（"YAML Ain't Markup Language"）是一种配置格式，与 Markdown 类似，它被设计为一种易于阅读和易于编写的格式，可转换为 PHP 数组。它几乎在 October CMS 的后端开发中无处不在，例如[表单字段定义](../../element/form-fields.md)。以下是一些 YAML 示例：

```yaml
receipt: Acme Purchase Invoice
date: 2015-10-02
user:
    name: Joe
    surname: Blogs
```

`Yaml` 门面用于解析 YAML，你可以使用 `Yaml::parse` 方法将 YAML 渲染为 PHP 数组：

```php
$array = Yaml::parse($yamlString);
```

使用 `parseFile` 方法解析文件的内容：

```php
$array = Yaml::parseFile($filePath);
```

解析器还支持反向操作，从 PHP 数组输出 YAML 格式。你可以使用 `render` 方法来实现：

```php
$yamlString = Yaml::render($array);
```

## 初始化（INI）配置解析器

INI 文件格式是定义简单配置文件的标准，通常由[组件在主题模板中](../../cms/themes/components.md)使用。它可以被视为 YAML 格式的近亲，但与 YAML 不同的是，它非常简单，对错别字不太敏感，且不依赖缩进。它支持带有节的基本键值对，例如：

```ini
receipt = "Acme Purchase Invoice"
date = "2015-10-02"

[user]
name = "Joe"
surname = "Blogs"
```

`Ini` 门面用于解析 INI，你可以使用 `Ini::parse` 方法将 INI 渲染为 PHP 数组：

```php
$array = Ini::parse($iniString);
```

使用 `parseFile` 方法解析文件的内容：

```php
$array = Ini::parseFile($filePath);
```

解析器还支持反向操作，从 PHP 数组输出 INI 格式。你可以使用 `render` 方法来实现：

```php
$iniString = Ini::render($array);
```

### October 风味的 INI

传统上，PHP 函数 `parse_ini_string` 使用的 INI 解析器限于 3 层深度的数组。例如：

```ini
level1Value = "foo"
level1Array[] = "bar"

[level1Object]
level2Value = "hello"
level2Array[] = "world"
level2Object[level3Value] = "stop here"
```

October 通过 *October 风味的 INI* 扩展了此功能，允许无限深度的数组，其语法受 HTML 表单语法的启发。基于上面的示例，以下语法是支持的：

```ini
[level1Object]
level2Object[level3Array][] = "Yay!"
level2Object[level3Object][level4Value] = "Yay!"
level2Object[level3Object][level4Array][] = "Yay!"
level2Object[level3Object][level4Object][level5Value] = "Yay!"
; ... to infinity and beyond!
```

## 动态语法解析器

动态语法是 October 独有的模板引擎，从根本上支持两种渲染模式。解析模板将产生两种结果，即**视图**或**编辑器**模式。以此模板文本为例，`{text}...{/text}` 标签内部代表**视图**模式的默认文本，而内部属性 `name` 和 `label` 用作**编辑器**模式的属性。

```
<h1>{text name="websiteName" label="Website Name"}Our wonderful website{/text}</h1>
```

此解析器没有门面，因此应使用完全限定的 `October\Rain\Parse\Syntax\Parser` 类及其 `parse` 方法。`parse` 方法的第一个参数接受模板内容作为字符串，并返回一个 `Parser` 对象。

```php
use October\Rain\Parse\Syntax\Parser as SyntaxParser;

$syntax = SyntaxParser::parse($content);
```

### 视图模式

假设我们使用上面的第一个示例作为模板内容，单独调用 `render` 方法将使用默认文本渲染模板：

```php
echo $syntax->render();
// <h1>Our wonderful website</h1>
```

就像任何模板引擎一样，将变量数组传递给 `render` 的第一个参数将替换模板中的变量。在这里，`websiteName` 的默认值被我们的新值替换：

```php
echo $syntax->render(['websiteName' => 'October CMS']);
// <h1>October CMS</h1>
```

作为额外功能，调用 `toTwig` 方法将以准备好由 Twig 引擎渲染的状态输出模板。

```php
echo $syntax->toTwig();
// <h1>{{ websiteName }}</h1>
```

### 编辑器模式

到目前为止，动态语法解析器与常规模板引擎没有太大不同，但编辑器模式是动态语法的实用性变得更加明显的地方。编辑器模式解锁了新的可能性领域，例如，[布局向属于它们的页面注入自定义表单字段](https://octobercms.com/plugin/rainlab-pages)或用于[电子邮件营销中动态构建的表单](https://octobercms.com/plugin/responsiv-campaign)。

继续上面的示例，在 `Parser` 对象上调用 `toEditor` 方法将返回一个 PHP 数组，其中包含定义变量应如何被填充的属性，例如通过表单构建器。

```php
$array = $syntax->toEditor();
// 'websiteName' => [
//     'label' => 'Website name',
//     'default' => 'Our wonderful website',
//     'type' => 'text'
// ]
```

你可能会注意到这些属性与[表单字段定义](../../element/form-fields.md)中的选项非常相似。这是有意为之，以便两个功能相互补充。我们现在可以轻松地将上面的数组转换为 YAML 并写入 `fields.yaml` 文件：

```php
$form = [
    'fields' => $syntax->toEditor()
];

File::put('fields.yaml', Yaml::render($form));
```

### 支持的标签

动态语法解析器可以使用各种标签类型，这些标签旨在匹配常见的[表单字段类型](../../element/form-fields.md)。

#### 文本

用于较小文本块的单行输入。

```html
{text name="websiteName" label="Website Name"}Our wonderful website{/text}
```

#### 文本域

用于较大文本块的多行输入。

```html
{textarea name="websiteDescription" label="Website Description"}
    This is our vision for things to come
{/textarea}
```

#### 下拉菜单

渲染下拉表单字段。

```html
{dropdown name="dropdown" label="Pick one" options="One|Two"}{/dropdown}
```

渲染具有独立值和标签的下拉表单字段。

```html
{dropdown name="dropdown" label="Pick one" options="one:One|two:Two"}{/dropdown}
```

渲染由静态类方法返回的数组的下拉表单字段（类必须是完全限定命名空间的类）。

```html
{dropdown name="dropdown" label="Pick one" options="Path\To\Class::method"}{/dropdown}
```

#### 单选按钮

渲染单选按钮表单字段。

```html
{radio name="radio" label="Thoughts?" options="y:Yes|n:No|m:Maybe"}{/radio}
```

#### 变量

完全按照 `type` 属性中定义的方式渲染表单字段类型。此标签只会设置一个变量，在视图模式下将渲染为空字符串。

```html
{variable type="text" name="name" label="Name"}John{/variable}
```

#### 富文本编辑器

用于富内容（所见即所得）的文本输入。

```html
{richeditor name="content" label="Main content"}Default text{/richeditor}
```

在 Twig 中渲染为

```twig
{{ content|raw }}
```

#### Markdown

用于 Markdown 内容的文本输入。

```html
{markdown name="content" label="Markdown content"}Default text{/markdown}
```

在 Twig 中渲染为

```twig
{{ content|md }}
```

#### 媒体查找器

媒体库项目的文件选择器。此标签值将包含文件的相对路径。

```html
{mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}
```

在 Twig 中渲染为

```twig
{{ logo|media }}
```

#### 文件上传

文件的文件上传输入。此标签值将包含文件的完整路径。

```html
{fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}
```

#### 颜色选择器

用于颜色选择的颜色选择器小部件。此标签将包含选中的十六进制值。你可以选择提供 `availableColors` 属性来定义可供选择的颜色。

```html
{colorpicker name="bg_color" label="Background colour" allowEmpty="true" availableColors="#ffffff|#000000"}{/colorpicker}
```

#### 重复器

渲染包含其他字段的重复部分。

```html
{repeater name="content_sections" prompt="Add another content section"}
    <h2>{text name="title" label="Title"}Title{/text}</h2>
    <p>{textarea name="content" label="Content"}Content{/textarea}</p>
{/repeater}
```

在 Twig 中渲染为

```twig
{% for fields in repeater %}
    <h2>{{ fields.title }}</h2>
    <p>{{ fields.content|raw }}</p>
{% endfor %}
```

调用 `$syntax->toEditor` 将为重复器字段返回不同的数组：

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

重复器字段还支持分组模式，与动态语法解析器一起使用如下：

```html
{variable name="sections" type="repeater" prompt="Add another section" tab="Sections"
        groups="$/author/plugin/repeater_fields.yaml"}{/variable}
```

以下是 repeater_fields.yaml 分组配置文件的示例：

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

有关重复器分组模式的更多信息，请参阅[重复器小部件](../../element/form/widget-repeater.md)。
