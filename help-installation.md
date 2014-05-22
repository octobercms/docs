# Installation

- [Minimum System Requirements](#system-requirements)
- [Wizard installation](#wizard-installation)
- [Command-line installation](#commaind-line-installation)
- [Webserver configuration](#webserver-configuration)

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

<a name="wizard-installation" class="anchor" href="#webserver-configuration"></a>
## Webserver configuration

### Lighttpd configuration
If you your webserver is running Lighttpd you can use the following configuratiob to run OctoberCMS.

Open your site configuration file with your favorite editor.

``nano /etc/lighttpd/conf-enabled/sites.conf``

Paste the following code in the editor and change the **host address** and  **server.document-root** to match your project.

```lua
$HTTP["host"] =~ "example.domain.com" {
        server.document-root = "/var/www/example/"

        url.rewrite-once = (
                "^/modules/(system|backend|cms)/([a-zA-Z0-9]+/[a-zA-Z0-9]+/|/|)assets/(vendor/.*|css|js|javascript|less|images|font(s|)).*\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff.*|ttf)$" => "$0",
                "^/(system|themes/[a-zA-Z0-9]+)/assets/(vendor/.*|css|js|javascript|less|images|fonts).*\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)$" => "$0",
                "^/(favicon\.ico|robots\.txt|sitemap\.xml)$" => "$0",
                "^/[^\?]*(\?.*)?$" => "index.php/$1",
        )
}
```