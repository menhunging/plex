// === функция для преобразования
// window.location.search = "?sort_name=price&sort_method=ASC&lol=kek"
let getObjFromWindowLocationSearch = (locationSearch) => {
  // === результат
  let objResult = new Object();

  if (locationSearch.length === 0) {
    return objResult;
  }

  // === исключить первый символ ?
  if (locationSearch[0] === "?") {
    locationSearch = locationSearch.slice(1);
  }

  // === получить массив с разбивкой строки по символу '&'
  let arTmp = locationSearch.split("&");

  // === перебрать массив и получить из него объект
  arTmp.forEach((element, index) => {
    // === получить массив с разбивкой строки по символу '='
    let arTmp = element.split("=");
    objResult[arTmp[0]] = arTmp[1];
  });

  return objResult;
};

// === функция для обратного преобразования

// в строку "?sort_name=price&sort_method=ASC&lol=kek" для window.location.search
let getWindowLocationSearchFromObj = (obj) => {
  // === результат
  let strResult = "";

  // === добавить в строку первым символом '?'
  strResult += "?";

  // === перебрать объект
  for (let i in obj) {
    strResult += i;
    strResult += "=";
    strResult += obj[i];
    strResult += "&";
  }

  // === если последний символ '&'
  // отрезать его
  if (strResult.slice(-1) === "&") {
    strResult = strResult.slice(0, -1);
  }

  return strResult;
};

