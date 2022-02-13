# 表单

**Form Behavior** 是一个控制器修饰符，用于轻松地将表单功能添加到后端页面。 该行为提供了三个页面，分别称为创建、更新和预览。 预览页面是更新页面的只读版本。 当您使用表单行为时，您不需要在控制器中定义 `create`、`update` 和 `preview` 操作 - 行为会为你完成。 但是，您应该提供相应的视图文件。

表单行为取决于表单[字段定义](#defining-form-fields) 和[模型类](../database/model.md)。 为了使用表单行为，您应该将其添加到控制器类的`$implement` 属性中。 此外，应定义`$formConfig` 类属性，其值应参考用于配置行为选项的 YAML 文件。

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';
}
```

> **注意**:表单和[列表行为](../backend/lists.md) 经常在同一个控制器中一起使用。

## 配置表单行为

`$formConfig` 属性中引用的配置文件以 YAML 格式定义。 该文件应放置在控制器的 [views 目录](controllers-ajax.md) 中。 下面是一个典型的表单行为配置文件的例子。

```yaml
# ===================================
#  Form Behavior Config [表单行为配置]
# ===================================

name: Blog Category
form: $/acme/blog/models/post/fields.yaml
modelClass: Acme\Blog\Post

create:
    title: 新博文

update:
    title: 编辑博客文章

preview:
    title: 查看博客文章
```

表单配置文件中需要以下字段。

字段 | 描述
------------- | -------------
**name** | 此表单管理的对象的名称。
**form** | 配置数组或对表单域定义文件的引用，请参阅 [表单域](#defining-form-fields)。
**modelClass** | 一个模型类名，表单数据被加载并保存在这个模型上。

下面列出的配置选项是可选的。 如果您希望表单行为支持 [创建](#create-page)、[更新](#update-page) 或 [预览](#preview-page) 页面，请定义它们。

选项 | 描述
------------- | -------------
**defaultRedirect** | 当没有定义特定的重定向页面时，用作后备重定向页面。
**create** | 创建页面的配置数组或对配置文件的引用。
**update** | 更新页面的配置数组或对配置文件的引用。
**preview** | 预览页面的配置数组或对配置文件的引用。

### 创建页面

要支持创建页面，请将以下配置添加到 YAML 文件中。

```yaml
create:
    title: 新博客文章
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
```

创建页面支持以下配置选项。

选项 | 描述
------------- | -------------
**title** | 一个页面标题，可以引用一个[多语言字符串](../plugin/localization.md)。
**redirect** | 保存记录时的重定向页面。
**redirectClose** | 保存记录时会吧close参数一起提交，用于保存并关闭重定向页面
**form** | 定义创建页面的默认表单字段。

### 更新页面

要支持更新页面，请将以下配置添加到 YAML 文件中。

```yaml
update:
    title: 编辑博客文章
    redirect: acme/blog/posts
```

更新页面支持以下配置选项。

选项 | 描述
------------- | -------------
**title** | 一个页面标题，可以引用一个[多语言字符串](../plugin/localization.md)。
**redirect** | 保存记录时的重定向页面。
**redirectClose** | 保存记录时会吧close参数一起提交，用于保存并关闭重定向页面
**form** | 定义更新页面的默认表单字段。

### 预览页面

要支持预览页面，请将以下配置添加到 YAML 文件中:

```yaml
preview:
    title: View Blog Post
```

预览页面支持以下配置选项。

选项 | 描述
------------- | -------------
**title** | 一个页面标题，可以引用一个[多语言字符串](../plugin/localization.md)。
**form** | 定义预览页面的默认表单字段。

### 自定义消息

指定 `customMessages` 选项以覆盖表单控制器使用的默认消息。 这些值可以是纯文本，也可以引用 [多语言字符串](../plugin/localization.md)。

```yaml
customMessages:
    notFound: 没找到那个东西
    flashCreate: 创造了新东西
    flashUpdate: 更新了那个东西
    flashDelete: 东西不见了
```

您还可以在显示的表单上下文中修改消息。 以下将仅覆盖 `update` 上下文的 `notFound` 消息。

```yaml
update:
    customMessages:
        notFound: 更新时没有发现
```

以下消息可用作自定义消息覆盖。

消息 | 默认消息
------------- | -------------
notFound | 找不到 ID 为 :id 的表单记录。
flashCreate | :name 已创建
flashUpdate | :name 更新
flashDelete | :name 已删除

## 定义表单字段

表单字段是使用 YAML 文件定义的。 表单行为使用表单字段配置来创建表单控件并将它们绑定到模型字段。 该文件被放置在插件的 **models** 目录的子目录中。 子目录名称与小写的模型类名称相匹配。 文件名无关紧要，但 **fields.yaml** 和 **form_fields.yaml** 是常用名称。 示例表单字段文件位置:

```
plugins/
  acme/
    blog/
      models/            <=== 插件模型目录
        post/            <=== 模型配置目录
          fields.yaml    <=== 模型表单字段配置文件
        Post.php         <=== 模型类
```

字段可以放置在三个区域，**外部区域**、**主要选项卡**或**次要选项卡**。 下一个示例显示了表单域定义文件的典型内容。

```yaml
# ===================================
#  Form Field Definitions [表单字段定义]
# ===================================

fields:
    blog_title:
        label: 博客标题
        description: 此博客的标题

    published_at:
        label: 发布日期
        description: 这篇博文发表的时间
        type: datepicker

    # [...]

tabs:
    fields:
        # [...]

secondaryTabs:
    fields:
        # [...]
