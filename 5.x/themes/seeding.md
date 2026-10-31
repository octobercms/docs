---
previousPath: cms/themes/seeding-themes.md
subtitle: Ship sample content with a theme, including blueprints, language files, media and database records.
---
# Seeding Themes

A theme can include seed content that is imported when the theme is set up, such as [Tailor blueprints](./tailor/introduction.md), language files, media files and database records. Seed content lives in the theme's **seeds** directory, and the `theme:seed` command imports it.

```bash
php artisan theme:seed mywebsite
```

## Seeding a Theme

The `theme:seed` command takes the theme directory name.

```bash
php artisan theme:seed <theme name>
```

Blueprints are imported into a nested directory by default. Add the `--root` option to import them into the root blueprints directory instead.

```bash
php artisan theme:seed <theme name> --root
```

::: tip
You can also seed a theme in the admin panel. Go to **Settings → Site Theme** and select **Manage → Seed Content** for the theme.
:::

## Seed Directory Structure

The following example shows a seed directory. The **blueprints** directory holds the blueprints the theme uses, the **lang** directory holds language files, and the **data.yaml** file describes how to import content into the database.

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

## Importing Blueprints

Place blueprint files in the **seeds/blueprints** directory. No configuration is needed. When seeding, every blueprint is copied to the **app/blueprints** directory, inside a new directory with the same name as the theme, for example **app/blueprints/mywebsite**.

::: aside
Blueprints don't depend on any specific file or directory structure, so you can move them around freely.
:::

::: tip
Blueprints don't always need to be imported with seeding. They can be included in the theme's **blueprints** directory instead. See the [Tailor Overview](./tailor/introduction.md) to learn more.
:::

## Importing Language Files

Language files are optional. Place [JSON language files](../backend/localization/backend.md) in the **seeds/lang** directory to import them into the **app/lang** directory. This lets you translate labels and other descriptions inside blueprints. If a language file already exists in the application language directory, the language strings are merged together.

## Importing Data

The **data.yaml** file describes the content to import into the database. In the following example, two sets of data are imported, one for Tailor entries and one for media files.

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

The file defines an array, where each item supports the following properties.

Property | Description
------------- | -------------
**name** | a name for the import step, displayed to the user.
**class** | a model that extends the interface of `Backend\Models\ImportModel`.
**file** | the JSON data file that contains the content to import.
**attributes** | a list of attributes to set on the import model before importing.

### Tailor Entry Data

Use the `Tailor\Models\RecordImport` class to import records into a Tailor blueprint, identified by the `blueprint_uuid` attribute. The following JSON file imports blog categories. Each item in the array creates a record with the supplied attributes. Providing an **id** attribute lets records link to each other across imports.

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

### Media File Data

Use the `Media\Models\MediaLibraryItemImport` class to import files into the media library. Each item sets a **type** of either `file` or `folder`, a **path** for the destination in the media library, and a **source** for the source file or folder, relative to the theme directory.

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

### File Attachment Data

When you seed Tailor entries that have file attachment fields (`attachOne` or `attachMany`), you can reference the files to attach to the imported records. Files can come from the **media library** or from **theme-relative paths** on disk.

For `attachOne` relations, the value is a single path string. For `attachMany` relations, the value is an array of path strings.

#### Using Media Library Paths

If you seed your media files first using `MediaLibraryItemImport`, reference them by their media-relative path. Make sure the media import step comes **before** the record import step in **data.yaml**.

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

#### Using Theme-relative Paths

You can also reference files in the theme directory without importing them to the media library first. Place the files in the theme's **seeds** directory and reference them by their path relative to the theme root.

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

#### See Also

::: also
* [Tailor Overview](./tailor/introduction.md)
* [Blueprints](./tailor/blueprints.md)
* [Theme Localization](./sites/localization.md)
:::
