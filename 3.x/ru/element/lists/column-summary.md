---
subtitle: Столбец списка
shortname: Summary
---
# Столбец Summary

`summary` — генерирует сводное значение, удаляет HTML и ограничивает длину до ближайшей границы слова.

```yaml
html_content:
    label: Content
    type: summary
```

Длина сводки по умолчанию — 40 символов, вы можете изменить её с помощью опции `limitChars`.

```yaml
html_content:
    label: Content
    type: summary
    limitChars: 100
```

Для ограничения по количеству слов укажите опцию `limitWords`. Вы также можете изменить завершающие символы с помощью опции `endChars`.

```yaml
html_content:
    label: Content
    type: summary
    limitWords: 10
    endChars: "..."
```
