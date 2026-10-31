---
previousPath: extend/forms/field-dependencies.md
subtitle: Refresh a form field from the server when another field changes, so its options and properties can update.
---
# Field Dependencies

A field dependency refreshes a form field whenever another field changes, such as a state dropdown that lists the states of the selected country. Define it with the `dependsOn` field property.

```yaml
country:
    label: Country
    type: dropdown

state:
    label: State
    type: dropdown
    dependsOn: country
```

When the `country` field changes, the `state` field refreshes using the AJAX framework. Before it refreshes, the current form data is filled in the model, so the dropdown options method can read the selected country.

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

Dependencies are similar to [field conditions](../../handbook/form-fields.md#field-conditions), which show and hide fields in the browser. A dependency is a more robust server-side solution, because the field is rendered again on the server and you can change its options or any other property.

## Filtering Fields in the Model

To change field properties based on the model data, such as hiding a field, override the `filterFields` method in the model. The method takes two arguments: `$fields` is an object holding the fields already defined by the [field configuration](../../handbook/form-fields.md), and `$context` is the active form context.

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

This logic sets the `hidden` flag on certain fields by checking the `source_type` attribute of the model. It runs when the form first loads, and again whenever a field dependency refreshes the form. Here are the matching form field definitions.

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

### Using the Refresh Context

The `$context` value contains the form context (create, update, etc.) when the form is displayed and saved. When the form is refreshed, the context is always set to **refresh**. Use this to fill fields with new values without forcing them to be the saved value. The following example resets the parent name when the parent value changes during a refresh, but does not affect the saved value.

```php
public function filterFields($fields, $context = null)
{
    if ($context === 'refresh' && $this->parent) {
        $fields->parent_name->value = $this->parent->name;
    }
}
```

## Calling an AJAX Handler When a Field Changes

To run your own AJAX handler when a field value changes, set the `changeHandler` property. The following example calls the **onChangeContent** AJAX handler when the value changes.

```yaml
content:
    label: Content
    type: textarea
    changeHandler: onChangeContent
```

Add the AJAX handler to the controller like any other handler. This one displays a message using the `Flash` facade.

```php
public function onChangeContent()
{
    Flash::success('Great job!');
}
```

### Updating Other Fields from the Handler

To update other fields from the handler, return the result of the `formRefreshFields` method provided by the form controller.

```php
public function onChangeContent()
{
    return $this->formRefreshFields('is_positive');
}
```

Pass an array to update several fields at once.

```php
public function onChangeContent()
{
    return $this->formRefreshFields(['is_positive', 'internal_comments']);
}
```

#### See Also

::: also
* [Form Field Conditions](../../handbook/form-fields.md#field-conditions)
* [Filtering Form Fields from Another Plugin](./extending.md#filtering-form-fields)
* [Filter Dependencies](../lists/filters.md#filter-dependencies)
:::
