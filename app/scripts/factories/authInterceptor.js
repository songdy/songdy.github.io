'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, $location, loading) {
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
