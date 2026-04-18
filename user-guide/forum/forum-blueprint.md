---
subtitle: Define the Tailor blueprints for your forum channels and threads.
---
# Forum Blueprint

Before you can create forum threads, you need to define the content structure. In October CMS, this is done with Tailor blueprints — YAML files that describe the fields, behavior, and backend navigation for your content types.

## Creating the Channel Blueprint

<!-- TODO: Structure blueprint for channels with name, slug, description, and ordering -->

## Creating the Thread Blueprint

<!-- TODO: Stream blueprint for threads with title, slug, content (richeditor), author, is_pinned (switch), is_locked (switch), channel relation -->

## Creating the Reply Blueprint

<!-- TODO: Stream blueprint for replies with content (richeditor), author, thread relation -->

## Adding Navigation

<!-- TODO: Show the navigation block so Forum appears in the backend sidebar -->

## Running the Migration

<!-- TODO: php artisan october:migrate to create the database tables -->

## Testing in the Backend

<!-- TODO: Verify the blueprints appear in the backend, create sample channels and threads -->

## Next Steps

With your blueprints in place, continue to [Channel Page](./channel-page.md) to display your forum channels on the frontend.
