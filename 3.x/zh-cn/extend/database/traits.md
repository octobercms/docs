# 特征

模型特征用于实现通用功能。

## 属性操作

### Nullable

可空属性在留空时会被设置为 `NULL`。要在模型中使属性可空，请应用 `October\Rain\Database\Traits\Nullable` 特征并声明一个 `$nullable` 属性，其中包含要设为空的属性数组。

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Nullable;

    protected $nullable = ['sku'];
}
```

### Hashable

散列属性在首次设置到模型上时会立即被散列。要在模型中散列属性，请应用 `October\Rain\Database\Traits\Hashable` 特征并声明一个 `$hashable` 属性，其中包含要散列的属性数组。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Hashable;

    protected $hashable = ['password'];
}
```

### Purgeable

清除的属性在创建或更新模型时不会保存到数据库。要在模型中清除属性，请应用 `October\Rain\Database\Traits\Purgeable` 特征并声明一个 `$purgeable` 属性，其中包含要清除的属性数组。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Purgeable;

    protected $purgeable = ['password_confirmation'];
}
```

使用 `getOriginalPurgeValue` 方法查找模型保存后被清除的值。

```php
return $user->getOriginalPurgeValue('password_confirmation');
```

或者，使用 `restorePurgedValues` 方法恢复所有被清除的值。

```php
$user->restorePurgedValues();
```

### Encryptable

与 `Hashable` 特征类似，加密属性在设置时会被加密，但在获取属性时也会被解密。要在模型中加密属性，请应用 `October\Rain\Database\Traits\Encryptable` 特征并声明一个 `$encryptable` 属性，其中包含要加密的属性数组。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Encryptable;

    protected $encryptable = ['api_key', 'api_secret'];
}
```

::: warning
加密属性与 [jsonable 属性](../system/models.md)不兼容。
:::

### Sluggable

Slug 是在页面 URL 中常用的有意义的代码。要为模型自动生成唯一的 slug，请应用 `October\Rain\Database\Traits\Sluggable` 特征并声明一个 `$slugs` 属性。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    protected $slugs = ['slug' => 'name'];
}
```

`$slugs` 属性应该是一个数组，其中键是 slug 的目标列，值是用于生成 slug 的源字符串。在上面的示例中，如果 `name` 列设置为 **Cheyenne**，则在模型创建之前 `slug` 列将被设置为 **cheyenne**、**cheyenne-2** 或 **cheyenne-3** 等。

要从多个源生成 slug，请将另一个数组作为源值传递：

```php
protected $slugs = [
    'slug' => ['first_name', 'last_name']
];
```

Slug 仅在模型首次创建时生成。要覆盖或禁用此功能，只需手动设置 slug 属性：

```php
$user = new User;
$user->name = 'Remy';
$user->slug = 'custom-slug';
$user->save(); // Slug will not be generated
```

使用 `slugAttributes` 方法在更新模型时重新生成 slug：

```php
$user = User::find(1);
$user->slug = null;
$user->slugAttributes();
$user->save();
```

## 排序和重排序

### Sortable

排序模型将在 `sort_order` 中存储一个数值，用于维护集合中每个模型的排序顺序。要将 `sort_order` 列添加到表中，您可以在迁移中使用 `integer` 方法。

```php
Schema::table('users', function ($table) {
    $table->integer('sort_order')->default(0);
});
```

要为模型存储排序顺序，请应用 `October\Rain\Database\Traits\Sortable` 特征并确保您的架构定义了供其使用的列。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

您可以通过定义 `SORT_ORDER` 常量来修改用于标识排序顺序的键名。

```php
const SORT_ORDER = 'my_sort_order_column';
```

使用 `setSortableOrder` 方法设置多个记录的排序。数组包含按应出现的排序顺序排列的模型标识符。

```php
$user->setSortableOrder([3, 2, 1]);
```

如果排序记录的子集，第二个数组用于提供排序顺序值的参考池。例如，以下将排序顺序列分别设置为 100、200 或 300。

```php
$user->setSortableOrder([3, 2, 1], [100, 200, 300]);
```

### Simple Tree

简单树模型将使用 `parent_id` 列维护模型之间的父子关系。要将 `parent_id` 列添加到表中，您可以在迁移中使用 `integer` 方法。

```php
Schema::table('categories', function ($table) {
    $table->integer('parent_id')->nullable()->unsigned();
});
```

要使用简单树，请应用 `October\Rain\Database\Traits\SimpleTree` 特征。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

此特征将自动注入两个名为 `parent` 和 `children` 的[模型关联](./relations.md)，相当于以下定义。

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

使用此特征的模型集合将返回 `October\Rain\Database\TreeCollection` 类型，该类型添加了 `toNested` 方法。要构建预加载的树结构，请返回带有预加载关联的记录。

```php
Category::all()->toNested();
```

#### 渲染

为了渲染所有级别的项目及其子项，您可以使用递归处理

```twig
{% macro renderChildren(item) %}
    {% if item.children is not empty %}
        <ul>
            {% for child in item.children %}
                <li>{{ child.name }}{{ _self_.renderChildren(child)|raw }}</li>
            {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}

