---
previousPath: extend/services/html.md
subtitle: Generate HTML forms and form fields in PHP or Twig, with CSRF tokens, model binding and AJAX attributes added for you.
---
# Form & HTML

The `Form` facade generates HTML forms and form fields, alongside the related `Html` facade for working with HTML. The `Form` facade adds CSRF tokens and session keys to your forms, fills fields from a model, and opens forms that call AJAX handlers.

```php
<?= Form::open(['request' => 'onSave']) ?>
    <?= Form::label('email', 'E-Mail Address') ?>
    <?= Form::email('email') ?>
    <?= Form::submit('Save') ?>
<?= Form::close() ?>
```

## Using the Form Helper in Twig

The examples on this page use PHP, but every feature works in [Twig markup](../../themes/templating.md) too. In Twig, each function prefixed with `form_` calls the `Form` facade method of the same name in *snake_case*.

```php
<?= Form::open(..) ?>
```

```twig
{{ form_open(...) }}
```

See the [form function](../../handbook/twig-functions/form.md) to learn more about using the form helper in the frontend.

## Opening a Form

Open a form with the `Form::open` method, passing an array of attributes as the first argument.

```php
<?= Form::open(['url' => 'foo/bar']) ?>
    //
<?= Form::close() ?>
```

The form uses the `POST` method by default. You can specify another method.

```php
Form::open(['url' => 'foo/bar', 'method' => 'put'])
```

::: tip
HTML forms only support `POST` and `GET`, so the `PUT` and `DELETE` methods are spoofed by adding a `_method` hidden field to your form automatically.
:::

You can also pass regular HTML attributes.

```php
Form::open(['url' => 'foo/bar', 'class' => 'pretty-form'])
```

If the form accepts file uploads, add the `files` option to the array.

```php
Form::open(['url' => 'foo/bar', 'files' => true])
```

You can also open a form that points to a handler method in your page or components.

```php
Form::open(['request' => 'onSave'])
```

### Opening an AJAX Form

Use the `Form::ajax` method to open an AJAX enabled form. The first argument is the handler method name.

```php
Form::ajax('onSave')
```

The second argument contains the attributes.

```php
Form::ajax('onSave', ['confirm' => 'Are you sure?'])
```

You can also pass the partials to update as another array.

```php
Form::ajax('onSave', ['update' => [
        'control-panel' => '#controlPanel',
        'layout/sidebar' => '#layoutSidebar'
    ]
])
```

::: tip
Most [data attributes from the AJAX framework](../../themes/ajax/attributes-api.md) are available here by dropping the `data-request-` prefix.
:::

## Form Tokens

### CSRF Protection

If you have [CSRF protection enabled](../../setup/configuration.md), the `Form::open` method adds a CSRF token to your form as a hidden field when the method is `POST`, `PUT` or `DELETE`. To generate the hidden CSRF field yourself, use the `token` method.

```php
<?= Form::token() ?>
```

### Deferred Binding Session Key

A session key used for [deferred binding](../data/relationships.md) is added to every form as a hidden field. To generate this field yourself, use the `sessionKey` method.

```php
<?= Form::sessionKey() ?>
```

## Binding a Form to a Model

Use the `Form::model` method to fill a form with the contents of a model.

```php
<?= Form::model($user, ['id' => 'userForm']) ?>
```

Each form element you generate now takes its value from the model attribute matching the field name. For example, a text input named `email` gets the value of the user model's `email` attribute. Values are taken in the following order of priority, so session flash data matching the input name wins over the model value.

1. Session flash data (old input)
2. Explicitly passed value
3. Model attribute data
4. Existing postback value

This lets you build forms that bind to model values and fill themselves again after a validation error on the server. Use `Form::value` to read these values yourself.

```php
<input type="text" name="name" value="<?= Form::value('name') ?>" />
```

Pass a default value as the second argument.

```php
<?= Form::value('name', 'John Travolta') ?>
```

::: warning
When you use `Form::model`, close your form with `Form::close`.
:::

## Generating Form Fields

### Labels

Generate a label element with the `label` method.

```php
<?= Form::label('email', 'E-Mail Address') ?>
```

Pass extra HTML attributes as the third argument.

```php
<?= Form::label('email', 'E-Mail Address', ['class' => 'awesome']) ?>
```

::: tip
After you create a label, any form element you create with a matching name automatically gets an ID matching the label name.
:::

### Text Fields

Generate a text input with the `text` method.

```php
<?= Form::text('username') ?>
```

Pass a default value as the second argument.

```php
<?= Form::text('email', 'emailaddress@example.tld') ?>
```

::: tip
The **hidden** and **textarea** methods have the same signature as the **text** method.
:::

Generate a password input with the `password` method.

```php
<?= Form::password('password') ?>
```

Other input types have similar methods.

```php
<?= Form::email($name, $value = null, $attributes = []) ?>
<?= Form::file($name, $attributes = []) ?>
```

### Number Fields

Generate a number input with the `number` method.

```php
<?= Form::number('name', 'value') ?>
```

### File Inputs

Generate a file input with the `file` method.

```php
<?= Form::file('image') ?>
```

::: tip
The form must be opened with the `files` option set to `true`.
:::

### Checkboxes and Radio Buttons

Generate a checkbox or radio input with the `checkbox` and `radio` methods.

```php
<?= Form::checkbox('name', 'value') ?>

<?= Form::radio('name', 'value') ?>
```

Pass `true` as the third argument to check the input.

```php
<?= Form::checkbox('name', 'value', true) ?>

<?= Form::radio('name', 'value', true) ?>
```

### Drop-down Lists

Generate a drop-down list with the `select` method.

```php
<?= Form::select('size', ['L' => 'Large', 'S' => 'Small']) ?>
```

Pass the selected value as the third argument.

```php
<?= Form::select('size', ['L' => 'Large', 'S' => 'Small'], 'S') ?>
```

Use nested arrays to generate a grouped list.

```php
<?= Form::select('animal', [
    'Cats' => ['leopard' => 'Leopard'],
    'Dogs' => ['spaniel' => 'Spaniel'],
]) ?>
```

Use the `selectRange` method to generate a list with a range of numbers.

```php
<?= Form::selectRange('number', 10, 20) ?>
```

Pass a selected value and an `emptyOption` to add a blank option.

```php
<?= Form::selectRange('number', 10, 20, 2, ['emptyOption' => 'Choose...']) ?>
```

Use the `selectMonth` method to generate a list of month names.

```php
<?= Form::selectMonth('month') ?>
```

It also accepts a selected value and a blank option.

```php
<?= Form::selectMonth('month', 2, ['emptyOption' => 'Choose month...']) ?>
```

### Buttons

Generate a submit button with the `submit` method.

```php
<?= Form::submit('Click Me!') ?>
```

::: tip
To create a button element, use the **button** method. It has the same signature as **submit**.
:::

## Creating Custom Macros

You can define your own Form helpers, called "macros". Register a macro with a name and a closure.

```php
Form::macro('myField', function() {
    return '<input type="awesome">';
})
```

Then call the macro by its name.

```php
<?= Form::myField() ?>
```

#### See Also

::: also
* [form() Twig Function](../../handbook/twig-functions/form.md)
* [AJAX Attributes API](../../themes/ajax/attributes-api.md)
* [Deferred Binding](../data/relationships.md)
:::
