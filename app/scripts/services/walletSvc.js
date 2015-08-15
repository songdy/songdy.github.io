'use strict';

app.service('walletSvc', function (walletPvd) {
  this.myWallet = walletPvd.query;
});
