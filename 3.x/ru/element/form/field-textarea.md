# Textarea

The `textarea` field renders a multiline text box.

```yaml
blog_contents:
    type: textarea
    label: Contents
```

The following properties are supported.

Property | Description
------------- | -------------
**size** | the field size. Supported values: tiny, small, large, huge, giant. Default: `large`.
**default** | a default value to use for new records.
**placeholder** | text to display when the field is empty.

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
