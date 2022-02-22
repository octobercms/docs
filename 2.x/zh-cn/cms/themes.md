# 主题

主题定义了使用 October CMS 构建的网站或 Web 应用程序的外观。它们完全由文件支持，可以使用任何版本控制系统进行管理，例如 Git。此页面为您提供了October主题的高级描述。您将在相应的文章中找到有关 [页面](pages.md)、[部件](partials.md)、[布局](layouts.md) 和 [内容文件](content.md) 的更多详细信息。

主题是默认情况下驻留在 **themes** 目录中的目录。主题可以包含以下对象：

对象 |描述
------------- | -------------
[页面](pages.md) |代表网站页面。
[部件](partials.md) |包含可重用的 HTML 标记块。
[布局](layouts.md) |定义页面脚手架。
[内容文件](content.md) |可以与页面或布局分开编辑的文本、HTML 或 [Markdown](http://daringfireball.net/projects/markdown/syntax) 块。
**资产文件** |是资源文件，如图像、CSS 和 JavaScript 文件。

## 目录结构

下面，您可以看到一个示例主题目录结构。每个主题代表一个单独的目录，通常，一个主题是活动的以显示网站。此示例演示 **website** 主题目录。

```
themes/
  website/           <===  主题从这里开始
    pages/           <===  页面文件
      home.htm
    layouts/         <===  布局文件
      default.htm
    partials/        <===  部件文件
      sidebar.htm
    content/         <===  内容文件
      intro.htm
    assets/          <===  资产文件
      css/
        my-styles.css
      js/
      images/
```

> 活动主题通过`config/cms.php` 文件中的`active_theme` 参数或System > CMS > Front-end(中文后台可在设置>前端主题中选择)后端页面上的主题选择器设置。 使用主题选择器设置的主题会覆盖 `config/cms.php` 文件中的值。

### 子目录

October CMS 支持 **pages**、**partials**、**layouts** 和 **content** 文件的单级子目录，而 **assets** 目录可以具有无限的深度。 这种方法简化了大型网站的组织。 在下面的示例目录结构中，**pages** 和 **partials** 目录包含 **blog** 子目录，**content** 目录包含 **home** 子目录。

```
themes/
  website/
    pages/
      home.htm
      blog/                  <===  页面子目录
        archive.htm
        category.htm
    partials/
      sidebar.htm
      blog/                  <===  部件子目录
        category-list.htm
    content/
      footer-contacts.txt
      home/                  <===  内容子目录
        intro.htm
    ...
```

要引用子目录中的模板，请在模板名称之前指定子目录的名称。 例如，从 **blog** 子目录渲染 **category-list** 部件。

```twig
{% partial "blog/category-list" %}
```

> **注意**：模板路径总是绝对的。 如果在一个部件中，您从同一子目录渲染另一个部件，您仍然需要指定子目录的名称。

## 模板结构

页面、部件和布局模板最多可以包含 3 个部分：**配置**、**PHP 代码** 和 **Twig 标记**。 每个部分用 `==` 序列分隔。

```
url = "/blog"
layout = "default"
==
function onStart()
{
    $this['posts'] = ...;
}
==
<h3>博客存档</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```

### 配置部分

配置部分设置模板参数。 支持的配置参数特定于不同的 CMS 模板，并在其相应的文档文章中进行了描述。 配置部分使用简单的 [INI格式](http://en.wikipedia.org/wiki/INI_file)，其中字符串参数值用引号括起来。 页面模板的示例配置部分：

```ini
url = "/blog"
layout = "default"

[component]
parameter = "value"
```

<a id="oc-php-section"></a>
### PHP 代码部分

PHP 部分中的代码每次在呈现模板之前都会执行。 PHP 部分对于所有 CMS 模板都是可选的，其内容取决于定义它的模板类型。 PHP 代码部分可以包含可选的打开和关闭 PHP 标记，以在文本编辑器中启用语法高亮显示。 打开和关闭标签应始终在与节分隔符 `==` 不同的行上指定。

```
url = "/blog"
layout = "default"
==
<?
function onStart()
{
    $this['posts'] = ...;
}
?>
==
<h3>博客存档</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```

在 PHP 部分，您只能定义函数并使用 PHP `use` 关键字引用命名空间。 PHP 部分中不允许使用其他 PHP 代码。 这是因为在解析页面时，PHP 部分会转换为 PHP 类。 使用命名空间引用的示例：

```
url = "/blog"
layout = "default"
==
<?
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::get();
}
?>
==
```

作为设置变量的一般方法，您应该在 `$this` 上使用数组访问方法，但为了简单起见，您可以使用 **object 访问作为只读**，例如：

```php
// 通过数组写入
$this['foo'] = 'bar';

// 通过数组读取
echo $this['foo'];

// 通过对象读取
echo $this->foo;
```

### Twig标记部分

Twig 部分定义了模板要呈现的标记。在 Twig 部分，您可以使用函数、标签和过滤器 [由 October CMS 提供](../markup.md)，所有 [native Twig 功能](https://twig.symfony.com/doc/) ，或那些[由插件提供](../plugin/registration.md#oc-extending-twig)。 Twig 部分的内容取决于模板类型(页面、布局或部件)。您可以在文档中进一步找到有关特定 Twig 对象的更多信息。

可以在 [标记指南](../markup.md) 中找到更多信息。

## 数据库驱动的主题

在某些情况下，您可能无权写入文件系统以更改主题。数据库驱动的主题允许您将 CMS 模板的所有更改存储在数据库中。

要为单个主题启用此功能，请导航至 **Settings(设置) > Frontend Theme(前端主题)**，选择 **Edit Properties(编辑属性)** 并选中名为 **Save Changes in Database(在数据库中保存更改)** 的复选框。

或者，您可以使用配置项 `cms.database_templates` 或使用环境变量为所有主题全局启用此功能。

    CMS_DB_TEMPLATES=true

> **注意**：图像和样式表等资产文件不会保存在数据库中，并且无法在没有访问文件系统的情况下进行修改。

## 子主题

子主题允许主题继承的可能性。当您有第三方主题或处于只读模式的主题时，这是一个很好的用途。子主题将引用父主题并将其用作备份。

如果父主题中存在名为“home.htm”的页面但子主题中不存在，则将其视为相同； URL 处于活动状态，您可以像往常一样打开页面。在后端区域保存页面时，会在子主题中创建一个新文件来覆盖内容。

要为主题启用此功能，请导航至 **Settings(设置) > Frontend Theme(前端主题)**，选择 **Edit Properties(编辑属性)** 并从 **Parent Theme(父主题)** 下拉列表中选择父项。

### 主题锁定文件

从第三方安装主题时，需要注意的是，当主题更新时，所有文件都可能被覆盖。这可能会导致对主题所做的任何自定义丢失。作为一种安全机制，包含一个名为 `.themelock` 的文件以保护主题免受系统更新期间可能丢失的任何更改。

当文件`.themelock` 出现在主题目录中时：

- 主题只能被选为父主题
- 主题不会出现在后端 UI 中
- 主题不能被选为活动的

## 主题日志

由于布局和页面将大部分数据存储在静态文件中，您或您的客户可能会意外丢失内容。例如，切换页面布局会修改页面的结构，因此会导致数据丢失。

October CMS 可以记录对主题所做的每个更改，称为主题日志记录，默认情况下禁用此功能。要启用主题日志，请转至 **设置 > 日志设置** 并启用 **日志主题更改**。

您现在可以通过 **设置 > 主题日志** 查看主题更改日志，您可以在其中查看每个更改的概述。如有必要，您可以使用此信息来决定适当的操作来帮助恢复这些更改。