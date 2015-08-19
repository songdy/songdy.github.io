'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      });
  })
  .controller('mainCtrl', function ($scope, walletSvc, prompting) {
    $scope.$root.title = '我的卡包';
    $scope.respData = walletSvc.myWallet();
    $scope.accessToken = localStorage.getItem('accessToken');

    $scope.expiresNotice = function () {
      prompting.show('卡券将过期时，发短信提醒我', '输入手机号码', function (value) {
        console.log(value);
      }, {
        inputType: 'tel'
      });
    };
  });
