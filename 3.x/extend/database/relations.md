# Relationships

Database tables are often related to one another. For example, a blog post may have many comments, or an order could be related to the user who placed it. October makes managing and working with these relationships easy and supports several different types of relationships.

## Defining Relationships

Model relationships are defined as properties on your model classes. An example of defining relationships:

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ]
}
```

Relationships like models themselves, also serve as powerful [query builders](./query.md), accessing relationships as functions provides powerful method chaining and querying capabilities. For example:

```php
$user->posts()->where('is_active', true)->get();
```

Accessing a relationship as a property is also possible.

```php
$user->posts;
```

## Detailed Definitions

Each definition can be an array where the key is the relation name and the value is a detail array. The detail array's first value is always the related model class name and all other values are parameters that must have a key name.

```php
public $hasMany = [
    'posts' => [\Acme\Blog\Models\Post::class, 'delete' => true]
];
```

The following are parameters that can be used with all relations:

Argument | Description
------------- | -------------
**order** | sorting order for multiple records.
**conditions** | filters the relation using a raw where query statement.
**scope** | filters the relation using a supplied scope method.
**push** | if set to false, this relation will not be saved via the `push` method. Default: `true`
**delete** | if set to true, the related model will be deleted if the primary model is deleted or relationship is destroyed. Default: `false`
**replicate** | if set to true, the related model will duplicated or associated via the `replicate` method. Default: `false`.
**relationClass** | specify a custom class name for the related object.

Example filter using **order** and **conditions** parameters.

```php
public $belongsToMany = [
    'categories' => [
        \Acme\Blog\Models\Category::class,
        'order' => 'name desc',
        'conditions' => 'is_active = 1'
    ]
];
```

Example filter using the **scope** parameter.

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

The **scope** parameter can also refer to a static method.

```php
public $belongsToMany = [
    'categories' => [
        \Acme\Blog\Models\Category::class,
        'scope' => [self::class, 'myFilterMethod']
    ]
];

public static myFilterMethod($query, $related, $parent)
{
    // ...
}
```

Example implementation using the **relationClass** parameter.

```php
public $belongsToMany = [
    'users' => [
        \Backend\Models\User::class,
        'relationClass' => \Backend\Classes\MyBelongsToMany::class
    ]
];
```

::: tip
The `relationClass` should inherit the class of the specified type. For example, when using `belongsTo` the class must inherit `October\Rain\Database\Relations\BelongsTo`.
:::

## Relationship Types

The following relations types are available.

- [One To One](#relation-one-to-one)
- [One To Many](#relation-one-to-many)
- [Many To Many](#relation-many-to-many)
- [Has Many Through](#relation-has-many-through)
- [Has One Through](#relation-has-one-through)
- [Polymorphic Relations](#relation-polymorphic-relations)

<a id="relation-one-to-one"></a>
### One To One

A one-to-one relationship is a very basic relation. For example, a `User` model might be associated with one `Phone`. To define this relationship, we add a `phone` entry to the `$hasOne` property on the `User` model.

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

Once the relationship is defined, we may retrieve the related record using the model property of the same name. These properties are dynamic and allow you to access them as if they were regular attributes on the model.

```php
$phone = User::find(1)->phone;
```

The model assumes the foreign key of the relationship based on the model name. In this case, the `Phone` model is automatically assumed to have a `user_id` foreign key. If you wish to override this convention, you may pass the `key` parameter to the definition.

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id']
];
```

Additionally, the model assumes that the foreign key should have a value matching the `id` column of the parent. In other words, it will look for the value of the user's `id` column in the `user_id` column of the `Phone` record. If you would like the relationship to use a value other than `id`, you may pass the `otherKey` parameter to the definition:

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### Defining the Inverse Relation

Now that we can access the `Phone` model from our `User`. Let's do the opposite and define a relationship on the `Phone` model that will let us access the `User` that owns the phone. We can define the inverse of a `hasOne` relationship using the `$belongsTo` property:

```php
class Phone extends Model
{
    public $belongsTo = [
        'user' => \Acme\Blog\Models\User::class
    ];
}
```

In the example above, the model will try to match the `user_id` from the `Phone` model to an `id` on the `User` model. It determines the default foreign key name by examining the name of the relationship definition and suffixing the name with `_id`. However, if the foreign key on the `Phone` model is not `user_id`, you may pass a custom key name using the `key` parameter on the definition:

