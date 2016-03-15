angular.module('myRoute', ['ngRoute']).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', { templateUrl: 'ng-template/_grid.html' }).
            when('/transaction', { templateUrl: 'ng-template/_transaction.html' }).
            otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    });
    