$(document).ready(function () {
  if ($(".category-slider").length > 0) {
    if ($(window).width() <= 767) {
      initCategorySlider();
    }
  }
});

$(window).on("resize", function () {
  if ($(window).width() <= 767) {
    initCategorySlider();
  } else {
    destroyCategorySlider();
  }
});

function initCategorySlider() {
  if (!$(".category-slider").hasClass("swiper-initialized")) {
    var swiperCategory = new Swiper(".category-slider", {
      slidesPerView: 4,
      spaceBetween: 16,
      navigation: {
        nextEl: ".catergory-section .swiper-button-next",
        prevEl: ".catergory-section .swiper-button-prev",
      },
      pagination: {
        el: ".catergory-section .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
      on: {
        init: function (swiper) {},
      },
    });
  }
}

function destroyCategorySlider() {
  // swiperCategory.destroy(true, true);
}
