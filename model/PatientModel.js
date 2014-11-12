IW.service('PatientModel', function () {
    this.getPatients = function () {
        return [{
            id: 0,
            fName: 'Shelby',
            bDay: new Date('1998-10-8')
        }, {
            id: 1,
            fName: 'Spencer',
            bDay: new Date('2000-11-6')
        }, {
            id: 2,
            fName: 'Hunter',
            bDay: new Date('2000-11-6')
        }, {
            id: 3,
            fName: 'Jorden',
            bDay: new Date('2000-11-6')
        }]
    }
})