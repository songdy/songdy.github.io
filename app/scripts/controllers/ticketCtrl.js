'use strict';

app.config(function($stateProvider) {
  $stateProvider
    .state('ticket', {
      url: '/ticket',
      templateUrl: '../../views/ticket/index.html'
    })
    .state('ticket.1', {
      url: '/detail/{type:1}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket1.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.2', {
      url: '/detail/{type:2}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket2.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.3', {
      url: '/detail/{type:3}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket3.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.4', {
      url: '/detail/{type:4}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket4.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.5', {
      url: '/detail/{type:5}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket5.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.6', {
      url: '/detail/{type:6}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket6.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.7', {
      url: '/detail/{type:7}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/ticket7.html',
      controller: 'ticketCtrl'
    })
    .state('ticket.gain', {
      url: '/gain/{type}/{ticketId}/{deviceCode}/{serviceCurrentTime}/{numerical}',
      controller: 'gainTicketCtrl'
    })
    .state('ticket.share', {
      url: '/share/{type}/{id}/{accessToken}',
      templateUrl: '../../views/ticket/share.html',
      controller: 'shareTicketCtrl'
    });
}).controller('ticketCtrl', function($scope, $state, $stateParams, ticketSvc, sharing) {

  if ($stateParams.accessToken !== localStorage.getItem('accessToken')) {
    $state.go('ticket.share', {
      type: $stateParams.type,
      id: $stateParams.id,
      accessToken: $stateParams.accessToken
    });
    return;
  }

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
        type: ticket.type,
        serverCurrentTime: respData.serverCurrentTime
      });
      $scope.qrcodeData = qrcodeData;
    }

    $scope.merchant = respData.merchant;
    $scope.qrcodeVersion = 7;

    // var status = ticketSvc.h5UseTicketStatus({
    //   ticketId: ticket.id
    // }, function() {
    //   if (!!status.serverCurrentTime) {
    //   } else {
    //     alert('二维码生成失败');
    //   }
    // });

    $scope.shareWith = function() {
      sharing.show();
    };
  });
}).controller('gainTicketCtrl', function($state, $stateParams, $q, $location, ticketSvc) {

  var respData = ticketSvc.h5ConfirmTicket({
    deviceCode: $stateParams.deviceCode,
    ticketId: $stateParams.ticketId,
    serverCurrentTime: $stateParams.serviceCurrentTime,
    numerical: $stateParams.numerical
  }, function() {
    if (respData.code !== '00000') {
      if (!!respData.desc) {
        alert(respData.desc);
      } else {
        alert('领取失败，请重新领取');
      }
      return;
    }

    $state.go('ticket.' + $stateParams.type, {
      id: respData.targetTicketId,
      userId: localStorage.getItem('userId')
    });
  });
}).controller('shareTicketCtrl', function($scope, $stateParams, $http, globalConfig, ticketSvc) {
  $scope.$root.title = '我的就是你的';
  // var respData = ticketSvc.singleTicket({
  //   ticketId: $stateParams.id
  // }, function() {
  //   $scope.merchant = respData.merchant;
  // });
  $http({
    method: 'GET',
    url: globalConfig.apihost + '/again/ticket/weixinSingleTicket.do' + $stateParams.id,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accessToken': $stateParams.accessToken
    },
    cache: false
  }).success(function(respData) {
    alert(JSON.stringify(respData));
    $scope.merchant = respData.merchant;
  }).error(function(err) {
    alert(JSON.stringify(err));
  });
});
