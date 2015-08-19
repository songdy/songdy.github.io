'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: function ($location, $state, $http, globalConfig) {
      if ($location.$$search.code) {
        console.log(!$location.$$search.state);
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
          } else {
            $location.path(!$location.$$search.state);
          }
          console.log(data);
        }).error(function(err) {
          console.log(err);
        });
      } else {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87de30e37dd369b6&redirect_uri=http%3A%2F%2Fagain.51b.org%2Flogin&response_type=code&scope=snsapi_userinfo&state=main#wechat_redirect';
      }
    }
  });
});
