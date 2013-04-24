(function ($) {
    $.fn.toPixel = function (options) {
        var settings = $.extend({
            opacity: 0.5,           // layout opacity  (0 <= opacity <= 1)
            enable: true,           // show/hide layout (true or false)
            imgPath: 'layout.jpg',  // path to img
            top: 0,                 // layout top offset
            left: '50%',            // layout left offset in %
            navPosition: 'rightTop' //  layout bar position:
                                    // (leftTop, rightTop, rightBottom, leftBottom)
        }, options);

        return this.each(function () {
            if (options) {
                $.extend(settings, options);
            }
            var layout = "<div id='pp-layout'/>",
                html = $('html'),
                body = $('body'),
                layoutImg = '<img alt="'+settings.imgPath.slice(0,-4)+'" src="pp/' + settings.imgPath + '">',
                valTop,
                layoutLeft;

            // #pp-nav: creating template
            body.prepend(layout, "<div id='pp-nav'>" +
                "<h6 id='pp-h6'>Layout bar</h6>" +
                "<a href='#' id='pp-toggle'>switch off</a>" +
                "<div id='pp-opacity'>" +
                "<span>opacity:</span> <a href='#' id='pp-more'>more</a> " +
                "<span>or</span> <a href='#' id='pp-less'>less</a></div>" +
                "<div id='pp-offset'>" +
                "<span>layout position:</span>" +
                "<div><a href='#' id='pp-left'>left++</a>" +
                "<span>or</span><a href='#' id='pp-right'>left--</a>" +
                "<input type='text' id='ppinpt-left' value='0' placeholder='left pos'></div>" +
                "<div><a href='#' id='pp-top'>top++</a>" +
                "<span>or</span><a href='#' id='pp-bottom'>top--</a>" +
                "<input type='text' id='ppinpt-top' value='0' placeholder='top pos'></div>" +
                "</div>" +
                "</div>");

            var layoutDiv = $('#pp-layout'),
                ppNavWrap = {
                    ppNav : $('#pp-nav'),
                    ppToggle : $('#pp-toggle'),
                    ppOpacity : {
                        ppOpacityDiv : $('#pp-opacity'),
                        ppMore : $('#pp-more'),
                        ppLess : $('#pp-less')
                    },
                    ppOffset : {
                        ppOffsetDiv : $('#pp-offset'),
                        ppLeft : $('#pp-left'),
                        ppRight : $('#pp-right'),
                        ppTop : $('#pp-top'),
                        ppBottom : $('#pp-bottom')
                    },
                    ppInpt : {
                        ppinptLeft : $('#ppinpt-left'),
                        ppinptTop : $('#ppinpt-top')
                    }
                },
                ppOpacity = ppNavWrap.ppOpacity,
                ppOffset = ppNavWrap.ppOffset,
                ppInpt = ppNavWrap.ppInpt,
                navPos = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom'];

            // #pp-layout insert and make style
            layoutDiv.prepend(layoutImg);

            // apply default css styles
            layoutDiv.css({
                'margin-left': -layoutDiv.find('img').width() / 2,
                'opacity': settings.opacity,
                'left' : settings.left,
                'top' : settings.top,
                'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + settings.opacity * 100 + ')',
                'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
            });

            // prevent default action for all links into layout wrapper
            ppNavWrap.ppNav.find('a').click(function (e) {
                e.preventDefault();
            });

            if (settings.enable) {   // if layout switch on

                // switch on/off function
                ppNavWrap.ppToggle.click(function (e) {
                    if (settings.enable) {
                        settings.enable = false;
                        layoutDiv.hide();
                        ppNavWrap.ppToggle.text('switch on');
                    } else {
                        settings.enable = true;
                        layoutDiv.show();
                        ppNavWrap.ppToggle.text('switch off');
                    }
                });

                // more opacity
                ppOpacity.ppMore.click(function () {
                    if (parseFloat(settings.opacity.toFixed(1)) < 1) {
                        settings.opacity = parseFloat(settings.opacity.toFixed(1)) + 0.1;
                        layoutDiv.css({
                            'opacity': settings.opacity,
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + settings.opacity * 100 + ')',
                            'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
                        });

                    } else {
                        layoutDiv.css({
                            'opacity': 1,
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 + ')',
                            'filter': 'alpha(opacity=' + 100 + ')'
                        })
                    }
                });

                // less opacity
                ppOpacity.ppLess.click(function () {
                    if (parseFloat(settings.opacity.toFixed(1)) > 0) {
                        settings.opacity = parseFloat(settings.opacity.toFixed(1)) - 0.1;
                        layoutDiv.css({
                            'opacity': settings.opacity,
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + settings.opacity * 100 + ')',
                            'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
                        });

                    } else {
                        layoutDiv.css({
                            'opacity': 0,
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')',
                            'filter': 'alpha(opacity=' + 0 + ')'
                        })
                    }
                });

                // top++ position
                ppInpt.ppinptTop.val(parseInt(layoutDiv.css('top'))+"px");

                ppOffset.ppTop.click(function () {
                    valTop =  parseInt(ppInpt.ppinptTop.val());
                    valTop += 1;
                    layoutDiv.css('top', valTop);
                    ppInpt.ppinptTop.val(valTop+"px");
                });

                // top blur input
                ppInpt.ppinptTop.blur(function(){
                    valTop =  parseInt(ppInpt.ppinptTop.val());
                    layoutDiv.css('top', valTop);
                    ppInpt.ppinptTop.val(valTop+"px")
                });

                // top-- position
                ppOffset.ppBottom.click(function () {
                    valTop =  parseInt(ppInpt.ppinptTop.val());
                    valTop -= 1;
                    layoutDiv.css('top', valTop);
                    ppInpt.ppinptTop.val(valTop+"px");
                });

                // left++ position
                ppInpt.ppinptLeft.val(parseInt(layoutDiv.css('margin-left'))+"px");

                ppOffset.ppLeft.click(function () {
                    layoutLeft = parseInt(layoutDiv.css('margin-left'));
                    layoutLeft += 1;
                    layoutDiv.css('margin-left', layoutLeft);
                    ppInpt.ppinptLeft.val(parseInt(layoutLeft)+"px");
                });

                // ppLeft blur input
                ppInpt.ppinptLeft.blur(function(){
                    layoutLeft =  parseInt(ppInpt.ppinptLeft.val());
                    layoutDiv.css('margin-left', layoutLeft);
                    ppInpt.ppinptLeft.val(layoutLeft+"px")
                });

                // left-- position
                ppOffset.ppRight.click(function () {
                    layoutLeft = parseInt(layoutDiv.css('margin-left'));
                    layoutLeft -= 1;
                    layoutDiv.css('margin-left', layoutLeft);
                    ppInpt.ppinptLeft.val(parseInt(layoutLeft)+"px");
                });
            }

            // #pp-layout show toggle
            if (settings.enable) {
                layoutDiv.mouseenter(function () {
                    var $this = $(this);
                    $this.hide();
                });
                ppNavWrap.ppNav.mouseenter(function () {
                    layoutDiv.show();
                });
                html.mouseleave(function () {
                    layoutDiv.show();
                });
            } else layoutDiv.hide();

            // #pp-nav position
            switch (settings.navPosition) {
                case navPos[0]:   // 'leftTop' position
                    ppNavWrap.ppNav.css({
                        left: 0,
                        top: 0,
                        right: 'auto'
                    });
                    break
                case navPos[2]:  // 'bottomLeft' position
                    ppNavWrap.ppNav.css({
                        left: 0,
                        right: 'auto',
                        bottom: 0,
                        top: 'auto'
                    });
                    break
                case navPos[3]: // 'bottomRight' position
                    ppNavWrap.ppNav.css({
                        left: 'auto',
                        right: 0,
                        bottom: 0,
                        top: 'auto'
                    });
                    break
                default: // 'topRight' position (default)
                    ppNavWrap.ppNav.css({
                        right: 0,
                        top: 0,
                        left: 'auto'
                    });
            }
        });
    };
})(jQuery);