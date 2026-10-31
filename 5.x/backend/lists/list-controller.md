---
previousPath: extend/lists/list-controller.md
subtitle: Add a searchable, sortable list of a model's records to a backend page.
---
# List Controller

The `Backend\Behaviors\ListController` behavior adds a sortable and searchable list of records to a backend page, with optional links on each record. Use it for the main page of any backend section that manages records.

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'config_list.yaml';
}
```

The behavior provides the `index` controller action. You supply a [configuration file](#configuring-the-list-controller), a [list columns file](#defining-list-columns) and an [index view](#displaying-the-list). The list can also be rendered on any other page, and a controller can use [multiple list definitions](#multiple-list-definitions).

::: tip
The list controller is often used together with the [form controller](../forms/form-controller.md) in the same controller. The `create:controller` command generates a controller with both behaviors, their configuration files and views. See [Controllers](../panel/controllers.md).
:::

## Configuring the List Controller

Place the file named in `$listConfig` in the [controller's views directory](../panel/views.md). It sets the list title, points to the list columns file and the model class, and links each record to another page.

```yaml
# config_list.yaml
title: Blog Categories
list: $/acme/blog/models/category/columns.yaml
modelClass: Acme\Blog\Models\Category
recordUrl: acme/blog/categories/update/:id
```

The `title`, `list` and `modelClass` properties are required. The `recordUrl` property links each record to another page, where the `:id` part is replaced with the record identifier. Use it to link the list to the Update page of the [form controller](../forms/form-controller.md).

See [config_list.yaml](../../handbook/controller-config/list.md) for every option, including pagination, checkboxes and default sorting.

### Adding a Toolbar and Search

To show buttons and a search box above the list, add a `toolbar` section. The `buttons` property names a controller partial, such as **_list_toolbar.php**, that holds the toolbar buttons.

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
```

The following partial adds a **New Category** button that opens the Create page of the form controller.

```php
<div data-control="toolbar">
    <a href="<?= Backend::url('acme/blog/categories/create') ?>"
        class="btn btn-primary">
        <i class="ph ph-plus"></i>
        New Category
    </a>
</div>
```

See [Adding a Toolbar](../../handbook/controller-config/list.md#adding-a-toolbar) for the toolbar and search options.

## Defining List Columns

::: aside
The available list column properties can be found on the [list column definitions](../../handbook/list-columns.md) page.
:::

The list columns file tells the behavior which model attributes to show in the table cells. Place it in a subdirectory of the plugin's **models** directory, named after the model class in lowercase. The file name doesn't matter, but **columns.yaml** and **list_columns.yaml** are common names.

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← Config Directory_
|               |   └── columns.yaml  _← Config File_
|               └── Post.php  _← Model Class_
:::

The following example shows a typical list columns file.

```yaml
# columns.yaml
columns:
    name: Name
    email: Email
```

## Displaying the List

Lists are usually displayed in the **index.php** [view file](../panel/views.md). Since the list includes its toolbar, the view only needs a single call to the `listRender` method.

```php
<?= $this->listRender() ?>
```

## Multiple List Definitions

The list behavior can show several lists in the same controller using named definitions. Define the `$listConfig` property as an array, where the key is the definition name and the value is the configuration file.

```php
public $listConfig = [
    'templates' => 'config_templates_list.yaml',
    'layouts' => 'config_layouts_list.yaml'
];
```

To display a definition, pass its name as the first argument of the `listRender` method.

```php
<?= $this->listRender('templates') ?>
```

#### See Also

::: also
* [Filtering Records](./filters.md)
* [Sorting Records](./sorting.md)
* [Extending the List Controller](./extending.md)
* [config_list.yaml](../../handbook/controller-config/list.md)
* [List Columns](../../handbook/list-columns.md)
:::
