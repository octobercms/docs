# 关联

数据库表通常彼此相关。例如，一篇博客文章可能有多条评论，或者一个订单可能与下单的用户相关。October 使管理和处理这些关联变得简单，并支持多种不同类型的关联。

## 定义关联

模型关联被定义为模型类上的属性。定义关联的示例：

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ]
}
```

关联与模型本身一样，也充当强大的[查询构建器](./query.md)，将关联作为函数访问提供了强大的方法链和查询功能。例如：

```php
$user->posts()->where('is_active', true)->get();
```

也可以将关联作为属性访问。

```php
$user->posts;
```

## 详细定义

每个定义可以是一个数组，其中键是关联名称，值是详细数组。详细数组的第一个值始终是相关模型的类名，所有其他值是必须具有键名的参数。

```php
public $hasMany = [
    'posts' => [\Acme\Blog\Models\Post::class, 'delete' => true]
];
```

以下是可用于所有关联的参数：

参数 | 描述
------------- | -------------
**order** | 多条记录的排序顺序。
**conditions** | 使用原始 where 查询语句过滤关联。
**scope** | 使用提供的[模型查询作用域](../database/model.md)方法过滤关联。
**push** | 如果设置为 `false`，则此关联不会通过 `push` 方法保存。默认值：`true`
**delete** | 如果设置为 `true`，则在删除主模型或销毁关联时，相关模型将被删除。默认值：`false`
**softDelete** | 如果设置为 `true`，则在[主模型被软删除](./traits.md)时，相关模型将被软删除。默认值：`false`
**replicate** | 如果设置为 true，则相关模型将通过 `replicate` 方法复制或关联。默认值：`false`。
**relationClass** | 为相关对象指定自定义类名。

使用 `order` 和 `conditions` 参数的过滤示例。

```php
public $belongsToMany = [
    'categories' => [
        \Acme\Blog\Models\Category::class,
        'order' => 'name desc',
        'conditions' => 'is_active = 1'
    ]
];
```

使用 `scope` 参数的过滤示例。

```php
class Post extends Model
{
    public $belongsToMany = [
        'categories' => [
            \Acme\Blog\Models\Category::class,
            'scope' => 'isActive'
        ]
    ];
}

class Category extends Model
{
    public function scopeIsActive($query)
    {
        return $query->where('is_active', true)->orderBy('name', 'desc');
    }
}
```

`scope` 参数也可以引用静态方法。

```php
public $belongsToMany = [
    'categories' => [
        \Acme\Blog\Models\Category::class,
        'scope' => [self::class, 'myFilterMethod']
    ]
];

public static function myFilterMethod($query, $related, $parent)
{
    // ...
}
```

使用 `relationClass` 参数的实现示例。

```php
public $belongsToMany = [
    'users' => [
        \Backend\Models\User::class,
        'relationClass' => \Backend\Classes\MyBelongsToMany::class
    ]
];
```

::: tip
`relationClass` 应该继承指定类型的类。例如，当使用 `belongsTo` 时，该类必须继承 `October\Rain\Database\Relations\BelongsTo`。
:::

## 关联类型

以下关联类型可用。

- [一对一](#relation-one-to-one)
- [一对多](#relation-one-to-many)
- [多对多](#relation-many-to-many)
- [远程一对多](#relation-has-many-through)
- [远程一对一](#relation-has-one-through)
- [多态关联](#relation-polymorphic-relations)

<a id="relation-one-to-one"></a>
### 一对一

一对一关联是一种非常基本的关联。例如，一个 `User` 模型可能与一个 `Phone` 关联。要定义此关联，我们在 `User` 模型的 `$hasOne` 属性中添加一个 `phone` 条目。

```php
namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    public $hasOne = [
        'phone' => \Acme\Blog\Models\Phone::class
    ];
}
```

一旦定义了关联，我们就可以使用同名的模型属性检索相关记录。这些属性是动态的，允许您像访问模型上的常规属性一样访问它们。

```php
$phone = User::find(1)->phone;
```

模型基于模型名称假设关联的外键。在这种情况下，`Phone` 模型自动假设有一个 `user_id` 外键。如果您希望覆盖此约定，您可以将 `key` 参数传递给定义。

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id']
];
```

此外，模型假设外键应该有一个与父表 `id` 列匹配的值。换句话说，它将在 `Phone` 记录的 `user_id` 列中查找用户 `id` 列的值。如果您希望关联使用 `id` 以外的值，您可以将 `otherKey` 参数传递给定义：

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### 定义反向关联

现在我们可以从 `User` 访问 `Phone` 模型了。让我们反过来在 `Phone` 模型上定义一个关联，让我们可以访问拥有该电话的 `User`。我们可以使用 `$belongsTo` 属性定义 `hasOne` 关联的反向关联：

```php
class Phone extends Model
{
    public $belongsTo = [
        'user' => \Acme\Blog\Models\User::class
    ];
}
```

