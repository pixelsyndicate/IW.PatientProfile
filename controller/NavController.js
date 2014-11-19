myApp.controller('NavController', ['$scope', 'PatientModel',
    function ($scope, PatientModel) {
        'use strict';
        var patients = PatientModel.getPatients();
        $scope.patients = patients;
    }]);
