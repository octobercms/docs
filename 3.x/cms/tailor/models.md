---
subtitle: The available models provided by Tailor.
---
# Models

This article describes how to interact with Tailor using PHP and the available models.

## Entry Record

The `Tailor\Models\EntryRecord` model is used to store content for an entry.

### Available Attributes

In addition to your defined form fields, the following attributes can be found on the retrieved model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.
**content_group** | The content group name, if used.
**title** | A title descriptor for the entry, for example, **My Blog Post**.
**slug** | A slug identifier for the entry, for example, `my-blog-post`.
**is_enabled** | Determines if the entry is currently visible.
**created_at** | The creation date for the entry.
**updated_at** | The last updated date for the entry.
**expired_at** | The expiry date for the entry.
**published_at** | The published date for the entry.
**published_at_date** | The published date, or if none is specified, the creation date.

#### Structure Entries

If an entry type is a `structure`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**fullslug** | A slug identifier that includes parent slugs, for example, `parent-slug/child-slug`.
**parent** | The parent record for this entry, if available.
**children** | The child records for this entry, if available.

#### Stream Entries

If an entry type is a `stream`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**published_at_day** | The numerical day the entry was published.
**published_at_month** | The numerical month the entry was published.
**published_at_year** | The numerical year the entry was published.

### Retrieving Multiple Entries

To work with an entry using PHP, you may use the `Tailor\Models\EntryRecord` model and call the `inSection` static method, passing the handle to return a prepared [database model query](../../extend/database/query.md). Alternatively, you can look it up using the UUID and the `inSectionUuid` method.

The following `get` method query returns [a collection of records](../../extend/services/collection.md).

```php
$records = EntryRecord::inSection('Blog\Post')->get();

$records = EntryRecord::inSectionUuid('a63fabaf-7c0b-4c74-b36f-7abf1a3ad1c1')->get();
```

### Retrieving a Single Entry

Combined with the `where` constraint, you may find a single record with the `first` method. The following will find an entry where the slug is equal to **first-post**.

```php
$record = EntryRecord::inSection('Blog\Post')->where('slug', 'first-post')->first();
```

If an [entry type](../tailor/blueprints.md) is set to `single`, you can use the `findSingleForSection` method to look up the entry. Likewise, the `findSingleForSectionUuid` can be used for looking up by the UUID. These methods will ensure a record exists during lookup.

```php
$record = EntryRecord::findSingleForSection('Homepage');

$record = EntryRecord::findSingleForSectionUuid('3328c303-7989-462e-b866-27e7037ba275');
```

### Inserting & Updating Entries

The `inSection` method can be used to create records dynamically. The following will create a new blog post entry. The same code can be used to update an existing record after retrieving it first.

```php
$post = EntryRecord::inSection('Blog\Post');
$post->title = 'Imported Post';
$post->save();
```

## Global Record

The `Tailor\Models\GlobalRecord` model is used to store content for a global.

### Available Attributes

In addition to the defined form fields, the following attributes can be found on the retrieved model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.

### Retrieving a Global Record

To look up a global using PHP, you may use the `Tailor\Models\GlobalRecord` model and call the `findForGlobal` static method, passing the handle. Alternatively, you can look it up using the UUID and the `findForGlobalUuid` method.

```php
GlobalRecord::findForGlobal('Blog\Config');

GlobalRecord::findForGlobalUuid('7b193500-ac0b-481f-a79c-2a362646364d');
```

## Working With Related Fields

Related fields can include [repeater fields](../../element/form/widget-repeater.md) and [entries fields](../../element/content/field-entries.md), and there are some extra steps needed to read and write to these fields.

### Eager Loading Relations

When reading related fields, you can eager load them on the collection using the `load` method. This method makes the related content available as a single query and is best for performance.

The following eager loads the **categories** field and adds it to the result, along with an example of passing multiple related fields.

```php
$records->load('categories');

$records->load(['categories', 'author']);
```

### Creating Related Fields

When writing related fields, you can call the relation name as a method to return the relationship definition, then a subsequent `create()` method can be called, which returns the newly created relation.

The following locates the first blog post in the **Blog\Post** section and then creates an assocaited category.

```php
$post = EntryRecord::inSection('Blog\Post')->first();

$post->categories()->create(['title' => 'Test', 'price' => '100']);
```

If the category already exists, use the `add()` method instead. The following adds the first blog category to the first blog post.

```php
$post = EntryRecord::inSection('Blog\Post')->first();
$category = EntryRecord::inSection('Blog\Category')->first();

$post->categories()->add($category);
```

::: tip
View the [relations article](../../extend/database/relations.md) to learn more about model relationships.
:::

## Extending Model Constructors

Similar to [extending regular models](../../extend/extending.md), you may extend the `EntryRecord` model constructor using the `extendInSection` method to target a specific blueprint. The `extendInSectionUuid` method can also be used for more precise targeting.

```php
EntryRecord::extendInSection('Blog\Post', function($model) {
    $model->bindEvent('model.afterDelete', function () use ($model) {
        // Model has been deleted!
    });
});
```

The `GlobalRecord` model constructor also supports extension using the `extendInGlobal` and `extendInGlobalUuid` methods to target a specific blueprint.

```php
GlobalRecord::extendInGlobal('Blog\Config', function($model) {
    $model->bindEvent('model.beforeSave', function () use ($model) {
        // Model has been saved!
    });
});
```

::: tip
The `extendInSectionUuid` and `extendInGlobalUuid` methods will not throw an exception if the blueprint is not found.
:::

## Extending Tailor Models

In some cases you may want to combine tailor models with [regular database models](../../extend/system/models.md).

### Associating Tailor to Regular Models

Introducing model relationships to tailor is when tailor will make a reference to a regular model, for example a model defined by a plugin. This involves creating a custom tailor field that will give complete access to the model and database tables.

Inside the content field class definition, the `extendModelObject` method allows the content field to extend the record model, along with `extendDatabaseTable` to add a column to the database table.

```php
class MyContentField extends ContentFieldBase
{
    public function extendModelObject($model)
    {
        $model->belongsTo[$this->fieldName] = MyOtherModel::class;
    }

    public function extendDatabaseTable($table)
    {
        $table->mediumText($this->fieldName . '_id')->nullable();
    }
}
```

Learn more about building [custom tailor fields here](../../extend/tailor-fields.md).

### Associating Regular Models to Tailor

Since all tailor models share the same model class, some additional attributes are needed in your relationship definitions. The `Tailor\Traits\BlueprintRelationModel` implements these attributes to reference tailor models, supporting Belongs To and Belongs To Many relationships.

When the trait `BlueprintRelationModel` is implemented in your models, you can supply a `blueprint` property along with the blueprint UUID referencing the tailor blueprint. The following will establish a Belongs To relationship to the `Tailor\Models\EntryRecord` class called **author**.

```php
class Product extends Model
{
    use \Tailor\Traits\BlueprintRelationModel;

    public $belongsTo = [
        'author' => [
            \Tailor\Models\EntryRecord::class,
            'blueprint' => '6947ff28-b660-47d7-9240-24ca6d58aeae'
        ]
    ];
}
```
