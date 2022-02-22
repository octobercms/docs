# 特征

模型特征用于实现通用功能。

## 属性操作

### 可空

当为空时，可空属性设置为`NULL`。 要使模型中的属性无效，请应用 `October\Rain\Database\Traits\Nullable` 特征并声明一个 `$nullable` 属性，其中包含要无效的属性的数组。

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Nullable;

    /**
        * @var array 可为空的属性。
        */
    protected $nullable = ['sku'];
}
```

### 哈希(Hash)

哈希属性在模型上首次设置时立即进行哈希处理。 要在模型中使用哈希属性，请应用 `October\Rain\Database\Traits\Hashable` 特征并声明一个 `$hashable` 属性，其中包含要设置哈希的属性的数组。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Hashable;

    /**
        * @var array List of attributes to hash.
        */
    protected $hashable = ['password'];
}
```

### 可清除

创建或更新模型时，清除的属性不会保存到数据库中。 要清除模型中的属性，请应用 `October\Rain\Database\Traits\Purgeable` 特征并声明一个 `$purgeable` 属性，其中包含要清除的属性的数组。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Purgeable;

    /**
        * @var array 要清除的属性列表。
        */
    protected $purgeable = ['password_confirmation'];
}
```

保存模型时，在触发 [模型事件](#model-events) 之前，将清除定义的属性，包括验证。 使用 `getOriginalPurgeValue` 查找已清除的值。

```php
return $user->getOriginalPurgeValue('password_confirmation');
```

### 可加密

与 [哈希散列](#hashable) 类似，加密属性在设置时被加密，但在检索到属性时也会被解密。 要加密模型中的属性，请应用 `October\Rain\Database\Traits\Encryptable` 特征并使用包含要加密的属性的数组声明 `$encryptable` 属性。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Encryptable;

    /**
        * @var array 要加密的属性列表。
        */
    protected $encryptable = ['api_key', 'api_secret'];
}
```

> **注意**：加密属性与 [`jsonable`](model#supported-properties) 属性不兼容。

### 别名

别名是页面 URL 中常用的有意义的代码。 要为您的模型自动生成唯一的别名，请应用 `October\Rain\Database\Traits\Sluggable` 特征并声明 `$slugs` 属性。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    /**
        * @var array 为这些属性生成 slug。
        */
    protected $slugs = ['slug' => 'name'];
}
```

`$slugs` 属性应该是一个数组，其中键是 slug 的目标字段，值是用于生成 slug 的源字符串。 在上面的示例中，如果 `name` 列设置为 **Cheyenne**，在创建模型之前`slug` 字段将设置为 **cheyenne**、**cheyenne-2** 或 **cheyenne -3**等。

要从多个来源生成 slug，请传递另一个数组作为源值：

```php
protected $slugs = [
    'slug' => ['first_name', 'last_name']
];
```

仅在第一次创建模型时才会生成 Slug。 要覆盖或禁用此功能，只需手动设置 slug 属性：

```php
$user = new User;
$user->name = 'Remy';
$user->slug = 'custom-slug';
$user->save(); // 不会生成 Slug
```

更新模型时使用 `slugAttributes` 方法重新生成 slug：

```php
$user = User::find(1);
$user->slug = null;
$user->slugAttributes();
$user->save();
```

## 排序和重新排序

### 可排序

排序后的模型将在 `sort_order` 中存储一个数字值，它维护集合中每个单独模型的排序顺序。 要为模型存储排序顺序，请应用 `October\Rain\Database\Traits\Sortable` 特征并确保您的架构定义了一个字段供其使用(例如: `$table->integer('sort_order')->default(0);`)。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

您可以通过定义 `SORT_ORDER` 常量来修改用于标识排序顺序的键名：

```php
const SORT_ORDER = 'my_sort_order_column';
```

Use the `setSortableOrder` method to set the orders on a single record or multiple records.

```php
// 将用户的顺序设置为 1...
$user->setSortableOrder($user->id, 1);

// 将记录1、2、3的顺序分别设置为3、2、1...
$user->setSortableOrder([1, 2, 3], [3, 2, 1]);
```

### 基本树形结构

一个基本树形结构将使用 `parent_id` 字段维护模型之间的父子关系。 要使用基本树形结构，请应用 `October\Rain\Database\Traits\SimpleTree` 特征。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

这个 trait 会自动注入两个 [模型关系](../database/relations.md) 称为 `parent` 和 `children`，它相当于以下定义。

```php
public $belongsTo = [
    'parent' => [Category ::class, 'key' => 'parent_id'],
];

public $hasMany = [
    'children' => [Category ::class, 'key' => 'parent_id'],
];
```

您不需要自己定义这些关联，但是，您可以通过定义 `PARENT_ID` 常量来修改用于标识父级的键名：

```php
const PARENT_ID = 'my_parent_column';
```

使用此 trait 的模型集合将返回 `October\Rain\Database\TreeCollection` 类型，它添加了 `toNested` 方法。 要构建一个预加载的树结构，请返回带有预加载的关联的记录。

```php
Category::all()->toNested();
```

#### 渲染

为了渲染所有级别的项目及其子项，可以使用递归处理

```twig
{% macro renderChildren(item) %}
    {% import _self as SELF %}
    {% if item.children is not empty %}
        <ul>
            {% for child in item.children %}
                <li>{{ child.name }}{{ SELF.renderChildren(child)|raw }}</li>
            {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}

