---
subtitle: Add a password reset page so users can recover their accounts.
---
# Password Reset

Users need a way to recover their account when they forget their password. This page handles the second step of the flow: after a user requests a password reset email (from the login page), they click a link that brings them here with a reset token.

## Creating the Password Reset Page

Create a new page at `pages/account/forgot-password.htm`:

::: cmstemplate
```ini
title = "Reset Password"
url = "/forgot-password"
layout = "default"

[resetPassword]
```
```twig
<div class="max-w-sm mx-auto">
    {% if resetPassword.hasToken %}
        <h1 class="text-2xl font-bold text-center mb-6">
            Reset your password
        </h1>

        <form data-request="onResetPassword" data-request-flash>
            <input type="hidden" name="token" value="{{ resetPassword.token }}" />
            <input type="hidden" name="email" value="{{ resetPassword.email }}" />

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                    New password
                </label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autocomplete="new-password"
                />
            </div>

            <div class="mb-4">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                </label>
                <input
                    name="password_confirmation"
                    type="password"
                    id="password_confirmation"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autocomplete="new-password"
                />
            </div>

            <button
                type="submit"
                data-attach-loading
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Reset password
            </button>
        </form>
    {% else %}
        <h1 class="text-2xl font-bold text-center mb-6">
            Change your password
        </h1>

        <form data-request="onChangePassword" data-request-flash>
            <div class="mb-4">
                <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">
                    Current password
                </label>
                <input
                    name="current_password"
                    type="password"
                    id="current_password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                    New password
                </label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autocomplete="new-password"
                />
            </div>

            <div class="mb-4">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                </label>
                <input
                    name="password_confirmation"
                    type="password"
                    id="password_confirmation"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    autocomplete="new-password"
                />
            </div>

            <button
                type="submit"
                data-attach-loading
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Change password
            </button>
        </form>
    {% endif %}

    <div class="mt-6 text-center text-sm text-gray-600">
        <a href="{{ 'account/login'|page }}" class="text-blue-600 hover:underline">
            Back to Sign in
        </a>
    </div>
</div>
```
:::

## How This Works

The reset link in the email arrives with `reset` and `email` query parameters, for example `/forgot-password?reset=TOKEN&email=user@example.com`. The `resetPassword` component reads these parameters and exposes them as `resetPassword.token` and `resetPassword.email`.

The page handles two scenarios:

**With a token** (`resetPassword.hasToken` is true): the user clicked a reset link from their email. The token and email are passed as hidden fields, and `onResetPassword` validates the token and sets the new password.

**Without a token**: the user is logged in and wants to change their password. The `onChangePassword` handler verifies their current password before updating to the new one.

## The Password Reset Flow

The complete flow spans two pages:

1. On the **login page**, the "Forgot your password?" link takes the user to the recover password flow. The `authentication` component provides an `onRecoverPassword` handler that sends the reset email.
2. The email contains a link to `/forgot-password?reset=TOKEN&email=EMAIL`. The user arrives on this page with the token in the query string.
3. The `resetPassword` component reads the token, and the user enters a new password.

To add the email recovery step to your login page, you could add a second form that calls `onRecoverPassword`. For simplicity, the login page we built links directly to this page, and you can test the flow through the backend or application logs.

## Try It Out

1. Navigate to `/forgot-password` while logged in to test the password change form
2. To test the full reset flow: in the backend, go to **Users**, click a user, and use the "Send password reset" option. Check the application log or your mail service for the reset link.
3. Click the link in the email. You should arrive at the page with the token form showing "Reset your password"
4. Enter a new password and confirm it. On success, you will be redirected to the login page.

## Part 1 Complete

You now have a working user authentication system:

- **Login**: users sign in with email and password at `/account/login`
- **Registration**: new users create accounts at `/account/register`
- **Password reset**: users recover their accounts via `/forgot-password`

These pages will be used by the forum and can serve as the foundation for any feature that requires user accounts.

## Next Steps

Continue to [Installing the Forum Plugin](./installing-the-forum-plugin.md) to set up the discussion forum.
