---
subtitle: 使用示例内容填充蓝图和数据库记录。
---
# 主题填充

主题支持从填充脚本导入示例内容的功能，包括数据库内容和 [Tailor 蓝图](../../cms/tailor/introduction.md)。主题内一个名为 **seeds** 的特定文件夹及其目录结构用于提供内容。

## 目录结构

下面是一个示例填充目录结构。**blueprints** 目录包含主题使用的所有蓝图模板，它们会自动导入到 **app/blueprints** 目录中，其中包含一个名为 **mywebsite** 的嵌套目录。**data.yaml** 文件包含如何将内容导入数据库的指令。

::: dir
├── themes
|   └── mywebsite
|       └── `seeds`  _← 主题填充目录_
|           ├── blueprints
|           |   └── post.yaml  _← 蓝图文件_
|           ├── lang
|           |   └── en.json  _← 语言文件_
|           ├── data
|           |   └── blog-posts.json  _← 数据文件_
|           └── data.yaml  _← 填充脚本_
:::

## 导入蓝图

::: aside
由于蓝图不依赖于任何特定的文件或目录结构，因此可以自由移动。
:::

导入蓝图时，只需将蓝图文件放在 **blueprints** 目录中即可。它不使用任何配置，填充时所有蓝图会简单地复制到 **app/blueprints** 目录。在该目录内会创建一个与主题同名的新目录。蓝图将放置在这个新目录中。

## 导入语言

作为可选功能，可以通过将 [JSON 语言文件](../../extend/system/localization.md)放在 **lang** 目录中来将语言导入到 **app/lang** 目录。这使得翻译蓝图内的标签和其他描述成为可能。如果应用程序语言目录中已存在语言文件，则语言字符串将合并在一起。

## 导入数据

**data.yaml** 文件包含用于将内容导入数据库的特定格式。在下面的示例中，两组数据被导入到数据库中用于 Tailor 条目内容。

```yaml
-
    name: Blog Post Data
    class: Tailor\Models\RecordImport
    file: seeds/data/blog-posts.json
    attributes:
        file_format: json
        blueprint_uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
-
    name: Blog Category Data
    class: Tailor\Models\RecordImport
    file: seeds/data/blog-categories.json
    attributes:
        file_format: json
        blueprint_uuid: b022a74b-15e6-4c6b-9eb9-17efc5103543
```

YAML 文件应定义一个数组，其中数组中的每个项目支持以下属性。

属性 | 描述
------------- | -------------
**name** | 为导入步骤命名，向用户显示。
**class** | 引用一个扩展 `Backend\Models\ImportModel` 接口的模型。
**file** | 引用包含要导入内容的 JSON 数据文件。
**attributes** | 导入前要在导入模型上设置的属性列表。

### 示例数据文件

以下是一个可用于导入博客分类的 JSON 文件示例。JSON 数组中的每个项目都会在数据库中生成一条具有提供属性的导入记录。提供 **id** 属性允许记录在多次导入之间建立关联。

```json
[
    {
        "id": 1,
        "title": "Announcements",
        "slug": "announcements"
    },
    {
        "id": 2,
        "title": "News",
        "slug": "news"
    }
]
```

## 填充主题

`theme:seed` artisan 命令用于填充主题。

```bash
php artisan theme:seed <theme name>
```

您还可以使用 `--root` 选项来指示命令将蓝图导入到根目录而不是嵌套目录中。

```bash
php artisan theme:seed <theme name> --root
```

:::tip
您也可以通过导航到**设置 → 前端主题 → 管理 → 填充内容**来使用管理面板填充主题。
:::
