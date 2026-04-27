---
subtitle: 了解扩展 October CMS 的常用方法。
---
# 扩展方法论

## 通过插件注册进行扩展

在几乎所有情况下，扩展 October CMS 都是在插件注册文件中完成的，它本质上是一个 [Laravel 服务提供者](https://laravel.com/docs/10.x/providers)。注册文件名为 **Plugin.php**，位于插件的根目录中。

以下是可在插件注册类中重写的扩展方法：

方法 | 描述
------------- | -------------
**register()** | 插件首次注册时调用，在 `boot` 之前调用。
**boot()** | 在请求路由之前调用，在 `register` 之后调用。
**registerMarkupTags()** | 注册可在 CMS 中使用的[额外标记标签](./twig-tags.md)。
**registerComponents()** | 注册此插件使用的任何 [CMS 组件](./cms-components.md)。
**registerNavigation()** | 注册此插件的[后端导航菜单项](./backend/navigation.md)。
**registerPermissions()** | 注册此插件使用的任何[后端权限](./backend/permissions.md)。
**registerSettings()** | 注册此插件使用的任何[后端配置链接](./settings/settings.md)。
**registerFormWidgets()** | 注册此插件提供的任何[后端表单部件](./forms/form-widgets.md)。
**registerReportWidgets()** | 注册任何[后端报表部件](./backend/report-widgets.md)，包括仪表盘部件。
**registerListColumnTypes()** | 注册此插件提供的任何[自定义列表列类型](./lists/list-controller.md)。
**registerMailTemplates()** | 注册此插件提供的任何[邮件视图模板](./system/sending-mail.md)。
**registerMailLayouts()** | 注册此插件提供的任何[邮件视图布局](./system/sending-mail.md)。
**registerMailPartials()** | 注册此插件提供的任何[邮件视图片段](./system/sending-mail.md)。
**registerSchedule()** | 注册定期执行的[计划任务](./system/scheduling.md)。
**registerContentFields()** | 注册 Tailor 蓝图使用的[内容字段](../extend/tailor-fields.md)。

## 通过事件进行扩展

[事件服务](./services/event.md)是注入或修改核心类或其他插件功能的主要方式。可以在任何类中通过在 PHP 文件顶部（命名空间声明之后）添加 `use Event` 来导入 Event facade 以使用此服务。

### 订阅事件

订阅事件最常见的位置是插件注册文件的 `boot` 方法。例如，当用户首次注册时，您可能希望将其添加到第三方邮件列表中，这可以通过订阅 `rainlab.user.register` 全局事件来实现。

```php
class Plugin extends PluginBase
{
    // ...

    public function boot()
    {
        Event::listen('rainlab.user.register', function ($user) {
            // Code to register $user->email to mailing list
        });
    }
}
```

同样的效果也可以通过扩展模型的构造函数并使用本地事件来实现。

```php
User::extend(function ($model) {
    $model->bindEvent('user.register', function () use ($model) {
        // Code to register $model->email to mailing list
    });
});
```

### 声明 / 触发事件

通过在实现了 `October\Rain\Support\Traits\Emitter` 的对象实例上调用 `fireEvent()` 来触发本地事件。由于本地事件仅在特定对象实例上触发，因此不需要对其进行命名空间划分，因为在本地上下文中，给定项目不太可能在相同对象上触发多个同名事件。

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
```

全局事件通过调用 `Event::fire()` 来触发。由于这些事件在整个应用程序中是全局的，最佳实践是在事件名称中包含供应商信息来进行命名空间划分。如果您的插件作者是 ACME，插件名称是 Blog，那么 ACME.Blog 插件提供的所有全局事件都应以 `acme.blog` 为前缀。

```php
Event::fire('acme.blog.post.beforePost', [$firstParam, $secondParam]);
```

如果在同一位置同时提供全局和本地事件，最佳实践是在全局事件之前触发本地事件，以便本地事件具有优先权。此外，全局事件应将触发本地事件的对象实例作为第一个参数提供。

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
Event::fire('rainlab.blog.beforePost', [$this, $firstParam, $secondParam]);
```

一旦订阅了此事件，参数就可以在处理方法中使用。例如：

```php
// Global
Event::listen('acme.blog.post.beforePost', function ($post, $param1, $param2) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});

// Local
$post->bindEvent('post.beforePost', function ($param1, $param2) use ($post) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});
```

## 扩展后端视图

有时您可能希望允许后端视图文件或片段可被扩展，例如工具栏。这可以通过所有后端控制器中的 `fireViewEvent` 方法来实现。

将以下代码放入您的视图文件中：

```php
<div class="footer-area-extension">
    <?= $this->fireViewEvent('backend.auth.extendSigninView', [$firstParam]) ?>
</div>
```

这将允许其他插件通过挂钩事件并返回所需的标记来向此区域注入 HTML。

```php
Event::listen('backend.auth.extendSigninView', function ($controller, $firstParam) {
    return '<a href="#">Sign in with Google!</a>';
});
```

::: tip
事件处理程序中的第一个参数始终是调用对象（控制器）。
:::

上面的示例将输出以下标记：

```html
<div class="footer-area-extension">
    <a href="#">Sign in with Google!</a>
</div>
```

## 使用示例

以下是一些关于如何使用事件的实际示例。

### 扩展用户模型

此示例将通过绑定其本地事件来修改 `User` 模型的 `model.getAttribute` 事件。这是在插件注册文件的 `boot` 方法中执行的。在两种情况下，当访问 `$model->foo` 属性时，它将返回值 **bar**。

```php
// Local event hook that affects all users
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'foo') {
            return 'bar';
        }
    });
});

// Double event hook that affects user #2 only
User::extend(function ($model) {
    $model->bindEvent('model.afterFetch', function () use ($model) {
        if ($model->id !== 2) {
            return;
        }

        $model->bindEvent('model.getAttribute', function ($attribute, $value) {
            if ($attribute === 'foo') {
                return 'bar';
            }
        });
    });
});
```

要为引入的字段添加模型验证，请挂钩 `beforeValidate` 事件并抛出 `ValidationException` 异常。

```php
User::extend(function ($model) {
    $model->bindEvent('model.beforeValidate', function () use ($model) {
        if (!$model->billing_first_name) {
            throw new \ValidationException(['billing_first_name' => 'First name is required']);
        }
    });
});
```

### 扩展后端表单

::: aside
有多种方式可以扩展后端表单，请参阅[后端控制器文章](./forms/form-controller.md)了解更多信息。
:::

此示例将监听 `Backend\Widget\Form` 部件的 `backend.form.extendFields` 全局事件，并在 Form 部件用于修改用户时注入一些额外字段。此事件也在插件注册文件的 `boot` 方法中订阅。

```php
// Extend all backend form usage
Event::listen('backend.form.extendFields', function($widget) {
    // Only apply this listener when the Users controller is being used
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // Only apply this listener when the User model is being modified
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // Only apply this listener when the Form widget in question is a root-level
    // Form widget (not a repeater, nestedform, etc)
    if ($widget->isNested) {
        return;
    }

    // Add an extra birthday field
    $widget->addFields([
        'birthday' => [
            'label' => 'Birthday',
            'comment' => 'Select the users birthday',
            'type' => 'datepicker'
        ]
    ]);

    // Remove a Surname field
    $widget->removeField('surname');
});
```

::: tip
您也可以使用 `backend.form.extendFieldsBefore` 事件来添加字段。
:::

### 扩展后端列表

此示例将修改 `Backend\Widget\Lists` 类的 `backend.list.extendColumns` 全局事件，并在列表用于修改用户的条件下注入一些额外的列值。此事件也在插件注册文件的 `boot` 方法中订阅。

```php
// Extend all backend list usage
Event::listen('backend.list.extendColumns', function ($widget) {
    // Only for the User controller
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // Only for the User model
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // Add an extra birthday column
    $widget->addColumns([
        'birthday' => [
            'label' => 'Birthday'
        ],
    ]);

    // Remove a Surname column
    $widget->removeColumn('surname');
});
```

### 扩展组件

此示例将在 `Topic` 组件中声明一个新的全局事件 `rainlab.forum.topic.post` 和本地事件 `topic.post`。这是在[组件类定义](./cms-components.md)中完成的。

```php
class Topic extends ComponentBase
{
    public function onPost()
    {
        // ...

        $this->fireEvent('topic.post', [$post, $postUrl]);

        Event::fire('rainlab.forum.topic.post', [$this, $post, $postUrl]);
    }
}
```

接下来将演示如何在[布局执行生命周期](../cms/themes/layouts.md)中挂钩此新事件。当 `Topic` 组件（上方）中的 `onPost` 事件处理程序被调用时，这将写入跟踪日志。

::: cmstemplate
```ini
[topic]
slug = "{{ :slug }}"
```
```php
<?
function onInit()
{
    $this->topic->bindEvent('topic.post', function($post, $postUrl) {
        trace_log('A post has been submitted at '.$postUrl);
    });
}
?>
```
:::

#### 另请参阅

::: also
* [Event 服务](./services/event.md)
:::