{% import _self as SELF %}
{{ SELF.renderChildren(category)|raw }}
```

### 嵌套集合模型

[嵌套集合模型](https://en.wikipedia.org/wiki/Nested_set_model) 是一种高级技术，用于使用 `parent_id`、`nest_left`、`nest_right` 和 `nest_depth` 字段维护模型之间的层次结构。 要使用嵌套集模型，请应用 `October\Rain\Database\Traits\NestedTree` 特征。 `SimpleTree` 特征的所有特性在此模型中固有可用。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

#### 创建根节点

默认情况下，所有节点都创建为根：

```php
$root = Category::create(['name' => 'Root category']);
```

或者，您可能会发现自己需要将现有节点转换为根节点：

```php
$node->makeRoot();
```

您也可以取消它的 `parent_id` 字段，它的工作方式与 `makeRoot' 相同。

```php
$node->parent_id = null;
$node->save();
```

#### 插入节点

您可以通过关联直接插入新节点：

```php
$child1 = $root->children()->create(['name' => 'Child 1']);
```

或者对现有节点使用 `makeChildOf` 方法：

```php
$child2 = Category::create(['name' => 'Child 2']);
$child2->makeChildOf($root);
```

#### 删除节点

当使用 `delete` 方法删除节点时，该节点的所有后代也将被删除。 请注意，不会为子模型触发删除[模型事件](../database/model.md#model-events)。

```php
$child1->delete();
```

#### 获取节点的嵌套级别

`getLevel` 方法将返回节点的当前嵌套级别或深度。

```php
// 根层级
$node->getLevel()
```

#### 移动节点

有几种移动节点的方法：

- `moveLeft()`: 找到左边的兄弟并移动到它的左边。
- `moveRight()`: 找到右侧的兄弟并移动到它的右侧。
- `moveBefore($otherNode)`: 移动到...左侧的节点
- `moveAfter($otherNode)`: 移动到...右侧的节点
- `makeChildOf($otherNode)`: 使节点成为...的子节点
- `makeRoot()`: 使当前节点成为根节点。

## 实用函数

### 验证

October模型使用内置的 [验证类](../services/validation.md)。 验证规则在模型类中定义为名为`$rules`的属性，并且该类必须使用特征`October\Rain\Database\Traits\Validation`：

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name' => 'required|between:4,16',
        'email' => 'required|email',
        'password' => 'required|alpha_num|between:4,8|confirmed',
        'password_confirmation' => 'required|alpha_num|between:4,8'
    ];
}
```

您也可以使用 [数组语法](../services/validation.md#validating-arrays) 来验证规则。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => 'required|url',
        'links.*.anchor' => 'required'
    ];
}
```

当调用 `save` 方法时，模型会自动验证自己。

```php
$user = new User;
$user->name = 'Actual Person';
$user->email = 'a.person@example.com';
$user->password = 'passw0rd';

// 如果模型无效，则返回 false
$success = $user->save();
```

> **注意**：您也可以随时使用 `validate` 方法验证模型。

#### 检索验证错误

当模型验证失败时，一个 `Illuminate\Support\MessageBag` 对象会附加到模型上。 包含验证失败消息的对象。 使用 `errors` 方法或 `$validationErrors` 属性检索验证错误消息集合实例。 使用 `errors()->all()` 检索所有验证错误。 使用 `validationErrors->get('attribute')` 检索 *specific* 属性的错误。

> **注意**：模型利用 MessagesBag 对象，该对象具有 [简单而优雅的方法](../services/validation.md#working-with-error-messages) 格式化错误。

#### 覆盖验证

无论是否存在验证错误,`forceSave` 方法都会验证模型并保存。

```php
$user = new User;

// 创建一个没有验证的用户
$user->forceSave();
```

#### 自定义错误消息

就像 Validator 类一样，您可以使用 [相同的语法](../services/validation.md#custom-error-messages) 设置自定义错误消息。

```php
class User extends Model
{
    public $customMessages = [
        'required' => ':attribute 字段是必需的.',
        ...
    ];
}
```

您还可以将自定义错误消息添加到验证规则的数组语法中。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => 'required|url',
        'links.*.anchor' => 'required'
    ];

    public $customMessages = [
        'links.*.url.required' => '网址为必填项',
        'links.*.url.*' => 'url 必须是有效的 url',
        'links.*.anchor.required' => '锚文本是必需的',
    ];
}
```

在上面的示例中，您可以将自定义错误消息写入特定的验证规则(这里我们使用：`required`)。 或者您可以使用 `*` 来选择其他所有内容(这里我们使用 `*` 将自定义消息添加到 `url` 验证规则)。

#### 自定义属性名称

您还可以使用 `$attributeNames` 数组设置自定义属性名称。

```php
class User extends Model
{
    public $attributeNames = [
        'email' => '电子邮件地址',
        ...
    ];
}
```

#### 动态验证规则

您可以通过覆盖 `beforeValidate` [模型事件](../database/model.md#events) 方法来动态应用规则。 这里我们检查 `is_remote` 属性是否为 `false`，然后动态设置 `latitude` 和 `longitude` 属性为必填字段。

```php
public function beforeValidate()
{
    if (!$this->is_remote) {
        $this->rules['latitude'] = 'required';
        $this->rules['longitude'] = 'required';
    }
}
```

#### 自定义验证规则

您还可以使用与 Validator 服务相同的方式创建自定义验证规则(../services/validation.md#custom-validation-rules)。

### 软删除

软删除模型时，它实际上并没有从您的数据库中删除。 相反，在记录上设置了一个 `deleted_at` 时间戳。 要为模型启用软删除，请将 `October\Rain\Database\Traits\SoftDelete` 特征应用于模型并将 deleted_at 字段添加到您的 `$dates` 属性：

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
}
```

