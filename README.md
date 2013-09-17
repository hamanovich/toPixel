# toPixel

It's a tiny jquery plugin, that helps you to compare your html page with mockup.

### Usage
-----

Just include this script after jQuery. Requires jQuery 1.4+.
``` html
<script src='jquery.js'></script>
<script src='toPixel/jquery.toPixel.js'></script>
```
Of course omit the first line if you already have jQuery included.
jquery.toPixel.js must be into toPixel folder.

After that, you need to write this code (or put at the end of your custom jquery code):
``` javascript
(function($){
  $("body").toPixel();
})(jQuery)
```

You can use plugin with default options, e.g.:
``` javascript
(function($){
  $("body").toPixel({
    opacity     : 0.5,           // layout opacity  (0 <= opacity <= 1)
    enable      : true,          // show/hide layout (true or false)
    imgPath     : 'layout.jpg',  // path to img (default - toPixel/layout.jpg
    draggable   : false,         // draggable default statement (true or false)
    top         : 0,             // layout top offset (any numbers without 'px')
    left        : 0,             // layout left offset (any numbers without 'px')
    navPosition : 'rightTop'     //  layout bar position:
                                 // (leftTop, rightTop, rightBottom, leftBottom)
  });
})(jQuery)
```

Layout image must be into the folder with jquery.toPixel plugin.
