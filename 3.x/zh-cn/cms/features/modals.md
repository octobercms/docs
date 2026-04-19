---
subtitle: 在模态框窗口中动态加载内容
---
# 模态框

可以使用 AJAX 框架通过执行针对模态框内容元素的部件更新来显示模态框。当元素有待处理的更新时，`data-ajax-updating` 属性将附加到该元素上，这用于在内容加载时显示加载状态。

::: tip
在以下示例中，我们将使用 [Bootstrap 5](https://getbootstrap.com) 提供的 [Modal 组件](https://getbootstrap.com/docs/5.2/components/modal/)。
:::

## 模态框内容

模态框内容在 **my-modal-content.htm** 部件中指定。

```html
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">
            Modal Title
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <p>Modal body text goes here.</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
        </button>
        <button type="button" class="btn btn-primary">
            Save changes
        </button>
    </div>
</div>
```

## 模态框触发器

触发模态框的按钮与 AJAX 请求配对，用于请求部件并将内容加载到 ID 为 `siteModalContent` 的元素中。

```html
<button
    type="button"
    class="btn btn-primary"
    data-request="onAjax"
    data-request-update="{ 'my-modal-content': '#siteModalContent' }"
    data-bs-toggle="modal"
    data-bs-target="#siteModal">
    Launch demo modal
</button>
```

## 模态框容器

以下模态框定义是通用的，可以添加到任何页面或布局中。它包含两个 `modal-dialog` 元素。第一个用作部件内容的目标容器，第二个用于在请求加载时显示加载状态。

```html
<div class="modal" id="siteModal">
    <div class="modal-dialog modal-dialog-centered" id="siteModalContent">
        <!-- Partial Contents Will Go Here -->
    </div>

    <div class="modal-dialog modal-dialog-centered modal-loading">
        <div class="spinner-border text-light mx-auto"></div>
    </div>
</div>
```

对于加载状态，使用样式表在 AJAX 请求期间显示加载对话框，这由 `data-ajax-updating` 属性决定。当元素是部件更新的候选对象且请求正在挂起时，此属性会添加到该元素上。

```css
.modal-dialog[data-ajax-updating],
.modal-dialog:not([data-ajax-updating]) + .modal-loading {
    display: none;
}
```

#### 参见

::: also
* [Bootstrap 5 模态框](https://getbootstrap.com/docs/5.2/components/modal/)
:::
