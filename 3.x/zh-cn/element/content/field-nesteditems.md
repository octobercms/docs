---
subtitle: 内容字段
shortname: Nested Items
---
# Nested Items 字段

`nesteditems` - 创建专属于当前记录的嵌套记录。

```yaml
items:
    label: Menu Items
    type: nesteditems
    span: adaptive
    form:
        fields:
            title:
                label: Title
                type: text
```

<VideoBlockLink src="https://www.youtube.com/watch?v=vhs9U3_BHqg" title="Nested Items Tutorial" description="This video demonstrates how to implement the Nested Items content field using step by step instructions." prompt="Watch the tutorial" />

支持以下属性。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认数组值，可选。
**comment** | 在字段下方放置描述性注释。
**form** | 内联表单字段定义。
**maxDepth** | 显示用于重新排序记录的界面，指定最大深度。设置为 `0` 表示无限深度。
**customMessages** | 自定义用户界面中使用的消息。

与其他表单一样，嵌套项目支持使用选项卡，只需将字段放在 `form` 定义的 `tabs` 或 `secondaryTabs` 属性下即可。

```yaml
tabbed_content:
    type: nesteditems
    form:
        tabs:
            fields:
                # ...
```

`customMessages` 属性用于修改字段定义中使用的各种消息。可用的消息与[关联控制器行为](../../extend/forms/relation-controller.md)的消息相同。

```yaml
author:
    type: nesteditems
    customMessages:
        buttonCreate: New Author
        titleUpdateForm: Update Author
        titleCreateForm: Create Author
```

#### 另请参阅

::: also
* [Entries 内容字段](./field-entries.md)
* [Repeater 表单字段](../form/widget-repeater.md)
:::
