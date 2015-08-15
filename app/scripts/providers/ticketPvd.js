'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource) {
    return $resource('http://localhost:8001/mockapi/singleTicket.json', { ticketId: '@ticketId' }, {
      query: { method: 'GET', isArray: false }
    });
  };
});