```php
public $belongsTo = [
    'user' => [Acme\Blog\Models\User::class, 'key' => 'my_user_id']
];
```

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass the `otherKey` parameter to the definition specifying your parent table's custom key:

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

#### Default Models

The `belongsTo` relationship lets you define a default model that will be returned if the given relationship is `null`. This pattern is often referred to as the [Null Object pattern](https://en.wikipedia.org/wiki/Null_Object_pattern) and can help remove conditional checks in your code. In the following example, the `user` relation will return an empty `Acme\Blog\Models\User` model if no `user` is attached to the post.

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'default' => true]
];
```

To populate the default model with attributes, you may pass an array to the `default` parameter.

```php
public $belongsTo = [
    'user' => [
        \Acme\Blog\Models\User::class,
        'default' => ['name' => 'Guest']
    ]
];
```

<a id="relation-one-to-many"></a>
### One To Many

A one-to-many relationship is used to define relationships where a single model owns any amount of other models. For example, a blog post may have an infinite number of comments. Like all other relationships, one-to-many relationships are defined adding an entry to the `$hasMany` property on your model:

```php
class Post extends Model
{
    public $hasMany = [
        'comments' => \Acme\Blog\Models\Comment::class
    ];
}
```

Remember, the model will automatically determine the proper foreign key column on the `Comment` model. By convention, it will take the "snake case" name of the owning model and suffix it with `_id`. So for this example, we can assume the foreign key on the `Comment` model is `post_id`.

Once the relationship has been defined, we can access the collection of comments by accessing the `comments` property. Remember, since the model provides "dynamic properties", we can access relationships as if they were defined as properties on the model:

```php
$comments = Post::find(1)->comments;

foreach ($comments as $comment) {
    //
}
```

Of course, since all relationships also serve as query builders, you can add further constraints to which comments are retrieved by calling the `comments` method and continuing to chain conditions onto the query:

```php
$comments = Post::find(1)->comments()->where('title', 'foo')->first();
```

Like the `hasOne` relation, you may also override the foreign and local keys by passing the `key` and `otherKey` parameters on the definition respectively:

```php
public $hasMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

#### Defining the Inverse Relation

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent post. To define the inverse of a `hasMany` relationship, define the `$belongsTo` property on the child model:

```php
class Comment extends Model
{
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

Once the relationship has been defined, we can retrieve the `Post` model for a `Comment` by accessing the `post` "dynamic property":

```php
$comment = Comment::find(1);

