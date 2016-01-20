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
            .when('/login', {
                controller: 'LocationController',
                templateUrl: '/login/login.html'
            })
            .when('/admin', {
                controller: 'LocationController',
                templateUrl: '/admin/admin.html'
            })
    })
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true
            /*requireBase: false*/
        });
    });


angular.module('diApp')
    .controller('LocationController', function($scope, $location){
        $scope.location = $location.absUrl();
    })
    .controller('AppCtrl', function($scope) {

    });

