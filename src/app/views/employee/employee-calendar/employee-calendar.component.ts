import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { DateUtilService } from 'src/app/services/utils/date-util.service';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.scss']
})
export class EmployeeCalendarComponent implements OnInit {
  startDate!: string;
  endDate!: string;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    eventClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2024-02-26', services: [''], _id: "" },
      { title: 'event 2', date: '2024-02-27', services: [''], _id: "" }
    ],
    editable: false,
    // eventDrop: this.handleEventDrop.bind(this),
    datesSet: (dateInfo) => {
      this.findAllAppointment(dateInfo.startStr, dateInfo.endStr);
    }
  }
  constructor(public dialog: MatDialog,
    private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const date = new Date(); // Date actuelle
    this.startDate = new Date(date.getFullYear(), date.getMonth(), 1).toUTCString(); // Premier jour du mois
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toUTCString(); // Dernier jour du mois

    this.findAllAppointment(this.startDate, this.endDate);
  }

  formatEventToAppointment(arg: any) {
    return {
      title: arg._def.title,
      date: arg._instance.range.start,
      data: arg._def.extendedProps.data
    }
  }

  handleDateClick(arg: any) {
    const temp = this.formatEventToAppointment(arg.event);
    console.log(temp)
    this.openDetailDialog(temp.data);
  }


  /* pour prendre les données */
  findAllAppointment = (startDate: string, endDate: string) => {
    this.appointmentService.findAllByEmploye({ date_debut: startDate, date_fin: endDate }).then((result: any) => {
      console.log(result)
      result = result.data.map((elt: any) => this.formatAppointment(elt));
      this.calendarOptions.events = result;

    }).catch((error: any) => {
      console.error(error);
    });
  }

  formatAppointment = (appointment: any) => {
    let color = "#e46a76";
    return {
      title: appointment.service?.nom,
      date: (appointment.date_heure_debut != undefined && appointment.date_heure_debut.length > 15) ? appointment.date_heure_debut.substring(0, 16) : appointment.date_heure_debut,
      end: (appointment.date_heure_fin != undefined && appointment.date_heure_fin.length > 15) ? appointment.date_heure_fin.substring(0, 16) : appointment.date_heure_fin,
      data: appointment,
      color: color
    }
  }

  openDetailDialog(appointment: any) {
    const dialogRefCreate = this.dialog.open(DetailApppointmentDialogComponent, {
      data: {
        appointment: appointment
      }
    });
  }
}

/* Modal detail appointment*/
@Component({
  selector: 'app-detail-appointment-dialog',
  templateUrl: './detail-appointment.component.html',
  styleUrls: ['./employee-calendar.component.scss']
})
export class DetailApppointmentDialogComponent {
  appointment!: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dateUtil: DateUtilService) {
    this.appointment = data.appointment;
  }

  convertDate(date: string) {
    if (date === undefined || date == null || date == "") return "";
    return this.dateUtil.formatStartDateAppointment(date);
  }
}
