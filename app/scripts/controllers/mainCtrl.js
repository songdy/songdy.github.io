'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      }).state('empty', {
        url: '/empty',
        templateUrl: '../../views/empty.html'
      });
  })
  .controller('mainCtrl', function ($rootScope, $scope, $state, $location, walletSvc, shareSvc, prompting) {
    $scope.$root.title = '我的卡包';
    var currentIndex = 1;
    if (!!$location.$$search.merchantId || $rootScope.merchantId) {
      $rootScope.merchantId = $rootScope.merchantId || $location.$$search.merchantId;
      $scope.respData = walletSvc.specTicketList({
        merchantId: $location.$$search.merchantId
      }, function () {
        if (!$scope.respData.myWallet || $scope.respData.myWallet.length === 0) {
          $state.go('empty');
        }
      });
      $scope.hideMoreBtn = true;
    } else {
      $scope.respData = walletSvc.myWallet(function () {
        if (!$scope.respData.myWallet || $scope.respData.myWallet.length === 0) {
          $state.go('empty');
        } else {
          ++currentIndex;
        }
      });
    }
    $scope.accessToken = localStorage.getItem('accessToken');

    $scope.more = function () {
      var respData = walletSvc.myWallet({
        pageIndex: currentIndex
      }, function () {
        if (respData.myWallet.length > 0) {
          ++currentIndex;
          $scope.respData.myWallet = $scope.respData.myWallet.concat(respData.myWallet);
        }
      });
    };

    $scope.expiresNotice = function () {

      prompting.show('卡券将过期时，发短信提醒我', '输入手机号码', function (value) {
        if (!/^\d{11}$/ig.test(value)) {
          alert('请输入有效的手机号码!');
          return;
        }
        var result = shareSvc.setOverTime({
          phone: value
        }, function () {
          if (result.code === '00000') {
            prompting.hide();
          } else {
            alert('操作失败，请稍候再试！');
          }
        });
      }, {
        inputType: 'tel'
      });
    };
  });
