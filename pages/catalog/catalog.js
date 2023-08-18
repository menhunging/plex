const filter = {
  open(target) {
    destroyFilterAccardeon();
    $(`.filter-block.${target}`).addClass("show");
    $(".overlay-filter").addClass("show");
  },
  close() {
    $(".filter-block.filter").removeClass("show");
    $(".filter-block.categoryes").removeClass("show");
    $(".overlay-filter").removeClass("show");
  },
};

$(document).ready(function () {
  if ($(".category-slider").length > 0) {
    if ($(window).width() <= 767) {
      initCategorySlider();
    }
  }

  if ($(".filter-block__title").length > 0) {
    if ($(window).width() >= 1200) {
      initFilterAccardeon();
    }
  }

  if ($(".check-list").length > 0) {
    $(".check-list").map(function () {
      let parents = $(this).parents(".check-list__wrapper");
      let children = $(this).children().length;

      if (children > 4) {
        parents.addClass("scroll");
      }
    });
  }

  if ($(".filter-range").length > 0) {
    $(".filter-range").map(function () {
      let range = $(this).find(".range-slider input"),
        inputForm = $(this).find(".from"),
        inputTo = $(this).find(".to"),
        instance,
        min = 0,
        max = 1000,
        from = 0,
        to = 0;

      range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: 0,
        to: 800,
        grid: false,
        hide_min_max: true,
        hide_from_to: true,
        onStart: updateInputs,
        onChange: updateInputs,
      });

      instance = range.data("ionRangeSlider");

      function updateInputs(data) {
        from = data.from;
        to = data.to;

        inputForm.prop("value", from);
        inputTo.prop("value", to);
      }

      inputForm.on("input", function () {
        let val = $(this).prop("value");

        if (val < min) {
          val = min;
        } else if (val > to) {
          val = to;
        }

        instance.update({
          from: val,
        });
      });

      inputTo.on("input", function () {
        let val = $(this).prop("value");

        if (val < from) {
          val = from;
        } else if (val > max) {
          val = max;
        }

        instance.update({
          to: val,
        });
      });
    });
  }

  if ($(".catergory-link").length > 0) {
    $(".catergory-link").on("click", function (e) {
      e.preventDefault();

      if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        $(this).next(".categoryes-sub").stop().slideUp();
      } else {
        $(".catergory-link").removeClass("opened");
        $(".categoryes-sub").stop().slideUp();
        $(this).addClass("opened");
        $(this).next(".categoryes-sub").stop().slideDown();
      }
    });

    $(".categoryes-sub__link").on("click", function (e) {
      $(this).next(".categoryes-sub__inner").length > 0 && e.preventDefault();

      if ($(this).hasClass("opened")) {
        $(this).removeClass("opened");
        $(this).next(".categoryes-sub__inner").stop().slideUp();
      } else {
        $(".categoryes-sub__link").removeClass("opened");
        $(".categoryes-sub__inner").stop().slideUp();
        $(this).addClass("opened");
        $(this).next(".categoryes-sub__inner").stop().slideDown();
      }
    });

    $(".categoryes-sub__link").map(function () {
      !$(this).next(".categoryes-sub__inner").length && $(this).addClass("not-arrow");
    });
  }

  if ($(".btn-open-filter").length > 0) {
    $(".btn-open-filter").on("click", function () {
      filter.open("filter");
    });
  }

  if ($(".btn-open-cat").length > 0) {
    $(".btn-open-cat").on("click", function () {
      filter.open("categoryes");
    });
  }

  if ($(".overlay-filter").length > 0) {
    $(".overlay-filter").on("click", function () {
      filter.close();
    });
  }

  if ($(".btn-mobile-close").length > 0) {
    $(".btn-mobile-close").on("click", function () {
      filter.close();
    });
  }
});

$(window).on("resize", function () {
  if ($(".category-slider").length > 0) {
    if ($(window).width() <= 767) {
      initCategorySlider();
    } else {
      destroyCategorySlider();
    }
  }

  if ($(".filter-block__title").length > 0) {
    if ($(window).width() >= 1200) {
      initFilterAccardeon();
    } else {
      destroyFilterAccardeon();
    }
  }
});

function initCategorySlider() {
  if (!$(".category-slider").hasClass("swiper-initialized")) {
    const swiperCategory = new Swiper(".category-slider", {
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
        0: {
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

    observer = () => {
      swiperCategory.destroy(true, true);
    };
  }
}

function destroyCategorySlider() {
  if ($(".category-slider").hasClass("swiper-initialized")) {
    observer();
  }
}

function initFilterAccardeon() {
  if (!$(".catalog-page__filter").hasClass("init-accardeon")) {
    filter.close();
    $(".catalog-page__filter").addClass("init-accardeon");

    $(".filter-block__title").map(function () {
      let caption = $(this).find(".caption");
      let content = $(this)
        .parents(".filter-block")
        .find(".filter-block__content");

      caption.on("click", function () {
        $(this).toggleClass("close");
        content.stop().slideToggle();
      });
    });
  }
}

function destroyFilterAccardeon() {
  $(".catalog-page__filter").removeClass("init-accardeon");
  $(".filter-block__content").slideDown().attr("style", "");
  $(".filter-block__title .caption").removeClass("close").off("click");
}