在上面的示例中，模型将尝试将 `Phone` 模型中的 `user_id` 与 `User` 模型上的 `id` 匹配。它通过检查关联定义的名称并加上 `_id` 后缀来确定默认外键名称。但是，如果 `Phone` 模型上的外键不是 `user_id`，您可以使用定义上的 `key` 参数传递自定义键名：

```php
public $belongsTo = [
    'user' => [Acme\Blog\Models\User::class, 'key' => 'my_user_id']
];
```

如果您的父模型不使用 `id` 作为其主键，或者您希望将子模型连接到不同的列，您可以将 `otherKey` 参数传递给定义以指定父表的自定义键：

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### 默认模型

`belongsTo` 关联允许您定义一个默认模型，当给定关联为 `null` 时将返回该模型。这种模式通常被称为[空对象模式](https://en.wikipedia.org/wiki/Null_Object_pattern)，可以帮助消除代码中的条件检查。在以下示例中，如果没有 `user` 附加到文章，`user` 关联将返回一个空的 `Acme\Blog\Models\User` 模型。

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'default' => true]
];
```

要使用属性填充默认模型，您可以向 `default` 参数传递一个数组。

```php
public $belongsTo = [
    'user' => [
        \Acme\Blog\Models\User::class,
        'default' => ['name' => 'Guest']
    ]
];
```

<a id="relation-one-to-many"></a>
### 一对多

一对多关联用于定义单个模型拥有任意数量的其他模型的关联。例如，一篇博客文章可能有无限数量的评论。与所有其他关联一样，一对多关联通过在模型的 `$hasMany` 属性中添加条目来定义：

```php
class Post extends Model
{
    public $hasMany = [
        'comments' => \Acme\Blog\Models\Comment::class
    ];
}
```

请记住，模型会自动确定 `Comment` 模型上正确的外键列。按照约定，它将采用所属模型的"蛇形命名"名称并加上 `_id` 后缀。因此，在此示例中，我们可以假设 `Comment` 模型上的外键是 `post_id`。

一旦定义了关联，我们就可以通过访问 `comments` 属性来访问评论集合。请记住，由于模型提供"动态属性"，我们可以像在模型上定义的属性一样访问关联：

```php
$comments = Post::find(1)->comments;

foreach ($comments as $comment) {
    //
}
```

当然，由于所有关联也充当查询构建器，您可以通过调用 `comments` 方法并继续在查询上链接条件来添加进一步的约束以确定检索哪些评论：

```php
$comments = Post::find(1)->comments()->where('title', 'foo')->first();
```

与 `hasOne` 关联一样，您也可以通过在定义中分别传递 `key` 和 `otherKey` 参数来覆盖外键和本地键：

```php
public $hasMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

#### 定义反向关联

现在我们可以访问文章的所有评论了，让我们定义一个关联以允许评论访问其父文章。要定义 `hasMany` 关联的反向关联，请在子模型上定义 `$belongsTo` 属性：

```php
class Comment extends Model
{
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

一旦定义了关联，我们就可以通过访问 `post` "动态属性"来获取 `Comment` 的 `Post` 模型：

```php
$comment = Comment::find(1);

echo $comment->post->title;
```

在上面的示例中，模型将尝试将 `Comment` 模型中的 `post_id` 与 `Post` 模型上的 `id` 匹配。它通过检查关联的名称并加上 `_id` 后缀来确定默认外键名称。但是，如果 `Comment` 模型上的外键不是 `post_id`，您可以使用 `key` 参数传递自定义键名：

```php
public $belongsTo = [
    'post' => [\Acme\Blog\Models\Post::class, 'key' => 'my_post_id']
];
```

如果您的父模型不使用 `id` 作为其主键，或者您希望将子模型连接到不同的列，您可以将 `otherKey` 参数传递给定义以指定父表的自定义键：

```php
public $belongsTo = [
    'post' => [Acme\Blog\Models\Post::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

<a id="relation-many-to-many"></a>
### 多对多

多对多关联比 `hasOne` 和 `hasMany` 关联略微复杂。这种关联的一个例子是拥有多个角色的用户，这些角色也被其他用户共享。例如，许多用户可能拥有"管理员"角色。要定义此关联，需要三个数据库表：`users`、`roles` 和 `role_user`。`role_user` 表源自相关模型名称的字母顺序，包含 `user_id` 和 `role_id` 列。

以下示例展示了用于创建连接表的[数据库表结构](./structure.md)。

```php
Schema::create('role_user', function($table) {
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
    $table->primary(['user_id', 'role_id']);
});
```

多对多关联通过在模型类的 `$belongsToMany` 属性中添加条目来定义。例如，让我们在 `User` 模型上定义 `roles`：

```php
class User extends Model
{
    public $belongsToMany = [
        'roles' => \Acme\Blog\Models\Role::class
    ];
}
```

一旦定义了关联，您就可以使用 `roles` 动态属性访问用户的角色：

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    //
}
```

当然，与所有其他关联类型一样，您可以调用 `roles` 方法继续在关联上链接查询约束：

```php
$roles = User::find(1)->roles()->orderBy('name')->get();
```

如前所述，为了确定关联连接表的表名，模型将按字母顺序连接两个相关模型的名称。但是，您可以自由地覆盖此约定。您可以通过将 `table` 参数传递给 `belongsToMany` 定义来实现：

```php
public $belongsToMany = [
    'roles' => [\Acme\Blog\Models\Role::class, 'table' => 'acme_blog_role_user']
];
```

除了自定义连接表的名称外，您还可以通过向 `belongsToMany` 定义传递附加参数来自定义表中键的列名。`key` 参数是定义关联的模型的外键名称，而 `otherKey` 参数是您要连接的模型的外键名称：

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'table' => 'acme_blog_role_user',
        'key' => 'my_user_id',
        'otherKey' => 'my_role_id'
    ]
];
```

#### 定义反向关联

要定义多对多关联的反向关联，您只需在相关模型上放置另一个 `$belongsToMany` 属性。继续我们的用户角色示例，让我们在 `Role` 模型上定义 `users` 关联：

```php
class Role extends Model
{
    public $belongsToMany = [
        'users' => \Acme\Blog\Models\User::class
    ];
}
```

如您所见，关联的定义与 `User` 对应部分完全相同，只是简单地引用了 `Acme\Blog\Models\User` 模型。由于我们重用了 `$belongsToMany` 属性，因此在定义多对多关联的反向时，所有常用的表和键自定义选项都可用。

#### 检索中间表列

如您所知，处理多对多关联需要存在一个中间连接表。模型提供了一些非常有用的方式来与此表交互。例如，假设我们的 `User` 对象有多个与之相关的 `Role` 对象。访问此关联后，我们可以使用模型上的 `pivot` 属性访问中间表：

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    echo $role->pivot->created_at;
}
```

请注意，我们检索的每个 `Role` 模型都会自动分配一个 `pivot` 属性。此属性包含一个表示中间表的模型，可以像任何其他模型一样使用。

默认情况下，`pivot` 对象上只会存在模型键。如果您的中间表包含额外的属性，您必须在定义关联时指定它们：

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivot' => ['column1', 'column2']
    ]
];
```

