---
previousPath: extend/backend/users.md
subtitle: Find, register and sign in backend administrators from your plugin code.
---
# Users

Backend users are the administrators who sign in to the admin panel. Each one is a `Backend\Models\User` model, which holds their details along with their role, groups, permissions, password resets and sign-in throttling. Use the global `BackendAuth` facade to work with them from your code.

```php
$user = BackendAuth::getUser();
```

Plugins can also [register permissions](./permissions.md) that control access to their backend features.

## Checking the Signed In User

The `BackendAuth::check` method returns `true` if a user is signed in. To get the model of the signed in user, use the `BackendAuth::getUser` method. Inside any [backend controller](./controllers.md), the signed in user is also available as `$this->user`.

```php
// Returns true if signed in.
$loggedIn = BackendAuth::check();

// Returns the signed in user
$user = BackendAuth::getUser();
```

## Finding a User

Look up a user by their login name with the `BackendAuth::findUserByLogin` method.

```php
$user = BackendAuth::findUserByLogin('someuser');
```

## Registering an Administrator

The `BackendAuth` facade inherits the `October\Rain\Auth\Manager` class. To register a new administrator account, use the `BackendAuth::register` method.

```php
$user = BackendAuth::register([
    'first_name' => 'Some',
    'last_name' => 'User',
    'login' => 'someuser',
    'email' => 'some@website.tld',
    'password' => 'changeme',
    'password_confirmation' => 'changeme'
]);
```

## Signing In a User

Authenticate a user with their login and password using the `BackendAuth::authenticate` method. To sign in as a user without their password, pass the `Backend\Models\User` model to the `BackendAuth::login` method.

```php
// Authenticate user by credentials
$user = BackendAuth::authenticate([
    'login' => post('login'),
    'password' => post('password')
]);

// Sign in as a specific user
BackendAuth::login($user);
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
* [Permissions](./permissions.md)
* [Console Commands](../../setup/console-commands.md#command-october-passwd)
* [Sending Mail](../services/mail.md)
:::
