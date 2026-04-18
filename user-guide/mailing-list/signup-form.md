---
subtitle: Create a signup form where visitors can subscribe to your mailing list.
---
# Signup Form

Now that your subscriber blueprint is defined, you need a way for visitors to join your mailing list. In this step, you will build a signup form using the AJAX framework.

## Creating the Signup Page

<!-- TODO: Create a page or partial for the signup form — could be a dedicated page at /subscribe or a partial embedded in the footer/sidebar -->

## Building the Form

<!-- TODO: Simple AJAX form with data-request for: email, first name, last name. Keep it minimal for high conversion -->

## Writing the AJAX Handler

<!-- TODO: onSubscribe handler — validate input, check for duplicate email, create subscriber entry with is_active = true, generate unsubscribe token, flash success message -->

## Preventing Duplicates

<!-- TODO: Check if the email already exists, handle gracefully (re-subscribe if inactive, show message if already active) -->

## Adding a Confirmation Message

<!-- TODO: Show success feedback, optionally send a welcome email -->

## Embedding the Form as a Partial

<!-- TODO: Making the signup form a partial so it can be included on any page (footer, sidebar, popup) -->

## Next Steps

Continue to [Managing Subscribers](./managing-subscribers.md) to learn how to manage your subscriber list in the backend.
