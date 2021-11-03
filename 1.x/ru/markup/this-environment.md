# this.environment

Используйте переменную `this.environment`, чтобы узнать [текущую конфигурацию среды](./help-installation#environment-config).

##Пример:

```twig
{% if this.environment == 'test' %}

    <div class="banner">Test Environment</div>

{% endif %}
```