```

### 字段选项

对于每个字段，您可以指定这些选项(如果适用):

选项 | 描述
------------- | -------------
**label** | 向用户显示表单字段时的名称。
**type** | 定义应如何呈现此字段(请参阅下面的 [可用字段类型](#available-field-types))。默认值:text。
**span** | 将表单域与一侧对齐。选项: auto(自动), left(左对齐), right(右对齐), row(格网布局), full(铺满)。默认值:full。
**spanClass** | 与 span `row` 选项一起使用，将表单显示为 Bootstrap 网格，例如，`spanClass: col-xs-4`。
**size** | 指定字段大小，例如 textarea 字段。选项:tiny(微型), small(小型), large(中型), huge(大型), giant(巨型)。
**placeholder** | 如果该字段支持占位,则为占位符值。
**comment** | 在字段下方放置一个描述。
**commentAbove** | 在字段上方放置一个描述。
**commentHtml** | 允许在描述中添加 HTML 标记。选项:true, false。
**default** | 指定字段的默认值。对于 `dropdown`、`checkboxlist`、`radio` 和 `balloon-selector` 字段，您可以在此处指定一个选项键以使其默认选中。
**defaultFrom** | 从另一个字段的值中获取默认值。
**tab** | 将字段分配给选项卡。
**cssClass** | 为字段容器分配一个 CSS 类。
**readOnly** | 防止字段被修改。选项:true, false。
**disabled** | 防止字段被修改并将其从保存的数据中排除。选项:true, false。
**hidden** | 从视图中隐藏字段并将其从保存的数据中排除。选项:true, false。
**stretch** | 指定此字段是否拉伸以适合父高度。
**context** | 指定显示字段时应使用的上下文。上下文也可以通过在字段名称中使用 `@` 符号来传递，例如，`name@update`。
**dependsOn** | 其他字段名称的数组，该字段[取决于](#field-dependencies)，当其他字段被修改时，该字段将更新。
**trigger** | 使用 [触发事件](#trigger-events) 指定此字段的条件。
**preset** | 允许字段值最初由另一个字段的值设置，使用 [输入预设转换器](#input-preset-converter) 进行转换。
**required** | 在字段标签旁边放置一个红色星号表示它是必填项。请务必使用 [模型验证](../database/traits.md#validation)，因为表单控制器不强制执行此操作。
**attributes** | 指定要添加到表单字段元素的自定义 HTML 属性。
**containerAttributes** | 指定要添加到表单字段容器的自定义 HTML 属性。
**permissions** | 当前后端用户必须拥有[权限](users.md#users-and-permissions) 才能使用该字段。支持单个权限的字符串或仅需要一个权限即可授予访问权限的权限数组。

### 嵌套字段选择

来自相关模型的字段可以使用 [关联小部件](#relation) 或 [关联管理器](relations.md#relationship-types) 呈现。 但是，如果关系类型是单数或 [jsonable 数组](../database/model.md#property-jsonable)，您可以使用 **relation[field]** 定义的嵌套字段类型。

```yaml
avatar[name]:
    label: 头像
    comment: 将保存在头像表中
```

上面的示例将分别获取和保存 PHP 中，相当于用 `$record->avatar->name` 或 `$record->avatar['name']` 获取值。

### 选项卡选项

对于每个选项卡定义，即 `tabs` 和 `secondaryTabs`，您可以指定以下选项:

选项 | 描述
------------- | -------------
**stretch** | 指定此选项卡是否拉伸以适合父高度。
**defaultTab** | 将字段分配到的默认选项卡。 默认值:Misc。
**activeTab** | 表单第一次加载时选择的选项卡名称或索引。 默认值:1
**icons** | 使用选项卡名称作为键将图标分配给选项卡。
**lazy** | 单击时要动态加载的选项卡数组。 对于包含大量内容的选项卡很有用。
**cssClass** | 将 CSS 类分配给选项卡容器。
**paneCssClass** | 将 CSS 类分配给单个选项卡窗格。 value 是一个数组，key 是标签索引或标签，value 是 CSS 类。 它也可以指定为字符串，在这种情况下，该值将应用于所有选项卡。

```yaml
tabs:
    stretch: true
    defaultTab: User
    cssClass: text-blue
    lazy:
        - Groups
    paneCssClass:
        1: first-tab
        2: second-tab
    icons:
        User: icon-user
        Groups: icon-group

    fields:
        username:
            type: text
            label: 用户名
            tab: User

        groups:
            type: relation
            label: 分组
            tab: Groups
```

## 可用字段类型

有多种原生字段类型用于 **type** 设置。 对于基本的 UI 元素，请查看 [可用的 UI 元素](#available-ui-elements)。 对于更高级的表单字段，可以使用 [表单小部件](#form-widgets) 代替。

<div class="content-list" markdown="1">

- [文本](#field-text)
- [数字](#field-number)
- [密码](#field-password)
- [电子邮件](#field-email)
- [文本域](#field-textarea)
- [下拉列表](#field-dropdown)
- [单选列表](#field-radio)
- [气球选择器](#field-balloon)
- [复选框](#field-checkbox)
- [复选框列表](#field-checkboxlist)
- [开关](#field-switch)
- [自定义小部件](#field-widget)

</div>

<a name="field-text"></a>
### 文本

`text` - 呈现单行文本框。 如果没有指定，这是默认使用的类型。

```yaml
blog_title:
    label: 博客标题
    type: text
```

<a name="field-number"></a>
### 数字

`number` - 呈现一个仅接受数字的单行文本框。

```yaml
your_age:
    label: 你的年龄
    type: number
    step: 1  # 默认为 '任意值'
    min: 1   # 默认不出现
    max: 100 # 默认不出现
```

如果您想保存时在服务器端验证此字段以确保它是数字，请在您的模型上使用 `$rules` 属性，如下所示:

```php
/**
 * @var array 验证规则
 */
public $rules = [
    'your_age' => 'numeric',
];
```

有关模型验证的更多信息，请访问 [文档页面](https://octobercms.com/docs/services/validation#rule-numeric)。
<a name="field-password"></a>
### 密码

`password ` - 呈现单行密码字段。

```yaml
user_password:
    label: 密码
    type: password
```

<a name="field-email"></a>
### 电子邮件

`email` - 呈现一个类型为 `email` 的单行文本框，在移动端浏览器中触发一个电子邮件专用键盘。

```yaml
user_email:
    label: 电子邮件地址
    type: email
```

如果您想在保存时验证此字段以确保它格式是正确的电子邮件地址，请在您的模型上使用 `$rules` 属性，如下所示:

```php
/**
 * @var array 验证规则
 */
public $rules = [
    'user_email' => 'email',
];
```

有关模型验证的更多信息，请访问 [文档页面](https://octobercms.com/docs/services/validation#rule-email)。

<a name="field-textarea"></a>
### 文本域

`textarea` - 呈现一个多行文本框。 也可以使用指定的值规定大小:tiny(微型), small(小型), large(中型), huge(大型), giant(巨型)。

```yaml
blog_contents:
    label: 内容
    type: textarea
    size: large
```

<a name="field-dropdown"></a>
### 下拉列表

`dropdown` - 呈现带有指定选项的下拉菜单。 提供下拉选项的方法有很多种，其中大多数涉及指定 `options` 值。

仅选项值，其中值和标签相同。
```yaml
status_type:
    label: 博客帖子状态
    type: dropdown
    default: published
    options:
        draft
        published
        archived
```

具有键值相对应的选项，其中值和标签是独立指定的。

```yaml
status_type:
    label: 博客帖子状态
    type: dropdown
    default: published
    options:
        draft: 草稿
        published: 已发表
        archived: 存档
```

下一种方法涉及在插件或应用程序代码库中使用模型类。如果省略 `options` 值，则框架期望在模型中定义一个名为 `get*FieldName*Options` 的方法。

使用下面的示例，模型类应该有 `getStatusTypeOptions` 方法。此方法的第一个参数是该字段的当前值，第二个参数是整个表单的当前数据对象。此方法应返回格式为 **key => label** 的选项数组。

```yaml
status_type:
    label: 博客帖子状态
    type: dropdown
