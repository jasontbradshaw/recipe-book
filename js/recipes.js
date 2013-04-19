define([
  'jquery',
  'json!recipes/chicken-enchiladas'
], function ($) {
  // return an array of all the recipes included via require (exclude jQuery)
  return $.makeArray(arguments).slice(1);
});
