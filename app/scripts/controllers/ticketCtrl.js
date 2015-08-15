'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: '../../views/ticket/index.html'
      })
      .state('ticket.1', {
        url: '/1/{ticketId}',
        templateUrl: '../../views/ticket/ticket1.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.2', {
        url: '/2/{ticketId}',
        templateUrl: '../../views/ticket/ticket2.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.3', {
        url: '/3/{ticketId}',
        templateUrl: '../../views/ticket/ticket3.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.4', {
        url: '/4/{ticketId}',
        templateUrl: '../../views/ticket/ticket4.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.5', {
        url: '/5/{ticketId}',
        templateUrl: '../../views/ticket/ticket5.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.6', {
        url: '/6/{ticketId}',
        templateUrl: '../../views/ticket/ticket6.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.7', {
        url: '/7/{ticketId}',
        templateUrl: '../../views/ticket/ticket7.html',
        controller: 'ticketCtrl'
      });
  })
  .controller('ticketCtrl', function ($scope, $stateParams, ticketSvc) {
    console.log($stateParams)
  });