如果您希望中间表自动维护 `created_at` 和 `updated_at` 时间戳，请在关联定义中使用 `timestamps` 参数：

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'timestamps' => true
    ]
];
```

如果您想定义一个自定义模型来表示关联的中间表，您可以在定义关联时使用 `pivotModel` 属性。自定义多对多中间模型应该继承 `October\Rain\Database\Pivot` 类，而自定义多态多对多中间模型应该继承 `October\Rain\Database\MorphPivot` 类。

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class
    ]
];
```

#### 允许重复关联

在某些情况下，您可能希望将同一关联关联两次或更多次，每个附加的记录使用不同的中间数据。下面的示例展示了一个[数据库表结构](./structure.md)，在连接表上使用递增主键而不是组合主键。

```php
Schema::create('role_user', function($table) {
    $table->increments('id');
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
});
```

此配置必须使用自定义 `pivotModel`，并且 `pivotKey` 属性设置为递增列名（`id`）。

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class,
        'pivotKey' => 'id'
    ]
];
```

中间模型定义应将 `$incrementing` 属性设置为 `true` 以启用递增主键，默认为 `id`，与其他所有模型一样。

```php
class UserRolePivot extends \October\Rain\Database\Pivot
{
    public $incrementing = true;
}
```

以下是 `belongsToMany` 关联支持的属性：

属性 | 描述
------------- | -------------
**table** | 连接表的名称。
**key** | 定义模型的键列名（在中间表内）。默认值由模型名称和 `_id` 后缀组合而成，例如 `user_id`
**parentKey** | 定义模型的键列名（在定义模型表内）。默认值：id
**otherKey** | 相关模型的键列名（在中间表内）。默认值由模型名称和 `_id` 后缀组合而成，例如 `role_id`
**relatedKey** | 相关模型的键列名（在相关模型表内）。默认值：id
**timestamps** | 如果为 true，连接表应包含 `created_at` 和 `updated_at` 列。默认值：`false`
**detach** | 如果设置为 false，则在删除主模型或销毁关联时，相关模型不会被分离。默认值：true。
**pivot** | 连接表中找到的中间列的数组，属性可通过 `$model->pivot` 访问。
**pivotModel** | 指定访问中间关联时返回的自定义模型类。默认为 `October\Rain\Database\Pivot`，多态关联默认为 `October\Rain\Database\MorphPivot`。
**pivotSortable** | 为中间表指定排序顺序列，与 `SortableRelation` [模型特征](../lists/structures.md)结合使用。
**pivotKey** | 为中间表指定递增 ID 列，必须与具有在表上使用主键的自定义 `pivotModel` 类一起使用。

<a id="relation-has-many-through"></a>
### 远程一对多

远程一对多关联提供了通过中间关联访问远程关联的便捷快捷方式。例如，`Country` 模型可能通过中间 `User` 模型拥有许多 `Post` 模型。在此示例中，您可以轻松收集给定国家的所有博客文章。让我们看看定义此关联所需的表：

```
countries
    id - integer
    name - string

users
    id - integer
    country_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
