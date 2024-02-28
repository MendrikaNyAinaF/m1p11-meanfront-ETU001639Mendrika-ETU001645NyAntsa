import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MoneyService} from "../../../../services/utils/money.service";

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {
  selectedService: any;
  constructor(@Inject(MAT_DIALOG_DATA) public service: any) {
    console.log("Service : ",service);
    this.selectedService = service;
  }

  ngOnInit(): void {
  }

  protected readonly MoneyService = MoneyService;
}
