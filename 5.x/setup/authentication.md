---
subtitle: Configure how administrators sign in to the backend panel, manage their devices and protect their account with two-factor authentication.
---
# Authentication

Administrators sign in to the backend panel with a login name and password, and can add a second step using an authenticator app. Signing in is built on Laravel's session guard and is configured in two files. The **config/auth.php** file defines where users are stored and how long emailed links last, and the **config/backend.php** file holds the sign in rules, such as who must use two-factor authentication.

```php
'two_factor' => [
    'enabled' => true,
    'required' => 'superusers',
],
```

Plugins work with administrators through the `BackendAuth` facade, described in the [backend users](../backend/panel/users.md) article.

## The Auth Config File

The **config/auth.php** file follows the layout of Laravel's authentication config and describes two kinds of user. The `backend` entries belong to administrators. The `web` guard and the `users` entries belong to front-end users, and take effect when the RainLab.User plugin is installed.

Entry | Description
------------- | -------------
**guards.backend** | the guard that keeps administrators signed in. Accepts a `remember` value, the number of minutes that a remembered device stays signed in.
**providers.backend** | the `model` class used for an administrator, and the `session_model` class that records each signed in device.
**passwords.backend** | the password reset links, where `expire` is the number of minutes a link stays valid and `throttle` is the number of seconds before another link can be requested.
**passwords.backend_invites** | the invitation links, where `expire` is the number of minutes a link stays valid.

The backend guard is kept apart from Laravel's `Auth` facade, which only reaches front-end users. Administrators are always reached through the `BackendAuth` facade, whether or not a plugin has set up users of its own.

When the file or one of its entries is missing, the default values are used: the core model classes, 60 minutes for a password reset link and seven days for an invitation.

### Using a Custom User Model

To use a model of your own for administrators, extend the `Backend\Models\User` class and set the new class name in the backend provider.

```php
'providers' => [
    'backend' => [
        'driver' => 'backend',
        'model' => Acme\Blog\Models\Administrator::class,
        'session_model' => Backend\Models\UserSession::class,
    ],
],
```

## Signing In

The following values in the **config/backend.php** file control the sign in page.

Property | Description
------------- | -------------
**force_remember** | set to `true` to keep every administrator signed in, or `false` so they are signed out when their session ends. The default value `null` displays a **Stay logged in** checkbox on the sign in page.
**force_single_session** | set to `true` to sign out the other devices of an administrator each time they sign in. Default: `false`.

A remembered device stays signed in for 400 days. To change this, add a `remember` value to the backend guard in the **config/auth.php** file, as a number of minutes.

```php
'guards' => [
    'backend' => [
        'driver' => 'backend',
        'provider' => 'backend',
        'remember' => 43200,
    ],
],
```

### Failed Sign In Attempts

Failed attempts are counted for each login name and IP address. After five failed attempts within 15 minutes, further attempts for that login name from that address are refused until the 15 minutes have passed. Attempts for a login name that doesn't exist are counted in the same way.