```

虽然 `posts` 不包含 `country_id` 列，但 `hasManyThrough` 关联通过 `$country->posts` 提供了对国家文章的访问。要执行此查询，模型检查中间 `users` 表上的 `country_id`。找到匹配的用户 ID 后，使用它们来查询 `posts` 表。

现在我们已经检查了关联的表结构，让我们在 `Country` 模型上定义它：

```php
class Country extends Model
{
    public $hasManyThrough = [
        'posts' => [
            \Acme\Blog\Models\Post::class,
            'through' => \Acme\Blog\Models\User::class
        ],
    ];
}
```

传递给 `$hasManyThrough` 关联的第一个参数是我们希望访问的最终模型的名称，而 `through` 参数是中间模型的名称。

执行关联查询时将使用典型的外键约定。如果您想自定义关联的键，您可以将它们作为 `key`、`otherKey` 和 `throughKey` 参数传递给 `$hasManyThrough` 定义。`key` 参数是中间模型上的外键名称，`throughKey` 参数是最终模型上的外键名称，而 `otherKey` 是本地键。

```php
public $hasManyThrough = [
    'posts' => [
        \Acme\Blog\Models\Post::class,
        'key' => 'my_country_id',
        'through' => \Acme\Blog\Models\User::class,
        'throughKey' => 'my_user_id',
        'otherKey' => 'my_id',
        'secondOtherKey' => 'my_country_id'
    ],
];
```

<a id="relation-has-one-through"></a>
### 远程一对一

远程一对一关联通过单个中间关联链接模型。例如，如果每个供应商有一个用户，每个用户关联一条用户历史记录，那么供应商模型可以通过用户访问用户的历史记录。让我们看看定义此关联所需的数据库表：

```
users
    id - integer
    supplier_id - integer

suppliers
    id - integer

history
    id - integer
    user_id - integer
```

虽然 `history` 表不包含 `supplier_id` 列，但 `hasOneThrough` 关联可以为供应商模型提供对用户历史记录的访问。现在我们已经检查了关联的表结构，让我们在 `Supplier` 模型上定义它：

```php
class Supplier extends Model
{
    public $hasOneThrough = [
        'userHistory' => [
            \Acme\Supplies\Model\History::class,
            'through' => \Acme\Supplies\Model\User::class
        ],
    ];
}
```

传递给 `$hasOneThrough` 属性的第一个数组参数是我们希望访问的最终模型的名称，而 `through` 键是中间模型的名称。

执行关联查询时将使用典型的外键约定。如果您想自定义关联的键，您可以将它们作为 `key`、`otherKey` 和 `throughKey` 参数传递给 `$hasManyThrough` 定义。`key` 参数是中间模型上的外键名称，`throughKey` 参数是最终模型上的外键名称，而 `otherKey` 是本地键。

```php
public $hasOneThrough = [
    'userHistory' => [
        \Acme\Supplies\Model\History::class,
        'key' => 'supplier_id',
        'through' => \Acme\Supplies\Model\User::class,
        'throughKey' => 'user_id',
        'otherKey' => 'id',
        'secondOtherKey' => 'my_country_id'
    ],
];
```

<a id="relation-polymorphic-relations"></a>
## 多态关联

多态关联允许模型在单个关联上属于多个其他模型。

### 多态一对一

#### 表结构

多态一对一关联类似于简单的一对一关联；但是，目标模型可以在单个关联上属于多种类型的模型。例如，假设您想为员工和产品存储照片。使用多态关联，您可以为这两种场景使用单个 `photos` 表。首先，让我们检查构建此关联所需的表结构：

```
staff
    id - integer
    name - string

products
    id - integer
    price - integer

photos
    id - integer
    path - string
    imageable_id - integer
    imageable_type - string
```

需要注意的两个重要列是 `photos` 表上的 `imageable_id` 和 `imageable_type` 列。`imageable_id` 列将包含所属员工或产品的 ID 值，而 `imageable_type` 列将包含所属模型的类名。`imageable_type` 列是 ORM 在访问 `imageable` 关联时确定返回哪种"类型"的所属模型的方式。

#### 模型结构

接下来，让我们检查构建此关联所需的模型定义：

```php
class Photo extends Model
{
    public $morphTo = [
        'imageable' => []
    ];
}

class Staff extends Model
{
    public $morphOne = [
        'photo' => [\Acme\Blog\Models\Photo::class, 'name' => 'imageable']
    ];
}

class Product extends Model
{
    public $morphOne = [
        'photo' => [\Acme\Blog\Models\Photo::class, 'name' => 'imageable']
    ];
}
```

#### 检索多态关联

一旦定义了数据库表和模型，您就可以通过模型访问关联。例如，要访问员工的照片，我们可以简单地使用 `photo` 动态属性：

```php
$staff = Staff::find(1);

$photo = $staff->photo
```

您还可以通过访问 `morphTo` 关联的名称从多态模型中检索多态关联的所有者。在我们的例子中，那就是 `Photo` 模型上的 `imageable` 定义。因此，我们将作为动态属性访问它：

```php
$photo = Photo::find(1);

