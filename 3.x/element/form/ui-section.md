---
subtitle: Form UI
---
# Section

The `section` UI element renders a section heading and subheading. The `label` and `comment` values are optional and contain the content for the heading and subheading.

```yaml
_section1:
    type: section
    label: User details
    comment: This section contains details about the user.
```

The following [field properties](../form-fields.md) are supported.

Property | Description
------------- | -------------
**label** | title text for the section.
**comment** | secondary text for the section.
**displayMode** | determines how to display the section, as either `simple` or `heading`. Default: `heading`

To display a simple comment instead of a heading in the section, set the `displayMode` property.

```yaml
_section1:
    type: section
    label: These fields are used to calculate some other fields.
    displayMode: simple
```
