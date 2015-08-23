'use strict';

app.directive('againgoback', function() {
  var isIOS = navigator.userAgent.toLowerCase().match(/iphone|ipad/i) || [];
  var template = isIOS.length > 0 ? '' : '<div class="navbar">' +
    '<a ui-sref="main" class="goback"></a>' +
    '</div>';
  console.log(template);
  return {
    restrict: 'E',
    template: template,
    replace: true
  };
});
