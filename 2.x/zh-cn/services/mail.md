# 电子邮件

## 介绍

October CMS 为 SMTP、Mailgun、SparkPost、Amazon SES、PHP 的`mail`功能和`sendmail`提供驱动程序，让您可以通过您选择的本地或基于云服务快速开始发送邮件。 有两种方法可以配置邮件服务，通过 *Settings(设置) > Mail settings(邮件设置)* 使用后端界面或更新默认配置值。 在这些示例中，我们将更新配置值。

### 驱动程序先决条件

在使用 Mailgun、SparkPost 或 SES 驱动程序之前，您需要安装 [驱动程序插件](https://octobercms.com/plugin/october-drivers)。

#### Mailgun 驱动程序

要使用 Mailgun 驱动程序，请将 `config/mail.php` 配置文件中的 `driver` 选项设置为 `mailgun`。 接下来，验证您的 `config/services.php` 配置文件是否包含以下选项：

```php
'mailgun' => [
    'domain' => 'your-mailgun-domain',
    'secret' => 'your-mailgun-key',
    'endpoint' => 'api.mailgun.net', // api.eu.mailgun.net 欧盟使用
],
```

#### SparkPost 驱动程序

要使用 SparkPost 驱动程序，请将 `config/mail.php` 配置文件中的 `driver` 选项设置为 `sparkpost`。 接下来，验证您的 `config/services.php` 配置文件是否包含以下选项：

```php
'sparkpost' => [
    'secret' => 'your-sparkpost-key',
],
```

#### SES 驱动程序

要使用 Amazon SES 驱动程序，请将 `config/mail.php` 配置文件中的 `driver` 选项设置为 `ses`。 然后，验证您的 `config/services.php` 配置文件是否包含以下选项：

```php
'ses' => [
    'key' => 'your-ses-key',
    'secret' => 'your-ses-secret',
    'region' => 'ses-region',  // 例如 us-east-1
],
```

## 发送邮件

要发送消息，请使用 `Mail` 门面上的 `send` 方法，该方法接受三个参数。 第一个参数是唯一的*邮件代码*，用于定位 [邮件视图](#oc-mail-views) 或 [邮件模板](#oc-mail-templates)。 第二个参数是您希望传递给视图的数据数组。 第三个参数是 `Closure` 回调，它接收消息实例，允许您自定义邮件消息的收件人、主题和其他方面：

```php
// 这些变量在消息中作为 Twig 可用
$vars = ['name' => 'Joe', 'user' => 'Mary'];

Mail::send('acme.blog::mail.message', $vars, function($message) {

    $message->to('admin@domain.tld', 'Admin Person');
    $message->subject('这是一个提醒');

});
```

由于我们在上面的示例中传递了一个包含 `name` 键的数组，因此我们可以使用以下 Twig 标记在我们的电子邮件视图中显示该值：

```twig
{{ name }}
```

> **注意**：你应该避免在你的消息中传递一个 `message` 变量，这个变量总是被传递并且允许 [内联嵌入附件](#oc-attachments)。

#### 快速发送

October还包括一种名为 `sendTo` 的替代方法，可以简化发送邮件：

```php
// 发送到不使用姓名的地址
Mail::sendTo('admin@domain.tld', 'acme.blog::mail.message', $params);

// 使用对象的属性发送
Mail::sendTo($user, 'acme.blog::mail.message', $params);

// 发送到多个地址
Mail::sendTo(['admin@domain.tld' => 'Admin Person'], 'acme.blog::mail.message', $params);

// 或者发送不带参数的原始消息
Mail::rawTo('admin@domain.tld', 'Hello friend');
```

`sendTo` 中的第一个参数用于收件人，可以采用不同的值类型：

类型 | 描述
------------- | -------------
String | 单个收件人地址，未定义名称。
Array | 多个收件人，其中数组键是地址，值是名称。
Object | 单个收件人对象，其中 *email* 属性用于地址，*name* 可选地用于名称。
Collection | 接收者对象的集合，如上。

`sendTo` 的完整签名如下：

```php
Mail::sendTo($recipient, $message, $params, $callback, $options);
```

- `$recipient` 的定义如上。
- `$message` 是原始发送的模板名称或消息内容。
- `$params` 变量数组在模板中可用。
- `$callback` 使用一个参数调用，即为 `send` 方法描述的消息构建器 (可选，默认为 null)。 如果不是可调用值，则用作下一个选项参数的替代品。
- `$options` 自定义发送选项作为数组传递 (可选)

支持以下自定义发送`$options`

- **queue** 指定是对消息进行排队还是直接发送(可选，默认为 false)。
- **bcc** 指定是否将收件人添加为密件抄送或常规收件人地址(默认为 false)。

#### 构建消息

如前所述，`send`方法的第三个参数是`Closure`，允许您在电子邮件消息本身上指定各种选项。 使用此闭包，您可以指定消息的其他属性，例如抄送、密件抄送等：

```php
Mail::send('acme.blog::mail.welcome', $vars, function($message) {
    $message->from('us@example.com', 'October');
    $message->to('foo@example.com')->cc('bar@example.com');
});
```

以下是 `$message` 消息构建器实例上可用方法的列表：

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

// 从原始 $data 字符串附加文件...
$message->attachData($data, $name, array $options = []);

// 获取底层 SwiftMailer 消息实例...
$message->getSwiftMessage();
```

> **注意**：传递给 `Mail::send` 闭包的消息实例扩展了 [SwiftMailer](http://swiftmailer.org) 消息类，允许您调用该类的任何方法来构建您的电子邮件 - 邮件消息。

#### 邮寄纯文本

默认情况下，`send` 方法的视图假定包含一个 [邮件视图](#oc-mail-views)，除了 HTML 视图之外，您还可以在其中指定要发送的纯文本视图。

```php
Mail::send('acme.blog::mail.message', $data, $callback);
```

或者，如果您只需要发送纯文本电子邮件，您可以使用数组中的 `text` 键指定：

```php
Mail::send(['text' => 'acme.blog::mail.text'], $data, $callback);
```

#### 发送解析的原始字符串

如果您希望直接通过电子邮件发送原始字符串，可以使用 `raw` 方法。 此内容将由 Markdown 解析。

```php
Mail::raw('电子邮件文本', function ($message) {
    //
});
```

此外，这个字符串将由 Twig 解析，如果你想将变量传递给这个环境，请使用 `send` 方法，将内容作为 `raw` 键传递。

```php
Mail::send(['raw' => '电子邮件文本'], $vars, function ($message) {
    //
});
```

#### 发送原始字符串

如果您传递包含 `text` 或 `html` 键的数组，这将是发送邮件的显式请求。 不使用布局或Markdown解析。

```php
Mail::raw([
    'text' => '这是纯文本',
    'html' => '<strong>这是HTML</strong>'
], function ($message) {
    //
});
```

<a id="oc-attachments"></a>
### 附件

要将附件添加到电子邮件中，请在传递给闭包的 `$message` 对象上使用 `attach` 方法。 `attach` 方法接受文件的完整路径作为其第一个参数：

```php
Mail::send('acme.blog::mail.welcome', $data, function ($message) {
    //

    $message->attach($pathToFile);
});
```

将文件附加到消息时，您还可以通过将 `array` 作为第二个参数传递给 `attach` 方法来指定显示名称和/或 MIME 类型：

```php
$message->attach($pathToFile, ['as' => $display, 'mime' => $mime]);
```

### 内联附件

#### 在邮件内容中嵌入图像

将内嵌图像嵌入到您的电子邮件中通常很麻烦； 但是，有一种方便的方法可以将图像附加到您的电子邮件并检索适当的 CID。 要嵌入内嵌图像，请在电子邮件视图中的 `message` 变量上使用 `embed` 方法。 请记住，`message` 变量可用于所有邮件视图：

```twig
<body>
    这是一张图片:

    <img src="{{ message.embed(pathToFile) }}">
</body>
```

如果您打算使用排队的电子邮件，请确保文件的路径是绝对的。 为此，您可以简单地使用 [app过滤器](../markup/filter-app.md)：

```twig
<body>
    这是一张图片:
    {% set pathToFile = 'storage/app/media/path/to/file.jpg'|app %}
    <img src="{{ message.embed(pathToFile) }}">
</body>
```

#### 在邮件内容中嵌入原始数据

如果您已经有一个想要嵌入到电子邮件消息中的原始数据字符串，您可以在 `message` 变量上使用 `embedData` 方法：

```twig
<body>
    Here is an image from raw data:

    <img src="{{ message.embedData(data, name) }}">
</body>
```

### 排队邮件

#### 排队邮件消息

由于发送邮件消息会大大延长应用程序的响应时间，因此许多开发人员选择将消息排队以进行后台发送。 这很容易使用内置的 [统一队列 API](../services/queues.md)。 要对邮件消息进行排队，请使用 `Mail` 门面的 `queue` 方法：

```php
Mail::queue('acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

此方法将自动处理将作业推送到队列中以在后台发送邮件消息。 当然，在使用此功能之前，您需要 [配置您的队列](../services/queues.md)。

#### 延迟消息队列

如果您希望延迟发送排队的电子邮件，您可以使用`later`方法。 要开始，只需将您希望延迟发送消息的秒数作为第一个参数传递给该方法：

```php
Mail::later(5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

#### 推送到特定队列

如果你想指定一个特定的队列来推送消息，你可以使用 `queueOn` 和 `laterOn` 方法：

```php
Mail::queueOn('queue-name', 'acme.blog::mail.welcome', $data, function ($message) {
    //
});

Mail::laterOn('queue-name', 5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

<a id="oc-message-content"></a>
## 消息内容

可以使用邮件视图或邮件模板在October发送邮件消息。 邮件视图由文件系统中的应用程序或插件**/views**目录中提供。 而邮件模板是通过 *System(系统) > Mail templates(邮件模板)* 使用后端界面管理的。 所有邮件消息都支持使用 Twig 进行标记。

或者，可以使用 `registerMailTemplates` 方法[在插件注册文件中注册](#oc-registering-mail-layouts-templates-partials)邮件视图。 这将自动生成一个邮件模板，并允许使用后端界面对其进行自定义。

<a id="oc-mail-views"></a>
### 邮件浏览量

邮件视图驻留在文件系统中，使用的代码表示视图文件的路径。 例如，使用代码 **author.plugin::mail.message** 发送邮件将使用以下文件中的内容：

```
plugins/               <=== 插件目录
  author/              <=== "作者"目录
    plugin/            <=== "插件"目录
      views/           <=== 视图目录
        mail/          <=== "邮件"目录
          message.htm  <=== "消息"段
```

邮件视图文件中的内容最多可以包括 3 个部分：**配置**、**纯文本**和**HTML 标记**。 部分用 `==` 序列分隔。 例如：

```twig
subject = "您的产品已添加到October CMS项目"
==

嗨 {{ name }},

好消息！ 用户 {{ user }} 刚刚将您的产品"{{ product }}"添加到项目中。

此邮件未使用格式(纯文本)发送
==

<p>嗨 {{ name }},</p>

<p>好消息！ 用户 {{ user }} 刚刚将您的产品 <strong>{{ product }}</strong>添加到项目中</p>

<p>此电子邮件是使用格式 (HTML) 发送的</p>
```

> **注意**：邮件视图中支持基本的 Twig 标签和表达式。 还支持 Markdown 语法，有关详细信息，请参阅 [在 Markdown 中使用 HTML](../services/parser.md#oc-using-html-in-markdown) 部分。

**plain text** 部分是可选的，视图只能包含配置和 HTML 标记部分。

```twig
subject = "您的产品已添加到October CMS项目"
==

<p>嗨 {{ name }},</p>

<p>此电子邮件不支持纯文本。</p>

<p>对此感到抱歉！</p>
```

#### 配置部分

配置部分设置邮件视图参数。 支持以下配置参数：

参数 | 描述
------------- | -------------
**subject** | 邮件主题，必填。
**layout** | [邮件布局](#oc-mail-layouts) 代码，可选。 默认值为`default`。

<a id="oc-mail-templates"></a>
### 使用邮件模板

邮件模板驻留在数据库中，可以通过*Settings(设置) > Mail(邮件) > Mail templates(邮件模板)* 在后端区域中创建。 模板中指定的**code**是唯一标识符，一旦创建就不能更改。

发送这些电子邮件的过程是相同的。 例如，如果您使用代码 *this.is.my.email* 创建模板，您可以使用以下 PHP 代码发送它：

```php
Mail::send('this.is.my.email', $data, function($message) use ($user)
{
    // ...
});
```

> **注意**：如果系统中不存在邮件模板，此代码将尝试查找具有相同代码的邮件视图。

#### 自动生成的模板

邮件模板也可以通过[已注册的邮件视图](#oc-registering-mail-layouts-templates-partials)自动生成。 **code** 值将与邮件视图路径相同(例如：author.plugin:mail.message)。如果邮件视图定义了 **layout** 参数，这将用于为模板提供布局。

首次保存生成的模板时，在发送邮件时将使用自定义的内容。 在这种情况下，可以将邮件视图视为*默认视图*。

<a id="oc-mail-layouts"></a>
### 使用邮件布局

可以通过选择 *Settings(设置) > Mail(邮件) > Mail templates(邮件模板)* 并单击 *Layouts* 选项卡来创建邮件布局。这些行为就像 CMS 布局一样，它们包含邮件消息的脚手架。邮件视图和模板支持使用邮件布局。

默认情况下，October带有两种主要的邮件布局：

布局 |代码 |描述
------------- | ------------- | -------------
Default | default | 用于面向公众的前端邮件
System | system | 用于内部、后端邮件

<a id="oc-registering-mail-layouts-templates-partials"></a>
### 注册邮件布局、模板和部件

邮件视图可以注册为模板，这些模板在后端自动生成，以供定制。 可以通过 *Settings(设置) > Mail templates(邮件模板)* 菜单自定义邮件模板。 可以通过覆盖 [插件注册类](../plugin/registration.md#oc-registration-file) 的 `registerMailTemplates` 方法来注册模板。

```php
public function registerMailTemplates()
{
    return [
        'rainlab.user::mail.activate',
        'rainlab.user::mail.restore'
    ];
}
```

该方法应返回 [邮件视图名称](#oc-mail-views) 的数组。

与模板一样，邮件部件和布局可以通过覆盖 [插件注册类](../plugin/registration.md#oc-registration-file) 的 `registerMailPartials` 和 `registerMailLayouts` 方法来注册。

```php
public function registerMailPartials()
{
    return [
        'tracking'  => 'acme.blog::partials.tracking',
        'promotion' => 'acme.blog::partials.promotion',
    ];
}

public function registerMailLayouts()
{
    return [
        'marketing'    => 'acme.blog::layouts.marketing',
        'notification' => 'acme.blog::layouts.notification',
    ];
}
```

这些方法应返回 [邮件视图名称](#oc-mail-views) 的数组。数组键将用作部件或布局的 `code` 属性。

### 全局变量

您可以使用 `View::share` 方法注册对所有邮件模板全局可用的变量。

```php
View::share('site_name', 'October CMS');
```

可以在 [插件注册文件](../plugin/registration.md) 的 register 或 boot 方法中调用此代码。使用上面的示例，变量 `{{ site_name }}` 将在所有邮件模板中可用。

## 邮件和本地开发

在开发发送电子邮件的应用程序时，您可能不希望实际将电子邮件发送到实时电子邮件地址。有几种方法可以"禁用"电子邮件消息的实际发送。

#### 日志驱动

一种解决方案是在本地开发期间使用 `log` 邮件驱动程序。此驱动程序会将所有电子邮件消息写入您的日志文件以供检查。有关按环境配置应用程序的更多信息，请查看 [配置文档](../setup/configuration.md)。

#### 通用

另一种解决方案是为框架发送的所有电子邮件设置一个通用收件人。这样，您的应用程序生成的所有电子邮件都将发送到特定地址，而不是发送消息时实际指定的地址。这可以通过 `config/mail.php` 配置文件中的 `to` 选项来完成：

```php
'to' => [
    'address' => 'dev@example.com',
    'name' => '开发示例'
],
```

#### 伪装邮件模式

您可以使用 `Mail::pretend` 方法动态禁用发送邮件。当邮件程序处于伪装模式时，消息将被写入应用程序的日志文件，而不是发送给收件人。

```php
Mail::pretend();
```
