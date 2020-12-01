# | media

- [Introduction](#introduction)
- [Using next-gen image types](#next-gen)
- [Replace animated GIFs with video](#animated-images)

<a name="introduction"></a>
## Introduction

The `| media` filter returns an address relative to the public path of the [media manager library](../cms/mediamanager). The result is a URL to the media file specified in the filter parameter.

    <img src="{{ 'banner.jpg' | media }}" />

If the media manager address is __https://cdn.octobercms.com__ the above example would output the following:

    <img src="https://cdn.octobercms.com/banner.jpg" />

<a name="next-gen"></a>
## Using next-gen image types

Next-gen images are smaller than their `.jpg` and `.png` counterparts, usually on the magnitude of a 25–35% reduction in filesize. This decreases page sizes and improves performance.

`WebP` and `AVIF` are excellent replacements for `.jpg`, `.jpeg`, `.png` and `.gif` images. In addition, they offers both lossless and lossy compression. In lossless compression, no data is lost. Lossy compression reduces file size, but at the expense of possibly reducing image quality.

    <picture>
        <source type="image/webp" srcset="{{ 'example.webp' | media }}">
        <source type="image/avif" srcset="{{ 'example.avif' | media }}">
        <img src="{{ 'example.jpg' | media }}" alt="">
    </picture>

<a name="animated-images"></a>
## Replace animated GIFs with video

Replacing GIFs with HTML5 video is a quick and easy way to speed up your site. With HTML5 video, you can reduce the size of GIF content by up to 98% while still retaining the unique qualities of the GIF format in the browser.

    <video autoplay loop muted playsinline>
      <source src="{{ 'my-animation.webm' | media }}" type="video/webm">
      <source src="{{ 'my-animation.mp4' | media }}" type="video/mp4">
    </video>
