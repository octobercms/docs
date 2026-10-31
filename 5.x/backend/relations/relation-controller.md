---
previousPath: extend/forms/relation-controller.md
subtitle: Manage a model's related records, such as comments or line items, from inside a backend form.
---
# Relation Controller

The `Backend\Behaviors\RelationController` behavior manages the related records of a [model](../data/models.md) on a backend page, such as the comments on a post or the line items on an invoice. Use it to let users create, add, update and remove related records without leaving the parent record.

```php
namespace Acme\Projects\Controllers;

class Projects extends Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\RelationController::class
    ];

    public $formConfig = 'config_form.yaml';
    public $relationConfig = 'config_relation.yaml';
}
```

The behavior works with the [relationships](../data/relation-types.md) defined on your model. You supply a [configuration file](#configuring-the-relation-controller) for each relationship you want to manage, then [render the relation manager](#displaying-a-relation-manager) in a view.

::: tip
The relation controller is usually used together with the [form controller](../forms/form-controller.md).
:::

## Configuring the Relation Controller

Place the file named in `$relationConfig` in the [controller's views directory](../panel/views.md). Each top-level key is the name of a relationship on the model. For example, a `Project` model that defines a `comments` relationship uses a `comments` key.

```yaml
# config_relation.yaml
comments:
    label: Comment
    view:
        list: $/acme/projects/models/comment/columns.yaml
        toolbarButtons: create|delete
    manage:
        form: $/acme/projects/models/comment/fields.yaml
```

The `label` property names the relation in the singular tense and is required. The `view` section configures the list or form shown on the page, and the `manage` section configures the popup used to create or select records. The required configuration depends on the relationship type.

See [config_relation.yaml](../../handbook/controller-config/relation.md) for every option, and [Relationship Types](../../handbook/controller-config/relation.md#relationship-types) for an example of each type.

## Displaying a Relation Manager

Before relations can be managed on a page, the controller must initialize the target model by calling the `initRelation` method.

```php
$post = Post::where('id', 7)->first();
$this->initRelation($post);
```

::: tip
The [form controller](../forms/form-controller.md) initializes the model automatically on its create, update and preview actions.
:::

Then display the relation manager for a relation definition by calling the `relationRender` method. For example, to display the relation manager on the [Preview](../forms/form-controller.md#preview-view) page, the **preview.php** view could look like this.

```php
<?= $this->formRenderPreview() ?>

<?= $this->relationRender('comments') ?>
```

### Rendering in Read-Only Mode

To render the relation manager in read-only mode, pass the `readOnly` property in the second argument.

```php
<?= $this->relationRender('comments', ['readOnly' => true]) ?>
```

#### See Also

::: also
* [Extending the Relation Controller](./extending.md)
* [config_relation.yaml](../../handbook/controller-config/relation.md)
* [Relationship Types in config_relation.yaml](../../handbook/controller-config/relation.md#relationship-types)
* [Sorting Related Records](../lists/sorting.md#sorting-related-records)
* [Relation Types](../data/relation-types.md)
:::
