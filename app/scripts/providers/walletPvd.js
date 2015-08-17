'use strict';

app.provider('walletPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.mockapihost + '/mockapi/myWallet.json', {}, {
      query: { method: 'GET', isArray: false }
    });
  };
});
