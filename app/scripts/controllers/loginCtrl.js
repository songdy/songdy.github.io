'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: function ($location, $state, loginSvc) {
      if ($location.$$search.code) {
        loginSvc.login({
          code: $location.$$search.code
        }, function (resp) {
          console.log('login.resp: ', resp);
        });
      } else {
        console.log('location.$$search: ', $location.$$search);
      }

      $state.go('ticket.4', { id: 'TUJpkxcRtcEcwNIMd1M89' });
    }
  });
});
