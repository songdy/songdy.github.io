'use strict';

app.service('ticketSvc', function (ticketPvd) {
  this.singleTicket = ticketPvd.query;
  this.h5ConfirmTicket = ticketPvd.h5ConfirmTicket;
  this.h5UseTicketStatus = ticketPvd.h5UseTicketStatus;
});
