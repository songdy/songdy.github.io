'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, loading) {

  var interceptor = {
    request: function(config) {
      if (config.url.indexOf('h5UseTicketStatus') < 0) {
        loading.show(null, 300);
      }
      var $state = $injector.get('$state');
      var $location = $injector.get('$location');
      var deferred = $q.defer();
      if (!$state.is('login')) {
        if (!!localStorage.getItem('accessToken')) {
          if (!config.headers.accessToken) {
            config.headers.accessToken = localStorage.getItem('accessToken');
            config.cache = false;
          }
          deferred.resolve(config);
        } else {
          deferred.reject('accessToken is required');
          $state.go('login', {
            redirect: $location.url()
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
    },
    responseError: function (rejection) {
      loading.hide();
      loading.show('网络不可用，请链接网络', 500, 3000);
      return $q.reject(rejection);
    }
  };

  return interceptor;
});
