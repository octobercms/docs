---
subtitle: Create a signup form where visitors can subscribe to your mailing list.
---
# Signup Form

Now that you have a subscriber list and campaign template, you need a way for visitors to join your mailing list. In this step, you will build a signup form as a CMS partial so it can be included anywhere on your site.

## Creating the Signup Partial

Create a new partial at `partials/subscribe-form.htm`:

::: cmstemplate
```ini
[campaignSignup]
list = "newsletter"
confirm = 1
templatePage = "campaign/message"
```
```twig
<div id="subscribe-form">
    <h3 class="text-lg font-semibold mb-3">
        Subscribe to our newsletter
    </h3>
    <form
        data-request="campaignSignup::onSignup"
        data-request-update="{ subscribe_result: '#subscribe-form' }"
    >
        <div class="flex flex-col sm:flex-row gap-2 mb-2">
            <input
                name="first_name"
                type="text"
                placeholder="First name"
                class="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
                name="last_name"
                type="text"
                placeholder="Last name"
                class="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
        </div>
        <div class="flex gap-2">
            <input
                name="email"
                type="email"
                placeholder="you@example.com"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
            />
            <button
                type="submit"
                data-attach-loading
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
                Subscribe
            </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">
            We will never spam or share your email address.
        </p>
    </form>
</div>
```
:::

The result partial is rendered after the form is submitted. Create a new partial at `partials/subscribe_result.htm`:

```twig
{% if error %}
    <div class="p-3 bg-red-50 text-red-700 text-sm rounded-md">
        {{ error }}
    </div>
{% elseif isThrottled %}
    <div class="p-3 bg-yellow-50 text-yellow-700 text-sm rounded-md">
        Please wait a few minutes before making another subscription request.
    </div>
{% elseif requireConfirmation %}
    <div class="p-3 bg-green-50 text-green-700 text-sm rounded-md">
        We have sent you an email to confirm your subscription. Please check your inbox.
    </div>
{% else %}
    <div class="p-3 bg-green-50 text-green-700 text-sm rounded-md">
        You are now subscribed. Welcome aboard!
    </div>
{% endif %}
```

## How the Form Works

The form uses `data-request="campaignSignup::onSignup"` to call the signup handler. The `campaignSignup::` prefix is the component alias, which is needed because the partial can be included on any page.

The `data-request-update` attribute tells the AJAX framework to replace the `#subscribe-form` container with the `subscribe_result` partial after the handler completes. This gives the visitor immediate feedback without a full page reload.

The component properties control the behavior:

- `list = "newsletter"`: the subscriber is added to the "Newsletter" list you created earlier
- `confirm = 1`: the subscriber must confirm their email address before they are fully added
- `templatePage = "campaign/message"`: the CMS page used to generate the email confirmation URL

## Including the Partial

Add the signup form to any page or layout using the `partial` tag. For example, to add it to the footer of your default layout:

```twig
<footer class="bg-gray-100 border-t border-gray-200 mt-12">
    <div class="max-w-5xl mx-auto px-4 py-8">
        {% partial 'subscribe-form' %}
    </div>
</footer>
```

You can also create a dedicated subscribe page. Create a page at `pages/subscribe.htm`:

::: cmstemplate
```ini
title = "Subscribe"
url = "/subscribe"
layout = "default"
```
```twig
<div class="max-w-md mx-auto">
    {% partial 'subscribe-form' %}
</div>
```
:::

## How Email Confirmation Works

With `confirm = 1`, the signup process works in two steps:

1. The visitor fills in the form and submits it. The plugin creates a subscriber record (marked as unconfirmed) and sends a verification email.
2. The subscriber clicks the confirmation link in the email. The link points to your campaign template page (`campaign/message.htm`) with a `?verify=1` parameter. The `campaignTemplate` component verifies the subscriber and redirects them to a confirmation page.

The verification email is sent using the `responsiv.campaign::mail.confirm_subscriber` mail template, which you can customize under **Settings > Mail Templates**.

## Creating Confirmation and Unsubscribe Pages

When subscribers confirm their email or unsubscribe from a campaign, they should land on a friendly page rather than a plain HTML message. Create two simple pages for this.

Create a page at `pages/subscribe/confirmed.htm`:

::: cmstemplate
```ini
title = "Subscription Confirmed"
url = "/subscribe/confirmed"
layout = "default"
```
```twig
<div class="max-w-md mx-auto text-center py-12">
    <h1 class="text-2xl font-bold mb-4">
        You are confirmed!
    </h1>
    <p class="text-gray-600 mb-6">
        Your email address has been verified and you are now subscribed to our newsletter.
    </p>
    <a href="/" class="text-blue-600 hover:underline">
        Return to the homepage
    </a>
</div>
```
:::

Create a page at `pages/subscribe/goodbye.htm`:

::: cmstemplate
```ini
title = "Unsubscribed"
url = "/subscribe/goodbye"
layout = "default"
```
```twig
<div class="max-w-md mx-auto text-center py-12">
    <h1 class="text-2xl font-bold mb-4">
        You have been unsubscribed
    </h1>
    <p class="text-gray-600 mb-6">
        You will no longer receive emails from us. If this was a mistake, you can subscribe again at any time.
    </p>
    <a href="/" class="text-blue-600 hover:underline">
        Return to the homepage
    </a>
</div>
```
:::

Now update the `campaignTemplate` component in `campaign/message.htm` to redirect to these pages. Open the page in the CMS Editor and update the component configuration:

```ini
[campaignTemplate]
verifyPage = "subscribe/confirmed"
unsubscribePage = "subscribe/goodbye"
```

When a subscriber confirms their email, they are redirected to `/subscribe/confirmed`. When they click an unsubscribe link in a campaign email, they are redirected to `/subscribe/goodbye`.

## Try It Out

1. Include the signup partial on a page and visit it in your browser
2. Fill in the form with your email address and submit it
3. Check **Mailing List > Subscribers** in the backend to see the new subscriber (marked as unconfirmed)
4. Check your email inbox for the confirmation message and click the verification link
5. You should be redirected to the "Subscription Confirmed" page
6. Back in the backend, verify the subscriber is now confirmed

## Next Steps

Continue to [Sending Campaigns](./sending-campaigns.md) to compose and send your first email campaign.
