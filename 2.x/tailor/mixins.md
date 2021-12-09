# Mixins

Mixins are groups of fields that are used to avoid repetition when defining content structures. For example, a Location field may be used in several places, yet we can define it once using a mixin definition.

Below is an example blueprint of a mixin:

```yaml
name: Location
handle: location
group: General
fields:
    # ...
```

Including a mixin:

```yaml
blog_content:
    source: xxxxxxxx-0444-40d8-9f93-89c002f8a909
    type: mixin
```