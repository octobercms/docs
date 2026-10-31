---
previousPath: cms/tailor/models.md
subtitle: Read, create and extend Tailor records in PHP using the model class for each blueprint type.
---
# Tailor Models

Every Tailor record is a PHP model, so you can work with content from plugins, components and the PHP section of a page. Look up a blueprint by its handle to get a model query, then use it like any other database model.

```php
use Tailor\Models\EntryRecord;

$posts = EntryRecord::inSection('Blog\Post')->get();
```

## Choosing the Model Class

Each blueprint type uses its own model class.

Model Class | Blueprint Type
----------- | --------------
`Tailor\Models\EntryRecord` | entry
`Tailor\Models\StructureRecord` | structure
`Tailor\Models\StreamRecord` | stream
`Tailor\Models\SingleRecord` | single
`Tailor\Models\SubmissionRecord` | submission
`Tailor\Models\GlobalRecord` | global

## Retrieving Entries

Call the `inSection` static method on the model class (such as `EntryRecord`), passing the blueprint handle, to return a prepared [database model query](../../backend/data/query-builder.md). Use the `inSectionUuid` method to look up the blueprint by its UUID instead.

The `get` method runs the query and returns [a collection of records](../../backend/data/collection-methods.md).

```php
$records = EntryRecord::inSection('Blog\Post')->get();

$records = EntryRecord::inSectionUuid('a63fabaf-7c0b-4c74-b36f-7abf1a3ad1c1')->get();
```

### Retrieving a Single Entry

Combine a `where` constraint with the `first` method to find one record. The following finds the entry with the slug **first-post**.

```php
$record = EntryRecord::inSection('Blog\Post')->where('slug', 'first-post')->first();
```

### Retrieving a Single Blueprint Entry

When a blueprint uses the [single type](../../handbook/blueprint-types/single.md), use the `findSingleForSection` method to look up its entry, or the `findSingleForSectionUuid` method to look it up by UUID. These methods create the record if it does not exist yet.

```php
$record = SingleRecord::findSingleForSection('Homepage');

$record = SingleRecord::findSingleForSectionUuid('3328c303-7989-462e-b866-27e7037ba275');
```

## Creating and Updating Entries

The `inSection` method also returns a model you can fill and save. The following creates a new blog post entry. To update an existing record, retrieve it first and then save it the same way.

```php
$post = EntryRecord::inSection('Blog\Post');
$post->title = 'Imported Post';
$post->save();
```

## Retrieving a Global

Use the `Tailor\Models\GlobalRecord` model and call the `findForGlobal` static method, passing the handle. Use the `findForGlobalUuid` method to look up the global by its UUID instead.

```php
GlobalRecord::findForGlobal('Blog\Config');

GlobalRecord::findForGlobalUuid('7b193500-ac0b-481f-a79c-2a362646364d');
```

## Working With Related Fields

Related fields include [repeater fields](../../handbook/form-fields/repeater.md) and [entries fields](../../handbook/tailor-fields/entries.md). They need some extra steps to read and write.

### Eager Loading Relations

When reading related fields, eager load them on the collection using the `load` method. This loads the related content in a single query, which is best for performance.

The following eager loads the **categories** field, followed by an example that loads several related fields.

```php
$records->load('categories');

$records->load(['categories', 'author']);
```

### Creating Related Records

To write related fields, call the relation name as a method to return the relationship definition, then call the `create` method, which returns the newly created record.

The following finds the first post in the **Blog\Post** blueprint and creates an associated category.

```php
$post = EntryRecord::inSection('Blog\Post')->first();

$post->categories()->create(['title' => 'Test', 'price' => '100']);
```

Use the `make` method to create a new empty model instance.

```php
$category = $post->categories()->make();
```

If the category already exists, use the `add` method instead. The following adds the first blog category to the first blog post.

```php
$post = EntryRecord::inSection('Blog\Post')->first();
$category = EntryRecord::inSection('Blog\Category')->first();

$post->categories()->add($category);
```

::: tip
See the [relationships article](../../backend/data/relationships.md) to learn more about model relationships.
:::

## Available Attributes

In addition to the fields defined in the blueprint, every entry has the following attributes.

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

### Structure Entry Attributes

The `StructureRecord` model extends the `EntryRecord` model and stores entries for the `structure` type, adding the following attributes.

