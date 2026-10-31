---
previousPath: extend/system/vue-components.md
subtitle: Build reactive interfaces for the backend panel and CMS pages with Vue 3 components.
---
# Vue Components

Vue components let you build reactive interfaces in the backend panel and on CMS pages. Each component has three parts: a PHP class, a JavaScript ES module and a template partial.

## Creating a Component

The `create:vuecomponent` command generates a Vue component class, a template partial and basic asset files. The first argument is the author and plugin name, and the second is the Vue component class name.

```bash
php artisan create:vuecomponent Acme.Blog PostEditor
```

Vue components live in the **vuecomponents** directory of a plugin or module. Each component has its own directory containing its JavaScript files, optional CSS and template partials.

::: dir
├── `vuecomponents`
|   ├── mycomponent
|   |   ├── assets
|   |   |   ├── js
|   |   |   |   └── mycomponent.js  _← JavaScript Module_
|   |   |   └── css
|   |   |       └── mycomponent.css  _← StyleSheet File (optional)_
|   |   └── partials
|   |       └── _mycomponent.php  _← Template Partial_
|   └── MyComponent.php  _← Component Class_
:::

Directories and file names are lowercase, while the PHP class uses PascalCase. The JavaScript and partial files take their names from the component class. The CSS file is loaded automatically when it exists.

## Defining the Component Class

The PHP class defines the server-side configuration of the component. It extends `System\Classes\VueComponentBase` and must define a component name.

```php
namespace Acme\Blog\VueComponents;

use System\Classes\VueComponentBase;

class PostEditor extends VueComponentBase
{
    /**
     * @var string componentName is the Vue component tag name (kebab-case)
     */
    protected $componentName = 'acme-blog-post-editor';
}
```

The `$componentName` property sets the HTML tag used in templates. Use a unique, namespaced name in kebab-case, such as `acme-blog-post-editor`, to avoid conflicts with other components.

### Requiring Other Components

Declare the Vue components that your component depends on with the `$require` property. Dependencies are registered before the component.

```php
class PostEditor extends VueComponentBase
{
    protected $componentName = 'acme-blog-post-editor';

    /**
     * @var array require lists dependent Vue component classes
     */
    protected $require = [
        \Backend\VueComponents\RichEditor::class,
        \Backend\VueComponents\Modal::class
    ];
}
```

### Loading Additional Assets

Override the `loadAssets` method to include JavaScript or CSS files beyond the defaults.

```php
protected function loadAssets()
{
    $this->addJs('js/helpers.js', ['type' => 'module']);
    $this->addCss('css/custom-styles.css');
}
```

To load assets from dependencies, such as vendor libraries, use the `loadDependencyAssets` method. These assets load before the assets of the component.

```php
protected function loadDependencyAssets()
{
    $this->addCss('vendor/library/styles.css');
    $this->addJs('vendor/library/script.js');
}
```

### Passing Variables to the Template

Use the `prepareVars` method to pass data from PHP to the template partial.

```php
protected function prepareVars()
{
    $this->vars['maxFileSize'] = Config::get('cms.max_upload_size');
    $this->vars['allowedTypes'] = ['image/png', 'image/jpeg'];
}
```

## Writing the JavaScript Module

The JavaScript file defines the Vue component with the Options API and ES module syntax. The module exports a default object containing the component definition. The template comes from the partial, so the definition has no `template` property.

```js
export default {
    props: {
        initialContent: {
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            content: this.initialContent,
            isDirty: false
        };
    },
    computed: {
        characterCount() {
            return this.content.length;
        }
    },
    methods: {
        save() {
            this.$emit('save', this.content);
            this.isDirty = false;
        },
        reset() {
            this.content = this.initialContent;
            this.isDirty = false;
        }
    },
    watch: {
        content(newValue, oldValue) {
            this.isDirty = newValue !== this.initialContent;
        }
    },
    mounted() {
        // Component is ready
    },
    beforeUnmount() {
        // Cleanup before removal
    }
};
```

### Importing Utilities

JavaScript modules can import utilities and helper classes from other files.

```js
import { formatDate, parseDate } from './classes/date-utils.js';
import { validateInput } from './classes/validators.js';

export default {
    methods: {
        formatTimestamp(timestamp) {
            return formatDate(timestamp);
        }
    }
};
```

### Extending Another Component

Use the `extends` property to build on another component definition.

