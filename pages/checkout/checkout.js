$(document).ready(function () {
  if ($(".checkout-list").length > 0) {
    $(".btn-change").on("click", function () {
      $(this)
        .parents(".checkout-item")
        .find(".checkout-item__body")
        .slideDown();
    });

    $(".btnCheck-prev").on("click", function () {
      let parents = $(this).parents(".checkout-item");

      openCheckItem(parents.prev(".checkout-item"));
      parents.find(".checkout-item__body").slideUp();
    });

    $(".btnCheck-next").on("click", function () {
      let parents = $(this).parents(".checkout-item");

      openCheckItem(parents.next(".checkout-item"));
      parents.find(".checkout-item__body").slideUp();
    });

    function openCheckItem(block) {
      block.find(".checkout-item__body").slideDown();
    }
  }
});

$(window).on("resize", function () {});
