---
subtitle: Twig 属性
---
# this.session

您可以通过 `this.session` 访问当前会话管理器，它返回 `Illuminate\Session\Store` 对象，参见[当前会话配置](../../extend/services/session.md)。

## this.session.get()

您可以通过将键名作为第一个参数传递给 `this.session.get` 来从会话中检索数据。

```twig
{{ this.session.get('key') }}
```

您还可以传递默认值作为第二个参数。

```twig
{{ this.session.get('key', 'default') }}
```

## this.session.has()

`this.session.has` 方法可以判断会话中是否存在某个项目。

```twig
{% if this.session.has('key') %}
    <h1>We found key in the session</h1>
{% endif %}
```

## this.session.put()

`this.session.put` 方法用于存储会话数据。

```twig
{% do this.session.put('my-preference', 'value') %}
```

## this.session.forget()

`this.session.forget` 将从会话中删除单个键（第一个参数）。

```twig
{% do this.session.forget('key') %}
```

要删除所有会话数据，请改用 `this.session.flush`。

```twig
{% do this.session.flush() %}
```

#### 参见

::: also
* [会话服务](../../extend/services/session.md)
:::
