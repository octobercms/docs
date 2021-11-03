# Медиа Менеджер

По умолчанию Медиа Менеджер работает с папкой **storage/app/media**. Вы можете изменить настройки, чтобы использовать Amazon S3 или Rackspace CDN.

> Вы должны установить [Драйвера](http://octobercms.com/plugin/october-drivers) перед тем, как начать использовать Amazon S3 или Rackspace CDN.

Не забудьте после изменения настроек Медиа Менеджера обновить его кэш!

<a name="amazon-s3"></a>
## Настройка Amazon S3

Зарегистрируйтесь на Amazon AWS или войдите в свою учетную запись. Откройте панель управления S3 и создайте новую корзину.

Создайте папку **media**, которая будет корнем вашей Медиа Библиотеки (вы можете использовать любое название).

По умолчанию файлы в корзине не могут быть доступны напрямую. Чтобы сделать корзину отркытой для всех, вернитесь в их список и выберите ту, которую создали. Дальше нажмите на кнопку **Properties** справа. Отркойте вкладку **Permissions**. Нажмите на **Edit bucket policy**. Вставьте следующий код в попап окно (не забудьте заменить название корзины):

    {
        "Version": "2008-10-17",
        "Id": "Policy1397632521960",
        "Statement": [
            {
                "Sid": "Stmt1397633323327",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::BUCKETNAME/*"
            }
        ]
    }

Нажмите кнопку **Save**. Вы измените права на read-only на все папки и файлы в корзине. Также возможно настроить публичный доступ до определенной папки в корзине:

    ...
    "Resource": "arn:aws:s3:::BUCKETNAME/media/*"
    ...

Вы также должны создать API пользователя, которого OctoberCMS будет использовать для управления файлами в корзине. В AWS консоли перейдите в раздел IAM. Нажмите на вкладку Users и создайте нового пользователя с любым именем. Обратите внимание на то, чтобы было отмечено "Generate an access key for each user". После того, как AWS создаст нового юзера, вы можете посмотреть его **Access Key ID** и **Secret Access Key**. Скопируйте эти ключи, они вам еще пригодятся.

Вернитесь к списку пользователей и нажмите на того, которого сейчас создали. В разделе **Permissions** нажмите на кнопку **Attach Policy**. Выберите **AmazonS3FullAccess** в списке и нажмите на кнопку **Attach Policy**.

Теперь вы имеете всю необходимую информацию для настройки OctoberCMS. Откройте файл **config/filesystem.php** и найдите раздел **disks**. Он уже содержит настройки s3, поэтому их нужно только  заменить на Ваши:

Ключ | Значение
------------- | -------------
**key** | **Access Key ID** пользователя, которого вы создали.
**secret** | **Secret Access Key** пользователя, которого вы создали.
**bucket** | название корзины.
**region** | код региона.

Вы можете найти название региона корзины в консоле S3, на вкладке **Properties**, например, Oregon. Используйте таблицу ниже, чтобы найти код региона по его названию (вы также можете посмотреть [AWS документацию](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region)):

Регион | Код
------------- | -------------
<span class="nowrap">**US Standard**</span> | us-east-1
<span class="nowrap">**US West (Oregon)**</span> | us-west-2
<span class="nowrap">**US West (N. California)**</span> | us-west-1
<span class="nowrap">**EU (Ireland)**</span> | eu-west-1
<span class="nowrap">**EU (Frankfurt)**</span> | eu-central-1
<span class="nowrap">**Asia Pacific (Singapore)**</span> | ap-southeast-1
<span class="nowrap">**Asia Pacific (Sydney)**</span> | ap-southeast-2
<span class="nowrap">**Asia Pacific (Tokyo)**</span> | ap-northeast-1
<span class="nowrap">**South America (Sao Paulo)**</span> | sa-east-1

Пример:

    'disks' => [
        ...
        's3' => [
            'driver' => 's3',
            'key'    => 'XXXXXXXXXXXXXXXXXXXX',
            'secret' => 'xxxXxXX+XxxxxXXxXxxxxxxXxxXXXXXXXxxxX9Xx',
            'region' => 'us-west-2',
            'bucket' => 'my-bucket'
        ],
        ...
    ]

Сохраните файл **config/filesystem.php** и откройте **config/cms.php**. Найдите раздел **storage**, **media**. Измените значения **disk**, **folder** и **path**:

Ключ | Значение
------------- | -------------
**disk** | **s3**.
**folder** | назавние папки в корзине.
**path** | URL корзины.

Пример:

    'storage' => [
        ...
        'media' => [
            'disk'   => 's3',
            'folder' => 'media',
            'path' => 'https://s3-us-west-2.amazonaws.com/your-bucket-name/media'
        ]
    ]

Поздравляем! Теперь вы может использовать Amazon S3.

Вы также можете использовать Amazon CloudFront CDN для работы с вашей корзиной (см. [CloudFront документация](http://aws.amazon.com/cloudfront/)). После настройки CloudFront, не забудьте изменить значение **path** в разделе **storage**.

<a name="rackspace-cdn"></a>
## Настройка Rackspace CDN

To use Rackspace CDN with OctoberCMS, you should create Rackspace CDN container, folder in the container and API user.

Войдите в консоль управления Rackspace и перейдите в раздел Storage / Files. Создайте новый контейнер с типом **Public (Enabled CDN)**.

Создайте папку **media**, которая будет корнем вашей Медиа Библиотеки (вы можете использовать любое название).

Вы должны создать API пользователя, которого OctoberCMS будет использовать для управления файлами. Откройте страницу Account / User Management. Нажмите на кнопку **Create user**. Введите имя пользователя (например, october.cdn.api), пароль, секретный вопрос и ответ. В разделе **Product Access** выберите **Custom**, после **Admin**. Используйте роль **No Access** в разделе **Account** и **Technical Contact** в разделе **Contact Information**. После сохранения пользователя, вы увидете раздел **Login Details** с **API Key**, которые понадобятся для настройки OctoberCMS.

Теперь вы имеете всю необходимую информацию для настройки OctoberCMS. Откройте файл **config/filesystem.php** и найдите раздел **disks**. Он уже содержит настройки Rackspace, поэтому их нужно только  заменить на Ваши:

Ключ | Значение
------------- | -------------
**username** | имя пользователя (например, october.cdn.api).
**key** | **API Key** пользователя, который вы можете найти на странице Профиль.
**container** | имя контейнера.
**region** | код региона корзины.
**endpoint** | не изменять.
**region** | Вы можете найти название региона в списке контейнеров, в панели управления Rackspace. Это 3-ех буквенное значение, например, **ORD** для Chicago.

Пример:

    'disks' => [
        ...
        'rackspace' => [
            'driver'    => 'rackspace',
            'username'  => 'october.api.cdn',
            'key'       => 'xx00000000xxxxxx0x0x0x000xx0x0x0',
            'container' => 'my-bucket',
            'endpoint'  => 'https://identity.api.rackspacecloud.com/v2.0/',
            'region'    => 'ORD'
        ],
        ...
    ]


Сохраните файл **config/filesystem.php** и откройте **config/cms.php**. Найдите раздел **storage**, **media**. Измените значения **disk**, **folder** и **path**:

Ключ | Значение
------------- | -------------
**disk** | **rackspace**.
**folder** | название папки в конейнере.
**path** | URL до папки в контейнере.

Пример:

    'storage' => [
        ...
        'media' => [
            'disk'   => 'rackspace',
            'folder' => 'media',
            'path' => 'https://xxxxxxxxx-xxxxxxxxx.r00.cf0.rackcdn.com/media'
        ]
    ]

Поздравляем! Теперь вы может использовать Rackspace CDN.

<a name="audio-and-video-players"></a>
## Аудио и видео проигрыватели

По умолчанию система использует HTML5 audio и video теги для отображения медиафайлов:

    <video src="video.mp4" controls></video>

или

    <audio src="audio.mp3" controls></audio>

Вы можете использовать **oc-audio-player.html** и **oc-video-player.html** фрагменты, чтобы переопределить их отображение. Используйте переменную **src** внутри фрагментов, чтобы получить ссылку на файл. Пример:

    <video src="{{ src }}" width="320" height="200" controls preload></video>

Вы также можете использовать Twig разметку, чтобы, например, подргужать нужное видео под нужное разрешение:

    <video controls>
        <source
            src="{{ src }}"
            media="only screen and (min-device-width: 568px)"></source>
        <source
            src="{{ src|replace({'.mp4': '.iphone.mp4'}) }}"
            media="only screen and (max-device-width: 568px)"></source>
    </video>

<a name="configuration-options"></a>
## Другие параметры конфигурации

Существуют некоторые дополнительные параметры Медиа Менеджера, которые Вы можете использовать. Все они находятся в файле **config/cms.php**, в разделе **storage/media**. Например:

    'storage' => [
        ...

        'media' => [
            ...
            'ignore' => ['.svn', '.git', '.DS_Store']
        ]
    ],


Ключ | Значение
------------- | -------------
**ignore** | список файлов и папок, которые нужно проигнорировать. По умолчанию ['.svn', '.git', '.DS_Store'].
**ttl** | "cache time-to-live", в минутах. По умолчанию - 10 минут. Кэш очищается автоматически, когда элементы библиотеки добавляются/обновляются/удаляются.
**imageExtensions** | расширения файлов, соответствующих изображению. По умолчанию - **['gif', 'png', 'jpg', 'jpeg', 'bmp']**.
**videoExtensions** | расширения файлов, соответствующих видео. По умолчанию - **['mp4', 'avi', 'mov', 'mpg']**.
**audioExtensions** | расширения файлов, соответствующих аудио. По умолчанию - **['mp3', 'wav', 'wma', 'm4a']**.

<a name="troubleshooting"></a>
## Исправление проблем

Наиболее популярная проблема использования удаленых сервисов - SSL. Убедитесь в том, что ваш сервер имеет свежие SSL сертификаты.
