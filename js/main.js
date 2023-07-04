const footer = {
  initAccardeon() {
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
  },

  destroyAccardeon() {
    if ($(".footer").hasClass("accardeon-initialization")) {
      $(".js-mobile-open").off("click").removeClass("open");
      $(".footer__list").slideDown();
      $(".footer").removeClass("accardeon-initialization");
    }
  },
};

const burger = {
  _clickBurger() {
    $(document).off("mouseup");
    $(".burger").toggleClass("active");
    $("body").toggleClass("hidden");
    $(".menu").slideToggle();
  },

  _initClickOnDocument(block) {
    $(document).mouseup(function (e) {
      if (
        !block.is(e.target) &&
        block.has(e.target).length === 0 &&
        !$(".burger-block__click").is(e.target)
      ) {
        block.stop().slideUp();
        $(".burger").removeClass("active");
      }
    });
  },

  _openFirst() {
    $(".burger-mobile__title").removeClass("active");
    $(".burger-mobile__content").stop().slideUp();

    $(".burger-mobile__title:first")
      .addClass("active")
      .siblings(".burger-mobile__content")
      .stop()
      .slideDown();
  },

  initLink() {
    let menuLink = $(".menu-link");
    let subMenu = $(".sub-menu");

    $(".menu").addClass("init-click");

    menuLink.on("click", function () {
      $(this).parents("li").toggleClass("active");
      $(this).siblings(".sub-menu").slideToggle();
    });
  },
  destroyLink() {
    $(".menu-link li").removeClass("active");
    $(".menu").removeClass("init-click");
    $(".menu-link").off("click");
  },

  initClick() {
    $(".burger-block__click").on("click", () => {
      this._clickBurger();
    });

    $(".burger").on("click", () => {
      this._clickBurger();
    });

    if ($(".burger-mobile__title").length > 0) {
      $(".burger-mobile__title").on("click", function () {
        $(this)
          .toggleClass("active")
          .siblings(".burger-mobile__content")
          .slideToggle();
      });
    }

    this._openFirst();
  },
  destroyClick() {
    $("body").removeClass("hidden");
    $(".burger").removeClass("active");
    $(".burger").off("click");
    $(".burger-block__click").off("click");
    $(".burger-mobile__title").off("click");
    $(".menu").slideUp();
  },

  initCatalogBurger() {
    $(".menu-catalog a").map(function (e) {
      let child = $(this).next("ul");

      if (child.length <= 0) {
        $(this).addClass("not-before");
      } else {
        $(this).on("click", function (e) {
          handleClick(child, e, $(this));
        });
      }
    });

    $(".burger-block__click").on("click", () => {
      if (!$(".burger").hasClass("active")) {
        $(".burger").addClass("active");
        this._initClickOnDocument($(".menu-catalog"));
      } else {
        $(".burger").removeClass("active");
        $(document).off("mouseup");
      }

      $(".menu-catalog").stop().slideToggle();
    });

    function handleClick(child, event, link) {
      if (child.hasClass("submenu-catalog--inner")) {
        event.preventDefault();

        if (link.hasClass("opened")) {
          link.removeClass("opened");
          child.stop().slideUp();
        } else {
          $(".submenu-catalog--inner").stop().slideUp();
          $(".menu-catalog a").removeClass("opened");
          link.addClass("opened");
          child.stop().slideDown();
        }
      }
    }
  },
};

$(document).ready(function () {
  if ($(".burger-block__click").length > 0) {
    if ($(window).width() <= 767) {
      burger.initClick();
      burger.initLink();
    } else {
      burger.initCatalogBurger();
    }
  }

  if ($(".search-link-mobile").length > 0) {
    $(".search-link-mobile").on("click", function () {
      $(this).toggleClass("active");
      $(".search-invis").slideToggle();
    });
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".js-mobile-open").length > 0) {
    if ($(window).width() < 768) {
      footer.initAccardeon();
    }
  }

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

    if ($(".selecVolume").length) {
      $(".selecVolume").selectmenu();
    }

    if ($(".selecPack").length > 0) {
      $(".selecPack").iconselectmenu();
    }
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => e.preventDefault());
    });
  }

  if ($(".selectric").length > 0) {
    $(".selectric").map(function () {
      $(this).selectric({
        onOpen: function (element) {},
        onChange: function (element) {},
        onClose: function (element) {},
      });
    });
  }

  if ($(".tabs").length > 0) {
    $(".tabs").tabslet({
      mouseevent: "click",
      attribute: "href",
      animation: true,
    });
  }
});

$(window).on("resize", function () {
  if ($(".js-mobile-open").length > 0) {
    if ($(window).width() >= 767) {
      footer.destroyAccardeon();
    } else {
      footer.initAccardeon();
    }
  }

  if ($(".burger").length > 0) {
    if ($(window).width() <= 767) {
      if (!$(".menu").hasClass("init-click")) {
        burger.initClick();
        burger.initLink();
      }
    } else {
      burger.destroyLink();
      burger.destroyClick();
      burger.initCatalogBurger();
    }
  }
});
