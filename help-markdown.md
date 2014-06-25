# Markdown Syntax

- [Tables](#tables)
- [Embedded videos](#videos)

HTML syntax is not allowed in any content provided by users on the OctoberCMS website. Please use [Markdown syntax](http://daringfireball.net/projects/markdown/syntax) extended with [Markdown Extra features](https://michelf.ca/projects/php-markdown/extra/) and some features we added.

<a name="tables" class="anchor" href="#tables"></a>
##Tables

Tables can be inserted with the following syntax:


````
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
````

You can create a table without a header if you omit the header text:

````
 | 
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
````

<a name="videos" class="anchor" href="#videos"></a>
##Embedded videos

You can embed videos from YouTube and Vimeo using the `!![video-size](video-url)` syntax. The `video-url` parameter should point to the video player file, for example: //player.vimeo.com/video/0000000 or //www.youtube.com/embed/absd1234. The `video-size` parameter should specify the video width and height: 500x281. Embedded videos are responsive and providing a correct size is important. You can copy the file URL, width and height from the iframe definition in the video embedding code provided by YouTube or Vimeo. For example, consider the following YouTube embedding code:

````
<iframe width="560" height="315" src="//www.youtube.com/embed/5xK8RK54IAc" frameborder="0" allowfullscreen></iframe>
````

The corresponding October Markdown code looks like this:

````
!![560x315](//www.youtube.com/embed/5xK8RK54IAc)
````