---
subtitle: Create the ticket list page where users can see their submitted tickets.
---
# Ticket List

The ticket list page is the main dashboard for users to see all their submitted support tickets. It shows the ticket ID, subject, status, and creation date, with a link to submit new tickets.

## Creating the Ticket List Page

Create a new page at `pages/support/tickets.htm`:

::: cmstemplate
```ini
title = "Support Tickets"
url = "/support"
layout = "default"

[supportTickets]
submitPage = "support/submit"
ticketPage = "support/ticket"

[session]
security = "user"
redirect = "account/login"
```
```twig
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold">
        My Tickets
    </h1>
    <a
        href="{{ 'support/submit'|page }}"
        class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
    >
        Submit a new ticket
    </a>
</div>

{% set tickets = supportTickets.tickets %}

{% if tickets|length %}
    <div class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {% for ticket in tickets %}
            <a href="{{ ticket.url }}" class="block p-4 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        {% if ticket.has_new %}
                            <span class="w-2 h-2 bg-blue-600 rounded-full shrink-0">
                            </span>
                        {% endif %}
                        <div>
                            <span class="text-sm text-gray-400">
                                #{{ ticket.id }}
                            </span>
                            <span class="font-medium text-gray-900 ml-1">
                                {{ ticket.subject }}
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 text-sm text-gray-500 shrink-0 ml-4">
                        <span>
                            {{ ticket.status.name }}
                        </span>
                        <span>
                            {{ ticket.created_at|date('M j, Y') }}
                        </span>
                    </div>
                </div>
            </a>
        {% endfor %}
    </div>

    {% if tickets.lastPage > 1 %}
        <div class="flex items-center justify-center gap-2 mt-6">
            {% if tickets.currentPage > 1 %}
                <a href="{{ paginationUrl }}{{ tickets.currentPage - 1 }}" class="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                </a>
            {% endif %}
            <span class="text-sm text-gray-500">
                Page {{ tickets.currentPage }} of {{ tickets.lastPage }}
            </span>
            {% if tickets.currentPage < tickets.lastPage %}
                <a href="{{ paginationUrl }}{{ tickets.currentPage + 1 }}" class="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                </a>
            {% endif %}
        </div>
    {% endif %}
{% else %}
    <div class="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p class="text-gray-500 mb-4">
            You have not submitted any support tickets yet.
        </p>
        <a
            href="{{ 'support/submit'|page }}"
            class="text-blue-600 hover:underline"
        >
            Submit your first ticket
        </a>
    </div>
{% endif %}
```
:::

## How This Page Works

The `[session]` component with `security = "user"` requires the visitor to be logged in. If they are not, they are redirected to the login page.

The `supportTickets` component provides the `tickets` variable, a paginated collection of the logged-in user's tickets sorted by newest first. Each ticket has a `url` property that links to the ticket detail page (set by the `ticketPage` property).

The `has_new` property is true when the last message on the ticket was from support staff, indicating there is a response the user has not seen yet. The blue dot makes these tickets easy to spot.

## Try It Out

1. Navigate to `/support` while logged in
2. The list should be empty since no tickets exist yet
3. The "Submit a new ticket" button links to the submission page, which you will create next

## Next Steps

Continue to [Submit Ticket](./submit-ticket.md) to create the ticket submission form.
