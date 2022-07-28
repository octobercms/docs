---
subtitle: Adds form management features to any backend page.
---
# Form Controller

The `Backend\Behaviors\FormController` class is a controller behavior used for easily adding form functionality to a backend page. The behavior provides three pages called Create, Update and Preview. The Preview page is a read-only version of the Update page. When you use the form behavior you don't need to define the `create`, `update` and `preview` actions in the controller - the behavior does it for you. However you should provide the corresponding view files.

Form behavior depends on form [field definitions](../../element/definitions.md) and a [model class](../database/model.md). In order to use the form behavior you should add it to the `$implement` property of the controller class. Also, the `$formConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior properties.

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

::: tip
Very often the form and [list controller](../lists/list-controller.md) are used together in a same controller.
:::

## Configuring the Form Behavior

The configuration file referred in the `$formConfig` property is defined in YAML format. The file should be placed into the [controller's view directory](../system/views.md). Below is an example of a typical form behavior configuration file.

```yaml
# config_form.yaml
name: Blog Category
form: $/acme/blog/models/post/fields.yaml
modelClass: Acme\Blog\Post

create:
    title: New Blog Post

update:
    title: Edit Blog Post

preview:
    title: View Blog Post
```

The following properties are required in the form configuration file.

Property | Description
------------- | -------------
**name** | the name of the object being managed by this form.
**form** | a configuration array or reference to a form field definition file, see [form fields](../../element/definitions.md).
**modelClass** | a model class name, the form data is loaded and saved against this model.

The configuration properties listed below are optional. Define them if you want the form behavior to support the Create, Update or Preview pages.

Property | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**create** | a configuration array or reference to a config file for the Create page.
**update** | a configuration array or reference to a config file for the Update page.
**preview** | a configuration array or reference to a config file for the Preview page.
**customMessages** | customize the messages used in the Form Controllers.
**permissions** | apply restrictions to certain actions provided by the Form Controller.

### Create Page

To support the Create page add the following configuration to the YAML file.

```yaml
create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
```

The following properties are supported for the Create page.

Property | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../system/localization.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and the **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the create page only.

### Update Page

To support the Update page add the following configuration to the YAML file.

```yaml
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
```

The following properties are supported for the Update page.

Property | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../system/localization.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the update page only.

### Preview Page

To support the Preview page add the following configuration to the YAML file:

```yaml
preview:
    title: View Blog Post
```

The following properties are supported for the Preview page.

Property  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../system/localization.md).
**form** | overrides the default form fields definitions for the preview page only.

### Custom Messages

Specify the `customMessages` property to override the default messages used by the Form Controller. The values can be plain text or can refer to a [localization string](../system/localization.md).

```yaml
customMessages:
    notFound: Did not find the thing
    flashCreate: New thing created
    flashUpdate: Updated that thing
    flashDelete: Thing is gone
```

You may also modify messages in the context of the form being displayed. The following will override the `notFound` message for the `update` context only.

```yaml
update:
    customMessages:
        notFound: Nothing found when updating
```

The following messages are available to override as custom messages.

::: details View the list of available messages
Message | Default Message
------------- | -------------
**notFound** | Form record with an ID of :id could not be found.
**flashCreate** | :name Created
**flashUpdate** | :name Updated
**flashDelete** | :name Deleted
:::

### Restricting with Permissions

Specify the `permissions` property to apply restrictions to actions provided by the Form Controller. Use [permission values](../backend/permissions.md) that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

```yaml
permissions:
    modelCreate: admins.manage.create
    modelDelete: admins.manage.delete
