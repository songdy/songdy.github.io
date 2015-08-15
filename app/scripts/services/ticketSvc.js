'use strict';

app.service('ticketSvc', function (ticketPvd) {
  this.singleTicket = ticketPvd.query;
});
