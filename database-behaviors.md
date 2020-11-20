# Database Behaviors

- [Purgeable](#purgeable)
- [Sortable](#sortable)

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
        public $purgeable = [];
    }
    
You can also dynamically implement this behavior in a class.

    /**
     * Extend the RainLab.User user model to implement the purgeable behavior.
     */
    RainLab\User\Models\User::extend(function($model) {

        // Implement the purgeable behavior dynamically
        $model->implement[] = 'October.Rain.Database.Behaviors.Purgeable';

        // Declare the purgeable property dynamically for the purgeable behavior to use
        $model->addDynamicProperty('purgeable', []);
    });

The defined attributes will be purged when the model is saved, before the [model events](#model-events)
are triggered, including validation. Use the `getOriginalPurgeValue` to find a value that was purged.

    return $user->getOriginalPurgeValue($propertyName);

<a name="sortable"></a>
## Sortable

Sorted models will store a number value in `sort_order` which maintains the sort order of each individual model in a collection. To store a sort order for your models, implement the `October\Rain\Database\Behaviors\Sortable` behavior and ensure that your schema has a column defined for it to use (example: `$table->integer('sort_order')->default(0);`).

    class User extends Model
    {
        public $implement = [
            'October.Rain.Database.Behaviors.Sortable'
        ];
    }

You can also dynamically implement this behavior in a class.

    /**
     * Extend the RainLab.User user model to implement the sortable behavior.
     */
    RainLab\User\Models\User::extend(function($model) {

        // Implement the sortable behavior dynamically
        $model->implement[] = 'October.Rain.Database.Behaviors.Sortable';
    });

You may modify the key name used to identify the sort order by defining the `SORT_ORDER` constant:

    const SORT_ORDER = 'my_sort_order_column';

Use the `setSortableOrder` method to set the orders on a single record or multiple records.

    // Sets the order of the user to 1...
    $user->setSortableOrder($user->id, 1);

    // Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
    $user->setSortableOrder([1, 2, 3], [3, 2, 1]);

> **Note:** If implementing this behavior in a model where data (rows) already existed previously, the data set may need to be initialized before this behavior will work correctly. To do so, either manually update each row's `sort_order` column or run a query against the data to copy the record's `id` column to the `sort_order` column (ex. `UPDATE myvendor_myplugin_mymodelrecords SET sort_order = id`).
