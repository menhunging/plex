$(document).ready(function () {
  if ($(".product-section").length > 0) {
    const swiperProductSmall = new Swiper(".product-small__slider", {
      slidesPerView: 4,
      spaceBetween: 12,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
      },
    });

    const swiperProductBig = new Swiper(".product-big__slider", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: swiperProductSmall,
      },
    });
  }

  if ($(".product-mobile__tabs").length > 0) {
    const swiperMobileTabs = new Swiper(".product-mobile__tabs", {
      slidesPerView: 1,
      slideToClickedSlide: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.58,
        },
        480: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
      },
      on: {
        init: function (swiper) {
          $(".product-mobile__tabs .swiper-slide").on("click", function () {
            let position = $(this).index();

            $(".product-mobile__tabs .swiper-slide").removeClass("active");
            $(this).addClass("active");

            $(".product-section__tabs .tabs-links li")
              .eq(position)
              .trigger("click");
          });
        },
      },
    });
  }
});

$(window).on("resize", function () {
  if ($(".product-mobile__tabs").length > 0) {
    if ($(window).width() <= 767) {
      let active = $(".product-section__tabs .tabs-links li.active").index();
      $(".product-mobile__tabs .swiper-slide").removeClass("active");
      $(".product-mobile__tabs .swiper-slide").eq(active).addClass("active");
    }
  }
});
