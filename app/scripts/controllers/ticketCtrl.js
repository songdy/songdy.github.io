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
        url: '/gain/{type}/{ticketId}/{deviceCode}/{serviceCurrentTime}/{numerical}',
        controller: 'gainTicketCtrl'
      });
  })
  .controller('ticketCtrl', function($scope, $stateParams, ticketSvc, sharing) {
    var qrcodeData = '';
    var respData = ticketSvc.singleTicket({
      ticketId: $stateParams.id
    }, function() {
      // TODO: 根据卡券类型执行以下代码
      var ticket = respData.merchant.tickets[0];

      var max = ticket.maxPrinted;
      var val = ticket.value;
      if (ticket.type === 2) {
        var i = 0;
        var arr = [];
        for (; i < max; i++) {
          arr.push({
            clsName: i < val ? 'printed-card' : 'printed-card-empty'
          });
        }
        $scope.maxPrinted = arr;
      }
      if (ticket.type !== 2 || val >= max) {
        qrcodeData = JSON.stringify({
          ticketId: ticket.id,
          senderId: localStorage.getItem('userId'),
          type: ticket.type
        });
      }

      $scope.respData = respData;
      $scope.qrcodeData = qrcodeData;
      $scope.qrcodeVersion = 6;

      $scope.shareWith = function () {
        sharing.show();
      };
    });
  })
  .controller('gainTicketCtrl', function($state, $stateParams, $q, $location, ticketSvc) {

    var isErr = function(result) {
      if (result.code !== '00000') {
        if (!!result.desc) {
          alert(result.desc);
        } else {
          alert('领取失败，请重新领取');
          alert(JSON.stringify(result));
        }
        return true;
      }
      return false;
    };

    var confirmParams = {
      deviceCode: $stateParams.deviceCode,
      ticketId: $stateParams.ticketId,
      serverCurrentTime: $stateParams.serviceCurrentTime,
      numerical: $stateParams.numerical
    };

    var confirm = ticketSvc.h5ConfirmTicket(confirmParams, function() {
      if (isErr(confirm)) {
        return;
      }

      $state.go('ticket.' + $stateParams.type, {
        id: confirm.targetTicketId,
        userId: localStorage.getItem('userId')
      });
    });
  });
