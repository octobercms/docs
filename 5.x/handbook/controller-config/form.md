---
previousPath: extend/forms/form-controller.md#configuring-the-form-behavior
subtitle: Controller Configuration
---
# config_form.yaml

The configuration file referred in the `$formConfig` property is defined in YAML format. The file should be placed into the [controller's view directory](../../backend/panel/views.md). Below is an example of a typical form behavior configuration file.

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
**form** | a configuration array or reference to a form field definition file, see [form fields](../form-fields.md).
**modelClass** | a model class name, the form data is loaded and saved against this model.

The configuration properties listed below are optional. Define them if you want the form behavior to support the Create, Update or Preview pages.

Property | Description
------------- | -------------
**design** | display the form using a specific form design mode when rendering (see below).
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**create** | a configuration array or reference to a config file for the Create page.
**update** | a configuration array or reference to a config file for the Update page.
**preview** | a configuration array or reference to a config file for the Preview page.
**customMessages** | customize the messages used in the Form Controllers.
**permissions** | apply restrictions to certain actions provided by the Form Controller.

## Create Page

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
**title** | a page title, can refer to a [localization string](../../backend/localization/backend.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and the **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the create page only.

## Update Page

To support the Update page add the following configuration to the YAML file.

```yaml
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
```

The following properties are supported for the Update page.

Property | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../../backend/localization/backend.md).
**redirect** | redirection page when record is saved.
**redirectClose** | redirection page when record is saved and **close** post variable is sent with the request.
**form** | overrides the default form fields definitions for the update page only.

## Preview Page

To support the Preview page add the following configuration to the YAML file:

```yaml
preview:
    title: View Blog Post
```

The following properties are supported for the Preview page.

Property  | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../../backend/localization/backend.md).
**form** | overrides the default form fields definitions for the preview page only.

## Custom Messages

Specify the `customMessages` property to override the default messages used by the Form Controller. The values can be plain text or can refer to a [localization string](../../backend/localization/backend.md).

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

## Restricting with Permissions

Specify the `permissions` property to apply restrictions to actions provided by the Form Controller. Use [permission values](../../backend/panel/permissions.md) that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

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

## Form Designs

The `create:controller` command generates [a controller](../../backend/panel/controllers.md) and supports the `--design` option to implement the desired display mode, as described below.

```bash
php artisan create:controller Acme.Blog Posts --design=popup
```

Form designs are a useful when you need to display the form without managing the HTML contents, which is less flexible but can make the process of building forms faster.

```yaml
design:
    displayMode: basic
```

The **design** property, in the behavior configuration, controls how the form is displayed. The following properties are supported.

Property | Description
------------- | -------------
**displayMode** | specifies the display mode to use, supported values: `custom`, `basic`, `survey`, `sidebar`, `popup`, `document`. Default: `basic`
**horizontalMode** | show form fields in horizontal orientation. Default: `false`
**surveyMode** | disables tabs and displays all fields on the page in sections with headers. Default: `false`
**size** | size of the page container, supported values: `50` stepped increments between `400`-`1200`, `auto`. Default: `auto`
**sidebarSize** | width of the sidebar in `sidebar` mode, supported values `50` steps between `300`-`750`. Default: `300`
**secondaryLabel** | label for the secondary tabs popover button in `document` mode. Default: `Options`

Use the `formRenderDesign` method to render the form design inside the **create.php**, **update.php** and **preview.php** view files.

```php
<?= $this->formRenderDesign() ?>
```

### Display Modes

When using a **design** display mode in the behavior configuration, the view contents are generated using standard form contents provided by the system.

The following **displayMode** values are supported with their descriptions.

Display Mode | Description
------------- | -------------
**custom** | Render the form using custom view files (default)
**basic** | Basic layout with for standard forms
**survey** | Survey layout using stacked sections with headings
**sidebar** | Sidebar layout where secondary tabs are rendered in the side panel
**popup** | Form contents are managed inside popup windows
**document** | Full-height document layout with a Vue-powered toolbar and secondary tabs in a popover

The **size** property defines the size of the page container or the popup size.

```yaml
design:
    displayMode: survey
    size: 950
```

### Popup Display Mode

If the **design** is set to use the `popup` display mode, then you don't need to create any view files at all. All the form management features are contained inside a popup window.

```yaml
design:
    displayMode: popup
    size: 750
```

When integrated with the [list controller](../../backend/lists/list-controller.md), set the **recordOnClick** property to `popup` to open the manage view when clicking a record.

```yaml
# config_list.yaml
recordOnClick: popup
```

The **recordOnClick** also supports passing a context to the Form Controller, for example, set the value to `popup@preview` for the preview context.

```yaml
# config_list.yaml
recordOnClick: popup@preview
```

The create view can be opened using the `onLoadPopupForm` AJAX handler in conjunction with the popup control, as in the example below.

```html
<button
    type="button"
    data-control="popup"
    data-handler="onLoadPopupForm"
    class="btn btn-primary">
    New Item
</button>
```

### Document Display Mode

The `document` display mode provides a full-height layout with a Vue-powered toolbar that includes **Save**, **Save & Close**, and **Delete** buttons.

```yaml
design:
    displayMode: document
```

The three form field areas are rendered in specific locations within the document layout.

- **Outside fields** are displayed in the document header area above the toolbar.
- **Primary tabs** are rendered as the main content area below the toolbar.
- **Secondary tabs** are placed inside a popover, accessible from a button in the document header.

The secondary tabs popover button label defaults to **Options** and can be customized using the `secondaryLabel` property. The button is only shown when secondary tab fields are defined.

```yaml
design:
    displayMode: document
    secondaryLabel: Settings
```

Form fields with `span: adaptive` will automatically inject their toolbar buttons into the document toolbar. This is useful for widgets like the rich editor and markdown editor that provide formatting toolbars.

```yaml
fields:
    content:
        label: Content
        type: richeditor
        tab: Edit
        span: adaptive
```

The document design can also be applied to specific form contexts. For example, to use the document layout for create and update pages, but not the preview page.

```yaml
create:
    design:
        displayMode: document

update:
    design:
        displayMode: document

preview:
    design:
        size: auto
```
