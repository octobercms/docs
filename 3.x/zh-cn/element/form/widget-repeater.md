---
subtitle: 表单小部件
shortname: Repeater
---
# Repeater 字段

`repeater` - 使用关联记录或 [jsonable 属性](../../extend/system/models.md)渲染一组重复的表单字段。

```yaml
extra_information:
    type: repeater
    form:
        fields:
            added_at:
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认数组值，可选。
**comment** | 在字段下方放置描述性注释。
**form** | 内联字段定义或表单字段定义文件的引用。
**prompt** | 为创建按钮显示的文本。默认值：Add new item。
**displayMode** | 控制界面的显示方式，可选 **accordion** 或 **builder**。默认值：`accordion`
**useTabs** | 启用时显示选项卡，允许字段指定 `tab` 属性。默认值：`false`
**itemsExpanded** | 使用手风琴模式时，重复项目是否默认展开。默认值：`true`。
**titleFrom** | 项目内用作折叠项目标题的字段名称，可选。
**minItems** | 所需的最少项目数。不使用分组时预显示这些项目。例如，如果设置 `minItems: 1`，第一行将显示而不是隐藏。
**maxItems** | 重复器内允许的最大项目数。
**groups** | 引用一组表单字段，将重复器置于分组模式（见下文）。也可以使用内联定义。
**groupKeyFrom** | 与保存数据一起存储的分组键属性。默认值：`_group`
**showReorder** | 显示用于排序项目的界面。默认值：true
**showDuplicate** | 显示用于克隆项目的界面。默认值：true

`titleFrom` 属性可用于指定重复器折叠时使用的值。

```yaml
extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            # ...
            title_when_collapsed:
                label: This field is the title when collapsed
                type: text
```

重复器字段通过将 `useTabs` 属性设置为 `true` 来支持使用选项卡。

```yaml
extra_information:
    type: repeater
    useTabs: true
    form:
        added_at:
            label: Date added
            type: datepicker
            tab: Date
        details:
            label: Details
            type: textarea
            tab: Details
```

## 分组重复器

重复器字段支持使用 `groups` 的分组模式，允许为每次迭代选择一组自定义字段。

```yaml
content:
    type: repeater
    prompt: Add content block
    groups: $/acme/blog/config/fields_repeater.yaml
```

这是一个分组配置文件的示例，位于 **/plugins/acme/blog/config/fields_repeater.yaml**。为了更好的组织，`groups` 可以为每个分组定义指定一个文件。

```yaml
groups:
    textarea: $/acme/blog/config/fields_textarea.yaml
    quote: $/acme/blog/config/fields_quote.yaml
```

或者，定义可以与重复器内联指定。如果分组键以下划线（`_`）开头，则会被忽略。

```yaml
groups:
    textarea:
        name: Textarea
        description: Basic text field
        icon: icon-file-text-o
        fields:
            text_area:
                label: Text Content
                type: textarea
                size: large

    quote:
        name: Quote
        description: Quote item
        icon: icon-quote-right
        fields:
            quote_position:
                span: auto
                label: Quote Position
                type: radio
                options:
                    left: Left
                    center: Center
                    right: Right
            quote_content:
                span: auto
                label: Details
                type: textarea
```

每个分组必须指定唯一的键，定义支持以下选项。

选项 | 描述
------------- | -------------
**name** | 分组的名称。
**description** | 分组的简要描述。
**icon** | 为分组定义图标，可选。
**titleFrom** | 用于项目标题的字段名称，可选。
**fields** | 属于该分组的表单字段。
**useTabs** | 仅为该分组显示选项卡，可选。

::: tip
分组键与保存的数据一起存储为 `_group` 属性。这可以通过 `groupKeyFrom` 选项进行自定义。
:::

## 使用关联记录的示例

重复器表单小部件将自动检测模型属性是否为关联字段并使用它。以下提供了一个可供使用的示例实现。例如，如果您的模型使用引用 **RepeaterItem** 模型的 `hasMany` 关系，重复器将为每个项目使用此关联模型。

```php
public $hasMany = [
    'extra_information' => [
        RepeaterItem::class,
        'key' => 'parent_id',
        'delete' => true
    ],
];
```

可以定义一个简单的[数据库表结构](../../extend/database/structure.md)，包括对父模型 `id` 的引用和用于动态属性的序列化 JSON `value`（见下文）。

```php
Schema::create('acme_blog_repeater_items', function($table) {
    $table->increments('id');
    $table->integer('parent_id')->unsigned()->nullable()->index();
    $table->mediumText('value')->nullable();
    $table->integer('sort_order')->nullable();
    $table->timestamps();
});
```

模型扩展 `October\Rain\Database\ExpandoModel` 基类，以允许在模型上设置动态属性并以 JSON 格式保存在数据库中。模型可以[包含附件](../../extend/database/attachments.md)和任何其他关联字段。

```php
use October\Rain\Database\ExpandoModel;

class RepeaterItem extends ExpandoModel
{
    use \October\Rain\Database\Traits\Sortable;

    public $table = 'acme_blog_repeater_items';

    protected $expandoPassthru = ['parent_id', 'sort_order'];

    public $attachMany = [
        'photos' => \System\Models\File::class,
    ];
}
```

最后，重复器项目可以指定为表单字段，附带表单字段定义，包括使用[模型关系](../../extend/database/relations.md)的字段。

```yaml
extra_information:
    type: repeater
    form:
        fields:
            title:
                label: title
            is_enabled:
                label: Enabled
                type: switch
            photos:
                label: Photos
                type: fileupload
                mode: image
```
