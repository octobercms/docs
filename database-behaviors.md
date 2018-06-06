# Database Behaviors

- [Purgeable](#purgeable)

Model behaviors are used to implement common functionality.  
Unlike [Traits](traits) these can be implemented either directly
in a class or by extending the class. You can read more about behaviors [here](../services/behaviors).

<a name="purgeable"></a>
## Purgeable

Purged attributes will not be saved to the database when a model is created or updated. To purge
attributes in your model, implement the `October.Rain.Database.Behaviors.Purgeable` behavior and declare
a `$purgeable` property with an array containing the attributes to purge.

    class User extends Model
    {
        public $implement = [
            'October.Rain.Database.Behaviors.Purgeable'
        ];

        /**
         * @var array List of attributes to purge.
         */
        public $purgeable = ['purgeable'];
    }
    
You can also dynamically implement this behavior in a class.

    /**
     * Extend the RainLab.User user model to implement the purgeable behavior.
     */
    RainLab\User\Models\User::extend(function($model) {

        // Implement the purgeable behavior dynamically
        $model->implement[] = 'October.Rain.Database.Behaviors.Purgeable';
        
        // Declare the purgeable property dynamically for the purgeable behavior to use
        $model->addDynamicProperty('purgeable', ['purgeable']]);
    });

> **Note**: Implementing this behavior will require the $purgeable property to have a reference to
itself so that the model won't try and save the $purgeable property to the database.

The defined attributes will be purged when the model is saved, before the [model events](#model-events)
are triggered, including validation. Use the `getOriginalPurgeValue` to find a value that was purged.

    return $user->getOriginalPurgeValue($propertyName);
