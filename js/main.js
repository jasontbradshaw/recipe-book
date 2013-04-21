define([
  'jquery',
  'vendor/inflection',
  'recipes',
  'm!templates/recipe.html'
], function ($, inflection, recipes, tmplRecipe) {

  $('#content').append(tmplRecipe(recipes[0]));
});
