---
subtitle: Build observable HTML controls tethered to JavaScript.
---
# Hot Controls

October CMS includes a simple implementation of [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), where you can define HTML controls that detect when they are added or removed from the page. Now it's possible to initialize or uninitialize controls that are added or removed via [AJAX](./update-partials.md) or [turbo router](./turbo-router.md) updates.

## Registering an Observable Control

::: aside
This function can be called multiple times and it will take the **last seen definition**.
:::

In its basic form, the `oc.registerControl` JavaScript function is used to define a unique control name (first argument) and class definition (second argument) that extends the `oc.ControlBase` base class.

```js
oc.registerControl('hello', class extends oc.ControlBase {
    // ...
});
```

The control name is used to link to a DOM element representing the control, using the `data-control` attribute. For example, a control registered with the name **hello** monitors the page for any element with the `data-control="hello"` attribute attached to it.

```html
<div data-control="hello"></div>
```

The `connect` and `disconnect` methods within the class definition are triggered whenever the control is added or removed from the page. This can occur at any time, as the observer continuously monitors for DOM changes.

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

## Initializing a Control

The `init` method allows you to load the default configuration for the control and configure its child elements.

```js
class extends oc.ControlBase {
    init() {
        // Establish the control before running logic
    }
}
```

::: tip
The `init` method is called once per control and `connect` is called every time the control is added or removed from the DOM, for example, when moving the element to a new location.
:::

### Configuration

All `data-` attributes on the control element make up its available configuration.

```html
<div data-control="hello" data-favorite-color="red"></div>
```

Configuration values can be accessed via the `this.config` property. The data attributes are converted from to camelCase, without the `data-` prefix, for example, the `data-favorite-color` attribute is accessed as `this.config.favoriteColor`.

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

### Child Elements

Any selector, whether CSS or data attributes, can be used to select child elements within the parent control class.

```html
<div data-control="hello">
    <input class="name" disabled />
</div>
```

The parent control element is available via `this.element`. Any child element can be selected with `querySelector` for a single element, or `querySelectorAll` for multiple elements.

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

## Referencing Other Controls

The `oc.fetchControl` function is used to return a control class from an existing control element, this accepts a selector string, or an element directly. The resulting instance support method calls or accessing properties found on the control class definition.

```js
const searchControl = oc.fetchControl('[data-control=search]');
```

Use the `oc.fetchControls` function to retrieve multiple instances.

```js
const resultControls = oc.fetchControls('[data-control=results]');
```

The `oc.importControl` function can be used to return a control class that has been registered, which can be useful for calling static methods on the class. The function accepts the control identifier as a string.

```js
const searchControlClass = oc.importControl('search');
```

## Working with Events

Observable controls can bind events either locally or globally. Local events are automatically unbound, while global events need to be manually unbound using the `disconnect` method.

### Local Events

You can bind a local event handler using the `listen` function, and these handlers will automatically unbind. To bind a listener to the control element itself, pass the event name and the event handler function to the `listen` function.

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

To bind a local event handler to a child element, pass the event name, CSS selector, and event handler function.

```js
class extends oc.ControlBase {
    connect() {
        this.listen('click', '.toolbar-find-button', this.onClickFindButton);
    }

    onClickFindButton() {
        console.log('You clicked the find button inside the control!');
    }
}
```

You may also bind to a DOM object, pass the event name, HTML element, and the event handler function.

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

### Global Events

Global events can be attached and removed using the `addEventListener` and `removeEventListener` native JavaScript functions. The event handler (second argument) refers to the class method of the same control instance. The `proxy` method is called to bind the current context to the function call.

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
To prevent memory leaks, it is important to unbind global events so they are captured by garbage collection.
:::

### Dispatching Events

Controls can dispatch events by passing an event name to the `dispatch` function. The event is triggered on the DOM element and the event name is prefixed with the control name. In the following example, if the control is registered with a name **hello**, the event will be named **hello:ready**.

```js
oc.registerControl('hello', class extends oc.ControlBase {
    connect() {
        this.dispatch('ready');
    }
});
```

Now you can listen when the control is connected and grab the object using `oc.fetchControl` on the event target.

```js
addEventListener('hello:ready', function(ev) {
    const helloControl = oc.fetchControl(ev.target);
});
```

The second argument contains options where you may pass `detail` to the event, the following detail data is accessible via **ev.detail.foo** in the listener.

```js
this.dispatch('ready', { detail: {
    foo: 'bar'
}});
```

You may also specify a different `target` where the default is the attached element.

```js
this.dispatch('ready', { target: window });
```

Setting the `prefix` to false will make the event name global, the following triggers an event name of **hello-ready** instead of **hello:hello-ready**.

```js
this.dispatch('hello-ready', { prefix: false });
```

## Usage Examples

### Vanilla JS Example

The following example demonstrates a basic HTML form that includes a name input and a greeting button. The control class initializes the input and output elements, and then listens for the click event on the Greet button. When the Greet button is clicked, the output element displays a greeting that includes the entered name.

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

### Google Maps Example

The following example shows a simple implementation of a third-party JavaScript library, such as Google Maps API. The library `Map` is initialized on the control `div` element when it is seen on the page. When the control is removed from the page, it prevents memory leaks by calling `destroy` on the map instance and setting the property to `null`.

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

### Vue.js Example

The next example shows how you can bring your own technology to build dynamic user interfaces, in this case [using Vue.js](https://vuejs.org/guide/essentials/event-handling.html) as a technology. The Vue instance, or ViewModel (vm) is created and disposed as needed.

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

You can also use hot controls to initialize Vue components using the `Vue.component` method, making them available to your controls. The following becomes available as `<my-vue-component></my-vue-component>` within Vue, however, it is important that these templates are registered before they are used by other controls.

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
