---
subtitle: Twig-свойство
---
# this.environment

Вы можете получить доступ к текущему объекту окружения через `this.environment`, который возвращает строку, ссылающуюся на [текущую конфигурацию окружения](../../setup/configuration.md).

## Пример

Следующий пример отобразит баннер, если сайт работает в тестовом окружении:

```twig
{% if this.environment == 'test' %}

    <div class="banner">Test Environment</div>

{% endif %}
```
