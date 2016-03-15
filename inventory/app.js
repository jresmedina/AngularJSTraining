var app = angular.module('app', ['acute.select','ui.bootstrap', 'ui.router', 'chart.js', 'ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard',
                templateUrl: 'templates/dashboard.html'
            })
            .state('inventory', {
                url: '/inventory',
                controller: 'InventoryCtrl',
                controllerAs: 'inventory',
                templateUrl: 'templates/inventory.html'
            })
            .state('history', {
                url: '/history',
                controller: 'HistoryCtrl',
                controllerAs: 'history',
                templateUrl: 'templates/history.html'
            })

        $urlRouterProvider.otherwise('/dashboard');
    })
    