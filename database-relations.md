# Database Relationships

- [Introduction](#introduction)
- [Defining relationships](#defining-relationships)
    - [Detailed definitions](#detailed-relationships)
- [Relationship types](#relationship-types)
    - [One To One](#one-to-one)
    - [One To Many](#one-to-many)
    - [Many To Many](#many-to-many)
    - [Has Many Through](#has-many-through)
    - [Polymorphic relations](#polymorphic-relations)
    - [Many To Many Polymorphic relations](#many-to-many-polymorphic-relations)
- [Querying relations](#querying-relations)
    - [Access via relationship method](#querying-method)
    - [Access via dynamic property](#querying-dynamic-property)
    - [Querying relationship existence](#querying-existence)
- [Eager loading](#eager-loading)
    - [Constraining eager loads](#constraining-eager-loads)
    - [Lazy eager loading](#lazy-eager-loading)
- [Inserting related models](#inserting-related-models)
    - [Insert via relationship method](#inserting-method)
    - [Insert via dynamic property](#inserting-dynamic-property)
    - [Many To Many relations](#inserting-many-to-many-relations)
    - [Touching parent timestamps](#touching-parent-timestamps)
- [Deferred binding](#deferred-binding)

<a name="introduction"></a>
## Introduction

Database tables are often related to one another. For example, a blog post may have many comments, or an order could be related to the user who placed it. October makes managing and working with these relationships easy and supports several different types of relationships.

<a name="defining-relationships"></a>
## Defining relationships

Model relationships are defined as properties on your model classes. An example of defining relationships:

    class User extends Model
    {
        public $hasMany = [
            'posts' => 'Acme\Blog\Models\Post'
        ]
    }

Relationships like models themselves, also serve as powerful [query builders](query), accessing relationships as functions provides powerful method chaining and querying capabilities. For example:

    $user->posts()->where('is_active', true)->get();

Accessing a relationship as a property is also possible:

    $user->posts;

<a name="detailed-relationships"></a>
### Detailed definitions

Each definition can be an array where the key is the relation name and the value is a detail array. The detail array's first value is always the related model class name and all other values are parameters that must have a key name.

    public $hasMany = [
        'posts' => ['Acme\Blog\Models\Post', 'delete' => true]
    ];

The following are parameters that can be used with all relations:

Argument | Description
------------- | -------------
**order** | sorting order for multiple records.
**conditions** | filters the relation using a raw where query statement.
**scope** | filters the relation using a supplied scope method.
**push** | if set to false, this relation will not be saved via `push()`, default: true.
**delete** | if set to true, the related model will be deleted if the primary model is deleted or relationship is destroyed, default: false.
**count** | if set to true, the result contains a `count` column only, used for counting relations, default: false.

Example filter using **order** and **conditions**:

    public $belongsToMany = [
        'categories' => [
            'Acme\Blog\Models\Category',
            'order'      => 'name desc',
            'conditions' => 'is_active = 1'
        ]
    ];

Example filter using **scope**:

    class Post extends Model
    {
        public $belongsToMany = [
            'categories' => [
                'Acme\Blog\Models\Category',
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

Example filter using **count**:

    public $belongsToMany = [
        'users' => ['Backend\Models\User'],
        'users_count' => ['Backend\Models\User', 'count' => true]
    ];

<a name="relationship-types"></a>
## Relationship types

The following relations types are available:

- [One To One](#one-to-one)
- [One To Many](#one-to-many)
- [Many To Many](#many-to-many)
- [Has Many Through](#has-many-through)
- [Polymorphic relations](#polymorphic-relations)
- [Many To Many Polymorphic relations](#many-to-many-polymorphic-relations)

<a name="one-to-one"></a>
### One To One

A one-to-one relationship is a very basic relation. For example, a `User` model might be associated with one `Phone`. To define this relationship, we add a `phone` entry to the `$hasOne` property on the `User` model.

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        public $hasOne = [
            'phone' => 'Acme\Blog\Models\Phone'
        ];
    }

Once the relationship is defined, we may retrieve the related record using the model property of the same name. These properties are dynamic and allow you to access them as if they were regular attributes on the model:

    $phone = User::find(1)->phone;

The model assumes the foreign key of the relationship based on the model name. In this case, the `Phone` model is automatically assumed to have a `user_id` foreign key. If you wish to override this convention, you may pass the `key` parameter to the definition:

    public $hasOne = [
        'phone' => ['Acme\Blog\Models\Phone', 'key' => 'my_user_id']
    ];

Additionally, the model assumes that the foreign key should have a value matching the `id` column of the parent. In other words, it will look for the value of the user's `id` column in the `user_id` column of the `Phone` record. If you would like the relationship to use a value other than `id`, you may pass the `otherKey` parameter to the definition:

    public $hasOne = [
        'phone' => ['Acme\Blog\Models\Phone', 'key' => 'my_user_id', 'otherKey' => 'my_id']
    ];

#### Defining the inverse of the relation

Now that we can access the `Phone` model from our `User`. Let's do the opposite and define a relationship on the `Phone` model that will let us access the `User` that owns the phone. We can define the inverse of a `hasOne` relationship using the `$belongsTo` property:

    class Phone extends Model
    {
        public $belongsTo = [
            'user' => 'Acme\Blog\Models\User'
        ];
    }

In the example above, the model will try to match the `user_id` from the `Phone` model to an `id` on the `User` model. It determines the default foreign key name by examining the name of the relationship definition and suffixing the name with `_id`. However, if the foreign key on the `Phone` model is not `user_id`, you may pass a custom key name using the `key` parameter on the definition:

    public $belongsTo = [
        'user' => ['Acme\Blog\Models\User', 'key' => 'my_user_id']
    ];

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass the `otherKey` parameter to the definition specifying your parent table's custom key:

    public $belongsTo = [
        'user' => ['Acme\Blog\Models\User', 'key' => 'my_user_id', 'otherKey' => 'my_id']
    ];

<a name="one-to-many"></a>
### One To Many

A one-to-many relationship is used to define relationships where a single model owns any amount of other models. For example, a blog post may have an infinite number of comments. Like all other relationships, one-to-many relationships are defined adding an entry to the `$hasMany` property on your model:

    class Post extends Model
    {
        public $hasMany = [
            'comments' => 'Acme\Blog\Models\Comment'
        ];
    }

Remember, the model will automatically determine the proper foreign key column on the `Comment` model. By convention, it will take the "snake case" name of the owning model and suffix it with `_id`. So for this example, we can assume the foreign key on the `Comment` model is `post_id`.

Once the relationship has been defined, we can access the collection of comments by accessing the `comments` property. Remember, since the model provides "dynamic properties", we can access relationships as if they were defined as properties on the model:

    $comments = Post::find(1)->comments;

    foreach ($comments as $comment) {
        //
    }

Of course, since all relationships also serve as query builders, you can add further constraints to which comments are retrieved by calling the `comments` method and continuing to chain conditions onto the query:

    $comments = Post::find(1)->comments()->where('title', 'foo')->first();

Like the `hasOne` relation, you may also override the foreign and local keys by passing the `key` and `otherKey` parameters on the definition respectively:

    public $hasMany = [
        'comments' => ['Acme\Blog\Models\Comment', 'key' => 'my_post_id', 'otherKey' => 'my_id']
    ];

#### Defining the inverse of the relation

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent post. To define the inverse of a `hasMany` relationship, define the `$belongsTo` property on the child model:

    class Comment extends Model
    {
        public $belongsTo = [
            'post' => 'Acme\Blog\Models\Post'
        ];
    }

Once the relationship has been defined, we can retrieve the `Post` model for a `Comment` by accessing the `post` "dynamic property":

    $comment = Comment::find(1);

    echo $comment->post->title;

In the example above, the model will try to match the `post_id` from the `Comment` model to an `id` on the `Post` model. It determines the default foreign key name by examining the name of the relationship  and suffixing it with `_id`. However, if the foreign key on the `Comment` model is not `post_id`, you may pass a custom key name using the `key` parameter:

    public $belongsTo = [
        'post' => ['Acme\Blog\Models\Post', 'key' => 'my_post_id']
    ];

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass the `otherKey` parameter to the definition specifying your parent table's custom key:

    public $belongsTo = [
        'post' => ['Acme\Blog\Models\Post', 'key' => 'my_post_id', 'otherKey' => 'my_id']
    ];

<a name="many-to-many"></a>
### Many To Many

Many-to-many relations are slightly more complicated than `hasOne` and `hasMany` relationships. An example of such a relationship is a user with many roles, where the roles are also shared by other users. For example, many users may have the role of "Admin". To define this relationship, three database tables are needed: `users`, `roles`, and `role_user`. The `role_user` table is derived from the alphabetical order of the related model names, and contains the `user_id` and `role_id` columns.

Below is an example that shows the [database table structure](../plugin/updates#migration-files) used to create the join table.

    Schema::create('role_user', function($table)
    {
        $table->integer('user_id')->unsigned();
        $table->integer('role_id')->unsigned();
        $table->primary(['user_id', 'role_id']);
    });

Many-to-many relationships are defined adding an entry to the `$belongsToMany` property on your model class. For example, let's define the `roles` method on our `User` model:

    class User extends Model
    {
        public $belongsToMany = [
            'roles' => 'Acme\Blog\Models\Role'
        ];
    }

Once the relationship is defined, you may access the user's roles using the `roles` dynamic property:

    $user = User::find(1);

    foreach ($user->roles as $role) {
        //
    }

Of course, like all other relationship types, you may call the `roles` method to continue chaining query constraints onto the relationship:

    $roles = User::find(1)->roles()->orderBy('name')->get();

As mentioned previously, to determine the table name of the relationship's joining table, the model will join the two related model names in alphabetical order. However, you are free to override this convention. You may do so by passing the `table` parameter to the `belongsToMany` definition:

    public $belongsToMany = [
        'roles' => ['Acme\Blog\Models\Role', 'table' => 'acme_blog_role_user']
    ];

In addition to customizing the name of the joining table, you may also customize the column names of the keys on the table by passing additional parameters to the `belongsToMany` definition. The `key` parameter is the foreign key name of the model on which you are defining the relationship, while the `otherKey` parameter is the foreign key name of the model that you are joining to:

    public $belongsToMany = [
        'roles' => [
            'Acme\Blog\Models\Role',
            'table'    => 'acme_blog_role_user',
            'key'      => 'my_user_id',
            'otherKey' => 'my_role_id'
        ]
    ];

#### Defining the inverse of the relationship

To define the inverse of a many-to-many relationship, you simply place another `$belongsToMany` property on your related model. To continue our user roles example, let's define the `users` relationship on the `Role` model:

    class Role extends Model
    {
        public $belongsToMany = [
            'users' => 'Acme\Blog\Models\User'
        ];
    }

As you can see, the relationship is defined exactly the same as its `User` counterpart, with the exception of simply referencing the `Acme\Blog\Models\User` model. Since we're reusing the `$belongsToMany` property, all of the usual table and key customization options are available when defining the inverse of many-to-many relationships.

#### Retrieving intermediate table columns

As you have already learned, working with many-to-many relations requires the presence of an intermediate join table. Models provide some very helpful ways of interacting with this table. For example, let's assume our `User` object has many `Role` objects that it is related to. After accessing this relationship, we may access the intermediate table using the `pivot` attribute on the models:

    $user = User::find(1);

    foreach ($user->roles as $role) {
        echo $role->pivot->created_at;
    }

Notice that each `Role` model we retrieve is automatically assigned a `pivot` attribute. This attribute contains a model representing the intermediate table, and may be used like any other model.

By default, only the model keys will be present on the `pivot` object. If your pivot table contains extra attributes, you must specify them when defining the relationship:

    public $belongsToMany = [
        'roles' => [
            'Acme\Blog\Models\Role',
            'pivot' => ['column1', 'column2']
        ]
    ];

If you want your pivot table to have automatically maintained `created_at` and `updated_at` timestamps, use the `timestamps` parameter on the relationship definition:

    public $belongsToMany = [
        'roles' => ['Acme\Blog\Models\Role', 'timestamps' => true]
    ];

These are the parameters supported for `belongsToMany` relations:

Argument | Description
------------- | -------------
**table** | the name of the join table.
**key** | the key column name of the defining model.
**otherKey** | the key column name of the related model.
**pivot** | an array of pivot columns found in the join table, attributes are available via `$model->pivot`.
**pivotModel** | specify a custom model class to return when accessing the pivot relation. Defaults to `October\Rain\Database\Pivot`.
**timestamps** | if true, the join table should contain `created_at` and `updated_at` columns. Default: false

<a name="has-many-through"></a>
### Has Many Through

The has-many-through relationship provides a convenient short-cut for accessing distant relations via an intermediate relation. For example, a `Country` model might have many `Post` models through an intermediate `User` model. In this example, you could easily gather all blog posts for a given country. Let's look at the tables required to define this relationship:

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

Though `posts` does not contain a `country_id` column, the `hasManyThrough` relation provides access to a country's posts via `$country->posts`. To perform this query, the model inspects the `country_id` on the intermediate `users` table. After finding the matching user IDs, they are used to query the `posts` table.

Now that we have examined the table structure for the relationship, let's define it on the `Country` model:

    class Country extends Model
    {
        public $hasManyThrough = [
            'posts' => [
                'Acme\Blog\Models\Post',
                'through' => 'Acme\Blog\Models\User'
            ],
        ];
    }

The first argument passed to the `$hasManyThrough` relation is the name of the final model we wish to access, while the `through` parameter is the name of the intermediate model.

Typical foreign key conventions will be used when performing the relationship's queries. If you would like to customize the keys of the relationship, you may pass them as the `key` and `throughKey` parameters to the `$hasManyThrough` definition. The `key` parameter is the name of the foreign key on the intermediate model, while the `throughKey` parameter is the name of the foreign key on the final model.

    public $hasManyThrough = [
        'posts' => [
            'Acme\Blog\Models\Post',
            'key'        => 'my_country_id',
            'through'    => 'Acme\Blog\Models\User',
            'throughKey' => 'my_user_id'
        ],
    ];

<a name="polymorphic-relations"></a>
### Polymorphic relations

#### Table structure

Polymorphic relations allow a model to belong to more than one other model on a single association. For example, imagine you want to store photos for your staff members and for your products. Using polymorphic relationships, you can use a single `photos` table for both of these scenarios. First, let's examine the table structure required to build this relationship:

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

Two important columns to note are the `imageable_id` and `imageable_type` columns on the `photos` table. The `imageable_id` column will contain the ID value of the owning staff or product, while the `imageable_type` column will contain the class name of the owning model. The `imageable_type` column is how the ORM determines which "type" of owning model to return when accessing the `imageable` relation.

#### Model structure

Next, let's examine the model definitions needed to build this relationship:

    class Photo extends Model
    {
        public $morphTo = [
            'imageable' => []
        ];
    }

    class Staff extends Model
    {
        public $morphMany = [
            'photos' => ['Acme\Blog\Models\Photo', 'name' => 'imageable']
        ];
    }

    class Product extends Model
    {
        public $morphMany = [
            'photos' => ['Acme\Blog\Models\Photo', 'name' => 'imageable']
        ];
    }

#### Retrieving Polymorphic relations

Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the photos for a staff member, we can simply use the `photos` dynamic property:

    $staff = Staff::find(1);

    foreach ($staff->photos as $photo) {
        //
    }

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the `morphTo` relationship. In our case, that is the `imageable` definition on the `Photo` model. So, we will access it as a dynamic property:

    $photo = Photo::find(1);

    $imageable = $photo->imageable;

The `imageable` relation on the `Photo` model will return either a `Staff` or `Product` instance, depending on which type of model owns the photo.

<a name="many-to-many-polymorphic-relations"></a>
### Many To Many Polymorphic relations

#### Table structure

In addition to traditional polymorphic relations, you may also define "many-to-many" polymorphic relations. For example, a blog `Post` and `Video` model could share a polymorphic relation to a `Tag` model. Using a many-to-many polymorphic relation allows you to have a single list of unique tags that are shared across blog posts and videos. First, let's examine the table structure:

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

#### Model structure

Next, we're ready to define the relationships on the model. The `Post` and `Video` models will both have a `tags` relation defined in the `$morphToMany` property on the base model class:

    class Post extends Model
    {
        public $morphToMany = [
            'tags' => ['Acme\Blog\Models\Tag', 'name' => 'taggable']
        ];
    }

#### Defining the inverse of the relationship

Next, on the `Tag` model, you should define a relation for each of its related models. So, for this example, we will define a `posts` relation and a `videos` relation:

    class Tag extends Model
    {
        public $morphedByMany = [
            'posts'  => ['Acme\Blog\Models\Post', 'name' => 'taggable'],
            'videos' => ['Acme\Blog\Models\Video', 'name' => 'taggable']
        ];
    }

#### Retrieving the relationship

Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the tags for a post, you can simply use the `tags` dynamic property:

    $post = Post::find(1);

    foreach ($post->tags as $tag) {
        //
    }

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the relationship defined in the `$morphedByMany` property. In our case, that is the `posts` or `videos` methods on the `Tag` model. So, you will access those relations as dynamic properties:

    $tag = Tag::find(1);

    foreach ($tag->videos as $video) {
        //
    }

<a name="querying-relations"></a>
## Querying relations

Since all types of Model relationships can be called via functions, you may call those functions to obtain an instance of the relationship without actually executing the relationship queries. In addition, all types of relationships also serve as [query builders](query), allowing you to continue to chain constraints onto the relationship query before finally executing the SQL against your database.

For example, imagine a blog system in which a `User` model has many associated `Post` models:

    class User extends Model
    {
        public $hasMany = [
            'posts' => ['Acme\Blog\Models\Post']
        ];
    }

<a name="querying-method"></a>
### Access via relationship method

You may query the **posts** relationship and add additional constraints to the relationship using the `posts()` method. This gives you the ability to chain any of the [query builder](query) methods on the relationship.

    $user = User::find(1);

    $posts = $user->posts()->where('is_active', 1)->get();

    $post = $user->posts()->first();

<a name="querying-dynamic-property"></a>
### Access via dynamic property

If you do not need to add additional constraints to a relationship query, you may simply access the relationship as if it were a property. For example, continuing to use our `User` and `Post` example models, we may access all of a user's posts using the `$user->posts` property instead.

    $user = User::find(1);

    foreach ($user->posts as $post) {
        // ...
    }

Dynamic properties are "lazy loading", meaning they will only load their relationship data when you actually access them. Because of this, developers often use [eager loading](#eager-loading) to pre-load relationships they know will be accessed after loading the model. Eager loading provides a significant reduction in SQL queries that must be executed to load a model's relations.

<a name="querying-existence"></a>
### Querying relationship existence

When accessing the records for a model, you may wish to limit your results based on the existence of a relationship. For example, imagine you want to retrieve all blog posts that have at least one comment. To do so, you may pass the name of the relationship to the `has` method:

    // Retrieve all posts that have at least one comment...
    $posts = Post::has('comments')->get();

You may also specify an operator and count to further customize the query:

    // Retrieve all posts that have three or more comments...
    $posts = Post::has('comments', '>=', 3)->get();

Nested `has` statements may also be constructed using "dot" notation. For example, you may retrieve all posts that have at least one comment and vote:

    // Retrieve all posts that have at least one comment with votes...
    $posts = Post::has('comments.votes')->get();

If you need even more power, you may use the `whereHas` and `orWhereHas` methods to put "where" conditions on your `has` queries. These methods allow you to add customized constraints to a relationship constraint, such as checking the content of a comment:

    // Retrieve all posts with at least one comment containing words like foo%
    $posts = Post::whereHas('comments', function ($query) {
        $query->where('content', 'like', 'foo%');
    })->get();

<a name="eager-loading"></a>
## Eager loading

When accessing relationships as properties, the relationship data is "lazy loaded". This means the relationship data is not actually loaded until you first access the property. However, models can "eager load" relationships at the time you query the parent model. Eager loading alleviates the N + 1 query problem. To illustrate the N + 1 query problem, consider a `Book` model that is related to `Author`:

    class Book extends Model
    {
        public $belongsTo = [
            'author' => ['Acme\Blog\Models\Author']
        ];
    }

Now let's retrieve all books and their authors:

    $books = Book::all();

    foreach ($books as $book) {
        echo $book->author->name;
    }

This loop will execute 1 query to retrieve all of the books on the table, then another query for each book to retrieve the author. So, if we have 25 books, this loop would run 26 queries: 1 for the original book, and 25 additional queries to retrieve the author of each book.

Thankfully we can use eager loading to reduce this operation to just 2 queries. When querying, you may specify which relationships should be eager loaded using the `with` method:

    $books = Book::with('author')->get();

    foreach ($books as $book) {
        echo $book->author->name;
    }

For this operation only two queries will be executed:

    select * from books

    select * from authors where id in (1, 2, 3, 4, 5, ...)

#### Eager loading multiple relationships

Sometimes you may need to eager load several different relationships in a single operation. To do so, just pass additional arguments to the `with` method:

    $books = Book::with('author', 'publisher')->get();

#### Nested eager loading

To eager load nested relationships, you may use "dot" syntax. For example, let's eager load all of the book's authors and all of the author's personal contacts in one statement:

    $books = Book::with('author.contacts')->get();

<a name="constraining-eager-loads"></a>
### Constraining eager loads

Sometimes you may wish to eager load a relationship, but also specify additional query constraints for the eager loading query. Here's an example:

    $users = User::with([
        'posts' => function ($query) {
            $query->where('title', 'like', '%first%');
        }
    ])->get();

In this example, the model will only eager load posts if the post's `title` column contains the word `first`. Of course, you may call other [query builder](query) to further customize the eager loading operation:

    $users = User::with([
        'posts' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }
    ])->get();

<a name="lazy-eager-loading"></a>
### Lazy eager loading

Sometimes you may need to eager load a relationship after the parent model has already been retrieved. For example, this may be useful if you need to dynamically decide whether to load related models:

    $books = Book::all();

    if ($someCondition) {
        $books->load('author', 'publisher');
    }

If you need to set additional query constraints on the eager loading query, you may pass a `Closure` to the `load` method:

    $books->load([
        'author' => function ($query) {
            $query->orderBy('published_date', 'asc');
        }
    ]);

<a name="inserting-related-models"></a>
## Inserting related models

Just like you would [query a relationship](#querying-relations), October supports defining a relationship using a method or dynamic property approach. For example, perhaps you need to insert a new `Comment` for a `Post` model. Instead of manually setting the `post_id` attribute on the `Comment`, you may insert the `Comment` directly from the relationship.

<a name="inserting-method"></a>
### Insert via relationship method

October provides convenient methods for adding new models to relationships. Primarily models can be added to a relationship or removed from a relationship. In each case the relationship is associated or disassociated respectively.

#### Add method

Use the `add()` method to associate a new relationship.

    $comment = new Comment(['message' => 'A new comment.']);

    $post = Post::find(1);

    $comment = $post->comments()->add($comment);

Notice that we did not access the `comments` relationship as a dynamic property. Instead, we called the `comments` method to obtain an instance of the relationship. The `add()` method will automatically add the appropriate `post_id` value to the new `Comment` model.

If you need to save multiple related models, you may use the `addMany()` method:

    $post = Post::find(1);

    $post->comments()->addMany([
        new Comment(['message' => 'A new comment.']),
        new Comment(['message' => 'Another comment.']),
    ]);

#### Remove method

Comparatively, the `remove()` method can be used to disassociate a relationship, making it an orphaned record.

    $post->comments()->remove($comment);

In the case of many-to-many relations, the record is removed from the relationship's collection instead.

    $post->categories()->remove($category);

In the case of a "belongs to" relationship, you may use the `dissociate()` method, which doesn't require the related model passed to it.

    $post->author()->dissociate();

#### Adding with pivot data

When working with a many-to-many relationship, the `add()` method accepts an array of additional intermediate "pivot" table attributes as its second argument as an array.

    $user = User::find(1);

    $pivotData = ['expires' => $expires];

    $user->roles()->add($role, $pivotData);

The second argument of the `add()` method can also specify the session key used by [deferred binding](#deferred-binding) when passed as a string. In these cases the pivot data can be provided as the third argument instead.

    $user->roles()->add($role, $sessionKey, $pivotData);

#### Create method

While `add()` and `addMany()` accepts a full model instance, you may also use the `create()` method, that accepts a PHP array of attributes, creates a model, and inserts it into the database.

    $post = Post::find(1);

    $comment = $post->comments()->create([
        'message' => 'A new comment.',
    ]);

Before using the `create()` method, be sure to review the documentation on attribute [mass assignment](model#mass-assignment) as the attributes in the PHP array are restricted by the model's "fillable" definition.

<a name="inserting-dynamic-property"></a>
### Insert via dynamic property

Relationships can be set directly via their properties in the same way you would access them. Setting a relationship using this approach will overwrite any relationship that existed previously. The model should be saved afterwards like you would with any attribute.

    $post->author = $author;

    $post->comments = [$comment1, $comment2];

    $post->save();

Alternatively you may set the relationship using the primary key, this is useful when working with HTML forms.

    // Assign to author with ID of 3
    $post->author = 3;

    // Assign comments with IDs of 1, 2 and 3
    $post->comments = [1, 2, 3];

    $post->save();

Relationships can be disassociated by assigning the NULL value to the property.

    $post->author = null;

    $post->comments = null;

    $post->save();

Similar to [deferred binding](#deferred-binding), relationships defined on non-existent models are deferred in memory until they are saved. In this example the post does not exist yet, so the `post_id` attribute cannot be set on the comment via `$post->comments`. Therefore the association is deferred until the post is created by calling the `save()` method.

    $comment = Comment::find(1);

    $post = new Post;

    $post->comments = [$comment];

    $post->save();

<a name="inserting-many-to-many-relations"></a>
### Many To Many relations

#### Attaching / Detaching

When working with many-to-many relationships, Models provide a few additional helper methods to make working with related models more convenient. For example, let's imagine a user can have many roles and a role can have many users. To attach a role to a user by inserting a record in the intermediate table that joins the models, use the `attach` method:

    $user = User::find(1);

    $user->roles()->attach($roleId);

When attaching a relationship to a model, you may also pass an array of additional data to be inserted into the intermediate table:

    $user->roles()->attach($roleId, ['expires' => $expires]);

Of course, sometimes it may be necessary to remove a role from a user. To remove a many-to-many relationship record, use the `detach` method. The `detach` method will remove the appropriate record out of the intermediate table; however, both models will remain in the database:

    // Detach a single role from the user...
    $user->roles()->detach($roleId);

    // Detach all roles from the user...
    $user->roles()->detach();

For convenience, `attach` and `detach` also accept arrays of IDs as input:

    $user = User::find(1);

    $user->roles()->detach([1, 2, 3]);

    $user->roles()->attach([1 => ['expires' => $expires], 2, 3]);

#### Syncing For convenience

You may also use the `sync` method to construct many-to-many associations. The `sync` method accepts an array of IDs to place on the intermediate table. Any IDs that are not in the given array will be removed from the intermediate table. So, after this operation is complete, only the IDs in the array will exist in the intermediate table:

    $user->roles()->sync([1, 2, 3]);

You may also pass additional intermediate table values with the IDs:

    $user->roles()->sync([1 => ['expires' => true], 2, 3]);

<a name="touching-parent-timestamps"></a>
### Touching parent timestamps

When a model `belongsTo` or `belongsToMany` another model, such as a `Comment` which belongs to a `Post`, it is sometimes helpful to update the parent's timestamp when the child model is updated. For example, when a `Comment` model is updated, you may want to automatically "touch" the `updated_at` timestamp of the owning `Post`. Just add a `touches` property containing the names of the relationships to the child model:

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
            'post' => ['Acme\Blog\Models\Post']
        ];
    }

Now, when you update a `Comment`, the owning `Post` will have its `updated_at` column updated as well:

    $comment = Comment::find(1);

    $comment->text = 'Edit to this comment!';

    $comment->save();

<a name="deferred-binding"></a>
## Deferred binding

Deferred bindings allows you to postpone model relationships binding until the master record commits the changes. This is particularly useful if you need to prepare some models (such as file uploads) and associate them to another model that doesn't exist yet.

You can defer any number of **slave** models against a **master** model using a **session key**. When the master record is saved along with the session key, the relationships to slave records are updated automatically for you. Deferred bindings are supported in the back-end [Form behavior](../backend/form) automatically, but you may want to use this feature in other places.

<a name="deferred-session-key"></a>
### Generating a session key

The session key is required for deferred bindings. You can think of a session key as of a transaction identifier. The same session key should be used for binding/unbinding relationships and saving the master model. You can generate the session key with PHP `uniqid()` function. Note that the [form helper](../cms/markup#forms) generates a hidden field containing the session key automatically.

    $sessionKey = uniqid('session_key', true);

<a name="defer-binding"></a>
### Defer a relation binding

The comment in the next example will not be added to the post unless the post is saved.

    $comment = new Comment;
    $comment->content = "Hello world!";
    $comment->save();

    $post = new Post;
    $post->comments()->add($comment, $sessionKey);

> **Note**: the `$post` object has not been saved but the relationship will be created if the saving happens.

<a name="defer-unbinding"></a>
### Defer a relation unbinding

The comment in the next example will not be deleted unless the post is saved.

    $comment = Comment::find(1);
    $post = Post::find(1);
    $post->comments()->delete($comment, $sessionKey);

<a name="list-all-bindings"></a>
### List all bindings

Use the `withDeferred()` method of a relation to load all records, including deferred. The results will include existing relations as well.

    $post->comments()->withDeferred($sessionKey)->get();

<a name="cancel-all-bindings"></a>
### Cancel all bindings

It's a good idea to cancel deferred binding and delete the slave objects rather than leaving them as orphans.

    $post->cancelDeferred($sessionKey);

<a name="commit-all-bindings"></a>
### Commit all bindings

You can commit (bind or unbind) all deferred bindings when you save the master model by providing the session key with the second argument of the `save()` method.

    $post = new Post;
    $post->title = "First blog post";
    $post->save(null, $sessionKey);

The same approach works with the model's `create()` method:

    $post = Post::create(['title' => 'First blog post'], $sessionKey);

<a name="lazily-commit-bindings"></a>
### Lazily commit bindings

If you are unable to supply the `$sessionKey` when saving, you can commit the bindings at any time using the the next code:

    $post->commitDeferred($sessionKey);

<a name="cleanup-bindings"></a>
### Clean up orphaned bindings

Destroys all bindings that have not been committed and are older than 1 day:

    October\Rain\Database\Models\DeferredBinding::cleanUp(1);

> **Note:** October automatically destroys deferred bindings that are older than 5 days. It happens when a back-end user logs into the system.
