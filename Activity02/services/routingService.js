angular.module('RoutingService', ['LoginController', 'DashboardController', 'ui.router', 'APIInterceptor'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/loginform.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        isLoginPage: true
    })
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.tmpl.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        requiredLogin: true
    }).state('dashboard.nested', {
        parent: 'dashboard',
        url: '/nested',
        templateUrl: 'templates/dashboard.nested.html',
        // controller: 'DashboardCtrl',
        // controllerAs: 'dashboard',
        // requiredLogin: true
    })
    $urlRouterProvider.otherwise('/login');
    $httpProvider.interceptors.push('apiinterceptor');
})
