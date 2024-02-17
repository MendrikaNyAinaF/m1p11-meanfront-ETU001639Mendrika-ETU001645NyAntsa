import {Component, Input, OnInit} from '@angular/core';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    @Input() data: Partial<ChartOptions> | any;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: null,
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    // endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                title: {
                    text: 'Month'
                }
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: any) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        };
    }

    ngOnInit(): void {
        this.chartOptions.series = this.data['series']
        let xTitle = this.data['xTitle']
        xTitle !== undefined ? this.chartOptions.xaxis.title.text = xTitle : null

        let xCategories = this.data['xCategories']
        xCategories !== undefined ? this.chartOptions.xaxis.categories = xCategories : null

        let yTitle = this.data['yTitle']
        yTitle !== undefined ? this.chartOptions.yaxis.title.text = yTitle : null

        let onHoverFormatter = this.data['onHoverFormatter']
        onHoverFormatter !== undefined ? this.chartOptions.tooltip.y.formatter = onHoverFormatter : null;
    }
}