{% import _self as nav %}
{{ nav.renderChildren(category)|raw }}
```

### Nested Tree

[嵌套集模型](https://en.wikipedia.org/wiki/Nested_set_model)是一种使用 `parent_id`、`nest_left`、`nest_right` 和 `nest_depth` 列维护模型层次结构的高级技术。要将这些列添加到表中，您可以在迁移中使用这些方法。

```php
Schema::table('categories', function ($table) {
    $table->integer('parent_id')->nullable()->unsigned();
    $table->integer('nest_left')->nullable();
    $table->integer('nest_right')->nullable();
    $table->integer('nest_depth')->nullable();
});
```

要使用嵌套集模型，请应用 `October\Rain\Database\Traits\NestedTree` 特征。`SimpleTree` 特征的所有功能在此模型中都固有可用。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

#### 创建根节点

默认情况下，所有节点都创建为根节点：

```php
$root = Category::create(['name' => 'Root category']);
```

或者，您可能需要将现有节点转换为根节点：

```php
$node->makeRoot();
```

您也可以将其 `parent_id` 列设为 null，效果与 `makeRoot` 相同。

```php
$node->parent_id = null;
$node->save();
```

#### 插入节点

您可以直接通过关联插入新节点：

```php
$child1 = $root->children()->create(['name' => 'Child 1']);
```

或者对现有节点使用 `makeChildOf` 方法：

```php
$child2 = Category::create(['name' => 'Child 2']);
$child2->makeChildOf($root);
```

#### 删除节点

当使用 `delete` 方法删除节点时，该节点的所有后代也将被删除。请注意，子模型的删除[模型事件](../system/models.md)不会被触发。

```php
$child1->delete();
```

#### 获取节点的嵌套级别

`getLevel` 方法将返回节点的当前嵌套级别或深度。

```php
// 根节点时为 0
$node->getLevel()
```

#### 移动节点

有几种移动节点的方法：

- `moveLeft()`：找到左兄弟并移动到其左侧。
- `moveRight()`：找到右兄弟并移动到其右侧。
- `moveBefore($otherNode)`：将节点移动到...的左侧。
- `moveAfter($otherNode)`：将节点移动到...的右侧。
- `makeChildOf($otherNode)`：使节点成为...的子节点。
- `makeRoot()`：使当前节点成为根节点。

## 实用功能

### Validation

October CMS 模型使用内置的 [Validator 类](../services/validation.md)。验证规则在模型类中定义为名为 `$rules` 的属性，且该类必须使用 `October\Rain\Database\Traits\Validation` 特征。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name' => ['required', 'between:4,16'],
        'email' => ['required', 'email'],
        'password' => ['required', 'alpha_num', 'between:4,8', 'confirmed'],
        'password_confirmation' => ['required', 'alpha_num', 'between:4,8']
    ];
}
```

您也可以使用[数组语法](../services/validation.md)的验证规则。

```php
public $rules = [
    'links.*.url' => ['required', 'url'],
    'links.*.anchor' => ['required']
];
```

模型在调用 `save` 方法时会自动验证自身。

```php
$user = new User;
$user->name = 'Actual Person';
$user->email = 'a.person@example.tld';
$user->password = 'passw0rd';

// 如果模型无效则返回 false
$success = $user->save();
```

::: tip
您也可以随时使用 `validate` 方法验证模型。
:::

#### 增强的验证规则

`unique` 验证规则自动配置，不需要指定表名。

```php
public $rules = [
    'name' => ['unique'],
];
```

`required` 验证规则支持 **create** 和 **update** 修饰符，以仅在模型创建或更新时应用。以下仅在模型尚不存在时才是必需的。

