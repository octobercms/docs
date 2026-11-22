---
previousPath: extend/backend/users.md
subtitle: Find, create and sign in backend administrators from your plugin code.
---
# Users

Backend users are the administrators who sign in to the admin panel. Each one is a `Backend\Models\User` model, which holds their details along with their role, groups and permissions. Use the global `BackendAuth` facade to work with them from your code.

```php
$user = BackendAuth::getUser();
```

The `BackendAuth` facade is a Laravel session guard for administrators, so the methods of a guard such as `check`, `id`, `attempt`, `login` and `logout` are available alongside the methods described in this article. It is separate from Laravel's `Auth` facade, which only reaches front-end users.

Plugins can also [register permissions](./permissions.md) that control access to their backend features. The settings that apply to a whole site, such as the password policy and who must use two-factor authentication, are described in the [authentication](../../setup/authentication.md) article.

## Checking the Signed In User

The `BackendAuth::check` method returns `true` if a user is signed in. To get the model of the signed in user, use the `BackendAuth::getUser` method. Inside any [backend controller](./controllers.md), the signed in user is also available as `$this->user`.

```php
// Returns true if signed in.
$loggedIn = BackendAuth::check();

// Returns the signed in user
$user = BackendAuth::getUser();
```

## Finding a User

Look up a user with a query on the `Backend\Models\User` model, for example by their login name.

```php
$user = User::where('login', 'someuser')->first();
```

## Creating an Administrator

