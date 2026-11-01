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
{% flash %}
    <p
        data-control="flash-message"
        data-type="{{ type }}"
        data-interval="5"
    >
        {{ message }}
    </p>
{% endflash %}

{% set ticket = supportTicket.ticket %}

{% if ticket %}

    {% set customerName = ticket.user ? ticket.user.full_name : __('Deleted user') %}

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
                    {% if ticket.closed_at %}
                        text-gray-700 bg-gray-100
                    {% elseif ticket.status.code == 'new' %}
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
                    alt="{{ customerName }}"
                    class="w-10 h-10 rounded-full"
                />
                <div>
                    <span class="text-sm font-medium text-gray-900">
                        {{ customerName }}
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
            {% if not ticket.closed_at %}
                <div class="mt-3">
                    <a href="{{ ticket.url }}?mode=ticket" class="text-xs text-gray-400 hover:text-blue-600">
                        Edit
                    </a>
                </div>
            {% endif %}
        </div>
    </div>

    <!-- Messages -->
    {% for message in ticket.messages|filter(m => not m.is_internal) %}
        <div id="message-{{ message.id }}" class="bg-white rounded-lg border mb-4
            {{ message.is_user_message ? 'border-gray-200' : 'border-blue-200' }}
        ">
            <div class="p-4">
                <div class="flex items-center gap-3 mb-3">
                    {% if message.is_user_message %}
                        <img
                            src="{{ ticket.user.avatarThumb(40) }}"
                            alt="{{ customerName }}"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span class="text-sm font-medium text-gray-900">
                                {{ customerName }}
                            </span>
                            <span class="text-xs text-gray-400 ml-2">
                                {{ message.created_at|date('M j, Y \\a\\t g:i a') }}
                            </span>
                        </div>
                    {% else %}
                        {% set staffName = message.created_user ? message.created_user.full_name : __('Deleted user') %}
                        <img
                            src="{{ message.created_user.avatarThumb(40) }}"
                            alt="{{ staffName }}"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span class="text-sm font-medium text-gray-900">
                                {{ staffName }}
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
                {% if message.is_user_message and not ticket.closed_at %}
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
            {{ form_ajax('onSubmitMessage', { files: true, flash: true, validate: true }) }}
                <div class="mb-4">
                    <textarea
                        name="content"
                        rows="5"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Write your reply... Markdown is supported."
                    ></textarea>
                    <div data-validate-for="content" class="text-sm text-red-600 mt-1"></div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Attachments
                    </label>
                    <input
                        name="files[]"
                        type="file"
                        multiple
                        class="text-sm text-gray-600"
                    />
                    <div data-validate-for="files" class="text-sm text-red-600 mt-1"></div>
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
- `is_internal`: true for internal staff notes, which the component never includes in `ticket.messages`
- `content_html`: the message content rendered from Markdown to HTML, with any HTML the author typed shown as plain text
- `created_user`: the backend user who sent the message (for staff messages)
- `attachments`: any files attached to the message
- `url`: a link to the editing page for this message

The component leaves internal staff notes out of `ticket.messages`, so they never reach the page. The `filter(m => not m.is_internal)` in the loop is only a safety net. Older examples wrote this loop as `{% for message in ticket.messages if not message.is_internal %}`, but Twig 3 removed that syntax and the page fails with a syntax error, so use the `filter` filter instead.

Names come from `full_name`, which combines the account's first and last name. The `customerName` and `staffName` variables fall back to "Deleted user" when the account no longer exists, and the `__()` function makes that text translatable. The template also styles user and staff messages differently using the border color.

## Posting a Reply

The reply form is an AJAX form, built the same way as the submission form. It sends the reply to the `onSubmitMessage` handler, which saves the message and its attachments, notifies the support team and reloads the page. The `{% flash %}` block at the top of the page then shows the success message. The submission form and the editing page also return to this page after a successful save, so the same block shows their messages too.

Errors, such as an empty reply or a file type that is not allowed, appear under the fields and as flash messages without reloading the page. The `data-control="flash-message"` attribute in the `{% flash %}` block lets the AJAX framework extras show the success messages as notifications too. See [How Flash Messages Work](./submit-ticket.md#how-flash-messages-work) for details.

## The isPrimary Property

Setting `isPrimary = "1"` marks this page as the canonical ticket page. When the plugin sends email notifications about ticket activity, it generates links that point to this page. Only one ticket page should be marked as primary. If more than one is marked, the links use the first one the plugin finds, and if none is marked, they use the first page that has the `supportTicket` component.

## Responding from the Backend

Support staff respond to tickets through the backend:

1. Navigate to **Support > Tickets** in the backend
2. Click on a ticket to open it
3. Click **Reply** in the toolbar, or click the reply panel below the conversation
4. Type a response in the message area
5. Click **Submit reply** to send it

The user will see the staff response when they visit the ticket page. To leave a note that only other staff members can see, use **Post internal message** instead, either from the toolbar or from the second tab of the reply panel. That tab lists the other support members under **Notify Users**, and only the members you tick receive an email about the note.

While a ticket is closed, the reply panel is hidden and staff cannot post to it. Click **Reopen ticket** in the toolbar to continue the conversation.

## Closing a Ticket

The "Close ticket" button calls `onCloseTicket`, which marks the ticket as closed and refreshes the page. The `data-request-flash` attribute shows an error if the request fails, and the `{% flash %}` block shows the confirmation after the refresh. All participants receive a notification when a ticket is closed.

A ticket counts as closed when its `closed_at` date is set, which is why the template checks `ticket.closed_at` rather than the status. Once closed, the reply form is replaced with a notice, and the close button and the Edit links are hidden. The plugin enforces this on the server as well: it refuses replies, edits and attachment changes on a closed ticket until staff reopen it from the backend.

## Try It Out

1. Submit a ticket from the frontend
2. Reply to it from the backend as support staff
3. Visit the ticket page to see the conversation thread
4. Post a reply from the frontend
5. Close the ticket and verify the form is replaced with the closed notice and the Edit links are gone

## Next Steps

Continue to [Editing Messages](./editing-messages.md) to let users update their submitted tickets and messages.
