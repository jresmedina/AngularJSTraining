var app = angular.module('app', ['RoutingService']);

app.controller('MainCtrl', function (loginservice, userservice, $state, $rootScope, $location) {
    var main = this;
    function logout() {
        loginservice.logout()
            .then(function (response) {
                userservice.setCurrentUser(null);
                $state.go('login');
            }, function (error) {
                console.log("Error logout");
            });
    }

    $rootScope.$on('$stateChangeStart', function (event) {
        main.currentUser = userservice.getCurrentUser();
        //    debugger;
    });


    main.logout = logout;
    main.currentUser = userservice.getCurrentUser();
    console.log(main.currentUser);


})