// === изменение URL в адресной строке без перезагрузки страницы
let updateURL = function (newUrl) {
  if (history.pushState) {
    history.pushState(null, null, newUrl);
  } else {
    console.warn("Dаш браузер не поддерживает History API");
  }
};

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
    $(".header-menu-mobile").stop().slideToggle();
  },

  _initClickOnDocument(block) {
    $(document).mouseup(function (e) {
      if (
        !block.is(e.target) &&
        block.has(e.target).length === 0 &&
        !$(".btn-catalog").is(e.target)
      ) {
        block.stop().slideUp();
        $(".btn-catalog").removeClass("active");
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
    $(".header-menu-mobile").removeClass("init-click");
    $(".menu-link").off("click");
    $(".sub-link").off("click");
  },

  initClick() {
    $(".btn-catalog").on("click", () => {
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

    $(".header-menu-mobile__close").on("click", function () {
      $(".header-menu-mobile").stop().slideToggle();
    });

    $(".header-menu-mobile").addClass("init-click");
  },
  destroyClick() {
    // $(".menu-catalog").addClass("destroy-links");
    $("body").removeClass("hidden");
    $(".btn-catalog").removeClass("active");
    $(".btn-catalog").off("click");
    $(".burger-mobile__title").off("click");
    $(".header-menu-mobile").slideUp();
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

    $(".btn-catalog").on("click", () => {
      if (!$(".btn-catalog").hasClass("active")) {
        $(".burger").addClass("active");
        this._initClickOnDocument($(".menu-catalog"));
      } else {
        $(".btn-catalog").removeClass("active");
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
  // redesign scripts
  if ($(".grettings-slider").length > 0) {
    const swiper = new Swiper(".grettings-slider", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if ($(".question-answer").length > 0) {
    $(".question-answer__quest").on("click", function () {
      if ($(this).hasClass("opened")) {
        $(this)
          .removeClass("opened")
          .parents(".question-answer__line")
          .find(".question-answer__content")
          .stop()
          .slideUp();
      } else {
        $(this)
          .addClass("opened")
          .parents(".question-answer__line")
          .find(".question-answer__content")
          .stop()
          .slideDown();
      }
    });
  }

  if ($("#datepicker").length > 0) {
    $("#datepicker").datepicker({});
  }

  if ($(".rating-stars").length > 0) {
    $(".star").on("click", function () {
      let index = $(this).index();

      $(".star").removeClass("active");

      $(".star").map(function () {
        if ($(this).index() <= index) {
          $(this).addClass("active");
        }
      });
    });
  }

  if ($(".search-header").length > 0) {
    $(".search-header").on("click", function () {
      $(".search-block").stop().slideToggle();
    });
  }

  if ($(".product-characteristics__link").length > 0) {
    $(".product-characteristics__link").on("click", function (e) {
      e.preventDefault();
      $(".product-characteristics__link").hide();
      $(".product-characteristics ul").addClass("opened");
    });
  }

  if ($(".product-review__media").length > 0) {
    $(".product-review__media").map(function () {
      let self = $(this);
      let count = self.find(".site-media").length;

      if (count > 5) {
        let countblock = $(`<span class="count">+${count - 5}</span>`);
        self.addClass("more");
        self.find(".site-media").eq(4).append(countblock);
      }
    });
  }

  if ($(".slider-optovik-productions").length > 0) {
    const swiper = new Swiper(".slider-optovik-productions", {
      slidesPerView: 4,
      spaceBetween: 18,
      // loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".slider-optovik-productions__prev",
        nextEl: ".slider-optovik-productions__next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 4,
        },
      },
    });
  }

  if ($(".optovik-adv__list").length > 0) {
    const swiper = new Swiper(".optovik-adv__list", {
      slidesPerView: 5,
      spaceBetween: 30,
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      // navigation: {
      //   prevEl: ".slider-optovik-productions__prev",
      //   nextEl: ".slider-optovik-productions__next",
      // },
      breakpoints: {
        0: {
          slidesPerView: 1.25,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1600: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });
  }

  // /redesign scripts

  if ($(".btn-catalog").length > 0) {
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
    initJsLinkOpen = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sort_name = urlParams.get("sort_name");
      const sort_method = urlParams.get("sort_method");
      if (sort_name == "popular") {
        $(".js-link-open-sort").text("Популярные");
      }

      if (sort_name == "price" && sort_method == "desc") {
        $(".js-link-open-sort").text("По цене (убывание)");
      }
      if (sort_name == "price" && sort_method == "asc") {
        $(".js-link-open-sort").text("По цене (возрастание)");
      }
      $(".js-link-open").on("click", function () {
        let than = $(this);
        let block = than.siblings(".js-block-show");

        than.toggleClass("opened");
        block.stop().slideToggle();

        block.find("a").on("click", function (event) {
          //event.preventDefault();
          // than.text($(this).text());
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
    };
    initJsLinkOpen();
  }

  if ($(".linkFancyBox").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      let input = $(this);
      setMask(input);
      handleNotEmpty(input);
    });

    function handleNotEmpty(input) {
      input.on("keyup", function () {
        let val = $(this).val();

        if (val === "+7(8**) ***-**-**") {
          $(this).inputmask("remove");
          $(this).val("8");
          handleEmpty($(this));
        }

        if (val === "") {
          $(this).off("keyup");
          setMask($(this));
        }
      });
    }

    function handleEmpty(input) {
      setTimeout(function () {
        input.on("keyup", function () {
          let val = $(this).val();

          if (val === "") {
            $(this).off("keyup");
            setMask($(this));
            handleNotEmpty($(this));
          }
        });
      }, 100);
    }

    function setMask(self) {
      self.inputmask({
        mask: "+9 (999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    }
  }

  if ($(".phone-mask").length > 0) {
    $(".phone-mask").map(function () {
      let input = $(this);
      setMask(input);
      handleNotEmpty(input);
    });

    function handleNotEmpty(input) {
      input.on("keyup", function () {
        let val = $(this).val();

        if (val === "+7 8** ***-**-**") {
          $(this).inputmask("remove");
          $(this).val("");
          $(this).inputmask({
            mask: "+8 999 999-99-99",
            placeholder: "*",
            showMaskOnHover: false,
            showMaskOnFocus: true,
            clearIncomplete: true,
          });
          handleEmpty($(this));
        }

        if (val === "") {
          $(this).off("keyup");
          setMask($(this));
        }
      });
    }

    function handleEmpty(input) {
      setTimeout(function () {
        input.on("keyup", function () {
          let val = $(this).val();

          if (val === "") {
            $(this).off("keyup");
            setMask($(this));
            handleNotEmpty($(this));
          }
        });
      }, 100);
    }

    function setMask(self) {
      self.inputmask({
        mask: "+7 999 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    }
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
        onChange: function (element) {
          let parents = $(element).parents("#modal-your-details");

          if (parents.length > 0) {
            let value = $(this).val();

            if (value === "2") {
              parents.addClass("entity");
            } else {
              parents.removeClass("entity");
            }
          }
        },
        onClose: function (element) {},
      });
    });
  }

  if ($(".tabs").length > 0) {
    $(".tabs:not(.tabs--noscript)").tabslet({
      mouseevent: "click",
      attribute: "href",
      animation: true,
    });
  }

  if ($(".banner-box").length > 0) {
    initBannerHover();
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
            var files = this.files;
            var maxFileSize = 4 * 1024 * 1024;
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              var error = false;
              if (
                !file.type.match(
                  /application\/(pdf|vnd.openxmlformats-officedocument.wordprocessingml.document)/
                )
              ) {
                alert("Документ должен быть в формате pdf, docx");
                error = true;
                continue;
              }

              if (file.size > maxFileSize) {
                alert("Размер Документа не должен превышать 4 Мб");
                error = true;
                continue;
              }
            }
            if (error == false) {
              $(this).closest("form").find(".btn").attr("disabled", false);

              $(".file-load__info").addClass("loading");
              console.log($(this).prop("files")[0]);
              let name = $(this).prop("files")[0].name;
              let size = $(this).prop("files")[0].size;

              $(".file-load__text .name").text(name);
              $(".file-load__text .size").text(`${formatBytes(size, 3)}`);
            }
          }
        });

      $(this)
        .find(".file-load__delete")
        .on("click", function (event) {
          event.preventDefault();

          let inputFile = $(this).closest("form").find("input");

          inputFile.value = "";

          $(this).closest("#modal-resume").find(".btn").attr("disabled", true);
          $(".file-load__info").removeClass("loading");
        });
    });
  }

  if ($(".product-name").length > 0) {
    setProductName();
  }

  if ($(".collections-list").length > 0) {
    filterTags = $(".collections-list li");
    tagsInit(filterTags);
  }

  if ($(".catergory-section").length > 0) {
    $(".category-list").before($(".breadcrumbs"));
    $(".category-list").before($(".title-page"));
    $(".catergory-section").addClass("load");

    if ($(window).width() < 768) {
      initMobileCategory();
    }
  }
});

function initMobileCategory() {
  if ($(".category-list").hasClass("init")) {
    return false;
  }

  $(".category-list").removeClass("destroy").addClass("init");

  let defaultHeight = $(".category-list").outerHeight();
  let count = $(".category-item").length;
  let num = 11; // сколько показывать на мобиле
  let height = 0;
  let gap = 16 * (num - 1);

  if (count > num) {
    $(".category-item").map(function (index, elem) {
      if (index < num) {
        height += $(this).outerHeight();
      }
    });

    height = height + gap;
    setMobileHeight(height);
    $(".catergory-section").addClass("mobile-init");
  }

  $(".link-more-category").on("click", function (e) {
    e.preventDefault();
    let active = $(this).attr("data-active");
    let text = $(this).attr("data-text");

    if ($(this).hasClass("active")) {
      $(this).text(text);
      $(this).removeClass("active");
      $(".category-list").height(height);
    } else {
      $(this).text(active);
      $(this).addClass("active");
      $(".category-list").height(defaultHeight);
    }
  });
}

function destroyMobileCategory() {
  if ($(".category-list").hasClass("destroy")) {
    return false;
  }

  $(".category-list").removeClass("init").addClass("destroy");

  $(".category-list").attr("style", "");
  $(".link-more-category")
    .removeClass("active")
    .off("click")
    .text($(".link-more-category").attr("data-text"));

  $(".catergory-section").removeClass("mobile-init");
}

function setMobileHeight(height) {
  $(".category-list").height(height);
}

function tagsInit(list) {
  if ($(".collections-list").hasClass("init")) {
    return false;
  }

  let button = `<button class="catalog-collections__more catalog-collections__more--plus">
                  <span class="symbol">+</span>
                </button>`;

  if (list.length > 3) {
    list.remove();

    for (let i = 0; i < 3; i++) {
      $(".collections-list").append(list[i]);
    }

    $(".collections-list").addClass("init").addClass("load");
    $(".collections-list").append(button);

    $(".collections-list .catalog-collections__more").on("click", function () {
      $(this).remove();
      for (let i = 3; i < list.length; i++) {
        $(".collections-list").append(list[i]);
      }
    });
  } else {
    $(".collections-list").addClass("load");
  }
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

$(window).on("resize", function () {
  if ($(".js-mobile-open").length > 0) {
    if ($(window).width() >= 767) {
      footer.destroyAccardeon();
    } else {
      footer.initAccardeon();
    }
  }

  if ($(".btn-catalog").length > 0) {
    if ($(window).width() <= 767) {
      if (!$(".header-menu-mobile").hasClass("init-click")) {
        burger.initClick();
        burger.initLink();
      }
    } else {
      burger.destroyLink();
      burger.destroyClick();
      burger.initCatalogBurger();
    }
  }

  if ($(".catergory-section").length > 0) {
    if ($(window).width() < 768) {
      initMobileCategory();
    } else {
      destroyMobileCategory();
    }
  }
});

function initBannerHover() {
  $(".banner-box").hover(function () {
    let index = $(this).index();
    let box = $(".banner-pictures__box");
    let links = $(".banner-box");

    links.removeClass("active");
    box.removeClass("large");
    $(this).addClass("active");
    box.eq(index).addClass("large");

    $(".catalog-item").stop().hide(300);
    let id = $(this).data("id");

    if (id != "") {
      $('.catalog-item[data-section="' + id + '"]')
        .stop()
        .show(300);
    }
  });
}

function openModal(modal) {
  MicroModal.show(modal);
  $(".modal__close").on("click", function () {
    closeModal(modal);
  });
  $("body").addClass("modal-open");

  $(`#${modal} [data-micromodal-close]`).on("click", function () {
    closeModal(modal);
  });
}

function closeModal(modal) {
  console.log("close", modal);
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

function setProductName() {
  $(".product-name").map(function () {
    let than = $(this);
    let text = than.text().replaceAll(" ", "");

    text.length > 40 && than.addClass("big");
  });
}

$(document).on("submit", "#questions-from", function (e) {
  e.preventDefault();
  $(this).find(".sp").val("nospam");
  $(this).find(".name").val("name");
  var wf_class = $(this).data("wf-class");
  var wf_class2 = $(this).data("wf-class2");
  var form = $(this);
  var actionUrl = form.attr("action");
  $.ajax({
    type: "post",
    url: actionUrl,
    dataType: "html",
    data: $(this).serialize(),
    success: function (response) {
      form[0].reset();
      // if (response.length > 0) {
      if (wf_class != "") {
        closeModal(wf_class);
      }
      if (wf_class2 != "") {
        closeModal(wf_class2);
        //document.location.href="/";
      }
      openModal("modal-success");
    },
  });
  return false;
});

$(document).on("submit", "#form-zakaz", function (e) {
  $(this).find(".sp").val("nospam");
  var wf_class = $(this).data("wf-class");
  var wf_class2 = $(this).data("wf-class2");
  e.preventDefault();
  var form = $(this);
  var actionUrl = form.attr("action");
  $.ajax({
    type: "post",
    url: actionUrl,
    dataType: "html",
    data: new FormData(this),
    contentType: false,
    processData: false,
    success: function (response) {
      form[0].reset();
      // if (response.length > 0) {
      if (wf_class != "") {
        closeModal(wf_class);
      }
      if (wf_class2 != "") {
        closeModal(wf_class2);
        //document.location.href="/";
      }
      openModal("modal-success");
    },
  });
  return false;
});

/*AJAX POPUP FORM FROM LINK*/
$(document).on("click", ".getPopupFormFile", function () {
  let wf_file_path = $(this).data("wf-file-path"),
    wf_class = $(this).data("wf-class"),
    wf_id =
      typeof $(this).data("wf-id") !== "undefined" ? $(this).data("wf-id") : "",
    form_type =
      typeof $(this).data("form-type") !== "undefined"
        ? $(this).data("form-type")
        : "",
    sendData = {
      SEND: "Y",
      HTML: "Y",
    };
  if (
    typeof wf_file_path !== "undefined" &&
    wf_file_path != "" &&
    typeof wf_class !== "undefined" &&
    wf_class != ""
  ) {
    if (form_type != "") {
      sendData.FORM_TYPE = form_type;
    }

    if (wf_id != "") {
      sendData.WF_ID = wf_id;
    }
    console.log(sendData);
    BX.ajax({
      url: wf_file_path,
      method: "POST",
      data: sendData,
      dataType: "html",
      async: true,
      processData: true,
      scriptsRunFirst: false,
      emulateOnload: false,
      start: true,
      cache: false,
      onsuccess: function (html) {
        console.log(wf_class);
        openModal(wf_class);
        $("#" + wf_class).html(html);
        //closeModal('modal-your-details');
      },
      onfailure: function (data) {
        console.log(data);
      },
    });
  }
  return false;
});

$(document).on("submit", "#subscribe-add-js", function (e) {
  $(this).find(".sp").val("nospam");
  e.preventDefault();
  $.ajax({
    type: "post",
    url: "/local/templates/plex/ajax/add-subscribe2.php",
    dataType: "html",
    data: $(this).serialize(),
    success: function (response) {
      if (response.length > 0) {
        $("#subscribe-add-js").html(response);
      }
    },
  });
});

$(document).on("submit", "#form-jobs", function (e) {
  $(this).find(".sp").val("nospam");
  var wf_class = $(this).data("wf-class");
  e.preventDefault();
  var form = $(this);
  var actionUrl = form.attr("action");
  $.ajax({
    type: "post",
    url: actionUrl,
    dataType: "html",
    data: new FormData(this),
    contentType: false,
    processData: false,
    success: function (response) {
      form[0].reset();

      if (wf_class != "") {
        closeModal(wf_class);
      }
      openModal("modal-success");
    },
  });
});

$(document).on("click", ".load_more", function () {
  var targetContainer = $(".catalog-list"),
    url = $(".load_more").attr("data-url");
  if (url !== undefined) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "html",
      success: function (data) {
        window.history.pushState("", "", url);

        $(".catalog__controls").remove();

        var elements = $(data).find(".catalog-item"), //  Ищем элементы
          pagination = $(data).find(".catalog__controls"); //  Ищем навигацию

        targetContainer.append(elements); //  Добавляем посты в конец контейнера
        $(".catalog-page__catalog").append(pagination); //  Добавляем посты в конец контейнера
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
      },
    });
  }
});

$(document).on("click", ".js-form-zakaz", function () {
  closeModal("modal-checkout");
  MicroModal.show("modal-your-details");
  $("body").addClass("modal-open");
});

$(document).on("click", ".load_more_search", function () {
  var targetContainer = $(".catalog-list"),
    url = $(".load_more_search").attr("data-url");
  if (url !== undefined) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "html",
      success: function (data) {
        window.history.pushState("", "", url);

        $(".catalog__controls").remove();

        var elements = $(data).find(".catalog-item"), //  Ищем элементы
          pagination = $(data).find(".catalog__controls"); //  Ищем навигацию

        targetContainer.append(elements); //  Добавляем посты в конец контейнера
        $(".search-page .container").append(pagination); //  Добавляем посты в конец контейнера

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
      },
    });
  }
});