$imageable = $photo->imageable;
```

`Photo` 模型上的 `imageable` 关联将返回 `Staff` 或 `Product` 实例，取决于拥有照片的模型类型。

### 多态一对多

#### 表结构

多态一对多关联类似于简单的一对多关联；但是，目标模型可以在单个关联上属于多种类型的模型。例如，假设应用程序的用户可以对文章和视频进行"评论"。使用多态关联，您可以为这两种场景使用单个 `comments` 表。首先，让我们检查构建此关联所需的表结构：

```
posts
    id - integer
    title - string
    body - text

videos
    id - integer
    title - string
    url - string

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```

#### 模型结构

接下来，让我们检查构建此关联所需的模型定义：

```php
class Comment extends Model
{
    public $morphTo = [
        'commentable' => []
    ];
}

class Post extends Model
{
    public $morphMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'name' => 'commentable']
    ];
}

class Product extends Model
{
    public $morphMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'name' => 'commentable']
    ];
}
```

#### 检索关联

一旦定义了数据库表和模型，您就可以通过模型访问关联。例如，要访问文章的所有评论，我们可以使用 `comments` 动态属性：

```php
$post = Author\Plugin\Models\Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```

您还可以通过访问 `morphTo` 关联的名称从多态模型中检索多态关联的所有者。在我们的例子中，那就是 `Comment` 模型上的 `commentable` 定义。因此，我们将作为动态属性访问它：

```php
$comment = Author\Plugin\Models\Comment::find(1);

$commentable = $comment->commentable;
```

`Comment` 模型上的 `commentable` 关联将返回 `Post` 或 `Video` 实例，取决于拥有评论的模型类型。

您还可以通过设置具有 `morphTo` 关联名称的属性来更新相关模型的所有者，在本例中为 `commentable`。

```php
$comment = Author\Plugin\Models\Comment::find(1);
$video = Author\Plugin\Models\Video::find(1);

$comment->commentable = $video;
$comment->save()
```

### 多态多对多

#### 表结构

除了"一对一"和"一对多"关联外，您还可以定义"多对多"多态关联。例如，博客 `Post` 和 `Video` 模型可以共享一个到 `Tag` 模型的多态关联。使用多对多多态关联允许您拥有一个在博客文章和视频之间共享的唯一标签列表。首先，让我们检查表结构：

```
posts
    id - integer
    name - string

videos
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    taggable_id - integer
    taggable_type - string
```

#### 模型结构

接下来，我们准备在模型上定义关联。`Post` 和 `Video` 模型都将在基础模型类的 `$morphToMany` 属性中定义 `tags` 关联：

```php
class Post extends Model
{
    public $morphToMany = [
        'tags' => [\Acme\Blog\Models\Tag::class, 'name' => 'taggable']
    ];
}
```

#### 定义反向关联

接下来，在 `Tag` 模型上，您应该为每个相关模型定义一个关联。因此，在此示例中，我们将定义一个 `posts` 关联和一个 `videos` 关联：

```php
class Tag extends Model
{
    public $morphedByMany = [
        'posts'  => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
        'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
    ];
}
```

#### 检索关联

一旦定义了数据库表和模型，您就可以通过模型访问关联。例如，要访问文章的所有标签，您可以简单地使用 `tags` 动态属性：

```php
$post = Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```

您还可以通过访问 `$morphedByMany` 属性中定义的关联名称从多态模型中检索多态关联的所有者。在我们的例子中，那就是 `Tag` 模型上的 `posts` 或 `videos` 方法。因此，您将作为动态属性访问这些关联：

```php
$tag = Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

#### 自定义多态类型

默认情况下，完全限定的类名用于存储相关模型类型。例如，在上面的示例中，`Photo` 可能属于 `Staff` 或 `Product`，默认的 `imageable_type` 值分别为 `Acme\Blog\Models\Staff` 或 `Acme\Blog\Models\Product`。

使用自定义多态类型可以让您将数据库与应用程序的内部结构解耦。您可以定义一个关联"变形映射"来为每个模型提供自定义名称，而不是类名：

```php
use October\Rain\Database\Relations\Relation;

Relation::morphMap([
    'staff' => \Acme\Blog\Models\Staff::class,
    'product' => \Acme\Blog\Models\Product::class,
]);
```

注册 `morphMap` 最常见的位置是在[插件注册文件](../extending.md)的 `boot` 方法中。

<a id="oc-querying-relations"></a>
## 查询关联

由于所有类型的模型关联都可以通过函数调用，您可以调用这些函数来获取关联的实例，而无需实际执行关联查询。此外，所有类型的关联也充当[查询构建器](./query.md)，允许您在最终对数据库执行 SQL 之前继续在关联查询上链接约束。

例如，假设一个博客系统中 `User` 模型有许多关联的 `Post` 模型：

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ];
}
```

### 通过关联方法访问

您可以使用 `posts` 方法查询 **posts** 关联并向关联添加额外的约束。这使您能够在关联上链接任何[查询构建器](./query.md)方法。

```php
$user = User::find(1);

$posts = $user->posts()->where('is_active', 1)->get();

