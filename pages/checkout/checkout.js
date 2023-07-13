$(document).ready(function () {
  if ($(".checkout-list").length > 0) {
    $(".btn-change").on("click", function () {
      $(".checkout-item").removeClass("opened");
      $(".checkout-item__body").stop().slideUp();

      $(this)
        .parents(".checkout-item")
        .addClass("opened")
        .find(".checkout-item__body")
        .stop()
        .slideDown();
    });

    $(".btnCheck-prev").on("click", function () {
      let parents = $(this).parents(".checkout-item");

      openCheckItem(parents.prev(".checkout-item"));
      parents
        .removeClass("opened")
        .find(".checkout-item__body")
        .stop()
        .slideUp();
    });

    $(".btnCheck-next").on("click", function () {
      let parents = $(this).parents(".checkout-item");

      openCheckItem(parents.next(".checkout-item"));
      parents
        .removeClass("opened")
        .find(".checkout-item__body")
        .stop()
        .slideUp();
    });

    function openCheckItem(block) {
      block.addClass("opened").find(".checkout-item__body").stop().slideDown();
    }
  }
});

$(window).on("resize", function () {});
