define(['jquery', 'vendor/lunr'], function ($, lunr) {

  // build and return an index for recipies and a function to convert recipes to
  // index-able objects.
  return {
    // the index that does the actual searching
    index: lunr(function () {
      this.ref('id');

      this.field('title', { boost: 10 });
      this.field('description', { boost: 6 });
      this.field('ingredients', { boost: 3 });
      this.field('notes', { boost: 2 });
      this.field('directions', { boost: 1 });
    }),

    // how we turn a recipe into an index
    recipeToIndex: function (id, recipe) {
      // return a new object with data from the recipe and the specified id
      var recipeDocument = {
        id: id,

        title: recipe.title || '',
        description: recipe.description || '',

        ingredients: $.map(recipe.ingredients || [], function (ingredient) {
          return ingredient.name;
        }).join('\n'),

        notes: $.map(recipe.notes || [], function (note) {
          return note;
        }).join('\n'),

        directions: $.map(recipe.directions || [], function (step) {
          return step.text;
        }).join('\n')
      };

      return recipeDocument;
    }
  };

});
