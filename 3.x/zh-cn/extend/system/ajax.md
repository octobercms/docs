---
subtitle: 了解如何在后端面板中使用 AJAX。
---
# AJAX

后端面板使用与 [CMS 页面相同的 AJAX 库](../../cms/ajax/introduction.md)。该库在后端页面上自动包含和加载。

## 后端 AJAX 处理程序

后端 AJAX 处理程序可以在控制器类或小部件中定义。在控制器类中，AJAX 处理程序被定义为名称以 "on" 字符串开头的公共方法：**onCreateTemplate**、**onGetTemplateList** 等。

后端 AJAX 处理程序可以返回数据数组、抛出异常或重定向到另一个页面。你可以使用 `$this->vars` 设置变量，并使用控制器的 `makePartial` 方法渲染局部视图并将其内容作为响应数据的一部分返回。

```php
public function onOpenTemplate()
{
    if (post('someVar') !== 'someValue') {
        throw new ApplicationException('Invalid value');
    }

    $this->vars['foo'] = 'bar';

    return [
        'partialContents' => $this->makePartial('some-partial')
    ];
}
```

### 触发 AJAX 请求

AJAX 请求可以通过 data 属性 API 或 JavaScript API 触发。请参阅[前端 AJAX 库](../ajax/introduction)了解详情。以下示例展示了如何通过后端按钮触发请求。

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    Do Something
</button>
```

## 行为 AJAX 处理程序

由于行为会将其方法组合到父控制器中，因此行为中定义的所有 AJAX 处理程序都可供控制器使用。在某些情况下，你可能希望在控制器中覆盖 AJAX 处理程序，你可以通过调用 `asExtension` 方法来实现。

控制器的 AJAX 处理程序具有优先权，然后请求 `Backend\Behaviors\FormController` 行为并调用其处理程序。

```php
function onDoSomething()
{
    // Custom logic here
    // ...

    // Call the extension handler
    return $this->asExtension('FormController')->doSomething();
}
```

## 小部件 AJAX 处理程序

小部件实现与后端控制器相同的 AJAX 方式。AJAX 处理程序是小部件类的公共方法，名称以 **on** 前缀开头。小部件 AJAX 处理程序与后端控制器 AJAX 处理程序的唯一区别是，当你在小部件局部视图中引用处理程序时，应使用小部件的 `getEventHandler` 方法返回小部件的处理程序名称。

```php
<a
    href="javascript:;"
    data-request="<?= $this->getEventHandler('onPaginate') ?>"
    title="Next page">Next</a>
```

当从小部件类或局部视图调用时，AJAX 处理程序将以自身为目标。例如，如果小部件使用别名 **mywidget**，处理程序将以 `mywidget::onName` 为目标。上面的代码将输出以下属性值：

```html
data-request="mywidget::onPaginate"
```

#### 另请参阅

::: also
* [AJAX 框架指南](../../cms/ajax/introduction.md)
:::
