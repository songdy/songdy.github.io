'use strict';

app.provider('globalConfig', function () {
  var host = 'http://183.63.144.83:33003';
  var mockapihost = "http://again.51b.org";
  this.$get = function () {
    return {
      host: host,
      mockapihost: mockapihost
    };
  };
});
