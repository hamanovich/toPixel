(function ($) {
    $.fn.toPixel = function (options) {
        var settings = $.extend({
            opacity: 0.5,           // layout opacity  (0 <= opacity <= 1)
            enable: true,           // show/hide layout (true or false)
            imgPath: 'layout.jpg',  // path to img
            draggable : false,      // draggable default statement (true or false)
            top: 0,                 // layout top offset
            left: 0,                // layout left offset
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
                win = $(window),
                layoutImg = '<img alt="'+settings.imgPath.slice(0,-4)+'" src="toPixel/'+settings.imgPath+'" id="layoutImg">',
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
                "<div><label>draggable? <input type='checkbox' id='pp-drag'></label></div>" +
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
                        ppinptTop : $('#ppinpt-top'),
                        ppDrag : $('#pp-drag')
                    }
                },
                ppOpacity = ppNavWrap.ppOpacity,
                ppOffset = ppNavWrap.ppOffset,
                ppInpt = ppNavWrap.ppInpt,
                ppLeft = ppInpt.ppinptLeft,
                ppTop = ppInpt.ppinptTop,
                ppDrag = ppInpt.ppDrag,
                navPos = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom'],
                layoutID = $('#layoutImg'),

                defTopPos = getCookie('top') ? getCookie('top') : settings.top,
				defLeftPos = getCookie('left') ? getCookie('left') : settings.left,
				defOpacity = getCookie('opacity') ? getCookie('opacity') : settings.opacity;

            win.load(function(){   // after load document
                // #pp-layout insert and make style
                layoutDiv.prepend(layoutImg);

                // apply default css styles
                layoutDiv.css({
                    'top' : defTopPos + "px",
                    'opacity' : defOpacity,
                    'left' : defLeftPos + "px",
                    'z-index' : 9999,
                    'position' : 'absolute',
                    'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + parseFloat(defOpacity) * 100 + ')',
                    'filter': 'alpha(opacity=' + parseFloat(defOpacity) * 100 + ')'
                });

                // prevent default action for all links into layout wrapper
                ppNavWrap.ppNav.find('a').click(function (e) {
                    e.preventDefault();
                });

                if (settings.enable) {   // if layout switch on

                    // switch on/off function
                    ppNavWrap.ppToggle.on('click', function (e) {
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
                    ppOpacity.ppMore.on('click', function () {
                        if (parseFloat(getCookie('opacity')) < 1) {
                            settings.opacity = parseFloat(getCookie('opacity')) + 0.1;
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
                            });
                        }
                    });

                    // less opacity
                    ppOpacity.ppLess.on('click', function () {
                        if (parseFloat(getCookie('opacity')) > 0) {
                            settings.opacity = parseFloat(getCookie('opacity')) - 0.1;

                            layoutDiv.css({
                                'opacity': settings.opacity,
                                'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + settings.opacity * 100 + ')',
                                'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
                            });

                        } else {
                            layoutDiv.css({
                                'opacity': settings.opacity,
                                'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + settings.opacity * 100 + ')',
                                'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
                            });
                        }
                    });

                    // top++ position
                    ppTop.val(defTopPos);

                    ppOffset.ppTop.on('click', function () {
                        valTop =  parseInt(layoutDiv.css('top'));
                        valTop += 1;
                        layoutDiv.css('top', valTop);
                        ppInpt.ppinptTop.val(valTop);
                    });

                    // top blur input
                    ppInpt.ppinptTop.on('change', function(){
                        if (ppInpt.ppinptTop.val() !== '' && ppInpt.ppinptTop)
                            valTop =  parseInt(ppInpt.ppinptTop.val());
                        else valTop = 0;

                        layoutDiv.css('top', valTop);
                        ppInpt.ppinptTop.val(valTop);
                    });

                    // top-- position
                    ppOffset.ppBottom.on('click', function () {
                        valTop =  parseInt(layoutDiv.css('top'));
                        valTop -= 1;
                        layoutDiv.css('top', valTop);
                        ppInpt.ppinptTop.val(valTop);
                    });

                    // left++ position

                    ppLeft.val(defLeftPos);

                    ppOffset.ppLeft.on('click', function () {
                        layoutLeft = parseInt(layoutDiv.css('left'));
                        layoutLeft += 1;
                        layoutDiv.css('left', layoutLeft);
                        ppInpt.ppinptLeft.val(parseInt(layoutLeft));
                    });

                    // ppLeft blur input
                    ppInpt.ppinptLeft.on('change', function(){
                        if (ppInpt.ppinptLeft.val() !== '' && ppInpt.ppinptLeft)
                            layoutLeft =  parseInt(ppInpt.ppinptLeft.val());
                        else layoutLeft = 0;

                        layoutDiv.css('left', layoutLeft);
                        ppInpt.ppinptLeft.val(layoutLeft);
                    });

                    // left-- position
                    ppOffset.ppRight.click(function () {
                        layoutLeft = parseInt(layoutDiv.css('left'));
                        layoutLeft -= 1;
                        layoutDiv.css('left', layoutLeft);
                        ppInpt.ppinptLeft.val(parseInt(layoutLeft));
                    });

                }  else ppNavWrap.ppNav.hide(); // hide navbar

                // #pp-layout show toggle
                if (settings.enable) {
                    layoutDiv.on('mouseenter', function () {
                        var $this = $(this);
                        if (!$this.hasClass('check-drag'))
                            $this.hide();
                    });
                    ppNavWrap.ppNav.on('mouseenter', function () {
                         if (settings.enable)
                             layoutDiv.show();
                    });
                    html.on('mouseleave', function () {
                        if (settings.enable)
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
                };

                //get and set Cookies
                ppOpacity.ppMore.on('click', setCookie);
                ppOpacity.ppLess.on('click', setCookie);
                ppLeft.on('change', setCookie);
                ppTop.on('change', setCookie);
                ppOffset.ppLeft.on('click', setCookie);
                ppOffset.ppRight.on('click', setCookie);
                ppOffset.ppTop.on('click', setCookie);
                ppOffset.ppBottom.on('click', setCookie);
            });

            // cookie functions
            function setCookie(){  // install cookie (Left, Top position and opacity)
                document.cookie = 'left=' + encodeURIComponent(ppLeft.val()) + '; max-age=' + (24*60*60);
                document.cookie = 'top=' + encodeURIComponent(ppTop.val()) + '; max-age=' + (24*60*60);
                document.cookie = 'opacity=' + encodeURIComponent(parseFloat(settings.opacity.toFixed(1) + 0.1)) + '; max-age=' + (24*60*60);
            };

           function getCookie(name) { // get cookie function
                var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            };

            $.fn.drags = function(opt) {
                opt = $.extend({handle:"",cursor:"move"}, opt);

                if(opt.handle === "") {
                    var $el = this;
                } else {
                    var $el = this.find(opt.handle);
                }

                return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
                    if(opt.handle === "") {
                        var $drag = $(this).addClass('draggable');
                    } else {
                        var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
                    }
                    var z_idx = $drag.css('z-index'),
                        drg_h = $drag.outerHeight(),
                        drg_w = $drag.outerWidth(),
                        pos_y = $drag.offset().top + drg_h - e.pageY,
                        pos_x = $drag.offset().left + drg_w - e.pageX;

                    $drag.css('z-index', 1000).parents().on("mousemove", function(e) {

                        ppLeft.val(parseInt($drag.css('left')));
                        ppTop.val(parseInt($drag.css('top')));

                        $('.draggable').offset({
                            top:e.pageY + pos_y - drg_h,
                            left:e.pageX + pos_x - drg_w
                        }).on("mouseup", function() {
                                $(this).removeClass('draggable').css('z-index', z_idx);
                            });
                    });

                    e.preventDefault(); // disable selection
                }).on("mouseup", function() {
                    if(opt.handle === "") {
                        $(this).removeClass('draggable');
                    } else {
                        $(this).removeClass('active-handle').parent().removeClass('draggable');
                    }

                    setCookie();
                });

            };

            ppDrag.on('click', function(){
                // draggable function
                if ($(this).filter(':checked').size() > 0){
                    layoutDiv.addClass('check-drag');
                } else {
                    layoutDiv.removeClass('check-drag');
                }

                layoutDiv.drags(); // launch draggable

            });

            if (settings.draggable){
                layoutDiv.addClass('check-drag');
                ppDrag.attr('checked', 'checked');
                layoutDiv.drags();
            };

            // keyboard navigation
            win.on('keydown', function (e) {
                var code = e.keyCode;
                if (code === 37) {
                    ppInpt.ppinptLeft.val(+ppInpt.ppinptLeft.val()-1);
                    layoutDiv.css('left', +ppInpt.ppinptLeft.val()-1);
                    setCookie();
                } else if (code === 38) {
                    ppInpt.ppinptTop.val(+ppInpt.ppinptTop.val()+1);
                    layoutDiv.css('top', +ppInpt.ppinptTop.val()+1);
                    setCookie();
                } else if (code === 39) {
                    ppInpt.ppinptLeft.val(+ppInpt.ppinptLeft.val()+1);
                    layoutDiv.css('left', +ppInpt.ppinptLeft.val()+1);
                    setCookie();
                } else if (code === 40 || ( code === 40 && e.shiftKey) ) {
                    ppInpt.ppinptTop.val(+ppInpt.ppinptTop.val()-1);
                    layoutDiv.css('top', +ppInpt.ppinptTop.val()-1);
                    setCookie();
                } else if ( code === 69 && e.shiftKey ) {
                    if (settings.enable) {
                        settings.enable = false;
                        layoutDiv.hide();
                        ppNavWrap.ppToggle.text('switch on');
                    } else {
                        settings.enable = true;
                        layoutDiv.show();
                        ppNavWrap.ppToggle.text('switch off');
                    }
                }
            });

            // css styles in js
            ppNavWrap.ppNav.css({
                'position' : 'fixed',
                'right' : 0,
                'top' : 0,
                'font-family' : 'sans-serif',
                'font-size' : '12px',
                'border' : '1px solid #e7e7e7',
                'background-color' : '#f2f2f2',
                'padding' : '10px 10px 5px',
                'margin' : '10px',
                'line-height' : '20px',
                'width' : '100px',
                'z-index' : 9999
            });
            ppNavWrap.ppNav.find('a').css({
                'color' : '#464646'
            });
            ppNavWrap.ppNav.find('>div').css({
                'margin' : '5px 0'
            });
            ppNavWrap.ppNav.find('h6').css({
                'font-size' : '12px',
                'margin' : '0 0 8px',
                'text-align' : 'center',
                'padding' : 0
            });
            ppNavWrap.ppOffset.ppOffsetDiv.find('>div>span').css({
                'margin' : '0 5px'
            });
            ppNavWrap.ppOpacity.ppOpacityDiv.find('>div>span').css({
                'margin' : '0 5px'
            });
            ppNavWrap.ppOffset.ppOffsetDiv.find('>span').css({
                'display' : 'block',
                'font-weight' : 'bold'
            });
            ppNavWrap.ppOpacity.ppOpacityDiv.find('>span:first-child').css({
                'display' : 'block',
                'font-weight' : 'bold'
            });
            ppNavWrap.ppNav.find('input[type="text"]').css({
                'width' : '100%',
                'text-align' : 'center',
                'margin' : '5px 0',
                'font-size' : '11px',
                'font-family' : 'sans-serif',
                'padding' : 0,
                'border' : '1px solid',
                'line-height' : '18px',
                'height' : '18px',
                'background-color' : '#fff'
            });
            ppNavWrap.ppNav.find('input[type="checkbox"]').css({
                'vertical-align' : 'middle',
                'position' : 'relative',
                'top' : -1
            });

        });
    };
})(jQuery);
