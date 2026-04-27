---
subtitle: 了解不同的表单字段类型。
---
# 表单字段

表单字段、表单 UI 和表单小部件是表单使用的字段定义，例如文本输入框。它们通常在以下区域中使用：

- [CMS 主题设置](../cms/themes/settings.md)
- [Tailor 内容字段](../cms/tailor/content-fields.md)
- [后端表单控制器](../extend/forms/form-controller.md)
- [后端关联控制器](../extend/forms/relation-controller.md)

所有表单字段都通过各自的 **type** 属性来标识。

```yaml
fields:
    myfield:
        type: textarea
        # ...
```

表单字段包含通用和简单的字段。表单 UI 是可以包含在表单中以帮助布局设计的用户界面元素。表单小部件通常引入更复杂的功能，插件通常会提供自己的自定义表单小部件。Tailor 字段是仅在 Tailor 蓝图内可用的字段。

## 可用字段

以下表单字段可用：

<div class="content-list-p" markdown="1">

[Mixin](./content/field-mixin.md)
[Entries](./content/field-entries.md)
[Text](./form/field-text.md)
[Number](./form/field-number.md)
[Password](./form/field-password.md)
[Email](./form/field-email.md)
[Textarea](./form/field-textarea.md)
[Dropdown](./form/field-dropdown.md)
[Radio List](./form/field-radio.md)
[Balloon Selector](./form/field-balloon.md)
[Checkbox](./form/field-checkbox.md)
[Checkbox List](./form/field-checkboxlist.md)
[Switch](./form/field-switch.md)
[Code Editor](./form/widget-codeeditor.md)
[Color Picker](./form/widget-colorpicker.md)
[Data Table](./form/widget-datatable.md)
[Date Picker](./form/widget-datepicker.md)
[File Upload](./form/widget-fileupload.md)
[Markdown Editor](./form/widget-markdown.md)
[Media Finder](./form/widget-mediafinder.md)
[Nested Form](./form/widget-nestedform.md)
[Record Finder](./form/widget-recordfinder.md)
[Relation](./form/widget-relation.md)
[Repeater](./form/widget-repeater.md)
[Rich Editor](./form/widget-richeditor.md)
[Page Finder](./form/widget-pagefinder.md)
[Sensitive](./form/widget-sensitive.md)
[Tag List](./form/widget-taglist.md)
[Currency](./form/widget-currency.md)
[Boxes](./form/widget-boxes.md)
[Section](./form/ui-section.md)
[Hint](./form/ui-hint.md)
[Ruler](./form/ui-ruler.md)
[Partial](./form/ui-partial.md)

</div>

## 字段属性

对于每个字段，您可以指定以下通用属性（如适用）。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**type** | 定义此字段的渲染方式。默认值：`text`。
**span** | 将表单字段对齐到一侧。选项：`auto`、`left`、`right`、`row`、`full`。默认值：`full`。
**spanClass** | 与 span `row` 属性一起使用，将表单显示为 Bootstrap 网格，例如 `spanClass: col-4`。
**size** | 为使用它的字段指定大小，例如 textarea 字段。选项：`tiny`、`small`、`large`、`huge`、`giant`。
**placeholder** | 如果该字段支持占位符值。
**comment** | 在字段下方放置描述性注释。
**commentAbove** | 在字段上方放置注释。
**commentHtml** | 允许在注释中使用 HTML 标记。选项：`true`、`false`。
**default** | 指定字段的默认值。对于 `dropdown`、`checkboxlist`、`radio` 和 `balloon-selector` 小部件，您可以在此处指定一个选项键以使其默认被选中。
**defaultFrom** | 从另一个模型属性的值中获取默认值。
**tab** | 将字段分配到选项卡。
**cssClass** | 为字段容器分配 CSS 类。
**autoFocus** | 标记该字段在表单加载时获得焦点。默认值：`false`。
**readOnly** | 防止字段被修改。选项：`true`、`false`。
**disabled** | 防止字段被修改并将其从保存的数据中排除。选项：`true`、`false`。
**hidden** | 从视图中隐藏字段并将其从保存的数据中排除。选项：`true`、`false`。
**stretch** | 指定此字段是否拉伸以适应父级高度。
**context** | 指定显示字段时应使用的上下文。上下文也可以通过在字段名称中使用 `@` 符号来传递，例如 `name@update`。
**dependsOn** | 此字段[依赖](../extend/forms/field-dependencies.md)的其他字段名称数组，当其他字段被修改时，此字段将更新。
**changeHandler** | 字段值更改时要调用的 AJAX 处理程序名称，可选。
**trigger** | 使用触发器事件指定此字段的条件。
**preset** | 允许字段值最初由另一个字段的值设置，通过输入预设转换器进行转换。
**required** | 在字段标签旁边放置一个红色星号以表示该字段为必填项。请确保在模型上使用[验证特征](../extend/database/traits.md)，因为这不会由表单控制器强制执行。
**attributes** | 指定要添加到表单字段元素的自定义 HTML 属性。
**containerAttributes** | 指定要添加到表单字段容器的自定义 HTML 属性。
**order** | 确定显示顺序时的数值权重，默认值每个字段递增 100 点。
**permissions** | 当前后端用户必须拥有的[权限](../extend/backend/permissions.md)才能使用该字段。支持单个权限的字符串或权限数组（只需其中一个即可授予访问权限）。