```php
public $rules = [
    'password' => ['required:create'],
];
```

#### 获取验证错误

当模型验证失败时，一个 `Illuminate\Support\MessageBag` 对象将附加到模型上。该对象包含验证失败消息。使用 `errors` 方法或 `$validationErrors` 属性获取验证错误消息集合实例。使用 `errors()->all()` 获取所有验证错误。使用 `validationErrors->get('attribute')` 获取*特定*属性的错误。

::: tip
Model 利用了 `MessagesBag` 对象，它有一种[简单而优雅的方法](../services/validation.md)来格式化错误。
:::

#### 覆盖验证

`forceSave` 方法验证模型并保存，无论是否存在验证错误。

```php
$user = new User;

// 创建一个不经验证的用户
$user->forceSave();
```

#### 自定义错误消息

就像 Validator 类一样，您可以使用[相同的语法](../services/validation.md)设置自定义错误消息。

```php
class User extends Model
{
    public $customMessages = [
        'required' => 'The :attribute field is required.',
        // ...
    ];
}
```

您也可以为验证规则的数组语法添加自定义错误消息。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => ['required', 'url'],
        'links.*.anchor' => ['required'],
    ];

    public $customMessages = [
        'links.*.url.required' => 'The url is required',
        'links.*.url.*' => 'The url needs to be a valid url'
        'links.*.anchor.required' => 'The anchor text is required',
    ];
}
```

在上面的示例中，您可以为特定的验证规则编写自定义错误消息（这里我们使用了：`required`）。或者您可以使用 `*` 来选择其他所有内容（这里我们使用 `*` 为 `url` 验证规则添加了自定义消息）。

#### 自定义属性名称

您也可以使用 `$attributeNames` 数组设置自定义属性名称。

```php
class User extends Model
{
    public $attributeNames = [
        'email' => 'Email Address',
        // ...
    ];
}
```

#### 动态验证规则

您可以通过覆盖 `beforeValidate` [模型事件](../system/models.md)方法来动态应用规则。这里我们检查 `is_remote` 属性是否为 `false`，然后动态设置 `latitude` 和 `longitude` 属性为必填字段。

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

您也可以使用与 `Validator` 服务[相同的方式](../services/validation.md)创建自定义验证规则。

### Soft Deleting

当软删除模型时，它实际上并没有从数据库中删除。而是在记录上设置了一个 `deleted_at` 时间戳。要为模型启用软删除，请将 `October\Rain\Database\Traits\SoftDelete` 特征应用到模型并将 deleted_at 列添加到您的 `$dates` 属性中：

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
}
```

要将 `deleted_at` 列添加到表中，您可以在迁移中使用 `softDeletes` 方法：

```php
Schema::table('posts', function ($table) {
    $table->softDeletes();
});
```

现在，当您在模型上调用 `delete` 方法时，`deleted_at` 列将被设置为当前时间戳。当查询使用软删除的模型时，"已删除"的模型将不会包含在查询结果中。

要确定给定的模型实例是否已被软删除，请使用 `trashed` 方法：

```php
if ($user->trashed()) {
    //
}
```

#### 查询软删除的模型

##### 包含软删除的模型

如上所述，软删除的模型将自动从查询结果中排除。但是，您可以使用查询上的 `withTrashed` 方法强制软删除的模型出现在结果集中：

```php
$users = User::withTrashed()->where('account_id', 1)->get();
```

`withTrashed` 方法也可以用于[关联](./relations.md)查询：

```php
$flight->history()->withTrashed()->get();
```

##### 仅检索软删除的模型

`onlyTrashed` 方法将**仅**检索软删除的模型：

```php
$users = User::onlyTrashed()->where('account_id', 1)->get();
```

##### 恢复软删除的模型

有时您可能希望"取消删除"一个软删除的模型。要将软删除的模型恢复为活跃状态，请在模型实例上使用 `restore` 方法：

```php
$user->restore();
```

您也可以在查询中使用 `restore` 方法来快速恢复多个模型：

```php
// 恢复单个模型实例...
User::withTrashed()->where('account_id', 1)->restore();

// 恢复所有相关模型...
$user->posts()->restore();
```

#### 永久删除模型

有时您可能需要真正从数据库中删除模型。要从数据库中永久删除软删除的模型，请使用 `forceDelete` 方法：

```php
// 强制删除单个模型实例...
$user->forceDelete();

// 强制删除所有相关模型...
$user->posts()->forceDelete();
```

