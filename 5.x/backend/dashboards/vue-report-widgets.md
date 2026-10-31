---
previousPath: extend/dashboards/vue-report-widgets.md
subtitle: Build custom dashboard widgets with Vue that load their own data and handle events through AJAX.
---
# Vue Report Widgets

A Vue report widget is a custom dashboard widget built on the October CMS [Vue framework](../panel/vue-components.md). Use one when the built-in report types are not enough and the widget needs its own appearance, configuration or AJAX requests.

This page builds a widget that displays the current server time and a button. The server handles the button click with an AJAX request.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/widget-example.webp)

## Creating a Vue Report Widget

Place dashboard widgets in the **vuecomponents** directory of a plugin, for example **author/plugin/vuecomponents**. Each widget needs a PHP class for the server side, a JavaScript file for the Vue component and a PHP partial for the Vue template. The names of the CSS, JavaScript and partial files come from the class file name.

::: dir
├── `vuecomponents`
|   ├── mycustomwidget
|   |   ├── assets
|   |   |   ├── css
|   |   |   |   └── mycustomwidget.css  _← StyleSheet File_
|   |   |   └── js
|   |   |       └── mycustomwidget.js  _← JavaScript File_
|   |   └── partials
|   |       └── _mycustomwidget.php  _← Partial File_
|   └── MyCustomWidget.php  _← Vue Widget Class_
:::

### Writing the Widget Class

The widget class extends `Dashboard\Classes\VueReportWidgetBase`. The only method it must implement is `getData`, which returns the data for the widget. The following is the initial implementation of **MyCustomWidget.php**.

```php
namespace Acme\MyPlugin\VueComponents;

use Dashboard\Classes\VueReportWidgetBase;
use Dashboard\Classes\ReportFetchData;
use Carbon\Carbon;

class MyCustomWidget extends VueReportWidgetBase
{
    /**
     * @var string componentName is the Vue component tag name.
     */
    protected $componentName = 'acme-myplugin-vuecomponents-mycustomwidget';

    public function getData(ReportFetchData $data): mixed
    {
        return [
            'current_time' => Carbon::now()->format('Y-m-d H:i:s')
        ];
    }
}
```

The `VueReportWidgetBase` class extends `System\Classes\VueComponentBase` and adds the dashboard features that report widgets need. The `$componentName` property is required and sets the Vue component tag name. By convention, use the fully qualified class name in lowercase, with backslashes replaced by hyphens. For example, `Acme\MyPlugin\VueComponents\MyCustomWidget` becomes `acme-myplugin-vuecomponents-mycustomwidget`.

The widget configuration is available in the `getData` method as the `widgetConfig` property of the `$data` argument.

### Writing the Vue Component

Define the Vue component for the widget as an ES module in the **assets/js** directory. The component uses `export default` and extends the base widget component. The following is the code of **assets/js/mycustomwidget.js**.

```js
import WidgetBase from '../../../../../../../modules/dashboard/vuecomponents/dashboard/assets/js/widget-base.js';

export default {
    extends: WidgetBase,
    data: function () {
        return {
        }
    },
    methods: {
        useCustomData: function () {
            return true;
        },

        makeDefaultConfigAndData: function () {
            this.widget.configuration.title = 'My Custom Widget';
        },

        getSettingsConfiguration: function () {
            const result = [{
                property: "title",
                title: "Title",
                type: "string",
            }];

            return result;
        }
    }
};
```

The `VueMaker` trait registers the component when the PHP class of the widget is loaded. The template comes from the partial file, so the JavaScript has no `template` property.

Widget Vue components must include all the methods in the example.

- `useCustomData` must return `true`, which tells the dashboard that the component manages its own data cycle.
- `makeDefaultConfigAndData` sets the default widget configuration. The example assigns the widget title directly, and Vue 3 makes the change reactive. The keys of the configuration object are up to you and are for the internal use of the widget.
- `getSettingsConfiguration` returns the configuration of the widget settings form, as JavaScript objects that follow the [Inspector types](../../handbook/inspector-types.md).

### Writing the Template

Define the Vue template of the component in a partial file in the **partials** directory. The following is a basic template, **partials/_mycustomwidget.php**.

```html
<div class="widget-body">
    <h3 class="widget-title" v-text="widget.configuration.title"></h3>

    <div v-if="!loading">
        <p>Current server time: <span v-if="fullWidgetData" v-text="fullWidgetData.data.current_time"></span></p>
    </div>
    <p v-else>Loading...</p>
</div>
```

The template reads the `title` property from the widget configuration, which the `makeDefaultConfigAndData` method set earlier.

It also uses the `loading` property supplied by the dashboard. This property is `true` while the dashboard loads data with an AJAX request, which happens when the widget configuration changes or the user selects a date range on the dashboard. Use it to show the loading status of the widget.

The data returned by the server is available in the `fullWidgetData.data` structure.

## Registering the Widget

Register dashboard widgets in the plugin registration file (Plugin.php), using the `widgets` key of the `registerDashboards` method. The keys of the array are the widget classes, and the values are the widget configuration: label, group and required permissions.

```php
public function registerDashboards()
{
    return [
        'widgets' => [
            \Acme\MyPlugin\VueComponents\MyCustomWidget::class => [
                'label' => "Custom Widget",
                'group' => "Acme Author",
                'permissions' => ['acme.myplugin.access_plugin'],
            ]
        ]
    ];
}
```

The `label` is the widget name and the `group` is the author name. The dashboard shows both in the Create Widget menu. Once the widget is registered, you can add it to the dashboard.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/adding-widget.webp)

When you add a widget, its settings form opens automatically.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/config-widget.webp)

## Handling Events with AJAX

Dashboard widgets can send AJAX requests to the server and handle the response. In this example, clicking the button sends a request, and the server returns a random number to display in the widget body.

First, define the button in the component template, along with an element that displays the value returned by the server.

```php
<button
    class="btn btn-primary"
    :disabled="loadingButtonData"
    @click.stop.prevent="onButtonClick"
>Click me</button>
<span v-text="buttonClickResult"></span>
```

Then define the `loadingButtonData` and `buttonClickResult` values in the Vue component of the widget.

```js
data: function () {
    return {
        buttonClickResult: null,
        loadingButtonData: false
    }
},
```

Next, create the `onButtonClick` method. It calls the `request` method of the base widget component. It sets `loadingButtonData` to `true` while the request runs, then sets `buttonClickResult` to the `result` property of the response. The method also sends `some_var` with the request. The server handler below does not use it, and it shows how to send extra data, which the handler receives in its `$extraData` argument.

```js
onButtonClick: async function () {
    this.loadingButtonData = true;
    this.buttonClickResult = null;
    try {
        const response = await this.request('onGetSomeData', {
            some_var: "some value"
        });
        this.buttonClickResult = response.result;
    }
    catch (err) {
        oc.alert(err.message);
    }
    finally {
        this.loadingButtonData = false;
    }
}
```

Finally, add the server-side handler to the PHP class of the widget. The handler name must match the name in the `request` call. Define it as a protected method that accepts the widget configuration array and the extra data array.

```php
protected function onGetSomeData(array $widgetConfig, array $extraData)
{
    return [
        'result' => rand(1, 100)
    ];
}
```

The widget now displays a random value received from the server.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/custom-widget-data.webp)

#### See Also

::: also
* [Vue Components](../panel/vue-components.md)
* [Report Widgets](./report-widgets.md)
* [Data Sources](./data-sources.md)
* [Dash Controller](./dash-controller.md)
:::
