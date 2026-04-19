---
subtitle: Tailor 提供的可用模型。
---
# 模型

本文介绍如何使用 PHP 与 Tailor 交互以及可用的模型。

## Entry 记录

`Tailor\Models\EntryRecord` 模型用于存储条目的内容。

### 可用属性

除了您定义的表单字段外，还可以在检索的模型上找到以下属性。

属性 | 描述
-------- | -------------
**id** | 数据库中的主键。
**blueprint_uuid** | 关联蓝图的 UUID。
**content_group** | 内容组名称（如果使用）。
**title** | 条目的标题描述符，例如 **My Blog Post**。
**slug** | 条目的 slug 标识符，例如 `my-blog-post`。
**is_enabled** | 确定条目当前是否可见。
**created_at** | 条目的创建日期。
**updated_at** | 条目的最后更新日期。
**expired_at** | 条目的过期日期。
**published_at** | 条目的发布日期。
**published_at_date** | 发布日期，如果未指定则为创建日期。

#### 结构条目

如果条目类型是 `structure`，它将具有一些额外属性。

属性 | 描述
-------- | -------------
**fullslug** | 包含父级 slug 的 slug 标识符，例如 `parent-slug/child-slug`。
**parent** | 此条目的父记录（如果可用）。
**children** | 此条目的子记录（如果可用）。

#### 流条目

如果条目类型是 `stream`，它将具有一些额外属性。

属性 | 描述
-------- | -------------
**published_at_day** | 条目发布的数字日期。
**published_at_month** | 条目发布的数字月份。
**published_at_year** | 条目发布的数字年份。

### 检索多个条目

要使用 PHP 操作条目，您可以使用 `Tailor\Models\EntryRecord` 模型并调用 `inSection` 静态方法，传入 handle 以返回准备好的[数据库模型查询](../../extend/database/query.md)。或者，您可以使用 UUID 和 `inSectionUuid` 方法进行查找。

以下 `get` 方法查询返回[记录集合](../../extend/services/collection.md)。

```php
$records = EntryRecord::inSection('Blog\Post')->get();

$records = EntryRecord::inSectionUuid('a63fabaf-7c0b-4c74-b36f-7abf1a3ad1c1')->get();
```

### 检索单个条目

结合 `where` 约束，您可以使用 `first` 方法查找单条记录。以下将查找 slug 等于 **first-post** 的条目。

```php
$record = EntryRecord::inSection('Blog\Post')->where('slug', 'first-post')->first();
```

如果[条目类型](../tailor/blueprints.md)设置为 `single`，您可以使用 `findSingleForSection` 方法来查找条目。同样，`findSingleForSectionUuid` 可用于通过 UUID 查找。这些方法将确保在查找期间记录存在。

```php
$record = EntryRecord::findSingleForSection('Homepage');

$record = EntryRecord::findSingleForSectionUuid('3328c303-7989-462e-b866-27e7037ba275');
```

### 插入和更新条目

`inSection` 方法可用于动态创建记录。以下将创建一个新的博客文章条目。相同的代码可用于在首先检索到现有记录后更新它。

```php
$post = EntryRecord::inSection('Blog\Post');
$post->title = 'Imported Post';
$post->save();
```

## Global 记录

`Tailor\Models\GlobalRecord` 模型用于存储全局的内容。

### 可用属性

除了定义的表单字段外，还可以在检索的模型上找到以下属性。

属性 | 描述
-------- | -------------
**id** | 数据库中的主键。
**blueprint_uuid** | 关联蓝图的 UUID。

### 检索 Global 记录

要使用 PHP 查找全局，您可以使用 `Tailor\Models\GlobalRecord` 模型并调用 `findForGlobal` 静态方法，传入 handle。或者，您可以使用 UUID 和 `findForGlobalUuid` 方法进行查找。

```php
GlobalRecord::findForGlobal('Blog\Config');

GlobalRecord::findForGlobalUuid('7b193500-ac0b-481f-a79c-2a362646364d');
```

## 使用关联字段

关联字段可以包括 [repeater 字段](../../element/form/widget-repeater.md)和 [entries 字段](../../element/content/field-entries.md)，读写这些字段需要一些额外的步骤。

### 预加载关联

读取关联字段时，您可以使用 `load` 方法在集合上预加载它们。此方法将关联内容作为单次查询提供，性能最佳。

以下预加载 **categories** 字段并将其添加到结果中，同时包含传递多个关联字段的示例。

```php
$records->load('categories');

$records->load(['categories', 'author']);
```

### 创建关联字段

