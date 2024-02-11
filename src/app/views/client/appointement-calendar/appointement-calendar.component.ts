import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-appointement-calendar',
  templateUrl: './appointement-calendar.component.html',
  styleUrls: ['./appointement-calendar.component.scss']
})
export class AppointementCalendarComponent implements OnInit {
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
  constructor() { }

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


}
