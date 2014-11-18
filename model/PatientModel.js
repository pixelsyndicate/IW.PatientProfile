        myApp.service('PatientModel', function () {
            this.getPatients = function () {
                return [
                    {
                        id: 0,
                        fName: 'Shelby'
                }, {
                        id: 1,
                        fName: 'Spencer'
                }, {
                        id: 2,
                        fName: 'Hunter'
                }, {
                        id: 3,
                        fName: 'Jorden'
                }
                ];
            };
        });



        myApp.service('DetailModel', function () {
            var thisDetails = getDetailsForPatient(var id);

            function getDetailsForPatient(id) {

                return [];
            }

        });
