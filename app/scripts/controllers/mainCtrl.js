'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      });
  })
  .controller('mainCtrl', function ($scope, walletSvc) {
    $scope.$root.title = '我的卡包';
    $scope.respData = walletSvc.myWallet();
  });
