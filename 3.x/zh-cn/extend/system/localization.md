---
subtitle: 了解如何在后端区域翻译消息。
---
# 本地化

::: aside
此处定义的语言字符串仅在后端面板中加载。有关翻译前端内容，请访问[主题本地化文章](../../cms/themes/settings.md)。
:::

插件可以在 **lang** 子目录中包含本地化文件。插件本地化文件使用 JSON 格式，并由系统在后端面板中自动检测。后端用户界面菜单、表单标签等原生支持使用本地化字符串。

## 活动语言

你的应用程序的默认语言存储在 `config/app.php` 配置文件的 locale 配置选项中。你可以自由修改此值以适应你的应用程序需求。每个用户可以通过 **用户菜单 → 后端首选项** 设置他们的首选语言环境。

你可以在 PHP 中使用 `App::getLocale` 方法检查活动语言，并使用 `App::setLocale` 设置活动语言，该方法接受语言代码作为第一个参数。

```php
App::getLocale();

App::setLocale('fr');
```

## 本地化文件结构

以下是插件 **lang** 目录的示例。

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `lang`
|               ├── en.json  _← 本地化文件_
|               └── fr.json  _← 本地化文件_
:::

使用 JSON 文件进行本地化是首选的翻译方法，其中字符串使用"默认"翻译的字符串作为键。例如，如果你的应用程序有法语翻译，你应该创建一个 `lang/fr.json` 文件。

```json
{
    "I love programming.": "j'adore programmer"
}
```

::: tip
Laravel 提供了基于 PHP 的翻译方法作为使用 JSON 的受支持替代方案。查看 [Laravel 本地化文章](https://laravel.com/docs/10.x/localization)了解更多。
:::

## 访问本地化字符串

可以使用 `__()` 辅助函数通过传递字符串的默认翻译来加载本地化字符串。

```php
echo __('I love programming.');
```

通过将数组作为第二个参数传递，可以替换翻译字符串中的参数。每个参数都以 `:` 字符为前缀。

```php
echo __(':name loves programming.', ['name' => 'Jeff']);
```

### 复数化值

不同的语言可能有各种复杂的复数化规则。使用 `|` 字符，你可以区分字符串的单数和复数形式。

```json
{
    "There is one apple|There are many apples": "Il y a une pomme|Il y a beaucoup de pommes"
}
```

更复杂的复数化规则可以为多个值范围指定翻译字符串。

```json
{
    "{0} There are none|[1,19] There are some|[20,*] There are many": "..."
}
```

`trans_choice` 函数用于处理复数化值。

```php
echo __('There is one apple|There are many apples', 3);
```

## 覆盖本地化字符串

系统用户可以在不修改插件文件的情况下覆盖插件本地化字符串。这通过向 **lang** 目录添加本地化文件来完成。例如，要覆盖法语翻译，你应该在以下位置创建文件：

::: dir
├── app
|   └── `lang`
|       └── fr.json  _← 覆盖文件_
:::

该文件可以只包含你想要覆盖的字符串，无需替换整个文件。示例：

```json
{
    "I love programming.": "Coding is the best!"
}
```

某些插件可能附带自己的基于 PHP 的语言文件。你可以在同一位置覆盖这些文件。在 JSON 文件中使用完整的语言键，例如，要覆盖 `rainlab.blog::lang.post_label` 值。

```json
{
    "rainlab.blog::lang.post_label": "Article"
}
```

你也可以使用嵌套的文件夹结构来使用 PHP 格式覆盖文件。例如，名为 **Acme.Blog** 的插件将文件放在 `lang/acme/blog/en/lang.php`。

::: dir
├── app
|   └── lang
|       └── `acme`  _← 插件作者_
|           └── `todo`  _← 插件名称_
|               └── en
|                   └── lang.php  _← 覆盖文件_
:::

### 以编程方式覆盖字符串

你可以在 PHP 中使用 `Lang::set` 方法覆盖语言字符串。此方法接受语言键和新的翻译值作为参数。

```php
Lang::set('I love programming.', 'Coding is the best!');
```

默认情况下，这将覆盖活动的语言环境，第三个参数可以指定一个显式的语言环境。以下示例替换法语的值。

```php
Lang::set('I love programming.', 'Le codage est le meilleur!', 'fr');
```

## 贡献语言字符串

October CMS 使用名为 Crowdin 的服务来更好地管理热门语言的翻译。它还使用 Google 翻译 API 为所有其他语言执行自动机器翻译。如果你发现 October CMS 中有缺失或不正确的翻译，请按照以下说明操作。

### 使用 Crowdin

你可以使用以下链接检查你的语言是否受 Crowdin 项目支持。此服务允许你使用简化的界面贡献翻译。

- [October CMS Crowdin 项目页面](https://crowdin.com/project/octobercms)

如果你的语言未出现在此页面上，请按照下面的 GitHub 说明操作。当我们注意到某种语言在 GitHub 上变得更加活跃时，会将其添加到 Crowdin。

### 使用 GitHub

你可以访问 [GitHub 上的仓库](https://github.com/octobercms/october/tree/develop/modules)，通过拉取请求建议更新你的语言。语言文件分布在各个模块中，因此你可能需要检查多个文件才能找到正确的语言字符串。在此示例中，我们将使用 `nl` 语言代码修改荷兰语，并且我们知道该字符串位于 Tailor 模块中。

1. 打开 [GitHub 仓库](https://github.com/octobercms/october/tree/develop/modules)。
2. 点击 **tailor**，然后点击 **lang** 以打开 Tailor 的语言目录
3. 点击 **nl.json** 文件以打开荷兰语的语言文件
4. 在右上角，点击铅笔图标以**编辑此文件**

在文件中，你将看到左侧是英文版本，右侧是荷兰语版本，例如：

```json
{
  "Manage Entries": "Invoer beheren",
  "Create :name Entry": "Maak :name invoer"
}
```

更新时，仅修改右侧包含翻译值的部分。某些值可能包含变量，如 `:name`，这些应保持不变。完成后，点击 **Commit changes** 按钮提交新的 Pull Request。它将由团队审核并包含在后续版本中。

::: tip
如果语言键不存在或你找不到它，你可以[联系我们寻求帮助](https://octobercms.com/contact)。
:::

#### 另请参阅

::: also
* [主题本地化](../../cms/themes/localization.md)
* [Laravel 本地化](https://laravel.com/docs/10.x/localization)
:::
