myApp.service('PatientModel', function () {
    this.getPatients = function () {
        return [
            {
                id: 0,
                fName: 'Shelby',
                lName: 'Dobson',
                bDate: ''
            }, {
                id: 1,
                fName: 'Spencer',
                lName: 'Dobson',
                bDate: ''
            }, {
                id: 2,
                fName: 'Hunter',
                lName: 'Bailey',
                bDate: ''
            }, {
                id: 3,
                fName: 'Jorden',
                lName: 'Bailey',
                bDate: ''
            }];
    };
});
