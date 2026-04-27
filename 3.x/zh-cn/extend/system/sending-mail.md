---
subtitle: 了解如何发送邮件和创建模板。
---
# 发送邮件

本文介绍如何构建邮件内容，包括使用布局和局部视图，以及发送邮件的方法。邮件内容支持基本的 Twig 标签和表达式。也支持 Markdown 语法，详情请参阅[在 Markdown 中使用 HTML](../services/parser.md) 部分。

## 消息内容

在 October CMS 中，可以使用邮件视图或邮件模板发送邮件消息。邮件视图由应用程序或插件在文件系统的 **/views** 目录中提供。而邮件模板则通过后端面板中的 **设置 → 邮件模板** 进行管理。

可选地，邮件视图可以在[插件注册文件](../extending.md)中使用 `registerMailTemplates` 方法进行注册。这会自动生成邮件模板的种子数据，允许使用后端面板进行自定义。

### 在后端面板中定义模板

你可以通过后端面板中的 **设置 → 邮件模板** 创建存储在数据库中的邮件模板。赋予模板的**代码**是唯一标识符，创建后不能更改。

例如，如果你创建了一个代码为 `my-template` 的模板，你可以使用以下 PHP 代码发送它：

```php
Mail::send('my-template', $data, function($message) {
    // ...
});
```

::: tip
如果系统中不存在邮件模板，此代码将尝试在文件系统中查找具有相同代码的邮件视图。
:::

### 在后端面板中定义布局

可以通过选择 **设置 → 邮件模板** 并点击 **布局** 选项卡来创建邮件布局。它们的行为就像 CMS 布局一样，包含邮件消息的框架。邮件视图和模板支持使用邮件布局。

默认情况下，October CMS 提供两个默认邮件布局。

布局 | 代码 | 描述
------------- | ------------- | -------------
默认 | `default` | 用于面向公众的前端邮件。
系统 | `system` | 用于内部后端邮件。

### 在文件系统中定义视图

邮件视图位于文件系统中，使用的代码表示视图文件的路径。例如，使用代码 `author.plugin::mail.message` 发送邮件将使用以下文件中的内容。

::: dir
├── plugins
|   └── author  _← "author" 段_
|       └── myplugin  _← "plugin" 段_
|           └── `views`
|               └── mail  _← "mail" 段_
|                   └── message.htm  _← "message" 段_
:::

邮件视图文件中的内容最多可包含 3 个部分：**配置**、**纯文本**和 **HTML 标记**。各部分由 `==` 序列分隔。例如：

::: cmstemplate
```ini
subject = "Your product has been added to October CMS project"
```
```twig
Hi {{ name }},

Good news! User {{ user }} just added your product "{{ product }}" to a project.

This message was sent using no formatting (plain text)
```
```twig
<p>Hi {{ name }},</p>

<p>
    <strong>Good news!</strong>
    User {{ user }} just added your product "{{ product }}" to a project.
</p>

<p>This email was sent using formatting (HTML)</p>
```
:::

**纯文本**部分是可选的，视图可以只包含**配置**和 **HTML 标记**部分。也支持 Markup 语法作为替代语法。

::: cmstemplate
```ini
layout = "default"
subject = "Your product has been added to October CMS project"
```
```twig
Hi {{ name }},

**Good news!** User {{ user }} just added your product "{{ product }}" to a project.
```
:::

#### 配置部分

配置部分设置邮件视图属性。支持以下配置属性。

属性 | 描述
------------- | -------------
**subject** | 邮件消息主题，必填。
**layout** | 邮件布局代码或视图，可选。默认值为 `default`。

### 注册模板、布局和局部视图

::: aside
后端面板中的**代码**值将与邮件视图路径相同。例如，`author.plugin:mail.message`。
:::

邮件视图可以注册为在后端面板中创建的默认模板。模板通过覆盖[插件注册文件](../extending.md)的 `registerMailTemplates` 方法进行注册。模板可以实现局部视图和布局，类似于 CMS 主题，它们分别使用 `registerMailLayouts` 和 `registerMailPartials` 进行注册。

```php
public function registerMailTemplates()
{
    return [
        // ...Templates defined here
    ];
}

public function registerMailLayouts()
{
    return [
        // ...Layouts defined here
    ];
}

public function registerMailPartials()
{
    return [
        // ...Partials defined here
    ];
}
```

在后端面板中，当生成的模板首次保存时，自定义内容将在发送分配代码的邮件时使用。在此上下文中，注册的邮件视图可以被视为默认或后备视图。

#### 注册模板

注册数组中的 `templates` 键用于将视图注册为邮件模板。该方法应返回一个数组，其中键是模板代码，值是[视图路径](../services/response-view.md)的名称。模板代码用于引用模板。

```php
public function registerMailTemplates()
{
    return [
        'rainlab.user:activate' => 'rainlab.user::mail.activate',
        'rainlab.user:restore' => 'rainlab.user::mail.restore',
    ];
}
```

