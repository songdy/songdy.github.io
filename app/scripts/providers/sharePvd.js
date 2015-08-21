'use strict';

app.provider('sharePvd', function() {
  this.$get = function($resource, globalConfig) {
    return $resource(null, null, {
      setOverTime: {
        method: 'GET',
        url: globalConfig.apihost + '/again/share/setOverTime.do',
        isArray: false
      }
    });
  };
});
