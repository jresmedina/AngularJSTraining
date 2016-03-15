angular.module('productFactory', []).factory('productfactory', ['$http', function ($http) {
    return {
        getList: function (myData) {
            $http({
                method: 'GET',
                url: 'http://localhost:5500/product'
            })
                .success(function (data) {
                    data.forEach(function (row) {
                        if (!row.datePurchase) {
                            row.datePurchase = "";
                        }
                        else {
                            row.datePurchase = (new Date(row.datePurchase).toDateString());
                        }
                        myData.push(row);
                    });
                    console.log(myData.length);
                })
                .error(function () {
                    alert("Error while retreiving data.");
                })
        },

        updateList: function (rowEntity, colDef) {
            $http({
                method: 'PUT',
                url: 'http://localhost:5500/product/' + rowEntity.id,
                data: rowEntity
            })
                .success(function (res) {
                    console.log(colDef.name + " successfully udpated!");
                })
                .error(function (err) {
                    alert("Error while updating.");
                });
        },

        addToList: function (myData, items) {
            $http({
                method: 'POST',
                url: 'http://localhost:5500/product/',
                data: items
            })
                .success(function (res) {
                    myData.splice(0, 0, items);
                    console.log("Successfully Added.");                     
                    // $scope.refreshData();
                }).error(function (err) {
                    alert("Error: " + err);
                });

        },

        deleteList: function (myData, row) {
            var index = myData.indexOf(row.entity);
            $http({
                method: 'DELETE',
                url: 'http://localhost:5500/product/' + row.entity.id,
                data: row.entity
            })
                .success(function (res) {
                    myData.splice(index, 1);
                    console.log(row.entity.PartNumber + " successfully deleted!");
                })
                .error(function (err) {
                    alert("Error while deleting.");
                });
        }

    };
    
}]);
