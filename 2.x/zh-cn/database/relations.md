# 关联

数据库表通常相互关联。 例如，一篇博客文章可能有很多评论，或者某个订单可能与发布该订单的用户相关。 October 使管理和处理这些关联变得容易，并支持多种不同类型的关联。

## 定义关联

模型关联被定义为模型类的属性。 定义关联的示例：

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ]
}
```

像模型本身这样的关联也可以作为强大的 [查询构建器](query.md)，将关联作为函数访问提供了强大的方法链接和查询功能。 例如：

```php
$user->posts()->where('is_active', true)->get();
```

也可以将关联作为属性访问：

```php
$user->posts;
```

<a id="oc-detailed-relationships"></a>
### 详细定义

每个定义都可以是一个数组，其中键是关联名称，值是细节数组。 详细信息数组的第一个值始终是关联模型类名称，所有其他值都是必须具有键名的参数。

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
**scope** | 使用提供的范围方法过滤关联。
**push** | 如果设置为 false，则不会通过 `push` 保存此关联，默认值：`true`。
**delete** | 如果设置为true，如果主模型被删除或关联被破坏，关联模型将被删除，默认：`false`。
**replicate** | 如果设置为 true，相关模型将通过 `replicate` 方法复制或关联。 默认值：`false`。
**relationClass** | 为相关对象指定自定义类名。

使用 **order** 和 **conditions** 参数的过滤器示例。

```php
public $belongsToMany = [
    'categories' => [
        \Acme\Blog\Models\Category::class,
        'order'      => 'name desc',
        'conditions' => 'is_active = 1'
    ]
];
```

使用 **scope** 参数的示例过滤器。

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

<a id="oc-relationship-types"></a>
## 关联类型

可以使用以下关联类型：

- [一对一](#relation-one-to-one)
- [一对多](#relation-one-to-many)
- [多对多](#relation-many-to-many)
- [远程一对多](#relation-has-many-through)
- [多态关联](#relation-has-one-through)
- [多对多 (多态关联)](#relation-polymorphic-relations)

<a id="relation-one-to-one"></a>
### 一对一

一对一是最基本的关联关系。例如，一个 `User` 模型可能关联一个 `Phone` 模型。为了定义这个关联，我们要在 `User` 模型中写一个 `phone` 方法。在 `phone` 方法内部调用 `hasOne` 方法并返回其结果:

```php
<?php namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    public $hasOne = [
        'phone' => \Acme\Blog\Models\Phone::class
    ];
}
```

`hasOne` 方法的第一个参数是关联模型的类名。一旦定义了模型关联，我们就可以使用 同名的模型属性检索相关记录。动态属性允许你像访问模型中定义的属性一样访问关联方法：

```php
$phone = User::find(1)->phone;
```

模型会基于模型名决定外键名称。 在这种情况下，会自动假设 `Phone` 模型有一个 `user_id` 外键。 如果你想覆盖这个约定，您可以将 `key` 参数传递定义：

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id']
];
```

此外，该模型假设外键的值应与父级的`id`字段匹配。 换句话说，它会在`Phone`记录的`user_id`列中查找用户表的`id`字段的值。 如果您希望关联使用 `id` 以外的定义键名，可以将 `otherKey` 参数传递定义：

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### 定义反向关联

我们已经能从 `User` 模型访问到 `Phone` 模型了。现在，让我们再在 `Phone` 模型上定义一个关联，这个关联能让我们访问到拥有该电话的 `User` 模型。我们可以使用与 `hasOne` 方法对应的 `belongsTo` 方法来定义反向关联：

```php
class Phone extends Model
{
    public $belongsTo = [
        'user' => \Acme\Blog\Models\User::class
    ];
}
```

在上面的例子中， 模型会尝试匹配 `Phone` 模型上的 `user_id` 至 `User` 模型上的 `id` 。它是通过检查关联方法的名称并使用 `_id` 作为后缀名来确定默认外键名称的。但是，如果 `Phone` 模型的外键不是 `user_id`，那么可以将自定义键名作为`key`参数传递给 `belongsTo` 方法：

```php
public $belongsTo = [
    'user' => [Acme\Blog\Models\User::class, 'key' => 'my_user_id']
];
```

如果父级模型没有使用 `id` 作为主键，或者是希望用不同的字段来连接子级模型，则可以通过给 `belongsTo` 方法传递`otherKey`参数的形式指定父级数据表的自定义键：

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### 默认模型

