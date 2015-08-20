'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.apihost + '/again/ticket/weixinSingleTicket.do', { ticketId: '@id' }, {
      query: { method: 'GET', isArray: false },
      h5ConfirmTicket: {
        method: 'GET',
        url: globalConfig.apihost + '/again/ticket/h5ConfirmTicket.do',
        isArray: false
      }
    });
  };
});
