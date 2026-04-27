---
subtitle: 使用自定义内容字段扩展 Tailor。
---
# 构建 Tailor 字段

您可以通过定义字段定义文件，然后在插件注册文件中注册来创建自己的内容字段。

内容字段定义类位于插件的 **contentfields** 目录中。内部目录名称与小写形式的部件类名称匹配。内容字段可以提供资源和片段。示例目录结构如下所示。

::: dir
├── `contentfields`
|   ├── mycontentfield
|   |   ├── assets
|   |   └── partials
|   |       └── _column_content.php  _← Partial File_
|   └── MyContentField.php  _← Field Class_
:::

### 类定义

`create:contentfield` 命令用于生成内容字段类。第一个参数指定作者和插件名称。第二个参数指定内容字段类名称。

```bash
php artisan create:contentfield Acme.Blog MyContentField
```

内容字段类必须继承 `Backend\Classes\FormWidgetBase` 类。
已注册的内容字段可以在 [Tailor 表单字段](../element/form-fields.md)和蓝图中使用。该类定义了字段应如何与系统的其余部分交互。例如，**plugins/acme/blog/contentfields/MyContentField.php** 包含以下内容。

```php
namespace Acme\Blog\ContentFields;

use Tailor\Classes\ContentFieldBase;
use October\Contracts\Element\FormElement;
use October\Contracts\Element\ListElement;
use October\Contracts\Element\FilterElement;

class MyContentField extends ContentFieldBase
{
    public function defineConfig(array $config) {}

    public function defineFormField(FormElement $form, $context = null) {}

    public function defineListColumn(ListElement $list, $context = null) {}

    public function defineFilterScope(FilterElement $filter, $context = null) {}

    public function extendModelObject($model) {}

    public function extendDatabaseTable($table) {}
}
```

### 内容字段注册

插件应通过在[插件注册文件](./extending.md)中重写 `registerContentFields` 方法来注册内容字段。该方法返回一个数组，键为部件类，值为部件短代码。示例：

```php
public function registerContentFields()
{
    return [
        \Acme\Blog\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

短代码在[蓝图模板](introduction.md)中引用字段时使用，它应该是唯一值以避免与其他表单字段冲突。

## 处理配置

假设我们想要包含一个名为 `secondaryTitle` 的字段配置项，首先将其定义为类的属性，然后使用 `defineConfig` 重写来填充。

```php
class MyContentField extends ContentFieldBase
{
    public $secondaryTitle;

    public function defineConfig(array $config)
    {
        if (isset($config['secondaryTitle'])) {
            $this->secondaryTitle = $config['secondaryTitle'];
        }
    }
}
```

然后就可以这样使用：

```yaml
my_field:
    type: mycontentfield
    secondaryTitle: Custom value goes here
```

## 定义后端元素

内容字段可以定义它在后端面板中作为表单字段、列表列和筛选范围的显示方式。每种情况下的结果对象都是支持方法链或通过 `useConfig` 方法传入数组的流式配置对象。有关更多信息，请参阅[定义内容字段文章](../cms/tailor/content-fields.md)。

### 表单字段

`defineFormField` 方法定义内容字段在表单中的显示方式。每个字段通过 `addFormField` 方法初始化，该方法接受字段名称和显示给用户的标签。

```php
public function defineFormField(FormElement $form, $context = null)
{
    $form->addFormField($this->fieldName, $this->label)->useConfig($this->config);
}
```

### 列表列

`defineListColumn` 方法定义内容字段在列表中的显示方式。每个列通过 `defineListColumn` 方法初始化，该方法接受字段名称和显示给用户的标签。

```php
public function defineListColumn(ListElement $list, $context = null)
{
    $list->defineColumn($this->fieldName, $this->label)->displayAs('switch');
}
```

### 筛选范围

`defineFilterScope` 方法定义内容字段在筛选器中的显示方式。每个范围通过 `defineScope` 方法初始化，该方法接受字段名称和显示给用户的标签。

```php
public function defineFilterScope(FilterElement $filter, $context = null)
{
    $filter->defineScope($this->fieldName, $this->label)->displayAs('switch');
}
```

## 扩展模型

`extendModelObject` 方法允许内容字段扩展记录模型，例如 `Tailor\Models\EntryRecord` 模型类。一个示例是使用 `addJsonable` 方法将字段设为可 JSON 序列化。

```php
public function extendModelObject($model)
{
    $model->addJsonable($this->fieldName);
}
```

另一种方法是指定 `belongsTo` 关联关系。

```php
public function extendModelObject($model)
{
    $model->belongsTo[$this->fieldName] = MyOtherModel::class;
}
```

## 扩展数据库表

`extendDatabaseTable` 用于指定此字段所需的数据库列。它使用[标准迁移结构](../extend/database/structure.md)的简化版本。

```php
public function extendDatabaseTable($table)
{
    $table->mediumText($this->fieldName)->nullable();
}
```

## 完整使用示例

以下是为 October Test 插件创建内容字段的完整示例。它添加了一个 `mycontentfield` 类型，可供所有蓝图使用，如下例所示。

```yaml
fields:
    mycontentfield:
        label: Custom Content Field
        type: mycontentfield
        firstColor: red
        secondColor: blue
