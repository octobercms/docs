# Mixin

Mixins are groups of fields that are used to avoid repetition when defining content structures. For example, a Location field may be used in several places, yet we can define it once using a mixin definition.

The following defines a **Location** collection with Country (`country_code`) and State (`state_code`) text fields.

```yaml
handle: Fields\Location
name: Location

fields:
    country_code:
        label: Country
        type: text

    state_code:
        label: State
        type: text
```

The following properties are supported by the mixin blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../../element/definitions.md).


## Using the Mixin

To include these fields in your entries, like any other form field, use the `type` of **mixin** and reference the UUID in the `source` property.

```yaml
_location:
    type: mixin
    source: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
```

You may also reference the mixin by its handle.

```yaml
_location:
    type: mixin
    source: Fields\Location
```
