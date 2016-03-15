angular.module('LoginService', ['BASE_URL', 'angular-storage'])
    .factory('loginservice', ['$http', 'BASE_URL', function ($http, BASE_URL) {
        var service = this,
            path = 'users/';

        function getUrl() {
            return BASE_URL + path;
        };

        function getLogUrl(action) {
            return getUrl() + action;
        };
        return {
            login : function (credentials) {
                return $http.post(getLogUrl('login'), credentials);
                // $http({
                //     method: 'POST',
                //     url: getLogUrl('login'),
                //     data: credentials
                // })
            },
            logout: function(){
                return $http.post(getLogUrl('logout'));
            }
        }


    }])
    .service('userservice', function (store) {
        var service = this,
            currentUser = null;

        service.setCurrentUser = function (user) {
            currentUser = user;
            store.set('user', user);
            return currentUser;
        }

        service.getCurrentUser = function () {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        }
        
        service.removeCurrentUser = function(){
            return store.remove('user');
        }
        
    })