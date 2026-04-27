---
subtitle: 为任何后台页面添加表单管理功能。
---
# 表单控制器

`Backend\Behaviors\FormController` 类是一个控制器行为，用于轻松地向后台页面添加表单功能。该行为提供三个页面：创建、更新和预览。预览页面是更新页面的只读版本。当您使用表单行为时，不需要在控制器中定义 `create`、`update` 和 `preview` 操作——行为会自动为您处理。但是，您应该提供相应的视图文件。

表单行为依赖于表单[字段定义](../../element/form-fields.md)和[模型类](../database/model.md)。要使用表单行为，您应该将其添加到控制器类的 `$implement` 属性中。同时，应定义 `$formConfig` 类属性，其值应引用用于配置行为属性的 YAML 文件。

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';
}
```

::: tip
通常表单和[列表控制器](../lists/list-controller.md)会在同一个控制器中一起使用。
:::

## 配置表单行为

在 `$formConfig` 属性中引用的配置文件以 YAML 格式定义。该文件应放置在[控制器的视图目录](../system/views.md)中。以下是一个典型的表单行为配置文件示例。

```yaml
# config_form.yaml
name: Blog Category
form: $/acme/blog/models/post/fields.yaml
modelClass: Acme\Blog\Post

create:
    title: New Blog Post

update:
    title: Edit Blog Post

preview:
    title: View Blog Post
```

以下属性在表单配置文件中是必需的。

属性 | 描述
------------- | -------------
**name** | 此表单管理的对象名称。
**form** | 配置数组或表单字段定义文件的引用，参见[表单字段](../../element/form-fields.md)。
**modelClass** | 模型类名，表单数据针对此模型进行加载和保存。

以下列出的配置属性是可选的。如果希望表单行为支持创建、更新或预览页面，请定义这些属性。

属性 | 描述
------------- | -------------
**design** | 渲染时使用特定的表单设计模式显示表单（见下文）。
**defaultRedirect** | 未定义特定重定向页面时用作后备的重定向页面。
**create** | 创建页面的配置数组或配置文件引用。
**update** | 更新页面的配置数组或配置文件引用。
**preview** | 预览页面的配置数组或配置文件引用。
**customMessages** | 自定义表单控制器中使用的消息。
**permissions** | 对表单控制器提供的某些操作应用限制。

### 创建页面

要支持创建页面，请在 YAML 文件中添加以下配置。

```yaml
create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
```

创建页面支持以下属性。

属性 | 描述
------------- | -------------
**title** | 页面标题，可引用[本地化字符串](../system/localization.md)。
**redirect** | 记录保存时的重定向页面。
**redirectClose** | 记录保存且请求中发送了 **close** post 变量时的重定向页面。
**form** | 仅覆盖创建页面的默认表单字段定义。

### 更新页面

要支持更新页面，请在 YAML 文件中添加以下配置。

```yaml
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
```

更新页面支持以下属性。

属性 | 描述
------------- | -------------
**title** | 页面标题，可引用[本地化字符串](../system/localization.md)。
**redirect** | 记录保存时的重定向页面。
**redirectClose** | 记录保存且请求中发送了 **close** post 变量时的重定向页面。
**form** | 仅覆盖更新页面的默认表单字段定义。

### 预览页面

要支持预览页面，请在 YAML 文件中添加以下配置：

```yaml
preview:
    title: View Blog Post
```

预览页面支持以下属性。

属性 | 描述
------------- | -------------
**title** | 页面标题，可引用[本地化字符串](../system/localization.md)。
**form** | 仅覆盖预览页面的默认表单字段定义。

### 自定义消息

指定 `customMessages` 属性可覆盖表单控制器使用的默认消息。值可以是纯文本或引用[本地化字符串](../system/localization.md)。

```yaml
customMessages:
    notFound: Did not find the thing
    flashCreate: New thing created
    flashUpdate: Updated that thing
    flashDelete: Thing is gone
```

您还可以在显示表单的上下文中修改消息。以下示例将仅覆盖 `update` 上下文中的 `notFound` 消息。

```yaml
update:
    customMessages:
        notFound: Nothing found when updating
```

以下消息可作为自定义消息进行覆盖。

::: details 查看可用消息列表
消息 | 默认消息
------------- | -------------
**notFound** | Form record with an ID of :id could not be found.
**flashCreate** | :name Created
**flashUpdate** | :name Updated
**flashDelete** | :name Deleted
:::

### 权限限制

指定 `permissions` 属性可对表单控制器提供的操作应用限制。使用当前后台用户必须拥有的[权限值](../backend/permissions.md)才能使用该字段。支持单个权限的字符串或权限数组（只需满足其中一个即可授予访问权限）。

```yaml
permissions:
    modelCreate: admins.manage.create
    modelDelete: admins.manage.delete
