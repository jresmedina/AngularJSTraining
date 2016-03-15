angular.module('transactionFactory', []).factory('transactionfactory', ['$http', function ($http) {
    return {
        addToModify: function (rowEntity) {
            $http({
                method: 'POST',
                url: 'http://localhost:5500/modifiedtransaction',
                data: rowEntity,
            })
                .success(function (data) {
                    console.log("Successfully added to modified table");
                })
                .error(function () {
                    alert("Failed to insert to modified table");
                });
        },
        addToDelete: function (rowEntity) {
            $http({
                method: 'POST',
                url: 'http://localhost:5500/deletedtransaction',
                data: rowEntity,
            })
                .success(function (data) {
                    console.log("Successfully added to deleted table");
                })
                .error(function () {
                    alert("Failed to insert to deleted table");
                });
        },

        getModifiedProduct: function (modifiedProduct) {
            $http({
                method: 'GET',
                url: 'http://localhost:5500/modifiedtransaction'
            })
                .success(function (data) {
                    data.forEach(function (row) {
                        if (!row.date) {
                            row.date = "";
                        }
                        else {
                            row.date = getDateTime(row.date);
                        }
                        modifiedProduct.push(row);
                    });
                })
                .error(function () {
                    alert("Error while retreiving data.");
                })
        },
        getDeletedProduct: function (deletedProduct) {
            $http({
                method: 'GET',
                url: 'http://localhost:5500/deletedtransaction'
            })
                .success(function (data) {
                    data.forEach(function (row) {
                        if (!row.date) {
                            row.date = "";
                        }
                        else {
                            row.date = getDateTime(row.date);
                        }
                        deletedProduct.push(row);
                    });
                })
                .error(function () {
                    alert("Error while retreiving data.");
                })
        },
    };

    function getDateTime(date) {
        var x = new Date(date);

        return x.getFullYear() + '-' +
            setDateTime(x.getMonth() + 1) + '-' +
            setDateTime(x.getDate()) + ' ' +
            setDateTime(x.getHours()) + ':' +
            setDateTime(x.getMinutes()) + ':' +
            setDateTime(x.getSeconds());
    }
    function setDateTime(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
    }
}]);
