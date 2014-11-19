myApp.service('PatientModel', function () {
    this.getPatients = function () {
        return [
            {
                id: 0,
                fName: 'Shelby',
                bDate: ''
            }, {
                id: 1,
                fName: 'Spencer',
                bDate: ''
            }, {
                id: 2,
                fName: 'Hunter',
                bDate: ''
            }, {
                id: 3,
                fName: 'Jorden',
                bDate: ''
            }];
    };
});
