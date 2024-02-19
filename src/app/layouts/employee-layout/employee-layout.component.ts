import { Component, OnInit } from '@angular/core';
import { FullComponent, sidebarMenu } from '../full/full.component';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.scss']
})
export class EmployeeLayoutComponent extends FullComponent implements OnInit {

  employee!: any;
  override sidebarMenu: sidebarMenu[] = [{
    link: "/employee/appointment",
    icon: "activity",
    menu: "Calendrier des rendez vous",
  },
  {
    link: "/employee/profil",
    icon: "user",
    menu: "Voir mon profil",
  },
  {
    link: "/employee/commission",
    icon: "codesandbox",
    menu: "Voir mes commissions",
  }
];
  constructor(private storageService: StorageService,
    private router: Router,
    breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }

  ngOnInit(): void {
    this.employee = this.storageService.getCurrentUserInfo();
    // if (this.employee.role !== "EMPLOYE") {
    //   this.router.navigate(["/employee/login"]);
    // }
  }


  logout() {
    this.storageService.logout();
    this.router.navigate(["/employee/login"]);
  }
  toProfil() {
    this.router.navigate(["/employee/profil"]);
  }
}