$post = $user->posts()->first();
```

### 通过动态属性访问

如果您不需要向关联查询添加额外约束，您可以简单地像属性一样访问关联。例如，继续使用我们的 `User` 和 `Post` 示例模型，我们可以使用 `$user->posts` 属性来访问用户的所有文章。

```php
$user = User::find(1);

foreach ($user->posts as $post) {
    // ...
}
```

动态属性是"延迟加载"的，这意味着它们只在您实际访问时才加载其关联数据。因此，开发人员经常使用预加载（见下文）来预加载他们知道在加载模型后将要访问的关联。预加载显著减少了加载模型关联必须执行的 SQL 查询。

### 查询关联是否存在

在访问模型的记录时，您可能希望基于关联的存在来限制结果。例如，假设您想检索所有至少有一条评论的博客文章。为此，您可以将关联名称传递给 `has` 方法：

```php
// 检索所有至少有一条评论的文章...
$posts = Post::has('comments')->get();
```

您还可以指定运算符和计数来进一步自定义查询：

```php
// 检索所有有三条或更多评论的文章...
$posts = Post::has('comments', '>=', 3)->get();
```

嵌套的 `has` 语句也可以使用"点"符号构造。例如，您可以检索所有至少有一条评论和投票的文章：

```php
// 检索所有至少有一条带投票的评论的文章...
$posts = Post::has('comments.votes')->get();
```

如果您需要更多功能，您可以使用 `whereHas` 和 `orWhereHas` 方法在 `has` 查询上放置 "where" 条件。这些方法允许您向关联约束添加自定义约束，例如检查评论的内容：

```php
// 检索所有至少有一条包含类似 foo% 单词的评论的文章
$posts = Post::whereHas('comments', function ($query) {
    $query->where('content', 'like', 'foo%');
})->get();
```

#### 内联关联存在查询

要使用单个条件查询关联的存在，使用 `whereRelation`、`orWhereRelation`、`whereMorphRelation` 或 `orWhereMorphRelation` 方法更为方便。

```php
$posts = Post::whereRelation('comments', 'is_approved', false)->get();
```

`searchWhereRelation` 或 `orSearchWhereRelation` 方法可用于搜索关联列。类似于[搜索查询](./query.md)，该方法将使用搜索词（第一个参数）、关联名称（第二个参数）和搜索列（第三个参数）通过不区分大小写的 LIKE 查询添加到查询中。

```php
$posts = Post::searchWhereRelation('foo bar', 'author', ['name', 'bio'])->get();
```

#### 查询关联是否不存在

您可以将关联名称传递给 `doesntHave` 和 `orDoesntHave` 方法，以基于关联的不存在来限制结果。

```php
$posts = Post::doesntHave('comments')->get();
```

`whereDoesntHave` 和 `orWhereDoesntHave` 方法可以向 `doesntHave` 查询添加额外的查询约束。

```php
$posts = Post::whereDoesntHave('comments', function ($query) {
    $query->where('content', 'like', 'code%');
})->get();
```

### 计算相关记录

在某些场景中，您可能希望计算给定关联定义中找到的相关记录数量。`withCount` 方法可用于在所选模型中包含一个 `{relation}_count` 列。

```php
$users = User::withCount('roles')->get();

foreach ($users as $user) {
    echo $user->roles_count;
}
```

`withCount` 方法支持多个关联以及额外的查询约束。

```php
$posts = Post::withCount(['votes', 'comments' => function ($query) {
    $query->where('content', 'like', 'foo%');
}])->get();

echo $posts[0]->votes_count;
echo $posts[0]->comments_count;
```

您可以使用 `loadCount` 方法延迟加载计数列。

```php
$user = User::first();
$user->loadCount('roles');
```

还支持额外的查询约束。

```php
$user->loadCount(['roles' => function ($query) {
    $query->where('clearance', '>', 5);
}])
```

## 预加载

当将关联作为属性访问时，关联数据是"延迟加载"的。这意味着关联数据在您首次访问该属性之前实际上不会被加载。但是，模型可以在查询父模型时"预加载"关联。预加载缓解了 N + 1 查询问题。为了说明 N + 1 查询问题，考虑一个与 `Author` 相关的 `Book` 模型。

```php
class Book extends Model
{
    public $belongsTo = [
        'author' => \Acme\Blog\Models\Author::class
    ];
}
```

现在让我们检索所有书籍及其作者：

```php
$books = Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```

此循环将执行 1 个查询来检索表上的所有书籍，然后对每本书执行另一个查询来检索作者。因此，如果我们有 25 本书，此循环将运行 26 个查询：1 个用于原始书籍，25 个额外查询用于检索每本书的作者。

幸运的是，我们可以使用预加载将此操作减少到只有 2 个查询。在查询时，您可以使用 `with` 方法指定应该预加载哪些关联：

```php
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```

对于此操作，只会执行两个查询：

```sql
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```

#### 预加载多个关联

有时您可能需要在单个操作中预加载多个不同的关联。为此，只需向 `with` 方法传递额外的参数：

```php
$books = Book::with('author', 'publisher')->get();
```

#### 嵌套预加载

要预加载嵌套关联，您可以使用"点"语法。例如，让我们在一个语句中预加载所有书籍的作者和作者的所有个人联系人：

```php
$books = Book::with('author.contacts')->get();
```

### 约束预加载

有时您可能希望预加载一个关联，但也为预加载查询指定额外的查询约束。以下是一个示例：

```php
$users = User::with([
    'posts' => function ($query) {
        $query->where('title', 'like', '%first%');
    }
])->get();
```

在此示例中，模型将只预加载文章的 `title` 列包含单词 `first` 的文章。当然，您可以调用其他[查询构建器](./query.md)方法来进一步自定义预加载操作：

```php
$users = User::with([
    'posts' => function ($query) {
        $query->orderBy('created_at', 'desc');
    }
])->get();
```

### 延迟预加载

有时您可能需要在父模型已经被检索后预加载一个关联。例如，如果您需要动态决定是否加载相关模型，这可能很有用：

```php
$books = Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