```js
import BaseEditor from './base-editor.js';

export default {
    extends: BaseEditor,
    methods: {
        // Override or add methods
        customMethod() {
            // Call parent method if needed
        }
    }
};
```

## Writing the Template

The template partial contains the Vue template markup. It is a PHP file, so it can also run server-side logic.

```php
<div class="post-editor-component">
    <div class="editor-toolbar">
        <button
            type="button"
            class="btn btn-primary"
            :disabled="!isDirty"
            @click="save"
        >
            <?= e(trans('acme.blog::lang.editor.save')) ?>
        </button>
        <button
            type="button"
            class="btn btn-secondary"
            @click="reset"
        >
            <?= e(trans('acme.blog::lang.editor.reset')) ?>
        </button>
    </div>

    <textarea
        v-model="content"
        :readonly="readonly"
        class="form-control"
    ></textarea>

    <div class="editor-footer">
        <span v-text="characterCount"></span> characters
    </div>
</div>
```

Templates support standard Vue 3 syntax, including directives, event bindings and slots. Use PHP for translations, asset URLs and server-side configuration.

### Using Slots

Define slots to let parent components inject content.

```php
<div class="modal-component">
    <div class="modal-header">
        <slot name="header">
            <h5>Default Title</h5>
        </slot>
    </div>
    <div class="modal-body">
        <slot></slot>
    </div>
    <div class="modal-footer">
        <slot name="footer">
            <button @click="close">Close</button>
        </slot>
    </div>
</div>
```

## Using a Component in the Backend

Register Vue components in a backend controller with the `registerVueComponent` method, usually in the controller constructor or an action method.

```php
class Posts extends Controller
{
    public function edit($id)
    {
        $this->registerVueComponent(\Acme\Blog\VueComponents\PostEditor::class);
        $this->registerVueComponent(\Backend\VueComponents\Modal::class);

        // ... rest of the action
    }
}
```

The controller layout outputs the component templates and the JavaScript registration code. Once registered, use the components in your views by their tag name.

```html
<div id="app">
    <acme-blog-post-editor
        ref="editor"
        :initial-content="content"
        :readonly="isLocked"
        @save="onSave"
    ></acme-blog-post-editor>

    <backend-modal ref="confirmModal">
        <template #header>
            <h5>Confirm Action</h5>
        </template>
        <p>Are you sure you want to proceed?</p>
        <template #footer>
            <button @click="confirm">Yes</button>
            <button @click="$refs.confirmModal.hide()">No</button>
        </template>
    </backend-modal>
</div>
```

### Mounting a Vue Application

To mount a Vue application, use the `oc.createVueApp` factory function. It registers all Vue components that have been output to the page.

```html
<script type="module">
    const app = oc.createVueApp({
        data() {
            return {
                content: '',
                isLocked: false
            };
        },
        methods: {
            onSave(content) {
                // Handle save
            },
            confirm() {
                this.$refs.confirmModal.hide();
                // Proceed with action
            }
        }
    });

    app.mount('#app');
</script>
```

Use `oc.mountVueApp` to create and mount the application in one step.

```html
<script type="module">
    const { app, vm } = oc.mountVueApp('#app', {
        data() {
            return {
                message: 'Hello World'
            };
        }
    });
</script>
```

### Using an Inline Template

If the mount element contains a `<template>` child, `oc.mountVueApp` uses it as the template of the application.

```html
<div id="app">
    <template>
        <div>
            <h1 v-text="title"></h1>
            <acme-blog-post-editor></acme-blog-post-editor>
        </div>
    </template>
</div>

<script type="module">
    oc.mountVueApp('#app', {
        data() {
            return {
                title: 'Edit Post'
            };
        }
    });
</script>
```

## Using a Component on CMS Pages

CMS components can also register Vue components for use on the frontend. The call is forwarded to the CMS controller, which provides the same registration methods as backend controllers.

```php
class MyComponent extends ComponentBase
{
    public function init()
    {
        $this->registerVueComponent(\Acme\Blog\VueComponents\PostViewer::class);
    }
}
```

Registering in the `init` method makes the Vue component available during both page renders and AJAX requests. Use the `onRun` method instead when the component is only needed for the initial page render.

On the frontend, two Twig tags output the Vue library and the registered components. The `{% framework vue %}` tag loads the Vue library and exposes it as the `Vue` global. If you leave the tag out, include a Vue 3 build yourself and expose it as `window.Vue`.

