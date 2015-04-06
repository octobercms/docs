# Layouts

There are several approaches used for backend layouts. You can define your own backend layouts by plaching them inside the **layouts/** directory of your plugin.

These body classes are available:

- **compact-container** - uses no padding on all sides.
- **slim-container** - uses no padding left and right.
- **breadcrumb-flush** - the page breadcrumb should sit flush to the element below.

## Form with sidebar

Before using this layout style, ensure that your controller uses the body class `compact-container` by setting it in your controller's action method or constructor.

    $this->bodyClass = 'compact-container';

This layout uses two placeholders, a primary content area called **form-contents** and a complimentary sidebar called **form-sidebar**. Here is an example:

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

The layout is executed in the final section by overriding the **body** placeholder used by every back-end layout. It wraps everything with a `<form />` HTML tag and renders the child layout called **form-with-sidebar**. This file is located in `modules\backend\layouts\form-with-sidebar.htm`.