### 选项卡属性

在选项卡中指定字段定义的示例。

```yaml
tabs:
    fields:
        username:
            type: text
            label: Username
            tab: User

        groups:
            type: relation
            label: Groups
            tab: Groups
```

对于每个选项卡定义，即 `tabs` 和 `secondaryTabs`，您可以指定以下属性。

属性 | 描述
------------- | -------------
**stretch** | 指定此选项卡是否拉伸以适应父级高度。
**defaultTab** | 分配字段的默认选项卡。默认值：Misc。
**activeTab** | 表单首次加载时选中的选项卡，名称或索引。默认值：`1`
**icons** | 使用选项卡名称作为键为选项卡分配图标。
**lazy** | 点击时动态加载的选项卡数组。适用于包含大量内容的选项卡。
**identifiers** | 用于定位选项卡的自定义 HTML 标识符数组。适用于使用 JavaScript 显示和隐藏选项卡。
**linkable** | 确定选项卡是否可以使用 URL 片段进行链接。默认值：`true`
**cssClass** | 为选项卡容器分配 CSS 类。
**paneCssClass** | 为单个选项卡面板分配 CSS 类。值是数组，键是选项卡索引或标签，值是 CSS 类。也可以指定为字符串，在这种情况下该值将应用于所有选项卡。

应用属性到选项卡的示例。

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

    identifiers:
        User: userTab

    fields:
        # [...]
```

### 自定义字段类型

有各种原生字段类型可用于 **type** 设置。也可以通过指定[表单字段小部件](../extend/forms/form-widgets.md)的 PHP 类名直接渲染字段。

```yaml
blog_content:
    type: Backend\FormWidgets\RichEditor
    size: huge
```

### 嵌套字段选择

```yaml
avatar[name]:
    label: Avatar
    comment: will be saved in the Avatar table
```

上面的示例将在 PHP 中分别通过 `$record->avatar->name` 或 `$record->avatar['name']` 获取和保存值。

### 字段门面

有时您可能需要显示一个字段但阻止其被提交。可以通过在字段名称前添加下划线 (\_) 将字段定义为门面。这些字段会被自动清除，不再保存到模型中，例如以下的 `_map` 字段。

```yaml
address:
    label: Title
    type: text

_map:
    label: Point your address on the map
    type: mapviewer
```

## 字段条件

有时您可能需要在某些条件下操作表单字段的值或外观，例如，您可能希望在勾选复选框时隐藏输入框或预设另一个字段的值。

### 触发器事件

触发器事件使用 `trigger` 表单字段属性定义，是一种简单的基于浏览器的解决方案，使用 JavaScript。它允许您根据另一个元素的状态更改元素属性，例如可见性或值。以下是示例定义：

```yaml
is_delayed:
    label: Send later
    comment: Place a tick in this box if you want to send this message at a later time.
    type: checkbox

send_at:
    label: Send date
    type: datepicker
    cssClass: field-indent
    trigger:
        action: show
        field: is_delayed
        condition: checked
