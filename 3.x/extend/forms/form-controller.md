---
subtitle: Adds form management features to any backend page.
---
# Form Controller

The `Backend\Behaviors\FormController` class is a controller behavior used for easily adding form functionality to a backend page. The behavior provides three pages called Create, Update and Preview. The Preview page is a read-only version of the Update page. When you use the form behavior you don't need to define the `create`, `update` and `preview` actions in the controller - the behavior does it for you. However you should provide the corresponding view files.

Form behavior depends on form [field definitions](../../element/definitions.md) and a [model class](../database/model.md). In order to use the form behavior you should add it to the `$implement` property of the controller class. Also, the `$formConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

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

> **Note**: Very often the form and [list behavior](../backend/lists.md) are used together in a same controller.

## Configuring the Form Behavior

The configuration file referred in the `$formConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-ajax.md). Below is an example of a typical form behavior configuration file.

```yaml
# ===================================
#  Form Behavior Config
# ===================================

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

The following fields are required in the form configuration file.

Field | Description
------------- | -------------
**name** | the name of the object being managed by this form.
**form** | a configuration array or reference to a form field definition file, see [form fields](../../element/definitions.md).
**modelClass** | a model class name, the form data is loaded and saved against this model.

The configuration options listed below are optional. Define them if you want the form behavior to support the [Create](#oc-create-page), [Update](#oc-update-page) or [Preview](#oc-preview-page) pages.

Option | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**create** | a configuration array or reference to a config file for the Create page.
**update** | a configuration array or reference to a config file for the Update page.
**preview** | a configuration array or reference to a config file for the Preview page.

<a id="oc-create-page"></a>
### Create Page

To support the Create page add the following configuration to the YAML file.

```yaml
create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
```

The following configuration options are supported for the Create page.

Option | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and the **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the create page only.

<a id="oc-update-page"></a>
### Update Page

To support the Update page add the following configuration to the YAML file.

```yaml
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
```

The following configuration options are supported for the Update page.

Option | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the update page only.

<a id="oc-preview-page"></a>
### Preview Page

To support the Preview page add the following configuration to the YAML file:

```yaml
preview:
    title: View Blog Post
```

The following configuration options are supported for the Preview page.

Option  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization.md).
**form** | overrides the default form fields definitions for the preview page only.

### Custom Messages

Specify the `customMessages` option to override the default messages used by the Form Controller. The values can be plain text or can refer to a [localization string](../plugin/localization.md).

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
notFound | Form record with an ID of :id could not be found.
flashCreate | :name Created
flashUpdate | :name Updated
flashDelete | :name Deleted
:::

## Defining Form Fields

Form fields are defined with the YAML file. The form fields configuration is used by the form behavior for creating the form controls and binding them to the model fields. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but **fields.yaml** and **form_fields.yaml** are common names. Example form fields file location:

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post            _<== Config Directory_
|               |   └── fields.yaml _<== Config File_
|               └── Post.php        _<== Model Class_
:::

Fields can be placed in three areas, the **outside area**, **primary tabs** or **secondary tabs**. The next example shows the typical contents of a form fields definition file.

```yaml
# ===================================
#  Form Field Definitions
# ===================================

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

<a id="oc-field-options"></a>
### Field Options

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered, see [form field definitions](../../element/definitions.md). Default: text.
**span** | aligns the form field to one side. Options: auto, left, right, row, full. Default: full.
**spanClass** | used with the span `row` option to display the form as a Bootstrap grid, for example, `spanClass: col-xs-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field. Options: tiny, small, large, huge, giant.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Options: true, false.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**defaultFrom** | takes the default value from the value of another field.
**tab** | assigns the field to a tab.
**cssClass** | assigns a CSS class to the field container.
**readOnly** | prevents the field from being modified. Options: true, false.
**disabled** | prevents the field from being modified and excludes it from the saved data. Options: true, false.
**hidden** | hides the field from the view and excludes it from the saved data. Options: true, false.
**stretch** | specifies if this field stretches to fit the parent height.
**context** | specifies what context should be used when displaying the field. Context can also be passed by using an `@` symbol in the field name, for example, `name@update`.
**dependsOn** | an array of other field names this field [depends on](#oc-field-dependencies), when the other fields are modified, this field will update.
**trigger** | specify conditions for this field using [trigger events](#oc-trigger-events).
**preset** | allows the field value to be initially set by the value of another field, converted using the [input preset converter](#oc-input-preset-converter).
**required** | places a red asterisk next to the field label to indicate it is required. Be sure to use [validation on the model](../database/traits.md#oc-validation) as this is not enforced by the form controller.
**attributes** | specify custom HTML attributes to add to the form field element.
**containerAttributes** | specify custom HTML attributes to add to the form field container.
**permissions** | the [permissions](users.md#oc-users-and-permissions) that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

### Nested Field Selection


```yaml
avatar[name]:
    label: Avatar
    comment: will be saved in the Avatar table
