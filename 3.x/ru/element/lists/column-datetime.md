---
subtitle: Столбец списка
shortname: Date & Time
---
# Столбец Date & Time

`datetime` — отображает значение столбца как отформатированные дату и время. Следующий пример отображает даты как **Thu, Dec 25, 1975 2:15 PM**.

```yaml
created_at:
    label: Date
    type: datetime
```

Вы также можете указать пользовательский формат даты, например **Thursday 25th of December 1975 02:15:16 PM**.

```yaml
created_at:
    label: Date
    type: datetime
    format: l jS \of F Y h:i:s A
```

Отображаемое значение автоматически конвертируется в часовой пояс, указанный в настройках панели управления. Вы можете отключить это с помощью опции `useTimezone`.

```yaml
created_at:
    label: Date
    type: datetime
    useTimezone: false
```

::: tip
Опция `useTimezone` также применяется к другим типам полей, связанным с датой и временем, включая `date`, `time`, `timesince` и `timetense`.
:::

## Date

`date` — отображает значение столбца в формате даты **M j, Y**.

```yaml
created_at:
    label: Date
    type: date
```

Часовой пояс панели управления не применяется к этому значению по умолчанию. Если дата включает время, вы можете конвертировать часовой пояс с помощью опции `useTimezone`.

```yaml
created_at:
    label: Date
    type: date
    useTimezone: true
```

::: tip
Столбцы `date` и `time` не применяют конвертацию часовых поясов панели управления по умолчанию, поскольку для конвертации требуются и дата, и время.
:::

## Time

`time` — отображает значение столбца в формате времени **g:i A**.

```yaml
created_at:
    label: Date
    type: time
```

## Time Since

`timesince` — отображает разницу во времени от значения до текущего момента в удобочитаемом формате. Например: **10 minutes ago**

```yaml
created_at:
    label: Date
    type: timesince
```

## Time Tense

`timetense` — отображает 24-часовое время и день, используя грамматическое время текущей даты. Например: **Today at 12:49**, **Yesterday at 4:00** или **18 Sep 2015 at 14:33**.

```yaml
created_at:
    label: Date
    type: timetense
```
