app.controller('HistoryCtrl', function ($scope, $http, uiGridConstants, ApiService) {
    var history = this;
    
    history.gridOptions = {
        data: 'historyList',
        enableColumnResizing: true,
        enableFiltering: true,
        enableColumnMenus: false,
        enableGridMenu: true,
        showGridFooter: true,
        fastWatch: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
            { name: 'productName', width: 300 , sort: { direction: uiGridConstants.ASC }},
            { name: 'description', width: 700 },
            { name: 'Action', displayName: "", enableCellEdit: false, enableFiltering: false, enableSorting: false, enableHiding: false, enableColumnMenu: false, width: 200},
        ],
        expandableRowTemplate : '<div ui-grid="row.entity.subGridOptions" style="height:400px;"></div>',
        expandableRowHeight: 400,
        onRegisterApi: function (gridApi) {
            history.gridApi = gridApi;
            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                  row.entity.subGridOptions = {
                    columnDefs: [
                    { name: 'field'},
                    { name: 'oldValue'},
                    { name: 'newValue'},
                    {name: 'dateModified', sort: { direction: uiGridConstants.DESC }}
                  ]};
                  ApiService.getDataById('producthistory/' + row.entity._id)
                    .success(function(data) {
                      row.entity.subGridOptions.data = data;
                    });
                  }
            })
        },
    };
    
$scope.historyList = [];
ApiService.getData('product').success(function(data){
    $scope.historyList = data;
});
    
});