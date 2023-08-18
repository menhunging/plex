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

  initLink() {
    let menuLink = $(".menu-link");
    let subMenu = $(".sub-menu");

    menuLink.on("click", function (event) {
      let than = $(this);

      if (than.siblings(".sub-menu").length > 0) {
        event.preventDefault();
        than.parents("li").toggleClass("active");
        than.siblings(".sub-menu").stop().slideToggle();
      }
    });

    subMenu.find(".sub-link").on("click", function (event) {
      let than = $(this);

      if (than.siblings(".sub-menu").length > 0) {
        event.preventDefault();
        than.toggleClass("active");
        than.siblings(".sub-menu").stop().slideToggle();
      }
    });
  },
  destroyLink() {
    $(".menu-link li").removeClass("active");
    $(".menu").removeClass("init-click");
    $(".menu-link").off("click");
    $(".sub-link").off("click");
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

    $(".menu").addClass("init-click");
  },
  destroyClick() {
    // $(".menu-catalog").addClass("destroy-links");
    $("body").removeClass("hidden");
    $(".burger").removeClass("active");
    $(".burger").off("click");
    $(".burger-block__click").off("click");
    $(".burger-mobile__title").off("click");
    $(".menu").slideUp();
    $(".menu-catalog a").off("click");
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

    $(".sub-link").map(function () {
      !$(this).next(".sub-menu").length && $(this).addClass("not-arrow");
    });

    if ($(window).width() <= 767) {
      burger.initClick();
      burger.initLink();
    } else {
      burger.initCatalogBurger();
    }
  }

  if ($(".btn-sub-more").length > 0) {
    $(".btn-sub-more").on("click", function () {
      $(this).closest(".sub-menu").addClass("opened");
    });
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

  if ($(".js-link-open").length > 0) {
    $(".js-link-open").on("click", function () {
      let than = $(this);
      let block = than.siblings(".js-block-show");

      than.toggleClass("opened");
      block.stop().slideToggle();

      block.find("a").on("click", function (event) {
        event.preventDefault();
        than.text($(this).text());
        close();
      });

      $(document).mouseup(function (e) {
        if (
          !block.is(e.target) &&
          block.has(e.target).length === 0 &&
          !than.is(e.target)
        ) {
          close();
        }
      });

      function close() {
        than.removeClass("opened");
        block.stop().slideUp();
      }
    });
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

  if ($(".about-slider").length > 0) {
    const aboutSliders = document.querySelectorAll(".about-slider");

    let mySwipers = [];

    function sliderinit() {
      aboutSliders.forEach((slider, index) => {
        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 3,
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
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 1.75,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3,
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

    aboutSliders.length && sliderinit();
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
    selectValueToggleClass();

    $(".select-value").on("click", function () {
      let than = $(this);
      let parents = than.siblings(".product-item-scu-block");

      if (than.hasClass("opened")) {
        than.removeClass("opened");
        parents.css("display", "none");
      } else {
        $(".product-item-scu-block").css("display", "none");
        than.addClass("opened");
        parents.css("display", "block");
      }

      parents.find("li").on("click", function () {
        selecValueHandle($(this), than, parents);
      });

      $(document).mouseup(function (e) {
        if (
          !parents.is(e.target) &&
          parents.has(e.target).length === 0 &&
          !$(".select-value").is(e.target)
        ) {
          parents.stop().css("display", "none");
          $(".select-value").removeClass("opened");
        }
      });
    });
  }

  if ($(".file-load").length > 0) {
    let than = $(".file-load");

    than.map(function () {
      $(this)
        .find("input")
        .change(function () {
          if ($(this).prop("files").length > 0) {
            $(this).closest("form").find(".btn").attr("disabled", false);

            $(".file-load__info").addClass("loading");

            let name = $(this).prop("files")[0].name;
            let size = $(this).prop("files")[0].size;

            $(".file-load__text .name").text(name);
            $(".file-load__text .size").text(`${size} 'КБ'`);
          }
        });

      $(this)
        .find(".file-load__delete")
        .on("click", function () {
          let inputFile = $(this).closest("form").find("input")

          console.log(inputFile.prop("files"));

          inputFile.value = "";

          console.log(than.find("input").prop("files"));

          $(this).closest("form").find(".btn").attr("disabled", true);
          $(".file-load__info").removeClass("loading");
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
  $(".modal__close").on("click", function () {
    closeModal(modal);
  });
  $("body").addClass("modal-open");
}

function closeModal(modal) {
  MicroModal.close(modal);
  setTimeout(() => {
    $("body").removeClass("modal-open");
  }, 300);
}

function selecValueHandle(li, than, parents) {
  let option = li.find(".product-item-scu-item-text");

  let url = option.find("img").attr("src");

  if (!url) {
    than.addClass("not-img");
  } else {
    than.removeClass("not-img");
  }

  parents.stop().css("display", "none");
  parents.find("li").removeClass("active");

  li.addClass("active");

  than.removeClass("opened");
  than.find("img").attr("src", url);
}

function selectValueToggleClass() {
  $(".select-value").map(function () {
    if ($(this).find("img").attr("src") === "") {
      $(this).addClass("not-img");
    } else {
      $(this).removeClass("not-img");
    }
  });
}