```

这是提供下拉选项的模型类方法的示例。请注意，方法名称与 _TitleCase_ 格式的列名称匹配。

```php
public function getStatusTypeOptions($value, $formData)
{
    return ['all' => 'All', ...];
}
```

您还可以定义一个万能的方法，在未定义专用方法名称的情况下用作备用方法，该方法将用于模型的所有下拉字段类型。

该方法的第一个参数是字段名，第二个是字段的当前值，第三个是整个表单的当前数据对象。它应该返回格式为 **key => label** 的选项数组。

```php
public function getDropdownOptions($fieldName, $value, $formData)
{
    if ($fieldName == 'status') {
        return ['all' => 'All', ...];
    }
    else {
        return ['' => '-- none --'];
    }
}
```

要使用自定义方法名称，请在 `options` 参数中明确指定它，这将与模型中定义的方法名称完全匹配。

在下一个例子中，`listStatuses` 方法应该在模型类中定义。此方法接收与 `getDropdownOptions` 方法相同的所有参数，并应返回格式为 **key => label** 的选项数组。

```yaml
status:
    label: 博客帖子状态
    type: dropdown
    options: listStatuses
```

这是提供下拉选项的模型类自定义方法的示例。

```php
public function listStatuses($fieldName, $value, $formData)
{
    return ['published' => 'Published', ...];
}
```

您可以为将在下拉字段中呈现的每个选项添加图标或图像。在这种情况下，您必须将选项指定为具有以下格式的多维数组 **key => [label-text, label-icon]**。

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', 'icon-check-circle'],
        'unpublished' => ['Unpublished', 'icon-minus-circle'],
        'draft' => ['Draft', 'icon-clock-o']
    ];
}
```

如果要调用外部类的方法，可以通过调用任何完全限定对象的静态方法来实现。只需在 `options` 参数中将 `ClassName::method` 语法指定为字符串。

```yaml
status:
    label: 博客帖子状态
    type: dropdown
    options: \MyAuthor\MyPlugin\Helpers\FormHelper::staticMethodOptions
```

此示例显示了在任何帮助程序类上定义的静态方法。第一个参数是模型对象，第二个参数是表单字段定义。

```php
public static function staticMethodOptions($model, $formField)
{
    return ['published' => 'Published', ...];
}
```

要处理模型上没有设置值的情况，您可以指定一个 `emptyOption` 值以包含一个可以重新选择的空选项。

```yaml
status:
    label: 博客帖子状态
    type: dropdown
    emptyOption: -- 无状态 --
```

或者，您可以使用 `placeholder` 选项来使用无法重新选择的“占位”空选项。

```yaml
status:
    label: 博客帖子状态
    type: dropdown
    placeholder: -- 选择一个状态 --
```

默认情况下，下拉菜单具有搜索功能，允许快速选择值。这可以通过将 `showSearch` 选项设置为 `false` 来禁用。

```yaml
status:
    label: 博客帖子状态
    type: dropdown
    showSearch: false
```

<a name="field-radio"></a>
### 单选列表

`radio` - 呈现单选选项列表，其中一次只能选择一个项目。

```yaml
security_level:
    label: 访问权限
    type: radio
    default: guests
    options:
        all: 全部
        registered: 仅会员
        guests: 仅访客
```

单选列表也可以支持辅助描述。

```yaml
security_level:
    label: 访问权限
    type: radio
    options:
        all: [全部,访客和会员将能够访问此页面。]
        registered: [仅会员,只有登录的会员才能访问此页面。]
        guests: [仅访客,只有访客用户才能访问此页面。]
```

