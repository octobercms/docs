# 验证

验证器类是一个简单、方便的工具，用于验证数据和通过 `Validator` 类获取验证错误消息。它在处理终端用户提交的表单数据时非常有用。

::: tip
在处理模型时，October CMS 附带了一个有用的[验证 Trait](../database/traits.md)，它实现了 `Validator` 类并支持相同的规则定义。
:::

以下是所有可用验证规则的列表：

<div class="content-list" markdown="1">

- [Accepted](#rule-accepted)
- [Active URL](#rule-active-url)
- [After (Date)](#rule-after)
- [Alpha](#rule-alpha)
- [Alpha Dash](#rule-alpha-dash)
- [Alpha Numeric](#rule-alpha-num)
- [Array](#rule-array)
- [Before (Date)](#rule-before)
- [Between](#rule-between)
- [Boolean](#rule-boolean)
- [Confirmed](#rule-confirmed)
- [Date](#rule-date)
- [Date Format](#rule-date-format)
- [Different](#rule-different)
- [Digits](#rule-digits)
- [Digits Between](#rule-digits-between)
- [E-Mail](#rule-email)
- [Exists (Database)](#rule-exists)
- [Image (File)](#rule-image)
- [In](#rule-in)
- [Integer](#rule-integer)
- [IP Address](#rule-ip)
- [Max](#rule-max)
- [MIME Types](#rule-mimes)
- [Min](#rule-min)
- [Not In](#rule-not-in)
- [Nullable](#rule-nullable)
- [Numeric](#rule-numeric)
- [Regular Expression](#rule-regex)
- [Required](#rule-required)
- [Required If](#rule-required-if)
- [Required Unless](#rule-required-unless)
- [Required With](#rule-required-with)
- [Required With All](#rule-required-with-all)
- [Required Without](#rule-required-without)
- [Required Without All](#rule-required-without-all)
- [Same](#rule-same)
- [Size](#rule-size)
- [String](#rule-string)
- [Timezone](#rule-timezone)
- [Unique (Database)](#rule-unique)
- [Site Unique (Database)](#rule-site-unique)
- [URL](#rule-url)

</div>

## 基本用法

在大多数情况下，你应该首先捕获用户输入并将其传递给 `make` 方法（第一个参数），同时包含应该应用于数据的验证规则（第二个参数）。在以下示例中，我们使用 `post()` 助手函数捕获回发的用户输入。

```php
$data = post();

$validator = Validator::make($data, [
    'name' => 'required|min:5'
]);
```

多个规则可以使用"管道"字符分隔，也可以作为数组的单独元素。

```php
$validator = Validator::make($data, [
    'name' => ['required', 'min:5']
]);
```

要验证多个字段，只需将它们添加到数组中。

```php
$data = [
    'name' => 'Joe',
    'password' => 'lamepassword',
    'email' => 'email@example.tld'
];

$validator = Validator::make($data, [
    'name' => 'required',
    'password' => 'required|min:8',
    'email' => 'required|email|unique:users'
]);
```

### 检查验证结果

一旦创建了 `Validator` 实例，就可以使用 `fails`（或 `passes`）方法执行验证。

```php
if ($validator->fails()) {
    // 给定的数据未通过验证
}
```

如果验证失败，你可以从验证器获取错误消息。

```php
$messages = $validator->messages();
```

你也可以访问失败的验证规则数组（不含消息）。为此，请使用 `failed` 方法：

```php
$failed = $validator->failed();
```

### 验证文件

`Validator` 类提供了多种验证文件的规则，如 `size`、`mimes` 等。验证文件时，你只需将它们与其他数据一起传递给验证器。

```php
$data = files() + post();

$validator = Validator::make($data, [...]);
```

::: warning
不建议在此处使用未过滤的 `input()` 值，因为它包含 GET 值，可能被用于制作恶意链接。
:::

## 抛出验证异常

在大多数情况下，你将验证用户使用表单提交的输入，如果验证失败，抛出 `ValidationException` 是一个兼容的操作。作为验证表单的更简短方式，你可以直接使用 `validate` 方法。

```php
$data = Validator::validate($data, $rules);
```

::: tip
`validate` 方法返回已过滤的用户数据，即已验证的属性和值。
:::

上述方法执行与以下代码等效的功能。它还演示了如何将验证器实例直接传递给[验证异常](../system/exceptions.md)（第一个参数）。

```php
$validation = Validator::make($data, $rules);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

### 验证请求

另一个选项是使用 `Request` 门面对所有用户输入执行验证。这消除了提供数据的需要，因此你只需提供规则（第一个参数）。`validate` 方法返回已过滤的用户数据，即已验证的属性和值。

```php
$data = Request::validate($rules);
```

`validate` 的返回值由验证规则过滤。如果字段未在规则中定义，则不会包含在此数据中。

## 处理错误消息

在 `Validator` 实例上调用 `messages` 方法后，你将收到一个 `Illuminate\Support\MessageBag` 实例，它提供了各种便捷方法来处理错误消息。

#### 获取字段的第一条错误消息

```php
echo $messages->first('email');
```

#### 获取字段的所有错误消息

```php
foreach ($messages->get('email') as $message) {
    //
}
```

#### 获取所有字段的所有错误消息

```php
foreach ($messages->all() as $message) {
    //
}
```

#### 确定字段是否存在消息

```php
if ($messages->has('email')) {
    //
}
```

#### 以格式获取错误消息

```php
echo $messages->first('email', '<p>:message</p>');
```

> **注意**：默认情况下，消息使用兼容 Bootstrap 的语法进行格式化。

#### 以格式获取所有错误消息

```php
foreach ($messages->all('<li>:message</li>') as $message) {
    //
}
```

## 错误消息和视图

执行验证后，你需要一种简单的方式将错误消息传回视图。October CMS 方便地处理了这一点。以下 AJAX 处理程序为例：

```php
public function onRegister()
{
    $rules = [];

    $validator = Validator::make(input(), $rules);

    if ($validator->fails()) {
        return Redirect::to('register')->withErrors($validator);
    }
}
```

请注意，当验证失败时，我们使用 `withErrors` 方法将 `Validator` 实例传递给重定向。此方法将错误消息闪存到会话，以便在下一次请求中可用。

October CMS 将始终检查会话数据中的错误，并在可用时自动将它们绑定到视图。**因此，需要注意的是，`errors` 变量在每次请求中都将在所有页面中可用**，让你可以方便地假设 `errors` 变量始终被定义并可安全使用。`errors` 变量将是 `MessageBag` 的实例。

因此，重定向后，你可以在视图中使用自动绑定的 `errors` 变量：

```twig
{{ errors.first('email') }}
```

### 命名错误包

如果你在单个页面上有多个表单，你可能希望为错误的 `MessageBag` 命名。这将允许你检索特定表单的错误消息。只需将名称作为 `withErrors` 的第二个参数传递。

```php
return Redirect::to('register')->withErrors($validator, 'login');
```

然后你可以从 `$errors` 变量访问命名的 `MessageBag` 实例：

```twig
{{ errors.login.first('email') }}
```

## 可用验证规则

以下是所有可用的验证规则及其功能。

<a name="rule-accepted"></a>
#### accepted

验证字段必须为 _yes_、_on_ 或 _1_。这在验证"服务条款"接受时很有用。

<a name="rule-active-url"></a>
#### active_url

验证字段必须是根据 `checkdnsrr` PHP 函数的有效 URL。

<a name="rule-after"></a>
#### after:_date_

验证字段必须是给定日期之后的值。日期将传递给 PHP `strtotime` 函数。

<a name="rule-alpha"></a>
#### alpha

验证字段必须完全是字母字符。

<a name="rule-alpha-dash"></a>
#### alpha_dash

验证字段可以包含字母数字字符以及破折号和下划线。

<a name="rule-alpha-num"></a>
#### alpha_num

验证字段必须完全是字母数字字符。

<a name="rule-array"></a>
#### array

验证字段必须是数组类型。

<a name="rule-before"></a>
#### before:_date_

验证字段必须是给定日期之前的值。日期将传递给 PHP `strtotime` 函数。

<a name="rule-between"></a>
#### between:_min_,_max_

验证字段的大小必须在给定的 _min_ 和 _max_ 之间。字符串、数字和文件以与 `size` 规则相同的方式进行评估。

<a name="rule-boolean"></a>
#### boolean

验证字段必须能够被转换为布尔值。接受的输入为 `true`、`false`、`1`、`0`、`"1"` 和 `"0"`。

<a name="rule-confirmed"></a>
#### confirmed

验证字段必须有匹配的 `foo_confirmation` 字段。例如，如果验证字段是 `password`，则输入中必须存在匹配的 `password_confirmation` 字段。

<a name="rule-date"></a>
#### date

验证字段必须是根据 `strtotime` PHP 函数的有效日期。

<a name="rule-date-format"></a>
#### date_format:_format_

验证字段必须匹配根据 `date_parse_from_format` PHP 函数定义的 _format_。

<a name="rule-different"></a>
#### different:_field_

给定的 _field_ 必须与验证字段不同。

<a name="rule-digits"></a>
#### digits:_value_

验证字段必须是 _数字_ 且具有精确的 _value_ 长度。

<a name="rule-digits-between"></a>
#### digits_between:_min_,_max_

验证字段的长度必须在给定的 _min_ 和 _max_ 之间。

<a name="rule-email"></a>
#### email

验证字段必须格式化为电子邮件地址。

<a name="rule-exists"></a>
#### exists:_table_,_column_

验证字段必须存在于给定的数据库表中。

exists 规则的基本用法

```php
'state' => 'exists:states'
```

指定自定义列名

```php
'state' => 'exists:states,abbreviation'
```

你还可以指定更多条件，这些条件将作为"where"子句添加到查询中：

```php
'email' => 'exists:staff,email,account_id,1'
```

传递 `NULL` 作为"where"子句值将添加对 `NULL` 数据库值的检查：

```php
'email' => 'exists:staff,email,deleted_at,NULL'
```

<a name="rule-image"></a>
#### image

验证文件必须是图像（jpeg、png、bmp 或 gif）

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

验证字段必须包含在给定的值列表中。

<a name="rule-integer"></a>
#### integer

验证字段必须具有整数值。

<a name="rule-ip"></a>
#### ip

验证字段必须格式化为 IP 地址。

<a name="rule-max"></a>
#### max:_value_

验证字段必须小于或等于最大 _value_。字符串、数字和文件以与 [`size`](#rule-size) 规则相同的方式进行评估。

<a name="rule-mimes"></a>
#### mimes:_foo_,_bar_,...

验证文件必须具有与列出的扩展名之一对应的 MIME 类型。

#### MIME 规则的基本用法

```php
'photo' => 'mimes:jpeg,bmp,png'
```

<a name="rule-min"></a>
#### min:_value_

验证字段必须具有最小 _value_。字符串、数字和文件以与 [`size`](#rule-size) 规则相同的方式进行评估。

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

验证字段不能包含在给定的值列表中。

<a name="rule-nullable"></a>
#### nullable

验证字段可以为 `null`。这在验证可以包含 `null` 值的字符串和整数等原始类型时特别有用。

<a name="rule-numeric"></a>
#### numeric

验证字段必须具有数字值。

<a name="rule-regex"></a>
#### regex:_pattern_

验证字段必须匹配给定的正则表达式。

**注意：**使用 `regex` 模式时，可能需要在数组中指定规则，而不是使用管道分隔符，特别是当正则表达式包含管道字符时。

<a name="rule-required"></a>
#### required

验证字段必须存在于输入数据中。

<a name="rule-required-if"></a>
#### required_if:_field_,_value_,...

如果 _field_ 字段等于任何 _value_，则验证字段必须存在。

<a name="rule-required-unless"></a>
#### required_unless:anotherfield,value,...

除非 anotherfield 字段等于任何 value，否则验证字段必须存在且不为空。

<a name="rule-required-with"></a>
#### required_with:_foo_,_bar_,...

仅当其他指定字段中的任何一个存在时，验证字段才必须存在。

<a name="rule-required-with-all"></a>
#### required_with_all:_foo_,_bar_,...

仅当所有其他指定字段都存在时，验证字段才必须存在。

<a name="rule-required-without"></a>
#### required_without:_foo_,_bar_,...

仅当其他指定字段中的任何一个不存在时，验证字段才必须存在。

<a name="rule-required-without-all"></a>
#### required_without_all:_foo_,_bar_,...

仅当所有其他指定字段都不存在时，验证字段才必须存在。

<a name="rule-same"></a>
#### same:_field_

指定的 _field_ 值必须与验证字段的值匹配。

<a name="rule-size"></a>
#### size:_value_

验证字段必须具有与给定 _value_ 匹配的大小。对于字符串数据，_value_ 对应于字符数。对于数字数据，_value_ 对应于给定的整数值。对于文件，_size_ 对应于文件大小（以千字节为单位）。

<a name="rule-string"></a>
#### string:_value_

验证字段必须是字符串类型。

<a name="rule-timezone"></a>
#### timezone

验证字段必须是根据 `timezone_identifiers_list` PHP 函数的有效时区标识符。

<a name="rule-unique"></a>
#### unique:_table_,_column_,_except_,_idColumn_

验证字段在给定的数据库表中必须是唯一的。如果未指定 `column` 选项，将使用字段名称。

unique 规则的基本用法。

```php
'email' => 'unique:users'
```

指定自定义列名。

```php
'email' => 'unique:users,email_address'
```

强制 unique 规则忽略给定 ID。

```php
'email' => 'unique:users,email_address,10'
```

添加额外的 where 子句。

你还可以指定更多条件，这些条件将作为"where"子句添加到查询中：

```php
'email' => 'unique:users,email_address,NULL,id,account_id,1'
```

在上述规则中，只有 `account_id` 为 `1` 的行才会包含在唯一检查中。

<a name="rule-site-unique"></a>
#### unique_site:_table_,_column_,_except_,_idColumn_

验证字段在同一[站点上下文](../../cms/resources/multisite.md)中必须是唯一的。定义与 `unique` 规则相同。

```php
'email' => 'unique_site:users'
```

<a name="rule-url"></a>
#### url

验证字段必须格式化为 URL。

::: tip
此函数使用 PHP 的 `filter_var` 方法。
:::

## 有条件地添加规则

在某些情况下，你可能希望**仅当**该字段存在于输入数组中时才对其运行验证检查。要快速实现此目的，请将 `sometimes` 规则添加到规则列表中：

```php
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```

在上面的示例中，`email` 字段仅在存在于 `$data` 数组中时才会被验证。

#### 复杂条件验证

有时你可能希望仅在另一个字段的值大于 100 时才要求给定字段。或者你可能需要两个字段仅在另一个字段存在时才具有给定的值。添加这些验证规则不必令人痛苦。首先，创建一个具有永远不会改变的 _静态规则_ 的 `Validator` 实例：

```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```

假设我们的 Web 应用程序是为游戏收藏家设计的。如果游戏收藏家在我们的应用程序上注册并且拥有超过 100 款游戏，我们希望他们解释为什么拥有这么多游戏。例如，也许他们经营一家游戏转售店，或者他们只是享受收藏。要有条件地添加此要求，我们可以在 `Validator` 实例上使用 `sometimes` 方法。

```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

传递给 `sometimes` 方法的第一个参数是我们有条件验证的字段名称。第二个参数是我们要添加的规则。如果作为第三个参数传递的 `Closure` 返回 `true`，则规则将被添加。此方法使构建复杂的条件验证变得轻而易举。你甚至可以一次为多个字段添加条件验证：

```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```

::: tip
传递给 `Closure` 的 `$input` 参数将是 `Illuminate\Support\Fluent` 的实例，可用作对象来访问你的输入和文件。
:::

## 验证数组

验证基于数组的表单输入字段不必令人痛苦。你可以使用"点表示法"来验证数组中的属性。例如，如果传入的 HTTP 请求包含 `photos[profile]` 字段，你可以这样验证它：

```php
$validator = Validator::make(input(), [
    'photos.profile' => 'required|image',
]);
```

你也可以验证数组的每个元素。例如，要验证给定数组输入字段中的每个电子邮件是否唯一，你可以执行以下操作：

```php
$validator = Validator::make(input(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```

同样，你可以在语言文件中指定验证消息时使用 `*` 字符，使为基于数组的字段使用单个验证消息变得轻而易举：

```php
'custom' => [
    'person.*.email' => [
        'unique' => 'Each person must have a unique e-mail address',
    ]
],
```

你也可以在验证规则中使用"数组表示法"。这些规则将在验证时自动转换为"点表示法"。

```php
$validator = Validator::make(input(), [
    'photos[profile]' => 'required|image',
    'person[][email]' => 'email|unique:users',
]);
```

## 自定义错误消息

如果需要，你可以使用自定义错误消息进行验证，而不是使用默认消息。有几种方式可以指定自定义消息。以下展示了如何将自定义消息传递给验证器实例。

```php
$messages = [
    'required' => 'The :attribute field is required.',
];

$validator = Validator::make($input, $rules, $messages);
```

`:attribute` 占位符将被验证字段的实际名称替换。你还可以在验证消息中使用其他占位符。以下展示了你可能遇到的一些其他验证占位符。

```php
$messages = [
    'same' => 'The :attribute and :other must match.',
    'size' => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute must be between :min - :max.',
    'in' => 'The :attribute must be one of the following types: :values',
];
```

有时你可能只想为特定字段指定自定义错误消息。以下将在使用 **required** 规则时为 `email` 属性指定自定义消息。

```php
$messages = [
    'email.required' => 'We need to know your e-mail address!',
];
```

### 在语言文件中指定自定义消息

在某些情况下，你可能希望在语言文件中指定自定义消息，而不是直接将它们传递给 `Validator`。为此，请将消息添加到插件的 **lang/xx/validation.php** 语言文件中的数组中。

```php
return  [
    'required' => 'We need to know your e-mail address!',
    'email.required' => 'We need to know your e-mail address!',
];
```

然后在调用 `Validator::make` 时使用 `Lang:get` 来使用你的自定义文件。

```php
Validator::make($formValues, $validations, Lang::get('acme.blog::validation'));
```

### 全局覆盖验证消息

验证器的默认消息字符串位于 **modules/system/lang/xx/validation.php** 文件中。我们建议打开此文件以查找所有可用的消息。

该文件包含每个验证规则的消息数组。有一个 `custom` 属性用于使用"attribute.rule"命名约定的自定义错误消息，以及一个 `attributes` 属性用于存储自定义属性名称。

```php
return [
    'required' => 'The :attribute field is required!',
    // ...

    'custom' => [
        // ...
    ],

    'attributes' => [
        // ...
    ]
];
```

你可以通过在 app 目录中创建新文件来修改这些值中的任何一个，例如，对于 `en` 区域设置，创建一个名为 **app/lang/system/en/validation.php** 的文件。此文件中的值将覆盖默认值，你只需包含要修改的值。

```php
return [
    'required' => 'Sorry, we need that field (:attribute) you gave!',

    'attributes' => [
        'email' => 'email address'
    ],
];
```

## 自定义验证规则

有各种有用的验证规则，但是你可能希望指定一些自己的规则。首先，你应该决定你的规则应该全局注册还是使用本地规则对象。

### 全局注册规则

全局注册的规则可以通过标签和规则类进行注册，在整个应用程序中共享。这通常在[插件注册文件](../extending.md)的 `register` 方法中使用 `registerValidationRule` 辅助方法完成。

```php
public function register()
{
    $this->registerValidationRule('uppercase', UppercaseRule::class);
}
```

在此示例中，我们创建了一个标记为 **uppercase** 的规则并引用了我们的规则类，使其可以在任何地方作为规则指定。

```php
Validator::make($data, [
    'shoutout' => 'required|uppercase',
]);
```

#### 定义全局规则类

全局规则类代表模型的单个可重用验证规则。规则类至少必须提供一个 `validate` 方法来确定验证规则是否通过。你也可以指定一个可选的 `message` 方法来返回自定义错误消息。

```php
class UppercaseRule
{
    /**
     * validate 确定验证规则是否通过。
     * @param string $attribute
     * @param mixed $value
     * @param array $params
     * @return bool
     */
    public function validate($attribute, $value, $params)
    {
        return strtoupper($value) === $value;
    }

    /**
     * message 获取验证错误消息。
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be uppercase.';
    }
}
```

#### 向规则传递参数

全局规则支持在其定义中传递参数。例如，名为 **betwixt** 的规则可能需要两个值。参数可以通过冒号（`:`）传递给规则，每个参数之间用逗号（`,`）分隔。

```php
$v = Validator::make($data, [
    'name' => 'betwixt:1,6',
]);
```

参数然后传递给 validate 方法并变得可用。错误消息也可以通过定义 `replace` 方法来处理。

```php
class BetwixtRule
{
    /**
     * validate 在起始和结束参数之间进行验证。
     */
    public function validate($attribute, $value, $params)
    {
        [$start, $end] = $params;

        return strlen($value) > $start && strlen($value) < $end;
    }

    /**
     * message 获取验证错误消息。
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be between :start and :end.';
    }

    /**
     * replace 定义自定义占位符替换。
     * @return string
     */
    public function replace($message, $attribute, $rule, $params)
    {
        [$start, $end] = $params;

        $message = str_replace(':start', $start, $message);

        $message = str_replace(':end', $end, $message);

        return $message;
    }
}
```

### 本地规则对象

[Laravel 文档中关于规则对象](https://laravel.com/docs/6.x/validation#using-rule-objects)更详细地描述了如何定义规则类。具体来说，规则必须实现 `Illuminate\Contracts\Validation\Rule` 契约，该契约要求定义 `passes` 方法。

```php
class LowercaseRule implements \Illuminate\Contracts\Validation\Rule
{
    /**
     * passes 检查规则是否成功
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return strtolower($value) === $value;
    }

    /**
     * message 获取验证错误消息。
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be lowercase.';
    }
}
```

一旦定义了规则，可以将其作为实例传递给 `Validator` 服务。

```php
$v = Validator::make($data, [
    'name' => ['required', new LowercaseRule],
]);
```

你也可以使用 `beforeValidate` 方法覆盖在模型中实现规则对象。

```php
public function beforeValidate()
{
    $this->rules['name'] = ['required', new LowercaseRule];
}
```

#### 参见

::: also
* [Laravel 验证文档](https://laravel.com/docs/10.x/validation)
:::