echo $comment->post->title;
```

In the example above, the model will try to match the `post_id` from the `Comment` model to an `id` on the `Post` model. It determines the default foreign key name by examining the name of the relationship  and suffixing it with `_id`. However, if the foreign key on the `Comment` model is not `post_id`, you may pass a custom key name using the `key` parameter:

```php
public $belongsTo = [
    'post' => [\Acme\Blog\Models\Post::class, 'key' => 'my_post_id']
];
```

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass the `otherKey` parameter to the definition specifying your parent table's custom key:

```php
public $belongsTo = [
    'post' => [Acme\Blog\Models\Post::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

<a id="relation-many-to-many"></a>
### Many To Many

Many-to-many relations are slightly more complicated than `hasOne` and `hasMany` relationships. An example of such a relationship is a user with many roles, where the roles are also shared by other users. For example, many users may have the role of "Admin". To define this relationship, three database tables are needed: `users`, `roles`, and `role_user`. The `role_user` table is derived from the alphabetical order of the related model names, and contains the `user_id` and `role_id` columns.

Below is an example that shows the [database table structure](./structure.md) used to create the join table.

```php
Schema::create('role_user', function($table)
{
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
    $table->primary(['user_id', 'role_id']);
});
```

Many-to-many relationships are defined adding an entry to the `$belongsToMany` property on your model class. For example, let's define the `roles` method on our `User` model:

```php
class User extends Model
{
    public $belongsToMany = [
        'roles' => \Acme\Blog\Models\Role::class
    ];
}
```

Once the relationship is defined, you may access the user's roles using the `roles` dynamic property:

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    //
}
```

Of course, like all other relationship types, you may call the `roles` method to continue chaining query constraints onto the relationship:

```php
$roles = User::find(1)->roles()->orderBy('name')->get();
```

As mentioned previously, to determine the table name of the relationship's joining table, the model will join the two related model names in alphabetical order. However, you are free to override this convention. You may do so by passing the `table` parameter to the `belongsToMany` definition:

```php
public $belongsToMany = [
    'roles' => [\Acme\Blog\Models\Role::class, 'table' => 'acme_blog_role_user']
];
```

In addition to customizing the name of the joining table, you may also customize the column names of the keys on the table by passing additional parameters to the `belongsToMany` definition. The `key` parameter is the foreign key name of the model on which you are defining the relationship, while the `otherKey` parameter is the foreign key name of the model that you are joining to:

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

#### Defining the Inverse Relation

To define the inverse of a many-to-many relationship, you simply place another `$belongsToMany` property on your related model. To continue our user roles example, let's define the `users` relationship on the `Role` model:

```php
class Role extends Model
{
    public $belongsToMany = [
        'users' => \Acme\Blog\Models\User::class
    ];
}
```

As you can see, the relationship is defined exactly the same as its `User` counterpart, with the exception of simply referencing the `Acme\Blog\Models\User` model. Since we're reusing the `$belongsToMany` property, all of the usual table and key customization options are available when defining the inverse of many-to-many relationships.

#### Retrieving Intermediate Table Columns

As you have already learned, working with many-to-many relations requires the presence of an intermediate join table. Models provide some very helpful ways of interacting with this table. For example, let's assume our `User` object has many `Role` objects that it is related to. After accessing this relationship, we may access the intermediate table using the `pivot` attribute on the models:

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    echo $role->pivot->created_at;
}
```

Notice that each `Role` model we retrieve is automatically assigned a `pivot` attribute. This attribute contains a model representing the intermediate table, and may be used like any other model.

By default, only the model keys will be present on the `pivot` object. If your pivot table contains extra attributes, you must specify them when defining the relationship:

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivot' => ['column1', 'column2']
    ]
];
```

If you want your pivot table to have automatically maintained `created_at` and `updated_at` timestamps, use the `timestamps` parameter on the relationship definition:

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'timestamps' => true
    ]
];
```

