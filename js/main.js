let observer = () => {
  // функция для работы destroy Swiper
  console.log("observer");
};

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
    $(".menu").stop().slideToggle();
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
        $(".menu-catalog").removeClass("opened");
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

    menuLink.on("click", function () {
      $(this).parents("li").toggleClass("active");
      $(this).siblings(".sub-menu").stop().slideToggle();
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
          .stop()
          .slideToggle();
      });
    }

    this._openFirst();
  },
  destroyClick() {
    // $(".menu-catalog").addClass("destroy-links");
    $("body").removeClass("hidden");
    $(".burger").removeClass("active");
    $(".burger").off("click");
    $(".burger-block__click").off("click");
    $(".burger-mobile__title").off("click");
    $(".menu").slideUp();
  },

  initCatalogBurger() {
    if ($(".menu-catalog").hasClass("opened")) {
      $(".menu-catalog").removeClass("opened").stop().slideUp();
    }

    $(".menu-catalog a").map(function (e) {
      let child =
        $(this).next("ul").length || $(this).next(".submenu-catalog").length;

      if (child <= 0) {
        $(this).addClass("not-before");
      } else {
        $(this).on("click", function (e) {
          handleClick($(this).next(), e, $(this));
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

      $(".menu-catalog").toggleClass("opened").stop().slideToggle();
    });

    function handleClick(block, event, link) {
      if (block.hasClass("submenu-catalog--inner")) {
        event.preventDefault();

        if (link.hasClass("opened")) {
          link.removeClass("opened");
          block.stop().slideUp();
        } else {
          $(".submenu-catalog--inner").stop().slideUp();
          $(".menu-catalog a").removeClass("opened");
          link.addClass("opened");
          block.stop().slideDown();
        }
      }
    }
  },
};

$(document).ready(function () {
  if ($(".burger-block__click").length > 0) {
    $(".menu-link").map(function () {
      !$(this).next(".sub-menu").length && $(this).addClass("not-arrow");
    });

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
      $(".search-invis").stop().slideToggle();
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

  if ($(".other-product__slider").length > 0) {
    const otherSliders = document.querySelectorAll(".other-product__slider");

    let mySwipers = [];

    function sliderinit() {
      otherSliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
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

    otherSliders.length && sliderinit();
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
      $(".selecVolume").selectmenu({
        transferClasses: true,
      });
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
        setTimeout(() => {
          $("body").removeClass("modal-open");
        }, 300);
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

  if ($(".count-block").length > 0) {
    $(".count-block").map(function () {
      let plus = $(this).find(".count-plus");
      let minus = $(this).find(".count-minus");
      let input = $(this).find(".input-count");
      let count = $(this).find(".input-count").val();

      plus.on("click", function (e) {
        e.preventDefault();
        count++;
        input.val(count);
      });

      minus.on("click", function (e) {
        e.preventDefault();
        count--;

        if (count < 0) {
          count = 0;
        }

        input.val(count);
      });
    });
  }

  if ($(".banner-box").length > 0) {
    if ($(window).width() < 1024) {
      initBannerSlider();
    } else {
      initBannerHover();
    }
  }

  if ($("#modal-your-city").length > 0) {
    // MicroModal.show("modal-your-city");
  }

  if ($(".select-value").length > 0) {
    $(".select-value").on("click", function () {
      let than = $(this);
      let parents = than.siblings(".product-item-scu-block");
      let speed = 100;

      than.toggleClass("opened");

      parents.stop().slideToggle(speed);
      parents.find("li").on("click", function () {
        let option = $(this).find(".product-item-scu-item-text");
        let text = option.text();
        let url = option.find("img").attr("src");

        if (!url) {
          than.addClass("not-img");
        } else {
          than.removeClass("not-img");
        }

        parents.stop().slideUp(speed);
        parents.find("li").removeClass("active");

        $(this).addClass("active");

        than.find(".text").text(text);
        than.removeClass("opened");
        than.find("img").attr("src", url);
      });

      $(document).mouseup(function (e) {
        if (
          !parents.is(e.target) &&
          parents.has(e.target).length === 0 &&
          !$(".select-value").is(e.target)
        ) {
          parents.stop().slideUp(speed);
          $(".select-value").removeClass("opened");
        }
      });
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

function openModal(modal) {
  MicroModal.show(modal);
  $("body").addClass("modal-open");
}

function closeModal(modal) {
  MicroModal.hida(modal);
  setTimeout(() => {
    $("body").removeClass("modal-open");
  }, 300);
}
