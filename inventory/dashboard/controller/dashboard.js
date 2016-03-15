app.controller('DashboardCtrl', function ($q, $scope, $http, ApiService) {
    var dashboard = this;
    dashboard.currentProduct = 'Please select...';
    // dashboard.productList = [];
    dashboard.defaultDataValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    dashboard.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    dashboard.labels = dashboard.month;
    dashboard.series = ['Amount Expense = PHP', 'Amount Sales = PHP'];
    dashboard.data = [];

    dashboard.onClick = function (points, evt) {
        console.log(points, evt);
    };

    dashboard.getAllProduct = function () {
        dashboard.currentProduct = 'Please select...';
        function salesFn() {
            var deferred = $q.defer();
            var sales = dashboard.defaultDataValue;
            ApiService.getData('productsales/').success(function (response) {
                if (response.length != 0) {
                    sales = [];
                    var data = dashboard.getMonthData(response);
                    for (var i = 0; i < data.length; i++) {
                        sales.push(data[i]);
                    };
                }
                deferred.resolve(sales);
            })
            return deferred.promise;
        }
        var promise = salesFn();
        promise.then(function (sales) {
            var expense = dashboard.defaultDataValue;
            ApiService.getData('productexpense/').success(function (response) {
                if (response.length != 0) {
                    expense = []
                    var data = dashboard.getMonthData(response);
                    for (var i = 0; i < data.length; i++) {
                        expense.push(data[i]);
                    };
                }
                dashboard.data = [
                    expense,
                    sales,
                ];
            })
        })
    };


    dashboard.getSelectedProduct = function (currentProduct) {
        if (currentProduct._id !== undefined) {
            function salesFn() {
                var deferred = $q.defer();
                var sales = dashboard.defaultDataValue;
                ApiService.getDataById('productsales/' + currentProduct._id).success(function (response) {
                    if (response.length != 0) {
                        sales = [];
                        var data = dashboard.getMonthData(response);
                        for (var i = 0; i < data.length; i++) {
                            sales.push(data[i]);
                        };
                    }
                    deferred.resolve(sales);
                })
                return deferred.promise;
            }
            var promise = salesFn();
            promise.then(function (sales) {

                var expense = dashboard.defaultDataValue;
                ApiService.getDataById('productexpense/' + currentProduct._id).success(function (response) {
                    if (response.length != 0) {

                        expense = [];
                        var data = dashboard.getMonthData(response);
                        for (var i = 0; i < data.length; i++) {
                            expense.push(data[i]);
                        };
                    }

                    dashboard.data = [
                        expense,
                        sales,
                    ];
                })
            })

        }

    };


    dashboard.getMonthData = function (response) {
        var monthValue = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
        response.forEach(function (element) {
            var year = dashboard.getYear(element.datePurchased);
            if (parseInt(year) === parseInt(dashboard.yearSelected)) {
                var month = dashboard.getMonth(element.datePurchased);
                var amount = monthValue[month];
                amount = amount + element.totalAmount;
                monthValue[month] = amount;

            }

        }, this);
        return dashboard.sortArrayByKey(monthValue);

    }
    dashboard.getMonth = function (date) {
        var month = new Date(Date.parse(date)).getUTCMonth();
        return month + 1;
        // return date.split('-')[1];
    }
    dashboard.getYear = function (date) {
        var year = new Date(Date.parse(date)).getUTCFullYear();
        return year;
        // return date.split('-')[0];
    }

    dashboard.sortArrayByKey = function (arr) {
        var data = [];
        var key = Object.keys(arr);
        // var intKey = [];
        // for (var i = 0; i < key.length; i++) {
        //     if (key[i] < key[i + 1]) {
        //         intKey.push(key[i]);
        //     } else {
        //         intKey.push(key[i]);
        //     }
        // }
        key.sort(dashboard.sortArrayByValue);
        for (var i = 0; i < key.length; i++) {
            data.push(arr[key[i]]);
        }
        return data;
    }


    dashboard.sortArrayByValue = function (a, b) {
        return a - b;
    }

    dashboard.getProducts = function (callback) {
        ApiService.getData('product').success(function (data) {
            // dashboard.productList = data;
            callback(data);
        }
            )
    };

    dashboard.yearSelected = dashboard.getYear(new Date().toISOString()).toString();

    dashboard.getYears = function (callback) {
        var years = [];
        ApiService.getData('product').success(function (response) {
            response.forEach(function (element) {
                var year = dashboard.getYear(element.datePurchased);
                year = year + '';
                if (years.indexOf(year) < 0) {
                    years.push('' + year);
                }
            }, this);
            years.sort(dashboard.sortArrayByValue);
            callback(years);
        }
            )
    }


    if (angular.isUndefined(dashboard.currentProduct._id)) {
        dashboard.getAllProduct();
    }
});