When [debug mode](./configuration.md#debug-mode) is disabled, the sign in page doesn't say whether the login name or the password was wrong.

## Managing Signed In Devices

Every device that an administrator signs in on is recorded. The **Sessions** tab of the **My Account** page lists these devices with their browser and platform, IP address and the time they were last active.

- The **Sign Out** button next to a device signs out that device.
- The **Sign Out Other Devices** button signs out every device except the current one, after asking for the current password.

Administrators with the **Manage Other Admins** permission see the same tab when updating another administrator in **Settings → Administrators**, with a **Sign Out All Devices** button.

Signing out of the backend panel ends the session on the current device only. Changing a password signs out that administrator on every other device.

## Passwords

### Password Policy

The rules for an administrator's password are set by the `password_policy` value in the **config/backend.php** file.

Property | Description
------------- | -------------
**allow_reset** | allow administrators to reset their own password from the sign in page. Default: `true`.
**min_length** | the minimum password length, between 4 and 128 characters. Default: `4`.
**require_uppercase** | require at least one uppercase letter. Default: `false`.
**require_lowercase** | require at least one lowercase letter. Default: `false`.
**require_number** | require at least one number. Default: `false`.
**require_nonalpha** | require at least one character that is not a letter or a number. Default: `false`.
**expire_days** | the number of days before a password must be changed, or `false` so passwords never expire. Default: `false`.

An administrator with an expired password is asked to choose a new one the next time they sign in, before they can use the backend panel.

### Resetting a Password

The **Forgot password?** link on the sign in page emails the administrator a link to a page where they choose a new password. The link is valid for 60 minutes and can be used once. A new link can be requested once a minute for each account. Both values are set by the `passwords.backend` entry in the **config/auth.php** file.

```php
'backend' => [
    'provider' => 'backend',
    'table' => 'backend_user_password_resets',
    'expire' => 60,
    'throttle' => 60,
],
```

A link also stops working when the administrator signs in, or when their password is changed in any other way. To remove the link from the sign in page, set the `allow_reset` value of the password policy to `false`.

### Inviting an Administrator

When an administrator is created in **Settings → Administrators**, the **Send invitation by email** checkbox sends them a welcome message with a link to a page where they choose their own password. While the checkbox is ticked, the password fields are hidden and no password is sent by email.

The invitation is valid for seven days, set by the `expire` value of the `passwords.backend_invites` entry in the **config/auth.php** file. Until the new administrator has signed in for the first time, the **Send Invitation** button on their update page sends a new invitation, and the link in the earlier one stops working.

::: tip
The reset and invitation messages use the `backend:restore` and `backend:invite` mail templates, which can be customized in **Settings → Mail Templates**.
:::

## Two-Factor Authentication

Two-factor authentication adds a second step to signing in. After their password, the administrator is asked for a six digit code from an authenticator app on their phone, such as Google Authenticator, Microsoft Authenticator or 1Password.

Two-factor is available to every administrator and stays off for each account until its owner turns it on.

### Setting Up Two-Factor

An administrator turns on two-factor from the **Two-Factor** tab of the **My Account** page.

1. Click **Set Up Two-Factor** and enter the current password.
2. Scan the QR code with an authenticator app, or enter the key shown below it.
3. Enter the six digit code that the app displays.
4. Save the eight recovery codes that are shown. They can be copied or downloaded as a file.

Each recovery code signs in once in place of a code from the app, for when the phone is not at hand. The same tab shows how many codes are left. Displaying the codes again, or replacing them with a new set, asks for the password first.

Turning two-factor on or off signs out the other devices of that administrator.

### Signing In with a Code

After the password is accepted, the sign in page asks for the code from the app. The **Use a recovery code** link switches to entering a recovery code instead.

The code must be entered within ten minutes of the password, otherwise the administrator starts again from the sign in page. A code is accepted once. After five wrong codes within a minute, further codes for that administrator are refused until the minute has passed.

### Requiring Two-Factor

The `required` value of the `two_factor` setting in the **config/backend.php** file decides who must use two-factor.

Value | Description
------------- | -------------
**false** | two-factor is optional for everyone. This is the default.
**'superusers'** | super users must use two-factor.
**'all'** | every administrator must use two-factor.

```php
'two_factor' => [
    'enabled' => true,
    'required' => 'all',
],
```

An administrator who is required to use two-factor, and has not set it up, is taken to a set up page after signing in and cannot open any other backend page until it is complete. They are also unable to turn two-factor off afterwards. The setting is read on every request, so it applies to administrators who are already signed in.

### Recovering Access

An administrator who has lost their phone signs in with one of their recovery codes. If the recovery codes are lost as well, two-factor must be reset for their account. They can then sign in with their password alone and set it up again.

An administrator with the **Manage Other Admins** permission resets two-factor from the **Two-Factor** tab when updating the account in **Settings → Administrators**, using the **Reset Two-Factor** button.

Two-factor can also be reset from the command line with the `october:twofactor` command. The argument is the login name or email address of the administrator.

```bash
php artisan october:twofactor username --reset
```

Either way, the administrator is signed out of every device. Without the `--reset` option, the command reports whether two-factor is on for the account.

::: warning
The two-factor secret and recovery codes are stored encrypted with the application key. If the `APP_KEY` value changes, the codes from an administrator's app are no longer accepted and two-factor must be reset for each account that uses it.
:::

### Disabling Two-Factor

To remove two-factor from the backend panel, set the `enabled` value to `false`.

```php
'two_factor' => [
    'enabled' => false,
    'required' => false,
],
```

Nobody is asked for a code, including administrators who had turned two-factor on, and the tab is removed from the account pages. The `required` value has no effect while two-factor is disabled.

### Finding Who Uses Two-Factor

The administrators list in **Settings → Administrators** has a **Two-Factor** filter, and a **Two-Factor** column that is hidden by default and can be shown from the list setup.

#### See Also

::: also
* [Backend Users](../backend/panel/users.md)
* [Console Commands](./console-commands.md#command-october-twofactor)
* [Configuration](./configuration.md)
:::
