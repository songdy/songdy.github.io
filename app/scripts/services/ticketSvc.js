'use strict';

app.service('ticketSvc', function (ticketPvd) {
  this.singleTicket = ticketPvd.query;
  this.h5ConfirmTicket = ticketPvd.h5ConfirmTicket;
  this.h5GetTargetTicket = ticketPvd.h5GetTargetTicket;
});
