import {Component, OnInit} from '@angular/core';
import {DateUtilService} from "../../../../services/utils/date-util.service";
import {IncomeService} from "../../../../services/statistics/income/income.service";
import {Validators} from "@angular/forms";

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
    byWhat: string = "day";
    filterInputs!: any;
    formAction!: any;
    numberAppointment: any;
    isDataThere: boolean = false;
    chartOptions: any = {
        series: [],
        xaxis: {
            categories: [],
            title: {
                text: "Date"
            }
        },
        yaxis: {
            title: {
                text: "Chiffre d'affaire"
            }
        },
        onHoverFormatter: function (val: any) {
            return val + " Ar"
        }
    };

    constructor(private dateUtil: DateUtilService, private incomeService: IncomeService) {
    }

    ngOnInit(): void {
        const dates: any[] = this.dateUtil.getFirstAndLastDateInCurrentMonth();
        this.getIncome({byWhat: this.byWhat, startDate: dates[0], endDate: dates[1]});
        this.buildFilterFormProps();
        this.buildFormAction();
    }

    buildFilterFormProps() {
        const type = this.byWhat == "day" ? "date" : "month";
        this.filterInputs = {
            startDate: {
                type: type,
                label: "Date de début",
                value: "",
                validators: [Validators.required],
                class: "me-24 fs-16"
            },
            endDate: {
                type: type,
                label: "Date de fin",
                value: "",
                validators: [Validators.required],
                class: "me-24 fs-16"
            },
            byWhat: {
                type: "select",
                label: "Par",
                default: this.byWhat,
                options: [
                    {label: "Jour", value: "day"},
                    {label: "Mois", value: "month"}
                ],
                getValue: (obj: any) => obj.value,
                getText: (obj: any) => obj.label,
                validators: [Validators.required],
                class: "me-24 fs-16"
            }
        }
    }

    buildFormAction() {
        this.formAction = {
            color: "primary",
            label: "Filtrer",
            submit: (obj: any) => {
                if (obj.byWhat == "month") {
                    obj.startDate = obj.startDate.substring(0, 7) + "-01";
                    obj.endDate = this.dateUtil.getLastDayOfMonth(obj.endDate.substring(0, 7) + "-01");
                }
                console.log(obj)
                return this.getIncome(obj);
            }
        }
    }

    buildChartOptions() {
        this.chartOptions = {
            series: [
                {
                    name: "Bénéfice",
                    data: this.numberAppointment.data
                }
            ],
            xCategories: this.numberAppointment.labels,
            xTitle: "Date",
            yTitle: "Bénéfices",
            onHoverFormatter: function (val: any) {
                return val + " Ar"
            }
        }
        this.isDataThere = true;
        console.log(this.chartOptions)
    }

    getIncome = (data: any) => {
        this.isDataThere = false;
        return new Promise((resolve, reject) => {
            this.incomeService.getIncome(data).then((data: any) => {
                console.log(data)
                this.numberAppointment = data.data;
                this.buildChartOptions();
                resolve(data);
            }).catch((err: any) => {
                console.error(err);
                reject(err);
            });
        });
    }
}
