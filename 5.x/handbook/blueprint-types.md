---
previousPath: cms/tailor/blueprints.md
subtitle: The template structure for your website content.
---
# Blueprint Types

Blueprints define the content structure for Tailor, written as YAML files. The `type` property sets the blueprint type, which determines how the content is managed.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Post Content
        type: richeditor
```

## Available Types

The following blueprint types are available.

Type | Description
------------- | -------------
[`entry`](./blueprint-types/entry.md) | a basic entry for common purposes.
[`single`](./blueprint-types/single.md) | a single entry with dedicated fields, for example a Contact Us page.
[`structure`](./blueprint-types/structure.md) | a defined structure of entries, for example documentation pages.
[`stream`](./blueprint-types/stream.md) | a stream of time stamped entries, for example blog posts.
[`global`](./blueprint-types/global.md) | globally available content, for example social networking links.
[`mixin`](./blueprint-types/mixin.md) | a group of fields reused across blueprints to avoid repetition.
[`submission`](./blueprint-types/submission.md) | user generated content submitted from the frontend, for example contact forms.
