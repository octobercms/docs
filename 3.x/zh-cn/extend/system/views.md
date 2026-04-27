---
subtitle: 了解页面内容的存储和渲染方式。
---
# 渲染视图

视图位于与控制器同名的目录中。

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── controllers
|           |   ├── users  _← 视图目录_
|           |   |   ├── `_partial.php`  _← 局部视图文件_
|           |   |   └── `index.php`  _← 视图文件_
|           |   └── Users.php  _← 控制器类_
|           └── Plugin.php
:::

## 局部视图

后端局部视图是扩展名为 **php** 的文件，位于[控制器视图](./controllers.md)目录中。局部视图文件名应以下划线开头：**_partial.php**。局部视图可以从后端页面或另一个局部视图中渲染。使用控制器的 `makePartial` 方法渲染局部视图。该方法接受两个参数——局部视图名称和可选的要传递给局部视图的变量数组。示例：

```php
<?= $this->makePartial('sidebar', ['showHeader' => true]) ?>
```

### 提示局部视图

你可以在后端渲染信息面板，称为提示，用户可以隐藏它们。第一个参数应该是一个唯一的键，用于记住提示是否已被隐藏。第二个参数是对局部视图的引用。第三个参数可以是传递给局部视图的一些额外视图变量，以及一些提示属性。

```php
<?= $this->makeHintPartial('my_hint_key', 'my_hint_partial', ['foo' => 'bar']) ?>
```

你也可以通过将键值设置为 null 来禁用隐藏提示的功能。此提示将始终显示：

```php
<?= $this->makeHintPartial(null, 'my_hint_partial') ?>
```

以下属性可用：

属性 | 描述
------------- | -------------
**type** | 设置提示的颜色，支持的类型：danger、info、success、warning。默认值：info。
**title** | 向提示添加标题部分。
**subtitle** | 除标题外，向标题部分添加第二行。
**icon** | 除标题外，向标题部分添加图标。

### 检查提示是否已隐藏

如果你使用提示，你可能会发现检查用户是否已隐藏它们很有用。使用 `isBackendHintHidden` 方法可以轻松实现。它接受一个参数，即你在最初调用 `makeHintPartial` 时指定的唯一键。如果提示已被隐藏，该方法返回 true，否则返回 false：

```php
<?php if ($this->isBackendHintHidden('my_hint_key')): ?>
    <!-- Do something when the hint is hidden -->
<?php endif ?>
```

## 布局和子布局

后端布局位于插件的可选 **layouts/** 目录中。自定义布局通过控制器对象的 `$layout` 属性设置。它默认使用名为 `default` 的系统布局。

```php
/**
 * @var string layout to use for the view.
 */
public $layout = 'mycustomlayout';
```

布局还提供了向 BODY 标签附加自定义 CSS 类的选项。这可以通过控制器的 `$bodyClass` 属性设置。

```php
/**
 * @var string bodyClass (CSS) to add to the layout.
 */
public $bodyClass = 'compact-container';
```

以下 body 类适用于默认布局：

- **compact-container** - 所有边不使用内边距。
- **slim-container** - 左右不使用内边距。
- **breadcrumb-flush** - 使页面面包屑与下方元素齐平。

### 带侧边栏的表单

布局也可以像局部视图一样使用，更像是一个全局局部视图。系统提供了一个名为 `form-with-sidebar` 的示例，展示了一种实现子布局结构的新颖方式。

在使用此布局样式之前，请确保你的控制器通过在操作方法或构造函数中设置 body 类 `compact-container` 来使用它。

```php
$this->bodyClass = 'compact-container';
```

此布局使用两个占位符，一个名为 **form-contents** 的主要内容区域和一个名为 **form-sidebar** 的辅助侧边栏。以下是示例：

```php
<!-- Primary content -->
<?php Block::put('form-contents') ?>
    Main content
<?php Block::endPut() ?>

<!-- Complimentary sidebar -->
<?php Block::put('form-sidebar') ?>
    Side content
<?php Block::endPut() ?>

<!-- Layout execution -->
<?php Block::put('body') ?>
    <?= Form::open(['class'=>'layout stretch']) ?>
        <?= $this->makeLayout('form-with-sidebar') ?>
    <?= Form::close() ?>
<?php Block::endPut() ?>
```

布局在最后一个部分通过覆盖每个后端布局使用的 **body** 占位符来执行。它将所有内容包裹在 `<form />` HTML 标签中，并渲染名为 **form-with-sidebar** 的子布局。此文件位于 **modules/backend/layouts/form-with-sidebar.php**。

## 扩展布局

`fireViewEvent` 用于多个区域来[扩展后端区域](../extending.md)。`backend.layout.extendHead` 事件可用于扩展布局的 head 元素。返回值应包含要包含的标记。以下示例向每个后端页面添加一个 JavaScript 文件。

```php
Event::listen('backend.layout.extendHead', function ($controller) {
    return '<script src="/app/assets/js/myscript.js"></script>';
});
```

控制器作为第一个参数可用于事件，这可以用于定位特定的控制器。以下示例仅向 Tailor 条目控制器添加特定的 CSS 样式。

```php
Event::listen('backend.layout.extendHead', function ($controller) {
    if ($controller instanceof \Tailor\Controllers\Entries) {
        return '<styles> /* ... */ </styles>';
    }
});
```