单选列表支持与 [下拉列表类型](#field-dropdown) 相同的方法来定义选项。 对于单选列表，该方法可以返回简单数组:**key => value** ，也可以返回用于提供描述的数组:**key => [label, description]**。 通过在单选字段配置上指定 `cssClass: 'inline-options'`，选项可以彼此内联显示，而不是在单独的行中显示。

<a name="field-balloon"></a>
### 气球选择器

`balloon-selector` - 渲染一个列表，一次只能选择一个项目。

```yaml
gender:
    label: 性别
    type: balloon-selector
    default: female
    options:
        female: 女性
        male: 男性
```

气球选择器支持与 [下拉列表类型](#field-dropdown) 相同的方法来定义选项。

<a name="field-checkbox"></a>
### 复选框

`checkbox` - 呈现单个复选框。

```yaml
show_content:
    label: 显示内容
    type: checkbox
    default: true
```

<a name="field-checkboxlist"></a>
### 复选框列表

`checkboxlist` - renders a list of checkboxes.

```yaml
permissions:
    label: 权限
    type: checkboxlist
    # 在具有 <=10 项的列表上设置为 true 以显式启用“全选”、“取消全选”选项(>10 自动启用它)
    quickselect: true
    default: 注册账户
    options:
        open_account: 注册账户
        close_account: 关闭账户
        modify_account: 修改帐号
```

复选框列表支持与 [下拉列表类型](#field-dropdown) 相同的方法来定义选项，并且还支持在 [单选列表类型](#field-radio) 中找到的辅助描述。 通过在 checkboxlist 字段配置中指定 `cssClass: 'inline-options'`，选项可以彼此内联显示，而不是在单独的行中显示。

<a name="field-switch"></a>
### 开关

`switch` - 渲染一个开关盒。

```yaml
show_content:
    label: 显示内容
    type: switch
    comment: Flick this switch to display content
```

您可以通过将数组传递给带有 false 和 true 标签的 `options` 值来自定义开关文本。

```yaml
show_content:
    label: 显示内容
    type: switch
    options:
        - 关
        - 开
```

<a name="field-widget"></a>
### 自定义小部件

`widget` - 呈现自定义表单小部件，`type` 字段可以直接引用小部件的类名或注册的别名。

```yaml
blog_content:
    type: Backend\FormWidgets\RichEditor
    size: huge
```

## 可用的 UI 元素

表单中可以包含非功能 UI 元素以帮助进行布局设计。

<div class="content-list" markdown="1">

- [分段](#field-section)
- [提示](#field-hint)
- [横向分隔线](#field-ruler)
- [部件](#field-partial)

</div>

<a name="field-section"></a>
### 分段

`section` - 呈现分段标题和副标题。 `label` 和 `comment` 值是可选的，包含标题和副标题的内容。
```yaml
_section1:
    label: 用户详情
    type: section
    comment: 本节包含有关用户的详细信息。
```

<a name="field-hint"></a>
### 提示

`hint` - 与 `partial` 字段相同，但呈现在提示容器中，用户可以隐藏该提示容器。

```yaml
content:
    type: hint
    path: content_field
```

提示支持内联到字段的内容。 `label` 和 `comment` 值是可选的，包含标题和副标题的内容。 您也可以对值使用 Markdown 语法。

```yaml
tip1:
    type: hint
    mode: tip
    label: 提示
    comment: 反复检查以确保该字段已填充。
```

`mode` 选项支持以下值:tip(提示)、info(信息)、warning(警告)、danger(危险)、success(成功)

```yaml
warning1:
    type: hint
    mode: warning
    label: 经常洗手
    comment: 这有利于阻止细菌的传播。
```

<a name="field-ruler"></a>
### 横向分隔线

`ruler` - 呈现水平分隔线以分割表单内容

```yaml
_ruler1:
    type: ruler
```

<a name="field-partial"></a>
### 部件

`partial` - 渲染一个部件，`path` 值可以引用部件视图文件，否则字段名称将用作部件名称。 在部件内部，这些变量可用:`$value` 是默认字段值，`$model` 是用于字段的模型，`$field` 是配置的类对象 `Backend\Classes\FormField`。

```yaml
content:
    type: partial
    path: $/acme/blog/models/comments/_content_field.htm
```

## 表单小部件

标准中包含各种表单小部件，尽管插件通常会提供自己的自定义表单小部件。 您可以在 [表单小部件](widgets.md#form-widgets) 文章中阅读更多内容。

<div class="content-list" markdown="1">

- [代码编辑器](#widget-codeeditor)
- [颜色选择器](#widget-colorpicker)
- [数据表格](#widget-datatable)
- [日期选择器](#widget-datepicker)
- [文件上传器](#widget-fileupload)
- [Markdown编辑器](#widget-markdowneditor)
- [媒体选择器](#widget-mediafinder)
- [嵌套表单](#widget-nestedform)
- [记录查找器](#widget-recordfinder)
- [关联](#widget-relation)
- [循环组件](#widget-repeater)
- [富文本编辑器/WYSIWYG编辑器](#widget-richeditor)
- [机密信息](#widget-sensitive)
- [标签列表](#widget-taglist)

</div>

<a name="widget-codeeditor"></a>
### 代码编辑器

`codeeditor` - 为格式化代码或标记呈现纯文本编辑器。 请注意，这些选项可能会被后端中为管理员定义的代码编辑器首选项继承。

```yaml
css_content:
    type: codeeditor
    size: huge
    language: html
```

选项 | 描述
------------- | -------------
**language** | 代码语言，例如 php、css、javascript、html。 默认值:`php`。
**showGutter** | 显示带有行号的装订线。 默认值:`true`。
**wrapWords** | 将长行中断到新行。 默认为`true`。
**fontSize** | 文本字体大小。 默认值:12。

<a name="widget-colorpicker"></a>
### 颜色选择器

`colorpicker` - 渲染控件以选择十六进制颜色值。

```yaml
color:
    label: 背景色
    type: colorpicker
```

选项 | 描述
------------- | -------------
**availableColors** | 可用颜色列表。
**allowEmpty** | 允许输入空值。 默认值:false

有两种方法可以为颜色选择器提供可用颜色。 第一种方法直接将`可用颜色`定义为 YAML 文件中的十六进制颜色代码列表:
```yaml
color:
    label: 背景色
    type: colorpicker
    availableColors: ['#000000', '#111111', '#222222']
```

第二种方法使用在模型类中声明的特定方法。 此方法应以与上述示例相同的格式返回一个十六进制颜色数组。 该方法的第一个参数是字段名，第二个是字段的当前值，第三个是整个表单的当前数据对象。

```yaml
color:
    label: 背景色
    type: colorpicker
    availableColors: myColorList
```

在模型类中提供可用颜色:

```php
public function myColorList($fieldName, $value, $formData)
{
    return ['#000000', '#111111', '#222222']
}
```

如果 YAML 文件中未定义 `availableColors` 字段，颜色选择器将使用一组 20 种默认颜色。

<a name="widget-datatable"></a>
### 数据表格

`datatable` - 呈现一个可编辑的记录表，格式为网格。 单元格内容可以直接在网格中编辑，允许管理多行和多列信息。

```yaml
data:
    type: datatable
    adding: true
    deleting: true
    columns: []
    recordsPerPage: false
    searching: false
```

> **注意**:为了将其与模型一起使用，应在 [jsonable 属性](../database/model.md#supported-properties) 或任何可以处理存储为数组的内容中定义该字段 .

#### 表配置

下面列出了数据表小部件本身的配置值。

选项 | 描述
------ | -----------
**adding** | 允许将记录添加到数据表中。默认值:`true`。
**btnAddRowLabel** | 为`在上方添加行`按钮定义标签。
**btnAddRowBelowLabel** | 为`在下方添加行`按钮定义标签。
**btnDeleteRowLabel** | 为`删除行`按钮定义标签。
**columns** | 一个数组，表示数据表的列配置。请参阅下面的*列配置* 部分。
**deleting** | 允许从数据表中删除记录。默认值:`false`。
**dynamicHeight** | 如果为`true`，则数据表的高度将根据添加的记录扩展或缩小，直至由`height`配置值定义的最大大小。默认值:`false`。
**fieldName** | 定义在从数据表发送的 POST 数据中使用的自定义字段名称。留空以使用默认字段别名。
**height** | 数据表的高度，以像素为单位。如果设置为`false`，数据表将拉伸以适应字段容器。
**keyFrom** | 用于键入每个记录的数据属性。这通常应该设置为`id`。仅支持整数值。
**postbackHandlerName** | 指定发送数据表内容的 AJAX 处理程序名称。当设置为`null`(默认)时，将从包含数据表的表单使用的请求名称中自动检测处理程序名称。建议将其保留为 `null`。
**recordsPerPage** | 每页显示的记录数。如果设置为`false`，分页将被禁用。
**searching** | 允许通过搜索框搜索记录。默认值:`false`。
**toolbar** | 一个数组，表示数据表的工具栏配置。

#### 列配置

数据表小部件允许通过 `columns` 配置变量将列指定为数组。 每列应使用字段名称作为键，并使用以下配置变量来设置字段。

例子:

```yaml
columns:
    id:
        type: string
        title: ID
        validation:
            integer:
                message: 请输入一个数字
    name:
        type: string
        title: 名称
```

选项 | 描述
------ | -----------
**type** | 此列单元格的输入类型。 必须是以下之一:`string`、`checkbox`、`dropdown` 或 `autocomplete`。
**options** | 仅适用于 `dropdown` 和 `autocomplete` 列 - 这指定了将返回可用选项的 AJAX 处理程序，它将以数组形式返回可用选项。数组键用作选项的值，数组值用作选项标签。
**readOnly** | 此列是否为只读。 默认值: `false`。
**title** | 定义列的标题。
**validation** | 一个数组，指定对列单元格内容的验证。 请参阅下面的*列验证*部分。
**width** | 定义列的宽度，以像素为单位。

#### 列验证

列单元格可以根据以下类型的验证规则进行验证。 验证应该指定为一个数组，验证类型用作键，可选消息指定为该验证的`message`属性。

验证 | 描述
---------- | -----------
**float** | 验证数据是否为浮点数。 可以提供一个可选的布尔`allowNegative`属性，允许负浮点数。
**integer** | 验证数据是否为整数。 可以提供一个可选的布尔 `allowNegative` 属性，允许使用负整数。
**length** | 验证数据是否具有特定长度。 必须提供整数`min`和`max`属性，表示必须输入的最小和最大字符数。
**regex** | 根据正则表达式验证数据。 必须提供字符串`pattern`属性，定义正则表达式以测试数据。
**required** | 验证在保存之前是否为必须输入的数据。

<a name="widget-datepicker"></a>
### 日期选择器

`datepicker` - 呈现用于选择日期和时间的文本字段。

```yaml
published_at:
    label: 已发表
    type: datepicker
    mode: date
```

选项 | 描述
------------- | -------------
**mode** | 预期的结果，日期、日期时间或时间。 默认值:日期时间。
**format** | 提供明确的日期显示格式。 例如:Y-m-d
**minDate** | 可以选择的最小/最早日期。
**maxDate** | 可以选择的最大/最晚日期。
**firstDay** | 一周的第一天。 默认值:0(星期日)。
**showWeekNumber** | 在行首显示周数。 默认值:false
**useTimezone** | 从后端指定的时区首选项转换日期和时间。 默认值:true

<a name="widget-fileupload"></a>
### 文件上传器

`fileupload` - 为图像或常规文件呈现一个文件上传器。

```yaml
avatar:
    label: 头像
    type: fileupload
    mode: image
    imageHeight: 260
    imageWidth: 260
```

选项 | 描述
------------- | -------------
**mode** | 预期的文件类型，file(文件)或image(图像)。 默认值:`image`
**size** | 对于多次上传，容器的大小。 可用选项：tiny(微型), small(小型), large(中型), huge(大型), giant(巨型), adaptive(自适应)。 默认值：`large`
**imageWidth** | 如果使用图像类型，图像将被调整到这个宽度，可选
**imageHeight** | 如果使用图像类型，图像将被调整到这个高度，可选
**fileTypes** | 上传者接受的文件扩展名，可选。 例如:`zip,txt`
**mimeTypes** | 上传者接受的 MIME 类型，可以是文件扩展名，也可以是完全限定名，可选。 例如:`bin,txt`
**maxFilesize** | 上传者接受的文件大小(以 Mb 为单位)，可选。 默认值:来自`upload_max_filesize`参数值
**maxFiles** | 允许上传的最大文件数
**useCaption** | 允许为文件设置标题和描述。 默认值:`true`
**prompt** | 上传按钮显示的文本，仅适用于文件，可选
**thumbOptions** | 用于生成缩略图的附加属性 [调整大小选项](../services/resizer.md#resize-parameters)
**attachOnUpload** | 如果父记录存在，则在上传时自动附加上传的文件，而不是在保存父记录时使用延迟绑定来附加。默认值:`false`

> **注意**:与 [媒体选择器表单小部件](#mediafinder) 不同，文件上传表单小部件使用 [数据库文件附件](../database/attachments.md)，因此字段名称是关联模型上的`attachEd`或`attachMent`关系属性名称。

<a name="widget-markdowneditor"></a>
### Markdown 编辑器

`markdown` - 为 markdown 格式的文本呈现一个基本的编辑器。

```yaml
md_content:
    type: markdown
    size: huge
    mode: split
```

选项 | 描述
------------- | -------------
**mode** | 预期的视图模式，tab(选项卡)或split(拆分)。 默认:tab。

<a name="widget-mediafinder"></a>
### 媒体选择器

`mediafinder` - 呈现用于从媒体库中选择项目的字段。 展开该字段会显示媒体管理器以查找文件。生成的是一个选择文件的相对路径字符串

```yaml
background_image:
    label: 背景图
    type: mediafinder
    mode: image
```

选项 | 描述
------------- | -------------
**mode** | 预期的文件类型，file(文件)或image(图像)。 默认值:file。
**prompt** | 没有选择项目时显示的文本。 `%s` 字符代表媒体管理器图标。
**imageWidth** | 如果使用图像类型，预览图片会显示到这个宽度，可选。
**imageHeight** | 如果使用图片类型，预览图片会显示到这个高度，可选。

> **注意**:与 [文件上传表单小部件](#file-upload) 不同，媒体选择器表单小部件将其所选媒体文件的路径存储为字符串。 它应该与模型上的正常属性相关联。

<a name="widget-nestedform"></a>
### 嵌套表单
`nestedform` - 呈现一个嵌套表单内容，将数据作为所包含字段的数组返回。 字段可以内联定义。

```yaml
content:
    type: nestedform
    showPanel: false
    form:
        fields:
            added_at:
                label: 添加日期
                type: datepicker
            details:
                label: 详情
                type: textarea
            title:
                label: 这是标题
                type: text
```

字段也可以引用 `fields.yaml` 文件。

```yaml
profile:
    label: 简介
    type: nestedform
    form: $/october/demo/models/profile/fields.yaml
```

嵌套表单支持与表单本身相同的语法，包括选项卡。 [jsonable 属性](../database/model.md#supported-properties) 将采用表单定义的结构。 或者，您可以使用 `useRelation` 选项引用相关模型。

选项 | 描述
------------- | -------------
**form**  | 与 [表单定义](#defining-form-fields) 中的相同
**showPanel** | 将表单放置在面板容器内。 默认值:true
**useRelation** | 使用字段名称作为关系名称标记，以便直接在父模型上进行交互。 默认值:false

<a name="widget-recordfinder"></a>
### 记录查找器

`recordfinder` - 呈现一个包含相关记录详细信息的字段。 展开该字段会显示一个弹出列表以搜索大量记录。 仅支持单一关系。

```yaml
user:
    label: 用户
    type: recordfinder
    list: ~/plugins/rainlab/user/models/user/columns.yaml
    recordsPerPage: 10
    title: 查找记录
    prompt: 单击“查找”按钮以查找用户
    nameFrom: name
    descriptionFrom: email
```

选项 | 描述
------------- | -------------
**keyFrom** | 要在用于key的关系中使用的列的名称。默认值:id。
**nameFrom** | 要在用于显示名称的关系中使用的列名称。默认值:name。
**descriptionFrom** | 要在用于显示描述的关系中使用的列名。默认值:description。
**title** | 要在弹出窗口的标题部分显示的文本。
**prompt** | 没有选择记录时显示的文本。 `%s` 字符代表搜索图标。
**list** | 配置数组或对列表列定义文件的引用，请参阅 [列表列](lists.md#defining-list-columns)。
**recordsPerPage** | 每页显示的记录，使用 0 表示无页。默认值:10
**conditions** | 指定要应用于列表模型查询的原始 where 查询语句。
**scope** | 指定在**相关表单模型**中定义的[查询范围方法](../database/model.md#query-scopes)始终应用于列表查询。第一个参数将包含附加其值的小部件模型，即父模型。
**searchMode** | 将搜索策略定义为包含所有单词、任何单词或精确短语。支持的选项:all(全部), any(任意), exact(精确)。默认值:all。
**searchScope** | 指定**相关表单模型**中定义的[查询范围方法](../database/model.md#query-scopes)应用于搜索查询，第一个参数将包含搜索词。
**useRelation** | 使用字段名称作为关系名称的标志，以便直接在父模型上进行交互。默认值:true。禁用仅返回所选模型的 ID
**modelClass** | 当 useRelation = false 时用于列出记录的模型类

<a name="widget-relation"></a>
### 关联(关系)

`relation` - 根据字段关系类型呈现下拉列表或复选框列表。 单一关系显示一个下拉列表，多个关联显示一个复选框列表。 用于显示每个关系的标签来自 `nameFrom` 或 `select` 定义。

```yaml
categories:
    label: 类别
    type: relation
    nameFrom: title
```

或者，您可以使用自定义的`select`语句填充标签。 任何有效的 SQL 语句都可以在这里使用。

```yaml
user:
    label: 用户
    type: relation
    select: concat(first_name, ' ', last_name)
```

您还可以提供一个模型范围，使用 `scope` 属性过滤结果。

选项 | 描述
------------- | -------------
**nameFrom** | 用于显示关系标签的模型属性名称。 默认值:name。
**select** | 用于名称的自定义SQL select语句。
**order** | 用于对选项进行排序的 order 子句。 示例:`name desc`。
**emptyOption** | 没有可用选择时显示的文本。
**scope** | 指定在**相关表单模型**中定义的[查询范围方法](../database/model.md#query-scopes)始终应用于列表查询。

<a name="widget-repeater"></a>
### 循环组件

`repeater` - 呈现定义在其中的一组重复的表单字段。

```yaml
extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            added_at:
                label: 添加日期
                type: datepicker
            details:
                label: 详情
                type: textarea
            title_when_collapsed:
                label: 此字段是折叠时的标题
                type: text
```

选项 | 描述
------------- | -------------
**form** | 对表单字段定义文件的引用，请参阅 [后端表单字段](#defining-form-fields)。 也可以使用内联字段。
**prompt** | 为创建按钮显示的文本。 默认值:Add new item。
**titleFrom** | 项目中的字段名称，用作折叠项目的标题。
**minItems** | 循环组件允许的最少项目数。 不使用组时预先显示这些项目。 例如，如果您设置 **'minItems: 1'** 第一行将被显示而不是隐藏。
**maxItems** | 循环组件允许的最大项目数。
**groups** | 引用一组表单字段，将循环组件置于组模式(见下文)。 也可以使用内联定义。
**style** | 循环组件的行为样式。 可以是以下之一:`default`、`collapsed` 或 `accordion`。 有关详细信息，请参阅下面的**循环组件样式**部分。

循环组件字段支持组模式，该模式允许为每次迭代选择一组自定义字段。

```yaml
content:
    type: repeater
    prompt: 添加内容块
    groups: $/acme/blog/config/repeater_fields.yaml
```

这是一个组配置文件的示例，它位于 **/plugins/acme/blog/config/repeater_fields.yaml** 中。 或者，这些定义可以与循环组件中内联指定。

```yaml
textarea:
    name: Textarea
    description: 基本文本字段
    icon: icon-file-text-o
    fields:
        text_area:
            label: 文字内容
            type: textarea
            size: large

quote:
    name: Quote
    description: Quote item
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: 位置
            type: radio
            options:
                left: 左
                center: 中
                right: 右
        quote_content:
            span: auto
            label: 详情
            type: textarea
```

每个组必须指定一个唯一键，并且支持定义以下选项。

选项 | 描述
------------- | -------------
**name** | 组的名称。
**description** | 组的简要说明。
**icon** | 定义组的图标，可选。
**fields** | 属于该组的表单字段，请参阅 [后端表单字段](#defining-form-fields)。

> **注意**:组key与保存的数据一起存储为`_group`属性。

#### 循环组件样式

循环组件的`style`属性控制循环项目的行为。 开发人员可以使用三种不同类型的样式:

- **default** 将所有循环项目设置为在页面加载时展开。 这是默认行为，如果在循环组件的配置中未定义样式，则将使用此行为。
- **collapsed** 在页面加载时将所有循环项目显示为折叠(最小化)。 用户可以根据需要折叠或展开项目。
- **accordion** 在页面加载时仅将第一个循环项目显示为展开，而所有其他中循环项目折叠。 当另一个项目展开时，任何其他展开的项目都将折叠，从而有效地使其一次仅展开一个项目。

<a name="widget-richeditor"></a>
### 富文本编辑器/WYSIWYG编辑器

`richeditor` - 为富格式文本呈现可视化编辑器，也称为所见即所得(WYSIWYG)编辑器。

```yaml
html_content:
    type: richeditor
    toolbarButtons: bold|italic
    size: huge
```

选项 | 描述
------------- | -------------
**toolbarButtons** | 在编辑器工具栏上显示哪些按钮。

可用的工具栏按钮有:

```
fullscreen, bold, italic, underline, strikeThrough, subscript, superscript, fontFamily, fontSize, |, color, emoticons, inlineStyle, paragraphStyle, |, paragraphFormat, align, formatOL, formatUL, outdent, indent, quote, insertHR, -, insertLink, insertImage, insertVideo, insertAudio, insertFile, insertTable, undo, redo, clearFormatting, selectAll, html
```

> **注意**:`|` 将在工具栏中插入垂直分隔线，而 `-` 将插入水平分隔线。

<a name="widget-sensitive"></a>
### 机密信息

`sensitive` - 呈现可显示的密码字段，可用于敏感信息，例如 API 密钥或密码、配置值等。敏感字段可以根据用户的请求切换为可见和隐藏。

包含先前输入值的敏感字段将在加载时将值替换为占位符，以防止该值被长度猜测或复制。 显示该值后，AJAX 将检索原始值并将其填充到该字段中。

```yaml
api_secret:
    type: sensitive
    allowCopy: false
    hideOnTabChange: true
```

选项 | 描述
------------- | -------------
**mode** | 组件的显示模式，textarea(文本域)或text(文本)。 默认值:text
**allowCopy** | 向敏感字段添加"复制"操作，允许用户复制密码而不泄露密码。 默认值:true
**hiddenPlaceholder** | 设置占位符文本，用于模拟隐藏的、未显示的值。 您可以将其更改为长字符串或短字符串以模拟不同的长度值。 默认值:`__hidden__`
**hideOnTabChange** | 如果为 true，假设用户导航到不同的选项卡或最小化浏览器，敏感字段将自动隐藏。 默认值:true

<a name="widget-taglist"></a>
### 标签列表

`taglist` - 呈现一个用于输入标签列表的字段。

```yaml
tags:
    type: taglist
    separator: space
```

标签列表支持与 [下拉列表类型](#field-dropdown) 相同的方法来定义选项。

```yaml
tags:
    type: taglist
    options:
        - Red
        - Blue
        - Orange
```

您可以使用名为 **relation** 的`mode`，其中字段名称是 [多对多关系](../database/relations#many-to-many)。 这将通过关系自动获取和分配标签。 如果支持自定义标签，则会在分配之前创建它们。

```yaml
tags:
    type: taglist
    mode: relation
```

选项 | 描述
------------- | -------------
**mode** | 控制如何返回值，string(字符串)、array(数组)或relation(关系)。 默认值:string
**separator** | 用指定的字符分隔标签，comma(逗号)或space(空格)。 默认值:comma
**customTags** | 允许用户手动输入自定义标签。 默认值:true
**options** | 指定预定义选项的方法或数组。 设置为 true 以使用模型 `get*Field*Options` 方法,可选。 
**nameFrom** | 如果使用关系模式，则显示标签名称的模型属性名称。 默认值:name
**useKey** | 使用 key 代替 value 来保存和读取数据。 默认值:false

## 表单视图

对于表单支持 [创建](#create-page)、[更新](#update-page) 和 [预览](#preview-page) 的每个页面，您应该提供一个具有相应名称的[视图文件](../backend/controllers -ajax.md) - **create.htm**、**update.htm** 和 **preview.htm**。

表单行为向控制器类添加了两个方法:`formRender` 和 `formRenderPreview`。 这些方法呈现使用上述 YAML 文件配置的表单控件。

### 创建视图

**create.htm** 视图代表允许用户创建新记录的创建页面。 典型的创建页面包含面包屑、表单本身和表单按钮。 **data-request** 属性应该引用表单行为提供的 `onSave` AJAX 处理程序。 下面是典型的 create.htm 表单的内容。
```php
<?= Form::open(['class'=>'layout']) ?>

    <div class="layout-row">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div class="loading-indicator-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="close:true"
                data-hotkey="ctrl+enter, cmd+enter"
                data-load-indicator="创建中..."
                class="btn btn-default">
                保存并关闭
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">取消</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

### 更新视图

**update.htm** 视图表示允许用户更新或删除现有记录的更新页面。 典型的更新页面包含面包屑、表单本身和表单按钮。 更新页面与创建页面非常相似，但通常有删除按钮。 **data-request** 属性应该引用表单行为提供的 `onSave` AJAX 处理程序。 以下是典型 update.htm 表单的内容。

```php
<?= Form::open(['class'=>'layout']) ?>

    <div class="layout-row">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div class="loading-indicator-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="close:true"
                data-hotkey="ctrl+enter, cmd+enter"
                data-load-indicator="保存中..."
                class="btn btn-default">
                保存并关闭
            </button>
            <button
                type="button"
                class="oc-icon-trash-o btn-icon danger pull-right"
                data-request="onDelete"
                data-load-indicator="删除中..."
                data-request-confirm="您真的要删除此类别吗？">
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">取消</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

### 预览视图

**preview.htm** 视图代表预览页面，允许用户以只读模式预览现有记录。 典型的预览页面包含面包屑和表单本身。 下面是典型的 preview.htm 表单的内容。

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

## 对字段应用条件

有时您可能希望在某些条件下操作表单字段的值或外观，例如，如果选中复选框，您可能希望隐藏输入。 有几种方法可以做到这一点，通过使用触发器 API 或字段依赖项。 输入预设转换器主要用于转换字段值。 这些选项将在下面更详细地描述。

### 输入预置转换器

输入预设转换器使用 `preset` [表单字段选项](#field-options) 定义，允许您将输入到元素中的文本转换为另一个输入元素中的 URL、slug 或文件名值。

在此示例中，当用户在`title`字段中输入文本时，我们将自动填写`URL`字段值。 如果为 Title 输入文本 **Hello world**，则 URL 将跟随转换成 **/hello-world**。 仅当目标字段 (`url`) 为空且未触及时才会发生此行为。

```yaml
title:
    label: 标题

url:
    label: 网址
    preset:
        field: title
        type: url
```

或者，`preset` 值也可以是仅引用 **field** 的字符串，`type` 选项将默认为 **slug**。

```yaml
slug:
    label: Slug
    preset: title
```

`preset` 选项可使用以下选项:

选项 | 描述
------------- | -------------
**field** | 定义要从中获取值的另一个字段名称。
**type** | 指定转换类型。 有关支持的值，请参见下文。
**prefixInput** | 可选，使用 CSS 选择器为转换后的值添加在提供的输入元素中找到的值的前缀。

以下是支持的类型:

选项 | 描述
------------- | -------------
**exact** | 复制确切的值
**slug** | 将复制的值格式化为 slug
**url** | 与 slug 相同，但以 / 为前缀
**camel** | 使用 camelCase 格式化复制的值
**file** | 将复制的值格式化为文件名，其中空格替换为破折号

### 触发事件

触发事件是使用 `trigger` [表单字段选项](#field-options) 定义的，是一个使用 JavaScript 的基于浏览器的简单解决方案。它允许您根据另一个元素的状态更改元素属性，例如可见性或值。这是一个示例定义:

```yaml
is_delayed:
    label: 稍后发送
    comment: 如果您想稍后发送此消息，请在此框中打勾。
    type: checkbox

send_at:
    label: 发送日期
    type: datepicker
    cssClass: field-indent
    trigger:
        action: show
        field: is_delayed
        condition: checked
```

在上面的示例中，只有在选中了 `is_delayed` 字段时才会显示 `send_at` 表单字段。换句话说，如果另一个表单输入(字段)被选中(条件)，则该字段将显示(动作)。 `trigger` 定义指定了这些选项:

选项 | 描述
------------- | -------------
**action** | 定义满足条件时应用于此字段的操作。 支持的值:show(显示), hide(隐藏), enable(启用), disable(禁用), empty(空)。
**field** | 定义将触发操作的其他字段名称。 通常，字段名称是指同一级别表单中的字段。 例如，如果此字段位于 [循环组件部件](#repeater) 中，则只会检查同一循环组件部件中的字段。 但是，如果字段名称前面有一个插入符号 `^`，例如:`^parent_field`，它将指代循环组件或比当前字段本身高一级的字段。 此外，如果使用了多个插入符号 `^`，它将引用更高的级别:`^^grand_parent_field`、`^^^grand_grand_parent_field` 等。
**condition** | 确定指定字段应满足的条件，以将条件视为"true"。 支持的值:checked(选中), unchecked(未选中), value[somevalue](值)。

### 字段依赖

表单字段可以通过定义 `dependsOn` [表单字段选项](#field-options) 来声明对其他字段的依赖关系，这提供了更强大的服务器端解决方案，用于在修改字段的依赖项时更新字段。当声明为依赖项的字段发生更改时，定义字段将使用 AJAX 框架进行更新。这提供了使用 `filterFields` 方法与字段属性交互的机会，或者更改要提供给字段的可用选项。

```yaml
country:
    label: 国家
    type: dropdown

state:
    label: 状态
    type: dropdown
    dependsOn: country
```

在上面的示例中，当 `country` 字段的值发生变化时，`state` 表单字段将刷新。发生这种情况时，当前表单数据将填充到模型中，以便下拉选项可以使用它。

```php
public function getCountryOptions()
{
    return ['au' => '澳大利亚', 'ca' => '加拿大', 'zh-cn' => '中华人民共和国'];
}

public function getStateOptions()
{
    if ($this->country == 'au') {
        return ['act' => '首都地区', 'qld' => '昆士兰', ...];
    }
    elseif ($this->country == 'ca') {
        return ['bc' => '不列颠哥伦比亚省', 'on' => '安大略省', ...];
    }
}
```

您可以通过覆盖使用的模型中的 `filterFields` 方法来过滤表单字段定义。这允许您根据模型数据操作可见性和其他字段属性。该方法有两个参数 **$fields** 将表示已由 [字段配置](#defining-form-fields) 定义的字段对象，**$context** 表示活动的表单上下文。

```php
public function filterFields($fields, $context = null)
{
    if ($this->source_type === 'http') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = true;
    }
    elseif ($this->source_type === 'git') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = false;
    }
    else {
        $fields->source_url->hidden = true;
        $fields->git_branch->hidden = true;
    }
}
```

上述逻辑将通过检查模型属性 `source_type` 的值在某些字段上设置 `hidden` 标志。此逻辑将在表单首次加载以及由 [定义的字段依赖项](#field-dependencies) 更新时应用。例如，这里是关联的表单字段定义。

```yaml
source_type:
    label: 来源类型
    type: dropdown
    options:
        git: Git
        http: Http
        upload: Upload

source_url:
    label: 来源网址
    type: text
    dependsOn: source_type

git_branch:
    label: Git 分支
    type: text
    dependsOn: source_type
```

您还可以扩展其他模型以应用 `filterFields` 逻辑，有关详细信息，请参阅 [过滤表单字段](#filtering-form-fields) 部分。

### 临时字段

有时您可能需要显示一个字段，同时阻止它被提交。 可以通过在字段名称前添加下划线 (\_) 将字段定义为临时字段。 这些字段会自动清除，不再保存到模型中，例如使用以下 `_map` 字段。

```yaml
address:
    label: 标题
    type: text

_map:
    label: 在地图上指出您的地址
    type: mapviewer
```

## 扩展表单行为

有时您可能希望修改默认的表单行为，有几种方法可以做到这一点。

### 重写控制器动作

您可以为控制器中的 `create`, `update`或`preview`操作方法使用自己的逻辑，然后可以选择调用表单行为父方法。

```php
public function update($recordId, $context = null)
{
    //
    // 在此处执行任何自定义代码
    //

    // 调用 FormController 行为 update() 方法
    return $this->asExtension('FormController')->update($recordId, $context);
}
```

### 重写控制器重定向

您可以通过覆盖 `formGetRedirectUrl` 方法指定保存模型后重定向 URL。 此方法返回要重定向的位置，相对 URL 被视为后端 URL。

```php
public function formGetRedirectUrl($context = null, $model = null)
{
    return 'https://octobercms.com';
}
```

### 扩展表单模型查询

可以通过覆盖控制器类中的 `formExtendQuery` 方法来扩展表单 [数据库模型](../database/model.md) 的查找查询。 此示例把 **withTrashed** 范围应用于查询来确保仍然可以找到和更新软删除的记录:

```php
public function formExtendQuery($query)
{
    $query->withTrashed();
}
```

### 扩展表单字段

您可以通过调用控制器类上的`extendFormFields`静态方法从外部扩展另一个控制器的字段。 该方法可以接受三个参数，**$form** 将代表表单小部件对象，**$model** 代表表单使用的模型，**$context** 是包含表单上下文的字符串。 以这个控制器为例:

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = ['Backend.Behaviors.FormController'];

    public $formConfig = 'config_form.yaml';
}
```

使用 `extendFormFields` 方法，您可以将额外的字段添加到此控制器呈现的任何表单中。 由于这可能会影响此控制器使用的所有表单，因此最好检查 **$model** 的类型是否正确。 这是一个例子:

```php
Categories::extendFormFields(function($form, $model, $context) {
    if (!$model instanceof MyModel) {
        return;
    }

    $form->addFields([
        'my_field' => [
            'label'   => '我的字段',
            'comment' => '这是我添加的自定义字段。',
        ],
    ]);

});
```

您还可以通过覆盖控制器类中的 `formExtendFields` 方法在内部扩展表单字段。 这只会影响 `FormController` 行为使用的表单。

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function formExtendFields($form)
    {
        $form->addFields([...]);
    }
}
```

$form 对象可以使用以下方法。

方法 | 描述
------------- | -------------
**addFields** | 向外部区域添加新字段
**addTabFields** | 将新字段添加到选项卡区域
**addSecondaryTabFields** | 将新字段添加到辅助选项卡式区域
**removeField** | 从任何区域中删除字段

每个方法都采用类似于 [表单字段配置](#defining-form-fields) 的字段数组。

### 过滤表单字段

如 [字段依赖项](#field-dependencies) 中所述，您还可以通过挂钩到 `form.filterFields` 事件来实现表单字段过滤。

```php
User::extend(function ($model) {
    $model->bindEvent('model.form.filterFields', function ($formWidget, $fields, $context) use ($model) {
        if ($model->source_type === 'http') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = true;
        }
        elseif ($model->source_type === 'git') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = false;
        }
        else {
            $fields->source_url->hidden = true;
            $fields->git_branch->hidden = true;
        }
    });
});
```

## 验证表单字段

要验证表单的字段，您可以在模型中使用 [验证](../database/traits.md#validation)特性。
