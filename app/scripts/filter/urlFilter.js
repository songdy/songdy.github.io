'use strict';

app.filter('urlFilter', function (globalConfig) {
  return function (val) {
    if(/^http/ig.test(val)) {
      return val;
    } else if (/^\//.test(val)) {
      return globalConfig.apihost + '/again' + val;
    } else if (!!val) {
      return globalConfig.apihost + '/again/' + val;
    } else {
      return val;
    }
  };
});
