$(document).ready(function () {
  if ($(".grettings__slider").length > 0) {
    let swiper = new Swiper(".grettings__slider", {
      slidesPerView: 1,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if ($(".slider-caterogy").length > 0) {
    const sliders = document.querySelectorAll(".slider-caterogy");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 32,
            pagination: {
              el: ".swiper-pagination",
              type: "fraction",
              formatFractionCurrent: function (number) {
                return number;
              },
            },
            on: {
              init: function (swiper) {},
              slideChange: function (swiper) {},
            },
            breakpoints: {
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16,
              },
              767: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }
});