`belongsTo`关联允许你指定默认模型，当给定关联为 `null` 时，将会返回默认模型。 这种模式被称作 [Null 对象模式](https://en.wikipedia.org/wiki/Null_Object_pattern) ，可以减少你代码中不必要的检查。在下面的例子中，如果发布的帖子没有找到作者， `user` 关联会返回一个空的 `Acme\Blog\Models\User` 模型：

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'default' => true]
];
```
如果需要在默认模型里添加属性， 你可以传递数组或者回调方法到 `default` 中：

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

『一对多』关联用于定义单个模型拥有任意数量的其它关联模型。例如，一篇博客文章可能会有无限多条评论。正如其它所有的模型关联一样，一对多关联的定义也是在 模型中写一个`$hasMany`方法：

```php
class Post extends Model
{
    public $hasMany = [
        'comments' => \Acme\Blog\Models\Comment::class
    ];
}
```
记住一点，模型将会自动确定 `Comment` 模型的外键属性。按照约定，模型将会使用所属模型名称的 『snake case』形式，再加上 `_id` 后缀作为外键字段。因此，在上面这个例子中，模型将假定 `Comment` 对应到 `Post` 模型上的外键就是 `post_id`。

一旦关联被定义好以后，就可以通过访问 `Post` 模型的 `comments` 属性来获取评论的集合。记住，由于模型 提供了『动态属性』 ，所以我们可以像访问模型的属性一样访问关联方法：

```php
$comments = Post::find(1)->comments;

foreach ($comments as $comment) {
    //
}
```

当然，由于所有的关联还可以作为查询语句构造器使用，因此你可以使用链式调用的方式，在 `comments` 方法上添加额外的约束条件：

```php
$comments = Post::find(1)->comments()->where('title', 'foo')->first();
```

正如 `hasOne` 方法一样，你也传递 `key`和`otherKey`参数来覆盖外键与本地键：

```php
public $hasMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

#### 一对多 (反向)

现在，我们已经能获得一篇文章的所有评论，接着再定义一个通过评论获得所属文章的关联关系。这个关联是 `hasMany` 关联的反向关联，需要在子级模型中使用 `belongsTo` 方法定义它：

```php
class Comment extends Model
{
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

这个关联定义好以后，我们就可以通过访问 `Comment` 模型的 `post` 这个『动态属性』来获取关联的 `Post` 模型了：

```php
$comment = Comment::find(1);

