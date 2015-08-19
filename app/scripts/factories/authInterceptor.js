'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, $location, loading) {

  // TODO: 生产环境下把这两行代码删除
  // $rootScope.accessToken = 'UBJkgE9swtk0sB5NdVk5|3bb231d1-0f64-4d32-a01e-430e78be3657|1439540018038';
  // $rootScope.userId = $rootScope.accessToken.split('|')[0];

  var interceptor = {
    request: function(config) {
      loading.show();
      var $state = $injector.get('$state');
      var deferred = $q.defer();
      if (!$state.is('login')) {
        if (localStorage.getItem('accessToken')) {
          deferred.reject('accessToken is required');
          $state.go('login', {
            from: $location.$$absUrl
          });
          loading.hide();
        } else {
          // config.headers.accessToken = localStorage.getItem('accessToken');
          config.headers.accessToken = 'UE1VhFsJY40gIYApxstp|Ftxl4M9ZF4I5BBw0Ist|1439980460755';
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
