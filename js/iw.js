/* This is the JS the works without AI.HIGHCHARTER */

var DailyBgEventWithAverage;
var DailyInsulinEventWithAverage;
var DailyCarbsEventWithAverage;

function RefreshAllCharts() {

    p1BuildRefreshBg($('#p1containerComboDailyBgWithAverage'));
    p1BuildRefreshInsulin($('#p1containerComboDailyInsulinWithAverage'));
    p1BuildRefreshCarbs($('#p1containerComboDailyCarbsWithAverage'));
    graphs.bind($('#tab-content'));
    $('.username').toggle('fade');
}

$('a[data-toggle="tab"][data-patient="p1"]').on('shown.bs.tab', function (e) {
    // alert('clicked by ' + e.elementId);
    var newTab = e.target; // newly activated tab
    var oldTab = e.relatedTarget; // previous active tab

    p1BuildRefreshBg($('#p1containerComboDailyBgWithAverage'));
    p1BuildRefreshInsulin($('#p1containerComboDailyInsulinWithAverage'));
    p1BuildRefreshCarbs($('#p1containerComboDailyCarbsWithAverage'));

    graphs.bind($('#tab-content'));
    $('.username').toggle('fade');
});

$(window).on('resize', function () {
    RefreshAllCharts();
});

function p1BuildRefreshBg(_targetContainer) {

    var $container = _targetContainer;
    //$('#p1containerComboDailyBgWithAverage');

    // here's how it normally works
    // DailyBgEventWithAverage =
    new Highcharts.Chart({
        chart: {
            renderTo: $container[0],
            height: 400
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

function p1BuildRefreshInsulin(_targetContainer) {

    var $container = _targetContainer;
    new Highcharts.Chart({
        chart: {
            renderTo: $container[0],
            height: 400
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

function p1BuildRefreshCarbs(_targetContainer) {

    var $container = _targetContainer;
    new Highcharts.Chart({
        chart: {
            renderTo: $container[0],
            height: 400
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



// this runs at page load, and begins the graph binding process starting at the page body tag
$(function () {
    // commented out so it doesn't override the working stuff below:
    graphs.bind($('body'));
});
