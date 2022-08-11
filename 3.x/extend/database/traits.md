# Traits

Model traits are used to implement common functionality.

## Attribute Manipulation

### Nullable

Nullable attributes are set to `NULL` when left empty. To nullify attributes in your model, apply the `October\Rain\Database\Traits\Nullable` trait and declare a `$nullable` property with an array containing the attributes to nullify.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Nullable;

    /**
     * @var array Nullable attributes.
     */
    protected $nullable = ['sku'];
}
```

### Hashable

Hashed attributes are hashed immediately when the attribute is first set on the model. To hash attributes in your model, apply the `October\Rain\Database\Traits\Hashable` trait and declare a `$hashable` property with an array containing the attributes to hash.

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

### Purgeable

Purged attributes will not be saved to the database when a model is created or updated. To purge attributes in your model, apply the `October\Rain\Database\Traits\Purgeable` trait and declare a `$purgeable` property with an array containing the attributes to purge.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Purgeable;

    /**
     * @var array List of attributes to purge.
     */
    protected $purgeable = ['password_confirmation'];
}
```

The defined attributes will be purged when the model is saved, before the [model events](../system/models.md) are triggered, including validation. Use the `getOriginalPurgeValue` to find a value that was purged.

```php
return $user->getOriginalPurgeValue('password_confirmation');
```

### Encryptable

Similar to the `Hashable` trait, encrypted attributes are encrypted when set but also decrypted when an attribute is retrieved. To encrypt attributes in your model, apply the `October\Rain\Database\Traits\Encryptable` trait and declare a `$encryptable` property with an array containing the attributes to encrypt.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Encryptable;

    /**
     * @var array List of attributes to encrypt.
     */
    protected $encryptable = ['api_key', 'api_secret'];
}
```

::: warning
Encrypted attributes are not compatible with [jsonable attributes](../system/models.md).
:::

### Sluggable

Slugs are meaningful codes that are commonly used in page URLs. To automatically generate a unique slug for your model, apply the `October\Rain\Database\Traits\Sluggable` trait and declare a `$slugs` property.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    /**
     * @var array Generate slugs for these attributes.
     */
    protected $slugs = ['slug' => 'name'];
}
```

The `$slugs` property should be an array where the key is the destination column for the slug and the value is the source string used to generate the slug. In the above example, if the `name` column was set to **Cheyenne**, as a result the `slug` column would be set to **cheyenne**, **cheyenne-2**, or **cheyenne-3**, etc before the model is created.

To generate a slug from multiple sources, pass another array as the source value:

```php
protected $slugs = [
    'slug' => ['first_name', 'last_name']
];
```

Slugs are only generated when a model first created. To override or disable this functionality, simply set the slug attribute manually:

```php
$user = new User;
$user->name = 'Remy';
$user->slug = 'custom-slug';
$user->save(); // Slug will not be generated
```

Use the `slugAttributes` method to regenerate slugs when updating a model:

```php
$user = User::find(1);
$user->slug = null;
$user->slugAttributes();
$user->save();
```

## Sorting and Reordering

### Sortable

Sorted models will store a number value in `sort_order` which maintains the sort order of each individual model in a collection. To store a sort order for your models, apply the `October\Rain\Database\Traits\Sortable` trait and ensure that your schema has a column defined for it to use (example: `$table->integer('sort_order')->default(0);`).

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

You may modify the key name used to identify the sort order by defining the `SORT_ORDER` constant:

```php
const SORT_ORDER = 'my_sort_order_column';
```

Use the `setSortableOrder` method to set the orders on a single record or multiple records.

```php
// Sets the order of the user to 1...
$user->setSortableOrder($user->id, 1);

// Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
$user->setSortableOrder([1, 2, 3], [3, 2, 1]);
```

### Simple Tree

A simple tree model will use the `parent_id` column maintain a parent and child relationship between models. To use the simple tree, apply the `October\Rain\Database\Traits\SimpleTree` trait.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

This trait will automatically inject two [model relations](./relations.md) called `parent` and `children`, it is the equivalent of the following definitions.

```php
public $belongsTo = [
    'parent' => [Category ::class, 'key' => 'parent_id'],
];

public $hasMany = [
    'children' => [Category ::class, 'key' => 'parent_id'],
];
```

You do not need to define these relations yourself, however, you may modify the key name used to identify the parent by defining the `PARENT_ID` constant:

```php
const PARENT_ID = 'my_parent_column';
```

Collections of models that use this trait will return the type of `October\Rain\Database\TreeCollection` which adds the `toNested` method. To build an eager loaded tree structure, return the records with the relations eager loaded.

```php
Category::all()->toNested();
```

#### Rendering

In order to render all levels of items and their children, you can use recursive processing

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

