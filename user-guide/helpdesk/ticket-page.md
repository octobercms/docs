---
subtitle: Display ticket details with a conversation thread and reply form.
---
# Ticket Page

The ticket page shows the full conversation between the user and support staff. It displays the original ticket message, all follow-up replies, and a form for posting new messages. Users can also close their tickets from this page.

## Creating the Ticket Page

Create a new page at `pages/support/ticket.htm`:

::: cmstemplate
```ini
title = "Support Ticket"
url = "/support/ticket/:id"
layout = "default"

[supportTicket]
updatePage = "support/update"
isPrimary = "1"

[session]
security = "user"
redirect = "account/login"
```
```twig
{% set ticket = supportTicket.ticket %}

{% if ticket %}

    <div class="mb-4">
        <a href="{{ 'support/tickets'|page }}" class="text-sm text-blue-600 hover:underline">
            &larr; Back to My Tickets
        </a>
    </div>

    <!-- Ticket header -->
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold">
                Ticket #{{ ticket.id }}: {{ ticket.subject }}
            </h1>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-medium px-2 py-0.5 rounded
                    {% if ticket.status.status_code == 'closed' %}
                        text-gray-700 bg-gray-100
                    {% elseif ticket.status.status_code == 'new' %}
                        text-blue-700 bg-blue-100
                    {% else %}
                        text-green-700 bg-green-100
                    {% endif %}
                ">
                    {{ ticket.status.name }}
                </span>
                {% if ticket.type %}
                    <span class="text-xs text-gray-500">
                        {{ ticket.type.name }}
                    </span>
                {% endif %}
            </div>
        </div>
        {% if not ticket.closed_at %}
            <button
                data-request="onCloseTicket"
                data-request-confirm="Are you sure you want to close this ticket?"
                data-request-flash
                class="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
            >
                Close ticket
            </button>
        {% endif %}
    </div>

    <!-- Original message -->
    <div class="bg-white rounded-lg border border-gray-200 mb-6">
        <div class="p-4">
            <div class="flex items-center gap-3 mb-3">
                <img
                    src="{{ ticket.user.avatarThumb(40) }}"
                    alt="{{ ticket.user.name }}"
                    class="w-10 h-10 rounded-full"
                />
                <div>
                    <span class="text-sm font-medium text-gray-900">
                        {{ ticket.user.name }}
                    </span>
                    <span class="text-xs text-gray-400 ml-2">
                        {{ ticket.created_at|date('M j, Y \\a\\t g:i a') }}
                    </span>
                </div>
            </div>
            <div class="prose prose-sm max-w-none text-gray-700">
                {{ ticket.content_html|raw }}
            </div>
            {% if ticket.attachments|length %}
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <p class="text-xs font-medium text-gray-500 mb-1">
                        Attachments
                    </p>
                    {% for file in ticket.attachments %}
                        <a href="{{ file.path }}" class="text-xs text-blue-600 hover:underline block">
                            {{ file.file_name }} ({{ file.sizeToString }})
                        </a>
                    {% endfor %}
                </div>
            {% endif %}
            <div class="mt-3">
                <a href="{{ ticket.url }}?mode=ticket" class="text-xs text-gray-400 hover:text-blue-600">
                    Edit
                </a>
            </div>
        </div>
    </div>

    <!-- Messages -->
    {% for message in ticket.messages if not message.is_internal %}
        <div class="bg-white rounded-lg border mb-4
            {{ message.is_user_message ? 'border-gray-200' : 'border-blue-200' }}
        ">
            <div class="p-4">
                <div class="flex items-center gap-3 mb-3">
                    {% if message.is_user_message %}
                        <img
                            src="{{ ticket.user.avatarThumb(40) }}"
                            alt="{{ ticket.user.name }}"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span class="text-sm font-medium text-gray-900">
                                {{ ticket.user.name }}
                            </span>
                            <span class="text-xs text-gray-400 ml-2">
                                {{ message.created_at|date('M j, Y \\a\\t g:i a') }}
                            </span>
                        </div>
                    {% else %}
                        <img
                            src="{{ message.created_user.avatarThumb(40) }}"
                            alt="{{ message.created_user.full_name }}"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span class="text-sm font-medium text-gray-900">
                                {{ message.created_user.full_name }}
                            </span>
                            <span class="text-xs font-medium text-blue-600 ml-1">
                                Staff
                            </span>
                            <span class="text-xs text-gray-400 ml-2">
                                {{ message.created_at|date('M j, Y \\a\\t g:i a') }}
                            </span>
                        </div>
                    {% endif %}
                </div>
                <div class="prose prose-sm max-w-none text-gray-700">
                    {{ message.content_html|raw }}
                </div>
                {% if message.attachments|length %}
                    <div class="mt-3 pt-3 border-t border-gray-100">
                        <p class="text-xs font-medium text-gray-500 mb-1">
                            Attachments
                        </p>
                        {% for file in message.attachments %}
                            <a href="{{ file.path }}" class="text-xs text-blue-600 hover:underline block">
                                {{ file.file_name }} ({{ file.sizeToString }})
                            </a>
                        {% endfor %}
                    </div>
                {% endif %}
                {% if message.is_user_message %}
                    <div class="mt-3">
                        <a href="{{ message.url }}" class="text-xs text-gray-400 hover:text-blue-600">
                            Edit
                        </a>
                    </div>
                {% endif %}
            </div>
        </div>
    {% endfor %}

    <!-- Reply form -->
    {% if not ticket.closed_at %}
        <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">
                Post a Reply
            </h3>
            {{ form_open({ request: 'onSubmitMessage', files: true, flash: true }) }}
                <div class="mb-4">
                    <textarea
                        name="content"
                        rows="5"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Write your reply... Markdown is supported."
                    >{{ post('content') }}</textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Attachments
                    </label>
                    <input
                        name="files[]"
                        type="file"
                        class="text-sm text-gray-600"
                    />
                </div>
                <button
                    type="submit"
                    data-attach-loading
                    class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                    Submit reply
                </button>
            {{ form_close() }}
        </div>
    {% else %}
        <div class="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
            This ticket has been closed.
        </div>
    {% endif %}

{% else %}

    <p class="text-gray-500">
        Ticket not found.
    </p>

{% endif %}
```
:::

