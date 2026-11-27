---
subtitle: List Column
shortname: Actions
---
# Actions Column

The `actions` column displays a menu of actions for each row.

```yaml
_actions:
    label: ''
    type: actions
    buttons:
        edit:
            label: Edit
            icon: ph ph-pencil-simple
            url: acme/blog/posts/update/:id
        delete:
            label: Delete
            icon: ph ph-trash
            type: danger
            handler: onDeletePost
            confirm: Delete ":title"?
            requestData:
                id: ':id'
```

The following properties are supported.

Property | Description
------------- | -------------
**buttons** | the menu items, as an array of button definitions or a reference to a YAML file that defines them in a `buttons` property.
**icon** | icon CSS class for the button that opens the menu, optional.
**sortable** | the column has no value to sort by. Default: `false`
**clickable** | the menu is not part of the row link. Default: `false`

The column name does not need to match a model attribute. Set the `label` to an empty string to leave the column header blank.

Use a YAML file to share the same menu between lists.

```yaml
_actions:
    label: ''
    type: actions
    buttons: $/acme/blog/controllers/posts/row_actions.yaml
```

## Button Properties

Each button definition is an item in the menu. The following properties are supported.

Property | Description
------------- | -------------
**label** | text to display for the item.
**icon** | icon CSS class for the item, e.g. `ph ph-pencil-simple`.
**type** | colors the item. Supported values: `default`, `primary`, `secondary`, `danger`, `success`, `warning`, `info`.
**url** | makes the item a link to a backend URL.
**handler** | makes the item call an AJAX handler.
**popup** | used with `handler`, opens the handler response in a popup. Default: `false`
**confirm** | a confirmation message to show before the request is sent.
**requestData** | an array of data to send with the request.
**attributes** | an array of HTML attributes to add to the item.
**visible** | set to `false` to hide the item, or to the name of a controller method that returns a boolean. Default: `true`
**disabled** | disables the item, set to `true` or to the name of a controller method. Default: `false`
**active** | marks the item with a check, set to `true` or to the name of a controller method. Default: `false`
**permissions** | the [permissions](../../backend/panel/permissions.md) that the current backend user must have to see the item. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**header** | displays the item as a heading for the items below it.
**items** | button definitions to display in a submenu.

Set an item to the word `divider` to draw a line between items.

```yaml
buttons:
    edit:
        label: Edit
        url: acme/blog/posts/update/:id
    deleteDivider: divider
    delete:
        label: Delete
        type: danger
        handler: onDeletePost
```

## Record Values

The `url`, `confirm` and `requestData` properties replace each `:name` placeholder with the attribute of that name from the row's record.

```yaml
publish:
    label: Publish
    handler: onPublishPost
    confirm: Publish ":title"?
    requestData:
        id: ':id'
```

A controller method named by the `visible`, `disabled` or `active` property receives the button definition and the row's record. A row with no visible items does not display the menu.

```yaml
publish:
    label: Publish
    handler: onPublishPost
    visible: isPostDraft
```

```php
public function isPostDraft($button, $record)
{
    return !$record->is_published;
}
```

#### See Also

::: also
* [List Controller](../../backend/lists/list-controller.md)
* [Custom List Widgets](../../backend/lists/list-widgets.md)
:::