If you would like to define a custom model to represent the intermediate table of your relationship, you may use `pivotModel` attribute when defining the relationship. Custom many-to-many pivot models should extend the `October\Rain\Database\Pivot` class while custom polymorphic many-to-many pivot models should extend the `October\Rain\Database\MorphPivot` class.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class
    ]
];
```

These are the parameters supported for `belongsToMany` relations:

Argument | Description
------------- | -------------
**table** | the name of the join table.
**key** | the key column name of the defining model (inside pivot table). Default value is combined from model name and `_id` suffix, i.e. `user_id`
**parentKey** | the key column name of the defining model (inside defining model table). Default: id
**otherKey** | the key column name of the related model (inside pivot table). Default value is combined from model name and `_id` suffix, i.e. `role_id`
**relatedKey** | the key column name of the related model (inside related model table). Default: id
**timestamps** | if true, the join table should contain `created_at` and `updated_at` columns. Default: false
**detach** | if set to false, the related model will be not be detached if the primary model is deleted or relationship is destroyed, default: true.
**pivot** | an array of pivot columns found in the join table, attributes are available via `$model->pivot`.
**pivotModel** | specify a custom model class to return when accessing the pivot relation. Defaults to `October\Rain\Database\Pivot` while for polymorphic relation `October\Rain\Database\MorphPivot`.
**pivotSortable** | specify a sort order column for the pivot table, used in combination with the `SortableRelation` [model trait](../lists/structures.md).

<a id="relation-has-many-through"></a>
### Has Many Through

The has-many-through relationship provides a convenient short-cut for accessing distant relations via an intermediate relation. For example, a `Country` model might have many `Post` models through an intermediate `User` model. In this example, you could easily gather all blog posts for a given country. Let's look at the tables required to define this relationship:

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

Though `posts` does not contain a `country_id` column, the `hasManyThrough` relation provides access to a country's posts via `$country->posts`. To perform this query, the model inspects the `country_id` on the intermediate `users` table. After finding the matching user IDs, they are used to query the `posts` table.

Now that we have examined the table structure for the relationship, let's define it on the `Country` model:

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

The first argument passed to the `$hasManyThrough` relation is the name of the final model we wish to access, while the `through` parameter is the name of the intermediate model.

Typical foreign key conventions will be used when performing the relationship's queries. If you would like to customize the keys of the relationship, you may pass them as the `key`, `otherKey` and `throughKey` parameters to the `$hasManyThrough` definition. The `key` parameter is the name of the foreign key on the intermediate model, the `throughKey` parameter is the name of the foreign key on the final model, while the `otherKey` is the local key.

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
### Has One Through

The has-one-through relationship links models through a single intermediate relation. For example, if each supplier has one user, and each user is associated with one user history record, then the supplier model may access the user's history through the user. Let's look at the database tables necessary to define this relationship:

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

Though the `history` table does not contain a `supplier_id` column, the `hasOneThrough` relation can provide access to the user's history to the supplier model. Now that we have examined the table structure for the relationship, let's define it on the `Supplier` model:

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

The first array parameter passed to the `$hasOneThrough` property is the name of the final model we wish to access, while the `through` key is the name of the intermediate model.

Typical foreign key conventions will be used when performing the relationship's queries. If you would like to customize the keys of the relationship, you may pass them as the `key`, `otherKey` and `throughKey` parameters to the `$hasManyThrough` definition. The `key` parameter is the name of the foreign key on the intermediate model, the `throughKey` parameter is the name of the foreign key on the final model, while the `otherKey` is the local key.

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
## Polymorphic Relations

Polymorphic relations allow a model to belong to more than one other model on a single association.

### Polymorphic One To One

#### Table Structure

A one-to-one polymorphic relation is similar to a simple one-to-one relation; however, the target model can belong to more than one type of model on a single association. For example, imagine you want to store photos for your staff members and for your products. Using polymorphic relationships, you can use a single `photos` table for both of these scenarios. First, let's examine the table structure required to build this relationship:

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

Two important columns to note are the `imageable_id` and `imageable_type` columns on the `photos` table. The `imageable_id` column will contain the ID value of the owning staff or product, while the `imageable_type` column will contain the class name of the owning model. The `imageable_type` column is how the ORM determines which "type" of owning model to return when accessing the `imageable` relation.

#### Model Structure

Next, let's examine the model definitions needed to build this relationship:

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

#### Retrieving Polymorphic Relations

Once your database table and models are defined, you may access the relationships via your models. For example, to access the photo for a staff member, we can simply use the `photo` dynamic property:

```php
$staff = Staff::find(1);

$photo = $staff->photo
```

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the `morphTo` relationship. In our case, that is the `imageable` definition on the `Photo` model. So, we will access it as a dynamic property:

```php
$photo = Photo::find(1);

$imageable = $photo->imageable;
```

The `imageable` relation on the `Photo` model will return either a `Staff` or `Product` instance, depending on which type of model owns the photo.

### Polymorphic One To Many

#### Table Structure

A one-to-many polymorphic relation is similar to a simple one-to-many relation; however, the target model can belong to more than one type of model on a single association. For example, imagine users of your application can "comment" on both posts and videos. Using polymorphic relationships, you may use a single `comments` table for both of these scenarios. First, let's examine the table structure required to build this relationship:

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

#### Model Structure

Next, let's examine the model definitions needed to build this relationship:

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

#### Retrieving The Relationship

Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the comments for a post, we can use the `comments` dynamic property:

```php
$post = Author\Plugin\Models\Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the `morphTo` relationship. In our case, that is the `commentable` definition on the `Comment` model. So, we will access it as a dynamic property:

```php
$comment = Author\Plugin\Models\Comment::find(1);

$commentable = $comment->commentable;
```

The `commentable` relation on the `Comment` model will return either a `Post` or `Video` instance, depending on which type of model owns the comment.

You are also able to update the owner of the related model by setting the attribute with the name of the `morphTo` relationship, in this case `commentable`.

```php
$comment = Author\Plugin\Models\Comment::find(1);
$video = Author\Plugin\Models\Video::find(1);

$comment->commentable = $video;
$comment->save()
```

### Polymorphic Many To Many

#### Table structure