```

The above example would fetch and save the value in PHP equivalent of `$record->avatar->name` or `$record->avatar['name']` respectively.

### Tab Options

For each tab definition, namely `tabs` and `secondaryTabs`, you can specify these options:

Option | Description
------------- | -------------
**stretch** | specifies if this tab stretches to fit the parent height.
**defaultTab** | the default tab to assign fields to. Default: Misc.
**activeTab** | selected tab when the form first loads, name or index. Default: 1
**icons** | assign icons to tabs using tab names as the key.
**lazy** | array of tabs to be loaded dynamically when clicked. Useful for tabs that contain large amounts of content.
**linkable** | determines if the tabs can be linked using URL fragments. Default: true
**cssClass** | assigns a CSS class to the tab container.
**paneCssClass** | assigns a CSS class to an individual tab pane. Value is an array, key is tab index or label, value is the CSS class. It can also be specified as a string, in which case the value will be applied to all tabs.

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
        username:
            type: text
            label: Username
            tab: User

        groups:
            type: relation
            label: Groups
            tab: Groups
```

### Custom Field Types

There are various native field types that can be used for the **type** setting. To learn more, take a look at the available [form field definitions](../../element/definitions.md). It is possible to render a field directly by specifying the PHP class name of a [form field widget](form-widgets.md).

```yaml
blog_content:
    type: Backend\FormWidgets\RichEditor
    size: huge
```

## Form Views

