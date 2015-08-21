'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, loading) {

  var interceptor = {
    request: function(config) {
      if (config.url.indexOf('h5UseTicketStatus') < 0) {
        loading.show();
      }
      var $state = $injector.get('$state');
      var $location = $injector.get('$location');
      var deferred = $q.defer();
      if (!$state.is('login')) {
        if (!!localStorage.getItem('accessToken')) {
          if (!config.headers.accessToken) {
            config.headers.accessToken = localStorage.getItem('accessToken');
          }
          deferred.resolve(config);
        } else {
          deferred.reject('accessToken is required');
          alert($location.url());
          $state.go('login', {
            redirect: encodeURIComponent($location.url())
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
