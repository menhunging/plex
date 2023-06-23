$(document).ready(function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 768) {
      initBannersSlider();
    } else {
      initBannerHover();
    }
  }
});

function initBannersSlider() {
  $(".banner-box").off("hover");
  $(".banner-box").removeClass("active");

  var swiperBannerNavigate = new Swiper(".banner-main__bottom .container", {
    slidesPerView: 5,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },

      480: {
        slidesPerView: 3,
      },

      640: {
        slidesPerView: 5,
      },
    },
    on: {
      init: function (swiper) {},
    },
  });

  var swiperBanner = new Swiper(".banner-main__top .container", {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    thumbs: {
      swiper: swiperBannerNavigate,
    },
    on: {
      init: function (swiper) {},
    },
  });
}

function initBannerHover() {
  $(".banner-box").hover(function () {
    let index = $(this).index();
    let box = $(".banner-pictures__box");
    let links = $(".banner-box");

    links.removeClass("active");
    box.removeClass("large");

    $(this).addClass("active");
    box.eq(index).addClass("large");
  });
}

$(window).on("resize", function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 768) {
      initBannersSlider();
    } else {
      initBannerHover();
    }
  }
});
