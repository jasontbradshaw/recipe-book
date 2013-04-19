define(['jquery', 'vendor/mustache'], function ($, Mustache) {
  var load = function (name, parentRequire, onload, config) {
    // append '.mustache' to the path if it's not already there
    if (!/\.mustache$/.test(name)) { name += '.mustache'; }

    $.ajax({
      url: name,
      dataType: 'text'
    }).fail(function (xhr, status, err) {
      // log an error and return a dummy function
      console.error('failed to load template (' + status + '): ' + name);
      console.error(err);
      onload(function () { return 'error loading template: ' + name; });
    }).done(function (data, status, xhr) {
      // compile the template and return the compiled result
      onload(Mustache.compile(data));
    });
  };

  return { load: load };
});
