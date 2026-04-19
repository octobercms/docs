---
subtitle: 使用 Tailor 将网站内容定制为您的精确需求。
---
# 介绍

<VideoBlockLink src="https://www.youtube.com/watch?v=_WMH4mlMdjk" title="Tailor Tutorial" description="本视频介绍如何使用 Tailor 快速创建完整的博客解决方案。" prompt="观看教程" />

Tailor 是一项功能，用于定义网站使用的基于文件的内容结构，例如公司博客或团队页面。Tailor 自动生成用于管理记录的后端用户界面，并提供 CMS 组件用于在前端显示和链接记录。

使用 Tailor 时，您可以跳过传统的插件开发工作流程，直接定义内容。字段通过蓝图模板简单定义，内容存储在特殊的数据库表中。蓝图模板还可以指定导航和其他修饰符。

## 目录结构

蓝图是 YAML 文件，默认位于 **app/blueprints** 目录中，此外还有 **themes/.../blueprints** 目录用于 [CMS 主题](../themes/themes.md)。蓝图的放置位置取决于使用场景：**应用蓝图** 全局可用，而 **主题蓝图** 仅在选择该主题时可用。

### 应用蓝图

下面是一个蓝图目录结构示例。每个蓝图可以位于任何目录中，并且可以使用任何文件名。蓝图可以组织在任意嵌套深度的子目录中。

::: dir
├── app
|   └── `blueprints`  _← 蓝图从这里开始_
|       ├── blog
|       │   └── blog.yaml
|       │   └── author.yaml
|       ├── about
|       │   └── about.yaml
|       ├── wiki
|       │   └── article.yaml
:::

### 主题蓝图

接下来是 **demo** 主题中蓝图结构的示例。与应用目录中一样，蓝图可以位于任何目录中，使用任何文件名，具有任意嵌套深度。这些蓝图的管理面板导航仅在选择该主题时出现，通常由[多站点设置](../resources/multisite.md)控制。

::: dir
├── themes
|   └── demo
|       ├── `blueprints`  _← 蓝图从这里开始_
|       │   └── settings.yaml
|       │   └── color-scheme.yaml
:::

## 蓝图类型

蓝图的 **type** 属性决定蓝图的实现方式。有多种类型可用，大多数蓝图会指定[表单字段定义](../../element/form-fields.md)。

类型 | 描述
------------- | -------------
Entry | 支持草稿的标准内容结构。
Global | 数据库中的单条记录，通常用于设置和配置。
Mixin | 定义可重用的字段定义，可以导入并与其他字段定义混合使用。

每种蓝图类型在[蓝图文章](./blueprints.md)中有更详细的描述。

## 蓝图结构

::: aside
蓝图 100% 可移植。它们使用内部标识符，可以位于任何目录中，使用任何文件名。
:::

蓝图使用 YAML 语法定义，始终包含三个标识符：唯一的 UUID、用户友好的 handle 和蓝图类型。蓝图的文件名和文件夹用于组织蓝图，不作为标识符使用。所有其他属性在蓝图的相关文档文章中定义。

```yaml
uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
handle: Blog\Post
type: entry
name: Post

fields:
    # [...]
```

蓝图 **handle** 是一种人类可读的方式来引用蓝图对象。以上面的蓝图为例，我们可以使用 handle 来引用条目。

::: tip
Handle 遵循与 PHP 命名空间类似的命名约定，可以使用反斜杠 `\` 分隔符进行组织。
:::

```ini
[section blog]
handle = "Blog\Post"
```

蓝图 **uuid** 是蓝图之间相互引用时使用的唯一标识符。例如，当字段引用混入时。首次创建蓝图时，您可以选择不包含 UUID，系统会在首次迁移时自动为您创建一个。

```yaml
_blog_content:
    source: edcd102e-0525-4e4d-b07e-633ae6c18db6
    type: mixin
```

## 与多站点集成

蓝图默认不使用[多站点功能](../resources/multisite.md)。您可以使用 `multisite` 属性来启用此功能。启用后，记录可以在每个配置的站点中保持唯一。

```yaml
handle: Blog\Post
type: entry
# ...
multisite: true
```

启用多站点后，蓝图中的所有字段都变为可翻译的。要保持某个字段的值不变，请将 `translatable` 属性设置为 false。在此示例中，保存记录时 **name** 字段将被复制到每个站点。

```yaml
# ...
multisite: true

fields:
    name:
        label: Full Name
        type: text
        translatable: false
```

您还可以将值设置为 **sync** 以保持记录在各站点之间同步，这对于分类和标签很有用。使用 sync 时，每条记录将始终存在于每个站点上，尽管内容可以不同。

```yaml
multisite: sync
```

使用[站点组](../resources/multisite.md)时，记录将传播到该组内的所有站点。可以通过将 `multisite` 属性设置为 **all** 来更改此行为，以在所有站点之间同步。

```yaml
multisite: all
```

设置为 **locale** 将把记录同步到共享相同区域设置的所有站点。

```yaml
multisite: locale
```

## 迁移蓝图

蓝图及其结构在正常的数据库迁移过程中进行迁移。当手动更改蓝图文件时，您应该运行 `tailor:migrate` 命令来更新数据库表。

```bash
php artisan tailor:migrate
```

::: tip
当调试模式关闭时，蓝图会被缓存。迁移命令也可以用于清除蓝图缓存。
:::

### 刷新内容

您可以使用 `tailor:refresh` 命令删除 Tailor 管理的所有内容。

```bash
php artisan tailor:refresh
```

要刷新单个蓝图，请使用 `--blueprint` 选项并指定其 handle。

```bash
php artisan tailor:refresh --blueprint="Blog\Post"
```

### 传播内容

使用多站点的 **sync** 选项时，您可以使用 `tailor:propagate` 命令追溯传播记录。

```bash
php artisan tailor:propagate
```

要传播单个蓝图，请使用 `--blueprint` 选项并指定其 handle。

```bash
php artisan tailor:propagate --blueprint="Blog\Category"
```

### 清理内容

作为一般规则，Tailor 永远不会删除表列和内容。如果字段被移除，列将被重命名而不是删除。例如，名为 `content` 的旧字段可能在数据库表中显示为 `x_content_fb418fac`。旧蓝图的表也会保留，以防将来恢复。

您可以使用 `tailor:prune` 命令清理未使用的数据库列。此命令还将删除不再有关联蓝图的表。

```bash
php artisan tailor:prune
```

您可以仅使用 `--fields` 修饰符来清理字段。要仅清理表，请使用 `--tables` 修饰符。

```bash
php artisan tailor:prune --fields
php artisan tailor:prune --tables
```

要清理单个蓝图，请使用 `--blueprint` 选项并指定其 handle。

```bash
php artisan tailor:prune --blueprint="Blog\Post"
```
