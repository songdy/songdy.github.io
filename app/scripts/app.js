'use strict';

angular
  .module('againApp', [
    // 'ngAnimate',
    // 'ngCookies',
    'ngResource',
    // 'ngSanitize',
    // 'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  });
