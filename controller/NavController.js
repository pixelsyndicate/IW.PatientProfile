myApp.controller('NavController', ['$scope', 'PatientModel',
            function ($scope, PatientModel) {
        var patients = PatientModel.getPatients();
        $scope.patients = patients;
            }]);