In addition to "one-to-one" and "one-to-many" relations, you may also define "many-to-many" polymorphic relations. For example, a blog `Post` and `Video` model could share a polymorphic relation to a `Tag` model. Using a many-to-many polymorphic relation allows you to have a single list of unique tags that are shared across blog posts and videos. First, let's examine the table structure:

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

#### Model structure

Next, we're ready to define the relationships on the model. The `Post` and `Video` models will both have a `tags` relation defined in the `$morphToMany` property on the base model class:

```php
class Post extends Model
{
    public $morphToMany = [
        'tags' => [\Acme\Blog\Models\Tag::class, 'name' => 'taggable']
    ];
}
```

#### Defining the Inverse Relation

Next, on the `Tag` model, you should define a relation for each of its related models. So, for this example, we will define a `posts` relation and a `videos` relation:

```php
class Tag extends Model
{
    public $morphedByMany = [
        'posts'  => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
        'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
    ];
}
```

#### Retrieving the Relationship

Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the tags for a post, you can simply use the `tags` dynamic property:

```php
$post = Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the relationship defined in the `$morphedByMany` property. In our case, that is the `posts` or `videos` methods on the `Tag` model. So, you will access those relations as dynamic properties:

```php
$tag = Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

#### Custom Polymorphic Types

By default, the fully qualified class name is used to store the related model type. For instance, given the example above where a `Photo` may belong to `Staff` or a `Product`, the default `imageable_type` value is either `Acme\Blog\Models\Staff` or `Acme\Blog\Models\Product` respectively.

Using a custom polymorphic type lets you decouple your database from your application's internal structure. You may define a relationship "morph map" to provide a custom name for each model instead of the class name:

```php
use October\Rain\Database\Relations\Relation;

Relation::morphMap([
    'staff' => \Acme\Blog\Models\Staff::class,
    'product' => \Acme\Blog\Models\Product::class,
]);
```

The most common place to register the `morphMap` in the `boot` method of a [plugin registration file](../extending.md).

<a id="oc-querying-relations"></a>
## Querying Relations

Since all types of Model relationships can be called via functions, you may call those functions to obtain an instance of the relationship without actually executing the relationship queries. In addition, all types of relationships also serve as [query builders](./query.md), allowing you to continue to chain constraints onto the relationship query before finally executing the SQL against your database.

For example, imagine a blog system in which a `User` model has many associated `Post` models:

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ];
}
```

### Access via Relationship Method

You may query the **posts** relationship and add additional constraints to the relationship using the `posts` method. This gives you the ability to chain any of the [query builder](./query.md) methods on the relationship.

```php
$user = User::find(1);

$posts = $user->posts()->where('is_active', 1)->get();

$post = $user->posts()->first();
```

### Access via Dynamic Property

If you do not need to add additional constraints to a relationship query, you may simply access the relationship as if it were a property. For example, continuing to use our `User` and `Post` example models, we may access all of a user's posts using the `$user->posts` property instead.

```php
$user = User::find(1);

