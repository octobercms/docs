---
subtitle: Add an RSS feed so readers can subscribe to your blog.
---
# RSS Feed

An RSS feed lets readers subscribe to your blog using feed readers like Feedly or Inoreader. In this final step, you will create an RSS feed page that outputs your latest posts in XML format.

## Creating the Feed Page

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
    - **Title**: `Blog RSS Feed`
    - **URL**: `/blog/rss`
    - **File Name**: `blog-rss`
    - **Layout**: leave **empty** (no layout)
3. Click the **Components** panel and add:
    - **Collection**: set its **handle** to `Blog\Post`
4. Switch to the **code editor** view and add the following to the page's configuration section (the INI block at the top of the file):

```ini
[resources]
headers[Content-Type] = 'text/xml'
```

5. In the markup editor, enter:

```twig
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>My Blog</title>
        <link>{{ 'blog'|page }}</link>
        <description>The latest posts from my blog.</description>
        <atom:link href="{{ 'blog-rss'|page }}" rel="self" type="application/rss+xml" />
        {% for post in collection %}
        <item>
            <title>{{ post.title }}</title>
            <link>{{ 'blog-post'|page({slug: post.slug}) }}</link>
            <guid>{{ 'blog-post'|page({slug: post.slug}) }}</guid>
            <pubDate>{{ post.published_at_date|date('r') }}</pubDate>
            <description>{{ post.excerpt }}</description>
        </item>
        {% endfor %}
    </channel>
</rss>
```

6. Click **Save**.

### How This Works

- **No layout**: by leaving the layout empty, the page outputs only its own markup. No HTML wrapper, no `<head>` or `<body>` tags, just raw XML.
- **`headers[Content-Type] = 'text/xml'`**: tells the browser to treat the response as XML instead of HTML.
- **`post.published_at_date|date('r')`**: the `r` format outputs an RFC 2822 date string, which is the format RSS requires for `<pubDate>`.
- **`collection`** without `.paginate()`: iterates all posts without pagination. For a blog with many posts, you could limit the feed to the most recent entries with `collection.limit(20).get()`.

## Adding the Feed Link

To help browsers and feed readers auto-discover your RSS feed, add a link tag to your layout. Open **Editor → Layouts → default** and add the following inside the `<head>` tag:

```twig
<link rel="alternate" type="application/rss+xml" title="Blog RSS Feed" href="{{ 'blog-rss'|page }}">
```

Save the layout.

## Testing the Feed

1. Visit `/blog/rss` in your browser. You should see XML output with your blog posts listed as `<item>` elements.
2. Copy the full URL and paste it into a feed reader like [Feedly](https://feedly.com) or [Inoreader](https://www.inoreader.com) to verify it works.
3. You can also validate the feed structure at the [W3C Feed Validation Service](https://validator.w3.org/feed/).

## Summary

Congratulations! You have built a complete blog with October CMS. Here is what you created:

1. **Blueprints**: three content types defined in YAML: a Blog Post stream, a Category structure, and a Tag entry. No PHP code, no database SQL.
2. **Listing Page**: a Collection component with pagination, displaying posts sorted newest-first.
3. **Detail Page**: a Section component that resolves posts by slug, with 404 handling for missing entries.
4. **Category and Tag Filtering**: `whereRelation` queries to filter posts, and a reusable tag cloud partial with post counts shared across pages.
5. **RSS Feed**: XML output with a custom Content-Type header for feed reader subscriptions.

Everything is managed through the backend, from creating posts and assigning categories to configuring the published date. The frontend is powered entirely by Twig templates and Tailwind CSS.

### Where to Go From Here

- Explore the [demo theme](https://github.com/octobercms/october/tree/4.x/themes/demo) for a more complete blog with search, archives, authors, comments, and more
- Read the [Tailor documentation](../../4.x/cms/tailor/blueprints.md) for the full blueprint and content field reference
- Try the next tutorial in the User Guide to continue building your skills
