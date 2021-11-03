# |media

Фильтр `|media` возвращает адрес относительно общедоступного пути [медиа-менеджера](./cms-mediamanager). Результатом является URL до медиа-файла, указанного в параметре фильтра.

    <img src="{{ 'banner.jpg'|media }}" />

Если __https://cdn.octobercms.info__ - адрес медиа-менеджера, то результат будет следующим:

    <img src="https://cdn.octobercms.info/banner.jpg" />