foreach ($user->posts as $post) {
    // ...
}
```

Dynamic properties are "lazy loading", meaning they will only load their relationship data when you actually access them. Because of this, developers often use eager loading (see below) to preload relationships they know will be accessed after loading the model. Eager loading provides a significant reduction in SQL queries that must be executed to load a model's relations.

### Querying Relationship Existence

When accessing the records for a model, you may wish to limit your results based on the existence of a relationship. For example, imagine you want to retrieve all blog posts that have at least one comment. To do so, you may pass the name of the relationship to the `has` method:

```php
// Retrieve all posts that have at least one comment...
$posts = Post::has('comments')->get();
```

You may also specify an operator and count to further customize the query:

```php
// Retrieve all posts that have three or more comments...
$posts = Post::has('comments', '>=', 3)->get();
```

Nested `has` statements may also be constructed using "dot" notation. For example, you may retrieve all posts that have at least one comment and vote:

```php
// Retrieve all posts that have at least one comment with votes...
$posts = Post::has('comments.votes')->get();
```

If you need even more power, you may use the `whereHas` and `orWhereHas` methods to put "where" conditions on your `has` queries. These methods allow you to add customized constraints to a relationship constraint, such as checking the content of a comment:

```php
// Retrieve all posts with at least one comment containing words like foo%
$posts = Post::whereHas('comments', function ($query) {
    $query->where('content', 'like', 'foo%');
})->get();
```

#### Inline Relationship Existence Queries

To query a relationship's existence with a single condition to a relationship query, it is more convenient to use the `whereRelation`, `orWhereRelation`, `whereMorphRelation` or `orWhereMorphRelation` methods.

```php
$posts = Post::whereRelation('comments', 'is_approved', false)->get();
```

The `searchWhereRelation` or `orSearchWhereRelation` methods are available for searching relation columns. Similar to [search queries](./query.md), the method will add to the query using the search term (first argument), the relationship name (second argument) and search columns (third argument) using a case insensitive LIKE query.

```php
$posts = Post::searchWhereRelation('foo bar', 'author', ['name', 'bio'])->get();
```

#### Querying Relationship Absence

You may pass the name of the relationship to the `doesntHave` and `orDoesntHave` methods to limit your results based on the absence of a relationship.

```php
$posts = Post::doesntHave('comments')->get();
```

The `whereDoesntHave` and `orWhereDoesntHave` methods can add extra query constraints to your `doesntHave` queries.

```php
$posts = Post::whereDoesntHave('comments', function ($query) {
    $query->where('content', 'like', 'code%');
})->get();
```

### Counting Related Records

In some scenarios you may want to count the number of related records found in a given relationship definition. The `withCount` method can be used to include a `{relation}_count` column with the selected models.

```php
$users = User::withCount('roles')->get();

foreach ($users as $user) {
    echo $user->roles_count;
}
```

The `withCount` method supports multiple relations along with additional query constraints.

```php
$posts = Post::withCount(['votes', 'comments' => function ($query) {
    $query->where('content', 'like', 'foo%');
}])->get();

echo $posts[0]->votes_count;
echo $posts[0]->comments_count;
```

You may lazy load the count column with the `loadCount` method.

```php
$user = User::first();
$user->loadCount('roles');
```

Additional query constraints are also supported.

```php
$user->loadCount(['roles' => function ($query) {
    $query->where('clearance', '>', 5);
}])
```

## Eager Loading

When accessing relationships as properties, the relationship data is "lazy loaded". This means the relationship data is not actually loaded until you first access the property. However, models can "eager load" relationships at the time you query the parent model. Eager loading alleviates the N + 1 query problem. To illustrate the N + 1 query problem, consider a `Book` model that is related to `Author`.

```php
class Book extends Model
{
    public $belongsTo = [
        'author' => \Acme\Blog\Models\Author::class
    ];
}
```

Now let's retrieve all books and their authors:

```php
$books = Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```

This loop will execute 1 query to retrieve all of the books on the table, then another query for each book to retrieve the author. So, if we have 25 books, this loop would run 26 queries: 1 for the original book, and 25 additional queries to retrieve the author of each book.

Thankfully we can use eager loading to reduce this operation to just 2 queries. When querying, you may specify which relationships should be eager loaded using the `with` method:

```php
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```

For this operation only two queries will be executed:

```sql
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```

#### Eager Loading Multiple Relationships

Sometimes you may need to eager load several different relationships in a single operation. To do so, just pass additional arguments to the `with` method:

```php
$books = Book::with('author', 'publisher')->get();
```

#### Nested Eager Loading

To eager load nested relationships, you may use "dot" syntax. For example, let's eager load all of the book's authors and all of the author's personal contacts in one statement:

```php
$books = Book::with('author.contacts')->get();
```

### Constraining Eager Loads

Sometimes you may wish to eager load a relationship, but also specify additional query constraints for the eager loading query. Here's an example:

```php
$users = User::with([
    'posts' => function ($query) {
        $query->where('title', 'like', '%first%');
    }
])->get();
```

In this example, the model will only eager load posts if the post's `title` column contains the word `first`. Of course, you may call other [query builder](./query.md) methods to further customize the eager loading operation:

```php
$users = User::with([
    'posts' => function ($query) {
        $query->orderBy('created_at', 'desc');
    }
])->get();
```

### Lazy Eager Loading

Sometimes you may need to eager load a relationship after the parent model has already been retrieved. For example, this may be useful if you need to dynamically decide whether to load related models:

```php
$books = Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

If you need to set additional query constraints on the eager loading query, you may pass a `Closure` to the `load` method:

