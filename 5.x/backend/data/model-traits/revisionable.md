---
previousPath: extend/database/traits.md#revisionable
subtitle: Records the history of changes to attribute values.
---
# Revisionable

October CMS models can record the history of changes in values by storing revisions. To store revisions for your model, apply the `October\Rain\Database\Traits\Revisionable` trait and declare a `$revisionable` property with an array containing the attributes to monitor for changes. You also need to define a `$morphMany` [model relation](../relationships.md) called `revision_history` that refers to the `System\Models\Revision` class with the name `revisionable`, this is where the revision history data is stored.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Revisionable;

    protected $revisionable = ['name', 'email'];

    public $morphMany = [
        'revision_history' => [\System\Models\Revision::class, 'name' => 'revisionable']
    ];
}
```

By default a maximum number of 500 records will be kept, however, this can be modified by declaring a `$revisionableLimit` property on the model with a new limit value.

```php
/**
 * @var int revisionableLimit as the maximum number records to keep.
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
