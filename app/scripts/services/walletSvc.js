'use strict';

app.service('walletSvc', function (walletPvd) {
  this.myWallet = function () {
    return walletPvd.query();
  };
});
