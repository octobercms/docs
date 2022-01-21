# 多语言

插件可以在插件目录的 **lang** 子目录中设置多语言文件。系统会自动检测插件多语言文件。后端用户界面菜单、表单标签等本机支持使用多语言字符串。如果您提供多语言代码而不是实际字符串，系统将尝试从多语言文件加载它。在其他情况下，您需要[使用 API](#accessing-localization-strings) 加载多语言字符串。

> **注意**：翻译前端内容，[有插件可以使用](https://octobercms.com/plugin/rainlab-translate)。

## 多语言目录和文件结构

以下是插件 **lang** 目录的示例：

```
plugins/
  acme/
    todo/             <===  插件目录
      lang/           <===  多语言目录
        en/           <===  语言地区目录
          lang.php    <===  语言地区文件
        fr/
          lang.php
```

**lang.php** 文件应该定义并返回一个任意深度的数组，例如：

```php
return [
    'app' => [
        'name' => 'October CMS',
        'tagline' => 'Getting Back to Basics'
    ]
];
```

**validation.php** 文件的结构与 **lang.php** 类似，用于指定您的 [自定义验证](https://octobercms.com/docs/services/validation#localization) 消息在语言文件中，例如：

```php
return [
    'required' => '我们需要知道你的xxx！',
    'email.required' => '我们需要知道您的电子邮件地址！',
];
```

## 访问多语言字符串

多语言字符串可以用 `Lang` 类加载。它接受的参数是多语言键字符串，它由插件名称、多语言文件名和从文件返回的数组中多语言字符串的路径组成。下一个示例从 plugins/acme/blog/lang/en/lang.php 文件中加载 **app.name** 字符串(语言使用 `config/app.php` 配置中的 `locale` 参数设置文件)：

```php
echo Lang::get('acme.blog::lang.app.name');
```

## 覆盖多语言字符串

系统用户可以在不更改插件文件的情况下覆盖插件多语言字符串。 这是通过将多语言文件添加到 **lang** 目录来完成的。 例如，要覆盖 **acme/blog** 插件的 lang.php 文件，您应该在以下位置创建该文件：

```
lang/               <===  应用多语言目录
  en/               <===  语言地区目录
    acme/           <===  插件/模块目录
      blog/         <===^
        lang.php    <===  语言地区覆盖文件
```

该文件只能包含您要覆盖的字符串，无需替换整个文件。例子：

```php
return [
    'app' => [
        'name' => 'October CMS!'
    ]
];
```
