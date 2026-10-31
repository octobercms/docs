---
previousPath: extend/forms/form-controller.md
subtitle: Add Create, Update and Preview pages for a model to a backend controller.
---
# Form Controller

The `Backend\Behaviors\FormController` behavior adds pages for creating, updating and previewing a model's records to a backend controller. Use it whenever backend users need to edit records through a form.

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';
}
```

The behavior provides the `create`, `update` and `preview` actions, so you don't define them in the controller. You supply three things: a [configuration file](#configuring-the-form-controller), a [form fields file](#defining-form-fields) and a [view file](#creating-the-form-views) for each page. The Preview page is a read-only version of the Update page.

::: tip
The form controller is often used together with the [list controller](../lists/list-controller.md) in the same controller. The `create:controller` command generates a controller with both behaviors, their configuration files and views. See [Controllers](../panel/controllers.md).
:::

## Configuring the Form Controller

Place the file named in `$formConfig` in the [controller's views directory](../panel/views.md). It names the record, points to the form fields file and the model class, and sets a title for each page.

```yaml
# config_form.yaml
name: Blog Category
form: $/acme/blog/models/category/fields.yaml
modelClass: Acme\Blog\Models\Category
defaultRedirect: acme/blog/categories

create:
    title: New Blog Category

update:
    title: Edit Blog Category

preview:
    title: View Blog Category
```

The `name`, `form` and `modelClass` properties are required. The `defaultRedirect` property is the page to open after saving when a page does not define its own redirect. Define a `create`, `update` or `preview` section for each page you want to support.

See [config_form.yaml](../../handbook/controller-config/form.md) for every option, including redirects, custom messages, permissions and form designs.

## Defining Form Fields

::: aside
The available form field properties can be found on the [form field definitions](../../handbook/form-fields.md) page.
:::

The form fields file tells the behavior which controls to create and which model attributes they are bound to. Place it in a subdirectory of the plugin's **models** directory, named after the model class in lowercase. The file name doesn't matter, but **fields.yaml** and **form_fields.yaml** are common names.

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← Config Directory_
|               |   └── fields.yaml  _← Config File_
|               └── Post.php  _← Model Class_
:::

Fields can be placed in three areas: the **outside area**, the **primary tabs** and the **secondary tabs**. The following example shows a typical form fields file.

```yaml
# fields.yaml
fields:
    blog_title:
        label: Blog Title
        description: The title for this blog

    published_at:
        label: Published date
        description: When this blog post was published
        type: datepicker

    # [...]

tabs:
    fields:
        # [...]

secondaryTabs:
    fields:
        # [...]
```

## Creating the Form Views

Each page needs a [view file](../panel/views.md) with a matching name: **create.php**, **update.php** and **preview.php**. The behavior adds the following methods to the controller for rendering the form in these views.

Method | Description
------------- | -------------
**formRender** | renders the form controls configured in the form fields file.
**formRenderPreview** | renders the form in read-only mode.
**formRenderDesign** | renders the form using a [form design](../../handbook/controller-config/form.md#form-designs).

::: tip
A [form design](../../handbook/controller-config/form.md#form-designs) generates the page contents for you. With the `popup` display mode you don't need any view files at all.
:::

### Create View

The **create.php** view is the Create page, where users create new records. It contains the form and its buttons. The save button's **data-request** attribute calls the `onSave` AJAX handler provided by the behavior.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Creating Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Create and Close
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

The views generated by the `create:controller` command also include breadcrumbs.

### Update View

The **update.php** view is the Update page, where users update or delete existing records. It is similar to the Create page and usually adds a Delete button. The save button calls the `onSave` AJAX handler and the delete button calls the `onDelete` AJAX handler, both provided by the behavior.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Saving Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Save and Close
            </button>
            <button
                type="button"
                class="oc-icon-trash-o btn-icon danger pull-right"
                data-request="onDelete"
                data-request-message="Deleting Category..."
                data-request-confirm="Do you really want to delete this category?">
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

### Preview View

The **preview.php** view is the Preview page, where users view existing records in read-only mode.

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

### Warning About Unsaved Changes

To track unsaved changes and show a warning when the user navigates away from the form, add the `data-change-monitor` attribute to the form opening tag.

```php
<?= Form::open(['class' => '...', 'data-change-monitor' => true]) ?>
```

## Validating Form Fields

Validation rules belong to the model, not the form. Add the [Validation trait](../data/model-traits/validation.md) to your model, and its rules are checked when the form saves the record.

#### See Also

::: also
* [Field Dependencies](./field-dependencies.md)
* [Extending the Form Controller](./extending.md)
* [config_form.yaml](../../handbook/controller-config/form.md)
* [Form Designs in config_form.yaml](../../handbook/controller-config/form.md#form-designs)
* [Form Fields](../../handbook/form-fields.md)
:::
