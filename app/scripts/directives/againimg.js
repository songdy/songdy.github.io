'use strict';

app.directive('againimg', function(globalConfig) {
  var template = '<img ng-src="' + globalConfig.apihost + '/again/{{url}}" />';
  return {
    restrict: 'E',
    template: template,
    replace: true,
    scope: {
      url: '=url'
    }
  };
});
