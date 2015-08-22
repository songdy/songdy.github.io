'use strict';

app.provider('globalConfig', function () {
  this.$get = function () {
    return {
      // apihost: 'http://183.63.144.83:33003',
      apihost: '10.10.101.126:33003',
      clienthost: 'http://again.51b.org',
      wxAppid: 'wx87de30e37dd369b6'
    };
  };
});
