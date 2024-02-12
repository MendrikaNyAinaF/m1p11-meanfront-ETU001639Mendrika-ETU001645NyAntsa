import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CreateFormComponent } from 'src/app/components/one-page-crud/one-page-crud.component';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  initialDate: string = '2024-W34'
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    eventClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2024-02-11' },
      { title: 'event 2', date: '2024-02-12' }
    ],
    eventColor: '#03c9d7',
    editable: true,
    eventDrop: this.handleEventDrop.bind(this)
  }
  constructor(public dialog: MatDialog, 
    private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }
  handleDateClick(arg: any) {
    console.log(arg);
    alert('date click! ')
  }
  handleEventDrop(eventDropInfo: EventDropArg) {
    const { event, oldEvent } = eventDropInfo;
    console.log(eventDropInfo);
    alert('Event Drop')
  }

  findAllAppointment() {
    //this.appo
  }
  openCreateForm(){
    const dialogRefCreate=this.dialog.open(CreateFormComponent);
    dialogRefCreate.afterClosed().subscribe((result:any)=>{
      console.log(result);
      if(result==='new'){
        this.findAllAppointment();
      }
    })
  }

  

}
