# Database Traits

- [Hashable](#hashable)
- [Purgeable](#purgeable)
- [Encryptable](#encryptable)
- [Sluggable](#sluggable)
- [Sortable](#sortable)
- [Simple Tree](#simple-tree)
- [Nested Tree](#nested-tree)
- [Validation](#validation)
- [Soft deleting](#soft-deleting)

Model traits are used to implement common functionality.

<a name="hashable" class="anchor" href="#hashable"></a>
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

<a name="purgeable" class="anchor" href="#purgeable"></a>
## Purgeable

Purged attributes will not be saved to the database when a model is created or updated. To purge attributes in your model, apply the `October\Rain\Database\Traits\Purgeable` trait and declare a `$purgeable` property with an array containing the attributes to hash.

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

<a name="encryptable" class="anchor" href="#encryptable"></a>
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

<a name="sluggable" class="anchor" href="#sluggable"></a>
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

<a name="sortable" class="anchor" href="#sortable"></a>
## Sortable

Sorted models will store a number value in `sort_order` which maintains the sort order of each individual model in a collection. The store a sort order for your models, apply the `October\Rain\Database\Traits\Sortable` trait.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sortable;
    }

Use the `setSortableOrder` method to set the orders on a single record or multiple records.

    // Sets the order of the user to 1...
    $user->setSortableOrder($user->id, 1);

    // Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
    $user->setSortableOrder([1, 2, 3], [3, 2, 1]);

<a name="simple-tree" class="anchor" href="#simple-tree"></a>
## Simple Tree

A simple tree model will use the `parent_id` column maintain a parent and child relationship between models. To use the simple tree, apply the `October\Rain\Database\Traits\SimpleTree` trait.

<a name="nested-tree" class="anchor" href="#nested-tree"></a>
## Nested Tree

The [nested set model](https://en.wikipedia.org/wiki/Nested_set_model) is an advanced technique for maintaining hierachies among models using `parent_id`, `nest_left`, `nest_right`, and `nest_depth` columns. To use a nested set model, apply the `October\Rain\Database\Traits\NestedTree` trait.

<a name="validation" class="anchor" href="#validation"></a>
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

<a name="retrieving-validation-errors" class="anchor" href="#retrieving-validation-errors"></a>
### Retrieving validation errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the model. The object which contains validation failure messages. Retrieve the validation errors message collection instance with `errors()` method or `$validationErrors` property. Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

> **Note:** The Model leverages the MessagesBag object which has a [simple and elegant method](../services/validation#working-with-error-messages) of formatting errors.

<a name="overriding-validation" class="anchor" href="#overriding-validation"></a>
### Overriding validation

The `forceSave()` method validates the model and saves regardless of whether or not there are validation errors.

    $user = new User;

    // Creates a user without validation
    $user->forceSave();

<a name="custom-error-messages" class="anchor" href="#custom-error-messages"></a>
### Custom error messages

Just like the Laravel Validator, you can set custom error messages using the [same syntax](../services/validation#custom-error-messages).

    class User extends Model
    {
        public $customMessages = [
           'required' => 'The :attribute field is required.',
            ...
        ];
    }

<a name="custom-attribute-names" class="anchor" href="#custom-attribute-names"></a>
### Custom attribute names

You may also set custom attribute names with the `$attributeNames` array.

    class User extends Model
    {
        public $attributeNames = [
           'email' => 'Email Address',
            ...
        ];
    }

<a name="custom-validation-rules" class="anchor" href="#custom-validation-rules"></a>
### Custom validation rules

You can also create custom validation rules the [same way](../services/validation#custom-validation-rules) you would for the Validator service.

<a name="soft-deleting" class="anchor" href="#soft-deleting"></a>
## Soft deleting

When soft deleting a model, it is not actually removed from your database. Instead, a `deleted_at` timestamp is set on the record. To enable soft deletes for a model, apply the `October\Rain\Database\Traits\SoftDeleting` trait to the model and add the deleted_at column to your `$dates` property:

    class User extends Model
    {
        use \October\Rain\Database\Traits\SoftDeleting;

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
