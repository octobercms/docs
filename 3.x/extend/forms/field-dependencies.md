---
subtitle: Learn how fields can depend on other fields.
---
# Field Dependencies

Akin to [field conditions](../../element/field-conditions.md), form fields can declare dependencies on other fields by defining the `dependsOn` form field property. This provides a more robust server-side solution for updating fields when their dependencies are modified.

When the fields that are declared as dependencies change, the defining field will update using the AJAX framework. This provides an opportunity to interact with the field's properties using the `filterFields` methods or changing available options to be provided to the field.

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

## Filtering Fields

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

The above logic will set the `hidden` flag on certain fields by checking the value of the Model attribute `source_type`. This logic will be applied when the form first loads and also when updated by a defined field dependency. For example, here is the associated form field definitions.

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

## Updating with AJAX

In some cases you may wish to run an AJAX handler manually when a field value changes. You may use the `changeHandler` property to specify an AJAX handler. The following example will call the **onChangeContent** AJAX handler when the value is changed.

```yaml
content:
    label: Content
    type: textarea
    changeHandler: onChangeContent
```

The AJAX handler can be added to the controller in the normal way. The following displays a message using the `Flash` facade when the field updates.

```php
public function onChangeContent()
{
    Flash::success('Great job!');
}
```

If you wish to update other fields, use the `formRefreshFields` method provided by the form controller.

```php
public function onChangeContent()
{
    return $this->formRefreshFields('is_positive');
}
```

You may also update multiple fields at once by passing an array.

```php
public function onChangeContent()
{
    return $this->formRefreshFields(['is_positive', 'internal_comments']);
}
```

#### See Also

::: also
* [Field Conditions](../../element/field-conditions.md)
:::