发送消息使用模板代码，例如。

```php
Mail::send('rainlab.user:activate', ...);
```

#### 注册布局

`registerMailLayouts` 方法覆盖用于注册布局，每个布局需要一个唯一的 `code` 来标识它，以及内容的默认视图文件。

```php
public function registerMailLayouts()
{
    return [
        'marketing' => 'acme.blog::layouts.marketing',
        'notification' => 'acme.blog::layouts.notification',
    ];
}
```

现在可以在模板中使用 `code` 值引用布局。

::: cmstemplate
```ini
layout = "marketing"
```
```twig
Page contents...
```
:::

#### 注册局部视图

与布局类似，邮件局部视图可以使用 `registerMailPartials` 方法覆盖进行注册，每个局部视图需要一个唯一的 `code` 来标识它，以及内容的默认视图文件。

```php
public function registerMailPartials()
{
    return [
        'tracking' => 'acme.blog::partials.tracking',
        'promotion' => 'acme.blog::partials.promotion',
    ];
}
```

现在可以在模板中使用 `{% partial %}` 标签和 `code` 值引用局部视图。

```twig
{% partial 'tracking' %}
```

#### 基于文件的布局

要引用基于文件的布局，你可以将视图代码传递给 **layout** 属性。例如，此邮件视图引用 `acme.blog::mail.custom-layout` 的布局。

```ini
layout = "acme.blog::mail.custom-layout"
subject = "Your product has been added to October CMS project"
==
...
```

使用上述代码，它将尝试从路径 **plugins/acme/blog/views/mail/custom-layout.htm** 加载布局内容，以下是内容示例。

```twig
<html>
<body>
    <h1>HTML Contents</h1>
    <div>
        {{ content|raw }}
    </div>
</body>
</html>
```

::: warning
基于文件的布局内容不能在管理面板中编辑。
:::

### 全局变量

你可以使用 `View::share` 方法注册所有邮件模板全局可用的变量。

```php
View::share('site_name', 'October CMS');
```

此代码可以在[插件注册文件](../plugin/registration.md)的 register 或 boot 方法中调用。使用上面的示例，变量 `{{ site_name }}` 将在所有邮件模板中可用。

## 发送邮件

要发送消息，使用 `Mail` 门面上的 `send` 方法，该方法接受三个参数。第一个参数是用于定位邮件视图或邮件模板的唯一邮件代码。第二个参数是你希望传递给视图的数据数组。第三个参数是一个 `Closure` 回调，它接收消息实例，允许你自定义收件人、主题和邮件消息的其他方面。

```php
// These variables are available inside the message as Twig
$vars = ['name' => 'Joe', 'user' => 'Mary'];

Mail::send('acme.blog:message', $vars, function($message) {
    $message->to('admin@domain.tld', 'Admin Person');
    $message->subject('This is a reminder');
});
```

由于我们在上面的示例中传递了一个包含 `name` 键的数组，我们可以在邮件视图中使用以下 Twig 标记显示该值。

```twig
{{ name }}
```

::: warning
你应避免在消息中传递 `message` 变量，此变量始终会传递，并允许内联嵌入附件。
:::

### 快速发送

October CMS 还包含一个名为 `sendTo` 的替代方法，可以简化邮件发送。

```php
// Send to address using no name
Mail::sendTo('admin@domain.tld', 'acme.blog:message', $params);

// Send using an object's properties
Mail::sendTo($user, 'acme.blog:message', $params);

// Send to multiple addresses
Mail::sendTo(['admin@domain.tld' => 'Admin Person'], 'acme.blog:message', $params);

// Alternatively send a raw message without parameters
Mail::rawTo('admin@domain.tld', 'Hello friend');
```

`sendTo` 中的第一个参数用于收件人，可以接受不同的值类型。

类型 | 描述
------------- | -------------
字符串 | 单个收件人地址，未定义名称。
数组 | 多个收件人，其中数组键是地址，值是名称。
对象 | 单个收件人对象，其中 *email* 属性用于地址，*name* 可选用于名称。
集合 | 收件人对象的集合，如上所述。

`sendTo` 的完整签名如下。

```php
Mail::sendTo($recipient, $message, $params, $callback, $options);
```

- `$recipient` 如上所定义。
- `$message` 是模板名称或用于原始发送的消息内容。
- `$params` 在模板内部可用的变量数组。
- `$callback` 使用一个参数调用，即如 `send` 方法所述的消息构建器（可选，默认为 null）。如果不是可调用值，则作为下一个选项参数的替代。
- `$options` 作为数组传递的自定义发送选项（可选）

支持以下自定义发送 `$options`。

选项 | 描述
------------- | -------------
**queue** | 指定是将消息排队还是直接发送，可选。默认值：`false`。
**bcc** | 指定是否将收件人添加为 Bcc 或常规 To 地址。默认值：`false`。

### 构建消息

如前所述，传递给 `send` 方法的第三个参数是一个 `Closure`，允许你指定邮件消息本身的各种选项。使用此闭包，你可以指定消息的其他属性，如抄送、密送等：

