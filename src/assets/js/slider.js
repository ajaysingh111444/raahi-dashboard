$(document).ready(function () {

    /***************************
    Showcase area slider start
    ***************************/
    if ($('.showcase1-slider').length > 0) {
         $('.showcase1-slider').slick({
            slidesToShow: 1,
			dots: true,
			fade: true,
			autoplay: true,
			pauseOnHover: false,
			pauseOnFocus: false,
			arrows: false,
			speed: 2000,
			autoplaySpeed: 3500,
		    	appendDots: $('.showcase-slider-dot-controls'),
        });
    }
    /***************************
   Case slider start
   ***************************/

  if ($('.case-slider').length > 0) {
    $('.case-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        dots: false,
        autoplay: true,
        autoPlayTimeout: 350,
        prevArrow: '<button type="button" class="slick-prev"><i class="flaticon-left-arrow"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="flaticon-right-arrow"></i></button>',
        appendArrows: $('.case-slider-controls'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
              breakpoint: 1199,
              settings: {
                  slidesToShow: 2,
              }
           },
           {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,

              }
           },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,

                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,

                }
            }
        ]
    });
}

});
