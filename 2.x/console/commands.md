# Command List

October CMS includes several command-line interface (CLI) commands and utilities that allow you to manage various aspects of the platform, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development.md) or speed up development with the provided [scaffolding commands](../console/scaffolding.md).

## Setup & Maintenance

### Change Backend User Password

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

    php artisan october:passwd username password

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.


## Utilities

October CMS includes a number of utility commands.

### Clear Application Cache

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

### Remove Demo Data

`october:fresh` - removes the demo theme and plugin that ships with October CMS.

    php artisan october:fresh

### Mirror Public Directory

`october:mirror` - will mirror all asset and resource files to the [public folder](../setup/deployment.md#oc-public-folder) using symbolic linking.

    php artisan october:mirror

If you want to specify a custom folder, you can pass it as the second argument, which is relative to the base directory.

    php artisan october:mirror mypublicfolder

### Miscellaneous Commands

`october:util` - a generic command to perform general utility tasks, such as cleaning up files or combining files. The arguments passed to this command will determine the task used.

#### Compile Assets

Outputs combined system files for JavaScript (js), StyleSheets (less), client side language (lang), or everything (assets).

    php artisan october:util compile assets
    php artisan october:util compile lang
    php artisan october:util compile js
    php artisan october:util compile less

To combine without minification, pass the `--debug` option.

    php artisan october:util compile js --debug

#### Pull All Repos

This will execute the command `git pull` on all theme and plugin directories.

    php artisan october:util git pull

#### Purge Thumbnails

Deletes all generated thumbnails in the uploads directory.

    php artisan october:util purge thumbs

#### Purge Uploads

Deletes files in the uploads directory that do not exist in the `system_files` table.

    php artisan october:util purge uploads

#### Purge Orphans

Deletes records in `system_files` table that do not belong to any other model.

    php artisan october:util purge orphans
