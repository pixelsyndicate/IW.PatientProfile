// basic JS representation of a highcharts BAR chart - used as a template for the Factory class

graphs.types.column = function (domElement, chart) {
    var plotOptions = {
        column: {
            pointPadding: 0,
            borderWidth: 0
        }
    };

    if ($(domElement).hasClass('stacked')) {
        plotOptions.series = {
            stacking: "normal"
        };
    }

    // why can't we make this come from the JSON?
    chart.chart = {
        type: 'column'
    };
    chart.plotOptions = plotOptions;


    return chart;
};

graphs.types.bar = function (domElement, chart) {
    var plotOptions = {
        column: {
            pointPadding: 0,
            borderWidth: 0
        }
    };

    if ($(domElement).hasClass('stacked')) {
        plotOptions.series = {
            stacking: "normal"
        };
    }

    // why can't we make this come from the JSON?
    chart.chart = {
        type: 'bar'
    };
    chart.plotOptions = plotOptions;

    return chart;
};

graphs.types.combo = function (domElement, chart) {
    var plotOptions = {
        column: {
            pointPadding: 0,
            borderWidth: 0
        }
    };

    if ($(domElement).hasClass('stacked')) {
        plotOptions.series = {
            stacking: "normal"
        };
    }

    // why can't we make this come from the JSON?
    chart.chart = {
        type: 'pie'
    };
    chart.plotOptions = plotOptions;


    return chart;
};
