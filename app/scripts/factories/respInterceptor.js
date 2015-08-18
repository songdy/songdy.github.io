'use strict';

app.factory('respInterceptor', function($q) {
  var interceptor = {
    response: function(resp) {
      var deferred = $q.defer();
      deferred.resolve(resp);
      return deferred.promise;
    },
    responseError: function(rejection) {
      return $q.reject(rejection);
    }
  };

  return interceptor;
});
