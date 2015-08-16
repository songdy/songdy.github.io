'use strict';

  app.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../../views/main.html',
        controller: 'mainCtrl'
      });
  })
  .controller('mainCtrl', function ($scope, walletSvc, loading) {
    $scope.$root.title = '我的卡包';
    loading.show();
    $scope.respData = walletSvc.myWallet(function () {
      loading.hide();
    });
  });
