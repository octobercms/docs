# Users

The user management for the backend panel includes features like roles, groups, permissions, password resets and sign-in throttling. Plugins can also [register permissions](permissions.md) that control access to the features in the backend.

## Backend User Helper

The global `BackendAuth` facade can be used for managing administrative users, which primarily inherits the `October\Rain\Auth\Manager` class. To register a new administrator user account, use the `BackendAuth::register` method.

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

The `BackendAuth::check` method is a quick way to check if the user is signed in. To return the user model that is signed in, use `BackendAuth::getUser` instead. Additionally, the active user will be available as `$this->user` inside any [backend controller](../backend/controllers-ajax.md).

```php
// Returns true if signed in.
$loggedIn = BackendAuth::check();

// Returns the signed in user
$user = BackendAuth::getUser();

// Returns the signed in user from a controller
$user = $this->user;
```

You may look up a user by their login name using the `BackendAuth::findUserByLogin` method.

```php
$user = BackendAuth::findUserByLogin('someuser');
```

You may authenticate a user by providing their login and password with `BackendAuth::authenticate`. You can also authenticate as a user simply by passing the `Backend\Models\User` model along with `BackendAuth::login`.

```php
// Authenticate user by credentials
$user = BackendAuth::authenticate([
    'login' => post('login'),
    'password' => post('password')
]);

// Sign in as a specific user
BackendAuth::login($user);
```

## Change Backend User Password

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

```bash
php artisan october:passwd username password
```

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.