如果您需要在预加载查询上设置额外的查询约束，您可以向 `load` 方法传递一个 `Closure`：

```php
$books->load([
    'author' => function ($query) {
        $query->orderBy('published_date', 'asc');
    }
]);
```

## 插入相关模型

就像您查询关联一样，October CMS 支持使用方法或动态属性方式定义关联。例如，也许您需要为 `Post` 模型插入一个新的 `Comment`。您可以直接从关联插入 `Comment`，而不是手动设置 `Comment` 上的 `post_id` 属性。

### 通过关联方法插入

October 提供了向关联添加新模型的便捷方法。模型主要可以添加到关联或从关联中移除。在每种情况下，关联分别被关联或取消关联。

#### Add 方法

使用 `add` 方法关联新的关联。

```php
$comment = new Comment(['message' => 'A new comment.']);

$post = Post::find(1);

$comment = $post->comments()->add($comment);
```

请注意，我们没有将 `comments` 关联作为动态属性访问。相反，我们调用了 `comments` 方法来获取关联的实例。`add` 方法将自动向新的 `Comment` 模型添加适当的 `post_id` 值。

如果您需要保存多个相关模型，您可以使用 `addMany` 方法：

```php
$post = Post::find(1);

$post->comments()->addMany([
    new Comment(['message' => 'A new comment.']),
    new Comment(['message' => 'Another comment.']),
]);
```

#### Remove 方法

相比之下，`remove` 方法可用于取消关联，使其成为孤立记录。

```php
$post->comments()->remove($comment);
```

在多对多关联的情况下，记录将从关联集合中移除。

```php
$post->categories()->remove($category);
```

在"belongs to"关联的情况下，您可以使用 `dissociate` 方法，它不需要传递相关模型。

```php
$post->author()->dissociate();
```

#### 使用中间数据添加

在处理多对多关联时，`add` 方法接受一个额外的中间"中间表"属性数组作为其第二个参数。

```php
$user = User::find(1);

$pivotData = ['expires' => $expires];

$user->roles()->add($role, $pivotData);
```

`add` 方法的第二个参数也可以指定延迟绑定使用的 session key（当作为字符串传递时）。在这些情况下，中间数据可以作为第三个参数提供。

```php
$user->roles()->add($role, $sessionKey, $pivotData);
```

#### Create 方法

虽然 `add` 和 `addMany` 接受完整的模型实例，您也可以使用 `create` 方法，它接受一个 PHP 属性数组，创建模型并将其插入数据库。

```php
$post = Post::find(1);

$comment = $post->comments()->create([
    'message' => 'A new comment.',
]);
```

在使用 `create` 方法之前，请务必查看有关属性[批量赋值](./model.md)的文档，因为 PHP 数组中的属性受模型的"fillable"定义限制。

### 通过动态属性插入

关联可以通过其属性直接设置，就像访问它们一样。使用此方法设置关联将覆盖之前存在的任何关联。之后应该像保存任何属性一样保存模型。

```php
$post->author = $author;

$post->comments = [$comment1, $comment2];

$post->save();
```

或者，您可以使用主键设置关联，这在处理 HTML 表单时很有用。

```php
// 分配 ID 为 3 的作者
$post->author = 3;

// 分配 ID 为 1、2 和 3 的评论
$post->comments = [1, 2, 3];

$post->save();
```

可以通过将 NULL 值分配给属性来取消关联。

```php
$post->author = null;

$post->comments = null;

$post->save();
```

类似于延迟绑定，在不存在的模型上定义的关联会在内存中延迟，直到它们被保存。在此示例中，文章尚不存在，因此无法通过 `$post->comments` 在评论上设置 `post_id` 属性。因此，关联被延迟，直到通过调用 `save` 方法创建文章。

```php
$comment = Comment::find(1);

$post = new Post;

$post->comments = [$comment];

$post->save();
```

### 多对多关联

#### 附加 / 分离

在处理多对多关联时，模型提供了一些额外的辅助方法，使处理相关模型更加方便。例如，假设一个用户可以有多个角色，一个角色可以有多个用户。要通过在连接模型的中间表中插入记录来将角色附加到用户，请使用 `attach` 方法：

