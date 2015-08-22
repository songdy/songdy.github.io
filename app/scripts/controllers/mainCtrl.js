'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      });
  })
  .controller('mainCtrl', function ($scope, $state, $location, walletSvc, shareSvc, prompting) {
    $scope.$root.title = '我的卡包';
    $scope.respData = walletSvc.myWallet();
    $scope.accessToken = localStorage.getItem('accessToken');

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
