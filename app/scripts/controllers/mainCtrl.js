'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      });
  })
  .controller('mainCtrl', function ($scope, $state, walletSvc, prompting) {
    $scope.$root.title = '我的卡包';
    $scope.respData = walletSvc.myWallet();
    $scope.accessToken = localStorage.getItem('accessToken');
    $scope.userId = localStorage.getItem('userId');

    $scope.expiresNotice = function () {

      $state.go('ticket.gain', {
        type: 4,
        ticketId: 'TUVod14sNgFFBglJ9hxZN',
      });

      // prompting.show('卡券将过期时，发短信提醒我', '输入手机号码', function (value) {
      //   console.log(value);
      // }, {
      //   inputType: 'tel'
      // });
    };
  });
