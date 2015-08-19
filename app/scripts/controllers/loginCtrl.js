'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: function($location, $state, $http, $stateParams, $rootScope, globalConfig) {
      alert($location.$$absUrl);
      if ($location.$$search.code) {
        alert($location.$$search.code);
        console.log(!$location.$$search.state);
        console.log($location.$$search.code);
        $http({
          method: 'POST',
          url: globalConfig.apihost + '/again/weixin/getUserInfo.do',
          data: {
            code: $location.$$search.code
          },
          cache: false
        }).success(function(data) {
          $rootScope.accessToken = data.accessToken;
          console.log(data);
          if (!$location.$$search.state) {
            $state.go('main');
          } else {
            $location.path(decodeURIComponent($location.$$search.state));
          }
        }).error(function(err) {
          console.log(err);
          alert(err);
        });
      } else {
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        var info = {
          appid: globalConfig.wxAppid,
          redirect_uri: encodeURIComponent($location.$$absUrl),
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: encodeURIComponent($stateParams.from || globalConfig.clienthost)
        };
        var querystring = '';
        for(var field in info) {
          querystring = querystring + field + '=' + info[field] + '&';
        }
        var wxLoginUrl = url + '?' + querystring + '#wechat_redirect';
        console.log(wxLoginUrl);
        // var redirect_uri = encodeURIComponent(globalConfig.clienthost + '/login');
        window.location.href = wxLoginUrl;
      }
    }
  });
});