```twig
{% framework vue %}
```

The `{% vuecomponents %}` tag renders the component templates and registration code, along with the `oc.createVueApp` and `oc.mountVueApp` factory functions. Place it near the end of the page, before any scripts that mount a Vue application.

```twig
<div id="app">
    <acme-blog-post-viewer :post-id="7"></acme-blog-post-viewer>
</div>

{% vuecomponents %}

<script type="module">
    oc.mountVueApp('#app');
</script>
```

::: aside
Frontend component JavaScript modules should read the `Vue` global (`const { ref } = Vue`) instead of using bare imports (`import { ref } from 'vue'`), since bare module specifiers only resolve in the backend panel.
:::

Vue components registered during an AJAX request, for example by a component inside an updated partial, are delivered through the AJAX framework and registered before the page is updated. Mounting an application over the updated markup is up to the page.

## Adding Subcomponents

A complex component can define subcomponents that share its context. Register them in the `registerSubcomponents` method of the PHP class.

```php
class Modal extends VueComponentBase
{
    protected $componentName = 'backend-modal';

    protected function registerSubcomponents()
    {
        $this->registerSubcomponent('alert');
        $this->registerSubcomponent('confirm');
    }
}
```

Each subcomponent needs its own JavaScript file and template partial.

::: dir
├── `vuecomponents`
|   ├── modal
|   |   ├── assets
|   |   |   └── js
|   |   |       ├── modal.js  _← Main component_
|   |   |       ├── alert.js  _← Subcomponent_
|   |   |       └── confirm.js  _← Subcomponent_
|   |   └── partials
|   |       ├── _modal.php
|   |       ├── _alert.php
|   |       └── _confirm.php
|   └── Modal.php
:::

The tag name of a subcomponent is the parent name followed by the subcomponent name. For example, `backend-modal` with the subcomponent `alert` becomes `backend-modal-alert`.

Subcomponents can extend the parent component or other subcomponents.

```js
// alert.js
import modal from './modal.js';

export default {
    extends: modal,
    data() {
        return {
            alertType: 'info'
        };
    },
    methods: {
        showAlert(message) {
            this.content = message;
            this.show();
        }
    }
};
```

## Communicating Between Components

Components communicate with the standard Vue patterns.

### Props and Events

Props pass data from parent to child, and events pass data from child to parent.

```html
<!-- Parent template -->
<child-component
    :value="parentValue"
    @update="handleUpdate"
></child-component>
```

```js
// Child component
export default {
    props: ['value'],
    methods: {
        save() {
            this.$emit('update', this.localValue);
        }
    }
};
```

### Template Refs

Access child component instances using template refs.

```html
<child-component ref="child"></child-component>
<button @click="$refs.child.doSomething()">Trigger</button>
```

### Provide and Inject

Share data across deeply nested components without passing props through every level.

```js
// Ancestor component
export default {
    provide() {
        return {
            theme: this.theme,
            updateTheme: this.updateTheme
        };
    }
};

// Descendant component
export default {
    inject: ['theme', 'updateTheme'],
    computed: {
        themeClass() {
            return `theme-${this.theme}`;
        }
    }
};
```

## Global Objects

October CMS exposes the following global objects for Vue component development.

| Object | Description |
| ------ | ----------- |
| `oc.createVueApp()` | Create a Vue app with registered components |
| `oc.mountVueApp()` | Create and mount a Vue app |
| `oc.vueComponents` | Registry of all Vue component definitions |
| `oc.vueDirectives` | Registry of custom Vue directives |

## Best Practices

The following guidelines keep components predictable and reusable.

- Use a unique namespace prefix for component names, such as `acme-blog-`.
- Use kebab-case for component tag names, PascalCase for PHP class names, and lowercase for directory and file names.
- Keep each component focused on a single responsibility.
- Use props for configuration and events for communication.
- Avoid direct DOM manipulation, and use the reactivity of Vue instead.
- Clean up resources in `beforeUnmount`.
- Lazy load heavy components when possible.
- Use `v-show` instead of `v-if` for content that is toggled often.
- Avoid expensive computations in templates.

#### See Also

::: also
* [Vue Report Widgets](../dashboards/vue-report-widgets.md)
* [Widgets](./widgets.md)
* [CMS Components](../../themes/extending/components.md)
:::
