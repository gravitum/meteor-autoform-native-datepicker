Package.describe({
  name: 'partus:autoform-native-datepicker',
  summary: 'Native (android,ios) datepicker input type for AutoForm with  fallback to bootstrap datetimepicker',
  version: '0.0.1',
  git: 'https://github.com/gravitum/meteor-native-datepicker.git'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.use('underscore@1.0.3');
  api.addFiles([
    'datepicker.html',
    'datepicker.js'
  ], 'web.browser');  
  api.addFiles([
    'datepicker.html',
    'native.js'
  ], 'web.cordova');
});

Cordova.depends({
    'com.okaybmd.cordova.plugin.datepicker': 'https://github.com/partus/cordova-plugin-datepicker/tarball/ac4b4411ce7a11c546232fb0036e3a19242e9630'
});
