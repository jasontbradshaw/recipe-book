define(['jquery'], function ($) {
  // download and parse a recipe from this website
  var getRecipe = function (name) {
    return $.getJSON('/recipes/' + name + '.json').fail(function (xhr, err) {
      console.error(err);
    });
  };

  // collet all the recipes
  getRecipe('chicken-enchiladas').done(function (recipe) {
    console.log(recipe);
  });
});
