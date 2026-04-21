---
subtitle: "Get comfortable with the command line"
---
# Terminal Basics

A terminal (also called a command line or shell) is a text-based interface for running commands on your computer. You will use it during installation and occasionally for maintenance tasks like running updates.

If you are already comfortable with the terminal, skip ahead to [Choosing a Text Editor](./text-editor.md).

## Windows

### Opening the Terminal

You have a few options:

- **Laragon Terminal**: If you use [Laragon](https://laragon.org/), it includes a built-in terminal that is preconfigured with PHP and Composer. Click the **Terminal** button in the Laragon window.
- **Windows Terminal**: Search for "Terminal" in the Start menu. This is the modern terminal app included with Windows 10 and later.
- **WSL (Ubuntu)**: For a Linux-like experience on Windows, install [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install). This gives you a full Ubuntu terminal with native support for PHP, Composer, and DDEV.

### Navigating Directories

Most commands run in the context of a directory (folder). Here are the commands you will use most:

**Print your current directory:**

```bash
cd
```

**List files and folders:**

```bash
dir
```

**Change directory:**

```bash
cd my-project
```

Use `cd ..` to go up one level.

::: tip
Press the **Up Arrow** key to recall previous commands. Press **Tab** to autocomplete file and folder names.
:::

## macOS / Linux

### Opening the Terminal

**macOS**: Open **Terminal** from Applications → Utilities, or search for "Terminal" in Spotlight.

**Linux**: Open your distribution's terminal emulator, usually found in the system menu or by pressing `Ctrl+Alt+T`.

### Navigating Directories

Most commands run in the context of a directory (folder). Here are the commands you will use most:

**Print your current directory:**

```bash
pwd
```

**List files and folders:**

```bash
ls
```

**Change directory:**

```bash
cd my-project
```

Use `cd ..` to go up one level.

::: tip
Press the **Up Arrow** key to recall previous commands. Press **Tab** to autocomplete file and folder names.
:::

## Commands You Will Need

Throughout this guide, you will run commands that start with `php artisan` and `composer`. To confirm these are available on your system:

**Check PHP version:**

```bash
php -v
```

PHP 8.2 or later is required. If the command is not found, [download PHP from php.net](https://www.php.net/downloads).

**Check Composer:**

```bash
composer
```

You should see a list of available commands. If Composer is not found, [install it from getcomposer.org](https://getcomposer.org/download/).

Once both are available, you are ready to install October CMS.

## Next Steps

Continue to [Choosing a Text Editor](./text-editor.md) to set up your code editor.
