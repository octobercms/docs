---
previousPath: cms/tailor/blueprints.md#mixin
subtitle: Blueprint Type
shortname: Mixin
---
# Mixin Blueprint

Mixins are groups of fields that are used to avoid repetition when defining content structures. For example, a Location field may be used in several places, yet we can define it once using a mixin definition.

The following defines a **Location** collection with Country (`country_code`) and State (`state_code`) text fields.

```yaml
handle: Fields\Location
type: mixin
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
**fields** | form fields belonging to the group, see [backend form fields](../form-fields.md).

::: tip
Consider prefixing the mixin file and field names with an underscore (\_) to make the blueprint type easy to find. For example: `_location_fields.yaml`
:::

## Using the Mixin

To include these fields in your entries, like any other form field, use the `type` of **mixin** and reference the UUID or handle in the `source` property.

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

See the [Mixin field](../tailor-fields/mixin.md) for more information on using mixins.

### See Also

::: also
* [Mixin Content Field](../tailor-fields/mixin.md)
:::
