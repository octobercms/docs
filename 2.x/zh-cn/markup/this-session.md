# this.session

您可以通过 `this.session` 访问当前session管理器，它会返回对象 `Illuminate\Session\SessionManager` [当前session配置](../services/session.md#oc-configuration).

## 从session检索数据

```twig
{{ this.session.get('key') }}
```

## 确定session中是否存在项目

```twig
{% if this.session.has('key') %}
    <h1>we found it in the session</h1>
{% endif %}
```

## 从session中删除数据

#### 删除单个键的数据

```twig
{{ this.session.forget('key') }}
```

#### 删除所有session数据

```twig
{{ this.session.flush() }}
```
