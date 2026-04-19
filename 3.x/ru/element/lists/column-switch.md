---
subtitle: Столбец списка
shortname: Switch
---
# Столбец Switch

`switch` — отображает состояние включено/выключено для булевых столбцов.

```yaml
enabled:
    label: Enabled
    type: switch
```

Вы можете настроить текст переключателя, передав массив в значение `options` с метками для false и true.

```yaml
enabled:
    label: Enabled
    type: switch
    options:
        - Nope
        - Yeah
```
