angular.module('DashboardController', ['LoginService'])
    .controller('DashboardCtrl', function ($state, userservice, $location) {
        var dashboard = this;
        
        if ($state.current.requiredLogin) {
            if (userservice.getCurrentUser() === null) {
                $location.path('/login');
            } else {
                $location.path('/dashboard');
            }
        } else {
            console.log("login is required");
        }
    })