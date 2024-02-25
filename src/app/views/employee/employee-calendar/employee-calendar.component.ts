import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

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
      services: arg._def.extendedProps.services,
      _id: arg._def.extendedProps._id
    }
  }

  handleDateClick(arg: any) {
    const temp = this.formatEventToAppointment(arg.event);
    //this.openUpdateForm(temp);
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
      title: 'Rendez-vous',
      date: (appointment.date_heure_debut != undefined && appointment.date_heure_debut.length > 15) ? appointment.date_heure_debut.substring(0, 16) : appointment.date_heure_debut,
      end: (appointment.date_heure_fin != undefined && appointment.date_heure_fin.length > 15) ? appointment.date_heure_fin.substring(0, 16) : appointment.date_heure_fin,
      _id: appointment._id,
      prix: appointment.prix,
      status: appointment.status,
      color: color
    }
  }


 
}
