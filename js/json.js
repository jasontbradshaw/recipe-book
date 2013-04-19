define(['jquery'], function ($) {
  var load = function (name, parentRequire, onload, config) {
    // append '.json' to the path if it's not already there
    if (!/\.json$/.test(name)) { name += '.json'; }

    // download as text so we can throw more helpful errors depending on whether
    // it failed to load or parse.
    $.ajax({
      url: name,
      dataType: 'text'
    }).fail(function (xhr, status, err) {
      console.error('failed to load: ' + name);
      console.error(err);
      onload({});
    }).done(function (data, status, xhr) {
      var json = {};
      try {
        json = $.parseJSON(data);
      } catch (e) {
        console.error('failed to parse JSON from: ' + name);
        console.error(e);
      }
      onload(json);
    });
  };

  return { load: load };
});
