# Forms & HTML

- [Introduction](#introduction)
- [Opening a form](#opening-a-form)
- [Form tokens](#form-tokens)
- [CSRF protection](#csrf-protection)
- [Form model binding](#form-model-binding)
- [Labels](#labels)
- [Text fields](#text)
- [Checkboxes and radio buttons](#checkboxes-and-radio-buttons)
- [File input](#file-input)
- [Number input](#number)
- [Drop-down lists](#drop-down-lists)
- [Buttons](#buttons)
- [Custom macros](#custom-macros)

<a name="introduction"></a>
## Introduction

October provides various helpful functions with the `Html` facade, useful for dealing with HTML and forms. While most of the examples will use the PHP language all of these features translate directly to [Twig markup](../markup) with a simple conversion.

    // PHP
    <?= Form::open(..) ?>

    // Twig
    {{ form_open(...) }}

As you can see above, in Twig all functions prefixed with `form_` will bind directly to the `Form` facade and provide access to the methods using *snake_case*. See the [markup guide for more information](../markup/function-form) on using the form helper in the front-end.

<a name="opening-a-form"></a>
## Opening a form

Forms can be opened with the `Form::open` method that passes an array of attributes as the first argument:

    <?= Form::open(['url' => 'foo/bar']) ?>
        //
    <?= Form::close() ?>

By default, a `POST` method will be assumed, however, you are free to specify another method:

    Form::open(['url' => 'foo/bar', 'method' => 'put'])

> **Note:** Since HTML forms only support `POST` and `GET`, `PUT` and `DELETE` methods will be spoofed by automatically adding a `_method` hidden field to your form.

You may pass in regular HTML attributes as well:

    Form::open(['url' => 'foo/bar', 'class' => 'pretty-form'])

If your form is going to accept file uploads, add a `files` option to your array:

    Form::open(['url' => 'foo/bar', 'files' => true])

You may also open forms that point to handler methods in your page or components:

    Form::open(['request' => 'onSave'])

#### AJAX enabled forms

Likewise, AJAX enabled forms can be opened using the `Form::ajax` method where the first argument is the handler method name:

    Form::ajax('onSave')

The second argument of `Form::ajax` should contain the attributes:

    Form::ajax('onSave', ['confirm' => 'Are you sure?'])

You can also pass partials to update as another array:

    Form::ajax('onSave', ['update' => [
            'control-panel': '#controlPanel',
            'layout/sidebar': '#layoutSidebar'
        ]
    ])

> **Note**: Most [data attributes from the AJAX framework](../ajax/attributes-api) are available here by dropping the `data-request-` prefix.

<a name="form-tokens"></a>
## Form tokens

#### CSRF protection

If you have [protection enabled](../setup/configuration#csrf-protection), using the `Form::open` method with `POST`, `PUT` or `DELETE` will automatically add a CSRF token to your forms as a hidden field. Alternatively, if you wish to generate the HTML for the hidden CSRF field, you may use the `token` method:

    <?= Form::token() ?>

#### Deferred binding session key

A session key used for [deferred binding](../database/relations#deferred-binding) will be added to every form as a hidden field. If you want to generate this field manually, you may use the `sessionKey` method:

    <?= Form::sessionKey() ?>

<a name="form-model-binding"></a>
## Form model binding

#### Opening a model form

You may want to populate a form based on the contents of a model. To do so, use the `Form::model` method:

    <?= Form::model($user, ['id' => 'userForm']) ?>

Now when you generate a form element, like a text input, the model's value matching the field's name will automatically be set as the field value. So for example, for a text input named `email`, the user model's `email` attribute would be set as the value. If there is an item in the Session flash data matching the input name, that will take precedence over the model's value. The priority looks like this:

1. Session flash data (old input)
2. Explicitly passed value
3. Model attribute data
4. Existing postback value

This allows you to quickly build forms that not only bind to model values, but easily re-populate if there is a validation error on the server. You can manually access these values using `Form::value`:

    <input type="text" name="name" value="<?= Form::value('name') ?>" />

You may pass a default value as the second argument:

    <?= Form::value('name', 'John Travolta') ?>

> **Note:** When using `Form::model`, be sure to close your form with `Form::close`!

<a name="labels"></a>
## Labels

#### Generating a label element

    <?= Form::label('email', 'E-Mail Address') ?>

#### Specifying extra HTML attributes

    <?= Form::label('email', 'E-Mail Address', ['class' => 'awesome']) ?>

> **Note:** After creating a label, any form element you create with a name matching the label name will automatically receive an ID matching the label name as well.

<a name="text"></a>
## Text fields

#### Generating A Text Input

    <?= Form::text('username') ?>

#### Specifying a default value

    <?= Form::text('email', 'example@gmail.com') ?>

> **Note:** The *hidden* and *textarea* methods have the same signature as the *text* method.

#### Generating a password input

    <?= Form::password('password') ?>

#### Generating other inputs

    <?= Form::email($name, $value = null, $attributes = []) ?>
    <?= Form::file($name, $attributes = []) ?>

<a name="checkboxes-and-radio-buttons"></a>
## Checkboxes and radio buttons

#### Generating a checkbox or radio input

    <?= Form::checkbox('name', 'value') ?>

    <?= Form::radio('name', 'value') ?>

#### Generating a checkbox or radio input that is checked

    <?= Form::checkbox('name', 'value', true) ?>

    <?= Form::radio('name', 'value', true) ?>

<a name="number"></a>
## Number

#### Generating a number input

    <?= Form::number('name', 'value') ?>

<a name="file-input"></a>
## File input

#### Generating a file input

    <?= Form::file('image') ?>

> **Note:** The form must have been opened with the `files` option set to `true`.

<a name="drop-down-lists"></a>
## Drop-down lists

#### Generating a drop-down list

    <?= Form::select('size', ['L' => 'Large', 'S' => 'Small']) ?>

#### Generating a drop-down list with selected default

    <?= Form::select('size', ['L' => 'Large', 'S' => 'Small'], 'S') ?>

#### Generating a grouped list

    <?= Form::select('animal', [
        'Cats' => ['leopard' => 'Leopard'],
        'Dogs' => ['spaniel' => 'Spaniel'],
    ]) ?>

#### Generating a drop-down list with a range

    <?= Form::selectRange('number', 10, 20) ?>

#### Generating a drop-down list with a range, selected value and blank option

    <?= Form::selectRange('number', 10, 20, 2, ['emptyOption' => 'Choose...']) ?>
    
#### Generating a list with month names

    <?= Form::selectMonth('month') ?>

#### Generating a list with month names, selected value and blank option

    <?= Form::selectMonth('month', 2, ['emptyOption' => 'Choose month...']) ?>
    
<a name="buttons"></a>
## Buttons

#### Generating a submit button

    <?= Form::submit('Click Me!') ?>

> **Note:** Need to create a button element? Try the *button* method. It has the same signature as *submit*.

<a name="custom-macros"></a>
## Custom macros

#### Registering a form macro

It's easy to define your own custom Form class helpers called "macros". Here's how it works. First, simply register the macro with a given name and a Closure:

    Form::macro('myField', function() {
        return '<input type="awesome">';
    })

Now you can call your macro using its name:

#### Calling A Custom Form Macro

    <?= Form::myField() ?>