要将 `deleted_at` 字段添加到表中，您可以使用迁移中的 `softDeletes` 方法：

```php
Schema::table('posts', function ($table) {
    $table->softDeletes();
});
```

现在，当您在模型上调用 `delete` 方法时，`deleted_at` 字段将设置为当前时间戳。 查询使用软删除的模型时，"已删除"的模型不会包含在查询结果中。

要确定给定模型实例是否已被软删除，请使用 `trashed` 方法：

```php
if ($user->trashed()) {
    //
}
```

#### 查询软删除模型

##### 包括软删除模型

如上所述，软删除模型将自动从查询结果中排除。 但是，您可以使用查询中的 `withTrashed` 方法强制软删除模型出现在结果集中：

```php
$users = User::withTrashed()->where('account_id', 1)->get();
```

`withTrashed` 方法也可以用于 [关联](relations.md) 查询：

```php
$flight->history()->withTrashed()->get();
```

##### 仅检索软删除的模型

`onlyTrashed` 方法将检索 **only** 软删除模型：

```php
$users = User::onlyTrashed()->where('account_id', 1)->get();
```

##### 恢复软删除的模型

有时您可能希望"取消删除"软删除的模型。 要将软删除的模型恢复为活动状态，请在模型实例上使用 `restore` 方法：

```php
$user->restore();
```

您还可以在查询中使用 `restore` 方法来快速恢复多个模型：

```php
// 恢复单个模型实例...
User::withTrashed()->where('account_id', 1)->restore();

// 恢复所有相关模型...
$user->posts()->restore();
```

#### 永久删除模型

有时您可能需要真正从数据库中删除模型。 要从数据库中永久删除软删除模型，请使用 `forceDelete` 方法：

```php
// 强制删除单个模型实例...
$user->forceDelete();

// 强制删除所有相关模型...
$user->posts()->forceDelete();
```

### 软删除关联

当两个相关模型启用了软删除时，您可以通过在 [关联定义](../database/relations.md#detailed-relationships) 中定义 `softDelete` 选项来级联删除事件。 在这个例子中，如果用户模型被软删除，属于该用户的评论也将被软删除。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    public $hasMany = [
        'comments' => ['Acme\Blog\Models\Comment', 'softDelete' => true]
    ];
}
```

> **注意**：如果相关模型没有使用软删除 trait，它将被视为与 `delete` 选项相同并永久删除。

在同样的条件下，当主模型被恢复时，所有使用 `softDelete` 选项的相关模型也将被恢复。

```php
// 恢复用户和评论
$user->restore();
```

### 修改记录

October CMS模型可以存储修改的记录历史。 要存储模型的修改版，请应用 `October\Rain\Database\Traits\Revisionable` 特征并声明一个 `$revisionable` 属性，其中包含用于监视更改的属性的数组。 您还需要定义一个名为 `revision_history` 的 `$morphMany` [模型关系](relations.md)，它引用名为 `revisionable` 的 `System\Models\Revision` 类，这是修订历史数据所在的位置 存储。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Revisionable;

    /**
        * @var array 监视这些属性的更改。
        */
    protected $revisionable = ['name', 'email'];

    /**
        * @var array 关联
        */
    public $morphMany = [
        'revision_history' => [\System\Models\Revision::class, 'name' => 'revisionable']
    ];
}
```

默认情况下将保留 500 条记录，但是可以通过在模型上声明一个具有新限制值的 `$revisionableLimit` 属性来修改它。

```php
/**
 * @var int 要保留的最大修订记录数。
 */
public $revisionableLimit = 8;
```

可以像访问任何其他关联一样访问修订历史记录：

```php
$history = User::find(1)->revision_history;

foreach ($history as $record) {
    echo $record->field . ' updated ';
    echo 'from ' . $record->old_value;
    echo 'to ' . $record->new_value;
}
```

修改记录支持可选地使用 `user_id` 属性用户关系。 您可以在模型中包含一个`getRevisionableUser`方法来跟踪进行修改的用户。

```php
public function getRevisionableUser()
{
    return BackendAuth::getUser()->id;
}
```
