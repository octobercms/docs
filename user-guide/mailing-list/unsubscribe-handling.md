---
subtitle: Give subscribers a way to opt out of your mailing list.
---
# Unsubscribe Handling

Every mailing list needs an unsubscribe mechanism — it is both a legal requirement in most jurisdictions and good practice for maintaining a healthy subscriber list. In this final step, you will create an unsubscribe page and link.

## Creating the Unsubscribe Page

<!-- TODO: Create a page at /unsubscribe/:token that looks up the subscriber by their unique unsubscribe token -->

## Processing the Unsubscribe

<!-- TODO: AJAX handler or page code that sets is_active = false for the subscriber, shows a confirmation message -->

## Adding Unsubscribe Links to Emails

<!-- TODO: Including the unsubscribe URL in every campaign email template, using the subscriber's token -->

## Handling Invalid Tokens

<!-- TODO: What to show when the token doesn't match any subscriber -->

## Re-subscribing

<!-- TODO: Optional — allowing users to re-subscribe by visiting the signup form again -->

## Summary

<!-- TODO: Recap of everything built — subscriber blueprint, signup form, management, campaigns, unsubscribe. Mention legal compliance (CAN-SPAM, GDPR). Link back to the User Guide -->