```

The following properties are available to override as required permissions.

::: details View the list of available messages
Message | Default Message
------------- | -------------
**modelCreate** | required to create new records.
**modelUpdate** | required to modify existing records.
**modelPreview** | required to preview existing records.
**modelDelete** | required to delete existing records.
:::

## Defining Form Fields

Form fields are defined with the YAML file. The form fields configuration is used by the form behavior for creating the form controls and binding them to the model fields. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but **fields.yaml** and **form_fields.yaml** are common names. Example form fields file location:

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← Config Directory_
|               |   └── fields.yaml  _← Config File_
|               └── Post.php  _← Model Class_
:::

Fields can be placed in three areas, the **outside area**, **primary tabs** or **secondary tabs**. The next example shows the typical contents of a form fields definition file.

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

### Field Properties

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered, see [form field definitions](../../element/definitions.md). Default: `text`.
**span** | aligns the form field to one side. Options: `auto`, `left`, `right`, `row`, `full`. Default: `full`.
**spanClass** | used with the span `row` property to display the form as a Bootstrap grid, for example, `spanClass: col-xs-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field. Options: `tiny`, `small`, `large`, `huge`, `giant`.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Options: `true`, `false`.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**defaultFrom** | takes the default value from the value of another field.
**tab** | assigns the field to a tab.
**cssClass** | assigns a CSS class to the field container.
**readOnly** | prevents the field from being modified. Options: `true`, `false`.
**disabled** | prevents the field from being modified and excludes it from the saved data. Options: `true`, `false`.
**hidden** | hides the field from the view and excludes it from the saved data. Options: `true`, `false`.
**stretch** | specifies if this field stretches to fit the parent height.
**context** | specifies what context should be used when displaying the field. Context can also be passed by using an `@` symbol in the field name, for example, `name@update`.
**dependsOn** | an array of other field names this field [depends on](./field-dependencies.md), when the other fields are modified, this field will update.
**changeHandler** | the name of an AJAX handler to call when the field value is changed, optional.
**trigger** | specify conditions for this field using [trigger events](../../element/field-conditions.md).
**preset** | allows the field value to be initially set by the value of another field, converted using the [input preset converter](../../element/field-conditions.md).
**required** | places a red asterisk next to the field label to indicate it is required. Be sure to use the [validation trait on the model](../database/traits.md) as this is not enforced by the form controller.
**attributes** | specify custom HTML attributes to add to the form field element.
**containerAttributes** | specify custom HTML attributes to add to the form field container.
**order** | a numerical weight when determining the display order, default value increments at 100 points per field.
**permissions** | the [permissions](../backend/permissions.md) that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

### Tab Properties

An example of specifying field definitions in tabs.

```yaml
tabs:
    fields:
        username:
            type: text
            label: Username
            tab: User

        groups:
            type: relation
            label: Groups
            tab: Groups
```

For each tab definition, namely `tabs` and `secondaryTabs`, you can specify these properties.

Property | Description
------------- | -------------
**stretch** | specifies if this tab stretches to fit the parent height.
**defaultTab** | the default tab to assign fields to. Default: Misc.
**activeTab** | selected tab when the form first loads, name or index. Default: `1`
**icons** | assign icons to tabs using tab names as the key.
**lazy** | array of tabs to be loaded dynamically when clicked. Useful for tabs that contain large amounts of content.
**linkable** | determines if the tabs can be linked using URL fragments. Default: `true`
**cssClass** | assigns a CSS class to the tab container.
**paneCssClass** | assigns a CSS class to an individual tab pane. Value is an array, key is tab index or label, value is the CSS class. It can also be specified as a string, in which case the value will be applied to all tabs.

An example applying properties to tabs.

```yaml
tabs:
    stretch: true
    defaultTab: User
    cssClass: text-blue

    lazy:
        - Groups

    paneCssClass:
        1: first-tab
        2: second-tab

    icons:
        User: icon-user
        Groups: icon-group

    fields:
        # [...]
```

### Custom Field Types

There are various native field types that can be used for the **type** setting. To learn more, take a look at the available [form field definitions](../../element/definitions.md). It is possible to render a field directly by specifying the PHP class name of a [form field widget](form-widgets.md).

```yaml
blog_content:
    type: Backend\FormWidgets\RichEditor
    size: huge
```

### Nested Field Selection

```yaml
avatar[name]:
    label: Avatar
    comment: will be saved in the Avatar table
```

The above example would fetch and save the value in PHP equivalent of `$record->avatar->name` or `$record->avatar['name']` respectively.

### Field Facades

Sometimes you may need to display a field while preventing it from being submitted. A field can be defined as a facade by adding an underscore (\_) before the name of the field. These fields are purged automatically and no longer saved to the model, such as with the following `_map` field.

```yaml
address:
    label: Title
    type: text

_map:
    label: Point your address on the map
    type: mapviewer
```

## Form Views

For each page your form supports Create, Update and Preview you should provide a [view file](../backend/controllers-ajax.md) with the corresponding name - **create.htm**, **update.htm** and **preview.htm**.

The form behavior adds two methods to the controller class: `formRender` and `formRenderPreview`. These methods render the form controls configured with the YAML file described above.

### Create View

The **create.htm** view represents the Create page that allows users to create new records. A typical Create page contains breadcrumbs, the form itself, and the form buttons. The **data-request** attribute should refer to the `onSave` AJAX handler provided by the form behavior. Below is a contents of the typical create.htm form.

