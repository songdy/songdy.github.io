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
      url: '/friends/{type}/{ticketId}/{deviceCode}/{serviceCurrentTime}/{numerical}/{merchant}',
      templateUrl: '../../views/ticket/friends.html',
      controller: 'friendsCtrl'
    });
}).controller('ticketCtrl', function($scope, $state, $stateParams, $interval, $timeout, ticketSvc, sharing, loading) {

  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (['ticket.gain', 'ticket.friends'].indexOf(toState.name) >= -1) {
        event.preventDefault();
      }
    });

  $scope.empty = false;
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

    if (!respData.merchant || !respData.merchant.tickets) {
      loading.show('卡券已核销', 0, 3000);
      $timeout(function() {
        window.location.href = 'http://app.againvip.com/promote.html';
      }, 3000);
      return;
    }

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
            if ([3, 4, 5, 6].indexOf(ticket.type) > -1) {
              loading.show('核销成功！', 0, 3000);
              $timeout(function() {
                $state.go('.', {}, {
                  reload: true
                });
              }, 3500);
            } else {
              $scope.empty = true;
            }
          } else if (status.validResult === 2) {
            $scope.qrcodeData.serverCurrentTime = status.serverCurrentTime;
          }
        });
      }, 5000);

    }

    $scope.merchant = respData.merchant;
    $scope.qrcodeVersion = 7;

    $scope.shareWith = function() {
      sharing.show();
    };
  });
}).controller('gainTicketCtrl', function($state, $stateParams, $q, $location, $scope, ticketSvc, loading) {

  var friends = ticketSvc.specTypeTicketList({
    ticketId: $stateParams.ticketId
  }, function() {
    if (!!friends.merchant && !!friends.merchant.tickets && friends.merchant.tickets.length > 1) {
      if (friends.code !== '00000') {
        loading.show('领卷失败，请稍候再试!', 0, 3000);
        return;
      }
      var data = $stateParams;
      data.merchant = friends.merchant;
      $state.go('ticket.friends', data);
    } else {
      var respData = ticketSvc.h5ConfirmTicket({
        deviceCode: $stateParams.deviceCode,
        ticketId: $stateParams.ticketId,
        serverCurrentTime: $stateParams.serviceCurrentTime,
        numerical: $stateParams.numerical
      }, function() {
        if (respData.validResult === 1 || !respData.targetTicketId) {
          window.location.href = 'http://app.againvip.com/promote.html';
        } else {
          $state.go('ticket.' + $stateParams.type, {
            id: respData.targetTicketId,
            type: $stateParams.type,
            accessToken: localStorage.getItem('accessToken')
          });
        }

      });
    }
  });
}).controller('friendsCtrl', function($scope, $state, $stateParams, ticketSvc, loading) {

  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'ticket.gain') {
        event.preventDefault();
      }
    });

  $scope.$root.title = '选择卡券';
  $scope.merchant = $stateParams.merchant;
  var chooseTicket;
  $scope.choose = function(value) {
    for (var idx in $scope.merchant.tickets) {
      var isChoose = $scope.merchant.tickets[idx].id === value;
      $scope.merchant.tickets[idx].choose = isChoose;
      if (isChoose) {
        chooseTicket = $scope.merchant.tickets[idx];
      }
    }
  };
  $scope.choosed = function() {
    if (!chooseTicket) {
      loading.show('请选择！', 0, 3000);
    } else {
      var params = {
        deviceCode: $stateParams.deviceCode,
        ticketId: chooseTicket.id,
        serverCurrentTime: $stateParams.serviceCurrentTime,
        numerical: $stateParams.numerical
      };
      var respData = ticketSvc.h5ConfirmTicket(params, function() {
        if (respData.code !== '00000') {
          loading.show('分享失败，请重新领取', 0, 5000);
        }
        if (respData.validResult === 0) {
          $state.go('ticket.' + chooseTicket.type, {
            id: respData.targetTicketId,
            type: chooseTicket.type,
            accessToken: localStorage.getItem('accessToken')
          });
        } else if (status.validResult === 1) {
          loading.show('卡券已过时，请重新领取', 0, 5000);
        } else {
          loading.show('领取失败', 0, 5000);
        }
      });
    }
  };

}).controller('shareTicketCtrl', function($scope, $state, $stateParams, $http, $location, $timeout, globalConfig, ticketSvc, loading) {

  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (/ticket\.[1-7]/.test(toState.name)) {
        event.preventDefault();
        $state.go('main');
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

    if (!respData.merchant || !respData.merchant.tickets) {
      loading.show('卡券已核销', 0, 3000);
      $timeout(function() {
        window.location.href = 'http://app.againvip.com/promote.html';
      }, 3000);
      return;
    }

    $scope.merchant = respData.merchant;
    $scope.type = $stateParams.type;
    $scope.accept = function() {
      var result = ticketSvc.shareSingleTicket({
        ticketId: $stateParams.id,
        senderId: $stateParams.accessToken.split('|')[0]
      }, function() {
        if (result.result === 0) {
          loading.show('领取成功', 0, 3000);
          $timeout(function() {
            $state.go('main');
          }, 3500);
        } else if (result.result === 2) {
          loading.show('您已经领过了哦，去Again再来公众号看看我的卡包吧', 0, 3000);
          $timeout(function() {
            $state.go('main');
          }, 3500);
        } else if (result.result === 5) {
          loading.show('领自己的券有意思么？', 0, 3000);
          $timeout(function() {
            $state.go('main');
          }, 3500);
        } else {
          window.location.href = 'http://app.againvip.com/promote.html';
        }
      });
    };
  }).error(function(err) {
    // alert(JSON.stringify(err));
    loading.show('领取失败', 0, 3000);
    $state.go('main');
  });
});
