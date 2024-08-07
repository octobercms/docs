---
subtitle: Form Widget
shortname: Code Editor
---
# Code Editor Field

`codeeditor` - renders a plaintext editor for formatted code or markup. Note the options may be inherited by the code editor preferences defined for the Administrator in the back-end.

```yaml
css_content:
    type: codeeditor
    size: huge
    language: html
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**language** | code language, for example, php, css, javascript, html. Default: `php`.
**showGutter** | shows a gutter with line numbers. Default: `true`.
**wrapWords** | breaks long lines on to a new line. Default `true`.
**fontSize** | the text font size. Default: 12.
