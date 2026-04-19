---
subtitle: 构建与 JavaScript 绑定的可观察 HTML 控件。
---
# 热控件

October CMS 包含一个简单的 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 实现，您可以在其中定义能够检测何时被添加到页面或从页面中移除的 HTML 控件。现在可以初始化或取消初始化通过 [AJAX](./update-partials.md) 或 [Turbo 路由器](./turbo-router.md)更新添加或移除的控件。

## 注册可观察控件

::: aside
此函数可以多次调用，它将采用**最后一次看到的定义**。
:::

在其基本形式中，`oc.registerControl` JavaScript 函数用于定义一个唯一的控件名称（第一个参数）和扩展 `oc.ControlBase` 基类的类定义（第二个参数）。

```js
oc.registerControl('hello', class extends oc.ControlBase {
    // ...
});
```

控件名称用于通过 `data-control` 属性链接到表示该控件的 DOM 元素。例如，注册名称为 **hello** 的控件会监视页面上任何带有 `data-control="hello"` 属性的元素。

```html
<div data-control="hello"></div>
```

类定义中的 `connect` 和 `disconnect` 方法在控件被添加到页面或从页面移除时触发。这可以在任何时候发生，因为观察者会持续监视 DOM 变化。

```js
class extends oc.ControlBase {
    connect() {
        // Element has appeared in DOM
    }

    disconnect() {
        // Element was removed from DOM
    }
}
```

## 初始化控件

`init` 方法允许您加载控件的默认配置并配置其子元素。

```js
class extends oc.ControlBase {
    init() {
        // Establish the control before running logic
    }
}
```

::: tip
`init` 方法每个控件只调用一次，而 `connect` 在控件每次被添加到 DOM 或从 DOM 中移除时都会调用，例如当元素被移动到新位置时。
:::

### 配置

控件元素上的所有 `data-` 属性构成其可用配置。

```html
<div data-control="hello" data-favorite-color="red"></div>
```

配置值可以通过 `this.config` 属性访问。data 属性会从短横线命名法转换为驼峰命名法，并去掉 `data-` 前缀，例如 `data-favorite-color` 属性可通过 `this.config.favoriteColor` 访问。

```js
class extends oc.ControlBase {
    init() {
        this.favoriteColor = this.config.favoriteColor || 'green';
    }

    connect() {
        console.log(`Favorite color? ${this.favoriteColor}!`);
    }
}
```

### 子元素

任何选择器（无论是 CSS 还是 data 属性）都可以用于在父控件类中选择子元素。

```html
<div data-control="hello">
    <input class="name" disabled />
</div>
```

父控件元素可通过 `this.element` 访问。任何子元素都可以使用 `querySelector` 选择单个元素，或使用 `querySelectorAll` 选择多个元素。

```js
class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
    }

    connect() {
        this.$name.value = 'Jeff';
        this.$name.disabled = false;
    }
}
```

## 引用其他控件

`oc.fetchControl` 函数用于从现有控件元素返回控件实例，它接受选择器字符串或直接接受元素。返回的实例支持调用控件类定义中的方法或访问其属性。

```js
const searchControl = oc.fetchControl(element);
```

您也可以传递选择器字符串，以及控件名称作为第二个参数（可选）。当多个控件绑定到同一个元素并且您想要明确指定确切标识符时，这很有用。

```js
const searchControl = oc.fetchControl('[data-control=search]', 'search');
```

`oc.importControl` 函数可用于返回已注册的控件类，这对于调用类的静态方法很有用。该函数接受控件标识符字符串。

```js
const searchControlClass = oc.importControl('search');
```

`oc.observeControl` 函数用于立即解析控件实例并将其附加到元素。当元素没有 `data-control` 属性并且您想要在不等待观察者事件的情况下附加它时，这很有用。

```js
const searchControl = oc.observeControl(element, 'search');
```

## 使用事件

可观察控件可以绑定局部或全局事件。局部事件会自动解绑，而全局事件需要使用 `disconnect` 方法手动解绑。

### 局部事件

您可以使用 `listen` 函数绑定局部事件处理程序，这些处理程序将自动解绑。要将监听器绑定到控件元素本身，请将事件名称和事件处理程序函数传递给 `listen` 函数。

```js
class extends oc.ControlBase {
    connect() {
        this.listen('dblclick', this.onDoubleClick);
    }

    onDoubleClick() {
        console.log('You double clicked my control!');
    }
}
```

要将局部事件处理程序绑定到子元素，请传递事件名称、CSS 选择器和事件处理程序函数。`event.delegateTarget` 将始终包含与 CSS 选择器匹配的元素。

```js
class extends oc.ControlBase {
    connect() {
        this.listen('click', '.toolbar-find-button', this.onClickFindButton);
    }

    onClickFindButton(event) {
        console.log('You clicked the find button inside the control: ' + event.delegateTarget.innerText);
    }
}
```

您也可以绑定到 DOM 对象，传递事件名称、HTML 元素和事件处理程序函数。