```php
$books->load([
    'author' => function ($query) {
        $query->orderBy('published_date', 'asc');
    }
]);
```

## Inserting Related Models

Just like you would query a relationship, October CMS supports defining a relationship using a method or dynamic property approach. For example, perhaps you need to insert a new `Comment` for a `Post` model. Instead of manually setting the `post_id` attribute on the `Comment`, you may insert the `Comment` directly from the relationship.

### Insert via Relationship Method

October provides convenient methods for adding new models to relationships. Primarily models can be added to a relationship or removed from a relationship. In each case the relationship is associated or disassociated respectively.

#### Add Method

Use the `add` method to associate a new relationship.

```php
$comment = new Comment(['message' => 'A new comment.']);

$post = Post::find(1);

$comment = $post->comments()->add($comment);
```

Notice that we did not access the `comments` relationship as a dynamic property. Instead, we called the `comments` method to obtain an instance of the relationship. The `add` method will automatically add the appropriate `post_id` value to the new `Comment` model.

If you need to save multiple related models, you may use the `addMany` method:

```php
$post = Post::find(1);

$post->comments()->addMany([
    new Comment(['message' => 'A new comment.']),
    new Comment(['message' => 'Another comment.']),
]);
```

#### Remove Method

Comparatively, the `remove` method can be used to disassociate a relationship, making it an orphaned record.

```php
$post->comments()->remove($comment);
```

In the case of many-to-many relations, the record is removed from the relationship's collection instead.

```php
$post->categories()->remove($category);
```

In the case of a "belongs to" relationship, you may use the `dissociate` method, which doesn't require the related model passed to it.

```php
$post->author()->dissociate();
```

#### Adding with Pivot Data

When working with a many-to-many relationship, the `add` method accepts an array of additional intermediate "pivot" table attributes as its second argument as an array.

```php
$user = User::find(1);

$pivotData = ['expires' => $expires];

$user->roles()->add($role, $pivotData);
```

The second argument of the `add` method can also specify the session key used by deferred binding when passed as a string. In these cases the pivot data can be provided as the third argument instead.

```php
$user->roles()->add($role, $sessionKey, $pivotData);
```

#### Create Method

While `add` and `addMany` accept a full model instance, you may also use the `create` method, that accepts a PHP array of attributes, creates a model, and inserts it into the database.

```php
$post = Post::find(1);

$comment = $post->comments()->create([
    'message' => 'A new comment.',
]);
```

Before using the `create` method, be sure to review the documentation on attribute [mass assignment](./model.md) as the attributes in the PHP array are restricted by the model's "fillable" definition.

### Insert via Dynamic Property

Relationships can be set directly via their properties in the same way you would access them. Setting a relationship using this approach will overwrite any relationship that existed previously. The model should be saved afterwards like you would with any attribute.

```php
$post->author = $author;

$post->comments = [$comment1, $comment2];

$post->save();
```

Alternatively you may set the relationship using the primary key, this is useful when working with HTML forms.

```php
// Assign to author with ID of 3
$post->author = 3;

// Assign comments with IDs of 1, 2 and 3
$post->comments = [1, 2, 3];

$post->save();
```

Relationships can be disassociated by assigning the NULL value to the property.

```php
$post->author = null;

$post->comments = null;

$post->save();
```

Similar to deferred binding, relationships defined on non-existent models are deferred in memory until they are saved. In this example the post does not exist yet, so the `post_id` attribute cannot be set on the comment via `$post->comments`. Therefore the association is deferred until the post is created by calling the `save` method.

```php
$comment = Comment::find(1);

$post = new Post;

$post->comments = [$comment];

$post->save();
```

### Many To Many Relations

#### Attaching / Detaching

When working with many-to-many relationships, Models provide a few additional helper methods to make working with related models more convenient. For example, let's imagine a user can have many roles and a role can have many users. To attach a role to a user by inserting a record in the intermediate table that joins the models, use the `attach` method:

```php
$user = User::find(1);

$user->roles()->attach($roleId);
```

When attaching a relationship to a model, you may also pass an array of additional data to be inserted into the intermediate table:

```php
$user->roles()->attach($roleId, ['expires' => $expires]);
```

