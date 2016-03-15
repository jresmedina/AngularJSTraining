app.factory('ApiService', function ($http, API_URL) {
    function getApiUrl(tableName) {
        return API_URL + tableName;
    }
    return {
         
        getDataById: function(tableName, data){
            return $http.get(getApiUrl(tableName), data)
            .success(function(response){
                // console.log(response);
                
            })
            .error(function(err){
                console.log(err);
            })
        },
        
        getData: function (tableName) {
            return $http.get(getApiUrl(tableName))
                .success(function (response) {
                    // console.log(response);
                })
                .error(function (err) {
                    console.log(err);
                });
        },
        addNewData: function (tableName, data) {
            return $http.post(getApiUrl(tableName), data)
                .success(function (response) {
                    // console.log(response);
                })
                .error(function (err) {
                    console.log(err)
                });
        },
        updateData: function (tableName, data) {
            return $http.put(getApiUrl(tableName), data)
                .success(function (response) {
                    // console.log(response);
                })
                .error(function (err) {
                    console.log(err);
                });
        },
        deleteData: function(tableName){
            return $http.delete(getApiUrl(tableName))
            .success(function(response){
                // console.log(response);
            })
            .error(function (err){
                console.log(err);
            })
        },
    }
})
