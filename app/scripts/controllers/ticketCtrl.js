'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: '../../views/ticket/index.html'
      })
      .state('ticket.1', {
        url: '/1',
        templateUrl: '../../views/ticket/ticket1.html',
        controller: 'ticketCtrl1'
      });
  })
  .controller('ticketCtrl1', function ($scope, ticketSvc) {
    $scope.$root.title = '我的卡包';
    $scope.tickets = ticketSvc.singleTicket();
  });
