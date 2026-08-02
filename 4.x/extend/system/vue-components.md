---
subtitle: Build reactive user interfaces with Vue 3 components.
---
# Vue Components

October CMS provides a powerful framework for building Vue 3 components that integrate seamlessly with the backend panel and CMS. Vue components consist of three parts: a PHP class, a JavaScript ES module, and a template partial. This architecture enables reactive user interfaces while maintaining clean separation of concerns.

## Directory Structure

Vue components reside in the **vuecomponents** directory within a plugin or module. Each component has its own subdirectory containing the PHP class, JavaScript files, optional CSS, and template partials.

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

The naming convention uses lowercase for directories and file names, while the PHP class uses PascalCase. The JavaScript and partial files derive their names from the component class.

## Component Class

The PHP class defines the server-side configuration for your Vue component. It must extend `System\Classes\VueComponentBase` and define a component name.

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

The `componentName` property defines the HTML tag used in templates. Use a unique, namespaced name in kebab-case to avoid conflicts with other components.

### Requiring Dependencies

Components can declare dependencies on other Vue components using the `$require` property. Dependencies are automatically registered before the component.

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

Override the `loadAssets` method to include additional JavaScript or CSS files beyond the automatic defaults.

```php
protected function loadAssets()
{
    $this->addJs('js/helpers.js', ['type' => 'module']);
    $this->addCss('css/custom-styles.css');
}
```

To load assets from dependencies (like vendor libraries), use `loadDependencyAssets`. These are loaded before the component's own assets.

```php
protected function loadDependencyAssets()
{
    $this->addCss('vendor/library/styles.css');
    $this->addJs('vendor/library/script.js');
}
```

### Preparing Template Variables

Use the `prepareVars` method to pass data from PHP to the template partial.

```php
protected function prepareVars()
{
    $this->vars['maxFileSize'] = Config::get('cms.max_upload_size');
    $this->vars['allowedTypes'] = ['image/png', 'image/jpeg'];
}
```

## JavaScript Module

The JavaScript file defines the Vue component using the Options API and ES module syntax. The module exports a default object containing the component definition.

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

### Extending Other Components

Components can extend other component definitions using the `extends` property.

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

## Template Partial

The template partial contains the Vue template markup. It's a PHP file that can include server-side logic if needed.

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

Templates support standard Vue 3 syntax including directives, event bindings, and slots. PHP can be used for translations, asset URLs, and server-side configuration.

### Using Slots

Define slots to allow parent components to inject content.

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

## Subcomponents

Complex components can define subcomponents that share the parent's context. Register subcomponents in the PHP class.

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

Each subcomponent requires its own JavaScript file and template partial.

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

Subcomponents are named by appending the subcomponent name to the parent name. For example, `backend-modal` with subcomponent `alert` becomes `backend-modal-alert`.

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

## Registering Components

### Backend Controllers

In backend controllers, register Vue components using the `registerVueComponent` method. This is typically done in the controller's constructor or action methods.

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

The controller's layout automatically outputs the component templates and JavaScript registration code.

### CMS Components

CMS components can also register Vue components for use in the frontend. The call forwards to the CMS controller, which provides the same registration methods available to backend controllers.

```php
class MyComponent extends ComponentBase
{
    public function init()
    {
        $this->registerVueComponent(\Acme\Blog\VueComponents\PostViewer::class);
    }
}
```

Registering in the `init` method makes the Vue component available during both page renders and AJAX requests. The `onRun` method may also be used when the component is only needed for the initial page render.

On the frontend, the Vue library and registered components are output by two Twig tags that work together. The `{% framework vue %}` tag loads the Vue library and exposes it as the `Vue` global. If the tag is omitted, include a Vue 3 build yourself and expose it as `window.Vue`.

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

Vue components registered during an AJAX request, for example by a component inside an updated partial, are delivered through the AJAX framework and registered before the page is updated. Mounting an application over the updated markup remains the responsibility of the page.

## Using Components in Templates

Once registered, use Vue components in your templates with their tag name.

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

## Creating Vue Applications

To mount a Vue application, use the `oc.createVueApp` factory function. This automatically registers all Vue components that have been output to the page.

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

For convenience, use `oc.mountVueApp` to create and mount in one step.

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

### Inline Templates

If the mount element contains a `<template>` child, it will be used as the app's template automatically.

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

## Component Communication

### Props and Events

Components communicate through props (parent to child) and events (child to parent).

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

Share data across deeply nested components without prop drilling.

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

October CMS exposes several global objects for Vue component development.

| Object | Description |
| ------ | ----------- |
| `oc.createVueApp()` | Create a Vue app with registered components |
| `oc.mountVueApp()` | Create and mount a Vue app |
| `oc.vueComponents` | Registry of all Vue component definitions |
| `oc.vueDirectives` | Registry of custom Vue directives |

## Best Practices

### Naming Conventions

- Use a unique namespace prefix for component names (e.g., `acme-blog-`)
- Use kebab-case for component tag names
- Use PascalCase for PHP class names
- Use lowercase for directory and file names

### Component Design

- Keep components focused on a single responsibility
- Use props for configuration, events for communication
- Avoid direct DOM manipulation; use Vue's reactivity
- Clean up resources in `beforeUnmount`

### Performance

- Lazy load heavy components when possible
- Use `v-show` instead of `v-if` for frequently toggled content
- Avoid expensive computations in templates

#### See Also

::: also
* [Vue Report Widgets](../dashboards/vue-report-widgets.md)
* [Widgets](./widgets.md)
* [CMS Components](../cms-components.md)
:::
