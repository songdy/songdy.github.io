'use strict';

app.service('ticketSvc', function (ticketPvd) {
  this.singleTicket = function () {
    return ticketPvd.query();
  };
});
