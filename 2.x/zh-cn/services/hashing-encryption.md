# 哈希与加密

## 配置

当您第一次安装October时，应该已经为您生成了一个随机密钥。 您可以通过检查 `config/app.php` 配置文件的 `key` 选项来确认这一点。 如果密钥保持不变，则应将其设置为 32 个字符的随机字符串。 如果未正确设置此值，则所有加密值都将是不安全的。

## 哈希(Hash)

`Hash` 门面为存储用户密码提供了安全的 Bcrypt 哈希。 Bcrypt 是哈希密码的绝佳选择，因为它的"装填因子"是可调整的，这意味着生成哈希所需的时间可以随着硬件功率的增加而增加。

您可以通过调用 `Hash` 门面上的 `make` 方法来设置哈希密码：

```php
$user = new User;
$user->password = Hash::make('mypassword');
$user->save();
```

或者，模型可以实现 [哈希特征](../database/traits.md#hashable) 来自动设置哈希属性。

#### 根据哈希验证密码

`check` 方法允许您验证给定的纯文本字符串是否对应于给定的哈希。

```php
if (Hash::check('plain-text', $hashedPassword)) {
    // 密码匹配...
}
```

#### 检查密码是否需要重新生成哈希

`needsRehash` 函数允许您确定哈希器使用的装填因子是否在密码被哈希后发生了变化：

```php
if (Hash::needsRehash($hashed)) {
    $hashed = Hash::make('plain-text');
}
```

## 加密

你可以使用 `Crypt` 门面加密一个值。 所有加密值都使用 OpenSSL 和`AES-256-CBC`密码进行加密。 此外，所有加密值都使用消息验证码(MAC)进行签名，以检测对加密字符串的任何修改。

例如，我们可以使用 `encrypt` 方法加密一个密文并将其存储在 [数据库模型](../database/model.md) 中：

```php
$user = new User;
$user->secret = Crypt::encrypt('我在村东头老槐树下藏了一箱黄金');
$user->save();
```

#### 解密一个值

当然，您可以使用 `Crypt` 门面上的 `decrypt` 方法解密值。 如果无法正确解密该值，例如 MAC 无效，则会抛出 `Illuminate\Contracts\Encryption\DecryptException` 异常：

```php
use Illuminate\Contracts\Encryption\DecryptException;

try {
    $decrypted = Crypt::decrypt($encryptedValue);
}
catch (DecryptException $ex) {
    //
}
```

或者，模型可以实现 [加密 特征](../database/traits.md#encryptable) 来自动加密和解密属性。
