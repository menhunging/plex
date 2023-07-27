$(document).ready(function () {
  if ($(".category-catalog").length > 0) {
    $(".category-catalog__menu").map(function () {
      let count = $(this).find("li").length;

      $(this)
        .parents(".category-catalog__item")
        .find(".category-catalog__more .count")
        .text(count - 4);

      if (count <= 4) {
        $(this).addClass("not-more");
      }
    });

    $(".category-catalog__more").on("click", function () {
      $(this)
        .parents(".category-catalog__item")
        .find(".category-catalog__menu")
        .addClass("visible");
    });
  }
});
