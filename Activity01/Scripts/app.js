var app = angular.module('app', ['ngMaterial', 'transactionFactory', 'productFactory', 'myRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter']);
app.controller('MainCtrl', ['$scope', '$http', 'productfactory', 'transactionfactory', 'uiGridConstants',
    function ($scope, $http, productfactory, transactionfactory, uiGridConstants) {

        $scope.gridOptions = {
            data: 'myData',
            enableColumnResizing: true,
            enableFiltering: true,
            enableGridMenu: true,
            showGridFooter: true,
            showColumnFooter: true,
            fastWatch: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            columnDefs: [
                // { name: 'id', width: 50, enableCellEdit: false },
                { name: 'Action', enableCellEdit: false, enableFiltering: false, enableSorting: false, enableHiding: false, enableColumnMenu: false, width: 100, cellTemplate: '<a class="text-danger" ng-click="grid.appScope.delete(row)"><i class="glyphicon glyphicon-remove">Delete</i></a>' },
                { name: 'productName', width: 250, enableCellEdit: true, sort: { direction: uiGridConstants.ASC } },
                { name: 'description', width: 300, enableCellEdit: true },
                { name: 'itemCode', width: 250, enableCellEdit: true },
                { name: 'qtyPurchase', width: 150, enableCellEdit: true },
                { name: 'qtySold', width: 150, enableCellEdit: true },
                { name: 'unitPrice', width: 150, enableCellEdit: true },
                { name: 'supplier', width: 150, enableCellEdit: true },
                { name: 'amount', width: 150, enableCellEdit: true },
                { name: 'datePurchase', width: 150, enableCellEdit: true },
                { name: 'type', width: 150, enableCellEdit: true },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                    if (rowEntity.id != null && newValue != oldValue) {
                        BootstrapDialog.confirm({
                            title: "Warning!!!",
                            message: "Product will be updated. Do you wish to continue? Cancel button will refresh the data table.",
                            type: BootstrapDialog.TYPE_WARNING,
                            callback: function (ok) {
                                if (ok) {
                                    productfactory.updateList(rowEntity, colDef);
                                    var newObj = { "productId": rowEntity.id, "modified": colDef.name + ": " + oldValue + " > " + newValue };
                                    var keyToReplace = Object.keys(newObj)[0];
                                    var keyToAdd = Object.keys(newObj)[1];
                                    var id = "id";
                                    if (rowEntity.hasOwnProperty(id)) {
                                        rowEntity[keyToReplace] = rowEntity[id];
                                        rowEntity[keyToAdd] = newObj[keyToAdd];
                                        delete rowEntity[id];
                                        transactionfactory.addToModify(rowEntity);
                                    }
                                } else {
                                    console.log("Cancel changes");
                                    $scope.refreshData();
                                    // validateEditedCell(rowEntity, colDef, oldValue);
                                }
                            }
                        });

                    } else {
                        console.log("No changes made.");
                    }
                });
            },

        };
        $scope.unSelectAll = function () {
            $scope.gridApi.selection.clearSelectedRows();
        };

        $scope.myData = [];
        $scope.addBtn = false;
        
        // Function to save newly added item	
        $scope.item = {};
        $scope.save = function () {
            $scope.items = this.item;
            $scope.addBtn = true;
            console.log(JSON.stringify($scope.items));
            productfactory.addToList($scope.myData, $scope.items);
            $scope.addBtn = false;
            $scope.item = {};
        };
        
        // Function to Clear and cancel operation
        $scope.cancel = function () {
            $scope.addBtn = false;
            $scope.item = {};
        };
        
        //Function to Delete row
        $scope.delete = function (row) {
            BootstrapDialog.confirm({
                title: "Delete",
                message: "Are you sure you want to delete PRODUCT: '" + row.entity.productName + "', DESCRIPTION: '" + row.entity.description + "'?",
                type: BootstrapDialog.TYPE_DANGER,
                callback: function (ok){
                if (ok) {
                productfactory.deleteList($scope.myData, row);
                var newObj = { "productId": row.entity.id };
                var keyToReplace = Object.keys(newObj)[0];
                var id = "id";
                if (row.entity.hasOwnProperty(id)) {
                    row.entity[keyToReplace] = row.entity[id];
                    delete row.entity[id];
                    transactionfactory.addToDelete(row.entity);
                };
                console.log(row.entity);
                } },
            });
        };

        $scope.refreshData = function () {
            $scope.addBtn = false;
            $scope.myData = [];
            $scope.unSelectAll();
            productfactory.getList($scope.myData);
        };
        
        //Transaction
        $scope.gridOptionModified = {
            data: 'modifiedProduct',
            enableColumnResizing: true,
            enableFiltering: true,
            enableColumnMenus: false,
            enableGridMenu: true,
            showGridFooter: true,
            fastWatch: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            columnDefs: [
                { name: 'productName', width: 400 },
                { name: 'description', width: 550 },
                { name: 'date', width: 250, sort: { direction: uiGridConstants.DESC } },
                { name: 'modified', width: 350 },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },

        };
        $scope.gridOptionDeleted = {
            data: 'deletedProduct',
            enableColumnResizing: true,
            enableFiltering: true,
            enableColumnMenus: false,
            enableGridMenu: true,
            showGridFooter: true,
            fastWatch: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            columnDefs: [
                { name: 'productName', width: 200, enableCellEdit: true },
                { name: 'description', width: 300, enableCellEdit: true },
                { name: 'itemCode', width: 120, enableCellEdit: true },
                { name: 'qtyPurchase', width: 75, enableCellEdit: true },
                { name: 'qtySold', width: 75, enableCellEdit: true },
                { name: 'unitPrice', width: 100, enableCellEdit: true },
                { name: 'supplier', width: 220, enableCellEdit: true },
                { name: 'amount', width: 100, enableCellEdit: true },
                { name: 'datePurchase', width: 130, enableCellEdit: true },
                { name: 'type', width: 100, enableCellEdit: true },
                { name: 'date', width: 130, enableCellEdit: true, sort: { direction: uiGridConstants.DESC } },
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },

        };
        $scope.getModifiedProduct = function () {
            $scope.modifiedProduct = [];
            transactionfactory.getModifiedProduct($scope.modifiedProduct);
        };
        $scope.getDeletedProduct = function () {
            $scope.deletedProduct = [];
            transactionfactory.getDeletedProduct($scope.deletedProduct);
        };
        var validateEditedCell = function(rowEntity, colDef, oldValue){
            if(colDef.name === 'productName'){
                  rowEntity.productName = oldValue;
                  return;
            }else if(colDef.name === 'description'){
                rowEntity.description = oldValue;
                return;
            }else if(colDef.name === 'itemCode'){
                rowEntity.itemCode = oldValue;
                return;
            }else if(colDef.name === 'qtyPurchase'){
                rowEntity.qtyPurchase = oldValue;
                return;
            }else if(colDef.name === 'qtySold'){
                rowEntity.qtySold = oldValue;
                return;
            }else if(colDef.name === 'unitPrice'){
                rowEntity.unitPrice = oldValue;
                return;
            }else if(colDef.name === 'supplier'){
                rowEntity.supplier = oldValue;
                return;
            }else if(colDef.name === 'amount'){
                rowEntity.amount = oldValue;
                return;
            }else if(colDef.name === 'datePurchase'){
                rowEntity.datePurchase = oldValue;
                return;
            }else if(colDef.name === 'type'){
                rowEntity.type = oldValue;
                return;
            }
        };
    }]);

app.controller('datePickerCtrl', function ($scope) {
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());
    $scope.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }
});






