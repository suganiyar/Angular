var myApp = angular.module('myApp', []);
 
myApp.service('filteredListService', function () {
     
    
    this.searched = function (valLists,toSearch) {
        return _.filter(valLists, 
        function (i) {
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
    $scope.allItems = getJSONData(); 
    $scope.reverse = false;
 
    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.newDocumentId = '';
        $scope.newDocumentName = '';
        $scope.newTechnology = '';
        $scope.newUploadedBy = '';
        $scope.newUploadedDate = '';
        $scope.newAbstract = '';
        $scope.newNoOfVisits = '';
        $scope.newNoOfDownloads = '';
        $scope.newReference = '';
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['','',''];
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
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse); 

        if($scope.reverse)
             iconName = 'glyphicon glyphicon-chevron-up';
         else
             iconName = 'glyphicon glyphicon-chevron-down';
              
        if(sortBy === 'DocumentId')
        {
            $scope.Header[0] = iconName;
        }
        else if(sortBy === 'DocumentName')
        {
            $scope.Header[1] = iconName;
        }
        else if(sortBy === 'Technology')
        {
            $scope.Header[2] = iconName;
        }
         else if(sortBy === 'UploadedBy')
        {
            $scope.Header[3] = iconName;
        }
         else if(sortBy === 'UploadedDate')
        {
            $scope.Header[4] = iconName;
        }
         else if(sortBy === 'Abstract')
        {
            $scope.Header[5] = iconName;
        }
         else if(sortBy === 'NoOfVisits')
        {
            $scope.Header[6] = iconName;
        }
         else if(sortBy === 'NoOfDownloads')
        {
            $scope.Header[7] = iconName;
        }
         else if(sortBy === 'Reference')
        {
            $scope.Header[8] = iconName;
        }
        else {
            $scope.Header[2] = iconName;
        }         
        $scope.reverse = !$scope.reverse;   
        $scope.pagination();    
    };
    
     $scope.sort ('DocumentId');  
    
});

 
TableCtrl.$inject = ['$scope', '$filter','filteredListService'];

function searchUtil(item, toSearch) {
    return (item.DocumentName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||item.Technology.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.UploadedBy.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.UploadedDate.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Abstract.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Reference.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ||  item.DocumentId == toSearch) ? true : false;
}

function getJSONData() {
    return [{
    		DocumentId:1,
        DocumentName: 'Placeholder Issue',
        Technology: 'Jquery',
        UploadedBy: 'testing@gmail.com',
        UploadedDate: '02-06-2017',
        Abstract:'placeholder issue in IE with Jquery',
        NoOfVisits:5,
        NoOfDownloads:10,
        Reference:'http://wsnippets.com/fix-placeholder-issue-ie-jquery/'
        
    }, {
    		DocumentId:2,
        DocumentName: 'Ajax caching',
        Technology: 'Jquery Ajax',
        UploadedBy: 'checking@gmail.com',
        UploadedDate: '12-06-2017',
        Abstract:'JQuery Fix for IE Ajax Caching issue',
        NoOfVisits:2,
        NoOfDownloads:12,
        Reference:'http://netawakening.azurewebsites.net/2012/11/jquery-fix-for-ie-ajax-caching-issue/'
    }, {
    		DocumentId:3,
        DocumentName: 'IE Bugs ',
        Technology: 'HTML & CSS',
        UploadedBy: 'sample@gmail.com',
        UploadedDate: '15-06-2017',
        Abstract:'9 Most Common IE Bugs and How to Fix Them',
        NoOfVisits:8,
        NoOfDownloads:16,
        Reference:'https://code.tutsplus.com/tutorials/9-most-common-ie-bugs-and-how-to-fix-them--net-7764'
    },
     {
    		DocumentId:4,
        DocumentName: 'Html fix ',
        Technology: 'HTML5',
        UploadedBy: 'demo@gmail.com',
        UploadedDate: '10-06-2017',
        Abstract:'A Simple HTML5 Fix for IE',
        NoOfVisits:12,
        NoOfDownloads:26,
        Reference:'http://www.hagenburger.net/BLOG/Simple-HTML5-Fix-for-IE.html'
    },
     {
    		DocumentId:5,
        DocumentName: 'HTML5 & IE',
        Technology: 'HTML5',
        UploadedBy: 'test@gmail.com',
        UploadedDate: '19-06-2017',
        Abstract:'HTML5 working in IE and Firefox 2 ',
        NoOfVisits:14,
        NoOfDownloads:12,
        Reference:'http://html5doctor.com/how-to-get-html5-working-in-ie-and-firefox-2/'
    }
    
    ];
}
