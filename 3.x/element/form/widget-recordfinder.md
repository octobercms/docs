---
subtitle: Form Widget
---
# Record Finder

`recordfinder` - renders a field with details of a related record. Expanding the field displays a popup list to search large amounts of records. Supported by singular relationships only.

```yaml
user:
    label: User
    type: recordfinder
    list: ~/plugins/rainlab/user/models/user/columns.yaml
    recordsPerPage: 10
    title: Find Record
    nameFrom: name
    descriptionFrom: email
```

Option | Description
------------- | -------------
**keyFrom** | the name of column to use in the relation used for key. Default: id.
**nameFrom** | the column name to use in the relation used for displaying the name. Default: name.
**descriptionFrom** | the column name to use in the relation used for displaying a description. Default: description.
**title** | text to display in the title section of the popup.
**list** | a configuration array or reference to a list column definition file.
**recordsPerPage** | records to display per page, use 0 for no pages. Default: 10
**conditions** | specifies a raw where query statement to apply to the list model query.
**scope** | applies a [query scope method](../../extend/database/model.md) to the **related form model**, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.
**searchMode** | defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: all.
**searchScope** | specifies a [query scope method](../../extend/database/model.md) defined in the **related form model** to apply to the search query, the first argument will contain the search term.
**useRelation** | flag for using the name of the field as a relation name to interact with directly on the parent model. Default: true. Disable to return just the selected model's ID
**modelClass** | class of the model to use for listing records when useRelation = false
