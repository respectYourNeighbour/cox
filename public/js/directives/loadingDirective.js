angular.module('main_app').directive('loading', ['$http' ,function ($http)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                    console.log("still loading"+v)
                }else{
                    elm.hide();
                    //elm.remove();
                     console.log("done loading"+v)
                    //delete because i only want the loading screen when accessing the website not everytime a request is made
                }
            });
        }
    };

}]);