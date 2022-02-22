# 解析器

October CMS 使用多种标准来处理标记、模板和配置。 每一个都经过精心挑选，以发挥它们的作用，使您的开发过程和学习曲线尽可能简单。 例如，[在主题中找到的对象](../cms/themes.md)在其模板结构中使用[Twig](#twig-template-parser)和[INI format](#initialization-ini-configuration-parser)格式。下面更详细地描述每个解析器。

## Markdown解析器

Markdown 允许您编写易于阅读和易于编写的纯文本格式，然后将其转换为 HTML。 `Markdown` 门面用于解析 Markdown 语法，它基于 [GitHub 风格的 Markdown](https://help.github.com/articles/github-flavored-markdown/)。 一些Markdown的简单示例：

```md
这段文字是**粗体**，这段文字是*斜体*，这段文字有~~删除线~~。

# 最大的标题(一个 <h1> 标签)
## 第二大标题(一个 <h2> 标签)
...
###### 第六大标题(<h6> 标签)
```

使用 `Markdown::parse` 方法将 Markdown 渲染为 HTML：

```php
$html = Markdown::parse($markdown);
```

你也可以使用 `|md` 过滤器来[解析前端标记中的 Markdown](../markup/filter-md)。

```twig
{{ '**Text** is bold.'|md }}
```

### 在 Markdown 中使用 HTML

Markdown 是 HTML 的超集，因此您可以将 HTML 和 Markdown 组合在同一个模板中。 当 Markdown 遇到任何块级 HTML 标签时，Markdown 语法将对里面的所有内容停用。

```html
<div>
    此**文本**不会被 *Markdown* 解析
</div>
```

需要注意的是，Markdown 解析器每行只接受一个 HTML 节点。 在下面的示例中，第二个节点不包含在输出中。

```html
<!-- Output: <p>Foo</p> -->
<p>Foo</p><p>Bar</p>
```

当显示复杂的 HTML 时，尤其是通过 Twig 变量，您应该将变量包装在单个 HTML 节点中，以确保捕获所有输出。

```twig
<div>
    {{ messageBody|raw }}
</div>
```

如果您有意在块级标签中启用 Markdown，您可以通过将 `markdown` 属性添加值为 `1` 的标签来实现。

```html
<div markdown="1">
    这个**文本**现在是粗体的。
</div>
```

## Twig 模板解析器

Twig 是一个简单但功能强大的模板引擎，可以将 HTML 模板解析为优化的 PHP 代码，它是 [前端标记](../markup/templating.md)、[视图内容](../services/response-view.md#oc-views) 和 [邮件内容](../services/mail.md#oc-message-content) 背后的驱动力。

`Twig` 门面用于解析 Twig 语法，您可以使用 `Twig::parse` 方法将 Twig 渲染为 HTML。

```php
$html = Twig::parse($twig);
```

第二个参数可用于将变量传递给 Twig 标记。

```php
$html = Twig::parse($twig, ['foo' => 'bar']);
```

可以通过 [插件注册文件](../plugin/registration.md#oc-extending-twig) 扩展 Twig 解析器以注册自定义功能。

## 括号解析器

October 还附带了一个简单的括号模板解析器作为 Twig 解析器的替代方案，目前用于将变量传递给 [主题内容块](../cms/content.md#oc-passing-variables-to-content-blocks)。 该引擎渲染 HTML 的速度更快，旨在更适合非技术用户。 这个解析器没有门面，因此完全限定的 `October\Rain\Parse\Bracket` 类应该与 `parse` 方法一起使用。

```php
use October\Rain\Parse\Bracket;

$html = Bracket::parse($content, ['foo' => 'bar']);
```

语法使用单数*花括号*来呈现变量：

```
<p>Hello there, {foo}</p>
```

你也可以传递一个对象数组来解析为一个变量。

```php
$html = Template::parse($content, ['likes' => [
    ['name' => 'Dogs'],
    ['name' => 'Fishing'],
    ['name' => 'Golf']
]]);
```

可以使用以下语法迭代数组：

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

## YAML 配置解析器

YAML("YAML 不是标记语言")是一种配置格式，类似于 Markdown，它被设计为一种易于阅读和易于编写的格式，可以转换为 PHP 数组。October的后端开发几乎到处都在使用它，例如 [表单字段](../backend/forms.md#oc-defining-form-fields) 和 [列表](../backend/lists.md #defining-list-columns) 定义。 一些 YAML 的示例：

```yaml
receipt: Acme 采购发票
date: 2015-10-02
user:
    name: 乔
    surname: 博客
```

`Yaml` 门面用于解析 YAML，您使用 `Yaml::parse` 方法将 YAML 呈现为 PHP 数组：

```php
$array = Yaml::parse($yamlString);
```

使用 `parseFile` 方法解析文件的内容：

```php
$array = Yaml::parseFile($filePath);
```

解析器还支持反向操作，从 PHP 数组输出 YAML 格式。 您可以为此使用 `render` 方法：

```php
$yamlString = Yaml::render($array);
```

## 初始化(INI)配置解析器

INI 文件格式是定义简单配置文件的标准，常用[主题模板中的组件](../cms/components.md)。 它可以被认为是 YAML 格式的表亲，尽管与 YAML 不同，它非常简单，对拼写错误不太敏感，并且不依赖缩进。 它支持具有分段的基本键值对，例如：

```ini
receipt = "Acme 采购发票"
date = "2015-10-02"

[user]
name = "乔"
surname = "博客"
```

`Ini` 门面用于解析 INI，您使用 `Ini::parse` 方法将 INI 呈现为 PHP 数组：

```php
$array = Ini::parse($iniString);
```

使用 `parseFile` 方法解析文件的内容：

```php
$array = Ini::parseFile($filePath);
```

解析器还支持反向操作，从 PHP 数组输出 INI 格式。 您可以为此使用 `render` 方法：

```php
$iniString = Ini::render($array);
```

### October风格INI

传统上，PHP 函数 `parse_ini_string` 使用的 INI 解析器仅限于 3 级深度的数组。 例如：

```ini
level1Value = "foo"
level1Array[] = "bar"

[level1Object]
level2Value = "hello"
level2Array[] = "world"
level2Object[level3Value] = "停在这里"
```

受 HTML 表单语法的启发，October 使用 *October 风格的 INI* 扩展了此功能，以允许无限深度的数组。 继上述示例之后，支持以下语法：

```ini
[level1Object]
level2Object[level3Array][] = "耶！"
level2Object[level3Object][level4Value] = "耶！"
level2Object[level3Object][level4Array][] = "耶！"
level2Object[level3Object][level4Object][level5Value] = "耶！"
; ……无限深度！
```

## 动态语法解析器

Dynamic Syntax 是October独有的模板引擎，从根本上支持两种渲染模式。 解析模板将产生两个结果，**view** 或 **editor** 模式。 以这个模板文本为例，`{text}...{/text}`标签的内部代表**view**模式的默认文本，而内部属性`name`和`label `, 用作 **editor** 模式的属性。

```
<h1>{text name="websiteName" label="网站名称"}我们精彩的网站{/text}</h1>
```

这个解析器没有门面，所以完全限定的 `October\Rain\Parse\Syntax\Parser` 类应该与 `parse` 方法一起使用。 `parse` 方法的第一个参数将模板内容作为字符串并返回一个 `Parser` 对象。

```php
use October\Rain\Parse\Syntax\Parser as SyntaxParser;

$syntax = SyntaxParser::parse($content);
```

### 视图模式

假设我们使用上面的第一个示例作为模板内容，自己调用 `render` 方法将使用默认文本渲染模板：

```php
echo $syntax->render();
// <h1>我们精彩的网站</h1>
```

就像任何模板引擎一样，将变量数组传递给 `render` 的第一个参数将替换模板中的变量。 这里 `websiteName` 的默认值被我们的新值替换：

```php
echo $syntax->render(['websiteName' => 'October CMS']);
// <h1>October CMS</h1>
```

作为一项额外功能，调用 `toTwig` 方法将输出处于准备状态的模板，以供 [Twig 引擎](#twig-template-parser) 渲染。

```php
echo $syntax->toTwig();
// <h1>{{ websiteName }}</h1>
```

### 编辑器模式

到目前为止，动态语法解析器与常规模板引擎没有太大区别，但是编辑器模式是动态语法的实用性变得更加明显的地方。 编辑器模式开启了一个新的可能性领域，例如，[布局将自定义表单字段注入到属于它们的页面]（https://octobercms.com/plugin/rainlab-pages）或用于[电子邮件活动中的动态构建表单](https://octobercms.com/plugin/responsiv-campaign)。

继续上面的例子，在 `Parser` 对象上调用 `toEditor` 方法将返回一个 PHP 属性数组，这些属性定义了如何填充变量，例如由表单构建器。

```php
$array = $syntax->toEditor();
// 'websiteName' => [
//     'label' => '网站名称',
//     'default' => '我们精彩的网站',
//     'type' => 'text'
// ]
```

您可能会注意到这些属性与 [表单字段定义](../backend/forms.md#oc-defining-form-fields) 中的选项非常相似。 这是故意的，因此这两个功能相互补充。 我们现在可以轻松地将上面的数组转换为 YAML 并写入 `fields.yaml` 文件：

```php
$form = [
    'fields' => $syntax->toEditor()
];

File::put('fields.yaml', Yaml::render($form));
```

### 支持的标签

动态语法解析器可以使用多种标记类型，这些标记类型旨在匹配常见的 [表单字段类型](../backend/forms.md#oc-available-field-types)。

#### 文本

较小文本块的单行输入。

```
{text name="websiteName" label="网站名称"}我们精彩的网站{/text}
```

#### 文本域

用于较大文本块的多行输入。

```
{textarea name="websiteDescription" label="网站说明"}
    这是我们对未来事物的愿景
{/textarea}
```

#### 下拉

呈现下拉表单字段。

```
{dropdown name="dropdown" label="选一个" options="一|二"}{/dropdown}
```

呈现具有独立值和标签的下拉表单字段。

```
{dropdown name="dropdown" label="选一个" options="one:一|two:二"}{/dropdown}
```

使用静态类方法返回的数组呈现下拉表单字段(该类必须是完全命名空间的类)。

```
{dropdown name="dropdown" label="选一个" options="\Path\To\Class::method"}{/dropdown}
```

#### 单选

呈现一个单选表单字段。

```
{radio name="radio" label="想法？" options="y:是|n:否|m:也许"}{/radio}
```

#### 变量

完全按照 `type` 属性中的定义呈现表单字段类型。 该标签将简单地设置一个变量，并将在视图模式下呈现为一个空字符串。

```
{variable type="text" name="name" label="名字"}武志伟{/variable}
```

#### 富文本编辑器

富文本内容的输入 (所见即所得编辑)。

```
{richeditor name="content" label="主要内容"}默认文本{/richeditor}
```

在 Twig 中呈现为

```twig
{{ content|raw }}
```

#### Markdown

Markdown 内容的文本输入。

```
{markdown name="content" label="Markdown内容"}默认文本{/markdown}
```

在 Twig 中呈现为

```twig
{{ content|md }}
```

#### 媒体查找器

媒体库项目的文件选择器。 此标记值将包含文件的相对路径。

```
{mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}
```

Renders in Twig as

```twig
{{ logo|media }}
```

#### 上传文件

文件的文件上传器输入。 此标记值将包含文件的完整路径。

```
{fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}
```

#### 颜色选择器

用于颜色选择的颜色选择器小部件。 此标记将包含选定的十六进制值。 您可以选择提供一个 `availableColors` 属性来定义可供选择的可用颜色。

```
{colorpicker name="bg_color" label="Background colour" allowEmpty="true" availableColors="#ffffff|#000000"}{/colorpicker}
```

#### 组合器

呈现包含其他字段的重复部分。

```
{repeater name="content_sections" prompt="添加另一个内容部分"}
    <h2>{text name="title" label="标题"}标题{/text}</h2>
    <p>{textarea name="content" label="内容"}内容{/textarea}</p>
{/repeater}
```

在 Twig 中呈现为

```twig
{% for fields in repeater %}
    <h2>{{ fields.title }}</h2>
    <p>{{ fields.content|raw }}</p>
{% endfor %}
```

调用 `$syntax->toEditor` 将为组合器字段返回一个不同的数组：

```php
'repeater' => [
    'label' => '网站名称',
    'type' => 'repeater',
    'fields' => [

        'title' => [
            'label' => '标题',
            'default' => '标题',
            'type' => 'text'
        ],
        'content' => [
            'label' => '内容',
            'default' => '内容',
            'type' => 'textarea'
        ]

    ]
]
```

repeater 字段还支持组模式，与动态语法解析器一起使用，如下所示：

```
{variable name="sections" type="repeater" prompt="添加其他部分" tab="部分"
        groups="$/author/plugin/repeater_fields.yaml"}{/variable}
```

这是 repeater_fields.yaml 组配置文件的示例：

```yaml
quote:
    name: 报价
    description: 报价项目
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: 报价仓位
            type: radio
            options:
                left: 左
                center: 中
                right: 右
        quote_content:
            span: auto
            label: 细节
            type: textarea
```

有关组合器组模式的更多信息，请参阅 [循环小部件](../backend/forms.md#oc-repeater)。
