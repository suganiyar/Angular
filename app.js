//Demo of Searching Sorting and Pagination of Table with AngularJS - Advance Example

var myApp = angular.module('myApp', []);
 

//Not Necessary to Create Service, Same can be done in COntroller also as method like add() method
myApp.service('filteredListService', function () {
     
    
    this.searched = function (valLists,toSearch) {
        return _.filter(valLists, 
        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });        
    };
    
    this.paged = function (valLists,pageSize)
    {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };
 
});

var TableCtrl = myApp.controller('TableCtrl', function ($scope, $filter, filteredListService) {
 
    $scope.pageSize = 4;
    $scope.allItems = getDummyData(); 
    $scope.reverse = false;
 
    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.newEmpId = '';
        $scope.newName = '';
        $scope.newEmail = '';
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['','',''];
    }


    $scope.add = function () {
        $scope.allItems.push({
            EmpId: $scope.newEmpId,
            name: $scope.newName,
            Email: $scope.newEmail
        });
        $scope.resetAll();
    }

    $scope.search = function () {
        $scope.filteredList = 
       filteredListService.searched($scope.allItems, $scope.searchText);
        
        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
        $scope.pagination(); 
    }


    // Calculate Total Number of Pages based on Search Result
    $scope.pagination = function () {
        $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );         
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };
    
    $scope.sort = function(sortBy){
        $scope.resetAll();  
        
        $scope.columnToOrder = sortBy; 
             
        //$Filter - Standard Service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse); 

        if($scope.reverse)
             iconName = 'glyphicon glyphicon-chevron-up';
         else
             iconName = 'glyphicon glyphicon-chevron-down';
              
        if(sortBy === 'EmpId')
        {
            $scope.Header[0] = iconName;
        }
        else if(sortBy === 'name')
        {
            $scope.Header[1] = iconName;
        }else {
            $scope.Header[2] = iconName;
        }
         
        $scope.reverse = !$scope.reverse;   
        
        $scope.pagination();    
    };
    
    //By Default sort ny Name
     $scope.sort ('name');  
    
});

 

//Inject Services for DI
//$scope is standard service provided by framework
//If we want to use standard $Filter, It also needs to be injected
//filteredService - custom created by me
TableCtrl.$inject = ['$scope', '$filter','filteredListService'];

function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Email.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.EmpId == toSearch) ? true : false;
}

/*Get Dummy Data for Example*/
function getDummyData() {
    return [{
        EmpId: 2,
        name: 'Test',
        Email: 'test@gmail.com'
    }, {
        EmpId: 1,
        name: 'test1',
        Email: 'test1@gmail.com'
    }, {
        EmpId: 3,
        name: 'demo',
        Email: 'demo@gmail.com'
    }, {
        EmpId: 21,
        name: 'demo1',
        Email: 'demo1@gmail.com'
    }, {
        EmpId: 11,
        name: 'testing',
        Email: 'testing@gmail.com'
    }, {
        EmpId: 31,
        name: 'sample',
        Email: 'sample@gmail.com'
    }, {
        EmpId: 22,
        name: 'check',
        Email: 'check@gmail.com'
    }, {
        EmpId: 12,
        name: 'checking',
        Email: 'checking@gmail.com'
    }, {
        EmpId: 32,
        name: 'sugan',
        Email: 'sugan@gmail.com'
    }, {
        EmpId: 23,
        name: 'Suga',
        Email: 'suga@gmail.com'
    }, {
        EmpId: 13,
        name: 'saran',
        Email: 'saran@gmail.com'
    }, {
        EmpId: 33,
        name: 'finaltest',
        Email: 'finaltest@gmail.com'
    }];
}
