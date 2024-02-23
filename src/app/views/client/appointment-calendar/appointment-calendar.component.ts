import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';
import { EmployeeService } from 'src/app/services/personne/employee.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentCreateComponent } from '../appointment-create/appointment-create.component';
import { AppointmentUpdateComponent } from '../appointment-update/appointment-update.component';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  serviceData: any[] = [];
  employeeData: any[] = [];
  startDate!: string;
  endDate!: string;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    eventClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2024-02-11', services: [''], _id: "" },
      { title: 'event 2', date: '2024-02-12', services: [''], _id: "" }
    ],
    editable: true,
    eventDrop: this.handleEventDrop.bind(this),
    datesSet: (dateInfo) => {
      this.findAllAppointment(dateInfo.startStr, dateInfo.endStr);
    }
  }
  constructor(public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private serviceCrud: ServiceCrudService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const date = new Date(); // Date actuelle
    this.startDate = new Date(date.getFullYear(), date.getMonth(), 1).toUTCString(); // Premier jour du mois
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toUTCString(); // Dernier jour du mois
    this.findAllEmployee();
    this.findAllServices();
    this.findAllAppointment(this.startDate, this.endDate);
  }
  handleDateClick(arg: any) {
    const temp = { title: arg.event._def.title, date: arg.event._instance.range.start, services: arg.event._def.extendedProps.services, _id: arg.event._def.extendedProps._id };
    this.openUpdateForm(temp);
  }
  handleEventDrop(eventDropInfo: EventDropArg) {
    const { event, oldEvent } = eventDropInfo;
    // console.log(eventDropInfo);
    // console.log(oldEvent);
    // const temp = { title: arg.event._def.title, date: arg.event._instance.range.start, services: arg.event._def.extendedProps.services, _id: arg.event._def.publicId };
    this.openUpdateForm(event, event.startStr);
  }

  /* pour prendre les données */
  findAllAppointment = (startDate: string, endDate: string) => {
    this.appointmentService.findAllByClient({ date_debut: startDate, date_fin: endDate }).then((result: any) => {
      console.log(result)
      result = result.map((elt: any) => this.formatAppointment(elt));
      this.calendarOptions.events = result;

    }).catch((error: any) => {
      console.error(error);
    });
  }

  formatAppointment = (appointment: any) => {
    const color = appointment.status.code === "ENC" ? "#fb9678" : appointment.status.code === "TEP" ? "#03c9d7" : "#e46a76";
    return {
      title: 'Rendez-vous',
      date: appointment.date_heure_debut,
      end: appointment.date_heure_fin,
      _id: appointment._id,
      prix: appointment.prix,
      status: appointment.status,
      color: color,
    }
  }
  findAllServices() {
    this.serviceCrud.findAll().then((data: any) => {
      // console.log(data)
      this.serviceData = data;
    }).catch((error: any) => {
      console.error(error);
    });
  }
  findAllEmployee() {
    this.employeeService.findAllByPreference().then((data: any) => {
      console.log(data);
      this.employeeData = data.data;
    }).catch((error: any) => {
      console.error(error);
    });
  }

  openCreateForm() {
    const dialogRefCreate = this.dialog.open(AppointmentCreateComponent, {
      data: {
        employeeData: this.employeeData,
        serviceData: this.serviceData
      }
    });

    dialogRefCreate.componentInstance.create.subscribe((event: string) => {
      if (event === 'new') {
        this.findAllAppointment(this.startDate, this.endDate);
      }
    });
  }

  async openUpdateForm(appointment: any, newDateEvent?: any) {
    console.log(appointment);
    
    const appointmentData = await this.findAppointment(appointment._id);
    if (newDateEvent) {
      appointment.date_heure_debut = newDateEvent;
    }
    const dialogRefUpdate = this.dialog.open(AppointmentUpdateComponent, {
      data: {
        employeeData: this.employeeData,
        serviceData: this.serviceData,
        appointmentData: appointmentData,
      }
    });

    dialogRefUpdate.componentInstance.update.subscribe((event: string) => {
      if (event === 'update') {
        this.findAllAppointment(this.startDate, this.endDate);
      }
    });
  }
  findAppointment(id: string) {
    return new Promise((resolve, reject) => {
      this.appointmentService.findById(id).then((res: any) => {
        console.log(res)
        resolve(res);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

}
