$(document).ready(function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 1024) {
      initBannersSlider();
    } else {
      initBannerHover();
    }
  }
});

$(window).on("resize", function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 1024) {
      initBannersSlider();
    } else {
      initBannersSlider("destroy");
    }
  }
});

function initBannersSlider(props = false) {
  const swiper = new Swiper(".banner-pictures__slider", {
    slidesPerView: 4,
    centeredSlides: true,
    initialSlide: 2,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  if (props) {
    bannerDestroy(swiper);
  }
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

function bannerDestroy(swiper) {
  // console.log("destroy");
  swiper.destroy(true, true);
}
