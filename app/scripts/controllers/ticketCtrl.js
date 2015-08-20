'use strict';

app.config(function($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: '../../views/ticket/index.html'
      })
      .state('ticket.1', {
        url: '/1/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket1.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.2', {
        url: '/2/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket2.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.3', {
        url: '/3/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket3.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.4', {
        url: '/4/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket4.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.5', {
        url: '/5/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket5.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.6', {
        url: '/6/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket6.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.7', {
        url: '/7/{id}/{userId}',
        templateUrl: '../../views/ticket/ticket7.html',
        controller: 'ticketCtrl'
      })
      .state('ticket.gain', {
        url: '/gain/{type}/{ticketId}/{serviceCurrentTime}/{numerical}',
        controller: 'gainTicketCtrl'
      });
  })
  .controller('ticketCtrl', function($scope, $stateParams, ticketSvc) {
    var qrcodeData = '';
    var respData = ticketSvc.singleTicket({
      ticketId: $stateParams.id
    }, function() {
      // TODO: 根据卡券类型执行以下代码
      var i = 0;
      var arr = [];
      var ticket = respData.merchant.tickets[0];
      var max = respData.merchant.tickets[0].maxPrinted;
      var val = respData.merchant.tickets[0].value;
      for (; i < max; i++) {
        arr.push({
          clsName: i < val ? 'printed-card' : 'printed-card-empty'
        });
      }

      if (val >= max) {
        qrcodeData = ticket.id + ';' + localStorage.getItem('userId') + ';' + localStorage.getItem('userId') + ';' + ticket.type;
      }

      $scope.respData = respData;
      $scope.maxPrinted = arr;
      $scope.qrcodeData = qrcodeData;
      $scope.qrcodeVersion = 6;

    });
  })
  .controller('gainTicketCtrl', function($state, $stateParams, $q, $location, ticketSvc) {

    var isErr = function(result) {
      if (result.code !== '00000') {
        if (!!result.desc) {
          alert(result.desc);
        } else {
          alert('领取失败，请重新领取');
        }
        return true;
      }
      return false;
    };

    var confirm = ticketSvc.h5ConfirmTicket({
      deviceCode: localStorage.getItem('userId'),
      type: $stateParams.type,
      ticketId: $stateParams.ticketId,
      serverCurrentTime: $stateParams.serverCurrentTime,
      numerical: $stateParams.numerical
    }, function() {
      if (isErr(confirm)) {
        return;
      }
      $state.go('ticket.' + $stateParams.type, {
        id: confirm.targetTicketId,
        userId: localStorage.getItem('userId')
      });

    });
  });