```php
Mail::send('acme.blog:welcome', $vars, function($message) {
    $message->from('us@example.tld', 'October');
    $message->to('foo@example.tld')->cc('bar@example.tld');
});
```

以下是 `$message` 消息构建器实例上可用方法的列表。

```php
$message->from($address, $name = null);
$message->sender($address, $name = null);
$message->to($address, $name = null);
$message->cc($address, $name = null);
$message->bcc($address, $name = null);
$message->replyTo($address, $name = null);
$message->subject($subject);
$message->priority($level);
$message->attach($pathToFile, array $options = []);

// Attach a file from a raw $data string...
$message->attachData($data, $name, array $options = []);
```

#### 发送纯文本邮件

默认情况下，传递给 `send` 方法的视图被假定为包含邮件视图，你可以指定一个纯文本视图，除 HTML 视图外一并发送。

```php
Mail::send('acme.blog:message', $data, $callback);
```

或者，如果你只需要发送纯文本邮件，可以使用数组中的 `text` 键来指定：

```php
Mail::send(['text' => 'acme.blog:text'], $data, $callback);
```

#### 发送解析的原始字符串

如果你希望直接通过邮件发送原始字符串，可以使用 `raw` 方法。此内容将由 Markdown 解析。

```php
Mail::raw('Text to e-mail', function ($message) {
    //
});
```

此外，此字符串将由 Twig 解析，如果你希望向此环境传递变量，请改用 `send` 方法，将内容作为 `raw` 键传递。

```php
Mail::send(['raw' => 'Text to email'], $vars, function ($message) {
    //
});
```

#### 发送原始字符串

如果你传递一个包含 `text` 或 `html` 键的数组，这将是一个明确的发送邮件请求。不使用布局或 Markdown 解析。

```php
Mail::raw([
    'text' => 'This is plain text',
    'html' => '<strong>This is HTML</strong>'
], function ($message) {
    //
});
```

### 发送附件

要向邮件添加附件，使用传递给闭包的 `$message` 对象上的 `attach` 方法。`attach` 方法接受文件的完整路径作为第一个参数：

```php
Mail::send('acme.blog:welcome', $data, function ($message) {
    //

    $message->attach($pathToFile);
});
```

当向消息附加文件时，你还可以通过将 `array` 作为 `attach` 方法的第二个参数传递来指定显示名称和/或 MIME 类型：

```php
$message->attach($pathToFile, ['as' => $display, 'mime' => $mime]);
```

### 内联附件

#### 在邮件内容中嵌入图片

将内联图片嵌入邮件通常很麻烦；但是，有一种便捷的方式可以将图片附加到邮件并获取适当的 CID。要嵌入内联图片，在邮件视图中使用 `message` 变量上的 `embed` 方法。请记住，`message` 变量在所有邮件视图中都可用：

```twig
<body>
    Here is an image:

    <img src="{{ message.embed(pathToFile) }}">
</body>
```

如果你计划使用队列邮件，请确保文件路径是绝对的。要实现这一点，你可以简单地使用 [app 过滤器](../../markup/filter/app.md)：

```twig
<body>
    Here is an image:
    {% set pathToFile = 'storage/app/media/path/to/file.jpg'|app %}
    <img src="{{ message.embed(pathToFile) }}">
</body>
```

#### 在邮件内容中嵌入原始数据

如果你已有一个原始数据字符串希望嵌入邮件消息中，可以使用 `message` 变量上的 `embedData` 方法：

```twig
<body>
    Here is an image from raw data:

    <img src="{{ message.embedData(data, name) }}">
</body>
```

## 邮件队列

### 将邮件消息排队

由于发送邮件消息可能会大幅延长应用程序的响应时间，许多开发者选择将消息排队以在后台发送。使用内置的[统一队列 API](../services/queue.md) 可以轻松实现。要将邮件消息排队，使用 `Mail` 门面上的 `queue` 方法：

```php
Mail::queue('acme.blog:welcome', $data, function ($message) {
    //
});
```

此方法将自动处理将作业推送到队列中以在后台发送邮件消息。当然，在使用此功能之前，你需要[配置队列](../services/queue.md)。

### 延迟消息排队

如果你希望延迟发送排队的邮件消息，可以使用 `later` 方法。要开始使用，只需将你希望延迟发送消息的秒数作为方法的第一个参数传递。

```php
Mail::later(5, 'acme.blog:welcome', $data, function ($message) {
    //
});
```

### 推送到特定队列

如果你希望指定将消息推送到哪个特定队列，可以使用 `queueOn` 和 `laterOn` 方法：

```php
Mail::queueOn('queue-name', 'acme.blog:welcome', $data, function ($message) {
    //
});

Mail::laterOn('queue-name', 5, 'acme.blog:welcome', $data, function ($message) {
    //
});
```

#### 另请参阅

::: also
* [邮件配置](../../setup/mail-config.md)
:::
