'use strict';

app.provider('walletPvd', function() {
  this.$get = function($resource, globalConfig, respInterceptor) {
    // return $resource(globalConfig.host + '/again/wallet/myWallet.do', {}, {
    return $resource(globalConfig.mockapihost + '/mockapi/myWallet.json', {}, {
      query: {
        method: 'GET',
        isArray: false,
        interceptor: respInterceptor
        // headers: {
        //   accessToken: 'UBJkgE9swtk0sB5NdVk5|3bb231d1-0f64-4d32-a01e-430e78be3657|1439540018038'
        // }
      }
    });
  };
});
