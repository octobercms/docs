# 验证

## 基本用法

验证器类是一个简单、方便的工具，用于通过`验证器`类验证数据和检索验证错误消息。 在处理最终用户提交的表单数据时很有用。

> **注意**：使用模型时，October CMS 附带一个有用的 [验证特征](../database/traits.md#oc-validation)，它实现了 `Validator` 类并支持相同的规则定义。

#### 基本验证示例

传递给 `make` 方法的第一个参数是正在验证的数据。 第二个参数是应该应用于数据的验证规则。

```php
$validator = Validator::make(
    ['name' => 'Joe'],
    ['name' => 'required|min:5']
);
```

多个规则可以使用"竖线"字符或作为数组的单独元素来分隔。

```php
$validator = Validator::make(
    ['name' => 'Joe'],
    ['name' => ['required', 'min:5']]
);
```

要验证多个字段，只需将它们添加到数组中。

```php
$validator = Validator::make(
    [
        'name' => 'Joe',
        'password' => 'lamepassword',
        'email' => 'email@example.com'
    ],
    [
        'name' => 'required',
        'password' => 'required|min:8',
        'email' => 'required|email|unique:users'
    ]
);
```

#### 检查验证结果

一旦创建了`Validator`实例，`fails`(或`passes`)方法就可以用来执行验证。

```php
if ($validator->fails()) {
    // The given data did not pass validation
}
```

如果验证失败，您可以从验证器中检索错误消息。

```php
$messages = $validator->messages();
```

您还可以访问一组失败的验证规则，而无需消息。 为此，请使用 `failed` 方法：

```php
$failed = $validator->failed();
```

#### 验证文件

`Validator` 类提供了一些用于验证文件的规则，例如 `size`、`mimes` 等。 验证文件时，您可以简单地将它们与您的其他数据一起传递给验证器。

<a id="oc-working-with-error-messages"></a>
## 处理错误信息

在 `Validator` 实例上调用 `messages` 方法后，您将收到一个 `Illuminate\Support\MessageBag` 实例，该实例具有多种处理错误消息的便捷方法。

#### 检索字段的第一条错误消息

```php
echo $messages->first('email');
```

#### 检索字段的所有错误

```php
foreach ($messages->get('email') as $message) {
    //
}
```

#### 检索所有字段的所有错误

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

#### 检索带有格式的错误消息

```php
echo $messages->first('email', '<p>:message</p>');
```

> **注意**：默认情况下，消息使用 Bootstrap 兼容语法进行格式化。

#### 使用格式检索所有错误消息

```php
foreach ($messages->all('<li>:message</li>') as $message) {
    //
}
```

## 错误消息和视图

执行验证后，您将需要一种简单的方法将错误消息返回到您的视图中。 October CMS 可以方便地处理此问题。 以以下 AJAX 处理程序为例：

```php
public function onRegister()
{
    $rules = [];

    $validator = Validator::make(Input::all(), $rules);

    if ($validator->fails()) {
        return Redirect::to('register')->withErrors($validator);
    }
}
```

请注意，当验证失败时，我们使用 `withErrors` 方法将 `Validator` 实例传递给 Redirect。 此方法会将错误消息闪现到会话中，以便在下一个请求时可用。

October CMS 将始终检查会话数据中的错误，并在它们可用时自动将它们绑定到视图。 **因此，重要的是要注意，`errors` 变量将始终在您的所有页面中，在每个请求中都可用**，让您可以方便地假设 `errors` 变量始终已定义并且可以安全使用。 `errors` 变量将是 `MessageBag` 的一个实例。

因此，重定向后，您可以在视图中使用自动绑定的 `errors` 变量：

```twig
{{ errors.first('email') }}
```

### 命名错误包

如果您在一个页面上有多个表单，您可能希望将错误命名为`MessageBag`。 这将允许您检索特定表单的错误消息。 只需将名称作为第二个参数传递给 `withErrors`：

```php
return Redirect::to('register')->withErrors($validator, 'login');
```

然后，您可以从 `$errors` 变量访问命名的 `MessageBag` 实例：

```twig
{{ errors.login.first('email') }}
```

## 可用的验证规则

以下是所有可用验证规则及其功能的列表：

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
- [Required With](#rule-required-with)
- [Required With All](#rule-required-with-all)
- [Required Without](#rule-required-without)
- [Required Without All](#rule-required-without-all)
- [Same](#rule-same)
- [Size](#rule-size)
- [String](#rule-string)
- [Timezone](#rule-timezone)
- [Unique (Database)](#rule-unique)
- [URL](#rule-url)

</div>

<a name="rule-accepted"></a>
#### accepted

验证字段必须为 _yes_、_on_ 或 _1_。 这对于验证"服务条款"的接受很有用。

<a name="rule-active-url"></a>
#### active_url

根据 `checkdnsrr` PHP 函数，验证中的字段必须是有效的 URL。

<a name="rule-after"></a>
#### after:_date_

验证中的字段必须是给定日期之后的值。 日期将被传递到 PHP `strtotime` 函数中。

<a name="rule-alpha"></a>
#### alpha

验证的字段必须完全是字母字符。

<a name="rule-alpha-dash"></a>
#### alpha_dash

正在验证的字段可能包含字母数字字符以及破折号和下划线。

<a name="rule-alpha-num"></a>
#### alpha_num

验证中的字段必须完全是字母数字字符。

<a name="rule-array"></a>
#### array

验证的字段必须是数组类型。

<a name="rule-before"></a>
#### before:_date_

验证中的字段必须是给定日期之前的值。 日期将被传递到 PHP `strtotime` 函数中。

<a name="rule-between"></a>
#### between:_min_,_max_

验证字段的大小必须介于给定的 _min_ 和 _max_ 之间。 字符串、数字和文件的评估方式与`size`规则相同。

<a name="rule-boolean"></a>
#### boolean

验证中的字段必须能够转换为布尔值。 接受的输入是 `true`、`false`、`1`、`0`、`"1"` 和 `"0"`。

<a name="rule-confirmed"></a>
#### confirmed

验证中的字段必须有一个匹配的 `foo_confirmation` 字段。 例如，如果验证的字段是`密码`，则输入中必须存在匹配的`密码确认`字段。

<a name="rule-date"></a>
#### date

根据 `strtotime` PHP 函数，验证中的字段必须是有效日期。

<a name="rule-date-format"></a>
#### date_format:_format_

验证中的字段必须匹配根据`date_parse_from_format` PHP 函数定义的_format_。

<a name="rule-different"></a>
#### different:_field_

给定的 _field_ 必须不同于正在验证的字段。

<a name="rule-digits"></a>
#### digits:_value_

验证字段必须是 _numeric_ 并且必须具有 _value_ 的精确长度。

<a name="rule-digits-between"></a>
#### digits_between:_min_,_max_

验证字段的长度必须介于给定的 _min_ 和 _max_ 之间。

<a name="rule-email"></a>
#### email

验证字段的格式必须为电子邮件地址。

<a name="rule-exists"></a>
#### 存在：_table_,_column_

验证中的字段必须存在于给定的数据库表中。

#### exists规则的基本用法

```
'state' => 'exists:states'
```

#### 指定自定义列名

```
'state' => 'exists:states,abbreviation'
```

您还可以指定更多条件，这些条件将作为`where`子句添加到查询中：

```
'email' => 'exists:staff,email,account_id,1'
```

将 `NULL` 作为"where"子句值传递将添加对 `NULL` 数据库值的检查：

```
'email' => 'exists:staff,email,deleted_at,NULL'
```

<a name="rule-image"></a>
#### image

正在验证的文件必须是图像(jpeg、png、bmp 或 gif)

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

验证中的字段必须包含在给定的值列表中。

<a name="rule-integer"></a>
#### integer

验证中的字段必须具有整数值。

<a name="rule-ip"></a>
#### ip

验证字段必须格式化为 IP 地址。

<a name="rule-max"></a>
#### max:_value_

验证中的字段必须小于或等于最大值_value_。 字符串、数字和文件以与 [`size`](#rule-size) 规则相同的方式进行计算。

<a name="rule-mimes"></a>
#### mimes:_foo_,_bar_,...

正在验证的文件必须具有与列出的扩展名之一相对应的 MIME 类型。

#### MIME规则的基本用法

```
'photo' => 'mimes:jpeg,bmp,png'
```

<a name="rule-min"></a>
#### min:_value_

验证中的字段必须具有最小值_value_。 字符串、数字和文件以与 [`size`](#rule-size) 规则相同的方式进行计算。

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

验证中的字段不得包含在给定的值列表中。

<a name="rule-nullable"></a>
#### nullable

验证中的字段可能为`null`。 这在验证可以包含`null`值的字符串和整数等原语时特别有用。

<a name="rule-numeric"></a>
#### numeric

验证中的字段必须具有数值。

<a name="rule-regex"></a>
#### regex:_pattern_

验证中的字段必须与给定的正则表达式匹配。

**注意：** 使用 `regex` 模式时，可能需要在数组中指定规则而不是使用管道分隔符，尤其是当正则表达式包含管道字符时。

<a name="rule-required"></a>
#### required

输入数据中必须存在验证字段。

<a name="rule-required-if"></a>
#### required_if:_field_,_value_,...

如果 _field_ 字段等于任何 _value_，则必须存在正在验证的字段。

<a name="rule-required-with"></a>
#### required_with:_foo_,_bar_,...


只有在存在任何其他指定字段时，验证中的字段才必须存在。

<a name="rule-required-with-all"></a>
#### required_with_all:_foo_,_bar_,...

只有当所有其他指定字段都存在时，验证中的字段才必须存在。

<a name="rule-required-without"></a>
#### required_without:_foo_,_bar_,...

只有当任何其他指定字段不存在时，验证中的字段才必须存在。

<a name="rule-required-without-all"></a>
#### required_without_all:_foo_,_bar_,...

只有在所有其他指定字段都不存在时，才必须存在正在验证的字段。

<a name="rule-same"></a>
#### same:_field_

指定的_field_ 值必须与正在验证的字段值匹配。

<a name="rule-size"></a>
#### size:_value_

验证字段的大小必须与给定的_value_匹配。 对于字符串数据，_value_ 对应于字符数。 对于数字数据，_value_ 对应于给定的整数值。 对于文件，_size_ 对应于以千字节为单位的文件大小。

<a name="rule-string"></a>
#### string:_value_

验证中的字段必须是字符串类型。

<a name="rule-timezone"></a>
#### timezone

根据 `timezone_identifiers_list` PHP 函数，验证中的字段必须是有效的时区标识符。

<a name="rule-unique"></a>
#### unique:_table_,_column_,_except_,_idColumn_

验证中的字段在给定的数据库表上必须是唯一的。 如果未指定 `column` 选项，将使用字段名称。

#### 唯一规则的基本用法

```
'email' => 'unique:users'
```

#### 指定一个自定义列名称

```
'email' => 'unique:users,email_address'
```

#### 强制一个唯一规则忽略给定的 ID

```
'email' => 'unique:users,email_address,10'
```

#### 添加额外的 where 子句

您还可以指定更多条件，这些条件将作为"where"子句添加到查询中：

```
'email' => 'unique:users,email_address,NULL,id,account_id,1'
```

在上述规则中，只有`account_id`为`1`的行才会包含在唯一检查中。

<a name="rule-url"></a>
#### url

验证字段的格式必须为 URL。

> **注意**：此函数使用 PHP 的 `filter_var` 方法。

<a name="conditionally-adding-rules"></a>
## 有条件添加规则

在某些情况下，您可能希望**only**当输入数组中存在该字段时才对字段运行验证检查。 要快速完成此操作，请将 `sometimes` 规则添加到您的规则列表中：


```php
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```

在上面的示例中，只有在 `$data` 数组中存在 `email` 字段时才会对其进行验证。

#### 复杂的条件验证

有时您可能希望仅当另一个字段的值大于 100 时才需要给定字段。或者您可能需要两个字段才能仅在另一个字段存在时才具有给定值。 添加这些验证规则并不一定很麻烦。 首先，使用您的_静态规则_创建一个永远不会改变的 `Validator` 实例：

```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```

让我们假设我们的 Web 应用程序是为游戏收藏家设计的。 如果游戏收藏家在我们的应用程序中注册并且他们拥有超过 100 款游戏，我们希望他们解释为什么他们拥有这么多游戏。 例如，也许他们经营一家游戏转售店，或者他们只是喜欢收集。 要有条件地添加此要求，我们可以在 `Validator` 实例上使用 `sometimes` 方法。

```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

传递给 `sometimes` 方法的第一个参数是我们有条件地验证的字段的名称。 第二个参数是我们要添加的规则。 如果作为第三个参数传递的 `Closure` 返回 `true`，则将添加规则。 这种方法使构建复杂的条件验证变得轻而易举。 您甚至可以一次为多个字段添加条件验证：

```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```

>**注意**：传递给您的 `Closure` 的 `$input` 参数将是 `Illuminate\Support\Fluent` 的一个实例，并且可以用作访问您的输入和文件的对象。

<a id="oc-validating-arrays"></a>
## 验证数组

验证基于数组的表单输入字段并不一定很麻烦。 您可以使用"点符号"来验证数组内的属性。 例如，如果传入的 HTTP 请求包含 `photos[profile]` 字段，您可以像这样验证它：

```php
$validator = Validator::make(Input::all(), [
    'photos.profile' => 'required|image',
]);
```

您还可以验证数组的每个元素。 例如，要验证给定数组输入字段中的每个电子邮件是否唯一，您可以执行以下操作：

```php
$validator = Validator::make(Input::all(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```

同样，您可以在语言文件中指定验证消息时使用 `*` 字符，从而轻松为基于数组的字段使用单个验证消息：

```php
'custom' => [
    'person.*.email' => [
        'unique' => '每个人都必须有一个唯一的电子邮件地址',
    ]
],
```

您也可以在验证规则中使用"数组表示法"。 这些规则将在验证时自动转换为"点符号"。

```php
$validator = Validator::make(Input::all(), [
    'photos[profile]' => 'required|image',
    'person[][email]' => 'email|unique:users',
]);
```

<a id="oc-custom-error-messages"></a>
## 自定义错误消息

您可以使用自定义错误消息而不是默认值进行验证。 有几种方法可以指定自定义消息。

#### 将自定义消息传递给验证器

```php
$messages = [
    'required' => ':attribute 字段是必需的。',
];

$validator = Validator::make($input, $rules, $messages);
```

> *注意：* `:attribute` 占位符将替换为正在验证的字段的实际名称。 您还可以在验证消息中使用其他占位符。

#### 其他验证占位符

```php
$messages = [
    'same' => ':attribute 和 :other 必须匹配。',
    'size' => ':attribute 必须是 :size.',
    'between' => ':attribute 必须介于 :min - :max.' 之间',
    'in' => ':attribute 必须是以下类型之一： :values',
];
```

#### 给定属性指定自定义消息

有时您可能希望仅为特定字段指定自定义错误消息：

```php
$messages = [
    'email.required' => '我们需要知道您的电子邮件地址！',
];
```

<a name="localization"></a>
#### 在语言文件中指定自定义消息

在某些情况下，您可能希望在语言文件中指定自定义消息，而不是将它们直接传递给`验证器`。为此，将消息添加到`lang/xx/validation'中的数组中。php`插件的语言文件。

```php
return  [
    'required' => '我们需要知道您的电子邮件地址！',
    'email.required' => '我们需要知道您的电子邮件地址！',
];
```

然后在调用`Validator:：make`时，使用`Lang:get`来使用自定义文件。

```php
Validator::make($formValues, $validations, Lang::get('acme.blog::validation'));
```

<a id="oc-custom-validation-rules"></a>
## 自定义验证规则

有许多有用的验证规则，但是，您可能希望指定一些您自己的规则。 首先，您应该决定您的规则是应该[全局注册](#globally-registered-rules)，还是使用[本地规则对象](#local-rule-objects)。

### 全局注册规则

通过使用"Validator:：extend"方法将全局注册的规则注册到标记和规则类，可以在整个应用程序中共享该规则。在October CMS插件中，可以将其添加到`插件中的` boot()`回调方法中。php注册文件。

```php
public function boot()
{
    Validator::extend('uppercase', UppercaseRule::class);
}
```

在这种情况下，我们创建了一个标记为 **uppercase** 的规则，并引用了我们的规则类，它可以在任何地方指定为规则。

```php
$v = Validator::make($data, [
    'shoutout' => 'required|uppercase',
]);
```

#### 定义全局规则类

全局规则类代表模型的单个可重用验证规则。 至少，规则类必须提供一个 `validate` 方法来确定验证规则是否通过。 您还可以指定一个可选的 `message` 方法来返回自定义错误消息。

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

全局规则可以支持传递参数及其定义。 例如，名为 **betwixt** 的规则可能需要两个值。 参数可以通过冒号 (`:`) 分隔传递给规则，并且每个参数由逗号 (`,`) 分隔。

```php
$v = Validator::make($data, [
    'name' => 'betwixt:1,6',
]);
```

然后将参数传递给 validate 方法并变为可用。 也可以通过定义一个 `replace` 方法来处理错误消息。

```php
class BetwixtRule
{
    /**
     * 在开始和结束参数之间进行验证。
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
     * 替换自定义占位符。
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

[关于规则对象的 Laravel 文档](https://laravel.com/docs/6.x/validation#using-rule-objects) 更详细地描述了如何定义规则类。 具体来说，规则必须实现 `Illuminate\Contracts\Validation\Rule` 合约，该合约需要定义 `passes` 方法。

```php
class LowercaseRule implements \Illuminate\Contracts\Validation\Rule
{
    /**
     * 通过检查规则是否成功
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

一旦定义了规则，就可以将其作为实例传递给`Validator`服务。

```php
$v = Validator::make($data, [
    'name' => ['required', new LowercaseRule],
]);
```

您还可以使用 `beforeValidate` 方法覆盖在模型中实现规则对象。

```php
public function beforeValidate()
{
    $this->rules['name'] = ['required', new LowercaseRule];
}
```
