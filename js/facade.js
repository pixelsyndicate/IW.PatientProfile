/* from facade.js */

// graphs.bind( any_dom_element ) depending how deep you want to 'rebind'
graphs.bind = function (container) {


    // now start going through each item with the chart class
    // .each() returns a zero-based index and 'this' which is the DOM element that is current
    $(container).find('.chart').each(function (index, data) {
        var domElement = $(data);
        var url = "";
        // test to see if i can use a variable of json rather than a url

        var title = "";

        if (utilities.data.hasDataAttribute(domElement, 'title')) {
            title += utilities.data.getDataAttribute(domElement, 'title');
        }

        if (utilities.data.hasDataAttribute(domElement, 'url')) {
            url += utilities.data.getDataAttribute(domElement, 'url');
        }

        // this is to sample call JSON
        url = new Request.JSONP({
            url: 'http://jsfiddle.net/echo/jsonp/',
            data: {
                categories: [
                new Date(635241312000000000).toDateString(),
                new Date(635094432000000000).toDateString(),
                new Date(635314752000000000).toDateString(),
                new Date(635422752000000000).toDateString(),
                new Date(635510016000000000).toDateString()],
                series: [{
                    type: "column",
                    name: "Breakfast",
                    data: [288, 288, 288, 288, 288]
                }, {
                    type: "column",
                    name: "Lunch",
                    data: [180, 180, 180, 180, 180]
                }, {
                    type: "column",
                    "name": "Dinner",
                    "data": [75, 75, 75, 75, 75]
                }, {
                    type: "column",
                    "name": "Bedtime",
                    "data": [140, 151, 197, 228, 163]
                }, {
                    type: "spline",
                    "name": "Daily Avg. BG",
                    "data": [187, 215, 194, 216, 285]
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
                        color: "#89A54E"
                    }, {
                        name: "Bedtime",
                        y: 202,
                        color: "#80699B"
                    }]
                }]

            },
            onSuccess: function (chartData) {
                // When the data is returned, pass it in through var 'chartData'
                chart.xAxis = {
                    categories: url.Categories
                    // categories: chartData.Categories
                };
                // chart.series = chartData.Series;
                chart.series = url.Series;

                //  var handler = graphs.factory(domElement);

                var handler = function (domElement) {
                    for (var chartType in graphs.types) {
                        if ($(domElement).hasClass(chartType)) {
                            return graphs.types[chartType];
                        }
                    }
                    return null;
                };

                chart = handler(domElement, chart);

                // this identifies the element as a Highchart object, and the chart data is mapped to the output.
                $(domElement).highcharts(chart);

            }
        }).send();


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

            chart.xAxis = {
                categories: [
            new Date(635241312000000000).toDateString(),
            new Date(635094432000000000).toDateString(),
            new Date(635314752000000000).toDateString(),
            new Date(635422752000000000).toDateString(),
            new Date(635510016000000000).toDateString()]
                // categories: chartData.Categories

            };
            chart.series = {
                series: [{
                    type: "column",
                    name: "Breakfast",
                    data: [288, 288, 288, 288, 288]
            }, {
                    type: "column",
                    name: "Lunch",
                    data: [180, 180, 180, 180, 180]
            }, {
                    type: "column",
                    name: "Dinner",
                    data: [75, 75, 75, 75, 75]
            }, {
                    type: "column",
                    name: "Bedtime",
                    data: [140, 151, 197, 228, 163]
            }, {
                    type: "spline",
                    name: "Daily Avg. BG",
                    data: [187, 215, 194, 216, 285]
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
                        color: "#89A54E"
                }, {
                        name: "Bedtime",
                        y: 202,
                        color: "#80699B"
                }]
            }]
            };


            alert('using a ' + jQuery.parseJSON($url).Series);
            // chart.series = chartData.Series;
            // chart.series = url.Series;


            var handler = function (domElement, chart) {
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









            // we are now passing the location to put the chart, and the so-far chart to the graphs.types.TEMPLATE
            if (domElement === undefined) alert('your domElement is undefined');
            chart = handler(domElement, chart);

            if (chart === undefined) alert('your chart is undefined');
            // this identifies the element as a Highchart object, and the chart data is mapped to the output.
            alert('mapping the domElem with a ' + chart.value + ' HighCharts object');
            $(domElement).highcharts(chart);

            /*
            // .done() is called on 'success' (now depreciated as of jquery 1.5)
            $.getJSON(url)
                .done(function (chartData) {
                // When the data is returned, pass it in through var 'chartData'
                chart.xAxis = {
                    categories: url.Categories
                    // categories: chartData.Categories
                };
                // chart.series = chartData.Series;
                chart.series = url.Series;

                //  var handler = graphs.factory(domElement);

                var handler = function (domElement) {
                    for (var chartType in graphs.types) {
                        if ($(domElement).hasClass(chartType)) {
                            return graphs.types[chartType];
                        }
                    }
                    return null;
                };

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
                alert("error in getJSON()" + url);
            });
*/
        }

    });
};



