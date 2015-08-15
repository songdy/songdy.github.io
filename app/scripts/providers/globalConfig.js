'use strict';

app.provider('globalConfig', function () {
  var host = 'http://183.63.144.83:33003';
  this.$get = function () {
    return {
      host: host
    };
  };
});
