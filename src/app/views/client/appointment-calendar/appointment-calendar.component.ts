import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentCreateComponent } from '../appointment-create/appointment-create.component';
import { ServiceCrudService } from 'src/app/services/service/service-crud.service';
import { EmployeeService } from 'src/app/services/personne/employee.service';
import { AppointmentUpdateComponent } from '../appointment-update/appointment-update.component';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  serviceData: any[] = [];
  employeeData: any[] = [];
  initialDate: string = '2024-W34'
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    eventClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2024-02-11', services: [''], _id: "" },
      { title: 'event 2', date: '2024-02-12', services: [''], _id: "" }
    ],
    eventColor: '#03c9d7',
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
  }
  handleDateClick(arg: any) {
    const temp = { title: arg.event._def.title, date: arg.event._instance.range.start, services: arg.event._def.extendedProps.services, _id: arg.event._def.publicId };
    this.openUpdateForm(temp);
  }
  handleEventDrop(eventDropInfo: EventDropArg) {
    const { event, oldEvent } = eventDropInfo;
    console.log(eventDropInfo);
    alert('Event Drop')
  }

  /* pour prendre les données */
  findAllAppointment(startDate?: string, endDate?: string) {
    // this.appointmentService.findAllByClient({}).then((result: any) => {
    //   console.log(result);
    //   this.calendarOptions.events = result;
    // }).catch((error: any) => {
    //   console.error(error);
    // });
  }
  findAllServices() {
    this.serviceCrud.findAll().then((data: any) => {
      this.serviceData = data;
    }).catch((error: any) => {
      console.error(error);
    });
  }
  findAllEmployee() {
    this.employeeService.findAll().then((data: any) => {
      this.employeeData = data;
    });
  }

  openCreateForm() {
    const dialogRefCreate = this.dialog.open(AppointmentCreateComponent, {
      data: {
        employeeData: this.employeeData,
        serviceData: this.serviceData
      }
    });

    dialogRefCreate.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result === 'new') {
        this.findAllAppointment();
      }
    })
  }

  openUpdateForm(appointment: any) {
    console.log(appointment);
    const dialogRefUpdate = this.dialog.open(AppointmentUpdateComponent, {
      data: {
        employeeData: this.employeeData,
        serviceData: this.serviceData,
        appointmentData: appointment
      }
    });

    dialogRefUpdate.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result === 'update') {
        this.findAllAppointment();
      }
    }
    )
  }

}
