---
subtitle: Populate blueprints and database records with sample content.
---
# Seeding Themes

Themes support the ability to import sample content from seed scripts, including database content and [Tailor blueprints](../../cms/tailor/introduction.md). A specific folder inside the theme called **seeds** is used along with a directory structure to provide the content.

## Seeding a Theme

The `theme:seed` artisan command is used to seed a theme.

```bash
php artisan theme:seed <theme name>
```

You may also use the `--root` option to instruct the command to import the blueprints in to the root directory instead of in a nested directory.

```bash
php artisan theme:seed <theme name> --root
```

:::tip
You may also seed a theme using the admin panel by navigating to **Settings → Frontend Theme → Manage → Seed Content**.
:::

## Directory Structure

Below you can see an example seed directory structure. The **blueprints** directory contains any blueprint templates used by the theme, these are imported automatically to the **app/blueprints** directory with a nested directory called **mywebsite**. The **data.yaml** file contains instructions on how to import the content in to the database.

::: dir
├── themes
|   └── mywebsite
|       └── `seeds`  _← Theme Seed Directory_
|           ├── blueprints
|           |   └── post.yaml  _← Blueprint File_
|           ├── lang
|           |   └── en.json  _← Language File_
|           ├── media
|           |   └── banner.jpg  _← Media File_
|           ├── data
|           |   ├── blog-posts.json  _← Data File_
|           |   └── media-files.json
|           └── data.yaml  _← Seeding Script_
:::

## Importing Languages

As an optional feature, languages can be imported to the **app/lang** directory by placing the [JSON language files](../../extend/multisite/localization.md) in the **lang** directory. This makes it possible to translate labels and other descriptions inside blueprints. If a language file already exists in the application language directory, then the language strings will be merged together.

## Importing Data

The **data.yaml** file contains a specific format used for importing content in to the database. In the example below, two sets of data are imported to the database for Tailor entry content.

```yaml
-
    name: Blog Post Data
    class: Tailor\Models\RecordImport
    file: seeds/data/blog-posts.json
    attributes:
        file_format: json
        blueprint_uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
-
    name: Media File Data
    class: Media\Models\MediaLibraryItemImport
    file: seeds/data/media-files.json
    attributes:
        file_format: json
```

The YAML file should define an array where each item in the array supports the following properties.

Property | Description
------------- | -------------
**name** | gives the import step a name to display to the user.
**class** | refers to a model that extends the interface of `Backend\Models\ImportModel`.
**file** | refers to the JSON data file that contains the content to import.
**attributes** | a list of attributes to set on the Import Model before importing.

### Tailor Blueprint Data

Use the `Tailor\Models\RecordImport` class to import Tailor blueprints to the app directory. The following is an example of a JSON file that can be used to import blog categories. Each item in the JSON array produces an imported record in the database with the supplied attributes. Providing an **id** attribute allows records to link across multiple imports.

```json
[
    {
        "id": 1,
        "title": "Announcements",
        "slug": "announcements"
    },
    {
        "id": 2,
        "title": "News",
        "slug": "news"
    }
]
```
### File Attachment Data

When seeding Tailor entries that have file attachment fields (`attachOne` or `attachMany`), you can reference files that should be attached to the imported records. Files can be referenced from two sources: the **media library** or **theme-relative paths** on disk.

#### Using Media Library Paths

If you seed your media files first using `MediaLibraryItemImport`, you can reference them by their media-relative path. Make sure the media import step comes **before** the record import step in `data.yaml`.

```yaml
-
    name: Media File Data
    class: Media\Models\MediaLibraryItemImport
    file: seeds/data/media-files.json
    attributes:
        file_format: json
-
    name: Blog Post Data
    class: Tailor\Models\RecordImport
    file: seeds/data/blog-posts.json
    attributes:
        file_format: json
        blueprint_uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
```

In the record data file, reference the media paths directly.

```json
[
    {
        "id": 1,
        "title": "My Post",
        "slug": "my-post",
        "featured_image": "my-theme/hero.jpg",
        "gallery": [
            "my-theme/photo1.jpg",
            "my-theme/photo2.jpg"
        ]
    }
]
```

For `attachOne` relations, the value should be a single path string. For `attachMany` relations, the value should be an array of path strings.

#### Using Theme-relative Paths

You can also reference files directly from the theme directory without importing them to the media library first. Place the files in the theme's **seeds** directory and reference them by their path relative to the theme root.

::: dir
├── themes
|   └── mywebsite
|       └── seeds
|           ├── files
|           |   ├── hero.jpg
|           |   ├── photo1.jpg
|           |   └── photo2.jpg
|           ├── data
|           |   └── blog-posts.json
|           └── data.yaml
:::

```json
[
    {
        "id": 1,
        "title": "My Post",
        "slug": "my-post",
        "featured_image": "seeds/files/hero.jpg",
        "gallery": [
            "seeds/files/photo1.jpg",
            "seeds/files/photo2.jpg"
        ]
    }
]
```

### Media File Data

Use the `Media\Models\MediaLibraryItemImport` to import images in to the media directory. The following JSON is an example of importing files to the media library. The **rootPath** attribute defines a prefix for the media library, this could set to an empty string to import everything in the root directory. The **type** attribute specifies either `file` or `folder` are used to import their respective types, with the **path** as the destination and **source** as the source file, found in the context of the theme directory.

```json
[
    {
        "type": "folder",
        "path": "my-theme/announcements",
        "source": "seeds/media/announcements"
    },
    {
        "type": "folder",
        "path": "my-theme/news/2025",
        "source": "seeds/media/news"
    },
    {
        "type": "file",
        "path": "my-theme/banner.jpg",
        "source": "seeds/media/banner.jpg"
    }
]
```

## Importing Blueprints

::: aside
Since blueprints do not depend on any specific file or directory structure, they can be moved around freely.
:::

When importing blueprints, simply place the blueprint files in the **seeds/blueprints** directory. It does not use any configuration, when seeding all blueprints are simply copied to the **app/blueprints** directory. A new directory is created inside that has the same name as the theme. The blueprints are placed inside this new directory.

:::tip
Blueprints do not always need to be imported via seeding. They can be included in the theme's **/blueprints** directory instead. See [the introduction article](../tailor/introduction.md) to learn more.
:::
