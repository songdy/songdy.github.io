'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.apihost + '/again/ticket/singleTicket.do', { ticketId: '@id' }, {
      query: { method: 'GET', isArray: false },
      h5ConfirmTicket: {
        method: 'GET',
        url: globalConfig.apihost + '/again/ticket/h5ConfirmTicket.do',
        isArray: false
      },
      h5GetTargetTicket: {
        method: 'POST',
        url: globalConfig.apihost + '/again/ticket/h5GetTargetTicket.do',
        isArray: false,
      }
    });
  };
});
