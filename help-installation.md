# Installation

- [Minimum System Requirements](#system-requirements)
- [Wizard installation](#wizard-installation)
- [Command-line installation](#commaind-line-installation)

There are two ways you can install October, either using the Wizard or Command-line installation process.
Before you proceed, you should check that your server meets the minimum system requirements.

<a name="system-requirements" class="anchor" href="#system-requirements"></a>
## Minimum System Requirements

October CMS has a few system requirements:

* PHP 5.4 or higher with **safe_mode** restrictions disabled
* PDO PHP Extension
* cURL PHP Extension
* MCrypt PHP Extension
* ZipArchive PHP Library
* GD PHP Library
* mod_rewrite installed and AllowOverride turned on (or your server's equivalent)

As of PHP 5.5, some OS distributions may require you to manually install the PHP JSON extension.
When using Ubuntu, this can be done via ``apt-get install php5-json``.

<a name="wizard-installation" class="anchor" href="#wizard-installation"></a>
## Wizard installation

The wizard installation is a recommended way to install October. It is simpler than the command-line installation and doesn't require any special skills.

1. Prepare a directory on your server that is empty. It can be a sub-directory, domain root or a sub-domain.
1. [Download the installer archive file](https://github.com/octobercms/install/archive/master.zip).
1. Unpack the installer archive to the prepared directory.
1. Grant writing permissions on the installation directory and all its subdirectories and files.
1. Navigate to the install.php script in your web browser.
1. Follow the installation instructions.

### Troubleshooting installation

* **The page appears empty when opening the installer**: This might be caused by using older versions of PHP, check that you are running PHP version 5.4 or higher.

<a name="command-line-installation" class="anchor" href="#command-line-installation"></a>
## Command-line installation

If you feel more comfortable with a command-line, there is a CLI install process on the [Console interface page](console#console-install).