# Sensitive

`sensitive` - renders a revealable password field that can be used for sensitive information such as API keys or secrets, configuration values, etc. A sensitive field can be toggled visible and hidden at the user's request.

A sensitive field that contains a previously entered value will have the value replaced with a placeholder value on load, preventing the value from being guessed by length or copied. Upon revealing the value, the original value is retrieved by AJAX and populated into the field.

```yaml
api_secret:
    type: sensitive
    allowCopy: false
    hideOnTabChange: true
```

Option | Description
------------- | -------------
**mode** | display mode for the widget, either textarea or text. Default: text
**allowCopy** | adds a "copy" action to the sensitive field, allowing the user to copy the password without revealing it. Default: true
**hiddenPlaceholder** | sets the placeholder text that is used to simulate a hidden, unrevealed value. You can change this to a long or short string to emulate different length values. Default: `__hidden__`
**hideOnTabChange** | if true, the sensitive field will automatically be hidden if the user navigates to a different tab, or minimizes their browser. Default: true
