# Sections

Sections are used to define areas of your website and are populated with content entries. The content structures and entries can be structured in different ways. The blueprints are located in the **sections/** directory.

Below is an example blueprint of a section:

```yaml
name: Blog
handle: blog
type: feed
entries:
    # ...
```

Each section can structure its content according to its type. The following types are supported:

Type | Purpose
------ | --------
`solo` | A single page with dedicated fields, eg: Contact Us Page
`tree` | A defined structure of pages, eg: Documentation Pages
`feed` | A stream of time stamped pages, eg: Blog Posts

## Entries

Entries are content records that belong to a section. They can specify a date for the content to be published and a slug to allow the content to be displayed in a [page URL](../cms/pages#url-syntax).

### Entry Types

Each entry can have a different type as defined by the **entries** property in the blueprint file. For example, a blog section may have a regular post and a featured post, and these are two entry types.

```yaml
entries:
    regular_post:
        name: Regular Post
        fields:
            # ...

    featured_post:
        name: Featured Post
        fields:
            # ...
```

### Versioning

Sections do not capture the version history of each change by default, you may enable version history with the `useVersions` attribute of a blueprint.

```yaml
useVersions: true
```
