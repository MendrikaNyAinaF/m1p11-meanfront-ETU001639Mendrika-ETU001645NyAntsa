import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DateUtilService } from 'src/app/services/utils/date-util.service';

@Component({
  selector: 'app-client-notification',
  templateUrl: './client-notification.component.html',
  styleUrls: ['./client-notification.component.scss']
})
export class ClientNotificationComponent implements OnInit {
  notifications: any[] =[];
  page: number = 0;
  constructor(private notificationService: NotificationService, private dateUtil: DateUtilService) { }

  ngOnInit(): void {
    this.getNotification();
  }
  /** get 3 notification */
  getNotification() {
    this.notificationService.findAll(this.page).then((res: any) => {
      console.log(res);
      this.notifications = res.data.map((notif: any) => this.formatNotification(notif));
      console.log(this.notifications);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  /** take the 10 first word of a notification.  */
  formatNotification(notif: any) {
    notif.firstWord = notif.contenu.split(" ").slice(0, 10).join(" ");
    notif.type = notif.type_notification?.code == "PUB" ? "PUB" : "RAPPEL";
    notif.badge = notif.type_notification?.code == "PUB" ? "badge-info" : "badge -primary";
    notif.ringColor = notif.type_notification?.code == "PUB" ? "ring-info" : "ring-primary";
    return notif;
  }
  nextPage(){
    if(this.notifications.length<10){
      return;
    }
    this.page++;
    this.getNotification();
  }
  previousPage(){
    if(this.page>0){
      this.page--;
      this.getNotification();
    }
  }

  convertDate(date: string) {
    return this.dateUtil.formatStartDateAppointment(date);
  }

  disabledPrevious(){
    return this.page==0;
  }
  disabledNext(){
    return this.notifications.length<10;
  }
}
