'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, $location, loading) {

  // TODO: 生产环境下把这个删除
  $rootScope.accessToken = 'UBJkgE9swtk0sB5NdVk5|3bb231d1-0f64-4d32-a01e-430e78be3657|1439540018038';

  var interceptor = {
    request: function(config) {
      loading.show();
      var $state = $injector.get('$state');
      var deferred = $q.defer();
      if (!$state.is('login')) {
        if (!$rootScope.accessToken) {
          deferred.reject('accessToken is required');
          $state.go('login', {
            from: $location.$$absUrl
          });
          loading.hide();
        } else {
          config.headers.accessToken = $rootScope.accessToken;
          deferred.resolve(config);
        }
      } else {
        deferred.resolve(config);
      }
      return deferred.promise;
    },
    response: function(resp) {
      loading.hide();
      return resp;
    }
  };

  return interceptor;
});
