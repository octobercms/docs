---
subtitle: YAML files that configure the behaviors of backend controllers.
---
# Controller Config

Backend controllers implement behaviors that are configured using YAML files, usually found in the controller's view directory. Each behavior reads the file named by its controller property.

```php
class Posts extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\ListController::class
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';
}
```

## Available Files

The following configuration files are available.

File | Description
------------- | -------------
[`config_form.yaml`](./controller-config/form.md) | configures the form behavior for creating, updating and previewing records.
[`config_list.yaml`](./controller-config/list.md) | configures the list behavior for displaying and filtering records.
[`config_relation.yaml`](./controller-config/relation.md) | configures the relation behavior for managing related records.
[`config_import_export.yaml`](./controller-config/import-export.md) | configures the import and export behavior.
