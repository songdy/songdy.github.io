'use strict';

app.directive('againticket', function() {
  return {
    restrict: 'E',
    templateUrl: '../../templates/againTicket.html',
    replace: true,
    scope: {
      ticket: '=ticket',
    }
  };
});
