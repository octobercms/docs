# Users

The user management for the back-end includes features like roles, groups, permissions, password resets and sign-in throttling. Plugins can also register permissions that control access to the features in the back-end.

### Change Backend User Password

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

```bash
php artisan october:passwd username password
```

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.
