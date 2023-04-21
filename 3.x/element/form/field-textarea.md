---
subtitle: Form Field
---
# Textarea

The `textarea` field renders a multiline text box.

```yaml
blog_contents:
    type: textarea
    label: Contents
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**title** | title for the form field.
**default** | specifies a default string value, optional.
**placeholder** | text to display when the field is empty.
**comment** | places a descriptive comment below the field.
**size** | the field size in height. Supported values: `tiny`, `small`, `large`, `huge`, `giant`. Default: `large`.

You may specify how large the field size should be with the `size` property.

```yaml
blog_contents:
    type: textarea
    label: Contents
    size: large
```

You may use the `default` property to set a default value.

```yaml
quote_content:
    type: textarea
    label: Details
    default: I like turtles
```

Use the `placeholder` property to assign some placeholder text.

```yaml
point_summary:
    type: textarea
    label: Point
    placeholder: Type some key points are you trying to make
```
