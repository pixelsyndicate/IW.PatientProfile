

/* from /Utilities/namespace.js */
utilities = {};

/* from namespace.js */
graphs = {
    types: { }
};

/* from /Utilities/utilities.data.js */
// this is simply a method that digs the value out of the data-SOMETHING
// and returns a JSON object of { hasDataAttribute: boolean, getDataAttribute: string }
utilities.data = function () {
    var self = this;
    var that = {};
    that.hasDataAttribute = function (domElement, attribute) {
        var has = $(domElement).data(attribute);
        return typeof has != 'undefined';
    };
    that.getDataAttribute = function (domElement, attribute) {
        if (that.hasDataAttribute(domElement, attribute)) {
            return $(domElement).data(attribute);
        }
        throw new Error("DOM Element does not contain data attribute : " + attribute);
    };
    return that;
}();



// basic JS representation of a highcharts BAR chart - used as a template for the Factory class
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


// this is my own 'handler' for combination charts
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


/* factory.js */
// this factory returns the Chart Code that was set up to match the .CLASS of the dom element
graphs.factory = function (domElement) {
    for (var type in graphs.types) {
        if ($(domElement).hasClass(type)) {
            var handler = graphs.types[type];
            return handler;
        }
    }
    return null;
};



/* from facade.js */

// graphs.bind( any_dom_element ) depending how deep you want to 'rebind'
graphs.bind = function (container) {

    // now start going through each item with the chart class
    // .each() returns a zero-based index and 'this' which is the DOM element that is current
    $(container).find('.chart').each(function (index, data) {
        var domElement = $(data);
        var url = "";
        // test to see if i can use a variable of json rather than a url
        url = myJsonData;
        var title = "";

        if (utilities.data.hasDataAttribute(domElement, 'title')) {
            title += utilities.data.getDataAttribute(domElement, 'title');
        }

        if (utilities.data.hasDataAttribute(domElement, 'url')) {
            url += utilities.data.getDataAttribute(domElement, 'url');
        }

        var chart = {
            title: {
                text: title
            },
            yAxis: {
                title: null
            }
        };

        // if there is a data-url="" , go GET the JSON from it.
        if (url !== "") {

            // .done() is called on 'success' (now depreciated as of jquery 1.5)
            $.getJSON(url)
                .done(function (chartData) {
                // When the data is returned, pass it in through var 'chartData'
                chart.xAxis = {
                    categories: chartData.Categories
                };
                chart.series = chartData.Series;
                //chart.title = { text: chartData.Title };

                /*  graphs.factory is a method that accepts a domElement.
                        this looks for each graph.type in Graphs/graphs.*.js
                         and if this particular domElement has class of that type
                        i.e. class='bar' would be from the graphs.types.bar
                        then that javascript file is set as the 'handler'

                        // if ($(domElement).hasClass(type)) {,
                        //     var handler = graphs.types[type];
                        //     return handler;
                        // }
                   */
                var handler = graphs.factory(domElement);

                /*
                    now the handler is passed the domElement
                        <div class="chart bar"></div>
                    and the dynamic object
                        chart = {
                            title: { text: title },
                            yAxis: { title: null },
                        }

                    the handler.js looks at the domElement, and if it has some other characteristics
                    it creates new dynamic objects and then applies it to the passed in chart

                        chart.chart = { type: 'bar' };

                        if ($(domElement).hasClass('stacked')) {
                            plotOptions.series = {
                                stacking: "normal"
                            };
                        }

                        chart.plotOptions = column: {
                                pointPadding: 0,
                                borderWidth: 0
                            };

                        return chart;
                    */
                chart = handler(domElement, chart);


                // this identifies the element as a Highchart object, and the chart data is mapped to the output.
                $(domElement).highcharts(chart);

                // this tells the TOASTER that its done
                //$("body").trigger("ProcessedTotal", [$(domElement)]);
                //services.dataAlertService.addToProcessed();
            })
                .fail(function () {
                // this tells the TOASTER that there was an error
                // $("body").trigger("ErrorTotal", [$(domElement)]);
				alert('error in getJSON()');
            });

        }

    });
};






/* This is the JS the works without AI.HIGHCHARTER */

var DailyBgEventWithAverage;
var DailyInsulinEventWithAverage;
var DailyCarbsEventWithAverage;

