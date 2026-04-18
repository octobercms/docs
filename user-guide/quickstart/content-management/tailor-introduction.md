---
subtitle: "Understanding October CMS's built-in content management system"
---
# Introduction to Tailor

Every website needs a way to organize and manage its content. Whether you are running a blog, a portfolio, or a business site, you need a system that lets you define what kinds of content you have and then create, edit, and publish that content easily. That is exactly what Tailor does.

## What is Tailor?

Tailor is October CMS's built-in content management system. It lets you define the structure of your content using simple YAML files called **blueprints**, and then automatically generates a full backend interface for managing that content. You do not need to write any PHP code, build database tables by hand, or create backend forms from scratch — Tailor handles all of that for you.

The core concept is straightforward:

- **Blueprints** define the _structure_ of your content — what fields each piece of content has, how it is organized, and where it appears in the backend menu.
- **Entries** are the actual content records you create and manage. Each entry follows the structure defined by its blueprint.

Think of a blueprint as a template or a mold, and entries as the things you create using that mold. A "Blog Post" blueprint defines what a blog post looks like (title, content, featured image, publish date), and each blog post you write is an entry.

::: tip
Once you create a blueprint file, Tailor automatically generates the entire backend interface for managing that content — list views, forms, search, filtering, and more. You get a fully functional content management experience without writing a single line of backend code.
:::

## Blueprint Types

Tailor offers several blueprint types, each designed for a different kind of content. Choosing the right type is the first decision you will make when setting up new content.

### Entry

An **Entry** blueprint defines a collection of items. This is the most common type and is perfect for content where you will have many similar records — like blog posts, team members, portfolio items, or product listings.

Entry blueprints support drafts, versioning, and publishing workflows, so you can save work in progress and publish when you are ready.

### Single

A **Single** blueprint defines a one-off page with its own set of fields. Use this when you have a unique page that does not belong to a collection — like an About page, a Contact page, or a Home page with custom content blocks.

Unlike entries, a single blueprint produces exactly one record.

### Structure

A **Structure** blueprint is similar to an entry blueprint, but the entries can be nested in a tree hierarchy. This is ideal for content that has parent-child relationships — like a documentation site with sections and subsections, FAQ categories, or a multi-level navigation menu.

You can drag and drop entries to rearrange them and nest them under other entries.

### Stream

A **Stream** blueprint is designed for time-ordered content. Entries in a stream are automatically sorted by date, making this type perfect for news feeds, changelogs, activity logs, or event listings where chronological order matters most.

### Global

A **Global** blueprint defines a single record for site-wide settings and content. Use this for content that is not part of a list and appears across your entire site — like footer text, social media links, company contact information, or default SEO settings.

Global content is always accessible from the backend and can be displayed on any page of your site.

### Mixin

A **Mixin** blueprint is a reusable set of field definitions that can be shared across multiple other blueprints. If you find yourself repeating the same fields in several blueprints (for example, SEO fields like meta title and meta description), you can define them once as a mixin and include them wherever you need them.

## Where Blueprints Live

All blueprint files are stored in the `app/blueprints/` directory of your October CMS project. You can organize them into subdirectories however you like:

::: dir
app/blueprints/
|-- blog/
|   |-- post.yaml
|   |-- category.yaml
|-- pages/
|   |-- about.yaml
|   |-- contact.yaml
|-- site/
|   |-- settings.yaml
:::

Each blueprint is a single YAML file. You create and edit them with any text editor — there is no special tool required.

## What Comes Next

Now that you understand what Tailor is and the different blueprint types available, you are ready to start building. In the next section, you will learn how to [create your first blueprint](./creating-blueprints.md) step by step.

For a deeper technical reference on Tailor and its capabilities, see the [Tailor Introduction](../../../4.x/cms/tailor/introduction.md) in the developer documentation.
