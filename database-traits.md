# Database Traits

- [Hashable](#hashable)
- [Purgeable](#purgeable)
- [Encryptable](#encryptable)
- [Sluggable](#sluggable)
- [Revisionable](#revisionable)
- [Sortable](#sortable)
- [Simple Tree](#simple-tree)
- [Nested Tree](#nested-tree)
- [Validation](#validation)
- [Soft deleting](#soft-deleting)
- [Nullable](#nullable)

Model traits are used to implement common functionality.

<a name="hashable"></a>
## Hashable

Hashed attributes are hashed immediately when the attribute is first set on the model. To hash attributes in your model, apply the `October\Rain\Database\Traits\Hashable` trait and declare a `$hashable` property with an array containing the attributes to hash.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Hashable;

        /**
         * @var array List of attributes to hash.
         */
        protected $hashable = ['password'];
    }

<a name="purgeable"></a>
## Purgeable

Purged attributes will not be saved to the database when a model is created or updated. To purge attributes in your model, apply the `October\Rain\Database\Traits\Purgeable` trait and declare a `$purgeable` property with an array containing the attributes to purge.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Purgeable;

        /**
         * @var array List of attributes to purge.
         */
        protected $purgeable = ['password_confirmation'];
    }

The defined attributes will be purged when the model is saved, before the [model events](#model-events) are triggered, including validation. Use the `getOriginalPurgeValue` to find a value that was purged.

    return $user->getOriginalPurgeValue('password_confirmation');

<a name="encryptable"></a>
## Encryptable

Similar to the [hashable trait](#hashable), encrypted attributes are encrypted when set but also decrypted when an attribute is retrieved. To encrypt attributes in your model, apply the `October\Rain\Database\Traits\Encryptable` trait and declare a `$encryptable` property with an array containing the attributes to encrypt.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Encryptable;

        /**
         * @var array List of attributes to encrypt.
         */
        protected $encryptable = ['api_key', 'api_secret'];
    }

<a name="sluggable"></a>
## Sluggable

Slugs are meaningful codes that are commonly used in page URLs. To automatically generate a unique slug for your model, apply the `October\Rain\Database\Traits\Sluggable` trait and declare a `$slugs` property.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sluggable;

        /**
         * @var array Generate slugs for these attributes.
         */
        protected $slugs = ['slug' => 'name'];
    }

The `$slugs` property should be an array where the key is the destination column for the slug and the value is the source string used to generate the slug. In the above example, if the `name` column was set to **Cheyenne**, as a result the `slug` column would be set to **cheyenne**, **cheyenne-1**, or **cheyenne-2**, etc before the model is created.

To generate a slug from multiple sources, pass another array as the source value:

    protected $slugs = [
        'slug' => ['first_name', 'last_name']
    ];

Slugs are only generated when a model first created. To override or disable this functionality, simply set the slug attribute manually:

    $user = new User;
    $user->name = 'Remy';
    $user->slug = 'custom-slug';
    $user->save(); // Slug will not be generated

Use the `slugAttributes` method to regenerate slugs when updating a model:

    $user = User::find(1);
    $user->slug = null;
    $user->slugAttributes();
    $user->save();

<a name="revisionable"></a>
## Revisionable

October models can record the history of changes in values by storing revisions. To store revisions for your model, apply the `October\Rain\Database\Traits\Revisionable` trait and declare a `$revisionable` property with an array containing the attributes to monitor for changes. You also need to define a `$morphMany` [model relation](relations) called `revision_history` that refers to the `System\Models\Revision` class with the name `revisionable`, this is where the revision history data is stored.

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
            'revision_history' => ['System\Models\Revision', 'name' => 'revisionable']
        ];
    }

By default 500 records will be kept, however this can be modified by declaring a `$revisionableLimit` property on the model with a new limit value.

    /**
     * @var int Maximum number of revision records to keep.
     */
    public $revisionableLimit = 8;

The revision history can be accessed like any other relation:

    $history = User::find(1)->revision_history;

    foreach ($history as $record) {
        echo $record->field . ' updated ';
        echo 'from ' . $record->old_value;
        echo 'to ' . $record->new_value;
    }

The revision record optionally supports a user relationship using the `user_id` attribute. You may include a `getRevisionableUser` method in your model to keep track of the user that made the modification.

    public function getRevisionableUser()
    {
        return BackendAuth::getUser()->id;
    }

<a name="sortable"></a>
## Sortable

Sorted models will store a number value in `sort_order` which maintains the sort order of each individual model in a collection. To store a sort order for your models, apply the `October\Rain\Database\Traits\Sortable` trait and ensure that your schema has a column defined for it to use (example: `$table->integer('sort_order')->default(0);`).

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sortable;
    }
    

You may modify the key name used to identify the sort order by defining the `SORT_ORDER` constant:

    const SORT_ORDER = 'my_sort_order_column';

Use the `setSortableOrder` method to set the orders on a single record or multiple records.

    // Sets the order of the user to 1...
    $user->setSortableOrder($user->id, 1);

    // Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
    $user->setSortableOrder([1, 2, 3], [3, 2, 1]);

<a name="simple-tree"></a>
## Simple Tree

A simple tree model will use the `parent_id` column maintain a parent and child relationship between models. To use the simple tree, apply the `October\Rain\Database\Traits\SimpleTree` trait.

    class Category extends Model
    {
        use \October\Rain\Database\Traits\SimpleTree;
    }

This trait will automatically inject two [model relations](../database/relations) called `parent` and `children`, it is the equivalent of the following definitions:

    public $belongsTo = [
        'parent'    => ['User', 'key' => 'parent_id'],
    ];

    public $hasMany = [
        'children'    => ['User', 'key' => 'parent_id'],
    ];

You may modify the key name used to identify the parent by defining the `PARENT_ID` constant:

    const PARENT_ID = 'my_parent_column';

Collections of models that use this trait will return the type of `October\Rain\Database\TreeCollection` which adds the `toNested` method. To build an eager loaded tree structure, return the records with the relations eager loaded.

    Category::all()->toNested();

<a name="nested-tree"></a>
## Nested Tree

The [nested set model](https://en.wikipedia.org/wiki/Nested_set_model) is an advanced technique for maintaining hierachies among models using `parent_id`, `nest_left`, `nest_right`, and `nest_depth` columns. To use a nested set model, apply the `October\Rain\Database\Traits\NestedTree` trait. All of the features of the `SimpleTree` trait are inherently available in this model.

    class Category extends Model
    {
        use \October\Rain\Database\Traits\NestedTree;
    }

### Creating a root node

By default, all nodes are created as roots:

    $root = Category::create(['name' => 'Root category']);

Alternatively, you may find yourself in the need of converting an existing node into a root node:

    $node->makeRoot();

You may also nullify it's `parent_id` column which works the same as `makeRoot'.

    $node->parent_id = null;
    $node->save();

### Inserting nodes

You can insert new nodes directly by the relation:

    $child1 = $root->children()->create(['name' => 'Child 1']);

Or use the `makeChildOf` method for existing nodes:

    $child2 = Category::create(['name' => 'Child 2']);
    $child2->makeChildOf($root);

### Deleting nodes

When a node is deleted with the `delete` method, all descendants of the node will also be deleted. Note that the delete [model events](../database/model#model-events) will not be fired for the child models.

    $child1->delete();

### Getting the nesting level of a node

The `getLevel` method will return current nesting level, or depth, of a node.

    // 0 when root
    $node->getLevel()

### Moving nodes around

There are several methods for moving nodes around:

`moveLeft()`: Find the left sibling and move to the left of it.
`moveRight()`: Find the right sibling and move to the right of it.
`moveBefore($otherNode)`: Move to the node to the left of ...
`moveAfter($otherNode)`: Move to the node to the right of ...
`makeChildOf($otherNode)`: Make the node a child of ...
`makeRoot()`: Make current node a root node.

<a name="validation"></a>
## Validation

October models uses the built-in [Validator class](../services/validation). The validation rules are defined in the model class as a property named `$rules` and the class must use the trait `October\Rain\Database\Traits\Validation`:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Validation;

        public $rules = [
            'name'                  => 'required|between:4,16',
            'email'                 => 'required|email',
            'password'              => 'required|alpha_num|between:4,8|confirmed',
            'password_confirmation' => 'required|alpha_num|between:4,8'
        ];
    }

> **Note**: You're free to use the [array syntax](../services/validation#basic-usage) for validation rules as well.

Models validate themselves automatically when the `save()` method is called.

    $user = new User;
    $user->name = 'Adam Person';
    $user->email = 'a.person@email.address.com';
    $user->password = 'passw0rd';

    // Returns false if model is invalid
    $success = $user->save();

> **Note:** You can also validate a model at any time using the `validate()` method.

<a name="retrieving-validation-errors"></a>
### Retrieving validation errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the model. The object which contains validation failure messages. Retrieve the validation errors message collection instance with `errors()` method or `$validationErrors` property. Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

> **Note:** The Model leverages the MessagesBag object which has a [simple and elegant method](../services/validation#working-with-error-messages) of formatting errors.

<a name="overriding-validation"></a>
### Overriding validation

The `forceSave()` method validates the model and saves regardless of whether or not there are validation errors.

    $user = new User;

    // Creates a user without validation
    $user->forceSave();

<a name="custom-error-messages"></a>
### Custom error messages

Just like the Validator class, you can set custom error messages using the [same syntax](../services/validation#custom-error-messages).

    class User extends Model
    {
        public $customMessages = [
           'required' => 'The :attribute field is required.',
            ...
        ];
    }

<a name="custom-attribute-names"></a>
### Custom attribute names

You may also set custom attribute names with the `$attributeNames` array.

    class User extends Model
    {
        public $attributeNames = [
           'email' => 'Email Address',
            ...
        ];
    }

<a name="dynamic-validation-rules"></a>
### Dynamic validation rules

You can apply rules dynamically by overriding the `beforeValidate` [model event](../database/model#events) method. Here we check if the `is_remote` attribute is `false` and then dynamically set the `latitude` and `longitude` attributes to be required fields.

    public function beforeValidate()
    {
        if (!$this->is_remote) {
            $this->rules['latitude'] = 'required';
            $this->rules['longitude'] = 'required';
        }
    }

<a name="custom-validation-rules"></a>
### Custom validation rules

You can also create custom validation rules the [same way](../services/validation#custom-validation-rules) you would for the Validator service.

<a name="soft-deleting"></a>
## Soft deleting

When soft deleting a model, it is not actually removed from your database. Instead, a `deleted_at` timestamp is set on the record. To enable soft deletes for a model, apply the `October\Rain\Database\Traits\SoftDelete` trait to the model and add the deleted_at column to your `$dates` property:

    class User extends Model
    {
        use \October\Rain\Database\Traits\SoftDelete;

        protected $dates = ['deleted_at'];
    }

To add a `deleted_at` column to your table, you may use the `softDeletes` method from a migration:

    Schema::table('posts', function ($table) {
        $table->softDeletes();
    });

Now, when you call the `delete` method on the model, the `deleted_at` column will be set to the current timestamp. When querying a model that uses soft deletes, the "deleted" models will not be included in query results.

To determine if a given model instance has been soft deleted, use the `trashed` method:

    if ($user->trashed()) {
        //
    }

<a name="querying-soft-deleted-models"></a>
### Querying soft deleted models

#### Including soft deleted models

As noted above, soft deleted models will automatically be excluded from query results. However, you may force soft deleted models to appear in a result set using the `withTrashed` method on the query:

    $users = User::withTrashed()->where('account_id', 1)->get();

The `withTrashed` method may also be used on a [relationship](relations) query:

    $flight->history()->withTrashed()->get();

#### Retrieving only soft deleted models

The `onlyTrashed` method will retrieve **only** soft deleted models:

    $users = User::onlyTrashed()->where('account_id', 1)->get();

#### Restoring soft deleted models

Sometimes you may wish to "un-delete" a soft deleted model. To restore a soft deleted model into an active state, use the `restore` method on a model instance:

    $user->restore();

You may also use the `restore` method in a query to quickly restore multiple models:

    // Restore a single model instance...
    User::withTrashed()->where('account_id', 1)->restore();

    // Restore all related models...
    $user->posts()->restore();

#### Permanently deleting models

Sometimes you may need to truly remove a model from your database. To permanently remove a soft deleted model from the database, use the `forceDelete` method:

    // Force deleting a single model instance...
    $user->forceDelete();

    // Force deleting all related models...
    $user->posts()->forceDelete();

<a name="soft-deleting-relations"></a>
### Soft deleting relations

When two related models have soft deletes enabled, you can cascade the delete event by defining the `softDelete` option in the [relation definition](../database/relations#detailed-relationships). In this example, if the user model is soft deleted, the comments belonging to that user will also be soft deleted.

    class User extends Model
    {
        use \October\Rain\Database\Traits\SoftDelete;

        public $hasMany = [
            'comments' => ['Acme\Blog\Models\Comment', 'softDelete' => true]
        ];
    }

> **Note:** If the related model does not use the soft delete trait, it will be treated the same as the `delete` option and deleted permanently.

Under these same conditions, when the primary model is restored, all the related models that use the `softDelete` option will also be restored.

    // Restore the user and comments
    $user->restore();

<a name="nullable"></a>
## Nullable

Nullable attributes are set to `NULL` when left empty. To nullify attributes in your model, apply the `October\Rain\Database\Traits\Nullable` trait and declare a `$nullable` property with an array containing the attributes to nullify.

    class Product extends Model
    {
        use \October\Rain\Database\Traits\Nullable;

        /**
         * @var array Nullable attributes.
         */
        protected $nullable = ['sku'];
    }
