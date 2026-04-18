---
subtitle: "Creating, editing, and organizing your content"
---
# Managing Entries

Once you have defined a blueprint, October CMS automatically generates a complete backend interface for managing that content. You do not need to build list views, forms, or search features yourself — it is all created for you based on the fields in your blueprint. This section covers everything you need to know about working with entries day to day.

## The Entry List View

When you click on a content type in the backend sidebar (for example, "Blog Posts"), you will see the entry list view. This is your starting point for managing content of that type.

The list view shows all existing entries in a table format with key information like the title, status, and dates. From here you can:

- **Sort entries** by clicking on any column header. Click once to sort ascending, click again to sort descending.
- **Search entries** using the search box at the top of the list. This searches across the title and other text fields.
- **Filter entries** using the filter options to narrow down the list by status, category, or other criteria.

::: tip
For content types with many entries, take advantage of search and filtering to find what you need quickly. You can combine multiple filters at the same time — for example, filtering by a specific category and then searching within those results.
:::

## Creating a New Entry

To create a new entry, click the **Create** button (or **New Blog Post**, depending on how the blueprint is configured) in the top-right corner of the list view. This opens the entry form with all the fields defined in your blueprint.

Fill in the fields as needed:

1. **Title** — Every entry has a title field at the top. This is the main name or heading for the entry.
2. **Slug** — The URL-friendly version of the title. It is generated automatically as you type the title, but you can edit it manually if you want a different URL.
3. **Content fields** — The remaining fields depend on your blueprint. Fill in the rich text editor, upload images, set dates, choose dropdown values, and so on.

When you are finished, click **Save** to store the entry. It will appear in the list view immediately.

## Editing Existing Entries

To edit an entry, click on its title in the list view. This opens the same form you used to create it, with the current values already filled in. Make your changes and click **Save** to update the entry.

You can also use the list view to quickly identify which entries need attention. The status column shows whether each entry is published, in draft, or has other states, making it easy to spot content that still needs work.

## Working with Drafts

When drafts are enabled for a blueprint, you gain a powerful workflow for managing content that is not yet ready to go live. Instead of publishing immediately, you can save entries as drafts and come back to them later.

Here is how the draft workflow works:

- **Saving a draft** — When you create or edit an entry, you can save it without publishing. The entry is stored in the database but will not appear on your live website.
- **Publishing** — When the entry is ready, click the **Publish** button to make it live. Published entries are visible to your site visitors.
- **Returning to draft** — If you need to pull a published entry back for revisions, you can unpublish it and it will revert to draft status.

Drafts are especially useful for teams where one person writes content and another reviews and publishes it. You can save your work at any stage without worrying about incomplete content appearing on the live site.

## Versioning

Some blueprints support versioning, which keeps a history of changes to each entry. When versioning is enabled, October CMS saves a snapshot of the entry each time you make changes. This gives you the ability to:

- **View past versions** of an entry to see how it has changed over time
- **Compare versions** to understand what was added, removed, or modified
- **Restore a previous version** if you need to roll back to an earlier state

Versioning acts as a safety net — you can make changes confidently, knowing that you can always go back if something does not work out.

## Deleting Entries

To delete an entry, open it from the list view and click the **Delete** button at the bottom of the form. You can also select multiple entries from the list view and delete them in bulk using the toolbar actions.

::: warning
Deleted entries may be moved to a soft-delete state where they can be recovered, or they may be permanently removed depending on your blueprint configuration. If you are unsure, check with your site administrator before deleting content.
:::

## Reordering Entries in Structures

If your blueprint uses the **structure** type, your entries can be organized in a tree hierarchy with parent-child relationships. In the list view, you will see the entries displayed in their nested structure.

To reorder or reorganize entries:

1. **Drag and drop** — Click and hold an entry, then drag it to a new position in the list. You can move it up or down to change the sort order.
2. **Nest entries** — Drag an entry onto another entry to make it a child. This creates a hierarchical relationship — useful for sections and subsections.
3. **Un-nest entries** — Drag a child entry out from under its parent to move it back to the top level.

The tree structure is reflected on the frontend of your site, so reordering entries in the backend changes how they appear to your visitors.

## Tips for Managing Content Effectively

- **Use descriptive titles** — Clear titles make it easier to find entries in the list view and help with SEO on the frontend.
- **Set publish dates** — If your blueprint includes a publish date field, use it to schedule content or to keep an accurate record of when content was originally published.
- **Keep drafts organized** — If you have many drafts, review them periodically and either publish or delete the ones you no longer need.
- **Use the search bar** — The search feature is fast and searches across multiple fields. It is often quicker than scrolling through a long list.

## Next Steps

Now that you know how to manage entries, learn about [Global Content](./global-content.md) for managing site-wide settings and content that appears across your entire website.