```

以下属性可作为必需权限进行覆盖。

::: details 查看可用消息列表
消息 | 默认消息
------------- | -------------
**modelCreate** | 创建新记录所需。
**modelUpdate** | 修改现有记录所需。
**modelPreview** | 预览现有记录所需。
**modelDelete** | 删除现有记录所需。
:::

## 定义表单字段

::: aside
可用的表单字段属性可在[表单字段定义](../../element/form-fields.md)页面找到。
:::

表单字段通过 YAML 文件定义。表单字段配置被表单行为用于创建表单控件并将其绑定到模型字段。

该文件放置在插件 **models** 目录的子目录中。子目录名称与小写的模型类名匹配。文件名没有限制，但 **fields.yaml** 和 **form_fields.yaml** 是常用名称。表单字段文件位置示例：

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← 配置目录_
|               |   └── fields.yaml  _← 配置文件_
|               └── Post.php  _← 模型类_
:::

字段可放置在三个区域中：**外部区域**、**主选项卡**或**次要选项卡**。以下示例展示了表单字段定义文件的典型内容。

```yaml
# fields.yaml
fields:
    blog_title:
        label: Blog Title
        description: The title for this blog

    published_at:
        label: Published date
        description: When this blog post was published
        type: datepicker

    # [...]

tabs:
    fields:
        # [...]

secondaryTabs:
    fields:
        # [...]
```

## 表单视图

对于表单支持的每个页面（创建、更新和预览），您应该提供一个具有对应名称的[视图文件](../backend/controllers-ajax.md)——**create.php**、**update.php** 和 **preview.php**。

表单行为向控制器类添加两个方法：`formRender`、`formRenderDesign` 和 `formRenderPreview`。这些方法渲染通过上述 YAML 文件配置的表单控件。

### 创建视图

**create.php** 视图代表允许用户创建新记录的创建页面。典型的创建页面包含面包屑导航、表单本身和表单按钮。**data-request** 属性应引用表单行为提供的 `onSave` AJAX 处理程序。以下是典型创建视图文件的内容。

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Creating Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Create and Close
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

要跟踪未保存的更改并在离开表单时显示警告，请在表单开始标签上添加 `data-change-monitor` 属性。

```php
<?= Form::open(['class' => '...', 'data-change-monitor' => true]) ?>
```

### 更新视图

**update.php** 视图代表允许用户更新或删除现有记录的更新页面。典型的更新页面包含面包屑导航、表单本身和表单按钮。更新页面与创建页面非常相似，但通常多一个删除按钮。**data-request** 属性应引用表单行为提供的 `onSave` AJAX 处理程序。以下是典型 update.php 表单的内容。

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Saving Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Save and Close
            </button>
            <button
                type="button"
                class="oc-icon-trash-o btn-icon danger pull-right"
                data-request="onDelete"
                data-request-message="Deleting Category..."
                data-request-confirm="Do you really want to delete this category?">
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

### 预览视图

**preview.php** 视图代表允许用户以只读模式预览现有记录的预览页面。典型的预览页面包含面包屑导航和表单本身。以下是典型 preview.php 表单的内容。

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

## 表单设计

`create:controller` 命令生成[控制器](../system/controllers.md)，并支持 `--design` 选项来实现所需的显示模式，如下所述。

```bash
php artisan create:controller Acme.Blog Posts --design=popup
```

当您需要在不管理 HTML 内容的情况下显示表单时，表单设计非常有用，这虽然灵活性较低，但可以使构建表单的过程更快。

```yaml
design:
    displayMode: basic
```

行为配置中的 **design** 属性控制表单的显示方式。支持以下属性。

属性 | 描述
------------- | -------------
**displayMode** | 指定要使用的显示模式，支持的值：`custom`、`basic`、`survey`、`sidebar`、`popup`。默认值：`basic`
**horizontalMode** | 以水平方向显示表单字段。默认值：`false`
**surveyMode** | 禁用选项卡并在页面上以带标题的分区显示所有字段。默认值：`false`
**size** | 页面容器的大小，支持的值：`400`-`1200` 之间以 `50` 为步长递增，`auto`。默认值：`auto`
**sidebarSize** | `sidebar` 模式下侧边栏的宽度，支持的值：`300`-`750` 之间以 `50` 为步长递增。默认值：`300`

使用 `formRenderDesign` 方法在 **create.php**、**update.php** 和 **preview.php** 视图文件中渲染表单设计。

```php
<?= $this->formRenderDesign() ?>
```

### 显示模式

在行为配置中使用 **design** 显示模式时，视图内容使用系统提供的标准表单内容生成。

以下是支持的 **displayMode** 值及其描述。

显示模式 | 描述
------------- | -------------
**custom** | 使用自定义视图文件渲染表单（默认）
**basic** | 标准表单的基本布局
**survey** | 使用带标题的堆叠分区的调查布局
**sidebar** | 侧边栏布局，次要选项卡在侧面板中渲染
**popup** | 表单内容在弹出窗口中管理

**size** 属性定义页面容器的大小或弹出窗口的大小。

```yaml
design:
    displayMode: survey
    size: 950
```

### 弹出窗口显示模式

如果 **design** 设置为使用 `popup` 显示模式，则完全不需要创建任何视图文件。所有表单管理功能都包含在弹出窗口中。

```yaml
design:
    displayMode: popup
    size: 750
