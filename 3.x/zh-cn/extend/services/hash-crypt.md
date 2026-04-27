# 哈希和加密

## 配置

首次安装 October 时，应该已经为你生成了一个随机密钥。你可以通过检查 `config/app.php` 配置文件中的 `key` 选项来确认。如果密钥保持不变，你应该将其设置为 32 个字符的随机字符串。如果此值未正确设置，所有加密值将不安全。

## 哈希

`Hash` 门面提供安全的 Bcrypt 哈希，用于存储用户密码。Bcrypt 是哈希密码的绝佳选择，因为其"工作因子"是可调的，这意味着随着硬件能力的增加，生成哈希所需的时间也可以增加。

你可以通过在 `Hash` 门面上调用 `make` 方法来对密码进行哈希处理：

```php
$user = new User;
$user->password = Hash::make('mypassword');
$user->save();
```

或者，模型可以实现 [Hashable trait](../database/traits.md) 来自动对属性进行哈希处理。

#### 验证密码与哈希值是否匹配

`check` 方法允许你验证给定的明文字符串是否与给定的哈希值对应。

```php
if (Hash::check('plain-text', $hashedPassword)) {
    // 密码匹配...
}
```

#### 检查密码是否需要重新哈希

`needsRehash` 函数允许你确定哈希器使用的工作因子自密码被哈希以来是否已更改：

```php
if (Hash::needsRehash($hashed)) {
    $hashed = Hash::make('plain-text');
}
```

## 加密

你可以使用 `Crypt` 门面加密值。所有加密值都使用 OpenSSL 和 `AES-256-CBC` 密码进行加密。此外，所有加密值都使用消息认证码（MAC）进行签名，以检测加密字符串的任何修改。

例如，我们可以使用 `encrypt` 方法加密一个秘密并将其存储在[数据库模型](../database/model.md)中：

```php
$user = new User;
$user->secret = Crypt::encrypt('shhh no telling');
$user->save();
```

#### 解密值

当然，你可以使用 `Crypt` 门面上的 `decrypt` 方法解密值。如果值无法正确解密（例如 MAC 无效时），将抛出 `Illuminate\Contracts\Encryption\DecryptException` 异常：

```php
use Illuminate\Contracts\Encryption\DecryptException;

try {
    $decrypted = Crypt::decrypt($encryptedValue);
}
catch (DecryptException $ex) {
    //
}
```

或者，模型可以实现 [Encryptable trait](../database/traits.md) 来自动加密和解密属性。
