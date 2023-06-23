$(document).ready(function () {
  if ($(".burger").length > 0) {
    $(".burger").on("click", function () {
      $(this).toggleClass("active");
      $("body").toggleClass("hidden");
      $(".menu").slideToggle();
    });

    if ($(".burger-mobile__title").length > 0) {
      $(".burger-mobile__title").on("click", function () {
        $(this).siblings(".burger-mobile__content").slideToggle();
      });
    }

    if ($(window).width() <= 767) {
      initBurgerLink();
    }
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".js-mobile-open").length > 0) {
    if ($(window).width() < 768) {
      initFooterAccardeon();
    }
  }

  // if ($("select").length > 0) {
  //   $("select").map(function () {
  //     $(this).selectric({
  //       onOpen: function (element) {},
  //       onChange: function (element) {},
  //       onClose: function (element) {},
  //     });
  //   });
  // }

  if ($(".linkFancyBox").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".text-section__slider").length > 0) {
    const sliders = document.querySelectorAll(".text-section__slider");

    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 1,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            on: {
              init: function (swiper) {},
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".product-settings").length > 0) {
    if ($(".selecVolume").length) {
      $(".selecVolume").selectmenu();
    }

    $.widget("custom.iconselectmenu", $.ui.selectmenu, {
      _renderItem: function (ul, item) {
        let count = item.element.attr("data-count")
          ? `(из ${item.element.attr("data-count")} шт.)`
          : "";

        var li = $("<li class='ui-menu-icon'>"),
          wrapper = $("<div>", { text: item.label });

        $("<span>", {
          class: "ui-icon-count",
          text: count,
        }).appendTo(wrapper);

        $("<span>", {
          style: item.element.attr("data-style"),
          class: "icon-option " + item.element.attr("data-class"),
        }).appendTo(wrapper);

        return li.append(wrapper).appendTo(ul);
      },

      _renderButtonItem: function (item) {
        let count = item.element.attr("data-count")
          ? `(из ${item.element.attr("data-count")} шт.)`
          : "";

        var buttonItem = $("<span>", {
          class: "ui-selectmenu-text-icon",
        });

        buttonItem.css("background-color", item.value);
        var wrapper = $("<div>", { text: item.label });

        if (item.disabled) {
          buttonItem.addClass("ui-state-disabled");
        }

        $("<span>", {
          class: "ui-icon-count",
          text: count,
        }).appendTo(wrapper);

        $("<span>", {
          style: item.element.attr("data-style"),
          class: "icon-option " + item.element.attr("data-class"),
        }).appendTo(wrapper);
        buttonItem.append(wrapper);
        return buttonItem;
      },
    });

    if ($(".selecPack").length > 0) {
      $(".selecPack").iconselectmenu();
    }
  }

  // ---------------------------------------

  // if ($(".modal").length > 0) {
  //   MicroModal.init({
  //     openTrigger: "data-modal",
  //     disableScroll: true,
  //     awaitOpenAnimation: true,
  //     awaitCloseAnimation: true,

  //     onShow: () => {
  //       $("body").addClass("modal-open");
  //     },

  //     onClose: () => {
  //       $("body").removeClass("modal-open");
  //     },
  //   });

  //   $("[data-modal]").map(function () {
  //     $(this).click((e) => e.preventDefault());
  //   });
  // }

  // if ($(".tabs").length > 0) {
  //   $(".tabs").tabslet({
  //     mouseevent: "click",
  //     attribute: "href",
  //     animation: true,
  //   });
  // }
});

$(window).on("resize", function () {
  if ($(".js-mobile-open").length > 0) {
    if ($(window).width() >= 767) {
      destroyFooterAccardeon();
    } else {
      initFooterAccardeon();
    }
  }

  if ($(".burger").length > 0) {
    if ($(window).width() <= 767) {
      if (!$(".menu").hasClass("init-click")) {
        initBurgerLink();
      }
    } else {
      $(".menu-link li").removeClass("active");
      $(".menu").removeClass("init-click");
      $(".menu-link").off("click");
    }
  }
});

function initFooterAccardeon() {
  if (!$(".footer").hasClass("accardeon-initialization")) {
    $(".footer").addClass("accardeon-initialization");
    $(".footer__list").stop().slideUp();
    $(".js-mobile-open").removeClass("open");

    $(".js-mobile-open").on("click", function () {
      $(".js-mobile-open").removeClass("open");
      $(".footer__list").stop().slideUp();

      $(this).addClass("open").siblings(".footer__list").stop().slideToggle();
    });

    setTimeout(function () {
      $(".footer__title--opened").trigger("click");
    }, 500);
  }
}

function destroyFooterAccardeon() {
  if ($(".footer").hasClass("accardeon-initialization")) {
    $(".js-mobile-open").off("click").removeClass("open");
    $(".footer__list").slideDown();
    $(".footer").removeClass("accardeon-initialization");
  }
}

function initBurgerLink() {
  let menuLink = $(".menu-link");
  let subMenu = $(".sub-menu");

  $(".menu").addClass("init-click");

  menuLink.on("click", function () {
    $(this).parents("li").toggleClass("active");
    $(this).siblings(".sub-menu").slideToggle();
  });
}
