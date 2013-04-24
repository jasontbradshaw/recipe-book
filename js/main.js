define([
  'jquery',
  'vendor/inflection',
  'moment',
  'recipes',
  'm!templates/recipe.html'
], function ($, inflection, moment, recipes, tmplRecipe) {

  var buildRecipe = function (recipe) {
    var $recipe = $(tmplRecipe(recipe));

    // pluralize necessary amounts
    $recipe.find('.measure').each(function () {
      var $type = $(this).find('.type');
      var $value = $(this).find('.value');

      if (parseInt($value.text(), 10) !== 1 && $type.text() !== '' && $type.text() !== '') {
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

    return $recipe;
  };

  $('#content').append(buildRecipe(recipes[0]));
});
