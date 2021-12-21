# Mixins

Mixins are groups of fields that are used to avoid repetition when defining content structures. For example, a Location field may be used in several places, yet we can define it once using a mixin definition.

::: dir
├── app
|   └── blueprints
|       └── `mixins`
|           └── home-sections.yaml
:::

The following defines a **Location** collection with Country (`country_code`) and State (`state_code`) text fields.

```yaml
uuid: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
name: Location
handle: location
group: General
fields:
    country_code:
        label: Country
        type: text

    state_code:
        label: State
        type: text
```

To include these fields in your entries, like any other form field, use the `type` of **mixin** and reference the UUID in the `source` property.

```yaml
_location:
    type: mixin
    source: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
```
