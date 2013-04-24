require.config({
  baseUrl: 'js',
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
    moment: 'vendor/moment.min'
  },
  main: 'main'
});
require(['main']);