```

与[列表控制器](../lists/list-controller.md)集成时，将 **recordOnClick** 属性设置为 `popup` 可在点击记录时打开管理视图。

```yaml
# config_list.yaml
recordOnClick: popup
```

**recordOnClick** 还支持向表单控制器传递上下文，例如，将值设置为 `popup@preview` 可使用预览上下文。

```yaml
# config_list.yaml
recordOnClick: popup@preview
```

可以使用 `onLoadPopupForm` AJAX 处理程序配合 popup 控件打开创建视图，如下例所示。

```html
<button
    type="button"
    data-control="popup"
    data-handler="onLoadPopupForm"
    class="btn btn-primary">
    New Item
</button>
```

## 扩展表单行为

有时您可能希望修改默认的表单行为，有几种方式可以实现。

### 扩展表单配置

您可以使用 `formGetConfig` 方法动态扩展表单配置。

```php
public function formGetConfig()
{
    $config = $this->asExtension('FormController')->formGetConfig();

    $config->form = $this->makeConfig($config->form);

    // Set the active tab dynamically
    $config->form->tabs['activeTab'] = 'Activities';

    return $config;
}
```

### 覆盖控制器操作

您可以在控制器中使用自己的逻辑来实现 `create`、`update` 或 `preview` 操作方法，然后可选地调用表单行为的父方法。

```php
public function update($recordId, $context = null)
{
    //
    // Do any custom code here
    //

    // Call the FormController behavior update() method
    return $this->asExtension('FormController')->update($recordId, $context);
}
```

### 覆盖表单保存数据

您可以使用 `formBeforeSave` 覆盖（或等效方法）在表单保存或更新之前更改保存值。要覆盖字段的保存值，请使用 `formSetSaveValue(key, value)` 方法。

```php
public function formBeforeSave($model)
{
    // When locale dropdown is set to "custom", override with the _custom_locale text field
    if (post('MyModel[locale]') === 'custom') {
        $this->formSetSaveValue('locale', post('MyModel[_custom_locale]'));
    }
}
```

### 覆盖控制器重定向

您可以通过覆盖 `formGetRedirectUrl` 方法来指定模型保存后要重定向到的 URL。此方法返回要重定向到的位置，相对 URL 被视为后台 URL。

```php
public function formGetRedirectUrl($context = null, $model = null)
{
    return 'https://octobercms.com';
}
```

### 扩展表单模型查询

可以通过在控制器类中覆盖 `formExtendQuery` 方法来扩展表单[数据库模型](../database/model.md)的查询。此示例将确保软删除的记录仍然可以被找到和更新，方法是对查询应用 **withTrashed** 作用域：

```php
public function formExtendQuery($query)
{
    $query->withTrashed();
}
```

### 扩展表单字段

您可以通过绑定 `backend.form.extendFields` [全局事件](../services/event.md)从外部扩展另一个控制器的字段。事件函数将接收一个 `$form` 参数，代表 `Backend\Widgets\Form` 对象，您可以使用 `getController`、`getModel` 和 `getContext` 方法来检查执行上下文。

由于此事件可能影响所有表单，因此必须检查控制器和模型是否为正确的类型。以下是使用 `addFields` 方法向邮件设置表单添加新字段的示例。

```php
Event::listen('backend.form.extendFields', function($form) {
    if (
        !$form->getController() instanceof \System\Controllers\Settings ||
        !$form->getModel() instanceof \System\Models\MailSetting
    ) {
        return;
    }

    $form->addFields([
        'my_field' => [
            'label' => 'My Field',
            'comment' => 'This is a custom field I have added.',
        ],
    ]);
});
```

您还可以通过在控制器类中覆盖 `formExtendFields` 方法来内部扩展表单字段。这只会影响 `FormController` 行为使用的表单。

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public function formExtendFields($form)
    {
        $form->addFields([...]);
    }
}
```

以下方法在 `$form` 对象上可用。

方法 | 描述
------------- | -------------
**addFields** | 向外部区域添加新字段
**addTabFields** | 向选项卡区域添加新字段
**addSecondaryTabFields** | 向次要选项卡区域添加新字段
**removeField** | 从任何区域移除字段

每个方法接受类似于[表单字段配置](../../element/form-fields.md)的字段数组。

### 过滤表单字段

如[字段依赖部分](./field-dependencies.md)所述，您也可以通过挂钩 `form.filterFields` 事件来实现通过扩展方式过滤表单字段。

```php
User::extend(function ($model) {
    $model->bindEvent('model.form.filterFields', function ($formWidget, $fields, $context) use ($model) {
        if ($model->source_type === 'http') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = true;
        }
        elseif ($model->source_type === 'git') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = false;
        }
        else {
            $fields->source_url->hidden = true;
            $fields->git_branch->hidden = true;
        }
    });
});
```

## 验证表单字段

要验证表单的字段，您可以在模型中使用[验证 Trait](../database/traits.md)。