```php
$user = User::find(1);

$user->roles()->attach($roleId);
```

将关联附加到模型时，您还可以传递一个要插入到中间表中的额外数据数组：

```php
$user->roles()->attach($roleId, ['expires' => $expires]);
```

当然，有时可能需要从用户中移除一个角色。要移除多对多关联记录，请使用 `detach` 方法。`detach` 方法将从中间表中删除相应的记录；但是，两个模型都将保留在数据库中：

```php
// 从用户分离单个角色...
$user->roles()->detach($roleId);

// 从用户分离所有角色...
$user->roles()->detach();
```

为方便起见，`attach` 和 `detach` 也接受 ID 数组作为输入：

```php
$user = User::find(1);

$user->roles()->detach([1, 2, 3]);

$user->roles()->attach([1 => ['expires' => $expires], 2, 3]);
```

#### 同步

您也可以使用 `sync` 方法来构建多对多关联。`sync` 方法接受一个 ID 数组放置在中间表上。不在给定数组中的任何 ID 将从中间表中移除。因此，在此操作完成后，中间表中只会存在数组中的 ID：

```php
$user->roles()->sync([1, 2, 3]);
```

您还可以随 ID 传递额外的中间表值：

```php
$user->roles()->sync([1 => ['expires' => true], 2, 3]);
```

### 触发父级时间戳

当一个模型 `belongsTo` 或 `belongsToMany` 另一个模型时，例如 `Comment` 属于 `Post`，在子模型更新时更新父级的时间戳有时很有用。例如，当 `Comment` 模型更新时，您可能想自动"触发" `Post` 的 `updated_at` 时间戳。只需在子模型中添加一个包含关联名称的 `touches` 属性：

```php
class Comment extends Model
{
    /**
     * All of the relationships to be touched.
     */
    protected $touches = ['post'];

    /**
     * Relations
     */
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

现在，当您更新 `Comment` 时，拥有它的 `Post` 的 `updated_at` 列也会被更新：

```php
$comment = Comment::find(1);

$comment->text = 'Edit to this comment!';

$comment->save();
```

## 延迟绑定

延迟绑定允许您推迟模型关联绑定，直到主记录提交更改。如果您需要准备一些模型（例如文件上传）并将它们关联到尚不存在的另一个模型，这特别有用。

您可以使用 **session key** 将任意数量的**从属**模型延迟绑定到**主**模型。当主记录与 session key 一起保存时，与从属记录的关联将自动为您更新。延迟绑定在后端[表单行为](../backend/form.md)中自动支持，但您可能希望在其他地方使用此功能。

### 生成 Session Key

延迟绑定需要 session key。您可以将 session key 视为事务标识符。绑定/解绑关联和保存主模型时应该使用相同的 session key。您可以使用 PHP `uniqid()` 函数生成 session key。请注意，[表单助手](../../markup/function/form.md)会自动生成包含 session key 的隐藏字段。

```php
$sessionKey = uniqid('session_key', true);
```

### 延迟关联绑定

下一个示例中的评论不会被添加到文章中，除非文章被保存。

```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```

::: tip
`$post` 对象尚未保存，但如果进行保存，关联将被创建。
:::

### 延迟关联解绑

下一个示例中的评论不会被删除，除非文章被保存。

```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->remove($comment, $sessionKey);
```

### 列出所有绑定

使用关联的 `withDeferred` 方法加载所有记录，包括延迟的。结果还将包括现有关联。

```php
$post->comments()->withDeferred($sessionKey)->get();
```

### 取消所有绑定

取消延迟绑定并删除从属对象是一个好主意，而不是将它们作为孤立对象留下。

```php
$post->cancelDeferred($sessionKey);
```

### 提交所有绑定

您可以通过使用 `save` 方法的第二个参数提供 session key，在保存主模型时提交（绑定或解绑）所有延迟绑定。

```php
$post = new Post;
$post->title = "First blog post";
$post->save(['sessionKey' => $sessionKey]);
```

同样的方法适用于模型的 `create` 方法：

```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

### 延迟提交绑定

如果您无法在保存时提供 `$sessionKey`，您可以随时使用以下代码提交绑定：

```php
$post->commitDeferred($sessionKey);
```

### 清理孤立绑定

销毁所有未提交且超过 1 天的绑定：

```php
October\Rain\Database\Models\DeferredBinding::cleanUp(1);
```

::: tip
October CMS 通过垃圾回收自动销毁超过 5 天的延迟绑定。
:::

### 禁用延迟绑定

有时您可能需要完全禁用给定模型的延迟绑定，例如如果您从单独的数据库连接加载它。为此，您需要确保模型的 `sessionKey` 属性在内部保存方法中的延迟绑定钩子运行之前为 `null`。为此，您可以绑定到模型的 `model.saveInternal` 事件。

```php
public function __construct()
{
    parent::__construct(...func_get_args());

    $this->bindEvent('model.saveInternal', function () {
        $this->sessionKey = null;
    });
}
```

::: tip
这将完全禁用您应用此覆盖的任何模型的延迟绑定。
:::
