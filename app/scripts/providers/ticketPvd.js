'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.mockapihost + '/mockapi/singleTicket.json', { ticketId: '@id' }, {
      query: { method: 'GET', isArray: false }
    });
  };
});