echo $comment->post->title;
```

在上面的例子中，模型会尝试用 `Comment` 模型的 `post_id` 与 `Post` 模型的 `id` 进行匹配。默认外键名是 模型依据关联名，并在关联名后加上 `_id`再加上主键字段名作为后缀确定的。当然，如果 `Comment` 模型的外键不是 `post_id`，那么可以将自定义键名作为`key`参数传递给 `belongsTo` 方法：

```php
public $belongsTo = [
    'post' => [\Acme\Blog\Models\Post::class, 'key' => 'my_post_id']
];
```

如果父级模型没有使用 `id` 作为主键，或者是希望用不同的字段来连接子级模型，则可以通过给 `belongsTo` 方法传递`otherKey`参数的形式指定父级数据表的自定义键：

```php
public $belongsTo = [
    'post' => [Acme\Blog\Models\Post::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

<a id="relation-many-to-many"></a>
### 多对多

多对多关联比 `hasOne` 和 `hasMany` 关联稍微复杂些。举个例子，一个用户可以拥有很多种角色，同时这些角色也被其他用户共享。例如，许多用户可能都有 "管理员"这个角色。要定义这种关联，需要三个数据库表： `users`，`roles` 和 `role_user`。`role_user` 表的命名是由关联的两个模型按照字母顺序来的，并且包含了 `user_id` 和 `role_id` 字段。

下面是一个显示用于创建连接表的[数据库表结构](../plugin/updates.md#oc-migration-files)的示例。

```php
Schema::create('role_user', function($table)
{
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
    $table->primary(['user_id', 'role_id']);
});
```

多对多关联通过调用 `belongsToMany` 这个内部方法返回的结果来定义，例如，我们在 `User` 模型中定义 `roles` 方法：

```php
class User extends Model
{
    public $belongsToMany = [
        'roles' => \Acme\Blog\Models\Role::class
    ];
}
```

一旦关联关系被定义后，你可以通过 `roles` 动态属性获取用户角色：

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    //
}
```

当然，像其它所有关联模型一样，你可以使用 `roles` 方法，利用链式调用对查询语句添加约束条件：

```php
$roles = User::find(1)->roles()->orderBy('name')->get();
```

正如前面所提到的，为了确定关联连接表的表名，模型会按照字母顺序连接两个关联模型的名字。当然，你也可以不使用这种约定，传递`table`参数到 `belongsToMany` 方法即可

```php
public $belongsToMany = [
    'roles' => [\Acme\Blog\Models\Role::class, 'table' => 'acme_blog_role_user']
];
```

除了自定义连接表的表名，你还可以通过传递额外的参数到 `belongsToMany` 方法来定义该表中字段的键名。`key`参数是定义此关联的模型在连接表里的外键名，`otherKey`参数是另一个模型在连接表里的外键名：

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'table'    => 'acme_blog_role_user',
        'key'      => 'my_user_id',
        'otherKey' => 'my_role_id'
    ]
];
```

#### 定义反向关联

要定义多对多的反向关联， 你只需要在关联模型中调用 `belongsToMany` 方法。我们在 `Role` 模型中定义 `users` 方法：

```php
class Role extends Model
{
    public $belongsToMany = [
        'users' => \Acme\Blog\Models\User::class
    ];
}
```

如你所见，除了引入模型为 `Acme\Blog\Models\User` 外，其它与在 `User` 模型中定义的完全一样。由于我们重用了 `belongsToMany` 方法，自定义连接表表名和自定义连接表里的键的字段名称在这里同样适用。

#### 获取中间表字段

就如你刚才所了解的一样，多对多的关联关系需要一个中间表来提供支持， 模型提供了一些有用的方法来和这张表进行交互。例如，假设我们的 `User` 对象关联了多个 `Role` 对象。在获得这些关联对象后，可以使用模型的 `pivot` 属性访问中间表的数据：

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    echo $role->pivot->created_at;
}
```

需要注意的是，我们获取的每个 `Role` 模型对象，都会被自动分配一个 `pivot` 属性，它代表中间表的一个模型对象，并且可以像其他的模型一样使用。

默认情况下，`pivot` 对象只包含两个关联模型的主键，如果你的中间表里还有其他额外字段，你必须在定义关联时明确指出：

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivot' => ['column1', 'column2']
    ]
];
```

如果你想让中间表自动维护 `created_at` 和 `updated_at` 时间戳，那么在定义关联时附加上 `timestamps` 方法即可

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'timestamps' => true
    ]
];
```

如果你想定义一个自定义模型来表示你关联的中间表，你可以在定义关联时使用 `pivotModel` 属性。 自定义多对多中间表模型应扩展`October\Rain\Database\Pivot`类，而自定义多态多对多中间表模型应扩展`October\Rain\Database\MorphPivot`类。

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class
    ]
];
```

这些是 `belongsToMany` 关联支持的参数：

参数 | 描述
------------- | -------------
**table** | 连接表的名称。
**key** | 定义模型键的字段名称(在数据透视表内)。 默认值由模型名称和`_id`后缀组合而成，即`user_id`
**parentKey** | 定义模型键的字段名称(在定义模型表中)。 默认值：id
**otherKey** | 关联模型键的字段名称(在数据透视表内)。 默认值由模型名称和`_id`后缀组合而成，即`role_id`
**relatedKey** | 关联模型键的字段名称(在关联模型表内)。 默认值：id
**pivot** | 在中间表中找到的关联字段数组，属性可通过 `$model->pivot` 获得。
**pivotModel** | 指定访问中间关联时要返回的自定义模型类。 默认为 `October\Rain\Database\Pivot` 而对于多态关联为 `October\Rain\Database\MorphPivot`。
**timestamps** | 如果为true，则关联表应包含`created_at`和`updated_at`字段。 默认值：false

<a id="relation-has-many-through"></a>
### 远程一对多关联

远程"一对多"关联提供了方便、简短的方式通过中间的关联来获得远层的关联。例如，一个 `Country` 模型可以通过中间的 `User` 模型获得多个 `Post` 模型。在这个例子中，你可以轻易地收集给定国家和地区的所有博客文章。让我们来看看定义这种关联所需的数据表：

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

虽然 `posts` 表中不包含 `country_id` 字段，但 `hasManyThrough` 关联能让我们通过 `$country->posts` 访问到一个国家下所有的用户文章。为了完成这个查询，模型会先检查中间表 `users` 的 `country_id` 字段，找到所有匹配的用户 ID 后，使用这些 ID，在 `posts` 表中完成查找。

