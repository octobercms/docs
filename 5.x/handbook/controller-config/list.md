---
previousPath: extend/lists/list-controller.md#configuring-the-list-behavior
subtitle: Controller Configuration
---
# config_list.yaml

The configuration file referred in the `$listConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](../../backend/panel/controllers.md). Below is an example of a typical list behavior configuration file.

```yaml
# config_list.yaml
title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\Blog\Models\Post
recordUrl: acme/blog/posts/update/:id
```

The following properties are required in the list configuration file.

Property | Description
------------- | -------------
**title** | a title for this list.
**list** | a configuration array or reference to a list column definition file, see [list columns](../list-columns.md).
**modelClass** | a model class name, the list data is loaded from this model.

The configuration properties listed below are optional.

Property | Description
------------- | -------------
**filter** | filter configuration, see [list filters](../../backend/lists/filters.md).
**recordUrl** | link each list record to another page. Eg: **users/update:id**. The `:id` part is replaced with the record identifier. This allows you to link the list behavior and the [form behavior](../../backend/forms/form-controller.md).
**recordOnClick** | custom JavaScript code to execute when clicking on a record.
**noRecordsMessage** | a message to display when no records are found, can refer to a [localization string](../../backend/localization/backend.md).
**deleteMessage** | a message to display when records are bulk deleted, can refer to a [localization string](../../backend/localization/backend.md).
**noRecordsDeletedMessage** | a message to display when a bulk delete action is triggered, but no records were deleted, can refer to a [localization string](../../backend/localization/backend.md).
**recordsPerPage** | records to display per page, use 0 for no pages. Default: `0`
**perPageOptions** | options for number of items per page. Default: `[20, 40, 80, 100, 120]`
**showPageNumbers** | displays page numbers with pagination. Disable this to improve list performance when working with large tables. Default: `true`
**toolbar** | reference to a Toolbar Widget configuration file, or an array with configuration (see below).
**showSorting** | displays the sorting link on each column. Default: `true`
**defaultSort** | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`. The direction can be `asc` for ascending (default) or `desc` for descending order.
**showCheckboxes** | displays checkboxes next to each record. Default: `false`.
**showSetup** | displays the list column set up button. Default: `false`.
**structure** | enables a structured list, see the [sorting records article](../../backend/lists/sorting.md) for more details.
**customViewPath** | specify a custom view path to override partials used by the list, optional.
**customPageName** | specify a custom variable name to use in the page URL for paginated records. Set to `false` to disable storing the page number in the URL. Default: `page`.

## Adding a Toolbar

To include a toolbar with the list, add the following configuration to the list configuration YAML file:

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
```

The toolbar configuration allows:

Property | Description
------------- | -------------
**buttons** | a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.php**
**search** | reference to a Search Widget configuration file, or an array with configuration.

The search configuration supports the following properties:

Property | Description
------------- | -------------
**prompt** | a placeholder to display when there is no active search, can refer to a [localization string](../../backend/localization/backend.md).
**mode** | defines the search strategy to either contain all words, any word or exact phrase. Supported options: `all`, `any`, `exact`. Default: `all`.
**scope** | specifies a [model query scope](../../backend/data/model-queries.md) method defined in the **list model** to apply to the search query. The first argument will contain the query object (as per a regular scope method), the second will contain the search term, and the third will be an array of the columns to be searched.
**searchOnEnter** | setting this to true will make the search widget wait for the Enter key to be pressed before it starts searching (the default behavior is that it starts searching automatically after someone enters something into the search field and then pauses for a short moment).  Default: `false`.

The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a [scoreboard control](https://octobercms.com/docs/ui/scoreboard) with charts. Example of a toolbar partial with the **New Post** button referring to the **create** action provided by the [form behavior](../../backend/forms/form-controller.md):

```php
<div data-control="toolbar">
    <a href="<?= Backend::url('acme/blog/posts/create') ?>"
        class="btn btn-primary">
        <i class="ph ph-plus"></i>
        New Post
    </a>
</div>
```

When using list checkboxes, you may toggle a button's enabled state with the `data-list-checked-trigger` attribute.

```php
<button
    type="button"
    class="btn btn-primary"
    data-list-checked-trigger>
    Delete Selected
</button>
```

You may also pass the checked values to an AJAX request using the `data-list-checked-request` attribute.

```php
<button
    type="button"
    class="btn btn-primary"
    data-request="onDelete"
    data-list-checked-request>
    Delete Selected
</button>
```

## Filtering the List

To filter a list by user defined input, add the following list configuration to the YAML file:

```yaml
filter: $/acme/blog/models/post/scopes.yaml
```

The **filter** property should make reference to a [filter configuration file](../../backend/lists/filters.md) path or supply an array with the configuration.
