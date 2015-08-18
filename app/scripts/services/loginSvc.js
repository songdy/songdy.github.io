'use strict';

app.service('loginSvc', function (loginPvd) {
  this.login = loginPvd.post;
});