现在，我们已经知道了定义这种关联所需的数据表结构，接下来，让我们在 `Country` 模型中定义它：

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

`hasManyThrough` 方法的第一个参数是我们最终希望访问的模型名称，而第二个参数是中间模型的名称。

当执行关联查询时，通常会使用模型约定的外键名。如果你想要自定义关联的键，可以通过给 `hasManyThrough` 方法传递`key`, `otherKey`和`throughKey`参数实现，`key`参数表示中间模型的外键名，`throughKey`参数表示最终模型的外键名。`otherKey`参数表示本地键名：

```php
public $hasManyThrough = [
    'posts' => [
        \Acme\Blog\Models\Post::class,
        'key' => 'my_country_id',
        'through' => \Acme\Blog\Models\User::class,
        'throughKey' => 'my_user_id',
        'otherKey' => 'my_id'
    ],
];
```

<a id="relation-has-one-through"></a>
### 远程一对一

远程一对一关联通过一个中间关联模型实现。
例如，如果每个供应商都有一个用户，并且每个用户与一个用户历史记录相关联，那么供应商可以通过用户访问用户的历史记录，让我们看看定义这种关联所需的数据库表：

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

虽然 `history` 表不包含 `supplier_id` ，但 `hasOneThrough` 关联可以提供对用户历史记录的访问，以访问供应商模型。现在我们已经检查了关联的表结构，让我们在 `Supplier` 模型上定义相应的方法：

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

传递给 `hasOneThrough` 方法的第一个参数是希望访问的模型名称，`through`参数是中间模型的名称。

当执行关联查询时，通常会使用模型约定的外键名。如果你想要自定义关联的键，可以通过给 `hasManyThrough` 方法传递`key`, `otherKey`和`throughKey`参数实现，`key`参数表示中间模型的外键名，`throughKey`参数表示最终模型的外键名。`otherKey`参数表示本地键名：

```php
public $hasOneThrough = [
    'userHistory' => [
        \Acme\Supplies\Model\History::class,
        'key' => 'supplier_id',
        'through' => \Acme\Supplies\Model\User::class,
        'throughKey' => 'user_id',
        'otherKey' => 'id'
    ],
];
```

<a id="relation-polymorphic-relations"></a>
## 多态关联

多态关联允许目标模型借助单个关联从属于多个模型。

### 多态一对一

#### 表结构

一对一多态关联与简单的一对一关联类似；不过，目标模型能够在一个关联上从属于多个模型。例如，您的 `员工` 和 `产品` 可能共享一个关联到 `照片` 模型的关系。使用一对一多态关联允许使用一个唯一图片列表同时用于员工列表和产品列表。让我们先看看表结构：

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

要特别留意 `photos` 表的 `imageable_id` 和 `imageable_type` 列。 `imageable_id` 列包含产品或员工的 ID 值，而 `imageable_type` 列包含的则是父模型的类名。ORM在访问 `imageable` 时使用 `imageable_type` 列来判断父模型的 "类型"

#### 模型结构

接下来，再看看建立关联的模型定义：

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

#### 获取关联

一旦定义了表和模型，就可以通过模型访问此关联。比如，要访问员工的照片，可以使用 `photo` 动态属性：

```php
$staff = Staff::find(1);

$photo = $staff->photo
```

还可以通过访问执行 `morphTo` 调用的方法名来从多态模型中获知父模型。在这个例子中，就是 `Photo` 模型的 `imageable` 方法。所以，我们可以像动态属性那样访问这个方法：

```php
$photo = Photo::find(1);

$imageable = $photo->imageable;
```

`Photo` 模型的 `imageable` 关联将返回 `Staff` 或 `Product` 实例，其结果取决于图片属性哪个模型。

### 多态一对多

#### 表结构

一对多多态关联与简单的一对多关联类似；不过，目标模型可以在一个关联中从属于多个模型。假设应用中的用户可以同时 "评论" 文章和视频。使用多态关联，可以用单个 `comments` 表同时满足这些情况。我们还是先来看看用来构建这种关联的表结构：

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

接下来，看看构建这种关联的模型定义：

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

#### 获取关联

一旦定义了数据库表和模型，就可以通过模型访问关联。例如，可以使用 `comments` 动态属性访问文章的全部评论：

