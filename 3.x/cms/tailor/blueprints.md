---
subtitle: The template structure for your website content.
---
# Blueprints

## Entry

An entry blueprint is the standard content structure used to define areas of your website. The content structures and entries can be organised in different ways as we describe in more detail here.

The `entry` type supports multiple entries and should be used when no other variant applies.

```yaml
handle: Team\Member
type: entry
name: Team Member

fields:
    name:
        label: First Name
        type: text
```

The following properties are supported by the entry blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**type** | The blueprint type which can be a variant of `entry`, `single`, `structure` or `stream`.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../../element/form-fields.md).
**groups** | references a group of form fields placing the entry in group mode (see below).
**structure** | structure configuration supplied when using the `structure` type.
**drafts** | enables drafts for this entry. Default: `false`
**multisite** | enables multisite for this entry, sync records between group, locale or all sites. Supported values: `true`, `false`, `sync`, `locale`, `all`. Default: `false`
**pagefinder** | includes blueprint type in the [pagefinder form widget](../../element/form/widget-pagefinder.md), supported values: `true`, `false`, `item`, `list` or array (see below). Default: `true`
**customMessages** | customize the messages used in the user interface (see below).
**showExport** | displays a toolbar button for exporting records. Default: `true`.
**showImport** | displays a toolbar button for importing records. Default: `true`.

### Entry Variants

While an entry type has no specific behavior, there are also several variants that can be used for organising content. The following types are variants of an entry.

- **entry** is a basic entry for common purposes.
- **single** is a single entry with dedicated fields, eg: Contact Us Page.
- **structure** is a defined structure of entries, eg: Documentation Pages.
- **stream** is a stream of time stamped entries, eg: Blog Posts.

#### Single Entries

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

#### Structure Entries

The `structure` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section. Entries of the type `structure` are sortable. Their sort order can be adjusted by dragging them in the list view. The following defines a **Documentation** tree section with an Article Content (`article_content`) markdown field.

```yaml
handle: Docs\Article
type: structure
name: Documentation Article

fields:
    content:
        label: Article Content
        type: markdown
```

By default structures support unlimited nesting, however, you may specify a maximum depth for the tree using `maxDepth` in the `structure` property. In the next example there can only be a top level and a second level.

```yaml
# ...
type: structure

structure:
    maxDepth: 2
    # ...
```

The following values are supported by the `structure` property.

Property | Description
-------- | -------------
**maxDepth** | Maximum depth for the structure. Default: `0` for unlimited.
**treeExpanded** | if tree nodes should be expanded by default. Default: `true`
**showReorder** | displays an interface for reordering records. Default: `true`
**showSorting** | allows sorting records, disables the structure when sorted. Default: `true`

#### Stream Entries

The `stream` type is used for time-based entries that are often listed in chronological order. This is useful for publishing recent activity, such as a Blog section. The following defines a **Blog** feed section with a Post Content (`content`) rich editor field.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Post Content
        type: richeditor
```

### Content Groups

All entries optionally support the ability to define multiple content groups for a section. For example, a blog section may have a regular post and a featured post, and these are two entry groups.

Entry groups are defined by the **groups** property in the section blueprint file and different **fields** can be specified for each type. The selected group value is available as the `content_group` attribute on the record.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

groups:
    regular_post:
        name: Regular Post
        fields:
            # ...

    featured_post:
        name: Featured Post
        fields:
            # ...
```

::: tip
It is recommended to use [mixin blueprints](#mixin) to group common field definitions.
:::

### Custom Messages

Specify the `customMessages` property to override the default messages used by the interface. The values can be plain text or can refer to a [localization string](../../extend/system/localization.md).

```yaml
customMessages:
    buttonCreate: Create New Event
```

The following messages are available to override as custom messages.

::: details View the list of available messages
Message | Default Message
------------- | -------------
**buttonCreate** | Create :name Entry
**titleIndexList** | Manage :name Entries
**titleCreateForm** | Create :name
**titleUpdateForm** | Update :name
**pagefinderItemType** | :name Entry
**pagefinderListType** | All :name Entries
:::

### Page Finder Configuration

By default, all entries are included in the [page finder](../../element/form/widget-pagefinder.md) lookup values. This can be disabled by setting the **pagefinder** to `false`.

```yaml
pagefinder: false
```

You may restrict the page finder context to only allow locating the page as a single `item` (e.g. Blog Post) or a `list` of items (e.g. All Blog Posts), or when set to `all` will display both.

```yaml
pagefinder: item
pagefinder: list
```

The page finder will automatically resolve the `id`, `code`, `slug` and `fullslug` attributes and use them as replacements in the [page URL parameters](../themes/pages.md). You may specify custom **replacements** as an array using the **pagefinder** properties, including the optional **context** from above.

```yaml
pagefinder:
    context: list
    replacements: []
```

Each replacement key should match a URL parameter name and use a dot notation path to the attribute value. Take the following URL example for a blog post page.

```ini
url = "/blog/post/:author/:category/:slug/:id"
```

The following **replacements** will set the `:author` parameter to the related author slug attribute value, and the `:category` parameter to the first related categories slug attribute value.

```yaml
pagefinder:
    replacements:
        author: author.slug
        category: categories.0.slug
```

## Global

Globals are used to define globally available content for your website. The field values are often used in [CMS layouts](../../cms/themes/layouts.md) and contain settings, such as social networking links.

The following defines a **Footer Config** global with a Facebook Link (`facebook_link`) text field.

```yaml
handle: Site\Footer
name: Footer Config

fields:
    facebook_link:
        label: Facebook Link
        type: text
```

The following properties are supported by the global blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../../element/form-fields.md).
**multisite** | enables multisite for this entry, supported values: `true`, `false`. Default: `false`
**formSize** | the settings form size, supported values: `tiny`, `small`, `medium`, `large`, `huge`, `giant`, `adaptive`. Default: `huge`.

## Mixin

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
**fields** | form fields belonging to the group, see [backend form fields](../../element/form-fields.md).

::: tip
Consider prefixing the mixin file and field names with an underscore (\_) to make the blueprint type easy to find. For example: `_location_fields.yaml`
:::

### Using the Mixin

To include these fields in your entries, like any other form field, use the `type` of **mixin** and reference the UUID or handle in the `source` property.

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

See the [Mixin field](../../element/content/field-mixin.md) for more information on using mixins.

#### See Also

::: also
* [Mixin Content Field](../../element/content/field-mixin.md)
:::
