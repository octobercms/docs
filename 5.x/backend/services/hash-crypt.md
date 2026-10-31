---
previousPath: extend/services/hash-crypt.md
subtitle: Hash passwords with Bcrypt and encrypt values so they can be decrypted later.
---
# Hash & Crypt

Use the `Hash` facade to hash values that you never need to read back, such as passwords, and the `Crypt` facade to encrypt values that you need to decrypt later.

```php
$hashed = Hash::make('mypassword');

$encrypted = Crypt::encrypt('shhh no telling');
```

## Hashing Passwords

The `Hash` facade provides secure Bcrypt hashing for storing user passwords. Bcrypt is a good choice for hashing passwords because its "work factor" is adjustable, so you can increase the time it takes to generate a hash as hardware gets faster.

Hash a password by calling the `make` method on the `Hash` facade.

```php
$user = new User;
$user->password = Hash::make('mypassword');
$user->save();
```

Models can also use the [Hashable trait](../data/model-traits/hashable.md) to hash attributes automatically.

#### Verifying a Password Against a Hash

The `check` method verifies that a plain-text string matches a hash.

```php
if (Hash::check('plain-text', $hashedPassword)) {
    // The passwords match...
}
```

#### Checking if a Password Needs to be Rehashed

The `needsRehash` method checks if the work factor used by the hasher has changed since the password was hashed.

```php
if (Hash::needsRehash($hashed)) {
    $hashed = Hash::make('plain-text');
}
```

## Encrypting Values

Encrypt a value with the `Crypt` facade. All values are encrypted using OpenSSL and the `AES-256-CBC` cipher, using the [application key](#setting-the-application-key). All encrypted values are also signed with a message authentication code (MAC) to detect any changes to the encrypted string.

For example, use the `encrypt` method to encrypt a secret and store it on a [database model](../data/model-queries.md).

```php
$user = new User;
$user->secret = Crypt::encrypt('shhh no telling');
$user->save();
```

#### Decrypting a Value

Decrypt values with the `decrypt` method on the `Crypt` facade. If the value cannot be decrypted, such as when the MAC is invalid, an `Illuminate\Contracts\Encryption\DecryptException` exception is thrown.

```php
use Illuminate\Contracts\Encryption\DecryptException;

try {
    $decrypted = Crypt::decrypt($encryptedValue);
}
catch (DecryptException $ex) {
    //
}
```

Models can also use the [Encryptable trait](../data/model-traits/encryptable.md) to encrypt and decrypt attributes automatically.

## Setting the Application Key

When you installed October CMS, a random key should have been generated for you. You can confirm this by checking the `key` option in your **config/app.php** configuration file. If the key has not been set, set it to a random, 32 character string.

::: warning
If the application key is not set correctly, all encrypted values are insecure.
:::

#### See Also

::: also
* [Model Traits](../data/model-traits.md)
* [Laravel Hashing](https://laravel.com/docs/12.x/hashing)
* [Laravel Encryption](https://laravel.com/docs/12.x/encryption)
:::
