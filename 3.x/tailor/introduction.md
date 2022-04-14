# Introduction

Tailor is a feature that defines file-based content structures used by your website, such as a company blog or team page. Tailor automatically generates a backend user interface for managing records and provides CMS Components for displaying and linking records on the frontend.

When using Tailor you can skip the traditional plugin development workflow and go straight to defining content. Fields are defined simply as blueprint templates and content is stored in special database tables. Navigation and permissions are also defined in the blueprint template.

## Directory Structure

Blueprints are YAML files that reside in the **app/blueprints** directory by default.
Below you can see an example blueprint directory structure. Each blueprint can reside in any directory and any file name can be used. Blueprints can be organised in subdirectories of any nesting depth.

::: dir
├── app
|   └── blueprints  _<== Blueprints Start Here_
|       ├── `blog`
|       │   └── blog.yaml
|       │   └── author.yaml
|       ├── `about`
|       │   └── about.yaml
|       ├── `wiki`
|       │   └── article.yaml
:::

## Blueprint Structure

Blueprints are defined using the YAML syntax and will always contain three identifiers, a unique UUID, a user-friendly handle and the blueprint type. The filename and folder of a blueprint is used to organise blueprints and is not used as an identifier. All other properties are defined in the blueprint's relevant documentation article.

```yaml
uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
handle: Blog\Post
type: entry
name: Post
```

The blueprint **handle** is a human readible approach to referencing a blueprint object. Using the above blueprint as a reference, we can reference the entries using the handle.

```ini
[section blog]
handle = "Blog\Post"
```

The blueprint **uuid** is a unique identifier used when blueprints reference other blueprints. For example, when a field references a mixin.

```yaml
_blog_content:
    source: edcd102e-0525-4e4d-b07e-633ae6c18db6
    type: mixin
```

::: tip
When first creating a blueprint, you can choose to not include a UUID and one will be magically created for you on the first migration.
:::

## Blueprint Types

The blueprint **type** property determines how the blueprint should be implemented. There are several types available and most blueprints will specify form field definitions.

<!--
Entry (Authors) - a model with no special attributes, supports drafts and versions
  ^- Single (Landing Page) - a model that has only 1 entry
  ^- Structure (Wiki, Categories) - a model that can support parent/child relationships and has a fullslug
  ^- Stream (Blog) - a model with entries that are chronologically ordered
Global (Setting pages) - a plain model with no special attributes, only has 1 entry, does not support drafts or versions
Mixin - a group of form fields that can be blended with field definitions

Blueprints can contain the following objects.
-->

Type | Description
------------- | -------------
[Entry](blueprints/entry.md) | the standard content structure that supports drafts.
[Global](blueprints/global.md) | a single record in the database and is often used for settings and configuration.
[Mixin](blueprints/mixin.md) | defines reusable field definitions that can be imported and mixed in with other field definitions.

## Migrating Blueprints

Blueprints and their structure are migrated in the database during the normal database migration process. When a change is made manually to a blueprint file, you should run the `october:migrate` command to update the database tables.

    php artisan october:migrate

::: tip
Blueprints are cached when debug mode is turned off. The migration command can also be used to clear the blueprint cache.
:::
