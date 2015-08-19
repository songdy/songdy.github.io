'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('gainTicket', {
        url: '/gainTicket',
        controller: 'gainTicketCtrl'
      });
  })
  .controller('gainTicketCtrl', function ($state, $location) {
    $state.go('ticket.' + $location.$$search.type, {
      id: $location.$$search.ticketId
    });
  });
