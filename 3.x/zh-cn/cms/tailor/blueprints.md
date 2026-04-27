---
subtitle: 网站内容的模板结构。
---
# 蓝图

## Entry

Entry 蓝图是用于定义网站区域的标准内容结构。内容结构和条目可以通过不同的方式组织，我们在这里进行更详细的描述。

`entry` 类型支持多个条目，当没有其他变体适用时应使用此类型。

```yaml
handle: Team\Member
type: entry
name: Team Member

fields:
    name:
        label: First Name
        type: text
```

Entry 蓝图支持以下属性。

属性 | 描述
-------- | -------------
**handle** | 用于标识条目的有意义且唯一的代码。
**type** | 蓝图类型，可以是 `entry`、`single`、`structure` 或 `stream` 的变体。
**name** | 处理此条目时显示的标签。
**fields** | 属于该组的表单字段，参见[后端表单字段](../../element/form-fields.md)。
**groups** | 引用一组表单字段，将条目置于分组模式（见下文）。
**structure** | 使用 `structure` 类型时提供的结构配置。
**drafts** | 为此条目启用草稿功能。默认值：`false`
**softDeletes** | 为此条目启用软删除。默认值：`true`
**multisite** | 为此条目启用多站点，在组、区域设置或所有站点之间同步记录。支持的值：`true`、`false`、`sync`、`locale`、`all`。默认值：`false`
**pagefinder** | 将蓝图类型包含在[页面查找器表单小部件](../../element/form/widget-pagefinder.md)中，支持的值：`true`、`false`、`item`、`list` 或数组（见下文）。默认值：`true`
**defaultSort** | 由 `entry` 和 `stream` 类型使用，当用户未定义偏好时设置默认排序列和方向。支持字符串或包含 `column` 和 `direction` 键的数组。方向可以是 `asc`（升序，默认）或 `desc`（降序）。
**customMessages** | 自定义用户界面中使用的消息（见下文）。
**showExport** | 显示用于导出记录的工具栏按钮。默认值：`true`。
**showImport** | 显示用于导入记录的工具栏按钮。默认值：`true`。

### Entry 变体

Entry 类型本身没有特定行为，但有几种变体可用于组织内容。以下类型是 Entry 的变体。

- **entry** 是用于通用目的的基本条目。
- **single** 是具有专用字段的单条目，例如：联系我们页面。
- **structure** 是条目的定义结构，例如：文档页面。
- **stream** 是带时间戳的条目流，例如：博客文章。

#### 单条目

`single` 类型将为每个部分定义强制使用单个条目。这对于一次性内容很有用，例如首页或联系我们页面。以下定义了一个带有欢迎信息（`welcome_message`）文本字段的 **Homepage** 部分。

```yaml
handle: Homepage
type: single
name: Homepage Content

fields:
    welcome_message:
        label: Welcome Message
        type: text
```

#### 结构条目

`structure` 类型允许多个结构化条目，支持父子关系。这对于嵌套内容很有用，例如文档部分。`structure` 类型的条目可排序，可以通过在列表视图中拖拽来调整排序顺序。以下定义了一个带有文章内容（`article_content`）markdown 字段的 **Documentation** 树形部分。

```yaml
handle: Docs\Article
type: structure
name: Documentation Article

fields:
    content:
        label: Article Content
        type: markdown
```

默认情况下结构支持无限嵌套，但是您可以使用 `structure` 属性中的 `maxDepth` 来指定树的最大深度。在下一个示例中，只能有顶层和第二层。

```yaml
# ...
type: structure

structure:
    maxDepth: 2
    # ...
```

`structure` 属性支持以下值。

属性 | 描述
-------- | -------------
**maxDepth** | 结构的最大深度。默认值：`0` 表示无限制。
**treeExpanded** | 树节点是否默认展开。默认值：`true`
**showReorder** | 显示用于重新排序记录的界面。默认值：`true`
**showSorting** | 允许对记录排序，排序时禁用结构。默认值：`true`

#### 流条目

`stream` 类型用于基于时间的条目，通常按时间顺序列出。这对于发布最近活动很有用，例如博客部分。以下定义了一个带有文章内容（`content`）富文本编辑器字段的 **Blog** 信息流部分。

```yaml
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Post Content
        type: richeditor
```

`defaultSort` 属性用于设置蓝图记录以列表形式显示时的默认排序列。默认情况下将设置为发布日期。

```yaml
handle: Blog\Post
type: stream
name: Blog Post

defaultSort:
    column: title
    direction: asc
```

### 内容组

所有条目可选地支持为一个部分定义多个内容组。例如，博客部分可能有常规文章和精选文章，这是两个条目组。

条目组由部分蓝图文件中的 **groups** 属性定义，可以为每种类型指定不同的 **fields**。选定的组值可通过记录上的 `content_group` 属性获取。