```

该字段在文件 **plugins/october/test/Plugin.php** 中使用 `registerContentFields` 方法注册。

```php
public function registerContentFields()
{
    return [
        \October\Test\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

字段类在文件 **plugins/october/test/contentfields/MyContentField.php** 中创建为 PHP 类。它将自身注册为[片段字段类型](../element/form/ui-partial.md)，为简化起见不包含列表列或筛选范围。`addJsonable` 方法调用确保字段名称是[可 JSON 序列化的属性](../extend/system/models.md)，以便可以作为数组存储。数据库列存储为 `mediumText` [数据库模式类型](../extend/database/structure.md)，并带有 `nullable` 修饰符，允许空值。

```php
namespace October\Test\ContentFields;

use Tailor\Classes\ContentFieldBase;
use October\Contracts\Element\FormElement;

class MyContentField extends ContentFieldBase
{
    public function defineFormField(FormElement $form, $context = null)
    {
        $form->addFormField($this->fieldName, $this->label)
            ->useConfig($this->config)
            ->displayAs('partial')
            ->path('$/october/test/contentfields/mycontentfield/partials/_field.php');
    }

    public function extendModelObject($model)
    {
        $model->addJsonable($this->fieldName);
    }

    public function extendDatabaseTable($table)
    {
        $table->mediumText($this->fieldName)->nullable();
    }
}
```

文件 **plugins/october/test/contentfields/mycontentfield/partials/_field.php** 包含渲染表单字段的片段内容。值以数组 `[first_value => 'foo', second_value => 'bar']` 的形式获取和保存。

```php
<div class="row">
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[first_value]"
            value="<?= e($field->value['first_value'] ?? '') ?>"
            class="form-control"
            style="color:<?= $field->firstColor ?: 'red' ?>"
        />
    </div>
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[second_value]"
            value="<?= e($field->value['second_value'] ?? '') ?>"
            class="form-control"
            style="color:<?= $field->secondColor ?: 'blue' ?>"
        />
    </div>
</div>
```

## 表单部件与内容字段的对比

一个常见的问题是表单部件和内容字段之间有什么区别，以及在哪些情况下哪个更好？[表单部件](./forms/form-widgets.md)是 `Backend\Widgets\Form` 部件专用的表单字段，与原生[表单字段类型](../element/form-fields.md)（text、number、dropdown、partial 等）一起使用。

内容字段是 Tailor 专用的表单字段的超集，进一步包含了该字段如何：

- 作为[列表列](../element/list-columns.md)渲染
- 作为[筛选范围](../element/filter-scopes.md)渲染
- 在[数据库表](./database/structure.md)中存在
- 应用[验证规则](./services/validation.md)
- [扩展模型](./system/models.md)（可 JSON 序列化/关联关系）

如果定义了表单部件但没有定义内容字段，它仍然可以在 Tailor 中默认使用，并将解析为 `Tailor\ContentFields\FallbackField` 内容字段类型，这是基本的，将在数据库中注册为 TEXT 列类型。

对于完善的解决方案，同时定义表单部件和内容字段是最佳选择。这允许该字段在[插件中使用](../extend/extending.md)以及在 [Tailor 蓝图](../cms/tailor/blueprints.md)中用于内容。以下链接指向一个可以在任何地方使用的货币字段示例。

- [Currency 表单部件](https://github.com/responsiv/currency-plugin/blob/master/formwidgets/Currency.php)
- [Currency 内容字段](https://github.com/responsiv/currency-plugin/blob/master/contentfields/Currency.php)

您可能会注意到，在内容字段中，YAML 定义是在 PHP 中定义的。YAML 语法到 PHP 语法的转换相当简单，PHP 方法名即为 YAML 属性名，值作为第一个参数传递——默认为 `true`。唯一的主要区别是 `type` 属性通过 `displayAs` 方法定义。

任何方法名都可以被调用并在 PHP 对象上链式调用。请参阅下表了解一些 YAML 到 PHP 的转换示例。

YAML | PHP
---- | ----
`autoFocus: true` | `->autoFocus()`
`label: my field` | `->label('my field')`
`type: partial`   | `->displayAs('partial')`

::: tip
您也可以通过 `->useConfig([...])` 将所有所需的 YAML 配置作为数组传递。
:::

#### 另请参阅

::: also
* [Tailor 内容字段](../cms/tailor/content-fields.md)
:::
