app.controller('InventoryCtrl', function ($scope, $http, uiGridConstants, ApiService, $uibModal) {
    var inventory = this;
    //Product Sales Maintenance
    inventory.productId = 'Please select...';
    $scope.sales = {};
    inventory.selectedItem = {};
    inventory.getSelected = function (product) {
        ApiService.getDataById('product/' + product._id).success(function (data) {
            inventory.selectedItem = data;
        })
    };

    inventory.saveSales = function (sales) {
		var tempTotalAmount = 0
        if (sales.soldQty > inventory.selectedItem.availableQty) {
            showMessageDialog('Warning', 'Quantity entered is greater than available qty.', BootstrapDialog.TYPE_WARNING);
        } else {
            if (!angular.isUndefined(inventory.selectedItem._id)) {
                $scope.sales.totalAmount = (inventory.selectedItem.unitPrice * sales.soldQty).toFixed(4);
                sales.availableQty = inventory.selectedItem.availableQty - sales.soldQty;
                sales.totalAmount = $scope.sales.totalAmount;
				tempTotalAmount = inventory.selectedItem.totalAmount - $scope.sales.totalAmount;
                // sales.soldQty = inventory.selectedItem.soldQty + sales.soldQty;
                sales.productId = inventory.selectedItem._id;
                if (sales.productId) {
                    ApiService.addNewData('productsales', sales).success(function (data) {
                        sales._id = sales.productId;
                        if (sales.hasOwnProperty("productId")) {
                            delete sales.productId;
                        }
						sales.totalAmount = tempTotalAmount;
						debugger
                        ApiService.updateData('product/' + sales._id, sales).success(function (response) {
                            showMessageDialog('Success', 'Sales is successfully saved.', BootstrapDialog.TYPE_SUCCESS);
                        })

                    });
                }
                inventory.close();
            } else {
                showMessageDialog('Warning', 'Please select a product.', BootstrapDialog.TYPE_WARNING);
            }
        }
    };
    
    //Product Maintenance
    $scope.productList = [];
    inventory.enableOrder = false;
    inventory.enableReorder = false;
    inventory.refreshData = function () {
        ApiService.getData('product').success(function (data) {
            $scope.productList = data;
        });
    };
    $scope.product = {};
    inventory.saveOrder = function (product) {
        var totalAmountTemp = 0;
		var unitPriceTemp = 0;
        var productId = inventory.selectedItem._id;
        if (inventory.selectedItem._id) {
            product.availableQty = inventory.selectedItem.availableQty + product.orderQty;
			unitPriceTemp = (inventory.selectedItem.unitPrice).toFixed(4)
            totalAmountTemp = unitPriceTemp * product.orderQty;
            product.totalAmount = (inventory.selectedItem.totalAmount + totalAmountTemp).toFixed(4);
            ApiService.updateData('product/' + productId, product).success(function (response) {
                if (response === 'OK') {
                    showMessageDialog('Success', 'Product inventory is successfully updated.', BootstrapDialog.TYPE_SUCCESS);
                    ApiService.getDataById('product/' + productId).success(function (data) {
                        data.totalAmount = totalAmountTemp;
                        data.qty = product.orderQty;
                        inventory.addExpense(data);
                    })
                }
            })
        } else {
            if (!angular.isUndefined(product.productName)) {
                ApiService.addNewData('product', product).success(function (data) {
                    showMessageDialog('Success', 'Product is successfully added.', BootstrapDialog.TYPE_SUCCESS);
                    inventory.addExpense(data);
                });
            } else {
                showMessageDialog('Warning', 'Please select a product.', BootstrapDialog.TYPE_WARNING);
            }
        }
        inventory.productId = 'Please select...';
        inventory.selectedItem = {};
        $scope.product = {};
        // inventory.enableOrder = false;
    };

    inventory.addExpense = function (data) {
        var newProduct = [];
        if (angular.isUndefined(data._id)) {
            newProduct.push(data[data.length - 1]);
        } else {
            newProduct.push(data);
        }
        newProduct = newProduct[0];
        if (angular.isUndefined(data.qty)) {
            newProduct.qty = newProduct.availableQty;
        }
        newProduct.productId = newProduct._id;
        if (newProduct.hasOwnProperty("_id")) {
            delete newProduct._id;
        }
        if (newProduct.hasOwnProperty("productName")) {
            delete newProduct.productName;
        }
        if (newProduct.hasOwnProperty("description")) {
            delete newProduct.description;
        }
        if (newProduct.hasOwnProperty("productCode")) {
            delete newProduct.productCode;
        }
        if (newProduct.hasOwnProperty("unitPrice")) {
            delete newProduct.unitPrice;
        }
        if (newProduct.hasOwnProperty("type")) {
            delete newProduct.type;
        }
        if (newProduct.hasOwnProperty("supplier")) {
            delete newProduct.supplier;
        }
        if (newProduct.hasOwnProperty("soldQty")) {
            delete newProduct.soldQty;
        }
        if (newProduct.hasOwnProperty("availableQty")) {
            delete newProduct.availableQty;
        }
        if (newProduct.hasOwnProperty("modifiedDate")) {
            delete newProduct.modifiedDate;
        }
        if (newProduct.hasOwnProperty("createdDate")) {
            delete newProduct.createdDate;
        }
        ApiService.addNewData('productexpense', newProduct).success(function (data) {
            // added to expenses
        })
    }

    inventory.addHistory = function (rowEntity, colDef, newValue, oldValue) {
        var newProduct = [];
        newProduct.push(rowEntity);
        newProduct = newProduct[0];
        newProduct.productId = newProduct._id;
        newProduct.field = colDef.name;
        newProduct.oldValue = oldValue;
        newProduct.newValue = newValue;
        if (newProduct.hasOwnProperty("_id")) {
            delete newProduct._id;
        }
        if (newProduct.hasOwnProperty("productName")) {
            delete newProduct.productName;
        }
        if (newProduct.hasOwnProperty("description")) {
            delete newProduct.description;
        }
        if (newProduct.hasOwnProperty("productCode")) {
            delete newProduct.productCode;
        }
        if (newProduct.hasOwnProperty("unitPrice")) {
            delete newProduct.unitPrice;
        }
        if (newProduct.hasOwnProperty("type")) {
            delete newProduct.type;
        }
        if (newProduct.hasOwnProperty("supplier")) {
            delete newProduct.supplier;
        }
        if (newProduct.hasOwnProperty("soldQty")) {
            delete newProduct.soldQty;
        }
        if (newProduct.hasOwnProperty("availableQty")) {
            delete newProduct.availableQty;
        }
        if (newProduct.hasOwnProperty("modifiedDate")) {
            delete newProduct.modifiedDate;
        }
        if (newProduct.hasOwnProperty("createdDate")) {
            delete newProduct.createdDate;
        }
        if (newProduct.hasOwnProperty("totalAmount")) {
            delete newProduct.totalAmount;
        }
        if (newProduct.hasOwnProperty("datePurchased")) {
            delete newProduct.datePurchased;
        }
        ApiService.addNewData('producthistory', newProduct).success(function (data) {
            // added to history
        })
    }

    inventory.delete = function (row) {
        BootstrapDialog.show({
            title: "Danger",
            message: "Product will be permanently deleted. Do you wish to continue?",
            type: BootstrapDialog.TYPE_DANGER,
            buttons: [
                {
                    label: 'Delete',
                    cssClass: 'btn-danger',
                    action: function (dialog) {
                        ApiService.deleteData('product/' + row.entity._id).success(function (data) {
                            $scope.productList = data;
                        });
                        dialog.close();
                    }
                },
                {
                    label: 'Cancel',
                    cssClass: 'btn-warning',
                    action: function (dialog) {
                        dialog.close();
                    }
                }
            ],

        });
    };


    inventory.close = function () {
        inventory.enableOrder = false;
        inventory.enableReorder = false;
        inventory.selectedItem = {};
        // inventory.refreshData();
        inventory.productId = 'Please select...';
        $scope.sales = {};
    };

    inventory.gridOptions = {
        data: 'productList',
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
            { name: 'Action', enableCellEdit: false, enableFiltering: false, enableSorting: false, enableHiding: false, enableColumnMenu: false, width: 100, cellTemplate: '<a href="" class="text-danger" ng-click="grid.appScope.inventory.delete(row)"><i class="glyphicon glyphicon-remove">Delete</i></a>' },
            { name: 'productName', width: 250, enableCellEdit: true, sort: { direction: uiGridConstants.ASC } },
            { name: 'description', width: 300, enableCellEdit: true },
            { name: 'productCode', width: 250, enableCellEdit: true },
            { name: 'availableQty', width: 150, enableCellEdit: true, },
            { name: 'soldQty', width: 150, enableCellEdit: true },
            { name: 'unitPrice', width: 150, enableCellEdit: true },
            { name: 'supplier', width: 150, enableCellEdit: true },
            { name: 'totalAmount', width: 150, enableCellEdit: true },
            { name: 'datePurchased', width: 150, enableCellEdit: false },
            { name: 'type', width: 150, enableCellEdit: true },
        ],
        onRegisterApi: function (gridApi) {
            inventory.gridApi = gridApi;
            // gridApi.rowEdit.on.saveRow($scope, inventory.saveRow);
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                if (isNaN(parseInt(rowEntity.availableQty))) {
                    showMessageDialog("Warning", "Must be a number. Please check your input.", BootstrapDialog.TYPE_WARNING);
                } else if (isNaN(parseInt(rowEntity.soldQty))) {
                    showMessageDialog("Warning", "Must be a number. Please check your input.", BootstrapDialog.TYPE_WARNING);
                } else if (isNaN(parseFloat(rowEntity.unitPrice))) {
                    showMessageDialog("Warning", "Must be a number. Please check your input.", BootstrapDialog.TYPE_WARNING);
                } else if (isNaN(parseFloat(rowEntity.totalAmount))) {
                    showMessageDialog("Warning", "Must be a number. Please check your input.", BootstrapDialog.TYPE_WARNING);
                }
                else {
                    rowEntity.availableQty = parseInt(rowEntity.availableQty);
                    rowEntity.soldQty = parseInt(rowEntity.soldQty);
                    rowEntity.unitPrice = (parseFloat(rowEntity.unitPrice)).toFixed(4);
                    rowEntity.totalAmount = (parseFloat(rowEntity.totalAmount)).toFixed(4);
                    if (rowEntity._id != null && newValue != oldValue) {
                        BootstrapDialog.show({
                            title: "Warning",
                            message: "Product will be updated. Do you wish to continue?",
                            type: BootstrapDialog.TYPE_WARNING,
                            buttons: [
                                {
                                    label: 'Update',
                                    cssClass: 'btn-warning',
                                    action: function (dialog) {
                                        ApiService.updateData('product/' + rowEntity._id, rowEntity).success(function (response) {
                                            if (response === 'OK') {
                                                inventory.addHistory(rowEntity, colDef, newValue, oldValue);
                                                if (colDef.name === "totalAmount") {
                                                    ApiService.getDataById('product/' + rowEntity.productId).success(function (data) {
                                                        if (newValue < oldValue) {
                                                            data.totalAmount = (newValue - oldValue).toFixed(4);
                                                        } else {
                                                            data.totalAmount = (oldValue - newValue).toFixed(4);
                                                        }
                                                        inventory.addExpense(data);
                                                    })
                                                }
                                            }
                                            inventory.refreshData();

                                        })
                                        dialog.close();
                                    }
                                },
                                {
                                    label: 'Cancel',
                                    cssClass: 'btn-primary',
                                    action: function (dialog) {
                                        inventory.refreshData();
                                        dialog.close();

                                    }
                                }
                            ],

                        });

                    } 
                    // else {
                    //     console.log("No changes made.");
                    // }

                }
            });
        },
    };


    inventory.getProducts = function (callback) {
        ApiService.getData('product').success(function (data) {
            callback(data);
        }
            )
    };

    function showMessageDialog(title, message, type) {
        BootstrapDialog.show({
            title: title,
            message: message,
            type: type,
        });
    }

    inventory.lowQtyProduct = []

    inventory.checkInventory = function () {
        ApiService.getData('product').success(function (data) {
            data.forEach(function (element) {
                if (element.availableQty < 5) {
                    inventory.lowQtyProduct.push(element);
                }
            }, this);
            if (inventory.lowQtyProduct.length === 0) {
                showMessageDialog("Info", "No product in inventory less than 5 quantity.", BootstrapDialog.TYPE_INFO);
            } else {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    // size: size,
                    resolve: {
                        product: function () {
                            return inventory.lowQtyProduct;
                        }
                    }
                });
                modalInstance.result.then(function () {
                }, function () {
                    inventory.lowQtyProduct = [];
                });
            }
        })
    }
    $scope.animationsEnabled = true;
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

})
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, product) {
    $scope.products = product;
    $scope.close = function () {
        $uibModalInstance.dismiss('close');
    };

});