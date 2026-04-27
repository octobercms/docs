---
subtitle: 使用简单的文件结构构建您的网站。
---
# 主题

::: aside
活动主题通过 `config/cms.php` 文件中的 `active_theme` 项或通过 **设置 → 前端主题** 后端面板进行设置。后端设置会覆盖 `config/cms.php` 文件中的值。
:::

主题完全基于文件，可以使用任何版本控制系统（例如 Git）进行管理。本页为您提供 October CMS 主题的高级描述。您将在下面的相关文章中找到有关页面、部件、布局和内容文件的更多详细信息。

主题是默认位于 **themes** 目录中的目录。主题可以包含以下对象：

对象 | 描述
------------- | -------------
[页面](./pages.md) | 代表网站页面。
[部件](./partials.md) | 包含可重用的 HTML 标记块。
[布局](./layouts.md) | 定义页面脚手架。
[内容文件](./content.md) | 可以与页面或布局分开编辑的文本、HTML 或 [Markdown](http://daringfireball.net/projects/markdown/syntax) 块。
**资产文件** | 是图片、CSS 和 JavaScript 文件等资源文件。

## 目录结构

下面，您可以看到一个示例主题目录结构。每个主题代表一个单独的目录，通常一个主题处于活动状态以显示网站。此示例演示了 **website** 主题目录。

::: dir
├── themes
|   └── website  _← 主题从此处开始_
|       ├── `pages`
|       │   └── index.htm
|       ├── `layouts`
|       │   └── default.htm
|       ├── `partials`
|       │   └── sidebar.htm
|       ├── `content`
|       │   └── footer-contacts.md
|       └── `assets`
|           ├── css
|           |   └── my-styles.css
|           ├── js
|           └── images
:::

### 子目录

October CMS 为 **pages**、**partials**、**layouts** 和 **content** 文件支持最多五层子目录深度，而 **assets** 目录可以有无限深度。这种方法简化了大型网站的组织。在下面的示例目录结构中，**pages** 和 **partials** 目录包含 **blog** 子目录，**content** 目录包含 **home** 子目录。

::: dir
├── themes
|   └── website
|       ├── pages
|       │   ├── index.htm
|       │   └── `blog`  _← 页面子目录_
|       │       ├── index.htm
|       │       └── category.htm
|       ├── layouts
|       │   └── default.htm
|       ├── partials
|       │   ├── sidebar.htm
|       │   └── `blog`  _← 部件子目录_
|       │       └── category-list.htm
|       ├── content
|       │   ├── footer-contacts.md
|       │   └── `home`  _← 内容子目录_
|       │       └── intro.md
|       └── assets
:::

要引用子目录中的模板，请在模板名称前指定子目录名称。例如，从 **blog** 子目录渲染 **category-list** 部件。

::: tip
模板路径始终是绝对路径。如果在一个部件中渲染同一子目录中的另一个部件，您仍然需要指定子目录名称。

```twig
{% partial "blog/category-list" %}
```
:::

## 模板结构

页面、部件和布局模板最多可以包含 3 个部分：**配置部分**、**PHP 代码部分**和 **Twig 标记部分**。各部分用 `==` 序列分隔。

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
function onStart()
{
    $this['posts'] = [...];
}
```
```twig
<h3>Blog archive</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```
:::

### 配置部分

配置部分设置模板参数。支持的配置参数因不同的 CMS 模板而异，并在其相应的文档文章中进行描述。配置部分使用简单的 [INI 格式](http://en.wikipedia.org/wiki/INI_file)，其中字符串参数值用引号括起来。以下是页面模板的配置部分示例：

```ini
url = "/blog"
layout = "default"

[component]
parameter = "value"
```

### PHP 代码部分

PHP 代码部分中的代码在模板每次渲染之前执行。PHP 代码部分对于所有 CMS 模板都是可选的，其内容取决于定义它的模板类型。PHP 代码部分可以包含可选的 PHP 开始和结束标签，以在文本编辑器中启用语法高亮。开始和结束标签应始终放在与部分分隔符 `==` 不同的行上。

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
<?
function onStart()
{
    $this['posts'] = [...];
}
?>
```
```twig
<h3>Blog archive</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```
:::

在 PHP 代码部分中，您只能定义函数并使用 PHP `use` 关键字引用命名空间。PHP 代码部分中不允许其他 PHP 代码。这是因为 PHP 代码部分在页面解析时会被转换为 PHP 类。以下是使用命名空间引用的示例。

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
<?
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::get();
}
?>
```
```twig
```
:::

作为设置变量的通用方式，您应该在 `$this` 上使用数组访问方法，但为了简便，您可以**以只读方式使用对象访问**，例如：

```php
// Write via array
$this['foo'] = 'bar';

// Read via array
echo $this['foo'];

// Read-only via object
echo $this->foo;
```

当定义函数时，它们可以通过 PHP 中的 `$this` 属性和 Twig 中的 `this` 变量作为方法使用。以下示例定义了一个 **doSomething** 函数，并在两个地方调用该方法。

::: cmstemplate
```ini
url = "/"
```
```php
function onStart()
{
    $this['foo'] = $this->doSomething();
}

function doSomething()
{
    return 'bar';
}
```
```twig
<h3>{{ this.doSomething() }}</h3>
```
:::

### Twig 标记部分

Twig 部分定义了模板要渲染的标记。在 Twig 部分中，您可以使用 [October CMS 提供的](../../markup/templating.md)函数、标签和过滤器，所有[原生 Twig 功能](https://twig.symfony.com/doc/)，或[插件提供的功能](../../extend/twig-tags.md)。Twig 部分的内容取决于模板类型（页面、布局或部件）。您可以在文档的后续部分找到有关特定 Twig 对象的更多信息。

::: tip
更多信息可以在[标记指南](../../markup/templating.md)中找到。
:::

## 主题日志

由于布局和页面将大部分数据存储在平面文件中，您或您的客户可能会意外丢失内容。例如，切换页面的布局将修改页面的脚手架，因此会导致数据丢失。

October CMS 可以记录对主题所做的每一项更改，这称为主题日志，此功能默认处于禁用状态。要启用主题日志，请转到 **设置 → 日志设置** 并启用 **记录主题更改**。

您现在可以通过 **设置 → 主题日志** 查看主题更改日志，在那里您可以查看每项更改的概述。如有必要，您可以使用此信息来决定适当的操作以帮助回退这些更改。

#### 另请参阅

::: also
* [CMS 标记指南](../../markup/templating.md)
:::