Of course, sometimes it may be necessary to remove a role from a user. To remove a many-to-many relationship record, use the `detach` method. The `detach` method will remove the appropriate record out of the intermediate table; however, both models will remain in the database:

```php
// Detach a single role from the user...
$user->roles()->detach($roleId);

// Detach all roles from the user...
$user->roles()->detach();
```

For convenience, `attach` and `detach` also accept arrays of IDs as input:

```php
$user = User::find(1);

$user->roles()->detach([1, 2, 3]);

$user->roles()->attach([1 => ['expires' => $expires], 2, 3]);
```

#### Syncing For convenience

You may also use the `sync` method to construct many-to-many associations. The `sync` method accepts an array of IDs to place on the intermediate table. Any IDs that are not in the given array will be removed from the intermediate table. So, after this operation is complete, only the IDs in the array will exist in the intermediate table:

```php
$user->roles()->sync([1, 2, 3]);
```

You may also pass additional intermediate table values with the IDs:

```php
$user->roles()->sync([1 => ['expires' => true], 2, 3]);
```

### Touching Parent Timestamps

When a model `belongsTo` or `belongsToMany` another model, such as a `Comment` which belongs to a `Post`, it is sometimes helpful to update the parent's timestamp when the child model is updated. For example, when a `Comment` model is updated, you may want to automatically "touch" the `updated_at` timestamp of the owning `Post`. Just add a `touches` property containing the names of the relationships to the child model:

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

Now, when you update a `Comment`, the owning `Post` will have its `updated_at` column updated as well:

```php
$comment = Comment::find(1);

$comment->text = 'Edit to this comment!';

$comment->save();
```

## Deferred Binding

Deferred bindings allows you to postpone model relationships binding until the master record commits the changes. This is particularly useful if you need to prepare some models (such as file uploads) and associate them to another model that doesn't exist yet.

You can defer any number of **slave** models against a **master** model using a **session key**. When the master record is saved along with the session key, the relationships to slave records are updated automatically for you. Deferred bindings are supported in the back-end [Form behavior](../backend/form.md) automatically, but you may want to use this feature in other places.

### Generating a Session Key

The session key is required for deferred bindings. You can think of a session key as of a transaction identifier. The same session key should be used for binding/unbinding relationships and saving the master model. You can generate the session key with PHP `uniqid()` function. Note that the [form helper](../../markup/function/form.md) generates a hidden field containing the session key automatically.

```php
$sessionKey = uniqid('session_key', true);
```

### Defer a Relation Binding

The comment in the next example will not be added to the post unless the post is saved.

```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```

::: tip
The `$post` object has not been saved but the relationship will be created if the saving happens.
:::

### Defer a Relation Unbinding

The comment in the next example will not be deleted unless the post is saved.

```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->remove($comment, $sessionKey);
```

### List All Bindings

Use the `withDeferred` method of a relation to load all records, including deferred. The results will include existing relations as well.

```php
$post->comments()->withDeferred($sessionKey)->get();
```

### Cancel All Bindings

It's a good idea to cancel deferred binding and delete the slave objects rather than leaving them as orphans.

```php
$post->cancelDeferred($sessionKey);
```

### Commit All Bindings

You can commit (bind or unbind) all deferred bindings when you save the master model by providing the session key with the second argument of the `save` method.

```php
$post = new Post;
$post->title = "First blog post";
$post->save(null, $sessionKey);
```

The same approach works with the model's `create` method:

```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

### Lazily Commit Bindings

If you are unable to supply the `$sessionKey` when saving, you can commit the bindings at any time using the the next code:

```php
$post->commitDeferred($sessionKey);
```

### Clean Up Orphaned Bindings

Destroys all bindings that have not been committed and are older than 1 day:

```php
October\Rain\Database\Models\DeferredBinding::cleanUp(1);
```

::: tip
October CMS automatically destroys deferred bindings that are older than 5 days using garbage collection.
:::

### Disable Deferred Binding

Sometimes you might need to disable deferred binding entirely for a given model, for instance if you are loading it from a separate database connection. In order to do that, you need to make sure that the model's `sessionKey` property is `null` before the pre and post deferred binding hooks in the internal save method are run. To do that, you can bind to the model's `model.saveInternal` event.

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

::: tip
This will disable deferred binding entirely for any model's you apply this override to.
:::