```php
$post = Author\Plugin\Models\Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```

还可以通过访问执行 `morphTo` 调用的方法名来从多态模型获取其所属模型。在本例中，就是 `Comment` 模型的  `commentable` 方法：

```php
$comment = Author\Plugin\Models\Comment::find(1);

$commentable = $comment->commentable;
```

 `Comment`  模型的 `commentable` 关联将返回 `Post` 或 `Video` 实例，其结果取决于评论所属的模型。

您还可以通过使用 `morphTo` 关联的名称设置属性来更新关联模型的所有者，在本例中为 `commentable`。

```php
$comment = Author\Plugin\Models\Comment::find(1);
$video = Author\Plugin\Models\Video::find(1);

$comment->commentable = $video;
$comment->save()
```

### 多态多对多

#### 表结构

多对多多态关联比 `morphOne` 和 `morphMany` 关联略微复杂一些。例如，博客 `Post` 和 `Video` 模型能够共享关联到 `Tag` 模型的多态关联。使用多对多多态关联允许使用一个唯一标签在博客文章和视频间共享。以下是多对多多态关联的表结构：

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

接下来，在模型上定义关联。`Post` 和 `Video` 模型都有调用基础模型类上  `morphToMany` 方法的 `tags` 方法：

```php
class Post extends Model
{
    public $morphToMany = [
        'tags' => [\Acme\Blog\Models\Tag::class, 'name' => 'taggable']
    ];
}
```

#### 定义反向关联关系

下面，需要在 `Tag` 模型上为每个关联模型定义一个方法。在这个示例中，我们将会定义 `posts` 方法和 `videos` 方法：

```php
class Tag extends Model
{
    public $morphedByMany = [
        'posts'  => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
        'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
    ];
}
```

#### 获取关联

一旦定义了数据库表和模型，就可以通过模型访问关联。例如，可以使用 `tags` 动态属性访问文章的所有标签：

```php
$post = Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```

还可以访问执行 `morphedByMany` 方法调用的方法名来从多态模型获取其所属模型。在这个示例中，就是 `Tag`  模型的 `posts` 或 `videos` 方法。可以像动态属性一样访问这些方法：

```php
$tag = Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

#### 自定义多态类型

默认情况下，使用完全限定类名存储关联模型类型。在上面的一对多示例中， 因为 `Photo` 可能从属于一个 `Staff` 或一个 `Product`，默认的 `commentable_type` 就将分别是 `Acme\Blog\Models\Staff` 或 `Acme\Blog\Models\Product`。

使用自定义多态类型可以让您将数据库与应用程序的内部结构分离。 你可以定义一个关联"变形映射"来为每个模型提供一个自定义名称，而不是类名：

```php
use October\Rain\Database\Relations\Relation;

Relation::morphMap([
    'staff' => \Acme\Blog\Models\Staff::class,
    'product' => \Acme\Blog\Models\Product::class,
]);
```

在 [插件注册文件](../plugin/registration.md#oc-registration-methods) 的 `boot` 方法中注册 `morphMap` 的最常见位置。

<a id="oc-querying-relations"></a>
## 查询关联

由于模型关联的所有类型都通过方法定义，你可以调用这些方法，而无需真实执行关联查询。另外，所有模型关联类型用作 [查询构造器](query.md)，允许你在数据库上执行 SQL 之前，持续通过链式调用添加约束。

例如，假设一个博客系统的 `User` 模型有许多关联的 `Post`模型：

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ];
}
```

### 通过关联方法访问

您可以使用 `posts` 方法查询 **posts** 关联并为关联添加额外的约束。 这使您能够在关联上扩展任何 [查询构造器](query.md) 方法。

```php
$user = User::find(1);

$posts = $user->posts()->where('is_active', 1)->get();

$post = $user->posts()->first();
```

### 通过动态属性访问

如果您不需要向关联查询添加额外的约束，您可以简单地访问该关联，就像它是一个属性一样。 例如，继续使用我们的 `User` 和 `Post` 示例模型，我们可以使用 `$user->posts` 属性来访问用户的所有帖子。

```php
$user = User::find(1);

foreach ($user->posts as $post) {
    // ...
}
```

