# Backend forms

- [Configuring the form behavior](#configuring-form)
- [Defining form fields](#form-fields)
- [Available field types](#field-types)
- [Form widgets](#form-widgets)
- [Form views](#form-views)
- [Overriding default behavior](#overriding-behavior)

**Form behavior** is a controller modifier used for easily adding form functionality to a back-end page. The behavior provides three pages Create, Update and Preview. The preview page is a read-only version of the update page. When you use the form behavior you don't need to define the `create()`, `update()` and `preview()` actions in the controller - the behavior does it for you. However you should provide the corresponding view files.

Form behavior depends on form [field definitions](#form-fields) and a [model class](../database/model). In order to use the form behavior you should add it to the `$implement` field of the controller class. Also, the `$formConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.FormController'];

        public $formConfig = 'form_config.yaml';
    }

> **Note:** Very often the form and [list behavior](lists) are used together in a same controller.

<a name="configuring-form" class="anchor" href="#configuring-form"></a>
## Configuring the form behavior

The configuration file referred in the `$formConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-views-ajax/#introduction). Below is an example of a typical form behavior configuration file:

    # ===================================
    #  Form Behavior Config
    # ===================================

    name: Blog Category
    form: @/plugins/acme/blog/models/post/fields.yaml
    modelClass: Acme\Blog\Post

    create:
        title: New Blog Post

    update:
        title: Edit Blog Post

    preview:
        title: View Blog Post

The following fields are required in the form configuration file:

Field  | Description
------------- | -------------
**name** | the name of the object being managed by this form.
**form** | a configuration array or reference to a form field definition file, see [form fields](#form-fields).
**modelClass** | a model class name, the form data is loaded and saved against this model.

The configuration options listed below are optional. Define them if you want the form behavior to support the [Create](#form-create-page), [Update](#form-update-page) or [Preview](#form-preview-page) pages.

Option  | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**create** | a configuration array or reference to a config file for the Create page.
**update** | a configuration array or reference to a config file for the Update page.
**preview** | a configuration array or reference to a config file for the Preview page.

<a name="form-create-page" class="anchor" href="#form-create-page"></a>
### Create page

To support the Create page add the following configuration to the YAML file:

    create:
        title: New Blog Post
        redirect: acme/blog/posts/update/:id
        redirectClose: acme/blog/posts
        flashSave: Post has been created!

The following configuration options are supported for the Create page:

Option  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and the **close** post variable is sent with the request.
**flashSave** | flash message to display when record is saved, can refer to a [localization string](../plugin/localization).

<a name="form-update-page" class="anchor" href="#form-update-page"></a>
### Update page

To support the Update page add the following configuration to the YAML file:

    update:
        title: Edit Blog Post
        redirect: acme/blog/posts
        flashSave: Post updated successfully!
        flashDelete: Post has been deleted.

The following configuration options are supported for the Update page:

Option  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and **close** post variable is sent with the request.
**flashSave** | flash message to display when record is saved, can refer to a [localization string](../plugin/localization).
**flashDelete** | flash message to display when record is deleted, can refer to a [localization string](../plugin/localization).

<a name="form-preview-page" class="anchor" href="#form-preview-page"></a>
### Preview page

To support the Preview page add the following configuration to the YAML file:

    preview:
        title: View Blog Post

The following configuration options are supported for the Preview page:

Option  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](Localization).

<a name="form-fields" class="anchor" href="#form-fields"></a>
## Defining form fields

Form fields are defined with the YAML file. The form fields configuration is used by the form behavior for creating the form controls and binding them to the model fields. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but **fields.yaml** and **form_fields.yaml** are common names. Example form fields file location:

    plugins/
      acme/
        blog/
          models/                <=== Plugin models directory
            post/                <=== Model configuration directory
              form_fields.yaml   <=== Model form fields config file
            Post.php             <=== model class


Fields can be placed in three areas, the **outside area**, **primary tabs** or **secondary tabs**. The next example shows the typical contents of a form fields definition file.

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

        [...]

    tabs:
        fields:
            [...]

    secondaryTabs:
        fields:
            [...]

<a name="form-field-options" class="anchor" href="#form-field-options"></a>
### Field options

For each field you can specify these options (where applicable):

Option  | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered (see [Fields types](#field-types) below). Default: text.
**span** | aligns the form field to one side. Options: auto, left, right, full. Default: auto.
**size** | specifies a field size for fields that use it (for example the text area). Options: tiny, small, large, huge, giant.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**default** | specifies the default value for the field.
**tab** | assigns the field to a tab.
**cssClass** | assigns a CSS class to the field container.
**disabled** | grays out the field if set to true. Options: true, false.
**stretch** | specifies if this field stretch to fit the parent height.
**context** | specifies what context should be used when displaying the field. Context can also be passed by using an `@` symbol in the field name, for example, `name@update`.
**depends** | an array of other field names this field depends on, when the other fields are modified, this field will update.
**required** | places a red asterisk next to the field label to indicate it is required.

<a name="field-types" class="anchor" href="#field-types"></a>
## Available field types

There are various native field types that can be used for the **type** setting. For more advanced form fields, a [form widget](#form-widgets) can be used instead.

- [Text](#field-text)
- [Number](#field-number)
- [Password](#field-password)
- [Textarea](#field-textarea)
- [Dropdown](#field-dropdown)
- [Radio](#field-radio)
- [Checkbox](#field-checkbox)
- [Partial](#field-partial)
- [Widget](#field-widget)

<a name="field-text" class="anchor" href="#field-text"></a>
### Text

`text` - renders a single line text box. This is the default type used if none is specified.

    blog_title:
      label: Blog Title
      type: text

<a name="field-number" class="anchor" href="#field-number"></a>
### Number

`number` - renders a single line text box that takes numbers only.

    your_age:
      label: Your Age
      type: number

<a name="field-password" class="anchor" href="#field-password"></a>
### Password

`password ` - renders a single line password field.

    user_password:
      label: Password
      type: password

<a name="field-password" class="anchor" href="#field-textarea"></a>
### Textarea

`textarea` - renders a multiline text box. A size can also be specified with possible values: tiny, small, large, huge, giant.

    blog_contents:
      label: Contents
      type: textarea
      size: large

<a name="field-dropdown" class="anchor" href="#field-dropdown"></a>
### Dropdown

`dropdown` - renders a dropdown with specified options. There are 4 ways to provide the drop-down options. The first method defines options directly in the YAML file:

    status:
      label: Blog Post Status
      type: dropdown
      options:
        draft: Draft
        published: Published
        archived: Archived

The second method defines options with a method declared in the model's class. If the options element is omitted, the framework expects a method with the name `get*Field*Options()` to be defined in the model. Using the example above, the model should have the ``getStatusOptions()`` method. This method takes a single parameter, the current key value, and should return an array of options in the format **key => label**. 

    status:
      label: Blog Post Status
      type: dropdown

Supplying the dropdown options tn the model class:

    public function getStatusOptions($keyValue = null)
    {
        return ['all' => 'All', ...];
    }

The third global method `getDropdownOptions()` can also be defined in the model, this will be used for all dropdown field types for the model. This method takes two parameters, the field name and current key value, and should return an array of options in the format **key => label**.

    public function getDropdownOptions($fieldName = null, $keyValue = null)
    {
        if ($fieldName == 'status')
            return ['all' => 'All', ...];
        else
            return ['' => '-- none --'];
    }

The fourth method uses a specific method declared in the model's class. In the next example the `listStatuses()` method should be defined in the model class. This method takes two parameters, the current key value and field name, and should return an array of options in the format **key => label**.

    status:
      label: Blog Post Status
      type: dropdown
      options: listStatuses

Supplying the dropdown options tn the model class:

    public function listStatuses($keyValue = null, $fieldName = null)
    {
        return ['published' => 'Published', ...];
    }

<a name="field-radio" class="anchor" href="#field-radio"></a>
### Radio

`radio` - renders a list of radio options, where only one item can be selected at a time.

    security_level:
      label: Access Level
      type: radio
      options:
        all: All
        registered: Registered only
        guests: Guests only

Radio lists can also support a secondary description.

    security_level:
      label: Access Level
      type: radio
      options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]

Radio lists support three ways of defining the options, exactly like the drop-down lists. For radio lists the method could return either the simple array: **key => value** or an array of arrays for providing the descriptions: **key => [label, description]**

<a name="field-checkbox" class="anchor" href="#field-checkbox"></a>
### Checkbox

`checkbox` - renders a single checkbox.

    showFullContent:
      label: Show full content?
      type: checkbox
      default: true

<a name="field-partial" class="anchor" href="#field-partial"></a>
### Partial

`partial` - renders a partial, the `path` field can refer to a partial view file otherwise the field name is used as the partial name. Inside the partial the variable `$formModel` is available as the class object `Backend\Classes\FormField`.

    content:
        type: partial
        path: @/plugins/acme/blog/models/comments/_content_field.htm

<a name="field-widget" class="anchor" href="#field-widget"></a>
### Widget

`widget` - renders a custom form widget, the `type` field can refer directly to the class name of the widget or the registered alias name.

    blog_content:
      type: Backend\FormWidgets\RichEditor
      size: huge

<a name="form-widgets" class="anchor" href="#form-widgets"></a>
## Form widgets

There are various form widgets included as standard, although it is common for plugins to provide their own custom form widgets. You can read more on the [Form Widgets](widgets) article.

- [Rich editor / WYSIWYG](#widget-richeditor)
- [Code editor](#widget-codeeditor)
- [File upload](#widget-fileupload)
- [Date picker](#widget-datepicker)
- [Relation](#widget-relation)

<a name="widget-richeditor" class="anchor" href="#widget-richeditor"></a>
### Rich editor / WYSIWYG

`richeditor` - renders a visual editor for rich formatted text, also known as a WYSIWYG editor.

    html_content:
      type: richeditor
      size: huge

<a name="widget-codeeditor" class="anchor" href="#widget-codeeditor"></a>
### Code editor

`codeeditor` - renders a plaintext editor for formatted code or markup. Note the options may be inherited by the code editor preferences defined for the Administrator in the back-end.

    css_content:
      type: codeeditor
      size: huge
      language: html

Option  | Description
------------- | -------------
**language** | code language, for example, php, css, js, html. Default: php.
**showGutter** | shows a gutter with line numbers. Default: true.
**wrapWords** | breaks long lines on to a new line. Default true.
**fontSize** | the text font size. Default: 12.

<a name="widget-fileupload" class="anchor" href="#widget-fileupload"></a>
### File upload

`fileupload` - renders a file uploader for images or regular files. The field name must use an attachOne or attachMany relation.

    avatar:
      label: Avatar
      type: fileupload
      mode: image
      imageHeight: 260
      imageWidth: 260

Option  | Description
------------- | -------------
**mode** | the expected file type, either file or image. Default: file.
**imageWidth** | if using image type, the image will be resized to this width.
**imageWidth** | if using image type, the image will be resized to this height.

<a name="widget-datepicker" class="anchor" href="#widget-datepicker"></a>
### Date picker

`datepicker` - renders a text field used for selecting date and times.

    published_at:
        label: Published
        type: datepicker
        mode: date

Option  | Description
------------- | -------------
**mode** | the expected result, either date, datetime or time. Default: datetime.

<a name="widget-relation" class="anchor" href="#widget-relation"></a>
### Relation

`relation` - renders either a dropdown or checkbox list according to the field relation type.

    categories:
        label: Categories
        type: relation

Option  | Description
------------- | -------------
**nameColumn** | the column name to use in the relation used for displaying the name.
**emptyOption** | text to display when there is no available selections.

<a name="form-views" class="anchor" href="#form-views"></a>
## Form views

For each page your form supports [Create](#form-create-page), [Update](#form-update-page) and [Preview](#form-preview-page) you should provide a [view file](#introduction) with the corresponding name - **create.htm**, **update.htm** and **preview.htm**.

The form behavior adds two methods to the controller class: `formRender()` and `formRenderPreview()`. These methods render the form controls configured with the YAML file described above.

<a name="form-create-view" class="anchor" href="#form-create-view"></a>
### Create view

The **create.htm** view represents the Create page that allows users to create new records. A typical Create page contains breadcrumbs, the form itself, and the form buttons. The **data-request** attribute should refer to the `onSave` AJAX handler provided by the form behavior. Below is a contents of the typical create.htm form.

    <div class="control-breadcrumb">
        <ul>
            <li><a href="<?= Backend::url('acme/blog/categories') ?>">Blog Categories</a></li>
            <li><?= e($this->pageTitle) ?></li>
        </ul>
    </div>

    <?= Form::open(['class'=>'layout-item stretch layout-column']) ?>

        <?= $this->formRender() ?>

        <div class="form-buttons layout-item fix">
            <div class="loading-indicator-container">
                <button 
                    type="button" 
                    data-request="onSave" 
                    data-request-data="close:true" 
                    data-hotkey="ctrl+enter"
                    data-hotkey-mac="cmd+enter"
                    data-load-indicator="Creating Category..." 
                    class="btn btn-default">
                    Create and Close
                </button>
                <span class="btn-text"> or 
                <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a></span>
            </div>
        </div>

    <?= Form::close() ?>

<a name="form-update-view" class="anchor" href="#form-update-view"></a>
### Update view

The **update.htm** view represents the Update page that allows users to update or delete existing records. A typical Update page contains breadcrumbs, the form itself, and the form buttons. The Update page is very similar to the Create page, but usually has the Delete button. The **data-request** attribute should refer to the `onSave` AJAX handler provided by the form behavior. Below is a contents of the typical update.htm form.

    <div class="control-breadcrumb">
        <ul>
            <li><a href="<?= Backend::url('acme/blog/posts') ?>">Blog Categories</a></li>
            <li><?= e($this->pageTitle) ?></li>
        </ul>
    </div>

    <?= Form::open(['class'=>'layout-item stretch layout-column']) ?>

        <?= $this->formRender() ?>

        <div class="form-buttons layout-item fix">
            <div class="loading-indicator-container">
                <button 
                    type="button" 
                    data-request="onSave" 
                    data-request-data="close:true" 
                    data-hotkey="ctrl+enter"
                    data-hotkey-mac="cmd+enter"
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

                <span class="btn-text"> or 
                <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a></span>
            </div>
        </div>
    <?= Form::close() ?>

<a name="form-preview-view" class="anchor" href="#form-preview-view"></a>
### Preview view

The **preview.htm** view represents the Preview page that allows users to preview existing records in the read-only mode. A typical Preview page contains breadcrumbs and the form itself. Below is a contents of the typical preview.htm form.

    <div class="control-breadcrumb">
        <ul>
            <li><a href="<?= Backend::url('rainlab/blog/categories') ?>">Blog Categories</a></li>
            <li><?= e($this->pageTitle) ?></li>
        </ul>
    </div>

    <?= $this->formRenderPreview() ?>


<a name="overriding-behavior" class="anchor" href="#overriding-behavior"></a>
## Overriding default behavior

Sometimes you may wish to use your own logic along with the default form behavior. You can use your own `create()`, `update()` or `preview()` action method in the controller, then call the Form behavior method.

    public function update($recordId, $context = null)
    {
        //
        // Do any custom code here
        //

        // Call the FormController behavior update() method
        return $this->asExtension('FormController')->update($recordId, $context);
    }
