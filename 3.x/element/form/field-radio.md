# Radio List

`radio` - renders a list of radio options, where only one item can be selected at a time.

```yaml
security_level:
    label: Access Level
    type: radio
    default: guests
    options:
        all: All
        registered: Registered only
        guests: Guests only
```

Radio lists can also support a secondary description.

```yaml
security_level:
    label: Access Level
    type: radio
    options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]
```

Radio lists support the same methods for defining the options as the [dropdown field type](#field-dropdown). For radio lists the method could return either the simple array: **key => value** or an array of arrays for providing the descriptions: **key => [label, description]**. Options can be displayed inline with each other instead of in separate rows by specifying `cssClass: 'inline-options'` on the radio field config.