```yaml
handle: Blog\Post
type: stream
name: Blog Post

groups:
    regular_post:
        name: Regular Post
        fields:
            # ...

    featured_post:
        name: Featured Post
        fields:
            # ...
```

::: tip
建议使用[混入蓝图](#mixin)来分组通用字段定义。
:::

### 自定义消息

指定 `customMessages` 属性来覆盖界面使用的默认消息。值可以是纯文本或引用[本地化字符串](../../extend/system/localization.md)。

```yaml
customMessages:
    buttonCreate: Create New Event
```

以下是可作为自定义消息覆盖的可用消息。

::: details 查看可用消息列表
消息 | 默认消息
------------- | -------------
**buttonCreate** | Create :name Entry
**titleIndexList** | Manage :name Entries
**titleCreateForm** | Create :name
**titleUpdateForm** | Update :name
**pagefinderItemType** | :name Entry
**pagefinderListType** | All :name Entries
:::

### 禁用必填字段

条目记录要求在保存之前填写 `title` 和 `slug` 字段，此外 `slug` 字段还必须唯一。您可以通过在蓝图中覆盖这些字段来修改此功能。可以将 `validation` 属性设置为 **false**，或将 `hidden` 属性设置为 **true** 将其从用户界面中隐藏。以下示例将禁用两个字段的验证并隐藏 slug 字段。

```yaml
fields:
    title:
        validation: false

    slug:
        hidden: true
```

### 页面查找器配置

默认情况下，所有条目都包含在[页面查找器](../../element/form/widget-pagefinder.md)查询值中。可以通过将 **pagefinder** 设置为 `false` 来禁用。

```yaml
pagefinder: false
```

您可以将页面查找器上下文限制为仅允许将页面作为单个 `item`（例如博客文章）或 `list` 项目列表（例如所有博客文章）来定位，或设置为 `all` 时将同时显示两者。

```yaml
pagefinder: item
pagefinder: list
```

页面查找器将自动解析 `id`、`code`、`slug` 和 `fullslug` 属性，并将它们用作[页面 URL 参数](../themes/pages.md)中的替换值。您可以使用 **pagefinder** 属性将自定义 **replacements** 指定为数组，包括上述可选的 **context**。

```yaml
pagefinder:
    context: list
    replacements: []
```

每个替换键应匹配一个 URL 参数名称，并使用点表示法路径指向属性值。以下是博客文章页面的 URL 示例。

```ini
url = "/blog/post/:author/:category/:slug/:id"
```

以下 **replacements** 将把 `:author` 参数设置为关联作者的 slug 属性值，并将 `:category` 参数设置为第一个关联分类的 slug 属性值。

```yaml
pagefinder:
    replacements:
        author: author.slug
        category: categories.0.slug
```

## Global

Global 用于定义网站的全局可用内容。字段值通常在 [CMS 布局](../../cms/themes/layouts.md)中使用，包含社交网络链接等设置。

以下定义了一个带有 Facebook 链接（`facebook_link`）文本字段的 **Footer Config** 全局。

```yaml
handle: Site\Footer
type: global
name: Footer Config

fields:
    facebook_link:
        label: Facebook Link
        type: text
```

Global 蓝图支持以下属性。

属性 | 描述
-------- | -------------
**handle** | 用于标识条目的有意义且唯一的代码。
**name** | 处理此条目时显示的标签。
**fields** | 属于该组的表单字段，参见[后端表单字段](../../element/form-fields.md)。
**multisite** | 为此条目启用多站点，支持的值：`true`、`false`。默认值：`false`
**formSize** | 设置表单大小，支持的值：`tiny`、`small`、`medium`、`large`、`huge`、`giant`、`adaptive`。默认值：`huge`。

## Mixin

Mixin 是一组字段，用于在定义内容结构时避免重复。例如，Location 字段可能在多个地方使用，但我们可以使用混入定义只定义一次。

以下定义了一个带有国家（`country_code`）和州/省（`state_code`）文本字段的 **Location** 集合。

```yaml
handle: Fields\Location
type: mixin
name: Location

fields:
    country_code:
        label: Country
        type: text

    state_code:
        label: State
        type: text
```

Mixin 蓝图支持以下属性。

属性 | 描述
-------- | -------------
**handle** | 用于标识条目的有意义且唯一的代码。
**name** | 处理此条目时显示的标签。
**fields** | 属于该组的表单字段，参见[后端表单字段](../../element/form-fields.md)。

::: tip
建议在混入文件和字段名称前加下划线（\_），以便于识别蓝图类型。例如：`_location_fields.yaml`
:::

### 使用混入

要在条目中包含这些字段，与任何其他表单字段一样，使用 **mixin** 类型并在 `source` 属性中引用 UUID 或 handle。

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

有关使用混入的更多信息，请参阅[混入字段](../../element/content/field-mixin.md)。

#### 另请参阅

::: also
* [混入内容字段](../../element/content/field-mixin.md)
:::
