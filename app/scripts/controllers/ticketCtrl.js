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
    })
    .state('ticket.friends', {
      url: '/friends/{data}',
      templateUrl: '../../views/ticket/friends.html',
      controller: 'friendsCtrl'
    });
}).controller('ticketCtrl', function($scope, $state, $stateParams, $interval, ticketSvc, sharing) {

  var accessToken = localStorage.getItem('accessToken');
  var userId = !!accessToken && accessToken.split('|')[0];

  if ($stateParams.accessToken.split('|')[0] !== userId) {
    $state.go('ticket.share', {
      type: $stateParams.type,
      id: $stateParams.id,
      accessToken: $stateParams.accessToken
    });
    return;
  }

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
      $scope.qrcodeData = {
        ticketId: ticket.id,
        senderId: localStorage.getItem('userId'),
        type: ticket.type,
        serverCurrentTime: respData.serverCurrentTime
      };

      $scope.$on('$destroy', function(e) {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      });

      var stop = $interval(function() {
        var status = ticketSvc.h5UseTicketStatus({
          ticketId: ticket.id
        }, function() {
          if (status.validResult === 1) {
            $interval.cancel(stop);
            alert('核销成功');
            $state.go('main');
          } else if (status.validResult === 2) {
            $scope.qrcodeData.serverCurrentTime = status.serverCurrentTime;
          }
          console.log(status);
        });
      }, 5000);

    }

    $scope.merchant = respData.merchant;
    $scope.qrcodeVersion = 7;

    $scope.shareWith = function() {
      sharing.show();
    };
  });
}).controller('gainTicketCtrl', function($state, $stateParams, $q, $location, ticketSvc) {

  var friends = ticketSvc.specTypeTicketList({
    ticketId: $stateParams.ticketId
  }, function() {
    if (friends.tickets > 1) {

    } else {
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
          type: $stateParams.type,
          accessToken: localStorage.getItem('accessToken')
        });
      });
    }
  });
}).controller('friendsCtrl', function($scope, $state, $stateParams) {

  // var mockData = {
  //   "code": "00000",
  //   "merchant": {
  //     "logo": {
  //       "url": "image/merchant/merchant_default_logo.jpg",
  //       "width": 108,
  //       "height": 108
  //     },
  //     "merchantName": "轻松一下",
  //     "dateCreate": 0,
  //     "applyDate": 0,
  //     "auditType": 1,
  //     "status": 1,
  //     "updateTime": 0,
  //     "resetValidTime": 0,
  //     "tickets": [{
  //       "id": "TZpoUlF1VpJk8xBcpcxQ",
  //       "value": 0,
  //       "used": 0,
  //       "validTime": 1440172799000,
  //       "haveTime": 0,
  //       "status": 0,
  //       "maxPrinted": 0,
  //       "type": 4,
  //       "ticketName": "储值卡150817"
  //     }, {
  //       "id": "TUFE9k9xpwcpwVJ0V5d9B",
  //       "ticketId": "TZpoUlF1VpJk8xBcpcxQ",
  //       "sharedFriends": [
  //         null,
  //         "UBJkgE9swtk0sB5NdVk5"
  //       ],
  //       "merchantName": "轻松一下",
  //       "value": 50,
  //       "used": 0,
  //       "validTime": 1440172799000,
  //       "haveTime": 1440063982742,
  //       "status": 0,
  //       "maxPrinted": 50,
  //       "type": 4,
  //       "ticketName": "储值卡150817",
  //       "desc": "20150817",
  //       "merchantId": "MCM1kVpsdVsUZFAIMVgMc",
  //       "friendsName": "CJZ3",
  //       "friendsHeaderImg": "image/head_image/default_user_head_image.jpg",
  //       "friendId": "UAJRd9x8RZIlYldEl1h5",
  //       "uid": "UAJRd9x8RZIlYldEl1h5"
  //     }]
  //   },
  //   "serverCurrentTime": 1440211337372,
  //   "desc": "请求成功"
  // }
  //
  // $scope.data = mockData;

}).controller('shareTicketCtrl', function($rootScope, $scope, $state, $stateParams, $http, $location, globalConfig, ticketSvc) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (/ticket\.[1-7]/.test(toState.name) && fromState.name === 'ticket.share') {
        event.preventDefault();
      }
    });
  $scope.$root.title = '我的就是你的';
  $http({
    method: 'GET',
    url: globalConfig.apihost + '/again/ticket/weixinSingleTicket.do?ticketId=' + $stateParams.id,
    headers: {
      'accessToken': $stateParams.accessToken
    },
    cache: false
  }).success(function(respData) {
    $scope.merchant = respData.merchant;
    $scope.type = $stateParams.type;
    $scope.accept = function() {
      var result = ticketSvc.shareSingleTicket({
        ticketId: $stateParams.id,
        senderId: $stateParams.accessToken.split('|')[0]
      }, function() {
        if (result.code === '00000') {
          $state.go('main');
        }
      });
    };
  }).error(function(err) {
    alert(JSON.stringify(err));
  });
});
