---
subtitle: Create login and registration pages with custom Tailwind-styled forms.
---
# Login and Registration

With the User plugin installed and the session component on your layout, you can now create pages where visitors sign in and register for an account.

## Creating the Login Page

Create a new page at `pages/account/login.htm` with the following content:

::: cmstemplate
```ini
title = "Sign In"
url = "/account/login"
layout = "default"

[authentication]
rememberMe = "ask"

[session]
security = "guest"
redirect = "forum/index"
```
```twig
<div class="max-w-sm mx-auto">
    <h1 class="text-2xl font-bold text-center mb-6">
        Sign in to your account
    </h1>

    <form data-request="onLogin" data-request-flash>
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email address
            </label>
            <input
                name="email"
                type="email"
                id="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="you@example.com"
            />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>
            <input
                name="password"
                type="password"
                id="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
        </div>

        <div class="mb-4">
            <label class="flex items-center gap-2">
                <input name="remember" type="checkbox" class="rounded" checked />
                <span class="text-sm text-gray-600">
                    Remember me
                </span>
            </label>
        </div>

        <button
            type="submit"
            data-attach-loading
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            Sign in
        </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600">
        <p class="mb-2">
            <a href="{{ 'account/register'|page }}" class="text-blue-600 hover:underline">
                Create a new account
            </a>
        </p>
        <p>
            <a href="{{ 'account/forgot-password'|page }}" class="text-blue-600 hover:underline">
                Forgot your password?
            </a>
        </p>
    </div>
</div>
```
:::

## How This Works

The `[authentication]` component provides the `onLogin` handler. When the form is submitted, it reads the `email`, `password`, and `remember` fields and authenticates the user. On success, it redirects to the page specified in the session component.

Key attributes:

- `data-request="onLogin"`: calls the component's login handler via AJAX
- `data-request-flash`: displays success or error messages using the flash message system
- `data-attach-loading`: adds a loading indicator to the button while the request is in progress

The `[session]` component with `security = "guest"` means this page is only accessible to guests. If a logged-in user visits this URL, they are automatically redirected to `forum/index`.

## Creating the Registration Page

Create a new page at `pages/account/register.htm`:

::: cmstemplate
```ini
title = "Create Account"
url = "/account/register"
layout = "default"

[registration]

[session]
security = "guest"
redirect = "forum/index"
```
```twig
<div class="max-w-sm mx-auto">
    <h1 class="text-2xl font-bold text-center mb-6">
        Create a new account
    </h1>

    <form data-request="onRegister" data-request-flash>
        <div class="mb-4">
            <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">
                First name
            </label>
            <input
                name="first_name"
                type="text"
                id="first_name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                autocomplete="given-name"
            />
        </div>

        <div class="mb-4">
            <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">
                Last name
            </label>
            <input
                name="last_name"
                type="text"
                id="last_name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                autocomplete="family-name"
            />
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email address
            </label>
            <input
                name="email"
                type="email"
                id="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                autocomplete="email"
            />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>
            <input
                name="password"
                type="password"
                id="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                autocomplete="new-password"
            />
        </div>

        <button
            type="submit"
            data-attach-loading
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            Create account
        </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600">
        <p>
            Already have an account?
            <a href="{{ 'account/login'|page }}" class="text-blue-600 hover:underline">
                Sign in
            </a>
        </p>
    </div>
</div>
```
:::

The `[registration]` component provides the `onRegister` handler. It reads the form fields (`first_name`, `last_name`, `email`, `password`), creates the user account, and logs them in automatically.

## Try It Out

1. Preview your site and navigate to `/account/register`
2. Fill in the form and create a test account
3. After registration, you should be redirected to the forum index (which doesn't exist yet, so you will see a 404, that's fine)
4. Check the navigation: it should now show "Account" and "Sign out" instead of "Sign in"
5. Click "Sign out" to log out, then sign in again at `/account/login`

## Next Steps

Continue to [Password Reset](./password-reset.md) to add a password recovery flow.
