---
subtitle: Populate blueprints and database records with sample content.
---
# Seeding Themes

Themes support the ability to import sample content from seed scripts, including database content and [Tailor blueprints](../../tailor/introduction.md). A specific folder inside the theme called **seeds** is used along with a directory structure to provide the content.

## Directory Structure

Below you can see an example seed directory structure. The **blueprints** directory contains any blueprint templates used by the theme, these are imported automatically to the **app/blueprints** directory with a nested directory called **mywebsite**. The **data.yaml** file contains instructions on how to import the content in to the database.

::: dir
├── themes
|   └── mywebsite
|       └── `seeds`  _← Theme Seed Directory_
|           ├── blueprints
|           |   └── post.yaml  _← Blueprint File_
|           ├── data
|           |   └── blog-posts.json  _← Data File_
|           └── data.yaml  _← Seeding Script_
:::

## Importing Blueprints

::: aside
Since blueprints do not depend on any specific file or directory structure, they can be moved around freely.
:::

When importing blueprints, simply place the blueprint files in the **blueprints** directory. It does not use any configuration, when seeding all blueprints are simply copied to the **app/blueprints** directory. A new directory is created inside that has the same name as the theme. The blueprints are placed inside this new directory.


## Importing Data

The **data.yaml** file contains a specific format used for importing content in to the database. In the example below, two sets of data are imported to the database for Tailor entry content.

```yaml
-
    name: Blog Post Data
    class: Tailor\Models\EntryRecordImport
    file: seeds/data/blog-posts.json
    attributes:
        file_format: json
        blueprint_uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
-
    name: Blog Category Data
    class: Tailor\Models\EntryRecordImport
    file: seeds/data/blog-categories.json
    attributes:
        file_format: json
        blueprint_uuid: b022a74b-15e6-4c6b-9eb9-17efc5103543
```

The YAML file should define an array where each item in the array supports the following properties.

Property | Description
------------- | -------------
**name** | gives the import step a name to display to the user.
**class** | refers to a model that extends the interface of `Backend\Models\ImportModel`.
**file** | refers to the JSON data file that contains the content to import.
**attributes** | a list of attributes to set on the Import Model before importing.

### Example Data File

The following is an example of a JSON file that can be used to import blog categories. Each item in the JSON array produces an imported record in the database with the supplied attributes. Providing an **id** attribute allows records to link across multiple imports.

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

## Seeding a Theme

The `theme:seed` artisan command is used to seed a theme.

```bash
php artisan theme:seed <theme name>
```

You may also use the `--root` option to instruct the command to import the blueprints in to the root directory instead of in a nested directory.

```bash
php artisan theme:seed <theme name> --root
```
