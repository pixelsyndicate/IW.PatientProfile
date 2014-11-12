IW.controller('PatientController',
    function ($scope, PatientModel) {

        var patients = PatientModel.getPatients();

        for (var i = 0; i < patients.length; i++) {
            patients[i].details = DetailModel.getDetailsForPatient(patienst[i].id);
        }



        $scope.patients = patients;
        $scope.currentTime = new Date();

    })

// this function in an ng-controller (fyi)
function Clock($scope) {
    $scope.currentTime = new Date();
}