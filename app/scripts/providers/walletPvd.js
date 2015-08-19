'use strict';

app.provider('walletPvd', function() {
  this.$get = function($resource, globalConfig) {
    return $resource(globalConfig.apihost + '/again/wallet/myWallet.do', {}, {
      query: {
        method: 'GET',
        isArray: false,
        params: {
          longitude: '23.22983202',
          latitude: '113.23928322'
        }
      }
    });
  };
});
