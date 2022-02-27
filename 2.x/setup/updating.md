# Upgrade Guide

## Updating to v2.0

Please observe the following guides when performing the upgrade.

- [October CMS v2.0 Upgrade Guide](https://octobercms.com/support/article/rn-13)
- [Laravel v6.0 LTS Upgrade Guide](https://octobercms.com/support/article/rn-11)
- [October CMS v2.1 Stable Release](https://octobercms.com/support/article/rn-27)

## Updating to v3.0 (Beta)

If there is a requirement to use PHP 8.1 you may use the following guide to upgrade to a beta copy of October CMS version 3.

- [October CMS 3.0 Beta - Early Access](https://octobercms.com/support/article/rn-28)

#### Using the Deploy Plugin to Upgrade

If want to upgrade a v1 website to use v2, you may use the [official deployment plugin](https://octobercms.com/plugin/rainlab-deploy) as a solution to upgrading your website. Always **take a complete site backup** before performing these steps.

1. Install or upgrade to October CMS v2 locally on your machine
2. Deploy the Beacon files to the v1 site you want to upgrade
3. The Deploy plugin will attempt to upgrade the site during its first deployment

## Bleeding Edge Updates

The October CMS platform is updated all the time and may contain a recent bug fix that won't be available until a new version is created. If you'd like to use the bleeding edge version of October CMS, simply target the `develop` branch in your composer file.

    "october/all": "dev-develop",
    "october/rain": "dev-develop",

> **Note**: This naming convention may also apply to some plugins and themes.
