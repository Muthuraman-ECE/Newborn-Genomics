import data1 from './data.json' assert { type: 'json' };

var disease="Cystic Fibrosis"
// filter dataset corespond to the selected disease

var data=data1.data.filter(ele =>
    ele.Disease === disease
)



am4core.ready(function() {
    var js=[]
    for(var i=0;i<data.length;i++){
        var j={}
        var Gene=data[i].Mutation
        var Patients=data[i].Patients
        j["Mutation"]=Gene
        j["Patients"]=Patients
        js.push(j)
    }
    js.sort(function(a, b){
        return b.Patients - a.Patients;
    });


    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chart_2", am4charts.XYChart);
    chart.data=js
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Mutation";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 1;


    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
    }
    return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Patients";
    series.dataFields.categoryX = "Mutation";
    series.name = "Patients";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

});


am4core.ready(function() {
    var js=[]
    for(var i=0;i<data.length;i++){
        var j={}
        var Gene=data[i].Mutation
        var Freq=data[i].Frequency
        j["Mutation"]=Gene
        j["Frequency"]=Freq
        js.push(j)
    }
    js.sort(function(a, b){
        return b.Frequency - a.Frequency;
    });


    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chart_1", am4charts.XYChart);
    chart.data=js
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Mutation";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 1;


    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
    }
    return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Frequency";
    series.dataFields.categoryX = "Mutation";
    series.name = "Frequency";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

});
