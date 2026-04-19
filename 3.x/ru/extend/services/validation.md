# Валидация

Класс валидатора — это простое и удобное средство для проверки данных и получения сообщений об ошибках валидации через класс `Validator`. Он полезен при обработке данных форм, отправленных конечным пользователем.

::: tip
При работе с моделями October CMS поставляется с полезным [трейтом Validation](../database/traits.md), который реализует класс `Validator` и поддерживает те же определения правил.
:::

Ниже приведён список всех доступных правил валидации:

<div class="content-list" markdown="1">

- [Accepted](#rule-accepted)
- [Active URL](#rule-active-url)
- [After (Date)](#rule-after)
- [Alpha](#rule-alpha)
- [Alpha Dash](#rule-alpha-dash)
- [Alpha Numeric](#rule-alpha-num)
- [Array](#rule-array)
- [Before (Date)](#rule-before)
- [Between](#rule-between)
- [Boolean](#rule-boolean)
- [Confirmed](#rule-confirmed)
- [Date](#rule-date)
- [Date Format](#rule-date-format)
- [Different](#rule-different)
- [Digits](#rule-digits)
- [Digits Between](#rule-digits-between)
- [E-Mail](#rule-email)
- [Exists (Database)](#rule-exists)
- [Image (File)](#rule-image)
- [In](#rule-in)
- [Integer](#rule-integer)
- [IP Address](#rule-ip)
- [Max](#rule-max)
- [MIME Types](#rule-mimes)
- [Min](#rule-min)
- [Not In](#rule-not-in)
- [Nullable](#rule-nullable)
- [Numeric](#rule-numeric)
- [Regular Expression](#rule-regex)
- [Required](#rule-required)
- [Required If](#rule-required-if)
- [Required Unless](#rule-required-unless)
- [Required With](#rule-required-with)
- [Required With All](#rule-required-with-all)
- [Required Without](#rule-required-without)
- [Required Without All](#rule-required-without-all)
- [Same](#rule-same)
- [Size](#rule-size)
- [String](#rule-string)
- [Timezone](#rule-timezone)
- [Unique (Database)](#rule-unique)
- [Site Unique (Database)](#rule-site-unique)
- [URL](#rule-url)

</div>

## Основы использования

В большинстве случаев вы должны сначала захватить пользовательский ввод и передать его в метод `make` (первый аргумент) и включить правила валидации, которые должны быть применены к данным (второй аргумент). В следующем примере мы захватываем пользовательский ввод обратной отправки с помощью вспомогательной функции `post()`.

```php
$data = post();

$validator = Validator::make($data, [
    'name' => 'required|min:5'
]);
```

Несколько правил могут быть разделены символом «вертикальная черта» или как отдельные элементы массива.

```php
$validator = Validator::make($data, [
    'name' => ['required', 'min:5']
]);
```

Для валидации нескольких полей просто добавьте их в массив.

```php
$data = [
    'name' => 'Joe',
    'password' => 'lamepassword',
    'email' => 'email@example.tld'
];

$validator = Validator::make($data, [
    'name' => 'required',
    'password' => 'required|min:8',
    'email' => 'required|email|unique:users'
]);
```

### Проверка результатов валидации

После создания экземпляра `Validator` метод `fails` (или `passes`) может использоваться для выполнения валидации.

```php
if ($validator->fails()) {
    // The given data did not pass validation
}
```

Если валидация не прошла, вы можете получить сообщения об ошибках от валидатора.

```php
$messages = $validator->messages();
```

Вы также можете получить массив правил валидации, которые не прошли проверку, без сообщений. Для этого используйте метод `failed`:

```php
$failed = $validator->failed();
```

### Валидация файлов

Класс `Validator` предоставляет несколько правил для валидации файлов, такие как `size`, `mimes` и другие. При валидации файлов вы можете просто передать их в валидатор вместе с другими данными.

```php
$data = files() + post();

$validator = Validator::make($data, [...]);
```

::: warning
Не рекомендуется использовать нефильтрованные значения `input()` здесь, так как они содержат GET-переменные, которые могут быть использованы для создания вредоносных ссылок.
:::

## Выброс исключения валидации

В большинстве случаев вы будете валидировать пользовательский ввод, отправленный через форму, и если валидация не пройдёт, выброс `ValidationException` будет совместимым действием. Как более короткий способ валидации формы, вы можете использовать метод `validate` напрямую.

```php
$data = Validator::validate($data, $rules);
```

::: tip
Метод `validate` возвращает отфильтрованные пользовательские данные — атрибуты и значения, которые были валидированы.
:::

Вышеприведённый метод выполняет функциональность, эквивалентную следующему коду. Он также демонстрирует, как вы можете передать экземпляр валидатора непосредственно в [исключение валидации](../system/exceptions.md) (первый аргумент).

```php
$validation = Validator::make($data, $rules);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

### Валидация запроса

Другой вариант — использовать фасад `Request` для выполнения валидации всего пользовательского ввода. Это устраняет необходимость предоставлять данные, поэтому вы можете просто указать правила (первый аргумент). Метод `validate` возвращает отфильтрованные пользовательские данные — атрибуты и значения, которые были валидированы.

```php
$data = Request::validate($rules);
```

Возвращаемое значение `validate` фильтруется правилами валидации. Если поле не определено в правилах, оно не будет включено в эти данные.

## Работа с сообщениями об ошибках

После вызова метода `messages` на экземпляре `Validator` вы получите экземпляр `Illuminate\Support\MessageBag`, который имеет множество удобных методов для работы с сообщениями об ошибках.

#### Получение первого сообщения об ошибке для поля

```php
echo $messages->first('email');
```

#### Получение всех сообщений об ошибках для поля

```php
foreach ($messages->get('email') as $message) {
    //
}
```

#### Получение всех сообщений об ошибках для всех полей

```php
foreach ($messages->all() as $message) {
    //
}
```

#### Определение наличия сообщений для поля

```php
if ($messages->has('email')) {
    //
}
```

#### Получение сообщения об ошибке с форматированием

```php
echo $messages->first('email', '<p>:message</p>');
```

> **Примечание**: По умолчанию сообщения форматируются с использованием синтаксиса, совместимого с Bootstrap.

#### Получение всех сообщений об ошибках с форматированием

```php
foreach ($messages->all('<li>:message</li>') as $message) {
    //
}
```

## Сообщения об ошибках и представления

После выполнения валидации вам понадобится простой способ вернуть сообщения об ошибках в ваши представления. Это удобно обрабатывается October CMS. Рассмотрим следующий AJAX-обработчик в качестве примера:

```php
public function onRegister()
{
    $rules = [];

    $validator = Validator::make(input(), $rules);

    if ($validator->fails()) {
        return Redirect::to('register')->withErrors($validator);
    }
}
```

Обратите внимание, что при неудачной валидации мы передаём экземпляр `Validator` в Redirect с помощью метода `withErrors`. Этот метод сохранит сообщения об ошибках в сессии, чтобы они были доступны при следующем запросе.

October CMS всегда проверяет наличие ошибок в данных сессии и автоматически привязывает их к представлению, если они доступны. **Поэтому важно отметить, что переменная `errors` всегда будет доступна на всех ваших страницах, при каждом запросе**, позволяя вам удобно предполагать, что переменная `errors` всегда определена и может быть безопасно использована. Переменная `errors` будет экземпляром `MessageBag`.

Таким образом, после перенаправления вы можете использовать автоматически привязанную переменную `errors` в вашем представлении:

```twig
{{ errors.first('email') }}
```

### Именованные наборы ошибок

Если у вас несколько форм на одной странице, вы можете захотеть назвать `MessageBag` ошибок. Это позволит вам получать сообщения об ошибках для конкретной формы. Просто передайте имя в качестве второго аргумента `withErrors`.

```php
return Redirect::to('register')->withErrors($validator, 'login');
```

Затем вы можете получить доступ к именованному экземпляру `MessageBag` из переменной `$errors`:

```twig
{{ errors.login.first('email') }}
```

## Доступные правила валидации

Ниже приведены все доступные правила валидации и их функции.

<a name="rule-accepted"></a>
#### accepted

Поле, проходящее валидацию, должно иметь значение _yes_, _on_ или _1_. Это полезно для валидации принятия «Условий обслуживания».

<a name="rule-active-url"></a>
#### active_url

Поле, проходящее валидацию, должно быть валидным URL согласно PHP-функции `checkdnsrr`.

<a name="rule-after"></a>
#### after:_date_

Поле, проходящее валидацию, должно быть значением после заданной даты. Даты будут переданы в PHP-функцию `strtotime`.

<a name="rule-alpha"></a>
#### alpha

Поле, проходящее валидацию, должно состоять полностью из буквенных символов.

<a name="rule-alpha-dash"></a>
#### alpha_dash

Поле, проходящее валидацию, может содержать буквенно-цифровые символы, а также дефисы и подчёркивания.

<a name="rule-alpha-num"></a>
#### alpha_num

Поле, проходящее валидацию, должно состоять полностью из буквенно-цифровых символов.

<a name="rule-array"></a>
#### array

Поле, проходящее валидацию, должно быть типа массив.

<a name="rule-before"></a>
#### before:_date_

Поле, проходящее валидацию, должно быть значением до заданной даты. Даты будут переданы в PHP-функцию `strtotime`.

<a name="rule-between"></a>
#### between:_min_,_max_

Поле, проходящее валидацию, должно иметь размер между заданными _min_ и _max_. Строки, числа и файлы оцениваются так же, как и правило `size`.

<a name="rule-boolean"></a>
#### boolean

Поле, проходящее валидацию, должно быть приводимо к булевому типу. Принимаемый ввод: `true`, `false`, `1`, `0`, `"1"` и `"0"`.

<a name="rule-confirmed"></a>
#### confirmed

Поле, проходящее валидацию, должно иметь совпадающее поле `foo_confirmation`. Например, если поле, проходящее валидацию, — `password`, соответствующее поле `password_confirmation` должно присутствовать во вводе.

<a name="rule-date"></a>
#### date

Поле, проходящее валидацию, должно быть валидной датой согласно PHP-функции `strtotime`.

<a name="rule-date-format"></a>
#### date_format:_format_

Поле, проходящее валидацию, должно соответствовать _формату_, определённому согласно PHP-функции `date_parse_from_format`.

<a name="rule-different"></a>
#### different:_field_

Указанное _поле_ должно отличаться от поля, проходящего валидацию.

<a name="rule-digits"></a>
#### digits:_value_

Поле, проходящее валидацию, должно быть _числовым_ и иметь точную длину _value_.

<a name="rule-digits-between"></a>
#### digits_between:_min_,_max_

Поле, проходящее валидацию, должно иметь длину между заданными _min_ и _max_.

<a name="rule-email"></a>
#### email

Поле, проходящее валидацию, должно быть отформатировано как адрес электронной почты.

<a name="rule-exists"></a>
#### exists:_table_,_column_

Поле, проходящее валидацию, должно существовать в заданной таблице базы данных.

Базовое использование правила exists

```php
'state' => 'exists:states'
```

Указание пользовательского имени столбца

```php
'state' => 'exists:states,abbreviation'
```

Вы также можете указать дополнительные условия, которые будут добавлены как выражения «where» в запрос:

```php
'email' => 'exists:staff,email,account_id,1'
```

Передача `NULL` в качестве значения выражения «where» добавит проверку на `NULL` значение в базе данных:

```php
'email' => 'exists:staff,email,deleted_at,NULL'
```

<a name="rule-image"></a>
#### image

Файл, проходящий валидацию, должен быть изображением (jpeg, png, bmp или gif)

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

Поле, проходящее валидацию, должно быть включено в заданный список значений.

<a name="rule-integer"></a>
#### integer

Поле, проходящее валидацию, должно иметь целочисленное значение.

<a name="rule-ip"></a>
#### ip

Поле, проходящее валидацию, должно быть отформатировано как IP-адрес.

<a name="rule-max"></a>
#### max:_value_

Поле, проходящее валидацию, должно быть меньше или равно максимальному _значению_. Строки, числа и файлы оцениваются так же, как и правило [`size`](#rule-size).

<a name="rule-mimes"></a>
#### mimes:_foo_,_bar_,...

Файл, проходящий валидацию, должен иметь MIME-тип, соответствующий одному из перечисленных расширений.

#### Базовое использование правила MIME

```php
'photo' => 'mimes:jpeg,bmp,png'
```

<a name="rule-min"></a>
#### min:_value_

Поле, проходящее валидацию, должно иметь минимальное _значение_. Строки, числа и файлы оцениваются так же, как и правило [`size`](#rule-size).

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

Поле, проходящее валидацию, не должно быть включено в заданный список значений.

<a name="rule-nullable"></a>
#### nullable

Поле, проходящее валидацию, может быть `null`. Это особенно полезно при валидации примитивов, таких как строки и целые числа, которые могут содержать значения `null`.

<a name="rule-numeric"></a>
#### numeric

Поле, проходящее валидацию, должно иметь числовое значение.

<a name="rule-regex"></a>
#### regex:_pattern_

Поле, проходящее валидацию, должно соответствовать заданному регулярному выражению.

**Примечание:** При использовании шаблона `regex` может потребоваться указать правила в виде массива вместо использования разделителей «вертикальная черта», особенно если регулярное выражение содержит символ вертикальной черты.

<a name="rule-required"></a>
#### required

Поле, проходящее валидацию, должно присутствовать во входных данных.

<a name="rule-required-if"></a>
#### required_if:_field_,_value_,...

Поле, проходящее валидацию, должно присутствовать, если поле _field_ равно любому _value_.

<a name="rule-required-unless"></a>
#### required_unless:anotherfield,value,...

Поле, проходящее валидацию, должно присутствовать и не быть пустым, если поле anotherfield не равно любому value.

<a name="rule-required-with"></a>
#### required_with:_foo_,_bar_,...

Поле, проходящее валидацию, должно присутствовать _только если_ присутствует любое из других указанных полей.

<a name="rule-required-with-all"></a>
#### required_with_all:_foo_,_bar_,...

Поле, проходящее валидацию, должно присутствовать _только если_ присутствуют все другие указанные поля.

<a name="rule-required-without"></a>
#### required_without:_foo_,_bar_,...

Поле, проходящее валидацию, должно присутствовать _только когда_ любое из других указанных полей отсутствует.

<a name="rule-required-without-all"></a>
#### required_without_all:_foo_,_bar_,...

Поле, проходящее валидацию, должно присутствовать _только когда_ все другие указанные поля отсутствуют.

<a name="rule-same"></a>
#### same:_field_

Указанное значение _field_ должно совпадать со значением поля, проходящего валидацию.

<a name="rule-size"></a>
#### size:_value_

Поле, проходящее валидацию, должно иметь размер, соответствующий заданному _значению_. Для строковых данных _значение_ соответствует количеству символов. Для числовых данных _значение_ соответствует заданному целочисленному значению. Для файлов _размер_ соответствует размеру файла в килобайтах.

<a name="rule-string"></a>
#### string:_value_

Поле, проходящее валидацию, должно быть строковым типом.

<a name="rule-timezone"></a>
#### timezone

Поле, проходящее валидацию, должно быть валидным идентификатором часового пояса согласно PHP-функции `timezone_identifiers_list`.

<a name="rule-unique"></a>
#### unique:_table_,_column_,_except_,_idColumn_

Поле, проходящее валидацию, должно быть уникальным в заданной таблице базы данных. Если опция `column` не указана, будет использовано имя поля.

Базовое использование правила unique.

```php
'email' => 'unique:users'
```

Указание пользовательского имени столбца.

```php
'email' => 'unique:users,email_address'
```

Принудительное игнорирование правилом unique заданного ID.

```php
'email' => 'unique:users,email_address,10'
```

Добавление дополнительных условий where.

Вы также можете указать дополнительные условия, которые будут добавлены как выражения «where» в запрос:

```php
'email' => 'unique:users,email_address,NULL,id,account_id,1'
```

В приведённом выше правиле только строки с `account_id` равным `1` будут включены в проверку уникальности.

<a name="rule-site-unique"></a>
#### unique_site:_table_,_column_,_except_,_idColumn_

Поле, проходящее валидацию, должно быть уникальным в рамках одного [контекста сайта](../../cms/resources/multisite.md). Определение идентично правилу `unique`.

```php
'email' => 'unique_site:users'
```

<a name="rule-url"></a>
#### url

Поле, проходящее валидацию, должно быть отформатировано как URL.

::: tip
Эта функция использует PHP-метод `filter_var`.
:::

## Условное добавление правил

В некоторых ситуациях вы можете захотеть выполнять проверки валидации для поля **только** если это поле присутствует во входном массиве. Для быстрого достижения этого добавьте правило `sometimes` в ваш список правил:

```php
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```

В примере выше поле `email` будет валидировано только если оно присутствует в массиве `$data`.

#### Сложная условная валидация

Иногда вы можете захотеть требовать заданное поле только если другое поле имеет значение больше 100. Или вам может потребоваться, чтобы два поля имели заданное значение только когда другое поле присутствует. Добавление этих правил валидации не должно быть затруднительным. Сначала создайте экземпляр `Validator` с вашими _статическими правилами_, которые никогда не меняются:

```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```

Давайте предположим, что наше веб-приложение предназначено для коллекционеров игр. Если коллекционер игр регистрируется в нашем приложении и владеет более чем 100 играми, мы хотим, чтобы он объяснил, почему у него так много игр. Например, возможно, он управляет магазином перепродажи игр или просто наслаждается коллекционированием. Для условного добавления этого требования мы можем использовать метод `sometimes` на экземпляре `Validator`.

```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

Первый аргумент, переданный в метод `sometimes`, — это имя поля, которое мы условно валидируем. Второй аргумент — правила, которые мы хотим добавить. Если `Closure`, переданное третьим аргументом, возвращает `true`, правила будут добавлены. Этот метод позволяет легко строить сложные условные валидации. Вы даже можете добавлять условные валидации для нескольких полей одновременно:

```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```

::: tip
Параметр `$input`, переданный в ваше `Closure`, будет экземпляром `Illuminate\Support\Fluent` и может использоваться как объект для доступа к вашему вводу и файлам.
:::

## Валидация массивов

Валидация полей формы на основе массивов не должна быть затруднительной. Вы можете использовать «точечную нотацию» для валидации атрибутов внутри массива. Например, если входящий HTTP-запрос содержит поле `photos[profile]`, вы можете валидировать его следующим образом:

```php
$validator = Validator::make(input(), [
    'photos.profile' => 'required|image',
]);
```

Вы также можете валидировать каждый элемент массива. Например, чтобы валидировать, что каждый email в заданном массивном поле ввода уникален, вы можете сделать следующее:

```php
$validator = Validator::make(input(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```

Аналогично, вы можете использовать символ `*` при указании сообщений валидации в ваших языковых файлах, что позволяет легко использовать одно сообщение валидации для полей на основе массивов:

```php
'custom' => [
    'person.*.email' => [
        'unique' => 'Each person must have a unique e-mail address',
    ]
],
```

Вы также можете использовать «нотацию массива» в ваших правилах валидации, если хотите. Эти правила будут автоматически преобразованы в «точечную нотацию» при валидации.

```php
$validator = Validator::make(input(), [
    'photos[profile]' => 'required|image',
    'person[][email]' => 'email|unique:users',
]);
```

## Пользовательские сообщения об ошибках

При необходимости вы можете использовать пользовательские сообщения об ошибках для валидации вместо сообщений по умолчанию. Существует несколько способов указать пользовательские сообщения. Ниже показано, как передать пользовательские сообщения в экземпляр валидатора.

```php
$messages = [
    'required' => 'The :attribute field is required.',
];

$validator = Validator::make($input, $rules, $messages);
```

Заполнитель `:attribute` будет заменён фактическим именем поля, проходящего валидацию. Вы также можете использовать другие заполнители в сообщениях валидации. Ниже показаны некоторые другие заполнители валидации, с которыми вы можете столкнуться.

```php
$messages = [
    'same' => 'The :attribute and :other must match.',
    'size' => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute must be between :min - :max.',
    'in' => 'The :attribute must be one of the following types: :values',
];
```

Иногда вы можете захотеть указать пользовательское сообщение об ошибке только для конкретного поля. Ниже показано, как указать пользовательское сообщение для атрибута `email` при использовании правила **required**.

```php
$messages = [
    'email.required' => 'We need to know your e-mail address!',
];
```

### Указание пользовательских сообщений в языковых файлах

В некоторых случаях вы можете захотеть указать пользовательские сообщения в языковом файле вместо передачи их непосредственно в `Validator`. Для этого добавьте ваши сообщения в массив в языковом файле **lang/xx/validation.php** вашего плагина.

```php
return  [
    'required' => 'We need to know your e-mail address!',
    'email.required' => 'We need to know your e-mail address!',
];
```

Затем в вашем вызове `Validator::make` используйте `Lang:get` для использования ваших пользовательских файлов.

```php
Validator::make($formValues, $validations, Lang::get('acme.blog::validation'));
```

### Глобальное переопределение сообщений валидации

Строки сообщений по умолчанию для валидатора расположены в файле **modules/system/lang/xx/validation.php**. Мы рекомендуем открыть этот файл для ознакомления со всеми доступными сообщениями.

Файл содержит массив сообщений для каждого правила валидации. Существует атрибут `custom` для пользовательских сообщений об ошибках с использованием соглашения об именовании «attribute.rule» и атрибут `attributes` для хранения пользовательских имён атрибутов.

```php
return [
    'required' => 'The :attribute field is required!',
    // ...

    'custom' => [
        // ...
    ],

    'attributes' => [
        // ...
    ]
];
```

Вы можете изменить любые из этих значений, создав новый файл в директории app, например, для локали `en` создайте файл **app/lang/system/en/validation.php**. Значения внутри этого файла переопределят значения по умолчанию, и вы можете включить только те значения, которые хотите изменить.

```php
return [
    'required' => 'Sorry, we need that field (:attribute) you gave!',

    'attributes' => [
        'email' => 'email address'
    ],
];
```

## Пользовательские правила валидации

Существует множество полезных правил валидации, однако вы можете захотеть определить свои собственные. Сначала вы должны решить, должно ли ваше правило быть зарегистрировано глобально или использовать локальный объект правила.

### Глобально зарегистрированные правила

Глобально зарегистрированное правило может использоваться во всём вашем приложении путём регистрации его с тегом и классом правила. Обычно это делается в методе `register` [файла регистрации плагина](../extending.md) с помощью вспомогательного метода `registerValidationRule`.

```php
public function register()
{
    $this->registerValidationRule('uppercase', UppercaseRule::class);
}
```

В данном случае мы создали правило с тегом **uppercase** и сослались на наш класс правила, где оно становится доступным для указания в качестве правила повсюду.

```php
Validator::make($data, [
    'shoutout' => 'required|uppercase',
]);
```

#### Определение глобального класса правила

Глобальный класс правила представляет собой единое повторно используемое правило валидации для ваших моделей. Как минимум, класс правила должен предоставлять метод `validate`, который определяет, проходит ли правило валидации. Вы также можете указать необязательный метод `message` для возврата пользовательского сообщения об ошибке.

```php
class UppercaseRule
{
    /**
     * validate determines if the validation rule passes.
     * @param string $attribute
     * @param mixed $value
     * @param array $params
     * @return bool
     */
    public function validate($attribute, $value, $params)
    {
        return strtoupper($value) === $value;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be uppercase.';
    }
}
```

#### Передача аргументов в правила

Глобальные правила поддерживают передачу аргументов вместе с их определением. Например, правило **betwixt** может требовать два значения. Параметры могут быть переданы в правило через разделение двоеточием (`:`) и каждый параметр разделяется запятой (`,`).

```php
$v = Validator::make($data, [
    'name' => 'betwixt:1,6',
]);
```

Параметры затем передаются в метод validate и становятся доступными. Сообщение об ошибке также может быть обработано путём определения метода `replace`.

```php
class BetwixtRule
{
    /**
     * validate between start and end parameters.
     */
    public function validate($attribute, $value, $params)
    {
        [$start, $end] = $params;

        return strlen($value) > $start && strlen($value) < $end;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be between :start and :end.';
    }

    /**
     * replace defines custom placeholder replacements.
     * @return string
     */
    public function replace($message, $attribute, $rule, $params)
    {
        [$start, $end] = $params;

        $message = str_replace(':start', $start, $message);

        $message = str_replace(':end', $end, $message);

        return $message;
    }
}
```

### Локальные объекты правил

[Документация Laravel по объектам правил](https://laravel.com/docs/6.x/validation#using-rule-objects) более подробно описывает, как определить класс правила. В частности, правило должно реализовывать контракт `Illuminate\Contracts\Validation\Rule`, который требует определения метода `passes`.

```php
class LowercaseRule implements \Illuminate\Contracts\Validation\Rule
{
    /**
     * passes checks if the rule is successful
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return strtolower($value) === $value;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be lowercase.';
    }
}
```

После определения правила оно может быть передано как экземпляр в сервис `Validator`.

```php
$v = Validator::make($data, [
    'name' => ['required', new LowercaseRule],
]);
```

Вы также можете реализовать объект правила в моделях, используя переопределение метода `beforeValidate`.

```php
public function beforeValidate()
{
    $this->rules['name'] = ['required', new LowercaseRule];
}
```

#### Смотрите также

::: also
* [Документация по валидации Laravel](https://laravel.com/docs/10.x/validation)
:::
