define([
  'jquery',
  'vendor/inflection',
  'moment',
  'search',
  'recipes',
  'm!templates/recipe.html'
], function ($, inflection, moment, search, recipes, tmplRecipe) {

  // defer a function call until the stack is clear
  var defer = function (f) {
    setTimeout(function () { f(); }, 0);
  };

  // create a recipe jQuery DOM object, binding appropriate events
  var buildRecipe = function (recipe) {
    var $recipe = $(tmplRecipe(recipe));

    // pluralize amounts as necessary
    $recipe.find('.measure').each(function () {
      var $type = $(this).find('.type');
      var $value = $(this).find('.value');

      // pluralize only non-one values that have a type (i.e. aren't a count)
      var value = parseInt($value.text(), 10);
      if (value !== 1 && $type.text() !== '') {
        $type.text(inflection.pluralize($type.text()));
      }
    });

    // turn the duration minutes into a nice "x hours, y minutes" time
    var $time = $recipe.find('.prep-time .minutes');
    var duration = moment.duration(parseInt($time.text(), 10), 'minutes');

    // make the time human-friendly
    var hoursText = '';
    if (duration.hours() > 0) {
      hoursText += duration.hours() + ' hours, ';
    }
    $time.text(hoursText + duration.minutes() + ' minutes');

    // select ingredients involved in a step when that step is hovered
    var $ingredients = $recipe.find('.ingredient');
    var selectedClass = 'selected';
    $recipe.delegate('.direction', 'mouseenter', function (event) {
      $ingredients.removeClass(selectedClass);

      // build a list of all the ingredients selectors
      var ingredientIds = $(this).attr('data-ingredient-ids').split(',').slice(0, -1);
      var idSelectors = $.map(ingredientIds, function (id) {
        return '[data-id="' + id + '"]';
      });

      // highlight all the selected ingredients
      $ingredients.filter(idSelectors.join(',')).addClass(selectedClass);
    }).delegate('.direction', 'mouseleave', function () {
      // un-highlight ingredients when we're done hovering
      $ingredients.removeClass(selectedClass);
    });

    return $recipe;
  };

  // add the recipes to the search index (in the background after initial load)
  $.each(recipes, function (i, recipe) {
    // use the array index as the recipe's id so we can get it later
    defer(function () { search.index.add(search.recipeToIndex(i, recipe)); });
  });

  // set up the search bar
  var $search = $('#search input');
  var loadingClass = 'loading';
  var delay = 350;
  var searchTimeout = null;

  // update the search results with a new query
  var getSearchResults = function (q) {
    var results = $.map(search.index.search(q) || [], function (result) {
      // get each recipe by its index
      return recipes[parseInt(result.ref, 10)];
    });

    $search.removeClass(loadingClass);
  };

  $search.on('keydown keyup change', function (e) {
    // mark that we're searching
    $search.addClass(loadingClass);

    // always reset the search timeout
    clearTimeout(searchTimeout);
    searchTimeout = null;

    var query = $search.val();
    if (e.keyCode === 13) {
      // start searching immediately if return is pressed
      defer(function () { getSearchResults(query); });
    } else {
      // start the timer to search for matching results
      searchTimeout = setTimeout(function () { getSearchResults(query); }, delay);
    }
  });
});
