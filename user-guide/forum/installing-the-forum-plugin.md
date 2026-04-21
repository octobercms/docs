---
subtitle: Install the RainLab Forum plugin and create your first channels.
---
# Installing the Forum Plugin

With user authentication in place, you can now add the forum functionality. The RainLab Forum plugin provides discussion channels, topics, posts, member profiles, and moderation tools.

## Installing the Plugin

Navigate to **Settings → Updates & Plugins → Install Packages** and search for "RainLab.Forum". Click **Install** to add it to your project.

Alternatively, install via the command line:

```bash
php artisan plugin:install RainLab.Forum
```

The Forum plugin depends on RainLab.User, which you already installed in Part 1. After installation, you will see a new **Forum** section under **Settings** in the backend.

## Creating Forum Channels

Channels are the top-level categories that organize discussions. Navigate to **Settings → Forum Channels** and create a few channels to get started:

| Channel | Description |
|---------|-------------|
| General Discussion | Talk about anything and everything |
| Help & Support | Get help with your questions |
| Announcements | Official news and updates |

You can always add more channels later or reorganize them from the backend.

## Updating the Navigation

Now add a "Forum" link to your layout navigation so visitors can find the forum. Update the nav section in your default layout:

```twig
<div class="flex items-center gap-4">
    <a href="{{ 'forum/index'|page }}" class="text-sm text-gray-600 hover:text-gray-900">
        Forum
    </a>
    {% if user %}
        <a href="{{ 'forum/member'|page }}" class="text-sm text-gray-600 hover:text-gray-900">
            Account
        </a>
        <a
            href="javascript:;"
            data-request="onLogout"
            data-request-data="redirect: '/'"
            class="text-sm text-gray-600 hover:text-gray-900"
        >
            Sign out
        </a>
    {% else %}
        <a href="{{ 'account/login'|page }}" class="text-sm text-gray-600 hover:text-gray-900">
            Sign in
        </a>
    {% endif %}
</div>
```

The "Forum" link is outside the `{% if user %}` block so it appears for both guests and logged-in users.

## Next Steps

Continue to [Forum Pages](./forum-pages.md) to create the forum index and channel pages.
