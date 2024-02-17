import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.component.html',
    styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
    public chartData = {
        series: [{
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }
        ],
        xTitle : 'Month',
        xCategories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        yTitle: 'Saless',
        onHoverFormatter: function (val: any) {
            return "$ " + val + " thousandss"
        }
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
