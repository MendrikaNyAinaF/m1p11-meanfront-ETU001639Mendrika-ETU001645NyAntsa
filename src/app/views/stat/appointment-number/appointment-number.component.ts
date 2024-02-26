import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { StatService } from 'src/app/services/stat/stat.service';
import { DateUtilService } from 'src/app/services/utils/date-util.service';

@Component({
  selector: 'app-appointment-number',
  templateUrl: './appointment-number.component.html',
  styleUrls: ['./appointment-number.component.scss']
})
export class AppointmentNumberComponent implements OnInit {
  byWhat: string = "day";
  filterInputs!: any;
  formAction!: any;
  numberAppointment: any[] = [];
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
        text: "Nombre de rendez-vous"
      }
    }

  };


  constructor(private dateUtil: DateUtilService,
    private statService: StatService) { }

  ngOnInit(): void {
    const dates: any[] = this.dateUtil.getFirstAndLastDateInCurrentMonth();
    this.getNumberAppointments({ byWhat: this.byWhat, startDate: dates[0], endDate: dates[1] });
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
          { label: "Jour", value: "day" },
          { label: "Mois", value: "month" }
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
        return this.getNumberAppointments(obj);
      }
    }
  }

  buildChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: "Nombre de rendez-vous",
          data: this.numberAppointment.map((e: any) => e.count)
        }
      ],
      xCategories: this.numberAppointment.map((e: any) => e.date),
      xTitle: "Date",
      yTitle: "Nombre de rendez-vous",

    }
    this.isDataThere = true;
    console.log(this.chartOptions)
  }

  getNumberAppointments = (data: any) => {
    this.isDataThere = false;
    return new Promise((resolve, reject) => {
      this.statService.findNumberAppointments(data).then((data: any) => {
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


