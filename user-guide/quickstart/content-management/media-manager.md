---
subtitle: "Uploading, organizing, and using images and files"
---
# Media Manager

Every website needs images, documents, and other files. The Media Manager is October CMS's built-in file management system that gives you a central place to upload, organize, and browse all of your media assets. Whether you are adding a hero image to a blog post, attaching a PDF to a page, or organizing photos into albums, the Media Manager handles it all.

## Accessing the Media Manager

You can find the Media Manager in two places:

- **From the backend sidebar** — Click on **Media** in the main navigation to open the full Media Manager interface.
- **From content editors** — When editing an entry and clicking the image or file insert button in the rich text editor, a smaller version of the Media Manager appears as a popup.

The full Media Manager interface gives you a file-browser experience with a folder tree on the left, your files displayed in the main area, and upload controls at the top.

## Uploading Files

Getting files into the Media Manager is straightforward. You have two options:

- **Drag and drop** — Drag files from your computer directly into the Media Manager window. You can upload multiple files at once by selecting several files and dragging them together.
- **Browse button** — Click the **Upload** button in the toolbar and use the file browser to select files from your computer.

Uploaded files are stored on your server (or on a cloud storage provider if one is configured) and are immediately available for use across your site.

### Supported File Types

The Media Manager supports a wide range of file types:

- **Images** — JPG, PNG, GIF, SVG, WebP, and other common image formats
- **Documents** — PDF, DOC, DOCX, XLS, XLSX, PPT, and other document formats
- **Audio** — MP3, WAV, OGG, and other audio files
- **Video** — MP4, WebM, MOV, and other video files

::: warning
The specific file types allowed may be restricted by your site administrator for security reasons. If you are unable to upload a certain file type, check with your administrator to see if it has been blocked.
:::

## Organizing with Folders

As your media library grows, keeping files organized becomes essential. The Media Manager lets you create folders and subfolders to structure your files logically.

To create a new folder:

1. Navigate to the location where you want the new folder.
2. Click the **New Folder** button in the toolbar.
3. Give the folder a descriptive name and confirm.

::: tip
Plan your folder structure early and stick with it. A logical structure — like organizing by content type (`/blog/`, `/team/`, `/products/`) or by purpose (`/images/`, `/documents/`, `/downloads/`) — saves you significant time when you need to find files later.
:::

You can move files between folders by selecting them and using the move option, or by dragging them into a different folder.

## Inserting Media into Content

One of the most common tasks is inserting images or files into your content while editing an entry.

### Images in the Rich Editor

When using the rich text editor (richeditor field), you can insert images directly:

1. Place your cursor where you want the image to appear.
2. Click the **image** button in the editor toolbar.
3. The Media Manager popup opens — browse or search for your image.
4. Select the image and confirm. It will be inserted into your content.

### File Links in the Rich Editor

To link to a document or other file:

1. Select the text you want to turn into a download link.
2. Click the **link** button in the editor toolbar.
3. Choose the option to link to a media file.
4. Browse the Media Manager and select your file.

### File Upload Fields

If your blueprint includes a `fileupload` field (for example, a featured image), you can upload files directly into that field without going through the Media Manager. These files are attached to the specific entry and managed separately from the shared media library.

## Using Media in Templates

When building your site's theme, you will want to display media files in your Twig templates. October CMS provides the `|media` filter to generate the correct URL for any file in the Media Manager.

```twig
<img src="{{ 'banners/hero.jpg' | media }}" alt="Hero Banner">
```

The `|media` filter takes the path relative to your media storage root and converts it to a full URL that works on your site.

### Image Resizing

Serving full-size images to every visitor wastes bandwidth and slows down your site. The `|resize` filter lets you generate resized versions of images on the fly:

```twig
<img src="{{ 'banners/hero.jpg' | media | resize(800, 600) }}" alt="Hero Banner">
```

This creates an 800x600 pixel version of the image. The resized version is cached, so it is only generated once — subsequent page loads serve the cached version instantly.

You can also resize with only a width or height to maintain the aspect ratio:

```twig
<!-- Resize to 400px wide, height calculated automatically -->
<img src="{{ 'photos/team.jpg' | media | resize(400, false) }}" alt="Team Photo">
```

::: aside
Image resizing happens server-side and the results are cached for performance. You do not need to worry about resizing slowing down your pages after the first load.
:::

## Managing Files

Beyond uploading, the Media Manager gives you several tools for managing your files:

- **Rename** — Right-click on a file or folder to rename it. Keep in mind that renaming a file will break any existing links to it in your content.
- **Delete** — Select one or more files and click the delete button to remove them. Deleted files cannot be recovered, so be careful.
- **Move** — Move files to different folders to keep your library organized.
- **Search** — Use the search box to find files by name, which is especially useful in large media libraries.

## Best Practices

- **Use descriptive file names** — Name your files something meaningful like `team-photo-2025.jpg` rather than `IMG_4392.jpg`. This makes them much easier to find later.
- **Optimize images before uploading** — While the `|resize` filter helps on the frontend, uploading already-optimized images reduces storage usage and speeds up the backend.
- **Create a consistent folder structure** — Decide on a folder organization early and make sure everyone on your team follows it.
- **Clean up unused files** — Periodically review your media library and remove files that are no longer used on your site. This keeps the library manageable and reduces storage costs.

## Next Steps

With content management and media handling covered, you are well equipped to manage the content side of your October CMS site. To learn how to display this content on the frontend, continue to the Themes section of this guide.

For the full technical reference on media storage configuration and advanced options, see the [Media Manager](../../../4.x/cms/media/introduction.md) developer documentation.