Attribute | Description
-------- | -------------
**fullslug** | A slug identifier that includes parent slugs, for example, `parent-slug/child-slug`.
**parent** | The parent record for this entry, if available.
**children** | The child records for this entry, if available.

### Stream Entry Attributes

The `StreamRecord` model extends the `EntryRecord` model and stores entries for the `stream` type, adding the following attributes.

Attribute | Description
-------- | -------------
**published_at_day** | The numerical day the entry was published.
**published_at_month** | The numerical month the entry was published.
**published_at_year** | The numerical year the entry was published.

### Global Attributes

In addition to the defined fields, a `GlobalRecord` model has the following attributes.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.

## Extending Model Constructors

Similar to [extending regular models](../../backend/plugins/extending.md), you can extend the `EntryRecord` model constructor for a specific blueprint using the `extendInSection` method. Use the `extendInSectionUuid` method for more precise targeting.

```php
EntryRecord::extendInSection('Blog\Post', function($model) {
    $model->bindEvent('model.afterDelete', function () use ($model) {
        // Model has been deleted!
    });
});
```

The `GlobalRecord` model constructor supports the same approach with the `extendInGlobal` and `extendInGlobalUuid` methods.

```php
GlobalRecord::extendInGlobal('Blog\Config', function($model) {
    $model->bindEvent('model.beforeSave', function () use ($model) {
        // Model is about to be saved!
    });
});
```

::: tip
The `extendInSectionUuid` and `extendInGlobalUuid` methods do not throw an exception if the blueprint is not found.
:::

## Combining Tailor with Regular Models

In some cases you may want to combine Tailor models with [regular database models](../../backend/data/models.md), such as those defined by a plugin.

### Replacing the Entire Model

When a blueprint needs more complex functionality, use the `modelClass` blueprint property to resolve its records to your own model class.

```yaml
handle: Blog\Post
type: stream
name: Blog Post
modelClass: App\Models\TailorBlogPost
# ...
```

Your model must extend the exact model class used by the blueprint type. In this example, the class extends `StreamRecord` since the blueprint uses the `stream` type.

```php
namespace App\Models;

use Tailor\Models\StreamRecord;

class TailorBlogPost extends StreamRecord
{
    // Custom model logic goes here
}
```

Now, whenever the blueprint is resolved, it is an instance of the `TailorBlogPost` class.

### Linking Tailor Records to Regular Models

The `recordfinder` form field adds a relation from a Tailor record to a regular model. The **modelClass** refers to the model class, and the **list** property is required for singular relations, as specified by **maxItems**.

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Product
    list: $/acme/test/models/product/columns.yaml
    maxItems: 1
```

Learn more about the [record finder form field](../../handbook/form-fields/recordfinder.md).

### Linking Regular Models to Tailor Records

Since all Tailor records of a type share the same model class, your relationship definitions need to say which blueprint they point to. The `Tailor\Traits\BlueprintRelationModel` trait adds this ability, supporting Belongs To and Belongs To Many relationships.

With the `BlueprintRelationModel` trait in your model, add a `blueprint` property with the blueprint UUID to the relationship definition. The following defines a Belongs To relationship to the `Tailor\Models\EntryRecord` class called **author**.

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

### Building a Custom Content Field

You can also link to a regular model with a dedicated field type. For example, a customer content field can be hard coded to a `Customer` model class. This involves creating a custom Tailor field, which gives you complete access to the model and its database table.

Inside the content field class, the `extendModelObject` method extends the record model, and the `extendDatabaseTable` method adds a column to the database table.

```php
class MyContentField extends ContentFieldBase
{
    public function extendModelObject($model)
    {
        $model->belongsTo[$this->fieldName] = MyOtherModel::class;
    }

    public function extendDatabaseTable($table)
    {
        $table->integer($this->fieldName . '_id')->nullable();
    }
}
```

This takes more effort to set up, but the result is a field **type** that needs minimal configuration.

```yaml
myfield:
    label: My Field
    type: mycontentfield
```

Learn more about [building custom Tailor fields](../extending/tailor-fields.md).

#### See Also

::: also
* [Record Finder Form Field](../../handbook/form-fields/recordfinder.md)
* [Custom Tailor Fields](../extending/tailor-fields.md)
* [Database Models](../../backend/data/models.md)
:::
