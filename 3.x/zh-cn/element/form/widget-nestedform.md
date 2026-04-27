---
subtitle: 表单小部件
shortname: Nested Form
---
# Nested Form 字段

`nestedform` - 使用关联记录或 [jsonable 属性](../../extend/system/models.md)渲染嵌套表单。字段可以内联定义或使用外部 yaml 文件。

```yaml
content:
    type: nestedform
    showPanel: false
    form:
        fields:
            added_at:
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
            title:
                label: This the title
                type: text
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**comment** | 在字段下方放置描述性注释。
**form** | 内联字段定义或表单字段定义文件的引用。
**showPanel** | 将表单放在面板容器内。默认值：`true`
**defaultCreate** | 如果未找到关联记录，尝试创建一个。默认值：`false`

将字符串传递给 `form` 属性以引用外部 yaml 文件。

```yaml
profile:
    label: Profile
    type: nestedform
    form: $/october/demo/models/profile/fields.yaml
```

与其他表单一样，嵌套表单小部件支持使用选项卡，只需将字段放在 `form` 定义的 `tabs` 或 `secondaryTabs` 属性下即可。

```yaml
tabbed_content:
    type: nestedform
    form:
        tabs:
            fields:
                # ...
```

#### 另请参阅

::: also
* [Repeater 表单小部件](./widget-repeater.md)
:::
