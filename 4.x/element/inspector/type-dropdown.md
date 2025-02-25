---
subtitle: Inspector Type
shortname: Dropdown
---
# Dropdown Inspector Type

The `dropdown` inspector type is used to make a single from a set of predefined options. The option list for dropdown and set properties can be static or dynamic. Static options are defined with the `options` element of the property definition.

```php
public function defineProperties()
{
    return [
        'unit' => [
            'title' => 'Unit',
            'type' => 'dropdown',
            'default' => 'imperial',
            'placeholder' => 'Select units',
            'options' => ['metric' => 'Metric', 'imperial' => 'Imperial']
        ]
    ];
}
```

The generated output is a string value corresponding to the selected option, for example:

```json
"unit": "metric"
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default string value, optional.
**options** | array of options for dropdown properties, optional if defining a `get*PropertyName*Options` method.

## Dynamic Options

The list of options could be fetched dynamically from the server when the Inspector is displayed. If the `options` parameter is omitted in a dropdown or set property definition the option list is considered dynamic. The component class must define a method returning the option list. The method should have a name in the following format: `get*PropertyName*Options`, where **Property** is the property name, for example: `getCountryOptions`. The method returns an array of options with the option values as keys and option labels as values. Example of a dynamic dropdown list definition.

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ]
    ];
}

public function getCountryOptions()
{
    return ['us' => 'United states', 'ca' => 'Canada'];
}
```

Dynamic dropdown and set lists can depend on other properties. For example, the state list could depend on the selected country. The dependencies are declared with the `depends` parameter in the property definition. The next example defines two dynamic dropdown properties and the state list depends on the country.

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ],
        'state' => [
            'title' => 'State',
            'type' => 'dropdown',
            'default' => 'dc',
            'depends' => ['country'],
            'placeholder' => 'Select a state'
        ]
    ];
}
```

In order to load the state list you should know what country is currently selected in the Inspector. The Inspector POSTs all property values to the `getPropertyOptions` handler, so you can do the following.

```php
public function getStateOptions()
{
    // Load the country property value from POST
    $countryCode = post('country');

    $states = [
        'ca' => ['ab' => 'Alberta', 'bc' => 'British columbia'],
        'us' => ['al' => 'Alabama', 'ak' => 'Alaska']
    ];

    return $states[$countryCode];
}
```

## Page List Properties

Sometimes components need to create links to the website pages. For example, the blog post list contains links to the blog post details page. In this case the component should know the post details page file name (then it can use the [page Twig filter](../../markup/filter/page.md)). October includes a helper for creating dynamic dropdown page lists. The next example defines the postPage property which displays a list of pages:

```php
public function defineProperties()
{
    return [
        'postPage' => [
            'title' => 'Post page',
            'type' => 'dropdown',
            'default' => 'blog/post'
        ]
    ];
}

public function getPostPageOptions()
{
    return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
}
```
