---
previousPath: cms/tailor/blueprints.md#entry
subtitle: Blueprint Type
shortname: Entry
---
# Entry Blueprint

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
**fields** | form fields belonging to the group, see [backend form fields](../form-fields.md).
**groups** | references a group of form fields placing the entry in group mode (see below).
**structure** | structure configuration supplied when using the `structure` type.
**drafts** | enables drafts for this entry. Default: `false`
**softDeletes** | enables soft deletion for this entry. Default: `true`
**multisite** | enables multisite for this entry, sync records between group, locale or all sites. Supported values: `true`, `false`, `sync`, `locale`, `all`. Default: `false`
**pagefinder** | includes blueprint type in the [pagefinder form widget](../form-fields/pagefinder.md), supported values: `true`, `false`, `item`, `list` or array (see below). Default: `true`
**defaultSort** | used by the `entry` and `stream` types, sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`. The direction can be `asc` for ascending (default) or `desc` for descending order.
**customMessages** | customize the messages used in the user interface (see below).
**showExport** | displays a toolbar button for exporting records. Default: `true`.
**showImport** | displays a toolbar button for importing records. Default: `true`.
**modelClass** | replaces the PHP model class with a [custom model instance](../../themes/tailor/models.md).
**permissions** | customize the permission `code` and `label` registered for this blueprint (see below).

## Entry Variants

While an entry type has no specific behavior, there are also several variants that can be used for organizing content. The following types are variants of an entry and support the same properties.

- [single](./single.md) is a single entry with dedicated fields, eg: Contact Us Page.
- [structure](./structure.md) is a defined structure of entries, eg: Documentation Pages.
- [stream](./stream.md) is a stream of time stamped entries, eg: Blog Posts.

## Content Groups

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
It is recommended to use [mixin blueprints](./mixin.md) to group common field definitions.
:::

## Custom Messages

Specify the `customMessages` property to override the default messages used by the interface. The values can be plain text or can refer to a [localization string](../../backend/localization/backend.md).

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

## Disabling Required Fields

The entry record will require the `title` and `slug` fields to be populated before they can be saved, additionally, the `slug` field must also be unique. You may modify this functionality by overriding these fields in your blueprint. Either by setting the `validation` property to **false** or setting the `hidden` property to **true** and hiding it from the user interface. The following example will disable the validation for both fields and hide the slug field.

```yaml
fields:
    title:
        validation: false

    slug:
        hidden: true
```

## Page Finder Configuration

By default, all entries are included in the [page finder](../form-fields/pagefinder.md) lookup values. This can be disabled by setting the **pagefinder** to `false`.

```yaml
pagefinder: false
```

You may restrict the page finder context to only allow locating the page as a single `item` (e.g. Blog Post) or a `list` of items (e.g. All Blog Posts), or when set to `all` will display both.

```yaml
pagefinder: item
pagefinder: list
```

The page finder will automatically resolve the `id`, `code`, `slug` and `fullslug` attributes and use them as replacements in the [page URL parameters](../../themes/pages.md). You may specify custom **replacements** as an array using the **pagefinder** properties, including the optional **context** from above.

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

## Custom Permissions

Every blueprint registers permissions in the admin panel, and by default the permission code is based on the blueprint UUID and the label is based on the blueprint name. When multiple blueprints share the same name, the `permissions` property is used to make them easier to identify.

```yaml
name: Tag
handle: Blog\Tag

permissions:
    label: Blog Tags
```

Specify a custom `code` to give the permission a readable code, this can also be used to share a single permission definition between multiple blueprints by giving them the same code.

```yaml
permissions:
    code: blog_tags
    label: Blog Tags
```

The following values are supported by the `permissions` property.

Property | Description
-------- | -------------
**code** | a custom permission code used in place of the blueprint UUID.
**label** | a custom label to display in the permissions editor.
