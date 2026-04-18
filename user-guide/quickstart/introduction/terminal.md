---
subtitle: "Get comfortable with the command line"
---
# Terminal Basics

A terminal (also called a command line or shell) is a text-based interface for running commands on your computer. You will use it during installation and occasionally for maintenance tasks like running updates.

If you are already comfortable with the terminal, skip ahead to [Choosing a Text Editor](./editor.md).

## Opening the Terminal

### macOS

Open **Terminal** from Applications → Utilities, or search for "Terminal" in Spotlight.

### Windows

You have a few options:

- **Laragon Terminal** — If you use [Laragon](https://laragon.org/), it includes a built-in terminal that is preconfigured with PHP and Composer. Click the **Terminal** button in the Laragon window.
- **Windows Terminal** — Search for "Terminal" in the Start menu. This is the modern terminal app included with Windows 10 and later.
- **WSL (Ubuntu)** — For a Linux-like experience on Windows, install [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install). This gives you a full Ubuntu terminal with native support for PHP, Composer, and DDEV.

### Linux

Open your distribution's terminal emulator, usually found in the system menu or by pressing `Ctrl+Alt+T`.

## Running a Command

A command is a piece of text you type and then press **Enter** to execute. Try this one — it prints your username:

```bash
whoami
```

You should see your computer's username printed on the next line.

## Navigating Directories

Most commands run in the context of a directory (folder). Here are the three commands you will use most:

**See where you are:**

```bash
pwd
```

This prints the full path to your current directory.

**List what is here:**

```bash
ls
```

This shows the files and folders in your current directory. On Windows Command Prompt, use `dir` instead.

**Change directory:**

```bash
cd my-project
```

This moves you into a folder called `my-project`. Use `cd ..` to go up one level.

::: tip
Press the **Up Arrow** key to recall previous commands. Press **Tab** to autocomplete file and folder names. These two shortcuts will save you a lot of typing.
:::

## That is All You Need

You do not need to be a terminal expert to use October CMS. The commands in this guide are simple and we will show you exactly what to type at each step.

## Next Steps

Continue to [Choosing a Text Editor](./editor.md) to set up your code editor.
