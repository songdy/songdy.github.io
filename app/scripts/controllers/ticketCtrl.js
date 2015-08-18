'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: '../../views/ticket/index.html'
      })
      .state('ticket.1', {
        url: '/1/{id}',
        templateUrl: '../../views/ticket/ticket1.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.2', {
        url: '/2/{id}',
        templateUrl: '../../views/ticket/ticket2.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.3', {
        url: '/3/{id}',
        templateUrl: '../../views/ticket/ticket3.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.4', {
        url: '/4/{id}',
        templateUrl: '../../views/ticket/ticket4.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.5', {
        url: '/5/{id}',
        templateUrl: '../../views/ticket/ticket5.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.6', {
        url: '/6/{id}',
        templateUrl: '../../views/ticket/ticket6.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.7', {
        url: '/7/{id}',
        templateUrl: '../../views/ticket/ticket7.html',
        controller: 'ticketCtrl'
      });
  })
  .controller('ticketCtrl', function ($scope, $stateParams, ticketSvc) {
    var qrcodeData = null;
    var respData = ticketSvc.singleTicket({ ticketId: $stateParams.id }, function () {
      // TODO: 根据卡券类型执行以下代码
      var i = 0;
      var arr = [];
      var max = respData.merchant.tickets[0].maxPrinted;
      var val = respData.merchant.tickets[0].value;
      for(; i < max; i++) {
        arr.push({ clsName: i < val ? 'printed-card' : 'printed-card-empty' });
      }
      qrcodeData = 'http://again.51b.org';

      $scope.respData = respData;
      $scope.maxPrinted = arr;
      $scope.qrcodeData = qrcodeData;

    });
  });
