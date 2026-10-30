---
previousPath: cms/tailor/blueprints.md#single-entries
subtitle: Blueprint Type
shortname: Single
---
# Single Blueprint

The `single` type will force a single entry for each section definition. This is useful for one-off content, such as a Home page or Contact Us page. The following defines a **Homepage** section with a Welcome Message (`welcome_message`) text field.

```yaml
handle: Homepage
type: single
name: Homepage Content

fields:
    welcome_message:
        label: Welcome Message
        type: text
```

The [entry blueprint properties](./entry.md) are also supported, including [content groups](./entry.md#content-groups) and [custom messages](./entry.md#custom-messages).
