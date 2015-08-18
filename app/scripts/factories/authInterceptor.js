'use strict';

app.factory('authInterceptor', function($q, $rootScope, $injector, loading) {
  var interceptor = {
    request: function(config) {
      loading.show();
      var $state =  $injector.get('$state');
      console.log('$state.$current.name: ', $state.$current.name);
      console.log('$state.is("login"): ', $state.is('login'));
      var deferred = $q.defer();
      // if (!$rootScope.accessToken &&  !$state.is('login')) {
      //   deferred.reject('accessToken is required');
      //   $state.go('login')
      //   loading.hide();
      // } else {
        config.headers.accessToken = 'UBJkgE9swtk0sB5NdVk5|3bb231d1-0f64-4d32-a01e-430e78be3657|1439540018038';
        deferred.resolve(config);
      // }
      return deferred.promise;
    },
    response: function (resp) {
      loading.hide();
      return resp;
    }
  };

  return interceptor;
});