动态属性是"懒加载"的，这意味着它们仅在你真实访问关联数据时才被载入。因此，开发者经常使用 [预加载](#oc-eager-loading) 预先加载那些他们确知在载入模型后将访问的关联。对载入模型关联中必定被执行的 SQL 查询而言，预加载显著减少了查询的执行次数。

### 查询已存在的关联

在访问模型记录时，可能希望基于关联的存在限制查询结果。比如想要获取至少存在一条评论的所有文章，可以通过给 `has`方法传递关联名称来实现：

```php
// 检索所有至少有一条评论的帖子...
$posts = Post::has('comments')->get();
```

还可以指定运算符和数量进一步自定义查询：

```php
// Retrieve all posts that have three or more comments...
$posts = Post::has('comments', '>=', 3)->get();
```

还可以用"点"语法构造嵌套的 `has` 语句。比如，可以获取拥有至少一条评论和投票的文章：

```php
// 获取拥有至少一条带有投票评论的文章...
$posts = Post::has('comments.votes')->get();
```

如果需要更多功能，可以使用 `whereHas` 和 `orWhereHas` 方法将"where"条件放到 `has` 查询上。这些方法允许你向关联加入自定义约束，比如检查评论内容：

```php
// 获取至少带有一条评论内容包含 foo% 关键词的文章...
$posts = Post::whereHas('comments', function ($query) {
    $query->where('content', 'like', 'foo%');
})->get();
```

### 关联记录计数

在某些情况下，您可能想要计算在给定关联定义中找到的相关记录的数量。 `withCount` 方法可用于在所选模型中包含 `{relation}_count` 列。

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

您可以使用 `loadCount` 方法懒加载计数字段。

```php
$user = User::first();
$user->loadCount('roles');
```

还支持其他查询约束。

```php
$user->loadCount(['roles' => function ($query) {
    $query->where('clearance', '>', 5);
}])
```

<a id="oc-eager-loading"></a>
## 预加载

当以属性方式访问关联时，关联数据"懒加载"。这意味着直到第一次访问属性时关联数据才会被真实加载。不过 Eloquent 能在查询父模型时"预先载入"子关联。预加载可以缓解 N + 1 查询问题。为了说明 N + 1 查询问题，考虑  `Book` 模型关联到 `Author` 的情形：

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

此循环将执行一个查询，用于获取全部书籍，然后为每本书执行获取作者的查询。如果我们有 25 本书，此循环将运行 26 个查询：1 个用于查询书籍，25 个附加查询用于查询每本书的作者。

值得庆幸的是，我们能够使用预加载将操作压缩到只有 2 个查询。在查询时，可以使用 `with` 方法指定想要预加载的关联：

```php
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```

在这个例子中，仅执行了两个查询：

```sql
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```

#### 预加载多个关联

有时，你可能需要在单一操作中预加载几个不同的关联。要达成此目的，只要向 `with` 方法传递多个关联名称构成的数组参数：

```php
$books = Book::with('author', 'publisher')->get();
```

#### 嵌套预加载

可以使用"点"语法预加载嵌套关联。比如在一个语句中预加载所有书籍作者及其联系方式：

```php
$books = Book::with('author.contacts')->get();
```

### 为预加载添加约束

有时，可能希望预加载一个关联，同时为预加载查询添加额外查询条件，就像下面的例子：

```php
$users = User::with([
    'posts' => function ($query) {
        $query->where('title', 'like', '%first%');
    }
])->get();
```

在这个例子中， 模型将仅预加载那些 `title` 列包含 `first` 关键词的文章。也可以调用其它的 [查询构造器](query.md) 方法进一步自定义预加载操作：

```php
$users = User::with([
    'posts' => function ($query) {
        $query->orderBy('created_at', 'desc');
    }
])->get();
```

### 延迟预加载

有时您可能需要在已检索到父模型后立即加载关联。 例如，如果您需要动态决定是否加载关联模型，这可能很有用：

```php
$books = Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

如果您需要在预加载查询上设置额外的查询约束，您可以将 `Closure` 传递给 `load` 方法：

```php
$books->load([
    'author' => function ($query) {
        $query->orderBy('published_date', 'asc');
    }
]);
```

## 插入关联模型

就像[查询关系](#oc-querying-relations) 一样，October支持使用方法或动态属性方法定义关联。 例如，也许您需要为 `Post` 模型插入一个新的 `Comment`。 您可以直接从关联中插入 `Comment`，而不是手动设置 `Comment` 上的 `post_id` 属性。

### 通过关联方法插入

October为新模型添加关联提供了便捷的方法。 主要可以将模型添加到关联中或从关联中删除。 在每种情况下，分别关联或解除关联。

#### 添加方法

使用 `add` 方法关联一个新的关联。

```php
$comment = new Comment(['message' => 'A new comment.']);

$post = Post::find(1);

$comment = $post->comments()->add($comment);
```

请注意，我们没有将 `comments` 关联作为动态属性访问。 相反，我们调用 `comments` 方法来获取关联的实例。 `add` 方法会自动将适当的 `post_id` 值添加到新的 `Comment` 模型中。

如果需要保存多个相关模型，可以使用 `addMany` 方法：

```php
$post = Post::find(1);

$post->comments()->addMany([
    new Comment(['message' => 'A new comment.']),
    new Comment(['message' => 'Another comment.']),
]);
```

#### 删除方法

相比之下，`remove` 方法可用于解除关联关系，使其成为无效记录。

```php
$post->comments()->remove($comment);
```

在多对多关联的情况下，记录将从关联的集合中删除。

```php
$post->categories()->remove($category);
```

在"belongsTo"关联的情况下，您可以使用 `dissociate` 方法，该方法不需要将相关模型传递给它。

```php
$post->author()->dissociate();
```

#### 使用透视数据添加

当处理多对多关系时，`add` 方法接受一个额外的中间"透视"表属性数组作为其第二个参数作为数组。

```php
$user = User::find(1);

$pivotData = ['expires' => $expires];

$user->roles()->add($role, $pivotData);
```

`add` 方法的第二个参数还可以指定 [延迟绑定](#oc-deferred-binding) 在作为字符串传递时使用的会话密钥。 在这些情况下，可以将透视数据作为第三个参数提供。

```php
$user->roles()->add($role, $sessionKey, $pivotData);
```

#### 创建方法

虽然 `add` 和 `addMany` 接受完整的模型实例，但您也可以使用 `create` 方法，该方法接受 PHP 属性数组，创建模型并将其插入数据库。

```php
$post = Post::find(1);

$comment = $post->comments()->create([
    'message' => 'A new comment.',
]);
```

在使用 `create` 方法之前，请务必查看有关属性 [批量赋值](model.md#oc-mass-assignment) 的文档，因为 PHP 数组中的属性受模型的"可填充"定义的限制。

### 通过动态属性插入

可以通过它们的属性直接设置关联，就像您访问它们一样。 使用这种方法设置关联将覆盖以前存在的任何关联。 之后应该像使用任何属性一样保存模型。

```php
$post->author = $author;

$post->comments = [$comment1, $comment2];

$post->save();
```

或者，您可以使用主键设置关联，这在处理 HTML 表单时很有用。

```php
// 分配给 ID 为 3 的作者
$post->author = 3;

// 分配 ID 为 1、2 和 3 的评论
$post->comments = [1, 2, 3];

$post->save();
```

可以通过将 NULL 值分配给属性来解除关联。

```php
$post->author = null;

$post->comments = null;

$post->save();
```

与 [延迟绑定](#oc-deferred-binding) 类似，在不存在的模型上定义的关联在内存中被延迟，直到它们被保存。 在此示例中，帖子尚不存在，因此无法通过 `$post->comments` 在评论上设置 `post_id` 属性。 因此，关联会延迟到通过调用`save`方法创建帖子为止。

```php
$comment = Comment::find(1);

$post = new Post;

$post->comments = [$comment];

$post->save();
```

### 多对多关联

#### 附加 / 分离

在处理多对多关系时，模型也提供了一些额外的辅助方法，使相关模型的使用更加方便。例如，我们假设一个用户可以拥有多个角色，并且每个角色都可以被多个用户共享。给某个用户附加一个角色是通过向中间表插入一条记录实现的，可以使用 `attach` 方法完成该操作:

```php
$user = User::find(1);

$user->roles()->attach($roleId);
```

在将关系附加到模型时，还可以传递一组要插入到中间表中的附加数据：

```php
$user->roles()->attach($roleId, ['expires' => $expires]);
```

当然，有时也需要移除用户的角色。可以使用 `detach` 移除多对多关联记录。`detach` 方法将会移除中间表对应的记录；但是这 2 个模型都将会保留在数据库中：

```php
// 移除用户的一个角色...
$user->roles()->detach($roleId);

// 移除用户的所有角色...
$user->roles()->detach();
```

为了方便，`attach` 和 `detach` 也允许传递一个 ID 数组：

```php
$user = User::find(1);

$user->roles()->detach([1, 2, 3]);

$user->roles()->attach([1 => ['expires' => $expires], 2, 3]);
```

#### 同步关联

你也可以使用 `sync` 方法构建多对多关联。`sync` 方法接收一个 ID 数组以替换中间表的记录。中间表记录中，所有未在 ID 数组中的记录都将会被移除。所以该操作结束后，只有给出数组的 ID 会被保留在中间表中：

```php
$user->roles()->sync([1, 2, 3]);
```

你也可以通过 ID 传递额外的附加数据到中间表：

```php
$user->roles()->sync([1 => ['expires' => true], 2, 3]);
```

### 更新父级时间戳

当一个模型属 `belongsTo` 或者 `belongsToMany` 另一个模型时， 例如 `Comment` 属于 `Post`，有时更新子模型导致更新父模型时间戳非常有用。例如，当 `Comment` 模型被更新时，您要自动"触发"父级 `Post` 模型的 `updated_at` 时间戳的更新。只要在子模型加一个包含关联名称的 `touches` 属性即可：

```php
class Comment extends Model
{
    /**
     * 要触发的所有关联关系
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

现在，当你更新一个 `Comment` 时，对应父级 `Post` 模型的 `updated_at` 字段同时也会被更新：

```php
$comment = Comment::find(1);

$comment->text = '编辑此评论!';

$comment->save();
```

<a id="oc-deferred-binding"></a>
## 延迟绑定

延迟绑定允许您延迟绑定模型关联，直到主记录提交更改。如果您需要准备一些模型(例如文件上传)并将它们关联到另一个尚不存在的模型，这将特别有用。

您可以使用 **session key** 将任意数量的 **slave** 模型延迟保定到 **master** 模型。当主记录与会话键一起保存时，与从属记录的关联会自动为您更新。后端 [表单行为](../backend/form.md) 自动支持延迟绑定，但您可能希望在其他地方使用此功能。

### 生成会话密钥

延迟绑定需要会话密钥。您可以将会话密钥视为事务标识符。相同的会话密钥应该用于绑定/解除绑定关联和保存主模型。您可以使用 PHP `uniqid()` 函数生成会话密钥。请注意，[表单助手](../markup/function-form.md) 会自动生成一个包含会话密钥的隐藏字段。

```php
$sessionKey = uniqid('session_key', true);
```

### 延迟关联绑定

除非帖子被保存，否则下一个示例中的评论不会添加到帖子中。

```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```

> **注意**：`$post` 对象尚未保存，但如果保存，将创建关联。

### 推迟解除绑定的关系

除非保存帖子，否则不会删除下一个示例中的评论。

```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->remove($comment, $sessionKey);
```

### 列出所有绑定

使用关联的 `withDeferred` 方法加载所有记录，包括延迟的。 结果也将包括现有关系。

```php
$post->comments()->withDeferred($sessionKey)->get();
```

### 取消所有绑定

取消延迟绑定并删除从属对象而不是让它们成为无效对象是个好主意.

```php
$post->cancelDeferred($sessionKey);
```

### 提交所有绑定

您可以在保存主模型时提交(绑定或取消绑定)所有延迟绑定，方法是为`save`方法的第二个参数提供会话密钥。

```php
$post = new Post;
$post->title = "First blog post";
$post->save(null, $sessionKey);
```

同样的方法适用于模型的 `create` 方法：

```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

### 延迟提交绑定

如果您在保存时无法提供 `$sessionKey`，您可以随时使用以下代码提交绑定：

```php
$post->commitDeferred($sessionKey);
```

### 清理无效的绑定

销毁所有尚未提交且超过 1 天的绑定：

```php
October\Rain\Database\Models\DeferredBinding::cleanUp(1);
```

> **注意**：October CMS 会自动销毁超过 5 天的延迟绑定。 当后端用户登录系统时会触发。

### 禁用延迟绑定

有时您可能需要完全禁用给定模型的延迟绑定，例如，如果您从单独的数据库连接加载它。 您需要确保模型的 `sessionKey` 属性在内部保存方法中的 pre 和 post 延迟绑定钩子运行之前为 `null`。 为此，您可以绑定到模型的 `model.saveInternal` 事件。

```php
public function __construct()
{
    $result = parent::__construct(...func_get_args());

    $this->bindEvent('model.saveInternal', function () {
        $this->sessionKey = null;
    });

    return $result;
}
```

> **注意**：这将为您覆盖此应用的任何模型完全禁用延迟绑定。
