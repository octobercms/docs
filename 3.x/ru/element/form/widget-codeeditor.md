# Code Editor

`codeeditor` - renders a plaintext editor for formatted code or markup. Note the options may be inherited by the code editor preferences defined for the Administrator in the back-end.

```yaml
css_content:
    type: codeeditor
    size: huge
    language: html
```

Option | Description
------------- | -------------
**language** | code language, for example, php, css, javascript, html. Default: `php`.
**showGutter** | shows a gutter with line numbers. Default: `true`.
**wrapWords** | breaks long lines on to a new line. Default `true`.
**fontSize** | the text font size. Default: 12.
