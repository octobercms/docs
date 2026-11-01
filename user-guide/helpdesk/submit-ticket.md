---
subtitle: Create a form for submitting new support tickets.
---
# Submit Ticket

The submission page lets users create new support tickets. They select a ticket type, write a subject and description (with Markdown support), and optionally attach files.

## Creating the Submit Page

Create a new page at `pages/support/submit.htm`:

::: cmstemplate
```ini
title = "Submit Ticket"
url = "/support/submit"
layout = "default"

[supportTicketSubmit]
redirect = "support/ticket"

[session]
security = "user"
redirect = "account/login"
```
```twig
<div class="mb-4">
    <a href="{{ 'support/tickets'|page }}" class="text-sm text-blue-600 hover:underline">
        &larr; Back to My Tickets
    </a>
</div>

<h1 class="text-2xl font-bold mb-6">
    Submit a Ticket
</h1>

{% set ticketTypes = supportTicketSubmit.ticketTypes %}

{{ form_ajax('onSubmitTicket', { files: true, flash: true, validate: true }) }}

    <div class="mb-4">
        <label for="ticketType" class="block text-sm font-medium text-gray-700 mb-1">
            Ticket type
        </label>
        <select
            name="type_id"
            id="ticketType"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
            <option value="">
                Select a type...
            </option>
            {% for type in ticketTypes %}
                <option value="{{ type.id }}">
                    {{ type.name }}
                </option>
            {% endfor %}
        </select>
        <div data-validate-for="type_id" class="text-sm text-red-600 mt-1"></div>
    </div>

    <div class="mb-4">
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
            Subject
        </label>
        <input
            name="subject"
            type="text"
            id="subject"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            maxlength="255"
        />
        <div data-validate-for="subject" class="text-sm text-red-600 mt-1"></div>
    </div>

    <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Description
        </label>
        <textarea
            name="content"
            id="content"
            rows="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">
            You can use Markdown syntax for formatting.
        </p>
        <div data-validate-for="content" class="text-sm text-red-600 mt-1"></div>
    </div>

    <div class="mb-6">
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
        Submit ticket
    </button>

{{ form_close() }}
```
:::

## How File Attachments Work

The `files: true` option tells `form_ajax()` to add `enctype="multipart/form-data"` to the form and to send the selected files with the AJAX request. The `files[]` input name uses array syntax, and the `multiple` attribute lets users choose several files at once, so one input handles every attachment.

The plugin checks every file before it saves anything. It accepts jpg, jpeg, png, gif, webp, pdf, txt, doc, docx, xls and xlsx files, at most 5 files of 10 MB each. SVG files are always refused, because they can contain scripts. If a file breaks these rules, the ticket is not created and the reason appears under the file input. The plugin reports every attachment error under the `files` name, whichever file caused it, so one `data-validate-for="files"` element shows them all. Replies and message edits follow the same rules.

To change the rules, create a config override file at `config/responsiv/support/config.php` in your project and return only the keys you want to change:

```php
<?php

return [
    'attachmentTypes' => ['jpg', 'jpeg', 'png', 'pdf', 'txt', 'csv'],
    'attachmentMaxFiles' => 3,
    'attachmentMaxSize' => 5,
];
```

The `attachmentTypes` value replaces the whole default list, so include every extension you want to allow. SVG stays refused even if you add it. The `attachmentMaxFiles` value is the number of files allowed in one submission, and `attachmentMaxSize` is the limit for each file in megabytes.

## How Ticket Types Work

The `ticketTypes` variable lists the ticket types that are not marked as hidden, sorted by name. Choosing a type is optional, so the form keeps an empty "Select a type..." option. Any other `type_id` must be one of the listed types. The handler refuses a hidden or unknown type, and the message "Please select a valid ticket type." appears under the select.

To build a page for one kind of request, set the component's `ticketType` property to a type code, for example `ticketType = "bug-report"`, and leave the select out of the form. Every ticket from that page gets that type, even if the type is hidden, and any posted `type_id` is ignored. The component sets the `ticketTypeCode` page variable to the property value and `ticketType` to the matching type. If no type has that code, the handler refuses every submission and shows the flash message "This ticket type is not available." Show a notice in place of the form in that case, as the component's default markup does:

```twig
{% if ticketTypeCode and not ticketType %}
    <p class="text-gray-500">
        This ticket type is not available.
    </p>
{% else %}
    <!-- Submission form -->
{% endif %}
```

## How the Redirect Works

The `redirect = "support/ticket"` property tells the component where to send the user after a successful submission. The `onSubmitTicket` handler creates the ticket and redirects to the ticket page, passing the new ticket's ID as the `:id` URL parameter. This takes the user directly to their newly created ticket.

## How Flash Messages Work

The `form_ajax()` helper builds an AJAX form. Submitting it sends the form to the `onSubmitTicket` handler without reloading the page, and the `validate` and `flash` options control how the result is shown:

- The `validate` option shows each validation error in the `data-validate-for` element with the same field name. If the subject is empty, for example, the error appears under the Subject field. The page does not reload, so the form keeps what the user typed.
- The `flash` option also shows each error as a flash message, including errors that belong to no field, such as "This ticket type is not available."

When the ticket is created, the handler stores a success message and redirects to the ticket page. That page shows the message with its `{% flash %}` block, which you will add in the next part.

Inline errors, flash messages and the loading indicator that `data-attach-loading` adds to the button all come from the AJAX framework extras, which your layout loads with `{% framework extras %}`. The extras also keep each `data-validate-for` element hidden until it holds an error.

## Try It Out

1. Navigate to `/support/submit` and fill in the form
2. Select a ticket type, enter a subject and description
3. Click "Submit ticket"
4. You should be redirected to the new ticket's detail page
5. Check **Support > Tickets** in the backend to see the ticket
6. Submit the form again with an empty subject and check that the error appears under the Subject field

## Next Steps

Continue to [Ticket Page](./ticket-page.md) to build the page where users view their tickets and have conversations with support staff.
