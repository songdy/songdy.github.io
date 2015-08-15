'use strict';

app.directive('againimg', function(globalConfig) {
  var template = '<img  ng-src="' + globalConfig.host + '/again/{{url}}" />';
  return {
    restrict: 'E',
    template: template,
    replace: true,
    scope: {
      url: '=url'
    }
  };
});
