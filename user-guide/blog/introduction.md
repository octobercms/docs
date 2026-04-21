---
subtitle: Build a fully-featured blog with October CMS using Tailor and the CMS theme engine.
---
# Creating a Blog

In this tutorial, you will build a complete blog from scratch using October CMS. By the end, you will have a working blog with a listing page, individual post pages, categories, tags, and an RSS feed, all without writing a single plugin.

## What You Will Build

You will create a blog powered entirely by Tailor blueprints and CMS pages. The finished blog includes:

- A **listing page** that displays posts with featured images, excerpts, and pagination
- **Detail pages** for each post, accessed by slug, with full content and tags
- **Category filtering** so visitors can browse posts by topic
- **Tag filtering** so readers can find related content
- An **RSS feed** so readers can subscribe

No PHP code, no plugins. Just YAML blueprints for the content structure and Twig templates for the frontend.

## Prerequisites

Before starting, you should have:

- October CMS installed and running
- A theme with a default layout that includes Tailwind CSS

If you haven't done this yet, work through the [Quick Start guide](../quickstart/editor/creating-a-layout.md) first. This tutorial assumes you have a working layout similar to the one created there.

## Overview

This tutorial is split into six steps:

1. [Blog Blueprint](./blog-blueprint.md): define the content structure for posts, categories, and tags
2. [Listing Page](./listing-page.md): display posts with pagination
3. [Detail Page](./detail-page.md): show a single post by its slug
4. [Categories](./categories.md): filter posts by category
5. [Tags](./tags.md): add a tag cloud with post counts
6. [RSS Feed](./rss-feed.md): add a subscription feed

Each step builds on the previous one. By the end, you will have a fully functional blog managed entirely through the backend.

## Next Steps

Continue to [Blog Blueprint](./blog-blueprint.md) to define the content structure for your blog posts.
