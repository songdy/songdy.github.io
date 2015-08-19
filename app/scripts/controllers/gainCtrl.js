'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('gain', {
        url: '/gain',
        controller: 'gainCtrl'
      });
  })
  .controller('gainCtrl', function ($state, $stateParams) {
    $state.go('ticket.' + $stateParams.type, {
      id: $stateParams.ticketId
    });
  });
