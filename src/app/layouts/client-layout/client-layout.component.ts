import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FullComponent, sidebarMenu } from '../full/full.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent extends FullComponent implements OnInit {
  client!: any;
  override sidebarMenu: sidebarMenu[] = [{
    link: "/client/appointment",
    icon: "file-text",
    menu: "Calendrier des rendez vous",
  },
  {
    link: "/home",
    icon: "smile",
    menu: "Voir les employés",
  },
  {
    link: "/home",
    icon: "codesandbox",
    menu: "Voir les services proposés",
  },
  {
    link: "/home",
    icon: "tag",
    menu: "Nos offres spéciales",
  }
];
  constructor(private storageService: StorageService,
    private router: Router,
    breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }

  ngOnInit(): void {
    this.client = this.storageService.getCurrentUserInfo();
    // if (this.client.role !== "CUSTOMER") {
    //   this.router.navigate(["/client/login"]);
    // }
  }


  logout() {
    this.storageService.logout();
    this.router.navigate(["/client/login"]);
  }
  toProfil() {
    this.router.navigate(["/client/profil"]);
  }
}
