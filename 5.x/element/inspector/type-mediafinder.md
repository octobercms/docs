---
subtitle: Inspector Type
shortname: Media Finder
---
# Media Finder Inspector Type

The `mediafinder` inspector type allows the selection of a file from the media library. Clicking the field opens the media manager popup where a single file can be chosen. The selected file path is displayed in the field and can be cleared with the clear button or by pressing Backspace.

```php
public function defineProperties()
{
    return [
        'backgroundImage' => [
            'title' => 'Background Image',
            'type' => 'mediafinder',
            'mediaType' => 'image',
            'placeholder' => 'Click to select an image'
        ]
    ];
}
```

The generated output is a string value containing the relative path to the selected media file, for example:

```json
"backgroundImage": "/media/images/background.jpg"
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default file path value, optional.
**mediaType** | filters the allowed file type. Supported values: `image`, `file`. When set to `image`, only image files can be selected. Default: `file`.
**placeholder** | placeholder text displayed when no file is selected. Default: `Click to select a file`.
