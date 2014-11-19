// Angular code will go in here to assist in keeping data relevant
var myApp = angular.module('myApp', []);

// angular config
var iwConfig = function ($routeProvider) {
    $routeProvider.when('/', {
        controler: 'PatientController',
        templateUrl: 'view/home.html'
    })
        .when('/patients/:patientId', {
            controler: 'PatientController',
            templateUrl: 'view/patient.html'
        });
};

// angular namespace
// var IW = angular.module('IW', []).config(iwConfig);

myApp.controller('GreetingController', ['$scope',
            function ($scope) {
        $scope.greeting = 'Hola!';
        $scope.currentTime = new Date();
    }]);
