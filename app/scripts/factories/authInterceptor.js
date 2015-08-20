'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, $state, $location, loading) {

  var interceptor = {
    request: function(config) {
      loading.show();
      var $state = $injector.get('$state');
      var deferred = $q.defer();
      if (!$state.is('login')) {
        if (!!localStorage.getItem('accessToken')) {
          config.headers.accessToken = localStorage.getItem('accessToken');
          deferred.resolve(config);
        } else {
          alert(JSON.stringify($state.current));
          alert(JSON.stringify($state.get()));
          deferred.reject('accessToken is required');
          $state.go('login', {
            from: $location.absUrl()
          });
          loading.hide();
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
