---
subtitle: Define the Tailor blueprint for support tickets.
---
# Ticket Blueprint

The foundation of your helpdesk is a Tailor blueprint that defines what a support ticket looks like — the fields visitors fill in, the fields administrators use to manage tickets, and how tickets are organized.

## Creating the Ticket Blueprint

<!-- TODO: Full ticket blueprint YAML with: subject (text), description (richeditor), submitter_name (text), submitter_email (text), priority (dropdown: low/medium/high/urgent), status (dropdown: open/in-progress/resolved/closed), attachments (fileupload, multiple), admin_notes (richeditor) -->

## Separating Public and Admin Fields

<!-- TODO: Explain how some fields are filled by visitors (subject, description, name, email) and others by admins (status, priority, admin_notes). Use field permissions or tabs to organize -->

## Adding Navigation

<!-- TODO: Navigation block for the backend sidebar -->

## Running the Migration

<!-- TODO: php artisan october:migrate -->

## Next Steps

With your ticket blueprint ready, continue to [Ticket Form](./ticket-form.md) to create the frontend submission form.
