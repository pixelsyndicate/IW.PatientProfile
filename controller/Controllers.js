myApp.controller('PatientController', ['$scope', 'PatientModel',
    function ($scope, PatientModel) {
        var patients = PatientModel.getPatients();
        $scope.patients = patients;
    }]);
myApp.controller('GreetingController', ['$scope',
            function ($scope) {
        $scope.greeting = 'Hola!';
        $scope.currentTime = new Date();
    }]);
