---
subtitle: Install the Responsiv Support plugin and configure ticket types.
---
# Installing the Plugin

With user authentication in place, you can now add the helpdesk functionality. The Responsiv Support plugin provides a ticketing system with ticket types, conversation threads, file attachments, staff assignment, and email notifications.

## Installing the Plugin

Navigate to **Settings > Updates & Plugins > Install Packages** and search for "Responsiv.Support". Click **Install** to add it to your project.

Alternatively, install via the command line:

```bash
php artisan plugin:install Responsiv.Support
```

The Support plugin depends on RainLab.User, which you already installed when setting up authentication. After installation, you will see a new **Support** section in the backend navigation with links to manage tickets and ticket types.

## Creating Ticket Types

Ticket types categorize incoming requests so your team can prioritize and route them. Navigate to **Support > Ticket Types** and create a few types:

| Type | Code |
|------|------|
| General Inquiry | `general` |
| Bug Report | `bug-report` |
| Feature Request | `feature-request` |

Each type can optionally auto-assign tickets to a specific staff member. You can configure this later as your team grows.

## Updating the Navigation

Add a "Support" link to your layout navigation so logged-in users can access the helpdesk. Update the nav section in your default layout:

```twig
<div class="flex items-center gap-4">
    <a href="{{ 'forum/index'|page }}" class="text-sm text-gray-600 hover:text-gray-900">
        Forum
    </a>
    {% if user %}
        <a href="{{ 'support/tickets'|page }}" class="text-sm text-gray-600 hover:text-gray-900">
            Support
        </a>
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

The "Support" link is inside the `{% if user %}` block because only logged-in users can submit and view tickets.

## Next Steps

Continue to [Ticket List](./ticket-list.md) to create the page where users browse their submitted tickets.
