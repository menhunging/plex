let observer = () => {
  // функция для работы destroy Swiper
  console.log("observer");
};

$(document).ready(function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 1024) {
      initBannerSlider();
    } else {
      initBannerHover();
    }
  }

  if ($("#modal-your-city").length > 0) {
    MicroModal.show("modal-your-city");
  }
});

$(window).on("resize", function () {
  if ($(".banner-box").length > 0) {
    if ($(window).width() < 1024) {
      initBannerSlider();
    } else {
      destroyBannerSlider();
    }
  }
});

function initBannerSlider() {
  if (!$(".banner-pictures__slider").hasClass("swiper-initialized")) {
    const swiperBanner = new Swiper(".banner-pictures__slider", {
      slidesPerView: 4,
      centeredSlides: true,
      initialSlide: 2,
      breakpoints: {
        0: {
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

    observer = () => {
      if ($(".banner-pictures__slider").hasClass("swiper-backface-hidden")) {
        $(".banner-pictures__slider").removeClass("swiper-backface-hidden");
      }
      swiperBanner.destroy(true, true);
    };
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

function destroyBannerSlider() {
  if ($(".banner-pictures__slider ").hasClass("swiper-initialized")) {
    observer();
  }
}
