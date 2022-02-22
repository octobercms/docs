# 视图和部件

## 部件

后端部件文件是扩展名为 **htm** 的文件，位于 [控制器视图](controllers-ajax) 目录中。 部件文件名应以下划线开头：*_partial.htm*。 部件可以从后端页面或另一个部件呈现。 使用控制器的 `makePartial` 方法来渲染部件。 该方法采用两个参数 - 部件名称和要传递给部件的可选变量数组。 例子：

```php
<?= $this->makePartial('sidebar', ['showHeader' => true]) ?>
```

### 提示部件

您可以在后端呈现信息面板，称为提示，用户可以隐藏这些面板。 第一个参数应该是唯一的键，用于记住提示是否已隐藏。 第二个参数是对部件视图的引用。 除了一些提示属性外，第三个参数可以是一些传递给部件的额外视图变量。

```php
<?= $this->makeHintPartial('my_hint_key', 'my_hint_partial', ['foo' => 'bar']) ?>
```

您还可以通过将键值设置为null值来禁用隐藏提示的功能。 此提示将始终显示：

```php
<?= $this->makeHintPartial(null, 'my_hint_partial') ?>
```

以下属性可用：

属性 | 描述
------------- | -------------
**type** | 设置提示的颜色，支持的类型：danger(危险), info(信息), success(成功), warning(警告)。 默认值：info。
**title** | 向提示添加标题部分。
**subtitle** | 除了标题之外，在标题部分第二行添加子标题。
**icon** | 除了标题之外，在标题部分添加一个图标。

### 检查提示是否隐藏

如果您正在使用提示，您可能会发现检查用户是否隐藏了它们很有用。 使用 `isBackendHintHidden` 方法很容易做到这一点。 它接受一个参数，这是您在最初调用 `makeHintPartial` 时指定的唯一键。 如果提示被隐藏，该方法将返回 true，否则返回 false：

```php
<?php if ($this->isBackendHintHidden('my_hint_key')): ?>
    <!-- 当提示被隐藏时做一些事情 -->
<?php endif ?>
```

## 布局和子布局

后端布局驻留在插件的可选 **layouts/** 目录中。 使用控制器对象的 `$layout` 属性设置自定义布局。 系统布局默认称为`default`。

```php
/**
 * @var string 用于视图的布局。
 */
public $layout = 'mycustomlayout';
```

布局还提供了将自定义 CSS 类附加到 BODY 标签的选项。 这可以通过控制器的 `$bodyClass` 属性进行设置。

```php
/**
 * @var string 要添加到布局的正文 CSS 类。
 */
public $bodyClass = 'compact-container';
```

这些 body 类可用于默认布局：

- **compact-container** - 在任何地方不使用任何填充。
- **slim-container** - 不使用左右填充。
- **breadcrumb-flush** - 告诉页面面包屑与下面的元素齐平放置。

### 带侧边栏的表单

布局也可以以与局部相同的方式使用，更像是全局局部。 该系统提供了一个名为`form-with-sidebar`的示例，并演示了一种实现子布局结构的新颖方法。

在使用此布局样式之前，请确保您的控制器使用主体类 `compact-container`，方法是在控制器的操作方法或构造函数中设置它。

```php
$this->bodyClass = 'compact-container';
```

此布局使用两个占位符，一个名为 **form-contents** 的主要内容区域和一个名为 **form-sidebar** 的补充侧边栏。 这是一个例子：

```php
<!-- 主要内容 -->
<?php Block::put('form-contents') ?>
    Main content
<?php Block::endPut() ?>

<!-- 补充侧边栏 -->
<?php Block::put('form-sidebar') ?>
    Side content
<?php Block::endPut() ?>

<!-- 执行布局 -->
<?php Block::put('body') ?>
    <?= Form::open(['class'=>'layout stretch']) ?>
        <?= $this->makeLayout('form-with-sidebar') ?>
    <?= Form::close() ?>
<?php Block::endPut() ?>
```

通过覆盖每个后端布局使用的 **body** 占位符，执行布局在最后一部分。 它用 `<form />` HTML 标签包裹所有内容，并呈现名为 **form-with-sidebar** 的子布局。 该文件位于 `modules\backend\layouts\form-with-sidebar.htm` 中。