To create a new administrator account, save a new `Backend\Models\User` model. The password is checked against the [password policy](../../setup/authentication.md#password-policy) when the model is saved.

```php
$user = new User;
$user->first_name = 'Some';
$user->last_name = 'User';
$user->login = 'someuser';
$user->email = 'some@website.tld';
$user->password = 'changeme';
$user->password_confirmation = 'changeme';
$user->save();
```

To let the new administrator choose their own password, leave the password out and set the `send_invite` attribute. They are emailed an invitation with a link to a page where they choose a password.

```php
$user = new User;
$user->first_name = 'Some';
$user->last_name = 'User';
$user->login = 'someuser';
$user->email = 'some@website.tld';
$user->send_invite = true;
$user->save();
```

## Signing In a User

Sign in a user with their login name and password using the `BackendAuth::attempt` method, which returns `false` when the details do not match. To sign in as a user without their password, pass the `Backend\Models\User` model to the `BackendAuth::login` method. The `BackendAuth::logout` method signs out the current device.

```php
// Sign in with a login name and password
$success = BackendAuth::attempt([
    'login' => post('login'),
    'password' => post('password')
]);

// Sign in as a specific user
BackendAuth::login($user);

// Sign out the current device
BackendAuth::logout();
```

The `attempt` and `login` methods accept a second argument. Pass `true` to keep the device signed in after its session ends.

::: warning
The `authenticate`, `register`, `findUserById`, `findUserByLogin` and `findUserByCredentials` methods are deprecated. Use the `attempt` method, the user model and a model query instead, as shown in this article.
:::

### Asking for a Two-Factor Code

The `attempt` and `login` methods sign in the user straight away, including a user who has turned on [two-factor authentication](../../setup/authentication.md#two-factor-authentication). A plugin that provides its own sign in page should use the `BackendAuth::attemptWithTwoFactor` method instead. It checks the login name and password in the same way, then signs in the user unless they have two-factor turned on. For those users the sign in waits, and the `BackendAuth::hasTwoFactorChallenge` method returns `true`.

```php
$success = BackendAuth::attemptWithTwoFactor([
    'login' => post('login'),
    'password' => post('password')
]);

if (!$success) {
    throw new ApplicationException('The details you entered did not match our records.');
}

// The user has two-factor turned on and is not signed in yet
if (BackendAuth::hasTwoFactorChallenge()) {
    return Backend::redirect('backend/auth/challenge');
}
```

The **backend/auth/challenge** page asks for the code and signs in the user when it is accepted. To build a page of your own, pass the submitted code or recovery code to the `BackendAuth::completeTwoFactorChallenge` method, which signs in the waiting user and returns `true` when the code is accepted.

The following methods of the user model report on two-factor for a user.

Method | Description
------------- | -------------
**hasEnabledTwoFactorAuthentication** | returns `true` when the user is asked for a code to sign in.
**isTwoFactorRequired** | returns `true` when the site requires this user to have two-factor.
**needsTwoFactorSetup** | returns `true` when two-factor is required and the user has not set it up yet.
**recoveryCodes** | returns the recovery codes that the user has not used.
**resetTwoFactorAuthentication** | turns two-factor off for the user and signs out all of their devices.

### Limiting Failed Attempts

The `attempt` method does not count failed attempts. The backend sign in page counts them for each login name and IP address with the methods below, and a sign in page of your own can do the same. A login name is locked after five failed attempts within 15 minutes.

```php
$login = post('login');

if (BackendAuth::isThrottled($login)) {
    $seconds = BackendAuth::getThrottleSeconds($login);

    throw new ApplicationException("Too many attempts, please try again in {$seconds} seconds.");
}

if (!BackendAuth::attempt(['login' => $login, 'password' => post('password')])) {
    BackendAuth::addThrottleAttempt($login);

    throw new ApplicationException('The details you entered did not match our records.');
}

BackendAuth::clearThrottle($login);
```

## Signed In Devices

Every device that a user signs in on has a session record, which is how the **Sessions** tab of the My Account page lists them. A device stays signed in while its record exists, so deleting the record signs out that device on its next request.

```php
// The devices of the signed in user, most recently active first
$sessions = BackendAuth::listSessions();

foreach ($sessions as $session) {
    // For example: Chrome on Windows
    $name = $session->device_name;

    $ipAddress = $session->ip_address;

    $lastActive = $session->last_seen_at;

    // Returns true for the device making this request
    $isCurrent = BackendAuth::isCurrentSession($session);
}
```

The following methods sign out devices. The user argument is optional except where noted, and the signed in user is used when it is left out.

Method | Description
------------- | -------------
**listSessions($user)** | returns the session records of a user.
**revokeSession($id, $user)** | signs out a single device, by the `id` of its session record.
**revokeOtherSessions($user)** | signs out every device of a user except the current device.
**revokeAllSessions($user)** | signs out every device of a user. The user argument is required.

```php
// Sign out everywhere else
BackendAuth::revokeOtherSessions();

// Sign out another user completely
BackendAuth::revokeAllSessions($user);
```

## Password Resets and Invitations

Password reset links and invitations are issued by Laravel's password broker. The `BackendAuth::getPasswordBroker` method returns the broker for password resets, and its `sendResetLink` method emails a link to the user with the supplied login name.

```php
BackendAuth::getPasswordBroker()->sendResetLink(['login' => 'someuser']);
```

To send a user a new invitation to choose their password, call the `sendInvitation` method of the user model. The link in an earlier invitation stops working.

```php
$user->sendInvitation();
```

Changing the password of a user cancels any reset link or invitation that was sent to them. To cancel them yourself, call the `clearPasswordTokens` method.

```php
$user->clearPasswordTokens();
```

## Events

The following events are fired for backend users. Each one receives the user model.

Event | Description
------------- | -------------
**backend.user.login** | fired after a user has signed in.
**backend.user.twoFactorEnabled** | fired after a user has turned on two-factor authentication.
**backend.user.twoFactorDisabled** | fired after a user has turned off two-factor authentication.
**backend.user.twoFactorReset** | fired after two-factor has been reset for a user by an administrator or from the command line.
**backend.user.twoFactorFailed** | fired when a wrong code is given for a user who is signing in with two-factor.

```php
Event::listen('backend.user.twoFactorReset', function ($user) {
    traceLog('Two-factor was reset for ' . $user->login);
});
```

Laravel's authentication events, such as `Illuminate\Auth\Events\Login`, `Logout` and `Failed`, are also fired for backend users with a guard name of `backend`. A listener that is meant for front-end users should check the `guard` property of the event.

```php
Event::listen(\Illuminate\Auth\Events\Login::class, function ($event) {
    if ($event->guard === 'backend') {
        traceLog($event->user->login . ' signed in to the backend');
    }
});
```

## Acting as a User in Tests

In a [plugin test](../console/testing.md), pass a `Backend\Models\User` model to the `actingAs` method to make that user the signed in user of the `BackendAuth` facade.

```php
$this->actingAs($user);

$this->assertTrue(BackendAuth::check());
```

## Groups

User groups use the `Backend\Models\UserGroup` model. Groups organize administrators for purposes such as notifications. They are not related to [user permissions](./permissions.md).

For example, to email every user in the `Head Office Staff` group, find the group by its code and send the mail to its users.

```php
$group = UserGroup::where('code', 'head-office-staff')->first();

Mail::sendTo($group->users, 'author.plugin:important_notification');
```

## Changing a Password from the Command Line

The `october:passwd` command changes the password of a backend administrator. Use it when you are locked out of your October CMS install, or to change the password of the default administrator account.

```bash
php artisan october:passwd username password
```

The first argument is the login name or email address of the user. The second argument is the new password. Both arguments are optional, and the command prompts you for any you leave out. Leave the password prompt blank to generate a random password, which the command displays.

#### See Also

::: also
* [Authentication](../../setup/authentication.md)
* [Permissions](./permissions.md)
* [Console Commands](../../setup/console-commands.md#command-october-passwd)
* [Sending Mail](../services/mail.md)
:::