The [nested set model](https://en.wikipedia.org/wiki/Nested_set_model) is an advanced technique for maintaining hierachies among models using `parent_id`, `nest_left`, `nest_right`, and `nest_depth` columns. To use a nested set model, apply the `October\Rain\Database\Traits\NestedTree` trait. All of the features of the `SimpleTree` trait are inherently available in this model.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

#### Creating a Root Node

By default, all nodes are created as roots:

```php
$root = Category::create(['name' => 'Root category']);
```

Alternatively, you may find yourself in the need of converting an existing node into a root node:

```php
$node->makeRoot();
```

You may also nullify it's `parent_id` column which works the same as `makeRoot'.

```php
$node->parent_id = null;
$node->save();
```

#### Inserting Nodes

You can insert new nodes directly by the relation:

```php
$child1 = $root->children()->create(['name' => 'Child 1']);
```

Or use the `makeChildOf` method for existing nodes:

```php
$child2 = Category::create(['name' => 'Child 2']);
$child2->makeChildOf($root);
```

#### Deleting Nodes

When a node is deleted with the `delete` method, all descendants of the node will also be deleted. Note that the delete [model events](../system/models.md) will not be fired for the child models.

```php
$child1->delete();
```

#### Getting the Nesting Level of a Node

The `getLevel` method will return current nesting level, or depth, of a node.

```php
// 0 when root
$node->getLevel()
```

#### Moving Nodes Around

There are several methods for moving nodes around:

- `moveLeft()`: Find the left sibling and move to the left of it.
- `moveRight()`: Find the right sibling and move to the right of it.
- `moveBefore($otherNode)`: Move to the node to the left of ...
- `moveAfter($otherNode)`: Move to the node to the right of ...
- `makeChildOf($otherNode)`: Make the node a child of ...
- `makeRoot()`: Make current node a root node.

## Utility Functions

### Validation

October CMS models uses the built-in [Validator class](../services/validation.md). The validation rules are defined in the model class as a property named `$rules` and the class must use the trait `October\Rain\Database\Traits\Validation`.

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

You may also use [array syntax](../services/validation.md) for validation rules.

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

Models validate themselves automatically when the `save` method is called.

```php
$user = new User;
$user->name = 'Actual Person';
$user->email = 'a.person@example.com';
$user->password = 'passw0rd';

// Returns false if model is invalid
$success = $user->save();
```

::: tip
You can also validate a model at any time using the `validate` method.
:::

#### Retrieving Validation Errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the model. The object which contains validation failure messages. Retrieve the validation errors message collection instance with `errors` method or `$validationErrors` property. Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

::: tip
The Model leverages the `MessagesBag` object which has a [simple and elegant method](../services/validation.md) of formatting errors.
:::

#### Overriding Validation

The `forceSave` method validates the model and saves regardless of whether or not there are validation errors.

```php
$user = new User;

// Creates a user without validation
$user->forceSave();
```

#### Custom Error Messages

Just like the Validator class, you can set custom error messages using the [same syntax](../services/validation.md).

```php
class User extends Model
{
    public $customMessages = [
        'required' => 'The :attribute field is required.',
        ...
    ];
}
```

You can also add custom error messages to the array syntax for validation rules as well.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => 'required|url',
        'links.*.anchor' => 'required'
    ];

    public $customMessages = [
        'links.*.url.required' => 'The url is required',
        'links.*.url.*' => 'The url needs to be a valid url'
        'links.*.anchor.required' => 'The anchor text is required',
    ];
}
```

In the above example you can write custom error messages to specific validation rules (here we used: `required`). Or you can use a `*` to select everything else (here we added a custom message to the `url` validation rule using the `*`).

#### Custom Attribute Names

You may also set custom attribute names with the `$attributeNames` array.

```php
class User extends Model
{
    public $attributeNames = [
        'email' => 'Email Address',
        ...
    ];
}
```

#### Dynamic Validation Rules

You can apply rules dynamically by overriding the `beforeValidate` [model event](../system/models.md) method. Here we check if the `is_remote` attribute is `false` and then dynamically set the `latitude` and `longitude` attributes to be required fields.

```php
public function beforeValidate()
{
    if (!$this->is_remote) {
        $this->rules['latitude'] = 'required';
        $this->rules['longitude'] = 'required';
    }
}
```

#### Custom Validation Rules

You can also create custom validation rules the [same way](../services/validation.md) you would for the `Validator` service.

### Soft Deleting

When soft deleting a model, it is not actually removed from your database. Instead, a `deleted_at` timestamp is set on the record. To enable soft deletes for a model, apply the `October\Rain\Database\Traits\SoftDelete` trait to the model and add the deleted_at column to your `$dates` property:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
}
```

