

'use strict';

app.provider('loginPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.host + '/again/weixin/getUserInfo.do', { }, {
      post: { method: 'POST', isArray: false }
    });
  };
});
