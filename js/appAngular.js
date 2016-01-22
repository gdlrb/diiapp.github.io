var app = angular.module('diApp', [
    'firebase',
    'ngRoute',
    'ngMaterial'
]);


angular.module('diApp')
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'LocationController',
                templateUrl: '/pages/home.html'
            })
            .when('/admin', {
                controller: 'LocationController',
                templateUrl: '/admin/admin.html'
            })
            .when('/pages/:id', {
                controller: 'LocationController',
                templateUrl: '/pages/show.html'
            })
    })
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true
            /*requireBase: false*/
        });
    });


angular.module('diApp')
    .controller('LocationController', function($scope, $location, Item, $routeParams){
        $scope.location = $location.absUrl();
        $scope.idd = Item.get({id: $routeParams.id});
    })
    .controller('AppCtrl', function($scope) {
        $scope.title1 = 'Button';
    });


app.controller("MyController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    var articles = new Firebase("https://diapp.firebaseio.com/articles");
    $scope.Articles = $firebaseArray(articles);
    $scope.addArticle = function(){
        $scope.Articles.$add({
            id:$scope.id,
            title:$scope.title,
            text:$scope.text
        });
    };
    $scope.deleteArticle = function(article){
        $scope.Articles.$remove(article);
    }

}])

.factory('Item', function(filterFilter, $firebaseArray){
    var articles = new Firebase("https://diapp.firebaseio.com/articles");
    var items = $firebaseArray(articles);

    return{
        query: function(params){
            return filterFilter(items, params);
        },
        get: function(params){
            return this.query(params)[0];
        }
    }
})

.filter('startFrom', function(){
    return function(input, start){
        start = +start;
        return input.slice(start);
    }
})
.controller('paginationCtrl', function($scope){
    $scope.currentPage = 0;
    $scope.itemsPerPage = 6;
    $scope.items = [];
    var ref = new Firebase("https://diapp.firebaseio.com/articles");
    ref.once("value", function(snapshot) {
        var a = snapshot.numChildren();
        return snapshot.numChildren()
        for( var i=0; i<a; i++){
            $scope.items.push('Product ' + i);
        }
        return items;

    })

    $scope.firstPage = function() {
        return $scope.currentPage == 0;
    }
    $scope.lastPage = function() {
        var lastPageNum;
            ref.once("value", function(snapshot) {
                var a = snapshot.numChildren();
                return lastPageNum = Math.ceil(a / $scope.itemsPerPage - 1);
            })
        return $scope.currentPage == lastPageNum;
    }
    $scope.numberOfPages = function(){
        var n = 0;
        ref.once("value", function(snapshot) {
            var a = snapshot.numChildren();

            return n = Math.ceil(a / $scope.itemsPerPage);
    })
        return n;
    }
    $scope.startingItem = function() {
        return $scope.currentPage * $scope.itemsPerPage;
    }
    $scope.pageBack = function() {
        $scope.currentPage = $scope.currentPage - 1;
    }
    $scope.pageForward = function() {
        $scope.currentPage = $scope.currentPage + 1;
    }
});