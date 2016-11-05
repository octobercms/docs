# Model Mutators

- [Introduction](#introduction)
- [Accessors & mutators](#accessors-and-mutators)
- [Date mutators](#date-mutators)
- [Attribute casting](#attribute-casting)

<a name="introduction"></a>
## Introduction

Accessors and mutators allow you to format attributes when retrieving them from a model or setting their value. For example, you may want to use the [encryption service](../services/encryption) to encrypt a value while it is stored in the database, and then automatically decrypt the attribute when you access it on the model.

In addition to custom accessors and mutators, you can also automatically cast date fields to [Carbon](https://github.com/briannesbitt/Carbon) instances or even [cast text values to JSON](#attribute-casting).

<a name="accessors-and-mutators"></a>
## Accessors & mutators

#### Defining an accessor

To define an accessor, create a `getFooAttribute` method on your model where `Foo` is the "camel" cased name of the column you wish to access. In this example, we'll define an accessor for the `first_name` attribute. The accessor will automatically be called when attempting to retrieve the value of `first_name`:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * Get the user's first name.
         *
         * @param  string  $value
         * @return string
         */
        public function getFirstNameAttribute($value)
        {
            return ucfirst($value);
        }
    }

As you can see, the original value of the column is passed to the accessor, allowing you to manipulate and return the value. To access the value of the mutator, you may simply access the `first_name` attribute:

    $user = User::find(1);

    $firstName = $user->first_name;

#### Defining a mutator

To define a mutator, define a `setFooAttribute` method on your model where `Foo` is the "camel" cased name of the column you wish to access. In this example, let's define a mutator for the `first_name` attribute. This mutator will be automatically called when we attempt to set the value of the `first_name` attribute on the model:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * Set the user's first name.
         *
         * @param  string  $value
         * @return string
         */
        public function setFirstNameAttribute($value)
        {
            $this->attributes['first_name'] = strtolower($value);
        }
    }

The mutator will receive the value that is being set on the attribute, allowing you to manipulate the value and set the manipulated value on the model's internal `$attributes` property. For example, if we attempt to set the `first_name` attribute to `Sally`:

    $user = User::find(1);

    $user->first_name = 'Sally';

Here the `setFirstNameAttribute` function will be called with the value `Sally`. The mutator will then apply the `strtolower` function to the name and set its value in the internal `$attributes` array.

<a name="date-mutators"></a>
## Date mutators

By default, Models in October will convert the `created_at` and `updated_at` columns to instances of a [Carbon](https://github.com/briannesbitt/Carbon) object, which provides an assortment of helpful methods and extends the native PHP `DateTime` class.

You may customize which fields are automatically mutated, and even completely disable this mutation, by overriding the `$dates` property of your model:

    class User extends Model
    {
        /**
         * The attributes that should be mutated to dates.
         *
         * @var array
         */
        protected $dates = ['created_at', 'updated_at', 'disabled_at'];
    }

When a column is considered a date, you may set its value to a UNIX timestamp, date string (`Y-m-d`), date-time string, and of course a `DateTime` / `Carbon` instance, and the date's value will automatically be correctly stored in your database:

    $user = User::find(1);

    $user->disabled_at = Carbon::now();

    $user->save();

As noted above, when retrieving attributes that are listed in your `$dates` property, they will automatically be cast to [Carbon](https://github.com/briannesbitt/Carbon) instances, allowing you to use any of Carbon's methods on your attributes:

    $user = User::find(1);

    return $user->disabled_at->getTimestamp();

By default, timestamps are formatted as `'Y-m-d H:i:s'`. If you need to customize the timestamp format, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

    class Flight extends Model
    {
        /**
         * The storage format of the model's date columns.
         *
         * @var string
         */
        protected $dateFormat = 'U';
    }

<a name="attribute-casting"></a>
## Attribute casting

The `$casts` property on your model provides a convenient method of converting attributes to common data types. The `$casts` property should be an array where the key is the name of the attribute being cast, while the value is the type you wish to cast to the column to. The supported cast types are: `integer`, `real`, `float`, `double`, `string`, `boolean`, `object` and `array`.

For example, let's cast the `is_admin` attribute, which is stored in our database as an integer (`0` or `1`) to a boolean value:

    class User extends Model
    {
        /**
         * The attributes that should be casted to native types.
         *
         * @var array
         */
        protected $casts = [
            'is_admin' => 'boolean',
        ];
    }

Now the `is_admin` attribute will always be cast to a boolean when you access it, even if the underlying value is stored in the database as an integer:

    $user = User::find(1);

    if ($user->is_admin) {
        //
    }

#### Array casting

The `array` cast type is particularly useful when working with columns that are stored as serialized JSON. For example, if your database has a `TEXT` field type that contains serialized JSON, adding the `array` cast to that attribute will automatically deserialize the attribute to a PHP array when you access it on your Eloquent model:

    class User extends Model
    {
        /**
         * The attributes that should be casted to native types.
         *
         * @var array
         */
        protected $casts = [
            'options' => 'array',
        ];
    }

Once the cast is defined, you may access the `options` attribute and it will automatically be deserialized from JSON into a PHP array. When you set the value of the `options` attribute, the given array will automatically be serialized back into JSON for storage:

    $user = User::find(1);

    $options = $user->options;

    $options['key'] = 'value';

    $user->options = $options;

    $user->save();