To add a `deleted_at` column to your table, you may use the `softDeletes` method from a migration:

```php
Schema::table('posts', function ($table) {
    $table->softDeletes();
});
```

Now, when you call the `delete` method on the model, the `deleted_at` column will be set to the current timestamp. When querying a model that uses soft deletes, the "deleted" models will not be included in query results.

To determine if a given model instance has been soft deleted, use the `trashed` method:

```php
if ($user->trashed()) {
    //
}
```

#### Querying Soft Deleted Models

##### Including Soft Deleted Models

As noted above, soft deleted models will automatically be excluded from query results. However, you may force soft deleted models to appear in a result set using the `withTrashed` method on the query:

```php
$users = User::withTrashed()->where('account_id', 1)->get();
```

The `withTrashed` method may also be used on a [relationship](./relations.md) query:

```php
$flight->history()->withTrashed()->get();
```

##### Retrieving Only Soft Deleted Models

The `onlyTrashed` method will retrieve **only** soft deleted models:

```php
$users = User::onlyTrashed()->where('account_id', 1)->get();
```

##### Restoring Soft Deleted Models

Sometimes you may wish to "un-delete" a soft deleted model. To restore a soft deleted model into an active state, use the `restore` method on a model instance:

```php
$user->restore();
```

You may also use the `restore` method in a query to quickly restore multiple models:

```php
// Restore a single model instance...
User::withTrashed()->where('account_id', 1)->restore();

// Restore all related models...
$user->posts()->restore();
```

#### Permanently Deleting Models

Sometimes you may need to truly remove a model from your database. To permanently remove a soft deleted model from the database, use the `forceDelete` method:

```php
// Force deleting a single model instance...
$user->forceDelete();

// Force deleting all related models...
$user->posts()->forceDelete();
```

#### Soft Deleting Relations

When two related models have soft deletes enabled, you can cascade the delete event by defining the `softDelete` option in the [relation definition](./relations.md). In this example, if the user model is soft deleted, the comments belonging to that user will also be soft deleted.

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
If the related model does not use the soft delete trait, it will be treated the same as the `delete` option and deleted permanently.
:::

Under these same conditions, when the primary model is restored, all the related models that use the `softDelete` option will also be restored.

```php
// Restore the user and comments
$user->restore();
```

#### Including Soft Deleted Relations

Soft deleted records are not included as part of relation lookups, however, you may include them by adding the `withTrashed` scope to the query.

```php
class User extends Model
{
    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'scope' => 'withTrashed']
    ];
}
```

### Multi Site

When applying multi-site to a model, only records shown for the active site are available using a `site_id` column set on the record. To enable multi-site for a model, apply the `October\Rain\Database\Traits\Multisite` trait to the model and define the propagation fields to the `$propagated` property:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagated = ['api_code'];
}
```

To add a `site_id` column to your table, you may use the `integer` method from a migration. A `site_root_id` may also be used to link records together using a root record.

```php
Schema::table('posts', function ($table) {
    $table->integer('site_id')->nullable()->index();
    $table->integer('site_root_id')->nullable()->index();
});
```

Now, when a record is created it will be assigned to the active site and switching to a different site will propagate a new record automatically. When updating a record, propagated fields are copied to every record belonging to the root record.

### Revisionable

October CMS models can record the history of changes in values by storing revisions. To store revisions for your model, apply the `October\Rain\Database\Traits\Revisionable` trait and declare a `$revisionable` property with an array containing the attributes to monitor for changes. You also need to define a `$morphMany` [model relation](./relations.md) called `revision_history` that refers to the `System\Models\Revision` class with the name `revisionable`, this is where the revision history data is stored.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Revisionable;

    /**
     * @var array Monitor these attributes for changes.
     */
    protected $revisionable = ['name', 'email'];

    /**
     * @var array Relations
     */
    public $morphMany = [
        'revision_history' => [\System\Models\Revision::class, 'name' => 'revisionable']
    ];
}
```

By default 500 records will be kept, however this can be modified by declaring a `$revisionableLimit` property on the model with a new limit value.

```php
/**
 * @var int Maximum number of revision records to keep.
 */
public $revisionableLimit = 8;
```

The revision history can be accessed like any other relation:

```php
$history = User::find(1)->revision_history;

foreach ($history as $record) {
    echo $record->field . ' updated ';
    echo 'from ' . $record->old_value;
    echo 'to ' . $record->new_value;
}
```

The revision record optionally supports a user relationship using the `user_id` attribute. You may include a `getRevisionableUser` method in your model to keep track of the user that made the modification.

```php
public function getRevisionableUser()
{
    return BackendAuth::getUser()->id;
}
```