function RefreshAllCharts() {

    p1BuildRefreshBg();
    p1BuildRefreshInsulin();
    p1BuildRefreshCarbs();

}

$('a[data-toggle="tab"][data-patient="p1"]').on('shown.bs.tab', function (e) {
    // alert('clicked by ' + e.elementId);
    var newTab = e.target; // newly activated tab
    var oldTab = e.relatedTarget; // previous active tab
    p1BuildRefreshBg();
    p1BuildRefreshInsulin();
    p1BuildRefreshCarbs();
});

$(window).on('resize', function () {
    RefreshAllCharts();
});

function p1BuildRefreshBg() {

    DailyBgEventWithAverage = new Highcharts.Chart({
        chart: {
            renderTo: "p1containerComboDailyBgWithAverage"
        },
        title: {
            text: 'Shelby\'s Blood Glucose History'
        },
        subtitle: {
            text: "Source: Insulin Wizard  (pixelsyndicate.com)"
        },
        labels: { // pie chart descriptions
            items: [{
                html: 'Avg. BG',
                style: {
                    left: '10px',
                    top: '28px',
                    color: 'black'
                }
            }]
        },
        tooltip: {
            formatter: function () {
                var s;
                if (this.point.name) { // the pie chart
                    s = '<b> ' + this.series.name + '</b><br />' + this.point.name + ' ' + this.y + ' ';
                } else if (this.point.series) { // the column chart
                    s = '<b>' + this.series.name + '</b>: <BR>' + this.y + ' ' + (this.series.name == 'Bolus Given' ? ' units' : 'bg') + ' of ' + this.y + '';
                } else {
                    s = '' + this.y + ' BG';
                }
                return s;
            }
        },
        xAxis: {
            categories: ["Jan 2014",
                "Feb 2014", "Mar 2014", "Apr 2014", "May 2014"],
            type: "datetime",
            dateTimeLabelFormats: {
                month: "%e. %b",
                year: "%b"
            }
        },
        yAxis: { // Primary yAxis
            title: {
                text: "Blood Glucose (BG)"
            }
        },
        series: [ // BG
        {
            type: "column",
            name: "Breakfast",
            data: [
            288, 288, 288, 288, 288]
        }, {
            type: "column",
            name: "Lunch",
            data: [
            180, 180, 180, 180, 180]
        }, {
            type: "column",
            name: "Dinner",
            data: [
            75, 75, 75, 75, 75]
        }, {
            type: "column",
            name: "Bedtime",
            data: [140, 151, 197, 228, 163]
        }, {
            type: "spline",
            name: "Daily Avg. BG",
            data: [187, 215, 194, 216, 285],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: "white"
            }
        }, {
            type: "pie",
            name: "Avg BG",
            data: [{
                name: "Breakfast",
                y: 198,
                color: "#4572A7"
            }, {
                name: "Lunch",
                y: 219,
                color: "#AA4643"
            }, {
                name: "Dinner",
                y: 195,
                color: "#89A54E" // Dinner's color
            }, {
                name: "Bedtime",
                y: 202,
                color: "#80699B" // Bedtimes's color
            }],
            center: [45, 2],
            size: 50,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}

function p1BuildRefreshInsulin() {
    DailyInsulinEventWithAverage = new Highcharts.Chart({
        chart: {
            renderTo: "p1containerComboDailyInsulinWithAverage"
        },
        title: {
            text: 'Shelby\'s Insulin History'
        },
        subtitle: {
            text: "Source: Insulin Wizard Mobile (pixelsyndicate.com)"
        },
        labels: { // pie chart descriptions
            items: [{
                html: 'Avg. Insulin',
                style: {
                    left: '10px',
                    top: '28px',
                    color: 'black'
                }
            }]
        },
        tooltip: {
            formatter: function () {
                var s;
                if (this.point.name) { // the pie chart
                    s = '<b> ' + this.series.name + '</b><br />' + this.point.name + ' ' + this.y + ' ';
                } else if (this.point.series) { // the column chart
                    s = '<b>' + this.series.name + '</b>: <BR>' + this.y + ' ' + (this.series.name == 'Bolus Given' ? ' units' : 'bg') + ' of ' + this.y + '';
                } else {
                    s = '' + this.y + ' BG';
                }
                return s;
            }
        },
        xAxis: {
            categories: ["Jan 2014",
                "Feb 2014", "Mar 2014", "Apr 2014", "May 2014"],
            type: "datetime",
            dateTimeLabelFormats: {
                month: "%e. %b",
                year: "%b"
            }
        },
        yAxis: { // Primary yAxis
            title: {
                text: "Bolus Insulin"
            }
        },
        series: [ // Insulin
        {
            type: "column",
            name: "Breakfast",
            data: [5, 5, 5, 5, 5]
        }, {
            type: "column",
            name: "Lunch",
            data: [
            3, 3, 3, 3, 3]
        }, {
            type: "column",
            name: "Dinner",
            data: [
            7, 7, 7, 7, 7]
        }, {
            type: "column",
            name: "Bedtime",
            data: [4, 5, 9, 2, 6]
        }, {
            type: "spline",
            name: "Average Bolus",
            data: [7, 8, 6, 4, 5],
            marker: {
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: "white"
            }
        }, { // PIES
            type: "pie",
            name: "Avg. Insulin",
            data: [{
                name: "Breakfast",
                y: 7.57,
                color: "#4572A7"
            }, {
                name: "Lunch",
                y: 4.61,
                color: "#AA4643"
            }, {
                name: "Dinner",
                y: 6.45,
                color: "#89A54E" // Dinner's color
            }],
            center: [45, 2],
            size: 50,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}

function p1BuildRefreshCarbs() {
    DailyCarbsEventWithAverage = new Highcharts.Chart({
        chart: {
            renderTo: "p1containerComboDailyCarbsWithAverage"
        },
        title: {
            text: 'Shelby\'s Carbohydrate History'
        },
        subtitle: {
            text: "Source: Insulin Wizard Mobile (pixelsyndicate.com)"
        },
        labels: { // pie chart descriptions
            items: [{
                html: 'Avg. Carbs',
                style: {
                    left: '10px',
                    top: '28px',
                    color: 'black'
                }
            }]
        },
        tooltip: {
            formatter: function () {
                var s;
                if (this.point.name) { // the pie chart
                    s = '<b> ' + this.series.name + '</b><br />' + this.point.name + ' ' + this.y + ' ';
                } else if (this.point.series) { // the column chart
                    s = '<b>' + this.series.name + '</b>: <BR>' + this.y + ' ' + (this.series.name == 'Bolus Given' ? ' units' : 'bg') + ' of ' + this.y + '';
                } else {
                    s = '' + this.y + ' BG';
                }
                return s;
            }
        },
        xAxis: {
            categories: ["Jan 2014",
                "Feb 2014", "Mar 2014", "Apr 2014", "May 2014"],
            type: "datetime",
            dateTimeLabelFormats: {
                month: "%e. %b",
                year: "%b"
            }
        },
        yAxis: { // Primary yAxis
            title: {
                text: "Meal Carbohydrates"
            }
        },
        series: [ // Insulin
        {
            type: "column",
            name: "Breakfast",
            data: [
            99, 99, 99, 99, 99]
        }, {
            type: "column",
            name: "Lunch",
            data: [
            144, 144, 144, 144, 144]
        }, {
            type: "column",
            name: "Dinner",
            data: [
            200, 200, 200, 200, 200]
        }, {
            type: "column",
            name: "Bedtime",
            data: [4, 5, 9, 2, 6, 3]
        }, {
            type: "spline",
            name: "Average Carbs",
            data: [7, 8, 6, 4, 5, 9],
            marker: {
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: "white"
            }
        }, {
            type: "pie",
            name: "Avg Carbs",
            data: [{
                name: "Breakfast",
                y: 95,
                color: "#4572A7"
            }, {
                name: "Lunch",
                y: 81,
                color: "#AA4643"
            }, {
                name: "Dinner",
                y: 98,
                color: "#89A54E" // Dinner's color
            }],
            center: [45, 2],
            size: 50,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}



$().ready(function () {
    p1BuildRefreshBg();

    graphs.bind($('.tab-content'));
});

// this runs at page load, and begins the graph binding process starting at the page body tag
$(function () {
    // commented out so it doesn't override the working stuff below:
    // graphs.bind($('body'));
});