```

在上面的示例中，`send_at` 表单字段仅在 `is_delayed` 字段被勾选时才会显示。换句话说，当另一个表单输入（field）被勾选（condition）时，该字段将显示（action）。

`trigger` 定义指定以下属性。

属性 | 描述
------------- | -------------
**action** | 定义满足条件时应用于此字段的操作。支持的值：`show`、`hide`、`enable`、`disable`、`empty`、`fill[somevalue]`。
**field** | 触发操作的另一个字段名称的引用。示例：`color` 或 `color[]`。
**condition** | 确定指定字段应满足的条件，以使条件被视为 `true`。支持的值：`checked`、`unchecked`、`value[somevalue]`。

#### 多个操作

您可以通过使用管道 `|` 符号分隔来组合多个操作。以下将在触发条件满足时同时显示和清空输入。

```yaml
trigger:
    action: show|empty
    condition: checked
    field: name
```

#### 多值条件

使用 `value[]` 条件时，您可以通过在第一个值后传递额外的值来查找多个值，格式为 `value[][]`。

```yaml
trigger:
    action: show
    condition: value[csv][csv_custom]
    field: file_format
```

#### 通配符值条件

您可以使用通配符字符（`*`）检查 `value[]` 条件是否匹配多个可能的值，例如，**foo\*** 匹配以 "foo" 开头的任何内容，**\*bar** 匹配以 "bar" 结尾的任何内容。

```yaml
trigger:
    action: show
    condition: value[*.mp4]
    field: file_name
```

#### 多字段值

某些字段，例如 [Checkbox List](./form/field-checkboxlist.md) 和 [Tag List](./form/widget-taglist.md)，会将其值存储为数组。引用这些字段时，字段名称应使用数组后缀（`[]`）来查看所有可能的值。例如，如果 `colors` 字段名称支持多个值，则应使用字段名称 `colors[]` 作为引用。

```yaml
trigger:
    action: show
    condition: value[red][green]
    field: colors[]
```

#### 引用父级字段

通常字段名称引用同一级别表单中的字段。例如，如果此字段在[重复器小部件](./form/widget-repeater.md)中，则只会检查同一重复器小部件中的字段。但是，如果字段名称前面有脱字符 `^`，如：`^parent_field`，它将引用比字段本身高一级的重复器小部件或表单。

在下面的示例中，当 `type` 字段设置为 **Complex** 时，`colors` 字段将显示。

```yaml
fields:
    type:
        label: Type
        type: dropdown
        options:
            1: Simple
            2: Complex

    content:
        label: Content
        type: nestedform
        form:
            fields:
                colors:
                    label: Colors
                    type: colorpicker
                    trigger:
                        action: show
                        field: ^type
                        condition: value[2]
```

::: tip
此外，如果使用多个脱字符 `^`，它将引用更高的层级：`^^grand_parent_field`、`^^^grand_grand_parent_field`，依此类推。
:::

### 输入预设转换器

输入预设转换器使用 `preset` 表单字段属性定义，允许您将输入到一个元素中的文本转换为另一个输入元素中的 URL、slug 或文件名值。

在此示例中，当用户在 `title` 字段中输入文本时，我们将自动填充 `url` 字段的值。如果在 Title 中输入 **Hello world**，URL 将随之变为转换后的值 **/hello-world**。此行为仅在目标字段（`url`）为空且未被触碰时才会发生。

```yaml
title:
    label: Title

url:
    label: URL
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

以下是 `preset` 选项可用的选项：

选项 | 描述
------------- | -------------
**field** | 定义要从中获取值的其他字段名称。
**type** | 指定转换类型。请参阅下面的支持值。
**prefixInput** | 可选，使用 CSS 选择器在提供的输入元素中找到的值作为转换值的前缀。

以下是支持的类型：

类型 | 描述
------------- | -------------
**exact** | 复制精确的值
**slug** | 将复制的值格式化为 slug
**url** | 与 slug 相同，但带有 / 前缀
**camel** | 将复制的值格式化为 camelCase
**file** | 将复制的值格式化为文件名，空格替换为破折号
