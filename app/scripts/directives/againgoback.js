'use strict';

app.directive('againgoback', function() {
  var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var template = isIOS ? '' : '<div class="navbar" ng-hide="">' +
    '<a ui-sref="main"><img src="/images/go-back.png" alt="" height="30px" /></a>' +
    '</div>';
  return {
    restrict: 'E',
    template: template,
    replace: true
  };
});