```php
<?= Form::open(['class'=>'layout']) ?>

    <div class="layout-row">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div class="loading-indicator-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="close:true"
                data-hotkey="ctrl+enter, cmd+enter"
                data-load-indicator="Creating Category..."
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

### Update View

The **update.htm** view represents the Update page that allows users to update or delete existing records. A typical Update page contains breadcrumbs, the form itself, and the form buttons. The Update page is very similar to the Create page, but usually has the Delete button. The **data-request** attribute should refer to the `onSave` AJAX handler provided by the form behavior. Below is a contents of the typical update.htm form.

```php
<?= Form::open(['class'=>'layout']) ?>

    <div class="layout-row">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div class="loading-indicator-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="close:true"
                data-hotkey="ctrl+enter, cmd+enter"
                data-load-indicator="Saving Category..."
                class="btn btn-default">
                Save and Close
            </button>
            <button
                type="button"
                class="oc-icon-trash-o btn-icon danger pull-right"
                data-request="onDelete"
                data-load-indicator="Deleting Category..."
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

The **preview.htm** view represents the Preview page that allows users to preview existing records in the read-only mode. A typical Preview page contains breadcrumbs and the form itself. Below is a contents of the typical preview.htm form.

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

## Extending Form Behavior

Sometimes you may wish to modify the default form behavior and there are several ways you can do this.

### Extending the Form Configuration

You may extend the form configuration dynamically using the `formGetConfig` method.

```php
public function formGetConfig()
{
    $config = $this->asExtension('FormController')->formGetConfig();

    // Set the active tab dynamically
    $config->form['tabs']['activeTab'] = 'Content';

    return $config;
}
```

### Overriding Controller Action

You can use your own logic for the `create`, `update` or `preview` action method in the controller, then optionally call the Form behavior parent method.

```php
public function update($recordId, $context = null)
{
    //
    // Do any custom code here
    //

    // Call the FormController behavior update() method
    return $this->asExtension('FormController')->update($recordId, $context);
}
```

### Overriding Controller Redirect

You can specify the URL to redirect to after the model is saved by overriding the `formGetRedirectUrl` method. This method returns the location to redirect to with relative URLs being treated as backend URLs.

```php
public function formGetRedirectUrl($context = null, $model = null)
{
    return 'https://octobercms.com';
}
```

### Extending Form Model Query

The lookup query for the form [database model](../database/model.md) can be extended by overriding the `formExtendQuery` method inside the controller class. This example will ensure that soft deleted records can still be found and updated, by applying the **withTrashed** scope to the query:

```php
public function formExtendQuery($query)
{
    $query->withTrashed();
}
```

### Extending Form Fields

You can extend the fields of another controller from outside by calling the `extendFormFields` static method on the controller class. This method can take three arguments, **$form** will represent the Form widget object, **$model** represents the model used by the form and **$context** is a string containing the form context. Take this controller for example:

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';
}
```

Using the `extendFormFields` method you can add extra fields to any form rendered by this controller. Since this has the potential to affect all forms used by this controller, it is a good idea to check the **$model** is of the correct type. Here is an example:

```php
Categories::extendFormFields(function($form, $model, $context) {
    if (!$model instanceof MyModel) {
        return;
    }

    $form->addFields([
        'my_field' => [
            'label'   => 'My Field',
            'comment' => 'This is a custom field I have added.',
        ],
    ]);

});
```

You can also extend the form fields internally by overriding the `formExtendFields` method inside the controller class. This will only affect the form used by the `FormController` behavior.

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function formExtendFields($form)
    {
        $form->addFields([...]);
    }
}
```

The following methods are available on the $form object.

Method | Description
------------- | -------------
**addFields** | adds new fields to the outside area
**addTabFields** | adds new fields to the tabbed area
**addSecondaryTabFields** | adds new fields to the secondary tabbed area
**removeField** | remove a field from any areas

Each method takes an array of fields similar to the [form field configuration](../../element/definitions.md).

<a id="oc-filtering-form-fields"></a>
### Filtering Form Fields

As described in the [field dependencies section](./field-dependencies.md), you may also implement form field filtering by extension by hooking in to the `form.filterFields` event.

```php
User::extend(function ($model) {
    $model->bindEvent('model.form.filterFields', function ($formWidget, $fields, $context) use ($model) {
        if ($model->source_type === 'http') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = true;
        }
        elseif ($model->source_type === 'git') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = false;
        }
        else {
            $fields->source_url->hidden = true;
            $fields->git_branch->hidden = true;
        }
    });
});
```

## Validating Form Fields

To validate the fields of your form you can make use of the [Validation trait](../database/traits.md) in your model.
