'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    params: {
      from: '@from'
    }
    // templateUrl: '../../views/login.html',
    controller: function($location, $state, $http, $stateParams, $rootScope, $scope, globalConfig) {

      if ($location.$$search.code) {
        // alert('weixin code: ' + $location.$$search.code);
        // $scope.code = $location.$$search.code;

        $http({
          method: 'POST',
          url: globalConfig.apihost + '/again/weixin/getUserInfo.do?code=' + $location.$$search.code,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          cache: false
        }).success(function(data) {
          // alert('again server response: ' + JSON.stringify(data));
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userId', data.accessToken.split('|')[0]);
          } else {
            localStorage.clear();
            alert(JSON.stringify(data));
          }
          if (!$location.$$search.state) {
            $state.go('main');
          } else {
            $location.path(decodeURIComponent($location.$$search.state));
          }
        }).error(function(err) {
          alert(err);
        });
      } else {
        alert(JSON.stringify($state.current.params));
        alert(encodeURIComponent($stateParams.from || globalConfig.clienthost));
        var wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        var info = {
          appid: globalConfig.wxAppid,
          redirect_uri: encodeURIComponent($location.absUrl()),
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: encodeURIComponent($stateParams.from || globalConfig.clienthost)
        };
        var requestData = [];
        for (var field in info) {
          requestData.push(field + '=' + info[field]);
        }
        // var redirect_uri = encodeURIComponent(globalConfig.clienthost + '/login');
        window.location.href = wxUrl + '?' + requestData.join('&') + '#wechat_redirect';
      }
    }
  });
});
