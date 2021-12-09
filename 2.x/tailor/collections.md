# Collections

Collections are used to store auxiliary data, such as menu items, categories and tags. The blueprints are located in the **collections** directory. Collections are similar to [Sections](../tailor/sectiond.md) except they do not use entry types.

::: dir
├── app
|   └── blueprints
|       └── `collections`
|           └── blog-categories.yaml
:::

Below is an example blueprint of a collection:

```yaml
name: Blog Categories
handle: blog_categories
fields:
    # ...
```
