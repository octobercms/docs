---
subtitle: "Defining your content structures with blueprint files"
---
# Creating Blueprints

Blueprints are the foundation of content management in October CMS. Each blueprint is a YAML file that describes a type of content — what fields it has, how it appears in the backend, and how it behaves. In this guide, you will create a complete blog post blueprint from scratch and learn the key concepts along the way.

## Anatomy of a Blueprint

Every blueprint file has a few essential properties at the top, followed by the field definitions. Here is what each part does:

- **`uuid`** — A unique identifier for the blueprint. This is a standard UUID string that ensures your blueprint can be distinguished from every other blueprint, even across different projects.
- **`handle`** — A human-readable name used to reference the blueprint in code and templates. By convention, this uses a namespace format like `Blog\Post` or `Site\Settings`.
- **`type`** — The blueprint type, which determines how the content behaves. Options include `entry`, `single`, `structure`, `stream`, `global`, and `mixin`.
- **`name`** — The display name shown in the backend interface.
- **`fields`** — The content fields that make up each entry.

## Creating a Blog Post Blueprint

Let's walk through creating a blueprint for blog posts. Start by creating a new file at `app/blueprints/blog/post.yaml` in your October CMS project.

Here is the complete blueprint:

```yaml
uuid: a7b9c1d2-e3f4-5678-9012-abcdef345678
handle: Blog\Post
type: entry
name: Blog Post

fields:
    content:
        label: Content
        type: richeditor
        span: full
    featured_image:
        label: Featured Image
        type: fileupload
        mode: image
        span: auto
    published_at:
        label: Publish Date
        type: datepicker
        span: auto
```

Let's break down what each field does:

- **content** — A rich text editor where you write the body of the blog post. The `span: full` setting makes it take the full width of the form.
- **featured_image** — A file upload field configured for images. This gives you a drag-and-drop area for uploading a hero image.
- **published_at** — A date picker for setting when the post should be published.

::: aside
You do not need to define `title` or `slug` fields — Tailor automatically includes these for entry-type blueprints. Every entry gets a title field and a URL-friendly slug generated from it.
:::

## Generating a UUID

Every blueprint needs a unique `uuid`. You have two easy options for generating one:

1. **Use the Artisan command** — Run the following in your project directory:

```bash
php artisan tailor:uuid
```

This will output a fresh UUID you can copy into your blueprint file.

2. **Use an online generator** — Visit any UUID generator website and copy a version 4 UUID.

The important thing is that each blueprint has its own unique UUID. Never reuse the same UUID across different blueprints.

## Adding Backend Navigation

By default, a new blueprint does not appear in the backend menu. To make it easy to find, add a `navigation` section to your blueprint:

```yaml
navigation:
    icon: icon-pencil
    label: Blog Posts
    order: 200
```

- **`icon`** — The icon shown in the sidebar menu. October CMS uses the [Font Awesome 4](https://fontawesome.com/v4/icons/) icon set.
- **`label`** — The text displayed in the menu.
- **`order`** — Controls where the item appears relative to other menu items. Lower numbers appear higher in the menu.

Add this section to your blog post blueprint, and it will show up in the backend sidebar as soon as you run the migration.

## Common Field Types

Tailor provides a wide range of field types to cover most content needs. Here are the ones you will use most often:

| Field Type | Description | Use Case |
|---|---|---|
| `text` | Single-line text input | Titles, headings, short labels |
| `textarea` | Multi-line plain text | Summaries, excerpts, plain descriptions |
| `richeditor` | Visual rich text editor | Blog post content, page bodies |
| `markdown` | Markdown editor with preview | Documentation, technical content |
| `fileupload` | File or image upload | Featured images, document attachments |
| `dropdown` | Select from a list of options | Categories, status values |
| `checkbox` | A single true/false checkbox | Feature flags, toggles |
| `switch` | An on/off toggle switch | Publishing controls, visibility |
| `datepicker` | Date and optional time selector | Publish dates, event dates |
| `repeater` | A repeatable group of fields | Lists of links, team members, FAQ items |

Each field type supports additional options for validation, default values, placeholder text, and more. See the [Content Fields](../../../4.x/cms/tailor/content-fields.md) reference for the full list of options.

## Applying Your Blueprint

After creating or modifying a blueprint file, you need to run a migration so that October CMS can set up the corresponding database tables:

```bash
php artisan october:migrate
```

This command reads your blueprint files, creates or updates the necessary database structure, and makes the content type available in the backend. You should run this every time you add a new blueprint or change the fields in an existing one.

::: warning
Removing a field from a blueprint and running the migration will remove that column from the database. If the field contained data, that data will be lost. Always back up your database before making structural changes to blueprints that already have content.
:::

## Next Steps

With your blueprint in place and the migration run, October CMS will have automatically created a full backend interface for your blog posts. Head over to [Managing Entries](./managing-entries.md) to learn how to create and manage your content.

For the complete blueprint reference, including all available options and advanced features, see the [Blueprints](../../../4.x/cms/tailor/blueprints.md) developer documentation.
