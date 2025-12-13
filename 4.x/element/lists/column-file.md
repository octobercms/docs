---
subtitle: List Column
shortname: File
---
# File Column

The `file` column displays a file attachment with an icon based on the file extension.

```yaml
attachment:
    label: Attachment
    type: file
```

The following properties are supported.

Property | Description
------------- | -------------
**sortable** | disables sorting of the column. Default: `false`
**clickable** | when enabled, clicking the file icon opens the file in a new window. Default: `true`
**limit** | the maximum number of files to display. Default: `3`

Use the `sortable` property to disable sorting.

```yaml
attachment:
    label: Attachment
    type: file
    sortable: false
```

Use the `clickable` property to disable clicking on the file icon. When set to `false`, the file icon is displayed without a link. This is useful when you want the row click action to take precedence.

```yaml
attachment:
    label: Attachment
    type: file
    clickable: false
```

Use the `limit` property to specify the maximum number of files to display when using an `attachMany` relationship.

```yaml
attachments:
    label: Attachments
    type: file
    limit: 5
```

The column automatically detects `attachOne` and `attachMany` relationships and displays the appropriate file icon based on the file extension. Supported file types include documents (PDF, DOC, TXT), spreadsheets (XLS, CSV), images (JPG, PNG, SVG), audio, video, code files, and archives.

#### See Also

::: also
* [Image Column](./column-image.md)
:::