For each page your form supports [Create](#oc-create-page), [Update](#oc-update-page) and [Preview](#oc-preview-page) you should provide a [view file](../backend/controllers-ajax.md) with the corresponding name - **create.htm**, **update.htm** and **preview.htm**.

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

<a id="oc-preview-view"></a>
### Preview View

The **preview.htm** view represents the Preview page that allows users to preview existing records in the read-only mode. A typical Preview page contains breadcrumbs and the form itself. Below is a contents of the typical preview.htm form.

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

## Applying Conditions to Fields

Sometimes you may want to manipulate the value or appearance of a form field under certain conditions, for example, you may want to hide an input if a checkbox is ticked. There are a few ways you can do this, either by using the trigger API or field dependencies. The input preset converter is primarily used to converting field values. These options are described in more detail below.

<a id="oc-input-preset-converter"></a>
### Input Preset Converter

The input preset converter is defined with the `preset` [form field option](#oc-field-options) and allows you to convert text entered into an element to a URL, slug or file name value in another input element.

In this example we will automatically fill out the `url` field value when a user enters text in the `title` field. If the text **Hello world** is typed in for the Title, the URL will follow suit with the converted value of **/hello-world**. This behavior will only occur when the destination field (`url`) is empty and untouched.

```yaml
title:
    label: Title

url:
    label: URL
    preset:
        field: title
        type: url
```

Alternatively, the `preset` value can also be a string that refers to the **field** only, the `type` option will then default to **slug**.

```yaml
slug:
    label: Slug
    preset: title
```

The following options are available for the `preset` option:

Option | Description
------------- | -------------
**field** | defines the other field name to source the value from.
**type** | specifies the conversion type. See below for supported values.
**prefixInput** | optional, prefixes the converted value with the value found in the supplied input element using a CSS selector.

Following are the supported types:

Type | Description
------------- | -------------
**exact** | copies the exact value
**slug** | formats the copied value as a slug
**url** | same as slug but prefixed with a /
**camel** | formats the copied value with camelCase
**file** | formats the copied value as a file name with whitespace replaced with dashes

<a id="oc-trigger-events"></a>
### Trigger Events

Trigger Events are defined with the `trigger` [form field option](#oc-field-options) and is a simple browser based solution that uses JavaScript. It allows you to change elements attributes such as visibility or value, based on another elements' state. Here is a sample definition:

```yaml
is_delayed:
    label: Send later
    comment: Place a tick in this box if you want to send this message at a later time.
    type: checkbox

send_at:
    label: Send date
    type: datepicker
    cssClass: field-indent
    trigger:
        action: show
        field: is_delayed
        condition: checked
```

In the above example the `send_at` form field will only be shown if the `is_delayed` field is checked. In other words, the field will show (action) if the other form input (field) is checked (condition). The `trigger` definition specifies these options:

Option | Description
------------- | -------------
**action** | defines the action applied to this field when the condition is met. Supported values: show, hide, enable, disable, empty.
**field** | defines the other field name that will trigger the action. Normally the field name refers to a field in the same level form. For example, if this field is in a [repeater widget](#widget-repeater), only fields in that same repeater widget will be checked. However, if the field name is preceded by a caret symbol `^` like: `^parent_field`, it will refer to a repeater widget or form one level higher than the field itself. Additionally, if more than one caret `^` is used, it will refer that many levels higher: `^^grand_parent_field`, `^^^grand_grand_parent_field`, etc.
**condition** | determines the condition the specified field should satisfy for the condition to be considered "true". Supported values: checked, unchecked, value[somevalue].

<a id="oc-field-dependencies"></a>
### Field Dependencies

Form fields can declare dependencies on other fields by defining the `dependsOn` [form field option](#oc-field-options) which provides a more robust server side solution for updating fields when their dependencies are modified. When the fields that are declared as dependencies change, the defining field will update using the AJAX framework. This provides an opportunity to interact with the field's properties using the `filterFields` methods or changing available options to be provided to the field.

```yaml
country:
    label: Country
    type: dropdown

state:
    label: State
    type: dropdown
    dependsOn: country
```

In the above example the `state` form field will refresh when the `country` field has a changed value. When this occurs, the current form data will be filled in the model so the dropdown options can use it.

```php
public function getCountryOptions()
{
    return ['au' => 'Australia', 'ca' => 'Canada'];
}

public function getStateOptions()
{
    if ($this->country == 'au') {
        return ['act' => 'Capital Territory', 'qld' => 'Queensland', ...];
    }
    elseif ($this->country == 'ca') {
        return ['bc' => 'British Columbia', 'on' => 'Ontario', ...];
    }
}
```

You can filter the form field definitions by overriding the `filterFields` method inside the Model used. This allows you to manipulate visibility and other field properties based on the model data. The method takes two arguments **$fields** will represent an object of the fields already defined by the [field configuration](../../element/definitions.md) and **$context** represents the active form context.

```php
public function filterFields($fields, $context = null)
{
    if ($this->source_type === 'http') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = true;
    }
    elseif ($this->source_type === 'git') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = false;
    }
    else {
        $fields->source_url->hidden = true;
        $fields->git_branch->hidden = true;
    }
}
```

The `$context` value will contain the form context (create, update, etc.) when displaying and saving the form, however, when the form is being refreshed the context will always be set to **refresh**. This is useful for populating fields with new values without forcing it to be the saved value. The following will reset the parent name value if the parent value is changed during a refresh but won't affect the save value.

```php
public function filterFields($fields, $context = null)
{
    if ($context === 'refresh' && $this->parent) {
        $fields->parent_name->value = $this->parent->name;
    }
}
```

The above logic will set the `hidden` flag on certain fields by checking the value of the Model attribute `source_type`. This logic will be applied when the form first loads and also when updated by a [defined field dependency](#oc-field-dependencies). For example, here is the associated form field definitions.

```yaml
source_type:
    label: Source Type
    type: dropdown
    options:
        git: Git
        http: Http
        upload: Upload

source_url:
    label: Source URL
    type: text
    dependsOn: source_type

git_branch:
    label: Git Branch
    type: text
    dependsOn: source_type
```

You may also extend other models to apply the `filterFields` logic, see the [Filtering Form Fields](#oc-filtering-form-fields) section for more details.

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

<a id="oc-extending-form-behavior"></a>
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

As described in the [field dependencies section](#oc-field-dependencies), you may also implement form field filtering by extension by hooking in to the `form.filterFields` event.

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

To validate the fields of your form you can make use of the [Validation](../database/traits.md#oc-validation) trait in your model.
