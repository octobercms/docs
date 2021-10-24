# Model Serialization

- [Introduction](#introduction)
- [Basic usage](#basic-usage)
- [Hiding attributes from JSON](#hiding-attributes-from-json)
- [Appending values to JSON](#appending-values-to-json)

<a name="introduction"></a>
## Introduction

When building JSON APIs, you will often need to convert your models and relationships to arrays or JSON. Models includes convenient methods for making these conversions, as well as controlling which attributes are included in your serializations.

<a name="basic-usage"></a>
## Basic usage

#### Converting a model to an array

To convert a model and its loaded [relationships](relations) to an array, you may use the `toArray` method. This method is recursive, so all attributes and all relations (including the relations of relations) will be converted to arrays:

    $user = User::with('roles')->first();

    return $user->toArray();

You may also convert [collections](collections) to arrays:

    $users = User::all();

    return $users->toArray();

#### Converting a model to JSON

To convert a model to JSON, you may use the `toJson` method. Like `toArray`, the `toJson` method is recursive, so all attributes and relations will be converted to JSON:

    $user = User::find(1);

    return $user->toJson();

Alternatively, you may cast a model or collection to a string, which will automatically call the `toJson` method:

    $user = User::find(1);

    return (string) $user;

Since models and collections are converted to JSON when cast to a string, you can return Model objects directly from your application's routes, AJAX handlers or controllers:

    Route::get('users', function () {
        return User::all();
    });

<a name="hiding-attributes-from-json"></a>
## Hiding attributes from JSON

Sometimes you may wish to limit the attributes, such as passwords, that are included in your model's array or JSON representation. To do so, add a `$hidden` property definition to your model:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * The attributes that should be hidden for arrays.
         *
         * @var array
         */
        protected $hidden = ['password'];
    }

Alternatively, you may use the `$visible` property to define a white-list of attributes that should be included in your model's array and JSON representation:

    class User extends Model
    {
        /**
         * The attributes that should be visible in arrays.
         *
         * @var array
         */
        protected $visible = ['first_name', 'last_name'];
    }

<a name="appending-values-to-json"></a>
## Appending values to JSON

Occasionally, you may need to add array attributes that do not have a corresponding column in your database. To do so, first define an [accessor](../database/mutators) for the value:

    class User extends Model
    {
        /**
         * Get the administrator flag for the user.
         *
         * @return bool
         */
        public function getIsAdminAttribute()
        {
            return $this->attributes['admin'] == 'yes';
        }
    }

Once you have created the accessor, add the attribute name to the `appends` property on the model:

    class User extends Model
    {
        /**
         * The accessors to append to the model's array form.
         *
         * @var array
         */
        protected $appends = ['is_admin'];
    }

Once the attribute has been added to the `appends` list, it will be included in both the model's array and JSON forms. Attributes in the `appends` array will also respect the `visible` and `hidden` settings configured on the model.
