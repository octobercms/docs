---
subtitle: Define the Tailor blueprint for mailing list subscribers.
---
# Subscriber Blueprint

The core of your mailing list is a subscriber record. In this step, you will create a Tailor blueprint that stores subscriber information and tracks their subscription status.

## Creating the Subscriber Blueprint

<!-- TODO: Full subscriber blueprint YAML with: email (text, required, unique), first_name (text), last_name (text), is_active (switch, default true), subscribed_at (datepicker), unsubscribe_token (text, hidden/auto-generated) -->

## Adding Navigation

<!-- TODO: Navigation block for the backend sidebar -->

## Running the Migration

<!-- TODO: php artisan october:migrate -->

## Creating a Campaign Blueprint

<!-- TODO: Optional — a blueprint for email campaigns with: subject (text), body (richeditor), sent_at (datepicker), status (dropdown: draft/sent) -->

## Next Steps

With your subscriber blueprint ready, continue to [Signup Form](./signup-form.md) to create the frontend subscription form.
