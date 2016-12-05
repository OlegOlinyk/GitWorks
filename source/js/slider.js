var slider = (function () {


    return {
        init: function () {
            var _this = this;
            _this.createDots();

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
            });
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
                    // _this.activeDots(dotContainer);
            });

        },

        activeDots: function (container) {
            var
                slides = container.closest(".slider-list").find(".slider_item");
            container
                .find(".slider_dots_item")
                .eq(slides.filter(".active").index())
                .addClass("slider_dots_active")
                .siblings()
                .removeClass("slider_dots_active");
        }
    }
}());

$(document).ready(function () {
    if ($('.slider-wrapp').length) {
        slider.init();
    }
});