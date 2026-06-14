---
subtitle: Allow users to edit their submitted tickets and messages.
---
# Editing Messages

The update page lets users edit the content of their original ticket or any of their follow-up messages. It also supports managing file attachments.

## Creating the Update Page

Create a new page at `pages/support/update.htm`:

::: cmstemplate
```ini
title = "Update Message"
url = "/support/update/:id"
layout = "default"

[supportTicketUpdate]
ticketPage = "support/ticket"

[session]
security = "user"
redirect = "account/login"
```
```twig
{% set model = supportTicketUpdate.model %}
{% set updateMode = supportTicketUpdate.updateMode %}

{% if model %}

    <div class="mb-4">
        <a href="{{ supportTicketUpdate.returnUrl }}" class="text-sm text-blue-600 hover:underline">
            &larr; Back to ticket
        </a>
    </div>

    <h1 class="text-2xl font-bold mb-6">
        Edit {{ updateMode == 'ticket' ? 'Ticket' : 'Message' }}
    </h1>

    {{ form_open({ request: 'onUpdateMessage', files: true, flash: true }) }}

        <input type="hidden" name="mode" value="{{ updateMode }}" />

        {% if updateMode == 'ticket' %}
            <div class="mb-4">
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    value="{{ post('subject', model.subject) }}"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    maxlength="255"
                />
            </div>
        {% endif %}

        <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
                Content
            </label>
            <textarea
                name="content"
                id="content"
                rows="8"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >{{ post('content', model.content) }}</textarea>
        </div>

        <div class="mb-4">
            <label class="flex items-center gap-2">
                <input
                    type="hidden"
                    name="minor_update"
                    value="0"
                />
                <input
                    type="checkbox"
                    name="minor_update"
                    value="1"
                    checked="checked"
                    class="rounded border-gray-300"
                />
                <span class="text-sm text-gray-700">
                    Minor update
                </span>
            </label>
            <p class="text-xs text-gray-500 mt-1 ml-6">
                Do not notify the support team about this update.
            </p>
        </div>

        {% if model.attachments|length %}
            <div class="mb-4">
                <p class="text-sm font-medium text-gray-700 mb-2">
                    Current attachments
                </p>
                <div class="space-y-1">
                    {% for file in model.attachments %}
                        <div class="flex items-center gap-2">
                            <a href="{{ file.path }}" class="text-sm text-blue-600 hover:underline">
                                {{ file.file_name }}
                            </a>
                            <span class="text-xs text-gray-400">
                                ({{ file.sizeToString }})
                            </span>
                        </div>
                    {% endfor %}
                </div>
            </div>
        {% endif %}

        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">
                Attach new files
            </label>
            <input
                name="files[]"
                type="file"
                class="text-sm text-gray-600"
            />
        </div>

        <div class="flex items-center gap-3">
            <button
                type="submit"
                data-attach-loading
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
                Update {{ updateMode }}
            </button>
            <a href="{{ supportTicketUpdate.returnUrl }}" class="text-sm text-gray-600 hover:underline">
                Cancel
            </a>
        </div>

    {{ form_close() }}

{% else %}

    <p class="text-gray-500">
        Message not found.
    </p>

{% endif %}
```
:::

## How the Two Modes Work

This page handles both ticket editing and message editing using the `mode` query parameter:

- **Ticket mode** (`?mode=ticket`): the `:id` is the ticket ID. The component loads the ticket and shows the subject field along with the content.
- **Message mode** (default): the `:id` is the message ID. The component loads the message and shows only the content field.

The "Edit" links on the ticket page pass the appropriate mode and ID. For example, the original ticket links to `/support/update/5?mode=ticket`, while a message links to `/support/update/12` (message mode is the default).

## The Minor Update Checkbox

When "Minor update" is checked, the support team is not notified about the edit. This is useful for fixing typos or adding forgotten details. The checkbox is checked by default since most edits are minor corrections.

## Summary

You now have a complete helpdesk system built with October CMS plugins:

1. **Plugin Setup**: installed Responsiv.Support and configured ticket types for categorizing requests
2. **Ticket List**: a dashboard where users browse their submitted tickets with status indicators
3. **Ticket Submission**: a form with type selection, Markdown content, and file attachments
4. **Ticket Detail**: a conversation thread showing user and staff messages with a reply form
5. **Message Editing**: the ability to update ticket content and individual messages

## How Notifications Work

The plugin sends email notifications automatically for all ticket activity:

- When a ticket is created, support staff are notified
- When a user posts a reply, the assigned staff member is notified
- When staff respond, the user receives an email
- When a ticket is closed, all participants are notified
- Internal staff messages are never sent to users

Configure your mail settings in **Settings > Mail Configuration**. You can customize the notification templates under **Settings > Mail Templates** (search for "responsiv.support").

## Auto-closing Tickets

Tickets close automatically after 7 days if the last message was from support staff and the user has not responded. This keeps the ticket queue clean without manual intervention. The auto-close interval can be changed in a config file at `config/responsiv/support/config.php`.

## Restricting Support Staff

By default, all backend administrators are considered support staff and receive notifications for new tickets. To restrict this to specific team members:

1. Navigate to **Settings > Administrators > Manage Groups**
2. Create a new group named **Support members** with the code `support-members`
3. Assign the administrators who should act as support staff to this group

Only members of this group will receive ticket notifications and appear in the assignment dropdown.

## Going Further

- **Auto-assignment**: set a default assignee on each ticket type so tickets route to the right team member automatically
- **Status Filtering**: use the `statusFilter` property on the `supportTickets` component to create separate pages for open and closed tickets
- **Embedded Support Link**: add a "Need help?" link anywhere in your site that points to the submit page for quick access
