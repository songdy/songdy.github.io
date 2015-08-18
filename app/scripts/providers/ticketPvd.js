'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.host + '/again/ticket/singleTicket.do', { ticketId: '@id' }, {
      query: { method: 'GET', isArray: false }
    });
  };
});
