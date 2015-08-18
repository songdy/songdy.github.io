'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: function ($location, $state, $http, globalConfig) {
      if ($location.$$search.code) {
        $http({
          method: 'POST',
          url: globalConfig.host + '/again/weixin/getUserInfo.do',
          data: {
            code: $location.$$search.code
          },
          cache: false
        }).success(function(data) {

        }).error(function(err) {
        },
      } else {
        
      }

      $state.go('ticket.4', { id: 'TUJpkxcRtcEcwNIMd1M89' });
    }
  });
});
