# 扩展插件

## 扩展事件

[事件服务](../services/events.md) 是注入或修改核心类或其他插件功能的主要方式。 通过在 PHP 文件的顶部(命名空间语句之后)添加 `use Event;` 以导入 Event 服务，可以在任何类中导入该服务使用。

### 监听(订阅)事件

监听事件最常见的地方是[插件注册文件](registration.md#registration-methods)的`boot`方法。 例如，当用户第一次注册时，您可能希望将他们添加到第三方邮件列表中，这可以通过监听`rainlab.user.register`全局事件来实现。

```php
class Plugin extends PluginBase
{
    // ...

    public function boot()
    {
        Event::listen('rainlab.user.register', function ($user) {
            // 将 $user->email 注册到邮件列表的代码
        });
    }
}
```

可以通过扩展模型的构造函数并使用本地事件来实现相同的目的。

```php
User::extend(function ($model) {
    $model->bindEvent('user.register', function () use ($model) {
        // 将 $user->email 注册到邮件列表的代码
    });
});
```

### 声明/触发事件

您可以全局(通过事件服务)或本地触发事件。

本地事件是通过在实现了`October\Rain\Support\Traits\Emitter`的对象实例上调用`fireEvent()`来触发的。 由于本地事件仅在特定对象实例上触发，因此不需要命名它们，因为给定项目不太可能在本地上下文中的相同对象上触发多个具有相同名称的事件。

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
```

全局事件通过调用 `Event::fire()` 来触发。 由于这些事件在整个应用程序中是全局的，因此最好通过在事件名称中包含供应商信息来命名它们。 如果你的插件作者是 ACME 并且插件名称是 Blog，那么 ACME.Blog 插件提供的任何全局事件都应该以 `acme.blog` 为前缀。

```php
Event::fire('acme.blog.post.beforePost', [$firstParam, $secondParam]);
```

如果在同一个地方同时提供全局和本地事件，最好的做法是在全局事件之前触发本地事件，以便本地事件优先。 此外，全局事件应提供触发本地事件的对象实例作为第一个参数。

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
Event::fire('rainlab.blog.beforePost', [$this, $firstParam, $secondParam]);
```

一旦监听了这个事件，参数就可以在处理程序方法中使用了。 例如：。 例如：

```php
// 全局
Event::listen('acme.blog.post.beforePost', function ($post, $param1, $param2) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});

// 本地
$post->bindEvent('post.beforePost', function ($param1, $param2) use ($post) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});
```

## 扩展后端视图

有时您可能希望允许扩展后端视图文件或部件文件，例如工具栏。 这可以使用在所有后端控制器中找到的 `fireViewEvent` 方法来实现。

将此代码放在您的视图文件中：

```php
<div class="footer-area-extension">
    <?= $this->fireViewEvent('backend.auth.extendSigninView', [$firstParam]) ?>
</div>
```

这将允许其他插件通过钩子事件并返回所需的标记来将 HTML 注入该区域。

```php
Event::listen('backend.auth.extendSigninView', function ($controller, $firstParam) {
    return '<a href="#">使用 Google 登录!</a>';
});
```

> **注意**：事件处理程序中的第一个参数将始终是调用对象(控制器)。

上面的示例将输出以下标记：

```html
<div class="footer-area-extension">
    <a href="#">使用 Google 登录!</a>
</div>
```

## 用法示例

这些是如何使用事件的一些实际示例。

### 扩展用户模型

此示例将通过绑定到其本地事件来修改 `User` 模型的 [`model.getAttribute`](https://octobercms.com/docs/api/model/beforegetattribute) 事件。 这是在[插件注册文件](registration.md#routing-and-initialization)的`boot`方法中执行的。 在这两种情况下，当访问 `$model->foo` 属性时，它将返回值 *bar*。

```php
// 影响所有用户的本地事件钩子
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'foo') {
            return 'bar';
        }
    });
});

// 仅影响用户 #2 的双重事件钩子
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

要为引入的字段添加模型验证，请钩到 `beforeValidate` 事件并抛出 `ValidationException` 异常。

```php
User::extend(function ($model) {
    $model->bindEvent('model.beforeValidate', function () use ($model) {
        if (!$model->billing_first_name) {
            throw new \ValidationException(['billing_first_name' => '名字为必填项']);
        }
    });
});
```

### 扩展后端表单

有多种扩展后端表单的方法，请参阅 [后端表单](../backend/forms.md#extending-form-behavior)。

此示例将监听 `Backend\Widget\Form` 小部件的 [`backend.form.extendFields`](https://octobercms.com/docs/api/backend/form/extendfields) 全局事件,以此注入一些额外的表单字段。 该事件也在[插件注册文件](registration.md#routing-and-initialization)的`boot`方法中监听。

```php
// 扩展所有后台表单使用
Event::listen('backend.form.extendFields', function($widget) {
    // 仅在使用 Users 控制器时应用此监听器
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // 仅在修改 User 模型时应用此侦听器
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // 仅当有待定的 Form 小部件是root级别时才应用此侦听器
    // 表单小部件（不是循环组件、嵌套表单等）
    if ($widget->isNested) {
        return;
    }

    // 添加额外的生日字段
    $widget->addFields([
        'birthday' => [
            'label'   => '生日',
            'comment' => '选择用户的生日',
            'type'    => 'datepicker'
        ]
    ]);

    // 删除姓氏字段
    $widget->removeField('姓氏');
});
```

> **注意**：您也可以使用 `backend.form.extendFieldsBefore` 事件来添加字段。

### 扩展后端列表

此示例将修改 `Backend\Widget\Lists` 类的 [`backend.list.extendColumns`](https://octobercms.com/docs/api/backend/list/extendcolumns) 全局事件,以此注入一些额外的列值。 该事件也在[插件注册文件](registration.md#routing-and-initialization)的`boot`方法中监听。

```php
// 扩展所有后端列表使用
Event::listen('backend.list.extendColumns', function ($widget) {
    // 仅用于User控制器
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // 仅适用于User模型
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // 添加额外的生日列
    $widget->addColumns([
        'birthday' => [
            'label' => '生日'
        ],
    ]);

    // 删除姓氏列
    $widget->removeColumn('姓氏');
});
```

### 扩展组件

此示例将在`Topic`组件内声明一个新的全局事件`rainlab.forum.topic.post`
和名为`topic.post`
的本地事件。 这是在[组件类定义](components.md#component-class-definition)中进行的。

```php
class Topic extends ComponentBase
{
    public function onPost()
    {
        // ...

        /*
         * 可扩展性
         */
        $this->fireEvent('topic.post', [$post, $postUrl]);
        Event::fire('rainlab.forum.topic.post', [$this, $post, $postUrl]);
    }
}
```

接下来，这将演示如何从 [页面执行生命周期](../cms/layouts.md#dynamic-pages) 内部挂钩到这个新事件。 当在 `Topic` 组件(上述)中调用 `onPost` 事件处理程序时，这将写入跟踪日志。

```
[topic]
slug = "{{ :slug }}"
==
function onInit()
{
    $this->topic->bindEvent('topic.post', function($post, $postUrl) {
        trace_log('帖子已提交至 '.$postUrl);
    });
}
```

### 扩展后端菜单

此示例将使用 *...* 替换后端中 CMS 和 Pages 的标签。

```php
Event::listen('backend.menu.extendItems', function($manager) {

    // 添加主菜单项
    $manager->addMainMenuItems('October.Cms', [
        'cms' => [
            'label' => '...'
        ]
    ]);

    // 添加侧边菜单项
    $manager->addSideMenuItems('October.Cms', 'cms', [
        'pages' => [
            'label' => '...'
        ]
    ]);

});
```

同样，我们可以使用相同的事件删除菜单项。

```php
Event::listen('backend.menu.extendItems', function($manager) {

    // 删除所有项目
    $manager->removeMainMenuItem('October.Cms', 'cms');

    // 删除单个项目
    $manager->removeSideMenuItem('October.Cms', 'cms', 'pages');

    // 删除两项
    $manager->removeSideMenuItems('October.Cms', 'cms', [
        'pages',
        'partials'
    ]);
});
```
