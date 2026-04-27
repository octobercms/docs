# 模型设置

模型设置将值存储在数据库中，可以通过后台面板的用户界面覆盖。

## 数据库设置

插件可以使用继承 `System\Models\SettingModel` 基类的模型来实现数据库驱动的配置，将设置存储在数据库中。此模型可以直接用于创建后台设置表单。您不需要创建数据库表和控制器来创建基于设置模型的后台设置表单。模型设置目录结构示例：

::: dir
├── plugins
|   └── acme
|       └── demo
|           ├── models
|           |   ├── usersetting  _← 配置目录_
|           |   |   └── fields.yaml  _← 表单字段_
|           |   └── `UserSetting.php`  _← 模型类_
|           └── Plugin.php
:::

设置模型可以注册以显示在[后台面板的设置区域](./settings.md)中，但这不是必需的——您可以像其他模型一样设置和读取设置值。

### 模型类定义

设置模型类应继承 `System\Models\SettingModel` 类，并且与其他模型一样，应在插件目录的 **models** 子目录中定义。下面示例中的模型应在 **plugins/acme/demo/models/UserSetting.php** 文件中定义。

```php
namespace Acme\Demo\Models;

class UserSetting extends \System\Models\SettingModel
{
    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';
}
```

`$settingsCode` 属性对于设置模型是必需的。它定义了用于将设置保存到数据库的唯一设置键。

如果您要构建基于模型的后台设置表单，则 `$settingsFields` 属性是必需的。该属性指定包含表单字段定义的 YAML 文件名。表单字段在[表单控制器文章](../forms/form-controller.md)中有描述。YAML 文件应放置在与小写的模型类名匹配的目录中。

## 写入设置模型

设置模型具有静态 `set` 方法，允许保存单个或多个值。您还可以使用标准模型功能设置模型属性并保存模型。

```php
use Acme\Demo\Models\UserSetting;

// Set a single value
UserSetting::set('api_key', 'ABCD');

// Set an array of values
UserSetting::set(['api_key' => 'ABCD']);

// Set object values
$settings = UserSetting::instance();
$settings->api_key = 'ABCD';
$settings->save();
```

## 从设置模型读取

设置模型具有静态 `get` 方法，可以加载单个属性。此外，当您使用 `instance` 方法实例化模型时，它会从数据库加载属性，您可以直接访问它们。

```php
// Outputs: ABCD
echo UserSetting::instance()->api_key;

// Get a single value
echo UserSetting::get('api_key');

// Get a value and return a default value if it doesn't exist
echo UserSetting::get('is_activated', true);
```

## 与多站点集成

设置模型可以为[多站点配置](../../cms/resources/multisite.md)定义的每个站点提供不同的配置值。要启用多站点，请在模型中包含 `October\Rain\Database\Traits\Multisite` [Trait](../database/traits.md)，并定义 `$propagatable` 属性，该属性可以指定在所有站点之间传播的字段。

```php
namespace Acme\Demo\Models;

class UserSetting extends \System\Models\SettingModel
{
    use \October\Rain\Database\Traits\Multisite;

    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';

    protected $propagatable = [];
}
```