```js
class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
    }

    connect() {
        this.listen('click', this.$name, this.onClickNameInput);
    }

    onClickNameInput() {
        console.log('You clicked the name input inside the control!');
    }
}
```

### 全局事件

全局事件可以使用原生 JavaScript 的 `addEventListener` 和 `removeEventListener` 函数进行附加和移除。事件处理程序（第二个参数）引用同一控件实例的类方法。调用 `proxy` 方法可将当前上下文绑定到函数调用。

```js
class extends oc.ControlBase {
    connect() {
        addEventListener('keydown', this.proxy(this.onKeyDown));
    }

    disconnect() {
        removeEventListener('keydown', this.proxy(this.onKeyDown));
    }

    onKeyDown(event) => {
        if (event.key === 'Escape') {
            // Escape button was pressed
        }
    }
}
```

::: tip
为防止内存泄漏，解绑全局事件非常重要，以便它们能被垃圾回收捕获。
:::

### 分发事件

控件可以通过将事件名称传递给 `dispatch` 函数来分发事件。事件在 DOM 元素上触发，事件名称以控件名称为前缀。在以下示例中，如果控件注册名称为 **hello**，则事件将命名为 **hello:ready**。

```js
oc.registerControl('hello', class extends oc.ControlBase {
    connect() {
        this.dispatch('ready');
    }
});
```

现在您可以监听控件连接的时刻，并使用 `oc.fetchControl` 获取事件目标上的对象。

```js
addEventListener('hello:ready', function(ev) {
    const helloControl = oc.fetchControl(ev.target);
});
```

第二个参数包含选项，您可以将 `detail` 传递给事件，以下详细数据可通过监听器中的 **ev.detail.foo** 访问。

```js
this.dispatch('ready', { detail: {
    foo: 'bar'
}});
```

您还可以指定不同的 `target`，默认为附加的元素。

```js
this.dispatch('ready', { target: window });
```

将 `prefix` 设置为 false 将使事件名称变为全局的，以下触发的事件名称为 **hello-ready** 而非 **hello:hello-ready**。

```js
this.dispatch('hello-ready', { prefix: false });
```

## 使用示例

### 原生 JS 示例

以下示例演示了一个包含名称输入框和问候按钮的基本 HTML 表单。控件类初始化输入和输出元素，然后监听 Greet 按钮的点击事件。当 Greet 按钮被点击时，输出元素会显示包含输入名称的问候语。

```html
<div data-control="hello-world">
    <input type="text" class="name" />

    <button class="greet">
        Greet
    </button>

    <span class="output">
    </span>
</div>

<script>
oc.registerControl('hello-world', class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
        this.$output = this.element.querySelector('span.output');
    }

    connect() {
        this.listen('click', 'button.greet', this.onGreet);
    }

    onGreet() {
        this.$output.textContent = `Hello, ${this.$name.value}!`;
    }
});
</script>
```

### Google Maps 示例

以下示例展示了第三方 JavaScript 库（如 Google Maps API）的简单实现。当控件 `div` 元素出现在页面上时，库的 `Map` 会在该元素上初始化。当控件从页面移除时，通过对 map 实例调用 `destroy` 并将属性设置为 `null` 来防止内存泄漏。

```html
<div data-control="google-map"></div>

<script>
oc.registerControl('google-map', class extends oc.ControlBase {
    connect() {
        this.map = new Map(this.element, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    disconnect() {
        this.map.destroy();
        this.map = null;
    }
});
</script>
```

### Vue.js 示例

下一个示例展示了如何引入自己的技术来构建动态用户界面，在本例中[使用 Vue.js](https://vuejs.org/guide/essentials/event-handling.html) 作为技术。Vue 实例或 ViewModel（vm）根据需要创建和销毁。

```html
<div data-control="my-vue-control">
    <div data-vue-template>
        <button @click="greet">Greet</button>
    </div>
</div>

<script>
oc.registerControl('my-vue-control', class extends oc.ControlBase {
    connect() {
        this.vm = new Vue({
            el: this.element.querySelector('[data-vue-template]'),
            data: {
                name: 'October CMS'
            },
            methods: {
                greet: this.greet
            }
        });
    }

    disconnect() {
        this.vm.$destroy();
    }

    greet(event) {
        alert('Hello ' + this.name + '!')
    }
});
</script>
```

您还可以使用热控件通过 `Vue.component` 方法初始化 Vue 组件，使其对您的控件可用。以下内容在 Vue 中可作为 `<my-vue-component></my-vue-component>` 使用，但重要的是这些模板必须在被其他控件使用之前注册。

```html
<div data-control="my-vue-component">
    <button @click="greet">Greet</button>
</div>

<script>
oc.registerControl('my-vue-component', class extends oc.ControlBase {
    init() {
        Vue.component('my-vue-component', {
            template: this.element,
            methods: {
                greet: this.greet
            }
        });
    }

    connect() {
        this.element.style.display = 'none';
    }

    greet(event) {
        alert('Hello!');
    }
});
</script>
```
