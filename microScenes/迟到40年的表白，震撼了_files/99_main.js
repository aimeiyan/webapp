/**
 *  全局函数处理
 *  -----------------------------
 *  作者：叼怎么写！- -||
 *  时间：2014-03-26
 *  准则：Zpote、字面量对象
 *  联系：wechat--shoe11414255
 *  一张网页，要经历怎样的过程，才能抵达用户面前
 *  一个特效，要经历这样的修改，才能让用户点个赞
 *  一个产品，创意源于生活，源于内心，需要慢慢品味
 *********************************************************************************************/
var slider = {
    /****************************************************************************************************/
    /*  对象私有变量/函数返回值/通用处理函数
     *****************************************************************************************************/
    /*************************
     *  = 对象变量，判断函数
     *************************/
    _events: {},									// 自定义事件---this._execEvent('scrollStart');
    _windowHeight: $(window).height(),					// 设备屏幕高度
    _windowWidth: $(window).width(),

    _rotateNode: $('.p-ct'),							// 旋转体

    _page: $('.m-page'),							// 模版页面切换的页面集合
    _pageNum: $('.m-page').size(),					// 模版页面的个数
    _pageNow: 0,									// 页面当前的index数
    _pageNext: null,									// 页面下一个的index数

    _touchStartValY: 0,									// 触摸开始获取的第一个值
    _touchDeltaY: 0,									// 滑动的距离

    _moveStart: true,									// 触摸移动是否开始
    _movePosition: null,									// 触摸移动的方向（上、下）
    _movePosition_c: null,									// 触摸移动的方向的控制
    _mouseDown: false,								// 判断鼠标是否按下
    _moveFirst: true,
    _moveInit: false,

    _firstChange: false,

    _audioNode: $('.u-audio'),						// 声音模块
    _audio: null,									// 声音对象
    _audio_val: true,									// 声音是否开启控制

    _elementStyle: document.createElement('div').style,	// css属性保存对象

    _isload: false,//是否加载音乐
    _audio_src: "", //音乐url

    /***********************
     *  = gobal通用函数
     ***********************/
    // 判断函数是否是null空值
    _isOwnEmpty: function (obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    },

    // 判断浏览器内核类型
    _vendor: function () {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in this._elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
        }
        return false;
    },
    // 判断浏览器来适配css属性值
    _prefixStyle: function (style) {
        if (this._vendor() === false) return false;
        if (this._vendor() === '') return style;
        return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
    },
    // 判断是否支持css transform-3d（需要测试下面属性支持）
    _hasPerspective: function () {
        var ret = this._prefixStyle('perspective') in this._elementStyle;
        if (ret && 'webkitPerspective' in this._elementStyle) {
            this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return !!ret;
    },
    _translateZ: function () {
        if (slider._hasPerspective) {
            return ' translateZ(0)';
        } else {
            return '';
        }
    },

    // 判断属性支持是否
    _injectStyles: function (rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow,
            div = document.createElement('div'),
            body = document.body,
            fakeBody = body || document.createElement('body'),
            mod = 'modernizr';

        if (parseInt(nodes, 10)) {
            while (nodes--) {
                node = document.createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }

        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
            fakeBody.style.background = '';
            fakeBody.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(fakeBody);
        }

        ret = callback(div, rule);
        if (!body) {
            fakeBody.parentNode.removeChild(fakeBody);
            docElement.style.overflow = docOverflow;
        } else {
            div.parentNode.removeChild(div);
        }

        return !!ret;
    },
    // 自定义事件操作
    _handleEvent: function (type) {
        if (!this._events[type]) {
            return;
        }

        var i = 0,
            l = this._events[type].length;

        if (!l) {
            return;
        }

        for (; i < l; i++) {
            this._events[type][i].apply(this, [].slice.call(arguments, 1));
        }
    },
    // 给自定义事件绑定函数
    _on: function (type, fn) {
        if (!this._events[type]) {
            this._events[type] = [];
        }

        this._events[type].push(fn);
    },
    //禁止滚动条
    _scrollStop: function () {
        //禁止滚动
        $(window).on('touchmove.scroll', this._scrollControl);
        $(window).on('scroll.scroll', this._scrollControl);
    },
    //启动滚动条
    _scrollStart: function () {
        //开启屏幕禁止
        $(window).off('touchmove.scroll');
        $(window).off('scroll.scroll');
    },
    //滚动条控制事件
    _scrollControl: function (e) {
        e.preventDefault();
    },

    /**************************************************************************************************************/
    /*  关联处理函数
     ***************************************************************************************************************/
    /**
     *  单页面-m-page 切换的函数处理
     *  -->绑定事件
     *  -->事件处理函数
     *  -->事件回调函数
     *  -->事件关联函数【
     */
    // 页面切换开始
    page_start: function () {
        slider._page.on('touchstart mousedown', slider.page_touch_start);
        slider._page.on('touchmove mousemove', slider.page_touch_move);
        slider._page.on('touchend mouseup', slider.page_touch_end);
    },

    // 页面切换停止
    page_stop: function () {
        slider._page.off('touchstart mousedown');
        slider._page.off('touchmove mousemove');
        slider._page.off('touchend mouseup');
    },

    // page触摸移动start
    page_touch_start: function (e) {
        if (!slider._moveStart) return;

        if (e.type == "touchstart") {
            slider._touchStartValY = window.event.touches[0].pageY;
        } else {
            slider._touchStartValY = e.pageY || e.y;
            slider._mouseDown = true;
        }

        slider._moveInit = true;

        // start事件
        slider._handleEvent('start');
    },

    // page触摸移动move
    page_touch_move: function (e) {
        e.preventDefault();

        if (!slider._moveStart) return;
        if (!slider._moveInit) return;

        // 设置变量值
        var $self = slider._page.eq(slider._pageNow),
            h = parseInt($self.height()),
            moveP,
//            scrollTop,
            node = null,
            move = false;

        // 获取移动的值
        if (e.type == "touchmove") {
            moveP = window.event.touches[0].pageY;
            move = true;
        } else {
            if (slider._mouseDown) {
                moveP = e.pageY || e.y;
                move = true;
            } else return;
        }

        // 获取下次活动的page
        node = slider.page_position(e, moveP, $self);

        // page页面移动
        slider.page_translate(node);

        // move事件
        slider._handleEvent('move');

    },

    // page触摸移动判断方向
    page_position: function (e, moveP, $self) {
        var now, next;

        // 设置移动的距离
        if (moveP != 'undefined') slider._touchDeltaY = moveP - slider._touchStartValY;

        // 设置移动方向
        slider._movePosition = moveP - slider._touchStartValY > 0 ? 'down' : 'up';
        if (slider._movePosition != slider._movePosition_c) {
            slider._moveFirst = true;
            slider._movePosition_c = slider._movePosition;
        } else {
            slider._moveFirst = false;
        }

        // 设置下一页面的显示和位置
        if (slider._touchDeltaY <= 0) {
            if ($self.next('.m-page').length == 0) {
                slider._pageNext = 0;
            } else {
                slider._pageNext = slider._pageNow + 1;
            }

            next = slider._page.eq(slider._pageNext)[0];
        } else {
            if ($self.prev('.m-page').length == 0) {
                if (slider._firstChange) {
                    slider._pageNext = slider._pageNum - 1;
                } else {
                    return;
                }
            } else {
                slider._pageNext = slider._pageNow - 1;
            }

            next = slider._page.eq(slider._pageNext)[0];
        }

        now = slider._page.eq(slider._pageNow)[0];
        node = [next, now];

        // move阶段根据方向设置页面的初始化位置--执行一次
        if (slider._moveFirst) init_next(node);

        function init_next(node) {
            var s, l, _translateZ = slider._translateZ();

            slider._page.removeClass('action');
            $(node[1]).addClass('action').removeClass('f-hide');
            slider._page.not('.action').addClass('f-hide');

            // 模版高度适配函数处理
            slider.height_auto(slider._page.eq(slider._pageNext), 'false');

            // 显示对应移动的page
            $(node[0]).removeClass('f-hide').addClass('active');

            // 设置下一页面的显示和位置
            if (slider._movePosition == 'up') {
                s = parseInt($(window).scrollTop());
                if (s > 0) l = $(window).height() + s;
                else l = $(window).height();
                node[0].style[slider._prefixStyle('transform')] = 'translate(0,' + l + 'px)' + _translateZ;
                $(node[0]).attr('data-translate', l);

                $(node[1]).attr('data-translate', 0);
            } else {
                node[0].style[slider._prefixStyle('transform')] = 'translate(0,-' + Math.max($(window).height(), $(node[0]).height()) + 'px)' + _translateZ;
                $(node[0]).attr('data-translate', -Math.max($(window).height(), $(node[0]).height()));

                $(node[1]).attr('data-translate', 0);
            }
        }

        return node;
    },

    // page触摸移动设置函数
    page_translate: function (node) {
        // 没有传值返回
        if (!node) return;

        var _translateZ = slider._translateZ(),
            y_1, y_2, scale,
            y = slider._touchDeltaY;

        // 切换的页面移动
        if ($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
        node[0].style[slider._prefixStyle('transform')] = 'translate(0,' + y_1 + 'px)' + _translateZ;

        // 当前的页面移动
        if ($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
        scale = 1 - Math.abs(y * 0.2 / $(window).height());
        y_2 = y_2 / 5;
        node[1].style[slider._prefixStyle('transform')] = 'translate(0,' + y_2 + 'px)' + _translateZ + ' scale(' + scale + ')';
    },

    // page触摸移动end
    page_touch_end: function (e) {
        slider._moveInit = false;
        slider._mouseDown = false;
        if (!slider._moveStart) return;
        if (!slider._pageNext && slider._pageNext != 0) return;

        slider._moveStart = false;

        // 确保移动了
        if (Math.abs(slider._touchDeltaY) > 10) {
            slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transition')] = 'all .3s';
            slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transition')] = 'all .3s';
        }

        // 页面切换
        if (Math.abs(slider._touchDeltaY) >= 100) {		// 切换成功
            slider.page_success();
        } else if (Math.abs(slider._touchDeltaY) > 10 && Math.abs(slider._touchDeltaY) < 100) {	// 切换失败
            slider.page_fial();
        } else {									// 没有切换
            slider.page_fial();
        }

        // end事件
        slider._handleEvent('end');

        // 注销控制值
        slider._movePosition = null;
        slider._movePosition_c = null;
        slider._touchStartValY = 0;
    },

    // 切换成功
    page_success: function () {
        var _translateZ = slider._translateZ();

        // 下一个页面的移动
        slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transform')] = 'translate(0,0)' + _translateZ;

        // 当前页面变小的移动
        var y = slider._touchDeltaY > 0 ? $(window).height() / 5 : -$(window).height() / 5;
        var scale = 0.8;
        slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transform')] = 'translate(0,' + y + 'px)' + _translateZ + ' scale(' + scale + ')';

        // 成功事件
        slider._handleEvent('success');
    },

    // 切换失败
    page_fial: function () {
        var _translateZ = slider._translateZ();

        // 判断是否移动了
        if (!slider._pageNext && slider._pageNext != 0) {
            slider._moveStart = true;
            slider._moveFirst = true;
            return;
        }

        if (slider._movePosition == 'up') {
            slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transform')] = 'translate(0,' + $(window).height() + 'px)' + _translateZ;
        } else {
            slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transform')] = 'translate(0,-' + $(window).height() + 'px)' + _translateZ;
        }

        slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transform')] = 'translate(0,0)' + _translateZ + ' scale(1)';

        // fial事件
        slider._handleEvent('fial');
    },

    /**
     *  对象函数事件绑定处理
     *  -->start touch开始事件
     *  -->mov   move移动事件
     *  -->end   end结束事件
     */
    haddle_envent_fn: function () {
        // 当前页面移动，延迟加载以后的图片
//        slider._on('start',slider.lazy_bigP);

        // 当前页面移动
        slider._on('move', function () {

        });

        // 切换失败事件
        slider._on('fial', function () {
            setTimeout(function () {
                slider._page.eq(slider._pageNow).attr('data-translate', '');
                slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transform')] = '';
                slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transition')] = '';
                slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transform')] = '';
                slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transition')] = '';

                slider._page.eq(slider._pageNext).removeClass('active').addClass('f-hide');
                slider._moveStart = true;
                slider._moveFirst = true;
                slider._pageNext = null;
                slider._touchDeltaY = 0;
                slider._page.eq(slider._pageNow).attr('style', '');
            }, 300)
        });

        // 切换成功事件
        slider._on('success', function () {
            // 判断最后一页让，开启循环切换
            console.log(slider._pageNext,slider._pageNow,slider._pageNum);
//            if (slider._pageNext == 0 && slider._pageNow == slider._pageNum - 1) {
//                slider._firstChange = false;
//                return
//                slider.page_stop();
//                window.location.href="http://www.5.cn/magazine/822/1883/index.html";
//            }

            // 判断是否是最后一页，让轻APP关联页面隐藏
//			if(slider._page.eq(slider._pageNext).next('.m-page').length != 0){
//                slider.page_stop();
//			}
            setTimeout(function () {
                // 判断是否为最后一页，显示或者隐藏箭头
                if (slider._pageNext == slider._pageNum - 1) $('.u-arrow').addClass('f-hide');
                else  $('.u-arrow').removeClass('f-hide');

                slider._page.eq(slider._pageNow).addClass('f-hide');

                slider._page.eq(slider._pageNow).attr('data-translate', '');
                slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transform')] = '';
                slider._page.eq(slider._pageNow)[0].style[slider._prefixStyle('transition')] = '';
                slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transform')] = '';
                slider._page.eq(slider._pageNext)[0].style[slider._prefixStyle('transition')] = '';

                // 初始化切换的相关控制值
                $('.p-ct').removeClass('fixed');
                slider._page.eq(slider._pageNext).removeClass('active');
                slider._page.eq(slider._pageNext).removeClass('fixed');
                slider._pageNow = slider._pageNext;
                slider._moveStart = true;
                slider._moveFirst = true;
                slider._pageNext = null;
                slider._page.eq(slider._pageNow).attr('style', '');
                slider._page.eq(slider._pageNow).removeClass('fixed');
                slider._page.eq(slider._pageNow).attr('data-translate', '');
                slider._touchDeltaY = 0;

                // 切换成功后，执行当前页面的动画---延迟200ms
                setTimeout(function () {
                    if (slider._page.eq(slider._pageNow).hasClass('z-animate')) return;
                    slider._page.eq(slider._pageNow).addClass('z-animate');
                }, 20);

                // 判断是否滑动最后一页，并让轻APP介绍关联页面贤淑
                if (slider._page.eq(slider._pageNow).next().next('.m-page').length == 0) {
                    $(".market-notice").show();
                }
                if (slider._page.eq(slider._pageNow).next('.m-page').length == 0) {
                    $(".market-notice").hide();
                }
            }, 300);
        })
    },

    /**************************************************************************************************************/
    /*  单个处理函数
     ***************************************************************************************************************/
    /**
     * 单个函数处理-unit
     * -->高度的计算
     */
    // 根据设备的高度，来适配每一个模版的高度，并且静止滑动
    // --页面切换完成计算
    height_auto: function (ele, val) {
        ele.children('.page-con').css('height', 'auto');
        var height = $(window).height();

        // 需要解除固定高度的page卡片
        var vial = true;
        if (!vial) {
            if (ele.height() <= height) {
                ele.children('.page-con').height(height + 2);
                if ((!$('.p-ct').hasClass('fixed')) && val == 'true') $('.p-ct').addClass('fixed');
            } else {
                slider._scrollStart();
                if (val == 'true') $('.p-ct').removeClass('fixed');
                ele.children('.page-con').css('height', '100%');
                return;
            }
        } else {
            ele.children('.page-con').height(height + 2);
            if ((!$('.p-ct').hasClass('fixed')) && val == 'true') $('.p-ct').addClass('fixed');
        }
    },

    // loading显示
//    loadingPageShow : function(){
//        $('.u-pageLoading').show();
//    },

    // loading隐藏
//    loadingPageHide : function (){
//        $('.u-pageLoading').hide();
//    },

    // 对象私有变量刷新
    refresh: function () {
        slider._windowHeight = $(window).height();
        slider._windowWidth = $(window).width();
    },

    /**************************************************************************************************************/
    /*  函数初始化
     ***************************************************************************************************************/
    /**
     * app初始化
     */
    // 样式适配
    styleInit: function () {
        $('.u-arrow').on('touchmove', function (e) {
            e.preventDefault()
        });
        $('.p-ct').height($(window).height());
        $('.m-page').height($(window).height());
        $('.translate-back').height($(window).height());
    },

    // 对象初始化
    init: function () {
        // 样式，标签的渲染
        // 对象操作事件处理
        this.styleInit();
        this.haddle_envent_fn();

        // 禁止滑动
        this._scrollStop();

        // 绑定全局事件函数处理
        $(window).on('resize', function () {
            slider.refresh();
        });

        $('input[type="hidden"]').appendTo($('body'));

        // 图片预先加载
//        $('<img />').attr('src',$('#r-cover').val());
        $('<img />').attr('src', $('.m-fengye').find('.page-con').attr('data-src'));

        // loading执行一次
        var loading_time = new Date().getTime();

        $(window).on('load', function () {
            var now = new Date().getTime();
            var loading_end = false;
            var time;
            var time_del = now - loading_time;

            if (time_del >= 500) {
                loading_end = true;
            }

            if (loading_end) {
                time = 0;
            } else {
                time = 500 - time_del;
            }

            // loading完成后请求
            setTimeout(function () {
                // 显示封面内容
                setTimeout(function () {
                    $('.translate-back').removeClass('f-hide');
                    $('.m-fengye').removeClass('f-hide');
                    slider.height_auto(slider._page.eq(slider._pageNow), 'false');
                }, 1000);

                // 开启window的滚动
                slider._scrollStart();

                // 开启页面切换
                slider.page_start();

                // 箭头显示
                $('.u-arrow').removeClass('f-hide');
                $('.p-ct').height($(window).height());
                $('.m-page').height($(window).height());
                $('.translate-back').height($(window).height());
            }, time)
        })
    }
};

/*初始化对象函数*/
slider.init();