October's database models are named Active Record which is based on the [Eloquent ORM provided by Laravel](http://laravel.com/docs/eloquent).

#### Relations

The following relations are available, along with their optional and required arguments:

| Name            | Description                                    | Optional                                  | Required  |
|:--------------- |:-----------------------------------------------|:----------------------------------------- |:--------- |
| $hasOne         | Has a single related model that belongs to it  | foreignKey, localKey                      |           |
| $hasMany        | Has many related models that belong to         | foreignKey, localKey                      |           |
| $belongsTo      | Owned by another related model (slave)         | foreignKey                                |           |
| $belongsToMany  | Owned by multiple related models               | table, foreignKey, primaryKey, pivotData  |           |
| $morphTo        | Polymorphic version of belongs to              | name, type, id                            |           |
| $morphOne       | Polymorphic version of has one                 | type, id, localKey                        | name      |
| $morphMany      | Polymorphic version of has many                | type, id, localKey                        | name      |
| $attachOne      | Single file attachment                         | public                                    |           |
| $attachMany     | Multiple file attachments                      | public                                    |           |
| $hasManyThrough | Has many related models through another model  | foreignKey, throughKey                    | through   |

An example of defining a relationship:

```php
class BlogPost extends Model
{
  public $belongsTo = [
    'user' => ['User', 'foreignKey' => 'user_id']
  ];

  public $belongsToMany = [
    'categories' => ['Category', 'table' => 'october_blog_posts_categories']
  ];

  public $attachMany = [
    'featured_images' => ['System\Models\File']
  ];
}
```

#### Events

The following events are available:

| Name           | Description                                                |
|:-------------- |:-----------------------------------------------------------|
| beforeCreate   | Before the model is saved, when first created              |
| afterCreate    | After the model is saved, when first created               |
| beforeSave     | Before the model is saved, either created or updated       |
| afterSave      | After the model is saved, either created or updated        |
| beforeValidate | Before the supplied model data is validated                |
| afterValidate  | After the supplied model data has been validated           |
| beforeUpdate   | Before an existing model is saved                          |
| afterUpdate    | After an existing model is saved                           |
| beforeDelete   | Before an existing model is deleted                        |
| afterDelete    | After an existing model is deleted                         |
| beforeRestore  | Before a soft-deleted model is restored                    |
| afterRestore   | After a soft-deleted model has been restored               |
| beforeFetch    | Before an exisiting model is populated                     |
| afterFetch     | After an exisiting model has been populated                |

An example of using an event:

```php
public function beforeCreate()
{
  // Generate a URL slug for this model
  $this->slug = slug($this->name);
}
```

##### Attribute modifiers

Specified attributes can be modified automatically when handling their values. For example:

```php
class User extends \October\Rain\Database\Model
{
    protected $hashable = ['password'];

    protected $purgeable = ['password_confirmation'];

    protected $jsonable = ['permissions'];

    protected $encryptable = ['api_key'];
}
```

* **$hashable** - values are hashed, they can be verified but cannot be reversed
* **$purgeable** - attributes are removed before attempting to save to the database
* **$jsonable** - values are encoded as JSON before saving and converted to arrays after fetching
* **$encryptable** - values are encrypted and decrypted for storing sensitive data

##### Extending models

Models can be extended by hooking in to the constructor. For example, to add another relation:

```php
User::extend(function($model) {
    $model->hasOne['author'] = ['Author', 'foreignKey' => 'user_id'];
});
```

##### Joined Eager Load

Similar to the standard [Eager Loading](http://laravel.com/docs/eloquent#eager-loading), you eager load and join a relation to the main query.

```php
Post::joinWith('Category')->select("concat(posts.name, ' - ', category.name)")->get();
```

This will also eager load 

##### Further reading on Active Record (Eloquent)

* [Eloquent ORM - Laravel documentation](http://laravel.com/docs/eloquent)
* [Active record pattern - Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern)



---



## Model Validation

October models use Laravel's built-in [Validator class](http://laravel.com/docs/validation). 
Defining validation rules are defined in the model class as a variable named `$rules`:

```php
class User extends \October\Rain\Database\Model
{
  public $rules = [
    'name'                  => 'required|between:4,16',
    'email'                 => 'required|email',
    'password'              => 'required|alpha_num|between:4,8|confirmed',
    'password_confirmation' => 'required|alpha_num|between:4,8',
  ];
}
```

> **Note**: you're free to use the [array syntax](http://laravel.com/docs/validation#basic-usage) for validation rules as well.

Models validate themselves automatically when the `save()` method is called.

```php
$user = new User;
$user->name = 'Adam Person';
$user->email = 'a.person@email.address.com';
$user->password = 'passw0rd';

// Returns false if model is invalid
$success = $user->save();
```

> **Note:** You can also validate a model at any time using the `validate()` method.

#### Retrieving Validation Errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the object which contains validation failure messages.

Retrieve the validation errors message collection instance with `errors()` method or `validationErrors` property.

Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

> **Note:** The Model leverages Laravel's MessagesBag object which has a [simple and elegant method](http://laravel.com/docs/validation#working-with-error-messages) of formatting errors.

#### Overriding Validation

`forceSave()` validates the model but saves regardless of whether or not there are validation errors.

```php
$user = new User;

// Creates a user without validation
$user->forceSave();
```

#### Custom Error Messages

Just like the Laravel Validator, Ardent lets you set custom error messages using the [same syntax](http://laravel.com/docs/validation#custom-error-messages).

```php
class User extends \October\Rain\Database\Model
{
  public static $customMessages = [
    'required' => 'The :attribute field is required.',
    ...
  ];
}
```

#### Custom Validation Rules

You can create custom validation rules the [same way](http://laravel.com/docs/validation#custom-validation-rules) you would for the Laravel Validator.
