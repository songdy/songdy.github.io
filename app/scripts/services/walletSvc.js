'use strict';

app.service('walletSvc', function (walletPvd) {
  this.myWallet = walletPvd.query;
  this.specTicketList = walletPvd.specTicketList;
});
