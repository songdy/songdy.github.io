'use strict';

app.provider('ticketPvd', function () {
  this.$get = function ($resource, globalConfig) {
    return $resource(globalConfig.apihost + '/again/ticket/singleTicket.do', { ticketId: '@id' }, {
      query: { method: 'GET', isArray: false },
      gain: {
        method: 'GET',
        url: globalConfig.apihost + '/again/ticket/h5ConfirmTicket.do?deviceCode=222222&ticketId=TxgRVxEcwMVto8IlFMA9',
        isArray: false,
        params: {
          deviceCode: '@userId',
          ticketId: '@ticketId'
        }
      }
    });
  };
});
