'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: function ($location, $state, $http, globalConfig) {
      if ($location.$$search.code) {
        $http({
          method: 'POST',
          url: globalConfig.host + '/again/weixin/getUserInfo.do',
          data: {
            code: $location.$$search.code
          },
          cache: false
        }).success(function(data) {
          if (!$location.$$search.state) {
            $state.go('main');
          }
          console.log(data);
        }).error(function(err) {
          console.log(err);
        });
      } else {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87de30e37dd369b6&redirect_uri=http://again.51b.org/login&response_type=code&scope=snsapi_userinfo#wechat_redirect';
      }
    }
  });
});
