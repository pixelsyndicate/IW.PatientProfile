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
