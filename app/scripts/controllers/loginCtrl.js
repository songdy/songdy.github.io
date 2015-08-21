'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login?redirect',
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
            // alert(JSON.stringify(data));
          }
          var redirect = decodeURIComponent($location.$$search.redirect);
          alert(redirectUrl):
          if (!!redirect) {
            // alert(redirect);
            $location.path(redirect);
          } else {
            $state.go('main');
          }
        }).error(function(err) {
          alert(err);
        });
      } else {
        var wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        var info = {
          appid: globalConfig.wxAppid,
          redirect_uri: encodeURIComponent($location.absUrl()),
          response_type: 'code',
          scope: 'snsapi_userinfo',
          // state: $rootScope.redirectUrl || encodeURIComponent(globalConfig.clienthost)
        };
        var requestData = [];
        for (var field in info) {
          if (!!info[field]) {
            requestData.push(field + '=' + info[field]);
          }
        }
        // var redirect_uri = encodeURIComponent(globalConfig.clienthost + '/login');
        window.location.href = wxUrl + '?' + requestData.join('&') + '#wechat_redirect';
      }
    }
  }).state('clear', {
    url: '/clear',
    controller: function () {
      localStorage.clear();
    }
  });
});
