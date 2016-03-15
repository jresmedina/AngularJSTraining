angular.module('LoginController', ['LoginService'])
    .controller('LoginCtrl', ['loginservice', 'userservice', '$state', '$location', function (loginservice, userservice, $state, $location) {
        var login = this;

        function submit(user) {
            loginservice.login(user)
                .then(function (response) {
                    user.access_token = response.data.id;
                    var password = 'password';
                    if (user.hasOwnProperty(password)) {
                        delete user[password];
                        userservice.setCurrentUser(user);
                    }
                    $state.go('dashboard');
                }, function (error) {
                    console.log(userservice.getCurrentUser());
                })
        }

        login.submit = submit;

        if ($state.current.isLoginPage) {
            if (userservice.getCurrentUser() === null) {
                $location.path('/login');
            } else {
                $location.path('/dashboard');
            }
        } else {
            console.log("Already logged in.");
        }

    }])