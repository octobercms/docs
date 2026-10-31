---
previousPath: extend/forms/form-controller.md#extending-form-behavior
subtitle: Change the fields, saving, redirects and refreshes of the form controller from your own code.
---
# Extending the Form Controller

The form controller calls override methods on your controller and fires events at each step, so you can change how it works without replacing the behavior. Define an override method in a controller that uses the behavior, or listen to a global event to change forms that belong to other plugins.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';

    public function formBeforeSave($model)
    {
        $model->slug = Str::slug($model->name);
    }
}
```

## Extending Form Fields

You may extend the fields of another controller from outside by listening to the `backend.form.extendFields` [global event](../services/events.md). The event function takes a `$form` argument, the `Backend\Widgets\Form` object, where you can use the `getController`, `getModel` and `getContext` methods to check the execution context.

Since this event can affect every form, always check that the controller and model are of the correct type. Here is an example using the `addFields` method to add a new field to the mail settings form.

```php
Event::listen('backend.form.extendFields', function($form) {
    if (
        !$form->getController() instanceof \System\Controllers\Settings ||
        !$form->getModel() instanceof \System\Models\MailSetting
    ) {
        return;
    }

    $form->addFields([
        'my_field' => [
            'label' => 'My Field',
            'comment' => 'This is a custom field I have added.',
        ],
    ]);
});
```

To extend the fields inside your own controller, override the `formExtendFields` method in the controller class. This only affects the form used by the `FormController` behavior.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public function formExtendFields($form)
    {
        $form->addFields([...]);
    }
}
```

The following methods are available on the `$form` object.

Method | Description
------------- | -------------
**addFields** | adds new fields to the outside area
**addTabFields** | adds new fields to the tabbed area
**addSecondaryTabFields** | adds new fields to the secondary tabbed area
**removeField** | removes a field from any area

Each method takes an array of fields in the same format as the [form field configuration](../../handbook/form-fields.md).

## Filtering Form Fields

You can filter form fields from outside the model, such as from another plugin, by binding to the `model.form.filterFields` model event. It works like the `filterFields` model method described in [Field Dependencies](./field-dependencies.md#filtering-fields-in-the-model).

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

## Overriding Form Save Data

Override the `formBeforeSave` method to change the values of the form before the record is created or updated. To override the save value of a field, call the `formSetSaveValue(key, value)` method.

```php
public function formBeforeSave($model)
{
    // When locale dropdown is set to "custom", override with the _custom_locale text field
    if (post('MyModel[locale]') === 'custom') {
        $this->formSetSaveValue('locale', post('MyModel[_custom_locale]'));
    }
}
```

## Running Code Before or After Saving

Each save step calls an override method on the controller, then fires a global event that receives the controller and the model. Override the method in your own controller, or listen to the event to respond to another plugin's forms.

Override Method | Global Event | Called
------------- | ------------- | -------------
**formBeforeSave** | `backend.form.beforeSave` | before a record is created or updated
**formAfterSave** | `backend.form.afterSave` | after a record is created or updated
**formBeforeCreate** | `backend.form.beforeCreate` | before a record is created
**formAfterCreate** | `backend.form.afterCreate` | after a record is created
**formBeforeUpdate** | `backend.form.beforeUpdate` | before a record is updated
**formAfterUpdate** | `backend.form.afterUpdate` | after a record is updated
**formAfterDelete** | `backend.form.afterDelete` | after a record is deleted
**formAfterCancel** | `backend.form.afterCancel` | after the user cancels the form

```php
Event::listen('backend.form.beforeSave', function ($controller, $model) {
    $model->slug = Str::slug($model->name);
});
```

## Overriding Controller Redirect

To set the URL to open after the record is saved, override the `formGetRedirectUrl` method. It returns the location to redirect to, and relative URLs are treated as backend URLs.

```php
public function formGetRedirectUrl($context = null, $model = null)
{
    return 'https://octobercms.com';
}
```

## Extending Form Model Query

To change the query that looks up the form [model](../data/model-queries.md), override the `formExtendQuery` method in the controller class. This example applies the **withTrashed** scope, so soft deleted records can still be found and updated.

```php
public function formExtendQuery($query)
{
    $query->withTrashed();
}
```

## Extending the Form Configuration

To change the form configuration at runtime, override the `formGetConfig` method.

```php
public function formGetConfig()
{
    $config = $this->asExtension('FormController')->formGetConfig();

    $config->form = $this->makeConfig($config->form);

    // Set the active tab dynamically
    $config->form->tabs['activeTab'] = 'Activities';

    return $config;
}
```

## Overriding Controller Action

You may define your own `create`, `update` or `preview` action method in the controller, then optionally call the behavior's method of the same name.

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

## Getting the Active Form Model

The `formGetModel` method returns the model currently bound to the form. Use it in custom AJAX handlers, such as when the form is open in a popup, because the behavior has already loaded the model and you don't need to query it again with `post('record_id')`.

```php
public function onMyAction()
{
    $model = $this->formGetModel();

    $model->status = 'processed';
    $model->save();

    return $this->formGetWidget()->onRefresh();
}
```

## Refreshing the Form via AJAX

When a custom AJAX handler needs to update every form field at once, return the result of the form widget's `onRefresh` method. It renders the entire form again and returns a DOM update array, which the AJAX framework applies automatically.

```php
public function onMyAction()
{
    // ... your logic ...

    // Re-renders all form fields, tabs and custom partials in one request
    return $this->formGetWidget()->onRefresh();
}
```

To refresh the form and one or more [relation](../relations/relation-controller.md) containers in the same request, merge the results.

```php
public function onMyAction()
{
    // ... your logic ...

    return array_merge(
        $this->formGetWidget()->onRefresh(),   // All form fields
        $this->relationRefresh('files'),       // A specific relation
        $this->relationRefresh('comments')     // Another relation
    );
}
```

::: tip
Relation fields declared with the [relation field type](../../handbook/form-fields/relation.md) are part of the form widget, so `formGetWidget()->onRefresh()` refreshes them automatically.
:::

To update only some fields, use the `formRefreshFields` method described in [Field Dependencies](./field-dependencies.md#updating-other-fields-from-the-handler).

## Extending Every Form Refresh

The `formExtendRefreshResults` override is called on every `onRefresh` cycle, including refreshes triggered by field dependencies or by `formGetWidget()->onRefresh()`. Return extra DOM updates from it to include them in every refresh, without changing individual AJAX handlers.

```php
public function formExtendRefreshResults($host, $result)
{
    $model = $this->formGetModel();

    // Appended to every refresh response automatically
    return $result + [
        '#my-status-block' => $this->makePartial('status_block', ['model' => $model]),
    ];
}
```

This is useful for updating external partials and other page elements whenever the form refreshes. Instead of triggering a full refresh manually, you declare what to append whenever a refresh occurs.

#### See Also

::: also
* [Form Controller](./form-controller.md)
* [Field Dependencies](./field-dependencies.md)
* [Custom Form Widgets](./form-widgets.md)
* [Extending October CMS](../plugins/extending.md)
:::
