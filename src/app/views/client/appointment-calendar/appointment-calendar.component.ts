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
import frLocale from '@fullcalendar/core/locales/fr';

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
    events: [],
    editable: true,
    eventDrop: this.handleEventDrop.bind(this),
    datesSet: (dateInfo) => {
      this.findAllAppointment(dateInfo.startStr, dateInfo.endStr);
    },
    locale: frLocale
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
    this.openUpdateForm(temp);
  }
  handleEventDrop(eventDropInfo: EventDropArg) {
    const { event, oldEvent } = eventDropInfo;
    const currentDate = new Date().toISOString();
    if (oldEvent.startStr <= currentDate) {
      eventDropInfo.revert();
      return;
    }
    // console.log(event.startStr," ", oldEvent.startStr)
    this.openUpdateForm(this.formatEventToAppointment(event), event.startStr, true);
  }

  /* pour prendre les données */
  findAllAppointment = (startDate: string, endDate: string) => {
    this.appointmentService.findAllByClient({ date_debut: startDate, date_fin: endDate }).then((result: any) => {
      console.log(result)
      result = result.data.map((elt: any) => this.formatAppointment(elt));
      this.calendarOptions.events = result;

    }).catch((error: any) => {
      console.error(error);
    });
  }

  formatAppointment = (appointment: any) => {
    let color = "#fb9678";
    if (appointment.status != undefined && appointment.status.code != undefined) {
      color = appointment.status.code === "ENC" ? "#fb9678" : appointment.status.code === "TEP" ? "#03c9d7" : "#e46a76";
    }
    return {
      title: 'Rendez-vous',
      date: (appointment.date_heure_debut != undefined && appointment.date_heure_debut.length > 15) ? appointment.date_heure_debut.substring(0, 16) : appointment.date_heure_debut,
      end: (appointment.date_heure_fin != undefined && appointment.date_heure_fin.length > 15) ? appointment.date_heure_fin.substring(0, 16) : appointment.date_heure_fin,
      _id: appointment._id,
      prix: appointment.prix,
      status: appointment.status,
      color: color,
    }
  }
  findAllServices() {
    this.serviceCrud.findAll().then((data: any) => {
      // console.log(data)
      this.serviceData = data.data;
    }).catch((error: any) => {
      console.error(error);
    });
  }
  findAllEmployee() {
    this.employeeService.findAllByPreference().then((data: any) => {
      // console.log(data);
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

  async openUpdateForm(appointment: any, newDateEvent?: any, dragAndDrop: boolean = false) {
    console.log(appointment);
    var canUpdate = true;
    var canDelete = true;
    var canPaid = true;
    const appointmentData: any = await this.findAppointment(appointment._id);
    if (newDateEvent) {
      appointmentData.date_heure_debut = newDateEvent;
    }
    //empecher le changement si le rendez vous est payé
    if (appointmentData.status.code === "TEP") {
      canPaid = false;
      canUpdate = false;
      canDelete = false;
    }
    //empecher le changement si le rendez vous est passé sauf le paiement si pas encore payé
    const currentDate = new Date().toISOString();
    if (appointmentData.date_heure_debut <= currentDate) {
      canUpdate = false;
      canDelete = false;
    }
    const dialogRefUpdate = this.dialog.open(AppointmentUpdateComponent, {
      data: {
        employeeData: this.employeeData,
        serviceData: this.serviceData,
        appointmentData: appointmentData,
        canUpdate: canUpdate,
        canPaid: canPaid,
        canDelete: canDelete,
        close: () => {
          dialogRefUpdate.close();
        }
      }
    });

    dialogRefUpdate.componentInstance.update.subscribe((event: string) => {
      if (event === 'update' || event === 'delete' ) {
        this.findAllAppointment(this.startDate, this.endDate);
      }
    });
    if (dragAndDrop) {
      dialogRefUpdate.afterClosed().subscribe((result: any) => {
        this.findAllAppointment(this.startDate, this.endDate);
      });
    }
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
