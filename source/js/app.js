var slider = (function () {
    var flag = true,
        timer = 0,
        timerDuration = 3000;

    return {
        init: function () {
            var _this = this;

            _this.createDots();

            _this.autoSwitch();

            $('.slider_link-button').on('click', function (e) {
                e.preventDefault();
                var
                    $this = $(this),
                    slides = $this.closest('.slider-wrapp').find('.slider_item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    prevSlide = activeSlide.prev(),
                    firstSlide = slides.first(),
                    lastSlide = slides.last();
                  _this.clearTimer()
                if ($this.hasClass('slider_link-button_right')) {
                    if (nextSlide.length) {
                        _this.moveSlider(nextSlide, 'forward');
                    } else {
                        _this.moveSlider(firstSlide, 'forward');
                    }
                } else {
                    if (nextSlide.length) {
                        _this.moveSlider(prevSlide, 'backward');
                    } else {
                        _this.moveSlider(lastSlide, 'backward');
                    }
                }
            });
            $('.slider_dots_link').on('click', function (e) {
                e.preventDefault();
                var
                    $this = $(this),
                    dots = $this.closest('.slider_dots').find('.slider_dots_item'),
                    activeDot = dots.filter('.slider_dots_active'),
                    dot = $this.closest('.slider_dots_item'),
                    curDotNum = dot.index(),
                    direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
                    reqSlide = $this.closest('.slider-wrapp').find('.slider_item').eq(curDotNum);
                _this.clearTimer();
                _this.moveSlider(reqSlide, direction);

            });
        },
        moveSlider: function (slide, direction) {
            var
                _this = this,
                container = slide.closest('.slider-wrapp'),
                slides = container.find('.slider_item'),
                activeSlide = slides.filter('.active'),
                slideWidth = slides.width(),
                duration = 500,
                reqCssPosition = 0,
                reqSlideStrafe = 0;
            if (flag) {
                flag = false;
                if (direction === 'forward') {
                    reqCssPosition = slideWidth;
                    reqSlideStrafe = -slideWidth;
                } else if (direction === 'backward') {
                    reqCssPosition = -slideWidth;
                    reqSlideStrafe = slideWidth;
                }
                slide.css('left', reqCssPosition).addClass('inslide');
                var movableSlide = slides.filter('.inslide');
                activeSlide.animate({left: reqSlideStrafe}, duration);
                movableSlide.animate({left: 0}, duration, function () {
                    var $this = $(this);
                    slides.css('left', '0').removeClass('active');
                    $this.toggleClass('inslide active');
                    _this.activeDots(container.find('.slider_dots'));
                    flag = true;
                });
            }
        },

        createDots: function () {
            var
                _this = this,
                container = $('.slider-wrapp');

            var
                dotMarkup = '<li class="slider_dots_item"><a class="slider_dots_link" href="#"></a></li>';

            container.each(function () {
                var $this = $(this),
                    slides = $this.find('.slider_item'),
                    dotContainer = $this.find('.slider_dots');
                for (var i = 0; i < slides.size(); i++) {
                    dotContainer.append(dotMarkup);
                }
                _this.activeDots(dotContainer);
            });

        },

        activeDots: function (container) {
            var
                slides = container.closest(".slider-wrapp").find(".slider_item");
            container
                .find(".slider_dots_item")
                .eq(slides.filter(".active").index())
                .addClass("slider_dots_active")
                .siblings()
                .removeClass("slider_dots_active");
        },

        autoSwitch: function () {
            var _this = this;
            timer = setInterval(function () {
                var
                    slides = $('.slider_list .slider_item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    firstSlide = slides.first();
                if (nextSlide.length) {
                    _this.moveSlider(nextSlide, 'forward');
                } else {
                    _this.moveSlider(firstSlide, 'forward');
                }

            }, timerDuration);
        },
        
        clearTimer: function () {
            if (timer) {
                clearInterval(timer);
                this.autoSwitch();
            }
        }
    }
}());

$(document).ready(function () {
    if ($('.slider-wrapp').length) {
        slider.init();
    }
});
//slider
// var slider = (function () {
//     return {
//         init: function () {
//             var _this = this;
//             _this.createDots();
//
//
//             $('.slider_link-button').on('click', function (e) {
//                 e.preventDefault();
//                 var
//                     _this = this,
//                     $this = $(this),
//                     container = $this.closest('.slider-wrapp'),
//                     list = container.find('.slider_list'),
//                     items = container.find('.slider_item'),
//                     activeSlide = items.filter('.active'),
//                     nextSlide = activeSlide.next(),
//                     prevSlide = activeSlide.prev(),
//                     firstSlide = items.first(),
//                     lastSlide = items.last(),
//                     sliderOffset = container.offset().left,
//                     reqPost = 0;
//
//                 if ($this.hasClass('slider_link-button_right')) {
//
//                     // _this.moveSlide(nextSlide, 'forward')
//
//                     if (nextSlide.length) {
//                         reqPost = nextSlide.offset().left - sliderOffset;
//                         nextSlide.addClass('active').siblings().removeClass('active');
//                     } else {
//                         reqPost = firstSlide.offset().left - sliderOffset;
//                         firstSlide.addClass('active').siblings().removeClass('active');
//                     }
//
//                 } else {
//                     // _this.moveSlide(prevSlide, 'backward')
//                     if (prevSlide.length) {
//                         reqPost = prevSlide.offset().left - sliderOffset;
//                         prevSlide.addClass('active').siblings().removeClass('active');
//                     } else {
//                         reqPost = lastSlide.offset().left - sliderOffset;
//                         lastSlide.addClass('active').siblings().removeClass('active');
//                     }
//                 }
//
//                 list.css('left', '-=' + reqPost + 'px');
//             });
//         },
//
//         moveSlider: function (slide, direction) {
//             var
//                 _this = this,
//                 container = slides.closest('.slider_list'),
//                 slides = container.find('.slider_item'),
//                 activeSlide = slides.filter('.active'),
//                 sliderWidth = slides.width(),
//                 duration = 500,
//                 reqCssPosition = 0,
//                 reqSlideStrafe = 0;
//
//             if (direction === 'forward') {
//                 reqCssPosition = sliderWidth;
//                 reqSlideStrafe = -sliderWidth;
//             } else if (direction === 'backward') {
//                 reqCssPosition = -sliderWidth;
//                 reqSlideStrafe = sliderWidth;
//             }
//             slide.css('left', reqCssPosition).addClass('inslide');
//             var movableSlide = slide.filter('.inslide');
//             activeSlide.animate({left: reqSlideSrafe}, duration);
//             movableSlide.animate({left: 0}, duration, function () {
//                 var $this = $(this);
//                 slide.css('left', '0').removeClass('active');
//                 $this.toggleClass('inslide avtive');
//                 _this.activeDots(container.find('.slider_dots'));
//             });
//         }
//
//     //     createDots: function () {
//     //         var
//     //             _this = this,
//     //             container = $('.slider-wrapp');
//     //
//     //         var
//     //             dotMarkup = '<li class="slider_dots_item"><a class="slider_dots_link" href="#"></a></li>';
//     //
//     //         container.each(function () {
//     //             var $this = $(this),
//     //                 slides = $this.find('.slider_item'),
//     //                 dotContainer = $this.find('.slider_dots');
//     //             for (var i = 0; i < slides.size(); i++) {
//     //                 dotContainer.append(dotMarkup);
//     //             }
//     //             _this.activeDots(dotContainer);
//     //         });
//     //
//     //     },
//     //
//     //     activeDots: function (container) {
//     //         var
//     //             slides = container.closest(".slider-list").find(".slider_item");
//     //         container
//     //             .find(".slider_dots_item")
//     //             .eq(slides.filter(".active").index())
//     //             .addClass("slider_dots_active")
//     //             .siblings()
//     //             .removeClass("slider_dots_active");
//     //     }
//     // }
// }());

// $(document).ready(function () {
//     if ($(".slider-wrapp").length) {
//         slider.init();
//     }
// });

// $(document).ready(function () {
//     $('.slider_link-button').on('click', function (e) {
//         e.preventDefault();
//         var $this = $(this),
//             container = $this.closest('.slider-wrapp'),
//             list = container.find('.slider_list'),
//             items = container.find('.slider_item'),
//             activeSlide = items.filter('.active'),
//             nextSlide = activeSlide.next(),
//             prevSlide = activeSlide.prev(),
//             firstSlide = items.first(),
//             lastSlide = items.last(),
//             sliderOffset = container.offset().left,
//             reqPost = 0;
//
//         if ($(this).hasClass('slider_link-button_right')) {
//             reqPost = nextSlide.offset().left - sliderOffset;
//             nextSlide.addClass('active').siblings().removeClass('active');
//         } else {
//             reqPost = prevSlide.offset().left - sliderOffset;
//             prevSlide.addClass('active').siblings().removeClass('active');
//         }
//
//         list.css('left', '-=' + reqPost + 'px');
//     });
//
// });
//waypoint
// var waypoint = new Waypoint({
//     element: document.getElementById('front'),
//     element: document.getElementById('end'),
//     element: document.getElementById('flow'),
//     handler: function() {
//         var front = document.getElementById('front');
//         var end = document.getElementById('end');
//         var flow = document.getElementById('flow');
//         front.classList.add('animated' , 'lightSpeedIn' , 'visibility');
//         end.classList.add('animated' , 'lightSpeedIn' , 'visibility');
//         flow.classList.add('animated' , 'lightSpeedIn' , 'visibility');
//     },
//     offset: '120%'
// })


