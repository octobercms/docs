---
subtitle: Form Field
---
# Text

The `text` field renders a single line text box. This is the default type used if no type is specified.

```yaml
blog_title:
    type: text
    label: Blog Title
```

The following [field properties](../form-fields.md) are commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**placeholder** | text to display in the field when it is empty.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.

You may use the `default` property to set a default value.

```yaml
quote_content:
    type: text
    label: Details
    default: I like turtles
```

Use the `placeholder` property to assign some placeholder text.

```yaml
point_summary:
    type: text
    label: Point
    placeholder: Type some key points are you trying to make
```