## How the Conversation Thread Works

The `supportTicket` component provides the `ticket` variable, which includes `ticket.messages` (the follow-up messages in the conversation). Each message has:

- `is_user_message`: true for messages sent by the user, false for staff responses
- `is_internal`: true for internal staff notes that should not be shown to the user
- `content_html`: the message content rendered from Markdown to HTML
- `created_user`: the backend user who sent the message (for staff messages)
- `attachments`: any files attached to the message
- `url`: a link to the editing page for this message

The template filters out internal messages with `if not message.is_internal` and styles user and staff messages differently using the border color.

## The isPrimary Property

Setting `isPrimary = "1"` marks this page as the canonical ticket page. When the plugin sends email notifications about ticket activity, it generates links that point to this page. Only one ticket page should be marked as primary.

## Responding from the Backend

Support staff respond to tickets through the backend:

1. Navigate to **Support > Tickets** in the backend
2. Click on a ticket to open it
3. Type a response in the message area
4. Click **Post** to send the reply

The user will see the staff response when they visit the ticket page. Staff can also check the **Internal** checkbox to post a note that is only visible to other staff members.

## Closing a Ticket

The "Close ticket" button calls `onCloseTicket`, which marks the ticket as closed and refreshes the page. Once closed, the reply form is replaced with a notice, and the close button is hidden. All participants receive a notification when a ticket is closed.

## Try It Out

1. Submit a ticket from the frontend
2. Reply to it from the backend as support staff
3. Visit the ticket page to see the conversation thread
4. Post a reply from the frontend
5. Close the ticket and verify the form is replaced with the closed notice

## Next Steps

Continue to [Editing Messages](./editing-messages.md) to let users update their submitted tickets and messages.
