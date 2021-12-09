# Introduction

Tailor is a core module that lets you define editable structures used by your website or web application, such as a company blog or team page. Tailor automatically generates a backend user interface for managing records and provides [CMS components](../cms/components.md) for displaying and linking records on the frontend.

When using Tailor, you can skip the traditional [plugin development workflow](../plugin/registration.md) and go straight to defining content. Fields are defined simply as blueprint templates and content is stored in special database tables. Navigation and permissions are also defined in the blueprint template.

Blueprints are directories that reside in the **app/blueprints** directory by default. Blueprints can contain the following objects.

Object | Description
------------- | -------------
[Sections](../tailor/sections.md) | content sections found on the website.
[Collections](../tailor/collections.md) | common data used on the website.
[Globals](../tailor/globals.md) | universally available content and configuration.
[Mixins](../tailor/mixins.md) | reusable groups of field definitions.

## Directory Structure

Below, you can see an example blueprint directory structure. Each blueprint type represents a separate directory.

::: dir
├── app
|   └── blueprints  _<== Blueprints Start Here_
|       ├── `sections`
|       │   └── blog.yaml
|       ├── `collections`
|       │   └── categories.yaml
|       ├── `globals`
|       │   └── footer_config.yaml
|       └── `mixins`
|           └── blog_content.yaml
:::

## Blueprint Structure

Blueprints are defined using the YAML syntax and will always contain two identifiers, a unique UUID and a user-friendly handle. The filename and folder of a blueprint is used to organise blueprints and is not used as an identifier. All other properties are defined in the blueprint's relevant documentation article.

```yaml
uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
handle: blog
name: 'Blog Section'
```

The blueprint **handle** is a human readible approach to referencing a blueprint object. Using the above blueprint as a reference, we can reference the entries using the handle.

```php
EntryRecord::inSection('blog')->get();
```

The blueprint **uuid** is a unique identifier used when blueprints reference other blueprints. For example, when a field references a mixin.

```yaml
blog_content:
    source: edcd102e-0525-4e4d-b07e-633ae6c18db6
    type: mixin
```

> **Note**: When first creating a blueprint, you can choose to not include a UUID and one will be automatically generated for you on the first migration.

## Migrating Blueprints

Blueprints and their changes are commited to the database during the normal [database migration process](../console/commands.md#database-migration). When a change is made manually to a blueprint file, be sure to run this command to update the database tables.

    php artisan october:migrate

## Version History

By default blueprints are not configured to track changes whenever a content record is modified, you may enable version tracking with the `useVersions` attribute of a blueprint.

```yaml
useVersions: true
```

## Defining Navigation

In the backend area, sections will be listed under the Content menu item, with globals and collections listed under the Settings menu item (by default). You may control this behavior using the **navigation** property in the blueprint file. The following code will set an icon and specify the order of appearance.

```yaml
navigation:
    icon: icon-pencil
    order: 200
```

To place an item in the Settings area. The **category** definition can be a string or a settings constant reference, eg. `CATEGORY_COLLECTIONS`.

```yaml
navigation:
    mode: settings
    category: Collections
```

To place an item in the Content area.

```yaml
navigation:
    mode: content
```

To place the item as a primary navigation item. A **primaryNavigation** definition is needed.

```yaml
primaryNavigation:
    label: Blog
    icon: icon-copy
    order: 500

navigation:
    mode: primary
    label: Main Menu Item
```

To place the item as a secondary navigation item. The **parent** property should specify the UUID of a primary navigation item.

```yaml
navigation:
    mode: secondary
    parent: 6947ff28-b660-47d7-9240-24ca6d58aeae
```

## Defining Permissions

Blueprints have the ability to specify new permissions and apply those permission structures to backend users.