写入关联字段时，您可以将关联名称作为方法调用以返回关系定义，然后可以调用后续的 `create()` 方法，该方法返回新创建的关联。

以下在 **Blog\Post** 部分中找到第一篇博客文章，然后创建一个关联的分类。

```php
$post = EntryRecord::inSection('Blog\Post')->first();

$post->categories()->create(['title' => 'Test', 'price' => '100']);
```

使用 `make()` 方法创建一个新的空模型实例。

```php
$category = $post->categories()->make();
```

如果分类已经存在，请改用 `add()` 方法。以下将第一个博客分类添加到第一篇博客文章。

```php
$post = EntryRecord::inSection('Blog\Post')->first();
$category = EntryRecord::inSection('Blog\Category')->first();

$post->categories()->add($category);
```

::: tip
查看[关联文章](../../extend/database/relations.md)以了解更多关于模型关系的信息。
:::

## 扩展模型构造函数

与[扩展常规模型](../../extend/extending.md)类似，您可以使用 `extendInSection` 方法扩展 `EntryRecord` 模型构造函数以定位特定蓝图。`extendInSectionUuid` 方法也可用于更精确的定位。

```php
EntryRecord::extendInSection('Blog\Post', function($model) {
    $model->bindEvent('model.afterDelete', function () use ($model) {
        // Model has been deleted!
    });
});
```

`GlobalRecord` 模型构造函数也支持使用 `extendInGlobal` 和 `extendInGlobalUuid` 方法扩展以定位特定蓝图。

```php
GlobalRecord::extendInGlobal('Blog\Config', function($model) {
    $model->bindEvent('model.beforeSave', function () use ($model) {
        // Model has been saved!
    });
});
```

::: tip
如果未找到蓝图，`extendInSectionUuid` 和 `extendInGlobalUuid` 方法不会抛出异常。
:::

## 扩展 Tailor 模型

在某些情况下，您可能希望将 Tailor 模型与[常规数据库模型](../../extend/system/models.md)结合使用。

### 将 Tailor 关联到常规模型

`recordfinder` 表单字段为常规模型（例如插件定义的模型）引入关系定义。**modelClass** 应引用模型类，对于由 **maxItems** 指定的单数关系，**list** 属性是必需的。

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Product
    list: $/acme/test/models/product/columns.yaml
    maxItems: 1
```

在此了解更多关于 [record finder 表单小部件](../../element/form/widget-recordfinder.md)的信息。

### 将常规模型关联到 Tailor

由于所有 Tailor 模型共享相同的模型类，因此在关系定义中需要一些额外的属性。`Tailor\Traits\BlueprintRelationModel` 实现了这些属性来引用 Tailor 模型，支持 Belongs To 和 Belongs To Many 关系。

当在模型中实现 `BlueprintRelationModel` trait 时，您可以提供 `blueprint` 属性以及引用 Tailor 蓝图的蓝图 UUID。以下将建立一个名为 **author** 的到 `Tailor\Models\EntryRecord` 类的 Belongs To 关系。

```php
class Product extends Model
{
    use \Tailor\Traits\BlueprintRelationModel;

    public $belongsTo = [
        'author' => [
            \Tailor\Models\EntryRecord::class,
            'blueprint' => '6947ff28-b660-47d7-9240-24ca6d58aeae'
        ]
    ];
}
```

### 构建自定义内容字段

您还可以使用特定于实现的字段类型来引用常规模型，例如，自定义内容字段可能硬编码到 `Customer` 模型类。这涉及创建一个自定义 Tailor 字段，将提供对模型和数据库表的完全访问权限。

在内容字段类定义中，`extendModelObject` 方法允许内容字段扩展记录模型，`extendDatabaseTable` 用于向数据库表添加列。

```php
class MyContentField extends ContentFieldBase
{
    public function extendModelObject($model)
    {
        $model->belongsTo[$this->fieldName] = MyOtherModel::class;
    }

    public function extendDatabaseTable($table)
    {
        $table->integer($this->fieldName . '_id')->nullable();
    }
}
```

这需要更多的工作才能使事情运行起来，但结果是一个简单的字段 **type** 定义，配置最少。

```yaml
myfield:
    label: My Field
    type: mycontentfield
```

在此了解更多关于构建[自定义 Tailor 字段](../../extend/tailor-fields.md)的信息。

#### 另请参阅

::: also
* [RecordFinder 表单字段](../../element/form/widget-recordfinder.md)
* [构建 Tailor 字段](../../extend/tailor-fields.md)
:::
