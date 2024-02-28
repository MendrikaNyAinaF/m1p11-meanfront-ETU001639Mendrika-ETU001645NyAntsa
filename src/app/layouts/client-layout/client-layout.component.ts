import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FullComponent, sidebarMenu } from '../full/full.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent extends FullComponent implements OnInit {
  client!: any;
  notifications!: any[];
  override sidebarMenu: sidebarMenu[] = [{
    link: "/client/appointment",
    icon: "file-text",
    menu: "Calendrier des rendez vous",
  },
  {
    link: "/client/employees/preference",
    icon: "smile",
    menu: "Voir les employés",
  },
  {
    link: "/client/services/preference",
    icon: "codesandbox",
    menu: "Voir les services proposés",
  },
  {
    link: "/client/special-offer",
    icon: "tag",
    menu: "Nos offres spéciales",
  }
];
  constructor(private storageService: StorageService,
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService) {
    super(breakpointObserver);
  }

  ngOnInit(): void {
    this.client = this.storageService.getCurrentUserInfo();
    if (this.client.role !== "CUSTOMER") {
      this.router.navigate(["/client/login"]);
    }
    this.getNotification();
  }


  logout() {
    this.storageService.logout();
    this.router.navigate(["/client/login"]);
  }
  toProfil() {
    this.router.navigate(["/client/profil"]);
  }

  getClientPhoto(){
    if(this.client.photo){
      return this.client.photo;
    }
    return "assets/images/favicon.png";
  }

  /** get 3 notification */
  getNotification(){
    this.notificationService.findAll(0).then((res: any) => {
      console.log(res);
      this.notifications = res.data.slice(0,3).map((notif:any)=>this.formatNotification(notif));

      console.log(this.notifications);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  /** take the 10 first word of a notification.  */
  formatNotification(notif:any){
    notif.firstWord=notif.contenu.split(" ").slice(0, 10).join(" ");
    notif.type=notif.type_notification?.code=="PUB"?"PUB":"RAPPEL";
    notif.badge=notif.type_notification?.code=="PUB"?"badge-info":"badge-primary";
    notif.ringColor=notif.type_notification?.code=="PUB"?"ring-info":"ring-primary";
    return notif;
  }

  toNotification(){
    this.router.navigate(["/client/notification"]);
  }
}
