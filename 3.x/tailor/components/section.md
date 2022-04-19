# Section

Defines a website section with a supporting entry.

Attaching the sectionto a page.

```ini
[section author]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"
```

Showing the entry.

```twig
<h1>Posts by {{ author.title }}</h1>
```

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).
**entrySlug** | The value to use to look up the entry by its `slug` attribute.
**fullSlug** | Use the full slug when looking up the entry, structured entries only. Default: `false`
**entryDefault** | Make this the default page when previewing the entry. Default: `true`.
