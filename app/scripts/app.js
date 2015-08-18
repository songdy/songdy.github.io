'use strict';

window.app = angular
  .module('againApp', [
    // 'ngAnimate',
    // 'ngCookies',
    'ngResource',
    // 'ngSanitize',
    // 'ngTouch',
    'ui.router',
    'monospaced.qrcode'
  ])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('authInterceptor');
  });
