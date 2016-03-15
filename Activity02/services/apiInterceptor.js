angular.module('APIInterceptor', ['LoginService'])
    .service('apiinterceptor', function ($rootScope, userservice, $q, $location) {
        var service = this;

        service.request = function (config) {
            var currentUser = userservice.getCurrentUser(),
                access_token = currentUser ? currentUser.acces_token : null;
            if (access_token) {
                config.headers.authorization = access_token;
            }
            return config
        };

        service.responseError = function (response) {

            if (response.status === 401) {
                alert("Error login");
                $location.path('/login');
                userservice.removeCurrentUser();
                return $q.reject(response);

            }
            return $q.reject(response);
        }
    })