#### 软删除关联

当两个相关模型都启用了软删除时，您可以通过在[关联定义](./relations.md)中定义 `softDelete` 选项来级联删除事件。在此示例中，如果用户模型被软删除，属于该用户的评论也将被软删除。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'softDelete' => true]
    ];
}
```

::: tip
如果相关模型不使用软删除特征，它将被视为与 `delete` 选项相同并被永久删除。
:::

在相同条件下，当主模型被恢复时，所有使用 `softDelete` 选项的相关模型也将被恢复。

```php
// 恢复用户和评论
$user->restore();
```

#### 包含软删除的关联

软删除的记录不包含在关联查找中，但是，您可以通过向查询添加 `withTrashed` 作用域来包含它们。

```php
class User extends Model
{
    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'scope' => 'withTrashed']
    ];
}
```

### Multisite

将多站点应用于模型时，只有属于活跃站点的记录可供管理。活跃站点附加到记录上设置的 `site_id` 列。要为模型启用多站点，请应用 `October\Rain\Database\Traits\Multisite` 特征并使用 `$propagatable` 属性定义要在所有记录之间传播的属性：

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['api_code'];
}
```

::: tip
`$propagatable` 是多站点特征所必需的，但可以留空数组以禁用任何属性的传播。
:::

要将 `site_id` 列添加到表中，您可以在迁移中使用 `integer` 方法。也可以使用 `site_root_id` 通过根记录将记录链接在一起。

```php
Schema::table('posts', function ($table) {
    $table->integer('site_id')->nullable()->index();
    $table->integer('site_root_id')->nullable()->index();
});
```

现在，创建记录时它将被分配到活跃站点，切换到不同站点将自动传播新记录。更新记录时，传播的字段将复制到属于根记录的每条记录。

#### 强制同步

在某些情况下，所有记录必须存在于每个站点中，例如分类和标签。您可以通过将 `$propagatableSync` 属性设置为 true 来强制每条记录在所有站点中都存在，默认值为 false。启用后，保存模型后，如果其他站点还没有相同的模型，它将为其他站点创建相同的模型。

```php
protected $propagatableSync = true;
```

使用[站点组](../../cms/resources/multisite.md)时，记录将传播到该组内的所有站点。这可以通过将 `$propagatableSync` 属性设置为包含配置选项的数组来控制。

选项 | 描述
------------- | -------------
- **sync** - 同步特定站点的逻辑，可用选项：`all`、`group`、`locale`。默认值：`group`
- **delete** - 当任何记录被删除时删除所有链接的记录，默认值：`true`
- **except** - 提供不应为新同步记录复制的属性名称

```php
protected $propagatableSync = [
    'sync' => 'all',
    'delete' => false,
    'except' => [
        'description'
    ]
];
```

#### 保存模型

使用多站点特征保存的模型默认不传播。使用 `savePropagate` 方法确保传播规则生效。

```php
$model->savePropagate();
```

### Revisionable

October CMS 模型可以通过存储修订来记录值变化的历史。要为模型存储修订，请应用 `October\Rain\Database\Traits\Revisionable` 特征并声明一个 `$revisionable` 属性，其中包含要监控变化的属性数组。您还需要定义一个名为 `revision_history` 的 `$morphMany` [模型关联](./relations.md)，引用名为 `revisionable` 的 `System\Models\Revision` 类，这是修订历史数据存储的位置。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Revisionable;

    protected $revisionable = ['name', 'email'];

    public $morphMany = [
        'revision_history' => [\System\Models\Revision::class, 'name' => 'revisionable']
    ];
}
```

默认情况下，最多保留 500 条记录，但是，您可以通过在模型上声明 `$revisionableLimit` 属性并设置新的限制值来修改此值。

```php
/**
 * @var int revisionableLimit as the maximum number records to keep.
 */
public $revisionableLimit = 8;
```

修订历史可以像任何其他关联一样访问：

```php
$history = User::find(1)->revision_history;

foreach ($history as $record) {
    echo $record->field . ' updated ';
    echo 'from ' . $record->old_value;
    echo 'to ' . $record->new_value;
}
```

修订记录可选地通过 `user_id` 属性支持用户关联。您可以在模型中包含 `getRevisionableUser` 方法来跟踪进行修改的用户。

```php
public function getRevisionableUser()
{
    return BackendAuth::getUser()->id;
}
```
