import { Component, OnInit } from '@angular/core';
import { FullComponent, sidebarMenu } from '../full/full.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent extends FullComponent implements OnInit {
  manager!: any;
  override sidebarMenu: sidebarMenu[] = [{
    link: "/manager/dashboard",
    icon: "home",
    menu: "Dashboard",
  },
  {
    link: "/manager/services",
    icon: "activity",
    menu: "Services",
  },
  {
    link: "/manager/employees",
    icon: "codesandbox",
    menu: "Gestion des employés",
  },
  {
    link: "/manager/expenses",
    icon: "credit-card",
    menu: "Gestion des dépenses",
  },
  {
    link: "/manager/type-expenses",
    icon: "disc",
    menu: "Gestion des types de dépenses",
  },
  {
    link:"/manager/special-offer",
    icon:"award",
    menu:"Gestion des offres spéciales"
  }
];
  constructor(private storageService: StorageService,
    private router: Router,
    breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }

  ngOnInit(): void {
    this.manager = this.storageService.getCurrentUserInfo();
    if (this.manager.role !== "ADMIN") {
      this.router.navigate(["/manager/login"]);
    }
  }

  logout() {
    this.storageService.logout();
    this.router.navigate(["/manager/login"]);
  }
  getManagerPhoto(){
    if(this.manager.photo){
      return this.manager.photo;
    }
    return "assets/images/favicon.png";
  }
  toProfil() {
    this.router.navigate(["/manager/profil"]);
  }
}
