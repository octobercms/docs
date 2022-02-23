# {% placeholder %}

`{% placeholder %}` 标签将呈现一个占位符部分，该部分通常 [在Layouts中使用](../cms/layouts.md#oc-placeholders). 此标签将返回任何使用 `{% put %}` 标签添加的占位符内容，或任何已定义的默认内容(可选)。

```twig
{% placeholder name %}
```

然后可以将内容注入到任何后续页面或部件的占位符中。

```twig
{% put name %}
    <p>Place this text in the name placeholder</p>
{% endput %}
```

## 默认占位符内容

占位符可以具有可以被页面替换或补充的默认内容。如果页面上未定义具有默认内容的占位符的 `{% put %}` 标签，则显示默认占位符内容。布局模板中的示例占位符定义：

```twig
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

页面可以向占位符注入更多内容。 `{% default %}` 标签指定了默认占位符内容应该显示的位置。如果不使用标签，占位符内容将被完全替换。

```twig
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

## 检查占位符是否存在

在布局模板中，您可以使用 `placeholder()` 函数检查是否存在占位符内容。这使您可以根据页面是否提供占位符内容来生成不同的标记。例子：

```twig
{% if placeholder('sidemenu') %}
    <!-- 带有侧边栏的页面标记 -->
    <div class="row">
        <div class="col-md-3">
            {% placeholder sidemenu %}
        </div>
        <div class="col-md-9">
            {% page %}
        </div>
    </div>
{% else %}
    <!-- 没有侧边栏的页面的标记 -->
    {% page %}
{% endif %}
```

## 自定义属性

`placeholder` 标签接受两个可选属性——`title` 和 `type`. `title` 属性不被 CMS 本身使用，但可以被其他插件使用。type 属性管理占位符类型 目前支持两种类型——**text** 和 **html**. 文本占位符的内容在显示之前被转义。 title 和 type 属性应该在占位符名称和 `default` 属性之后定义(如果有的话)。 例子：

```twig
{% placeholder ordering title="订购信息" type="text" %}
```

具有默认内容、标题和类型属性的占位符示例。

```twig
{% placeholder ordering default title="订购信息" type="text" %}
    该产品没有订购信息。
{% endplaceholder %}
```
